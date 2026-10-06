---
name: slide-to-video
description: Turn an Aomi slide deck (or one research slide, or a research post) into a narrated explainer film. A 3D world the camera flies through, with one station per slide, flattening into clean 2D diagrams wherever a concept needs explaining. ElevenLabs voice-over is pinned word-by-word to the animation, with burned-in subtitles, an .srt and a synthesized music bed. Use this whenever someone wants to make a video, film, explainer, animation, clip or "video version" of a deck, talk, slide, research article or concept walkthrough. Also use for adding or fixing voice-over, narration or subtitles on such a film, or for re-cutting or re-timing an existing deck film, even if they don't say "slides". For announcement, launch or partnership promos without a deck to teach from, use make-aomi-video instead.
---

# Slide to Video

Make an explainer that *teaches* what a deck says. The viewer should understand the mechanism by the end, not just have seen it move. Three ideas carry the whole method:

1. **The script leads.** Write and approve the narration before building picture. The film is retimed to the voice, never the voice to the film.
2. **3D carries, 2D explains.** One continuous 3D world gives the film momentum and continuity. At each concept the camera flattens into a 2D diagram, built up in the order the voice explains it.
3. **One object tells the story.** A single hero object (an intent, a transaction, a request) travels through every scene, so the viewer always knows where they are.

`assets/film-template.html` has all the machinery: the 3D world, camera route, flatten windows, 2D layer, subtitles, voice time-warp, logo outro and the shared seek contract. You write the scenes. `deliverables/videos/three-gates/` is a complete worked example: 13 slides, 3:33, narrated.

## Workflow

### 1. Intake

Read the deck end to end, plus any research post it came from. Then settle these with the user:

- **Which deck and slides.** "The whole deck" is common. Note which slides are diagrams and which are prose.
- **Where it will play, and how long it can be.** X caps uploads at 2:20 for non-Premium accounts. Explainers with real narration run about 15–25 seconds per slide, so a 13-slide deck lands around 3–3.5 minutes. Say this early; it decides how much script fits.
- **Voice.** ElevenLabs voice ID, and a key passed as an environment variable at run time. Never write it into a file. If the key was pasted into chat, suggest rotating it afterwards.
- **Sound.** The default is the synthesized music bed in `assets/music-template.mjs`, which needs no licensing. Use the user's own track if they give one.

Don't propose a competing structure to the user's deck or outline. Map *their* slides to scenes.

### 2. Scene plan and script (approval gate)

Make one table: slide → scene → **3D or 2D** → what moves → voice-over line. Read `references/visual-grammar.md` to decide 3D vs 2D for each slide, and `references/narration.md` to write the lines.

The narration explains like a teacher, in this order: what happens → why it matters → which part of the system it is. Use full sentences. No slogans ("Signed. Packed. Settled.") and no taglines dressed up as explanation. Check against `TONE.md` too.

Show the table and wait for approval. Users rewrite lines here, often heavily, and that's the point. Changing a line now costs nothing; after rendering it costs a re-voice and a re-time.

### 3. Build the silent film

Make the production folder `deliverables/videos/<slug>/` and copy in the template and music:

```bash
mkdir -p deliverables/videos/<slug>/vo
cp skills/slide-to-video/assets/film-template.html deliverables/videos/<slug>/film.html
cp skills/slide-to-video/assets/music-template.mjs deliverables/videos/<slug>/music.mjs
```

Replace the example scenes with yours. Keep the silent timeline brisk, about 5–8 seconds per scene; the voice will stretch it. While building, check stills, not videos:

```bash
node skills/slide-to-video/scripts/render.mjs deliverables/videos/<slug>/film.html --out /tmp/<slug>-stills --stills 2,6.5,9,14
bash skills/slide-to-video/scripts/contact-sheet.sh /tmp/<slug>-sheet.jpg /tmp/<slug>-stills/*.jpg   # up to 4 per sheet
```

Look at every sheet before a full render. A scene that reads wrong as a still reads wrong in motion.

### 4. Review rounds

Render the silent cut, make a preview under 30 MB (that size reaches the user's phone) and send it:

```bash
node skills/slide-to-video/scripts/render.mjs deliverables/videos/<slug>/film.html --out /tmp/<slug>-frames
node skills/slide-to-video/scripts/finish.mjs deliverables/videos/<slug> /tmp/<slug>-frames --no-voice
```

Users usually give notes in several messages ("hold on, there's more"). When they say so, acknowledge each note with how you'll fix it, then wait until they say they're done before changing anything. Batching saves a re-render per note and lets fixes stay consistent with each other.

### 5. Voice-over and subtitles

1. Write `vo/script.mjs` from `assets/script-template.mjs`. Each line has a film-clock `start` and `end`, plus **anchors**: `[spoken word, occurrence, film time]` pairs that pin a word to the moment its animation happens. Anchor the word that names the motion: "fails" when the card turns rose, "rules" when the rules appear. About 3–8 anchors per line.
2. Voice it. Each line is its own clip, with word timestamps:
   ```bash
   ELEVEN_API_KEY=… ELEVEN_VOICE_ID=… node skills/slide-to-video/scripts/tts.mjs deliverables/videos/<slug>
   ```
   Re-voice single lines by id after edits: `… tts.mjs <dir> 4 7`.
3. Build the timeline. This writes the time-warp, the subtitle cues and `<slug>.srt`:
   ```bash
   node skills/slide-to-video/scripts/build-timeline.mjs deliverables/videos/<slug>
   ```
   Fix any "speeds up" or "non-monotonic" warnings by moving an anchor or the animation time. If the picture has to run faster than the voice, the line is describing something the scene doesn't show yet.
4. Check narrated stills (time is now the narrated clock), then render, mix and encode:
   ```bash
   node skills/slide-to-video/scripts/render.mjs deliverables/videos/<slug>/film.html --out /tmp/<slug>-frames
   node skills/slide-to-video/scripts/finish.mjs deliverables/videos/<slug> /tmp/<slug>-frames
   ```
   `finish.mjs` places each clip, ducks the music under the voice, levels to -16 LUFS, and writes `<slug>.mp4` and `<slug>-preview.mp4`.

### 6. Deliver

Send the preview (and the `.srt`) to the user and give the full-quality path. Report the length against the platform limit. Keep the `.mp4` files and frames out of git: commit the source, `vo/` and the `.srt`. Before encoding, `references/pipeline.md` has a list of failure modes worth knowing.

## Non-negotiables, and why

- **Explain, don't decorate.** Every shot answers "what is happening to the object right now?" A 3D shot that only looks good, like rings flying past or a black ball, gets cut in review. Ask what each moving thing *means* before animating it.
- **2D wherever a concept is explained.** Diagrams are clearer than perspective. Use the slide's own diagram and labels, built up step by step. Never show it all at once.
- **The problem and the payoff share one picture.** If a slide sets up risks, show the same pills or lanes again when they get resolved, so the payoff is visibly the answer to the setup.
- **Brand.** Use the current tokens (`src/tokens/tokens.css`); 3D structure is grey, never black. Sky means passed and rose means failed. The lilac ramp is retired. Use the real logo and icons from `assets/`, and end on the real mark.
- **The picture follows the voice.** Never speed up speech to fit a scene. Subtitles come from the word timings, so they're always in sync.
- **Secrets.** API keys go in environment variables, never into files, commits or logs.

## Files

- `assets/film-template.html`: the film machinery plus three example scenes (3D intent, 2D pipeline, 3D gate) and the logo outro. It exposes `window.__AOMI_VIDEO__`, the same seek contract as `skills/make-aomi-video`, so that skill's capture tools work on it too.
- `assets/script-template.mjs`, `assets/music-template.mjs`: the voice-over script and music bed, both written on the silent film clock.
- `scripts/render.mjs`: parallel JPEG frames or stills. `scripts/tts.mjs`: ElevenLabs clips. `scripts/build-timeline.mjs`: the warp, subtitles and .srt. `scripts/finish.mjs`: mix and encode. `scripts/contact-sheet.sh`: 2×2 review sheets.
- `references/visual-grammar.md`: deciding 3D vs 2D, the flatten move, scene recipes and continuity devices. Read it before planning scenes.
- `references/narration.md`: writing the script, choosing anchors, subtitle rules, length budgeting.
- `references/pipeline.md`: how the clocks and warp work, rendering, mixing, and the failure modes we've hit.
