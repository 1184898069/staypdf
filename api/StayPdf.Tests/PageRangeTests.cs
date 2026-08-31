using StayPdf.Api.Jobs;

namespace StayPdf.Tests;

public class PageRangeTests
{
    [Fact]
    public void Parses_mixed_ranges()
    {
        var r = PageRanges.Parse("1-3, 8-10", 12);
        Assert.True(r.Success);
        Assert.Equal(new[] { 1, 2, 3, 8, 9, 10 }, r.Pages);
    }

    [Fact]
    public void Rejects_out_of_range()
    {
        Assert.Equal("out-of-range", PageRanges.Parse("11", 10).Error);
    }
}
