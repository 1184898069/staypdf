export const STORAGE_KEYS = {
  LANG: 'staypdf-lang',
  PRO: 'staypdf-pro',
  EXPORTS: 'staypdf-exports',
};

export const FREE_DAILY_LIMIT = 3;

/** Local calendar day YYYY-MM-DD (not UTC). */
export function localDateKey(date) {
  if (!(date instanceof Date) || Number.isNaN(date.getTime())) {
    throw new TypeError('date must be a valid Date');
  }
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function readExports(storage, today) {
  try {
    const raw = storage.getItem(STORAGE_KEYS.EXPORTS);
    if (!raw) return { date: today, count: 0 };
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return { date: today, count: 0 };
    const date = typeof parsed.date === 'string' ? parsed.date : today;
    const count = Number.isInteger(parsed.count) ? parsed.count : 0;
    if (date !== today) return { date: today, count: 0 };
    return { date, count: Math.max(0, count) };
  } catch {
    return { date: today, count: 0 };
  }
}

/**
 * Daily export limiter. `storage` is localStorage-like.
 * `clock` returns a Date so tests can freeze or roll the calendar day.
 */
export function createLimiter(storage, clock = () => new Date()) {
  if (!storage || typeof storage.getItem !== 'function' || typeof storage.setItem !== 'function') {
    throw new TypeError('storage must implement getItem/setItem');
  }

  function snapshot() {
    const today = localDateKey(clock());
    const isPro = storage.getItem(STORAGE_KEYS.PRO) === '1';
    const { count, date } = readExports(storage, today);
    return { isPro, count, date };
  }

  return {
    isPro() {
      return snapshot().isPro;
    },
    unlockDemoPro() {
      storage.setItem(STORAGE_KEYS.PRO, '1');
    },
    lockPro() {
      if (typeof storage.removeItem === 'function') storage.removeItem(STORAGE_KEYS.PRO);
      else storage.setItem(STORAGE_KEYS.PRO, '');
    },
    getUsed() {
      return snapshot().count;
    },
    getRemaining() {
      const s = snapshot();
      if (s.isPro) return Infinity;
      return Math.max(0, FREE_DAILY_LIMIT - s.count);
    },
    canExport() {
      const s = snapshot();
      return s.isPro || s.count < FREE_DAILY_LIMIT;
    },
    recordExport() {
      const s = snapshot();
      if (s.isPro) return { ok: true, remaining: Infinity, used: s.count };
      if (s.count >= FREE_DAILY_LIMIT) {
        return { ok: false, remaining: 0, used: s.count };
      }
      const used = s.count + 1;
      storage.setItem(
        STORAGE_KEYS.EXPORTS,
        JSON.stringify({ date: s.date, count: used }),
      );
      return { ok: true, remaining: FREE_DAILY_LIMIT - used, used };
    },
  };
}

export function memoryStorage(initial = {}) {
  const map = new Map(Object.entries(initial));
  return {
    getItem(key) {
      return map.has(key) ? map.get(key) : null;
    },
    setItem(key, value) {
      map.set(key, String(value));
    },
    removeItem(key) {
      map.delete(key);
    },
  };
}
