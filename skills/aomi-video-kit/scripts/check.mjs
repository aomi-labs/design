#!/usr/bin/env node
// Grades a production against the kit, so a video is on-brand before it is shared.
//
//   node check.mjs <production-dir> [more dirs…]
//
// Checks the kit copy in the production, the film's use of it, the narration's wording, the voice clips,
// and the encoded .mp4 (frame, fps, loudness, length for X, the last frame, preview size).
// Exits 1 on a failure; warnings are advice. Also checks the kit against itself and the design system when present.
import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { execFileSync, spawnSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';
import { KIT, KIT_DIR } from './kit.mjs';

const dirs = process.argv.slice(2).map(d => path.resolve(d));
if (!dirs.length) { console.log('usage: check.mjs <production-dir> [more dirs…]'); process.exit(2); }
let fails = 0;
const ok = m => console.log(`  ok    ${m}`), warn = m => console.log(`  warn  ${m}`), fail = m => { fails++; console.log(`  FAIL  ${m}`); };
const sha = f => createHash('sha256').update(fs.readFileSync(f)).digest('hex');
const KIT_FILES = ['kit.css', 'kit.js', 'kit.json'];

// ---- the kit against itself and the design system (once) ----
console.log('kit');
{
  const css = fs.readFileSync(path.join(KIT_DIR, 'kit.css'), 'utf8');
  for (const [name, hex] of Object.entries(KIT.colors)) { const m = css.match(new RegExp(`--${name}:\\s*(#[0-9a-f]{6})`, 'i'));
    if (!m) fail(`kit.css has no --${name}`); else if (m[1].toLowerCase() !== hex) fail(`kit.css --${name} is ${m[1]}, kit.json says ${hex}`); }
  if (!css.includes(KIT.fonts.stylesheet)) fail('kit.css imports a different font stylesheet than kit.json');
  const js = fs.readFileSync(path.join(KIT_DIR, 'kit.js'), 'utf8'), markSvg = path.join(KIT_DIR, '../../assets/logo/aomi-mark.svg');
  if (fs.existsSync(markSvg)) {
    const paths = [...fs.readFileSync(markSvg, 'utf8').matchAll(/ d="([^"]+)"/g)].map(m => m[1]).join('|');
    js.includes(paths) ? ok('kit.js mark matches assets/logo/aomi-mark.svg') : fail('kit.js mark differs from assets/logo/aomi-mark.svg: re-copy the paths');
  }
  const tokens = path.join(KIT_DIR, '../../src/tokens/tokens.css');
  if (fs.existsSync(tokens)) {
    const t = fs.readFileSync(tokens, 'utf8'), tok = n => t.match(new RegExp(`--aomi-${n}:\\s*(#[0-9a-f]{6})`, 'i'))?.[1]?.toLowerCase();
    const pairs = { ink: 'cool-950', paper: 'neutral-50', white: 'cool-0', sky: 'sky-500', 'sky-400': 'sky-400', 'sky-300': 'sky-300', rose: 'pink-500', success: 'success-500', warning: 'warning-500', danger: 'danger-500' };
    for (const n of Object.keys(KIT.colors)) { const src = pairs[n] || (n.startsWith('cool-') ? n : null); if (!src) continue;
      const v = tok(src); if (v && v !== KIT.colors[n]) fail(`kit ${n} ${KIT.colors[n]} drifted from tokens.css --aomi-${src} ${v}`); }
    ok('colours match src/tokens/tokens.css');
  }
}

for (const dir of dirs) {
  const slug = path.basename(dir); console.log(`\n${slug}`);
  if (!fs.existsSync(dir)) { fail(`${dir} does not exist`); continue; }

  // ---- the kit copy ----
  for (const f of KIT_FILES) { const p = path.join(dir, 'kit', f);
    if (!fs.existsSync(p)) fail(`kit/${f} missing: node skills/aomi-video-kit/scripts/new.mjs ${slug} --refresh`);
    else if (sha(p) !== sha(path.join(KIT_DIR, f))) fail(`kit/${f} differs from the kit: new.mjs --refresh`); }
  if (KIT_FILES.every(f => fs.existsSync(path.join(dir, 'kit', f)) && sha(path.join(dir, 'kit', f)) === sha(path.join(KIT_DIR, f)))) ok('kit copy is current');

  // ---- the film ----
  const films = fs.readdirSync(dir).filter(f => /\.html?$/.test(f)).map(f => path.join(dir, f));
  if (!films.length) warn('no film .html in the production folder');
  for (const f of films) { const h = fs.readFileSync(f, 'utf8'), n = path.basename(f);
    if (!h.includes('kit/kit.css')) fail(`${n} does not load kit/kit.css`); if (!h.includes('kit/kit.js')) fail(`${n} does not load kit/kit.js`);
    if (/fonts\.googleapis\.com/.test(h)) warn(`${n} links its own fonts; kit.css already loads them`);
    if (/:root\s*\{[^}]*--ink/.test(h)) warn(`${n} redefines colour tokens; use the kit's`);
    if (!/__AOMI_VIDEO__|\.film\(/.test(h)) fail(`${n} has no playback contract (K.film(…) or window.__AOMI_VIDEO__)`); }
  if (films.length && !fails) ok(`${films.map(f => path.basename(f)).join(', ')} use the kit`);

  // ---- narration ----
  let lines = [], prefix = 'line';
  try {
    if (fs.existsSync(path.join(dir, 'walkthrough.mjs'))) { const { STEPS } = await import(pathToFileURL(path.join(dir, 'walkthrough.mjs')).href); prefix = 'step'; lines = STEPS.filter(s => s.say).map(s => ({ id: s.id, text: s.say })); }
    else if (fs.existsSync(path.join(dir, 'vo/script.mjs'))) { const { LINES } = await import(pathToFileURL(path.join(dir, 'vo/script.mjs')).href); lines = LINES.map(l => ({ id: l.id, text: l.text })); }
  } catch (e) { fail(`script does not load: ${e.message}`); }
  const avoid = new RegExp(`\\b(${KIT.words_to_avoid.join('|')})\\b`, 'i');
  for (const L of lines) { const m = L.text.match(avoid); if (m) warn(`${prefix} ${L.id} says "${m[1]}": TONE.md asks for the mechanism instead`);
    if (/!/.test(L.text)) warn(`${prefix} ${L.id} has an exclamation mark`); }
  const wordsTotal = lines.reduce((n, L) => n + L.text.split(/\s+/).length, 0);
  if (lines.length) ok(`${lines.length} lines, ${wordsTotal} words ≈ ${Math.round(wordsTotal / KIT.voice.words_per_second)} s of voice`);

  // ---- voice clips ----
  let drafts = 0, missing = 0;
  for (const L of lines) { const base = path.join(dir, 'vo', `${prefix}${String(L.id).padStart(2, '0')}`);
    if (!fs.existsSync(`${base}.mp3`) || !fs.existsSync(`${base}.json`)) missing++;
    else if (JSON.parse(fs.readFileSync(`${base}.json`, 'utf8')).draft) drafts++; }
  if (lines.length) { if (missing) warn(`${missing} lines not voiced yet`); else if (drafts) warn(`${drafts} lines are draft (macOS) voice: voice.mjs --force before delivery`); else ok('every line has a team-voice clip'); }

  // ---- the encoded video ----
  const mp4 = path.join(dir, `${slug}.mp4`), preview = path.join(dir, `${slug}-preview.mp4`);
  if (!fs.existsSync(mp4)) { warn(`${slug}.mp4 not encoded yet`); continue; }
  const probe = JSON.parse(execFileSync('ffprobe', ['-v', 'error', '-print_format', 'json', '-show_streams', '-show_format', mp4]).toString());
  const v = probe.streams.find(s => s.codec_type === 'video'), [fn, fd] = v.r_frame_rate.split('/').map(Number), fps = fn / fd, dur = +probe.format.duration;
  v.width === KIT.frame.width && v.height === KIT.frame.height ? ok(`${v.width}×${v.height}`) : fail(`${v.width}×${v.height}, kit frame is ${KIT.frame.width}×${KIT.frame.height}`);
  Math.abs(fps - KIT.frame.fps) < .01 ? ok(`${fps} fps`) : fail(`${fps} fps, kit is ${KIT.frame.fps}`);
  dur <= KIT.platforms.x_max_seconds ? ok(`${dur.toFixed(1)} s (fits X's ${KIT.platforms.x_max_seconds} s)`) : warn(`${dur.toFixed(1)} s is over X's ${KIT.platforms.x_max_seconds} s limit for non-Premium accounts`);
  const loud = spawnSync('ffmpeg', ['-hide_banner', '-i', mp4, '-af', `loudnorm=I=${KIT.mix.lufs}:TP=${KIT.mix.true_peak}:LRA=${KIT.mix.lra}:print_format=json`, '-f', 'null', '-']).stderr.toString();
  const I = +(loud.match(/"input_i"\s*:\s*"([-\d.]+)"/)?.[1] ?? NaN);
  Math.abs(I - KIT.mix.lufs) <= 1.5 ? ok(`${I.toFixed(1)} LUFS`) : fail(`${I.toFixed(1)} LUFS, kit is ${KIT.mix.lufs}: mix with finish.mjs`);
  const last = spawnSync('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-sseof', '-0.2', '-i', mp4, '-frames:v', '1', '-vf', 'scale=1:1', '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-']).stdout;
  if (last.length >= 3) { const lum = (last[0] * .3 + last[1] * .59 + last[2] * .11); lum > 200 ? ok('ends on paper (the lockup), not black') : fail(`last frame is dark (luma ${lum.toFixed(0)}): the outro should hold on the lockup`); }
  if (fs.existsSync(preview)) { const mb = fs.statSync(preview).size / 1048576; mb <= KIT.encode.preview_max_mb ? ok(`preview ${mb.toFixed(1)} MB`) : warn(`preview ${mb.toFixed(1)} MB is over ${KIT.encode.preview_max_mb} MB`); }
  else warn('no preview .mp4');
}
console.log(fails ? `\n${fails} failure${fails > 1 ? 's' : ''}` : '\nall good');
process.exit(fails ? 1 : 0);
