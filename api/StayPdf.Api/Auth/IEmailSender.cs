namespace StayPdf.Api.Auth;

public interface IEmailSender
{
    bool IsMailConfigured { get; }
    string? LastVerifyUrl { get; }
    Task SendVerificationAsync(string to, string verifyUrl, CancellationToken ct);
}
