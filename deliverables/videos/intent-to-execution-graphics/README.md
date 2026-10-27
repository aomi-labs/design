# From intent to execution: social posts and graphics

## Posts (`iso.html`, 1920×1080)

Isometric illustration posts for X: a big serif headline, one mono line, and a small 3D scene that makes
one point. `iso.html?n=1…5` renders each one; screenshot `#stage` to export. Sky = EVM / passed, green =
Solana, rose = failed.

| File | Headline | Scene |
|---|---|---|
| `post-1-same-model.png` | Same model, same prompt. | No harness (scattered calls, errors, a terminal) vs. the Aomi harness (a clean pipeline into a wallet) |
| `post-2-why-a-harness.png` | Why a harness. | Performance, tokens, security: 9 → 5 calls, 12 → 1 reads, 0 → 2 simulations |
| `post-3-dozen-calls.png` | A dozen calls, one function. | A cloud of calls funnels through a gate into one context cube wired to ETH and SOL |
| `post-4-fail-on-a-fork.png` | Fail on a fork, not onchain. | A rose revert loops back to the model; a passing run reaches the chain with a receipt |
| `post-5-six-steps.png` | Six steps, one signature. | Ethereum and Solana lanes merge through a gate into one bundle each, then one wallet |

## Slide-style graphics (`graphics.html`)

Five 1920×1080 graphics, each a designed composition (not a frame of the video) rebuilt from the film's
elements, with the Aomi mark and "aomi labs" in the corner. All five live in `graphics.html`, one
`<section class="g">` per graphic; render a PNG by screenshotting each section.

| File | Point |
|---|---|
| `1-side-by-side.png` | Claude Code alone vs. Claude through Aomi: the terminal against the Aomi trace, with tool calls, questions, simulations, signatures |
| `2-why-a-harness.png` | Performance, token efficiency, security, with the numbers |
| `3-context-instantiation.png` | One call instead of a dozen: deterministic reads as a software function |
| `4-back-pressure.png` | Back pressure that enforces correctness (three-gates slide 6) |
| `5-one-transaction-key-in-wallet.png` | Account abstraction into one transaction; commit is the only way out; the key stays in your wallet |

Blue is EVM and passed, green is Solana, rose is a failure. The Claude Code terminal is the same
reconstruction used in the film.
