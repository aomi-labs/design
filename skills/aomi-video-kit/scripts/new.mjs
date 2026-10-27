#!/usr/bin/env node
// Starts a production folder with the kit in it.
//
//   node new.mjs <production-dir> [--starter | --film | --walkthrough] [--refresh]
//
//   --starter      (default) a 2D announcement film: title card → scene cards → outro. assets/film-starter.html
//   --film         slide-to-video's 3D/2D explainer film (needs skills/slide-to-video beside this kit)
//   --walkthrough  eleven-announcer's recorded app walkthrough (needs skills/eleven-announcer beside this kit)
//   --refresh      only re-copy kit/ (after the kit changed); never touches your film or script
//
// Copies kit.css, kit.js and kit.json into <dir>/kit/ so the production is self-contained, and the chosen
// template files, each only if it does not exist yet.
import fs from 'node:fs';
import path from 'node:path';
import { KIT_DIR } from './kit.mjs';

const args = process.argv.slice(2), dir = path.resolve(args.find(a => !a.startsWith('--')) || '');
if (!args.find(a => !a.startsWith('--'))) { console.log('usage: new.mjs <production-dir> [--starter|--film|--walkthrough] [--refresh]'); process.exit(2); }
const kind = args.includes('--film') ? 'film' : args.includes('--walkthrough') ? 'walkthrough' : 'starter';
const SKILLS = path.resolve(KIT_DIR, '..');
const TEMPLATES = {
  starter: [[path.join(KIT_DIR, 'assets/film-starter.html'), 'film.html'], [path.join(KIT_DIR, 'assets/script-template.mjs'), 'vo/script.mjs']],
  film: [[path.join(SKILLS, 'slide-to-video/assets/film-template.html'), 'film.html'], [path.join(SKILLS, 'slide-to-video/assets/script-template.mjs'), 'vo/script.mjs'], [path.join(SKILLS, 'slide-to-video/assets/music-template.mjs'), 'music.mjs']],
  walkthrough: [[path.join(SKILLS, 'eleven-announcer/assets/walkthrough-template.mjs'), 'walkthrough.mjs'], [path.join(SKILLS, 'eleven-announcer/assets/compositor.html'), 'compositor.html']],
};

fs.mkdirSync(path.join(dir, 'kit'), { recursive: true }); fs.mkdirSync(path.join(dir, 'vo'), { recursive: true });
for (const f of ['kit.css', 'kit.js', 'kit.json']) fs.copyFileSync(path.join(KIT_DIR, f), path.join(dir, 'kit', f));
console.log(`kit/ → ${dir}`);
if (!args.includes('--refresh')) for (const [src, rel] of TEMPLATES[kind]) {
  const dst = path.join(dir, rel);
  if (fs.existsSync(dst)) { console.log(`kept ${rel}`); continue; }
  if (!fs.existsSync(src)) { console.error(`template ${src} is missing: install skills/${kind === 'film' ? 'slide-to-video' : 'eleven-announcer'} beside the kit`); process.exit(1); }
  fs.mkdirSync(path.dirname(dst), { recursive: true }); fs.copyFileSync(src, dst); console.log(`${rel} ← ${path.relative(SKILLS, src)}`);
}
