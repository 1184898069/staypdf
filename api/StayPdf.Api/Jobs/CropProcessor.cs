using PdfSharpCore.Drawing;
using PdfSharpCore.Pdf;

namespace StayPdf.Api.Jobs;

internal static class CropProcessor
{
    private static readonly int[] AllowedMm = [5, 10, 15, 20];
    private const double MinRemaining = 36;

    /// <summary>
    /// Trim the same margin (mm) from every side of every page.
    /// Draws via XPdfForm so vector content is kept when PdfSharpCore can import the page.
    /// </summary>
    public static byte[] Crop(byte[] file, int marginMm)
    {
        if (Array.IndexOf(AllowedMm, marginMm) < 0)
        {
            throw new PdfException("bad-margin", "Choose a margin of 5, 10, 15, or 20 mm.");
        }

        var marginPt = marginMm * 72.0 / 25.4;

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

                var outW = srcW - 2 * marginPt;
                var outH = srcH - 2 * marginPt;
                if (outW < MinRemaining || outH < MinRemaining)
                {
                    throw new PdfException("bad-margin", "Choose a margin of 5, 10, 15, or 20 mm.");
                }

                var page = output.AddPage();
                page.Width = outW;
                page.Height = outH;
                using var gfx = XGraphics.FromPdfPage(page);
                gfx.DrawImage(form, -marginPt, -marginPt, srcW, srcH);
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
