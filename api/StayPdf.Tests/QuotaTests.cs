using System.Net;
using System.Net.Http.Json;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using StayPdf.Api.Data;

namespace StayPdf.Tests;

public class QuotaTests
{
    [Fact]
    public async Task Fourth_anonymous_export_returns_402()
    {
        using var factory = new StayPdfFactory();
        using var client = factory.CreateClient();

        for (var i = 0; i < 3; i++)
        {
            using var form = PdfBytes.MergeForm();
            var ok = await client.PostAsync("/api/jobs/merge", form);
            Assert.Equal(HttpStatusCode.OK, ok.StatusCode);
            Assert.Equal("application/pdf", ok.Content.Headers.ContentType?.MediaType);
        }

        using var blockedForm = PdfBytes.MergeForm();
        var blocked = await client.PostAsync("/api/jobs/merge", blockedForm);
        Assert.Equal(HttpStatusCode.PaymentRequired, blocked.StatusCode);
        var body = await blocked.Content.ReadAsStringAsync();
        Assert.Contains("current plan", body, StringComparison.OrdinalIgnoreCase);
        Assert.DoesNotContain("%PDF", body, StringComparison.Ordinal);
    }

    [Fact]
    public async Task Pro_user_can_export_after_three()
    {
        using var factory = new StayPdfFactory();
        using var client = factory.CreateClient();

        var register = await client.PostAsJsonAsync("/api/auth/register", new
        {
            email = "pro.user@example.com",
            password = "a-strong-password"
        });
        Assert.Equal(HttpStatusCode.OK, register.StatusCode);

        using (var scope = factory.Services.CreateScope())
        {
            var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
            var user = await db.Users.SingleAsync(u => u.Email == "pro.user@example.com");
            db.Licenses.Add(new License
            {
                Id = Guid.NewGuid(),
                UserId = user.Id,
                GrantedAt = DateTimeOffset.UtcNow
            });
            await db.SaveChangesAsync();
        }

        var login = await client.PostAsJsonAsync("/api/auth/login", new
        {
            email = "pro.user@example.com",
            password = "a-strong-password"
        });
        Assert.Equal(HttpStatusCode.OK, login.StatusCode);

        for (var i = 0; i < 4; i++)
        {
            using var form = PdfBytes.MergeForm();
            var res = await client.PostAsync("/api/jobs/merge", form);
            Assert.Equal(HttpStatusCode.OK, res.StatusCode);
        }
    }
}
