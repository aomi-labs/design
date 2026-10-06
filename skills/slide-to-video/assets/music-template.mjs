#!/usr/bin/env node
// Synthesised music bed, written on the film's ORIGINAL clock and moved onto the narrated clock
// through vo/timeline.json (when it exists). No samples, no licensing: pad chords + plucked arpeggio
// + a soft pulse through the gated middle + chimes on passes and thuds on failures.
//
//   node music.mjs out.wav
//
// Edit FILM_DUR, CHORDS, PULSE, CHIMES and THUDS so chord changes land on scene boundaries and the
// accents land on the frames where something passes or fails.
import { writeFileSync, readFileSync, existsSync } from 'node:fs';

const FILM_DUR = 22;                                   // original-clock length (DUR in film.html)
const CHORDS = [                                       // [start, end, chord (MIDI), bass (MIDI)]
  [0, 4.6, [50, 57, 64, 66], 38],                      // intent        Dadd9
  [4.6, 11.4, [47, 54, 57, 62], 35],                   // 2D scene      Bm7
  [11.4, 17.2, [43, 50, 54, 59], 43],                  // 3D station    Gmaj7
  [17.2, 22, [50, 57, 61, 64, 66], 38]];               // outro         Dmaj9
const ARP = [4.6, 16.6];                               // plucked 8ths between these times
const PULSE = [11.4, 16.8];                            // soft kick on the beat
const CHIMES = [[8.6, 81], [15.0, 83], [20.4, 86]];   // [time, MIDI] — passes, the logo forming
const THUDS = [];                                      // times — failures

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
let seed = 7; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
const chords = CHORDS.map(([a, b, n, bass]) => [N(a), N(b), n, bass]);
const env = (t, t0, t1) => smooth((t - t0 + .6) / 1.5) * (1 - smooth((t - t1 + .2) / 1.4));
const master = t => smooth(t / 1.2) * (1 - smooth((t - (DUR - 2.4)) / 2.2));

for (const [t0, t1, notes] of chords) for (const m of notes) for (const cents of [-7, 0, 7]) { // pad: detuned additive voices
  const f = mtof(m) * Math.pow(2, cents / 1200), pan = .5 + cents / 30, ph = rnd() * 6.28;
  for (let i = Math.max(0, Math.floor((t0 - .6) * SR)), e = Math.min(NS, Math.floor((t1 + 1.2) * SR)); i < e; i++) {
    const t = i / SR, w = 2 * Math.PI * f * t + ph;
    const v = (Math.sin(w) + .42 * Math.sin(2 * w) + .2 * Math.sin(3 * w) + .09 * Math.sin(4 * w)) * env(t, t0, t1) * .028 * (1 + .15 * Math.sin(t * .7 + ph));
    L[i] += v * (1 - pan * .6); R[i] += v * (.4 + pan * .6);
  }
}
for (const [t0, t1, , b] of chords) { const f = mtof(b + 12); // bass
  for (let i = Math.max(0, Math.floor((t0 - .6) * SR)), e = Math.min(NS, Math.floor((t1 + 1.2) * SR)); i < e; i++) { const t = i / SR, v = (Math.sin(2 * Math.PI * f * t) + .25 * Math.sin(4 * Math.PI * f * t)) * env(t, t0, t1) * .11; L[i] += v; R[i] += v; } }
const add = (t0, len, fn, pan = .5) => { const s0 = Math.floor(t0 * SR); for (let k = 0; k < len * SR && s0 + k < NS; k++) { const v = fn(k / SR); L[s0 + k] += v * (1 - pan); R[s0 + k] += v * pan; } };
const PAT = [0, 1, 2, 3, 2, 1, 3, 1];
for (let t = N(ARP[0]), k = 0; t < N(ARP[1]); k++, t += .3) { // arpeggio: 8ths at 100 bpm
  const ch = chords.find(c => t >= c[0] && t < c[1]) || chords.at(-1), f = mtof(ch[2][PAT[k % 8] % ch[2].length] + 12);
  const amp = .055 * smooth((t - N(ARP[0])) / 3) * (1 - smooth((t - N(ARP[1]) + 2) / 2));
  add(t, 1.1, x => (Math.sin(2 * Math.PI * f * x) + .3 * Math.sin(4 * Math.PI * f * x)) * Math.exp(-x / .28) * Math.min(1, x / .004) * amp, k % 2 ? .65 : .35);
}
for (let t = N(PULSE[0]); t < N(PULSE[1]); t += .6) { const amp = .3 * smooth((t - N(PULSE[0])) / 2) * (1 - smooth((t - N(PULSE[1]) + 1.5) / 1.5));
  add(t, .32, x => Math.sin(2 * Math.PI * (45 + 50 * Math.exp(-x / .04)) * x) * Math.exp(-x / .12) * amp); }
CHIMES.forEach(([t, m]) => { const f = mtof(m); add(N(t), 2.4, x => (Math.sin(2 * Math.PI * f * x) + .5 * Math.sin(2 * Math.PI * f * 2.76 * x) * Math.exp(-x / .25) + .25 * Math.sin(2 * Math.PI * f * 5.4 * x) * Math.exp(-x / .12)) * Math.exp(-x / .7) * Math.min(1, x / .002) * .07, .55); });
THUDS.forEach(t => { let lp = 0; add(N(t), .6, x => { lp += .08 * ((rnd() * 2 - 1) - lp); return (Math.sin(2 * Math.PI * (60 + 40 * Math.exp(-x / .05)) * x) * .5 + lp * 1.6) * Math.exp(-x / .15) * .32; }); });

const reverb = (x, off) => { // gentle low-pass + Schroeder reverb
  const combs = [1557, 1617, 1491, 1422].map(d => ({ b: new Float32Array(d + off), i: 0, s: 0 })), aps = [225, 556].map(d => ({ b: new Float32Array(d + off), i: 0 }));
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
