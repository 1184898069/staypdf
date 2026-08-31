using Microsoft.EntityFrameworkCore;
using StayPdf.Api.Data;

namespace StayPdf.Api.Auth;

public sealed class QuotaService(AppDbContext db)
{
    public const int FreeDailyLimit = 3;

    public static string UtcDay(DateTimeOffset? now = null) =>
        (now ?? DateTimeOffset.UtcNow).UtcDateTime.ToString("yyyy-MM-dd");

    public async Task<int> RemainingAsync(string subjectId, CancellationToken ct)
    {
        var day = UtcDay();
        var row = await db.DailyExports.AsNoTracking()
            .FirstOrDefaultAsync(x => x.SubjectId == subjectId && x.UtcDay == day, ct);
        var used = row?.Count ?? 0;
        return Math.Max(0, FreeDailyLimit - used);
    }

    public async Task<bool> TryRecordSuccessAsync(string subjectId, CancellationToken ct)
    {
        var day = UtcDay();
        await using var tx = await db.Database.BeginTransactionAsync(ct);
        var row = await db.DailyExports
            .FirstOrDefaultAsync(x => x.SubjectId == subjectId && x.UtcDay == day, ct);
        if (row is null)
        {
            row = new DailyExport
            {
                Id = Guid.NewGuid(),
                SubjectId = subjectId,
                UtcDay = day,
                Count = 0
            };
            db.DailyExports.Add(row);
        }

        if (row.Count >= FreeDailyLimit)
        {
            await tx.RollbackAsync(ct);
            return false;
        }

        row.Count += 1;
        await db.SaveChangesAsync(ct);
        await tx.CommitAsync(ct);
        return true;
    }
}
