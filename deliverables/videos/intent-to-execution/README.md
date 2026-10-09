# From intent to execution: narrated explainer

A 3:35 narrated film of the execution half of the EasyCon (EVM) and Breakpoint (Solana) decks
(`scrum.aomi.dev/from-intent-to-exe-breakdown`, `…-solana`). A person asks an AI for a DeFi action on
Ethereum and on Solana; the same model runs it as Claude Code in a terminal with no harness, and as
Claude through Aomi, side by side. Each detour in the terminal drops a rose "capability defect" pill
into a rail. The punchline (performance, token efficiency, security) comes right after the comparison,
then each pill turns sky at the harness step that fixes it: context instantiation, transaction
construction, simulation (three-gates slide 6, back pressure), account abstraction, signing and
settlement. At the end the fixed pills sort under the three points. Solana is green; EVM is sky.

The Claude Code terminal session is a reconstruction that shows what an agent without a harness has to
do; the narration does not present it as a recorded log. The Aomi column is the trace from the landing page.

| File | What it is |
|---|---|
| `film.html` | The whole film as `seek(t)`, with the voice-over warp and burned-in subtitles. `?t=112` jumps to a moment. The two sessions live in `RUN` at the top. |
| `music.mjs` | Original synthesized bed (F major / D minor, 112 bpm) on the film clock, moved onto the narrated clock |
| `vo/script.mjs` | Voice-over lines with word → animation anchors |
| `vo/lineNN.{mp3,json}` | ElevenLabs clips (team voice) and their word timings |
| `vo/timeline.{json,js}`, `intent-to-execution.srt` | Built by `build-timeline.mjs` |

Re-render (the `.mp4` files and frames stay out of git):

```bash
node skills/slide-to-video/scripts/build-timeline.mjs deliverables/videos/intent-to-execution
node skills/slide-to-video/scripts/render.mjs deliverables/videos/intent-to-execution/film.html --out /tmp/ite-frames
node skills/slide-to-video/scripts/finish.mjs deliverables/videos/intent-to-execution /tmp/ite-frames
```
