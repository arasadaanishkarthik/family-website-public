import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const docsDir = path.join(rootDir, 'docs');

function copyRecursiveSync(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();
  if (isDirectory) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    fs.readdirSync(src).forEach((childItemName) => {
      copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}

// 1. Ensure 404.html and .nojekyll in dist
const distHtml = path.join(distDir, 'index.html');
const dist404 = path.join(distDir, '404.html');
const distNoJekyll = path.join(distDir, '.nojekyll');

if (fs.existsSync(distHtml)) {
  fs.copyFileSync(distHtml, dist404);
}
fs.writeFileSync(distNoJekyll, '');

// 2. Sync to docs directory for GitHub Pages compatibility
if (!fs.existsSync(docsDir)) {
  fs.mkdirSync(docsDir, { recursive: true });
}
copyRecursiveSync(distDir, docsDir);
fs.writeFileSync(path.join(docsDir, '.nojekyll'), '');

console.log('✓ Postbuild sync complete: dist and docs are ready for GitHub Pages.');
