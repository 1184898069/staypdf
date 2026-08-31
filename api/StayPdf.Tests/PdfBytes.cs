using System.IO.Compression;
using System.Text;
using PdfSharpCore.Drawing;
using PdfSharpCore.Fonts;
using PdfSharpCore.Pdf;
using PdfSharpCore.Utils;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Formats.Jpeg;
using SixLabors.ImageSharp.PixelFormats;
using StayPdf.Api.Jobs;

namespace StayPdf.Tests;

internal static class PdfBytes
{
    public static byte[] Pages(int count)
    {
        using var doc = new PdfDocument();
        for (var i = 0; i < count; i++) doc.AddPage();
        using var ms = new MemoryStream();
        doc.Save(ms, false);
        return ms.ToArray();
    }

    public static byte[] Text(string phrase)
    {
        EnsureFonts();
        using var doc = new PdfDocument();
        var page = doc.AddPage();
        using var gfx = XGraphics.FromPdfPage(page);
        var font = new XFont("DejaVu Sans", 18, XFontStyle.Regular);
        gfx.DrawString(phrase, font, XBrushes.Black, new XRect(50, 80, page.Width - 100, 40), XStringFormats.TopLeft);
        using var ms = new MemoryStream();
        doc.Save(ms, false);
        return ms.ToArray();
    }

    public static byte[] NoisyImagePdf()
    {
        using var image = new Image<Rgb24>(1100, 1400);
        var rng = new Random(42);
        image.ProcessPixelRows(accessor =>
        {
            for (var y = 0; y < accessor.Height; y++)
            {
                var row = accessor.GetRowSpan(y);
                for (var x = 0; x < row.Length; x++)
                {
                    row[x] = new Rgb24((byte)rng.Next(256), (byte)rng.Next(256), (byte)rng.Next(256));
                }
            }
        });
        using var jpeg = new MemoryStream();
        image.SaveAsJpeg(jpeg, new JpegEncoder { Quality = 95 });
        return PdfProcessor.ImagesToPdf([jpeg.ToArray()], "original");
    }

    public static byte[] TinyDocx(string phrase)
    {
        using var ms = new MemoryStream();
        using (var zip = new ZipArchive(ms, ZipArchiveMode.Create, leaveOpen: true))
        {
            Write(zip, "[Content_Types].xml", """
                <?xml version="1.0" encoding="UTF-8" standalone="yes"?>
                <Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
                  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
                  <Default Extension="xml" ContentType="application/xml"/>
                  <Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
                </Types>
                """);
            Write(zip, "_rels/.rels", """
                <?xml version="1.0" encoding="UTF-8" standalone="yes"?>
                <Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
                  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
                </Relationships>
                """);
            Write(zip, "word/document.xml", $"""
                <?xml version="1.0" encoding="UTF-8" standalone="yes"?>
                <w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
                  <w:body>
                    <w:p><w:r><w:t>{phrase}</w:t></w:r></w:p>
                  </w:body>
                </w:document>
                """);
        }

        return ms.ToArray();
    }

    public static MultipartFormDataContent MergeForm()
    {
        var form = new MultipartFormDataContent();
        AddPdf(form, Pages(1), "a.pdf");
        AddPdf(form, Pages(1), "b.pdf");
        return form;
    }

    public static void AddPdf(MultipartFormDataContent form, byte[] bytes, string name)
    {
        var part = new ByteArrayContent(bytes);
        part.Headers.ContentType = new System.Net.Http.Headers.MediaTypeHeaderValue("application/pdf");
        form.Add(part, "files", name);
    }

    public static void AddDocx(MultipartFormDataContent form, byte[] bytes, string name)
    {
        var part = new ByteArrayContent(bytes);
        part.Headers.ContentType = new System.Net.Http.Headers.MediaTypeHeaderValue(
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document");
        form.Add(part, "files", name);
    }

    public static string DocxDocumentXml(byte[] bytes)
    {
        using var zip = new ZipArchive(new MemoryStream(bytes), ZipArchiveMode.Read);
        var entry = zip.GetEntry("word/document.xml");
        Assert.NotNull(entry);
        using var reader = new StreamReader(entry!.Open(), Encoding.UTF8);
        return reader.ReadToEnd();
    }

    private static void Write(ZipArchive zip, string name, string xml)
    {
        var entry = zip.CreateEntry(name, CompressionLevel.Fastest);
        using var stream = entry.Open();
        var bytes = Encoding.UTF8.GetBytes(xml.Trim());
        stream.Write(bytes);
    }

    private static void EnsureFonts()
    {
        try
        {
            if (GlobalFontSettings.FontResolver is null)
            {
                GlobalFontSettings.FontResolver = new FontResolver();
            }
        }
        catch (InvalidOperationException)
        {
            // already set
        }
    }
}
