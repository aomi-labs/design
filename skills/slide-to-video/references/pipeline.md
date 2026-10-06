# Pipeline: clocks, rendering, mixing, failure modes

## Two clocks

- **Film clock `t`:** the silent cut. Every animation in `film.html` is written against it: `seek(t)` sets every object, label and SVG element as a pure function of `t`. No timers, no stored state.
- **Narrated clock `T`:** the final video. `vo/timeline.json` holds `anchors: [[T, t], …]`, a piecewise-linear map built by `build-timeline.mjs` from the voice clips' word timings. `seekFilm(T)` maps `T → t`, calls `seek(t)`, and draws the subtitle cue for `T`.
- Between lines the map is 1:1, so travel shots play at normal speed. Inside a line it stretches the picture to the anchors.
- `music.mjs` writes its events on the film clock and maps them with `N(t)`, the inverse map, so the music follows the same warp.
- Want a whole scene longer without narration? Change the film clock (hold keys), then rebuild the timeline.

`window.__AOMI_VIDEO__ = { duration, seek, play, pause }` plus `window.__AOMI_VIDEO_READY__` is the shared contract with `skills/make-aomi-video`. `duration` and `seek` are on the narrated clock once `vo/timeline.js` exists, and on the film clock before that. `?t=12.5` opens the film at a time; `?render` disables autoplay.

## Rendering

- `render.mjs` opens N pages in one headless browser (default 4) and splits the frame range between them, at about 17–40 ms a frame on a laptop. A 3.5-minute film (6,400 frames) renders in a few minutes.
- Frames are named by absolute index (`f00000.jpg`). After retiming one scene, re-render only its range (`--from 36 --to 45`) into the same folder.
- **Browser:** use Playwright's `chromium_headless_shell`, found automatically in `~/Library/Caches/ms-playwright`. WebGL runs and the viewport is exactly 1920×1080. The newer `chrome --headless` screenshot mode crops and offsets the viewport, so don't use it.
- **Playwright:** `render.mjs` looks for `playwright-core` in the current project, then next to the script. Otherwise set `PW_CORE=/path/to/node_modules/playwright-core`, or run `npm i -D playwright-core`.
- The template loads three.js and fonts from CDNs, so rendering needs network on first load.

## Mixing and delivery

- `finish.mjs` places each `vo/lineNN.mp3` at its start time, ducks the music under the voice, levels to −16 LUFS, then encodes `<slug>.mp4` (crf 18) and `<slug>-preview.mp4` (crf 24).
- Files sent to a phone must be under 30 MB. The preview of a 3.5-minute film comes to about 21 MB.
- Before sharing, check:
  - the frame count matches the duration (`finish.mjs` warns if not)
  - the integrated loudness is about −16 LUFS
  - the last frame shows the logo lockup, not black

## Failure modes we've hit

| Symptom | Cause | Fix |
|---|---|---|
| 2D layer never appears | `#flat { opacity: 0 }` in CSS beats the SVG `opacity` attribute | Set `svg.style.opacity`, never the attribute, on elements that have CSS opacity |
| Draw-on line is fully drawn from frame 1 | A CSS `stroke-dasharray` class overrides the `pathLength=1` dash trick | Don't put dash classes on drawables; fade dashed lines in with `op()` |
| DOM labels sit in the wrong place in stills | They were projected with the previous frame's camera | Call `camera.updateMatrixWorld()` after `lookAt`, before projecting |
| Page never becomes ready (`waitForFunction` timeout) | A `const` was used before its declaration in the module (TDZ), or a name clashed | Read the `pageerror:` log line `render.mjs` prints; declare shared helpers above the scenes |
| `$` icons in a different font | Canvas textures were drawn before the web font loaded | Redraw icon canvases after `document.fonts.ready` (the template does) |
| Text pills the wrong width | Measured before fonts loaded | Put layout in `fits` (it runs after fonts are ready) |
| Flattened view is blank or washed out | Fog hides the far-away telephoto camera | Add the extra camera distance to the fog's near/far (`extra` in the template); raise `camera.near` with distance |
| Hero slides out of frame at unflatten | The camera route was already moving | Add a held `CK` key at the unflatten time |
| Music script crashes on a buffer offset | Sample count `SR × DUR` isn't an integer | `Math.round` it (the template does) |
| Contact sheet tiles shuffled | Shell arrays are 1-indexed in zsh | Run sheet scripts with `bash` |
| Picture visibly lurches during a line | Two anchors too close in voice time but far apart in film time | Spread the animation, or drop an anchor; heed `build-timeline.mjs` speed-up warnings |
