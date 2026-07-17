# Aomi Motion Language

## Source of Truth

Read the current design repository before creating a video:

- `src/tokens/tokens.css` for color, typography, spacing, and motion tokens
- `assets/manifest.json` for available brand imagery
- `assets/logo/aomi-mark.svg` for the current mark
- Existing campaign work under `video/` for precedent

Do not freeze these values into the skill. The repository can evolve.

## Character

Aomi's current language is bright, cool, editorial, and technically precise. Use white or cool-light space, near-black ink, restrained borders, and a few purposeful accents. Sky blue (the accent), rosy pink (the decorative pop), and partner colors can provide contrast without turning the entire film into one hue. The lilac ramp is retired — do not introduce it in new work.

Use PT Serif for consequential claims, Geist for interface and explanatory text, Geist Mono for traces, labels, addresses, and execution detail, and Source Serif 4 for the Aomi wordmark when those fonts are available.

## Motion

- Use camera movement to reveal relationships or shift scale, not as constant decoration.
- Prefer clear state changes, paths, flowing points, assembly, and controlled transformations.
- Let technical motion follow understandable causality: request, interpretation, construction, simulation, review, authorization, result.
- Hold important states long enough to read.
- Keep ambient loops subordinate to narrative movement.
- Use one dominant motion idea per beat.
- Avoid decorative blobs, gratuitous gradients, and generic futuristic effects.

## Composition

- Use a stable 16:9 stage for the master.
- Keep the subject visible in the first viewport or opening shot.
- Give titles, diagrams, product UI, and transaction review enough scale to inspect.
- Do not place explanatory copy over busy imagery unless contrast is controlled.
- Keep logos crisp and proportionally correct.
- Use partner colors as accents while retaining an Aomi visual anchor.

## Product And Tool Traces

When showing an assistant or execution trace, disclose enough state to explain progress without exposing implementation noise. A useful progression is:

1. Short user intent
2. Current action in plain language
3. Compact tool or data evidence
4. Built transaction summary
5. Simulation result
6. Review or authorization state

Keep the primary outcome visually dominant. Logs are supporting evidence, not the headline.

## Assets

Use real product captures and official ecosystem assets when accuracy matters. Use generated imagery when it meaningfully supports a conceptual or cinematic announcement. Avoid embedding large base64 assets in working HTML unless the document must be portable; local asset paths are easier to maintain and render.
