import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  FREE_DAILY_LIMIT,
  STORAGE_KEYS,
  createLimiter,
  localDateKey,
  memoryStorage,
} from '../src/lib/limit.js';

describe('localDateKey', () => {
  it('formats a local calendar day', () => {
    const d = new Date(2026, 7, 31, 23, 59, 0); // Aug 31, 2026 local
    assert.equal(localDateKey(d), '2026-08-31');
  });

  it('pads month and day', () => {
    const d = new Date(2026, 0, 5, 8, 0, 0);
    assert.equal(localDateKey(d), '2026-01-05');
  });

  it('rejects invalid dates', () => {
    assert.throws(() => localDateKey(new Date('nope')), TypeError);
  });
});

describe('createLimiter', () => {
  it('allows three free exports then blocks the fourth', () => {
    const clock = () => new Date(2026, 7, 31, 10, 0, 0);
    const limiter = createLimiter(memoryStorage(), clock);

    assert.equal(limiter.canExport(), true);
    assert.equal(limiter.getRemaining(), FREE_DAILY_LIMIT);

    const a = limiter.recordExport();
    const b = limiter.recordExport();
    const c = limiter.recordExport();
    assert.equal(a.ok && b.ok && c.ok, true);
    assert.equal(c.remaining, 0);
    assert.equal(limiter.getUsed(), 3);
    assert.equal(limiter.canExport(), false);

    const blocked = limiter.recordExport();
    assert.equal(blocked.ok, false);
    assert.equal(limiter.getUsed(), 3);
  });

  it('resets on a new local calendar day', () => {
    const store = memoryStorage();
    let now = new Date(2026, 7, 31, 23, 0, 0);
    const limiter = createLimiter(store, () => now);

    limiter.recordExport();
    limiter.recordExport();
    limiter.recordExport();
    assert.equal(limiter.canExport(), false);

    now = new Date(2026, 8, 1, 0, 1, 0); // Sep 1 local
    assert.equal(limiter.canExport(), true);
    assert.equal(limiter.getRemaining(), FREE_DAILY_LIMIT);
    assert.equal(limiter.getUsed(), 0);

    const again = limiter.recordExport();
    assert.equal(again.ok, true);
    assert.equal(again.used, 1);
  });

  it('treats demo Pro as unlimited and does not increment the daily count', () => {
    const limiter = createLimiter(memoryStorage(), () => new Date(2026, 7, 31));
    limiter.unlockDemoPro();
    assert.equal(limiter.isPro(), true);
    assert.equal(limiter.getRemaining(), Infinity);

    for (let i = 0; i < 10; i += 1) {
      const r = limiter.recordExport();
      assert.equal(r.ok, true);
      assert.equal(r.remaining, Infinity);
    }
    assert.equal(limiter.getUsed(), 0);
  });

  it('unlocks Pro after the free cap is hit', () => {
    const limiter = createLimiter(memoryStorage(), () => new Date(2026, 7, 31));
    limiter.recordExport();
    limiter.recordExport();
    limiter.recordExport();
    assert.equal(limiter.canExport(), false);
    limiter.unlockDemoPro();
    assert.equal(limiter.canExport(), true);
    assert.equal(limiter.recordExport().ok, true);
  });

  it('reads a persisted same-day count', () => {
    const store = memoryStorage({
      [STORAGE_KEYS.EXPORTS]: JSON.stringify({ date: '2026-08-31', count: 2 }),
    });
    const limiter = createLimiter(store, () => new Date(2026, 7, 31, 18, 0, 0));
    assert.equal(limiter.getUsed(), 2);
    assert.equal(limiter.getRemaining(), 1);
    assert.equal(limiter.recordExport().ok, true);
    assert.equal(limiter.canExport(), false);
  });
});
