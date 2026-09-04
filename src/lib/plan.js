// Display catalog only. The API 402 response is the real gate.
export const LOCAL_TOOLS = [
  { id: 'merge', requiresPro: false },
  { id: 'split', requiresPro: false },
  { id: 'rotate', requiresPro: false },
  { id: 'delete', requiresPro: false },
  { id: 'images', requiresPro: false },
  { id: 'compress', requiresPro: true },
  { id: 'ocr', requiresPro: true },
  { id: 'word', requiresPro: true },
  { id: 'watermark', requiresPro: true },
  { id: 'pages', requiresPro: true },
  { id: 'pdf-images', requiresPro: true },
  { id: 'protect', requiresPro: true },
  { id: 'unlock', requiresPro: true },
];

export const LOCAL_PLANS = {
  free: { dailyExports: 3, maxFileBytes: 15 * 1024 * 1024, maxFiles: 10 },
  pro: { dailyExports: null, maxFileBytes: 40 * 1024 * 1024, maxFiles: 20 },
};
