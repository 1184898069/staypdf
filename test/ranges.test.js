import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { parsePageRanges, allPageNumbers, invertPages } from '../src/lib/ranges.js';

describe('parsePageRanges', () => {
  it('parses a simple range', () => {
    const r = parsePageRanges('1-3', 10);
    assert.equal(r.ok, true);
    assert.deepEqual(r.pages, [1, 2, 3]);
  });

  it('parses comma-separated pages', () => {
    const r = parsePageRanges('1,3,5', 10);
    assert.equal(r.ok, true);
    assert.deepEqual(r.pages, [1, 3, 5]);
  });

  it('parses mixed ranges and singles with spaces', () => {
    const r = parsePageRanges('1-3, 8-10', 12);
    assert.equal(r.ok, true);
    assert.deepEqual(r.pages, [1, 2, 3, 8, 9, 10]);
  });

  it('parses a single page', () => {
    const r = parsePageRanges('5', 10);
    assert.equal(r.ok, true);
    assert.deepEqual(r.pages, [5]);
  });

  it('accepts Chinese commas and en-dashes', () => {
    const r = parsePageRanges('1–2，5', 10);
    assert.equal(r.ok, true);
    assert.deepEqual(r.pages, [1, 2, 5]);
  });

  it('swaps reversed ranges', () => {
    const r = parsePageRanges('3-1', 10);
    assert.equal(r.ok, true);
    assert.deepEqual(r.pages, [1, 2, 3]);
  });

  it('dedupes while preserving first-seen order', () => {
    const r = parsePageRanges('5,1-3,2', 10);
    assert.equal(r.ok, true);
    assert.deepEqual(r.pages, [5, 1, 2, 3]);
  });

  it('rejects empty input', () => {
    assert.equal(parsePageRanges('', 10).ok, false);
    assert.equal(parsePageRanges('   ', 10).error, 'empty');
    assert.equal(parsePageRanges(null, 10).error, 'empty');
  });

  it('rejects out-of-range pages', () => {
    assert.equal(parsePageRanges('0-2', 10).error, 'out-of-range');
    assert.equal(parsePageRanges('1-100', 5).error, 'out-of-range');
    assert.equal(parsePageRanges('11', 10).error, 'out-of-range');
  });

  it('rejects invalid tokens', () => {
    assert.equal(parsePageRanges('1-3-5', 10).error, 'invalid');
    assert.equal(parsePageRanges('foo', 10).error, 'invalid');
    assert.equal(parsePageRanges('1,a,3', 10).error, 'invalid');
  });

  it('rejects a bad page count', () => {
    assert.equal(parsePageRanges('1', 0).error, 'bad-count');
    assert.equal(parsePageRanges('1', 1.5).error, 'bad-count');
  });
});

describe('allPageNumbers / invertPages', () => {
  it('lists every page', () => {
    assert.deepEqual(allPageNumbers(4), [1, 2, 3, 4]);
    assert.deepEqual(allPageNumbers(0), []);
  });

  it('inverts a deletion set', () => {
    assert.deepEqual(invertPages(5, [2, 4]), [1, 3, 5]);
    assert.deepEqual(invertPages(3, [1, 2, 3]), []);
  });
});
