using PDFtoImage;
using SkiaSharp;

namespace StayPdf.Api.Jobs;

internal static class PdfRaster
{
    private static readonly object Gate = new();

    public static bool TryRenderJpegs(byte[] pdf, int dpi, int jpegQuality, out List<byte[]> jpegs)
    {
        jpegs = [];
        try
        {
            lock (Gate)
            {
                var options = new RenderOptions(Dpi: dpi);
                foreach (var bitmap in Conversion.ToImages(pdf, options: options))
                {
                    using (bitmap)
                    using (var encoded = bitmap.Encode(SKEncodedImageFormat.Jpeg, jpegQuality))
                    {
                        if (encoded is null) return false;
                        jpegs.Add(encoded.ToArray());
                    }
                }
            }

            return jpegs.Count > 0;
        }
        catch (Exception ex) when (LooksEncrypted(ex))
        {
            throw new PdfException("encrypted", "This PDF is encrypted.");
        }
        catch
        {
            jpegs = [];
            return false;
        }
    }

    public static bool TryRenderPngs(byte[] pdf, int dpi, out List<byte[]> pngs)
    {
        pngs = [];
        try
        {
            lock (Gate)
            {
                var options = new RenderOptions(Dpi: dpi);
                foreach (var bitmap in Conversion.ToImages(pdf, options: options))
                {
                    using (bitmap)
                    using (var encoded = bitmap.Encode(SKEncodedImageFormat.Png, 100))
                    {
                        if (encoded is null) return false;
                        pngs.Add(encoded.ToArray());
                    }
                }
            }

            return pngs.Count > 0;
        }
        catch (Exception ex) when (LooksEncrypted(ex))
        {
            throw new PdfException("encrypted", "This PDF is encrypted.");
        }
        catch
        {
            pngs = [];
            return false;
        }
    }

    private static bool LooksEncrypted(Exception ex)
    {
        var msg = ex.Message ?? "";
        return msg.Contains("encrypt", StringComparison.OrdinalIgnoreCase)
               || msg.Contains("password", StringComparison.OrdinalIgnoreCase);
    }
}
