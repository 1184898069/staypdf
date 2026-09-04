using PdfSharpCore.Pdf;
using PdfSharpCore.Pdf.IO;

namespace StayPdf.Api.Jobs;

internal static class UnlockProcessor
{
    private const int MinLength = 1;
    private const int MaxLength = 72;

    public static byte[] Unlock(byte[] file, string password)
    {
        var safe = Sanitize(password);
        if (safe is null)
        {
            throw new PdfException("need-password", "Enter the PDF password (1–72 characters).");
        }

        using var src = OpenWithPassword(file, safe);
        using var output = new PdfDocument();
        for (var i = 0; i < src.PageCount; i++)
        {
            output.AddPage(src.Pages[i]);
        }

        return PdfProcessor.Save(output);
    }

    private static PdfDocument OpenWithPassword(byte[] bytes, string password)
    {
        try
        {
            return PdfReader.Open(new MemoryStream(bytes, writable: false), password, PdfDocumentOpenMode.Import);
        }
        catch (PdfException)
        {
            throw;
        }
        catch (Exception ex) when (LooksBadPassword(ex))
        {
            throw new PdfException("bad-password", "Wrong password for this PDF.");
        }
        catch
        {
            throw new PdfException("failed", "Could not process this file.");
        }
    }

    private static bool LooksBadPassword(Exception ex)
    {
        var msg = ex.Message ?? "";
        return msg.Contains("password", StringComparison.OrdinalIgnoreCase)
               || msg.Contains("encrypt", StringComparison.OrdinalIgnoreCase);
    }

    private static string? Sanitize(string password)
    {
        var raw = password ?? "";
        if (raw.Length < MinLength || raw.Length > MaxLength) return null;
        if (raw.Any(char.IsControl)) return null;
        return raw;
    }
}
