import { PDFDocument, degrees } from 'pdf-lib';
import { invertPages } from '../lib/ranges.js';

const A4 = [595.28, 841.89];
const MARGIN = 36;

async function loadPdf(file) {
  const bytes = await file.arrayBuffer();
  try {
    return await PDFDocument.load(bytes, { ignoreEncryption: false });
  } catch (err) {
    const msg = String(err && err.message ? err.message : err);
    if (/encrypt|password/i.test(msg)) {
      const e = new Error('encrypted');
      e.code = 'encrypted';
      throw e;
    }
    const e = new Error('failed');
    e.code = 'failed';
    throw e;
  }
}

export async function getPageCount(file) {
  const doc = await loadPdf(file);
  return doc.getPageCount();
}

export async function mergePdfs(files) {
  if (!files || files.length < 2) {
    const e = new Error('need-two');
    e.code = 'need-two';
    throw e;
  }
  const out = await PDFDocument.create();
  for (const file of files) {
    const src = await loadPdf(file);
    const copied = await out.copyPages(src, src.getPageIndices());
    copied.forEach((page) => out.addPage(page));
  }
  return out.save();
}

export async function splitPdf(file, pages1) {
  if (!pages1 || pages1.length === 0) {
    const e = new Error('bad-range');
    e.code = 'bad-range';
    throw e;
  }
  const src = await loadPdf(file);
  const count = src.getPageCount();
  for (const n of pages1) {
    if (n < 1 || n > count) {
      const e = new Error('out-of-range');
      e.code = 'out-of-range';
      throw e;
    }
  }
  const out = await PDFDocument.create();
  const copied = await out.copyPages(src, pages1.map((n) => n - 1));
  copied.forEach((page) => out.addPage(page));
  return out.save();
}

export async function rotatePdf(file, pages1, angle) {
  const src = await loadPdf(file);
  const all = src.getPages();
  const turn = ((angle % 360) + 360) % 360;
  for (const n of pages1) {
    if (n < 1 || n > all.length) {
      const e = new Error('out-of-range');
      e.code = 'out-of-range';
      throw e;
    }
    const page = all[n - 1];
    const current = page.getRotation().angle || 0;
    page.setRotation(degrees((current + turn) % 360));
  }
  return src.save();
}

export async function deletePages(file, remove1) {
  const src = await loadPdf(file);
  const count = src.getPageCount();
  const keep = invertPages(count, remove1);
  if (keep.length === 0) {
    const e = new Error('need-keep');
    e.code = 'need-keep';
    throw e;
  }
  const out = await PDFDocument.create();
  const copied = await out.copyPages(src, keep.map((n) => n - 1));
  copied.forEach((page) => out.addPage(page));
  return out.save();
}

async function embedImage(out, file) {
  const type = (file.type || '').toLowerCase();
  const name = (file.name || '').toLowerCase();
  const bytes = new Uint8Array(await file.arrayBuffer());

  if (type === 'image/jpeg' || type === 'image/jpg' || name.endsWith('.jpg') || name.endsWith('.jpeg')) {
    return out.embedJpg(bytes);
  }
  if (type === 'image/png' || name.endsWith('.png')) {
    return out.embedPng(bytes);
  }

  // WebP / GIF / BMP / unknown: rasterize through canvas to PNG.
  const png = await rasterToPng(file);
  return out.embedPng(png);
}

function rasterToPng(file) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth || img.width;
        canvas.height = img.naturalHeight || img.height;
        if (!canvas.width || !canvas.height) {
          URL.revokeObjectURL(url);
          reject(new Error('image'));
          return;
        }
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        canvas.toBlob(
          async (blob) => {
            URL.revokeObjectURL(url);
            if (!blob) {
              reject(new Error('image'));
              return;
            }
            resolve(new Uint8Array(await blob.arrayBuffer()));
          },
          'image/png',
        );
      } catch (err) {
        URL.revokeObjectURL(url);
        reject(err);
      }
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('image'));
    };
    img.src = url;
  });
}

function fitContain(imgW, imgH, boxW, boxH) {
  const scale = Math.min(boxW / imgW, boxH / imgH);
  const width = imgW * scale;
  const height = imgH * scale;
  return {
    width,
    height,
    x: (boxW - width) / 2,
    y: (boxH - height) / 2,
  };
}

export async function imagesToPdf(files, mode = 'a4') {
  if (!files || files.length === 0) {
    const e = new Error('need-image');
    e.code = 'need-image';
    throw e;
  }
  const out = await PDFDocument.create();
  for (const file of files) {
    let img;
    try {
      img = await embedImage(out, file);
    } catch {
      const e = new Error('image');
      e.code = 'image';
      throw e;
    }
    const iw = img.width;
    const ih = img.height;
    if (mode === 'original') {
      const maxW = A4[0] - MARGIN * 2;
      const maxH = A4[1] - MARGIN * 2;
      const scale = Math.min(1, maxW / iw, maxH / ih);
      const width = iw * scale;
      const height = ih * scale;
      const page = out.addPage([width + MARGIN * 2, height + MARGIN * 2]);
      page.drawImage(img, { x: MARGIN, y: MARGIN, width, height });
    } else {
      const page = out.addPage(A4);
      const boxW = A4[0] - MARGIN * 2;
      const boxH = A4[1] - MARGIN * 2;
      const placed = fitContain(iw, ih, boxW, boxH);
      page.drawImage(img, {
        x: MARGIN + placed.x,
        y: MARGIN + placed.y,
        width: placed.width,
        height: placed.height,
      });
    }
  }
  return out.save();
}

export function errorCode(err) {
  return (err && err.code) || 'failed';
}

export function stem(filename, fallback = 'document') {
  const base = String(filename || fallback).replace(/\.[^.]+$/, '');
  return base || fallback;
}
