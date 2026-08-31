const LANG_KEY = 'staypdf-lang';

const STRINGS = {
  en: {
    brand: 'StayPDF',
    tagline: 'PDF tools. Processed in memory, not stored.',
    privacy: 'Processed in server memory, then discarded.',
    privacyProof:
      'Files are sent to the StayPDF API, transformed in memory, and the result is downloaded. Bytes are not written to disk and are not stored.',
    langZh: '中文',
    langEn: 'EN',
    remaining: (n) => `${n} free export${n === 1 ? '' : 's'} left today`,
    remainingPro: 'Pro',
    remainingUnknown: 'Sign in for unlimited exports',
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
    working: 'Working…',
    done: 'Downloaded. The upload was processed in memory and discarded.',
    paywallTitle: 'Upgrade to continue',
    paywallBody: 'StayPDF Pro is $6/month for unlimited exports. Payments are not connected yet.',
    close: 'Not now',
    footer: 'MIT · Files are not kept after the response is sent.',
    back: '← Tools',
    login: 'Log in',
    logout: 'Log out',
    email: 'Email',
    password: 'Password',
    loginSubmit: 'Log in',
    loginTitle: 'Log in',
    loginBody: 'Use the account from your local .env to test Pro exports.',
    authFailed: 'Could not sign in. Check the email and password.',
    runLocally: 'Run locally to process files.',
    apiDown: 'Cannot reach the StayPDF API. Start it locally to process files.',
    tooLarge: 'Each file must be 15 MB or smaller.',
    tooMany: 'Up to 10 files per request.',
  },
  zh: {
    brand: 'StayPDF',
    tagline: 'PDF 工具。在内存中处理，不落盘保存。',
    privacy: '在服务器内存中处理，随后丢弃。',
    privacyProof:
      '文件发送到 StayPDF API，在内存中转换，再下载结果。不会写入磁盘，也不会存储。',
    langZh: '中文',
    langEn: 'EN',
    remaining: (n) => `今日剩余 ${n} 次免费导出`,
    remainingPro: 'Pro',
    remainingUnknown: '登录后可不限次导出',
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
    working: '处理中…',
    done: '已下载。上传内容在内存中处理并已丢弃。',
    paywallTitle: '升级后继续',
    paywallBody: 'StayPDF Pro 为 $6/月，不限次数。支付尚未接入。',
    close: '稍后再说',
    footer: 'MIT · 响应发送后不保留文件。',
    back: '← 全部工具',
    login: '登录',
    logout: '退出',
    email: '邮箱',
    password: '密码',
    loginSubmit: '登录',
    loginTitle: '登录',
    loginBody: '使用本地 .env 中的账号测试 Pro 导出。',
    authFailed: '无法登录，请检查邮箱和密码。',
    runLocally: '请在本地运行后再处理文件。',
    apiDown: '无法连接 StayPDF API。请先在本地启动后再处理文件。',
    tooLarge: '每个文件不能超过 15 MB。',
    tooMany: '每次最多 10 个文件。',
  },
};

function detectLang() {
  try {
    const saved = localStorage.getItem(LANG_KEY);
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
    localStorage.setItem(LANG_KEY, lang);
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
