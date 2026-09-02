using System.Text.Json.Serialization;
using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using StayPdf.Api.Data;
using StayPdf.Api.Jobs;

namespace StayPdf.Api.Auth;

public static class AuthEndpoints
{
    private static readonly PasswordHasher<User> Hasher = new();
    private static readonly Regex EmailPattern = new(@"^[^@\s]+@[^@\s]+\.[^@\s]+$", RegexOptions.Compiled | RegexOptions.CultureInvariant);
    private const string GenericInbox = "If that address can be used, we sent a message.";
    private const string SignInFailed = "Could not sign in.";
    private const int TokenTtlHours = 24;
    private const int MaxVerifyEmailsPerDay = 3;

    public static void MapAuth(this WebApplication app)
    {
        var g = app.MapGroup("/api/auth");
        g.MapPost("/register", Register);
        g.MapPost("/login", Login);
        g.MapPost("/logout", Logout);
        g.MapPost("/verify", Verify);
        g.MapPost("/resend-verification", Resend);
        g.MapGet("/me", Me);
    }

    private static async Task<IResult> Register(
        RegisterRequest body,
        AppDbContext db,
        IEmailSender mail,
        ITurnstileVerifier turnstile,
        AuthRateLimiter limiter,
        IConfiguration config,
        HttpContext ctx,
        CancellationToken ct)
    {
        var limited = CheckRate(ctx, limiter, register: true);
        if (limited is not null) return limited;

        if (!string.IsNullOrEmpty(body.Company))
        {
            return Results.Json(new { message = GenericInbox });
        }

        var ip = AuthRateLimiter.ClientIp(ctx);
        if (!await turnstile.VerifyAsync(body.TurnstileResponse, ip, ct))
        {
            return Results.Json(new { error = "Could not create this account." }, statusCode: 400);
        }

        var email = NormalizeEmail(body.Email);
        var password = body.Password ?? "";
        if (!EmailPattern.IsMatch(email) || !PasswordRules.IsValid(password) || DisposableEmails.IsBlocked(email))
        {
            return Results.Json(new { error = "Check your email and password." }, statusCode: 400);
        }

        if (!mail.IsMailConfigured)
        {
            return Results.Json(new { error = "mail not configured" }, statusCode: 503);
        }

        if (await db.Users.AnyAsync(u => u.Email == email, ct))
        {
            return Results.Json(new { message = GenericInbox });
        }

        var user = new User
        {
            Id = Guid.NewGuid(),
            Email = email,
            CreatedAt = DateTimeOffset.UtcNow,
            EmailVerified = false
        };
        user.PasswordHash = Hasher.HashPassword(user, password);
        db.Users.Add(user);
        await IssueAndSendAsync(db, mail, config, user, ct);
        return Results.Json(new { message = GenericInbox });
    }

    private static async Task<IResult> Login(
        LoginRequest body,
        AppDbContext db,
        TokenService tokens,
        AuthRateLimiter limiter,
        HttpContext ctx,
        IHostEnvironment env,
        CancellationToken ct)
    {
        var limited = CheckRate(ctx, limiter, register: false);
        if (limited is not null) return limited;

        var email = NormalizeEmail(body.Email);
        var password = body.Password ?? "";
        var user = await db.Users.Include(u => u.License).FirstOrDefaultAsync(u => u.Email == email, ct);
        if (user is null || !user.EmailVerified)
        {
            return Results.Json(new { error = SignInFailed }, statusCode: 401);
        }

        var verify = Hasher.VerifyHashedPassword(user, user.PasswordHash, password);
        if (verify == PasswordVerificationResult.Failed)
        {
            return Results.Json(new { error = SignInFailed }, statusCode: 401);
        }

        return SignIn(ctx, tokens, user, user.License is not null, env.IsProduction());
    }

    private static IResult Logout(HttpContext ctx, IHostEnvironment env)
    {
        ctx.Response.Cookies.Delete(TokenService.CookieName, TokenService.SessionCookie(env.IsProduction()));
        return Results.Json(new { ok = true });
    }

    private static async Task<IResult> Verify(
        VerifyRequest body,
        AppDbContext db,
        AuthRateLimiter limiter,
        HttpContext ctx,
        CancellationToken ct)
    {
        var limited = CheckRate(ctx, limiter, register: false);
        if (limited is not null) return limited;

        var raw = (body.Token ?? "").Trim();
        if (raw.Length == 0)
        {
            return Results.Json(new { error = "This link is not valid." }, statusCode: 400);
        }

        var hash = DeviceIdentity.HashToken(raw);
        var now = DateTimeOffset.UtcNow;
        var row = await db.EmailVerificationTokens
            .Include(t => t.User)
            .FirstOrDefaultAsync(t => t.TokenHash == hash, ct);
        if (row is null || row.ConsumedAt is not null || row.ExpiresAt <= now)
        {
            return Results.Json(new { error = "This link is not valid." }, statusCode: 400);
        }

        row.ConsumedAt = now;
        row.User.EmailVerified = true;
        row.User.EmailVerifiedAt = now;
        await db.SaveChangesAsync(ct);
        return Results.Json(new { ok = true });
    }

    private static async Task<IResult> Resend(
        ResendRequest body,
        AppDbContext db,
        IEmailSender mail,
        AuthRateLimiter limiter,
        IConfiguration config,
        HttpContext ctx,
        CancellationToken ct)
    {
        var limited = CheckRate(ctx, limiter, register: false);
        if (limited is not null) return limited;

        var email = NormalizeEmail(body.Email);
        if (!EmailPattern.IsMatch(email) || !mail.IsMailConfigured)
        {
            return Results.Json(new { message = GenericInbox });
        }

        var user = await db.Users.FirstOrDefaultAsync(u => u.Email == email, ct);
        if (user is not null && !user.EmailVerified)
        {
            await IssueAndSendAsync(db, mail, config, user, ct);
        }

        return Results.Json(new { message = GenericInbox });
    }

    private static async Task<IResult> Me(HttpContext ctx, AppDbContext db, QuotaService quota, CancellationToken ct)
    {
        var actor = await CurrentActor.ResolveAsync(ctx, db, ct);
        var remaining = actor.IsPro ? (int?)null : await quota.RemainingAsync(actor.SubjectId, ct);
        return Results.Json(new
        {
            authenticated = actor.Authenticated,
            email = actor.Email,
            isPro = actor.IsPro,
            remaining,
            plan = actor.IsPro ? "pro" : "free",
            limits = ToolCatalog.LimitsJson(actor.IsPro),
            tools = ToolCatalog.ToolsJson()
        });
    }

    private static async Task IssueAndSendAsync(
        AppDbContext db,
        IEmailSender mail,
        IConfiguration config,
        User user,
        CancellationToken ct)
    {
        var since = DateTimeOffset.UtcNow.AddHours(-TokenTtlHours);
        var recent = await db.EmailVerificationTokens.AsNoTracking()
            .Where(t => t.UserId == user.Id)
            .Select(t => t.CreatedAt)
            .ToListAsync(ct);
        if (recent.Count(t => t >= since) >= MaxVerifyEmailsPerDay) return;

        var raw = DeviceIdentity.NewToken();
        db.EmailVerificationTokens.Add(new EmailVerificationToken
        {
            Id = Guid.NewGuid(),
            UserId = user.Id,
            TokenHash = DeviceIdentity.HashToken(raw),
            CreatedAt = DateTimeOffset.UtcNow,
            ExpiresAt = DateTimeOffset.UtcNow.AddHours(TokenTtlHours)
        });
        await db.SaveChangesAsync(ct);

        var publicUrl = (config["APP_PUBLIC_URL"] ?? Environment.GetEnvironmentVariable("APP_PUBLIC_URL") ?? "http://localhost:5173")
            .Trim()
            .TrimEnd('/');
        var verifyUrl = $"{publicUrl}/#/verify?token={raw}";
        await mail.SendVerificationAsync(user.Email, verifyUrl, ct);
    }

    private static IResult? CheckRate(HttpContext ctx, AuthRateLimiter limiter, bool register)
    {
        var ip = AuthRateLimiter.ClientIp(ctx);
        if (!limiter.TryAuth(ip, out var retry)) return TooMany(ctx, retry);
        if (register && !limiter.TryRegister(ip, out retry)) return TooMany(ctx, retry);
        return null;
    }

    private static IResult TooMany(HttpContext ctx, int retryAfterSeconds)
    {
        ctx.Response.Headers.RetryAfter = retryAfterSeconds.ToString();
        return Results.Json(new { error = "Too many requests." }, statusCode: 429);
    }

    private static IResult SignIn(HttpContext ctx, TokenService tokens, User user, bool isPro, bool production)
    {
        var jwt = tokens.Issue(user, isPro);
        ctx.Response.Cookies.Append(TokenService.CookieName, jwt, TokenService.SessionCookie(production));
        return Results.Json(new
        {
            authenticated = true,
            email = user.Email,
            isPro,
            remaining = isPro ? (int?)null : QuotaService.FreeDailyLimit
        });
    }

    private static string NormalizeEmail(string? email) => (email ?? "").Trim().ToLowerInvariant();
}

public sealed record LoginRequest(string? Email, string? Password);

public sealed record RegisterRequest(
    string? Email,
    string? Password,
    string? Company,
    [property: JsonPropertyName("cf-turnstile-response")] string? TurnstileResponse);

public sealed record VerifyRequest(string? Token);

public sealed record ResendRequest(string? Email);
