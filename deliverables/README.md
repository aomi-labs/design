# Deliverables

Everything the **marketing map** (aomi-scrum → Marketing) tracks lives here. If the map
should see it, it's under `deliverables/`. Brand definition lives in the design
system (`src/`, `assets/`, `docs/`); production tooling lives in `skills/`; experiments
that aren't deliverables yet live in `lab/`.

## Layout

```
deliverables/
├── _templates/   brand-tokened scaffolds — start every artifact from one of these
├── posts/        X / Medium artifacts (self-contained HTML, screenshot-ready)
├── decks/        slides & pitch material
├── videos/       storyboards, animatics, finals (one folder per production)
├── docs/         how-it-works / explainer deliverables
└── <tag>/        tag bundles — one folder per partner/topic (e.g. somm/), see below
```

Two shapes coexist:

- **Flat artifacts** under a *type* folder (`posts/`, `decks/`, `videos/`, `docs/`) —
  the folder is the type, and the file joins its issue via the `issue=#N` marker.
- **Tag bundles** under a *tag* folder — everything else at the top level is a tag.
  Type names (`posts`, `decks`, `videos`, `docs`, `_templates`) are reserved and can
  never be tags.

## Tag bundles

A tag groups deliverables around a partner or theme (`somm/`, …). Inside it, each
deliverable is a **bundle folder joined to its issue by path** — no file markers needed:

```
deliverables/somm/                 ← tag; also a GitHub label on the issues
├── 3-launch/                      ← bundle for issue #3 (leading number = the join)
│   ├── OVERVIEW.md                ← projection of the issue body (issue is canonical)
│   ├── video/                     ← sub-deliverables, one folder per type
│   └── x-post/
└── <N>-<slug>/…                   ← next somm deliverable, e.g. a case study
```

Rules:

- **The bundle folder is the artifact.** The map links the folder tree, not a file.
  Sub-deliverable folders (`video/`, `x-post/`, …) organize media types inside it.
- **The leading number is the issue join.** `somm/3-launch/` ⇔ design issue #3.
- **A bundle has one home tag** (the folder it lives in). Cross-tags are extra GitHub
  labels on the issue; the folder's tag must also be a label on its issue.
- **PR attribution is by path.** A PR touching `somm/3-launch/**` shows on issue #3.
  A PR touching `somm/**` files *outside* any bundle (shared partner assets) shows on
  every open issue labeled `somm`.
- **`OVERVIEW.md` is generated, never hand-drifted** — the issue body is canonical;
  the overview is its repo-side projection for people browsing the tree.

There is no separate campaign primitive — tags replaced it. A launch date, when one
matters, lives on the issue.

## Lifecycle (derived, never hand-moved)

A deliverable's **identity is its GitHub issue** in this repo (created from the map's
double-click popup, or by hand with the markers below). State is read from repo reality:

| state | derived from |
|---|---|
| `idea` | open issue with an `aomi-deliverable` marker, no artifact yet |
| `drafting` | open PR touching the artifact (flat file via body ref, bundle via path) |
| `ready` | artifact merged to `main` (flat file, or the bundle folder exists) |
| `delivered` | publish link recorded on the issue |

## Markers

On the **issue** (the identity — the map writes these automatically):

```html
<!-- aomi-deliverable sector=defi-mgmt -->
<!-- aomi-needs tree:some-line-id design:how-it-works.html -->
```

In a **flat artifact file** (joins the file to its issue — bundles don't need this,
their path is the join):

```html
<!-- aomi-deliverable issue=#1 -->
```

Dependencies (`aomi-needs`) are informational, never gating: material about in-flight
work is legal — the referenced work only has to exist.

## Conventions

- kebab-case filenames; one self-contained HTML file per post/deck, one folder per video
  production; one bundle folder per tagged deliverable, named `<issue>-<slug>`.
- Start from `_templates/` so artifacts inherit the brand tokens; write in the voice of
  the root `TONE.md`.
- PRs into this folder are content review, same discipline as code review.
