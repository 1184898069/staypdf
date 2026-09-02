using PdfSharpCore.Drawing;
using PdfSharpCore.Pdf;
using PdfSharpCore.Pdf.IO;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Formats.Jpeg;

namespace StayPdf.Api.Jobs;

public static class PdfProcessor
{
    private static readonly XSize A4 = new(595.28, 841.89);
    private const double Margin = 36;

    public static byte[] Merge(IReadOnlyList<byte[]> files)
    {
        if (files.Count < 2) throw new PdfException("need-two", "Need at least two PDFs.");
        var sources = new List<PdfDocument>();
        try
        {
            using var output = new PdfDocument();
            foreach (var bytes in files)
            {
                var src = Open(bytes, PdfDocumentOpenMode.Import);
                sources.Add(src);
                for (var i = 0; i < src.PageCount; i++)
                {
                    output.AddPage(src.Pages[i]);
                }
            }

            return Save(output);
        }
        finally
        {
            foreach (var src in sources) src.Dispose();
        }
    }

    public static byte[] Split(byte[] file, IReadOnlyList<int> pages1)
    {
        if (pages1.Count == 0) throw new PdfException("bad-range", "Check the page list.");
        using var src = Open(file, PdfDocumentOpenMode.Import);
        EnsureInRange(pages1, src.PageCount);
        using var output = new PdfDocument();
        foreach (var n in pages1)
        {
            output.AddPage(src.Pages[n - 1]);
        }

        return Save(output);
    }

    public static byte[] Rotate(byte[] file, IReadOnlyList<int> pages1, int angle)
    {
        var turn = ((angle % 360) + 360) % 360;
        if (turn is not (0 or 90 or 180 or 270))
        {
            throw new PdfException("failed", "Could not process this file.");
        }

        using var doc = Open(file, PdfDocumentOpenMode.Modify);
        if (pages1.Count == 0)
        {
            pages1 = PageRanges.All(doc.PageCount);
        }

        EnsureInRange(pages1, doc.PageCount);
        foreach (var n in pages1)
        {
            var page = doc.Pages[n - 1];
            page.Rotate = (page.Rotate + turn) % 360;
        }

        return Save(doc);
    }

    public static byte[] Delete(byte[] file, IReadOnlyList<int> remove1)
    {
        if (remove1.Count == 0) throw new PdfException("bad-range", "Check the page list.");
        using var src = Open(file, PdfDocumentOpenMode.Import);
        EnsureInRange(remove1, src.PageCount);
        var keep = PageRanges.Invert(src.PageCount, remove1);
        if (keep.Count == 0) throw new PdfException("need-keep", "Keep at least one page.");
        using var output = new PdfDocument();
        foreach (var n in keep)
        {
            output.AddPage(src.Pages[n - 1]);
        }

        return Save(output);
    }

    public static byte[] ImagesToPdf(IReadOnlyList<byte[]> images, string fit)
    {
        if (images.Count == 0) throw new PdfException("need-image", "Add at least one image.");
        using var doc = new PdfDocument();
        foreach (var raw in images)
        {
            byte[] jpeg;
            try
            {
                jpeg = ToJpeg(raw);
            }
            catch
            {
                throw new PdfException("image", "Could not read an image.");
            }

            using var xImage = XImage.FromStream(() => new MemoryStream(jpeg, writable: false));
            var iw = xImage.PixelWidth;
            var ih = xImage.PixelHeight;
            if (iw < 1 || ih < 1)
            {
                throw new PdfException("image", "Could not read an image.");
            }

            PdfPage page;
            double destW, destH, x, y;
            if (string.Equals(fit, "original", StringComparison.OrdinalIgnoreCase))
            {
                var maxW = A4.Width - Margin * 2;
                var maxH = A4.Height - Margin * 2;
                var scale = Math.Min(1, Math.Min(maxW / iw, maxH / ih));
                destW = iw * scale;
                destH = ih * scale;
                page = doc.AddPage();
                page.Width = destW + Margin * 2;
                page.Height = destH + Margin * 2;
                x = Margin;
                y = Margin;
            }
            else
            {
                page = doc.AddPage();
                page.Width = A4.Width;
                page.Height = A4.Height;
                var boxW = A4.Width - Margin * 2;
                var boxH = A4.Height - Margin * 2;
                var scale = Math.Min(boxW / iw, boxH / ih);
                destW = iw * scale;
                destH = ih * scale;
                x = Margin + (boxW - destW) / 2;
                y = Margin + (boxH - destH) / 2;
            }

            using var gfx = XGraphics.FromPdfPage(page);
            gfx.DrawImage(xImage, x, y, destW, destH);
        }

        return Save(doc);
    }

    public static byte[] Compress(byte[] file, string? quality)
    {
        var (jpegQuality, dpi) = ParseQuality(quality);
        using var src = Open(file, PdfDocumentOpenMode.Import);
        if (src.PageCount < 1)
        {
            throw new PdfException("failed", "Could not process this file.");
        }

        var sizes = new List<(double W, double H)>(src.PageCount);
        for (var i = 0; i < src.PageCount; i++)
        {
            sizes.Add((src.Pages[i].Width, src.Pages[i].Height));
        }

        if (PdfRaster.TryRenderJpegs(file, dpi, jpegQuality, out var jpegs) && jpegs.Count > 0)
        {
            return PagesFromJpegs(jpegs, sizes);
        }

        var recompressed = RecompressEmbedded(file, jpegQuality, sizes);
        if (recompressed is not null)
        {
            return recompressed;
        }

        return CopyAll(src);
    }

    public static int PageCount(byte[] file)
    {
        using var doc = Open(file, PdfDocumentOpenMode.Import);
        return doc.PageCount;
    }

    private static (int JpegQuality, int Dpi) ParseQuality(string? quality)
    {
        var q = (quality ?? "medium").Trim().ToLowerInvariant();
        return q switch
        {
            "low" => (40, 96),
            "high" => (75, 144),
            _ => (58, 120)
        };
    }

    private static byte[] PagesFromJpegs(IReadOnlyList<byte[]> jpegs, IReadOnlyList<(double W, double H)> sizes)
    {
        using var doc = new PdfDocument();
        for (var i = 0; i < jpegs.Count; i++)
        {
            using var xImage = XImage.FromStream(() => new MemoryStream(jpegs[i], writable: false));
            var page = doc.AddPage();
            if (i < sizes.Count)
            {
                page.Width = sizes[i].W;
                page.Height = sizes[i].H;
            }
            else
            {
                page.Width = A4.Width;
                page.Height = A4.Height;
            }

            using var gfx = XGraphics.FromPdfPage(page);
            gfx.DrawImage(xImage, 0, 0, page.Width, page.Height);
        }

        return Save(doc);
    }

    private static byte[]? RecompressEmbedded(byte[] file, int jpegQuality, IReadOnlyList<(double W, double H)> sizes)
    {
        try
        {
            using var pig = UglyToad.PdfPig.PdfDocument.Open(file);
            if (pig.IsEncrypted)
            {
                throw new PdfException("encrypted", "This PDF is encrypted.");
            }

            var jpegs = new List<byte[]>();
            var pageIndex = 0;
            foreach (var page in pig.GetPages())
            {
                var images = page.GetImages().ToList();
                if (images.Count == 0) return null;
                var img = images.OrderByDescending(i => i.WidthInSamples * (long)i.HeightInSamples).First();
                byte[] raw;
                if (img.TryGetPng(out var png) && png is { Length: > 0 })
                {
                    raw = png;
                }
                else
                {
                    raw = img.RawBytes.ToArray();
                }

                try
                {
                    using var image = Image.Load(raw);
                    using var ms = new MemoryStream();
                    image.SaveAsJpeg(ms, new JpegEncoder { Quality = jpegQuality });
                    jpegs.Add(ms.ToArray());
                }
                catch
                {
                    return null;
                }

                pageIndex++;
            }

            return jpegs.Count == 0 ? null : PagesFromJpegs(jpegs, sizes);
        }
        catch (PdfException)
        {
            throw;
        }
        catch
        {
            return null;
        }
    }

    private static byte[] CopyAll(PdfDocument src)
    {
        using var output = new PdfDocument();
        for (var i = 0; i < src.PageCount; i++)
        {
            output.AddPage(src.Pages[i]);
        }

        return Save(output);
    }

    private static void EnsureInRange(IReadOnlyList<int> pages, int count)
    {
        foreach (var n in pages)
        {
            if (n < 1 || n > count)
            {
                throw new PdfException("out-of-range", "A page number is outside this file.");
            }
        }
    }

    internal static PdfDocument Open(byte[] bytes, PdfDocumentOpenMode mode)
    {
        try
        {
            return PdfReader.Open(new MemoryStream(bytes, writable: false), mode);
        }
        catch (Exception ex) when (LooksEncrypted(ex))
        {
            throw new PdfException("encrypted", "This PDF is encrypted.");
        }
        catch (PdfException)
        {
            throw;
        }
        catch
        {
            throw new PdfException("failed", "Could not process this file.");
        }
    }

    private static bool LooksEncrypted(Exception ex)
    {
        var msg = ex.Message ?? "";
        return msg.Contains("encrypt", StringComparison.OrdinalIgnoreCase)
               || msg.Contains("password", StringComparison.OrdinalIgnoreCase);
    }

    internal static byte[] Save(PdfDocument doc)
    {
        using var output = new MemoryStream();
        doc.Save(output, false);
        return output.ToArray();
    }

    private static byte[] ToJpeg(byte[] raw)
    {
        using var image = Image.Load(raw);
        using var ms = new MemoryStream();
        image.SaveAsJpeg(ms, new JpegEncoder { Quality = 90 });
        return ms.ToArray();
    }
}
