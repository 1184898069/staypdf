using System.Net;
using System.Net.Http.Json;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using StayPdf.Api.Auth;
using StayPdf.Api.Data;

namespace StayPdf.Tests;

internal static class AuthHelpers
{
    public static bool HasSessionCookie(HttpResponseMessage res)
    {
        var cookies = new List<string>();
        if (res.Headers.TryGetValues("Set-Cookie", out var header)) cookies.AddRange(header);
        if (res.Content.Headers.TryGetValues("Set-Cookie", out var content)) cookies.AddRange(content);
        return cookies.Any(v => v.Contains("staypdf_session=", StringComparison.Ordinal));
    }

    public static string TokenFromUrl(string? url)
    {
        Assert.False(string.IsNullOrWhiteSpace(url));
        var marker = "token=";
        var i = url!.IndexOf(marker, StringComparison.Ordinal);
        Assert.True(i >= 0);
        return url[(i + marker.Length)..];
    }

    public static void UseIp(HttpClient client, string ip)
    {
        client.DefaultRequestHeaders.Remove("X-Forwarded-For");
        client.DefaultRequestHeaders.Add("X-Forwarded-For", ip);
    }

    public static Task SignInProAsync(StayPdfFactory factory, HttpClient client, string email = "pro.user@example.com") =>
        SignInAsync(factory, client, email, "a-strong-password1", pro: true);

    public static Task SignInFreeAsync(StayPdfFactory factory, HttpClient client, string email = "free.user@example.com") =>
        SignInAsync(factory, client, email, "a-strong-password1", pro: false);

    public static async Task SignInAsync(
        StayPdfFactory factory,
        HttpClient client,
        string email,
        string password,
        bool pro)
    {
        var register = await client.PostAsJsonAsync("/api/auth/register", new { email, password });
        Assert.Equal(HttpStatusCode.OK, register.StatusCode);

        string token;
        using (var scope = factory.Services.CreateScope())
        {
            var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
            var mail = scope.ServiceProvider.GetRequiredService<IEmailSender>();
            var user = await db.Users.SingleAsync(u => u.Email == email);
            if (pro)
            {
                db.Licenses.Add(new License
                {
                    Id = Guid.NewGuid(),
                    UserId = user.Id,
                    GrantedAt = DateTimeOffset.UtcNow
                });
                await db.SaveChangesAsync();
            }

            token = TokenFromUrl(mail.LastVerifyUrl);
        }

        var verify = await client.PostAsJsonAsync("/api/auth/verify", new { token });
        Assert.Equal(HttpStatusCode.OK, verify.StatusCode);

        var login = await client.PostAsJsonAsync("/api/auth/login", new { email, password });
        Assert.Equal(HttpStatusCode.OK, login.StatusCode);
        Assert.True(HasSessionCookie(login));
    }
}
