(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const f of document.querySelectorAll('link[rel="modulepreload"]'))u(f);new MutationObserver(f=>{for(const s of f)if(s.type==="childList")for(const m of s.addedNodes)m.tagName==="LINK"&&m.rel==="modulepreload"&&u(m)}).observe(document,{childList:!0,subtree:!0});function l(f){const s={};return f.integrity&&(s.integrity=f.integrity),f.referrerPolicy&&(s.referrerPolicy=f.referrerPolicy),f.crossOrigin==="use-credentials"?s.credentials="include":f.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function u(f){if(f.ep)return;f.ep=!0;const s=l(f);fetch(f.href,s)}})();const G="staypdf-lang",N={en:{brand:"StayPDF",tagline:"PDF tools. Processed in memory, not stored.",privacy:"Processed in server memory, then discarded.",privacyProof:"Files are sent to the StayPDF API, transformed in memory, and the result is downloaded. Bytes are not written to disk and are not stored.",langZh:"中文",langEn:"EN",remaining:a=>`${a} free export${a===1?"":"s"} left today`,remainingPro:"Pro",remainingUnknown:"Sign in for unlimited exports",tools:"Tools",home:"All tools",merge:"Merge PDFs",mergeDesc:"Combine two or more PDFs into one file. Drag to reorder.",split:"Split PDF",splitDesc:"Extract page ranges into a new PDF.",rotate:"Rotate pages",rotateDesc:"Turn selected pages 90°, 180°, or 270° clockwise.",delete:"Delete pages",deleteDesc:"Remove pages and download the rest.",images:"Images → PDF",imagesDesc:"Turn JPG, PNG, or WebP images into a single PDF.",compress:"Compress PDF",compressDesc:"Shrink image-heavy PDFs. Vector-only files may not get smaller.",ocr:"OCR / scan to text",ocrDesc:"Extract text from a digital PDF, or OCR a scan when Tesseract is installed.",word:"PDF ↔ Word",wordDesc:"Convert PDF to Word or Word to PDF. Text-based: tables, images, and complex layout are simplified.",advanced:"Advanced",proComing:"Pro coming",dropWord:"Drop a PDF or Word file here, or click to choose",runCompress:"Compress & download",runOcr:"Extract text & download",runWord:"Convert & download",quality:"Quality",qualityLow:"Low (smaller file)",qualityMed:"Medium",qualityHigh:"High (clearer)",ocrLang:"Language",needDoc:"Add a PDF or Word file first.",wordHint:"Text-based conversion. Tables, images, and complex layout will be simplified.",ocrEngine:"OCR for scans needs Tesseract on the server. Digital PDFs still work.",dropPdf:"Drop PDFs here, or click to choose",dropPdfOne:"Drop a PDF here, or click to choose",dropImages:"Drop images here, or click to choose",addMore:"Add more",clear:"Clear",files:"Files",pages:"pages",page:"page",moveUp:"Up",moveDown:"Down",remove:"Remove",ranges:"Pages",rangesHint:"Example: 1-3, 5, 8-10",rangesAllHint:"Leave blank for all pages, or e.g. 1-3, 5",angle:"Rotation",cw90:"90° clockwise",cw180:"180°",cw270:"270° clockwise",fitA4:"Fit to A4",fitOriginal:"Original aspect, max A4",runMerge:"Merge & download",runSplit:"Extract & download",runRotate:"Rotate & download",runDelete:"Delete & download",runImages:"Create PDF & download",needTwo:"Add at least two PDFs.",needOne:"Add a PDF first.",needImage:"Add at least one image.",needKeep:"You must keep at least one page.",badRange:"Check the page list. Use numbers and ranges like 1-3, 5.",outOfRange:"A page number is outside this file.",encrypted:"This PDF is encrypted. StayPDF cannot open password-protected files yet.",failed:"Could not process this file. Try another PDF.",imageFailed:"Could not read an image. Use JPG, PNG, or WebP.",working:"Working…",done:"Downloaded. The upload was processed in memory and discarded.",paywallTitle:"Upgrade to continue",paywallBody:"StayPDF Pro is $6/month for unlimited exports. Payments are not connected yet.",close:"Not now",footer:"MIT · Files are not kept after the response is sent.",back:"← Tools",login:"Log in",logout:"Log out",email:"Email",password:"Password",loginSubmit:"Log in",loginTitle:"Log in",loginBody:"Sign in with a verified account. Create one if you do not have it yet.",authFailed:"Could not sign in. Check the email and password.",register:"Create account",registerTitle:"Create an account",registerBody:"We will send a short verification link to your email. You can sign in after you open it.",registerSubmit:"Create account",confirmPassword:"Confirm password",passwordHint:"At least 10 characters, with a letter and a number.",passwordMismatch:"Passwords do not match.",weakPassword:"Use at least 10 characters, including a letter and a number.",checkEmail:"If that address can be used, we sent a message.",haveAccount:"Already have an account? Log in",needAccount:"Need an account? Create one",verifyTitle:"Verify email",verifyWorking:"Verifying your email…",verifyOk:"Email verified. You can log in now.",verifyFail:"This link is not valid or has expired.",resend:"Resend the email",resendHint:"Did not get it? We can send the message again.",tryLater:"Please wait and try again.",mailDown:"Email is not available right now.",registerFailed:"Could not create this account.",runLocally:"Run locally to process files.",apiDown:"Cannot reach the StayPDF API. Start it locally to process files.",tooLarge:"Each file must be 15 MB or smaller.",tooMany:"Up to 10 files per request."},zh:{brand:"StayPDF",tagline:"PDF 工具。在内存中处理，不落盘保存。",privacy:"在服务器内存中处理，随后丢弃。",privacyProof:"文件发送到 StayPDF API，在内存中转换，再下载结果。不会写入磁盘，也不会存储。",langZh:"中文",langEn:"EN",remaining:a=>`今日剩余 ${a} 次免费导出`,remainingPro:"Pro",remainingUnknown:"登录后可不限次导出",tools:"工具",home:"全部工具",merge:"合并 PDF",mergeDesc:"将两份及以上 PDF 合成一份。可调整顺序。",split:"拆分 PDF",splitDesc:"按页码范围提取页面，生成新的 PDF。",rotate:"旋转页面",rotateDesc:"将指定页面顺时针旋转 90°、180° 或 270°。",delete:"删除页面",deleteDesc:"去掉不想要的页，下载剩余内容。",images:"图片转 PDF",imagesDesc:"把 JPG、PNG、WebP 图片合成一份 PDF。",compress:"压缩 PDF",compressDesc:"压缩以图片为主的 PDF。纯矢量文件未必会变小。",ocr:"OCR 识别文字",ocrDesc:"从数字 PDF 提取文字；扫描件在安装 Tesseract 时可识别。",word:"PDF ↔ Word",wordDesc:"在 PDF 与 Word 之间转换。按文本处理：表格、图片和复杂版式会被简化。",advanced:"进阶",proComing:"Pro 即将推出",dropWord:"把 PDF 或 Word 拖到这里，或点击选择",runCompress:"压缩并下载",runOcr:"提取文字并下载",runWord:"转换并下载",quality:"质量",qualityLow:"低（文件更小）",qualityMed:"中",qualityHigh:"高（更清晰）",ocrLang:"语言",needDoc:"请先添加一份 PDF 或 Word 文件。",wordHint:"按文本转换。表格、图片和复杂版式会被简化。",ocrEngine:"扫描件 OCR 需要服务器安装 Tesseract。数字 PDF 仍可提取文字。",dropPdf:"把 PDF 拖到这里，或点击选择",dropPdfOne:"把一份 PDF 拖到这里，或点击选择",dropImages:"把图片拖到这里，或点击选择",addMore:"继续添加",clear:"清空",files:"文件",pages:"页",page:"页",moveUp:"上移",moveDown:"下移",remove:"移除",ranges:"页码",rangesHint:"例如：1-3, 5, 8-10",rangesAllHint:"留空表示全部页面，或如 1-3, 5",angle:"旋转角度",cw90:"顺时针 90°",cw180:"180°",cw270:"顺时针 270°",fitA4:"适应 A4",fitOriginal:"原比例，最大 A4",runMerge:"合并并下载",runSplit:"提取并下载",runRotate:"旋转并下载",runDelete:"删除并下载",runImages:"生成 PDF 并下载",needTwo:"请至少添加两份 PDF。",needOne:"请先添加一份 PDF。",needImage:"请至少添加一张图片。",needKeep:"至少需要保留一页。",badRange:"请检查页码。使用数字和范围，例如 1-3, 5。",outOfRange:"页码超出了这份文件的页数。",encrypted:"这份 PDF 已加密。StayPDF 暂不支持带密码的文件。",failed:"无法处理该文件，请换一份 PDF 试试。",imageFailed:"无法读取图片。请使用 JPG、PNG 或 WebP。",working:"处理中…",done:"已下载。上传内容在内存中处理并已丢弃。",paywallTitle:"升级后继续",paywallBody:"StayPDF Pro 为 $6/月，不限次数。支付尚未接入。",close:"稍后再说",footer:"MIT · 响应发送后不保留文件。",back:"← 全部工具",login:"登录",logout:"退出",email:"邮箱",password:"密码",loginSubmit:"登录",loginTitle:"登录",loginBody:"请使用已验证的账号登录。没有账号可以先注册。",authFailed:"无法登录，请检查邮箱和密码。",register:"注册",registerTitle:"创建账号",registerBody:"我们会向邮箱发送一封验证邮件。打开链接后即可登录。",registerSubmit:"注册",confirmPassword:"确认密码",passwordHint:"至少 10 个字符，需包含字母和数字。",passwordMismatch:"两次输入的密码不一致。",weakPassword:"密码至少 10 个字符，并包含字母和数字。",checkEmail:"如果该地址可以使用，我们已发送邮件。",haveAccount:"已有账号？去登录",needAccount:"没有账号？去注册",verifyTitle:"验证邮箱",verifyWorking:"正在验证邮箱…",verifyOk:"邮箱已验证，现在可以登录。",verifyFail:"链接无效或已过期。",resend:"重新发送邮件",resendHint:"没收到？可以再发一次。",tryLater:"请稍后再试。",mailDown:"当前无法发送邮件。",registerFailed:"无法创建该账号。",runLocally:"请在本地运行后再处理文件。",apiDown:"无法连接 StayPDF API。请先在本地启动后再处理文件。",tooLarge:"每个文件不能超过 15 MB。",tooMany:"每次最多 10 个文件。"}};function pe(){try{const e=localStorage.getItem(G);if(e==="zh"||e==="en")return e}catch{}const a=typeof navigator<"u"&&navigator.language||"";return/^zh\b/i.test(a)?"zh":"en"}let T=pe();function me(){return T}function J(a){T=a==="zh"?"zh":"en";try{localStorage.setItem(G,T)}catch{}typeof document<"u"&&(document.documentElement.lang=T==="zh"?"zh-CN":"en")}function t(a,...e){const u=(N[T]||N.en)[a]??N.en[a]??a;return typeof u=="function"?u(...e):u}J(T);function M(a,e){if(typeof a!="string")return{ok:!1,pages:[],error:"empty"};const l=a.trim();if(!l)return{ok:!1,pages:[],error:"empty"};if(!Number.isInteger(e)||e<1)return{ok:!1,pages:[],error:"bad-count"};const u=l.split(/[,，]/).map(m=>m.trim()).filter(Boolean);if(u.length===0)return{ok:!1,pages:[],error:"empty"};const f=[],s=new Set;for(const m of u){const w=m.match(/^(\d+)\s*[-–—~～]\s*(\d+)$/),h=m.match(/^(\d+)$/);if(w){let g=Number(w[1]),b=Number(w[2]);if(!Number.isInteger(g)||!Number.isInteger(b))return{ok:!1,pages:[],error:"invalid"};if(g>b){const y=g;g=b,b=y}if(g<1||b>e)return{ok:!1,pages:[],error:"out-of-range"};for(let y=g;y<=b;y+=1)s.has(y)||(s.add(y),f.push(y))}else if(h){const g=Number(h[1]);if(!Number.isInteger(g)||g<1||g>e)return{ok:!1,pages:[],error:"out-of-range"};s.has(g)||(s.add(g),f.push(g))}else return{ok:!1,pages:[],error:"invalid"}}return f.length===0?{ok:!1,pages:[],error:"empty"}:{ok:!0,pages:f,error:null}}function ge(a,e,l="application/pdf"){const u=new Blob([a],{type:l}),f=URL.createObjectURL(u),s=document.createElement("a");s.href=f,s.download=e,document.body.appendChild(s),s.click(),s.remove(),setTimeout(()=>URL.revokeObjectURL(f),1500)}function n(a){return String(a).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function j(a){if(!a)return!1;const e=(a.type||"").toLowerCase(),l=(a.name||"").toLowerCase();return e==="application/pdf"||l.endsWith(".pdf")}function ye(a){if(!a)return!1;const e=(a.type||"").toLowerCase(),l=(a.name||"").toLowerCase();return e.startsWith("image/")?!0:/\.(png|jpe?g|webp|gif|bmp)$/i.test(l)}function V(a){if(!a)return!1;const e=(a.type||"").toLowerCase(),l=(a.name||"").toLowerCase();return e==="application/vnd.openxmlformats-officedocument.wordprocessingml.document"||e==="application/vnd.ms-word.document.macroenabled.12"||l.endsWith(".docx")}function x(){return null}function z(){return""}async function q(a,e={}){const l=x();if(!l){const s=new Error("run-local");throw s.code="run-local",s}const u={...e.headers||{}};return e.body&&!(e.body instanceof FormData)&&!u["Content-Type"]&&(u["Content-Type"]="application/json"),await fetch(`${l}${a}`,{credentials:"include",...e,headers:u})}function _(a,e){const l=new Error(e);throw a.status===429?l.code="try-later":a.status===503?l.code="mail":l.code=e,l}async function we(){const a=await q("/api/auth/me");if(!a.ok){const e=new Error("failed");throw e.code="failed",e}return a.json()}async function be(a,e){const l=await q("/api/auth/login",{method:"POST",body:JSON.stringify({email:a,password:e})});if(!l.ok){const u=new Error("auth");throw u.code="auth",u}return l.json()}async function ve(a,e,l={}){const u=await q("/api/auth/register",{method:"POST",body:JSON.stringify({email:a,password:e,company:l.company||"","cf-turnstile-response":l.turnstile||""})});return u.ok||_(u,"register"),u.json()}async function he(a){const e=await q("/api/auth/verify",{method:"POST",body:JSON.stringify({token:a})});if(!e.ok){const l=new Error("verify");throw l.code="verify",l}return e.json()}async function $e(a){const e=await q("/api/auth/resend-verification",{method:"POST",body:JSON.stringify({email:a})});return e.ok||_(e,"register"),e.json()}async function Pe(){await q("/api/auth/logout",{method:"POST"})}async function De(a,e,l={}){const u=new FormData;for(const s of e)u.append("files",s);for(const[s,m]of Object.entries(l))m==null||m===""||u.append(s,String(m));const f=await q(`/api/jobs/${a}`,{method:"POST",body:u});if(f.status===402){const s=new Error("plan");throw s.code="plan",s}if(!f.ok){let s="failed";try{const w=await f.json();w&&typeof w.code=="string"&&(s=w.code)}catch{}const m=new Error(s);throw m.code=s,m}return new Uint8Array(await f.arrayBuffer())}const ke=["/","/merge","/split","/rotate","/delete","/images","/compress","/ocr","/word","/login","/register","/verify"];function Le(){const e=(location.hash||"#/").replace(/^#/,"").split("?")[0]||"/";return ke.includes(e)?e:"/"}function Fe(){const a=(location.hash||"#/").replace(/^#/,""),e=a.includes("?")?a.slice(a.indexOf("?")+1):"";return new URLSearchParams(e)}function Se(a){return a.length>=10&&/[A-Za-z]/.test(a)&&/\d/.test(a)}let O=null;function Ee(a,e){const l=document.getElementById("turnstile-slot");if(!l||!a)return;const u=()=>{window.turnstile&&(l.innerHTML="",window.turnstile.render(l,{sitekey:a,theme:"dark",callback:e}))};if(window.turnstile){u();return}O||(O=document.createElement("script"),O.src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit",O.async=!0,document.head.appendChild(O)),O.addEventListener("load",u,{once:!0})}function qe(){return`<svg class="mark" viewBox="0 0 28 28" aria-hidden="true">
    <rect x="3" y="3" width="22" height="22" rx="6" fill="#1d221d" stroke="#b6e07a" stroke-width="1.4"/>
    <path d="M8 18.5V9.5h5.2c2.3 0 3.7 1.2 3.7 3.1 0 1.9-1.4 3.1-3.7 3.1H10.6V18.5H8zm2.6-4.6h2.3c1.1 0 1.7-.5 1.7-1.4s-.6-1.4-1.7-1.4h-2.3v2.8z" fill="#eef3ea"/>
  </svg>`}function E(a,e="document"){return String(a||e).replace(/\.[^.]+$/,"")||e}function Oe(a){const e=String(a||"").toLowerCase();return e.endsWith(".txt")?"text/plain;charset=utf-8":e.endsWith(".docx")?"application/vnd.openxmlformats-officedocument.wordprocessingml.document":"application/pdf"}function Te(a){const e={files:[],message:"",messageKind:"",busy:!1,paywall:!1,angle:90,fit:"a4",quality:"medium",ocrLang:"eng+chi_sim",ranges:"",email:"",password:"",confirmPassword:"",turnstileToken:"",verifyOnce:!1,session:{loaded:!1,apiConfigured:!!x(),apiReachable:!1,authenticated:!1,email:"",isPro:!1,remaining:null}};function l(r){location.hash!==`#${r}`?location.hash=r:c()}function u(){e.files=[],e.message="",e.messageKind="",e.busy=!1,e.angle=90,e.fit="a4",e.quality="medium",e.ocrLang="eng+chi_sim",e.ranges=""}function f(r,o){const d=Array.from(r||[]).filter(p=>o==="image"?ye(p):o==="one-word"?j(p)||V(p):j(p));if(o==="one-pdf"||o==="one-word"){const p=d[0];p&&(e.files=[p]),c();return}for(const p of d)e.files.push(p);c()}function s(r){const o={encrypted:t("encrypted"),failed:t("failed"),"need-two":t("needTwo"),"need-one":t("needOne"),"need-image":t("needImage"),"need-keep":t("needKeep"),"bad-range":t("badRange"),"out-of-range":t("outOfRange"),image:t("imageFailed"),auth:t("authFailed"),register:t("registerFailed"),verify:t("verifyFail"),"try-later":t("tryLater"),mail:t("mailDown"),mismatch:t("passwordMismatch"),weak:t("weakPassword"),"run-local":t("runLocally"),"too-large":t("tooLarge"),"too-many":t("tooMany"),"ocr-engine":t("ocrEngine"),"need-doc":t("needDoc")};e.messageKind="err",e.message=o[r]||t("failed")}function m(r){e.messageKind="ok",e.message=r}async function w(){if(!x()){e.session={loaded:!0,apiConfigured:!1,apiReachable:!1,authenticated:!1,email:"",isPro:!1,remaining:null},c();return}try{const r=await we();e.session={loaded:!0,apiConfigured:!0,apiReachable:!0,authenticated:!!r.authenticated,email:r.email||"",isPro:!!r.isPro,remaining:r.isPro?null:r.remaining}}catch{e.session={loaded:!0,apiConfigured:!0,apiReachable:!1,authenticated:!1,email:"",isPro:!1,remaining:null}}c()}async function h(r,o,i,d){if(!e.busy){if(!x()){s("run-local"),c();return}e.busy=!0,e.messageKind="",e.message=t("working"),c();try{const p=await De(r,o,i);ge(p,d,Oe(d)),m(t("done")),await w()}catch(p){p&&p.code==="plan"?(e.paywall=!0,e.messageKind="",e.message=""):s(p&&p.code||"failed")}finally{e.busy=!1,c()}}}function g(){const r=e.session;return r.apiConfigured?r.apiReachable?r.isPro?t("remainingPro"):typeof r.remaining=="number"?t("remaining",r.remaining):t("remainingUnknown"):t("apiDown"):t("runLocally")}function b(){const r=me(),o=e.session,i=o.authenticated?`<span class="who">${n(o.email)}</span><button type="button" class="btn ghost small" id="logout">${n(t("logout"))}</button>`:`<a class="btn ghost small" href="#/login" data-nav="/login">${n(t("login"))}</a>`;return`<header class="top">
      <a class="brand" href="#/" data-nav="/">${qe()}<span class="word">StayPDF</span></a>
      <div class="top-right">
        <div class="pill" id="remain">${n(g())}</div>
        ${i}
        <div class="lang" role="group" aria-label="language">
          <button type="button" data-lang="zh" class="${r==="zh"?"on":""}">${t("langZh")}</button>
          <button type="button" data-lang="en" class="${r==="en"?"on":""}">${t("langEn")}</button>
        </div>
      </div>
    </header>`}function y(){return`<footer class="foot"><span>${n(t("privacyProof"))}</span><span>${n(t("footer"))}</span></footer>`}function K(){return e.paywall?`<div class="paywall" id="paywall">
      <div class="sheet" role="dialog" aria-modal="true" aria-labelledby="pw-title">
        <h2 id="pw-title">${n(t("paywallTitle"))}</h2>
        <p>${n(t("paywallBody"))}</p>
        <div class="price">$6 <span>/ mo</span></div>
        <div class="row">
          <button class="btn ghost" type="button" id="pw-close">${n(t("close"))}</button>
        </div>
      </div>
    </div>`:""}function D(r,o,i){return`<div class="drop" id="drop">
      <input id="file" type="file" ${o?"multiple":""} accept="${i}" />
      <strong>${n(r)}</strong>
      <span>${n(t("privacy"))}</span>
    </div>`}function k(){return e.files.length===0?"":`<div class="list">${e.files.map((o,i)=>{const d=`${Math.round(o.size/1024)} KB`;return`<div class="item" data-i="${i}">
          <div class="meta">
            <div class="name">${n(o.name)}</div>
            <div class="sub">${n(d)}</div>
          </div>
          <div class="ops">
            <button class="btn" data-act="up" ${i===0?"disabled":""}>${n(t("moveUp"))}</button>
            <button class="btn" data-act="down" ${i===e.files.length-1?"disabled":""}>${n(t("moveDown"))}</button>
            <button class="btn warn" data-act="rm">${n(t("remove"))}</button>
          </div>
        </div>`}).join("")}</div>
      <div class="row">
        <button class="btn ghost" id="clear" type="button">${n(t("clear"))}</button>
      </div>`}function A(){return`<div class="status${e.messageKind?` ${e.messageKind}`:""}" role="status">${n(e.message)}</div>`}function B(){const o=[["/merge","merge","mergeDesc",""],["/split","split","splitDesc",""],["/rotate","rotate","rotateDesc",""],["/delete","delete","deleteDesc",""],["/images","images","imagesDesc",""],["/compress","compress","compressDesc","advanced"],["/ocr","ocr","ocrDesc","advanced"],["/word","word","wordDesc","advanced"]].map(([i,d,p,P])=>{const S=P?`<span class="badge adv">${n(t(P))}</span>`:'<span class="go">→</span>',F=`<h2>${n(t(d))}</h2>
          <p>${n(t(p))}</p>
          ${S}`;return`<a class="card" href="#${i}" data-nav="${i}">${F}</a>`}).join("");return`${b()}
      <section class="hero">
        <h1>${n(t("tagline"))}</h1>
        <div class="proof"><span class="dot"></span><div><b>${n(t("privacy"))}</b> ${n(t("privacyProof"))}</div></div>
      </section>
      <div class="grid">${o}</div>
      ${y()}${K()}`}function L(r,o,i){return`${b()}
      <a class="crumb" href="#/" data-nav="/">${n(t("back"))}</a>
      <div class="panel">
        <h1 class="tool-title">${n(t(r))}</h1>
        <p class="lede">${n(t(o))}</p>
        ${i}
        ${A()}
      </div>
      ${y()}${K()}`}function Y(){return L("merge","mergeDesc",`${D(t("dropPdf"),!0,"application/pdf,.pdf")}
       ${k()}
       <div class="row">
         <button class="btn primary" id="run" type="button" ${e.busy?"disabled":""}>${n(t("runMerge"))}</button>
       </div>`)}function Z(){return L("split","splitDesc",`${D(t("dropPdfOne"),!1,"application/pdf,.pdf")}
       ${k()}
       <label class="field">${n(t("ranges"))}
         <input id="ranges" type="text" value="${n(e.ranges)}" placeholder="${n(t("rangesHint"))}" />
       </label>
       <div class="row">
         <button class="btn primary" id="run" type="button" ${e.busy?"disabled":""}>${n(t("runSplit"))}</button>
       </div>`)}function Q(){return L("rotate","rotateDesc",`${D(t("dropPdfOne"),!1,"application/pdf,.pdf")}
       ${k()}
       <label class="field">${n(t("ranges"))}
         <input id="ranges" type="text" value="${n(e.ranges)}" placeholder="${n(t("rangesAllHint"))}" />
       </label>
       <div class="field">${n(t("angle"))}
         <div class="angles">
           <label><input type="radio" name="angle" value="90" ${e.angle===90?"checked":""}/> ${n(t("cw90"))}</label>
           <label><input type="radio" name="angle" value="180" ${e.angle===180?"checked":""}/> ${n(t("cw180"))}</label>
           <label><input type="radio" name="angle" value="270" ${e.angle===270?"checked":""}/> ${n(t("cw270"))}</label>
         </div>
       </div>
       <div class="row">
         <button class="btn primary" id="run" type="button" ${e.busy?"disabled":""}>${n(t("runRotate"))}</button>
       </div>`)}function X(){return L("delete","deleteDesc",`${D(t("dropPdfOne"),!1,"application/pdf,.pdf")}
       ${k()}
       <label class="field">${n(t("ranges"))}
         <input id="ranges" type="text" value="${n(e.ranges)}" placeholder="${n(t("rangesHint"))}" />
       </label>
       <div class="row">
         <button class="btn primary" id="run" type="button" ${e.busy?"disabled":""}>${n(t("runDelete"))}</button>
       </div>`)}function ee(){return L("images","imagesDesc",`${D(t("dropImages"),!0,"image/jpeg,image/png,image/webp,image/gif,.jpg,.jpeg,.png,.webp")}
       ${k()}
       <label class="field">${n(t("fitA4"))}
         <select id="fit">
           <option value="a4" ${e.fit==="a4"?"selected":""}>${n(t("fitA4"))}</option>
           <option value="original" ${e.fit==="original"?"selected":""}>${n(t("fitOriginal"))}</option>
         </select>
       </label>
       <div class="row">
         <button class="btn primary" id="run" type="button" ${e.busy?"disabled":""}>${n(t("runImages"))}</button>
       </div>`)}function te(){return L("compress","compressDesc",`${D(t("dropPdfOne"),!1,"application/pdf,.pdf")}
       ${k()}
       <label class="field">${n(t("quality"))}
         <select id="quality">
           <option value="low" ${e.quality==="low"?"selected":""}>${n(t("qualityLow"))}</option>
           <option value="medium" ${e.quality==="medium"?"selected":""}>${n(t("qualityMed"))}</option>
           <option value="high" ${e.quality==="high"?"selected":""}>${n(t("qualityHigh"))}</option>
         </select>
       </label>
       <div class="row">
         <button class="btn primary" id="run" type="button" ${e.busy?"disabled":""}>${n(t("runCompress"))}</button>
       </div>`)}function ae(){return L("ocr","ocrDesc",`${D(t("dropPdfOne"),!1,"application/pdf,.pdf")}
       ${k()}
       <label class="field">${n(t("ocrLang"))}
         <select id="ocr-lang">
           <option value="eng+chi_sim" ${e.ocrLang==="eng+chi_sim"?"selected":""}>English + 简体中文</option>
           <option value="eng" ${e.ocrLang==="eng"?"selected":""}>English</option>
           <option value="chi_sim" ${e.ocrLang==="chi_sim"?"selected":""}>简体中文</option>
         </select>
       </label>
       <div class="row">
         <button class="btn primary" id="run" type="button" ${e.busy?"disabled":""}>${n(t("runOcr"))}</button>
       </div>`)}function ne(){return L("word","wordDesc",`${D(t("dropWord"),!1,"application/pdf,.pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,.docx")}
       ${k()}
       <p class="hint">${n(t("wordHint"))}</p>
       <div class="row">
         <button class="btn primary" id="run" type="button" ${e.busy?"disabled":""}>${n(t("runWord"))}</button>
       </div>`)}function re(){return`${b()}
      <a class="crumb" href="#/" data-nav="/">${n(t("back"))}</a>
      <div class="panel">
        <h1 class="tool-title">${n(t("loginTitle"))}</h1>
        <p class="lede">${n(t("loginBody"))}</p>
        <form id="login-form" class="login-form">
          <label class="field">${n(t("email"))}
            <input id="email" type="email" autocomplete="username" value="${n(e.email)}" required />
          </label>
          <label class="field">${n(t("password"))}
            <input id="password" type="password" autocomplete="current-password" value="${n(e.password)}" required />
          </label>
          <div class="row">
            <button class="btn primary" type="submit" ${e.busy?"disabled":""}>${n(t("loginSubmit"))}</button>
          </div>
        </form>
        <p class="auth-switch"><a href="#/register" data-nav="/register">${n(t("needAccount"))}</a></p>
        ${A()}
      </div>
      ${y()}`}function ie(){const o=z()?'<div id="turnstile-slot" class="turnstile"></div>':"";return`${b()}
      <a class="crumb" href="#/" data-nav="/">${n(t("back"))}</a>
      <div class="panel">
        <h1 class="tool-title">${n(t("registerTitle"))}</h1>
        <p class="lede">${n(t("registerBody"))}</p>
        <form id="register-form" class="login-form">
          <div class="sr" aria-hidden="true">
            <label>Company
              <input id="company" type="text" name="company" tabindex="-1" autocomplete="off" />
            </label>
          </div>
          <label class="field">${n(t("email"))}
            <input id="email" type="email" autocomplete="username" value="${n(e.email)}" required />
          </label>
          <label class="field">${n(t("password"))}
            <input id="password" type="password" autocomplete="new-password" value="${n(e.password)}" required />
          </label>
          <label class="field">${n(t("confirmPassword"))}
            <input id="confirm" type="password" autocomplete="new-password" value="${n(e.confirmPassword)}" required />
          </label>
          <p class="hint">${n(t("passwordHint"))}</p>
          ${o}
          <div class="row">
            <button class="btn primary" type="submit" ${e.busy?"disabled":""}>${n(t("registerSubmit"))}</button>
          </div>
        </form>
        <p class="auth-switch"><a href="#/login" data-nav="/login">${n(t("haveAccount"))}</a></p>
        ${A()}
      </div>
      ${y()}`}function se(){return`${b()}
      <a class="crumb" href="#/" data-nav="/">${n(t("back"))}</a>
      <div class="panel">
        <h1 class="tool-title">${n(t("verifyTitle"))}</h1>
        <p class="lede">${n(e.messageKind==="ok"?t("verifyOk"):e.messageKind==="err"?t("verifyFail"):t("verifyWorking"))}</p>
        ${e.messageKind==="ok"?`<p class="auth-switch"><a href="#/login" data-nav="/login">${n(t("login"))}</a></p>`:""}
        ${e.messageKind==="err"?`<p class="hint">${n(t("resendHint"))}</p>
        <form id="resend-form" class="login-form">
          <label class="field">${n(t("email"))}
            <input id="email" type="email" autocomplete="username" value="${n(e.email)}" required />
          </label>
          <div class="row">
            <button class="btn primary" type="submit" ${e.busy?"disabled":""}>${n(t("resend"))}</button>
          </div>
        </form>`:""}
        ${A()}
      </div>
      ${y()}`}function oe(){a.querySelectorAll("[data-lang]").forEach(i=>{i.addEventListener("click",()=>{J(i.getAttribute("data-lang")),c()})}),a.querySelectorAll("[data-nav]").forEach(i=>{i.addEventListener("click",d=>{d.preventDefault();const p=i.getAttribute("data-nav");u(),l(p)})});const r=a.querySelector("#pw-close");r&&r.addEventListener("click",()=>{e.paywall=!1,c()});const o=a.querySelector("#logout");o&&o.addEventListener("click",async()=>{try{await Pe()}catch{}await w()})}function C(r){const o=a.querySelector("#drop"),i=a.querySelector("#file");if(!o||!i)return;const d=v=>f(v,r);i.addEventListener("change",()=>{d(i.files),i.value=""}),o.addEventListener("dragover",v=>{v.preventDefault(),o.classList.add("over")}),o.addEventListener("dragleave",()=>o.classList.remove("over")),o.addEventListener("drop",v=>{v.preventDefault(),o.classList.remove("over"),d(v.dataTransfer.files)}),a.querySelectorAll(".item").forEach(v=>{v.addEventListener("click",fe=>{const U=fe.target.closest("button");if(!U)return;const $=Number(v.getAttribute("data-i")),H=U.getAttribute("data-act");if(H==="rm"&&e.files.splice($,1),H==="up"&&$>0){const I=e.files[$-1];e.files[$-1]=e.files[$],e.files[$]=I}if(H==="down"&&$<e.files.length-1){const I=e.files[$+1];e.files[$+1]=e.files[$],e.files[$]=I}c()})});const p=a.querySelector("#clear");p&&p.addEventListener("click",()=>{e.files=[],c()});const P=a.querySelector("#ranges");P&&P.addEventListener("input",()=>{e.ranges=P.value});const S=a.querySelector("#fit");S&&S.addEventListener("change",()=>{e.fit=S.value});const F=a.querySelector("#quality");F&&F.addEventListener("change",()=>{e.quality=F.value});const W=a.querySelector("#ocr-lang");W&&W.addEventListener("change",()=>{e.ocrLang=W.value}),a.querySelectorAll('input[name="angle"]').forEach(v=>{v.addEventListener("change",()=>{e.angle=Number(v.value)})})}function le(){const r=a.querySelector("#login-form");if(!r)return;const o=a.querySelector("#email"),i=a.querySelector("#password");o&&o.addEventListener("input",()=>{e.email=o.value}),i&&i.addEventListener("input",()=>{e.password=i.value}),r.addEventListener("submit",async d=>{if(d.preventDefault(),!e.busy){e.busy=!0,e.message=t("working"),e.messageKind="",c();try{await be(e.email,e.password),e.password="",e.busy=!1,await w(),l("/")}catch{s("auth"),e.busy=!1,c()}}})}function ce(){const r=a.querySelector("#register-form");if(!r)return;const o=a.querySelector("#email"),i=a.querySelector("#password"),d=a.querySelector("#confirm");o&&o.addEventListener("input",()=>{e.email=o.value}),i&&i.addEventListener("input",()=>{e.password=i.value}),d&&d.addEventListener("input",()=>{e.confirmPassword=d.value});const p=z();p&&Ee(p,P=>{e.turnstileToken=P}),r.addEventListener("submit",async P=>{if(P.preventDefault(),e.busy)return;if(!Se(e.password)){s("weak"),c();return}if(e.password!==e.confirmPassword){s("mismatch"),c();return}const S=(a.querySelector("#company")||{}).value||"";e.busy=!0,e.message=t("working"),e.messageKind="",c();try{await ve(e.email,e.password,{company:S,turnstile:e.turnstileToken}),e.password="",e.confirmPassword="",e.turnstileToken="",e.busy=!1,m(t("checkEmail")),c()}catch(F){s(F&&F.code||"register"),e.busy=!1,c()}})}function de(){const r=a.querySelector("#resend-form");if(r){const i=a.querySelector("#email");i&&i.addEventListener("input",()=>{e.email=i.value}),r.addEventListener("submit",async d=>{if(d.preventDefault(),!e.busy){e.busy=!0,e.message=t("working"),e.messageKind="",c();try{await $e(e.email),e.busy=!1,m(t("checkEmail")),c()}catch(p){s(p&&p.code||"register"),e.busy=!1,c()}}})}if(e.verifyOnce)return;e.verifyOnce=!0;const o=Fe().get("token")||"";if(!o){s("verify"),c();return}e.busy=!0,e.message=t("verifyWorking"),e.messageKind="",(async()=>{try{await he(o),e.busy=!1,m(t("verifyOk")),c()}catch{s("verify"),e.busy=!1,c()}})()}function ue(r){const o=a.querySelector("#run");o&&o.addEventListener("click",async()=>{if(r==="/merge"){if(e.files.length<2)return s("need-two"),c();await h("merge",e.files,{},"merged.pdf")}else if(r==="/split"){const i=e.files[0];if(!i)return s("need-one"),c();const d=M(e.ranges,9999);if(!d.ok)return s(d.error==="empty"?"bad-range":d.error),c();await h("split",[i],{ranges:e.ranges},`${E(i.name)}-extract.pdf`)}else if(r==="/rotate"){const i=e.files[0];if(!i)return s("need-one"),c();if(e.ranges.trim()){const d=M(e.ranges,9999);if(!d.ok)return s(d.error==="empty"?"bad-range":d.error),c()}await h("rotate",[i],{ranges:e.ranges,angle:e.angle},`${E(i.name)}-rotated.pdf`)}else if(r==="/delete"){const i=e.files[0];if(!i)return s("need-one"),c();const d=M(e.ranges,9999);if(!d.ok)return s(d.error==="empty"?"bad-range":d.error),c();await h("delete",[i],{ranges:e.ranges},`${E(i.name)}-deleted.pdf`)}else if(r==="/images"){if(e.files.length===0)return s("need-image"),c();await h("images",e.files,{fit:e.fit},"images.pdf")}else if(r==="/compress"){const i=e.files[0];if(!i)return s("need-one"),c();await h("compress",[i],{quality:e.quality},`${E(i.name)}-compressed.pdf`)}else if(r==="/ocr"){const i=e.files[0];if(!i)return s("need-one"),c();await h("ocr",[i],{lang:e.ocrLang},`${E(i.name)}-ocr.txt`)}else if(r==="/word"){const i=e.files[0];if(!i)return s("need-doc"),c();const d=V(i)?`${E(i.name)}-converted.pdf`:`${E(i.name)}-converted.docx`;await h("word",[i],{},d)}})}let R=null;function c(){const r=Le();R&&R!==r&&(u(),e.verifyOnce=!1,e.turnstileToken=""),R=r;const o={"/":B,"/merge":Y,"/split":Z,"/rotate":Q,"/delete":X,"/images":ee,"/compress":te,"/ocr":ae,"/word":ne,"/login":re,"/register":ie,"/verify":se};a.innerHTML=`<div class="app">${(o[r]||B)()}</div>`,oe(),r==="/merge"?C("pdf"):r==="/images"?C("image"):r==="/word"?C("one-word"):r==="/login"?le():r==="/register"?ce():r==="/verify"?de():r!=="/"&&C("one-pdf"),ue(r)}return window.addEventListener("hashchange",c),c(),w(),{draw:c}}Te(document.getElementById("app"));
