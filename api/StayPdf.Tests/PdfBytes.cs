using PdfSharpCore.Pdf;

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
}
