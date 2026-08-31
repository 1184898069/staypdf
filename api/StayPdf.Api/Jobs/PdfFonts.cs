using PdfSharpCore.Fonts;
using PdfSharpCore.Utils;

namespace StayPdf.Api.Jobs;

internal static class PdfFonts
{
    private static readonly object Gate = new();
    private static bool _ready;

    public static void Ensure()
    {
        if (_ready) return;
        lock (Gate)
        {
            if (_ready) return;
            try
            {
                if (GlobalFontSettings.FontResolver is null)
                {
                    GlobalFontSettings.FontResolver = new FontResolver();
                }
            }
            catch (InvalidOperationException)
            {
                // PdfSharpCore only allows one resolver for the process.
            }

            _ready = true;
        }
    }
}
