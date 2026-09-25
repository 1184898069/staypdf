(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const p of document.querySelectorAll('link[rel="modulepreload"]'))u(p);new MutationObserver(p=>{for(const o of p)if(o.type==="childList")for(const g of o.addedNodes)g.tagName==="LINK"&&g.rel==="modulepreload"&&u(g)}).observe(document,{childList:!0,subtree:!0});function d(p){const o={};return p.integrity&&(o.integrity=p.integrity),p.referrerPolicy&&(o.referrerPolicy=p.referrerPolicy),p.crossOrigin==="use-credentials"?o.credentials="include":p.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function u(p){if(p.ep)return;p.ep=!0;const o=d(p);fetch(p.href,o)}})();const ne="staypdf-lang",J={en:{brand:"StayPDF",tagline:"PDF tools. Processed in memory, not stored.",privacy:"Processed in server memory, then discarded.",privacyProof:"Files are sent to the StayPDF API, transformed in memory, and the result is downloaded. Bytes are not written to disk and are not stored.",langZh:"中文",langEn:"EN",remaining:n=>`${n} free export${n===1?"":"s"} left today`,remainingPro:"Pro",remainingUnknown:"Sign in for unlimited exports",tools:"Tools",home:"All tools",merge:"Merge PDFs",mergeDesc:"Combine two or more PDFs into one file. Drag to reorder.",split:"Split PDF",splitDesc:"Extract page ranges into a new PDF.",rotate:"Rotate pages",rotateDesc:"Turn selected pages 90°, 180°, or 270° clockwise.",delete:"Delete pages",deleteDesc:"Remove pages and download the rest.",images:"Images → PDF",imagesDesc:"Turn JPG, PNG, or WebP images into a single PDF.",compress:"Compress PDF",compressDesc:"Shrink image-heavy PDFs. Vector-only files may not get smaller.",ocr:"OCR / scan to text",ocrDesc:"Extract text from a digital PDF, or OCR a scan when Tesseract is installed.",word:"PDF ↔ Word",wordDesc:"Convert PDF to Word or Word to PDF. Text-based: tables, images, and complex layout are simplified.",advanced:"Advanced",proComing:"Pro coming",proBadge:"Pro",freeTools:"Basic tools",proTools:"Pro tools",planLine:"Free: 3 exports per UTC day and basic tools. Pro: unlimited exports, compress, OCR, Word, watermark, page numbers, PDF → images, password protect, unlock, grayscale, N-up, crop, resize, and larger files. Payments are not connected yet; locally, sign in with the STAYPDF_TEST_* account from .env.",watermark:"Watermark",watermarkDesc:"Draw diagonal text on every page.",watermarkText:"Watermark text",runWatermark:"Add watermark & download",pageNumbers:"Page numbers",pageNumbersDesc:"Add “1 / N” at the bottom of every page.",runPages:"Add page numbers & download",pdfImages:"PDF → images",pdfImagesDesc:"Rasterize each page to PNG and download a zip.",runPdfImages:"Export images & download",protect:"Protect PDF",protectDesc:"Lock a PDF with a password (128-bit). Other StayPDF tools still cannot open encrypted files.",protectPassword:"Password",protectConfirm:"Confirm password",protectHint:"4–72 characters. Remember it — use Unlock with the same password to remove protection.",runProtect:"Protect & download",unlock:"Unlock PDF",unlockDesc:"Remove a PDF user password when you know it. This is not a cracker for unknown passwords.",runUnlock:"Unlock & download",grayscale:"Grayscale",grayscaleDesc:"Convert every page to black and white. Pages are rasterized (text becomes an image).",grayscaleHint:"Like compress, this rebuilds pages as images — selectable text is not preserved.",runGrayscale:"Convert & download",nup:"N-up",nupDesc:"Put 2 or 4 pages on each sheet (handy for handouts). Output is A4; leftover slots stay blank.",nupLayout:"Pages per sheet",nup2:"2-up (side by side)",nup4:"4-up (2×2)",nupHint:"Source pages are scaled to fit. Vector content is kept when the PDF can be imported.",runNup:"Impose & download",crop:"Crop margins",cropDesc:"Trim the same margin from every side of every page.",cropMargin:"Margin",crop5:"5 mm",crop10:"10 mm",crop15:"15 mm",crop20:"20 mm",cropHint:"Uniform trim on all sides. Vector content is kept when the PDF can be imported.",runCrop:"Crop & download",resize:"Resize pages",resizeDesc:"Fit every page onto A4 or Letter. Aspect ratio is preserved; extra space is white margin.",resizePaper:"Paper size",resizeA4:"A4",resizeLetter:"Letter",resizeHint:"Portrait of the chosen size. Vector content is kept when the PDF can be imported.",runResize:"Resize & download",badPaper:"Choose a paper size of A4 or Letter.",badLayout:"Choose 2 or 4 pages per sheet.",badMargin:"Choose a margin of 5, 10, 15, or 20 mm. The page must stay at least 36 points on each side.",badPassword:"Wrong password for this PDF.",needPassword:"Set a password of 4–72 characters.",needText:"Add watermark text first.",dropWord:"Drop a PDF or Word file here, or click to choose",runCompress:"Compress & download",runOcr:"Extract text & download",runWord:"Convert & download",quality:"Quality",qualityLow:"Low (smaller file)",qualityMed:"Medium",qualityHigh:"High (clearer)",ocrLang:"Language",needDoc:"Add a PDF or Word file first.",wordHint:"Text-based conversion. Tables, images, and complex layout will be simplified.",ocrEngine:"OCR for scans needs Tesseract on the server. Digital PDFs still work.",dropPdf:"Drop PDFs here, or click to choose",dropPdfOne:"Drop a PDF here, or click to choose",dropImages:"Drop images here, or click to choose",addMore:"Add more",clear:"Clear",files:"Files",pages:"pages",page:"page",moveUp:"Up",moveDown:"Down",remove:"Remove",ranges:"Pages",rangesHint:"Example: 1-3, 5, 8-10",rangesAllHint:"Leave blank for all pages, or e.g. 1-3, 5",angle:"Rotation",cw90:"90° clockwise",cw180:"180°",cw270:"270° clockwise",fitA4:"Fit to A4",fitOriginal:"Original aspect, max A4",runMerge:"Merge & download",runSplit:"Extract & download",runRotate:"Rotate & download",runDelete:"Delete & download",runImages:"Create PDF & download",needTwo:"Add at least two PDFs.",needOne:"Add a PDF first.",needImage:"Add at least one image.",needKeep:"You must keep at least one page.",badRange:"Check the page list. Use numbers and ranges like 1-3, 5.",outOfRange:"A page number is outside this file.",encrypted:"This PDF is encrypted. Use Unlock with the correct password first.",failed:"Could not process this file. Try another PDF.",imageFailed:"Could not read an image. Use JPG, PNG, or WebP.",working:"Working…",done:"Downloaded. The upload was processed in memory and discarded.",paywallTitle:"Upgrade to continue",paywallBody:"StayPDF Pro is $6/month for unlimited exports plus extra tools and larger files. Payments are not connected yet. Locally, sign in with the STAYPDF_TEST_* account from .env.",close:"Not now",footer:"MIT · Files are not kept after the response is sent.",back:"← Tools",login:"Log in",logout:"Log out",email:"Email",password:"Password",loginSubmit:"Log in",loginTitle:"Log in",loginBody:"Sign in with a verified account. Create one if you do not have it yet.",authFailed:"Could not sign in. Check the email and password.",register:"Create account",registerTitle:"Create an account",registerBody:"We will send a short verification link to your email. You can sign in after you open it.",registerSubmit:"Create account",confirmPassword:"Confirm password",passwordHint:"At least 10 characters, with a letter and a number.",passwordMismatch:"Passwords do not match.",weakPassword:"Use at least 10 characters, including a letter and a number.",checkEmail:"If that address can be used, we sent a message.",haveAccount:"Already have an account? Log in",needAccount:"Need an account? Create one",verifyTitle:"Verify email",verifyWorking:"Verifying your email…",verifyOk:"Email verified. You can log in now.",verifyFail:"This link is not valid or has expired.",resend:"Resend the email",resendHint:"Did not get it? We can send the message again.",tryLater:"Please wait and try again.",mailDown:"Email is not available right now.",registerFailed:"Could not create this account.",runLocally:"Run locally to process files.",apiDown:"Cannot reach the StayPDF API. Start it locally to process files.",tooLarge:"A file is larger than your plan allows.",tooMany:"Too many files for your plan."},zh:{brand:"StayPDF",tagline:"PDF 工具。在内存中处理，不落盘保存。",privacy:"在服务器内存中处理，随后丢弃。",privacyProof:"文件发送到 StayPDF API，在内存中转换，再下载结果。不会写入磁盘，也不会存储。",langZh:"中文",langEn:"EN",remaining:n=>`今日剩余 ${n} 次免费导出`,remainingPro:"Pro",remainingUnknown:"登录后可不限次导出",tools:"工具",home:"全部工具",merge:"合并 PDF",mergeDesc:"将两份及以上 PDF 合成一份。可调整顺序。",split:"拆分 PDF",splitDesc:"按页码范围提取页面，生成新的 PDF。",rotate:"旋转页面",rotateDesc:"将指定页面顺时针旋转 90°、180° 或 270°。",delete:"删除页面",deleteDesc:"去掉不想要的页，下载剩余内容。",images:"图片转 PDF",imagesDesc:"把 JPG、PNG、WebP 图片合成一份 PDF。",compress:"压缩 PDF",compressDesc:"压缩以图片为主的 PDF。纯矢量文件未必会变小。",ocr:"OCR 识别文字",ocrDesc:"从数字 PDF 提取文字；扫描件在安装 Tesseract 时可识别。",word:"PDF ↔ Word",wordDesc:"在 PDF 与 Word 之间转换。按文本处理：表格、图片和复杂版式会被简化。",advanced:"进阶",proComing:"Pro 即将推出",proBadge:"Pro",freeTools:"基础工具",proTools:"Pro 工具",planLine:"免费：每天（UTC）3 次导出和基础工具。Pro：不限次数，另含压缩、OCR、Word、水印、页码、PDF 转图片、密码保护、解锁、转黑白、多页合一、裁边、改尺寸，以及更大文件。支付尚未接入；本地可用 .env 中的 STAYPDF_TEST_* 账号登录体验 Pro。",watermark:"水印",watermarkDesc:"在每一页加上斜向文字水印。",watermarkText:"水印文字",runWatermark:"添加水印并下载",pageNumbers:"页码",pageNumbersDesc:"在每页底部加上 “1 / N”。",runPages:"添加页码并下载",pdfImages:"PDF 转图片",pdfImagesDesc:"将每一页渲染为 PNG，打包成 zip 下载。",runPdfImages:"导出图片并下载",protect:"密码保护",protectDesc:"给 PDF 加上打开密码（128 位）。其他 StayPDF 工具仍无法打开已加密文件。",protectPassword:"密码",protectConfirm:"确认密码",protectHint:"4–72 个字符。请牢记密码——可用「解锁」工具用同一密码去掉保护。",runProtect:"加密并下载",unlock:"解锁 PDF",unlockDesc:"在已知用户密码时移除 PDF 打开密码。这不是暴力破解未知密码的工具。",runUnlock:"解锁并下载",grayscale:"转黑白",grayscaleDesc:"把每一页转成黑白。页面会栅格化（文字变成图片）。",grayscaleHint:"与压缩类似，会把页面重建为图片——可选中文字不会保留。",runGrayscale:"转换并下载",nup:"多页合一",nupDesc:"每张纸放 2 或 4 页（适合讲义）。输出为 A4；不足的格子留空。",nupLayout:"每张页数",nup2:"2 合 1（左右）",nup4:"4 合 1（2×2）",nupHint:"源页面会等比缩放。在可导入时尽量保留矢量内容。",runNup:"排版并下载",crop:"裁边",cropDesc:"从每一页的四周裁掉相同边距。",cropMargin:"边距",crop5:"5 毫米",crop10:"10 毫米",crop15:"15 毫米",crop20:"20 毫米",cropHint:"四边统一裁剪。在可导入时尽量保留矢量内容。",runCrop:"裁边并下载",resize:"改尺寸",resizeDesc:"把每一页等比放入 A4 或 Letter；多出的边留白居中。",resizePaper:"纸张尺寸",resizeA4:"A4",resizeLetter:"Letter",resizeHint:"输出为所选纸张的竖版。在可导入时尽量保留矢量内容。",runResize:"改尺寸并下载",badPaper:"请选择 A4 或 Letter 纸张。",badLayout:"请选择每张纸 2 或 4 页。",badMargin:"请选择 5、10、15 或 20 毫米。裁切后每边至少保留约 36 点。",badPassword:"密码不正确。",needPassword:"请设置 4–72 个字符的密码。",needText:"请先填写水印文字。",dropWord:"把 PDF 或 Word 拖到这里，或点击选择",runCompress:"压缩并下载",runOcr:"提取文字并下载",runWord:"转换并下载",quality:"质量",qualityLow:"低（文件更小）",qualityMed:"中",qualityHigh:"高（更清晰）",ocrLang:"语言",needDoc:"请先添加一份 PDF 或 Word 文件。",wordHint:"按文本转换。表格、图片和复杂版式会被简化。",ocrEngine:"扫描件 OCR 需要服务器安装 Tesseract。数字 PDF 仍可提取文字。",dropPdf:"把 PDF 拖到这里，或点击选择",dropPdfOne:"把一份 PDF 拖到这里，或点击选择",dropImages:"把图片拖到这里，或点击选择",addMore:"继续添加",clear:"清空",files:"文件",pages:"页",page:"页",moveUp:"上移",moveDown:"下移",remove:"移除",ranges:"页码",rangesHint:"例如：1-3, 5, 8-10",rangesAllHint:"留空表示全部页面，或如 1-3, 5",angle:"旋转角度",cw90:"顺时针 90°",cw180:"180°",cw270:"顺时针 270°",fitA4:"适应 A4",fitOriginal:"原比例，最大 A4",runMerge:"合并并下载",runSplit:"提取并下载",runRotate:"旋转并下载",runDelete:"删除并下载",runImages:"生成 PDF 并下载",needTwo:"请至少添加两份 PDF。",needOne:"请先添加一份 PDF。",needImage:"请至少添加一张图片。",needKeep:"至少需要保留一页。",badRange:"请检查页码。使用数字和范围，例如 1-3, 5。",outOfRange:"页码超出了这份文件的页数。",encrypted:"这份 PDF 已加密。请先用「解锁」工具并输入正确密码。",failed:"无法处理该文件，请换一份 PDF 试试。",imageFailed:"无法读取图片。请使用 JPG、PNG 或 WebP。",working:"处理中…",done:"已下载。上传内容在内存中处理并已丢弃。",paywallTitle:"升级后继续",paywallBody:"StayPDF Pro 为 $6/月，不限次数，并含更多工具和更大文件。支付尚未接入。本地可用 .env 中的 STAYPDF_TEST_* 账号登录。",close:"稍后再说",footer:"MIT · 响应发送后不保留文件。",back:"← 全部工具",login:"登录",logout:"退出",email:"邮箱",password:"密码",loginSubmit:"登录",loginTitle:"登录",loginBody:"请使用已验证的账号登录。没有账号可以先注册。",authFailed:"无法登录，请检查邮箱和密码。",register:"注册",registerTitle:"创建账号",registerBody:"我们会向邮箱发送一封验证邮件。打开链接后即可登录。",registerSubmit:"注册",confirmPassword:"确认密码",passwordHint:"至少 10 个字符，需包含字母和数字。",passwordMismatch:"两次输入的密码不一致。",weakPassword:"密码至少 10 个字符，并包含字母和数字。",checkEmail:"如果该地址可以使用，我们已发送邮件。",haveAccount:"已有账号？去登录",needAccount:"没有账号？去注册",verifyTitle:"验证邮箱",verifyWorking:"正在验证邮箱…",verifyOk:"邮箱已验证，现在可以登录。",verifyFail:"链接无效或已过期。",resend:"重新发送邮件",resendHint:"没收到？可以再发一次。",tryLater:"请稍后再试。",mailDown:"当前无法发送邮件。",registerFailed:"无法创建该账号。",runLocally:"请在本地运行后再处理文件。",apiDown:"无法连接 StayPDF API。请先在本地启动后再处理文件。",tooLarge:"文件超过了当前套餐允许的大小。",tooMany:"文件数量超过了当前套餐限制。"}};function Oe(){try{const e=localStorage.getItem(ne);if(e==="zh"||e==="en")return e}catch{}const n=typeof navigator<"u"&&navigator.language||"";return/^zh\b/i.test(n)?"zh":"en"}let A=Oe();function xe(){return A}function se(n){A=n==="zh"?"zh":"en";try{localStorage.setItem(ne,A)}catch{}typeof document<"u"&&(document.documentElement.lang=A==="zh"?"zh-CN":"en")}function t(n,...e){const u=(J[A]||J.en)[n]??J.en[n]??n;return typeof u=="function"?u(...e):u}se(A);function Y(n,e){if(typeof n!="string")return{ok:!1,pages:[],error:"empty"};const d=n.trim();if(!d)return{ok:!1,pages:[],error:"empty"};if(!Number.isInteger(e)||e<1)return{ok:!1,pages:[],error:"bad-count"};const u=d.split(/[,，]/).map(g=>g.trim()).filter(Boolean);if(u.length===0)return{ok:!1,pages:[],error:"empty"};const p=[],o=new Set;for(const g of u){const D=g.match(/^(\d+)\s*[-–—~～]\s*(\d+)$/),F=g.match(/^(\d+)$/);if(D){let v=Number(D[1]),m=Number(D[2]);if(!Number.isInteger(v)||!Number.isInteger(m))return{ok:!1,pages:[],error:"invalid"};if(v>m){const k=v;v=m,m=k}if(v<1||m>e)return{ok:!1,pages:[],error:"out-of-range"};for(let k=v;k<=m;k+=1)o.has(k)||(o.add(k),p.push(k))}else if(F){const v=Number(F[1]);if(!Number.isInteger(v)||v<1||v>e)return{ok:!1,pages:[],error:"out-of-range"};o.has(v)||(o.add(v),p.push(v))}else return{ok:!1,pages:[],error:"invalid"}}return p.length===0?{ok:!1,pages:[],error:"empty"}:{ok:!0,pages:p,error:null}}function ze(n,e,d="application/pdf"){const u=new Blob([n],{type:d}),p=URL.createObjectURL(u),o=document.createElement("a");o.href=p,o.download=e,document.body.appendChild(o),o.click(),o.remove(),setTimeout(()=>URL.revokeObjectURL(p),1500)}function r(n){return String(n).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function te(n){if(!n)return!1;const e=(n.type||"").toLowerCase(),d=(n.name||"").toLowerCase();return e==="application/pdf"||d.endsWith(".pdf")}function Me(n){if(!n)return!1;const e=(n.type||"").toLowerCase(),d=(n.name||"").toLowerCase();return e.startsWith("image/")?!0:/\.(png|jpe?g|webp|gif|bmp)$/i.test(d)}function re(n){if(!n)return!1;const e=(n.type||"").toLowerCase(),d=(n.name||"").toLowerCase();return e==="application/vnd.openxmlformats-officedocument.wordprocessingml.document"||e==="application/vnd.ms-word.document.macroenabled.12"||d.endsWith(".docx")}function z(){return null}function ae(){return""}async function L(n,e={}){const d=z();if(!d){const o=new Error("run-local");throw o.code="run-local",o}const u={...e.headers||{}};return e.body&&!(e.body instanceof FormData)&&!u["Content-Type"]&&(u["Content-Type"]="application/json"),await fetch(`${d}${n}`,{credentials:"include",...e,headers:u})}function oe(n,e){const d=new Error(e);throw n.status===429?d.code="try-later":n.status===503?d.code="mail":d.code=e,d}async function Re(){const n=await L("/api/auth/me");if(!n.ok){const e=new Error("failed");throw e.code="failed",e}return n.json()}async function Ne(){const n=await L("/api/plan");if(!n.ok){const e=new Error("failed");throw e.code="failed",e}return n.json()}async function He(n,e){const d=await L("/api/auth/login",{method:"POST",body:JSON.stringify({email:n,password:e})});if(!d.ok){const u=new Error("auth");throw u.code="auth",u}return d.json()}async function Ie(n,e,d={}){const u=await L("/api/auth/register",{method:"POST",body:JSON.stringify({email:n,password:e,company:d.company||"","cf-turnstile-response":d.turnstile||""})});return u.ok||oe(u,"register"),u.json()}async function We(n){const e=await L("/api/auth/verify",{method:"POST",body:JSON.stringify({token:n})});if(!e.ok){const d=new Error("verify");throw d.code="verify",d}return e.json()}async function Ue(n){const e=await L("/api/auth/resend-verification",{method:"POST",body:JSON.stringify({email:n})});return e.ok||oe(e,"register"),e.json()}async function Ve(){await L("/api/auth/logout",{method:"POST"})}async function Be(n,e,d={}){const u=new FormData;for(const o of e)u.append("files",o);for(const[o,g]of Object.entries(d))g==null||g===""||u.append(o,String(g));const p=await L(`/api/jobs/${n}`,{method:"POST",body:u});if(p.status===402){const o=new Error("plan");throw o.code="plan",o}if(!p.ok){let o="failed";try{const D=await p.json();D&&typeof D.code=="string"&&(o=D.code)}catch{}const g=new Error(o);throw g.code=o,g}return new Uint8Array(await p.arrayBuffer())}const q=[{id:"merge",requiresPro:!1},{id:"split",requiresPro:!1},{id:"rotate",requiresPro:!1},{id:"delete",requiresPro:!1},{id:"images",requiresPro:!1},{id:"compress",requiresPro:!0},{id:"ocr",requiresPro:!0},{id:"word",requiresPro:!0},{id:"watermark",requiresPro:!0},{id:"pages",requiresPro:!0},{id:"pdf-images",requiresPro:!0},{id:"protect",requiresPro:!0},{id:"unlock",requiresPro:!0},{id:"grayscale",requiresPro:!0},{id:"nup",requiresPro:!0},{id:"crop",requiresPro:!0},{id:"resize",requiresPro:!0}],Ke=["/","/merge","/split","/rotate","/delete","/images","/compress","/ocr","/word","/watermark","/pages","/pdf-images","/protect","/unlock","/grayscale","/nup","/crop","/resize","/login","/register","/verify"],je={merge:{href:"/merge",title:"merge",desc:"mergeDesc"},split:{href:"/split",title:"split",desc:"splitDesc"},rotate:{href:"/rotate",title:"rotate",desc:"rotateDesc"},delete:{href:"/delete",title:"delete",desc:"deleteDesc"},images:{href:"/images",title:"images",desc:"imagesDesc"},compress:{href:"/compress",title:"compress",desc:"compressDesc"},ocr:{href:"/ocr",title:"ocr",desc:"ocrDesc"},word:{href:"/word",title:"word",desc:"wordDesc"},watermark:{href:"/watermark",title:"watermark",desc:"watermarkDesc"},pages:{href:"/pages",title:"pageNumbers",desc:"pageNumbersDesc"},"pdf-images":{href:"/pdf-images",title:"pdfImages",desc:"pdfImagesDesc"},protect:{href:"/protect",title:"protect",desc:"protectDesc"},unlock:{href:"/unlock",title:"unlock",desc:"unlockDesc"},grayscale:{href:"/grayscale",title:"grayscale",desc:"grayscaleDesc"},nup:{href:"/nup",title:"nup",desc:"nupDesc"},crop:{href:"/crop",title:"crop",desc:"cropDesc"},resize:{href:"/resize",title:"resize",desc:"resizeDesc"}};function _e(){const e=(location.hash||"#/").replace(/^#/,"").split("?")[0]||"/";return Ke.includes(e)?e:"/"}function Ge(){const n=(location.hash||"#/").replace(/^#/,""),e=n.includes("?")?n.slice(n.indexOf("?")+1):"";return new URLSearchParams(e)}function Je(n){return n.length>=10&&/[A-Za-z]/.test(n)&&/\d/.test(n)}let E=null;function Ye(n,e){const d=document.getElementById("turnstile-slot");if(!d||!n)return;const u=()=>{window.turnstile&&(d.innerHTML="",window.turnstile.render(d,{sitekey:n,theme:"dark",callback:e}))};if(window.turnstile){u();return}E||(E=document.createElement("script"),E.src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit",E.async=!0,document.head.appendChild(E)),E.addEventListener("load",u,{once:!0})}function Ze(){return`<svg class="mark" viewBox="0 0 28 28" aria-hidden="true">
    <rect x="3" y="3" width="22" height="22" rx="6" fill="#1d221d" stroke="#b6e07a" stroke-width="1.4"/>
    <path d="M8 18.5V9.5h5.2c2.3 0 3.7 1.2 3.7 3.1 0 1.9-1.4 3.1-3.7 3.1H10.6V18.5H8zm2.6-4.6h2.3c1.1 0 1.7-.5 1.7-1.4s-.6-1.4-1.7-1.4h-2.3v2.8z" fill="#eef3ea"/>
  </svg>`}function h(n,e="document"){return String(n||e).replace(/\.[^.]+$/,"")||e}function Qe(n){const e=String(n||"").toLowerCase();return e.endsWith(".txt")?"text/plain;charset=utf-8":e.endsWith(".zip")?"application/zip":e.endsWith(".docx")?"application/vnd.openxmlformats-officedocument.wordprocessingml.document":"application/pdf"}function Xe(n){const e={files:[],message:"",messageKind:"",busy:!1,paywall:!1,angle:90,fit:"a4",quality:"medium",ocrLang:"eng+chi_sim",ranges:"",watermarkText:"",protectPassword:"",protectConfirm:"",unlockPassword:"",nupLayout:"2",cropMarginMm:"10",resizePaper:"a4",tools:q,email:"",password:"",confirmPassword:"",turnstileToken:"",verifyOnce:!1,session:{loaded:!1,apiConfigured:!!z(),apiReachable:!1,authenticated:!1,email:"",isPro:!1,remaining:null}};function d(s){location.hash!==`#${s}`?location.hash=s:c()}function u(){e.files=[],e.message="",e.messageKind="",e.busy=!1,e.angle=90,e.fit="a4",e.quality="medium",e.ocrLang="eng+chi_sim",e.ranges="",e.watermarkText="",e.protectPassword="",e.protectConfirm="",e.unlockPassword="",e.nupLayout="2",e.cropMarginMm="10",e.resizePaper="a4"}function p(s,i){const l=Array.from(s||[]).filter(f=>i==="image"?Me(f):i==="one-word"?te(f)||re(f):te(f));if(i==="one-pdf"||i==="one-word"){const f=l[0];f&&(e.files=[f]),c();return}for(const f of l)e.files.push(f);c()}function o(s){const i={encrypted:t("encrypted"),failed:t("failed"),"need-two":t("needTwo"),"need-one":t("needOne"),"need-image":t("needImage"),"need-keep":t("needKeep"),"bad-range":t("badRange"),"out-of-range":t("outOfRange"),image:t("imageFailed"),auth:t("authFailed"),register:t("registerFailed"),verify:t("verifyFail"),"try-later":t("tryLater"),mail:t("mailDown"),weak:t("weakPassword"),"run-local":t("runLocally"),"too-large":t("tooLarge"),"too-many":t("tooMany"),"ocr-engine":t("ocrEngine"),"need-doc":t("needDoc"),"need-text":t("needText"),"need-password":t("needPassword"),"bad-password":t("badPassword"),"bad-margin":t("badMargin"),"bad-paper":t("badPaper"),"bad-layout":t("badLayout"),mismatch:t("passwordMismatch")};e.messageKind="err",e.message=i[s]||t("failed")}function g(s){e.messageKind="ok",e.message=s}async function D(){if(!z()){e.tools=q;return}try{const s=await Ne();s&&Array.isArray(s.tools)&&s.tools.length&&(e.tools=s.tools)}catch{e.tools=q}}async function F(){if(!z()){e.session={loaded:!0,apiConfigured:!1,apiReachable:!1,authenticated:!1,email:"",isPro:!1,remaining:null},e.tools=q,c();return}try{const[s]=await Promise.all([Re(),D()]);e.session={loaded:!0,apiConfigured:!0,apiReachable:!0,authenticated:!!s.authenticated,email:s.email||"",isPro:!!s.isPro,remaining:s.isPro?null:s.remaining}}catch{e.session={loaded:!0,apiConfigured:!0,apiReachable:!1,authenticated:!1,email:"",isPro:!1,remaining:null},await D()}c()}function v(s){const i=(e.tools||q).find(a=>a.id===s);return!!(i&&i.requiresPro)}async function m(s,i,a,l){if(!e.busy){if(v(s)&&e.session.loaded&&!e.session.isPro){e.paywall=!0,e.messageKind="",e.message="",c();return}if(!z()){o("run-local"),c();return}e.busy=!0,e.messageKind="",e.message=t("working"),c();try{const f=await Be(s,i,a);ze(f,l,Qe(l)),g(t("done")),await F()}catch(f){f&&f.code==="plan"?(e.paywall=!0,e.messageKind="",e.message=""):o(f&&f.code||"failed")}finally{e.busy=!1,c()}}}function k(){const s=e.session;return s.apiConfigured?s.apiReachable?s.isPro?t("remainingPro"):typeof s.remaining=="number"?t("remaining",s.remaining):t("remainingUnknown"):t("apiDown"):t("runLocally")}function C(){const s=xe(),i=e.session,a=i.authenticated?`<span class="who">${r(i.email)}</span><button type="button" class="btn ghost small" id="logout">${r(t("logout"))}</button>`:`<a class="btn ghost small" href="#/login" data-nav="/login">${r(t("login"))}</a>`;return`<header class="top">
      <a class="brand" href="#/" data-nav="/">${Ze()}<span class="word">StayPDF</span></a>
      <div class="top-right">
        <div class="pill" id="remain">${r(k())}</div>
        ${a}
        <div class="lang" role="group" aria-label="language">
          <button type="button" data-lang="zh" class="${s==="zh"?"on":""}">${t("langZh")}</button>
          <button type="button" data-lang="en" class="${s==="en"?"on":""}">${t("langEn")}</button>
        </div>
      </div>
    </header>`}function O(){return`<footer class="foot"><span>${r(t("privacyProof"))}</span><span>${r(t("footer"))}</span></footer>`}function Z(){return e.paywall?`<div class="paywall" id="paywall">
      <div class="sheet" role="dialog" aria-modal="true" aria-labelledby="pw-title">
        <h2 id="pw-title">${r(t("paywallTitle"))}</h2>
        <p>${r(t("paywallBody"))}</p>
        <div class="price">$6 <span>/ mo</span></div>
        <div class="row">
          <button class="btn ghost" type="button" id="pw-close">${r(t("close"))}</button>
        </div>
      </div>
    </div>`:""}function y(s,i,a){return`<div class="drop" id="drop">
      <input id="file" type="file" ${i?"multiple":""} accept="${a}" />
      <strong>${r(s)}</strong>
      <span>${r(t("privacy"))}</span>
    </div>`}function w(){return e.files.length===0?"":`<div class="list">${e.files.map((i,a)=>{const l=`${Math.round(i.size/1024)} KB`;return`<div class="item" data-i="${a}">
          <div class="meta">
            <div class="name">${r(i.name)}</div>
            <div class="sub">${r(l)}</div>
          </div>
          <div class="ops">
            <button class="btn" data-act="up" ${a===0?"disabled":""}>${r(t("moveUp"))}</button>
            <button class="btn" data-act="down" ${a===e.files.length-1?"disabled":""}>${r(t("moveDown"))}</button>
            <button class="btn warn" data-act="rm">${r(t("remove"))}</button>
          </div>
        </div>`}).join("")}</div>
      <div class="row">
        <button class="btn ghost" id="clear" type="button">${r(t("clear"))}</button>
      </div>`}function M(){return`<div class="status${e.messageKind?` ${e.messageKind}`:""}" role="status">${r(e.message)}</div>`}function Q(s){const i=je[s.id];if(!i)return"";const a=s.requiresPro?`<span class="badge">${r(t("proBadge"))}</span>`:'<span class="go">→</span>',l=`<h2>${r(t(i.title))}</h2>
          <p>${r(t(i.desc))}</p>
          ${a}`;return`<a class="card" href="#${i.href}" data-nav="${i.href}">${l}</a>`}function X(){const s=e.tools&&e.tools.length?e.tools:q,i=s.filter(l=>!l.requiresPro).map(Q).join(""),a=s.filter(l=>l.requiresPro).map(Q).join("");return`${C()}
      <section class="hero">
        <h1>${r(t("tagline"))}</h1>
        <div class="proof"><span class="dot"></span><div><b>${r(t("privacy"))}</b> ${r(t("privacyProof"))}</div></div>
      </section>
      <p class="plan-line">${r(t("planLine"))}</p>
      <h2 class="group-title">${r(t("freeTools"))}</h2>
      <div class="grid">${i}</div>
      <h2 class="group-title">${r(t("proTools"))}</h2>
      <div class="grid">${a}</div>
      ${O()}${Z()}`}function b(s,i,a){return`${C()}
      <a class="crumb" href="#/" data-nav="/">${r(t("back"))}</a>
      <div class="panel">
        <h1 class="tool-title">${r(t(s))}</h1>
        <p class="lede">${r(t(i))}</p>
        ${a}
        ${M()}
      </div>
      ${O()}${Z()}`}function ie(){return b("merge","mergeDesc",`${y(t("dropPdf"),!0,"application/pdf,.pdf")}
       ${w()}
       <div class="row">
         <button class="btn primary" id="run" type="button" ${e.busy?"disabled":""}>${r(t("runMerge"))}</button>
       </div>`)}function le(){return b("split","splitDesc",`${y(t("dropPdfOne"),!1,"application/pdf,.pdf")}
       ${w()}
       <label class="field">${r(t("ranges"))}
         <input id="ranges" type="text" value="${r(e.ranges)}" placeholder="${r(t("rangesHint"))}" />
       </label>
       <div class="row">
         <button class="btn primary" id="run" type="button" ${e.busy?"disabled":""}>${r(t("runSplit"))}</button>
       </div>`)}function ce(){return b("rotate","rotateDesc",`${y(t("dropPdfOne"),!1,"application/pdf,.pdf")}
       ${w()}
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
       </div>`)}function de(){return b("delete","deleteDesc",`${y(t("dropPdfOne"),!1,"application/pdf,.pdf")}
       ${w()}
       <label class="field">${r(t("ranges"))}
         <input id="ranges" type="text" value="${r(e.ranges)}" placeholder="${r(t("rangesHint"))}" />
       </label>
       <div class="row">
         <button class="btn primary" id="run" type="button" ${e.busy?"disabled":""}>${r(t("runDelete"))}</button>
       </div>`)}function ue(){return b("images","imagesDesc",`${y(t("dropImages"),!0,"image/jpeg,image/png,image/webp,image/gif,.jpg,.jpeg,.png,.webp")}
       ${w()}
       <label class="field">${r(t("fitA4"))}
         <select id="fit">
           <option value="a4" ${e.fit==="a4"?"selected":""}>${r(t("fitA4"))}</option>
           <option value="original" ${e.fit==="original"?"selected":""}>${r(t("fitOriginal"))}</option>
         </select>
       </label>
       <div class="row">
         <button class="btn primary" id="run" type="button" ${e.busy?"disabled":""}>${r(t("runImages"))}</button>
       </div>`)}function pe(){return b("compress","compressDesc",`${y(t("dropPdfOne"),!1,"application/pdf,.pdf")}
       ${w()}
       <label class="field">${r(t("quality"))}
         <select id="quality">
           <option value="low" ${e.quality==="low"?"selected":""}>${r(t("qualityLow"))}</option>
           <option value="medium" ${e.quality==="medium"?"selected":""}>${r(t("qualityMed"))}</option>
           <option value="high" ${e.quality==="high"?"selected":""}>${r(t("qualityHigh"))}</option>
         </select>
       </label>
       <div class="row">
         <button class="btn primary" id="run" type="button" ${e.busy?"disabled":""}>${r(t("runCompress"))}</button>
       </div>`)}function fe(){return b("ocr","ocrDesc",`${y(t("dropPdfOne"),!1,"application/pdf,.pdf")}
       ${w()}
       <label class="field">${r(t("ocrLang"))}
         <select id="ocr-lang">
           <option value="eng+chi_sim" ${e.ocrLang==="eng+chi_sim"?"selected":""}>English + 简体中文</option>
           <option value="eng" ${e.ocrLang==="eng"?"selected":""}>English</option>
           <option value="chi_sim" ${e.ocrLang==="chi_sim"?"selected":""}>简体中文</option>
         </select>
       </label>
       <div class="row">
         <button class="btn primary" id="run" type="button" ${e.busy?"disabled":""}>${r(t("runOcr"))}</button>
       </div>`)}function me(){return b("word","wordDesc",`${y(t("dropWord"),!1,"application/pdf,.pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,.docx")}
       ${w()}
       <p class="hint">${r(t("wordHint"))}</p>
       <div class="row">
         <button class="btn primary" id="run" type="button" ${e.busy?"disabled":""}>${r(t("runWord"))}</button>
       </div>`)}function ge(){return b("watermark","watermarkDesc",`${y(t("dropPdfOne"),!1,"application/pdf,.pdf")}
       ${w()}
       <label class="field">${r(t("watermarkText"))}
         <input id="watermark-text" type="text" maxlength="80" value="${r(e.watermarkText)}" />
       </label>
       <div class="row">
         <button class="btn primary" id="run" type="button" ${e.busy?"disabled":""}>${r(t("runWatermark"))}</button>
       </div>`)}function ye(){return b("pageNumbers","pageNumbersDesc",`${y(t("dropPdfOne"),!1,"application/pdf,.pdf")}
       ${w()}
       <div class="row">
         <button class="btn primary" id="run" type="button" ${e.busy?"disabled":""}>${r(t("runPages"))}</button>
       </div>`)}function we(){return b("pdfImages","pdfImagesDesc",`${y(t("dropPdfOne"),!1,"application/pdf,.pdf")}
       ${w()}
       <div class="row">
         <button class="btn primary" id="run" type="button" ${e.busy?"disabled":""}>${r(t("runPdfImages"))}</button>
       </div>`)}function be(){return b("protect","protectDesc",`${y(t("dropPdfOne"),!1,"application/pdf,.pdf")}
       ${w()}
       <label class="field">${r(t("protectPassword"))}
         <input id="protect-password" type="password" autocomplete="new-password" maxlength="72" value="${r(e.protectPassword)}" />
       </label>
       <label class="field">${r(t("protectConfirm"))}
         <input id="protect-confirm" type="password" autocomplete="new-password" maxlength="72" value="${r(e.protectConfirm)}" />
       </label>
       <p class="hint">${r(t("protectHint"))}</p>
       <div class="row">
         <button class="btn primary" id="run" type="button" ${e.busy?"disabled":""}>${r(t("runProtect"))}</button>
       </div>`)}function he(){return b("unlock","unlockDesc",`${y(t("dropPdfOne"),!1,"application/pdf,.pdf")}
       ${w()}
       <label class="field">${r(t("password"))}
         <input id="unlock-password" type="password" autocomplete="current-password" maxlength="72" value="${r(e.unlockPassword)}" />
       </label>
       <div class="row">
         <button class="btn primary" id="run" type="button" ${e.busy?"disabled":""}>${r(t("runUnlock"))}</button>
       </div>`)}function ve(){return b("grayscale","grayscaleDesc",`${y(t("dropPdfOne"),!1,"application/pdf,.pdf")}
       ${w()}
       <p class="hint">${r(t("grayscaleHint"))}</p>
       <div class="row">
         <button class="btn primary" id="run" type="button" ${e.busy?"disabled":""}>${r(t("runGrayscale"))}</button>
       </div>`)}function $e(){return b("nup","nupDesc",`${y(t("dropPdfOne"),!1,"application/pdf,.pdf")}
       ${w()}
       <label class="field">${r(t("nupLayout"))}
         <select id="nup-layout">
           <option value="2" ${e.nupLayout==="2"?"selected":""}>${r(t("nup2"))}</option>
           <option value="4" ${e.nupLayout==="4"?"selected":""}>${r(t("nup4"))}</option>
         </select>
       </label>
       <p class="hint">${r(t("nupHint"))}</p>
       <div class="row">
         <button class="btn primary" id="run" type="button" ${e.busy?"disabled":""}>${r(t("runNup"))}</button>
       </div>`)}function Pe(){return b("crop","cropDesc",`${y(t("dropPdfOne"),!1,"application/pdf,.pdf")}
       ${w()}
       <label class="field">${r(t("cropMargin"))}
         <select id="crop-margin">
           <option value="5" ${e.cropMarginMm==="5"?"selected":""}>${r(t("crop5"))}</option>
           <option value="10" ${e.cropMarginMm==="10"?"selected":""}>${r(t("crop10"))}</option>
           <option value="15" ${e.cropMarginMm==="15"?"selected":""}>${r(t("crop15"))}</option>
           <option value="20" ${e.cropMarginMm==="20"?"selected":""}>${r(t("crop20"))}</option>
         </select>
       </label>
       <p class="hint">${r(t("cropHint"))}</p>
       <div class="row">
         <button class="btn primary" id="run" type="button" ${e.busy?"disabled":""}>${r(t("runCrop"))}</button>
       </div>`)}function De(){return b("resize","resizeDesc",`${y(t("dropPdfOne"),!1,"application/pdf,.pdf")}
       ${w()}
       <label class="field">${r(t("resizePaper"))}
         <select id="resize-paper">
           <option value="a4" ${e.resizePaper==="a4"?"selected":""}>${r(t("resizeA4"))}</option>
           <option value="letter" ${e.resizePaper==="letter"?"selected":""}>${r(t("resizeLetter"))}</option>
         </select>
       </label>
       <p class="hint">${r(t("resizeHint"))}</p>
       <div class="row">
         <button class="btn primary" id="run" type="button" ${e.busy?"disabled":""}>${r(t("runResize"))}</button>
       </div>`)}function ke(){return`${C()}
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
        ${M()}
      </div>
      ${O()}`}function Le(){const i=ae()?'<div id="turnstile-slot" class="turnstile"></div>':"";return`${C()}
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
        ${M()}
      </div>
      ${O()}`}function Fe(){return`${C()}
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
        ${M()}
      </div>
      ${O()}`}function Se(){n.querySelectorAll("[data-lang]").forEach(a=>{a.addEventListener("click",()=>{se(a.getAttribute("data-lang")),c()})}),n.querySelectorAll("[data-nav]").forEach(a=>{a.addEventListener("click",l=>{l.preventDefault();const f=a.getAttribute("data-nav");u(),d(f)})});const s=n.querySelector("#pw-close");s&&s.addEventListener("click",()=>{e.paywall=!1,c()});const i=n.querySelector("#logout");i&&i.addEventListener("click",async()=>{try{await Ve()}catch{}await F()})}function R(s){const i=n.querySelector("#drop"),a=n.querySelector("#file");if(!i||!a)return;const l=$=>p($,s);a.addEventListener("change",()=>{l(a.files),a.value=""}),i.addEventListener("dragover",$=>{$.preventDefault(),i.classList.add("over")}),i.addEventListener("dragleave",()=>i.classList.remove("over")),i.addEventListener("drop",$=>{$.preventDefault(),i.classList.remove("over"),l($.dataTransfer.files)}),n.querySelectorAll(".item").forEach($=>{$.addEventListener("click",Ce=>{const ee=Ce.target.closest("button");if(!ee)return;const P=Number($.getAttribute("data-i")),_=ee.getAttribute("data-act");if(_==="rm"&&e.files.splice(P,1),_==="up"&&P>0){const G=e.files[P-1];e.files[P-1]=e.files[P],e.files[P]=G}if(_==="down"&&P<e.files.length-1){const G=e.files[P+1];e.files[P+1]=e.files[P],e.files[P]=G}c()})});const f=n.querySelector("#clear");f&&f.addEventListener("click",()=>{e.files=[],c()});const S=n.querySelector("#ranges");S&&S.addEventListener("input",()=>{e.ranges=S.value});const x=n.querySelector("#fit");x&&x.addEventListener("change",()=>{e.fit=x.value});const T=n.querySelector("#quality");T&&T.addEventListener("change",()=>{e.quality=T.value});const H=n.querySelector("#ocr-lang");H&&H.addEventListener("change",()=>{e.ocrLang=H.value});const I=n.querySelector("#watermark-text");I&&I.addEventListener("input",()=>{e.watermarkText=I.value});const W=n.querySelector("#protect-password");W&&W.addEventListener("input",()=>{e.protectPassword=W.value});const U=n.querySelector("#protect-confirm");U&&U.addEventListener("input",()=>{e.protectConfirm=U.value});const V=n.querySelector("#unlock-password");V&&V.addEventListener("input",()=>{e.unlockPassword=V.value});const B=n.querySelector("#nup-layout");B&&B.addEventListener("change",()=>{e.nupLayout=B.value});const K=n.querySelector("#crop-margin");K&&K.addEventListener("change",()=>{e.cropMarginMm=K.value});const j=n.querySelector("#resize-paper");j&&j.addEventListener("change",()=>{e.resizePaper=j.value}),n.querySelectorAll('input[name="angle"]').forEach($=>{$.addEventListener("change",()=>{e.angle=Number($.value)})})}function Te(){const s=n.querySelector("#login-form");if(!s)return;const i=n.querySelector("#email"),a=n.querySelector("#password");i&&i.addEventListener("input",()=>{e.email=i.value}),a&&a.addEventListener("input",()=>{e.password=a.value}),s.addEventListener("submit",async l=>{if(l.preventDefault(),!e.busy){e.busy=!0,e.message=t("working"),e.messageKind="",c();try{await He(e.email,e.password),e.password="",e.busy=!1,await F(),d("/")}catch{o("auth"),e.busy=!1,c()}}})}function qe(){const s=n.querySelector("#register-form");if(!s)return;const i=n.querySelector("#email"),a=n.querySelector("#password"),l=n.querySelector("#confirm");i&&i.addEventListener("input",()=>{e.email=i.value}),a&&a.addEventListener("input",()=>{e.password=a.value}),l&&l.addEventListener("input",()=>{e.confirmPassword=l.value});const f=ae();f&&Ye(f,S=>{e.turnstileToken=S}),s.addEventListener("submit",async S=>{if(S.preventDefault(),e.busy)return;if(!Je(e.password)){o("weak"),c();return}if(e.password!==e.confirmPassword){o("mismatch"),c();return}const x=(n.querySelector("#company")||{}).value||"";e.busy=!0,e.message=t("working"),e.messageKind="",c();try{await Ie(e.email,e.password,{company:x,turnstile:e.turnstileToken}),e.password="",e.confirmPassword="",e.turnstileToken="",e.busy=!1,g(t("checkEmail")),c()}catch(T){o(T&&T.code||"register"),e.busy=!1,c()}})}function Ee(){const s=n.querySelector("#resend-form");if(s){const a=n.querySelector("#email");a&&a.addEventListener("input",()=>{e.email=a.value}),s.addEventListener("submit",async l=>{if(l.preventDefault(),!e.busy){e.busy=!0,e.message=t("working"),e.messageKind="",c();try{await Ue(e.email),e.busy=!1,g(t("checkEmail")),c()}catch(f){o(f&&f.code||"register"),e.busy=!1,c()}}})}if(e.verifyOnce)return;e.verifyOnce=!0;const i=Ge().get("token")||"";if(!i){o("verify"),c();return}e.busy=!0,e.message=t("verifyWorking"),e.messageKind="",(async()=>{try{await We(i),e.busy=!1,g(t("verifyOk")),c()}catch{o("verify"),e.busy=!1,c()}})()}function Ae(s){const i=n.querySelector("#run");i&&i.addEventListener("click",async()=>{if(s==="/merge"){if(e.files.length<2)return o("need-two"),c();await m("merge",e.files,{},"merged.pdf")}else if(s==="/split"){const a=e.files[0];if(!a)return o("need-one"),c();const l=Y(e.ranges,9999);if(!l.ok)return o(l.error==="empty"?"bad-range":l.error),c();await m("split",[a],{ranges:e.ranges},`${h(a.name)}-extract.pdf`)}else if(s==="/rotate"){const a=e.files[0];if(!a)return o("need-one"),c();if(e.ranges.trim()){const l=Y(e.ranges,9999);if(!l.ok)return o(l.error==="empty"?"bad-range":l.error),c()}await m("rotate",[a],{ranges:e.ranges,angle:e.angle},`${h(a.name)}-rotated.pdf`)}else if(s==="/delete"){const a=e.files[0];if(!a)return o("need-one"),c();const l=Y(e.ranges,9999);if(!l.ok)return o(l.error==="empty"?"bad-range":l.error),c();await m("delete",[a],{ranges:e.ranges},`${h(a.name)}-deleted.pdf`)}else if(s==="/images"){if(e.files.length===0)return o("need-image"),c();await m("images",e.files,{fit:e.fit},"images.pdf")}else if(s==="/compress"){const a=e.files[0];if(!a)return o("need-one"),c();await m("compress",[a],{quality:e.quality},`${h(a.name)}-compressed.pdf`)}else if(s==="/ocr"){const a=e.files[0];if(!a)return o("need-one"),c();await m("ocr",[a],{lang:e.ocrLang},`${h(a.name)}-ocr.txt`)}else if(s==="/word"){const a=e.files[0];if(!a)return o("need-doc"),c();const l=re(a)?`${h(a.name)}-converted.pdf`:`${h(a.name)}-converted.docx`;await m("word",[a],{},l)}else if(s==="/watermark"){const a=e.files[0];if(!a)return o("need-one"),c();const l=(e.watermarkText||"").trim();if(!l)return o("need-text"),c();await m("watermark",[a],{text:l},`${h(a.name)}-watermark.pdf`)}else if(s==="/pages"){const a=e.files[0];if(!a)return o("need-one"),c();await m("pages",[a],{},`${h(a.name)}-pages.pdf`)}else if(s==="/pdf-images"){const a=e.files[0];if(!a)return o("need-one"),c();await m("pdf-images",[a],{},`${h(a.name)}-pages.zip`)}else if(s==="/protect"){const a=e.files[0];if(!a)return o("need-one"),c();const l=e.protectPassword||"";if(l.length<4||l.length>72)return o("need-password"),c();if(l!==(e.protectConfirm||""))return o("mismatch"),c();await m("protect",[a],{password:l},`${h(a.name)}-protected.pdf`),e.protectPassword="",e.protectConfirm=""}else if(s==="/unlock"){const a=e.files[0];if(!a)return o("need-one"),c();const l=e.unlockPassword||"";if(l.length<1||l.length>72)return o("need-password"),c();await m("unlock",[a],{password:l},`${h(a.name)}-unlocked.pdf`),e.unlockPassword=""}else if(s==="/grayscale"){const a=e.files[0];if(!a)return o("need-one"),c();await m("grayscale",[a],{},`${h(a.name)}-grayscale.pdf`)}else if(s==="/nup"){const a=e.files[0];if(!a)return o("need-one"),c();const l=e.nupLayout==="4"?"4":"2";await m("nup",[a],{layout:l},`${h(a.name)}-nup.pdf`)}else if(s==="/crop"){const a=e.files[0];if(!a)return o("need-one"),c();const f=["5","10","15","20"].includes(e.cropMarginMm)?e.cropMarginMm:"10";await m("crop",[a],{marginMm:f},`${h(a.name)}-cropped.pdf`)}else if(s==="/resize"){const a=e.files[0];if(!a)return o("need-one"),c();const l=e.resizePaper==="letter"?"letter":"a4";await m("resize",[a],{paper:l},`${h(a.name)}-resized.pdf`)}})}let N=null;function c(){const s=_e();N&&N!==s&&(u(),e.verifyOnce=!1,e.turnstileToken=""),N=s;const i={"/":X,"/merge":ie,"/split":le,"/rotate":ce,"/delete":de,"/images":ue,"/compress":pe,"/ocr":fe,"/word":me,"/watermark":ge,"/pages":ye,"/pdf-images":we,"/protect":be,"/unlock":he,"/grayscale":ve,"/nup":$e,"/crop":Pe,"/resize":De,"/login":ke,"/register":Le,"/verify":Fe};n.innerHTML=`<div class="app">${(i[s]||X)()}</div>`,Se(),s==="/merge"?R("pdf"):s==="/images"?R("image"):s==="/word"?R("one-word"):s==="/login"?Te():s==="/register"?qe():s==="/verify"?Ee():s!=="/"&&R("one-pdf"),Ae(s)}return window.addEventListener("hashchange",c),c(),F(),{draw:c}}Xe(document.getElementById("app"));
