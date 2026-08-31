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

    public static int PageCount(byte[] file)
    {
        using var doc = Open(file, PdfDocumentOpenMode.Import);
        return doc.PageCount;
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

    private static PdfDocument Open(byte[] bytes, PdfDocumentOpenMode mode)
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

    private static byte[] Save(PdfDocument doc)
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
