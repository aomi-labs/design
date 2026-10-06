# The edit: how compose.mjs and the compositor work

## Recording

- `record.mjs` uses the Chrome DevTools screencast. It delivers one JPEG per repaint, with an exact timestamp, at the viewport's device scale (default 1600×900 at 1.5×, so zooms stay sharp).
- Static moments produce no frames, which is how the edit can find and cut them.
- The cursor is a drawn overlay injected into every page: it glides with eased CSS motion, and a sky ripple marks clicks. Headless browsers don't paint a real cursor.
- Recording runs in Playwright's headless shell, at an exact viewport, without a visible window. Add `--headed` to watch the replay in a full browser while debugging.
- `rec/record.json` holds, per step: the start time `t0`, when its first page had loaded (`tReady`), the end time `t1`, each focus box with its time, and the final URL. It also lists every frame with its timestamp.

## Edit rules (`compose.mjs`)

1. **Intro.** A title card for `META.intro` seconds (default 3.4). The browser window rises in as it ends.
2. **Per step:**
   - The footage starts at `tReady` (after the page loads), or at `t0`.
   - **Static cut:** any stretch over 1.2 s with no new frame becomes 0.3 s. Waiting on a backend costs nothing.
   - **Speed:** non-static footage plays at `1/speed`.
   - **Voice:** the line starts 0.35 s into the step, or just after the actions finish when `voAt: 'end'`. The step lasts until the line ends plus 0.45 s, holding the last frame if the footage is shorter.
   - **Camera:** for each focus box, zoom `s = min(0.62·VW/w, 0.62·VH/h)`, clamped between 1 and 1.5. The camera eases in over the 0.7 s around the action, centred on the element and kept inside the frame. It eases back to full view at the end of the step unless `keepZoom` is set.
3. **Outro.** `META.outro` seconds (default 4.6): a paper veil, the Aomi lockup, the title and the link.
4. **Subtitles** come from the ElevenLabs word timings: one sentence per cue, split at a clause past 58 characters. The written forms come from `DISPLAY`.

`timeline.js` carries the output-time → recording-time map, the zoom keyframes, the step chips and URLs, the cues and the frame list. `vo/timeline.json` gives `finish.mjs` the clip placements.

## Compositor look

- The 1920×1080 stage uses paper with the faint brand grid. The app sits in a 1600-px-wide window with a soft shadow.
- The window bar shows three neutral dots, the step chip ("02 · Start a fuzz run") and a URL pill.
- Subtitles are white Geist 34 px on a dark box, bottom centre. Keep key UI out of the bottom 120 px of the viewport at the proof moment, or zoom to it.
- Brand colours come from `src/tokens/tokens.css`: sky for the cursor ripple and accents. The lilac ramp is retired.

## Failure modes

| Symptom | Cause | Fix |
|---|---|---|
| `step N failed: locator.waitFor timeout` | Wrong selector, or the element is hidden behind a tab or menu | Check `rec/error-step-N.png`; open the parent first, or use a user-facing locator |
| The first seconds show a blank page | The footage started before load | Make `goto` the step's first action (the edit starts at `tReady`), then add a short `wait` |
| No zoom on a click | The element is large (a full-height strip, a whole card), so it fits at 1× | Expected. Use `focus` on a smaller child to draw the eye there |
| The zoom crops the context | A tiny focus box hit `maxZoom` | Lower `maxZoom` on that step, or focus the containing panel |
| Logged-out page in the recording | No saved session for that host, or it expired | Re-run `login.mjs <url>` (the user signs in again) |
| Long frozen frame mid-step | A voice line much longer than the action | Tighten the line, or add a `wait` with something visibly happening |
| Frames out of order after a re-record | Old frames were left in `rec/` | `record.mjs` clears `rec/` on every run, so don't render from a stale copy |
| `playwright-core not found` | No Playwright in the project | `npm i -D playwright-core`, or set `PW_CORE=/path/to/node_modules/playwright-core` |
