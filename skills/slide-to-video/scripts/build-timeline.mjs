#!/usr/bin/env node
// Builds the voice-over timeline for a film:
//   · a time warp from the narrated clock to the film's original clock, so each anchored word
//     lands on the animation it describes (the picture stretches to the voice, never the reverse)
//   · subtitle cues from the ElevenLabs word timings (one sentence per cue, long ones split at a clause)
//   · clip placements for the mix
//
//   node build-timeline.mjs <project-dir>
//
// Reads vo/script.mjs and vo/lineNN.{mp3,json}. Writes vo/timeline.json, vo/timeline.js (loaded by the film)
// and <project-dir>/<folder-name>.srt. Warns where the picture would have to speed up past 2.5×.
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';

const dir = path.resolve(process.argv[2] || '.'), slug = path.basename(dir);
const { LINES, OLD_END, END_HOLD = 1.5, DISPLAY = [] } = await import(pathToFileURL(path.join(dir, 'vo/script.mjs')).href);
const norm = w => w.toLowerCase().replace(/[^a-z0-9-]/g, '');
const display = t => DISPLAY.reduce((s, [from, to]) => s.replace(new RegExp(from, 'gi'), to), t); // spoken form → written form
const words = al => { const out = []; let cur = null;
  al.characters.forEach((ch, i) => { if (/\s/.test(ch)) { if (cur) out.push(cur); cur = null; return; }
    if (!cur) cur = { w: '', s: al.character_start_times_seconds[i], e: 0 }; cur.w += ch; cur.e = al.character_end_times_seconds[i]; });
  if (cur) out.push(cur); return out; };

const anchors = [[0, 0]], vo = [], cues = [];
let curNew = 0, curOld = 0;
for (const L of LINES) {
  const id = String(L.id).padStart(2, '0'), base = path.join(dir, 'vo', `line${id}`);
  const ws = words(JSON.parse(fs.readFileSync(`${base}.json`, 'utf8')));
  const dur = +execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', `${base}.mp3`]).toString();
  const start = curNew + (L.start - curOld); // the stretch between lines plays at normal speed
  anchors.push([start, L.start]);
  for (const [w, occ, old] of L.anchors) {
    const hit = ws.filter(x => norm(x.w) === norm(w))[occ - 1];
    if (!hit) throw new Error(`line ${L.id}: anchor word "${w}" (#${occ}) is not in the spoken text`);
    anchors.push([start + hit.s, old]);
  }
  const end = start + Math.max(dur, ws.at(-1).e) + .2;
  anchors.push([end, L.end]); curNew = end; curOld = L.end;
  vo.push({ id: L.id, file: `vo/line${id}.mp3`, start: +start.toFixed(3), dur: +dur.toFixed(3) });

  const text = w => display(w.map(x => x.w).join(' '));
  const split = w => { // ≤58 chars per cue: split at the clause nearest the middle, else the word nearest it
    if (text(w).length <= 58) return [w];
    const total = text(w).length; let best = -1, bestScore = Infinity;
    for (const clause of [true, false]) {
      w.forEach((x, i) => { if (i === w.length - 1 || (clause && !/[,;:]$/.test(x.w))) return;
        const left = text(w.slice(0, i + 1)).length; if (left < 12 || total - left < 12) return;
        const score = Math.abs(left - total / 2); if (score < bestScore) { bestScore = score; best = i; } });
      if (best >= 0 && (!clause || bestScore < total * .3)) break; best = -1; bestScore = Infinity;
    }
    return [...split(w.slice(0, best + 1)), ...split(w.slice(best + 1))];
  };
  let sentence = [];
  ws.forEach((x, i) => { sentence.push(x); if (/[.?!]$/.test(x.w) || i === ws.length - 1) {
    split(sentence).forEach(c => cues.push({ s: start + c[0].s, e: start + c.at(-1).e + .35, text: text(c) })); sentence = []; } });
}
const dur = curNew + (OLD_END - curOld) + END_HOLD;
anchors.push([dur, OLD_END]);
for (let i = 1; i < anchors.length; i++) {
  const [n0, o0] = anchors[i - 1], [n1, o1] = anchors[i];
  if (n1 <= n0 || o1 < o0) console.warn(`non-monotonic anchors ${JSON.stringify(anchors[i - 1])} → ${JSON.stringify(anchors[i])}: reorder anchors or fix their film times`);
  else if ((o1 - o0) / (n1 - n0) > 2.5) console.warn(`picture speeds up ${((o1 - o0) / (n1 - n0)).toFixed(1)}× between film ${o0}s and ${o1}s: give that animation more voice or move an anchor`);
}
cues.forEach((c, i) => { if (cues[i + 1]) c.e = Math.min(c.e, cues[i + 1].s - .04); c.s = +c.s.toFixed(3); c.e = +c.e.toFixed(3); });
const tl = { dur: +dur.toFixed(3), anchors: anchors.map(a => a.map(v => +v.toFixed(3))), cues, vo };
fs.writeFileSync(path.join(dir, 'vo/timeline.json'), JSON.stringify(tl, null, 1));
fs.writeFileSync(path.join(dir, 'vo/timeline.js'), `window.VO_TL = ${JSON.stringify(tl)};\n`);
const ts = t => { const ms = Math.round(t * 1000); return `${String(Math.floor(ms / 3600000)).padStart(2, '0')}:${String(Math.floor(ms / 60000) % 60).padStart(2, '0')}:${String(Math.floor(ms / 1000) % 60).padStart(2, '0')},${String(ms % 1000).padStart(3, '0')}`; };
fs.writeFileSync(path.join(dir, `${slug}.srt`), cues.map((c, i) => `${i + 1}\n${ts(c.s)} --> ${ts(c.e)}\n${c.text}\n`).join('\n'));
console.log(`narrated length ${tl.dur}s · ${cues.length} subtitle cues · ${slug}.srt`);
vo.forEach(v => console.log(`  line ${v.id}: ${v.start.toFixed(1)}s +${v.dur.toFixed(1)}s`));
