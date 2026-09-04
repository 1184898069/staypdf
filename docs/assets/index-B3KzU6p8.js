(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const p of document.querySelectorAll('link[rel="modulepreload"]'))u(p);new MutationObserver(p=>{for(const o of p)if(o.type==="childList")for(const m of o.addedNodes)m.tagName==="LINK"&&m.rel==="modulepreload"&&u(m)}).observe(document,{childList:!0,subtree:!0});function c(p){const o={};return p.integrity&&(o.integrity=p.integrity),p.referrerPolicy&&(o.referrerPolicy=p.referrerPolicy),p.crossOrigin==="use-credentials"?o.credentials="include":p.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function u(p){if(p.ep)return;p.ep=!0;const o=c(p);fetch(p.href,o)}})();const ee="staypdf-lang",U={en:{brand:"StayPDF",tagline:"PDF tools. Processed in memory, not stored.",privacy:"Processed in server memory, then discarded.",privacyProof:"Files are sent to the StayPDF API, transformed in memory, and the result is downloaded. Bytes are not written to disk and are not stored.",langZh:"中文",langEn:"EN",remaining:a=>`${a} free export${a===1?"":"s"} left today`,remainingPro:"Pro",remainingUnknown:"Sign in for unlimited exports",tools:"Tools",home:"All tools",merge:"Merge PDFs",mergeDesc:"Combine two or more PDFs into one file. Drag to reorder.",split:"Split PDF",splitDesc:"Extract page ranges into a new PDF.",rotate:"Rotate pages",rotateDesc:"Turn selected pages 90°, 180°, or 270° clockwise.",delete:"Delete pages",deleteDesc:"Remove pages and download the rest.",images:"Images → PDF",imagesDesc:"Turn JPG, PNG, or WebP images into a single PDF.",compress:"Compress PDF",compressDesc:"Shrink image-heavy PDFs. Vector-only files may not get smaller.",ocr:"OCR / scan to text",ocrDesc:"Extract text from a digital PDF, or OCR a scan when Tesseract is installed.",word:"PDF ↔ Word",wordDesc:"Convert PDF to Word or Word to PDF. Text-based: tables, images, and complex layout are simplified.",advanced:"Advanced",proComing:"Pro coming",proBadge:"Pro",freeTools:"Basic tools",proTools:"Pro tools",planLine:"Free: 3 exports per UTC day and basic tools. Pro: unlimited exports, compress, OCR, Word, watermark, page numbers, PDF → images, password protect, and larger files. Payments are not connected yet; locally, sign in with the STAYPDF_TEST_* account from .env.",watermark:"Watermark",watermarkDesc:"Draw diagonal text on every page.",watermarkText:"Watermark text",runWatermark:"Add watermark & download",pageNumbers:"Page numbers",pageNumbersDesc:"Add “1 / N” at the bottom of every page.",runPages:"Add page numbers & download",pdfImages:"PDF → images",pdfImagesDesc:"Rasterize each page to PNG and download a zip.",runPdfImages:"Export images & download",protect:"Protect PDF",protectDesc:"Lock a PDF with a password (128-bit). Other StayPDF tools still cannot open encrypted files.",protectPassword:"Password",protectConfirm:"Confirm password",protectHint:"4–72 characters. Remember it — StayPDF cannot unlock encrypted PDFs yet.",runProtect:"Protect & download",needPassword:"Set a password of 4–72 characters.",needText:"Add watermark text first.",dropWord:"Drop a PDF or Word file here, or click to choose",runCompress:"Compress & download",runOcr:"Extract text & download",runWord:"Convert & download",quality:"Quality",qualityLow:"Low (smaller file)",qualityMed:"Medium",qualityHigh:"High (clearer)",ocrLang:"Language",needDoc:"Add a PDF or Word file first.",wordHint:"Text-based conversion. Tables, images, and complex layout will be simplified.",ocrEngine:"OCR for scans needs Tesseract on the server. Digital PDFs still work.",dropPdf:"Drop PDFs here, or click to choose",dropPdfOne:"Drop a PDF here, or click to choose",dropImages:"Drop images here, or click to choose",addMore:"Add more",clear:"Clear",files:"Files",pages:"pages",page:"page",moveUp:"Up",moveDown:"Down",remove:"Remove",ranges:"Pages",rangesHint:"Example: 1-3, 5, 8-10",rangesAllHint:"Leave blank for all pages, or e.g. 1-3, 5",angle:"Rotation",cw90:"90° clockwise",cw180:"180°",cw270:"270° clockwise",fitA4:"Fit to A4",fitOriginal:"Original aspect, max A4",runMerge:"Merge & download",runSplit:"Extract & download",runRotate:"Rotate & download",runDelete:"Delete & download",runImages:"Create PDF & download",needTwo:"Add at least two PDFs.",needOne:"Add a PDF first.",needImage:"Add at least one image.",needKeep:"You must keep at least one page.",badRange:"Check the page list. Use numbers and ranges like 1-3, 5.",outOfRange:"A page number is outside this file.",encrypted:"This PDF is encrypted. StayPDF cannot open password-protected files yet.",failed:"Could not process this file. Try another PDF.",imageFailed:"Could not read an image. Use JPG, PNG, or WebP.",working:"Working…",done:"Downloaded. The upload was processed in memory and discarded.",paywallTitle:"Upgrade to continue",paywallBody:"StayPDF Pro is $6/month for unlimited exports plus extra tools and larger files. Payments are not connected yet. Locally, sign in with the STAYPDF_TEST_* account from .env.",close:"Not now",footer:"MIT · Files are not kept after the response is sent.",back:"← Tools",login:"Log in",logout:"Log out",email:"Email",password:"Password",loginSubmit:"Log in",loginTitle:"Log in",loginBody:"Sign in with a verified account. Create one if you do not have it yet.",authFailed:"Could not sign in. Check the email and password.",register:"Create account",registerTitle:"Create an account",registerBody:"We will send a short verification link to your email. You can sign in after you open it.",registerSubmit:"Create account",confirmPassword:"Confirm password",passwordHint:"At least 10 characters, with a letter and a number.",passwordMismatch:"Passwords do not match.",weakPassword:"Use at least 10 characters, including a letter and a number.",checkEmail:"If that address can be used, we sent a message.",haveAccount:"Already have an account? Log in",needAccount:"Need an account? Create one",verifyTitle:"Verify email",verifyWorking:"Verifying your email…",verifyOk:"Email verified. You can log in now.",verifyFail:"This link is not valid or has expired.",resend:"Resend the email",resendHint:"Did not get it? We can send the message again.",tryLater:"Please wait and try again.",mailDown:"Email is not available right now.",registerFailed:"Could not create this account.",runLocally:"Run locally to process files.",apiDown:"Cannot reach the StayPDF API. Start it locally to process files.",tooLarge:"A file is larger than your plan allows.",tooMany:"Too many files for your plan."},zh:{brand:"StayPDF",tagline:"PDF 工具。在内存中处理，不落盘保存。",privacy:"在服务器内存中处理，随后丢弃。",privacyProof:"文件发送到 StayPDF API，在内存中转换，再下载结果。不会写入磁盘，也不会存储。",langZh:"中文",langEn:"EN",remaining:a=>`今日剩余 ${a} 次免费导出`,remainingPro:"Pro",remainingUnknown:"登录后可不限次导出",tools:"工具",home:"全部工具",merge:"合并 PDF",mergeDesc:"将两份及以上 PDF 合成一份。可调整顺序。",split:"拆分 PDF",splitDesc:"按页码范围提取页面，生成新的 PDF。",rotate:"旋转页面",rotateDesc:"将指定页面顺时针旋转 90°、180° 或 270°。",delete:"删除页面",deleteDesc:"去掉不想要的页，下载剩余内容。",images:"图片转 PDF",imagesDesc:"把 JPG、PNG、WebP 图片合成一份 PDF。",compress:"压缩 PDF",compressDesc:"压缩以图片为主的 PDF。纯矢量文件未必会变小。",ocr:"OCR 识别文字",ocrDesc:"从数字 PDF 提取文字；扫描件在安装 Tesseract 时可识别。",word:"PDF ↔ Word",wordDesc:"在 PDF 与 Word 之间转换。按文本处理：表格、图片和复杂版式会被简化。",advanced:"进阶",proComing:"Pro 即将推出",proBadge:"Pro",freeTools:"基础工具",proTools:"Pro 工具",planLine:"免费：每天（UTC）3 次导出和基础工具。Pro：不限次数，另含压缩、OCR、Word、水印、页码、PDF 转图片、密码保护，以及更大文件。支付尚未接入；本地可用 .env 中的 STAYPDF_TEST_* 账号登录体验 Pro。",watermark:"水印",watermarkDesc:"在每一页加上斜向文字水印。",watermarkText:"水印文字",runWatermark:"添加水印并下载",pageNumbers:"页码",pageNumbersDesc:"在每页底部加上 “1 / N”。",runPages:"添加页码并下载",pdfImages:"PDF 转图片",pdfImagesDesc:"将每一页渲染为 PNG，打包成 zip 下载。",runPdfImages:"导出图片并下载",protect:"密码保护",protectDesc:"给 PDF 加上打开密码（128 位）。其他 StayPDF 工具仍无法打开已加密文件。",protectPassword:"密码",protectConfirm:"确认密码",protectHint:"4–72 个字符。请牢记密码——StayPDF 暂不支持解锁加密 PDF。",runProtect:"加密并下载",needPassword:"请设置 4–72 个字符的密码。",needText:"请先填写水印文字。",dropWord:"把 PDF 或 Word 拖到这里，或点击选择",runCompress:"压缩并下载",runOcr:"提取文字并下载",runWord:"转换并下载",quality:"质量",qualityLow:"低（文件更小）",qualityMed:"中",qualityHigh:"高（更清晰）",ocrLang:"语言",needDoc:"请先添加一份 PDF 或 Word 文件。",wordHint:"按文本转换。表格、图片和复杂版式会被简化。",ocrEngine:"扫描件 OCR 需要服务器安装 Tesseract。数字 PDF 仍可提取文字。",dropPdf:"把 PDF 拖到这里，或点击选择",dropPdfOne:"把一份 PDF 拖到这里，或点击选择",dropImages:"把图片拖到这里，或点击选择",addMore:"继续添加",clear:"清空",files:"文件",pages:"页",page:"页",moveUp:"上移",moveDown:"下移",remove:"移除",ranges:"页码",rangesHint:"例如：1-3, 5, 8-10",rangesAllHint:"留空表示全部页面，或如 1-3, 5",angle:"旋转角度",cw90:"顺时针 90°",cw180:"180°",cw270:"顺时针 270°",fitA4:"适应 A4",fitOriginal:"原比例，最大 A4",runMerge:"合并并下载",runSplit:"提取并下载",runRotate:"旋转并下载",runDelete:"删除并下载",runImages:"生成 PDF 并下载",needTwo:"请至少添加两份 PDF。",needOne:"请先添加一份 PDF。",needImage:"请至少添加一张图片。",needKeep:"至少需要保留一页。",badRange:"请检查页码。使用数字和范围，例如 1-3, 5。",outOfRange:"页码超出了这份文件的页数。",encrypted:"这份 PDF 已加密。StayPDF 暂不支持带密码的文件。",failed:"无法处理该文件，请换一份 PDF 试试。",imageFailed:"无法读取图片。请使用 JPG、PNG 或 WebP。",working:"处理中…",done:"已下载。上传内容在内存中处理并已丢弃。",paywallTitle:"升级后继续",paywallBody:"StayPDF Pro 为 $6/月，不限次数，并含更多工具和更大文件。支付尚未接入。本地可用 .env 中的 STAYPDF_TEST_* 账号登录。",close:"稍后再说",footer:"MIT · 响应发送后不保留文件。",back:"← 全部工具",login:"登录",logout:"退出",email:"邮箱",password:"密码",loginSubmit:"登录",loginTitle:"登录",loginBody:"请使用已验证的账号登录。没有账号可以先注册。",authFailed:"无法登录，请检查邮箱和密码。",register:"注册",registerTitle:"创建账号",registerBody:"我们会向邮箱发送一封验证邮件。打开链接后即可登录。",registerSubmit:"注册",confirmPassword:"确认密码",passwordHint:"至少 10 个字符，需包含字母和数字。",passwordMismatch:"两次输入的密码不一致。",weakPassword:"密码至少 10 个字符，并包含字母和数字。",checkEmail:"如果该地址可以使用，我们已发送邮件。",haveAccount:"已有账号？去登录",needAccount:"没有账号？去注册",verifyTitle:"验证邮箱",verifyWorking:"正在验证邮箱…",verifyOk:"邮箱已验证，现在可以登录。",verifyFail:"链接无效或已过期。",resend:"重新发送邮件",resendHint:"没收到？可以再发一次。",tryLater:"请稍后再试。",mailDown:"当前无法发送邮件。",registerFailed:"无法创建该账号。",runLocally:"请在本地运行后再处理文件。",apiDown:"无法连接 StayPDF API。请先在本地启动后再处理文件。",tooLarge:"文件超过了当前套餐允许的大小。",tooMany:"文件数量超过了当前套餐限制。"}};function ke(){try{const e=localStorage.getItem(ee);if(e==="zh"||e==="en")return e}catch{}const a=typeof navigator<"u"&&navigator.language||"";return/^zh\b/i.test(a)?"zh":"en"}let x=ke();function Fe(){return x}function te(a){x=a==="zh"?"zh":"en";try{localStorage.setItem(ee,x)}catch{}typeof document<"u"&&(document.documentElement.lang=x==="zh"?"zh-CN":"en")}function t(a,...e){const u=(U[x]||U.en)[a]??U.en[a]??a;return typeof u=="function"?u(...e):u}te(x);function j(a,e){if(typeof a!="string")return{ok:!1,pages:[],error:"empty"};const c=a.trim();if(!c)return{ok:!1,pages:[],error:"empty"};if(!Number.isInteger(e)||e<1)return{ok:!1,pages:[],error:"bad-count"};const u=c.split(/[,，]/).map(m=>m.trim()).filter(Boolean);if(u.length===0)return{ok:!1,pages:[],error:"empty"};const p=[],o=new Set;for(const m of u){const D=m.match(/^(\d+)\s*[-–—~～]\s*(\d+)$/),L=m.match(/^(\d+)$/);if(D){let w=Number(D[1]),g=Number(D[2]);if(!Number.isInteger(w)||!Number.isInteger(g))return{ok:!1,pages:[],error:"invalid"};if(w>g){const k=w;w=g,g=k}if(w<1||g>e)return{ok:!1,pages:[],error:"out-of-range"};for(let k=w;k<=g;k+=1)o.has(k)||(o.add(k),p.push(k))}else if(L){const w=Number(L[1]);if(!Number.isInteger(w)||w<1||w>e)return{ok:!1,pages:[],error:"out-of-range"};o.has(w)||(o.add(w),p.push(w))}else return{ok:!1,pages:[],error:"invalid"}}return p.length===0?{ok:!1,pages:[],error:"empty"}:{ok:!0,pages:p,error:null}}function Le(a,e,c="application/pdf"){const u=new Blob([a],{type:c}),p=URL.createObjectURL(u),o=document.createElement("a");o.href=p,o.download=e,document.body.appendChild(o),o.click(),o.remove(),setTimeout(()=>URL.revokeObjectURL(p),1500)}function r(a){return String(a).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function Z(a){if(!a)return!1;const e=(a.type||"").toLowerCase(),c=(a.name||"").toLowerCase();return e==="application/pdf"||c.endsWith(".pdf")}function Se(a){if(!a)return!1;const e=(a.type||"").toLowerCase(),c=(a.name||"").toLowerCase();return e.startsWith("image/")?!0:/\.(png|jpe?g|webp|gif|bmp)$/i.test(c)}function Q(a){if(!a)return!1;const e=(a.type||"").toLowerCase(),c=(a.name||"").toLowerCase();return e==="application/vnd.openxmlformats-officedocument.wordprocessingml.document"||e==="application/vnd.ms-word.document.macroenabled.12"||c.endsWith(".docx")}function R(){return null}function X(){return""}async function F(a,e={}){const c=R();if(!c){const o=new Error("run-local");throw o.code="run-local",o}const u={...e.headers||{}};return e.body&&!(e.body instanceof FormData)&&!u["Content-Type"]&&(u["Content-Type"]="application/json"),await fetch(`${c}${a}`,{credentials:"include",...e,headers:u})}function re(a,e){const c=new Error(e);throw a.status===429?c.code="try-later":a.status===503?c.code="mail":c.code=e,c}async function Te(){const a=await F("/api/auth/me");if(!a.ok){const e=new Error("failed");throw e.code="failed",e}return a.json()}async function Ee(){const a=await F("/api/plan");if(!a.ok){const e=new Error("failed");throw e.code="failed",e}return a.json()}async function qe(a,e){const c=await F("/api/auth/login",{method:"POST",body:JSON.stringify({email:a,password:e})});if(!c.ok){const u=new Error("auth");throw u.code="auth",u}return c.json()}async function xe(a,e,c={}){const u=await F("/api/auth/register",{method:"POST",body:JSON.stringify({email:a,password:e,company:c.company||"","cf-turnstile-response":c.turnstile||""})});return u.ok||re(u,"register"),u.json()}async function Oe(a){const e=await F("/api/auth/verify",{method:"POST",body:JSON.stringify({token:a})});if(!e.ok){const c=new Error("verify");throw c.code="verify",c}return e.json()}async function Ae(a){const e=await F("/api/auth/resend-verification",{method:"POST",body:JSON.stringify({email:a})});return e.ok||re(e,"register"),e.json()}async function Ce(){await F("/api/auth/logout",{method:"POST"})}async function Re(a,e,c={}){const u=new FormData;for(const o of e)u.append("files",o);for(const[o,m]of Object.entries(c))m==null||m===""||u.append(o,String(m));const p=await F(`/api/jobs/${a}`,{method:"POST",body:u});if(p.status===402){const o=new Error("plan");throw o.code="plan",o}if(!p.ok){let o="failed";try{const D=await p.json();D&&typeof D.code=="string"&&(o=D.code)}catch{}const m=new Error(o);throw m.code=o,m}return new Uint8Array(await p.arrayBuffer())}const E=[{id:"merge",requiresPro:!1},{id:"split",requiresPro:!1},{id:"rotate",requiresPro:!1},{id:"delete",requiresPro:!1},{id:"images",requiresPro:!1},{id:"compress",requiresPro:!0},{id:"ocr",requiresPro:!0},{id:"word",requiresPro:!0},{id:"watermark",requiresPro:!0},{id:"pages",requiresPro:!0},{id:"pdf-images",requiresPro:!0},{id:"protect",requiresPro:!0}],Ie=["/","/merge","/split","/rotate","/delete","/images","/compress","/ocr","/word","/watermark","/pages","/pdf-images","/protect","/login","/register","/verify"],Ne={merge:{href:"/merge",title:"merge",desc:"mergeDesc"},split:{href:"/split",title:"split",desc:"splitDesc"},rotate:{href:"/rotate",title:"rotate",desc:"rotateDesc"},delete:{href:"/delete",title:"delete",desc:"deleteDesc"},images:{href:"/images",title:"images",desc:"imagesDesc"},compress:{href:"/compress",title:"compress",desc:"compressDesc"},ocr:{href:"/ocr",title:"ocr",desc:"ocrDesc"},word:{href:"/word",title:"word",desc:"wordDesc"},watermark:{href:"/watermark",title:"watermark",desc:"watermarkDesc"},pages:{href:"/pages",title:"pageNumbers",desc:"pageNumbersDesc"},"pdf-images":{href:"/pdf-images",title:"pdfImages",desc:"pdfImagesDesc"},protect:{href:"/protect",title:"protect",desc:"protectDesc"}};function We(){const e=(location.hash||"#/").replace(/^#/,"").split("?")[0]||"/";return Ie.includes(e)?e:"/"}function He(){const a=(location.hash||"#/").replace(/^#/,""),e=a.includes("?")?a.slice(a.indexOf("?")+1):"";return new URLSearchParams(e)}function Be(a){return a.length>=10&&/[A-Za-z]/.test(a)&&/\d/.test(a)}let q=null;function Ke(a,e){const c=document.getElementById("turnstile-slot");if(!c||!a)return;const u=()=>{window.turnstile&&(c.innerHTML="",window.turnstile.render(c,{sitekey:a,theme:"dark",callback:e}))};if(window.turnstile){u();return}q||(q=document.createElement("script"),q.src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit",q.async=!0,document.head.appendChild(q)),q.addEventListener("load",u,{once:!0})}function Me(){return`<svg class="mark" viewBox="0 0 28 28" aria-hidden="true">
    <rect x="3" y="3" width="22" height="22" rx="6" fill="#1d221d" stroke="#b6e07a" stroke-width="1.4"/>
    <path d="M8 18.5V9.5h5.2c2.3 0 3.7 1.2 3.7 3.1 0 1.9-1.4 3.1-3.7 3.1H10.6V18.5H8zm2.6-4.6h2.3c1.1 0 1.7-.5 1.7-1.4s-.6-1.4-1.7-1.4h-2.3v2.8z" fill="#eef3ea"/>
  </svg>`}function P(a,e="document"){return String(a||e).replace(/\.[^.]+$/,"")||e}function Ve(a){const e=String(a||"").toLowerCase();return e.endsWith(".txt")?"text/plain;charset=utf-8":e.endsWith(".zip")?"application/zip":e.endsWith(".docx")?"application/vnd.openxmlformats-officedocument.wordprocessingml.document":"application/pdf"}function ze(a){const e={files:[],message:"",messageKind:"",busy:!1,paywall:!1,angle:90,fit:"a4",quality:"medium",ocrLang:"eng+chi_sim",ranges:"",watermarkText:"",protectPassword:"",protectConfirm:"",tools:E,email:"",password:"",confirmPassword:"",turnstileToken:"",verifyOnce:!1,session:{loaded:!1,apiConfigured:!!R(),apiReachable:!1,authenticated:!1,email:"",isPro:!1,remaining:null}};function c(n){location.hash!==`#${n}`?location.hash=n:d()}function u(){e.files=[],e.message="",e.messageKind="",e.busy=!1,e.angle=90,e.fit="a4",e.quality="medium",e.ocrLang="eng+chi_sim",e.ranges="",e.watermarkText="",e.protectPassword="",e.protectConfirm=""}function p(n,i){const l=Array.from(n||[]).filter(f=>i==="image"?Se(f):i==="one-word"?Z(f)||Q(f):Z(f));if(i==="one-pdf"||i==="one-word"){const f=l[0];f&&(e.files=[f]),d();return}for(const f of l)e.files.push(f);d()}function o(n){const i={encrypted:t("encrypted"),failed:t("failed"),"need-two":t("needTwo"),"need-one":t("needOne"),"need-image":t("needImage"),"need-keep":t("needKeep"),"bad-range":t("badRange"),"out-of-range":t("outOfRange"),image:t("imageFailed"),auth:t("authFailed"),register:t("registerFailed"),verify:t("verifyFail"),"try-later":t("tryLater"),mail:t("mailDown"),weak:t("weakPassword"),"run-local":t("runLocally"),"too-large":t("tooLarge"),"too-many":t("tooMany"),"ocr-engine":t("ocrEngine"),"need-doc":t("needDoc"),"need-text":t("needText"),"need-password":t("needPassword"),mismatch:t("passwordMismatch")};e.messageKind="err",e.message=i[n]||t("failed")}function m(n){e.messageKind="ok",e.message=n}async function D(){if(!R()){e.tools=E;return}try{const n=await Ee();n&&Array.isArray(n.tools)&&n.tools.length&&(e.tools=n.tools)}catch{e.tools=E}}async function L(){if(!R()){e.session={loaded:!0,apiConfigured:!1,apiReachable:!1,authenticated:!1,email:"",isPro:!1,remaining:null},e.tools=E,d();return}try{const[n]=await Promise.all([Te(),D()]);e.session={loaded:!0,apiConfigured:!0,apiReachable:!0,authenticated:!!n.authenticated,email:n.email||"",isPro:!!n.isPro,remaining:n.isPro?null:n.remaining}}catch{e.session={loaded:!0,apiConfigured:!0,apiReachable:!1,authenticated:!1,email:"",isPro:!1,remaining:null},await D()}d()}function w(n){const i=(e.tools||E).find(s=>s.id===n);return!!(i&&i.requiresPro)}async function g(n,i,s,l){if(!e.busy){if(w(n)&&e.session.loaded&&!e.session.isPro){e.paywall=!0,e.messageKind="",e.message="",d();return}if(!R()){o("run-local"),d();return}e.busy=!0,e.messageKind="",e.message=t("working"),d();try{const f=await Re(n,i,s);Le(f,l,Ve(l)),m(t("done")),await L()}catch(f){f&&f.code==="plan"?(e.paywall=!0,e.messageKind="",e.message=""):o(f&&f.code||"failed")}finally{e.busy=!1,d()}}}function k(){const n=e.session;return n.apiConfigured?n.apiReachable?n.isPro?t("remainingPro"):typeof n.remaining=="number"?t("remaining",n.remaining):t("remainingUnknown"):t("apiDown"):t("runLocally")}function O(){const n=Fe(),i=e.session,s=i.authenticated?`<span class="who">${r(i.email)}</span><button type="button" class="btn ghost small" id="logout">${r(t("logout"))}</button>`:`<a class="btn ghost small" href="#/login" data-nav="/login">${r(t("login"))}</a>`;return`<header class="top">
      <a class="brand" href="#/" data-nav="/">${Me()}<span class="word">StayPDF</span></a>
      <div class="top-right">
        <div class="pill" id="remain">${r(k())}</div>
        ${s}
        <div class="lang" role="group" aria-label="language">
          <button type="button" data-lang="zh" class="${n==="zh"?"on":""}">${t("langZh")}</button>
          <button type="button" data-lang="en" class="${n==="en"?"on":""}">${t("langEn")}</button>
        </div>
      </div>
    </header>`}function A(){return`<footer class="foot"><span>${r(t("privacyProof"))}</span><span>${r(t("footer"))}</span></footer>`}function _(){return e.paywall?`<div class="paywall" id="paywall">
      <div class="sheet" role="dialog" aria-modal="true" aria-labelledby="pw-title">
        <h2 id="pw-title">${r(t("paywallTitle"))}</h2>
        <p>${r(t("paywallBody"))}</p>
        <div class="price">$6 <span>/ mo</span></div>
        <div class="row">
          <button class="btn ghost" type="button" id="pw-close">${r(t("close"))}</button>
        </div>
      </div>
    </div>`:""}function y(n,i,s){return`<div class="drop" id="drop">
      <input id="file" type="file" ${i?"multiple":""} accept="${s}" />
      <strong>${r(n)}</strong>
      <span>${r(t("privacy"))}</span>
    </div>`}function b(){return e.files.length===0?"":`<div class="list">${e.files.map((i,s)=>{const l=`${Math.round(i.size/1024)} KB`;return`<div class="item" data-i="${s}">
          <div class="meta">
            <div class="name">${r(i.name)}</div>
            <div class="sub">${r(l)}</div>
          </div>
          <div class="ops">
            <button class="btn" data-act="up" ${s===0?"disabled":""}>${r(t("moveUp"))}</button>
            <button class="btn" data-act="down" ${s===e.files.length-1?"disabled":""}>${r(t("moveDown"))}</button>
            <button class="btn warn" data-act="rm">${r(t("remove"))}</button>
          </div>
        </div>`}).join("")}</div>
      <div class="row">
        <button class="btn ghost" id="clear" type="button">${r(t("clear"))}</button>
      </div>`}function I(){return`<div class="status${e.messageKind?` ${e.messageKind}`:""}" role="status">${r(e.message)}</div>`}function G(n){const i=Ne[n.id];if(!i)return"";const s=n.requiresPro?`<span class="badge">${r(t("proBadge"))}</span>`:'<span class="go">→</span>',l=`<h2>${r(t(i.title))}</h2>
          <p>${r(t(i.desc))}</p>
          ${s}`;return`<a class="card" href="#${i.href}" data-nav="${i.href}">${l}</a>`}function J(){const n=e.tools&&e.tools.length?e.tools:E,i=n.filter(l=>!l.requiresPro).map(G).join(""),s=n.filter(l=>l.requiresPro).map(G).join("");return`${O()}
      <section class="hero">
        <h1>${r(t("tagline"))}</h1>
        <div class="proof"><span class="dot"></span><div><b>${r(t("privacy"))}</b> ${r(t("privacyProof"))}</div></div>
      </section>
      <p class="plan-line">${r(t("planLine"))}</p>
      <h2 class="group-title">${r(t("freeTools"))}</h2>
      <div class="grid">${i}</div>
      <h2 class="group-title">${r(t("proTools"))}</h2>
      <div class="grid">${s}</div>
      ${A()}${_()}`}function h(n,i,s){return`${O()}
      <a class="crumb" href="#/" data-nav="/">${r(t("back"))}</a>
      <div class="panel">
        <h1 class="tool-title">${r(t(n))}</h1>
        <p class="lede">${r(t(i))}</p>
        ${s}
        ${I()}
      </div>
      ${A()}${_()}`}function ae(){return h("merge","mergeDesc",`${y(t("dropPdf"),!0,"application/pdf,.pdf")}
       ${b()}
       <div class="row">
         <button class="btn primary" id="run" type="button" ${e.busy?"disabled":""}>${r(t("runMerge"))}</button>
       </div>`)}function ne(){return h("split","splitDesc",`${y(t("dropPdfOne"),!1,"application/pdf,.pdf")}
       ${b()}
       <label class="field">${r(t("ranges"))}
         <input id="ranges" type="text" value="${r(e.ranges)}" placeholder="${r(t("rangesHint"))}" />
       </label>
       <div class="row">
         <button class="btn primary" id="run" type="button" ${e.busy?"disabled":""}>${r(t("runSplit"))}</button>
       </div>`)}function se(){return h("rotate","rotateDesc",`${y(t("dropPdfOne"),!1,"application/pdf,.pdf")}
       ${b()}
       <label class="field">${r(t("ranges"))}
         <input id="ranges" type="text" value="${r(e.ranges)}" placeholder="${r(t("rangesAllHint"))}" />
       </label>
       <div class="field">${r(t("angle"))}
         <div class="angles">
           <label><input type="radio" name="angle" value="90" ${e.angle===90?"checked":""}/> ${r(t("cw90"))}</label>
           <label><input type="radio" name="angle" value="180" ${e.angle===180?"checked":""}/> ${r(t("cw180"))}</label>
           <label><input type="radio" name="angle" value="270" ${e.angle===270?"checked":""}/> ${r(t("cw270"))}</label>
         </div>
       </div>
       <div class="row">
         <button class="btn primary" id="run" type="button" ${e.busy?"disabled":""}>${r(t("runRotate"))}</button>
       </div>`)}function oe(){return h("delete","deleteDesc",`${y(t("dropPdfOne"),!1,"application/pdf,.pdf")}
       ${b()}
       <label class="field">${r(t("ranges"))}
         <input id="ranges" type="text" value="${r(e.ranges)}" placeholder="${r(t("rangesHint"))}" />
       </label>
       <div class="row">
         <button class="btn primary" id="run" type="button" ${e.busy?"disabled":""}>${r(t("runDelete"))}</button>
       </div>`)}function ie(){return h("images","imagesDesc",`${y(t("dropImages"),!0,"image/jpeg,image/png,image/webp,image/gif,.jpg,.jpeg,.png,.webp")}
       ${b()}
       <label class="field">${r(t("fitA4"))}
         <select id="fit">
           <option value="a4" ${e.fit==="a4"?"selected":""}>${r(t("fitA4"))}</option>
           <option value="original" ${e.fit==="original"?"selected":""}>${r(t("fitOriginal"))}</option>
         </select>
       </label>
       <div class="row">
         <button class="btn primary" id="run" type="button" ${e.busy?"disabled":""}>${r(t("runImages"))}</button>
       </div>`)}function le(){return h("compress","compressDesc",`${y(t("dropPdfOne"),!1,"application/pdf,.pdf")}
       ${b()}
       <label class="field">${r(t("quality"))}
         <select id="quality">
           <option value="low" ${e.quality==="low"?"selected":""}>${r(t("qualityLow"))}</option>
           <option value="medium" ${e.quality==="medium"?"selected":""}>${r(t("qualityMed"))}</option>
           <option value="high" ${e.quality==="high"?"selected":""}>${r(t("qualityHigh"))}</option>
         </select>
       </label>
       <div class="row">
         <button class="btn primary" id="run" type="button" ${e.busy?"disabled":""}>${r(t("runCompress"))}</button>
       </div>`)}function de(){return h("ocr","ocrDesc",`${y(t("dropPdfOne"),!1,"application/pdf,.pdf")}
       ${b()}
       <label class="field">${r(t("ocrLang"))}
         <select id="ocr-lang">
           <option value="eng+chi_sim" ${e.ocrLang==="eng+chi_sim"?"selected":""}>English + 简体中文</option>
           <option value="eng" ${e.ocrLang==="eng"?"selected":""}>English</option>
           <option value="chi_sim" ${e.ocrLang==="chi_sim"?"selected":""}>简体中文</option>
         </select>
       </label>
       <div class="row">
         <button class="btn primary" id="run" type="button" ${e.busy?"disabled":""}>${r(t("runOcr"))}</button>
       </div>`)}function ce(){return h("word","wordDesc",`${y(t("dropWord"),!1,"application/pdf,.pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,.docx")}
       ${b()}
       <p class="hint">${r(t("wordHint"))}</p>
       <div class="row">
         <button class="btn primary" id="run" type="button" ${e.busy?"disabled":""}>${r(t("runWord"))}</button>
       </div>`)}function ue(){return h("watermark","watermarkDesc",`${y(t("dropPdfOne"),!1,"application/pdf,.pdf")}
       ${b()}
       <label class="field">${r(t("watermarkText"))}
         <input id="watermark-text" type="text" maxlength="80" value="${r(e.watermarkText)}" />
       </label>
       <div class="row">
         <button class="btn primary" id="run" type="button" ${e.busy?"disabled":""}>${r(t("runWatermark"))}</button>
       </div>`)}function pe(){return h("pageNumbers","pageNumbersDesc",`${y(t("dropPdfOne"),!1,"application/pdf,.pdf")}
       ${b()}
       <div class="row">
         <button class="btn primary" id="run" type="button" ${e.busy?"disabled":""}>${r(t("runPages"))}</button>
       </div>`)}function fe(){return h("pdfImages","pdfImagesDesc",`${y(t("dropPdfOne"),!1,"application/pdf,.pdf")}
       ${b()}
       <div class="row">
         <button class="btn primary" id="run" type="button" ${e.busy?"disabled":""}>${r(t("runPdfImages"))}</button>
       </div>`)}function me(){return h("protect","protectDesc",`${y(t("dropPdfOne"),!1,"application/pdf,.pdf")}
       ${b()}
       <label class="field">${r(t("protectPassword"))}
         <input id="protect-password" type="password" autocomplete="new-password" maxlength="72" value="${r(e.protectPassword)}" />
       </label>
       <label class="field">${r(t("protectConfirm"))}
         <input id="protect-confirm" type="password" autocomplete="new-password" maxlength="72" value="${r(e.protectConfirm)}" />
       </label>
       <p class="hint">${r(t("protectHint"))}</p>
       <div class="row">
         <button class="btn primary" id="run" type="button" ${e.busy?"disabled":""}>${r(t("runProtect"))}</button>
       </div>`)}function ge(){return`${O()}
      <a class="crumb" href="#/" data-nav="/">${r(t("back"))}</a>
      <div class="panel">
        <h1 class="tool-title">${r(t("loginTitle"))}</h1>
        <p class="lede">${r(t("loginBody"))}</p>
        <form id="login-form" class="login-form">
          <label class="field">${r(t("email"))}
            <input id="email" type="email" autocomplete="username" value="${r(e.email)}" required />
          </label>
          <label class="field">${r(t("password"))}
            <input id="password" type="password" autocomplete="current-password" value="${r(e.password)}" required />
          </label>
          <div class="row">
            <button class="btn primary" type="submit" ${e.busy?"disabled":""}>${r(t("loginSubmit"))}</button>
          </div>
        </form>
        <p class="auth-switch"><a href="#/register" data-nav="/register">${r(t("needAccount"))}</a></p>
        ${I()}
      </div>
      ${A()}`}function we(){const i=X()?'<div id="turnstile-slot" class="turnstile"></div>':"";return`${O()}
      <a class="crumb" href="#/" data-nav="/">${r(t("back"))}</a>
      <div class="panel">
        <h1 class="tool-title">${r(t("registerTitle"))}</h1>
        <p class="lede">${r(t("registerBody"))}</p>
        <form id="register-form" class="login-form">
          <div class="sr" aria-hidden="true">
            <label>Company
              <input id="company" type="text" name="company" tabindex="-1" autocomplete="off" />
            </label>
          </div>
          <label class="field">${r(t("email"))}
            <input id="email" type="email" autocomplete="username" value="${r(e.email)}" required />
          </label>
          <label class="field">${r(t("password"))}
            <input id="password" type="password" autocomplete="new-password" value="${r(e.password)}" required />
          </label>
          <label class="field">${r(t("confirmPassword"))}
            <input id="confirm" type="password" autocomplete="new-password" value="${r(e.confirmPassword)}" required />
          </label>
          <p class="hint">${r(t("passwordHint"))}</p>
          ${i}
          <div class="row">
            <button class="btn primary" type="submit" ${e.busy?"disabled":""}>${r(t("registerSubmit"))}</button>
          </div>
        </form>
        <p class="auth-switch"><a href="#/login" data-nav="/login">${r(t("haveAccount"))}</a></p>
        ${I()}
      </div>
      ${A()}`}function ye(){return`${O()}
      <a class="crumb" href="#/" data-nav="/">${r(t("back"))}</a>
      <div class="panel">
        <h1 class="tool-title">${r(t("verifyTitle"))}</h1>
        <p class="lede">${r(e.messageKind==="ok"?t("verifyOk"):e.messageKind==="err"?t("verifyFail"):t("verifyWorking"))}</p>
        ${e.messageKind==="ok"?`<p class="auth-switch"><a href="#/login" data-nav="/login">${r(t("login"))}</a></p>`:""}
        ${e.messageKind==="err"?`<p class="hint">${r(t("resendHint"))}</p>
        <form id="resend-form" class="login-form">
          <label class="field">${r(t("email"))}
            <input id="email" type="email" autocomplete="username" value="${r(e.email)}" required />
          </label>
          <div class="row">
            <button class="btn primary" type="submit" ${e.busy?"disabled":""}>${r(t("resend"))}</button>
          </div>
        </form>`:""}
        ${I()}
      </div>
      ${A()}`}function be(){a.querySelectorAll("[data-lang]").forEach(s=>{s.addEventListener("click",()=>{te(s.getAttribute("data-lang")),d()})}),a.querySelectorAll("[data-nav]").forEach(s=>{s.addEventListener("click",l=>{l.preventDefault();const f=s.getAttribute("data-nav");u(),c(f)})});const n=a.querySelector("#pw-close");n&&n.addEventListener("click",()=>{e.paywall=!1,d()});const i=a.querySelector("#logout");i&&i.addEventListener("click",async()=>{try{await Ce()}catch{}await L()})}function N(n){const i=a.querySelector("#drop"),s=a.querySelector("#file");if(!i||!s)return;const l=v=>p(v,n);s.addEventListener("change",()=>{l(s.files),s.value=""}),i.addEventListener("dragover",v=>{v.preventDefault(),i.classList.add("over")}),i.addEventListener("dragleave",()=>i.classList.remove("over")),i.addEventListener("drop",v=>{v.preventDefault(),i.classList.remove("over"),l(v.dataTransfer.files)}),a.querySelectorAll(".item").forEach(v=>{v.addEventListener("click",De=>{const Y=De.target.closest("button");if(!Y)return;const $=Number(v.getAttribute("data-i")),V=Y.getAttribute("data-act");if(V==="rm"&&e.files.splice($,1),V==="up"&&$>0){const z=e.files[$-1];e.files[$-1]=e.files[$],e.files[$]=z}if(V==="down"&&$<e.files.length-1){const z=e.files[$+1];e.files[$+1]=e.files[$],e.files[$]=z}d()})});const f=a.querySelector("#clear");f&&f.addEventListener("click",()=>{e.files=[],d()});const S=a.querySelector("#ranges");S&&S.addEventListener("input",()=>{e.ranges=S.value});const C=a.querySelector("#fit");C&&C.addEventListener("change",()=>{e.fit=C.value});const T=a.querySelector("#quality");T&&T.addEventListener("change",()=>{e.quality=T.value});const H=a.querySelector("#ocr-lang");H&&H.addEventListener("change",()=>{e.ocrLang=H.value});const B=a.querySelector("#watermark-text");B&&B.addEventListener("input",()=>{e.watermarkText=B.value});const K=a.querySelector("#protect-password");K&&K.addEventListener("input",()=>{e.protectPassword=K.value});const M=a.querySelector("#protect-confirm");M&&M.addEventListener("input",()=>{e.protectConfirm=M.value}),a.querySelectorAll('input[name="angle"]').forEach(v=>{v.addEventListener("change",()=>{e.angle=Number(v.value)})})}function he(){const n=a.querySelector("#login-form");if(!n)return;const i=a.querySelector("#email"),s=a.querySelector("#password");i&&i.addEventListener("input",()=>{e.email=i.value}),s&&s.addEventListener("input",()=>{e.password=s.value}),n.addEventListener("submit",async l=>{if(l.preventDefault(),!e.busy){e.busy=!0,e.message=t("working"),e.messageKind="",d();try{await qe(e.email,e.password),e.password="",e.busy=!1,await L(),c("/")}catch{o("auth"),e.busy=!1,d()}}})}function ve(){const n=a.querySelector("#register-form");if(!n)return;const i=a.querySelector("#email"),s=a.querySelector("#password"),l=a.querySelector("#confirm");i&&i.addEventListener("input",()=>{e.email=i.value}),s&&s.addEventListener("input",()=>{e.password=s.value}),l&&l.addEventListener("input",()=>{e.confirmPassword=l.value});const f=X();f&&Ke(f,S=>{e.turnstileToken=S}),n.addEventListener("submit",async S=>{if(S.preventDefault(),e.busy)return;if(!Be(e.password)){o("weak"),d();return}if(e.password!==e.confirmPassword){o("mismatch"),d();return}const C=(a.querySelector("#company")||{}).value||"";e.busy=!0,e.message=t("working"),e.messageKind="",d();try{await xe(e.email,e.password,{company:C,turnstile:e.turnstileToken}),e.password="",e.confirmPassword="",e.turnstileToken="",e.busy=!1,m(t("checkEmail")),d()}catch(T){o(T&&T.code||"register"),e.busy=!1,d()}})}function $e(){const n=a.querySelector("#resend-form");if(n){const s=a.querySelector("#email");s&&s.addEventListener("input",()=>{e.email=s.value}),n.addEventListener("submit",async l=>{if(l.preventDefault(),!e.busy){e.busy=!0,e.message=t("working"),e.messageKind="",d();try{await Ae(e.email),e.busy=!1,m(t("checkEmail")),d()}catch(f){o(f&&f.code||"register"),e.busy=!1,d()}}})}if(e.verifyOnce)return;e.verifyOnce=!0;const i=He().get("token")||"";if(!i){o("verify"),d();return}e.busy=!0,e.message=t("verifyWorking"),e.messageKind="",(async()=>{try{await Oe(i),e.busy=!1,m(t("verifyOk")),d()}catch{o("verify"),e.busy=!1,d()}})()}function Pe(n){const i=a.querySelector("#run");i&&i.addEventListener("click",async()=>{if(n==="/merge"){if(e.files.length<2)return o("need-two"),d();await g("merge",e.files,{},"merged.pdf")}else if(n==="/split"){const s=e.files[0];if(!s)return o("need-one"),d();const l=j(e.ranges,9999);if(!l.ok)return o(l.error==="empty"?"bad-range":l.error),d();await g("split",[s],{ranges:e.ranges},`${P(s.name)}-extract.pdf`)}else if(n==="/rotate"){const s=e.files[0];if(!s)return o("need-one"),d();if(e.ranges.trim()){const l=j(e.ranges,9999);if(!l.ok)return o(l.error==="empty"?"bad-range":l.error),d()}await g("rotate",[s],{ranges:e.ranges,angle:e.angle},`${P(s.name)}-rotated.pdf`)}else if(n==="/delete"){const s=e.files[0];if(!s)return o("need-one"),d();const l=j(e.ranges,9999);if(!l.ok)return o(l.error==="empty"?"bad-range":l.error),d();await g("delete",[s],{ranges:e.ranges},`${P(s.name)}-deleted.pdf`)}else if(n==="/images"){if(e.files.length===0)return o("need-image"),d();await g("images",e.files,{fit:e.fit},"images.pdf")}else if(n==="/compress"){const s=e.files[0];if(!s)return o("need-one"),d();await g("compress",[s],{quality:e.quality},`${P(s.name)}-compressed.pdf`)}else if(n==="/ocr"){const s=e.files[0];if(!s)return o("need-one"),d();await g("ocr",[s],{lang:e.ocrLang},`${P(s.name)}-ocr.txt`)}else if(n==="/word"){const s=e.files[0];if(!s)return o("need-doc"),d();const l=Q(s)?`${P(s.name)}-converted.pdf`:`${P(s.name)}-converted.docx`;await g("word",[s],{},l)}else if(n==="/watermark"){const s=e.files[0];if(!s)return o("need-one"),d();const l=(e.watermarkText||"").trim();if(!l)return o("need-text"),d();await g("watermark",[s],{text:l},`${P(s.name)}-watermark.pdf`)}else if(n==="/pages"){const s=e.files[0];if(!s)return o("need-one"),d();await g("pages",[s],{},`${P(s.name)}-pages.pdf`)}else if(n==="/pdf-images"){const s=e.files[0];if(!s)return o("need-one"),d();await g("pdf-images",[s],{},`${P(s.name)}-pages.zip`)}else if(n==="/protect"){const s=e.files[0];if(!s)return o("need-one"),d();const l=e.protectPassword||"";if(l.length<4||l.length>72)return o("need-password"),d();if(l!==(e.protectConfirm||""))return o("mismatch"),d();await g("protect",[s],{password:l},`${P(s.name)}-protected.pdf`),e.protectPassword="",e.protectConfirm=""}})}let W=null;function d(){const n=We();W&&W!==n&&(u(),e.verifyOnce=!1,e.turnstileToken=""),W=n;const i={"/":J,"/merge":ae,"/split":ne,"/rotate":se,"/delete":oe,"/images":ie,"/compress":le,"/ocr":de,"/word":ce,"/watermark":ue,"/pages":pe,"/pdf-images":fe,"/protect":me,"/login":ge,"/register":we,"/verify":ye};a.innerHTML=`<div class="app">${(i[n]||J)()}</div>`,be(),n==="/merge"?N("pdf"):n==="/images"?N("image"):n==="/word"?N("one-word"):n==="/login"?he():n==="/register"?ve():n==="/verify"?$e():n!=="/"&&N("one-pdf"),Pe(n)}return window.addEventListener("hashchange",d),d(),L(),{draw:d}}ze(document.getElementById("app"));
