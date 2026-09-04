using System.Globalization;
using StayPdf.Api.Auth;
using StayPdf.Api.Data;

namespace StayPdf.Api.Jobs;

public static class JobEndpoints
{
    private const string PlanMessage = "This action is not available on the current plan.";

    public static void MapJobs(this WebApplication app)
    {
        var g = app.MapGroup("/api/jobs");
        g.MapPost("/merge", Merge);
        g.MapPost("/split", Split);
        g.MapPost("/rotate", Rotate);
        g.MapPost("/delete", Delete);
        g.MapPost("/images", Images);
        g.MapPost("/compress", Compress);
        g.MapPost("/ocr", Ocr);
        g.MapPost("/word", Word);
        g.MapPost("/watermark", Watermark);
        g.MapPost("/pages", Pages);
        g.MapPost("/pdf-images", PdfImages);
        g.MapPost("/protect", Protect);
        g.MapPost("/unlock", Unlock);
    }

    private static Task<IResult> Merge(HttpContext ctx, AppDbContext db, QuotaService quota, CancellationToken ct) =>
        Run(ctx, db, quota, ct, "merge", "merged.pdf", files =>
        {
            if (files.Count < 2) throw new PdfException("need-two", "Need at least two PDFs.");
            return PdfProcessor.Merge(files);
        });

    private static Task<IResult> Split(HttpContext ctx, AppDbContext db, QuotaService quota, CancellationToken ct) =>
        Run(ctx, db, quota, ct, "split", "extract.pdf", files =>
        {
            if (files.Count != 1) throw new PdfException("need-one", "Add a PDF first.");
            var count = PdfProcessor.PageCount(files[0]);
            var parsed = PageRanges.Parse(ctx.Request.Form["ranges"].ToString(), count);
            if (!parsed.Success)
            {
                throw new PdfException(parsed.Error == "empty" ? "bad-range" : parsed.Error ?? "bad-range", "Check the page list.");
            }

            return PdfProcessor.Split(files[0], parsed.Pages);
        });

    private static Task<IResult> Rotate(HttpContext ctx, AppDbContext db, QuotaService quota, CancellationToken ct) =>
        Run(ctx, db, quota, ct, "rotate", "rotated.pdf", files =>
        {
            if (files.Count != 1) throw new PdfException("need-one", "Add a PDF first.");
            var angle = 90;
            if (int.TryParse(ctx.Request.Form["angle"].ToString(), out var parsedAngle)) angle = parsedAngle;
            var count = PdfProcessor.PageCount(files[0]);
            var rangesRaw = ctx.Request.Form["ranges"].ToString();
            List<int> pages;
            if (string.IsNullOrWhiteSpace(rangesRaw))
            {
                pages = PageRanges.All(count);
            }
            else
            {
                var parsed = PageRanges.Parse(rangesRaw, count);
                if (!parsed.Success)
                {
                    throw new PdfException(parsed.Error == "empty" ? "bad-range" : parsed.Error ?? "bad-range", "Check the page list.");
                }

                pages = parsed.Pages;
            }

            return PdfProcessor.Rotate(files[0], pages, angle);
        });

    private static Task<IResult> Delete(HttpContext ctx, AppDbContext db, QuotaService quota, CancellationToken ct) =>
        Run(ctx, db, quota, ct, "delete", "deleted.pdf", files =>
        {
            if (files.Count != 1) throw new PdfException("need-one", "Add a PDF first.");
            var count = PdfProcessor.PageCount(files[0]);
            var parsed = PageRanges.Parse(ctx.Request.Form["ranges"].ToString(), count);
            if (!parsed.Success)
            {
                throw new PdfException(parsed.Error == "empty" ? "bad-range" : parsed.Error ?? "bad-range", "Check the page list.");
            }

            return PdfProcessor.Delete(files[0], parsed.Pages);
        });

    private static Task<IResult> Images(HttpContext ctx, AppDbContext db, QuotaService quota, CancellationToken ct) =>
        Run(ctx, db, quota, ct, "images", "images.pdf", files =>
        {
            if (files.Count == 0) throw new PdfException("need-image", "Add at least one image.");
            var fit = ctx.Request.Form["fit"].ToString();
            if (string.IsNullOrWhiteSpace(fit)) fit = "a4";
            return PdfProcessor.ImagesToPdf(files, fit);
        });

    private static Task<IResult> Compress(HttpContext ctx, AppDbContext db, QuotaService quota, CancellationToken ct) =>
        Run(ctx, db, quota, ct, "compress", files =>
        {
            if (files.Count != 1) throw new PdfException("need-one", "Add a PDF first.");
            var quality = ctx.Request.Form["quality"].ToString();
            var bytes = PdfProcessor.Compress(files[0], quality);
            return new JobFile(bytes, "application/pdf", Stem(ctx, "document") + "-compressed.pdf");
        });

    private static Task<IResult> Ocr(HttpContext ctx, AppDbContext db, QuotaService quota, CancellationToken ct) =>
        Run(ctx, db, quota, ct, "ocr", files =>
        {
            if (files.Count != 1) throw new PdfException("need-one", "Add a PDF first.");
            var lang = ctx.Request.Form["lang"].ToString();
            var bytes = OcrProcessor.ToText(files[0], lang);
            return new JobFile(bytes, "text/plain; charset=utf-8", Stem(ctx, "document") + "-ocr.txt");
        });

    private static Task<IResult> Word(HttpContext ctx, AppDbContext db, QuotaService quota, CancellationToken ct) =>
        Run(ctx, db, quota, ct, "word", files =>
        {
            if (files.Count != 1) throw new PdfException("need-doc", "Add a PDF or Word file first.");
            var formFile = ctx.Request.Form.Files.Count > 0 ? ctx.Request.Form.Files[0] : null;
            var result = WordProcessor.Convert(files[0], formFile?.FileName, formFile?.ContentType);
            var stem = Stem(ctx, "document");
            var name = result.Filename.EndsWith(".pdf", StringComparison.OrdinalIgnoreCase)
                ? stem + "-converted.pdf"
                : stem + "-converted.docx";
            return result with { Filename = name };
        });

    private static Task<IResult> Watermark(HttpContext ctx, AppDbContext db, QuotaService quota, CancellationToken ct) =>
        Run(ctx, db, quota, ct, "watermark", files =>
        {
            if (files.Count != 1) throw new PdfException("need-one", "Add a PDF first.");
            var text = ctx.Request.Form["text"].ToString();
            var opacity = 0.25;
            if (double.TryParse(ctx.Request.Form["opacity"].ToString(), NumberStyles.Float, CultureInfo.InvariantCulture, out var parsed))
            {
                opacity = parsed;
            }

            var bytes = OverlayProcessor.Watermark(files[0], text, opacity);
            return new JobFile(bytes, "application/pdf", Stem(ctx, "document") + "-watermark.pdf");
        });

    private static Task<IResult> Pages(HttpContext ctx, AppDbContext db, QuotaService quota, CancellationToken ct) =>
        Run(ctx, db, quota, ct, "pages", files =>
        {
            if (files.Count != 1) throw new PdfException("need-one", "Add a PDF first.");
            var bytes = OverlayProcessor.PageNumbers(files[0]);
            return new JobFile(bytes, "application/pdf", Stem(ctx, "document") + "-pages.pdf");
        });

    private static Task<IResult> PdfImages(HttpContext ctx, AppDbContext db, QuotaService quota, CancellationToken ct) =>
        Run(ctx, db, quota, ct, "pdf-images", files =>
        {
            if (files.Count != 1) throw new PdfException("need-one", "Add a PDF first.");
            var bytes = PdfImagesProcessor.ZipPngs(files[0]);
            return new JobFile(bytes, "application/zip", Stem(ctx, "document") + "-pages.zip");
        });


    private static Task<IResult> Protect(HttpContext ctx, AppDbContext db, QuotaService quota, CancellationToken ct) =>
        Run(ctx, db, quota, ct, "protect", files =>
        {
            if (files.Count != 1) throw new PdfException("need-one", "Add a PDF first.");
            var password = ctx.Request.Form["password"].ToString();
            var bytes = ProtectProcessor.Protect(files[0], password);
            return new JobFile(bytes, "application/pdf", Stem(ctx, "document") + "-protected.pdf");
        });

    private static Task<IResult> Unlock(HttpContext ctx, AppDbContext db, QuotaService quota, CancellationToken ct) =>
        Run(ctx, db, quota, ct, "unlock", files =>
        {
            if (files.Count != 1) throw new PdfException("need-one", "Add a PDF first.");
            var password = ctx.Request.Form["password"].ToString();
            var bytes = UnlockProcessor.Unlock(files[0], password);
            return new JobFile(bytes, "application/pdf", Stem(ctx, "document") + "-unlocked.pdf");
        });

    private static Task<IResult> Run(
        HttpContext ctx,
        AppDbContext db,
        QuotaService quota,
        CancellationToken ct,
        string toolId,
        string filename,
        Func<List<byte[]>, byte[]> work) =>
        Run(ctx, db, quota, ct, toolId, files => new JobFile(work(files), "application/pdf", filename));

    private static async Task<IResult> Run(
        HttpContext ctx,
        AppDbContext db,
        QuotaService quota,
        CancellationToken ct,
        string toolId,
        Func<List<byte[]>, JobFile> work)
    {
        var tool = ToolCatalog.Get(toolId);
        var actor = await CurrentActor.ResolveAsync(ctx, db, ct);
        var limits = PlanLimits.For(actor.IsPro);
        List<byte[]> buffers;
        try
        {
            buffers = await ReadFilesAsync(ctx, limits, ct);
        }
        catch (PdfException ex)
        {
            return Results.Json(new { error = ex.Message, code = ex.Code }, statusCode: 400);
        }

        if (tool.RequiresPro && !actor.IsPro)
        {
            ClearAll(buffers);
            return Results.Json(new { error = PlanMessage, code = "plan" }, statusCode: 402);
        }

        byte[]? result = null;
        try
        {
            var job = work(buffers);
            result = job.Bytes;
            if (!actor.IsPro)
            {
                var recorded = await quota.TryRecordSuccessAsync(actor.SubjectId, ct);
                if (!recorded)
                {
                    Clear(ref result);
                    return Results.Json(new { error = PlanMessage, code = "plan" }, statusCode: 402);
                }
            }

            var payload = result;
            result = null;
            return Results.File(payload, job.ContentType, job.Filename);
        }
        catch (PdfException ex)
        {
            return Results.Json(new { error = ex.Message, code = ex.Code }, statusCode: 400);
        }
        finally
        {
            ClearAll(buffers);
            Clear(ref result);
        }
    }

    private static string Stem(HttpContext ctx, string fallback)
    {
        var name = ctx.Request.Form.Files.Count > 0 ? ctx.Request.Form.Files[0].FileName : "";
        var stem = Path.GetFileNameWithoutExtension(name ?? "");
        if (string.IsNullOrWhiteSpace(stem)) return fallback;
        foreach (var c in Path.GetInvalidFileNameChars())
        {
            stem = stem.Replace(c, '_');
        }

        return stem;
    }

    private static async Task<List<byte[]>> ReadFilesAsync(HttpContext ctx, PlanDef limits, CancellationToken ct)
    {
        if (!ctx.Request.HasFormContentType)
        {
            throw new PdfException("failed", "Could not process this file.");
        }

        var form = await ctx.Request.ReadFormAsync(ct);
        var files = form.Files;
        if (files.Count > limits.MaxFiles)
        {
            throw new PdfException("too-many", "Too many files in this request.");
        }

        var buffers = new List<byte[]>(files.Count);
        foreach (var file in files)
        {
            if (file.Length < 0 || file.Length > limits.MaxFileBytes)
            {
                throw new PdfException("too-large", "A file is larger than the allowed size.");
            }

            await using var ms = new MemoryStream(capacity: file.Length > 0 ? (int)Math.Min(file.Length, int.MaxValue) : 0);
            await file.CopyToAsync(ms, ct);
            buffers.Add(ms.ToArray());
        }

        return buffers;
    }

    private static void ClearAll(List<byte[]> buffers)
    {
        for (var i = 0; i < buffers.Count; i++)
        {
            var buf = buffers[i];
            if (buf.Length > 0) Array.Clear(buf);
            buffers[i] = [];
        }

        buffers.Clear();
    }

    private static void Clear(ref byte[]? data)
    {
        if (data is null) return;
        Array.Clear(data);
        data = null;
    }
}
