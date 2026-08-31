using Microsoft.EntityFrameworkCore;

namespace StayPdf.Api.Data;

public sealed class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<User> Users => Set<User>();
    public DbSet<License> Licenses => Set<License>();
    public DbSet<Device> Devices => Set<Device>();
    public DbSet<DailyExport> DailyExports => Set<DailyExport>();
    public DbSet<EmailVerificationToken> EmailVerificationTokens => Set<EmailVerificationToken>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<User>(e =>
        {
            e.HasKey(x => x.Id);
            e.HasIndex(x => x.Email).IsUnique();
            e.Property(x => x.Email).HasMaxLength(320).IsRequired();
            e.Property(x => x.PasswordHash).IsRequired();
            e.HasOne(x => x.License)
                .WithOne(x => x.User)
                .HasForeignKey<License>(x => x.UserId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        modelBuilder.Entity<License>(e =>
        {
            e.HasKey(x => x.Id);
            e.HasIndex(x => x.UserId).IsUnique();
        });

        modelBuilder.Entity<Device>(e =>
        {
            e.HasKey(x => x.Id);
            e.Property(x => x.Id).HasMaxLength(64);
        });

        modelBuilder.Entity<DailyExport>(e =>
        {
            e.HasKey(x => x.Id);
            e.Property(x => x.SubjectId).HasMaxLength(80).IsRequired();
            e.Property(x => x.UtcDay).HasMaxLength(10).IsRequired();
            e.HasIndex(x => new { x.SubjectId, x.UtcDay }).IsUnique();
        });

        modelBuilder.Entity<EmailVerificationToken>(e =>
        {
            e.HasKey(x => x.Id);
            e.Property(x => x.TokenHash).HasMaxLength(64).IsRequired();
            e.HasIndex(x => x.TokenHash);
            e.HasIndex(x => x.UserId);
            e.HasOne(x => x.User)
                .WithMany()
                .HasForeignKey(x => x.UserId)
                .OnDelete(DeleteBehavior.Cascade);
        });
    }
}
