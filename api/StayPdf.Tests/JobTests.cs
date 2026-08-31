using System.Net;
using System.Text;
using PdfSharpCore.Pdf.IO;
using UglyToad.PdfPig;

namespace StayPdf.Tests;

public class JobTests
{
    [Fact]
    public async Task Merge_returns_combined_pdf()
    {
        using var factory = new StayPdfFactory();
        using var client = factory.CreateClient();
        using var form = PdfBytes.MergeForm();
        var res = await client.PostAsync("/api/jobs/merge", form);
        Assert.Equal(HttpStatusCode.OK, res.StatusCode);
        var bytes = await res.Content.ReadAsByteArrayAsync();
        using var doc = PdfReader.Open(new MemoryStream(bytes), PdfDocumentOpenMode.Import);
        Assert.Equal(2, doc.PageCount);
    }

    [Fact]
    public async Task Split_extracts_requested_pages()
    {
        using var factory = new StayPdfFactory();
        using var client = factory.CreateClient();
        using var form = new MultipartFormDataContent();
        PdfBytes.AddPdf(form, PdfBytes.Pages(4), "doc.pdf");
        form.Add(new StringContent("2-3"), "ranges");
        var res = await client.PostAsync("/api/jobs/split", form);
        Assert.Equal(HttpStatusCode.OK, res.StatusCode);
        var bytes = await res.Content.ReadAsByteArrayAsync();
        using var doc = PdfReader.Open(new MemoryStream(bytes), PdfDocumentOpenMode.Import);
        Assert.Equal(2, doc.PageCount);
    }

    [Fact]
    public async Task Images_job_returns_pdf()
    {
        using var factory = new StayPdfFactory();
        using var client = factory.CreateClient();
        using var form = new MultipartFormDataContent();
        var jpeg = Convert.FromBase64String("/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIQAxAAAAGcP//EABQQAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQEAAT8Af//EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQMBAT8Af//EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQIBAT8Af//Z");
        var part = new ByteArrayContent(jpeg);
        part.Headers.ContentType = new System.Net.Http.Headers.MediaTypeHeaderValue("image/jpeg");
        form.Add(part, "files", "dot.jpg");
        form.Add(new StringContent("a4"), "fit");
        var res = await client.PostAsync("/api/jobs/images", form);
        Assert.Equal(HttpStatusCode.OK, res.StatusCode);
        var bytes = await res.Content.ReadAsByteArrayAsync();
        Assert.True(bytes.Length > 4);
        Assert.Equal((byte)37, bytes[0]);
        using var doc = PdfReader.Open(new MemoryStream(bytes), PdfDocumentOpenMode.Import);
        Assert.Equal(1, doc.PageCount);
    }

    [Fact]
    public async Task Compress_shrinks_image_pdf()
    {
        using var factory = new StayPdfFactory();
        using var client = factory.CreateClient();
        var original = PdfBytes.NoisyImagePdf();
        using var form = new MultipartFormDataContent();
        PdfBytes.AddPdf(form, original, "scan.pdf");
        form.Add(new StringContent("low"), "quality");
        var res = await client.PostAsync("/api/jobs/compress", form);
        Assert.Equal(HttpStatusCode.OK, res.StatusCode);
        Assert.Equal("application/pdf", res.Content.Headers.ContentType?.MediaType);
        var bytes = await res.Content.ReadAsByteArrayAsync();
        using var doc = PdfReader.Open(new MemoryStream(bytes), PdfDocumentOpenMode.Import);
        Assert.True(doc.PageCount >= 1);
        Assert.True(bytes.Length <= original.Length, $"compressed {bytes.Length} original {original.Length}");
    }

    [Fact]
    public async Task Ocr_extracts_text_from_digital_pdf()
    {
        using var factory = new StayPdfFactory();
        using var client = factory.CreateClient();
        const string phrase = "StayPDF OCR HELLO 42";
        using var form = new MultipartFormDataContent();
        PdfBytes.AddPdf(form, PdfBytes.Text(phrase), "note.pdf");
        form.Add(new StringContent("eng"), "lang");
        var res = await client.PostAsync("/api/jobs/ocr", form);
        Assert.Equal(HttpStatusCode.OK, res.StatusCode);
        var media = res.Content.Headers.ContentType?.MediaType;
        Assert.Equal("text/plain", media);
        var text = Encoding.UTF8.GetString(await res.Content.ReadAsByteArrayAsync());
        Assert.Contains(phrase, text);
    }

    [Fact]
    public async Task Word_pdf_to_docx_contains_text()
    {
        using var factory = new StayPdfFactory();
        using var client = factory.CreateClient();
        const string phrase = "StayPDF WORD HELLO 42";
        using var form = new MultipartFormDataContent();
        PdfBytes.AddPdf(form, PdfBytes.Text(phrase), "note.pdf");
        var res = await client.PostAsync("/api/jobs/word", form);
        Assert.Equal(HttpStatusCode.OK, res.StatusCode);
        var bytes = await res.Content.ReadAsByteArrayAsync();
        Assert.True(bytes.Length >= 4);
        Assert.Equal((byte)'P', bytes[0]);
        Assert.Equal((byte)'K', bytes[1]);
        var xml = PdfBytes.DocxDocumentXml(bytes);
        Assert.Contains(phrase, xml, StringComparison.Ordinal);
    }

    [Fact]
    public async Task Word_docx_to_pdf_contains_text()
    {
        using var factory = new StayPdfFactory();
        using var client = factory.CreateClient();
        const string phrase = "StayPDF WORD HELLO 42";
        using var form = new MultipartFormDataContent();
        PdfBytes.AddDocx(form, PdfBytes.TinyDocx(phrase), "note.docx");
        var res = await client.PostAsync("/api/jobs/word", form);
        Assert.Equal(HttpStatusCode.OK, res.StatusCode);
        var bytes = await res.Content.ReadAsByteArrayAsync();
        using var sharp = PdfReader.Open(new MemoryStream(bytes), PdfDocumentOpenMode.Import);
        Assert.True(sharp.PageCount >= 1);
        using var pig = PdfDocument.Open(bytes);
        var text = string.Join(" ", pig.GetPages().Select(p => p.Text));
        Assert.Contains(phrase, text, StringComparison.Ordinal);
    }
}
