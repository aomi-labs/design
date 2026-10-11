---
name: iso-posts
description: Turn a Mermaid diagram (architecture, flowchart, sequence) into a cute isometric "cube" banner for X or LinkedIn, in Aomi's style. A one-line serif headline, one mono line, and a small three.js scene of icon cubes on platforms, glass sandboxes, pipes and trees, with the aomi labs lockup. Use this whenever someone wants to post, share or announce something that already exists as a Mermaid diagram, architecture sketch or flow, or asks for a "banner", "post image", "social graphic", "X image", "cover image" or "something postable" from a diagram, PR, doc or idea. Also use it for one-off hand-built iso scenes in the same style, and for re-exporting or tweaking existing iso posts, even if they don't say "isometric" or "Mermaid". For narrated videos use slide-to-video; for chain-verified demo videos use demo-director.
---

# Iso posts: Mermaid → postable cube banner

The team draws architecture and sequence diagrams in Mermaid all the time. When it's time to post, those diagrams are too dense for a feed. This skill converts one in a single pass into a 1920×1080 isometric banner with one idea, one headline and almost no other words. The look is pale blue and white iso cubes, with sky for EVM, ours or passed, green for Solana, and rose for failures.

There are three steps: **convert** the diagram into a spec, **edit** the spec (this is where the judgement goes), then **render and check**.

## 1. Convert

```bash
mkdir -p deliverables/posts/<slug>
cp skills/iso-posts/assets/iso-template.html deliverables/posts/<slug>/posts.html
node skills/iso-posts/scripts/mermaid-to-spec.mjs diagram1.mmd [diagram2.mmd …] > deliverables/posts/<slug>/posts.js
```

Each diagram becomes one post (`?n=1`, `?n=2`, …). The converter understands `flowchart`/`graph` (shapes, edge labels, `&`, subgraphs, `class`) and `sequenceDiagram` (participants, actors, messages). It lays nodes out left to right across the banner, each on its own plinth (rows stack downward, and chains of 8+ fold into a snake), and guesses each node's icon and colour from its words (wallet → wallet, sign or key → key, model or agent → sparkle, user → person, revert or fail → rose ✕, Solana → green, db or state → cylinder, …). A Mermaid diagram pasted into chat works too: save it to a `.mmd` file first.

## 2. Edit the spec

Open `posts.js`. The converter gives you a faithful translation, but a post needs a point. Edit with that in mind:

- **Write the copy.**
  - `headline`: one line, a short statement, at most about six words ("The key never meets the model."). The template keeps it on one line and the check fails if it wraps. Long headlines are the most common reason a post doesn't read.
  - `sub`: one plain mono line that names what the scene shows.
  - `foot`: optional, one short line.
  - Write these in the user's voice when you know it: plain and technical, not taglines.
- **Cut to the point.** A feed image reads with 4–8 nodes. Drop plumbing nodes (logging, retries, config), merge chains that say one thing, and keep the node where the interesting thing happens. Delete their edges too.
- **Shorten labels** to one to three words ("Simulate", "Wallet signs"). They render as pills, and long ones collide. Set `labels: false` when the cubes and icons already say enough.
- **Check the guessed icon and colour** of each node. `icon` is one of `doc swap chart key shield bolt coins term x check spark search wallet dollar eth sol user db`; `color` is one of `sky grn rose white`. Use rose only for a failure path, and green only for Solana (or a clearly second chain).
- **Groups:** a subgraph's name goes on its first member's plinth, and `glass: true` puts each member in a sandbox box (set automatically for fork, sandbox or simulation groups). Keep group labels to one short word ("AOMI", "FORK"); they sit on a plinth edge and shrink to fit.
- **Emphasis:** make the node the post is about bigger with `s: 1.6`. The other cubes are 1.25.
- **Edges:** `style` is `pipe`, `dotted` (async or replies) or `fail` (a rose arc). `back: true` marks a loop-back. `edgeLabels: true` on the spec shows edge labels; leave it off unless one label carries the point.

The full spec format, the kit and per-node overrides (`s`, `tagY`, positions) are in `references/kit.md`. Read it when the spec alone can't express the scene. For a one-off scene that isn't a diagram, write a hand-built function in the template's `POSTS` object instead (two worked examples are in the template).

## 3. Render and check

```bash
node skills/iso-posts/scripts/render.mjs deliverables/posts/<slug>/posts.html deliverables/posts/<slug> name1 name2 …
```

This writes `post-1-name1.png`, … and checks each post for:
- a headline that wraps or runs off the edge
- tags or receipts overlapping the headline, subline, footer, each other, or the canvas edge

The template already nudges colliding tags apart. If the check still fails, shorten labels, drop a node, or raise one label with `tagY`.

**Then look at every PNG.** The check catches collisions, not meaning. Ask whether a stranger scrolling past gets the point from the headline plus the shape of the scene in two seconds. If not, cut more.

Playwright: the script uses `playwright-core` from the project or next to the script, or `PW_CORE=/path/to/node_modules/playwright-core`. It prefers Playwright's chromium headless shell, which renders WebGL at the exact size.

## Style rules, and why

- **One idea per post.** A banner is read in a second; a diagram is studied. If the diagram has two ideas, make two posts.
- **The headline is one line, no subtitle paragraph.** Two-line titles and wordy sublines were the first thing Cecilia cut.
- **Nothing small.** On a phone an X image is about 600px wide, a third of the canvas, so labels under about 24px vanish. The template's sizes are already safe; don't shrink them to fit more in.
- **Colour means something.** Sky is ours, EVM or passed; green is Solana; rose is a failure. A rose cube that isn't a failure confuses the story.
- **The lockup reads "aomi labs"** (top-left, with the mark). Keep it.
- **White background, faint iso grid, cool grey structure.** Don't add dark backgrounds or gradients; the style is light and clean.
- **Claims must be true.** Numbers on tags ("9 → 5 calls") need a source. If they come from a demo or reconstruction, say so in the post copy, not on the image.

## Files

- `assets/iso-template.html`: the scene kit (iso camera, platforms, glass, icon cubes, pipes, tubes, trees, arches, coins, tags, receipts), the spec builder with auto-fit, and two hand-built example posts. It loads `posts.js` from its own folder.
- `scripts/mermaid-to-spec.mjs`: Mermaid → spec (layout, icons, colours, edge styles).
- `scripts/render.mjs`: PNG export and the layout check.
- `references/kit.md`: spec fields, kit functions, coordinates, and recipes for common scenes.
- `examples/`: two Mermaid diagrams (a harness flowchart with a fork sandbox and a revert loop, and a signing sequence) for trying the pipeline end to end.
- `examples/*.png`: what those two diagrams render to.
