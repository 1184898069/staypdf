using System.Net.Http.Json;
using System.Text.Json.Serialization;

namespace StayPdf.Api.Auth;

public interface ITurnstileVerifier
{
    bool Required { get; }
    Task<bool> VerifyAsync(string? token, string ip, CancellationToken ct);
}

public sealed class TurnstileVerifier(HttpClient http, IConfiguration config) : ITurnstileVerifier
{
    private readonly string _secret =
        (config["TURNSTILE_SECRET"] ?? Environment.GetEnvironmentVariable("TURNSTILE_SECRET") ?? "").Trim();

    public bool Required => _secret.Length > 0;

    public async Task<bool> VerifyAsync(string? token, string ip, CancellationToken ct)
    {
        if (!Required) return true;
        if (string.IsNullOrWhiteSpace(token)) return false;

        using var content = new FormUrlEncodedContent(new Dictionary<string, string>
        {
            ["secret"] = _secret,
            ["response"] = token,
            ["remoteip"] = ip
        });
        try
        {
            using var res = await http.PostAsync("https://challenges.cloudflare.com/turnstile/v0/siteverify", content, ct);
            if (!res.IsSuccessStatusCode) return false;
            var body = await res.Content.ReadFromJsonAsync<SiteVerify>(ct);
            return body?.Success == true;
        }
        catch
        {
            return false;
        }
    }

    private sealed class SiteVerify
    {
        [JsonPropertyName("success")]
        public bool Success { get; set; }
    }
}
