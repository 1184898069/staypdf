(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const p of document.querySelectorAll('link[rel="modulepreload"]'))u(p);new MutationObserver(p=>{for(const o of p)if(o.type==="childList")for(const m of o.addedNodes)m.tagName==="LINK"&&m.rel==="modulepreload"&&u(m)}).observe(document,{childList:!0,subtree:!0});function d(p){const o={};return p.integrity&&(o.integrity=p.integrity),p.referrerPolicy&&(o.referrerPolicy=p.referrerPolicy),p.crossOrigin==="use-credentials"?o.credentials="include":p.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function u(p){if(p.ep)return;p.ep=!0;const o=d(p);fetch(p.href,o)}})();const te="staypdf-lang",j={en:{brand:"StayPDF",tagline:"PDF tools. Processed in memory, not stored.",privacy:"Processed in server memory, then discarded.",privacyProof:"Files are sent to the StayPDF API, transformed in memory, and the result is downloaded. Bytes are not written to disk and are not stored.",langZh:"中文",langEn:"EN",remaining:a=>`${a} free export${a===1?"":"s"} left today`,remainingPro:"Pro",remainingUnknown:"Sign in for unlimited exports",tools:"Tools",home:"All tools",merge:"Merge PDFs",mergeDesc:"Combine two or more PDFs into one file. Drag to reorder.",split:"Split PDF",splitDesc:"Extract page ranges into a new PDF.",rotate:"Rotate pages",rotateDesc:"Turn selected pages 90°, 180°, or 270° clockwise.",delete:"Delete pages",deleteDesc:"Remove pages and download the rest.",images:"Images → PDF",imagesDesc:"Turn JPG, PNG, or WebP images into a single PDF.",compress:"Compress PDF",compressDesc:"Shrink image-heavy PDFs. Vector-only files may not get smaller.",ocr:"OCR / scan to text",ocrDesc:"Extract text from a digital PDF, or OCR a scan when Tesseract is installed.",word:"PDF ↔ Word",wordDesc:"Convert PDF to Word or Word to PDF. Text-based: tables, images, and complex layout are simplified.",advanced:"Advanced",proComing:"Pro coming",proBadge:"Pro",freeTools:"Basic tools",proTools:"Pro tools",planLine:"Free: 3 exports per UTC day and basic tools. Pro: unlimited exports, compress, OCR, Word, watermark, page numbers, PDF → images, password protect, unlock, and larger files. Payments are not connected yet; locally, sign in with the STAYPDF_TEST_* account from .env.",watermark:"Watermark",watermarkDesc:"Draw diagonal text on every page.",watermarkText:"Watermark text",runWatermark:"Add watermark & download",pageNumbers:"Page numbers",pageNumbersDesc:"Add “1 / N” at the bottom of every page.",runPages:"Add page numbers & download",pdfImages:"PDF → images",pdfImagesDesc:"Rasterize each page to PNG and download a zip.",runPdfImages:"Export images & download",protect:"Protect PDF",protectDesc:"Lock a PDF with a password (128-bit). Other StayPDF tools still cannot open encrypted files.",protectPassword:"Password",protectConfirm:"Confirm password",protectHint:"4–72 characters. Remember it — use Unlock with the same password to remove protection.",runProtect:"Protect & download",unlock:"Unlock PDF",unlockDesc:"Remove a PDF user password when you know it. This is not a cracker for unknown passwords.",runUnlock:"Unlock & download",badPassword:"Wrong password for this PDF.",needPassword:"Set a password of 4–72 characters.",needText:"Add watermark text first.",dropWord:"Drop a PDF or Word file here, or click to choose",runCompress:"Compress & download",runOcr:"Extract text & download",runWord:"Convert & download",quality:"Quality",qualityLow:"Low (smaller file)",qualityMed:"Medium",qualityHigh:"High (clearer)",ocrLang:"Language",needDoc:"Add a PDF or Word file first.",wordHint:"Text-based conversion. Tables, images, and complex layout will be simplified.",ocrEngine:"OCR for scans needs Tesseract on the server. Digital PDFs still work.",dropPdf:"Drop PDFs here, or click to choose",dropPdfOne:"Drop a PDF here, or click to choose",dropImages:"Drop images here, or click to choose",addMore:"Add more",clear:"Clear",files:"Files",pages:"pages",page:"page",moveUp:"Up",moveDown:"Down",remove:"Remove",ranges:"Pages",rangesHint:"Example: 1-3, 5, 8-10",rangesAllHint:"Leave blank for all pages, or e.g. 1-3, 5",angle:"Rotation",cw90:"90° clockwise",cw180:"180°",cw270:"270° clockwise",fitA4:"Fit to A4",fitOriginal:"Original aspect, max A4",runMerge:"Merge & download",runSplit:"Extract & download",runRotate:"Rotate & download",runDelete:"Delete & download",runImages:"Create PDF & download",needTwo:"Add at least two PDFs.",needOne:"Add a PDF first.",needImage:"Add at least one image.",needKeep:"You must keep at least one page.",badRange:"Check the page list. Use numbers and ranges like 1-3, 5.",outOfRange:"A page number is outside this file.",encrypted:"This PDF is encrypted. Use Unlock with the correct password first.",failed:"Could not process this file. Try another PDF.",imageFailed:"Could not read an image. Use JPG, PNG, or WebP.",working:"Working…",done:"Downloaded. The upload was processed in memory and discarded.",paywallTitle:"Upgrade to continue",paywallBody:"StayPDF Pro is $6/month for unlimited exports plus extra tools and larger files. Payments are not connected yet. Locally, sign in with the STAYPDF_TEST_* account from .env.",close:"Not now",footer:"MIT · Files are not kept after the response is sent.",back:"← Tools",login:"Log in",logout:"Log out",email:"Email",password:"Password",loginSubmit:"Log in",loginTitle:"Log in",loginBody:"Sign in with a verified account. Create one if you do not have it yet.",authFailed:"Could not sign in. Check the email and password.",register:"Create account",registerTitle:"Create an account",registerBody:"We will send a short verification link to your email. You can sign in after you open it.",registerSubmit:"Create account",confirmPassword:"Confirm password",passwordHint:"At least 10 characters, with a letter and a number.",passwordMismatch:"Passwords do not match.",weakPassword:"Use at least 10 characters, including a letter and a number.",checkEmail:"If that address can be used, we sent a message.",haveAccount:"Already have an account? Log in",needAccount:"Need an account? Create one",verifyTitle:"Verify email",verifyWorking:"Verifying your email…",verifyOk:"Email verified. You can log in now.",verifyFail:"This link is not valid or has expired.",resend:"Resend the email",resendHint:"Did not get it? We can send the message again.",tryLater:"Please wait and try again.",mailDown:"Email is not available right now.",registerFailed:"Could not create this account.",runLocally:"Run locally to process files.",apiDown:"Cannot reach the StayPDF API. Start it locally to process files.",tooLarge:"A file is larger than your plan allows.",tooMany:"Too many files for your plan."},zh:{brand:"StayPDF",tagline:"PDF 工具。在内存中处理，不落盘保存。",privacy:"在服务器内存中处理，随后丢弃。",privacyProof:"文件发送到 StayPDF API，在内存中转换，再下载结果。不会写入磁盘，也不会存储。",langZh:"中文",langEn:"EN",remaining:a=>`今日剩余 ${a} 次免费导出`,remainingPro:"Pro",remainingUnknown:"登录后可不限次导出",tools:"工具",home:"全部工具",merge:"合并 PDF",mergeDesc:"将两份及以上 PDF 合成一份。可调整顺序。",split:"拆分 PDF",splitDesc:"按页码范围提取页面，生成新的 PDF。",rotate:"旋转页面",rotateDesc:"将指定页面顺时针旋转 90°、180° 或 270°。",delete:"删除页面",deleteDesc:"去掉不想要的页，下载剩余内容。",images:"图片转 PDF",imagesDesc:"把 JPG、PNG、WebP 图片合成一份 PDF。",compress:"压缩 PDF",compressDesc:"压缩以图片为主的 PDF。纯矢量文件未必会变小。",ocr:"OCR 识别文字",ocrDesc:"从数字 PDF 提取文字；扫描件在安装 Tesseract 时可识别。",word:"PDF ↔ Word",wordDesc:"在 PDF 与 Word 之间转换。按文本处理：表格、图片和复杂版式会被简化。",advanced:"进阶",proComing:"Pro 即将推出",proBadge:"Pro",freeTools:"基础工具",proTools:"Pro 工具",planLine:"免费：每天（UTC）3 次导出和基础工具。Pro：不限次数，另含压缩、OCR、Word、水印、页码、PDF 转图片、密码保护、解锁，以及更大文件。支付尚未接入；本地可用 .env 中的 STAYPDF_TEST_* 账号登录体验 Pro。",watermark:"水印",watermarkDesc:"在每一页加上斜向文字水印。",watermarkText:"水印文字",runWatermark:"添加水印并下载",pageNumbers:"页码",pageNumbersDesc:"在每页底部加上 “1 / N”。",runPages:"添加页码并下载",pdfImages:"PDF 转图片",pdfImagesDesc:"将每一页渲染为 PNG，打包成 zip 下载。",runPdfImages:"导出图片并下载",protect:"密码保护",protectDesc:"给 PDF 加上打开密码（128 位）。其他 StayPDF 工具仍无法打开已加密文件。",protectPassword:"密码",protectConfirm:"确认密码",protectHint:"4–72 个字符。请牢记密码——可用「解锁」工具用同一密码去掉保护。",runProtect:"加密并下载",unlock:"解锁 PDF",unlockDesc:"在已知用户密码时移除 PDF 打开密码。这不是暴力破解未知密码的工具。",runUnlock:"解锁并下载",badPassword:"密码不正确。",needPassword:"请设置 4–72 个字符的密码。",needText:"请先填写水印文字。",dropWord:"把 PDF 或 Word 拖到这里，或点击选择",runCompress:"压缩并下载",runOcr:"提取文字并下载",runWord:"转换并下载",quality:"质量",qualityLow:"低（文件更小）",qualityMed:"中",qualityHigh:"高（更清晰）",ocrLang:"语言",needDoc:"请先添加一份 PDF 或 Word 文件。",wordHint:"按文本转换。表格、图片和复杂版式会被简化。",ocrEngine:"扫描件 OCR 需要服务器安装 Tesseract。数字 PDF 仍可提取文字。",dropPdf:"把 PDF 拖到这里，或点击选择",dropPdfOne:"把一份 PDF 拖到这里，或点击选择",dropImages:"把图片拖到这里，或点击选择",addMore:"继续添加",clear:"清空",files:"文件",pages:"页",page:"页",moveUp:"上移",moveDown:"下移",remove:"移除",ranges:"页码",rangesHint:"例如：1-3, 5, 8-10",rangesAllHint:"留空表示全部页面，或如 1-3, 5",angle:"旋转角度",cw90:"顺时针 90°",cw180:"180°",cw270:"顺时针 270°",fitA4:"适应 A4",fitOriginal:"原比例，最大 A4",runMerge:"合并并下载",runSplit:"提取并下载",runRotate:"旋转并下载",runDelete:"删除并下载",runImages:"生成 PDF 并下载",needTwo:"请至少添加两份 PDF。",needOne:"请先添加一份 PDF。",needImage:"请至少添加一张图片。",needKeep:"至少需要保留一页。",badRange:"请检查页码。使用数字和范围，例如 1-3, 5。",outOfRange:"页码超出了这份文件的页数。",encrypted:"这份 PDF 已加密。请先用「解锁」工具并输入正确密码。",failed:"无法处理该文件，请换一份 PDF 试试。",imageFailed:"无法读取图片。请使用 JPG、PNG 或 WebP。",working:"处理中…",done:"已下载。上传内容在内存中处理并已丢弃。",paywallTitle:"升级后继续",paywallBody:"StayPDF Pro 为 $6/月，不限次数，并含更多工具和更大文件。支付尚未接入。本地可用 .env 中的 STAYPDF_TEST_* 账号登录。",close:"稍后再说",footer:"MIT · 响应发送后不保留文件。",back:"← 全部工具",login:"登录",logout:"退出",email:"邮箱",password:"密码",loginSubmit:"登录",loginTitle:"登录",loginBody:"请使用已验证的账号登录。没有账号可以先注册。",authFailed:"无法登录，请检查邮箱和密码。",register:"注册",registerTitle:"创建账号",registerBody:"我们会向邮箱发送一封验证邮件。打开链接后即可登录。",registerSubmit:"注册",confirmPassword:"确认密码",passwordHint:"至少 10 个字符，需包含字母和数字。",passwordMismatch:"两次输入的密码不一致。",weakPassword:"密码至少 10 个字符，并包含字母和数字。",checkEmail:"如果该地址可以使用，我们已发送邮件。",haveAccount:"已有账号？去登录",needAccount:"没有账号？去注册",verifyTitle:"验证邮箱",verifyWorking:"正在验证邮箱…",verifyOk:"邮箱已验证，现在可以登录。",verifyFail:"链接无效或已过期。",resend:"重新发送邮件",resendHint:"没收到？可以再发一次。",tryLater:"请稍后再试。",mailDown:"当前无法发送邮件。",registerFailed:"无法创建该账号。",runLocally:"请在本地运行后再处理文件。",apiDown:"无法连接 StayPDF API。请先在本地启动后再处理文件。",tooLarge:"文件超过了当前套餐允许的大小。",tooMany:"文件数量超过了当前套餐限制。"}};function Fe(){try{const e=localStorage.getItem(te);if(e==="zh"||e==="en")return e}catch{}const a=typeof navigator<"u"&&navigator.language||"";return/^zh\b/i.test(a)?"zh":"en"}let x=Fe();function Te(){return x}function re(a){x=a==="zh"?"zh":"en";try{localStorage.setItem(te,x)}catch{}typeof document<"u"&&(document.documentElement.lang=x==="zh"?"zh-CN":"en")}function t(a,...e){const u=(j[x]||j.en)[a]??j.en[a]??a;return typeof u=="function"?u(...e):u}re(x);function _(a,e){if(typeof a!="string")return{ok:!1,pages:[],error:"empty"};const d=a.trim();if(!d)return{ok:!1,pages:[],error:"empty"};if(!Number.isInteger(e)||e<1)return{ok:!1,pages:[],error:"bad-count"};const u=d.split(/[,，]/).map(m=>m.trim()).filter(Boolean);if(u.length===0)return{ok:!1,pages:[],error:"empty"};const p=[],o=new Set;for(const m of u){const k=m.match(/^(\d+)\s*[-–—~～]\s*(\d+)$/),F=m.match(/^(\d+)$/);if(k){let w=Number(k[1]),g=Number(k[2]);if(!Number.isInteger(w)||!Number.isInteger(g))return{ok:!1,pages:[],error:"invalid"};if(w>g){const D=w;w=g,g=D}if(w<1||g>e)return{ok:!1,pages:[],error:"out-of-range"};for(let D=w;D<=g;D+=1)o.has(D)||(o.add(D),p.push(D))}else if(F){const w=Number(F[1]);if(!Number.isInteger(w)||w<1||w>e)return{ok:!1,pages:[],error:"out-of-range"};o.has(w)||(o.add(w),p.push(w))}else return{ok:!1,pages:[],error:"invalid"}}return p.length===0?{ok:!1,pages:[],error:"empty"}:{ok:!0,pages:p,error:null}}function Se(a,e,d="application/pdf"){const u=new Blob([a],{type:d}),p=URL.createObjectURL(u),o=document.createElement("a");o.href=p,o.download=e,document.body.appendChild(o),o.click(),o.remove(),setTimeout(()=>URL.revokeObjectURL(p),1500)}function r(a){return String(a).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function Q(a){if(!a)return!1;const e=(a.type||"").toLowerCase(),d=(a.name||"").toLowerCase();return e==="application/pdf"||d.endsWith(".pdf")}function Ee(a){if(!a)return!1;const e=(a.type||"").toLowerCase(),d=(a.name||"").toLowerCase();return e.startsWith("image/")?!0:/\.(png|jpe?g|webp|gif|bmp)$/i.test(d)}function X(a){if(!a)return!1;const e=(a.type||"").toLowerCase(),d=(a.name||"").toLowerCase();return e==="application/vnd.openxmlformats-officedocument.wordprocessingml.document"||e==="application/vnd.ms-word.document.macroenabled.12"||d.endsWith(".docx")}function R(){return null}function ee(){return""}async function L(a,e={}){const d=R();if(!d){const o=new Error("run-local");throw o.code="run-local",o}const u={...e.headers||{}};return e.body&&!(e.body instanceof FormData)&&!u["Content-Type"]&&(u["Content-Type"]="application/json"),await fetch(`${d}${a}`,{credentials:"include",...e,headers:u})}function ae(a,e){const d=new Error(e);throw a.status===429?d.code="try-later":a.status===503?d.code="mail":d.code=e,d}async function qe(){const a=await L("/api/auth/me");if(!a.ok){const e=new Error("failed");throw e.code="failed",e}return a.json()}async function xe(){const a=await L("/api/plan");if(!a.ok){const e=new Error("failed");throw e.code="failed",e}return a.json()}async function Oe(a,e){const d=await L("/api/auth/login",{method:"POST",body:JSON.stringify({email:a,password:e})});if(!d.ok){const u=new Error("auth");throw u.code="auth",u}return d.json()}async function Ae(a,e,d={}){const u=await L("/api/auth/register",{method:"POST",body:JSON.stringify({email:a,password:e,company:d.company||"","cf-turnstile-response":d.turnstile||""})});return u.ok||ae(u,"register"),u.json()}async function Ce(a){const e=await L("/api/auth/verify",{method:"POST",body:JSON.stringify({token:a})});if(!e.ok){const d=new Error("verify");throw d.code="verify",d}return e.json()}async function Re(a){const e=await L("/api/auth/resend-verification",{method:"POST",body:JSON.stringify({email:a})});return e.ok||ae(e,"register"),e.json()}async function Ie(){await L("/api/auth/logout",{method:"POST"})}async function Ne(a,e,d={}){const u=new FormData;for(const o of e)u.append("files",o);for(const[o,m]of Object.entries(d))m==null||m===""||u.append(o,String(m));const p=await L(`/api/jobs/${a}`,{method:"POST",body:u});if(p.status===402){const o=new Error("plan");throw o.code="plan",o}if(!p.ok){let o="failed";try{const k=await p.json();k&&typeof k.code=="string"&&(o=k.code)}catch{}const m=new Error(o);throw m.code=o,m}return new Uint8Array(await p.arrayBuffer())}const E=[{id:"merge",requiresPro:!1},{id:"split",requiresPro:!1},{id:"rotate",requiresPro:!1},{id:"delete",requiresPro:!1},{id:"images",requiresPro:!1},{id:"compress",requiresPro:!0},{id:"ocr",requiresPro:!0},{id:"word",requiresPro:!0},{id:"watermark",requiresPro:!0},{id:"pages",requiresPro:!0},{id:"pdf-images",requiresPro:!0},{id:"protect",requiresPro:!0},{id:"unlock",requiresPro:!0}],We=["/","/merge","/split","/rotate","/delete","/images","/compress","/ocr","/word","/watermark","/pages","/pdf-images","/protect","/unlock","/login","/register","/verify"],He={merge:{href:"/merge",title:"merge",desc:"mergeDesc"},split:{href:"/split",title:"split",desc:"splitDesc"},rotate:{href:"/rotate",title:"rotate",desc:"rotateDesc"},delete:{href:"/delete",title:"delete",desc:"deleteDesc"},images:{href:"/images",title:"images",desc:"imagesDesc"},compress:{href:"/compress",title:"compress",desc:"compressDesc"},ocr:{href:"/ocr",title:"ocr",desc:"ocrDesc"},word:{href:"/word",title:"word",desc:"wordDesc"},watermark:{href:"/watermark",title:"watermark",desc:"watermarkDesc"},pages:{href:"/pages",title:"pageNumbers",desc:"pageNumbersDesc"},"pdf-images":{href:"/pdf-images",title:"pdfImages",desc:"pdfImagesDesc"},protect:{href:"/protect",title:"protect",desc:"protectDesc"},unlock:{href:"/unlock",title:"unlock",desc:"unlockDesc"}};function Ue(){const e=(location.hash||"#/").replace(/^#/,"").split("?")[0]||"/";return We.includes(e)?e:"/"}function Be(){const a=(location.hash||"#/").replace(/^#/,""),e=a.includes("?")?a.slice(a.indexOf("?")+1):"";return new URLSearchParams(e)}function Ke(a){return a.length>=10&&/[A-Za-z]/.test(a)&&/\d/.test(a)}let q=null;function Me(a,e){const d=document.getElementById("turnstile-slot");if(!d||!a)return;const u=()=>{window.turnstile&&(d.innerHTML="",window.turnstile.render(d,{sitekey:a,theme:"dark",callback:e}))};if(window.turnstile){u();return}q||(q=document.createElement("script"),q.src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit",q.async=!0,document.head.appendChild(q)),q.addEventListener("load",u,{once:!0})}function Ve(){return`<svg class="mark" viewBox="0 0 28 28" aria-hidden="true">
    <rect x="3" y="3" width="22" height="22" rx="6" fill="#1d221d" stroke="#b6e07a" stroke-width="1.4"/>
    <path d="M8 18.5V9.5h5.2c2.3 0 3.7 1.2 3.7 3.1 0 1.9-1.4 3.1-3.7 3.1H10.6V18.5H8zm2.6-4.6h2.3c1.1 0 1.7-.5 1.7-1.4s-.6-1.4-1.7-1.4h-2.3v2.8z" fill="#eef3ea"/>
  </svg>`}function $(a,e="document"){return String(a||e).replace(/\.[^.]+$/,"")||e}function ze(a){const e=String(a||"").toLowerCase();return e.endsWith(".txt")?"text/plain;charset=utf-8":e.endsWith(".zip")?"application/zip":e.endsWith(".docx")?"application/vnd.openxmlformats-officedocument.wordprocessingml.document":"application/pdf"}function je(a){const e={files:[],message:"",messageKind:"",busy:!1,paywall:!1,angle:90,fit:"a4",quality:"medium",ocrLang:"eng+chi_sim",ranges:"",watermarkText:"",protectPassword:"",protectConfirm:"",unlockPassword:"",tools:E,email:"",password:"",confirmPassword:"",turnstileToken:"",verifyOnce:!1,session:{loaded:!1,apiConfigured:!!R(),apiReachable:!1,authenticated:!1,email:"",isPro:!1,remaining:null}};function d(s){location.hash!==`#${s}`?location.hash=s:c()}function u(){e.files=[],e.message="",e.messageKind="",e.busy=!1,e.angle=90,e.fit="a4",e.quality="medium",e.ocrLang="eng+chi_sim",e.ranges="",e.watermarkText="",e.protectPassword="",e.protectConfirm="",e.unlockPassword=""}function p(s,i){const l=Array.from(s||[]).filter(f=>i==="image"?Ee(f):i==="one-word"?Q(f)||X(f):Q(f));if(i==="one-pdf"||i==="one-word"){const f=l[0];f&&(e.files=[f]),c();return}for(const f of l)e.files.push(f);c()}function o(s){const i={encrypted:t("encrypted"),failed:t("failed"),"need-two":t("needTwo"),"need-one":t("needOne"),"need-image":t("needImage"),"need-keep":t("needKeep"),"bad-range":t("badRange"),"out-of-range":t("outOfRange"),image:t("imageFailed"),auth:t("authFailed"),register:t("registerFailed"),verify:t("verifyFail"),"try-later":t("tryLater"),mail:t("mailDown"),weak:t("weakPassword"),"run-local":t("runLocally"),"too-large":t("tooLarge"),"too-many":t("tooMany"),"ocr-engine":t("ocrEngine"),"need-doc":t("needDoc"),"need-text":t("needText"),"need-password":t("needPassword"),"bad-password":t("badPassword"),mismatch:t("passwordMismatch")};e.messageKind="err",e.message=i[s]||t("failed")}function m(s){e.messageKind="ok",e.message=s}async function k(){if(!R()){e.tools=E;return}try{const s=await xe();s&&Array.isArray(s.tools)&&s.tools.length&&(e.tools=s.tools)}catch{e.tools=E}}async function F(){if(!R()){e.session={loaded:!0,apiConfigured:!1,apiReachable:!1,authenticated:!1,email:"",isPro:!1,remaining:null},e.tools=E,c();return}try{const[s]=await Promise.all([qe(),k()]);e.session={loaded:!0,apiConfigured:!0,apiReachable:!0,authenticated:!!s.authenticated,email:s.email||"",isPro:!!s.isPro,remaining:s.isPro?null:s.remaining}}catch{e.session={loaded:!0,apiConfigured:!0,apiReachable:!1,authenticated:!1,email:"",isPro:!1,remaining:null},await k()}c()}function w(s){const i=(e.tools||E).find(n=>n.id===s);return!!(i&&i.requiresPro)}async function g(s,i,n,l){if(!e.busy){if(w(s)&&e.session.loaded&&!e.session.isPro){e.paywall=!0,e.messageKind="",e.message="",c();return}if(!R()){o("run-local"),c();return}e.busy=!0,e.messageKind="",e.message=t("working"),c();try{const f=await Ne(s,i,n);Se(f,l,ze(l)),m(t("done")),await F()}catch(f){f&&f.code==="plan"?(e.paywall=!0,e.messageKind="",e.message=""):o(f&&f.code||"failed")}finally{e.busy=!1,c()}}}function D(){const s=e.session;return s.apiConfigured?s.apiReachable?s.isPro?t("remainingPro"):typeof s.remaining=="number"?t("remaining",s.remaining):t("remainingUnknown"):t("apiDown"):t("runLocally")}function O(){const s=Te(),i=e.session,n=i.authenticated?`<span class="who">${r(i.email)}</span><button type="button" class="btn ghost small" id="logout">${r(t("logout"))}</button>`:`<a class="btn ghost small" href="#/login" data-nav="/login">${r(t("login"))}</a>`;return`<header class="top">
      <a class="brand" href="#/" data-nav="/">${Ve()}<span class="word">StayPDF</span></a>
      <div class="top-right">
        <div class="pill" id="remain">${r(D())}</div>
        ${n}
        <div class="lang" role="group" aria-label="language">
          <button type="button" data-lang="zh" class="${s==="zh"?"on":""}">${t("langZh")}</button>
          <button type="button" data-lang="en" class="${s==="en"?"on":""}">${t("langEn")}</button>
        </div>
      </div>
    </header>`}function A(){return`<footer class="foot"><span>${r(t("privacyProof"))}</span><span>${r(t("footer"))}</span></footer>`}function G(){return e.paywall?`<div class="paywall" id="paywall">
      <div class="sheet" role="dialog" aria-modal="true" aria-labelledby="pw-title">
        <h2 id="pw-title">${r(t("paywallTitle"))}</h2>
        <p>${r(t("paywallBody"))}</p>
        <div class="price">$6 <span>/ mo</span></div>
        <div class="row">
          <button class="btn ghost" type="button" id="pw-close">${r(t("close"))}</button>
        </div>
      </div>
    </div>`:""}function y(s,i,n){return`<div class="drop" id="drop">
      <input id="file" type="file" ${i?"multiple":""} accept="${n}" />
      <strong>${r(s)}</strong>
      <span>${r(t("privacy"))}</span>
    </div>`}function b(){return e.files.length===0?"":`<div class="list">${e.files.map((i,n)=>{const l=`${Math.round(i.size/1024)} KB`;return`<div class="item" data-i="${n}">
          <div class="meta">
            <div class="name">${r(i.name)}</div>
            <div class="sub">${r(l)}</div>
          </div>
          <div class="ops">
            <button class="btn" data-act="up" ${n===0?"disabled":""}>${r(t("moveUp"))}</button>
            <button class="btn" data-act="down" ${n===e.files.length-1?"disabled":""}>${r(t("moveDown"))}</button>
            <button class="btn warn" data-act="rm">${r(t("remove"))}</button>
          </div>
        </div>`}).join("")}</div>
      <div class="row">
        <button class="btn ghost" id="clear" type="button">${r(t("clear"))}</button>
      </div>`}function I(){return`<div class="status${e.messageKind?` ${e.messageKind}`:""}" role="status">${r(e.message)}</div>`}function J(s){const i=He[s.id];if(!i)return"";const n=s.requiresPro?`<span class="badge">${r(t("proBadge"))}</span>`:'<span class="go">→</span>',l=`<h2>${r(t(i.title))}</h2>
          <p>${r(t(i.desc))}</p>
          ${n}`;return`<a class="card" href="#${i.href}" data-nav="${i.href}">${l}</a>`}function Y(){const s=e.tools&&e.tools.length?e.tools:E,i=s.filter(l=>!l.requiresPro).map(J).join(""),n=s.filter(l=>l.requiresPro).map(J).join("");return`${O()}
      <section class="hero">
        <h1>${r(t("tagline"))}</h1>
        <div class="proof"><span class="dot"></span><div><b>${r(t("privacy"))}</b> ${r(t("privacyProof"))}</div></div>
      </section>
      <p class="plan-line">${r(t("planLine"))}</p>
      <h2 class="group-title">${r(t("freeTools"))}</h2>
      <div class="grid">${i}</div>
      <h2 class="group-title">${r(t("proTools"))}</h2>
      <div class="grid">${n}</div>
      ${A()}${G()}`}function h(s,i,n){return`${O()}
      <a class="crumb" href="#/" data-nav="/">${r(t("back"))}</a>
      <div class="panel">
        <h1 class="tool-title">${r(t(s))}</h1>
        <p class="lede">${r(t(i))}</p>
        ${n}
        ${I()}
      </div>
      ${A()}${G()}`}function ne(){return h("merge","mergeDesc",`${y(t("dropPdf"),!0,"application/pdf,.pdf")}
       ${b()}
       <div class="row">
         <button class="btn primary" id="run" type="button" ${e.busy?"disabled":""}>${r(t("runMerge"))}</button>
       </div>`)}function se(){return h("split","splitDesc",`${y(t("dropPdfOne"),!1,"application/pdf,.pdf")}
       ${b()}
       <label class="field">${r(t("ranges"))}
         <input id="ranges" type="text" value="${r(e.ranges)}" placeholder="${r(t("rangesHint"))}" />
       </label>
       <div class="row">
         <button class="btn primary" id="run" type="button" ${e.busy?"disabled":""}>${r(t("runSplit"))}</button>
       </div>`)}function oe(){return h("rotate","rotateDesc",`${y(t("dropPdfOne"),!1,"application/pdf,.pdf")}
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
       </div>`)}function ie(){return h("delete","deleteDesc",`${y(t("dropPdfOne"),!1,"application/pdf,.pdf")}
       ${b()}
       <label class="field">${r(t("ranges"))}
         <input id="ranges" type="text" value="${r(e.ranges)}" placeholder="${r(t("rangesHint"))}" />
       </label>
       <div class="row">
         <button class="btn primary" id="run" type="button" ${e.busy?"disabled":""}>${r(t("runDelete"))}</button>
       </div>`)}function le(){return h("images","imagesDesc",`${y(t("dropImages"),!0,"image/jpeg,image/png,image/webp,image/gif,.jpg,.jpeg,.png,.webp")}
       ${b()}
       <label class="field">${r(t("fitA4"))}
         <select id="fit">
           <option value="a4" ${e.fit==="a4"?"selected":""}>${r(t("fitA4"))}</option>
           <option value="original" ${e.fit==="original"?"selected":""}>${r(t("fitOriginal"))}</option>
         </select>
       </label>
       <div class="row">
         <button class="btn primary" id="run" type="button" ${e.busy?"disabled":""}>${r(t("runImages"))}</button>
       </div>`)}function ce(){return h("compress","compressDesc",`${y(t("dropPdfOne"),!1,"application/pdf,.pdf")}
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
       </div>`)}function ue(){return h("word","wordDesc",`${y(t("dropWord"),!1,"application/pdf,.pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,.docx")}
       ${b()}
       <p class="hint">${r(t("wordHint"))}</p>
       <div class="row">
         <button class="btn primary" id="run" type="button" ${e.busy?"disabled":""}>${r(t("runWord"))}</button>
       </div>`)}function pe(){return h("watermark","watermarkDesc",`${y(t("dropPdfOne"),!1,"application/pdf,.pdf")}
       ${b()}
       <label class="field">${r(t("watermarkText"))}
         <input id="watermark-text" type="text" maxlength="80" value="${r(e.watermarkText)}" />
       </label>
       <div class="row">
         <button class="btn primary" id="run" type="button" ${e.busy?"disabled":""}>${r(t("runWatermark"))}</button>
       </div>`)}function fe(){return h("pageNumbers","pageNumbersDesc",`${y(t("dropPdfOne"),!1,"application/pdf,.pdf")}
       ${b()}
       <div class="row">
         <button class="btn primary" id="run" type="button" ${e.busy?"disabled":""}>${r(t("runPages"))}</button>
       </div>`)}function me(){return h("pdfImages","pdfImagesDesc",`${y(t("dropPdfOne"),!1,"application/pdf,.pdf")}
       ${b()}
       <div class="row">
         <button class="btn primary" id="run" type="button" ${e.busy?"disabled":""}>${r(t("runPdfImages"))}</button>
       </div>`)}function ge(){return h("protect","protectDesc",`${y(t("dropPdfOne"),!1,"application/pdf,.pdf")}
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
       </div>`)}function we(){return h("unlock","unlockDesc",`${y(t("dropPdfOne"),!1,"application/pdf,.pdf")}
       ${b()}
       <label class="field">${r(t("password"))}
         <input id="unlock-password" type="password" autocomplete="current-password" maxlength="72" value="${r(e.unlockPassword)}" />
       </label>
       <div class="row">
         <button class="btn primary" id="run" type="button" ${e.busy?"disabled":""}>${r(t("runUnlock"))}</button>
       </div>`)}function ye(){return`${O()}
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
      ${A()}`}function be(){const i=ee()?'<div id="turnstile-slot" class="turnstile"></div>':"";return`${O()}
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
      ${A()}`}function he(){return`${O()}
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
      ${A()}`}function ve(){a.querySelectorAll("[data-lang]").forEach(n=>{n.addEventListener("click",()=>{re(n.getAttribute("data-lang")),c()})}),a.querySelectorAll("[data-nav]").forEach(n=>{n.addEventListener("click",l=>{l.preventDefault();const f=n.getAttribute("data-nav");u(),d(f)})});const s=a.querySelector("#pw-close");s&&s.addEventListener("click",()=>{e.paywall=!1,c()});const i=a.querySelector("#logout");i&&i.addEventListener("click",async()=>{try{await Ie()}catch{}await F()})}function N(s){const i=a.querySelector("#drop"),n=a.querySelector("#file");if(!i||!n)return;const l=v=>p(v,s);n.addEventListener("change",()=>{l(n.files),n.value=""}),i.addEventListener("dragover",v=>{v.preventDefault(),i.classList.add("over")}),i.addEventListener("dragleave",()=>i.classList.remove("over")),i.addEventListener("drop",v=>{v.preventDefault(),i.classList.remove("over"),l(v.dataTransfer.files)}),a.querySelectorAll(".item").forEach(v=>{v.addEventListener("click",Le=>{const Z=Le.target.closest("button");if(!Z)return;const P=Number(v.getAttribute("data-i")),V=Z.getAttribute("data-act");if(V==="rm"&&e.files.splice(P,1),V==="up"&&P>0){const z=e.files[P-1];e.files[P-1]=e.files[P],e.files[P]=z}if(V==="down"&&P<e.files.length-1){const z=e.files[P+1];e.files[P+1]=e.files[P],e.files[P]=z}c()})});const f=a.querySelector("#clear");f&&f.addEventListener("click",()=>{e.files=[],c()});const T=a.querySelector("#ranges");T&&T.addEventListener("input",()=>{e.ranges=T.value});const C=a.querySelector("#fit");C&&C.addEventListener("change",()=>{e.fit=C.value});const S=a.querySelector("#quality");S&&S.addEventListener("change",()=>{e.quality=S.value});const H=a.querySelector("#ocr-lang");H&&H.addEventListener("change",()=>{e.ocrLang=H.value});const U=a.querySelector("#watermark-text");U&&U.addEventListener("input",()=>{e.watermarkText=U.value});const B=a.querySelector("#protect-password");B&&B.addEventListener("input",()=>{e.protectPassword=B.value});const K=a.querySelector("#protect-confirm");K&&K.addEventListener("input",()=>{e.protectConfirm=K.value});const M=a.querySelector("#unlock-password");M&&M.addEventListener("input",()=>{e.unlockPassword=M.value}),a.querySelectorAll('input[name="angle"]').forEach(v=>{v.addEventListener("change",()=>{e.angle=Number(v.value)})})}function $e(){const s=a.querySelector("#login-form");if(!s)return;const i=a.querySelector("#email"),n=a.querySelector("#password");i&&i.addEventListener("input",()=>{e.email=i.value}),n&&n.addEventListener("input",()=>{e.password=n.value}),s.addEventListener("submit",async l=>{if(l.preventDefault(),!e.busy){e.busy=!0,e.message=t("working"),e.messageKind="",c();try{await Oe(e.email,e.password),e.password="",e.busy=!1,await F(),d("/")}catch{o("auth"),e.busy=!1,c()}}})}function Pe(){const s=a.querySelector("#register-form");if(!s)return;const i=a.querySelector("#email"),n=a.querySelector("#password"),l=a.querySelector("#confirm");i&&i.addEventListener("input",()=>{e.email=i.value}),n&&n.addEventListener("input",()=>{e.password=n.value}),l&&l.addEventListener("input",()=>{e.confirmPassword=l.value});const f=ee();f&&Me(f,T=>{e.turnstileToken=T}),s.addEventListener("submit",async T=>{if(T.preventDefault(),e.busy)return;if(!Ke(e.password)){o("weak"),c();return}if(e.password!==e.confirmPassword){o("mismatch"),c();return}const C=(a.querySelector("#company")||{}).value||"";e.busy=!0,e.message=t("working"),e.messageKind="",c();try{await Ae(e.email,e.password,{company:C,turnstile:e.turnstileToken}),e.password="",e.confirmPassword="",e.turnstileToken="",e.busy=!1,m(t("checkEmail")),c()}catch(S){o(S&&S.code||"register"),e.busy=!1,c()}})}function ke(){const s=a.querySelector("#resend-form");if(s){const n=a.querySelector("#email");n&&n.addEventListener("input",()=>{e.email=n.value}),s.addEventListener("submit",async l=>{if(l.preventDefault(),!e.busy){e.busy=!0,e.message=t("working"),e.messageKind="",c();try{await Re(e.email),e.busy=!1,m(t("checkEmail")),c()}catch(f){o(f&&f.code||"register"),e.busy=!1,c()}}})}if(e.verifyOnce)return;e.verifyOnce=!0;const i=Be().get("token")||"";if(!i){o("verify"),c();return}e.busy=!0,e.message=t("verifyWorking"),e.messageKind="",(async()=>{try{await Ce(i),e.busy=!1,m(t("verifyOk")),c()}catch{o("verify"),e.busy=!1,c()}})()}function De(s){const i=a.querySelector("#run");i&&i.addEventListener("click",async()=>{if(s==="/merge"){if(e.files.length<2)return o("need-two"),c();await g("merge",e.files,{},"merged.pdf")}else if(s==="/split"){const n=e.files[0];if(!n)return o("need-one"),c();const l=_(e.ranges,9999);if(!l.ok)return o(l.error==="empty"?"bad-range":l.error),c();await g("split",[n],{ranges:e.ranges},`${$(n.name)}-extract.pdf`)}else if(s==="/rotate"){const n=e.files[0];if(!n)return o("need-one"),c();if(e.ranges.trim()){const l=_(e.ranges,9999);if(!l.ok)return o(l.error==="empty"?"bad-range":l.error),c()}await g("rotate",[n],{ranges:e.ranges,angle:e.angle},`${$(n.name)}-rotated.pdf`)}else if(s==="/delete"){const n=e.files[0];if(!n)return o("need-one"),c();const l=_(e.ranges,9999);if(!l.ok)return o(l.error==="empty"?"bad-range":l.error),c();await g("delete",[n],{ranges:e.ranges},`${$(n.name)}-deleted.pdf`)}else if(s==="/images"){if(e.files.length===0)return o("need-image"),c();await g("images",e.files,{fit:e.fit},"images.pdf")}else if(s==="/compress"){const n=e.files[0];if(!n)return o("need-one"),c();await g("compress",[n],{quality:e.quality},`${$(n.name)}-compressed.pdf`)}else if(s==="/ocr"){const n=e.files[0];if(!n)return o("need-one"),c();await g("ocr",[n],{lang:e.ocrLang},`${$(n.name)}-ocr.txt`)}else if(s==="/word"){const n=e.files[0];if(!n)return o("need-doc"),c();const l=X(n)?`${$(n.name)}-converted.pdf`:`${$(n.name)}-converted.docx`;await g("word",[n],{},l)}else if(s==="/watermark"){const n=e.files[0];if(!n)return o("need-one"),c();const l=(e.watermarkText||"").trim();if(!l)return o("need-text"),c();await g("watermark",[n],{text:l},`${$(n.name)}-watermark.pdf`)}else if(s==="/pages"){const n=e.files[0];if(!n)return o("need-one"),c();await g("pages",[n],{},`${$(n.name)}-pages.pdf`)}else if(s==="/pdf-images"){const n=e.files[0];if(!n)return o("need-one"),c();await g("pdf-images",[n],{},`${$(n.name)}-pages.zip`)}else if(s==="/protect"){const n=e.files[0];if(!n)return o("need-one"),c();const l=e.protectPassword||"";if(l.length<4||l.length>72)return o("need-password"),c();if(l!==(e.protectConfirm||""))return o("mismatch"),c();await g("protect",[n],{password:l},`${$(n.name)}-protected.pdf`),e.protectPassword="",e.protectConfirm=""}else if(s==="/unlock"){const n=e.files[0];if(!n)return o("need-one"),c();const l=e.unlockPassword||"";if(l.length<1||l.length>72)return o("need-password"),c();await g("unlock",[n],{password:l},`${$(n.name)}-unlocked.pdf`),e.unlockPassword=""}})}let W=null;function c(){const s=Ue();W&&W!==s&&(u(),e.verifyOnce=!1,e.turnstileToken=""),W=s;const i={"/":Y,"/merge":ne,"/split":se,"/rotate":oe,"/delete":ie,"/images":le,"/compress":ce,"/ocr":de,"/word":ue,"/watermark":pe,"/pages":fe,"/pdf-images":me,"/protect":ge,"/unlock":we,"/login":ye,"/register":be,"/verify":he};a.innerHTML=`<div class="app">${(i[s]||Y)()}</div>`,ve(),s==="/merge"?N("pdf"):s==="/images"?N("image"):s==="/word"?N("one-word"):s==="/login"?$e():s==="/register"?Pe():s==="/verify"?ke():s!=="/"&&N("one-pdf"),De(s)}return window.addEventListener("hashchange",c),c(),F(),{draw:c}}je(document.getElementById("app"));
