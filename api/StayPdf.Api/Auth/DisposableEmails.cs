namespace StayPdf.Api.Auth;

internal static class DisposableEmails
{
    private static readonly HashSet<string> Domains = new(StringComparer.OrdinalIgnoreCase)
    {
        "mailinator.com",
        "10minutemail.com",
        "guerrillamail.com",
        "tempmail.com",
        "yopmail.com",
        "trashmail.com",
        "temp-mail.org"
    };

    public static bool IsBlocked(string email)
    {
        var at = email.LastIndexOf('@');
        if (at < 0 || at == email.Length - 1) return false;
        var domain = email[(at + 1)..];
        return Domains.Contains(domain);
    }
}
