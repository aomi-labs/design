# Visual grammar: 3D carries, 2D explains

## Contents
1. Deciding 3D or 2D per slide
2. The flatten move
3. Building a 2D scene
4. Building a 3D station
5. Continuity devices
6. Palette and brand
7. What reviews rejected (and why)

## 1. Deciding 3D or 2D per slide

Ask what the slide's diagram *is*.

| The slide shows… | Treatment | Why |
|---|---|---|
| A flow, pipeline, table, comparison, boxes and arrows, a list of checks | **2D** | Perspective distorts alignment. A diagram explains through position and order, so keep it flat. |
| Something physical happening to the object (blocked, packed into a block, rising out of a pool) | **3D** | Depth and motion make cause and effect visceral. |
| A summary of the whole system | **3D overview, then flatten into a 2D recap** | The overview shows the journey; the flat recap shows which part handles which problem. |
| A title, the intent, a transition | **3D** | Momentum between explanations. |

Most explainer decks come out about half 2D. If a 3D shot needs a paragraph of narration to make sense, it should probably be 2D.

## 2. The flatten move

The template's `FLAT` windows do the move. Each window is `[flatten start, flat, unflatten start, 3D again, target?, half-height?]`.

- The camera **dolly-zooms**: it swings to a side-on view (+x looking −x) while the field of view narrows to about 5°, and the frame size stays constant throughout. Perspective drains out and the world looks like a drawing.
- Then the SVG layer (`FLAT2D` windows) fades in over it. It holds the 2D scene, with the hero drawn **at the same spot and scale**: half-height 4.5 world units means 120 px per unit, so a 1.5-unit card is 180 px wide and centred. To the eye, the world flattened into the diagram.
- Unflatten is the reverse. Add a held camera key (`CK`) at the unflatten time, at the hero's position. Otherwise the camera starts flying before the hero moves and the hero slides out of frame.
- Side-on, screen-right is −z, the direction of travel. **Lay 3D stations out along z** (chains, rows, sequences) so their side view already resembles the 2D diagram that replaces them.
- For a whole-system recap, pass a fixed target and a large half-height (about 60). Gate arches seen edge-on become the vertical bars of the 2D gate line.
- Move the hero only while the 2D layer is fully opaque, so that it's where the next 3D shot expects it.

## 3. Building a 2D scene

- **Start from the slide's own diagram.** Use its labels, its layout, its colour meanings. Rebuild it rather than screenshotting it, so each part can animate.
- **Build up in narration order.** Each sentence of the voice-over should reveal or move one thing. Never show the whole diagram at once.
- **The hero acts in it.** The card walks the pipeline, gets a seal at SIGN, turns rose when it fails, gets flipped when it's fixed.
- **Keep about 150 px clear at the bottom** for subtitles, and about 140 px at the top for the chapter tag.
- **Measure text after fonts load.** Use `pillBox` and push layout into `fits`, never hard-coded widths.
- **Draw-on strokes:** use `drawable` with `draw(e, x)`. Fade dashed lines in with `op` instead; a CSS dash class overrides the draw-on trick.
- **Useful parts:**
  - lanes of pills with arrows
  - dashed risk pills: rose for attacks, amber for mistakes
  - green ✓ chips for resolved items
  - gate bars with numbered badges
  - boxes split by a dashed boundary (agent | signer)
  - checkbox lists that tick in sequence
  - a summary formula strip at the end

## 4. Building a 3D station

A station is a place on the route where something happens *to the hero*. Recipes from the three-gates film:

- **Gate:** a grey arch across the route. It turns sky blue when passed and pulses when it catches something.
- **Rule net:** a translucent half-disc that grows *out of* the contract that enforces it, so the viewer sees where the rule lives. Rules are DOM labels pinned on the net. A rogue card hits the net, the broken rule turns rose, a `revert` tag appears, and the card shatters. The good card passes and every rule ticks blue.
- **Mempool and builder:**
  - Waiting cards drift in a labelled cloud above an open block.
  - The builder picks them one at a time, in a clear rhythm.
  - A scan beam flags one card, which is lifted out, and another card from the pool fills the gap.
  - The lid seals.
- **Settlement:** the sealed block slides in and docks onto a chain of settled blocks. A link snaps on, a pulse runs down the chain, and a tag gives the block number. Give settlement its own beat: it's the payoff of the whole route.
- **Summary stream:** tokens run down the whole corridor, each caught at a different gate (rose burst) or reaching settlement (sky).
- **Identity:** persistent identity at the centre, session orbs orbiting with depleting timer rings, and links back to the centre.

Label 3D places with `zone` labels (dashed pills: MEMPOOL, BUILDER) and states with `rule` and `tag` labels. Keep labels off the subtitle band.

## 5. Continuity devices

- **One hero.** An intent orb becomes the domain object (a transaction card with the `$` banknote icon) inside the harness. Use the same object in 3D and 2D.
- **The problem returns as the payoff.** The risk lanes shown early (INTENT → BUILD → SIGN → SETTLE, with risk pills) come back in the recap, and each pill drops into the gate that resolves it.
- **Chapter tags** name the part of the system ("Gate 1 · Offchain signing policy"), not a slogan. An optional rail of gate badges shows progress.
- **The ending.** The film's own shapes (three arches and the intent dot) morph into the real Aomi mark, then the lockup and URL.

## 6. Palette and brand

- **Source of truth:** `src/tokens/tokens.css`. Ink `#09090b`, paper `#fcf7f6`, sky `#5288c2` / `#416cac` / `#7facd6`, rose `#df5d90`, cool greys.
- **3D structure is grey:** arches `#9d9da8`, tracks `#a1a1aa`, blocks `#e4e4e7`. Black 3D masses read as holes on paper.
- **Meaning:** sky means passed, active or ours. Rose means failed, attacked or rejected. Amber means a mistake (not an attack), or partial.
- **Lilac is retired** (see `skills/make-aomi-video/references/aomi-motion-language.md`). The three-gates example predates that rule in places; use cool greys instead.
- **Real assets:** the mark from `assets/logo/aomi-mark.svg`, and domain icons as clean line icons inked in a darker shade of their card colour.
- **Type:** PT Serif for titles, Geist for UI text and subtitles, Geist Mono for labels, Source Serif 4 for the wordmark.

## 7. What reviews rejected (and why)

From the three-gates film's review rounds. Each rejection points at a general rule:

| Rejected | Fixed by | Rule |
|---|---|---|
| A 3D tunnel shot of the harness, with the orb huge in the foreground | Flattening to a 2D harness diagram | Explanation stops get 2D |
| Tiles fanning onto a slab for "risk": unclear what it meant | Parallel lanes, coding vs financial agent, with risk pills | Show the comparison the slide makes |
| Gate 1 shown as a key in a box with flying rings | 2D agent / signer boxes with a request and policy checks | Show the separation, not a metaphor |
| Gate 2 net with no stated source | The net grows from a guard contract, with rules written on it | Show where enforcement lives |
| The builder box with no context | Mempool cloud → picked → checked → removed | Show the state change |
| No settlement moment | A docking beat with a chain pulse | Give the payoff its own beat |
| Generic arcs at the end | Morph into the real logo | Use real brand assets |
| Black rings, arches, sphere | Grey | 3D structure is grey |
| Slogan captions | Educator narration + subtitles | Explain, don't decorate |
