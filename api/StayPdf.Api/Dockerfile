# StayPDF API — multi-stage image for Railway / Fly / Render / Docker Compose.
# Build context: repository root (see docker-compose.yml).

FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src
COPY api/StayPdf.Api/StayPdf.Api.csproj api/StayPdf.Api/
RUN dotnet restore api/StayPdf.Api/StayPdf.Api.csproj
COPY api/StayPdf.Api/ api/StayPdf.Api/
RUN dotnet publish api/StayPdf.Api/StayPdf.Api.csproj -c Release -o /app/publish /p:UseAppHost=false

FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS final
WORKDIR /app

# Optional OCR for scanned PDFs (eng + simplified Chinese). Digital text still works without it.
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        tesseract-ocr \
        tesseract-ocr-eng \
        tesseract-ocr-chi-sim \
    && rm -rf /var/lib/apt/lists/*

RUN groupadd --system --gid 1000 app \
    && useradd --system --uid 1000 --gid app --home-dir /app --shell /usr/sbin/nologin app \
    && mkdir -p /data \
    && chown -R app:app /data

COPY --from=build /app/publish .
RUN chown -R app:app /app

USER app

ENV ASPNETCORE_ENVIRONMENT=Production \
    ASPNETCORE_URLS=http://+:8080 \
    PORT=8080 \
    ConnectionStrings__Default="Data Source=/data/staypdf.db"

EXPOSE 8080

# PORT is honored in Program.cs when the host injects it (Railway / Fly / Render).
ENTRYPOINT ["dotnet", "StayPdf.Api.dll"]
