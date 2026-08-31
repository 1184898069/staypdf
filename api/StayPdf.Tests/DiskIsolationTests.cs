using System.Net;
using System.Text;

namespace StayPdf.Tests;

public class DiskIsolationTests
{
    [Fact]
    public async Task Job_does_not_write_pdf_bytes_under_temp_dir()
    {
        using var factory = new StayPdfFactory();
        var scratch = factory.ScratchDir;
        Directory.CreateDirectory(scratch);
        var previous = new Dictionary<string, string?>
        {
            ["TMPDIR"] = Environment.GetEnvironmentVariable("TMPDIR"),
            ["TMP"] = Environment.GetEnvironmentVariable("TMP"),
            ["TEMP"] = Environment.GetEnvironmentVariable("TEMP")
        };
        Environment.SetEnvironmentVariable("TMPDIR", scratch);
        Environment.SetEnvironmentVariable("TMP", scratch);
        Environment.SetEnvironmentVariable("TEMP", scratch);
        try
        {
            using var client = factory.CreateClient();
            using var form = PdfBytes.MergeForm();
            var res = await client.PostAsync("/api/jobs/merge", form);
            Assert.Equal(HttpStatusCode.OK, res.StatusCode);
            var pdf = await res.Content.ReadAsByteArrayAsync();
            Assert.True(pdf.Length > 4);
            Assert.Equal("%PDF"u8.ToArray(), pdf.Take(4).ToArray());

            var leftovers = Directory.Exists(scratch)
                ? Directory.GetFiles(scratch, "*", SearchOption.AllDirectories)
                : [];
            Assert.DoesNotContain(leftovers, f => f.EndsWith(".pdf", StringComparison.OrdinalIgnoreCase));
            foreach (var path in leftovers)
            {
                Assert.False(LooksLikePdf(path), path);
            }
        }
        finally
        {
            foreach (var (k, v) in previous)
            {
                Environment.SetEnvironmentVariable(k, v);
            }
        }
    }

    private static bool LooksLikePdf(string path)
    {
        try
        {
            using var fs = File.OpenRead(path);
            Span<byte> buf = stackalloc byte[8];
            var n = fs.Read(buf);
            if (n >= 4 && buf[0] == (byte)'%' && buf[1] == (byte)'P' && buf[2] == (byte)'D' && buf[3] == (byte)'F')
            {
                return true;
            }

            fs.Position = 0;
            using var reader = new StreamReader(fs, Encoding.UTF8, detectEncodingFromByteOrderMarks: false, bufferSize: 4096, leaveOpen: true);
            var head = new char[256];
            var read = reader.Read(head);
            return new string(head, 0, read).Contains("%PDF", StringComparison.Ordinal);
        }
        catch
        {
            return false;
        }
    }
}
