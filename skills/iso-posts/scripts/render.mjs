#!/usr/bin/env node
// Renders each post of an iso-posts page to a 1920×1080 PNG and checks its layout.
//
//   node render.mjs <posts.html> <outdir> name1 name2 …      → <outdir>/post-1-name1.png, post-2-name2.png, …
//
// One name per post, in POSTS order (?n=1, 2, …). After each render it reports layout problems:
//   · the headline wraps to a second line or runs off the canvas
//   · a tag or receipt overlaps the headline, subline, footer, another tag, or the canvas edge
// Set PW_CORE to a playwright-core directory if it isn't found in the project or next to this script.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { createRequire } from 'node:module';
import { pathToFileURL } from 'node:url';

const [page, out, ...names] = process.argv.slice(2);
if (!page || !out || !names.length) { console.log('usage: render.mjs <posts.html> <outdir> name1 name2 …'); process.exit(2); }
fs.mkdirSync(out, { recursive: true });

function loadChromium() {
  for (const base of [process.cwd(), path.dirname(new URL(import.meta.url).pathname)]) {
    const req = createRequire(path.join(base, 'package.json'));
    for (const name of [process.env.PW_CORE, 'playwright-core', 'playwright'].filter(Boolean)) { try { return req(name).chromium; } catch {} }
  }
  throw new Error('playwright-core not found: `npm i -D playwright-core`, or set PW_CORE=/path/to/node_modules/playwright-core');
}
function headlessShell() { // Playwright's headless shell renders WebGL at the exact viewport size
  const cache = path.join(os.homedir(), 'Library/Caches/ms-playwright');
  const dirs = fs.existsSync(cache) ? fs.readdirSync(cache).filter(d => d.startsWith('chromium_headless_shell-')).sort((a, b) => +b.split('-')[1] - +a.split('-')[1]) : [];
  for (const d of dirs) for (const sub of ['chrome-mac/headless_shell', 'chrome-mac-arm64/headless_shell', 'chrome-headless-shell-mac-arm64/chrome-headless-shell', 'chrome-linux/headless_shell']) {
    const p = path.join(cache, d, sub); if (fs.existsSync(p)) return p;
  }
  return undefined;
}

const browser = await loadChromium().launch({ executablePath: headlessShell(), args: ['--ignore-gpu-blocklist', '--use-angle=metal'] });
let problems = 0;
try {
  for (const [i, name] of names.entries()) {
    const p = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
    p.on('pageerror', e => { console.error(`post ${i + 1}: pageerror: ${e.message}`); problems++; });
    await p.goto(pathToFileURL(path.resolve(page)).href + `?n=${i + 1}`);
    await p.waitForFunction('window.__READY__ === true', null, { timeout: 90000 });
    const file = path.join(out, `post-${i + 1}-${name}.png`);
    await p.locator('#stage').screenshot({ path: file });
    const issues = await p.evaluate(() => {
      const box = e => e.getBoundingClientRect(), hit = (a, b) => a.left < b.right && b.left < a.right && a.top < b.bottom && b.top < a.bottom;
      const out = [], h1 = document.querySelector('h1'), hb = box(h1);
      const lineH = parseFloat(getComputedStyle(h1).lineHeight) || parseFloat(getComputedStyle(h1).fontSize);
      if (hb.height > lineH * 1.4) out.push('headline wraps to more than one line');
      if (hb.right > 1920 - 40 || h1.scrollWidth > h1.clientWidth + 2) out.push('headline runs past the right edge');
      const fixed = [['headline', h1], ['subline', document.querySelector('.sub')], ['footer', document.querySelector('.foot')]].filter(([, e]) => e && e.textContent.trim());
      const floats = [...document.querySelectorAll('.tag, .receipt')];
      floats.forEach((f, k) => {
        const b = box(f), label = f.textContent.trim().replace(/\s+/g, ' ').slice(0, 28);
        if (b.left < 0 || b.top < 0 || b.right > 1920 || b.bottom > 1080) out.push(`"${label}" is cut off by the canvas edge`);
        fixed.forEach(([n, e]) => { if (hit(b, box(e))) out.push(`"${label}" overlaps the ${n}`); });
        floats.slice(k + 1).forEach(g => { if (hit(b, box(g))) out.push(`"${label}" overlaps "${g.textContent.trim().replace(/\s+/g, ' ').slice(0, 28)}"`); });
      });
      return out;
    });
    console.log(`${path.basename(file)}${issues.length ? '' : '  ✓ layout ok'}`);
    issues.forEach(m => console.log(`  ✗ ${m}`)); problems += issues.length;
    await p.close();
  }
} finally { await browser.close(); }
if (problems) { console.log(`${problems} layout problem(s): fix them before sharing`); process.exitCode = 1; }
