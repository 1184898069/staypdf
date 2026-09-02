import { cp, mkdir, rm, writeFile, readdir, readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join } from 'node:path';

if (!existsSync('dist')) {
  throw new Error('dist/ missing — run vite build first');
}

const keep = [];
if (existsSync('docs')) {
  const names = await readdir('docs');
  for (const name of names) {
    if (name.endsWith('.md')) {
      keep.push({ name, bytes: await readFile(join('docs', name)) });
    }
  }
  await rm('docs', { recursive: true, force: true });
}
await mkdir('docs', { recursive: true });
await cp('dist', 'docs', { recursive: true });
for (const file of keep) {
  await writeFile(join('docs', file.name), file.bytes);
}
await writeFile('docs/.nojekyll', '');
console.log('copied dist/ → docs/ for GitHub Pages');
