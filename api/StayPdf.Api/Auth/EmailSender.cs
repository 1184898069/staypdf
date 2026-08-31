using System.Net;
using System.Net.Mail;

namespace StayPdf.Api.Auth;

public sealed class EmailSender(IHostEnvironment env, IConfiguration config, ILogger<EmailSender> logger) : IEmailSender
{
    public string? LastVerifyUrl { get; private set; }

    public bool IsMailConfigured
    {
        get
        {
            if (!env.IsProduction()) return true;
            var host = Read("SMTP_HOST");
            var from = Read("SMTP_FROM");
            return host.Length > 0 && from.Length > 0;
        }
    }

    public async Task SendVerificationAsync(string to, string verifyUrl, CancellationToken ct)
    {
        LastVerifyUrl = verifyUrl;
        if (env.IsProduction())
        {
            await SendSmtpAsync(to, verifyUrl, ct);
            logger.LogInformation("Sent a verification email.");
            return;
        }

        if (env.IsDevelopment())
        {
            var roots = new[] { Directory.GetCurrentDirectory(), env.ContentRootPath }.Distinct();
            foreach (var root in roots)
            {
                var dir = Path.Combine(root, "data");
                Directory.CreateDirectory(dir);
                var path = Path.Combine(dir, "last-verify-url.txt");
                await File.WriteAllTextAsync(path, verifyUrl + Environment.NewLine, ct);
            }
            logger.LogInformation("Verification URL for local testing: {Url}", verifyUrl);
        }
    }

    private async Task SendSmtpAsync(string to, string verifyUrl, CancellationToken ct)
    {
        var host = Read("SMTP_HOST");
        var from = Read("SMTP_FROM");
        var user = Read("SMTP_USER");
        var password = Read("SMTP_PASSWORD");
        var portRaw = Read("SMTP_PORT");
        var port = 587;
        if (int.TryParse(portRaw, out var parsed) && parsed > 0) port = parsed;

        using var message = new MailMessage();
        message.From = new MailAddress(from);
        message.To.Add(new MailAddress(to));
        message.Subject = "Verify your StayPDF email";
        message.Body = "Open this link to verify your email:\n\n" + verifyUrl + "\n\nThis link expires in 24 hours.";

        using var client = new SmtpClient(host, port);
        if (user.Length > 0)
        {
            client.Credentials = new NetworkCredential(user, password);
        }

        client.EnableSsl = port != 25;
        await client.SendMailAsync(message, ct);
    }

    private string Read(string key) =>
        (config[key] ?? Environment.GetEnvironmentVariable(key) ?? "").Trim();
}
