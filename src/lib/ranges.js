/** Parse 1-based page ranges like "1-3,5,8-10" (also accepts ， and en/em dashes). */

export function parsePageRanges(input, pageCount) {
  if (typeof input !== 'string') {
    return { ok: false, pages: [], error: 'empty' };
  }
  const trimmed = input.trim();
  if (!trimmed) {
    return { ok: false, pages: [], error: 'empty' };
  }
  if (!Number.isInteger(pageCount) || pageCount < 1) {
    return { ok: false, pages: [], error: 'bad-count' };
  }

  const parts = trimmed.split(/[,，]/).map((s) => s.trim()).filter(Boolean);
  if (parts.length === 0) {
    return { ok: false, pages: [], error: 'empty' };
  }

  const pages = [];
  const seen = new Set();

  for (const part of parts) {
    const range = part.match(/^(\d+)\s*[-–—~～]\s*(\d+)$/);
    const single = part.match(/^(\d+)$/);
    if (range) {
      let a = Number(range[1]);
      let b = Number(range[2]);
      if (!Number.isInteger(a) || !Number.isInteger(b)) {
        return { ok: false, pages: [], error: 'invalid' };
      }
      if (a > b) {
        const tmp = a;
        a = b;
        b = tmp;
      }
      if (a < 1 || b > pageCount) {
        return { ok: false, pages: [], error: 'out-of-range' };
      }
      for (let n = a; n <= b; n += 1) {
        if (!seen.has(n)) {
          seen.add(n);
          pages.push(n);
        }
      }
    } else if (single) {
      const n = Number(single[1]);
      if (!Number.isInteger(n) || n < 1 || n > pageCount) {
        return { ok: false, pages: [], error: 'out-of-range' };
      }
      if (!seen.has(n)) {
        seen.add(n);
        pages.push(n);
      }
    } else {
      return { ok: false, pages: [], error: 'invalid' };
    }
  }

  if (pages.length === 0) {
    return { ok: false, pages: [], error: 'empty' };
  }
  return { ok: true, pages, error: null };
}

export function allPageNumbers(pageCount) {
  if (!Number.isInteger(pageCount) || pageCount < 1) return [];
  return Array.from({ length: pageCount }, (_, i) => i + 1);
}

export function invertPages(pageCount, remove) {
  const drop = new Set(remove);
  const keep = [];
  for (let n = 1; n <= pageCount; n += 1) {
    if (!drop.has(n)) keep.push(n);
  }
  return keep;
}
