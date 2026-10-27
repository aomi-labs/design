// Voice-over script → vo/script.mjs in the production folder. One entry per spoken line.
//
// Times are on the film's own (silent) clock, the `t` that film.html's seek(t) understands:
//   start    where the line begins (the stretch since the previous line plays at normal speed)
//   anchors  [spoken word, occurrence, film time]: that word lands exactly when that animation happens.
//            Pick the word that names the thing moving. Anchors increase in both word order and film time.
//   end      where the line should finish on the film clock
// build-timeline.mjs stretches the picture between these points to fit the voice; the voice is never sped up.
// Write `text` to be spoken ("zero-point-five", "aomi dot dev") and map it back for subtitles in DISPLAY.
export const OLD_END = 22;     // last frame of the silent cut (DUR in film.html)
export const END_HOLD = 1.5;   // extra hold on the lockup after the last line
export const DISPLAY = [       // spoken form → subtitle form (longest first)
  ['aomi dot dev', 'aomi.dev'],
];

export const LINES = [
  { id: 1, start: .6, end: 3.2,
    text: "Here's what's new at Aomi this month.",
    anchors: [] },
  { id: 2, start: 3.6, end: 9.2,
    text: "First, the agentic fuzzer for Arc Studio. It runs attack campaigns on forked chain state, so exploitable call sequences surface before you launch.",
    anchors: [['fuzzer', 1, 3.9], ['forked', 1, 5.4], ['launch', 1, 8.4]] },
  { id: 3, start: 9.6, end: 15.2,
    text: "Second, Aomi is live on Arc mainnet. With the Circle StableFX flow, agents can execute stablecoin transactions on Arc.",
    anchors: [['live', 1, 9.9], ['StableFX', 1, 11.4], ['transactions', 1, 14.0]] },
  { id: 4, start: 15.6, end: 18.2,
    text: "Try it at aomi dot dev.",
    anchors: [['aomi', 1, 16.2]] },
];
