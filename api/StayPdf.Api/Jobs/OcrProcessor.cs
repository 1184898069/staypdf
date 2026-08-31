using System.Diagnostics;
using System.Text;

namespace StayPdf.Api.Jobs;

public static class OcrProcessor
{
    private const int SubstantialLetters = 16;
    private static readonly object TessGate = new();
    private static HashSet<string>? _tessLangs;
    private static bool _tessProbed;

    public static byte[] ToText(byte[] pdf, string? lang)
    {
        _ = PdfProcessor.PageCount(pdf);
        var pages = PdfText.Pages(pdf);
        var extracted = PdfText.Join(pages);
        if (PdfText.LetterCount(extracted) >= SubstantialLetters)
        {
            return Encoding.UTF8.GetBytes(extracted);
        }

        var tessLang = ResolveLang(lang);
        if (tessLang is not null && PdfRaster.TryRenderPngs(pdf, dpi: 150, out var pngs))
        {
            var sb = new StringBuilder();
            for (var i = 0; i < pngs.Count; i++)
            {
                var piece = RunTesseract(pngs[i], tessLang);
                if (sb.Length > 0) sb.Append("\n\n");
                sb.Append(piece.Trim());
            }

            var ocr = sb.ToString().Trim();
            if (ocr.Length > 0) return Encoding.UTF8.GetBytes(ocr);
            if (extracted.Trim().Length > 0) return Encoding.UTF8.GetBytes(extracted);
            return Encoding.UTF8.GetBytes(string.Empty);
        }

        if (extracted.Trim().Length > 0)
        {
            return Encoding.UTF8.GetBytes(extracted);
        }

        throw new PdfException(
            "ocr-engine",
            "OCR for scans needs Tesseract on the server. Digital PDFs still work.");
    }

    internal static bool TesseractAvailable() => InstalledLangs().Count > 0;

    private static string? ResolveLang(string? requested)
    {
        var installed = InstalledLangs();
        if (installed.Count == 0) return null;

        var raw = string.IsNullOrWhiteSpace(requested) ? "" : requested.Trim();
        var wanted = raw.Split('+', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries);
        if (wanted.Length == 0)
        {
            if (installed.Contains("eng") && installed.Contains("chi_sim")) return "eng+chi_sim";
            if (installed.Contains("eng")) return "eng";
            return installed.OrderBy(x => x, StringComparer.Ordinal).First();
        }

        var kept = new List<string>();
        foreach (var token in wanted)
        {
            var lang = token.Replace('-', '_').ToLowerInvariant();
            if (lang is not ("eng" or "chi_sim" or "osd")) continue;
            if (installed.Contains(lang) && !kept.Contains(lang)) kept.Add(lang);
        }

        if (kept.Count > 0) return string.Join('+', kept);
        if (installed.Contains("eng")) return "eng";
        return installed.OrderBy(x => x, StringComparer.Ordinal).First();
    }

    private static HashSet<string> InstalledLangs()
    {
        if (_tessProbed) return _tessLangs ?? [];
        lock (TessGate)
        {
            if (_tessProbed) return _tessLangs ?? [];
            _tessLangs = ProbeLangs();
            _tessProbed = true;
            return _tessLangs;
        }
    }

    private static HashSet<string> ProbeLangs()
    {
        try
        {
            var psi = new ProcessStartInfo("tesseract")
            {
                RedirectStandardOutput = true,
                RedirectStandardError = true,
                UseShellExecute = false,
                CreateNoWindow = true
            };
            psi.ArgumentList.Add("--list-langs");
            using var p = Process.Start(psi);
            if (p is null) return [];
            var stdout = p.StandardOutput.ReadToEnd();
            var stderr = p.StandardError.ReadToEnd();
            if (!p.WaitForExit(5000))
            {
                try { p.Kill(entireProcessTree: true); } catch { /* ignore */ }
                return [];
            }

            var text = stdout + "\n" + stderr;
            var set = new HashSet<string>(StringComparer.OrdinalIgnoreCase);
            foreach (var line in text.Split('\n', StringSplitOptions.TrimEntries | StringSplitOptions.RemoveEmptyEntries))
            {
                if (line.StartsWith("List of", StringComparison.OrdinalIgnoreCase)) continue;
                if (line is "eng" or "chi_sim" or "osd") set.Add(line);
            }

            set.Remove("osd");
            return set;
        }
        catch
        {
            return [];
        }
    }

    private static string RunTesseract(byte[] png, string lang)
    {
        var psi = new ProcessStartInfo("tesseract")
        {
            RedirectStandardInput = true,
            RedirectStandardOutput = true,
            RedirectStandardError = true,
            UseShellExecute = false,
            CreateNoWindow = true
        };
        psi.ArgumentList.Add("stdin");
        psi.ArgumentList.Add("stdout");
        psi.ArgumentList.Add("-l");
        psi.ArgumentList.Add(lang);
        psi.ArgumentList.Add("--psm");
        psi.ArgumentList.Add("3");

        using var p = new Process { StartInfo = psi };
        var stdout = new StringBuilder();
        var stderr = new StringBuilder();
        p.OutputDataReceived += (_, e) => { if (e.Data is not null) stdout.AppendLine(e.Data); };
        p.ErrorDataReceived += (_, e) => { if (e.Data is not null) stderr.AppendLine(e.Data); };
        if (!p.Start())
        {
            throw new PdfException(
                "ocr-engine",
                "OCR for scans needs Tesseract on the server. Digital PDFs still work.");
        }

        p.BeginOutputReadLine();
        p.BeginErrorReadLine();
        p.StandardInput.BaseStream.Write(png, 0, png.Length);
        p.StandardInput.Close();
        if (!p.WaitForExit(120_000))
        {
            try { p.Kill(entireProcessTree: true); } catch { /* ignore */ }
            throw new PdfException("failed", "Could not process this file.");
        }

        if (p.ExitCode != 0)
        {
            throw new PdfException("failed", "Could not process this file.");
        }

        return stdout.ToString();
    }
}
