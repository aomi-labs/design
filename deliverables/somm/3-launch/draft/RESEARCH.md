<!-- aomi-origin src=research adopted=2026-07-20 -->
# Research — engineering behind this story

_2026-07-20 06:20 · ask: find relavent ENG ITEM that prep for this_

Mapping of story claims to engineering items

Claim: "Somm ships app-level fees on aomi rails (x402 pricing + MPP settlement)"
- repo:aomi-labs/product-mono#764 — Adds app-level billing sidecars and x402 partner settlement; this is the primary backend implementation that enables partners (like Somm) to price and settle app fees via x402 flows.
- repo:aomi-labs/product-mono#814 — Splits platform and partner billing thresholds so partner fees and platform thresholds are separated for correct accounting and settlement.
- repo:aomi-labs/aomi#76 — Adds AA service fee injection and SDK upgrade; provides the runtime hook (AA/service-fee injection) used by apps/agents to include app fees in user transactions.

Claim: "Somm does not need to build payments infrastructure — aomi rails handle pricing + settlement"
- repo:aomi-labs/aomi-sdk#89 (OPEN) — Intends to ship pricing.toml sidecars in release bundles. Pricing sidecars are how app-level pricing is declared and packaged with app releases; this is required for the billing sidecars to consume pricing metadata. Because this PR is OPEN and the story presents pricing sidecars as an existing capability, mark as DEPENDENT (must ship before announcement).
- repo:aomi-labs/product-mono#352 — Loader validation of SDK_VERSION/RELEASE_TAG helps ensure bundles that include pricing sidecars are accepted and deployed.

Claim: "Somm is live (agent deployed) and can charge/settle on aomi"
- repo:aomi-labs/somm-finance-apps#1, #2, #3 (OPEN) — Deploy somm-agent entries; these are the actual partner agent deploys. They are OPEN and the launch narrative presents the agent as live and charging fees, so these must be deployed (DEPENDENT) before announcing.

Reliability, monitoring, and edge fixes shown in the video
- repo:aomi-labs/aomi#144 — Fixes x402 chat failures and wallet thread persistence; relevant to ensuring x402 flows used for pricing are stable in the UI/runtime.
- repo:aomi-labs/product-mono#840 — Adds observability logs and groundwork for outcome-based pricing and AA path recovery; these provide monitoring and recovery primitives shown or referenced in the video.

Notes for marketing/post authoring
- Required-before-launch (DEPENDENT, OPEN): aomi-sdk#89 (pricing sidecars) and all open somm-finance-apps#1-3 deploy items — these must be completed for the story's runtime claims to be true.
- Core backend/runtime work that already landed (MERGED) and justify the architecture animation: product-mono#764, product-mono#814, aomi#76, aomi#144, product-mono#352, product-mono#840.

Suggested use in copy/visuals
- Use product-mono#764 as the reference when explaining "x402 partner settlement" and app-level billing sidecars.
- Call out aomi-sdk#89 (once merged) when describing how app pricing metadata is packaged (pricing.toml) and included in release bundles.
- For live demo/screenshots, verify the somm-agent deploys (somm-finance-apps#1/2/3) are completed and reference the successful deployment PR(s) in engineering notes.

## Proposed links
- `repo:aomi-labs/product-mono#764` **related** — Implements app-level billing sidecars and x402 partner settlement — the core platform work that enables partner-charged app fees.
- `repo:aomi-labs/product-mono#814` **related** — Splits platform vs partner billing thresholds — needed to represent partner (Somm) fee accounting separately from platform fees.
- `repo:aomi-labs/aomi#76` **related** — Adds AA service fee injection and SDK upgrade — the runtime hook used to inject app-level fees into account-abstraction flows.
- `repo:aomi-labs/aomi-sdk#89` **dependent** — Open PR to ship pricing.toml sidecars in release bundles (OPEN) — pricing sidecars are required by the billing sidecars flow and must be shipped before announcing app-level pricing.
- `repo:aomi-labs/somm-finance-apps#1` **dependent** — Open item to deploy the somm-agent (OPEN) — the partner agent that actually charges/settles app fees and must be deployed prior to the launch announcement.
- `repo:aomi-labs/somm-finance-apps#2` **dependent** — Open item to deploy the somm-agent (OPEN) — additional deployment entry for the somm-agent; deployment must be complete before announcing the integration.
- `repo:aomi-labs/somm-finance-apps#3` **dependent** — Open item to deploy the somm-agent (OPEN) — another somm-agent deploy PR; the agent needs to be live for the story's claims to be real.
- `repo:aomi-labs/aomi#144` **related** — Fixes x402 chat failures and wallet thread persistence — stability fixes relevant to reliable x402 pricing flows.
- `repo:aomi-labs/product-mono#840` **related** — Adds observability logs and groundwork for outcome-based pricing + AA path recovery — useful for monitoring and troubleshooting partner billing and MPP settlement.
- `repo:aomi-labs/product-mono#352` **related** — App loader validates SDK_VERSION and RELEASE_TAG — helps ensure release bundles (with pricing sidecars) are valid at deploy time.
