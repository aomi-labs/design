<!-- aomi-origin src=research adopted=2026-07-20 -->
# Research — engineering behind this story

_2026-07-20 05:38 · ask: can u search across our codebase for related PR that u might need for this?_

Mapping claims in the design explainer to engineering artifacts

- How app pricing (x402) is surfaced in the deployment/authoring UX and bound to a deployed app so fees are discoverable and immutable
  - product-mono#764 — adds app-level billing sidecars and x402 partner settlement; this is the primary control-plane change that introduces app billing metadata.
  - deployment-authoring-manager-backend-github-integration-depl — authoring and GitHub integration used to bind config to a deployed release.
  - deployment-deploy-sdk-cli-client-activation-watchdeployment- & deployment-authoring-aomi-build-deployments-ux-project-pages — UX and CLI surfaces that expose deployment-bound metadata (used to make the billing config discoverable and tied to a deployment).
  - product-mono#750 — permits app tokens to read deployment status, enabling runtime discovery of bound billing metadata.

- How the payments backend maps an app fee config to MPP-enabled payment intents for execution and partner settlement
  - payments-billing-payments-mpp-partner-settlement-ui-backend- — the shipped MPP + partner-settlement backend that converts billing configs into multi-path payment intents and settlement records.
  - product-mono#764 — x402 partner-settlement hooks that connect app billing sidecars to the payments backend.
  - product-mono#814 — split of platform vs partner thresholds, relevant for how thresholds/gates are enforced in partner settlement.

- Where fee collection hooks live in the transaction execution path (simulation → AA lane → signed execution) and how wallet-backed signing authorizes fee transfers
  - transactions-transaction-execution-simulation-infra-aa-anvil — simulation and AA infra where service-fee hooks run during simulate and pre-exec checks.
  - runtime-internal-actions-routed-action-execution-simulate-sc — runtime routing layer tying internal actions and billing hooks into the execution lane.
  - runtime-wallet-aa-svm-batch-multi-wallet-tx-execution & repo:aomi-labs/product-mono#357/#312 — batch/multi-wallet execution and wallet TX ordering, which underpin how fee transfers are signed/batched.
  - aomi#75 and aomi#76 — client-side AA fee simulation and fee injection (SDK) that show how fees are modelled at simulate time and injected for AA execution.
  - auth-privy-wallet-backed-auth-signer-flow-solana-e2e — example signer flows (Privy) for wallet-backed authorization; threads-era wallet signing (wallet-sign-threads-era-wallet-signing-svm-aa-backend-integr) is active and MUST ship before we present wallet-backed signing as fully shipped in the doc.
  - evm-tx-endpoint-threads-multi-chain-transaction-flow-mcp-gat is active and provides the MCP→exec surfaces referenced by the end-to-end execution path; it MUST ship before the story is published if we assert those endpoints are available.

- Observability and deployment touchpoints you need to validate fee routing, retries, and settlement (what to monitor and debug)
  - product-mono#840 — observability logs and AA path recovery groundwork; useful for tracing fee routes and error modes.
  - aomi#375 — connects observability detail to live backend data; practical traces and dashboards.
  - ops-deploy-ci-and-observability-backend-infra — infra and CI work that provides the monitoring/alerting channels and dashboards referenced in the doc.
  - product-mono#841 — release/observability build gating that enabled the above merges.

Notes on the deferred-credit gate (TURN_CAP) and sequencing

- The design brief emphasizes the deferred-credit gate (TURN_CAP checkpoints, allowing balances to run negative between checks, gate slam at settlement). The billing sidecars + partner-settlement work (product-mono#764) together with the payments MPP/partner-settlement backend implement the control-plane and runtime hooks the doc will describe. The runtime enforcement and AA-path recovery traces live in the transaction simulation/execution infra (transactions-transaction-execution-simulation-infra-aa-anvil, runtime-internal-actions-routed-action-execution-simulate-sc) and the observability/ops merges (product-mono#840, ops-deploy-ci-and-observability-backend-infra) provide the monitoring needed to validate checkpoints and settlement behavior.

Operational checklist for the writer / post author

- Mark dependent gaps to confirm before publish:
  - wallet-sign-threads-era-wallet-signing-svm-aa-backend-integr (active) — confirm this completes so wallet-backed signing flows can be shown as shipped.
  - evm-tx-endpoint-threads-multi-chain-transaction-flow-mcp-gat (active) — confirm MCP→exec endpoint work is merged if the doc shows those endpoints as available.
- Concrete artifacts to pull into the doc: PR diffs and code pointers from product-mono#764 (billing sidecars/x402), payments-billing MPP tree (MPP mapping + settlement logic), transactions-transaction-execution-simulation-infra-aa-anvil (simulation hooks), aomi#76 (SDK fee injection) and product-mono#840 (observability logs/traces).

If you want, I can: (a) produce a short wireframe of the post with these refs assigned to each section, or (b) open a short checklist issue enumerating the remaining active PRs that must land before publishing.

## Proposed links
- `repo:aomi-labs/product-mono#764` **related** — Add app-level billing sidecars and x402 partner settlement — core control-plane & billing config surface for app fees.
- `tree:payments-billing-payments-mpp-partner-settlement-ui-backend-` **related** — Payments backend (MPP + partner settlement) that maps fee configs into payment intents and settlement flows.
- `repo:aomi-labs/product-mono#840` **related** — Observability logs and AA path recovery groundwork — used for fee routing observability and AA lane tracing.
- `tree:transactions-transaction-execution-simulation-infra-aa-anvil` **related** — Transaction simulation and AA lane infra where fee-collection hooks (simulation → AA) are implemented.
- `tree:runtime-internal-actions-routed-action-execution-simulate-sc` **related** — Runtime routed/internal-action simulation surfaces — ties billing hooks into action execution path.
- `tree:runtime-wallet-aa-svm-batch-multi-wallet-tx-execution` **related** — Wallet / AA / batch execution plumbing that enforces signing semantics for fee transfers.
- `repo:aomi-labs/aomi#75` **related** — Client CLI AA service fee simulation — helps reproduce and debug fee injection at simulation time.
- `repo:aomi-labs/aomi#76` **related** — AA service fee injection and SDK upgrade — SDK/runtime pieces for injecting app fees into AA execution.
- `tree:auth-privy-wallet-backed-auth-signer-flow-solana-e2e` **related** — Wallet-backed auth / signer flows (Privy) — relevant to wallet-backed authorization of fee transfers.
- `tree:wallet-sign-threads-era-wallet-signing-svm-aa-backend-integr` **dependent** — Active work on threads-era wallet signing and SVM/AA backend integration — required before documenting wallet-backed signing as shipped.
- `tree:evm-tx-endpoint-threads-multi-chain-transaction-flow-mcp-gat` **dependent** — Active multi-chain endpoint / MCP gateway work — the story's end-to-end exec path (MCP → exec surfaces) depends on this shipping.
- `tree:deployment-authoring-manager-backend-github-integration-depl` **related** — Control-plane authoring & GitHub integration used to surface pricing in deploy/authoring UX and bind configs to a release.
- `tree:deployment-deploy-sdk-cli-client-activation-watchdeployment-` **related** — Deploy / CLI / client surfaces (activation, watchDeployment) that expose discoverable/immutable config tied to deployed apps.
- `tree:deployment-authoring-aomi-build-deployments-ux-project-pages` **related** — Deployments UX and project pages that surface app pricing and deployment-bound metadata to end users.
