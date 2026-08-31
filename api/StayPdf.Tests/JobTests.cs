using System.Net;
using PdfSharpCore.Pdf.IO;

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
}
