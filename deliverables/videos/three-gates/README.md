# Three gates from intent to settlement: narrated explainer

The worked example for `skills/slide-to-video`. A 3:33 narrated film of the deck
`deliverables/decks/three-gate-to-settlement.html` (13 slides): a 3D route through four gates,
flattening into 2D diagrams at the harness, the risk lanes, gate 0.5, gate 1, the risks-resolved
recap and the identity/sessions slide.

| File | What it is |
|---|---|
| `film.html` | The whole film as `seek(t)`, with the voice-over warp and burned-in subtitles. Open it in a browser to play it; `?t=112` jumps to a moment. |
| `music.mjs` | Synthesized music bed on the film clock, moved onto the narrated clock |
| `vo/script.mjs` | Voice-over lines, with word → animation anchors |
| `vo/lineNN.{mp3,json}` | ElevenLabs clips and their word timings |
| `vo/timeline.{json,js}`, `three-gates.srt` | Built by `build-timeline.mjs` |

Re-render (the `.mp4` files and frames stay out of git):

```bash
node skills/slide-to-video/scripts/build-timeline.mjs deliverables/videos/three-gates
node skills/slide-to-video/scripts/render.mjs deliverables/videos/three-gates/film.html --out /tmp/three-gates-frames
node skills/slide-to-video/scripts/finish.mjs deliverables/videos/three-gates /tmp/three-gates-frames
```

Some 3D fills here still use the lilac ramp, which has since been retired. New films use cool greys
(see `skills/slide-to-video/references/visual-grammar.md`).
