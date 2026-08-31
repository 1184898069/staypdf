import { STORAGE_KEYS } from './lib/limit.js';

const STRINGS = {
  en: {
    brand: 'StayPDF',
    tagline: 'PDF tools that never leave your browser.',
    privacy: 'Processed in this tab, never uploaded.',
    privacyProof: 'Your file is read with the File API, transformed by pdf-lib in this tab, then saved with a local download. No server, no account, no upload.',
    langZh: '中文',
    langEn: 'EN',
    remaining: (n) => (n === Infinity ? 'Pro · unlimited' : `${n} free export${n === 1 ? '' : 's'} left today`),
    tools: 'Tools',
    home: 'All tools',
    merge: 'Merge PDFs',
    mergeDesc: 'Combine two or more PDFs into one file. Drag to reorder.',
    split: 'Split PDF',
    splitDesc: 'Extract page ranges into a new PDF.',
    rotate: 'Rotate pages',
    rotateDesc: 'Turn selected pages 90°, 180°, or 270° clockwise.',
    delete: 'Delete pages',
    deleteDesc: 'Remove pages and download the rest.',
    images: 'Images → PDF',
    imagesDesc: 'Turn JPG, PNG, or WebP images into a single PDF.',
    compress: 'Compress PDF',
    ocr: 'OCR / scan to text',
    word: 'PDF ↔ Word',
    proComing: 'Pro coming',
    dropPdf: 'Drop PDFs here, or click to choose',
    dropPdfOne: 'Drop a PDF here, or click to choose',
    dropImages: 'Drop images here, or click to choose',
    addMore: 'Add more',
    clear: 'Clear',
    files: 'Files',
    pages: 'pages',
    page: 'page',
    moveUp: 'Up',
    moveDown: 'Down',
    remove: 'Remove',
    ranges: 'Pages',
    rangesHint: 'Example: 1-3, 5, 8-10',
    rangesAllHint: 'Leave blank for all pages, or e.g. 1-3, 5',
    angle: 'Rotation',
    cw90: '90° clockwise',
    cw180: '180°',
    cw270: '270° clockwise',
    fitA4: 'Fit to A4',
    fitOriginal: 'Original aspect, max A4',
    runMerge: 'Merge & download',
    runSplit: 'Extract & download',
    runRotate: 'Rotate & download',
    runDelete: 'Delete & download',
    runImages: 'Create PDF & download',
    needTwo: 'Add at least two PDFs.',
    needOne: 'Add a PDF first.',
    needImage: 'Add at least one image.',
    needKeep: 'You must keep at least one page.',
    badRange: 'Check the page list. Use numbers and ranges like 1-3, 5.',
    outOfRange: 'A page number is outside this file.',
    encrypted: 'This PDF is encrypted. StayPDF cannot open password-protected files yet.',
    failed: 'Could not process this file. Try another PDF.',
    imageFailed: 'Could not read an image. Use JPG, PNG, or WebP.',
    working: 'Working in this tab…',
    done: 'Downloaded. Nothing was uploaded.',
    paywallTitle: 'Free daily limit reached',
    paywallBody:
      'The free plan allows 3 successful exports per local calendar day. StayPDF Pro is $6/month for unlimited in-browser processing.',
    paywallNote:
      'Payments are not connected yet (Creem coming). Unlock demo Pro stores a flag in localStorage only — we will not charge you.',
    unlockDemo: 'Unlock demo Pro',
    close: 'Not now',
    footer: 'MIT · Built to stay on your machine.',
    back: '← Tools',
  },
  zh: {
    brand: 'StayPDF',
    tagline: 'PDF 处理不离开你的电脑。',
    privacy: '在当前标签页处理，文件不会上传。',
    privacyProof: '文件通过浏览器 File API 读取，由 pdf-lib 在本页转换，再本地下载保存。没有服务器、没有账号、不会上传。',
    langZh: '中文',
    langEn: 'EN',
    remaining: (n) => (n === Infinity ? 'Pro · 不限次数' : `今日剩余 ${n} 次免费导出`),
    tools: '工具',
    home: '全部工具',
    merge: '合并 PDF',
    mergeDesc: '将两份及以上 PDF 合成一份。可调整顺序。',
    split: '拆分 PDF',
    splitDesc: '按页码范围提取页面，生成新的 PDF。',
    rotate: '旋转页面',
    rotateDesc: '将指定页面顺时针旋转 90°、180° 或 270°。',
    delete: '删除页面',
    deleteDesc: '去掉不想要的页，下载剩余内容。',
    images: '图片转 PDF',
    imagesDesc: '把 JPG、PNG、WebP 图片合成一份 PDF。',
    compress: '压缩 PDF',
    ocr: 'OCR 识别文字',
    word: 'PDF ↔ Word',
    proComing: 'Pro 即将推出',
    dropPdf: '把 PDF 拖到这里，或点击选择',
    dropPdfOne: '把一份 PDF 拖到这里，或点击选择',
    dropImages: '把图片拖到这里，或点击选择',
    addMore: '继续添加',
    clear: '清空',
    files: '文件',
    pages: '页',
    page: '页',
    moveUp: '上移',
    moveDown: '下移',
    remove: '移除',
    ranges: '页码',
    rangesHint: '例如：1-3, 5, 8-10',
    rangesAllHint: '留空表示全部页面，或如 1-3, 5',
    angle: '旋转角度',
    cw90: '顺时针 90°',
    cw180: '180°',
    cw270: '顺时针 270°',
    fitA4: '适应 A4',
    fitOriginal: '原比例，最大 A4',
    runMerge: '合并并下载',
    runSplit: '提取并下载',
    runRotate: '旋转并下载',
    runDelete: '删除并下载',
    runImages: '生成 PDF 并下载',
    needTwo: '请至少添加两份 PDF。',
    needOne: '请先添加一份 PDF。',
    needImage: '请至少添加一张图片。',
    needKeep: '至少需要保留一页。',
    badRange: '请检查页码。使用数字和范围，例如 1-3, 5。',
    outOfRange: '页码超出了这份文件的页数。',
    encrypted: '这份 PDF 已加密。StayPDF 暂不支持带密码的文件。',
    failed: '无法处理该文件，请换一份 PDF 试试。',
    imageFailed: '无法读取图片。请使用 JPG、PNG 或 WebP。',
    working: '正在此标签页处理…',
    done: '已下载。全程未上传。',
    paywallTitle: '今日免费次数已用完',
    paywallBody: '免费版每个本地日历日可成功导出 3 次。StayPDF Pro 为 $6/月，不限次数，仍在浏览器内处理。',
    paywallNote: '支付尚未接入（即将使用 Creem）。「解锁演示 Pro」只在 localStorage 写入标记，不会产生任何扣费。',
    unlockDemo: '解锁演示 Pro',
    close: '稍后再说',
    footer: 'MIT · 文件留在你的电脑上。',
    back: '← 全部工具',
  },
};

function detectLang() {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.LANG);
    if (saved === 'zh' || saved === 'en') return saved;
  } catch {
    /* ignore */
  }
  const nav = typeof navigator !== 'undefined' ? navigator.language || '' : '';
  return /^zh\b/i.test(nav) ? 'zh' : 'en';
}

let lang = detectLang();

export function getLang() {
  return lang;
}

export function setLang(next) {
  lang = next === 'zh' ? 'zh' : 'en';
  try {
    localStorage.setItem(STORAGE_KEYS.LANG, lang);
  } catch {
    /* ignore */
  }
  if (typeof document !== 'undefined') {
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
  }
}

export function t(key, ...args) {
  const table = STRINGS[lang] || STRINGS.en;
  const value = table[key] ?? STRINGS.en[key] ?? key;
  return typeof value === 'function' ? value(...args) : value;
}

setLang(lang);
