#!/usr/bin/env node
// Opens a real browser window so the USER can sign in to the app. Claude never types credentials.
// The signed-in session (cookies + local storage) is saved every 2 s while the window is open and kept
// outside the repo, at ~/.config/eleven-announcer/auth/<host>.json (mode 600). Close the window when done.
//
//   node login.mjs https://studio.example.com            (run in the background; it ends when the window closes)
import fs from 'node:fs';
import path from 'node:path';
import { loadChromium, browserPath, authPath } from './browser.mjs';

const url = process.argv[2];
if (!url) { console.log('usage: login.mjs <app-url>'); process.exit(2); }
const out = authPath(new URL(url).host);
fs.mkdirSync(path.dirname(out), { recursive: true, mode: 0o700 });

const browser = await loadChromium().launch({ headless: false, executablePath: browserPath('headed') });
const context = await browser.newContext({ viewport: null, storageState: fs.existsSync(out) ? out : undefined });
const page = await context.newPage();
await page.goto(url);
console.log(`Sign in to ${new URL(url).host} in the window that opened, then close the window.\nSession → ${out}`);

const save = async () => { try { await context.storageState({ path: out }); fs.chmodSync(out, 0o600); } catch {} };
const timer = setInterval(save, 2000);
await new Promise(resolve => { browser.on('disconnected', resolve); context.on('close', resolve); page.on('close', async () => { await save(); resolve(); }); });
clearInterval(timer);
try { await save(); await browser.close(); } catch {}
console.log(fs.existsSync(out) ? `saved session for ${new URL(url).host}` : 'no session saved');
