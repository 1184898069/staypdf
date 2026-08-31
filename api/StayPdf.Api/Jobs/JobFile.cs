namespace StayPdf.Api.Jobs;

internal readonly record struct JobFile(byte[] Bytes, string ContentType, string Filename);
