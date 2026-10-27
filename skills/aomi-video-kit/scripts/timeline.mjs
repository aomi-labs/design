#!/usr/bin/env node
// Builds the voice-over timeline for a film written on its own silent clock (vo/script.mjs):
//   · a time warp from the narrated clock to the film clock, so each anchored word lands on the animation
//     it describes (the picture stretches to the voice, never the reverse)
//   · subtitle cues from the word timings (subtitles.mjs)
//   · clip placements for finish.mjs
//
//   node timeline.mjs <production-dir>
//
// Reads vo/script.mjs and vo/lineNN.{mp3,json}. Writes vo/timeline.json, vo/timeline.js (loaded by the film)
// and <production-dir>/<folder-name>.srt. Warns where the picture would have to speed up past 2.5×.
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';
import { words, displayer, cues as cuesOf, tidy, srt } from './subtitles.mjs';

const dir = path.resolve(process.argv[2] || '.'), slug = path.basename(dir);
const { LINES, OLD_END, END_HOLD = 1.5, DISPLAY = [] } = await import(pathToFileURL(path.join(dir, 'vo/script.mjs')).href);
const norm = w => w.toLowerCase().replace(/[^a-z0-9-]/g, ''), display = displayer(DISPLAY);

const anchors = [[0, 0]], vo = [], cues = [];
let curNew = 0, curOld = 0;
for (const L of LINES) {
  const id = String(L.id).padStart(2, '0'), base = path.join(dir, 'vo', `line${id}`);
  if (!fs.existsSync(`${base}.json`)) throw new Error(`line ${L.id} is not voiced: node skills/aomi-video-kit/scripts/voice.mjs ${path.relative(process.cwd(), dir)}`);
  const ws = words(JSON.parse(fs.readFileSync(`${base}.json`, 'utf8')));
  const dur = +execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', `${base}.mp3`]).toString();
  const start = curNew + (L.start - curOld); // the stretch between lines plays at normal speed
  anchors.push([start, L.start]);
  for (const [w, occ, old] of L.anchors || []) {
    const hit = ws.filter(x => norm(x.w) === norm(w))[occ - 1];
    if (!hit) throw new Error(`line ${L.id}: anchor word "${w}" (#${occ}) is not in the spoken text`);
    anchors.push([start + hit.s, old]);
  }
  const end = start + Math.max(dur, ws.at(-1).e) + .2;
  anchors.push([end, L.end]); curNew = end; curOld = L.end;
  vo.push({ id: L.id, file: `vo/line${id}.mp3`, start: +start.toFixed(3), dur: +dur.toFixed(3) });
  cues.push(...cuesOf(ws, start, display));
}
const dur = curNew + (OLD_END - curOld) + END_HOLD;
anchors.push([dur, OLD_END]);
for (let i = 1; i < anchors.length; i++) {
  const [n0, o0] = anchors[i - 1], [n1, o1] = anchors[i];
  if (n1 <= n0 || o1 < o0) console.warn(`non-monotonic anchors ${JSON.stringify(anchors[i - 1])} → ${JSON.stringify(anchors[i])}: reorder anchors or fix their film times`);
  else if ((o1 - o0) / (n1 - n0) > 2.5) console.warn(`picture speeds up ${((o1 - o0) / (n1 - n0)).toFixed(1)}× between film ${o0}s and ${o1}s: give that animation more voice or move an anchor`);
}
const tl = { dur: +dur.toFixed(3), anchors: anchors.map(a => a.map(v => +v.toFixed(3))), cues: tidy(cues), vo };
fs.writeFileSync(path.join(dir, 'vo/timeline.json'), JSON.stringify(tl, null, 1));
fs.writeFileSync(path.join(dir, 'vo/timeline.js'), `window.VO_TL = ${JSON.stringify(tl)};\n`);
fs.writeFileSync(path.join(dir, `${slug}.srt`), srt(tl.cues));
console.log(`narrated length ${tl.dur}s · ${tl.cues.length} subtitle cues · ${slug}.srt`);
vo.forEach(v => console.log(`  line ${v.id}: ${v.start.toFixed(1)}s +${v.dur.toFixed(1)}s`));
