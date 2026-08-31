namespace StayPdf.Api.Auth;

public sealed class AuthRateLimiter
{
    public const int MaxRegisterPerHour = 3;
    public const int MaxAuthPerHour = 10;

    private readonly object _gate = new();
    private readonly Dictionary<string, List<DateTimeOffset>> _register = new(StringComparer.Ordinal);
    private readonly Dictionary<string, List<DateTimeOffset>> _auth = new(StringComparer.Ordinal);

    public bool TryAuth(string ip, out int retryAfterSeconds) =>
        Try(_auth, ip, MaxAuthPerHour, out retryAfterSeconds);

    public bool TryRegister(string ip, out int retryAfterSeconds) =>
        Try(_register, ip, MaxRegisterPerHour, out retryAfterSeconds);

    public static string ClientIp(HttpContext ctx)
    {
        if (ctx.Request.Headers.TryGetValue("X-Forwarded-For", out var forwarded))
        {
            var first = forwarded.ToString().Split(',')[0].Trim();
            if (first.Length > 0) return first;
        }

        return ctx.Connection.RemoteIpAddress?.ToString() ?? "unknown";
    }

    private bool Try(Dictionary<string, List<DateTimeOffset>> buckets, string ip, int max, out int retryAfterSeconds)
    {
        var now = DateTimeOffset.UtcNow;
        var window = TimeSpan.FromHours(1);
        lock (_gate)
        {
            if (!buckets.TryGetValue(ip, out var list))
            {
                list = [];
                buckets[ip] = list;
            }

            list.RemoveAll(t => now - t >= window);
            if (list.Count >= max)
            {
                var oldest = list[0];
                retryAfterSeconds = Math.Max(1, (int)Math.Ceiling((oldest + window - now).TotalSeconds));
                return false;
            }

            list.Add(now);
            retryAfterSeconds = 0;
            return true;
        }
    }
}
