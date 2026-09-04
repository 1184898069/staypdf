import { t, getLang, setLang } from './i18n.js';
import { parsePageRanges } from './lib/ranges.js';
import { downloadBytes, escapeHtml, isPdfFile, isImageFile, isDocxFile } from './lib/download.js';
import { getApiUrl, getMe, getPlan, getTurnstileSiteKey, login, logout, postJob, register, resendVerification, verifyEmail } from './lib/api.js';
import { LOCAL_TOOLS } from './lib/plan.js';

const ROUTES = ['/', '/merge', '/split', '/rotate', '/delete', '/images', '/compress', '/ocr', '/word', '/watermark', '/pages', '/pdf-images', '/protect', '/login', '/register', '/verify'];

const TOOL_META = {
  merge: { href: '/merge', title: 'merge', desc: 'mergeDesc' },
  split: { href: '/split', title: 'split', desc: 'splitDesc' },
  rotate: { href: '/rotate', title: 'rotate', desc: 'rotateDesc' },
  delete: { href: '/delete', title: 'delete', desc: 'deleteDesc' },
  images: { href: '/images', title: 'images', desc: 'imagesDesc' },
  compress: { href: '/compress', title: 'compress', desc: 'compressDesc' },
  ocr: { href: '/ocr', title: 'ocr', desc: 'ocrDesc' },
  word: { href: '/word', title: 'word', desc: 'wordDesc' },
  watermark: { href: '/watermark', title: 'watermark', desc: 'watermarkDesc' },
  pages: { href: '/pages', title: 'pageNumbers', desc: 'pageNumbersDesc' },
  'pdf-images': { href: '/pdf-images', title: 'pdfImages', desc: 'pdfImagesDesc' },
  protect: { href: '/protect', title: 'protect', desc: 'protectDesc' },
};

function routeFromHash() {
  const raw = (location.hash || '#/').replace(/^#/, '');
  const path = raw.split('?')[0] || '/';
  return ROUTES.includes(path) ? path : '/';
}

function queryFromHash() {
  const raw = (location.hash || '#/').replace(/^#/, '');
  const q = raw.includes('?') ? raw.slice(raw.indexOf('?') + 1) : '';
  return new URLSearchParams(q);
}

function passwordOk(value) {
  return value.length >= 10 && /[A-Za-z]/.test(value) && /\d/.test(value);
}

let turnstileScript = null;
function ensureTurnstile(siteKey, onToken) {
  const mount = document.getElementById('turnstile-slot');
  if (!mount || !siteKey) return;
  const render = () => {
    if (!window.turnstile) return;
    mount.innerHTML = '';
    window.turnstile.render(mount, {
      sitekey: siteKey,
      theme: 'dark',
      callback: onToken,
    });
  };
  if (window.turnstile) {
    render();
    return;
  }
  if (!turnstileScript) {
    turnstileScript = document.createElement('script');
    turnstileScript.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
    turnstileScript.async = true;
    document.head.appendChild(turnstileScript);
  }
  turnstileScript.addEventListener('load', render, { once: true });
}

function markSvg() {
  return `<svg class="mark" viewBox="0 0 28 28" aria-hidden="true">
    <rect x="3" y="3" width="22" height="22" rx="6" fill="#1d221d" stroke="#b6e07a" stroke-width="1.4"/>
    <path d="M8 18.5V9.5h5.2c2.3 0 3.7 1.2 3.7 3.1 0 1.9-1.4 3.1-3.7 3.1H10.6V18.5H8zm2.6-4.6h2.3c1.1 0 1.7-.5 1.7-1.4s-.6-1.4-1.7-1.4h-2.3v2.8z" fill="#eef3ea"/>
  </svg>`;
}

function stem(filename, fallback = 'document') {
  const base = String(filename || fallback).replace(/\.[^.]+$/, '');
  return base || fallback;
}

function mimeFor(filename) {
  const n = String(filename || '').toLowerCase();
  if (n.endsWith('.txt')) return 'text/plain;charset=utf-8';
  if (n.endsWith('.zip')) return 'application/zip';
  if (n.endsWith('.docx')) {
    return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
  }
  return 'application/pdf';
}

export function createApp(root) {
  const state = {
    files: [],
    message: '',
    messageKind: '',
    busy: false,
    paywall: false,
    angle: 90,
    fit: 'a4',
    quality: 'medium',
    ocrLang: 'eng+chi_sim',
    ranges: '',
    watermarkText: '',
    protectPassword: '',
    protectConfirm: '',
    tools: LOCAL_TOOLS,
    email: '',
    password: '',
    confirmPassword: '',
    turnstileToken: '',
    verifyOnce: false,
    session: {
      loaded: false,
      apiConfigured: Boolean(getApiUrl()),
      apiReachable: false,
      authenticated: false,
      email: '',
      isPro: false,
      remaining: null,
    },
  };

  function navigate(path) {
    if (location.hash !== `#${path}`) location.hash = path;
    else draw();
  }

  function resetToolState() {
    state.files = [];
    state.message = '';
    state.messageKind = '';
    state.busy = false;
    state.angle = 90;
    state.fit = 'a4';
    state.quality = 'medium';
    state.ocrLang = 'eng+chi_sim';
    state.ranges = '';
    state.watermarkText = '';
    state.protectPassword = '';
    state.protectConfirm = '';
  }

  function addFiles(list, kind) {
    const incoming = Array.from(list || []);
    const accepted = incoming.filter((f) => {
      if (kind === 'image') return isImageFile(f);
      if (kind === 'one-word') return isPdfFile(f) || isDocxFile(f);
      return isPdfFile(f);
    });
    if (kind === 'one-pdf' || kind === 'one-word') {
      const first = accepted[0];
      if (first) state.files = [first];
      draw();
      return;
    }
    for (const f of accepted) state.files.push(f);
    draw();
  }

  function fail(code) {
    const map = {
      encrypted: t('encrypted'),
      failed: t('failed'),
      'need-two': t('needTwo'),
      'need-one': t('needOne'),
      'need-image': t('needImage'),
      'need-keep': t('needKeep'),
      'bad-range': t('badRange'),
      'out-of-range': t('outOfRange'),
      image: t('imageFailed'),
      auth: t('authFailed'),
      register: t('registerFailed'),
      verify: t('verifyFail'),
      'try-later': t('tryLater'),
      mail: t('mailDown'),
      weak: t('weakPassword'),
      'run-local': t('runLocally'),
      'too-large': t('tooLarge'),
      'too-many': t('tooMany'),
      'ocr-engine': t('ocrEngine'),
      'need-doc': t('needDoc'),
      'need-text': t('needText'),
      'need-password': t('needPassword'),
      mismatch: t('passwordMismatch'),
    };
    state.messageKind = 'err';
    state.message = map[code] || t('failed');
  }

  function ok(text) {
    state.messageKind = 'ok';
    state.message = text;
  }

  async function refreshPlan() {
    if (!getApiUrl()) {
      state.tools = LOCAL_TOOLS;
      return;
    }
    try {
      const plan = await getPlan();
      if (plan && Array.isArray(plan.tools) && plan.tools.length) {
        state.tools = plan.tools;
      }
    } catch {
      state.tools = LOCAL_TOOLS;
    }
  }

  async function refreshSession() {
    if (!getApiUrl()) {
      state.session = {
        loaded: true,
        apiConfigured: false,
        apiReachable: false,
        authenticated: false,
        email: '',
        isPro: false,
        remaining: null,
      };
      state.tools = LOCAL_TOOLS;
      draw();
      return;
    }
    try {
      const [me] = await Promise.all([getMe(), refreshPlan()]);
      state.session = {
        loaded: true,
        apiConfigured: true,
        apiReachable: true,
        authenticated: Boolean(me.authenticated),
        email: me.email || '',
        isPro: Boolean(me.isPro),
        remaining: me.isPro ? null : me.remaining,
      };
    } catch {
      state.session = {
        loaded: true,
        apiConfigured: true,
        apiReachable: false,
        authenticated: false,
        email: '',
        isPro: false,
        remaining: null,
      };
      await refreshPlan();
    }
    draw();
  }

  function toolRequiresPro(id) {
    const row = (state.tools || LOCAL_TOOLS).find((x) => x.id === id);
    return Boolean(row && row.requiresPro);
  }

  async function runExport(kind, files, fields, filename) {
    if (state.busy) return;
    if (toolRequiresPro(kind) && state.session.loaded && !state.session.isPro) {
      state.paywall = true;
      state.messageKind = '';
      state.message = '';
      draw();
      return;
    }
    if (!getApiUrl()) {
      fail('run-local');
      draw();
      return;
    }
    state.busy = true;
    state.messageKind = '';
    state.message = t('working');
    draw();
    try {
      const bytes = await postJob(kind, files, fields);
      downloadBytes(bytes, filename, mimeFor(filename));
      ok(t('done'));
      await refreshSession();
    } catch (err) {
      if (err && err.code === 'plan') {
        state.paywall = true;
        state.messageKind = '';
        state.message = '';
      } else {
        fail((err && err.code) || 'failed');
      }
    } finally {
      state.busy = false;
      draw();
    }
  }

  function remainingLabel() {
    const s = state.session;
    if (!s.apiConfigured) return t('runLocally');
    if (!s.apiReachable) return t('apiDown');
    if (s.isPro) return t('remainingPro');
    if (typeof s.remaining === 'number') return t('remaining', s.remaining);
    return t('remainingUnknown');
  }

  function header() {
    const lang = getLang();
    const s = state.session;
    const account = s.authenticated
      ? `<span class="who">${escapeHtml(s.email)}</span><button type="button" class="btn ghost small" id="logout">${escapeHtml(t('logout'))}</button>`
      : `<a class="btn ghost small" href="#/login" data-nav="/login">${escapeHtml(t('login'))}</a>`;
    return `<header class="top">
      <a class="brand" href="#/" data-nav="/">${markSvg()}<span class="word">StayPDF</span></a>
      <div class="top-right">
        <div class="pill" id="remain">${escapeHtml(remainingLabel())}</div>
        ${account}
        <div class="lang" role="group" aria-label="language">
          <button type="button" data-lang="zh" class="${lang === 'zh' ? 'on' : ''}">${t('langZh')}</button>
          <button type="button" data-lang="en" class="${lang === 'en' ? 'on' : ''}">${t('langEn')}</button>
        </div>
      </div>
    </header>`;
  }

  function footer() {
    return `<footer class="foot"><span>${escapeHtml(t('privacyProof'))}</span><span>${escapeHtml(t('footer'))}</span></footer>`;
  }

  function paywallHtml() {
    if (!state.paywall) return '';
    return `<div class="paywall" id="paywall">
      <div class="sheet" role="dialog" aria-modal="true" aria-labelledby="pw-title">
        <h2 id="pw-title">${escapeHtml(t('paywallTitle'))}</h2>
        <p>${escapeHtml(t('paywallBody'))}</p>
        <div class="price">$6 <span>/ mo</span></div>
        <div class="row">
          <button class="btn ghost" type="button" id="pw-close">${escapeHtml(t('close'))}</button>
        </div>
      </div>
    </div>`;
  }

  function dropzone(copy, multiple, accept) {
    return `<div class="drop" id="drop">
      <input id="file" type="file" ${multiple ? 'multiple' : ''} accept="${accept}" />
      <strong>${escapeHtml(copy)}</strong>
      <span>${escapeHtml(t('privacy'))}</span>
    </div>`;
  }

  function fileList() {
    if (state.files.length === 0) return '';
    const rows = state.files
      .map((file, i) => {
        const pages = `${Math.round(file.size / 1024)} KB`;
        return `<div class="item" data-i="${i}">
          <div class="meta">
            <div class="name">${escapeHtml(file.name)}</div>
            <div class="sub">${escapeHtml(pages)}</div>
          </div>
          <div class="ops">
            <button class="btn" data-act="up" ${i === 0 ? 'disabled' : ''}>${escapeHtml(t('moveUp'))}</button>
            <button class="btn" data-act="down" ${i === state.files.length - 1 ? 'disabled' : ''}>${escapeHtml(t('moveDown'))}</button>
            <button class="btn warn" data-act="rm">${escapeHtml(t('remove'))}</button>
          </div>
        </div>`;
      })
      .join('');
    return `<div class="list">${rows}</div>
      <div class="row">
        <button class="btn ghost" id="clear" type="button">${escapeHtml(t('clear'))}</button>
      </div>`;
  }

  function status() {
    const kind = state.messageKind ? ` ${state.messageKind}` : '';
    return `<div class="status${kind}" role="status">${escapeHtml(state.message)}</div>`;
  }

  function toolCard(tool) {
    const meta = TOOL_META[tool.id];
    if (!meta) return '';
    const mark = tool.requiresPro
      ? `<span class="badge">${escapeHtml(t('proBadge'))}</span>`
      : `<span class="go">→</span>`;
    const inner = `<h2>${escapeHtml(t(meta.title))}</h2>
          <p>${escapeHtml(t(meta.desc))}</p>
          ${mark}`;
    return `<a class="card" href="#${meta.href}" data-nav="${meta.href}">${inner}</a>`;
  }

  function home() {
    const tools = (state.tools && state.tools.length) ? state.tools : LOCAL_TOOLS;
    const free = tools.filter((x) => !x.requiresPro).map(toolCard).join('');
    const pro = tools.filter((x) => x.requiresPro).map(toolCard).join('');
    return `${header()}
      <section class="hero">
        <h1>${escapeHtml(t('tagline'))}</h1>
        <div class="proof"><span class="dot"></span><div><b>${escapeHtml(t('privacy'))}</b> ${escapeHtml(t('privacyProof'))}</div></div>
      </section>
      <p class="plan-line">${escapeHtml(t('planLine'))}</p>
      <h2 class="group-title">${escapeHtml(t('freeTools'))}</h2>
      <div class="grid">${free}</div>
      <h2 class="group-title">${escapeHtml(t('proTools'))}</h2>
      <div class="grid">${pro}</div>
      ${footer()}${paywallHtml()}`;
  }

  function toolChrome(titleKey, descKey, body) {
    return `${header()}
      <a class="crumb" href="#/" data-nav="/">${escapeHtml(t('back'))}</a>
      <div class="panel">
        <h1 class="tool-title">${escapeHtml(t(titleKey))}</h1>
        <p class="lede">${escapeHtml(t(descKey))}</p>
        ${body}
        ${status()}
      </div>
      ${footer()}${paywallHtml()}`;
  }

  function mergeView() {
    return toolChrome(
      'merge',
      'mergeDesc',
      `${dropzone(t('dropPdf'), true, 'application/pdf,.pdf')}
       ${fileList()}
       <div class="row">
         <button class="btn primary" id="run" type="button" ${state.busy ? 'disabled' : ''}>${escapeHtml(t('runMerge'))}</button>
       </div>`,
    );
  }

  function splitView() {
    return toolChrome(
      'split',
      'splitDesc',
      `${dropzone(t('dropPdfOne'), false, 'application/pdf,.pdf')}
       ${fileList()}
       <label class="field">${escapeHtml(t('ranges'))}
         <input id="ranges" type="text" value="${escapeHtml(state.ranges)}" placeholder="${escapeHtml(t('rangesHint'))}" />
       </label>
       <div class="row">
         <button class="btn primary" id="run" type="button" ${state.busy ? 'disabled' : ''}>${escapeHtml(t('runSplit'))}</button>
       </div>`,
    );
  }

  function rotateView() {
    return toolChrome(
      'rotate',
      'rotateDesc',
      `${dropzone(t('dropPdfOne'), false, 'application/pdf,.pdf')}
       ${fileList()}
       <label class="field">${escapeHtml(t('ranges'))}
         <input id="ranges" type="text" value="${escapeHtml(state.ranges)}" placeholder="${escapeHtml(t('rangesAllHint'))}" />
       </label>
       <div class="field">${escapeHtml(t('angle'))}
         <div class="angles">
           <label><input type="radio" name="angle" value="90" ${state.angle === 90 ? 'checked' : ''}/> ${escapeHtml(t('cw90'))}</label>
           <label><input type="radio" name="angle" value="180" ${state.angle === 180 ? 'checked' : ''}/> ${escapeHtml(t('cw180'))}</label>
           <label><input type="radio" name="angle" value="270" ${state.angle === 270 ? 'checked' : ''}/> ${escapeHtml(t('cw270'))}</label>
         </div>
       </div>
       <div class="row">
         <button class="btn primary" id="run" type="button" ${state.busy ? 'disabled' : ''}>${escapeHtml(t('runRotate'))}</button>
       </div>`,
    );
  }

  function deleteView() {
    return toolChrome(
      'delete',
      'deleteDesc',
      `${dropzone(t('dropPdfOne'), false, 'application/pdf,.pdf')}
       ${fileList()}
       <label class="field">${escapeHtml(t('ranges'))}
         <input id="ranges" type="text" value="${escapeHtml(state.ranges)}" placeholder="${escapeHtml(t('rangesHint'))}" />
       </label>
       <div class="row">
         <button class="btn primary" id="run" type="button" ${state.busy ? 'disabled' : ''}>${escapeHtml(t('runDelete'))}</button>
       </div>`,
    );
  }

  function imagesView() {
    return toolChrome(
      'images',
      'imagesDesc',
      `${dropzone(t('dropImages'), true, 'image/jpeg,image/png,image/webp,image/gif,.jpg,.jpeg,.png,.webp')}
       ${fileList()}
       <label class="field">${escapeHtml(t('fitA4'))}
         <select id="fit">
           <option value="a4" ${state.fit === 'a4' ? 'selected' : ''}>${escapeHtml(t('fitA4'))}</option>
           <option value="original" ${state.fit === 'original' ? 'selected' : ''}>${escapeHtml(t('fitOriginal'))}</option>
         </select>
       </label>
       <div class="row">
         <button class="btn primary" id="run" type="button" ${state.busy ? 'disabled' : ''}>${escapeHtml(t('runImages'))}</button>
       </div>`,
    );
  }

  function compressView() {
    return toolChrome(
      'compress',
      'compressDesc',
      `${dropzone(t('dropPdfOne'), false, 'application/pdf,.pdf')}
       ${fileList()}
       <label class="field">${escapeHtml(t('quality'))}
         <select id="quality">
           <option value="low" ${state.quality === 'low' ? 'selected' : ''}>${escapeHtml(t('qualityLow'))}</option>
           <option value="medium" ${state.quality === 'medium' ? 'selected' : ''}>${escapeHtml(t('qualityMed'))}</option>
           <option value="high" ${state.quality === 'high' ? 'selected' : ''}>${escapeHtml(t('qualityHigh'))}</option>
         </select>
       </label>
       <div class="row">
         <button class="btn primary" id="run" type="button" ${state.busy ? 'disabled' : ''}>${escapeHtml(t('runCompress'))}</button>
       </div>`,
    );
  }

  function ocrView() {
    return toolChrome(
      'ocr',
      'ocrDesc',
      `${dropzone(t('dropPdfOne'), false, 'application/pdf,.pdf')}
       ${fileList()}
       <label class="field">${escapeHtml(t('ocrLang'))}
         <select id="ocr-lang">
           <option value="eng+chi_sim" ${state.ocrLang === 'eng+chi_sim' ? 'selected' : ''}>English + 简体中文</option>
           <option value="eng" ${state.ocrLang === 'eng' ? 'selected' : ''}>English</option>
           <option value="chi_sim" ${state.ocrLang === 'chi_sim' ? 'selected' : ''}>简体中文</option>
         </select>
       </label>
       <div class="row">
         <button class="btn primary" id="run" type="button" ${state.busy ? 'disabled' : ''}>${escapeHtml(t('runOcr'))}</button>
       </div>`,
    );
  }

  function wordView() {
    return toolChrome(
      'word',
      'wordDesc',
      `${dropzone(t('dropWord'), false, 'application/pdf,.pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,.docx')}
       ${fileList()}
       <p class="hint">${escapeHtml(t('wordHint'))}</p>
       <div class="row">
         <button class="btn primary" id="run" type="button" ${state.busy ? 'disabled' : ''}>${escapeHtml(t('runWord'))}</button>
       </div>`,
    );
  }

  function watermarkView() {
    return toolChrome(
      'watermark',
      'watermarkDesc',
      `${dropzone(t('dropPdfOne'), false, 'application/pdf,.pdf')}
       ${fileList()}
       <label class="field">${escapeHtml(t('watermarkText'))}
         <input id="watermark-text" type="text" maxlength="80" value="${escapeHtml(state.watermarkText)}" />
       </label>
       <div class="row">
         <button class="btn primary" id="run" type="button" ${state.busy ? 'disabled' : ''}>${escapeHtml(t('runWatermark'))}</button>
       </div>`,
    );
  }

  function pagesView() {
    return toolChrome(
      'pageNumbers',
      'pageNumbersDesc',
      `${dropzone(t('dropPdfOne'), false, 'application/pdf,.pdf')}
       ${fileList()}
       <div class="row">
         <button class="btn primary" id="run" type="button" ${state.busy ? 'disabled' : ''}>${escapeHtml(t('runPages'))}</button>
       </div>`,
    );
  }

  function pdfImagesView() {
    return toolChrome(
      'pdfImages',
      'pdfImagesDesc',
      `${dropzone(t('dropPdfOne'), false, 'application/pdf,.pdf')}
       ${fileList()}
       <div class="row">
         <button class="btn primary" id="run" type="button" ${state.busy ? 'disabled' : ''}>${escapeHtml(t('runPdfImages'))}</button>
       </div>`,
    );
  }


  function protectView() {
    return toolChrome(
      'protect',
      'protectDesc',
      `${dropzone(t('dropPdfOne'), false, 'application/pdf,.pdf')}
       ${fileList()}
       <label class="field">${escapeHtml(t('protectPassword'))}
         <input id="protect-password" type="password" autocomplete="new-password" maxlength="72" value="${escapeHtml(state.protectPassword)}" />
       </label>
       <label class="field">${escapeHtml(t('protectConfirm'))}
         <input id="protect-confirm" type="password" autocomplete="new-password" maxlength="72" value="${escapeHtml(state.protectConfirm)}" />
       </label>
       <p class="hint">${escapeHtml(t('protectHint'))}</p>
       <div class="row">
         <button class="btn primary" id="run" type="button" ${state.busy ? 'disabled' : ''}>${escapeHtml(t('runProtect'))}</button>
       </div>`,
    );
  }

  function loginView() {
    return `${header()}
      <a class="crumb" href="#/" data-nav="/">${escapeHtml(t('back'))}</a>
      <div class="panel">
        <h1 class="tool-title">${escapeHtml(t('loginTitle'))}</h1>
        <p class="lede">${escapeHtml(t('loginBody'))}</p>
        <form id="login-form" class="login-form">
          <label class="field">${escapeHtml(t('email'))}
            <input id="email" type="email" autocomplete="username" value="${escapeHtml(state.email)}" required />
          </label>
          <label class="field">${escapeHtml(t('password'))}
            <input id="password" type="password" autocomplete="current-password" value="${escapeHtml(state.password)}" required />
          </label>
          <div class="row">
            <button class="btn primary" type="submit" ${state.busy ? 'disabled' : ''}>${escapeHtml(t('loginSubmit'))}</button>
          </div>
        </form>
        <p class="auth-switch"><a href="#/register" data-nav="/register">${escapeHtml(t('needAccount'))}</a></p>
        ${status()}
      </div>
      ${footer()}`;
  }

  function registerView() {
    const siteKey = getTurnstileSiteKey();
    const widget = siteKey ? '<div id="turnstile-slot" class="turnstile"></div>' : '';
    return `${header()}
      <a class="crumb" href="#/" data-nav="/">${escapeHtml(t('back'))}</a>
      <div class="panel">
        <h1 class="tool-title">${escapeHtml(t('registerTitle'))}</h1>
        <p class="lede">${escapeHtml(t('registerBody'))}</p>
        <form id="register-form" class="login-form">
          <div class="sr" aria-hidden="true">
            <label>Company
              <input id="company" type="text" name="company" tabindex="-1" autocomplete="off" />
            </label>
          </div>
          <label class="field">${escapeHtml(t('email'))}
            <input id="email" type="email" autocomplete="username" value="${escapeHtml(state.email)}" required />
          </label>
          <label class="field">${escapeHtml(t('password'))}
            <input id="password" type="password" autocomplete="new-password" value="${escapeHtml(state.password)}" required />
          </label>
          <label class="field">${escapeHtml(t('confirmPassword'))}
            <input id="confirm" type="password" autocomplete="new-password" value="${escapeHtml(state.confirmPassword)}" required />
          </label>
          <p class="hint">${escapeHtml(t('passwordHint'))}</p>
          ${widget}
          <div class="row">
            <button class="btn primary" type="submit" ${state.busy ? 'disabled' : ''}>${escapeHtml(t('registerSubmit'))}</button>
          </div>
        </form>
        <p class="auth-switch"><a href="#/login" data-nav="/login">${escapeHtml(t('haveAccount'))}</a></p>
        ${status()}
      </div>
      ${footer()}`;
  }

  function verifyView() {
    return `${header()}
      <a class="crumb" href="#/" data-nav="/">${escapeHtml(t('back'))}</a>
      <div class="panel">
        <h1 class="tool-title">${escapeHtml(t('verifyTitle'))}</h1>
        <p class="lede">${escapeHtml(state.messageKind === 'ok' ? t('verifyOk') : state.messageKind === 'err' ? t('verifyFail') : t('verifyWorking'))}</p>
        ${state.messageKind === 'ok' ? `<p class="auth-switch"><a href="#/login" data-nav="/login">${escapeHtml(t('login'))}</a></p>` : ''}
        ${state.messageKind === 'err' ? `<p class="hint">${escapeHtml(t('resendHint'))}</p>
        <form id="resend-form" class="login-form">
          <label class="field">${escapeHtml(t('email'))}
            <input id="email" type="email" autocomplete="username" value="${escapeHtml(state.email)}" required />
          </label>
          <div class="row">
            <button class="btn primary" type="submit" ${state.busy ? 'disabled' : ''}>${escapeHtml(t('resend'))}</button>
          </div>
        </form>` : ''}
        ${status()}
      </div>
      ${footer()}`;
  }

  function bindCommon() {
    root.querySelectorAll('[data-lang]').forEach((btn) => {
      btn.addEventListener('click', () => {
        setLang(btn.getAttribute('data-lang'));
        draw();
      });
    });
    root.querySelectorAll('[data-nav]').forEach((el) => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        const path = el.getAttribute('data-nav');
        resetToolState();
        navigate(path);
      });
    });
    const close = root.querySelector('#pw-close');
    if (close) close.addEventListener('click', () => { state.paywall = false; draw(); });
    const out = root.querySelector('#logout');
    if (out) {
      out.addEventListener('click', async () => {
        try { await logout(); } catch { /* ignore */ }
        await refreshSession();
      });
    }
  }

  function bindDrop(kind) {
    const drop = root.querySelector('#drop');
    const input = root.querySelector('#file');
    if (!drop || !input) return;
    const take = (files) => addFiles(files, kind);
    input.addEventListener('change', () => {
      take(input.files);
      input.value = '';
    });
    drop.addEventListener('dragover', (e) => {
      e.preventDefault();
      drop.classList.add('over');
    });
    drop.addEventListener('dragleave', () => drop.classList.remove('over'));
    drop.addEventListener('drop', (e) => {
      e.preventDefault();
      drop.classList.remove('over');
      take(e.dataTransfer.files);
    });
    root.querySelectorAll('.item').forEach((row) => {
      row.addEventListener('click', (e) => {
        const btn = e.target.closest('button');
        if (!btn) return;
        const i = Number(row.getAttribute('data-i'));
        const act = btn.getAttribute('data-act');
        if (act === 'rm') state.files.splice(i, 1);
        if (act === 'up' && i > 0) {
          const tmp = state.files[i - 1];
          state.files[i - 1] = state.files[i];
          state.files[i] = tmp;
        }
        if (act === 'down' && i < state.files.length - 1) {
          const tmp = state.files[i + 1];
          state.files[i + 1] = state.files[i];
          state.files[i] = tmp;
        }
        draw();
      });
    });
    const clear = root.querySelector('#clear');
    if (clear) clear.addEventListener('click', () => { state.files = []; draw(); });
    const ranges = root.querySelector('#ranges');
    if (ranges) ranges.addEventListener('input', () => { state.ranges = ranges.value; });
    const fit = root.querySelector('#fit');
    if (fit) fit.addEventListener('change', () => { state.fit = fit.value; });
    const quality = root.querySelector('#quality');
    if (quality) quality.addEventListener('change', () => { state.quality = quality.value; });
    const ocrLang = root.querySelector('#ocr-lang');
    if (ocrLang) ocrLang.addEventListener('change', () => { state.ocrLang = ocrLang.value; });
    const watermarkText = root.querySelector('#watermark-text');
    if (watermarkText) watermarkText.addEventListener('input', () => { state.watermarkText = watermarkText.value; });
    const protectPassword = root.querySelector('#protect-password');
    if (protectPassword) protectPassword.addEventListener('input', () => { state.protectPassword = protectPassword.value; });
    const protectConfirm = root.querySelector('#protect-confirm');
    if (protectConfirm) protectConfirm.addEventListener('input', () => { state.protectConfirm = protectConfirm.value; });
    root.querySelectorAll('input[name="angle"]').forEach((el) => {
      el.addEventListener('change', () => { state.angle = Number(el.value); });
    });
  }

  function bindLogin() {
    const form = root.querySelector('#login-form');
    if (!form) return;
    const email = root.querySelector('#email');
    const password = root.querySelector('#password');
    if (email) email.addEventListener('input', () => { state.email = email.value; });
    if (password) password.addEventListener('input', () => { state.password = password.value; });
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (state.busy) return;
      state.busy = true;
      state.message = t('working');
      state.messageKind = '';
      draw();
      try {
        await login(state.email, state.password);
        state.password = '';
        state.busy = false;
        await refreshSession();
        navigate('/');
      } catch {
        fail('auth');
        state.busy = false;
        draw();
      }
    });
  }

  function bindRegister() {
    const form = root.querySelector('#register-form');
    if (!form) return;
    const email = root.querySelector('#email');
    const password = root.querySelector('#password');
    const confirm = root.querySelector('#confirm');
    if (email) email.addEventListener('input', () => { state.email = email.value; });
    if (password) password.addEventListener('input', () => { state.password = password.value; });
    if (confirm) confirm.addEventListener('input', () => { state.confirmPassword = confirm.value; });
    const siteKey = getTurnstileSiteKey();
    if (siteKey) {
      ensureTurnstile(siteKey, (token) => { state.turnstileToken = token; });
    }
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (state.busy) return;
      if (!passwordOk(state.password)) {
        fail('weak');
        draw();
        return;
      }
      if (state.password !== state.confirmPassword) {
        fail('mismatch');
        draw();
        return;
      }
      const company = (root.querySelector('#company') || {}).value || '';
      state.busy = true;
      state.message = t('working');
      state.messageKind = '';
      draw();
      try {
        await register(state.email, state.password, {
          company,
          turnstile: state.turnstileToken,
        });
        state.password = '';
        state.confirmPassword = '';
        state.turnstileToken = '';
        state.busy = false;
        ok(t('checkEmail'));
        draw();
      } catch (err) {
        fail((err && err.code) || 'register');
        state.busy = false;
        draw();
      }
    });
  }

  function bindVerify() {
    const form = root.querySelector('#resend-form');
    if (form) {
      const email = root.querySelector('#email');
      if (email) email.addEventListener('input', () => { state.email = email.value; });
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (state.busy) return;
        state.busy = true;
        state.message = t('working');
        state.messageKind = '';
        draw();
        try {
          await resendVerification(state.email);
          state.busy = false;
          ok(t('checkEmail'));
          draw();
        } catch (err) {
          fail((err && err.code) || 'register');
          state.busy = false;
          draw();
        }
      });
    }
    if (state.verifyOnce) return;
    state.verifyOnce = true;
    const token = queryFromHash().get('token') || '';
    if (!token) {
      fail('verify');
      draw();
      return;
    }
    state.busy = true;
    state.message = t('verifyWorking');
    state.messageKind = '';
    (async () => {
      try {
        await verifyEmail(token);
        state.busy = false;
        ok(t('verifyOk'));
        draw();
      } catch {
        fail('verify');
        state.busy = false;
        draw();
      }
    })();
  }

  function bindRun(route) {
    const run = root.querySelector('#run');
    if (!run) return;
    run.addEventListener('click', async () => {
      if (route === '/merge') {
        if (state.files.length < 2) return fail('need-two'), draw();
        await runExport('merge', state.files, {}, 'merged.pdf');
      } else if (route === '/split') {
        const file = state.files[0];
        if (!file) return fail('need-one'), draw();
        const parsed = parsePageRanges(state.ranges, 9999);
        if (!parsed.ok) return fail(parsed.error === 'empty' ? 'bad-range' : parsed.error), draw();
        await runExport('split', [file], { ranges: state.ranges }, `${stem(file.name)}-extract.pdf`);
      } else if (route === '/rotate') {
        const file = state.files[0];
        if (!file) return fail('need-one'), draw();
        if (state.ranges.trim()) {
          const parsed = parsePageRanges(state.ranges, 9999);
          if (!parsed.ok) return fail(parsed.error === 'empty' ? 'bad-range' : parsed.error), draw();
        }
        await runExport('rotate', [file], { ranges: state.ranges, angle: state.angle }, `${stem(file.name)}-rotated.pdf`);
      } else if (route === '/delete') {
        const file = state.files[0];
        if (!file) return fail('need-one'), draw();
        const parsed = parsePageRanges(state.ranges, 9999);
        if (!parsed.ok) return fail(parsed.error === 'empty' ? 'bad-range' : parsed.error), draw();
        await runExport('delete', [file], { ranges: state.ranges }, `${stem(file.name)}-deleted.pdf`);
      } else if (route === '/images') {
        if (state.files.length === 0) return fail('need-image'), draw();
        await runExport('images', state.files, { fit: state.fit }, 'images.pdf');
      } else if (route === '/compress') {
        const file = state.files[0];
        if (!file) return fail('need-one'), draw();
        await runExport('compress', [file], { quality: state.quality }, `${stem(file.name)}-compressed.pdf`);
      } else if (route === '/ocr') {
        const file = state.files[0];
        if (!file) return fail('need-one'), draw();
        await runExport('ocr', [file], { lang: state.ocrLang }, `${stem(file.name)}-ocr.txt`);
      } else if (route === '/word') {
        const file = state.files[0];
        if (!file) return fail('need-doc'), draw();
        const outName = isDocxFile(file)
          ? `${stem(file.name)}-converted.pdf`
          : `${stem(file.name)}-converted.docx`;
        await runExport('word', [file], {}, outName);
      } else if (route === '/watermark') {
        const file = state.files[0];
        if (!file) return fail('need-one'), draw();
        const text = (state.watermarkText || '').trim();
        if (!text) return fail('need-text'), draw();
        await runExport('watermark', [file], { text }, `${stem(file.name)}-watermark.pdf`);
      } else if (route === '/pages') {
        const file = state.files[0];
        if (!file) return fail('need-one'), draw();
        await runExport('pages', [file], {}, `${stem(file.name)}-pages.pdf`);
      } else if (route === '/pdf-images') {
        const file = state.files[0];
        if (!file) return fail('need-one'), draw();
        await runExport('pdf-images', [file], {}, `${stem(file.name)}-pages.zip`);
      } else if (route === '/protect') {
        const file = state.files[0];
        if (!file) return fail('need-one'), draw();
        const password = state.protectPassword || '';
        if (password.length < 4 || password.length > 72) return fail('need-password'), draw();
        if (password !== (state.protectConfirm || '')) return fail('mismatch'), draw();
        await runExport('protect', [file], { password }, `${stem(file.name)}-protected.pdf`);
        state.protectPassword = '';
        state.protectConfirm = '';
      }
    });
  }

  let lastRoute = null;

  function draw() {
    const route = routeFromHash();
    if (lastRoute && lastRoute !== route) {
      resetToolState();
      state.verifyOnce = false;
      state.turnstileToken = '';
    }
    lastRoute = route;
    const views = {
      '/': home,
      '/merge': mergeView,
      '/split': splitView,
      '/rotate': rotateView,
      '/delete': deleteView,
      '/images': imagesView,
      '/compress': compressView,
      '/ocr': ocrView,
      '/word': wordView,
      '/watermark': watermarkView,
      '/pages': pagesView,
      '/pdf-images': pdfImagesView,
      '/protect': protectView,
      '/login': loginView,
      '/register': registerView,
      '/verify': verifyView,
    };
    root.innerHTML = `<div class="app">${(views[route] || home)()}</div>`;
    bindCommon();
    if (route === '/merge') bindDrop('pdf');
    else if (route === '/images') bindDrop('image');
    else if (route === '/word') bindDrop('one-word');
    else if (route === '/login') bindLogin();
    else if (route === '/register') bindRegister();
    else if (route === '/verify') bindVerify();
    else if (route !== '/') bindDrop('one-pdf');
    bindRun(route);
  }

  window.addEventListener('hashchange', draw);
  draw();
  refreshSession();
  return { draw };
}
