import { t, getLang, setLang } from './i18n.js';
import { parsePageRanges, allPageNumbers } from './lib/ranges.js';
import { downloadBytes, escapeHtml, isPdfFile, isImageFile } from './lib/download.js';
import {
  getPageCount,
  mergePdfs,
  splitPdf,
  rotatePdf,
  deletePages,
  imagesToPdf,
  errorCode,
  stem,
} from './pdf/ops.js';

const ROUTES = ['/', '/merge', '/split', '/rotate', '/delete', '/images'];

function routeFromHash() {
  const raw = (location.hash || '#/').replace(/^#/, '');
  const path = raw.split('?')[0] || '/';
  return ROUTES.includes(path) ? path : '/';
}

function markSvg() {
  return `<svg class="mark" viewBox="0 0 28 28" aria-hidden="true">
    <rect x="3" y="3" width="22" height="22" rx="6" fill="#1d221d" stroke="#b6e07a" stroke-width="1.4"/>
    <path d="M8 18.5V9.5h5.2c2.3 0 3.7 1.2 3.7 3.1 0 1.9-1.4 3.1-3.7 3.1H10.6V18.5H8zm2.6-4.6h2.3c1.1 0 1.7-.5 1.7-1.4s-.6-1.4-1.7-1.4h-2.3v2.8z" fill="#eef3ea"/>
  </svg>`;
}

export function createApp(root, limiter) {
  const state = {
    files: [],
    counts: new Map(),
    message: '',
    messageKind: '',
    busy: false,
    paywall: false,
    angle: 90,
    fit: 'a4',
    ranges: '',
  };

  function navigate(path) {
    if (location.hash !== `#${path}`) location.hash = path;
    else draw();
  }

  function resetToolState() {
    state.files = [];
    state.counts = new Map();
    state.message = '';
    state.messageKind = '';
    state.busy = false;
    state.angle = 90;
    state.fit = 'a4';
    state.ranges = '';
  }

  async function countPdf(file) {
    try {
      const n = await getPageCount(file);
      state.counts.set(file, n);
    } catch (err) {
      state.counts.set(file, null);
      const code = errorCode(err);
      fail(code);
    }
    draw();
  }

  function addFiles(list, kind) {
    const incoming = Array.from(list || []);
    const accepted = incoming.filter((f) => (kind === 'image' ? isImageFile(f) : isPdfFile(f)));
    if (kind === 'one-pdf') {
      const first = accepted[0];
      if (first) {
        state.files = [first];
        state.counts = new Map();
        countPdf(first);
      }
      return;
    }
    for (const f of accepted) {
      state.files.push(f);
      if (kind === 'pdf') countPdf(f);
    }
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
    };
    state.messageKind = 'err';
    state.message = map[code] || t('failed');
  }

  function ok(text) {
    state.messageKind = 'ok';
    state.message = text;
  }

  async function runExport(work, filename) {
    if (state.busy) return;
    if (!limiter.canExport()) {
      state.paywall = true;
      draw();
      return;
    }
    state.busy = true;
    state.messageKind = '';
    state.message = t('working');
    draw();
    try {
      const bytes = await work();
      const recorded = limiter.recordExport();
      if (!recorded.ok) {
        state.paywall = true;
        state.busy = false;
        draw();
        return;
      }
      downloadBytes(bytes, filename);
      ok(t('done'));
    } catch (err) {
      fail(errorCode(err));
    } finally {
      state.busy = false;
      draw();
    }
  }

  function header() {
    const remaining = limiter.getRemaining();
    const lang = getLang();
    return `<header class="top">
      <a class="brand" href="#/" data-nav="/">${markSvg()}<span class="word">StayPDF</span></a>
      <div class="top-right">
        <div class="pill" id="remain">${escapeHtml(t('remaining', remaining))}</div>
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
          <button class="btn primary" type="button" id="unlock">${escapeHtml(t('unlockDemo'))}</button>
          <button class="btn ghost" type="button" id="pw-close">${escapeHtml(t('close'))}</button>
        </div>
        <p class="note">${escapeHtml(t('paywallNote'))}</p>
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

  function fileList(showPages) {
    if (state.files.length === 0) return '';
    const rows = state.files
      .map((file, i) => {
        const n = state.counts.get(file);
        const pages =
          showPages && n
            ? `${n} ${n === 1 ? t('page') : t('pages')}`
            : showPages && n === null
              ? '—'
              : `${Math.round(file.size / 1024)} KB`;
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

  function home() {
    const tools = [
      ['/merge', 'merge', 'mergeDesc', false],
      ['/split', 'split', 'splitDesc', false],
      ['/rotate', 'rotate', 'rotateDesc', false],
      ['/delete', 'delete', 'deleteDesc', false],
      ['/images', 'images', 'imagesDesc', false],
      [null, 'compress', 'proComing', true],
      [null, 'ocr', 'proComing', true],
      [null, 'word', 'proComing', true],
    ];
    const cards = tools
      .map(([href, title, desc, soon]) => {
        const inner = `<h2>${escapeHtml(t(title))}</h2>
          <p>${escapeHtml(t(desc))}</p>
          ${soon ? `<span class="badge">${escapeHtml(t('proComing'))}</span>` : `<span class="go">→</span>`}`;
        if (soon) return `<div class="card soon">${inner}</div>`;
        return `<a class="card" href="#${href}" data-nav="${href}">${inner}</a>`;
      })
      .join('');
    return `${header()}
      <section class="hero">
        <h1>${escapeHtml(t('tagline'))}</h1>
        <div class="proof"><span class="dot"></span><div><b>${escapeHtml(t('privacy'))}</b> ${escapeHtml(t('privacyProof'))}</div></div>
      </section>
      <div class="grid">${cards}</div>
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
       ${fileList(true)}
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
       ${fileList(true)}
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
       ${fileList(true)}
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
       ${fileList(true)}
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
       ${fileList(false)}
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
    const unlock = root.querySelector('#unlock');
    if (unlock) {
      unlock.addEventListener('click', () => {
        limiter.unlockDemoPro();
        state.paywall = false;
        ok(t('remaining', limiter.getRemaining()));
        draw();
      });
    }
    const close = root.querySelector('#pw-close');
    if (close) close.addEventListener('click', () => { state.paywall = false; draw(); });
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
    root.querySelectorAll('input[name="angle"]').forEach((el) => {
      el.addEventListener('change', () => { state.angle = Number(el.value); });
    });
  }

  function pagesFor(file, required) {
    const count = state.counts.get(file);
    if (!count) return { ok: false, error: 'need-one' };
    if (!required && !state.ranges.trim()) {
      return { ok: true, pages: allPageNumbers(count) };
    }
    const parsed = parsePageRanges(state.ranges, count);
    if (!parsed.ok) return parsed;
    return parsed;
  }

  function bindRun(route) {
    const run = root.querySelector('#run');
    if (!run) return;
    run.addEventListener('click', async () => {
      if (route === '/merge') {
        if (state.files.length < 2) return fail('need-two'), draw();
        await runExport(() => mergePdfs(state.files), 'merged.pdf');
      } else if (route === '/split') {
        const file = state.files[0];
        if (!file) return fail('need-one'), draw();
        const parsed = pagesFor(file, true);
        if (!parsed.ok) return fail(parsed.error === 'empty' ? 'bad-range' : parsed.error), draw();
        await runExport(() => splitPdf(file, parsed.pages), `${stem(file.name)}-extract.pdf`);
      } else if (route === '/rotate') {
        const file = state.files[0];
        if (!file) return fail('need-one'), draw();
        const parsed = pagesFor(file, false);
        if (!parsed.ok) return fail(parsed.error === 'empty' ? 'bad-range' : parsed.error), draw();
        await runExport(() => rotatePdf(file, parsed.pages, state.angle), `${stem(file.name)}-rotated.pdf`);
      } else if (route === '/delete') {
        const file = state.files[0];
        if (!file) return fail('need-one'), draw();
        const parsed = pagesFor(file, true);
        if (!parsed.ok) return fail(parsed.error === 'empty' ? 'bad-range' : parsed.error), draw();
        await runExport(() => deletePages(file, parsed.pages), `${stem(file.name)}-deleted.pdf`);
      } else if (route === '/images') {
        if (state.files.length === 0) return fail('need-image'), draw();
        await runExport(() => imagesToPdf(state.files, state.fit), 'images.pdf');
      }
    });
  }

  let lastRoute = null;

  function draw() {
    const route = routeFromHash();
    if (lastRoute && lastRoute !== route) resetToolState();
    lastRoute = route;
    const views = {
      '/': home,
      '/merge': mergeView,
      '/split': splitView,
      '/rotate': rotateView,
      '/delete': deleteView,
      '/images': imagesView,
    };
    root.innerHTML = `<div class="app">${(views[route] || home)()}</div>`;
    bindCommon();
    if (route === '/merge') bindDrop('pdf');
    else if (route === '/images') bindDrop('image');
    else if (route !== '/') bindDrop('one-pdf');
    bindRun(route);
  }

  window.addEventListener('hashchange', draw);
  draw();
  return { draw };
}
