<!-- aomi-origin file:thread.md adopted=2026-07-21 -->

# X thread — One user, many wallets (auth across the onchain–offchain boundary)

Account: main (@aomi_labs) · Channel: X · Target: morning of 2026-07-18 ET
Images: aomi-design repo, `post/*.png` (2x renders of the explainer page)

---

**1/ — HOOK** · img: `00-hero.png`

Aomi is non-custodial. We're the harness layer for AI agents that execute onchain — one transaction interface across EVM + SVM — and we never hold your wallet.

Agents that sign at 6am while you sleep, and still no custody. How? 🧵

---

**2/ — CONTEXT: the problem** · img: `01-problem.png`

Onchain, an app only sees addresses.

alice@gmail.com controls a MetaMask, two embedded wallets (Privy, Para), a smart account, a Solana address. Five public keys, one human.

Treat any address as "the user" and you can't count users, rate-limit, bill, or keep continuity. A wallet is not a user.

---

**3/ — CONTEXT: how we got here** · img: `02-evolution.png`

v1: raw keys. We were a compiler — natural language in, unsigned tx out, you sign in a popup. Non-custodial, but useless while you sleep.

v2: embedded providers + delegation. Async unlocked — but privy-alice ≠ para-alice. Identity fractured.

v3: we mint one canonical user ID. Everything attaches to it.

---

**4/ — CORE MODEL: wallet topology** · img: `07-bipartite.png`

The whole protocol in one graph.

Each thread loads a wallet × chain topology — that's the user state. Txs queue per public key. Then the ACL resolves each queue to the ONE signer allowed to serve it:

tx for Base → 0x456 → Para, human signs
tx for Solana → N2e3df → delegated key in our KMS, auto-signs

---

**5/ — CORE MODEL: what happens after resolve** · img: `06-sequence.png`

Same request path, three endings, per wallet policy:

🟢 async — aomi KMS signs with the delegated key, broadcasts. Nobody awake.
🟡 sync — tx pushed to your frontend, you sign in your wallet.
🔴 read-only — signature request auto-rejected. Nothing signs.

Policy is data. The resolver just reads it.

---

**6/ — THE CUSTODY CLAIM** · img: `09-custody.png`

The only thing we ever hold is a leash you can drop.

That delegated key: registered through Privy/Para — never extracted from your wallet. Scoped to specific addresses. Fail-closed. And revocable at any time.

Kill it and the agent signs nothing. Standing grant ≠ custody.

---

**7/ — FROM THE ARTICLE: the deeper insight** · img: `03-four-proofs.png`

Under all of this, one realization: "sign in with a wallet" is actually FOUR separate proofs —

login proof · session · wallet association · execution authority

Most apps blur them into one. That blur is where you get either custody or chaos. We keep "who you are" and "what a wallet may sign" on separate planes.

---

**8/ — FROM THE ARTICLE: the boundary rule** · img: `04-account-graph.png`

Every credential gets verified at the edge, then exactly ONE artifact crosses our backend trust boundary: a short-lived assertion carrying just the canonical user ID.

SIWE sigs, provider tokens, session cookies, delegated grants — different issuers, verifiers, lifetimes. None of them travel.

---

**9/ — LINK** · img: `10-footer.png`

A wallet is not a user. A provider is not the identity root. A session is not a signing grant.

The full write-up — the account graph, the token taxonomy, six patterns for auth across the onchain–offchain boundary:

https://aomi.dev/research/auth-across-two-worlds

---

## Pre-flight checklist
- [ ] Replace placeholder link with the PRODUCTION article URL (staging is behind Vercel SSO)
- [ ] Verify Privy/Para handles before tagging (@privy_io / @getpara — currently untagged on purpose)
- [ ] Posts 4 and 5 must keep their exact images (copy references Base→0x456, Solana→N2e3df)
- [ ] Optional reach play: move the link to a reply and keep post 9 clean
