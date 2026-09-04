using PdfSharpCore.Pdf;
using PdfSharpCore.Pdf.IO;
using PdfSharpCore.Pdf.Security;

namespace StayPdf.Api.Jobs;

internal static class ProtectProcessor
{
    private const int MinLength = 4;
    private const int MaxLength = 72;

    public static byte[] Protect(byte[] file, string password)
    {
        var safe = Sanitize(password);
        if (safe is null)
        {
            throw new PdfException("need-password", "Set a password of 4–72 characters.");
        }

        using var src = PdfProcessor.Open(file, PdfDocumentOpenMode.Import);
        using var output = new PdfDocument();
        for (var i = 0; i < src.PageCount; i++)
        {
            output.AddPage(src.Pages[i]);
        }

        output.SecuritySettings.DocumentSecurityLevel = PdfDocumentSecurityLevel.Encrypted128Bit;
        output.SecuritySettings.UserPassword = safe;
        output.SecuritySettings.OwnerPassword = safe;
        return PdfProcessor.Save(output);
    }

    private static string? Sanitize(string password)
    {
        var raw = password ?? "";
        if (raw.Length < MinLength || raw.Length > MaxLength) return null;
        if (raw.Any(char.IsControl)) return null;
        return raw;
    }
}
