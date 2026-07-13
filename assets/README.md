# Brand assets

Photographic / generated brand imagery for Aomi, pulled from the shared Drive (`Brand Kit / Brand Images`). Dreamy pastel sunset-and-dawn visuals — hands, mountains, glass spheres, floating islands, retro computers — in the Aomi pink/blue palette.

## Layout

- `logo/` — the Aomi brand mark as vector SVG. **Committed.** For in-app use prefer the themeable `<Brandmark />` component (`@aomi-labs/design`), which fills with `currentColor`; use the raw SVG for static/marketing contexts.
- `brand/` — full-resolution PNG originals (up to 6048×3390, ~135 MB total). **Git-ignored** — keep the masters in Drive; this folder is a local working copy.
- `optimized/` — web-ready WebP, resized to ≤1920px, quality 80 (~1.9 MB total). **Committed.** Reference these in product and marketing code.
- `manifest.json` — machine-readable index (id, paths, dimensions, description, suggested usage).

## Logo

| file | what it is |
|------|-----------|
| `logo/aomi-mark.svg` | Brand mark — open crescent with a nested "eye" ring, 362×362 viewBox, fill `#050505`. Source: Figma `Aomi-Team-Library` (node `3335-513`). |

## Images

| id | optimized | dims (orig) | what it is |
|----|-----------|-------------|------------|
| hero-background | `optimized/hero-background.webp` | 1456×816 | Hand on a white keyboard in glowing coral cloth — the landing hero plate |
| brand-01 | `optimized/brand-01.webp` | 3600×1934 | Dawn valley, river, faint rainbow + planet |
| brand-02 | `optimized/brand-02.webp` | 3602×1940 | Glowing CRT computer on a snowy mountain |
| brand-03 | `optimized/brand-03.webp` | 5864×3286 | Dusk dunes with a glowing light-stream (highest-res) |
| brand-04 | `optimized/brand-04.webp` | 3840×2160 | Hand reaching through a glowing portal grid |
| brand-05 | `optimized/brand-05.webp` | 3840×2160 | Hands and floating translucent spheres |
| brand-06 | `optimized/brand-06.webp` | 1676×942 | Figure on a reflective salt flat |
| brand-07 | `optimized/brand-07.webp` | 6048×3390 | Mirror-reflected tree on a floating island |
| brand-09 | `optimized/brand-09.webp` | 2852×1598 | Figure with a glassy sphere/helmet, light rays |
| brand-10 | `optimized/brand-10.webp` | 4934×2802 | Large glass orb on a pink shoreline |

(`aomi_image8` is absent from the source folder, so the numbering skips 08.)

## Regenerating the optimized set

From `assets/`, with ImageMagick installed:

```bash
for f in brand/*.png; do
  convert "$f" -resize '1920x1920>' -quality 80 "optimized/$(basename "${f%.*}").webp"
done
```

Originals are the source of truth; re-pull from Drive if they change.
