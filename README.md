# StayPDF

EN: PDF tools. Files are processed in server memory and discarded.
ZH: PDF 工具。文件在服务器内存中处理，不落盘保存。

Live site: https://1184898069.github.io/staypdf/

The GitHub Pages build is a landing + app. Configure VITE_API_URL to talk to your API. If the API URL is not set, the UI asks you to run locally to process files.

Pages itself does not host the API.

## Free vs Pro

Entitlement is decided on the server (License to actor.IsPro). There is no client unlock.

- Free: 3 exports per UTC day; 15 MB / 10 files. Tools: merge, split, rotate, delete pages, images to PDF.
- Pro: unlimited exports; 40 MB / 20 files. Extra tools: compress, OCR, PDF and Word, watermark, page numbers, PDF to images.

Compress rasterizes pages and JPEG-encodes them (image-heavy files shrink; vector-only files may not). OCR extracts digital text with PdfPig and, when Tesseract is installed, OCRs scans. PDF and Word is text-based: tables, images, and complex layout are simplified. Payments are not connected yet.

How to add a tool: docs/ADDING-A-TOOL.md

Tesseract is optional (`tesseract-ocr`, `tesseract-ocr-eng`, `tesseract-ocr-chi-sim`); digital PDFs still extract without it.

## Run locally / 本地运行

```
cp .env.example .env
dotnet run --project api/StayPdf.Api
npm run dev
```

Fill the values listed in .env.example. Development seeds the STAYPDF_TEST_EMAIL / STAYPDF_TEST_PASSWORD account as a verified Pro user so you can log in immediately. A newly verified account is Free until a License row exists.

To register a new account locally:

1. Open #/register and submit email + password (at least 10 characters, with a letter and a number).
2. Open the verification link written to api/StayPdf.Api/data/last-verify-url.txt (the API log also prints it).
3. Sign in on #/login.

ZH: 先填写 .env.example 复制出的 .env。Development 下测试账号为已验证的 Pro。新注册请打开 api/StayPdf.Api/data/last-verify-url.txt 中的链接完成验证后再登录。

Production requires JWT_SECRET of 32+ characters and TURNSTILE_SECRET. It does not create the test user. Configure SMTP_* or registration returns 503.

## Tests

```
dotnet test
npm test
```

## License

MIT
