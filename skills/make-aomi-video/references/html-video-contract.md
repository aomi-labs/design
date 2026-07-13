# HTML Video Contract

Use this small browser contract so storyboards and animation documents remain easy to preview while capture scripts can seek exact timestamps.

## Stage

- Design the master on a fixed 1200 by 675 coordinate space.
- Present it responsively in the browser with a scaled wrapper.
- Render final frames at 1920 by 1080 by default; the design coordinate system and delivery resolution are separate.
- Put the clean capture surface in an element named `#stage` unless another selector is passed to the scripts.
- Keep playback controls outside `#stage` so they do not appear in rendered frames.

## Playback API

Expose this object after initialization:

```js
window.__AOMI_VIDEO__ = {
  duration: 24,
  seek(seconds) {
    // Clamp time, update every narrative state, and paint the requested frame.
  },
  play() {},
  pause() {}
};
```

`seek(seconds)` must render the same meaningful state whenever it receives the same time. Update text, camera, geometry, visibility, and progress from that time. Avoid narrative events that exist only because a timeout happened earlier.

The capture scripts also accept the older Somm prototype hook `window.__seek(seconds)`.

## Timing

Keep beat boundaries in one ordered structure:

```js
const beats = [
  { id: "arrival", start: 0, end: 4.5 },
  { id: "proof", start: 4.5, end: 11 },
  { id: "review", start: 11, end: 17 },
  { id: "claim", start: 17, end: 21 }
];
```

Use the same boundaries for controls, captions, and deliverable planning. Keep the final visual visible at `duration`; do not immediately reset to the beginning.

## Capture Mode

The scripts add `html[data-capture="true"]`. Use it to disable browser-only chrome or expensive ambient effects:

```css
html[data-capture="true"] .preview-only {
  display: none;
}
```

Load local assets with paths relative to the HTML file. Wait for `document.fonts.ready` before signaling readiness when typography affects layout.

Set this flag after assets and initial layout are ready:

```js
window.__AOMI_VIDEO_READY__ = true;
```

The scripts wait briefly when the flag is absent so older documents still work.
