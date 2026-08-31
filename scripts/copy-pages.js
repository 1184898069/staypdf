import { cp, mkdir, rm, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';

if (!existsSync('dist')) {
  throw new Error('dist/ missing — run vite build first');
}
if (existsSync('docs')) {
  await rm('docs', { recursive: true, force: true });
}
await mkdir('docs', { recursive: true });
await cp('dist', 'docs', { recursive: true });
await writeFile('docs/.nojekyll', '');
console.log('copied dist/ → docs/ for GitHub Pages');
