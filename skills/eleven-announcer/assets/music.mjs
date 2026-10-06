#!/usr/bin/env node
// Light synthesized bed for a walkthrough: no samples, no licensing. The chord changes on every step
// (cycling a calm progression), with a soft plucked arpeggio and a chime as the outro begins.
// Reads vo/timeline.json (written by compose.mjs). finish.mjs ducks it under the voice.
//   node music.mjs out.wav
import { writeFileSync, readFileSync } from 'node:fs';

const TL = JSON.parse(readFileSync(new URL('./vo/timeline.json', import.meta.url), 'utf8'));
const PROG = [[[50, 57, 64, 66], 38], [[47, 54, 57, 62], 35], [[43, 50, 54, 59], 43], [[45, 52, 57, 61], 33]]; // Dadd9 Bm7 Gmaj7 A
const OUTRO = [[50, 57, 61, 64, 66], 38];
const DUR = TL.dur, starts = [0, ...TL.steps.slice(1).map(s => s.T0)], outroAt = TL.steps.at(-1).T1;
const CHORDS = [...starts.map((t, i) => [t, starts[i + 1] ?? outroAt, ...PROG[i % PROG.length]]), [outroAt, DUR, ...OUTRO]];

const SR = 44100, NS = Math.round(SR * DUR), L = new Float32Array(NS), R = new Float32Array(NS);
const mtof = m => 440 * Math.pow(2, (m - 69) / 12), cl = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const smooth = x => { x = cl(x); return x * x * (3 - 2 * x); };
let seed = 7; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
const env = (t, t0, t1) => smooth((t - t0 + .6) / 1.5) * (1 - smooth((t - t1 + .2) / 1.4));
const master = t => smooth(t / 1.5) * (1 - smooth((t - (DUR - 2.4)) / 2.2));
for (const [t0, t1, notes] of CHORDS) for (const m of notes) for (const cents of [-7, 0, 7]) {
  const f = mtof(m) * Math.pow(2, cents / 1200), pan = .5 + cents / 30, ph = rnd() * 6.28;
  for (let i = Math.max(0, Math.floor((t0 - .6) * SR)), e = Math.min(NS, Math.floor((t1 + 1.2) * SR)); i < e; i++) {
    const t = i / SR, w = 2 * Math.PI * f * t + ph, v = (Math.sin(w) + .42 * Math.sin(2 * w) + .2 * Math.sin(3 * w)) * env(t, t0, t1) * .026;
    L[i] += v * (1 - pan * .6); R[i] += v * (.4 + pan * .6);
  }
}
for (const [t0, t1, , b] of CHORDS) { const f = mtof(b + 12);
  for (let i = Math.max(0, Math.floor((t0 - .6) * SR)), e = Math.min(NS, Math.floor((t1 + 1.2) * SR)); i < e; i++) { const t = i / SR, v = Math.sin(2 * Math.PI * f * t) * env(t, t0, t1) * .09; L[i] += v; R[i] += v; } }
const add = (t0, len, fn, pan = .5) => { const s0 = Math.floor(t0 * SR); for (let k = 0; k < len * SR && s0 + k < NS; k++) { const v = fn(k / SR); L[s0 + k] += v * (1 - pan); R[s0 + k] += v * pan; } };
const PAT = [0, 1, 2, 3, 2, 1, 3, 1];
for (let t = 2, k = 0; t < outroAt; k++, t += .36) {
  const ch = CHORDS.find(c => t >= c[0] && t < c[1]) || CHORDS[0], f = mtof(ch[2][PAT[k % 8] % ch[2].length] + 12);
  add(t, 1, x => (Math.sin(2 * Math.PI * f * x) + .3 * Math.sin(4 * Math.PI * f * x)) * Math.exp(-x / .3) * Math.min(1, x / .004) * .04, k % 2 ? .62 : .38);
}
[[outroAt + .6, 86], [outroAt + .65, 81]].forEach(([t, m]) => { const f = mtof(m); add(t, 2.4, x => (Math.sin(2 * Math.PI * f * x) + .5 * Math.sin(2 * Math.PI * f * 2.76 * x) * Math.exp(-x / .25)) * Math.exp(-x / .7) * Math.min(1, x / .002) * .07, .55); });

const reverb = (x, off) => { const combs = [1557, 1617, 1491, 1422].map(d => ({ b: new Float32Array(d + off), i: 0, s: 0 })), aps = [225, 556].map(d => ({ b: new Float32Array(d + off), i: 0 }));
  const out = new Float32Array(NS); let lp = 0;
  for (let n = 0; n < NS; n++) { lp += .35 * (x[n] - lp); let y = 0;
    for (const c of combs) { const o = c.b[c.i]; c.s = o * .7 + c.s * .3; c.b[c.i] = lp + c.s * .84; c.i = (c.i + 1) % c.b.length; y += o; }
    for (const a of aps) { const o = a.b[a.i], o2 = -.5 * y + o; a.b[a.i] = y + .5 * o2; y = o2; a.i = (a.i + 1) % a.b.length; }
    out[n] = (lp * .78 + y * .07) * master(n / SR); }
  return out; };
const oL = reverb(L, 0), oR = reverb(R, 23);
let peak = 0; for (let n = 0; n < NS; n++) peak = Math.max(peak, Math.abs(oL[n]), Math.abs(oR[n]));
const g = .89 / peak, buf = Buffer.alloc(44 + NS * 4);
buf.write('RIFF', 0); buf.writeUInt32LE(36 + NS * 4, 4); buf.write('WAVEfmt ', 8); buf.writeUInt32LE(16, 16); buf.writeUInt16LE(1, 20); buf.writeUInt16LE(2, 22);
buf.writeUInt32LE(SR, 24); buf.writeUInt32LE(SR * 4, 28); buf.writeUInt16LE(4, 32); buf.writeUInt16LE(16, 34); buf.write('data', 36); buf.writeUInt32LE(NS * 4, 40);
for (let n = 0; n < NS; n++) { buf.writeInt16LE(Math.round(cl(oL[n] * g, -1, 1) * 32767), 44 + n * 4); buf.writeInt16LE(Math.round(cl(oR[n] * g, -1, 1) * 32767), 46 + n * 4); }
writeFileSync(process.argv[2] || 'music.wav', buf);
console.log(`music bed ${DUR.toFixed(1)}s → ${process.argv[2] || 'music.wav'}`);
