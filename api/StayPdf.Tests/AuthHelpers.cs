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
}
