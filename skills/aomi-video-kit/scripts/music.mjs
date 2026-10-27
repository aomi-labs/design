#!/usr/bin/env node
// The signature bed: kit.json's progression in D at 100 bpm, one chord per scene, a plucked arpeggio
// underneath, and the two-note chime as the logo appears. Synthesised, so no samples and no licensing.
// finish.mjs runs this when a production has no music.mjs of its own.
//
//   node music.mjs <out.wav> [--dur S] [--outro S] [--scenes 0,12.5,30]
//
// Run from the production folder. Scene boundaries come from --scenes, else vo/timeline.json
// (each walkthrough step, or each voice line), else every 12 s. Events given on a film clock are moved
// onto the narrated clock through timeline.json's anchors, as a slide film's own music.mjs does.
import { existsSync, readFileSync } from 'node:fs';
import { KIT } from './kit.mjs';
import { mix } from './synth.mjs';

const args = process.argv.slice(2), out = args.find(a => !a.startsWith('--')) || 'music.wav';
const opt = k => { const i = args.indexOf(`--${k}`); return i >= 0 ? args[i + 1] : undefined; };
const TL = existsSync('vo/timeline.json') ? JSON.parse(readFileSync('vo/timeline.json', 'utf8')) : null;
const M = KIT.music, DUR = +(opt('dur') || TL?.dur || 30), OUTRO = +(opt('outro') ?? KIT.outro.seconds), outroAt = DUR - OUTRO;
const N = old => { if (!TL?.anchors) return old; const A = TL.anchors; if (old <= A[0][1]) return old; // film clock → narrated clock
  for (let i = 0; i < A.length - 1; i++) { const [n0, o0] = A[i], [n1, o1] = A[i + 1]; if (old <= o1) return o1 === o0 ? n0 : n0 + (n1 - n0) * (old - o0) / (o1 - o0); }
  return A.at(-1)[0] + (old - A.at(-1)[1]); };

let starts = opt('scenes') ? opt('scenes').split(',').map(Number).map(N)
  : TL?.steps ? TL.steps.map(s => s.T0) : TL?.vo ? TL.vo.map(v => v.start) : [];
starts = [0, ...starts.filter(t => t > 1 && t < outroAt - 2)].filter((t, i, a) => i === 0 || t - a[i - 1] > 2);
if (starts.length === 1) for (let t = 12; t < outroAt - 4; t += 12) starts.push(t);
const chords = starts.map((t, i) => [t, starts[i + 1] ?? outroAt, M.progression[i % M.progression.length]]);
chords.push([outroAt, DUR, M.outro_chord]);

const m = mix(DUR);
for (const [t0, t1, ch] of chords) { m.pad(t0, t1, ch.notes); m.bass(t0, t1, ch.bass); }
const eighth = 30 / M.tempo, PAT = [0, 1, 2, 3, 2, 1, 3, 1];
for (let t = 2, k = 0; t < outroAt - .5; k++, t += eighth) {
  const ch = chords.find(c => t >= c[0] && t < c[1])?.[2] || chords[0][2];
  m.pluck(t, ch.notes[PAT[k % 8] % ch.notes.length], .05 * Math.min(1, (t - 2) / 3) * Math.min(1, (outroAt - t) / 2), k % 2 ? .62 : .38);
}
M.signature_chime.forEach((note, i) => m.chime(outroAt + .6 + i * .05, note));
m.write(out);
console.log(`music bed ${DUR.toFixed(1)}s · ${chords.length} chords · ${out}`);
