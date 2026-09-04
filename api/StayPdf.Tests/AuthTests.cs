using System.Net;
using Microsoft.AspNetCore.Http;
using System.Net.Http.Json;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using StayPdf.Api.Auth;
using StayPdf.Api.Data;

namespace StayPdf.Tests;

public class AuthTests
{
    [Fact]
    public async Task Register_does_not_set_a_session_cookie()
    {
        using var factory = new StayPdfFactory();
        using var client = factory.CreateClient();
        AuthHelpers.UseIp(client, "203.0.113.10");

        var res = await client.PostAsJsonAsync("/api/auth/register", new
        {
            email = "new.user@example.com",
            password = "password10"
        });
        Assert.Equal(HttpStatusCode.OK, res.StatusCode);
        Assert.False(AuthHelpers.HasSessionCookie(res));

        var me = await client.GetFromJsonAsync<MeDto>("/api/auth/me");
        Assert.NotNull(me);
        Assert.False(me!.Authenticated);

        var body = await res.Content.ReadAsStringAsync();
        Assert.Contains("If that address can be used", body, StringComparison.Ordinal);
        Assert.DoesNotContain("authenticated", body, StringComparison.OrdinalIgnoreCase);
    }

    [Fact]
    public async Task Login_before_verify_fails()
    {
        using var factory = new StayPdfFactory();
        using var client = factory.CreateClient();
        AuthHelpers.UseIp(client, "203.0.113.11");

        var register = await client.PostAsJsonAsync("/api/auth/register", new
        {
            email = "pending@example.com",
            password = "password10"
        });
        Assert.Equal(HttpStatusCode.OK, register.StatusCode);

        var login = await client.PostAsJsonAsync("/api/auth/login", new
        {
            email = "pending@example.com",
            password = "password10"
        });
        Assert.Equal(HttpStatusCode.Unauthorized, login.StatusCode);
        var body = await login.Content.ReadAsStringAsync();
        Assert.Contains("Could not sign in.", body, StringComparison.Ordinal);
        Assert.DoesNotContain("verif", body, StringComparison.OrdinalIgnoreCase);
    }

    [Fact]
    public async Task Verify_then_login_succeeds()
    {
        using var factory = new StayPdfFactory();
        using var client = factory.CreateClient();
        AuthHelpers.UseIp(client, "203.0.113.12");

        var register = await client.PostAsJsonAsync("/api/auth/register", new
        {
            email = "ok@example.com",
            password = "password10"
        });
        Assert.Equal(HttpStatusCode.OK, register.StatusCode);

        string token;
        using (var scope = factory.Services.CreateScope())
        {
            var mail = scope.ServiceProvider.GetRequiredService<IEmailSender>();
            token = AuthHelpers.TokenFromUrl(mail.LastVerifyUrl);
        }

        var verify = await client.PostAsJsonAsync("/api/auth/verify", new { token });
        Assert.Equal(HttpStatusCode.OK, verify.StatusCode);
        Assert.False(AuthHelpers.HasSessionCookie(verify));

        var login = await client.PostAsJsonAsync("/api/auth/login", new
        {
            email = "ok@example.com",
            password = "password10"
        });
        Assert.Equal(HttpStatusCode.OK, login.StatusCode);
        Assert.True(AuthHelpers.HasSessionCookie(login));

        var me = await client.GetFromJsonAsync<MeDto>("/api/auth/me");
        Assert.NotNull(me);
        Assert.True(me!.Authenticated);
        Assert.Equal("ok@example.com", me.Email);
    }

    [Fact]
    public async Task Duplicate_register_returns_generic_success_and_does_not_add_a_second_user()
    {
        using var factory = new StayPdfFactory();
        using var client = factory.CreateClient();
        AuthHelpers.UseIp(client, "203.0.113.13");

        var first = await client.PostAsJsonAsync("/api/auth/register", new
        {
            email = "dup@example.com",
            password = "password10"
        });
        Assert.Equal(HttpStatusCode.OK, first.StatusCode);
        var firstBody = await first.Content.ReadAsStringAsync();

        var second = await client.PostAsJsonAsync("/api/auth/register", new
        {
            email = "dup@example.com",
            password = "password10"
        });
        Assert.Equal(HttpStatusCode.OK, second.StatusCode);
        var secondBody = await second.Content.ReadAsStringAsync();
        Assert.Equal(firstBody, secondBody);
        Assert.Contains("If that address can be used", secondBody, StringComparison.Ordinal);

        using var scope = factory.Services.CreateScope();
        var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
        Assert.Equal(1, await db.Users.CountAsync(u => u.Email == "dup@example.com"));
    }

    [Fact]
    public async Task Honeypot_does_not_create_a_user()
    {
        using var factory = new StayPdfFactory();
        using var client = factory.CreateClient();
        AuthHelpers.UseIp(client, "203.0.113.14");

        var res = await client.PostAsJsonAsync("/api/auth/register", new
        {
            email = "bot@example.com",
            password = "password10",
            company = "Acme Inc"
        });
        Assert.Equal(HttpStatusCode.OK, res.StatusCode);
        var body = await res.Content.ReadAsStringAsync();
        Assert.Contains("If that address can be used", body, StringComparison.Ordinal);

        using var scope = factory.Services.CreateScope();
        var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
        Assert.False(await db.Users.AnyAsync(u => u.Email == "bot@example.com"));
        var mail = scope.ServiceProvider.GetRequiredService<IEmailSender>();
        Assert.True(string.IsNullOrEmpty(mail.LastVerifyUrl));
    }

    [Fact]
    public async Task Fourth_register_from_same_ip_in_an_hour_is_429()
    {
        using var factory = new StayPdfFactory();
        using var client = factory.CreateClient();
        AuthHelpers.UseIp(client, "198.51.100.20");

        for (var i = 0; i < 3; i++)
        {
            var ok = await client.PostAsJsonAsync("/api/auth/register", new
            {
                email = $"n{i}@example.com",
                password = "password10"
            });
            Assert.Equal(HttpStatusCode.OK, ok.StatusCode);
        }

        var blocked = await client.PostAsJsonAsync("/api/auth/register", new
        {
            email = "n3@example.com",
            password = "password10"
        });
        Assert.Equal(HttpStatusCode.TooManyRequests, blocked.StatusCode);
        Assert.True(blocked.Headers.RetryAfter is not null);
        Assert.True(blocked.Headers.Contains("Retry-After"));

        using var scope = factory.Services.CreateScope();
        var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
        Assert.Equal(3, await db.Users.CountAsync());
        Assert.False(await db.Users.AnyAsync(u => u.Email == "n3@example.com"));
    }


    [Fact]
    public void SessionCookie_production_is_none_and_secure()
    {
        var opts = TokenService.SessionCookie(production: true);
        Assert.Equal(SameSiteMode.None, opts.SameSite);
        Assert.True(opts.Secure);
        Assert.True(opts.HttpOnly);
    }

    [Fact]
    public void SessionCookie_testing_keeps_lax()
    {
        var opts = TokenService.SessionCookie(production: false);
        Assert.Equal(SameSiteMode.Lax, opts.SameSite);
        Assert.False(opts.Secure);
        Assert.True(opts.HttpOnly);
    }

    [Fact]
    public void DeviceCookie_matches_session_samesite_policy()
    {
        var prod = TokenService.DeviceCookie(production: true);
        Assert.Equal(SameSiteMode.None, prod.SameSite);
        Assert.True(prod.Secure);
        var local = TokenService.DeviceCookie(production: false);
        Assert.Equal(SameSiteMode.Lax, local.SameSite);
        Assert.False(local.Secure);
    }

    [Fact]
    public void Production_does_not_skip_Turnstile()
    {
        using var factory = new StayPdfFactory
        {
            EnvironmentName = "Production",
            Extra =
            {
                ["JWT_SECRET"] = "prod-jwt-secret-must-be-32-chars-min!",
                ["STAYPDF_TEST_EMAIL"] = "owner@example.com",
                ["STAYPDF_TEST_PASSWORD"] = "would-be-a-password"
            }
        };

        var ex = Assert.ThrowsAny<Exception>(() => factory.CreateClient());
        Assert.Contains("TURNSTILE_SECRET", RootMessage(ex), StringComparison.Ordinal);
    }

    [Fact]
    public async Task Register_requires_turnstile_when_secret_configured()
    {
        using var factory = new StayPdfFactory
        {
            Extra = { ["TURNSTILE_SECRET"] = "test-turnstile-secret-value" }
        };
        using var client = factory.CreateClient();
        AuthHelpers.UseIp(client, "203.0.113.15");

        var res = await client.PostAsJsonAsync("/api/auth/register", new
        {
            email = "captcha@example.com",
            password = "password10"
        });
        Assert.Equal(HttpStatusCode.BadRequest, res.StatusCode);

        using var scope = factory.Services.CreateScope();
        var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
        Assert.False(await db.Users.AnyAsync());
    }

    private static string RootMessage(Exception ex)
    {
        while (ex.InnerException is not null) ex = ex.InnerException;
        return ex.Message;
    }

    private sealed class MeDto
    {
        public bool Authenticated { get; set; }
        public string? Email { get; set; }
        public bool IsPro { get; set; }
        public int? Remaining { get; set; }
    }
}
