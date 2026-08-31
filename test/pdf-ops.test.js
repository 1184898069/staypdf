import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { PDFDocument, degrees } from 'pdf-lib';
import { mergePdfs, splitPdf, rotatePdf, deletePages, getPageCount } from '../src/pdf/ops.js';

function asFile(bytes, name = 'doc.pdf') {
  const copy = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
  return {
    name,
    type: 'application/pdf',
    size: copy.byteLength,
    async arrayBuffer() {
      return copy.slice().buffer;
    },
  };
}

async function makePdf(pageCount, label) {
  const doc = await PDFDocument.create();
  for (let i = 0; i < pageCount; i += 1) {
    const page = doc.addPage([200, 300]);
    page.drawText(`${label}-${i + 1}`, { x: 24, y: 150, size: 12 });
  }
  return asFile(await doc.save(), `${label}.pdf`);
}

describe('pdf-lib operations on real PDFs', () => {
  it('counts pages', async () => {
    const file = await makePdf(4, 'c');
    assert.equal(await getPageCount(file), 4);
  });

  it('merges two PDFs', async () => {
    const a = await makePdf(2, 'a');
    const b = await makePdf(3, 'b');
    const bytes = await mergePdfs([a, b]);
    const out = await PDFDocument.load(bytes);
    assert.equal(out.getPageCount(), 5);
  });

  it('extracts a page range', async () => {
    const file = await makePdf(6, 's');
    const bytes = await splitPdf(file, [2, 3, 6]);
    const out = await PDFDocument.load(bytes);
    assert.equal(out.getPageCount(), 3);
  });

  it('rotates selected pages', async () => {
    const file = await makePdf(3, 'r');
    const bytes = await rotatePdf(file, [2], 90);
    const out = await PDFDocument.load(bytes);
    const angles = out.getPages().map((p) => p.getRotation().angle);
    assert.deepEqual(angles, [0, 90, 0]);
  });

  it('deletes pages and keeps the rest', async () => {
    const file = await makePdf(4, 'd');
    const bytes = await deletePages(file, [2, 4]);
    const out = await PDFDocument.load(bytes);
    assert.equal(out.getPageCount(), 2);
  });

  it('refuses to delete every page', async () => {
    const file = await makePdf(2, 'z');
    await assert.rejects(() => deletePages(file, [1, 2]), (err) => err.code === 'need-keep');
  });
});
