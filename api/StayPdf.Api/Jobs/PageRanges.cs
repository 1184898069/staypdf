using System.Text.RegularExpressions;

namespace StayPdf.Api.Jobs;

public static class PageRanges
{
    private static readonly Regex Range = new(@"^(\d+)\s*[-–—~～]\s*(\d+)$", RegexOptions.Compiled);
    private static readonly Regex Single = new(@"^(\d+)$", RegexOptions.Compiled);

    public static RangeResult Parse(string? input, int pageCount)
    {
        if (string.IsNullOrWhiteSpace(input))
        {
            return RangeResult.Fail("empty");
        }

        if (pageCount < 1)
        {
            return RangeResult.Fail("bad-count");
        }

        var parts = input.Split([',', '，'], StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries);
        if (parts.Length == 0)
        {
            return RangeResult.Fail("empty");
        }

        var pages = new List<int>();
        var seen = new HashSet<int>();
        foreach (var part in parts)
        {
            var token = part.Trim();
            var range = Range.Match(token);
            var single = Single.Match(token);
            if (range.Success)
            {
                var a = int.Parse(range.Groups[1].Value);
                var b = int.Parse(range.Groups[2].Value);
                if (a > b) (a, b) = (b, a);
                if (a < 1 || b > pageCount) return RangeResult.Fail("out-of-range");
                for (var n = a; n <= b; n++)
                {
                    if (seen.Add(n)) pages.Add(n);
                }
            }
            else if (single.Success)
            {
                var n = int.Parse(single.Groups[1].Value);
                if (n < 1 || n > pageCount) return RangeResult.Fail("out-of-range");
                if (seen.Add(n)) pages.Add(n);
            }
            else
            {
                return RangeResult.Fail("invalid");
            }
        }

        return pages.Count == 0 ? RangeResult.Fail("empty") : RangeResult.Ok(pages);
    }

    public static List<int> All(int pageCount) =>
        Enumerable.Range(1, Math.Max(0, pageCount)).ToList();

    public static List<int> Invert(int pageCount, IReadOnlyCollection<int> remove)
    {
        var drop = remove.ToHashSet();
        var keep = new List<int>();
        for (var n = 1; n <= pageCount; n++)
        {
            if (!drop.Contains(n)) keep.Add(n);
        }

        return keep;
    }
}

public readonly record struct RangeResult(bool Success, List<int> Pages, string? Error)
{
    public static RangeResult Ok(List<int> pages) => new(true, pages, null);
    public static RangeResult Fail(string error) => new(false, [], error);
}
