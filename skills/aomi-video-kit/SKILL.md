---
name: aomi-video-kit
description: The one source of truth for how every Aomi video looks and sounds, and the scripts that apply it. Use before voicing, rendering, mixing or checking any Aomi video, in this repo or another one (a teammate's agent making a recap, an update, a demo). It fixes the team voice and its ElevenLabs settings, the fonts, the colours, the title card, the subtitles, the outro lockup, the music bed, the loudness and the delivery format. The story itself comes from slide-to-video (explain a deck), eleven-announcer (walk through a shipped feature) or make-aomi-video (a campaign); each of those renders through this kit.
---

# Aomi video kit

Every Aomi video is the same voice, the same type, the same ending and the same beat, whoever's agent makes it. The kit is `kit.json` (the values), `kit.css` + `kit.js` (the look, copied into each production) and `scripts/` (voice, music, render, mix, check). Nothing brand is written in a film by hand.

| | Fixed by the kit | Where |
|---|---|---|
| Voice | ElevenLabs voice `sWsBiVcjjowceAScTnu3`, `eleven_multilingual_v2`, stability .5 / similarity .75 / style 0, seed 7, about 2.5 words a second | `kit.json` → `voice.mjs` |
| Type | PT Serif headlines, Geist body and subtitles, Geist Mono labels, Source Serif 4 wordmark | `kit.css` |
| Colour | ink on paper, sky for ours / passed / active, rose for failed, cool greys for structure; mirrors `src/tokens/tokens.css` | `kit.css`, checked by `check.mjs` |
| Title card | eyebrow with a sky dot, serif headline, one-line subtitle, 3.4 s | `kit.js` `K.title` |
| Subtitles | white Geist 34 px on a dark box, bottom centre, one sentence per cue, split past 58 characters | `kit.js` + `subtitles.mjs` |
| Outro | paper veil, the mark + "aomi" wordmark, the title, the link, 4.6 s; the video ends on it | `kit.js` `K.outro` |
| Music | D, 100 bpm, Dadd9 → Bm7 → Gmaj7 → A per scene, plucked arpeggio, the two-note chime as the logo appears | `music.mjs` on `synth.mjs` |
| Mix | voice on top, music ducked under it, −16 LUFS | `finish.mjs` |
| Delivery | 1920×1080, 30 fps, H.264 crf 18, plus a preview under 30 MB; X caps at 2:20 | `finish.mjs`, `check.mjs` |

## Install (another repo)

1. Copy `skills/aomi-video-kit/` into the repo, beside `skills/slide-to-video/` or `skills/eleven-announcer/` if the story method is one of those.
2. `npm i -D playwright-core && npx playwright install chromium-headless-shell`, and `ffmpeg` on the path.
3. `export ELEVEN_API_KEY=…` in the shell (the team key, from Cecilia; never in a file or a commit). The voice ID is already in `kit.json`.

Done when `node skills/aomi-video-kit/scripts/voice.mjs --draft` and `check.mjs` run on a production.

## Workflow

Every production is one folder, `deliverables/videos/<slug>/`, with `kit/` inside it.

1. **Scaffold.** `node skills/aomi-video-kit/scripts/new.mjs deliverables/videos/<slug> [--starter|--film|--walkthrough]`. `--starter` is a 2D announcement film (title → scene cards → outro): the right shape for a monthly update or a recap. `--film` and `--walkthrough` hand the story to slide-to-video and eleven-announcer; read that skill next. Done when the folder has `kit/`, a film and a script.
2. **Write the film and the script.** The film edits `META` and `SCENES` (starter) or the scenes (film); the brand parts come from `K.title`, `K.outro`, `K.chapter`, `K.film` in `kit/kit.js`. The script is `vo/script.mjs` (or the walkthrough's `say` lines), written to be spoken, in `TONE.md`'s voice: the mechanism, the product's own names, no hype words. Show the user the lines and wait for approval before voicing. Done when the user has approved every line.
3. **Voice.** `node skills/aomi-video-kit/scripts/voice.mjs deliverables/videos/<slug>` (`--draft` for a macOS stand-in while iterating; `--force` or ids to re-voice). Then build the timeline with the story skill's script (`build-timeline.mjs` or `compose.mjs`). Done when every line has a clip and `vo/timeline.json` exists.
4. **Render.** `node skills/aomi-video-kit/scripts/render.mjs deliverables/videos/<slug>/film.html --out /tmp/<slug>-frames`. Check stills first (`--stills 2,8,15`): text inside the frame, nothing in the bottom 120 px under the subtitles, the last still is the lockup. Done when every still reads right.
5. **Finish.** `node skills/aomi-video-kit/scripts/finish.mjs deliverables/videos/<slug> /tmp/<slug>-frames`. The bed is the production's `music.mjs` if it has one, else the kit's signature bed. Done when `<slug>.mp4` and `<slug>-preview.mp4` exist.
6. **Check.** `node skills/aomi-video-kit/scripts/check.mjs deliverables/videos/<slug>`. Done when it prints `all good`; fix every FAIL, read every warn.
7. **Deliver.** Send the preview and the `.srt`; give the full-quality path. Commit the film, the script, `vo/`, `kit/` and the `.srt`; the `.mp4` files and frames stay out of git.

## Three ways in

- **Whole pipeline** (above): the film is HTML on the kit's playback contract, so `render.mjs` draws it.
- **Frames from elsewhere** (an editor, another renderer): skip step 4, point `finish.mjs` at your `f00000.jpg…` sequence at 30 fps, 1920×1080, and keep `vo/timeline.json` for the clip placements. You still get the voice, the bed, the mix and the format.
- **Grading only**: `check.mjs` on a folder with a `<slug>.mp4` tells you whether a finished video matches the frame, loudness, length and ending.

## Files

- `kit.json`: every value above. Edit it first; `kit.css` mirrors it and `check.mjs` verifies the mirror.
- `kit.css`, `kit.js`: the look and the shared machinery, copied into each production by `new.mjs` (`--refresh` after a kit change).
- `scripts/voice.mjs`: the team voice, per line, with word timings. `scripts/subtitles.mjs`: cue splitting and `.srt`.
- `scripts/music.mjs`, `scripts/synth.mjs`: the signature bed and the instruments it is played on.
- `scripts/render.mjs`, `scripts/finish.mjs`: frames, mix, encode. `scripts/check.mjs`: the brand check. `scripts/new.mjs`: scaffold.
- `assets/film-starter.html`, `assets/script-template.mjs`: the announcement starter.
