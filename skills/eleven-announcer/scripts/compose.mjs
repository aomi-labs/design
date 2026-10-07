#!/usr/bin/env node
// Edits the recording to the voice-over. Per step:
//   · static stretches (no repaint for > 1.2 s, e.g. waiting on a backend) are cut to 0.3 s
//   · `speed: N` steps play N× (progress you want to show but not sit through)
//   · the step holds on its last frame until its voice line has finished
//   · the camera zooms toward every clicked, typed or `focus`ed element, and back out between steps
// Then lays out subtitles from the word timings.
//
//   node compose.mjs <production-dir>
//
// Writes timeline.js (read by compositor.html), vo/timeline.json (read by slide-to-video's finish.mjs)
// and <slug>.srt.
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';

const dir = path.resolve(process.argv[2] || '.'), slug = path.basename(dir);
const { META = {}, STEPS, DISPLAY = [] } = await import(pathToFileURL(path.join(dir, 'walkthrough.mjs')).href);
const rec = JSON.parse(fs.readFileSync(path.join(dir, 'rec/record.json'), 'utf8'));
const { w: VW, h: VH } = rec.viewport, INTRO = META.intro ?? 3.4, OUTRO = META.outro ?? 4.6, GAP = 1.2, CUT = .3;
const cl = (x, a, b) => Math.min(b, Math.max(a, x));
const display = t => DISPLAY.reduce((s, [a, b]) => s.replace(new RegExp(a, 'gi'), b), t);
const words = al => { const out = []; let cur = null;
  al.characters.forEach((ch, i) => { if (/\s/.test(ch)) { if (cur) out.push(cur); cur = null; return; }
    if (!cur) cur = { w: '', s: al.character_start_times_seconds[i], e: 0 }; cur.w += ch; cur.e = al.character_end_times_seconds[i]; });
  if (cur) out.push(cur); return out; };

const map = [], segs = [], zooms = [[0, VW / 2, VH / 2, 1]], cues = [], vo = [];
const keyZoom = (T, cx, cy, s) => { const last = zooms.at(-1); zooms.push([Math.max(T, last[0] + .01), cx, cy, s]); };
let T = INTRO;
STEPS.forEach((st, i) => {
  const r = rec.steps.find(s => s.id === st.id); if (!r) throw new Error(`step ${st.id} is not in the recording: re-run record.mjs`);
  const t0 = r.tReady ?? r.t0, speed = st.speed || 1, T0 = T;
  // pieces of recording → output time, cutting static stretches
  const fr = rec.frames.filter(f => f.t > t0 && f.t < r.t1).map(f => f.t), pieces = []; let a = t0;
  [t0, ...fr, r.t1].forEach((t, k, arr) => { const nx = arr[k + 1]; if (nx !== undefined && nx - t > GAP) { pieces.push([a, t + .25, (t + .25 - a) / speed]); pieces.push([t + .25, nx - .05, CUT]); a = nx - .05; } });
  pieces.push([a, r.t1, (r.t1 - a) / speed]);
  const toOut = t => { let o = T0; for (const [pa, pb, len] of pieces) { if (t <= pb) return o + (pb > pa ? cl((t - pa) / (pb - pa), 0, 1) : 0) * len; o += len; } return o; };
  let o = T0; map.push([T0, t0]); for (const [, pb, len] of pieces) { o += len; map.push([o, pb]); }
  const effective = o - T0, actionsEnd = toOut(r.t1 - (st.hold ?? .8)) - T0;
  // voice line
  const id = String(st.id).padStart(2, '0'), base = path.join(dir, 'vo', `step${id}`);
  let len = effective;
  if (st.say && fs.existsSync(`${base}.mp3`)) {
    const ws = words(JSON.parse(fs.readFileSync(`${base}.json`, 'utf8')));
    const dur = +execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', `${base}.mp3`]).toString();
    const off = st.voAt === 'end' ? actionsEnd + .1 : .35, start = T0 + off;
    len = Math.max(effective, off + Math.max(dur, ws.at(-1)?.e ?? 0) + .45);
    vo.push({ id: st.id, file: `vo/step${id}.mp3`, start: +start.toFixed(3), dur: +dur.toFixed(3) });
    const text = w => display(w.map(x => x.w).join(' '));
    const split = w => { if (text(w).length <= 58) return [w];
      const total = text(w).length; let best = -1, bs = Infinity;
      for (const clause of [true, false]) { w.forEach((x, k) => { if (k === w.length - 1 || (clause && !/[,;:]$/.test(x.w))) return;
          const left = text(w.slice(0, k + 1)).length; if (left < 12 || total - left < 12) return; const sc = Math.abs(left - total / 2); if (sc < bs) { bs = sc; best = k; } });
        if (best >= 0 && (!clause || bs < total * .3)) break; best = -1; bs = Infinity; }
      return [...split(w.slice(0, best + 1)), ...split(w.slice(best + 1))]; };
    let sent = []; ws.forEach((x, k) => { sent.push(x); if (/[.?!]$/.test(x.w) || k === ws.length - 1) { split(sent).forEach(c => cues.push({ s: start + c[0].s, e: start + c.at(-1).e + .35, text: text(c) })); sent = []; } });
  }
  if (len > effective) map.push([T0 + len, r.t1]); // hold the last frame while the voice finishes
  // camera: zoom toward each focused element, back out at the end of the step
  if (st.zoom !== false) for (const f of r.focus) {
    const s = cl(Math.min(.62 * VW / f.w, .62 * VH / f.h), 1, st.maxZoom ?? META.maxZoom ?? 1.5);
    const cx = cl(f.x + f.w / 2, VW / (2 * s), VW - VW / (2 * s)), cy = cl(f.y + f.h / 2, VH / (2 * s), VH - VH / (2 * s)), Tf = toOut(f.t);
    keyZoom(Tf - .5, ...zooms.at(-1).slice(1)); keyZoom(Tf + .2, cx, cy, s);
  }
  // ease back to full view at the end of the step, unless it hands its zoom to the next (keepZoom)
  if (!st.keepZoom && zooms.at(-1)[3] !== 1) { keyZoom(T0 + len - .8, ...zooms.at(-1).slice(1)); keyZoom(T0 + len, VW / 2, VH / 2, 1); }
  segs.push({ id: st.id, title: st.title, url: r.url, T0: +T0.toFixed(3), T1: +(T0 + len).toFixed(3) });
  T += len;
});
const dur = T + OUTRO;
map.unshift([0, map[0][1]]); map.push([dur, map.at(-1)[1]]);
cues.forEach((c, k) => { if (cues[k + 1]) c.e = Math.min(c.e, cues[k + 1].s - .04); c.s = +c.s.toFixed(3); c.e = +c.e.toFixed(3); });
const r3 = a => a.map(v => +(+v).toFixed(3));
const tl = { meta: { title: META.title, subtitle: META.subtitle, eyebrow: META.eyebrow, link: META.link }, viewport: rec.viewport, intro: INTRO, outro: OUTRO,
  dur: +dur.toFixed(3), map: map.map(r3), zooms: zooms.map(r3), steps: segs, cues, vo, frames: rec.frames };
fs.writeFileSync(path.join(dir, 'timeline.js'), `window.EA = ${JSON.stringify(tl)};\n`);
fs.mkdirSync(path.join(dir, 'vo'), { recursive: true });
fs.writeFileSync(path.join(dir, 'vo/timeline.json'), JSON.stringify({ dur: tl.dur, vo, cues, steps: segs }, null, 1));
const ts = t => { const ms = Math.round(t * 1000); return `${String(Math.floor(ms / 3600000)).padStart(2, '0')}:${String(Math.floor(ms / 60000) % 60).padStart(2, '0')}:${String(Math.floor(ms / 1000) % 60).padStart(2, '0')},${String(ms % 1000).padStart(3, '0')}`; };
fs.writeFileSync(path.join(dir, `${slug}.srt`), cues.map((c, k) => `${k + 1}\n${ts(c.s)} --> ${ts(c.e)}\n${c.text}\n`).join('\n'));
console.log(`video ${tl.dur.toFixed(1)}s · ${segs.length} steps · ${vo.length} voice lines · ${cues.length} subtitle cues`);
segs.forEach(s => console.log(`  ${String(s.id).padStart(2)} ${s.T0.toFixed(1).padStart(6)}s → ${s.T1.toFixed(1).padStart(6)}s  ${s.title || ''}`));
