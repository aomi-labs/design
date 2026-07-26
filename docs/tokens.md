# Token reference

All tokens live in `src/tokens/tokens.css` as CSS custom properties under the `aomi.tokens` layer, with a typed mirror in `src/tokens/tokens.ts`. Prefer the CSS variables / Tailwind classes in product code so runtime theming keeps working; reach for the TS objects only when you need a raw value in JS.

## Color

### Brand foundation

The brand reads **cool, flat, and editorial** (matched against the live aomi.dev landing + portal chat):

- **Ink** is the primary action — near-black `--aomi-cool-950` (`#09090B`), flat. Wired via `--aomi-primary`.
- **Sky** is the accent — `--aomi-sky-{50…500}`, anchored at `#5288C2`. Wired via `--aomi-accent` (soft tints) and `--aomi-accent-interactive` (`sky-500` — focus rings, links, selected states, accent CTAs).
- **Pink (rosy)** is the decorative brand pop — `--aomi-pink-{50…950}`, anchored at `#DF5D90` (hue ~336°, a soft rose, not salmon-red). Charts, badges, marketing tiles; never state or action colors.

### Accent ramps

- **Sky** — `--aomi-sky-{50…500}`, `#5288C2` — the accent family (see above).
- **Pink (rosy)** — `--aomi-pink-{50…950}`, `#DF5D90` — decorative only.
- **Lilac** — `--aomi-lilac-{50…500}`, `#D3C2D8` — **retired**; kept for back-compat, do not use in new work.

### Neutral ramps

- **Cool** — `--aomi-cool-{0…950}` — the primary neutral scale (Tailwind "zinc"): pure-white `0`, near-black `950`. The semantic roles below are built on this. Matches the cool/pure-white live surface.
- **Neutral (warm)** — `--aomi-neutral-{0…950}` — legacy warm, paper-tinted scale (`50` = `#FCF7F6`). Retained for back-compat; new surfaces use the cool ramp.

### Status

`--aomi-success-500`, `--aomi-warning-500`, `--aomi-danger-500`, `--aomi-info-500`.

### Semantic roles

Use these in components rather than raw ramp steps — they flip between light and dark automatically.

| Role | Variable | Tailwind |
|------|----------|----------|
| Page background | `--aomi-bg` | `bg-bg` |
| Subtle background | `--aomi-bg-subtle` | `bg-bg-subtle` |
| Surface / card | `--aomi-surface` | `bg-surface` |
| Body text | `--aomi-text` | `text-ink` |
| Muted text | `--aomi-text-muted` | `text-ink-muted` |
| Subtle text | `--aomi-text-subtle` | `text-ink-subtle` |
| Border | `--aomi-border` | `border-border` |
| Strong border | `--aomi-border-strong` | `border-border-strong` |
| Primary | `--aomi-primary` (+ `-hover`, `-active`, `-subtle`) | `bg-primary` |
| Accent | `--aomi-accent` (+ `-hover`, `-active`, `-subtle`) | `bg-accent` |
| Selected bar | `--aomi-accent-selected` / `--aomi-accent-selected-text` | `bg-accent-selected` / `text-accent-selected-text` |
| Interactive accent | `--aomi-accent-interactive` | `bg-accent-interactive` |
| Hover on subtle surfaces | `--aomi-state-hover` | `bg-state-hover` |
| Secondary text | `--aomi-text-secondary` | `text-ink-secondary` |
| Focus ring | `--aomi-ring` | `ring` |

### Chat surface (monochrome)

The conversational UI is intentionally black-and-white. Dedicated roles keep it isolated from brand color: `--aomi-chat-bg`, `--aomi-chat-bubble-user(-text)`, `--aomi-chat-bubble-agent(-text)`.

## Typography

- **Display** — `--aomi-font-display` → PT Serif. Headings and hero copy.
- **Sans** — `--aomi-font-sans` → Geist. UI and body.
- **Mono** — `--aomi-font-mono` → Geist Mono. Code, addresses, tx hashes.
- **Wordmark** — `--aomi-font-wordmark` → Source Serif 4, SemiBold `600`. The "aomi" logo lockup only (`<Logo>`); not for body/headings.

Sizes `--aomi-text-xs … --aomi-text-5xl` (0.75rem → 3.25rem). Weights: regular `400`, medium `500`, bold `700`. Line heights and tracking exposed as `--aomi-leading-*` and `--aomi-tracking-*`.

> Fonts are referenced by name; load PT Serif, Geist, and Geist Mono in the consuming app (e.g. `next/font`, Fontsource, or a `<link>`). Load Source Serif 4 (weight 600) too if you use `<Logo>`. The tokens fall back to system serif/sans/mono if a face is missing.

## Spacing

4px base scale: `--aomi-space-{0,1,2,3,4,5,6,8,10,12,16}` (0 → 4rem).

## Radius

`--aomi-radius-{sm,md,lg,xl}` plus `--aomi-radius-pill` (`9999px`). The system is pill-first — interactive controls default to `pill`; cards and containers use `lg`/`xl`.

## Elevation & liquid glass

Drop shadows `--aomi-shadow-{sm,md,lg}`. The signature glass treatment composes a token set: `--aomi-glass-bg`, `--aomi-glass-border`, `--aomi-glass-shadow` (inner highlight + soft outer drop), and `--aomi-glass-blur` for `backdrop-filter`.

## Motion

Durations `--aomi-duration-{fast,base,slow}` (120 / 200 / 320ms) and easings `--aomi-ease-standard`, `--aomi-ease-emphasized`.


## Component-layer tokens (2026-07-26)

Added after a full pass over the portal + control-plane surfaces, where these
were being hand-rolled as one-off opacities and greys:

| Token | Light | Dark | Why it exists |
|---|---|---|---|
| `--aomi-state-hover-raised` | cool-100 | cool-700 | Hover for rows on a **white / raised** ground (menus, popovers). `--aomi-state-hover` is tuned for items on cool-100 and reads as a selection on white. |
| `--aomi-accent-tint` | accent @10% | accent @10% | Fill for tinted chips, callouts and the hover state of accent-outline buttons. |
| `--aomi-accent-outline` | accent @45% | accent @45% | Border for the same family. |
| `--aomi-overlay-border` | muted @30% | muted @30% | The hairline on menus and tooltips — a plain border is too heavy on a floating surface. |
| `--aomi-danger-strong` | `#b8394a` | `#c34255` | Destructive **fills**. White on `--aomi-danger-500` is 4.3:1 and fails AA at control sizes; these are 5.6:1 / 5.0:1. |
| `--aomi-on-danger` | `#ffffff` | `#ffffff` | Text on a destructive fill. |
| `--aomi-surface-2` | cool-100 | cool-800 | Alias of `bg-subtle` under the name the app surfaces already use. |

Two corrections in the same pass:

- **`--aomi-ring` was `cool-400` / `cool-500`** — a grey ring, nearly invisible
  on a cool surface, while this file already reserved `--aomi-accent-interactive`
  for "focus rings, links, accent CTAs". The ring now *is* the interactive accent.
- **`--aomi-state-hover` on dark was `cool-800`, which is also `--aomi-surface-raised`.**
  A hover painted in the same colour as the surface it sits on can never show;
  the portal's menus had exactly this bug. Dark hover is now `cool-700`.
  The rule to keep: **a hover fill must out-step its own ground.**

`--aomi-danger-500` also gained a dark override (`#e2687a`); it had none and was
inheriting the light red onto a dark ground.
