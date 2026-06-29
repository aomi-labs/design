# Token reference

All tokens live in `src/tokens/tokens.css` as CSS custom properties under the `aomi.tokens` layer, with a typed mirror in `src/tokens/tokens.ts`. Prefer the CSS variables / Tailwind classes in product code so runtime theming keeps working; reach for the TS objects only when you need a raw value in JS.

## Color

### Brand ramps

Two brand ramps, each `50 → 950`. `500` is the exact brand hex.

- **Pink** — `--aomi-pink-{50…950}`, anchored at `#EC6C83`. Primary actions and brand moments.
- **Purple** — `--aomi-purple-{50…950}`, anchored at `#416CAC`. Accent, links, informational states.

### Neutral ramp

`--aomi-neutral-{0…950}` — a warm, paper-tinted gray scale. `50` is the brand paper `#FCF7F6`; `0` is pure white; `900`/`950` are near-black for text and dark surfaces.

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
| Focus ring | `--aomi-ring` | `ring` |

### Chat surface (monochrome)

The conversational UI is intentionally black-and-white. Dedicated roles keep it isolated from brand color: `--aomi-chat-bg`, `--aomi-chat-bubble-user(-text)`, `--aomi-chat-bubble-agent(-text)`.

## Typography

- **Display** — `--aomi-font-display` → PT Serif. Headings and hero copy.
- **Sans** — `--aomi-font-sans` → Geist. UI and body.
- **Mono** — `--aomi-font-mono` → Geist Mono. Code, addresses, tx hashes.

Sizes `--aomi-text-xs … --aomi-text-5xl` (0.75rem → 3.25rem). Weights: regular `400`, medium `500`, bold `700`. Line heights and tracking exposed as `--aomi-leading-*` and `--aomi-tracking-*`.

> Fonts are referenced by name; load PT Serif, Geist, and Geist Mono in the consuming app (e.g. `next/font`, Fontsource, or a `<link>`). The tokens fall back to system serif/sans/mono if a face is missing.

## Spacing

4px base scale: `--aomi-space-{0,1,2,3,4,5,6,8,10,12,16}` (0 → 4rem).

## Radius

`--aomi-radius-{sm,md,lg,xl}` plus `--aomi-radius-pill` (`9999px`). The system is pill-first — interactive controls default to `pill`; cards and containers use `lg`/`xl`.

## Elevation & liquid glass

Drop shadows `--aomi-shadow-{sm,md,lg}`. The signature glass treatment composes a token set: `--aomi-glass-bg`, `--aomi-glass-border`, `--aomi-glass-shadow` (inner highlight + soft outer drop), and `--aomi-glass-blur` for `backdrop-filter`.

## Motion

Durations `--aomi-duration-{fast,base,slow}` (120 / 200 / 320ms) and easings `--aomi-ease-standard`, `--aomi-ease-emphasized`.
