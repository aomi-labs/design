#!/usr/bin/env node
// Renders a film that follows the window.__AOMI_VIDEO__ seek contract, in parallel, to JPEG frames.
//
//   node render.mjs <film.html> --out <dir> [--from 0] [--to <duration>] [--fps 30] [--workers 4]
//   node render.mjs <film.html> --out <dir> --stills 3,12.5,40      (one JPEG per timestamp)
//
// Frames are named f00000.jpg … by absolute frame index, so ranges can be re-rendered in place
// (e.g. after retiming one scene) and ffmpeg still reads one continuous sequence.
// Uses Playwright's chromium headless shell: WebGL works and the viewport is exactly 1920×1080.
// Set PW_CORE to a playwright-core directory and CHROME_PATH to a headless_shell binary to override discovery.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { createRequire } from 'node:module';
import { pathToFileURL } from 'node:url';

const args = process.argv.slice(2), input = args.find(a => !a.startsWith('--') && /\.html?$/.test(a));
const opt = k => { const i = args.indexOf(`--${k}`); return i >= 0 ? args[i + 1] : undefined; };
if (!input || !opt('out')) { console.log('usage: render.mjs <film.html> --out <dir> [--from s] [--to s] [--fps 30] [--workers 4] | --stills t1,t2'); process.exit(2); }
const out = path.resolve(opt('out')); fs.mkdirSync(out, { recursive: true });

// playwright: explicit path, then the current project, then this skill's folder
function loadChromium() {
  const tries = [process.env.PW_CORE, 'playwright-core', 'playwright'].filter(Boolean);
  for (const base of [process.cwd(), path.dirname(new URL(import.meta.url).pathname)]) {
    const req = createRequire(path.join(base, 'package.json'));
    for (const name of tries) { try { return req(name).chromium; } catch {} }
  }
  throw new Error('playwright-core not found: `npm i -D playwright-core` in the project, or set PW_CORE=/path/to/node_modules/playwright-core');
}
function headlessShell() {
  if (process.env.CHROME_PATH) return process.env.CHROME_PATH;
  const cache = path.join(os.homedir(), 'Library/Caches/ms-playwright');
  const dirs = fs.existsSync(cache) ? fs.readdirSync(cache).filter(d => d.startsWith('chromium_headless_shell-')).sort((a, b) => +b.split('-')[1] - +a.split('-')[1]) : [];
  for (const d of dirs) for (const sub of ['chrome-mac/headless_shell', 'chrome-mac-arm64/headless_shell', 'chrome-headless-shell-mac-arm64/chrome-headless-shell', 'chrome-linux/headless_shell']) {
    const p = path.join(cache, d, sub); if (fs.existsSync(p)) return p;
  }
  return undefined; // fall back to Playwright's default browser
}

const chromium = loadChromium();
const browser = await chromium.launch({ executablePath: headlessShell(), args: ['--ignore-gpu-blocklist', '--enable-gpu-rasterization', '--use-angle=metal'] });
const url = pathToFileURL(path.resolve(input)).href + '?render';
async function openPage() {
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 });
  page.on('pageerror', e => console.error('pageerror:', e.message));
  await page.goto(url);
  await page.waitForFunction('window.__AOMI_VIDEO_READY__ === true', null, { timeout: 90000 });
  return page;
}
const shoot = async (page, t, file) => {
  await page.evaluate(t => window.__AOMI_VIDEO__.seek(t), t);
  await page.locator('#stage').screenshot({ path: path.join(out, file), type: 'jpeg', quality: 94 });
};

try {
  if (opt('stills')) {
    const page = await openPage();
    for (const t of opt('stills').split(',').map(Number)) await shoot(page, t, `still-${t.toFixed(2).padStart(7, '0')}.jpg`);
  } else {
    const fps = Number(opt('fps') || 30), workers = Number(opt('workers') || Math.min(4, os.cpus().length));
    const first = await openPage(), duration = await first.evaluate(() => window.__AOMI_VIDEO__.duration);
    const f0 = Math.round(Number(opt('from') || 0) * fps), f1 = Math.round(Number(opt('to') || duration) * fps);
    const pages = [first, ...await Promise.all(Array.from({ length: workers - 1 }, openPage))];
    const per = Math.ceil((f1 - f0) / workers), started = Date.now(); let done = 0;
    await Promise.all(pages.map(async (page, w) => {
      for (let f = f0 + w * per; f < Math.min(f1, f0 + (w + 1) * per); f++) {
        await shoot(page, f / fps, `f${String(f).padStart(5, '0')}.jpg`);
        if (++done % 300 === 0) console.log(`${done}/${f1 - f0} frames · ${((Date.now() - started) / done).toFixed(0)} ms/frame`);
      }
    }));
    console.log(`rendered frames ${f0}–${f1 - 1} (${(f1 - f0) / fps}s) to ${out}`);
  }
} finally { await browser.close(); }
