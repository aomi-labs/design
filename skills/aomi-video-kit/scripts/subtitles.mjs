// Subtitles from ElevenLabs word timings: one sentence per cue, long ones split at a clause.
// Shared by compose.mjs (eleven-announcer) and build-timeline.mjs (slide-to-video) so every video splits the same way.
import { KIT } from './kit.mjs';

// character alignment (ElevenLabs `alignment`) → [{ w, s, e }] words
export const words = al => { const out = []; let cur = null;
  al.characters.forEach((ch, i) => { if (/\s/.test(ch)) { if (cur) out.push(cur); cur = null; return; }
    if (!cur) cur = { w: '', s: al.character_start_times_seconds[i], e: 0 }; cur.w += ch; cur.e = al.character_end_times_seconds[i]; });
  if (cur) out.push(cur); return out; };

// spoken form → written form ("aomi dot dev" → "aomi.dev"), from a production's DISPLAY list
export const displayer = (DISPLAY = []) => t => DISPLAY.reduce((s, [from, to]) => s.replace(new RegExp(from, 'gi'), to), t);

// cues for one clip's words, placed at `start` on the output clock
export function cues(ws, start, display = t => t, max = KIT.subtitles.max_chars, tail = KIT.subtitles.tail_seconds) {
  const text = w => display(w.map(x => x.w).join(' '));
  const split = w => { // ≤max chars per cue: split at the clause nearest the middle, else the word nearest it
    if (text(w).length <= max) return [w];
    const total = text(w).length; let best = -1, bestScore = Infinity;
    for (const clause of [true, false]) {
      w.forEach((x, i) => { if (i === w.length - 1 || (clause && !/[,;:]$/.test(x.w))) return;
        const left = text(w.slice(0, i + 1)).length; if (left < 12 || total - left < 12) return;
        const score = Math.abs(left - total / 2); if (score < bestScore) { bestScore = score; best = i; } });
      if (best >= 0 && (!clause || bestScore < total * .3)) break; best = -1; bestScore = Infinity;
    }
    return [...split(w.slice(0, best + 1)), ...split(w.slice(best + 1))];
  };
  const out = []; let sentence = [];
  ws.forEach((x, i) => { sentence.push(x); if (/[.?!]$/.test(x.w) || i === ws.length - 1) {
    split(sentence).forEach(c => out.push({ s: start + c[0].s, e: start + c.at(-1).e + tail, text: text(c) })); sentence = []; } });
  return out;
}

// cues never overlap; times rounded for the json
export const tidy = all => { all.forEach((c, i) => { if (all[i + 1]) c.e = Math.min(c.e, all[i + 1].s - .04); c.s = +c.s.toFixed(3); c.e = +c.e.toFixed(3); }); return all; };

const ts = t => { const ms = Math.round(t * 1000); return `${String(Math.floor(ms / 3600000)).padStart(2, '0')}:${String(Math.floor(ms / 60000) % 60).padStart(2, '0')}:${String(Math.floor(ms / 1000) % 60).padStart(2, '0')},${String(ms % 1000).padStart(3, '0')}`; };
export const srt = all => all.map((c, i) => `${i + 1}\n${ts(c.s)} --> ${ts(c.e)}\n${c.text}\n`).join('\n');
