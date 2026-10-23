#!/usr/bin/env node
// Lays Cecilia's screen recording of the live take into scene 9, after finish.mjs has encoded the film.
// The recording (research/live-take.mov, kept out of git) went black from 8.9 s to 20.7 s and from 25.3 s to 46.6 s,
// so only its clear stretches are used: the request, the 1-cent x402 payment and the first poll (0–8.8 s), and
// signing, confirmations and balance checks (47.2–51.9 s). film.html draws the same Terminal window and rebuilds
// the black stretch from the run's own log; the footage covers that window's text area exactly.
//
//   node live-overlay.mjs            (in this folder, after finish.mjs; rewrites task-api.mp4 and task-api-preview.mp4)
import { readFileSync, renameSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import path from 'node:path';

const dir = path.dirname(new URL(import.meta.url).pathname), slug = path.basename(dir);
const src = path.join(dir, 'research/live-take.mov'), full = path.join(dir, `${slug}.mp4`), preview = path.join(dir, `${slug}-preview.mp4`);
const LIVE = { A: [82.0, 83.6], B: [86.6, 89.0] };                  // film windows — keep in step with LIVE in film.html
const CLIPS = { A: [0, 8.8], B: [47.2, 51.9] };                      // clear stretches of the recording (seconds); B ends on the verified totals
// the window's text area in the 1418×994 capture, and where film.html draws it (the window is 1100 px wide, scaled from 1192)
const s = 1100 / 1192, CROP = [1154, 678, 116, 141], AT = [Math.round(410 + (116 - 113) * s), Math.round(245 + (141 - 76) * s)];
const SIZE = [Math.round(1154 * s), Math.round(678 * s)];

// film clock → narrated clock, from vo/timeline.json
const TL = JSON.parse(readFileSync(path.join(dir, 'vo/timeline.json'), 'utf8'));
const N = old => { const A = TL.anchors; if (old <= A[0][1]) return old;
  for (let i = 0; i < A.length - 1; i++) { const [n0, o0] = A[i], [n1, o1] = A[i + 1]; if (old <= o1) return o1 === o0 ? n0 : n0 + (n1 - n0) * (old - o0) / (o1 - o0); }
  return A.at(-1)[0] + (old - A.at(-1)[1]); };

const parts = Object.keys(LIVE).map(k => { const [a, b] = LIVE[k].map(N), [c0, c1] = CLIPS[k]; return { k, a, b, c0, c1, speed: (c1 - c0) / (b - a) }; });
parts.forEach(p => console.log(`footage ${p.k}: recording ${p.c0}–${p.c1}s → film ${p.a.toFixed(2)}–${p.b.toFixed(2)}s (${p.speed.toFixed(2)}×)`));
const fc = parts.map((p, i) => `[1:v]trim=start=${p.c0}:end=${p.c1},setpts=(PTS-STARTPTS)/${p.speed.toFixed(5)}+${p.a.toFixed(4)}/TB,crop=${CROP.join(':')},scale=${SIZE.join(':')}:flags=lanczos,fps=30[c${i}]`);
let last = '0:v'; parts.forEach((p, i) => { fc.push(`[${last}][c${i}]overlay=${AT.join(':')}:enable='between(t,${p.a.toFixed(4)},${(p.b - 1 / 30).toFixed(4)})':eof_action=pass[v${i}]`); last = `v${i}`; });
const tmp = full.replace(/\.mp4$/, '.live.mp4');
const ff = args => execFileSync('ffmpeg', ['-v', 'error', '-y', ...args], { stdio: 'inherit' });
ff(['-i', full, '-i', src, '-filter_complex', fc.join(';'), '-map', `[${last}]`, '-map', '0:a', '-c:v', 'libx264', '-preset', 'slow', '-crf', '18', '-pix_fmt', 'yuv420p', '-profile:v', 'high', '-movflags', '+faststart', '-c:a', 'copy', tmp]);
renameSync(tmp, full);
ff(['-i', full, '-c:v', 'libx264', '-preset', 'slow', '-crf', '24', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', '-c:a', 'copy', preview]);
console.log(`live footage laid into ${path.basename(full)} and ${path.basename(preview)}`);
