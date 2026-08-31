namespace StayPdf.Api.Data;

public sealed class User
{
    public Guid Id { get; set; }
    public string Email { get; set; } = "";
    public string PasswordHash { get; set; } = "";
    public DateTimeOffset CreatedAt { get; set; }
    public License? License { get; set; }
}

public sealed class License
{
    public Guid Id { get; set; }
    public Guid UserId { get; set; }
    public User User { get; set; } = null!;
    public DateTimeOffset GrantedAt { get; set; }
}

public sealed class Device
{
    public string Id { get; set; } = "";
    public DateTimeOffset CreatedAt { get; set; }
}

public sealed class DailyExport
{
    public Guid Id { get; set; }
    public string SubjectId { get; set; } = "";
    public string UtcDay { get; set; } = "";
    public int Count { get; set; }
}
