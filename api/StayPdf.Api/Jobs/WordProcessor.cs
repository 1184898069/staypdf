using System.Text;
using DocumentFormat.OpenXml;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Wordprocessing;
using PdfSharpCore.Drawing;
using PdfSharpCore.Pdf;

namespace StayPdf.Api.Jobs;

internal static class WordProcessor
{
    public const string DocxMime = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";

    public static JobFile Convert(byte[] file, string? fileName, string? contentType)
    {
        if (LooksPdf(file, fileName, contentType))
        {
            _ = PdfProcessor.PageCount(file);
            var pages = PdfText.Pages(file);
            var docx = PdfToDocx(pages);
            return new JobFile(docx, DocxMime, "converted.docx");
        }

        if (LooksDocx(file, fileName, contentType))
        {
            var paragraphs = ReadDocxParagraphs(file);
            var pdf = DocxToPdf(paragraphs);
            return new JobFile(pdf, "application/pdf", "converted.pdf");
        }

        throw new PdfException("need-doc", "Add a PDF or Word file first.");
    }

    public static bool LooksPdf(byte[] file, string? fileName, string? contentType)
    {
        if (file.Length >= 5 && file[0] == (byte)'%' && file[1] == (byte)'P' && file[2] == (byte)'D' && file[3] == (byte)'F')
        {
            return true;
        }

        var type = contentType ?? "";
        if (type.Contains("pdf", StringComparison.OrdinalIgnoreCase)) return true;
        return (fileName ?? "").EndsWith(".pdf", StringComparison.OrdinalIgnoreCase);
    }

    public static bool LooksDocx(byte[] file, string? fileName, string? contentType)
    {
        if (file.Length >= 4 && file[0] == (byte)'P' && file[1] == (byte)'K')
        {
            return true;
        }

        var type = contentType ?? "";
        if (type.Contains("wordprocessingml", StringComparison.OrdinalIgnoreCase)
            || type.Contains("officedocument", StringComparison.OrdinalIgnoreCase))
        {
            return true;
        }

        return (fileName ?? "").EndsWith(".docx", StringComparison.OrdinalIgnoreCase);
    }

    private static byte[] PdfToDocx(IReadOnlyList<string> pages)
    {
        using var ms = new MemoryStream();
        using (var word = WordprocessingDocument.Create(ms, WordprocessingDocumentType.Document, true))
        {
            var main = word.AddMainDocumentPart();
            var body = new Body();
            for (var i = 0; i < pages.Count; i++)
            {
                if (i > 0)
                {
                    body.AppendChild(new Paragraph(new Run(new Break { Type = BreakValues.Page })));
                }

                var text = pages[i] ?? "";
                var chunks = text.Replace("\r\n", "\n").Replace('\r', '\n').Split('\n');
                if (chunks.Length == 0) chunks = [""];
                foreach (var line in chunks)
                {
                    body.AppendChild(new Paragraph(new Run(new Text(line)
                    {
                        Space = SpaceProcessingModeValues.Preserve
                    })));
                }
            }

            if (pages.Count == 0)
            {
                body.AppendChild(new Paragraph(new Run(new Text(""))));
            }

            main.Document = new Document(body);
            main.Document.Save();
        }

        return ms.ToArray();
    }

    private static List<string> ReadDocxParagraphs(byte[] file)
    {
        try
        {
            using var ms = new MemoryStream(file, writable: false);
            using var word = WordprocessingDocument.Open(ms, false);
            var body = word.MainDocumentPart?.Document?.Body;
            if (body is null) return [""];

            var lines = new List<string>();
            foreach (var child in body.ChildElements)
            {
                if (child is Paragraph para)
                {
                    lines.Add(para.InnerText ?? "");
                }
                else if (child is Table table)
                {
                    foreach (var row in table.Elements<TableRow>())
                    {
                        var cells = row.Elements<TableCell>().Select(c => (c.InnerText ?? "").Trim());
                        lines.Add(string.Join("\t", cells));
                    }
                }
            }

            return lines.Count == 0 ? [""] : lines;
        }
        catch (PdfException)
        {
            throw;
        }
        catch
        {
            throw new PdfException("need-doc", "Add a PDF or Word file first.");
        }
    }

    private static byte[] DocxToPdf(IReadOnlyList<string> paragraphs)
    {
        PdfFonts.Ensure();
        using var doc = new PdfDocument();
        const double margin = 50;
        var font = new XFont("DejaVu Sans", 11, XFontStyle.Regular);
        PdfPage? page = null;
        XGraphics? gfx = null;
        double y = margin;
        double lineHeight = 14;

        void NewPage()
        {
            gfx?.Dispose();
            page = doc.AddPage();
            page.Width = 595.28;
            page.Height = 841.89;
            gfx = XGraphics.FromPdfPage(page);
            y = margin;
            lineHeight = gfx.MeasureString("Ag", font).Height * 1.25;
        }

        NewPage();
        var maxWidth = page!.Width - margin * 2;

        foreach (var para in paragraphs)
        {
            var lines = Wrap(gfx!, font, para ?? "", maxWidth);
            if (lines.Count == 0) lines.Add("");
            foreach (var line in lines)
            {
                if (y + lineHeight > page.Height - margin)
                {
                    NewPage();
                    maxWidth = page.Width - margin * 2;
                }

                gfx!.DrawString(line, font, XBrushes.Black, new XRect(margin, y, maxWidth, lineHeight), XStringFormats.TopLeft);
                y += lineHeight;
            }

            y += lineHeight * 0.35;
        }

        gfx?.Dispose();
        using var output = new MemoryStream();
        doc.Save(output, false);
        return output.ToArray();
    }

    private static List<string> Wrap(XGraphics gfx, XFont font, string text, double maxWidth)
    {
        var result = new List<string>();
        if (string.IsNullOrEmpty(text))
        {
            result.Add("");
            return result;
        }

        var words = text.Split(' ');
        var current = new StringBuilder();
        foreach (var word in words)
        {
            var pieces = BreakLong(gfx, font, word, maxWidth);
            foreach (var piece in pieces)
            {
                var candidate = current.Length == 0 ? piece : current + " " + piece;
                if (gfx.MeasureString(candidate, font).Width <= maxWidth || current.Length == 0)
                {
                    current.Clear();
                    current.Append(candidate);
                }
                else
                {
                    result.Add(current.ToString());
                    current.Clear();
                    current.Append(piece);
                }
            }
        }

        if (current.Length > 0) result.Add(current.ToString());
        return result;
    }

    private static List<string> BreakLong(XGraphics gfx, XFont font, string word, double maxWidth)
    {
        if (word.Length == 0) return [""];
        if (gfx.MeasureString(word, font).Width <= maxWidth) return [word];

        var parts = new List<string>();
        var buf = new StringBuilder();
        foreach (var ch in word)
        {
            buf.Append(ch);
            if (gfx.MeasureString(buf.ToString(), font).Width > maxWidth && buf.Length > 1)
            {
                var last = buf[^1];
                buf.Length--;
                parts.Add(buf.ToString());
                buf.Clear();
                buf.Append(last);
            }
        }

        if (buf.Length > 0) parts.Add(buf.ToString());
        return parts;
    }
}
