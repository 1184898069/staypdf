using System.Net;
using System.Net.Http.Json;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using StayPdf.Api.Data;

namespace StayPdf.Tests;

public class ProductionSeedTests
{
    [Fact]
    public void Production_refuses_short_jwt_secret()
    {
        using var factory = new StayPdfFactory
        {
            EnvironmentName = "Production",
            Extra =
            {
                ["JWT_SECRET"] = "too-short",
                ["STAYPDF_TEST_EMAIL"] = "owner@example.com",
                ["STAYPDF_TEST_PASSWORD"] = "would-be-a-password"
            }
        };

        var ex = Assert.ThrowsAny<Exception>(() => factory.CreateClient());
        Assert.Contains("JWT_SECRET", RootMessage(ex), StringComparison.Ordinal);
    }

    [Fact]
    public async Task Production_does_not_seed_the_test_user()
    {
        using var factory = new StayPdfFactory
        {
            EnvironmentName = "Production",
            Extra =
            {
                ["JWT_SECRET"] = "prod-jwt-secret-must-be-32-chars-min!",
                ["TURNSTILE_SECRET"] = "prod-turnstile-secret-for-tests",
                ["STAYPDF_TEST_EMAIL"] = "owner@example.com",
                ["STAYPDF_TEST_PASSWORD"] = "would-be-a-password"
            }
        };
        using var client = factory.CreateClient();
        var health = await client.GetAsync("/health");
        Assert.Equal(HttpStatusCode.OK, health.StatusCode);

        using var scope = factory.Services.CreateScope();
        var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
        Assert.False(await db.Users.AnyAsync());
        Assert.False(await db.Licenses.AnyAsync());

        var login = await client.PostAsJsonAsync("/api/auth/login", new
        {
            email = "owner@example.com",
            password = "would-be-a-password"
        });
        Assert.Equal(HttpStatusCode.Unauthorized, login.StatusCode);
    }

    [Fact]
    public async Task Development_seeds_test_user_from_env()
    {
        const string email = "dev.owner@example.com";
        const string password = "dev-only-test-password";
        using var factory = new StayPdfFactory
        {
            EnvironmentName = "Development",
            Extra =
            {
                ["JWT_SECRET"] = "dev-jwt-secret-must-be-32-chars-min!!",
                ["STAYPDF_TEST_EMAIL"] = email,
                ["STAYPDF_TEST_PASSWORD"] = password
            }
        };
        using var client = factory.CreateClient();
        var login = await client.PostAsJsonAsync("/api/auth/login", new { email, password });
        Assert.Equal(HttpStatusCode.OK, login.StatusCode);
        var me = await client.GetFromJsonAsync<MeDto>("/api/auth/me");
        Assert.NotNull(me);
        Assert.True(me!.IsPro);
        Assert.Equal(email, me.Email);

        using var form = PdfBytes.MergeForm();
        var job = await client.PostAsync("/api/jobs/merge", form);
        Assert.Equal(HttpStatusCode.OK, job.StatusCode);
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
