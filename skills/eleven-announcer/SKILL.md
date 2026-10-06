---
name: eleven-announcer
description: Record a narrated walkthrough video of a feature we just shipped. Claude explores the deployed app live, scripts the walkthrough, replays it in a browser with a visible cursor and zooms, and voices it with the team's ElevenLabs voice, adding subtitles, a branded title card and an Aomi outro. Use this whenever someone has deployed or finished something with a UI and wants to show it off or explain it, e.g. "record a demo of the new fuzzer", "make a walkthrough video of the dashboard we shipped", "announce this feature with a voice-over", "screen-record how to use X", "make a loom-style video of the PR", even if they don't mention ElevenLabs or recording. For chain-verified Aomi agent demos use demo-director; for explaining a slide deck use slide-to-video.
---

# Eleven Announcer

Show what we shipped, explained by a voice that walks the viewer through it the way a teammate would at their desk. The finished video is:
- a branded title card;
- the live app in a clean browser window, with a drawn cursor, click ripples and the camera easing in on whatever is being used;
- the ElevenLabs voice, with subtitles, over a light music bed;
- the Aomi logo at the end.

The method is **explore live, then record a replay**. You first use the real app interactively, with the built-in browser or computer use, to learn the feature. You then write the walkthrough as a script of steps, and `record.mjs` replays it cleanly. A replay has none of the dead time an agent spends thinking. It can be re-recorded after a UI fix, and every step is timed to its voice line.

## Workflow

### 1. Understand what shipped

Read the PR, diff, changelog or README so the narration is accurate. Then get from the user:
- **The URL** of the deployed app (staging is fine), and whether it needs sign-in.
- **The story in one breath:** who it's for, what problem it removes, and the moment that proves it works (the fuzzer finds a bug, the dashboard shows the spike).
- **Safe test data**, e.g. a test project, a testnet wallet, a demo account. Every action replays against the live app on each recording, so steps must be safe to repeat.

### 2. Sign in (if the app needs it)

The user signs in; Claude never types passwords. Run in the background:

```bash
node skills/eleven-announcer/scripts/login.mjs https://studio.example.com
```

A browser window opens. The user signs in and closes the window. The session is saved outside the repo to `~/.config/eleven-announcer/auth/<host>.json` (mode 600), and `record.mjs` reuses it automatically. Never copy session files into the project or a commit; they're live credentials.

### 3. Explore live

Walk the feature yourself before scripting it. Use the built-in browser tools (`read_page`, `find`, `computer`) for web apps, or computer use for anything outside a browser. Note:
- the shortest path from landing to the proof moment;
- **stable selectors**, preferring what a user sees: `role=button[name="Run fuzz"]`, `text=Findings`, `[data-testid=…]`. Avoid brittle CSS chains;
- what needs waiting for (a run finishing, a chart loading) and how long it takes;
- anything sensitive on screen (API keys, personal data, internal URLs) that the walkthrough should avoid.

Ask before any action with real side effects: spending funds, sending messages, deleting data, deploying to production.

### 4. Script the walkthrough (approval gate)

Copy `assets/walkthrough-template.mjs` to `deliverables/videos/<slug>/walkthrough.mjs` (along with `assets/compositor.html` and `assets/music.mjs`). Write `META` (title, subtitle, eyebrow, link) and the `STEPS`. One step is one thing the viewer should notice, with one voice line. Format details are in `references/walkthrough.md`.

Show the user a table (step → what happens on screen → voice line) and wait for approval. Narration changes are cheap now and costly after voicing.

**The voice.** Demo it like you're showing a teammate, in plain explaining sentences.
- **Open** with the problem and who it's for, not a slogan.
- **Each step** says what we're doing, then what to look at.
- **At the proof moment,** say what it means.
- **Close** with where to find it.

Follow `TONE.md`: concrete, no hype words, the product's own names. Spell out anything a voice would misread ("zero-point-five"), and map it back for subtitles in `DISPLAY`.

### 5. Dry run (draft voice, no credits)

```bash
node skills/eleven-announcer/scripts/record.mjs deliverables/videos/<slug>          # add --headed to watch it
node skills/eleven-announcer/scripts/tts.mjs deliverables/videos/<slug> --draft      # macOS voice, timings estimated
node skills/eleven-announcer/scripts/compose.mjs deliverables/videos/<slug>
node skills/slide-to-video/scripts/render.mjs deliverables/videos/<slug>/compositor.html --out /tmp/<slug>-stills --stills 2,8,15,22
```

- If a step fails, `record.mjs` names it and saves `rec/error-step-N.png`. Fix the selector or wait, then re-run.
- Check the stills: the cursor lands on the right thing, zooms frame the action, no secrets are on screen, and subtitles don't cover the key UI.
- Optionally send a draft preview: render all frames, then run `finish.mjs` (step 6).

### 6. Final voice and delivery

```bash
ELEVEN_API_KEY=… ELEVEN_VOICE_ID=… node skills/eleven-announcer/scripts/tts.mjs deliverables/videos/<slug> --force
node skills/eleven-announcer/scripts/compose.mjs deliverables/videos/<slug>
node skills/slide-to-video/scripts/render.mjs deliverables/videos/<slug>/compositor.html --out /tmp/<slug>-frames
node skills/slide-to-video/scripts/finish.mjs deliverables/videos/<slug> /tmp/<slug>-frames
```

`finish.mjs` places each voice line, ducks the music, levels to -16 LUFS, and writes `<slug>.mp4` and `<slug>-preview.mp4`; the preview stays under 30 MB so it reaches a phone.
- Send the preview and `<slug>.srt`, and give the full-quality path.
- Commit `walkthrough.mjs`, `vo/` and the `.srt`. Keep `rec/` (raw frames), the `.mp4` files and session files out of git.
- The ElevenLabs key comes from the environment only, never a file. If the user pasted it in chat, suggest rotating it.

## How the edit works

`compose.mjs` makes the edit from the recording and the voice:
- **Static stretches are cut.** More than 1.2 s with no repaint (a backend thinking) becomes 0.3 s.
- **Long progress can be sped up.** `speed: N` plays a step faster when the progress itself is worth showing.
- **The voice sets the pace.** Each step holds its last frame until its line finishes, so the voice never gets cut off.
- **The camera follows the action.** It eases toward each clicked, typed or `focus`ed element (up to 1.5×) and back out between steps. Large targets stay at full view.

Details and failure modes are in `references/editing.md`.

## Files

- `scripts/login.mjs`: the user signs in once and the session is saved outside the repo.
- `scripts/record.mjs`: replays `walkthrough.mjs` with a drawn cursor and records repaint-timed frames.
- `scripts/tts.mjs`: ElevenLabs clips with word timings, or `--draft` with the macOS voice.
- `scripts/compose.mjs`: the edit, subtitles and `.srt`.
- `scripts/browser.mjs`: finds Playwright and its browsers.
- `assets/compositor.html`: the branded video page, using the `__AOMI_VIDEO__` contract.
- `assets/music.mjs`: a light synthesized bed that changes chord per step.
- `assets/walkthrough-template.mjs`: the step format, with examples.
- Rendering and mixing reuse `skills/slide-to-video/scripts/render.mjs`, `finish.mjs` and `contact-sheet.sh`.
