# From intent to execution: X cut (1:59)

The under-2:20 version of `../intent-to-execution` for X. It reuses that film and music (`film.html` and
`music.mjs` are symlinks) and plays a subset of its scenes back to back, listed in `cut.js`:
the request, Ethereum side by side, why a harness, context instantiation, back pressure, account
abstraction and signing, the three points, who does what, and the logo. The narration is voiced
separately in `vo/` (all lines in one pass); anchors are written on the full film's clock and converted
through `cut.js`.

```bash
node skills/slide-to-video/scripts/build-timeline.mjs deliverables/videos/intent-to-execution-x
node skills/slide-to-video/scripts/render.mjs deliverables/videos/intent-to-execution-x/film.html --out /tmp/ite-x-frames
node skills/slide-to-video/scripts/finish.mjs deliverables/videos/intent-to-execution-x /tmp/ite-x-frames
```
