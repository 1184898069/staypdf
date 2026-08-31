using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using StayPdf.Api.Data;

namespace StayPdf.Api.Hosting;

public static class DevSeed
{
    public static async Task ApplyAsync(AppDbContext db, IConfiguration config, IHostEnvironment env)
    {
        if (!env.IsDevelopment()) return;

        var email = (config["STAYPDF_TEST_EMAIL"] ?? Environment.GetEnvironmentVariable("STAYPDF_TEST_EMAIL") ?? "")
            .Trim()
            .ToLowerInvariant();
        var password = config["STAYPDF_TEST_PASSWORD"] ?? Environment.GetEnvironmentVariable("STAYPDF_TEST_PASSWORD") ?? "";
        if (string.IsNullOrWhiteSpace(email) || string.IsNullOrWhiteSpace(password))
        {
            throw new InvalidOperationException(
                "Development requires STAYPDF_TEST_EMAIL and STAYPDF_TEST_PASSWORD (set them in .env).");
        }

        var hasher = new PasswordHasher<User>();
        var user = await db.Users.Include(u => u.License).FirstOrDefaultAsync(u => u.Email == email);
        if (user is null)
        {
            user = new User
            {
                Id = Guid.NewGuid(),
                Email = email,
                CreatedAt = DateTimeOffset.UtcNow
            };
            user.PasswordHash = hasher.HashPassword(user, password);
            db.Users.Add(user);
        }
        else
        {
            user.PasswordHash = hasher.HashPassword(user, password);
        }

        if (user.License is null)
        {
            db.Licenses.Add(new License
            {
                Id = Guid.NewGuid(),
                UserId = user.Id,
                User = user,
                GrantedAt = DateTimeOffset.UtcNow
            });
        }

        await db.SaveChangesAsync();
    }
}
