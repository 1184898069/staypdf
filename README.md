# StayPDF

EN: PDF tools that never leave your browser.
ZH: PDF 处理不离开你的电脑。

Live site: https://1184898069.github.io/staypdf/

StayPDF is a privacy-first alternative to Smallpdf and iLovePDF. Files are read in the current tab with the File API, processed with pdf-lib, and saved with a local download. Nothing is uploaded. There is no backend for PDF processing.

## Why vs Smallpdf / iLovePDF

Those products send your document to a server. StayPDF never does. Merge, split, rotate, delete, and images-to-PDF all run in JavaScript in your browser. The one-line proof in the UI is literal: processed in this tab, never uploaded.

## Tools (v0.1)

- Merge 2+ PDFs: Free
- Split (extract page ranges): Free
- Rotate pages: Free
- Delete pages: Free
- Images to PDF: Free
- Compress / OCR / Word convert: Pro coming (not in v1)

Free plan: 3 successful exports per local calendar day (stored in localStorage). The 4th export shows a paywall card.

Pro is 6 USD per month unlimited. Payment (Creem) is not connected yet. Use Unlock demo Pro to set a local flag and preview unlimited exports. StayPDF will not charge you; there is no fake checkout.

## Develop

Install dependencies, run the test suite, then start the Vite dev server. Build emits static files to dist/ and copies them to docs/ for GitHub Pages (main branch, docs folder). Hash routes: #/ #/merge #/split #/rotate #/delete #/images.

## Tests

The test suite uses Node built-in test runner for page-range parsing and daily-limit logic. No browser is required.

## License

MIT
