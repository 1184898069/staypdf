# Deploy StayPDF API / 部署 StayPDF API

Until an API is hosted, GitHub Pages stays demo-only. Payments remain paused.

ZH: 在公网 API 上线之前，Pages 只能当演示站。收入路径需要可公开访问的 API；仅 Pages 不够。支付仍暂停。

## Prerequisites / 准备

- JWT_SECRET: 32+ chars
- TURNSTILE_SECRET: Cloudflare secret; hostname 1184898069.github.io
- SMTP_*: required for Production registration
- CORS_ORIGINS: include https://1184898069.github.io
- APP_PUBLIC_URL: https://1184898069.github.io/staypdf
- ConnectionStrings__Default: Data Source=/data/staypdf.db + volume
- See .env.production.example; do not set STAYPDF_TEST_* in Production


## Cookies / CORS

Frontend uses credentials include. Production session/device cookies use SameSite=None and Secure for cross-site GitHub Pages to HTTPS API. Development and Testing keep SameSite=Lax.

CORS allows listed origins with credentials. Serve the API over HTTPS.

Optional: put API and UI on the same site via reverse proxy or custom domain.

## Primary path: Railway

1. Use the GitHub main branch.
2. Create a new Railway project from the staypdf GitHub repo.
3. Set Dockerfile to api/StayPdf.Api/Dockerfile with repo root as context.
4. Attach a volume at /data for SQLite.
5. Copy secrets from .env.production.example (JWT, Turnstile, SMTP, CORS, APP_PUBLIC_URL, ConnectionStrings).
6. Generate an HTTPS public domain; call it YOUR_API.
7. Add 1184898069.github.io in Cloudflare Turnstile.
8. Rebuild the frontend with VITE_API_URL and VITE_TURNSTILE_SITE_KEY, then push the docs folder for Pages.
9. Smoke: Pages should not show the run-locally message; /api/plan and /health work; register works if SMTP is set.
10. Until the API is hosted and Pages rebuilt, Pages stays demo-only. Payments remain paused.

Local optional check: docker compose up --build, then hit /health on port 8080.

## Alternative: Fly.io

Use the same Dockerfile, create a volume at /data, set the same secrets, deploy. Then rebuild the frontend as in step 8.

## Cookie decision summary

- Production: SameSite=None; Secure; HttpOnly
- Development/Testing: SameSite=Lax; HttpOnly

## Out of scope

This pack does not open a cloud account, spend money, bake VITE_API_URL into Pages yet, or enable payments.
