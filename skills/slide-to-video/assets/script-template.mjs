// Voice-over script → vo/script.mjs in the production folder.
//
// Times are on the film's ORIGINAL (silent) clock — the `t` that film.html's seek(t) understands.
//   start    where the line begins (the stretch since the previous line plays at normal speed)
//   anchors  [spoken word, occurrence, film time]: that word lands exactly when that animation happens.
//            Pick the word that names the thing moving (e.g. 'fails' ↔ the card turning rose).
//            Anchors must increase in both word order and film time.
//   end      where the line should finish on the film clock
// build-timeline.mjs stretches the picture between these points to fit the voice.
export const OLD_END = 22;     // last frame of the silent cut (DUR in film.html)
export const END_HOLD = 1.5;   // extra hold on the final frame after the last line
export const DISPLAY = [       // spoken form → subtitle form
  ['zero-point-five', '0.5'],
  ['aomi dot dev', 'aomi.dev'],
];

export const LINES = [
  { id: 1, start: .6, end: 3.6,
    text: "Say you ask an AI agent to swap 500 USDC. That request is an intent.",
    anchors: [['intent', 1, 3.0]] },
  { id: 2, start: 5.0, end: 10.4,
    text: "Before it settles, the transaction is built and then checked. Only a transaction that passes the check moves on.",
    anchors: [['built', 1, 7.6], ['checked', 1, 8.6], ['passes', 1, 8.8]] },
  { id: 3, start: 12.4, end: 16.6,
    text: "The check is enforced by a contract. If a transaction stays under the cap, the rule lets it through.",
    anchors: [['contract', 1, 12.8], ['cap', 1, 14.6], ['through', 1, 15.4]] },
  { id: 4, start: 19.4, end: 21.2,
    text: "That's how Aomi takes an intent to settlement. Read more at aomi dot dev.",
    anchors: [['Aomi', 1, 20.6]] },
];
