# State — the story's running log

## Planned artifacts
- [ ] medium-post — Main long-form explainer (publish-ready): end-to-end x402 + MPP fee implementation, include diagram, code snippets, deployment notes, observability checklist — target 1,200–1,800 words
- [ ] x-post-thread — Twitter/X thread derived from finished Medium post (per STATE rule) — waits for Medium URL to include in tweet 7
- [ ] fee-flow-diagram — Interactive SVG/HTML visual for the post (embed in Medium) showing control-plane, payment intent mapping, AA execution lanes, deferred credit gate/ TURN_CAP checkpoints
- [ ] bundle-update-and-state — Update story bundle: commit medium post to post/, archive drafts to draft/archive, add STATE.md entries and links to PRs and related repos
- [ ] short-link-asset — Short summary blurb (280–300 chars) for cross-posting and social meta description

## 2026-07-20 04:58
Center the post on the deferred credit gate: TURN_CAP checkpoints, balance allowed to run negative between checks, gate slams at settlement. The x-post thread should be derived from the finished doc, not written independently.

## 2026-07-20 05:27
can u search across for the relavant PR related to our overview?

## 2026-07-20 05:37
can u search across our codebase for related PR that u might need for this?

## 2026-07-20 16:10
Victor: taking this over for the week. Plan — turn the adopted x402 doc into a
medium post (iterate here as medium-x402-fees-vN), derive the x thread from the
finished draft per the 04:58 rule, add a fee-flow visual. Target: medium posts
Friday 07-24.

## 2026-07-24 09:50
Victor: v3 adopted → post/, posts Friday. v1/v2 retired to archive. The x thread
(x-thread-x402-v1.md) stays in draft until the medium link is live — it needs the
URL for tweet 7. Next week: MPP settlement deep-dive as a follow-up story.

## 2026-07-20 18:12
in order to write this post I need more info about deployment as well

## 2026-08-14 15:05
Detected live on @aomi_labs: https://x.com/aomi_labs/status/2076717509571698872 (agentic detector, confidence 0.95). Post announces Somm as the first team building agentic finance on Aomi and links docs/site — matches the deliverable about how Somm implements app fees and the end-to-end build (account was unspecified so either account may match).
