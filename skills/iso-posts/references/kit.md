# Iso posts: spec format and kit

## Contents
1. The spec (posts.js)
2. Coordinates
3. Kit functions (for hand-built posts)
4. Recipes

## 1. The spec (posts.js)

`posts.js` sets `window.POST_SPECS = [spec, spec, …]`; post `n` renders `POST_SPECS[n-1]`. When there's no spec for `n`, the template falls back to the hand-built `POSTS[n]`.

```js
{
  headline: 'The key never meets the model.',   // one line
  sub: 'Agent → harness → wallet → chain',      // one mono line
  foot: 'Signing happens in your wallet.',      // optional
  kind: 'flow' | 'sequence',
  labels: true,          // false hides every node label
  edgeLabels: false,     // true shows edge (or message) labels
  trees: true,           // false drops the decorative trees
  nodes: [{ id, label, icon, color, r, k, group, s?, tagY? }],
  edges: [{ from, to, label, style: 'pipe' | 'dotted' | 'fail', back? }],
  groups: [{ id, label, glass? }],               // flow only
}
```

- **Nodes:**
  - `r` is the column and `k` the row (fractions are fine).
  - `icon` is one of: `doc swap chart key shield bolt coins term x check spark search wallet dollar eth sol user db`.
  - `color` is one of `sky grn rose white`; white cubes get navy icons and suit actors (user, model, wallet).
  - `s` is the cube size (default 1.25). `tagY` raises the label in world units.
- **Edges between nodes:**
  - Neighbours in the same row become a straight pipe.
  - Anything else (a skipped column, a different row, `back`, `fail`) becomes an arc; `fail` arcs are rose and higher.
  - `dotted` is a dashed line.
- **Sequence specs** put each participant on its own plinth, left to right. Each message is an arc whose height grows with its order; replies (`-->>`) are dotted, and a message to itself is a small loop.
- **Groups:** every node stands on its own plinth. A group's label goes on the front edge of its first member's plinth, and `glass` puts each member in a sandbox box.
- **Auto-fit:** after building, the camera zooms and pans so the whole scene and its tags fit below the headline (`fit()` in the template). You don't position anything by hand in spec mode.

## 2. Coordinates

- **Spec mode:** column `r` runs left → right across the banner (world direction (1,0,−1)) and row `k` stacks downward (world (1,0,1)), so cubes stay isometric while the flow reads horizontally. Columns are 4.4 world units apart and rows 3.2. Eight or more columns in a single chain fold into a snake.
- **Hand-built posts:** place things by screen position with `at(sx, sy)`, which returns the ground point that appears at screen coordinates (sx, sy) in world units from the centre. sx runs from about −13 to 13 and sy from about −7.5 to 7.5. The headline sits top-left, so keep scenes below sy ≈ 0 on the left half and above sy ≈ −6.5 (the footer).
- **Offsets:** `off(p, x, y, z)` offsets a point. `S` (0.62) is the height of a platform's top, so things standing on a platform start at y = S.

## 3. Kit functions (for hand-built posts)

| Function | Makes |
|---|---|
| `slab(p, w, d, label, { h, ink, lw, lx })` | A platform with its label on the front edge. `lw`/`lx` give a shorter label shifted along the edge, useful when something covers the middle. Long labels shrink to fit. |
| `glass(p, w, h, d)` | A translucent sandbox box with blue edges |
| `cube(p, { s, c, icon, ink, y })` | A soft rounded cube with a line icon on its two visible faces |
| `pipe(a, b, { r, c })` | A straight pipe |
| `tube([points], { r, c })` | A smooth curved pipe through the points (arcs, loops) |
| `dotted(a, b, colour)` | A dashed line |
| `arch(p, w, h, d, rotY)` | A pale arch (a gate) |
| `block(p, w, h, d)` | A plain building block |
| `tree(p, size)` | A small tree |
| `coin(p, colour)` | A standing coin with a $ |
| `tag(p, html, cls)` | An HTML pill pinned to a 3D point; `cls` is one of `sky grn rose` or empty (navy). Use `<b>` for numbers. |
| `receipt(p, bad)` | A TX RECEIPT card with a green ✓, or a rose ✕ when `bad` |
| `copy(headline, sub, foot)` | Sets the post's text |
| `fit()` | Zooms and pans the camera to fit the scene below the headline (call it at the end of a hand-built post if you didn't place things with `at()`) |

Colours: `C.sky C.skyL C.grn C.grnL C.rose C.white C.term C.grey C.pipe`.

## 4. Recipes

These recipes come from the "From intent to execution" posts. The full hand-built versions are in `deliverables/videos/intent-to-execution-graphics/iso.html` in the design repo.
- **Before / after:** two platforms side by side. On the left, scattered grey cubes, rose ✕ cubes and a broken pipe. On the right, a clean pipeline in a glass box feeding one check cube and a wallet. Tag each side with its count.
- **Three points:** three plinths in a row, each holding a big icon cube with a number tag. The template's `POSTS[1]` example does this.
- **Many → one:** a cloud of small grey cubes with dotted lines converging through an arch into one blue cube.
- **Fail on a fork:** a glass box with a rose cube whose rose tube loops back to a white model cube, and a blue cube exiting to a chain platform with a ✓ receipt.
- **Compression:** lanes of small cubes pass an arch and merge into one bundle cube, then a tube runs to a wallet. The template's `POSTS[2]` example does this.
