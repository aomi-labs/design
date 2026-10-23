#!/usr/bin/env node
// Original music bed for "Aomi Task API" — synthesised, no samples, no licensing.
// An upbeat, driving piece: A minor, 124 bpm. Four-on-the-floor kick with the pads pumping against it,
// an off-beat octave bass, 16th-note arpeggios, claps on 2 and 4, noise risers into each act and an
// impact on every scene change. It drops to pads and a heartbeat for the contractor (the problem), then
// builds back up. Section boundaries are written on the film's playback clock and moved onto the narrated
// clock through vo/timeline.json; the beat grid itself runs at a constant tempo on the narrated clock.
//
//   node music.mjs out.wav
import { writeFileSync, readFileSync, existsSync } from 'node:fs';
import path from 'node:path';

const FILM_DUR = 110;                                   // DUR in film.html (playback clock, after EDIT reorders the scenes)
const CHORDS = [                                        // [start, end, chord (MIDI), bass (MIDI)] — changes on scene boundaries
  [0, 5.4, [57, 60, 64, 67], 45],                       // 1   title + lineup        Am7
  [5.4, 16.4, [48, 52, 55, 59], 36],                    // 1   the intent            Cmaj7
  [16.4, 26.8, [57, 60, 64, 67], 45],                   // 2   harness + fork        Am7
  [26.8, 34.6, [53, 57, 60, 65], 41],                   // 3   fingerprint           F
  [34.6, 42.2, [55, 59, 62, 67], 43],                   // 4   pay over x402         G
  [42.2, 49.4, [48, 52, 55, 60], 36],                   // 5   the buyer executes    C
  [49.4, 57.4, [57, 60, 64, 67], 45],                   // 6   watch it live         Am7
  [57.4, 65.6, [53, 57, 60, 64], 41],                   // 7   why: x402 over data   Fmaj7
  [65.6, 73.4, [55, 59, 62, 65], 43],                   // 8   a service?            G7
  [73.4, 80.8, [52, 55, 59, 62], 40],                   // 9   the contractor        Em7 — the problem
  [80.8, 89.4, [53, 57, 60, 64], 41],                   // 10  two loops             Fmaj7
  [89.4, 94.6, [53, 57, 60, 64], 41],                   // 11  thesis                Fmaj7
  [94.6, 101.6, [55, 59, 62, 65], 43],                  // 12  trust → TEE           G7
  [101.6, 110, [57, 60, 64, 69, 71], 45]];              // outro: cubes build the mark Am(add9)
const BEAT = 60 / 124;
const DRIVE = [[5.4, 73.4], [80.8, 101.6]];             // kick, bass and hats run through these
const CLAPS = [[16.4, 49.4], [57.4, 73.4], [80.8, 101.6]]; // claps on 2 and 4
const ARP = [[5.4, 101.6]];                             // 16th arpeggio
const HEART = [73.4, 80.8];                             // the drop: a soft heartbeat under the contractor
const RISERS = [[3.2, 5.4], [14.2, 16.4], [32.4, 34.6], [55.2, 57.4], [78.4, 80.8], [87.2, 89.4]]; // noise sweeps into a scene
const IMPACTS = [5.4, 16.4, 34.6, 57.4, 80.8, 89.4];    // boom + crash on the downbeat of a new act
const CHIMES = [[2.4, 81], [23.0, 81], [23.45, 83], [23.9, 84], [24.35, 86], [24.8, 88], [25.4, 88], [29.8, 84], [30.0, 86], [30.2, 88],
  [36.6, 84], [43.8, 86], [46.6, 81], [46.9, 88], [52.3, 84], [56.6, 88], [63.0, 81], [85.6, 84], [99.6, 88], [102.7, 81], [103.0, 84], [103.3, 86], [103.6, 88], [104.3, 84], [105.1, 93]]; // … the cubes land, turn black, fuse into the logo
const THUDS = [25.1, 67.4, 83.8, 96.6];                 // MXNB skipped · outcome not verifiable · the human loop breaks · ran honestly?

// ---- original clock → narrated clock ----
const tlPath = path.join(process.cwd(), 'vo/timeline.json');
const TL = existsSync(tlPath) ? JSON.parse(readFileSync(tlPath, 'utf8')) : null;
const N = old => { if (!TL) return old; const A = TL.anchors; if (old <= A[0][1]) return old;
  for (let i = 0; i < A.length - 1; i++) { const [n0, o0] = A[i], [n1, o1] = A[i + 1]; if (old <= o1) return o1 === o0 ? n0 : n0 + (n1 - n0) * (old - o0) / (o1 - o0); }
  return A.at(-1)[0] + (old - A.at(-1)[1]); };

const SR = 44100, DUR = TL ? TL.dur : FILM_DUR, NS = Math.round(SR * DUR);
const L = new Float32Array(NS), R = new Float32Array(NS);
const mtof = m => 440 * Math.pow(2, (m - 69) / 12), cl = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const smooth = x => { x = cl(x); return x * x * (3 - 2 * x); };
let seed = 23; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
const chords = CHORDS.map(([a, b, n, bass]) => [N(a), N(b), n, bass]);
const chordAt = t => chords.find(c => t >= c[0] && t < c[1]) || chords.at(-1);
const env = (t, t0, t1) => smooth((t - t0 + .3) / .6) * (1 - smooth((t - t1 + .1) / .6));
const master = t => smooth(t / .6) * (1 - smooth((t - (DUR - 2.6)) / 2.4));
const add = (t0, len, fn, pan = .5) => { const s0 = Math.floor(t0 * SR); for (let k = 0; k < len * SR && s0 + k < NS; k++) { if (s0 + k < 0) continue; const v = fn(k / SR); L[s0 + k] += v * (1 - pan); R[s0 + k] += v * pan; } };
const ranges = rs => rs.map(([a, b]) => [N(a), N(b)]);
const inR = (rs, t) => rs.some(([a, b]) => t >= a && t < b);
const drive = ranges(DRIVE), claps = ranges(CLAPS), arps = ranges(ARP);
const grid = t => Math.round(t / BEAT) * BEAT;           // snap to the global beat grid
// the pump: pads and bass dip right after every kick, the classic sidechain feel
const pump = t => { if (!inR(drive, t)) return 1; const ph = ((t % BEAT) + BEAT) % BEAT; return .35 + .65 * smooth(ph / (BEAT * .55)); };

// pad: detuned saw-ish stack (additive, 6 harmonics), pumping against the kick
for (const [t0, t1, notes] of chords) notes.forEach((m, vi) => {
  for (const cents of [-9, 0, 9]) {
    const f = mtof(m) * Math.pow(2, cents / 1200), pan = .2 + .6 * (vi / (notes.length - 1)) + cents / 90, ph = rnd() * 6.28;
    for (let i = Math.max(0, Math.floor((t0 - .3) * SR)), e = Math.min(NS, Math.floor((t1 + .6) * SR)); i < e; i++) {
      const t = i / SR, w = 2 * Math.PI * f * t + ph;
      let s = 0; for (let h = 1; h <= 6; h++) s += Math.sin(h * w) / h;
      const v = s * env(t, t0, t1) * .016 * pump(t);
      L[i] += v * (1 - pan); R[i] += v * pan;
    }
  }
});
// bass: off-beat octave pulse (root on the beat's "and"), plus a sub on the downbeat
for (const [a, b] of drive) for (let t = grid(a); t < b; t += BEAT) {
  const ch = chordAt(t + .01), f = mtof(ch[3]), amp = .16 * smooth((t - a) / 1.5) * (1 - smooth((t - b + .8) / .8));
  add(t + BEAT / 2, BEAT * .45, x => { const w = 2 * Math.PI * f * 2 * x; return (Math.sin(w) + .45 * Math.sin(2 * w) + .2 * Math.sin(3 * w)) * Math.min(1, x / .004) * Math.exp(-x / .16) * amp; });
  add(t, BEAT * .9, x => Math.sin(2 * Math.PI * f * x) * Math.min(1, x / .01) * Math.exp(-x / .3) * amp * .8);
}
// kick: four on the floor
for (const [a, b] of drive) for (let t = grid(a); t < b; t += BEAT) { const amp = .42 * (1 - smooth((t - b + .6) / .6));
  add(t, .32, x => Math.sin(2 * Math.PI * (46 + 110 * Math.exp(-x / .028)) * x) * Math.exp(-x / .11) * amp); }
// hats: off-beat open hat, 16th closed ticks
for (const [a, b] of drive) for (let t = grid(a); t < b; t += BEAT / 4) {
  const k = Math.round(t / (BEAT / 4)) % 4, off = k === 2, amp = (off ? .07 : .022) * smooth((t - a) / 2) * (1 - smooth((t - b + .6) / .6)); let hp = 0, prev = 0;
  add(t, off ? .16 : .04, x => { const n = rnd() * 2 - 1, y = n - prev; prev = n; hp = .5 * hp + .5 * y; return hp * Math.exp(-x / (off ? .05 : .012)) * amp; }, off ? .6 : .4);
}
// claps on 2 and 4
for (const [a, b] of claps) for (let t = grid(a) + BEAT; t < b; t += BEAT * 2) { const amp = .13 * (1 - smooth((t - b + .6) / .6)); let lp = 0;
  [0, .011, .022].forEach(d => add(t + d, .18, x => { lp += .5 * ((rnd() * 2 - 1) - lp); return ((rnd() * 2 - 1) - lp) * Math.exp(-x / .045) * amp * (d ? .6 : 1); }, .52)); }
// arpeggio: 16ths over the chord, two octaves up, bright pluck, panned
const FIG = [0, 1, 2, 3, 2, 1, 3, 2, 0, 2, 3, 1, 3, 2, 1, 3];
for (const [a, b] of arps) for (let t = grid(a), k = 0; t < b; k++, t += BEAT / 4) {
  const ch = chordAt(t), f = mtof(ch[2][FIG[k % 16] % ch[2].length] + 12 + (k % 8 === 4 ? 12 : 0));
  const amp = .034 * smooth((t - a) / 3) * (1 - smooth((t - b + 1.2) / 1.2)) * (k % 4 === 0 ? 1.3 : 1);
  add(t, .42, x => { const w = 2 * Math.PI * f * x; return (Math.sin(w) + .5 * Math.sin(2 * w) * Math.exp(-x / .04) + .25 * Math.sin(3 * w) * Math.exp(-x / .03)) * Math.exp(-x / .11) * Math.min(1, x / .002) * amp; }, k % 2 ? .72 : .28);
}
// the drop: a soft heartbeat under the contractor
for (let t = N(HEART[0]); t < N(HEART[1]) - .2; t += BEAT * 2) [0, .22].forEach((d, j) =>
  add(t + d, .3, x => Math.sin(2 * Math.PI * (44 + 30 * Math.exp(-x / .03)) * x) * Math.exp(-x / .1) * (j ? .12 : .2)));
// risers: filtered noise sweeping up into the next act
RISERS.forEach(([a, b]) => { const t0 = N(a), t1 = N(b), len = t1 - t0; let lp = 0;
  add(t0, len, x => { const u = x / len, c = .02 + .5 * u * u; lp += c * ((rnd() * 2 - 1) - lp); return lp * u * u * .2; }, .5); });
// impacts: low boom + crash on the downbeat
IMPACTS.forEach(a => { const t = N(a); let hp = 0, prev = 0;
  add(t, 1.6, x => Math.sin(2 * Math.PI * (38 + 40 * Math.exp(-x / .06)) * x) * Math.exp(-x / .45) * .3);
  add(t, 2.2, x => { const n = rnd() * 2 - 1, y = n - prev; prev = n; hp = .7 * hp + .3 * y; return hp * Math.exp(-x / .6) * .09; }, .55); });
// chimes on passes, thuds on failures
CHIMES.forEach(([t, m]) => { const f = mtof(m); add(N(t), 2.0, x => (Math.sin(2 * Math.PI * f * x) + .45 * Math.sin(2 * Math.PI * f * 2.4 * x) * Math.exp(-x / .3) + .2 * Math.sin(2 * Math.PI * f * 5.95 * x) * Math.exp(-x / .1)) * Math.exp(-x / .6) * Math.min(1, x / .002) * .055, .6); });
THUDS.forEach(t => { let lp = 0; add(N(t), .6, x => { lp += .07 * ((rnd() * 2 - 1) - lp); return (Math.sin(2 * Math.PI * (55 + 45 * Math.exp(-x / .05)) * x) * .5 + lp * 1.5) * Math.exp(-x / .15) * .3; }); });

const reverb = (x, off) => { // light low-pass + Schroeder reverb
  const combs = [1557, 1617, 1491, 1422].map(d => ({ b: new Float32Array(d + off), i: 0, s: 0 })), aps = [225, 556].map(d => ({ b: new Float32Array(d + off), i: 0 }));
  const out = new Float32Array(NS); let lp = 0;
  for (let n = 0; n < NS; n++) { lp += .6 * (x[n] - lp); let y = 0;
    for (const c of combs) { const o = c.b[c.i]; c.s = o * .7 + c.s * .3; c.b[c.i] = lp + c.s * .8; c.i = (c.i + 1) % c.b.length; y += o; }
    for (const a of aps) { const o = a.b[a.i], o2 = -.5 * y + o; a.b[a.i] = y + .5 * o2; y = o2; a.i = (a.i + 1) % a.b.length; }
    out[n] = (lp * .85 + y * .05) * master(n / SR); }
  return out; };
const oL = reverb(L, 0), oR = reverb(R, 23);
let peak = 0; for (let n = 0; n < NS; n++) peak = Math.max(peak, Math.abs(oL[n]), Math.abs(oR[n]));
const g = .89 / peak, buf = Buffer.alloc(44 + NS * 4);
buf.write('RIFF', 0); buf.writeUInt32LE(36 + NS * 4, 4); buf.write('WAVEfmt ', 8); buf.writeUInt32LE(16, 16); buf.writeUInt16LE(1, 20); buf.writeUInt16LE(2, 22);
buf.writeUInt32LE(SR, 24); buf.writeUInt32LE(SR * 4, 28); buf.writeUInt16LE(4, 32); buf.writeUInt16LE(16, 34); buf.write('data', 36); buf.writeUInt32LE(NS * 4, 40);
for (let n = 0; n < NS; n++) { buf.writeInt16LE(Math.round(cl(oL[n] * g, -1, 1) * 32767), 44 + n * 4); buf.writeInt16LE(Math.round(cl(oR[n] * g, -1, 1) * 32767), 46 + n * 4); }
writeFileSync(process.argv[2] || 'music.wav', buf);
console.log(`music bed ${DUR.toFixed(1)}s → ${process.argv[2] || 'music.wav'}`);
