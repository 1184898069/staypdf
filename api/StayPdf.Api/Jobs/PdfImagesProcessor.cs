using System.IO.Compression;

namespace StayPdf.Api.Jobs;

internal static class PdfImagesProcessor
{
    public static byte[] ZipPngs(byte[] file)
    {
        if (!PdfRaster.TryRenderPngs(file, 144, out var pngs) || pngs.Count == 0)
        {
            throw new PdfException("failed", "Could not process this file.");
        }

        using var output = new MemoryStream();
        using (var zip = new ZipArchive(output, ZipArchiveMode.Create, leaveOpen: true))
        {
            for (var i = 0; i < pngs.Count; i++)
            {
                var entry = zip.CreateEntry($"page-{i + 1}.png", CompressionLevel.Fastest);
                using var stream = entry.Open();
                stream.Write(pngs[i], 0, pngs[i].Length);
            }
        }

        return output.ToArray();
    }
}
