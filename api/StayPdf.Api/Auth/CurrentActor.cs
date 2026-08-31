using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.EntityFrameworkCore;
using StayPdf.Api.Data;

namespace StayPdf.Api.Auth;

public sealed record Actor(string SubjectId, bool IsPro, bool Authenticated, string? Email, Guid? UserId);

public static class CurrentActor
{
    public static async Task<Actor> ResolveAsync(HttpContext ctx, AppDbContext db, CancellationToken ct)
    {
        var deviceId = ctx.Items["DeviceId"] as string ?? "";
        var anonymous = new Actor(
            string.IsNullOrEmpty(deviceId) ? "device:unknown" : $"device:{deviceId}",
            false,
            false,
            null,
            null);

        var principal = ctx.User;
        if (principal.Identity?.IsAuthenticated == true)
        {
            var sub = principal.FindFirstValue(JwtRegisteredClaimNames.Sub)
                      ?? principal.FindFirstValue(ClaimTypes.NameIdentifier);
            if (Guid.TryParse(sub, out var userId))
            {
                var user = await db.Users
                    .AsNoTracking()
                    .Include(u => u.License)
                    .FirstOrDefaultAsync(u => u.Id == userId, ct);
                if (user is not null && user.EmailVerified)
                {
                    var isPro = user.License is not null;
                    return new Actor($"user:{user.Id:N}", isPro, true, user.Email, user.Id);
                }
            }
        }

        return anonymous;
    }
}
