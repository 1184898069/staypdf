using System.Net;

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
        await AuthHelpers.SignInProAsync(factory, client, "pro.merge@example.com");

        for (var i = 0; i < 4; i++)
        {
            using var form = PdfBytes.MergeForm();
            var res = await client.PostAsync("/api/jobs/merge", form);
            Assert.Equal(HttpStatusCode.OK, res.StatusCode);
        }
    }
}
