// Shared browser discovery for login.mjs and record.mjs.
// Uses the Playwright browsers already in ~/Library/Caches/ms-playwright so no download is needed:
// the headless shell for recording (exact viewport, WebGL works) and full Chromium for interactive login.
// Override with PW_CORE=/path/to/node_modules/playwright-core and CHROME_PATH=/path/to/binary.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { createRequire } from 'node:module';

export function loadChromium() {
  const names = [process.env.PW_CORE, 'playwright-core', 'playwright'].filter(Boolean);
  const here = path.dirname(new URL(import.meta.url).pathname);
  for (const base of [process.cwd(), here, path.join(here, '../../slide-to-video/scripts')]) {
    const req = createRequire(path.join(base, 'package.json'));
    for (const n of names) { try { const chromium = req(n).chromium; tolerateExtensionTargets(req, n); return chromium; } catch {} }
  }
  throw new Error('playwright-core not found: `npm i -D playwright-core` in the project, or set PW_CORE=/path/to/node_modules/playwright-core');
}

// When attached over CDP to a real Chrome, an extension's service worker (MetaMask's, once it
// has been used) can be reported without a browserContextId; Playwright 1.49 asserts on that,
// which kills the recorder mid-connect and leaves Chrome's DevTools endpoint hung. Detach from
// such targets instead: the recorder only needs pages.
function tolerateExtensionTargets(req, name) {
  let CRBrowser;
  try { ({ CRBrowser } = req(name + '/lib/server/chromium/crBrowser.js')); } catch { return; }
  const proto = CRBrowser && CRBrowser.prototype;
  if (!proto || proto.__eaTolerant) return;
  const attach = proto._onAttachedToTarget;
  proto._onAttachedToTarget = function (event) {
    const { targetInfo, sessionId } = event;
    if (targetInfo.type !== 'browser' && !targetInfo.browserContextId) {
      this._session.createChildSession(sessionId).detach().catch(() => {});
      return;
    }
    return attach.call(this, event);
  };
  proto.__eaTolerant = true;
}

export function browserPath(kind /* 'headless' | 'headed' */) {
  if (process.env.CHROME_PATH) return process.env.CHROME_PATH;
  const cache = path.join(os.homedir(), 'Library/Caches/ms-playwright');
  if (!fs.existsSync(cache)) return undefined;
  const prefix = kind === 'headless' ? 'chromium_headless_shell-' : 'chromium-';
  const subs = kind === 'headless'
    ? ['chrome-mac/headless_shell', 'chrome-mac-arm64/headless_shell', 'chrome-headless-shell-mac-arm64/chrome-headless-shell', 'chrome-linux/headless_shell']
    : ['chrome-mac/Chromium.app/Contents/MacOS/Chromium', 'chrome-mac-arm64/Chromium.app/Contents/MacOS/Chromium', 'chrome-linux/chrome'];
  const dirs = fs.readdirSync(cache).filter(d => d.startsWith(prefix) && /^\d+$/.test(d.slice(prefix.length))).sort((a, b) => +b.split('-').at(-1) - +a.split('-').at(-1));
  for (const d of dirs) for (const s of subs) { const p = path.join(cache, d, s); if (fs.existsSync(p)) return p; }
  return undefined; // let Playwright use its default
}

// session files live outside any repo: they hold login cookies
export const authPath = host => path.join(os.homedir(), '.config/eleven-announcer/auth', `${host}.json`);
export const expandHome = p => p && p.replace(/^~(?=\/|$)/, os.homedir());
