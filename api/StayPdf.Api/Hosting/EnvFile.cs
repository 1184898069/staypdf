namespace StayPdf.Api.Hosting;

internal static class EnvFile
{
    public static void LoadIfPresent()
    {
        foreach (var path in CandidatePaths())
        {
            if (File.Exists(path))
            {
                Apply(path);
                return;
            }
        }
    }

    private static IEnumerable<string> CandidatePaths()
    {
        var seen = new HashSet<string>(StringComparer.Ordinal);
        foreach (var start in new[]
                 {
                     Directory.GetCurrentDirectory(),
                     AppContext.BaseDirectory
                 })
        {
            var dir = new DirectoryInfo(start);
            while (dir is not null)
            {
                var path = Path.Combine(dir.FullName, ".env");
                if (seen.Add(path)) yield return path;
                dir = dir.Parent;
            }
        }
    }

    private static void Apply(string path)
    {
        foreach (var raw in File.ReadAllLines(path))
        {
            var line = raw.Trim();
            if (line.Length == 0 || line.StartsWith('#')) continue;
            var eq = line.IndexOf('=');
            if (eq <= 0) continue;
            var key = line[..eq].Trim();
            var value = line[(eq + 1)..].Trim();
            if (value.Length >= 2 &&
                ((value.StartsWith('"') && value.EndsWith('"')) ||
                 (value.StartsWith('\'') && value.EndsWith('\''))))
            {
                value = value[1..^1];
            }

            if (string.IsNullOrEmpty(key)) continue;
            if (!string.IsNullOrEmpty(Environment.GetEnvironmentVariable(key))) continue;
            Environment.SetEnvironmentVariable(key, value);
        }
    }
}
