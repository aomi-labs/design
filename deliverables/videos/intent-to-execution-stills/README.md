# From intent to execution: key-moment stills

Five text-free 1920×1080 PNGs from `../intent-to-execution/film.html`, with the Aomi mark and "aomi labs" in
the corner. `film.html` is a symlink; `clean.js` switches the film into clean mode, which hides every caption,
label, subtitle and in-diagram text and shows the brand mark. Blue is EVM, green is Solana, rose is a failure.

| File | Film time | Moment |
|---|---|---|
| `1-intent.png` | 9.7 s | Two requests, Ethereum and Solana, as floating chat bubbles |
| `2-caught-on-the-fork.png` | 81.0 s | Both transactions fail inside the sandbox, before anything is sent |
| `3-back-pressure.png` | 92.0 s | The back-pressure loop: model → fork → revert → back to the model, next to the CI version |
| `4-pass.png` | 99.4 s | Both pass on the fork |
| `5-settled.png` | 118.2 s | Both settle onto their chains |

To re-render, seek the film at a film time and screenshot `#stage` (any Playwright script works; `?render` disables autoplay).
