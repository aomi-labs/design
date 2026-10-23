# Aomi Task API: narrated explainer

A 3:21 narrated film of the Task API post (`staging.aomi.dev/research/introducing-the-aomi-task-api`). It opens
on what the product does: "Announcing Aomi Task API", then a treasury agent's FX intent runs through Aomi's harness
on an internal fork of Arc and comes back as a signed outcome fingerprint; the buyer pays 3% of the USDC it moves
over x402, then signs and broadcasts itself; then a real purchase on Arc Mainnet. Then why it matters: x402 settles
fair exchange over data, but the outcome of a service can't be checked before delivery (people can't either: a
contractor); machine services can. It ends on the thesis, the trust boundary and the TEE on the roadmap.

The 3D is drawn like the Aomi isometric posts: grey plinths with cubes (agent, Aomi harness, wallet, Arc) joined by
pale-blue pipes. Scenes are authored on one clock and `EDIT` in `film.html` plays them in this order.

The FX intent and its fingerprint are an example (swap routing is on the roadmap; the corner tag says so). Scene 6
is not: it is Cecilia's live take of 23 Oct 2026 (0.10 + 0.20 USDC, 0.01 USDC to prepare, 0.009 USDC to retrieve).

| File | What it is |
|---|---|
| `film.html` | The whole film as `seek(t)`, with the voice-over warp and burned-in subtitles. `?t=112` jumps to a moment. |
| `music.mjs` | Original synthesized bed (A minor, 124 bpm, four-on-the-floor) on the film clock, moved onto the narrated clock |
| `vo/script.mjs` | Voice-over lines with word → animation anchors |
| `vo/lineNN.{mp3,json}` | ElevenLabs clips (team voice) and their word timings |
| `vo/timeline.{json,js}`, `task-api.srt` | Built by `build-timeline.mjs` |
| `research/live-events.json`, `research/live-proof.json` | The live take's own log and receipts, written by the run |
| `research/live-log.js` | That log as terminal rows; scene 6 rebuilds the window from it where the screen capture went black |
| `live-overlay.mjs` | Lays the clear stretches of the screen recording (`research/live-take.mov`, not in git) into scene 6 |

Re-render (the `.mp4` files, the `.mov` and frames stay out of git):

```bash
node skills/slide-to-video/scripts/build-timeline.mjs deliverables/videos/task-api
node skills/slide-to-video/scripts/render.mjs deliverables/videos/task-api/film.html --out /tmp/task-api-frames
node skills/slide-to-video/scripts/finish.mjs deliverables/videos/task-api /tmp/task-api-frames
node deliverables/videos/task-api/live-overlay.mjs
```
