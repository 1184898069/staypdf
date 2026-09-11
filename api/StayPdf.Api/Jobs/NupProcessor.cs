using PdfSharpCore.Drawing;
using PdfSharpCore.Pdf;

namespace StayPdf.Api.Jobs;

internal static class NupProcessor
{
    private static readonly XSize A4 = new(595.28, 841.89);
    private const double Margin = 18;
    private const double Gap = 12;

    /// <summary>
    /// Place 2 or 4 source pages onto each output sheet (A4 landscape for 2-up, A4 for 4-up).
    /// Draws via XPdfForm so vector content is kept when PdfSharpCore can import the page.
    /// </summary>
    public static byte[] Impose(byte[] file, int perSheet)
    {
        if (perSheet is not (2 or 4))
        {
            throw new PdfException("failed", "Could not process this file.");
        }

        try
        {
            using var formMs = new MemoryStream(file, writable: false);
            using var form = XPdfForm.FromStream(formMs);
            var total = form.PageCount;
            if (total < 1)
            {
                throw new PdfException("failed", "Could not process this file.");
            }

            var cols = 2;
            var rows = perSheet == 2 ? 1 : 2;
            var landscape = perSheet == 2;
            var sheetW = landscape ? A4.Height : A4.Width;
            var sheetH = landscape ? A4.Width : A4.Height;
            var cellW = (sheetW - Margin * 2 - Gap * (cols - 1)) / cols;
            var cellH = (sheetH - Margin * 2 - Gap * (rows - 1)) / rows;

            using var output = new PdfDocument();
            for (var start = 0; start < total; start += perSheet)
            {
                var page = output.AddPage();
                page.Width = sheetW;
                page.Height = sheetH;
                using var gfx = XGraphics.FromPdfPage(page);
                for (var i = 0; i < perSheet && start + i < total; i++)
                {
                    var col = i % cols;
                    var row = i / cols;
                    form.PageNumber = start + i + 1;
                    var srcW = form.PointWidth;
                    var srcH = form.PointHeight;
                    if (srcW <= 0 || srcH <= 0) continue;
                    var scale = Math.Min(cellW / srcW, cellH / srcH);
                    var drawW = srcW * scale;
                    var drawH = srcH * scale;
                    var x = Margin + col * (cellW + Gap) + (cellW - drawW) / 2;
                    var y = Margin + row * (cellH + Gap) + (cellH - drawH) / 2;
                    gfx.DrawImage(form, x, y, drawW, drawH);
                }
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

    private static bool LooksEncrypted(Exception ex)
    {
        var msg = ex.Message ?? "";
        return msg.Contains("encrypt", StringComparison.OrdinalIgnoreCase)
               || msg.Contains("password", StringComparison.OrdinalIgnoreCase);
    }
}
