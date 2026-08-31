using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Extensions.Hosting;

namespace StayPdf.Tests;

public class StayPdfFactory : WebApplicationFactory<Program>
{
    public string DbPath { get; } = Path.Combine(Path.GetTempPath(), $"staypdf-{Guid.NewGuid():N}.db");
    public string ScratchDir { get; } = Directory.CreateTempSubdirectory("staypdf-scratch").FullName;
    public string EnvironmentName { get; init; } = "Testing";
    public Dictionary<string, string?> Extra { get; init; } = [];
    private readonly Dictionary<string, string?> _previousEnv = [];
    private bool _envApplied;

    protected override IHost CreateHost(IHostBuilder builder)
    {
        ApplyEnv();
        return base.CreateHost(builder);
    }

    protected override void ConfigureWebHost(IWebHostBuilder builder)
    {
        ApplyEnv();
        builder.UseEnvironment(EnvironmentName);
    }

    private void ApplyEnv()
    {
        if (_envApplied) return;
        _envApplied = true;
        var jwt = Extra.TryGetValue("JWT_SECRET", out var js) ? js : "test-jwt-secret-must-be-32-chars-min!";
        var email = Extra.TryGetValue("STAYPDF_TEST_EMAIL", out var em) ? em : "";
        var password = Extra.TryGetValue("STAYPDF_TEST_PASSWORD", out var pw) ? pw : "";
        Set("JWT_SECRET", jwt);
        Set("STAYPDF_TEST_EMAIL", email);
        Set("STAYPDF_TEST_PASSWORD", password);
        Set("ConnectionStrings__Default", $"Data Source={DbPath}");
        Set("CORS_ORIGINS", "http://localhost:5173");
        Set("ASPNETCORE_ENVIRONMENT", EnvironmentName);
    }

    private void Set(string key, string? value)
    {
        _previousEnv[key] = Environment.GetEnvironmentVariable(key);
        Environment.SetEnvironmentVariable(key, value);
    }

    protected override void Dispose(bool disposing)
    {
        base.Dispose(disposing);
        foreach (var (k, v) in _previousEnv) Environment.SetEnvironmentVariable(k, v);
        try { if (File.Exists(DbPath)) File.Delete(DbPath); } catch { /* ignore */ }
        try { if (File.Exists(DbPath + "-wal")) File.Delete(DbPath + "-wal"); } catch { /* ignore */ }
        try { if (File.Exists(DbPath + "-shm")) File.Delete(DbPath + "-shm"); } catch { /* ignore */ }
        try { if (Directory.Exists(ScratchDir)) Directory.Delete(ScratchDir, true); } catch { /* ignore */ }
    }
}
