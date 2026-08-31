import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

describe('gated tools use the API', () => {
  it('does not ship a client quota module', () => {
    assert.equal(existsSync(join(root, 'src/lib/limit.js')), false);
  });

  it('does not ship a client PDF pipeline', () => {
    assert.equal(existsSync(join(root, 'src/pdf/ops.js')), false);
  });

  it('posts jobs to the API and has no demo unlock', () => {
    const api = readFileSync(join(root, 'src/lib/api.js'), 'utf8');
    const app = readFileSync(join(root, 'src/app.js'), 'utf8');
    assert.match(api, /\/api\/jobs\//);
    assert.match(app, /['"]\/compress['"]/);
    assert.match(app, /['"]\/ocr['"]/);
    assert.match(app, /['"]\/word['"]/);
    assert.doesNotMatch(app, /unlockDemoPro/);
    assert.doesNotMatch(api, /unlockDemoPro/);
    assert.doesNotMatch(app, /pdf-lib/);
    assert.doesNotMatch(api, /pdf-lib/);
    assert.match(app, /#\/register/);
    assert.match(app, /['"]\/verify['"]/);
    assert.match(api, /\/api\/auth\/register/);
    assert.match(api, /\/api\/auth\/verify/);
  });
});
