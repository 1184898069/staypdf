using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using StayPdf.Api.Data;

namespace StayPdf.Api.Auth;

public sealed class TokenService(IConfiguration config)
{
    public const string CookieName = "staypdf_session";
    public const string DeviceCookieName = "staypdf_device";

    public string Issue(User user, bool isPro)
    {
        var secret = Environment.GetEnvironmentVariable("JWT_SECRET") ?? config["JWT_SECRET"] ?? "";
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secret));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
        var claims = new List<Claim>
        {
            new(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
            new(JwtRegisteredClaimNames.Email, user.Email),
            new("pro", isPro ? "1" : "0")
        };
        var token = new JwtSecurityToken(
            issuer: "staypdf",
            audience: "staypdf",
            claims: claims,
            expires: DateTime.UtcNow.AddDays(7),
            signingCredentials: creds);
        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    public static CookieOptions SessionCookie(bool production) => new()
    {
        HttpOnly = true,
        IsEssential = true,
        SameSite = SameSiteMode.Lax,
        Secure = production,
        Path = "/",
        Expires = DateTimeOffset.UtcNow.AddDays(7)
    };

    public static CookieOptions DeviceCookie(bool production) => new()
    {
        HttpOnly = true,
        IsEssential = true,
        SameSite = SameSiteMode.Lax,
        Secure = production,
        Path = "/",
        Expires = DateTimeOffset.UtcNow.AddYears(1)
    };
}
