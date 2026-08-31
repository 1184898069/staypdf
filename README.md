# StayPDF

EN: PDF tools. Files are processed in server memory and discarded.
ZH: PDF 工具。文件在服务器内存中处理，不落盘保存。

Live site: https://1184898069.github.io/staypdf/

The GitHub Pages build is a landing + app. Configure VITE_API_URL to talk to your API. If the API URL is not set, the UI asks you to run locally to process files.

## Run locally / 本地运行

```
cp .env.example .env
dotnet run --project api/StayPdf.Api
npm run dev
```

Fill the values listed in .env.example, then log in on the site with that email and password.

ZH: 先填写 .env.example 复制出的 .env，再在站点登录。Development 下该测试账号为 Pro。

Production requires JWT_SECRET of 32+ characters and does not create the test user.

## Tests

```
dotnet test
npm test
```

## License

MIT
