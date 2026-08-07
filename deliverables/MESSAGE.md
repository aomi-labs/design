---
version: 4
---

# The message

The canonical statement of what aomi is. Every presentation surface — decks,
landing, info pages, the Telegram blurb — is a FORMAT of this file; when this
file changes, every surface below it needs a migration pass before it can be
called "not wrong." The Core board renders the audience sections as a composer:
core line always, tails picked per audience.

v4 separates what v3 conflated, ordered the way the file is used —
problem, answer, register, ledger:

- **Problems** — why anyone CARES. The buyer's pain per segment, in the
  buyer's language. Surfaces open here, not with the product.
- **Base paragraphs** — the ANSWER, ready to paste. The ground truth written
  out as prose, once per voice (marketing first), each paragraph opening on
  a pain from Problems and closing on aomi's answer. Copy from here for
  emails, decks, and bios; the blurb builder imitates the one matching its
  register.
- **Voice** — how to SAY it. Two registers over the same ground truth:
  technical (docs, README, engineer-facing) and marketing (decks, info pages,
  investor/partner-facing). A surface picks one; it never invents facts.
- **Ground truth** — what is TRUE. Numbered technical claims, precise terms,
  no rhetoric. The closed world everything above renders from; nothing may
  be claimed that is not here.

## Core line — always

> Aomi Labs: the execution harness for onchain AI.

## Problems

What hurts, per buyer, in the buyer's language. Every surface opens with the
problem it solves — pick the one that matches the audience.

- **Anyone building with AI + money**: AI agents can reason about markets,
  but letting one touch real money onchain is where every team gets stuck.
- **Wallets & retail fintech**: chat-to-trade is on every roadmap; the
  safety layer underneath it is why the roadmap slips. The chat UI is a
  sprint — the simulation, policy, and multi-chain execution under it is
  the year.
- **Trading platforms & venues**: users want limit orders, stops, DCA —
  order types the venue doesn't ship, each one a fill worth a fee. They
  have to run somewhere off the venue, continuously, without holding keys.
- **Asset managers, vaults, treasuries**: the manager owns the strategy;
  the execution stack holds them back — per-venue integration burden, 24/7
  operations on human headcount, and (post-Stream) allocators who demand
  proof a vault does only what its policy permits.
- **Retail users**: AI can already tell you what to do with your crypto;
  it can't safely do it for you.

## Base paragraphs — marketing

The Problems above, answered in order, marketing voice. For decks, bios,
intro emails, and anywhere the reader is an investor or business partner.
Each paragraph opens on a pain from the Problems section and closes on
aomi's answer to it.

1. AI agents can already reason about markets; letting one touch real money
onchain is where every team gets stuck. Aomi Labs builds the execution
harness for onchain AI — the layer that solves exactly that: plain-language
instructions become real transactions, on any chain, from any wallet.

2. The fear is always the same — one hallucinated transaction, one drained
wallet, one headline that retires the feature. So safety is structural, not
a promise: every transaction is checked against the protocol's own contracts
when it is built (type-checked at compile time) and rehearsed on a live copy
of the chain — a fork of live state — before anything is signed. The agent
proposes; the user's own key signs; anything malformed or out-of-policy
stops before signature.

3. Custody is the deal-breaker for any product that adds this — key risk
nobody wants on their balance sheet. Aomi never takes it: keys never leave
the user, and aomi plugs in above the wallet infrastructure a product
already runs. Custody never changes hands, a breach isn't a fund loss, and
the self-custody story a wallet sells stays exactly true.

4. Building the agent infrastructure in-house is the year of work that makes
the roadmap slip — the chat UI is the easy part. Aomi is that build, already
done and run as a cloud service: trading bots, prediction-market agents, and
DeFi assistants that builders ship in days, not months, with UI components,
Telegram and Discord integrations, and an SDK — one integration, every
surface the product lives on.

5. And a new surface should be a new revenue line, not just a new cost.
Pricing and settlement rails come out of the box (x402, MPP), so a partner
can price, charge, and settle fees on their agent without building billing
infrastructure. It runs in production today with Somm Finance, a DeFi vault
product that settles its own app fees on aomi rails.

## Base paragraphs — technical

The same Problems, answered in the same order, technical voice. For READMEs,
docs intros, integration one-pagers, and anywhere the reader is an engineer.
Each paragraph states the engineering problem, then the mechanism and the
guarantee it produces.

1. The hard problem in agentic finance is execution: natural language has to
become a correct transaction against heterogeneous protocols and chains.
Aomi Labs builds the execution harness for onchain AI — a runtime that turns
natural-language instructions into real onchain execution against arbitrary
protocols and smart contracts: any chain, any wallet, EVM and SVM behind one
interface.

2. Language must never cause an unverified state change. Every transaction
therefore follows one pipeline — build, simulate, sign, broadcast:
type-checked at compile time against the protocol's contract interfaces,
then simulated against a fork of live chain state,
served in ~200ms from a full blockchain client, before anything is signed.
The guarantee: a transaction that fails simulation never reaches a
signature.

3. Machine auth without key custody is the second hard problem. Execution is
non-custodial by construction — keys never leave the user; signing runs
provider-native (Para, wagmi connectors, in-house adapters) with
EIP-4337/7702 account abstraction and Solana Jito broadcast built in. Policy
is enforced outside the model: spend caps, venue allowlists, human-sync or
autonomous-within-caps modes, instant halt and revoke — an out-of-policy
transaction stops before signature.

4. Per-venue integrations, per-surface builds, and per-tenant containers are
the cost curves that kill this in-house. Aomi is a hosted runtime that
serves every user and every surface — web, Telegram, Discord, Slack — from
one process, with an end-to-end stack: React UI components, a Rust SDK, and
a skills system (`npx skills add aomi-labs/skills`) so an agent's
capabilities are installable and versioned.

5. Metering and settlement are native, not bolted on: x402 pricing and MPP
settlement out of the box, per-call and app-level. The runtime is in
production today with Somm Finance, whose conversational vault surface runs
on aomi and settles its own app-level fees on aomi rails.

## Voice — technical

For docs, READMEs, engineer- and integrator-facing surfaces.

- Precise terms stand on their own: type-checked at compile time, forked
  live state, EIP-4337/7702, x402 — no softening, no analogies.
- State the mechanism, then the guarantee it produces.
- Numbers with units and sources; commands and package names verbatim.
- Honest limits are part of the spec: say where aomi is not a fit.

## Voice — marketing

For decks, info pages, blurbs, investor- and partner-facing surfaces.
Written the way you'd explain aomi to a smart, non-technical investor.

- Open with the buyer's problem, not the product.
- One idea per sentence. If a sentence needs a second read, split it.
- Plain words first; the technical term may follow in the same sentence,
  never alone. ("rehearsed on a live copy of the chain — a fork of live state")
- Never stack more than one technical term per sentence.
- Keep the proof: numbers, Somm in production, and honest limits outrank
  adjectives. No hype words, no emoji, no headings.
- Say who signs: the agent proposes, the user's own key signs.

## Ground truth

The closed world of claims. Generated copy may rephrase, reorder, and
recombine these for a target audience and voice — never add a capability,
number, partner, or promise that is not here. Keep each claim precise and
verifiable; this section is allowed to be dense, the voices exist to unpack it.

1. Aomi is a runtime that turns natural-language instructions into real
onchain execution against arbitrary protocols and smart contracts — any
chain, any wallet, EVM and SVM behind one interface.

2. Every transaction follows one pipeline: build → simulate → sign →
broadcast. Transactions are type-checked at compile time against the
protocol's contract interfaces (bindings generated from ABIs) and simulated
against a fork of live chain state (~200ms, served from a full blockchain
client) before anything is signed.

3. Execution is non-custodial by construction: keys never leave the user;
the agent proposes, the user's own key signs. Account abstraction
(EIP-4337 / EIP-7702) and Solana Jito broadcast are built in; signing
integrates provider-native (Para, wagmi connectors, in-house adapters).

4. Policy is enforced outside the model: spend caps, venue allowlists,
per-wallet rules, human-sync or autonomous-within-caps modes, instant halt
and revoke. A malformed or out-of-policy transaction stops before signature.

5. Aomi is a cloud host for agentic applications — trading bots,
prediction-market agents, DeFi assistants — deployed and owned by
developers, companies, and agents themselves. Partners keep their own
frontend, APIs (as tools), and wallets; aomi hosts the execution. One
runtime serves every surface: web, Telegram, Discord, Slack. Builders ship
in days, not months.

6. The stack is end-to-end: React UI components (`@aomi-labs/widget-lib`,
`@aomi-labs/react`), Telegram and Discord integrations, a Rust SDK, and a
skills system (`npx skills add aomi-labs/skills`) so an agent's capabilities
are installable and versioned.

7. Payments are native rails: x402 pricing and MPP settlement out of the
box, so a partner can price, charge, and settle app-level fees on aomi
without building billing infrastructure.

8. The runtime is in production today with Somm Finance, a DeFi vault
product whose conversational surface runs on aomi and settles its own app
fees on aomi rails.

## Audience — retail

Marketing voice, worked example.

AI can already tell you what to do with your crypto. Aomi lets it actually do
it — safely. You type plain English ("move my USDC to the best yield"), and
your agent builds the transaction, rehearses it on a live copy of the chain,
and shows you exactly what will happen before you sign. Your keys never leave
your wallet — the agent proposes, you sign. Trading bots, prediction-market
agents, DeFi assistants: multi-chain, multi-wallet, ready in one chat.

## Audience — business · hosting

Marketing voice, worked example.

Every team adding AI to a crypto product hits the same wall: letting an agent
touch real money is where the roadmap slips. Aomi is that layer, already
built and run for you as a cloud service. You keep your frontend, your APIs,
and your wallets; aomi hosts the agents and the execution underneath. The
stack ships ready to embed — React components, Telegram and Discord
integrations, a Rust SDK — so teams go from idea to a working agent in days,
not months.

## Audience — business · transaction processing

Marketing voice, worked example.

Aomi's runtime turns an instruction into an executed transaction, and nothing
executes that hasn't been proven first. Every transaction is checked for
correctness when it is built (type-checked at compile time), rehearsed on a
live copy of the chain before anything is signed, and signed only by the
user's own key — aomi never takes custody. Account abstraction and
multi-chain, multi-wallet support are standard. Payments are built in too:
x402 pricing and MPP settlement let you price, charge, and settle fees on
your agent without building billing infrastructure.

## Link registry

- 🌐 Website: https://aomi.dev
- 🤖 Agents: https://aomi.dev/agents
- 📖 Docs: https://aomi.dev/docs/build/overview
- 𝕏 Twitter: https://x.com/aomi_labs
- 💻 GitHub: https://github.com/aomi-labs
- 💬 Discord: https://discord.gg/YK2sqKDBYh
- 📦 npm: https://www.npmjs.com/package/@aomi-labs/react
- 📦 crates: https://crates.io/crates/aomi-sdk
- 🧩 Skills: `npx skills add aomi-labs/skills`

## Builder examples

- [kuroko](https://github.com/0xgordian/kuroko) — an AI hybrid trading platform for prediction markets, by [@0xgordian](https://x.com/0xgordian).
- [aomi-trader](https://github.com/Julian-dev28/aomi-trader) — a Hyperliquid trader that watches live BTC-PERP price action and executes trades, by Julian Martinez ([@j_dev28](https://x.com/j_dev28)).
- [orca](https://github.com/victorchimakanu/orca) — autonomous arbitrage on Polymarket, driven by plain English, by [@DecentralDev_](https://x.com/DecentralDev_). [Watch the demo](https://youtu.be/b8aPweQHPL0)
- [aomi-polymarket-demo](https://github.com/Funsho-ops/aomi-polymarket-demo) — Jupiter Perps AI: never get liquidated in your sleep, by [@funshoakinbile](https://x.com/funshoakinbile).
