using System.Text;
using UglyToad.PdfPig;

namespace StayPdf.Api.Jobs;

internal static class PdfText
{
    public static List<string> Pages(byte[] pdf)
    {
        try
        {
            using var doc = PdfDocument.Open(pdf);
            if (doc.IsEncrypted)
            {
                throw new PdfException("encrypted", "This PDF is encrypted.");
            }

            var pages = new List<string>(doc.NumberOfPages);
            foreach (var page in doc.GetPages())
            {
                pages.Add(page.Text ?? "");
            }

            return pages;
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

    public static string Join(IReadOnlyList<string> pages)
    {
        var sb = new StringBuilder();
        foreach (var page in pages)
        {
            if (sb.Length > 0) sb.Append("\n\n");
            sb.Append(page);
        }

        return sb.ToString();
    }

    public static int LetterCount(string text)
    {
        var n = 0;
        foreach (var c in text)
        {
            if (char.IsLetterOrDigit(c)) n++;
        }

        return n;
    }

    private static bool LooksEncrypted(Exception ex)
    {
        var type = ex.GetType().Name;
        if (type.Contains("Encrypt", StringComparison.OrdinalIgnoreCase)) return true;
        var msg = ex.Message ?? "";
        return msg.Contains("encrypt", StringComparison.OrdinalIgnoreCase)
               || msg.Contains("password", StringComparison.OrdinalIgnoreCase);
    }
}
