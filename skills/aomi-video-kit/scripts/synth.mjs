// The kit's instruments: a detuned additive pad, a sine bass, a plucked arpeggio note, the chime and the thud,
// a Schroeder reverb and a 16-bit stereo WAV writer. music.mjs plays the signature bed on them; a production
// with its own music.mjs can play anything else on the same instruments, so every bed keeps the same timbre.
import { writeFileSync } from 'node:fs';

export const SR = 44100;
export const mtof = m => 440 * Math.pow(2, (m - 69) / 12);
export const cl = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
export const smooth = x => { x = cl(x); return x * x * (3 - 2 * x); };

export function mix(dur, seed = 7) {
  const NS = Math.round(SR * dur), L = new Float32Array(NS), R = new Float32Array(NS);
  const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  const env = (t, t0, t1) => smooth((t - t0 + .6) / 1.5) * (1 - smooth((t - t1 + .2) / 1.4));
  const add = (t0, len, fn, pan = .5) => { const s0 = Math.floor(t0 * SR); for (let k = 0; k < len * SR && s0 + k < NS; k++) { if (s0 + k < 0) continue; const v = fn(k / SR); L[s0 + k] += v * (1 - pan); R[s0 + k] += v * pan; } };
  return {
    dur, NS, L, R, add, rnd,
    pad(t0, t1, notes, gain = .028) { for (const m of notes) for (const cents of [-7, 0, 7]) {
      const f = mtof(m) * Math.pow(2, cents / 1200), pan = .5 + cents / 30, ph = rnd() * 6.28;
      for (let i = Math.max(0, Math.floor((t0 - .6) * SR)), e = Math.min(NS, Math.floor((t1 + 1.2) * SR)); i < e; i++) {
        const t = i / SR, w = 2 * Math.PI * f * t + ph;
        const v = (Math.sin(w) + .42 * Math.sin(2 * w) + .2 * Math.sin(3 * w) + .09 * Math.sin(4 * w)) * env(t, t0, t1) * gain * (1 + .15 * Math.sin(t * .7 + ph));
        L[i] += v * (1 - pan * .6); R[i] += v * (.4 + pan * .6); } } },
    bass(t0, t1, m, gain = .11) { const f = mtof(m + 12);
      for (let i = Math.max(0, Math.floor((t0 - .6) * SR)), e = Math.min(NS, Math.floor((t1 + 1.2) * SR)); i < e; i++) { const t = i / SR, v = (Math.sin(2 * Math.PI * f * t) + .25 * Math.sin(4 * Math.PI * f * t)) * env(t, t0, t1) * gain; L[i] += v; R[i] += v; } },
    pluck(t, m, amp = .055, pan = .5) { const f = mtof(m + 12); add(t, 1.1, x => (Math.sin(2 * Math.PI * f * x) + .3 * Math.sin(4 * Math.PI * f * x)) * Math.exp(-x / .28) * Math.min(1, x / .004) * amp, pan); },
    chime(t, m, amp = .07) { const f = mtof(m); add(t, 2.4, x => (Math.sin(2 * Math.PI * f * x) + .5 * Math.sin(2 * Math.PI * f * 2.76 * x) * Math.exp(-x / .25) + .25 * Math.sin(2 * Math.PI * f * 5.4 * x) * Math.exp(-x / .12)) * Math.exp(-x / .7) * Math.min(1, x / .002) * amp, .55); },
    thud(t, amp = .32) { let lp = 0; add(t, .6, x => { lp += .08 * ((rnd() * 2 - 1) - lp); return (Math.sin(2 * Math.PI * (60 + 40 * Math.exp(-x / .05)) * x) * .5 + lp * 1.6) * Math.exp(-x / .15) * amp; }); },
    pulse(t, amp = .3) { add(t, .32, x => Math.sin(2 * Math.PI * (45 + 50 * Math.exp(-x / .04)) * x) * Math.exp(-x / .12) * amp); },
    // reverb, fade in/out, normalise, write
    write(file) {
      const master = t => smooth(t / 1.2) * (1 - smooth((t - (dur - 2.4)) / 2.2));
      const reverb = (x, off) => { const combs = [1557, 1617, 1491, 1422].map(d => ({ b: new Float32Array(d + off), i: 0, s: 0 })), aps = [225, 556].map(d => ({ b: new Float32Array(d + off), i: 0 }));
        const out = new Float32Array(NS); let lp = 0;
        for (let n = 0; n < NS; n++) { lp += .35 * (x[n] - lp); let y = 0;
          for (const c of combs) { const o = c.b[c.i]; c.s = o * .7 + c.s * .3; c.b[c.i] = lp + c.s * .84; c.i = (c.i + 1) % c.b.length; y += o; }
          for (const a of aps) { const o = a.b[a.i], o2 = -.5 * y + o; a.b[a.i] = y + .5 * o2; y = o2; a.i = (a.i + 1) % a.b.length; }
          out[n] = (lp * .78 + y * .07) * master(n / SR); }
        return out; };
      const oL = reverb(L, 0), oR = reverb(R, 23);
      let peak = 1e-6; for (let n = 0; n < NS; n++) peak = Math.max(peak, Math.abs(oL[n]), Math.abs(oR[n]));
      const g = .89 / peak, buf = Buffer.alloc(44 + NS * 4);
      buf.write('RIFF', 0); buf.writeUInt32LE(36 + NS * 4, 4); buf.write('WAVEfmt ', 8); buf.writeUInt32LE(16, 16); buf.writeUInt16LE(1, 20); buf.writeUInt16LE(2, 22);
      buf.writeUInt32LE(SR, 24); buf.writeUInt32LE(SR * 4, 28); buf.writeUInt16LE(4, 32); buf.writeUInt16LE(16, 34); buf.write('data', 36); buf.writeUInt32LE(NS * 4, 40);
      for (let n = 0; n < NS; n++) { buf.writeInt16LE(Math.round(cl(oL[n] * g, -1, 1) * 32767), 44 + n * 4); buf.writeInt16LE(Math.round(cl(oR[n] * g, -1, 1) * 32767), 46 + n * 4); }
      writeFileSync(file, buf);
    },
  };
}
