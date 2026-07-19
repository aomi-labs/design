---
name: make-aomi-video
description: Create Aomi announcement, launch, partnership, ecosystem, product-demo, and social videos from a concept, campaign brief, reference clip, or existing footage. Use when Codex needs to develop a video story with the user, build a moving HTML storyboard, turn approved shots into a browser animation, capture key frames, render frame sequences, or produce long and short video deliverables under an Aomi design repository.
---

# Make Aomi Video

Create a bespoke story for the subject, then reuse the production workflow. Do not force every video into an API, partner, architecture, or product-demo narrative.

## Workflow

1. **Orient.** Inspect the live repository, current `video/` work, brand assets, supplied footage, and recent commits. Identify the announcement, audience, destination, aspect ratio, target length, and whether sound or narration is expected. When the story is still exploratory, discuss it with the user before editing.
2. **Develop the treatment.** Define the video's single promise, emotional arc, proof moment, and final claim. Offer concrete beats rather than generic marketing language. Read [production-workflow.md](references/production-workflow.md) for narrative patterns.
3. **Build the storybook.** Create `video/<campaign>/launch-section.html` unless the project already has a naming convention. Make it a bright, browsable sequence of 16:9 shots with concise captions. Let each shot move when motion helps communicate the idea. Start from [storyboard-template.html](assets/storyboard-template.html) only when useful.
4. **Review before expansion.** Render representative stills, inspect them, and present the storybook to the user. Resolve narrative, pacing, visual hierarchy, and factual concerns before investing in the full animation. Continue directly when the user explicitly asks for an end-to-end build.
5. **Animate the approved story.** Build one self-contained HTML animation in `video/<campaign>/`. Keep the visual treatment specific to the campaign. Expose the playback contract in [html-video-contract.md](references/html-video-contract.md) so capture tools can seek deterministic timestamps. Use [animation-template.html](assets/animation-template.html) as a neutral starting point, not a mandatory visual template.
6. **Create deliverables.** Derive long, short, insert, outro, vertical, or square edits from the approved story. Recompose when the format changes; do not merely crop important content.
7. **Render and verify.** Capture key moments first, inspect them, then render all frames. Check first, middle, transition, proof, and final frames for clipping, blank states, accidental chrome, and illegible text. Encode only after visual QA.

## Visual Direction

Read [aomi-motion-language.md](references/aomi-motion-language.md) before designing. Use the repository's current tokens and assets as the source of truth. Partner or ecosystem branding may influence a campaign, but Aomi should remain visibly present.

Prefer HTML, CSS, SVG, Canvas, or WebGL according to the idea. Do not introduce a framework when a self-contained HTML document is sufficient. Use real screenshots, logos, product surfaces, or generated imagery when they carry the story better than abstract geometry.

## Capture Commands

Capture selected timestamps during iteration:

```bash
node skills/make-aomi-video/scripts/capture-stills.mjs \
  video/<campaign>/animation.html \
  --times 0,2.5,7,12 \
  --out /tmp/<campaign>-stills
```

Render a frame sequence after the animation is approved:

```bash
node skills/make-aomi-video/scripts/render-frames.mjs \
  video/<campaign>/animation.html \
  --duration 30 \
  --fps 30 \
  --out video/<campaign>/deliverable/frames
```

Frame rendering defaults to 1920 by 1080. Pass `--width` and `--height` for another delivery format.

Encode the frame sequence when `ffmpeg` is available:

```bash
skills/make-aomi-video/scripts/encode-video.sh \
  video/<campaign>/deliverable/frames \
  video/<campaign>/deliverable/<campaign>.mp4 \
  30
```

The capture scripts require Playwright in the active project. Install its Chromium browser if needed with `npx playwright install chromium`. The encoder reports the exact installation command when `ffmpeg` is missing.

## Completion Standard

- Keep source HTML, working screenshots, frame sequences, and final deliverables inside `video/<campaign>/` or temporary storage chosen by the user.
- Preserve a clean 16:9 master unless another format is requested.
- Make time-based state seekable; do not rely only on wall-clock CSS animation for narrative events.
- Verify the final frame does not disappear when playback reaches the duration.
- Do not claim an integration, capability, chain, transaction, or launch detail as factual without confirming it. Clearly frame speculative product behavior as a demonstration.
- Keep temporary capture artifacts out of git unless the user wants them committed.

Use `deliverables/videos/somm/launch-section.html` and `deliverables/videos/somm/architecture-animation.html` as examples of a completed storybook-to-animation workflow when they are available, not as universal content templates.
