#!/usr/bin/env node
// Plays <production-dir>/walkthrough.mjs in a browser and records it with a visible cursor.
// Recording uses the Chrome DevTools screencast: a JPEG for every repaint, with its timestamp. Static
// stretches therefore cost nothing, and compose.mjs can cut them away later.
//
//   node record.mjs <production-dir> [--headed]
//
// Writes <dir>/rec/{record.json, frames/*.jpg}. If a step fails it saves rec/error-step-N.png and
// says which action, so the selector or wait can be fixed and the recording re-run.
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { loadChromium, browserPath, authPath, expandHome } from './browser.mjs';

const args = process.argv.slice(2), dir = path.resolve(args.find(a => !a.startsWith('--')) || '.'), headed = args.includes('--headed');
const { META = {}, STEPS } = await import(pathToFileURL(path.join(dir, 'walkthrough.mjs')).href);
const out = path.join(dir, 'rec');
fs.rmSync(out, { recursive: true, force: true }); fs.mkdirSync(path.join(out, 'frames'), { recursive: true });

const VW = META.viewport?.width || 1600, VH = META.viewport?.height || 900, DSF = META.scale || 1.5;
const firstUrl = STEPS.flatMap(s => s.do).find(a => a[0] === 'goto')?.[1];
const state = expandHome(META.storageState) || (firstUrl && authPath(new URL(firstUrl).host));

// a drawn cursor + click ripple, because headless browsers don't paint one
const CURSOR = `(() => { if (window.top !== window) return;
  const mk = () => { if (document.getElementById('__ea_c') || !document.documentElement) return;
    const c = document.createElement('div'); c.id = '__ea_c';
    c.innerHTML = '<svg width="30" height="30" viewBox="0 0 28 28"><path d="M5 3 L5 22 L10 17 L13.5 25 L17 23.5 L13.5 15.5 L20.5 15.5 Z" fill="#09090b" stroke="#fff" stroke-width="1.6" stroke-linejoin="round"/></svg>';
    Object.assign(c.style, { position: 'fixed', left: '0', top: '0', zIndex: 2147483647, pointerEvents: 'none', willChange: 'transform', filter: 'drop-shadow(0 1px 2px rgba(0,0,0,.25))' });
    const p = window.__eaPos || [-100, -100]; c.style.transform = 'translate(' + (p[0] - 5) + 'px,' + (p[1] - 3) + 'px)';
    const r = document.createElement('div'); r.id = '__ea_r';
    Object.assign(r.style, { position: 'fixed', left: '-22px', top: '-22px', width: '44px', height: '44px', borderRadius: '50%', border: '3px solid #5288c2', zIndex: 2147483646, pointerEvents: 'none', opacity: '0' });
    document.documentElement.append(c, r);
    const st = document.createElement('style'); st.textContent = '::-webkit-scrollbar{display:none}'; document.documentElement.append(st); };
  window.__eaMove = (x, y, ms) => { window.__eaPos = [x, y]; mk(); const c = document.getElementById('__ea_c'); if (!c) return;
    c.style.transition = 'transform ' + ms + 'ms cubic-bezier(.65,0,.35,1)'; c.style.transform = 'translate(' + (x - 5) + 'px,' + (y - 3) + 'px)'; };
  window.__eaClick = () => { mk(); const r = document.getElementById('__ea_r'), [x, y] = window.__eaPos || [0, 0]; if (!r) return;
    r.animate([{ transform: 'translate(' + x + 'px,' + y + 'px) scale(.3)', opacity: .95 }, { transform: 'translate(' + x + 'px,' + y + 'px) scale(1.5)', opacity: 0 }], { duration: 560, easing: 'ease-out' }); };
  document.addEventListener('DOMContentLoaded', mk); mk(); })();`;

const browser = await loadChromium().launch({ headless: !headed, executablePath: browserPath(headed ? 'headed' : 'headless') });
const context = await browser.newContext({ viewport: { width: VW, height: VH }, deviceScaleFactor: DSF, colorScheme: META.colorScheme || 'light',
  storageState: state && fs.existsSync(state) ? state : undefined });
await context.addInitScript(CURSOR);
const page = await context.newPage();
const cdp = await context.newCDPSession(page);
const frames = []; let n = 0;
cdp.on('Page.screencastFrame', async ({ data, metadata, sessionId }) => {
  const f = `frames/${String(n++).padStart(6, '0')}.jpg`;
  fs.writeFileSync(path.join(out, f), Buffer.from(data, 'base64')); frames.push({ f, t: metadata.timestamp });
  try { await cdp.send('Page.screencastFrameAck', { sessionId }); } catch {}
});
const cast = () => cdp.send('Page.startScreencast', { format: 'jpeg', quality: 88, maxWidth: Math.round(VW * DSF), maxHeight: Math.round(VH * DSF), everyNthFrame: 1 });
await cast();

const now = () => Date.now() / 1000, wait = s => page.waitForTimeout(s * 1000);
let cur = [VW / 2, VH * .6];
const moveTo = async (x, y, ms = 700) => { await page.evaluate(([x, y, ms]) => window.__eaMove?.(x, y, ms), [x, y, ms]); await wait(ms / 1000 + .08); cur = [x, y]; };
const find = async sel => { const loc = page.locator(sel).first(); await loc.waitFor({ state: 'visible', timeout: 20000 }); await loc.scrollIntoViewIfNeeded(); await wait(.25); return { loc, b: await loc.boundingBox() }; };
const steps = [];
for (const st of STEPS) {
  const rec = { id: st.id, title: st.title, t0: now(), focus: [], url: '' };
  try {
    for (const [op, ...a] of st.do) {
      if (op === 'goto') { await page.goto(a[0], { waitUntil: 'load', timeout: 60000 }); await wait(.8); await cast(); await page.evaluate(([x, y]) => window.__eaMove?.(x, y, 0), cur); rec.tReady ??= now(); }
      else if (op === 'click' || op === 'hover' || op === 'type' || op === 'focus') {
        const { loc, b } = await find(a[0]);
        rec.focus.push({ t: now(), x: b.x, y: b.y, w: b.width, h: b.height });
        if (op !== 'focus' || a[1]?.cursor) await moveTo(b.x + b.width / 2, b.y + b.height / 2);
        if (op === 'click' || op === 'type') { await page.evaluate(() => window.__eaClick?.()); await loc.click(); await wait(.35); }
        if (op === 'type') { await loc.pressSequentially(a[1], { delay: a[2]?.delay ?? 45 }); await wait(.3); }
      }
      else if (op === 'press') { await page.keyboard.press(a[0]); await wait(.4); }
      else if (op === 'scroll') { for (let k = 0; k < 12; k++) { await page.mouse.wheel(0, a[0] / 12); await wait(.035); } await wait(.5); }
      else if (op === 'wait') await wait(a[0]);
      else if (op === 'waitFor') await page.locator(a[0]).first().waitFor({ state: 'visible', timeout: (a[1] ?? 60) * 1000 });
      else throw new Error(`unknown action "${op}"`);
    }
    await wait(st.hold ?? .8);
  } catch (e) {
    await page.screenshot({ path: path.join(out, `error-step-${st.id}.png`) }).catch(() => {});
    console.error(`step ${st.id} (${st.title}) failed: ${e.message.split('\n')[0]}\nscreenshot: rec/error-step-${st.id}.png`);
    await browser.close(); process.exit(1);
  }
  rec.t1 = now(); rec.url = page.url(); steps.push(rec);
  console.log(`step ${st.id} recorded · ${(rec.t1 - rec.t0).toFixed(1)}s`);
}
await cdp.send('Page.stopScreencast').catch(() => {}); await wait(.3); await browser.close();

const base = Math.min(frames[0]?.t ?? steps[0].t0, steps[0].t0), r3 = v => +(v - base).toFixed(3);
fs.writeFileSync(path.join(out, 'record.json'), JSON.stringify({
  viewport: { w: VW, h: VH, scale: DSF },
  steps: steps.map(s => ({ ...s, t0: r3(s.t0), t1: r3(s.t1), ...(s.tReady ? { tReady: r3(s.tReady) } : {}), focus: s.focus.map(f => ({ ...f, t: r3(f.t) })) })),
  frames: frames.map(f => ({ f: f.f, t: r3(f.t) })),
}));
console.log(`recorded ${steps.length} steps · ${frames.length} frames → rec/`);
