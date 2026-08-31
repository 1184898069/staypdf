namespace StayPdf.Api.Auth;

internal static class PasswordRules
{
    public const int MinLength = 10;

    public static bool IsValid(string password)
    {
        if (password.Length < MinLength) return false;
        var letter = false;
        var digit = false;
        foreach (var c in password)
        {
            if (char.IsLetter(c)) letter = true;
            else if (char.IsDigit(c)) digit = true;
            if (letter && digit) return true;
        }

        return false;
    }
}
