using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using StayPdf.Api.Auth;
using StayPdf.Api.Data;
using StayPdf.Api.Hosting;
using StayPdf.Api.Jobs;

EnvFile.LoadIfPresent();

var builder = WebApplication.CreateBuilder(args);

var jwtSecret = builder.Configuration["JWT_SECRET"]
                ?? Environment.GetEnvironmentVariable("JWT_SECRET")
                ?? "";

if (builder.Environment.IsProduction() && jwtSecret.Length < 32)
{
    throw new InvalidOperationException("JWT_SECRET must be at least 32 characters.");
}

if (builder.Environment.IsProduction())
{
    var turnstileSecret = builder.Configuration["TURNSTILE_SECRET"]
                          ?? Environment.GetEnvironmentVariable("TURNSTILE_SECRET")
                          ?? "";
    if (string.IsNullOrWhiteSpace(turnstileSecret))
    {
        throw new InvalidOperationException("TURNSTILE_SECRET is required in Production.");
    }
}

if (string.IsNullOrEmpty(jwtSecret))
{
    throw new InvalidOperationException("JWT_SECRET is required. Set it in .env (32+ characters).");
}

var sqlite = builder.Configuration.GetConnectionString("Default") ?? "Data Source=staypdf.db";
builder.Services.AddDbContext<AppDbContext>(options => options.UseSqlite(sqlite));
builder.Services.AddScoped<TokenService>();
builder.Services.AddScoped<QuotaService>();
builder.Services.AddSingleton<AuthRateLimiter>();
builder.Services.AddSingleton<IEmailSender, EmailSender>();
builder.Services.AddHttpClient<ITurnstileVerifier, TurnstileVerifier>();
builder.Services.AddHealthChecks();

builder.Services.Configure<FormOptions>(options =>
{
    options.MemoryBufferThreshold = int.MaxValue;
    options.BufferBody = true;
    options.BufferBodyLengthLimit = JobEndpoints.MaxFileBytes * JobEndpoints.MaxFiles + 1_048_576;
    options.MultipartBodyLengthLimit = JobEndpoints.MaxFileBytes * JobEndpoints.MaxFiles + 1_048_576;
    options.ValueLengthLimit = int.MaxValue;
    options.MultipartHeadersLengthLimit = 16_384;
});

builder.WebHost.ConfigureKestrel(options =>
{
    options.Limits.MaxRequestBodySize = JobEndpoints.MaxFileBytes * JobEndpoints.MaxFiles + 1_048_576;
});

var corsOrigins = (builder.Configuration["CORS_ORIGINS"]
                   ?? Environment.GetEnvironmentVariable("CORS_ORIGINS")
                   ?? "http://localhost:5173,http://localhost:4173,http://127.0.0.1:5173,http://127.0.0.1:4173,https://1184898069.github.io")
    .Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries);

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
        policy.WithOrigins(corsOrigins)
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials());
});

builder.Services
    .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidIssuer = "staypdf",
            ValidateAudience = true,
            ValidAudience = "staypdf",
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSecret)),
            ValidateLifetime = true,
            ClockSkew = TimeSpan.FromMinutes(1)
        };
        options.Events = new JwtBearerEvents
        {
            OnMessageReceived = ctx =>
            {
                if (ctx.Request.Cookies.TryGetValue(TokenService.CookieName, out var token)
                    && !string.IsNullOrEmpty(token))
                {
                    ctx.Token = token;
                }

                return Task.CompletedTask;
            },
            OnAuthenticationFailed = _ => Task.CompletedTask,
            OnChallenge = ctx =>
            {
                ctx.HandleResponse();
                return Task.CompletedTask;
            }
        };
    });
builder.Services.AddAuthorization();

PdfFonts.Ensure();

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.EnsureCreated();
    await DevSeed.ApplyAsync(db, app.Configuration, app.Environment);
}

app.UseCors();
app.UseAuthentication();
app.UseAuthorization();

app.Use(async (ctx, next) =>
{
    if (ctx.Request.Path.StartsWithSegments("/api"))
    {
        var db = ctx.RequestServices.GetRequiredService<AppDbContext>();
        var env = ctx.RequestServices.GetRequiredService<IHostEnvironment>();
        var deviceId = await DeviceIdentity.EnsureAsync(ctx, db, env.IsProduction(), ctx.RequestAborted);
        ctx.Items["DeviceId"] = deviceId;
    }

    await next();
});

app.MapGet("/health", () => Results.Json(new { ok = true }));
app.MapAuth();
app.MapJobs();

app.Run();

public partial class Program;
