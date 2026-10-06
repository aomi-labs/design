// Synthesizes the music bed for film.html, synced to its scene timeline.
// usage: node music.mjs out.wav
import { writeFileSync, readFileSync } from 'node:fs';

// the music is written on the original film clock; N() moves each event onto the narrated clock
const TL = JSON.parse(readFileSync(new URL('./vo/timeline.json', import.meta.url), 'utf8'));
const N = old => { const A = TL.anchors; if (old <= A[0][1]) return old;
  for (let i = 0; i < A.length - 1; i++) { const [n0, o0] = A[i], [n1, o1] = A[i + 1]; if (old <= o1) return o1 === o0 ? n0 : n0 + (n1 - n0) * (old - o0) / (o1 - o0); }
  return A.at(-1)[0] + (old - A.at(-1)[1]); };

const SR = 44100, DUR = TL.dur, NS = Math.round(SR * DUR);
const L = new Float32Array(NS), Rt = new Float32Array(NS);
const mtof = m => 440 * Math.pow(2, (m - 69) / 12);
const cl = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const smooth = x => { x = cl(x); return x * x * (3 - 2 * x); };
let seed = 7; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;

// [t0, t1, chord (midi), bass (midi)] — boundaries follow the film's scenes
const CHORDS_OLD = [
  [0, 6.2, [50, 57, 64, 66], 38],          // intent          Dadd9
  [6.2, 12.4, [47, 54, 57, 62], 35],       // harness         Bm7
  [12.4, 19.0, [43, 50, 54, 59], 43],      // risk            Gmaj7
  [19.0, 24.9, [45, 52, 57, 62], 33],      // gate 0.5 fail   Asus4
  [24.9, 28.4, [45, 52, 57, 61], 33],      // gate 0.5 pass   A
  [28.4, 37.4, [42, 50, 57, 64], 42],      // gate 1          D/F#
  [37.4, 45.4, [43, 50, 54, 57], 43],      // gate 2          Gmaj9
  [45.4, 53.4, [40, 47, 55, 62, 66], 40],  // gate 3          Em9
  [53.4, 56.0, [50, 57, 62, 66, 69], 38],  // settlement      D
  [56.0, 60.4, [45, 52, 55, 62], 33],      // summary         A7sus4
  [60.4, 63.5, [43, 50, 54, 59], 43],      // risks resolved  Gmaj7
  [63.5, 66.6, [45, 52, 57, 61], 33],      //                 A
  [66.6, 70.4, [47, 54, 57, 62], 35],      // identity        Bm7
  [70.4, 73.6, [43, 50, 54, 59], 43],      //                 Gmaj7
  [73.6, 76.8, [45, 52, 57, 61], 33],      //                 A
  [76.8, 82.4, [50, 57, 61, 64, 66], 38]]; // outro           Dmaj9

const CHORDS = CHORDS_OLD.map(([a, b, n, bass]) => [N(a), N(b), n, bass]);
const env = (t, t0, t1) => smooth((t - t0 + .6) / 1.5) * (1 - smooth((t - t1 + .2) / 1.4));
const master = t => smooth(t / 1.2) * (1 - smooth((t - (DUR - 2.4)) / 2.2));

// pad: detuned additive voices
for (const [t0, t1, notes] of CHORDS) {
  const s0 = Math.max(0, Math.floor((t0 - .6) * SR)), s1 = Math.min(NS, Math.floor((t1 + 1.2) * SR));
  for (const m of notes) for (const cents of [-7, 0, 7]) {
    const f = mtof(m) * Math.pow(2, cents / 1200), pan = .5 + cents / 30, ph = rnd() * 6.28;
    for (let i = s0; i < s1; i++) {
      const t = i / SR, w = 2 * Math.PI * f * t + ph;
      const v = (Math.sin(w) + .42 * Math.sin(2 * w) + .2 * Math.sin(3 * w) + .09 * Math.sin(4 * w)) * env(t, t0, t1) * .028 * (1 + .15 * Math.sin(t * .7 + ph));
      L[i] += v * (1 - pan * .6); Rt[i] += v * (.4 + pan * .6);
    }
  }
}
// bass
for (const [t0, t1, , b] of CHORDS) {
  if (t1 <= 6) continue;
  const f = mtof(b + 12), s0 = Math.floor((t0 - .6) * SR), s1 = Math.min(NS, Math.floor((t1 + 1.2) * SR));
  for (let i = Math.max(0, s0); i < s1; i++) { const t = i / SR, v = (Math.sin(2 * Math.PI * f * t) + .25 * Math.sin(4 * Math.PI * f * t)) * env(t, t0, t1) * .11; L[i] += v; Rt[i] += v; }
}
// arpeggio plucks: 8ths at 100 bpm, 16ths during the summary
const pluck = (t0, f, amp, pan) => {
  const s0 = Math.floor(t0 * SR), len = Math.floor(1.1 * SR);
  for (let k = 0; k < len && s0 + k < NS; k++) { const t = k / SR, e = Math.exp(-t / .28) * Math.min(1, t / .004);
    const v = (Math.sin(2 * Math.PI * f * t) + .3 * Math.sin(4 * Math.PI * f * t) + .08 * Math.sin(6 * Math.PI * f * t)) * e * amp;
    L[s0 + k] += v * (1 - pan); Rt[s0 + k] += v * pan; }
};
const PAT = [0, 1, 2, 3, 2, 1, 3, 1];
for (let t = N(6), k = 0; t < N(76.6); k++) {
  const ch = CHORDS.find(c => t >= c[0] && t < c[1]); const notes = ch[2].slice(0, 4);
  const step = t >= N(56.8) && t < N(60.2) ? .15 : .3;
  const amp = .055 * smooth((t - N(6)) / 3) * (1 - smooth((t - N(74.6)) / 2));
  pluck(t, mtof(notes[PAT[k % 8]] + 12), amp, k % 2 ? .65 : .35);
  t += step;
}
// soft pulse on the beat through the gates
for (let t = N(21.0); t < N(66.0); t += .6) {
  const s0 = Math.floor(t * SR), amp = .3 * smooth((t - N(21.0)) / 2) * (1 - smooth((t - N(64.5)) / 1.5));
  for (let k = 0; k < .32 * SR && s0 + k < NS; k++) { const tt = k / SR, f = 45 + 50 * Math.exp(-tt / .04);
    const v = Math.sin(2 * Math.PI * f * tt) * Math.exp(-tt / .12) * amp; L[s0 + k] += v; Rt[s0 + k] += v; }
}
// chimes when a gate is passed; thuds when something fails
const chime = (t0, m) => { const f = mtof(m), s0 = Math.floor(t0 * SR);
  for (let k = 0; k < 2.4 * SR && s0 + k < NS; k++) { const t = k / SR, e = Math.exp(-t / .7) * Math.min(1, t / .002);
    const v = (Math.sin(2 * Math.PI * f * t) + .5 * Math.sin(2 * Math.PI * f * 2.76 * t) * Math.exp(-t / .25) + .25 * Math.sin(2 * Math.PI * f * 5.4 * t) * Math.exp(-t / .12)) * e * .07;
    L[s0 + k] += v * .45; Rt[s0 + k] += v * .55; } };
const thud = t0 => { const s0 = Math.floor(t0 * SR); let lp = 0;
  for (let k = 0; k < .6 * SR && s0 + k < NS; k++) { const t = k / SR; lp += .08 * ((rnd() * 2 - 1) - lp);
    const v = (Math.sin(2 * Math.PI * (60 + 40 * Math.exp(-t / .05)) * t) * .5 + lp * 1.6) * Math.exp(-t / .15) * .32; L[s0 + k] += v; Rt[s0 + k] += v; } };
[[10.5, 81], [24.9, 81], [26.2, 85], [34.1, 78], [35.2, 81], [43.0, 83], [52.1, 85], [54.2, 86], [54.25, 81], [62.4, 78], [63.1, 81], [63.8, 83], [64.5, 85], [65.7, 86], [74.1, 81], [74.5, 83], [75.8, 85], [79.0, 81], [80.0, 86], [80.05, 78]].forEach(([t, m]) => chime(N(t), m));
[16.2, 23.2, 41.2, 49.5, 74.9].map(N).forEach(thud);

// gentle low-pass + Schroeder reverb
const reverb = (x, off) => {
  const combs = [1557, 1617, 1491, 1422].map(d => ({ b: new Float32Array(d + off), i: 0, s: 0 }));
  const aps = [225, 556].map(d => ({ b: new Float32Array(d + off), i: 0 }));
  const out = new Float32Array(NS); let lp = 0;
  for (let n = 0; n < NS; n++) {
    lp += .35 * (x[n] - lp); x[n] = lp;
    let y = 0;
    for (const c of combs) { const o = c.b[c.i]; c.s = o * .7 + c.s * .3; c.b[c.i] = x[n] + c.s * .84; c.i = (c.i + 1) % c.b.length; y += o; }
    for (const a of aps) { const o = a.b[a.i], out = -.5 * y + o; a.b[a.i] = y + .5 * out; y = out; a.i = (a.i + 1) % a.b.length; }
    out[n] = (x[n] * .78 + y * .07) * master(n / SR);
  }
  return out;
};
const oL = reverb(L, 0), oR = reverb(Rt, 23);
let peak = 0; for (let n = 0; n < NS; n++) peak = Math.max(peak, Math.abs(oL[n]), Math.abs(oR[n]));
const g = .89 / peak;
const buf = Buffer.alloc(44 + NS * 4);
buf.write('RIFF', 0); buf.writeUInt32LE(36 + NS * 4, 4); buf.write('WAVEfmt ', 8); buf.writeUInt32LE(16, 16); buf.writeUInt16LE(1, 20); buf.writeUInt16LE(2, 22);
buf.writeUInt32LE(SR, 24); buf.writeUInt32LE(SR * 4, 28); buf.writeUInt16LE(4, 32); buf.writeUInt16LE(16, 34); buf.write('data', 36); buf.writeUInt32LE(NS * 4, 40);
for (let n = 0; n < NS; n++) { buf.writeInt16LE(Math.round(cl(oL[n] * g, -1, 1) * 32767), 44 + n * 4); buf.writeInt16LE(Math.round(cl(oR[n] * g, -1, 1) * 32767), 46 + n * 4); }
writeFileSync(process.argv[2] || 'music.wav', buf);
console.log('peak', peak.toFixed(3), 'written');
