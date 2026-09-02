using System.IO.Compression;
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

    [Theory]
    [InlineData("compress")]
    [InlineData("ocr")]
    [InlineData("word")]
    [InlineData("watermark")]
    [InlineData("pages")]
    [InlineData("pdf-images")]
    public async Task Anonymous_pro_tool_returns_402(string tool)
    {
        using var factory = new StayPdfFactory();
        using var client = factory.CreateClient();
        using var form = new MultipartFormDataContent();
        PdfBytes.AddPdf(form, PdfBytes.Pages(1), "doc.pdf");
        if (tool == "watermark") form.Add(new StringContent("CONFIDENTIAL"), "text");
        var res = await client.PostAsync($"/api/jobs/{tool}", form);
        Assert.Equal(HttpStatusCode.PaymentRequired, res.StatusCode);
        var body = await res.Content.ReadAsStringAsync();
        Assert.Contains("plan", body, StringComparison.OrdinalIgnoreCase);
        Assert.DoesNotContain("%PDF", body, StringComparison.Ordinal);
        Assert.DoesNotContain("PK", body, StringComparison.Ordinal);
    }

    [Fact]
    public async Task Free_verified_user_is_402_on_compress()
    {
        using var factory = new StayPdfFactory();
        using var client = factory.CreateClient();
        await AuthHelpers.SignInFreeAsync(factory, client, "free.compress@example.com");
        using var form = new MultipartFormDataContent();
        PdfBytes.AddPdf(form, PdfBytes.Pages(1), "doc.pdf");
        var res = await client.PostAsync("/api/jobs/compress", form);
        Assert.Equal(HttpStatusCode.PaymentRequired, res.StatusCode);
        var body = await res.Content.ReadAsStringAsync();
        Assert.Contains("\"code\":\"plan\"", body, StringComparison.Ordinal);
        Assert.DoesNotContain("%PDF", body, StringComparison.Ordinal);
    }

    [Fact]
    public async Task Pro_tool_402_does_not_consume_quota()
    {
        using var factory = new StayPdfFactory();
        using var client = factory.CreateClient();
        using (var form = new MultipartFormDataContent())
        {
            PdfBytes.AddPdf(form, PdfBytes.Pages(1), "doc.pdf");
            var blocked = await client.PostAsync("/api/jobs/compress", form);
            Assert.Equal(HttpStatusCode.PaymentRequired, blocked.StatusCode);
        }

        for (var i = 0; i < 3; i++)
        {
            using var form = PdfBytes.MergeForm();
            var ok = await client.PostAsync("/api/jobs/merge", form);
            Assert.Equal(HttpStatusCode.OK, ok.StatusCode);
        }
    }

    [Fact]
    public async Task Pro_user_can_run_pro_tools()
    {
        using var factory = new StayPdfFactory();
        using var client = factory.CreateClient();
        await AuthHelpers.SignInProAsync(factory, client, "pro.tools@example.com");

        var original = PdfBytes.NoisyImagePdf();
        using (var form = new MultipartFormDataContent())
        {
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

        const string phrase = "StayPDF OCR HELLO 42";
        using (var form = new MultipartFormDataContent())
        {
            PdfBytes.AddPdf(form, PdfBytes.Text(phrase), "note.pdf");
            form.Add(new StringContent("eng"), "lang");
            var res = await client.PostAsync("/api/jobs/ocr", form);
            Assert.Equal(HttpStatusCode.OK, res.StatusCode);
            Assert.Equal("text/plain", res.Content.Headers.ContentType?.MediaType);
            var text = Encoding.UTF8.GetString(await res.Content.ReadAsByteArrayAsync());
            Assert.Contains(phrase, text);
        }

        using (var form = new MultipartFormDataContent())
        {
            PdfBytes.AddPdf(form, PdfBytes.Text("StayPDF WORD HELLO 42"), "note.pdf");
            var res = await client.PostAsync("/api/jobs/word", form);
            Assert.Equal(HttpStatusCode.OK, res.StatusCode);
            var bytes = await res.Content.ReadAsByteArrayAsync();
            Assert.True(bytes.Length >= 4);
            Assert.Equal((byte)'P', bytes[0]);
            Assert.Equal((byte)'K', bytes[1]);
            var xml = PdfBytes.DocxDocumentXml(bytes);
            Assert.Contains("StayPDF WORD HELLO 42", xml, StringComparison.Ordinal);
        }

        using (var form = new MultipartFormDataContent())
        {
            PdfBytes.AddDocx(form, PdfBytes.TinyDocx("StayPDF WORD HELLO 42"), "note.docx");
            var res = await client.PostAsync("/api/jobs/word", form);
            Assert.Equal(HttpStatusCode.OK, res.StatusCode);
            var bytes = await res.Content.ReadAsByteArrayAsync();
            using var sharp = PdfReader.Open(new MemoryStream(bytes), PdfDocumentOpenMode.Import);
            Assert.True(sharp.PageCount >= 1);
            using var pig = PdfDocument.Open(bytes);
            var text = string.Join(" ", pig.GetPages().Select(p => p.Text));
            Assert.Contains("StayPDF WORD HELLO 42", text, StringComparison.Ordinal);
        }

        using (var form = new MultipartFormDataContent())
        {
            PdfBytes.AddPdf(form, PdfBytes.Pages(3), "doc.pdf");
            form.Add(new StringContent("CONFIDENTIAL"), "text");
            var res = await client.PostAsync("/api/jobs/watermark", form);
            Assert.Equal(HttpStatusCode.OK, res.StatusCode);
            var bytes = await res.Content.ReadAsByteArrayAsync();
            using var doc = PdfReader.Open(new MemoryStream(bytes), PdfDocumentOpenMode.Import);
            Assert.Equal(3, doc.PageCount);
        }

        using (var form = new MultipartFormDataContent())
        {
            PdfBytes.AddPdf(form, PdfBytes.Pages(2), "doc.pdf");
            var res = await client.PostAsync("/api/jobs/pages", form);
            Assert.Equal(HttpStatusCode.OK, res.StatusCode);
            var bytes = await res.Content.ReadAsByteArrayAsync();
            using var doc = PdfReader.Open(new MemoryStream(bytes), PdfDocumentOpenMode.Import);
            Assert.Equal(2, doc.PageCount);
        }

        using (var form = new MultipartFormDataContent())
        {
            PdfBytes.AddPdf(form, PdfBytes.Pages(2), "doc.pdf");
            var res = await client.PostAsync("/api/jobs/pdf-images", form);
            Assert.Equal(HttpStatusCode.OK, res.StatusCode);
            Assert.Equal("application/zip", res.Content.Headers.ContentType?.MediaType);
            var bytes = await res.Content.ReadAsByteArrayAsync();
            Assert.True(bytes.Length >= 4);
            Assert.Equal((byte)'P', bytes[0]);
            Assert.Equal((byte)'K', bytes[1]);
            using var zip = new ZipArchive(new MemoryStream(bytes), ZipArchiveMode.Read);
            Assert.True(zip.Entries.Count >= 1);
            Assert.Contains(zip.Entries, e => e.Name.EndsWith(".png", StringComparison.OrdinalIgnoreCase));
        }
    }
}
