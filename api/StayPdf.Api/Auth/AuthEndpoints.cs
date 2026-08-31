using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using StayPdf.Api.Data;

namespace StayPdf.Api.Auth;

public static class AuthEndpoints
{
    private static readonly PasswordHasher<User> Hasher = new();
    private static readonly Regex EmailPattern = new(@"^[^@\s]+@[^@\s]+\.[^@\s]+$", RegexOptions.Compiled | RegexOptions.CultureInvariant);

    public static void MapAuth(this WebApplication app)
    {
        var g = app.MapGroup("/api/auth");
        g.MapPost("/register", Register);
        g.MapPost("/login", Login);
        g.MapPost("/logout", Logout);
        g.MapGet("/me", Me);
    }

    private static async Task<IResult> Register(LoginRequest body, AppDbContext db, TokenService tokens, HttpContext ctx, IHostEnvironment env)
    {
        var email = NormalizeEmail(body.Email);
        var password = body.Password ?? "";
        if (!EmailPattern.IsMatch(email) || password.Length < 8)
        {
            return Results.Json(new { error = "Check your email and password." }, statusCode: 400);
        }

        if (await db.Users.AnyAsync(u => u.Email == email))
        {
            return Results.Json(new { error = "Could not create this account." }, statusCode: 400);
        }

        var user = new User
        {
            Id = Guid.NewGuid(),
            Email = email,
            CreatedAt = DateTimeOffset.UtcNow
        };
        user.PasswordHash = Hasher.HashPassword(user, password);
        db.Users.Add(user);
        await db.SaveChangesAsync();
        return SignIn(ctx, tokens, user, isPro: false, env.IsProduction());
    }

    private static async Task<IResult> Login(LoginRequest body, AppDbContext db, TokenService tokens, HttpContext ctx, IHostEnvironment env)
    {
        var email = NormalizeEmail(body.Email);
        var password = body.Password ?? "";
        var user = await db.Users.Include(u => u.License).FirstOrDefaultAsync(u => u.Email == email);
        if (user is null)
        {
            return Results.Json(new { error = "Could not sign in." }, statusCode: 401);
        }

        var verify = Hasher.VerifyHashedPassword(user, user.PasswordHash, password);
        if (verify == PasswordVerificationResult.Failed)
        {
            return Results.Json(new { error = "Could not sign in." }, statusCode: 401);
        }

        return SignIn(ctx, tokens, user, user.License is not null, env.IsProduction());
    }

    private static IResult Logout(HttpContext ctx, IHostEnvironment env)
    {
        ctx.Response.Cookies.Delete(TokenService.CookieName, TokenService.SessionCookie(env.IsProduction()));
        return Results.Json(new { ok = true });
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
            remaining
        });
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
