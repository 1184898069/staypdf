namespace StayPdf.Api.Jobs;

public sealed record ToolDef(string Id, bool RequiresPro);

public sealed record PlanDef(int? DailyExports, long MaxFileBytes, int MaxFiles);

public static class PlanLimits
{
    public static readonly PlanDef Free = new(3, 15L * 1024 * 1024, 10);
    public static readonly PlanDef Pro = new(null, 40L * 1024 * 1024, 20);

    public static PlanDef For(bool isPro) => isPro ? Pro : Free;

    public static long MaxRequestBodyBytes => Pro.MaxFileBytes * Pro.MaxFiles + 1_048_576;
}

public static class ToolCatalog
{
    public static readonly IReadOnlyList<ToolDef> Tools =
    [
        new("merge", false),
        new("split", false),
        new("rotate", false),
        new("delete", false),
        new("images", false),
        new("compress", true),
        new("ocr", true),
        new("word", true),
        new("watermark", true),
        new("pages", true),
        new("pdf-images", true)
    ];

    public static ToolDef Get(string id)
    {
        foreach (var tool in Tools)
        {
            if (string.Equals(tool.Id, id, StringComparison.Ordinal)) return tool;
        }

        throw new InvalidOperationException($"Unknown tool '{id}'.");
    }

    public static object Snapshot() => new
    {
        plans = new
        {
            free = LimitsJson(PlanLimits.Free),
            pro = LimitsJson(PlanLimits.Pro)
        },
        tools = ToolsJson()
    };

    public static object ToolsJson() =>
        Tools.Select(t => new { id = t.Id, requiresPro = t.RequiresPro }).ToArray();

    public static object LimitsJson(bool isPro) => LimitsJson(PlanLimits.For(isPro));

    public static object LimitsJson(PlanDef plan) => new
    {
        dailyExports = plan.DailyExports,
        maxFileBytes = plan.MaxFileBytes,
        maxFiles = plan.MaxFiles
    };
}
