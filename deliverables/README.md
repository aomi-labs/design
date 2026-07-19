# Deliverables

Everything the **marketing map** (aomi-scrum → Marketing) tracks lives here. If the map
should see it, it's under `deliverables/<type>/`. Brand definition lives in the design
system (`src/`, `assets/`, `docs/`); production tooling lives in `skills/`; experiments
that aren't deliverables yet live in `lab/`.

## Layout

```
deliverables/
├── _templates/   brand-tokened scaffolds — start every artifact from one of these
├── posts/        X / Medium artifacts (self-contained HTML, screenshot-ready)
├── decks/        slides & pitch material
├── videos/       storyboards, animatics, finals (one folder per production)
└── docs/         how-it-works / explainer deliverables
```

The folder is the **type** — the map derives per-type policy from it (a post requires a
publish link to count as delivered; a deck doesn't).

## Lifecycle (derived, never hand-moved)

A deliverable's **identity is its GitHub issue** in this repo (created from the map's
double-click popup, or by hand with the markers below). State is read from repo reality:

| state | derived from |
|---|---|
| `idea` | open issue with an `aomi-deliverable` marker, no artifact yet |
| `drafting` | open PR touching `deliverables/**` that references the issue |
| `ready` | artifact merged to `main` |
| `delivered` | publish link recorded on the issue |

## Markers

On the **issue** (the identity — the map writes these automatically):

```html
<!-- aomi-deliverable sector=defi-mgmt -->
<!-- aomi-needs tree:some-line-id design:how-it-works.html -->
```

In the **artifact file** (joins the file to its issue):

```html
<!-- aomi-deliverable issue=#1 -->
```

Dependencies (`aomi-needs`) are informational, never gating: material about in-flight
work is legal — the referenced work only has to exist.

## Conventions

- kebab-case filenames; one self-contained HTML file per post/deck, one folder per video.
- Start from `_templates/` so artifacts inherit the brand tokens; write in the voice of
  the root `TONE.md`.
- PRs into this folder are content review, same discipline as code review.
