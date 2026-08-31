(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))c(l);new MutationObserver(l=>{for(const s of l)if(s.type==="childList")for(const g of s.addedNodes)g.tagName==="LINK"&&g.rel==="modulepreload"&&c(g)}).observe(document,{childList:!0,subtree:!0});function p(l){const s={};return l.integrity&&(s.integrity=l.integrity),l.referrerPolicy&&(s.referrerPolicy=l.referrerPolicy),l.crossOrigin==="use-credentials"?s.credentials="include":l.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function c(l){if(l.ep)return;l.ep=!0;const s=p(l);fetch(l.href,s)}})();const K="staypdf-lang",I={en:{brand:"StayPDF",tagline:"PDF tools. Processed in memory, not stored.",privacy:"Processed in server memory, then discarded.",privacyProof:"Files are sent to the StayPDF API, transformed in memory, and the result is downloaded. Bytes are not written to disk and are not stored.",langZh:"中文",langEn:"EN",remaining:a=>`${a} free export${a===1?"":"s"} left today`,remainingPro:"Pro",remainingUnknown:"Sign in for unlimited exports",tools:"Tools",home:"All tools",merge:"Merge PDFs",mergeDesc:"Combine two or more PDFs into one file. Drag to reorder.",split:"Split PDF",splitDesc:"Extract page ranges into a new PDF.",rotate:"Rotate pages",rotateDesc:"Turn selected pages 90°, 180°, or 270° clockwise.",delete:"Delete pages",deleteDesc:"Remove pages and download the rest.",images:"Images → PDF",imagesDesc:"Turn JPG, PNG, or WebP images into a single PDF.",compress:"Compress PDF",ocr:"OCR / scan to text",word:"PDF ↔ Word",proComing:"Pro coming",dropPdf:"Drop PDFs here, or click to choose",dropPdfOne:"Drop a PDF here, or click to choose",dropImages:"Drop images here, or click to choose",addMore:"Add more",clear:"Clear",files:"Files",pages:"pages",page:"page",moveUp:"Up",moveDown:"Down",remove:"Remove",ranges:"Pages",rangesHint:"Example: 1-3, 5, 8-10",rangesAllHint:"Leave blank for all pages, or e.g. 1-3, 5",angle:"Rotation",cw90:"90° clockwise",cw180:"180°",cw270:"270° clockwise",fitA4:"Fit to A4",fitOriginal:"Original aspect, max A4",runMerge:"Merge & download",runSplit:"Extract & download",runRotate:"Rotate & download",runDelete:"Delete & download",runImages:"Create PDF & download",needTwo:"Add at least two PDFs.",needOne:"Add a PDF first.",needImage:"Add at least one image.",needKeep:"You must keep at least one page.",badRange:"Check the page list. Use numbers and ranges like 1-3, 5.",outOfRange:"A page number is outside this file.",encrypted:"This PDF is encrypted. StayPDF cannot open password-protected files yet.",failed:"Could not process this file. Try another PDF.",imageFailed:"Could not read an image. Use JPG, PNG, or WebP.",working:"Working…",done:"Downloaded. The upload was processed in memory and discarded.",paywallTitle:"Upgrade to continue",paywallBody:"StayPDF Pro is $6/month for unlimited exports. Payments are not connected yet.",close:"Not now",footer:"MIT · Files are not kept after the response is sent.",back:"← Tools",login:"Log in",logout:"Log out",email:"Email",password:"Password",loginSubmit:"Log in",loginTitle:"Log in",loginBody:"Use the account from your local .env to test Pro exports.",authFailed:"Could not sign in. Check the email and password.",runLocally:"Run locally to process files.",apiDown:"Cannot reach the StayPDF API. Start it locally to process files.",tooLarge:"Each file must be 15 MB or smaller.",tooMany:"Up to 10 files per request."},zh:{brand:"StayPDF",tagline:"PDF 工具。在内存中处理，不落盘保存。",privacy:"在服务器内存中处理，随后丢弃。",privacyProof:"文件发送到 StayPDF API，在内存中转换，再下载结果。不会写入磁盘，也不会存储。",langZh:"中文",langEn:"EN",remaining:a=>`今日剩余 ${a} 次免费导出`,remainingPro:"Pro",remainingUnknown:"登录后可不限次导出",tools:"工具",home:"全部工具",merge:"合并 PDF",mergeDesc:"将两份及以上 PDF 合成一份。可调整顺序。",split:"拆分 PDF",splitDesc:"按页码范围提取页面，生成新的 PDF。",rotate:"旋转页面",rotateDesc:"将指定页面顺时针旋转 90°、180° 或 270°。",delete:"删除页面",deleteDesc:"去掉不想要的页，下载剩余内容。",images:"图片转 PDF",imagesDesc:"把 JPG、PNG、WebP 图片合成一份 PDF。",compress:"压缩 PDF",ocr:"OCR 识别文字",word:"PDF ↔ Word",proComing:"Pro 即将推出",dropPdf:"把 PDF 拖到这里，或点击选择",dropPdfOne:"把一份 PDF 拖到这里，或点击选择",dropImages:"把图片拖到这里，或点击选择",addMore:"继续添加",clear:"清空",files:"文件",pages:"页",page:"页",moveUp:"上移",moveDown:"下移",remove:"移除",ranges:"页码",rangesHint:"例如：1-3, 5, 8-10",rangesAllHint:"留空表示全部页面，或如 1-3, 5",angle:"旋转角度",cw90:"顺时针 90°",cw180:"180°",cw270:"顺时针 270°",fitA4:"适应 A4",fitOriginal:"原比例，最大 A4",runMerge:"合并并下载",runSplit:"提取并下载",runRotate:"旋转并下载",runDelete:"删除并下载",runImages:"生成 PDF 并下载",needTwo:"请至少添加两份 PDF。",needOne:"请先添加一份 PDF。",needImage:"请至少添加一张图片。",needKeep:"至少需要保留一页。",badRange:"请检查页码。使用数字和范围，例如 1-3, 5。",outOfRange:"页码超出了这份文件的页数。",encrypted:"这份 PDF 已加密。StayPDF 暂不支持带密码的文件。",failed:"无法处理该文件，请换一份 PDF 试试。",imageFailed:"无法读取图片。请使用 JPG、PNG 或 WebP。",working:"处理中…",done:"已下载。上传内容在内存中处理并已丢弃。",paywallTitle:"升级后继续",paywallBody:"StayPDF Pro 为 $6/月，不限次数。支付尚未接入。",close:"稍后再说",footer:"MIT · 响应发送后不保留文件。",back:"← 全部工具",login:"登录",logout:"退出",email:"邮箱",password:"密码",loginSubmit:"登录",loginTitle:"登录",loginBody:"使用本地 .env 中的账号测试 Pro 导出。",authFailed:"无法登录，请检查邮箱和密码。",runLocally:"请在本地运行后再处理文件。",apiDown:"无法连接 StayPDF API。请先在本地启动后再处理文件。",tooLarge:"每个文件不能超过 15 MB。",tooMany:"每次最多 10 个文件。"}};function X(){try{const e=localStorage.getItem(K);if(e==="zh"||e==="en")return e}catch{}const a=typeof navigator<"u"&&navigator.language||"";return/^zh\b/i.test(a)?"zh":"en"}let F=X();function ee(){return F}function j(a){F=a==="zh"?"zh":"en";try{localStorage.setItem(K,F)}catch{}typeof document<"u"&&(document.documentElement.lang=F==="zh"?"zh-CN":"en")}function t(a,...e){const c=(I[F]||I.en)[a]??I.en[a]??a;return typeof c=="function"?c(...e):c}j(F);function N(a,e){if(typeof a!="string")return{ok:!1,pages:[],error:"empty"};const p=a.trim();if(!p)return{ok:!1,pages:[],error:"empty"};if(!Number.isInteger(e)||e<1)return{ok:!1,pages:[],error:"bad-count"};const c=p.split(/[,，]/).map(g=>g.trim()).filter(Boolean);if(c.length===0)return{ok:!1,pages:[],error:"empty"};const l=[],s=new Set;for(const g of c){const b=g.match(/^(\d+)\s*[-–—~～]\s*(\d+)$/),$=g.match(/^(\d+)$/);if(b){let m=Number(b[1]),w=Number(b[2]);if(!Number.isInteger(m)||!Number.isInteger(w))return{ok:!1,pages:[],error:"invalid"};if(m>w){const h=m;m=w,w=h}if(m<1||w>e)return{ok:!1,pages:[],error:"out-of-range"};for(let h=m;h<=w;h+=1)s.has(h)||(s.add(h),l.push(h))}else if($){const m=Number($[1]);if(!Number.isInteger(m)||m<1||m>e)return{ok:!1,pages:[],error:"out-of-range"};s.has(m)||(s.add(m),l.push(m))}else return{ok:!1,pages:[],error:"invalid"}}return l.length===0?{ok:!1,pages:[],error:"empty"}:{ok:!0,pages:l,error:null}}function te(a,e,p="application/pdf"){const c=new Blob([a],{type:p}),l=URL.createObjectURL(c),s=document.createElement("a");s.href=l,s.download=e,document.body.appendChild(s),s.click(),s.remove(),setTimeout(()=>URL.revokeObjectURL(l),1500)}function n(a){return String(a).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function ae(a){if(!a)return!1;const e=(a.type||"").toLowerCase(),p=(a.name||"").toLowerCase();return e==="application/pdf"||p.endsWith(".pdf")}function ne(a){if(!a)return!1;const e=(a.type||"").toLowerCase(),p=(a.name||"").toLowerCase();return e.startsWith("image/")?!0:/\.(png|jpe?g|webp|gif|bmp)$/i.test(p)}function E(){return null}async function A(a,e={}){const p=E();if(!p){const s=new Error("run-local");throw s.code="run-local",s}const c={...e.headers||{}};return e.body&&!(e.body instanceof FormData)&&!c["Content-Type"]&&(c["Content-Type"]="application/json"),await fetch(`${p}${a}`,{credentials:"include",...e,headers:c})}async function re(){const a=await A("/api/auth/me");if(!a.ok){const e=new Error("failed");throw e.code="failed",e}return a.json()}async function se(a,e){const p=await A("/api/auth/login",{method:"POST",body:JSON.stringify({email:a,password:e})});if(!p.ok){const c=new Error("auth");throw c.code="auth",c}return p.json()}async function oe(){await A("/api/auth/logout",{method:"POST"})}async function ie(a,e,p={}){const c=new FormData;for(const s of e)c.append("files",s);for(const[s,g]of Object.entries(p))g==null||g===""||c.append(s,String(g));const l=await A(`/api/jobs/${a}`,{method:"POST",body:c});if(l.status===402){const s=new Error("plan");throw s.code="plan",s}if(!l.ok){let s="failed";try{const b=await l.json();b&&typeof b.code=="string"&&(s=b.code)}catch{}const g=new Error(s);throw g.code=s,g}return new Uint8Array(await l.arrayBuffer())}const le=["/","/merge","/split","/rotate","/delete","/images","/login"];function de(){const e=(location.hash||"#/").replace(/^#/,"").split("?")[0]||"/";return le.includes(e)?e:"/"}function ce(){return`<svg class="mark" viewBox="0 0 28 28" aria-hidden="true">
    <rect x="3" y="3" width="22" height="22" rx="6" fill="#1d221d" stroke="#b6e07a" stroke-width="1.4"/>
    <path d="M8 18.5V9.5h5.2c2.3 0 3.7 1.2 3.7 3.1 0 1.9-1.4 3.1-3.7 3.1H10.6V18.5H8zm2.6-4.6h2.3c1.1 0 1.7-.5 1.7-1.4s-.6-1.4-1.7-1.4h-2.3v2.8z" fill="#eef3ea"/>
  </svg>`}function q(a,e="document"){return String(a||e).replace(/\.[^.]+$/,"")||e}function ue(a){const e={files:[],message:"",messageKind:"",busy:!1,paywall:!1,angle:90,fit:"a4",ranges:"",email:"",password:"",session:{loaded:!1,apiConfigured:!!E(),apiReachable:!1,authenticated:!1,email:"",isPro:!1,remaining:null}};function p(r){location.hash!==`#${r}`?location.hash=r:u()}function c(){e.files=[],e.message="",e.messageKind="",e.busy=!1,e.angle=90,e.fit="a4",e.ranges=""}function l(r,i){const d=Array.from(r||[]).filter(f=>i==="image"?ne(f):ae(f));if(i==="one-pdf"){const f=d[0];f&&(e.files=[f]),u();return}for(const f of d)e.files.push(f);u()}function s(r){const i={encrypted:t("encrypted"),failed:t("failed"),"need-two":t("needTwo"),"need-one":t("needOne"),"need-image":t("needImage"),"need-keep":t("needKeep"),"bad-range":t("badRange"),"out-of-range":t("outOfRange"),image:t("imageFailed"),auth:t("authFailed"),"run-local":t("runLocally"),"too-large":t("tooLarge"),"too-many":t("tooMany")};e.messageKind="err",e.message=i[r]||t("failed")}function g(r){e.messageKind="ok",e.message=r}async function b(){if(!E()){e.session={loaded:!0,apiConfigured:!1,apiReachable:!1,authenticated:!1,email:"",isPro:!1,remaining:null},u();return}try{const r=await re();e.session={loaded:!0,apiConfigured:!0,apiReachable:!0,authenticated:!!r.authenticated,email:r.email||"",isPro:!!r.isPro,remaining:r.isPro?null:r.remaining}}catch{e.session={loaded:!0,apiConfigured:!0,apiReachable:!1,authenticated:!1,email:"",isPro:!1,remaining:null}}u()}async function $(r,i,o,d){if(!e.busy){if(!E()){s("run-local"),u();return}e.busy=!0,e.messageKind="",e.message=t("working"),u();try{const f=await ie(r,i,o);te(f,d),g(t("done")),await b()}catch(f){f&&f.code==="plan"?(e.paywall=!0,e.messageKind="",e.message=""):s(f&&f.code||"failed")}finally{e.busy=!1,u()}}}function m(){const r=e.session;return r.apiConfigured?r.apiReachable?r.isPro?t("remainingPro"):typeof r.remaining=="number"?t("remaining",r.remaining):t("remainingUnknown"):t("apiDown"):t("runLocally")}function w(){const r=ee(),i=e.session,o=i.authenticated?`<span class="who">${n(i.email)}</span><button type="button" class="btn ghost small" id="logout">${n(t("logout"))}</button>`:`<a class="btn ghost small" href="#/login" data-nav="/login">${n(t("login"))}</a>`;return`<header class="top">
      <a class="brand" href="#/" data-nav="/">${ce()}<span class="word">StayPDF</span></a>
      <div class="top-right">
        <div class="pill" id="remain">${n(m())}</div>
        ${o}
        <div class="lang" role="group" aria-label="language">
          <button type="button" data-lang="zh" class="${r==="zh"?"on":""}">${t("langZh")}</button>
          <button type="button" data-lang="en" class="${r==="en"?"on":""}">${t("langEn")}</button>
        </div>
      </div>
    </header>`}function h(){return`<footer class="foot"><span>${n(t("privacyProof"))}</span><span>${n(t("footer"))}</span></footer>`}function B(){return e.paywall?`<div class="paywall" id="paywall">
      <div class="sheet" role="dialog" aria-modal="true" aria-labelledby="pw-title">
        <h2 id="pw-title">${n(t("paywallTitle"))}</h2>
        <p>${n(t("paywallBody"))}</p>
        <div class="price">$6 <span>/ mo</span></div>
        <div class="row">
          <button class="btn ghost" type="button" id="pw-close">${n(t("close"))}</button>
        </div>
      </div>
    </div>`:""}function k(r,i,o){return`<div class="drop" id="drop">
      <input id="file" type="file" ${i?"multiple":""} accept="${o}" />
      <strong>${n(r)}</strong>
      <span>${n(t("privacy"))}</span>
    </div>`}function L(){return e.files.length===0?"":`<div class="list">${e.files.map((i,o)=>{const d=`${Math.round(i.size/1024)} KB`;return`<div class="item" data-i="${o}">
          <div class="meta">
            <div class="name">${n(i.name)}</div>
            <div class="sub">${n(d)}</div>
          </div>
          <div class="ops">
            <button class="btn" data-act="up" ${o===0?"disabled":""}>${n(t("moveUp"))}</button>
            <button class="btn" data-act="down" ${o===e.files.length-1?"disabled":""}>${n(t("moveDown"))}</button>
            <button class="btn warn" data-act="rm">${n(t("remove"))}</button>
          </div>
        </div>`}).join("")}</div>
      <div class="row">
        <button class="btn ghost" id="clear" type="button">${n(t("clear"))}</button>
      </div>`}function M(){return`<div class="status${e.messageKind?` ${e.messageKind}`:""}" role="status">${n(e.message)}</div>`}function U(){const i=[["/merge","merge","mergeDesc",!1],["/split","split","splitDesc",!1],["/rotate","rotate","rotateDesc",!1],["/delete","delete","deleteDesc",!1],["/images","images","imagesDesc",!1],[null,"compress","proComing",!0],[null,"ocr","proComing",!0],[null,"word","proComing",!0]].map(([o,d,f,P])=>{const D=`<h2>${n(t(d))}</h2>
          <p>${n(t(f))}</p>
          ${P?`<span class="badge">${n(t("proComing"))}</span>`:'<span class="go">→</span>'}`;return P?`<div class="card soon">${D}</div>`:`<a class="card" href="#${o}" data-nav="${o}">${D}</a>`}).join("");return`${w()}
      <section class="hero">
        <h1>${n(t("tagline"))}</h1>
        <div class="proof"><span class="dot"></span><div><b>${n(t("privacy"))}</b> ${n(t("privacyProof"))}</div></div>
      </section>
      <div class="grid">${i}</div>
      ${h()}${B()}`}function S(r,i,o){return`${w()}
      <a class="crumb" href="#/" data-nav="/">${n(t("back"))}</a>
      <div class="panel">
        <h1 class="tool-title">${n(t(r))}</h1>
        <p class="lede">${n(t(i))}</p>
        ${o}
        ${M()}
      </div>
      ${h()}${B()}`}function z(){return S("merge","mergeDesc",`${k(t("dropPdf"),!0,"application/pdf,.pdf")}
       ${L()}
       <div class="row">
         <button class="btn primary" id="run" type="button" ${e.busy?"disabled":""}>${n(t("runMerge"))}</button>
       </div>`)}function H(){return S("split","splitDesc",`${k(t("dropPdfOne"),!1,"application/pdf,.pdf")}
       ${L()}
       <label class="field">${n(t("ranges"))}
         <input id="ranges" type="text" value="${n(e.ranges)}" placeholder="${n(t("rangesHint"))}" />
       </label>
       <div class="row">
         <button class="btn primary" id="run" type="button" ${e.busy?"disabled":""}>${n(t("runSplit"))}</button>
       </div>`)}function G(){return S("rotate","rotateDesc",`${k(t("dropPdfOne"),!1,"application/pdf,.pdf")}
       ${L()}
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
       </div>`)}function W(){return S("delete","deleteDesc",`${k(t("dropPdfOne"),!1,"application/pdf,.pdf")}
       ${L()}
       <label class="field">${n(t("ranges"))}
         <input id="ranges" type="text" value="${n(e.ranges)}" placeholder="${n(t("rangesHint"))}" />
       </label>
       <div class="row">
         <button class="btn primary" id="run" type="button" ${e.busy?"disabled":""}>${n(t("runDelete"))}</button>
       </div>`)}function V(){return S("images","imagesDesc",`${k(t("dropImages"),!0,"image/jpeg,image/png,image/webp,image/gif,.jpg,.jpeg,.png,.webp")}
       ${L()}
       <label class="field">${n(t("fitA4"))}
         <select id="fit">
           <option value="a4" ${e.fit==="a4"?"selected":""}>${n(t("fitA4"))}</option>
           <option value="original" ${e.fit==="original"?"selected":""}>${n(t("fitOriginal"))}</option>
         </select>
       </label>
       <div class="row">
         <button class="btn primary" id="run" type="button" ${e.busy?"disabled":""}>${n(t("runImages"))}</button>
       </div>`)}function J(){return`${w()}
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
        ${M()}
      </div>
      ${h()}`}function Z(){a.querySelectorAll("[data-lang]").forEach(o=>{o.addEventListener("click",()=>{j(o.getAttribute("data-lang")),u()})}),a.querySelectorAll("[data-nav]").forEach(o=>{o.addEventListener("click",d=>{d.preventDefault();const f=o.getAttribute("data-nav");c(),p(f)})});const r=a.querySelector("#pw-close");r&&r.addEventListener("click",()=>{e.paywall=!1,u()});const i=a.querySelector("#logout");i&&i.addEventListener("click",async()=>{try{await oe()}catch{}await b()})}function O(r){const i=a.querySelector("#drop"),o=a.querySelector("#file");if(!i||!o)return;const d=y=>l(y,r);o.addEventListener("change",()=>{d(o.files),o.value=""}),i.addEventListener("dragover",y=>{y.preventDefault(),i.classList.add("over")}),i.addEventListener("dragleave",()=>i.classList.remove("over")),i.addEventListener("drop",y=>{y.preventDefault(),i.classList.remove("over"),d(y.dataTransfer.files)}),a.querySelectorAll(".item").forEach(y=>{y.addEventListener("click",Q=>{const x=Q.target.closest("button");if(!x)return;const v=Number(y.getAttribute("data-i")),C=x.getAttribute("data-act");if(C==="rm"&&e.files.splice(v,1),C==="up"&&v>0){const T=e.files[v-1];e.files[v-1]=e.files[v],e.files[v]=T}if(C==="down"&&v<e.files.length-1){const T=e.files[v+1];e.files[v+1]=e.files[v],e.files[v]=T}u()})});const f=a.querySelector("#clear");f&&f.addEventListener("click",()=>{e.files=[],u()});const P=a.querySelector("#ranges");P&&P.addEventListener("input",()=>{e.ranges=P.value});const D=a.querySelector("#fit");D&&D.addEventListener("change",()=>{e.fit=D.value}),a.querySelectorAll('input[name="angle"]').forEach(y=>{y.addEventListener("change",()=>{e.angle=Number(y.value)})})}function Y(){const r=a.querySelector("#login-form");if(!r)return;const i=a.querySelector("#email"),o=a.querySelector("#password");i&&i.addEventListener("input",()=>{e.email=i.value}),o&&o.addEventListener("input",()=>{e.password=o.value}),r.addEventListener("submit",async d=>{if(d.preventDefault(),!e.busy){e.busy=!0,e.message=t("working"),e.messageKind="",u();try{await se(e.email,e.password),e.password="",e.busy=!1,await b(),p("/")}catch{s("auth"),e.busy=!1,u()}}})}function _(r){const i=a.querySelector("#run");i&&i.addEventListener("click",async()=>{if(r==="/merge"){if(e.files.length<2)return s("need-two"),u();await $("merge",e.files,{},"merged.pdf")}else if(r==="/split"){const o=e.files[0];if(!o)return s("need-one"),u();const d=N(e.ranges,9999);if(!d.ok)return s(d.error==="empty"?"bad-range":d.error),u();await $("split",[o],{ranges:e.ranges},`${q(o.name)}-extract.pdf`)}else if(r==="/rotate"){const o=e.files[0];if(!o)return s("need-one"),u();if(e.ranges.trim()){const d=N(e.ranges,9999);if(!d.ok)return s(d.error==="empty"?"bad-range":d.error),u()}await $("rotate",[o],{ranges:e.ranges,angle:e.angle},`${q(o.name)}-rotated.pdf`)}else if(r==="/delete"){const o=e.files[0];if(!o)return s("need-one"),u();const d=N(e.ranges,9999);if(!d.ok)return s(d.error==="empty"?"bad-range":d.error),u();await $("delete",[o],{ranges:e.ranges},`${q(o.name)}-deleted.pdf`)}else if(r==="/images"){if(e.files.length===0)return s("need-image"),u();await $("images",e.files,{fit:e.fit},"images.pdf")}})}let R=null;function u(){const r=de();R&&R!==r&&c(),R=r;const i={"/":U,"/merge":z,"/split":H,"/rotate":G,"/delete":W,"/images":V,"/login":J};a.innerHTML=`<div class="app">${(i[r]||U)()}</div>`,Z(),r==="/merge"?O("pdf"):r==="/images"?O("image"):r==="/login"?Y():r!=="/"&&O("one-pdf"),_(r)}return window.addEventListener("hashchange",u),u(),b(),{draw:u}}ue(document.getElementById("app"));
