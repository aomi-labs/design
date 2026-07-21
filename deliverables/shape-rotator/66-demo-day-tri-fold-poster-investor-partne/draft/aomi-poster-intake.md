<!-- aomi-origin src=upload adopted=2026-07-21 -->

# Tri-fold poster intake — aomi (investor / partner pitch)

> Drafted by the aomi marketing assistant from the marketing brief (scrum.aomi.dev/marketing/llms.txt).
> `⟨FILL: …⟩` = needs a real fact I won't invent (metrics, team, links). ★ = minimum-viable-poster field.

## A. Basics  (→ title banner + team block)

**A1. ★ Product name**
Aomi

**A2. ★ Tagline (≤10 words)**
The native harness on blockchains.
_(alt: "Natural language, safely executed on-chain.")_

**A3. Logo file**
⟨FILL: path to aomi wordmark SVG/PNG — none yet? flag it⟩

**A4. Team members + roles**
⟨FILL: founders + roles — names, titles, 1-line each. Investor boards expect this.⟩

**A5. Event + audience**
Investor / partner pitch. Audience = investors and hosting/protocol partners. They score on: traction, defensibility (why the moat holds), market size, and team.

**A6. Required affiliations on the board**
⟨FILL: any backer / accelerator / partner logos to display, or "none"⟩

## B. The problem  (→ LEFT: Problem + Who it's for)

**B1. ★ What problem does this solve? (2–3 sentences)**
Getting software to act on-chain from natural language is slow and dangerous. Teams hand-wire an LLM to wallets and RPC endpoints, ship custodial glue code, and still can't guarantee a transaction does what the user actually asked. Months of infrastructure go by before a single safe swap ships.

**B2. ★ Who exactly has this problem? (specific persona)**
Teams building agentic applications on crypto — DeFi assistants, agentic trading products, fintech + wallet apps — and the platforms that want to host many such Apps for their users.

**B3. One quantified pain stat, with source**
⟨FILL: a real, sourced number — e.g. $ lost to custodial-agent / key-mismanagement incidents, or avg. months-to-ship for an in-house on-chain agent. Must have a citation for an investor board.⟩

**B4. How is it handled today, and what's wrong with that? (≤3 bullets)**
- DIY LLM→wallet glue: custodial, unaudited, no simulation — one bad call moves real funds.
- Generic agent frameworks: not chain-aware, no type safety over protocols.
- Custodial trading products: the user surrenders their keys to a third party.
_Gap: nothing is non-custodial **and** type-checked **and** simulated before signing._

## C. The solution  (→ LEFT: Our Approach)

**C1. ★ What is the product, in one sentence?**
Aomi is a non-custodial runtime that turns natural language into type-checked, pre-simulated on-chain execution — and hosts the agentic Apps built on it.

**C2. The 30-second elevator description**
A builder describes an action in natural language. Aomi's harness resolves it to real protocol calls, type-checks them at compile time, simulates the transaction against live chain state, and executes non-custodially — the user's key never leaves their control. Aomi also hosts the App around it (React headless library, Telegram/Discord, Rust SDK), so teams ship in days, not months.

**C3. The ONE differentiator — why you over the alternatives?**
Security is structural, not bolted on. Every action is compile-time type-checked and simulated before it can be signed, and it's non-custodial by construction. Competitors wrap an LLM around a wallet; aomi makes an unsafe transaction impossible to express in the first place.

## D. How it works  (→ CENTER: diagram)

**D1. Main components / modules (3–7)**
- Runtime / harness — natural language → protocol execution
- Protocol type system — compile-time-checked calls
- Simulation layer — dry-run against live chain state
- Non-custodial signer — key stays with the user
- Hosting platform — runs the App in the cloud
- Headless React library + Telegram/Discord integrations
- Native payment rails — x402 pricing + MPP settlement

**D2. ★ The flow in 3–6 numbered steps (input → outcome)**
1. User states intent in natural language
2. Harness resolves it to typed protocol calls (compile-time checked)
3. Transaction is simulated against live chain state
4. User signs — non-custodially, key never leaves them
5. Executed on-chain; outcome returned to the App

**D3. Existing architecture diagram?**
None — draw simplified (5-box left→right flow, matching D2).

**D4. The key technical innovation, in one sentence a non-expert understands**
A type system over on-chain protocols that makes an invalid or un-simulated transaction impossible to build.

## E. Features  (→ RIGHT: Key Features)

**E1. ★ Top 3–5 features — name + benefit in ≤8 words**
- Non-custodial by construction — keys never leave the user
- Compile-time type checking — invalid calls won't build
- Simulate before sign — see the outcome first
- Cloud-hosted Apps — ship agentic apps in days
- Native payment rails — x402 pricing, MPP settlement

## F. Results / proof  (→ RIGHT: Metrics)

**F1. ★ 2–4 headline numbers (metric, value, baseline it beats)**
⟨FILL — investor-critical, must be real. Candidates to source:⟩
- ⟨FILL: # Apps live / hosted⟩
- ⟨FILL: $ volume or value executed on-chain⟩
- ⟨FILL: transactions simulated / executed⟩
- Ship in days vs. ⟨FILL: baseline months⟩

**F2. Testing done**
⟨FILL: what's been tested — chains/protocols covered, N transactions, audit status⟩

**F3. Users / pilots / testimonials?**
⟨FILL: partner names, pilot results, a quote + attribution — strong on a partner board⟩

## G. Tech stack  (→ RIGHT: badge strip)

**G1. Languages, frameworks, hardware, APIs / services**
Rust (Axum backend, runtime, core orchestration) · MCP server · Aomi SDK 3.0.3 · `@aomi-labs/client` 0.3.2 (headless React library) · Cloudflare edge worker · Telegram / Discord integrations · x402 + MPP payment rails · toolchain 1.93.0

## H. Demo assets  (→ CENTER: hero + demo callout)

**H1. Best 1–3 screenshots / photos (which is hero?)**
⟨FILL: paths. HERO = portal screenshot mid-execution (intent typed + simulation result showing).⟩

**H2. Demo video URL (becomes a QR)**
⟨FILL: demo video URL⟩

**H3. Live demo at the booth? What does it show in 60 seconds?**
Yes. Type "swap 100 USDC to ETH on Base" → watch the harness resolve it, simulate and show the expected outcome, then execute non-custodially — end to end in under a minute.

## I. The journey  (optional → RIGHT: Challenges & Learnings)

**I1. Hardest problem + how you solved it**
Making the type system expressive enough to cover arbitrary protocols while keeping unsafe calls unrepresentable. ⟨FILL: confirm framing / add specifics⟩

**I2. What you'd do differently**
⟨FILL: optional⟩

**I3. Biggest thing you learned**
⟨FILL: optional⟩

## J. Future  (→ RIGHT: Roadmap)

**J1. Next 2–3 concrete roadmap items**
⟨FILL: confirm — draft from direction notes:⟩
- Agent-held wallets & delegation (SIWE-native account model)
- Multi-App hosting fleet / App marketplace
- Broader protocol + chain coverage

**J2. The big vision, one sentence**
Every app can act on-chain safely from natural language — aomi is the harness underneath.

## K. Links  (→ QR codes)

**K1. ★ Repo / website URL**
⟨FILL: confirm — aomi.dev · github.com/aomi-labs⟩

**K2. Contact (email / social)**
⟨FILL: Discord invite · contact email⟩

**K3. Which QRs to print? (video / repo / site / contact)**
Site, docs, GitHub, Discord

## L. Design constraints  (→ global styling)

**L1. Brand colors (hex)**
Ink `#09090B`, sky blue `#5288C2`, rosy pink `#DF5D90` (decorative accent) + neutrals. Flat — no gradients, shadows, or glow.

**L2. Fonts**
PT Serif (display) · Geist (body) · Geist Mono (code)

**L3. Light or dark board**
Light board, ink text — matches the flat editorial voice and prints with high contrast.

**L4. Board size**
Standard 36″ × 48″ tri-fold (center 24″, wings 12″ each).

**L5. Printing method**
Print-shop panels — two 12×36 + one 24×36 at 300 dpi.

---
MVP status: A1 ✓ · A2 ✓ · B1 ✓ · B2 ✓ · C1 ✓ · D2 ✓ · E1 ✓ · **F1 ⟨needs real numbers⟩** · **K1 ⟨confirm URL⟩**
