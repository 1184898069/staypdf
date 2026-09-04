# Adding a tool

StayPDF tools are gated by a server-side catalog.
The client may show badges from /api/plan or a matching local list when the API URL is unset. The API refusal is the real gate.
Do not add a client demo flag or an in-browser PDF pipeline.

## Recipe

1. Catalog. Add a ToolDef in api/StayPdf.Api/Jobs/ToolCatalog.cs (Id, RequiresPro). Free: merge, split, rotate, delete, images. Pro: compress, ocr, word, watermark, pages, pdf-images, protect. Plan limits live on PlanLimits. Mirror the id in src/lib/plan.js.
2. Processor. Implement work in api/StayPdf.Api/Jobs/ in memory only. Do not write user file bytes to disk. Return a JobFile.
3. Endpoint. Map POST in JobEndpoints using Run with the tool id. Non-Pro actors are stopped before work when the tool requires Pro. Record free daily quota after success.
4. Frontend. Route, i18n EN+ZH, view, bindRun, bindDrop. Keep Pro tools visible. If the session is not Pro, Run opens the existing paywall without calling the API. Payments stay paused.
5. Tests. Cover Pro tools for free users and a signed-in Pro happy path via AuthHelpers.SignInProAsync. DiskIsolationTests must still pass.
Then run the project test suites.
