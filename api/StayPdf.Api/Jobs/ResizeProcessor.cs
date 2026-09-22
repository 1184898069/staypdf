using PdfSharpCore.Drawing;
using PdfSharpCore.Pdf;

namespace StayPdf.Api.Jobs;

internal static class ResizeProcessor
{
    private static readonly (string Id, double Width, double Height)[] Papers =
    [
        ("a4", 595.28, 841.89),
        ("letter", 612, 792)
    ];

    /// <summary>
    /// Fit every page onto the chosen paper size (portrait), preserving aspect ratio and centering
    /// with white margins. Draws via XPdfForm so vector content is kept when PdfSharpCore can import.
    /// </summary>
    public static byte[] Resize(byte[] file, string paper)
    {
        var size = ResolvePaper(paper);

        try
        {
            using var formMs = new MemoryStream(file, writable: false);
            using var form = XPdfForm.FromStream(formMs);
            var total = form.PageCount;
            if (total < 1)
            {
                throw new PdfException("failed", "Could not process this file.");
            }

            using var output = new PdfDocument();
            for (var i = 0; i < total; i++)
            {
                form.PageNumber = i + 1;
                var srcW = form.PointWidth;
                var srcH = form.PointHeight;
                if (srcW <= 0 || srcH <= 0)
                {
                    throw new PdfException("failed", "Could not process this file.");
                }

                var scale = Math.Min(size.Width / srcW, size.Height / srcH);
                var drawW = srcW * scale;
                var drawH = srcH * scale;
                var x = (size.Width - drawW) / 2;
                var y = (size.Height - drawH) / 2;

                var page = output.AddPage();
                page.Width = size.Width;
                page.Height = size.Height;
                using var gfx = XGraphics.FromPdfPage(page);
                gfx.DrawImage(form, x, y, drawW, drawH);
            }

            return PdfProcessor.Save(output);
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
            throw new PdfException("failed", "Could not process this file.");
        }
    }

    private static (double Width, double Height) ResolvePaper(string paper)
    {
        var key = (paper ?? "").Trim().ToLowerInvariant();
        if (string.IsNullOrEmpty(key)) key = "a4";
        foreach (var p in Papers)
        {
            if (p.Id == key) return (p.Width, p.Height);
        }

        throw new PdfException("bad-paper", "Choose a paper size of a4 or letter.");
    }

    private static bool LooksEncrypted(Exception ex)
    {
        var msg = ex.Message ?? "";
        return msg.Contains("encrypt", StringComparison.OrdinalIgnoreCase)
               || msg.Contains("password", StringComparison.OrdinalIgnoreCase);
    }
}
