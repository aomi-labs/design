# @aomi-labs/design

The Aomi design system — design tokens and core React components for the agentic, on-chain UX. This repo is the upstream source of truth; the published package feeds Aomi's product surfaces (the `AomiFrame` widget, the chat portal, and the docs site).

## Two halves, one repo

1. **The design system** (`src/`, `assets/`, `docs/`, `playground/`) — the brand's ground truth, published as this npm package.
2. **Marketing deliverables** (`deliverables/`) — the artifacts we ship outward (posts, decks, videos, doc pieces), tracked by the **marketing map** in aomi-scrum. Each deliverable's identity is a GitHub **issue** here; its lifecycle (idea → drafting → ready → delivered) is derived from repo reality. See [`deliverables/README.md`](deliverables/README.md) for the contract, [`TONE.md`](TONE.md) for the company voice.

Rule of thumb: defines the brand → system; the map should track it → `deliverables/<type>/`; makes deliverables → `skills/`; neither yet → `lab/`.

## What's in here

- **Tokens** — colors, typography, spacing, radius, elevation, and motion, authored as CSS custom properties (`src/tokens/tokens.css`) with a typed mirror for JS (`src/tokens/tokens.ts`).
- **Tailwind preset** — maps the tokens to Tailwind utilities so product code can use `bg-primary`, `text-ink-muted`, `rounded-pill`, etc. (`src/tailwind/preset.ts`).
- **Components** — `Button`, `Input`, and `Card` to start, built on the tokens with variants, states, and accessibility baked in.

## Brand foundations

| Token | Value | Use |
|-------|-------|-----|
| Primary (ink) | `#09090B` | Primary actions — near-black, flat |
| Accent (sky) | `#5288C2` | Interactive accent — selected states, focus, links, accent CTAs |
| Surface | `#FFFFFF` | Cool, pure-white light-mode background |
| Pink (rosy) | `#DF5D90` | Decorative brand pop — charts, badges, marketing tiles |
| Display font | PT Serif | Headings, hero copy |
| Body font | Geist | UI text, body |
| Mono font | Geist Mono | Code, addresses, hashes |

The look is **cool, flat, and editorial**: fully-rounded pill controls, a near-black "ink" primary, a sky-blue interactive accent with rosy-pink decorative pops, large radii, and a cool/pure-white surface (the [aomi.dev](https://aomi.dev) landing look — matched against the live portal chat). The conversational surface is deliberately **monochrome** (a clean black-and-white chat), so brand color stays reserved for actions and accents. The lilac ramp is retired — sky replaced it as the accent family.

## Install

```bash
pnpm add @aomi-labs/design
```

`react` and `react-dom` (v18+) are peer dependencies.

## Usage

Import the tokens once at your app root, then wire up the Tailwind preset:

```ts
// app entry (e.g. main.tsx / layout.tsx)
import "@aomi-labs/design/tokens.css";
```

```ts
// tailwind.config.ts
import aomi from "@aomi-labs/design/tailwind";

export default {
  presets: [aomi],
  content: ["./src/**/*.{ts,tsx}"],
};
```

```tsx
import { Button, Card, CardTitle, CardDescription, Input } from "@aomi-labs/design";

export function Example() {
  return (
    <Card variant="glass">
      <CardTitle>Rebalance my portfolio</CardTitle>
      <CardDescription>One prompt away from action.</CardDescription>
      <Input placeholder="Ask Aomi anything…" />
      <Button variant="glass">I'm a human</Button>
    </Card>
  );
}
```

### Dark mode

The token file ships a light and a dark theme. Toggle by adding `class="dark"` or `data-theme="dark"` to a parent element (typically `<html>`). Every semantic role and component re-themes automatically.

## Develop

```bash
pnpm install
pnpm typecheck   # type-check the source
pnpm build       # emit dist/ with tsup (ESM + d.ts)
pnpm dev         # watch-build
```

### Playground

A live Vite playground renders every component (and the color ramps, chat surface, and dark mode) straight from `src/`, with hot reload:

```bash
cd playground
pnpm install
pnpm dev          # opens http://localhost:5173
```

Editing anything under `src/` — tokens or components — updates the page instantly.

## Repo layout

```
src/
  tokens/      tokens.css (CSS vars) + tokens.ts (typed mirror)
  tailwind/    preset.ts  (Tailwind ↔ token mapping)
  components/  button, input, card
  lib/         cn() class merge helper
docs/
  tokens.md       token reference
  components.md    component reference
```

## Docs

- [Token reference](./docs/tokens.md)
- [Component reference](./docs/components.md)
- [Contributing](./docs/CONTRIBUTING.md)

## License

MIT © Aomi Labs
