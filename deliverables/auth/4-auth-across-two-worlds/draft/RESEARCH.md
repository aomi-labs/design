<!-- aomi-origin src=research adopted=2026-07-20 -->
# Research — engineering behind this story

_2026-07-20 · compiled from the article's v1→v2→v3 mechanisms mapped against the PR map, lineage, and GitHub._

## The launch checklist (dependents — the article presents these as current)
- `repo:aomi-labs/aomi#371` **dependent** — FE cedes AA to BE ("BE owns AA execution"); the article's v3 diagram assumes it.
- `repo:aomi-labs/product-mono#791` **dependent** — autonomous-agent runtime (condition-triggered wakes, thread credentials); this is the literal "6am auto-sign" claim.
- `repo:aomi-labs/product-mono#745` **dependent** — [Story] BetterAuth FE + DB migration, the canonical-identity root story, still open.
- `tree:wallet-sign-threads-era-wallet-signing-svm-aa-backend-integr` **dependent** — the active line carrying the execution plane.

## Identity plane ("who you are") — shipped
- `repo:aomi-labs/aomi#288` — Better Auth stack: BFF sessions + SIWE/provider linking (THE FE PR).
- `repo:aomi-labs/product-mono#677` — canonical-user request auth layer + account bearer (the aomi_uid root).
- `repo:aomi-labs/product-mono#755` — better-auth session tables migration (one shared DB).

## Execution plane ("what a wallet may sign") — shipped
- `repo:aomi-labs/product-mono#618` — Privy approval flow into backend (delegated key registration → KMS).
- `repo:aomi-labs/product-mono#717` — DbThread unification: account-scoped wallet selection (the WalletResolver home).
- `repo:aomi-labs/product-mono#778` — AA-to-BE signing/broadcast lane (the async signer).
- `repo:aomi-labs/product-mono#747` — MCP gateway on thread runtime + authorized signing (the "via MCP" path).
- `tree:auth-better-auth-bff-sessions-session-model` — the shipped identity-plane line.

## Honesty check before announcing
- `repo:aomi-labs/aomi-scrum#246` — LIVE BUG in this exact plumbing: bearers reaching the signing path without a resolved account (sentry doctor, assigned Kevin). Decide whether the post ships while this is open.
