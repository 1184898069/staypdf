using System.Net;
using System.Net.Http.Json;
using System.Text.Json;

namespace StayPdf.Tests;

public class PlanTests
{
    [Fact]
    public async Task Plan_endpoint_lists_requires_pro()
    {
        using var factory = new StayPdfFactory();
        using var client = factory.CreateClient();
        var res = await client.GetAsync("/api/plan");
        Assert.Equal(HttpStatusCode.OK, res.StatusCode);
        using var doc = JsonDocument.Parse(await res.Content.ReadAsStringAsync());
        var tools = doc.RootElement.GetProperty("tools");
        var map = tools.EnumerateArray().ToDictionary(
            t => t.GetProperty("id").GetString()!,
            t => t.GetProperty("requiresPro").GetBoolean());

        Assert.False(map["merge"]);
        Assert.False(map["split"]);
        Assert.False(map["rotate"]);
        Assert.False(map["delete"]);
        Assert.False(map["images"]);
        Assert.True(map["compress"]);
        Assert.True(map["ocr"]);
        Assert.True(map["word"]);
        Assert.True(map["watermark"]);
        Assert.True(map["pages"]);
        Assert.True(map["pdf-images"]);
        Assert.True(map["protect"]);

        var free = doc.RootElement.GetProperty("plans").GetProperty("free");
        Assert.Equal(3, free.GetProperty("dailyExports").GetInt32());
        Assert.Equal(15L * 1024 * 1024, free.GetProperty("maxFileBytes").GetInt64());
        Assert.Equal(10, free.GetProperty("maxFiles").GetInt32());

        var pro = doc.RootElement.GetProperty("plans").GetProperty("pro");
        Assert.Equal(JsonValueKind.Null, pro.GetProperty("dailyExports").ValueKind);
        Assert.Equal(40L * 1024 * 1024, pro.GetProperty("maxFileBytes").GetInt64());
        Assert.Equal(20, pro.GetProperty("maxFiles").GetInt32());
    }

    [Fact]
    public async Task Me_includes_plan_limits_and_tools()
    {
        using var factory = new StayPdfFactory();
        using var client = factory.CreateClient();
        var anon = await client.GetFromJsonAsync<JsonElement>("/api/auth/me");
        Assert.Equal("free", anon.GetProperty("plan").GetString());
        Assert.False(anon.GetProperty("isPro").GetBoolean());
        Assert.Equal(3, anon.GetProperty("limits").GetProperty("dailyExports").GetInt32());

        await AuthHelpers.SignInProAsync(factory, client, "plan.pro@example.com");
        var me = await client.GetFromJsonAsync<JsonElement>("/api/auth/me");
        Assert.Equal("pro", me.GetProperty("plan").GetString());
        Assert.True(me.GetProperty("isPro").GetBoolean());
        Assert.Equal(JsonValueKind.Null, me.GetProperty("limits").GetProperty("dailyExports").ValueKind);
        Assert.Equal(JsonValueKind.Null, me.GetProperty("remaining").ValueKind);
        var tools = me.GetProperty("tools").EnumerateArray()
            .ToDictionary(t => t.GetProperty("id").GetString()!, t => t.GetProperty("requiresPro").GetBoolean());
        Assert.True(tools["watermark"]);
        Assert.False(tools["merge"]);
    }
}
