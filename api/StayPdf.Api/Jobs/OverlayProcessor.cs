using PdfSharpCore.Drawing;
using PdfSharpCore.Pdf;
using PdfSharpCore.Pdf.IO;

namespace StayPdf.Api.Jobs;

internal static class OverlayProcessor
{
    private delegate void Draw(XGraphics gfx, PdfPage page, int index, int total);

    public static byte[] Watermark(byte[] file, string text, double opacity)
    {
        PdfFonts.Ensure();
        var safe = Sanitize(text);
        if (string.IsNullOrEmpty(safe)) throw new PdfException("need-text", "Add watermark text.");
        var alpha = Math.Clamp(opacity, 0.1, 0.5);
        return Overlay(file, (gfx, page, _, _) => DrawWatermark(gfx, page, safe, alpha));
    }

    public static byte[] PageNumbers(byte[] file)
    {
        PdfFonts.Ensure();
        return Overlay(file, DrawPageNumber);
    }

    private static string Sanitize(string text)
    {
        var trimmed = (text ?? "").Trim();
        if (trimmed.Length > 80) trimmed = trimmed[..80];
        var chars = trimmed.Where(c => !char.IsControl(c)).ToArray();
        return new string(chars);
    }

    private static byte[] Overlay(byte[] file, Draw draw)
    {
        try
        {
            using var doc = PdfReader.Open(new MemoryStream(file, writable: false), PdfDocumentOpenMode.Modify);
            Apply(doc, draw);
            return PdfProcessor.Save(doc);
        }
        catch (PdfException)
        {
            throw;
        }
        catch (Exception ex) when (LooksEncrypted(ex))
        {
            throw new PdfException("encrypted", "This PDF is encrypted.");
        }
        catch
        {
            return OverlayRaster(file, draw);
        }
    }

    private static bool LooksEncrypted(Exception ex)
    {
        var msg = ex.Message ?? "";
        return msg.Contains("encrypt", StringComparison.OrdinalIgnoreCase)
               || msg.Contains("password", StringComparison.OrdinalIgnoreCase);
    }

    private static void Apply(PdfDocument doc, Draw draw)
    {
        var n = doc.PageCount;
        if (n < 1) throw new PdfException("failed", "Could not process this file.");
        for (var i = 0; i < n; i++)
        {
            var page = doc.Pages[i];
            using var gfx = XGraphics.FromPdfPage(page, XGraphicsPdfPageOptions.Append);
            draw(gfx, page, i, n);
        }
    }

    private static byte[] OverlayRaster(byte[] file, Draw draw)
    {
        var sizes = new List<(double W, double H)>();
        try
        {
            using var src = PdfReader.Open(new MemoryStream(file, writable: false), PdfDocumentOpenMode.Import);
            for (var i = 0; i < src.PageCount; i++)
            {
                sizes.Add((src.Pages[i].Width, src.Pages[i].Height));
            }
        }
        catch
        {
            sizes.Clear();
        }

        if (!PdfRaster.TryRenderPngs(file, 144, out var pngs) || pngs.Count == 0)
        {
            throw new PdfException("failed", "Could not process this file.");
        }

        using var doc = new PdfDocument();
        var n = pngs.Count;
        for (var i = 0; i < n; i++)
        {
            using var xImage = XImage.FromStream(() => new MemoryStream(pngs[i], writable: false));
            var page = doc.AddPage();
            if (i < sizes.Count)
            {
                page.Width = sizes[i].W;
                page.Height = sizes[i].H;
            }
            else
            {
                page.Width = xImage.PixelWidth * 72.0 / 144.0;
                page.Height = xImage.PixelHeight * 72.0 / 144.0;
            }

            using var gfx = XGraphics.FromPdfPage(page);
            gfx.DrawImage(xImage, 0, 0, page.Width, page.Height);
            draw(gfx, page, i, n);
        }

        return PdfProcessor.Save(doc);
    }

    private static void DrawWatermark(XGraphics gfx, PdfPage page, string text, double opacity)
    {
        var size = Math.Max(18, Math.Min(page.Width, page.Height) / 10);
        var font = new XFont("DejaVu Sans", size, XFontStyle.Bold);
        var alpha = (int)Math.Round(opacity * 255);
        var brush = new XSolidBrush(XColor.FromArgb(alpha, 110, 110, 110));
        gfx.TranslateTransform(page.Width / 2, page.Height / 2);
        gfx.RotateTransform(-45);
        gfx.DrawString(text, font, brush, new XPoint(0, 0), XStringFormats.Center);
    }

    private static void DrawPageNumber(XGraphics gfx, PdfPage page, int index, int total)
    {
        var font = new XFont("DejaVu Sans", 11, XFontStyle.Regular);
        var label = $"{index + 1} / {total}";
        var rect = new XRect(0, page.Height - 40, page.Width, 28);
        gfx.DrawString(label, font, XBrushes.Gray, rect, XStringFormats.Center);
    }
}
