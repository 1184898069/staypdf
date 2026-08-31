using System.Security.Cryptography;
using System.Text;
using Microsoft.EntityFrameworkCore;
using StayPdf.Api.Data;

namespace StayPdf.Api.Auth;

public static class DeviceIdentity
{
    public static string HashToken(string token)
    {
        var bytes = SHA256.HashData(Encoding.UTF8.GetBytes(token));
        return Convert.ToHexString(bytes).ToLowerInvariant();
    }

    public static string NewToken()
    {
        Span<byte> raw = stackalloc byte[32];
        RandomNumberGenerator.Fill(raw);
        return Convert.ToBase64String(raw).TrimEnd('=').Replace('+', '-').Replace('/', '_');
    }

    public static async Task<string> EnsureAsync(HttpContext ctx, AppDbContext db, bool production, CancellationToken ct)
    {
        ctx.Request.Cookies.TryGetValue(TokenService.DeviceCookieName, out var incoming);
        if (!string.IsNullOrEmpty(incoming))
        {
            var hashed = HashToken(incoming);
            var exists = await db.Devices.AsNoTracking().AnyAsync(d => d.Id == hashed, ct);
            if (exists)
            {
                return hashed;
            }
        }

        var token = NewToken();
        var id = HashToken(token);
        db.Devices.Add(new Device { Id = id, CreatedAt = DateTimeOffset.UtcNow });
        await db.SaveChangesAsync(ct);
        ctx.Response.Cookies.Append(TokenService.DeviceCookieName, token, TokenService.DeviceCookie(production));
        return id;
    }
}
