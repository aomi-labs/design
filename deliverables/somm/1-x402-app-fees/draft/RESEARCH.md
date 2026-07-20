<!-- aomi-origin src=research adopted=2026-07-20 -->
# Research — engineering behind this story

_2026-07-20 05:42 · ask: can u search across our codebase for related PR that u might need for this?_

Mapping of story claims to code/PR evidence

1) How app pricing (x402) is surfaced in the deployment/authoring UX and bound to a deployed app
- repo:aomi-labs/product-mono#764 — primary implementation of app-level billing sidecars and x402 partner settlement.
- repo:aomi-labs/product-mono#750 — app tokens can read deployment status (used to surface/verify bound billing config).
- repo:aomi-labs/product-mono#787 — deploy control-plane manager and GitHub proxy changes used by the deployment flow.
- tree:deployment-authoring-aomi-build-deployments-ux-project-pages (dependent) — active authoring/deploy UX work; required for the UX claims in the post.
- tree:runtime-app-loader-appstore-runtime-catalog-and-init (dependent) — runtime catalog/app loader changes required to make pricing discoverable and immutable at runtime.
- repo:aomi-labs/aomi-sdk#62 — `config` subcommand for live registry edits; shows how billing config can be edited/inspected.

2) How the payments backend maps an app fee config to MPP-enabled payment intents for execution and partner settlement
- repo:aomi-labs/product-mono#764 — billing sidecars + partner settlement mapping logic.
- tree:runtime-wallet-aa-svm-batch-multi-wallet-tx-execution — runtime support for batched/multi-wallet txs used to materialize MPP payment batches.
- repo:aomi-labs/product-mono#321 and #326 — managed batch simulation and managed-fork batch simulation used to generate & validate MPP-enabled payment intents and settlement scenarios.
- repo:aomi-labs/product-mono#357 — wallet queueing & batch execution primitives used when emitting multi-path/multi-wallet payment intents.

3) Where fee collection hooks live in the transaction execution path (simulation → AA lane → signed execution) and how wallet-backed signing authorizes fee transfers
- tree:transactions-transaction-execution-simulation-infra-aa-anvil — simulation and AA infra (simulate → AA lane) used in the explainers' execution path.
- tree:runtime-internal-actions-routed-action-execution-simulate-sc — routed internal action execution and simulation; where fee hooks are called.
- repo:aomi-labs/product-mono#778 — AA-to-BE signing/broadcast lane that surfaces the AA signing/broadcast lane referenced in the flow.
- repo:aomi-labs/aomi#75 and #76 — client CLI AA fee simulation and AA fee injection support; shows simulation & injection behavior.
- repo:aomi-labs/aomi#144 — fixes to x402 chat failures and wallet thread persistence; ties x402 handling to wallet-threaded execution.
- tree:wallet-sign-threads-era-wallet-signing-svm-aa-backend-integr (dependent) — active wallet-backed auth & authorized signing integration required for the wallet-backed signing claims.
- repo:aomi-labs/product-mono#312 — fixes wallet tx validation and approval emission ordering relevant to correct authorization ordering for fee transfers.

4) Observability and deployment touchpoints to validate fee routing, retries, and settlement
- repo:aomi-labs/product-mono#840 — observability logs, flop cleanup, and AA path recovery work; primary observability evidence.
- repo:aomi-labs/aomi#375 — connects observability detail to live backend data (used for concrete monitor/debug guidance).
- repo:aomi-labs/product-mono#841 — ensures observability changes are included in the backend release build.

Notes on dependencies (must-ship before announce)
- tree:wallet-sign-threads-era-wallet-signing-svm-aa-backend-integr is active and implements the wallet-backed signing integration the story treats as real; this must land before publishing the explainer that claims wallet-backed signing behavior is available.
- tree:deployment-authoring-aomi-build-deployments-ux-project-pages is active and supplies the deployment/authoring UX surface the doc shows; the UX claims depend on this landing.
- tree:runtime-app-loader-appstore-runtime-catalog-and-init is active and required to make pricing discoverable via the runtime catalog and to bind billing metadata to deployed apps; this should land prior to claiming immutable discoverability.

Quick checklist for the doc author
- Point to product-mono#764 as the canonical implementation of x402 billing sidecars.
- Show simulation samples and CLI commands from aomi#75/#76 to demonstrate pre-flight simulation of AA fees.
- Use product-mono#321/#326 and the simulation infra tree to show how MPP intents are built and validated in managed simulation runs.
- Reference product-mono#778 and the transactions simulation infra when describing the AA lane → signed execution transition and where fee hooks run.
- For observability examples and concrete log fields/traces, draw from product-mono#840 and aomi#375.
- Hold off public claims about wallet-backed signing UX and deployment-surface until the two active trees (wallet-sign threads + deployment-authoring/runtime-app-loader) have landed; those are marked dependent above.

## Proposed links
- `repo:aomi-labs/product-mono#778` **related** — AA-to-BE signing/broadcast lane — provides the AA signing/broadcast path and SVM anchor integration referenced in the execution lanes.
- `repo:aomi-labs/product-mono#357` **related** — Wallet execution primitives: queueing and batch wallet execution that underpin wallet-backed signing and batching of fee transfers.
- `repo:aomi-labs/aomi#144` **related** — Fixes x402 chat failures and wallet thread persistence — ties x402 handling to wallet-threaded execution flows.
- `repo:aomi-labs/product-mono#321` **related** — Adds managed batch simulation for pending transactions — used by the payments backend to produce MPP-enabled payment intents and simulate settlement outcomes.
- `repo:aomi-labs/product-mono#326` **related** — Restores managed-fork batch simulation for arbitrary EOAs — supports testing/replay of multi-path payment intents and negative-balance/deferred checks.
- `repo:aomi-labs/product-mono#312` **related** — Fixes wallet tx validation and approval emission ordering — important for correct wallet-backed signing and fee transfer authorization ordering.
