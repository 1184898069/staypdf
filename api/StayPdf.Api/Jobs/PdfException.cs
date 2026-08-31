namespace StayPdf.Api.Jobs;

public sealed class PdfException(string code, string message) : Exception(message)
{
    public string Code { get; } = code;
}
