#!/usr/bin/env node
// Original music bed for "From intent to execution" — synthesised, no samples, no licensing.
// Written on the film's ORIGINAL clock and moved onto the narrated clock through vo/timeline.json.
// A new piece, not the template bed: F major / D minor, 112 bpm, FM electric-piano pads, a
// 16th-note glass pluck, soft off-beat hats through the harness steps, a kick under the sandbox,
// a low thud when both cards fail, a chime on every defect the harness fixes, a bell on settlement.
//
//   node music.mjs out.wav
import { writeFileSync, readFileSync, existsSync } from 'node:fs';

const FILM_DUR = 140;                                   // DUR in film.html
const CHORDS = [                                        // [start, end, chord (MIDI), bass (MIDI)] — changes on scene boundaries
  [0, 11.4, [53, 60, 64, 69], 41],                      // F1-2 the request          Fmaj7(add9 colour)
  [11.4, 33.0, [50, 57, 60, 65], 38],                   // F3-4 Ethereum, side by side  Dm9 — the problem
  [33.0, 51.0, [46, 53, 57, 62], 34],                   // F5   Solana, side by side    Bbmaj7
  [51.0, 55.0, [48, 55, 60, 64], 36],                   // F6   the score             C
  [55.0, 62.0, [45, 53, 57, 60], 33],                   // F7   the loop              F/A
  [62.0, 70.0, [43, 50, 53, 58], 31],                   // F8   read                  Gm7
  [70.0, 77.4, [46, 53, 57, 60], 34],                   // F9   write                 Bbmaj9
  [77.4, 97.4, [50, 53, 57, 62], 38],                   // F10  rehearse + CI loops   Dm
  [97.4, 114.6, [46, 53, 57, 60], 34],                  // F11-12 commit + sign       Bbmaj9
  [114.6, 121.2, [48, 55, 57, 64], 36],                 // F13  settle                C6
  [121.2, 128.0, [45, 52, 55, 60], 33],                 // F14  reconcile             Am7
  [128.0, 134.0, [46, 53, 58, 62], 34],                 // F15  the whole             Bb
  [134.0, 140.0, [53, 57, 60, 64, 67], 41]];            // outro                     Fmaj9
const BEAT = 60 / 112;
const PLUCK = [11.4, 132.6];                            // 16th-note pluck between these times
const HATS = [[11.4, 51.0], [62.0, 77.4], [101.0, 114.6], [121.2, 128.0]]; // off-beat hats through the logs and the harness steps
const KICK = [77.4, 97.0];                              // kick under the sandbox and the CI loops
const CHIMES = [[65.0, 81], [65.6, 84], [66.2, 86], [74.6, 88], [86.4, 81], [88.3, 84], [89.0, 88], [98.6, 86], [106.8, 86], [116.8, 81], [117.1, 88], [124.6, 89], [137.2, 89]];
const THUDS = [23.5, 43.9, 79.8, 87.6];                 // Claude's revert · ReserveStale · the sandbox catches both · the CI loop fails

// ---- original clock → narrated clock ----
const tlPath = new URL('./vo/timeline.json', import.meta.url);
const TL = existsSync(tlPath) ? JSON.parse(readFileSync(tlPath, 'utf8')) : null;
const N = old => { if (!TL) return old; const A = TL.anchors; if (old <= A[0][1]) return old;
  for (let i = 0; i < A.length - 1; i++) { const [n0, o0] = A[i], [n1, o1] = A[i + 1]; if (old <= o1) return o1 === o0 ? n0 : n0 + (n1 - n0) * (old - o0) / (o1 - o0); }
  return A.at(-1)[0] + (old - A.at(-1)[1]); };

const SR = 44100, DUR = TL ? TL.dur : FILM_DUR, NS = Math.round(SR * DUR);
const L = new Float32Array(NS), R = new Float32Array(NS);
const mtof = m => 440 * Math.pow(2, (m - 69) / 12), cl = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const smooth = x => { x = cl(x); return x * x * (3 - 2 * x); };
let seed = 11; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
const chords = CHORDS.map(([a, b, n, bass]) => [N(a), N(b), n, bass]);
const chordAt = t => chords.find(c => t >= c[0] && t < c[1]) || chords.at(-1);
const env = (t, t0, t1) => smooth((t - t0 + .5) / 1.2) * (1 - smooth((t - t1 + .15) / 1.2));
const master = t => smooth(t / 1.0) * (1 - smooth((t - (DUR - 2.6)) / 2.4));
const add = (t0, len, fn, pan = .5) => { const s0 = Math.floor(t0 * SR); for (let k = 0; k < len * SR && s0 + k < NS; k++) { const v = fn(k / SR); L[s0 + k] += v * (1 - pan); R[s0 + k] += v * pan; } };

// pad: two-operator FM electric piano, slow tremolo, voices spread across the stereo field
for (const [t0, t1, notes] of chords) notes.forEach((m, vi) => {
  const f = mtof(m), pan = .25 + .5 * (vi / (notes.length - 1)), ph = rnd() * 6.28;
  for (let i = Math.max(0, Math.floor((t0 - .5) * SR)), e = Math.min(NS, Math.floor((t1 + 1.0) * SR)); i < e; i++) {
    const t = i / SR, idx = 1.1 + .5 * Math.sin(t * .4 + ph), mod = Math.sin(2 * Math.PI * f * 2 * t + ph) * idx;
    const v = (Math.sin(2 * Math.PI * f * t + mod) * .7 + Math.sin(2 * Math.PI * f * 1.003 * t) * .3) * env(t, t0, t1) * .03 * (1 + .22 * Math.sin(2 * Math.PI * 4.2 * t + ph));
    L[i] += v * (1 - pan); R[i] += v * pan;
  }
});
// bass: round sine with a soft octave, re-struck on each half bar
for (const [t0, t1, , b] of chords) for (let t = t0; t < t1 - .05; t += BEAT * 2) {
  const f = mtof(b + 12), len = Math.min(BEAT * 2.2, t1 - t + .6);
  add(t, len, x => (Math.sin(2 * Math.PI * f * x) + .2 * Math.sin(4 * Math.PI * f * x)) * Math.min(1, x / .02) * Math.exp(-x / 1.4) * .12 * smooth((x - 0) / .02) * (1 - smooth((x - len + .2) / .2)));
}
// pluck: 16ths, a rising-and-falling figure over the chord, two octaves up, glassy
const FIG = [0, 2, 1, 3, 2, 1, 3, 2, 0, 3, 1, 2, 3, 1, 2, 0];
for (let t = N(PLUCK[0]), k = 0; t < N(PLUCK[1]); k++, t += BEAT / 4) {
  if (k % 16 === 7 || k % 16 === 15) continue;                         // breathe twice a bar
  const ch = chordAt(t), m = ch[2][FIG[k % 16] % ch[2].length] + 24, f = mtof(m);
  const amp = .03 * smooth((t - N(PLUCK[0])) / 4) * (1 - smooth((t - N(PLUCK[1]) + 2.5) / 2.5)) * (k % 4 === 0 ? 1.25 : 1);
  add(t, .6, x => (Math.sin(2 * Math.PI * f * x) + .35 * Math.sin(2 * Math.PI * f * 3.01 * x) * Math.exp(-x / .05)) * Math.exp(-x / .16) * Math.min(1, x / .003) * amp, k % 2 ? .7 : .3);
}
// hats: filtered noise on the off-beat
for (const [a, b] of HATS) for (let t = N(a) + BEAT / 2; t < N(b); t += BEAT) {
  const amp = .045 * smooth((t - N(a)) / 2) * (1 - smooth((t - N(b) + 1) / 1)); let hp = 0, prev = 0;
  add(t, .09, x => { const n = rnd() * 2 - 1, y = n - prev; prev = n; hp = .6 * hp + .4 * y; return hp * Math.exp(-x / .025) * amp; }, .62);
}
// kick under the sandbox
for (let t = N(KICK[0]); t < N(KICK[1]); t += BEAT) { const amp = .28 * smooth((t - N(KICK[0])) / 2.5) * (1 - smooth((t - N(KICK[1]) + 1.5) / 1.5));
  add(t, .34, x => Math.sin(2 * Math.PI * (48 + 70 * Math.exp(-x / .035)) * x) * Math.exp(-x / .13) * amp); }
// chimes: bell partials, one per fix
CHIMES.forEach(([t, m]) => { const f = mtof(m); add(N(t), 2.6, x => (Math.sin(2 * Math.PI * f * x) + .45 * Math.sin(2 * Math.PI * f * 2.4 * x) * Math.exp(-x / .3) + .2 * Math.sin(2 * Math.PI * f * 5.95 * x) * Math.exp(-x / .1)) * Math.exp(-x / .8) * Math.min(1, x / .002) * .06, .58); });
THUDS.forEach(t => { let lp = 0; add(N(t), .7, x => { lp += .07 * ((rnd() * 2 - 1) - lp); return (Math.sin(2 * Math.PI * (55 + 45 * Math.exp(-x / .05)) * x) * .5 + lp * 1.5) * Math.exp(-x / .17) * .3; }); });

const reverb = (x, off) => { // gentle low-pass + Schroeder reverb, a little wider than the template's
  const combs = [1687, 1601, 2053, 1422].map(d => ({ b: new Float32Array(d + off), i: 0, s: 0 })), aps = [347, 113].map(d => ({ b: new Float32Array(d + off), i: 0 }));
  const out = new Float32Array(NS); let lp = 0;
  for (let n = 0; n < NS; n++) { lp += .42 * (x[n] - lp); let y = 0;
    for (const c of combs) { const o = c.b[c.i]; c.s = o * .65 + c.s * .35; c.b[c.i] = lp + c.s * .86; c.i = (c.i + 1) % c.b.length; y += o; }
    for (const a of aps) { const o = a.b[a.i], o2 = -.5 * y + o; a.b[a.i] = y + .5 * o2; y = o2; a.i = (a.i + 1) % a.b.length; }
    out[n] = (lp * .76 + y * .08) * master(n / SR); }
  return out; };
const oL = reverb(L, 0), oR = reverb(R, 31);
let peak = 0; for (let n = 0; n < NS; n++) peak = Math.max(peak, Math.abs(oL[n]), Math.abs(oR[n]));
const g = .89 / peak, buf = Buffer.alloc(44 + NS * 4);
buf.write('RIFF', 0); buf.writeUInt32LE(36 + NS * 4, 4); buf.write('WAVEfmt ', 8); buf.writeUInt32LE(16, 16); buf.writeUInt16LE(1, 20); buf.writeUInt16LE(2, 22);
buf.writeUInt32LE(SR, 24); buf.writeUInt32LE(SR * 4, 28); buf.writeUInt16LE(4, 32); buf.writeUInt16LE(16, 34); buf.write('data', 36); buf.writeUInt32LE(NS * 4, 40);
for (let n = 0; n < NS; n++) { buf.writeInt16LE(Math.round(cl(oL[n] * g, -1, 1) * 32767), 44 + n * 4); buf.writeInt16LE(Math.round(cl(oR[n] * g, -1, 1) * 32767), 46 + n * 4); }
writeFileSync(process.argv[2] || 'music.wav', buf);
console.log(`music bed ${DUR.toFixed(1)}s → ${process.argv[2] || 'music.wav'}`);
