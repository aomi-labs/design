# Consumer Wallets & Retail Crypto Fintech: Market Research for aomi (2025–2026)

> Researched 2026-07-24 via web sweep (subagent). Purpose: learn the wallet / retail-fintech
> sector's structure, vocabulary, and pain points so aomi's pitch speaks wallet-PM language —
> and answer "why doesn't Rainbow have a chat-to-trade page?" All stats carry inline sources;
> data-quality flags at the bottom.

## Executive Summary

- **The chat-to-trade gap is real but closing fast at the top**: Coinbase (Base app, July 2025), OKX (Agentic Wallet, March 2026), MetaMask (Agent Wallet early access, June 2026), Kraken (AI-native app rebuild, July 2026) and Robinhood (Cortex + agentic trading) have all now shipped or announced conversational/agentic trading. The mid-tail — Rainbow, Phantom, Trust, Zerion, Rabby, Family — has shipped **nothing**, and that's aomi's beachhead.
- **Why Rainbow hasn't shipped it**: not lack of demand — lack of safe-execution infrastructure plus tiny-team focus. Rainbow's roadmap through 2026 is token launch (RNBW, Feb 5 2026), Hyperliquid perps, and a token launcher — zero AI ([Blockonomi](https://blockonomi.com/rainbow-prepares-rnbw-token-launch-with-overhauled-crypto-app-experience)). Meanwhile Rainbow's annualized swap fees are only ~$2.16M ([DeFiLlama](https://defillama.com/protocol/rainbow-wallet)) — they need new take-rate surfaces more than anyone.
- **Demand proof is overwhelming**: Telegram bots with atrocious UX did $23.4B lifetime volume on Trojan alone (1.7M users) and BONKbot peaked at $4.35M/month in fees ([CoinGecko](https://www.coingecko.com/learn/top-telegram-trading-bots)); DeFAI tokens hit $100M+ caps in weeks ([PANews](https://www.panewslab.com/en/articles/fjwbcw4b)). Users will trade through a text box today — wallets just don't own that surface.
- **Wallet monetization works and is under compression**: Phantom did ~$326M FY2025 revenue at a 0.85% swap fee ([CoinLaw](https://coinlaw.io/phantom-wallet-statistics/)); MetaMask charges 0.875% ([CryptoSlate](https://cryptoslate.com/crypto-wallets/metamask-review/)); but Uniswap Wallet cut its interface fee to 0% in late 2025 ([Vultisig comparison](https://vultisig.com/articles/crypto-wallet-swap-fees-compared)). Wallets need volume growth per MAU, not higher rates — exactly what a conversational surface delivers.
- **Perps-via-builder-codes is the template deal**: Phantom earned $20.6M+ from ~$39–43B Hyperliquid perp volume in under a year ([Crypto Briefing](https://cryptobriefing.com/phantom-20m-builder-code-revenue-hyperliquid/)). Wallets already accept "embed third-party execution, keep the take" — aomi's commercial model has precedent.
- **The safety bar is now publicly defined**: MetaMask's Agent Wallet needed simulation, Blockaid scanning, MEV protection, hardware-isolated signing, spend caps, protocol allowlists AND a $10,000 insurance backstop before Consensys would ship it ([CoinDesk](https://www.coindesk.com/tech/2026/06/08/metamask-launches-ai-agent-wallet-with-built-in-security-for-crypto-trades)). That checklist is essentially aomi's architecture — every other wallet must now match it or buy it.
- **Embedded-wallet layer consolidated into payments giants**: Stripe bought Privy (75M+ accounts, June 2025) ([CoinDesk](https://www.coindesk.com/business/2025/06/11/stripe-to-acquire-crypto-wallet-startup-privy-in-bid-to-expand-web3-capabilities)); Fireblocks bought Dynamic (50M+ users, Oct 2025) ([Dynamic](https://www.dynamic.xyz/)); Turnkey raised $30M+ ([FinTech Futures](https://www.fintechfutures.com/venture-capital-funding/turnkey-raises-30m-series-b)). These are channel partners, not competitors — none ships a reasoning/execution-safety layer.
- **Retail fintech crypto revenue is big but fragile**: Robinhood crypto fell 47% YoY to $134M in Q1 2026 ([Yahoo](https://finance.yahoo.com/markets/stocks/articles/robinhood-q1-2026-earnings-revenue-203244837.html)); Cash App's bitcoin is 54% of revenue but only 6% of gross profit ([Block 10-K](https://www.sec.gov/Archives/edgar/data/1512673/000162828026012254/xyz-20251231.htm)). Fintechs need higher-margin crypto engagement, not more spread-only volume.
- **Nobody is selling neutral, white-label chat-to-trade to wallets**: Coinbase AgentKit/x402 is Coinbase-ecosystem plumbing; thirdweb AI is a dev tool; 0x/LI.FI/Jupiter are routing without AI; Bankr/Griffain/Wayfinder are B2C token projects. The vendor seat — non-custodial, brandable, simulation-gated conversational execution — is empty.
- **The losing pitch words**: "AI copilot," "autonomous trading," "we give advice." The winning frame: *deterministic execution harness that makes an LLM unable to sign anything unverified* — sold on swap-take-rate uplift per MAU and support-ticket/drainer-loss reduction.

---

## 1. Market Map & Business Models

### 1a. Self-custody wallets

| Wallet | MAU (best available) | Monetization | Notes |
|---|---|---|---|
| MetaMask | ~30M ([Blockworks](https://blockworks.co/news/metamask-monthly-active-users-blockaid), [Bitcoin Magazine](https://bitcoinmagazine.com/business/metamask-launches-native-bitcoin-integration-for-30-million-active-users)) | 0.875% swap fee; Hyperliquid perps builder codes (Oct 2025); mUSD stablecoin (Aug 2025); card | ~$198.6M cumulative revenue per [CoinLaw](https://coinlaw.io/metamask-wallet-statistics/); a third-party estimate puts annualized swap revenue at ~$325M ([RateX](https://ratex.ai/blog/the-wallet-wars-2025-market-structure-revenue-models-and-user-behavior.3fe/)) — **conflicting, treat both as estimates**. IPO decision reportedly pending 2026 (CoinLaw — unverified). |
| Phantom | 15M → ~20M through 2025 ([CoinLaw](https://coinlaw.io/phantom-wallet-statistics/)) | 0.85% swap fee ($17M in April 2025 alone, [Blockchain.News](https://blockchain.news/flashnews/phantom-wallet-revenue-surges-17m-in-april-from-0-85-in-app-swap-fee-revealed)); perps builder codes; onramp commissions | $325.89M FY2025 revenue (CoinLaw); $20.6M+ perps builder revenue on ~$39–43B volume, 137k traders ([Crypto Briefing](https://cryptobriefing.com/phantom-20m-builder-code-revenue-hyperliquid/), [DeFiLlama](https://defillama.com/protocol/phantom-perps)). The proof that a wallet can become a nine-figure-revenue brokerage. |
| Trust Wallet | 17M MAU ([CoinLaw](https://coinlaw.io/trust-wallet-statistics/)) vs 115M claimed ([RateX](https://ratex.ai/blog/the-wallet-wars-2025-market-structure-revenue-models-and-user-behavior.3fe/)) — **wide discrepancy; RateX likely counts registered/downloads** | Hidden spread on swaps rather than printed fee ([Vultisig](https://vultisig.com/articles/crypto-wallet-swap-fees-compared)) | Largest reach, low ARPU, 70+ chains. |
| Coinbase Wallet → **Base app** | 3.2M MAU ([CoinLaw](https://coinlaw.io/coinbase-wallet-statistics/)); RateX claims 70M — **flag: almost certainly conflates Coinbase exchange users** | Swap fees, onramp, Base sequencer economics upstream | Rebranded to Base app July 2025: social feed, mini-apps, USDC payments, and **AI agents inside encrypted chat** ([CoinDesk](https://www.coindesk.com/tech/2025/07/17/coinbase-wallet-becomes-base-app-in-major-rebrand), [Decrypt](https://decrypt.co/330518/coinbase-everything-app-wallet-social-ai-tools)). |
| OKX Wallet | ~5M (Q2 2025, [CoinLaw](https://coinlaw.io/okx-wallet-statistics/)); RateX says 15M — **flag** | DEX aggregator fees, exchange cross-sell | Shipped Agentic Wallet Mar 18 2026 ([OKX](https://www.okx.com/en-us/learn/agentic-wallet)). |
| Rabby (DeBank) | ~4.2M (RateX est.) | Points/DeBank ecosystem; highest DAU/MAU stickiness (0.41) | Pro-user tool; already does tx simulation previews natively. |
| Zerion | ~300K stated by company early 2025 ([CoinLaw](https://coinlaw.io/zerion-wallet-statistics/)); RateX's 2M is generous | 0.5–0.8% swap fee tier, API business (Zerion API powers other apps) | Dual model: consumer wallet + B2B data API. |
| Rainbow | ~1.5M (RateX est., **uncertain**) | 0.85% swap fee; Q3 2025 fees only ~$161K–$897K (sources conflict: [DeFiLlama](https://defillama.com/protocol/rainbow-wallet) vs [CoinLaw](https://coinlaw.io/rainbow-wallet-statistics/)); ~$2.16M annualized | RNBW token: $3M ICO at $100M FDV Dec 2025, TGE Feb 5 2026 ([BingX](https://bingx.com/en/learn/article/what-is-rainbow-wallet-airdrop-how-to-claim-rnbw-tokens), [Blockworks](https://blockworks.co/news/rainbow-q4-token)). Roadmap = perps, token launcher, points — **no AI anywhere**. |
| Backpack / Family | ~1M / no published data | Backpack: exchange cross-sell; Family: design-led, no disclosed metrics | Family is the design-darling archetype; no public MAU — **do not cite numbers for Family**. |

ARPU estimates (third-party, [RateX](https://ratex.ai/blog/the-wallet-wars-2025-market-structure-revenue-models-and-user-behavior.3fe/), treat as directional): Coinbase Wallet $35, MetaMask $10.80, Zerion $6.20, Rabby $5.70, Phantom $4.80, OKX $4.50. The whole sector monetizes one thing well — the in-wallet swap — and routes ~100% of it through aggregators (0x, 1inch, Jupiter).

**Winning/losing:** Phantom won 2025 (multichain expansion + perps); MetaMask held scale and diversified (perps, stablecoin, card); Trust wins reach but not revenue; Rainbow and Zerion are sub-scale on revenue and reaching for tokens/points as retention Hail Marys; Uniswap Wallet going to 0% interface fee signals the coming fee war ([Vultisig](https://vultisig.com/articles/crypto-wallet-swap-fees-compared)).

### 1b. Embedded-wallet providers (aomi's channel layer)

- **Privy** — acquired by **Stripe** (June 2025, undisclosed): 75M+ accounts, 1,000+ dev teams; customers include Hyperliquid, Pump.fun, OpenSea, Blackbird ([CoinDesk](https://www.coindesk.com/business/2025/06/11/stripe-to-acquire-crypto-wallet-startup-privy-in-bid-to-expand-web3-capabilities), [Decrypt](https://decrypt.co/324674/payments-giant-stripe-acquire-crypto-firm-privy)).
- **Dynamic** — acquired by **Fireblocks** (Oct 2025): 50M+ users onboarded across EVM/SVM/BTC/Sui/TON ([Dynamic](https://www.dynamic.xyz/)).
- **Turnkey** — $30M Series B led by Bain Capital Crypto (June 2025), + $12.5M strategic (May 2026), $50M+ total; customers: Bridge, Magic Eden, World, Alchemy, Polymarket ([FinTech Futures](https://www.fintechfutures.com/venture-capital-funding/turnkey-raises-30m-series-b), [Turnkey](https://www.turnkey.com/blog/turnkey-strategic-investment-crypto-verifiable-compute)).
- **Para** — claims 10M+ users ([getpara.com](https://www.getpara.com/)); last-standing independent alongside Turnkey.
- **Implication for aomi**: key management is commoditized and owned by Stripe/Fireblocks-scale players. aomi should sit **above** this layer (compatible with Privy/Turnkey/Para key infra) and sell the part none of them have: reasoning + simulation-gated execution + chat surface. Their combined reach (~135M+ accounts) is a distribution map, not a threat.

### 1c. Retail fintechs with crypto

- **Robinhood**: Q1 2026 crypto transaction revenue **$134M, down 47% YoY** (from $252M) while total revenue rose 15% to $1.07B; event contracts +320% to $147M ([Yahoo Finance](https://finance.yahoo.com/markets/stocks/articles/robinhood-q1-2026-earnings-revenue-203244837.html), [Robinhood Q1 2026 exhibit](https://investors.robinhood.com/static-files/15576d76-2d02-4aea-a40d-48e694c04a4b)). Shipped **Cortex** (AI research: digests, scanners, natural-language indicators) and **Agentic Trading** (May 2026, extending to crypto accounts) ([Corporate Insight](https://corporateinsight.com/robinhood-2-0-how-the-commission-free-pioneer-is-rewriting-the-rules-again/)).
- **Block/Cash App**: FY2025 Cash App segment revenue **$15.4B**, gross profit $6.3B; **bitcoin = 54% of revenue but only 6% of gross profit** (~$9.6B revenue at ~2–3% effective spread margin) ([Block 10-K](https://www.sec.gov/Archives/edgar/data/1512673/000162828026012254/xyz-20251231.htm)). Classic low-margin spread model — hungry for higher-margin crypto engagement.
- **Revolut**: 2025 revenue **$6B**, pretax profit $2.3B (+57%); wealth segment (incl. crypto) **$876M**; stablecoin payments +156%; exploring own stablecoin; $115B valuation July 2026 ([CoinDesk](https://www.coindesk.com/business/2026/03/24/crypto-friendly-fintech-revolut-sees-profit-soar-57-to-usd2-3-billion-in-2025), [CoinDesk](https://www.coindesk.com/business/2026/07/22/revolut-hits-usd115-billion-valuation-in-employee-share-sale-wsj), [BeInCrypto](https://beincrypto.com/revolut-profit-crypto-stablecoin-neobank-growth/)). Notably listed Wayfinder's PROMPT, exposing 60M users to an AI-agent token ([99Bitcoins](https://99bitcoins.com/news/presales/prompt-crypto-by-wayfinder-is-finding-its-way-ai-narrative-coming-back/)).
- **PayPal**: PYUSD ~$872M market cap (spring 2025 snapshot — **stale, check current**); Coinbase waived PYUSD fees to push adoption ([TLDR fintech](https://tldr.tech/fintech/2025-04-28)).
- **Nubank**: 130M+ customers, ~$16B revenue, but no disclosed crypto revenue split ([Crowdfund Insider](https://www.crowdfundinsider.com/2026/05/279840-digital-banks-nubank-and-revolut-are-pursuing-distinct-strategies-for-growth-and-monetization-analysis/)) — **crypto materiality unverified**.
- **Kraken**: rebuilding its consumer app around embedded AI agents that recommend trades and act only on user approval (announced July 10, 2026) ([Bankless](https://www.bankless.com/read/news/kraken-rebuilds-app-around-embedded-ai-intelligence), [Crowdfund Insider](https://www.crowdfundinsider.com/2026/07/291040-investment-platform-kraken-prepares-mobile-app-overhaul-centered-on-intelligent-ai-trading-agents/)).

### 1d. Aggregates

~820M unique active wallets globally; ~59% of crypto users use non-custodial wallets; self-custody handles ~68% of transaction volume ([CoinLaw self-custody stats](https://coinlaw.io/self-custody-wallet-statistics/) — **CoinLaw/SQMagazine aggregate methodology is opaque; use as order-of-magnitude only**). Only **13% of Americans say crypto wallets are easy to use** ([Forbes/Beyond Early Adopters](https://www.forbes.com/sites/garydrenik/2025/11/11/how-ux-upgrades-are-driving-the-next-wave-of-web3-adoption/)).

---

## 2. The Chat-to-Trade Gap (the Rainbow question)

### 2a. Who HAS shipped

**Incumbents (2025–2026):**
- **Coinbase Base app** (July 2025): AI agents you can transact with inside encrypted chat ([Decrypt](https://decrypt.co/330518/coinbase-everything-app-wallet-social-ai-tools)). Plus **x402**: 100M+ cumulative agentic payments on Base by Q1 2026 ([Chainalysis](https://www.chainalysis.com/blog/x402-agentic-payments-adoption/)); x402 Foundation with Cloudflare, Google, Visa, AWS, Circle, Anthropic ([BlockEden](https://blockeden.xyz/blog/2026/03/05/x402-foundation-ai-payment-internet/)).
- **OKX Agentic Wallet** (Mar 2026): natural-language onchain execution across ~20 networks; OnchainOS toolkit; Agent Payments Protocol ([OKX](https://www.okx.com/en-us/learn/agentic-wallet), [Cryptopolitan](https://www.cryptopolitan.com/okx-enters-agentic-economy-race/)).
- **MetaMask Agent Wallet** (June 2026, early access, CLI-first): AI agents trade DeFi under spend caps/allowlists ("Guard Mode"/"Beast Mode"), with simulation, Blockaid scanning, MEV protection, enclave signing, and **$10K transaction protection coverage** ([CoinDesk](https://www.coindesk.com/tech/2026/06/08/metamask-launches-ai-agent-wallet-with-built-in-security-for-crypto-trades), [The Block](https://www.theblock.co/post/403865/metamask-debuts-agent-wallet-giving-ai-bots-self-custody-access-ethereum)). Note: this is a wallet FOR agents (dev-facing), not a consumer chat page.
- **Robinhood Cortex + Agentic Trading**, **Kraken AI app** — see 1c.

**Standalone DeFAI (B2C, the demand signal):**
- **Bankr**: chat-to-trade on X/Farcaster/Telegram; $4.75B+ cumulative ecosystem volume; launched Bankr Console June 2026; execution powered by 0x APIs ([Unchained](https://unchainedcrypto.com/press-release/bankr-launches-the-console-the-financial-interface-for-the-agentic-economy/), [0x case study](https://0x.org/case-studies/bankr)).
- **Griffain** ($390M peak cap), **Hey Anon** ($136M+), plus Neur, Orbit etc. — 13 tracked DeFAI projects averaged +445% in the Jan 2025 mania ([PANews](https://www.panewslab.com/en/articles/fjwbcw4b)). AI-agent token sector still ~$2.6B combined cap in early 2026 ([KuCoin](https://www.kucoin.com/blog/will-ai-agents-take-over-defi-2026-2030-predictions)) — well off peaks; most projects are token-first, product-thin.
- **Wayfinder** (Parallel): open alpha Aug 2025, cross-chain agents on HyperliquidEVM, Revolut distribution ([Bitget News](https://www.bitget.com/news/detail/12560604929249)).
- **Telegram bots — the strongest proof of demand**: Trojan **$23.4B lifetime volume, 1.7M users**; Maestro $12.8B/573K users; BONKbot **$4.35M/month in fees**; sector-wide ~$61.7M daily volume, 52K DAU mid-2025 ([CoinGecko](https://www.coingecko.com/learn/top-telegram-trading-bots), [Dune via SignalPlus](https://t.signalplus.com/crypto-news/detail/telegram-trading-bots-2025-features-fees-verdicts)). Users paid ~1% fees for a *worse* UX than any wallet — because typing intent beats navigating DeFi.

### 2b. Why the mid-tail wallets haven't shipped it

No wallet PM has published a memo titled "why we didn't ship chat-to-trade," but the credible reasons, each grounded:

1. **Liability & attribution vacuum.** Investors and lawyers warn AI-agent wallets are arriving "faster than frameworks for liability" — if the agent errs, is the wallet company the principal? ([Yahoo/CCN](https://www.ccn.com/news/crypto/ai-agent-crypto-wallets-legal-risks-investors-warn/)). A wallet that *suggests* a trade in chat looks like unlicensed advice; one that *executes* a hallucinated trade owns the loss narrative.
2. **Hallucination × irreversibility.** LLM output that "looks correct but is factually wrong" is catastrophic when transactions can't be reversed ([DEXTools](https://www.dextools.io/tutorials/ai-risks-crypto-wallets), [CCN](https://www.ccn.com/education/crypto/ai-hallucinations-slopsquatting-risk-for-blockchain-devs/)). This is precisely why MetaMask's answer required simulation + insurance before launch.
3. **Prompt injection / new attack surface.** The Moltbook incident showed viral AI bot networks exposing wallet security holes ([Cryptopolitan](https://www.cryptopolitan.com/crypto-wallets-at-risk-as-moltbook-a-viral-ai-bot-network-exposes-major-security-threats/)); 2025 also birthed EIP-7702-based signature attacks bundling multiple harmful actions into one signature ([Scam Sniffer 2025 report](https://drops.scamsniffer.io/scam-sniffer-2025-crypto-phishing-losses-fall-83-to-84-million/)). Wallet security teams see chat input as a drainer-shaped hole.
4. **Cost & team focus.** LLM inference per MAU is real money against $2–11 ARPU; Rainbow's entire engineering bandwidth for 12 months went to the RNBW token, points, perps, and a token launcher ([Blockonomi](https://blockonomi.com/rainbow-prepares-rnbw-token-launch-with-overhauled-crypto-app-experience)). Mid-tail wallets are 10–40-person teams; building a safe agent stack (simulation infra, forked-state execution, delegation policy, evals) is a 12–18 month platform project.
5. **Graveyard evidence.** Independent reviews found most "AI wallets" listed in 2025 "either no longer function, have quietly shut down, or have no meaningful AI features beyond a chat interface" ([CoinGape](https://coingape.com/best-ai-agentic-crypto-wallets/)). Gartner projects 40%+ of agentic-AI projects canceled by 2027 on cost/risk grounds ([Tech Startups](https://techstartups.com/2025/12/09/top-ai-startups-that-shut-down-in-2025-what-founders-can-learn/)).

**The honest answer to the founder's question**: Rainbow doesn't have a chat-to-trade page because the cost of building the *safety layer* (not the chat UI) exceeds a mid-tail wallet's capacity, the liability of shipping without it is existential, and their roadmap is consumed by token-economics survival moves. That is a textbook buy-vs-build gap — and the buy side has no vendor today.

### 2c. Demand evidence (consolidated)

- Telegram bot volumes above (§2a) — users already trade via text.
- Perceived complexity is the #1 behavioral barrier to crypto adoption; >75% of surveyed builders cite new-user onboarding as the primary obstacle ([CoinDesk op-ed](https://www.coindesk.com/opinion/2025/04/12/crypto-s-biggest-barrier-to-adoption-it-s-not-regulation-it-s-ux), [Cointelegraph](https://cointelegraph.com/news/from-barrier-to-breakthrough-solving-ux-can-catalyze-mass-adoption-of-crypto)).
- Only 13% of Americans find wallets easy to use ([Forbes](https://www.forbes.com/sites/garydrenik/2025/11/11/how-ux-upgrades-are-driving-the-next-wave-of-web3-adoption/)).
- Every incumbent that CAN afford the build (Coinbase, OKX, MetaMask, Kraken, Robinhood) is building it — the strongest possible validation that the mid-tail must respond or fall further behind.

---

## 3. The Language (speak wallet-PM, not crypto-Twitter)

**Consumer-fintech metrics** (F) vs **crypto-native** (C):

| Term | One-liner | Camp |
|---|---|---|
| MAU/DAU/WAU | Monthly/daily/weekly active users; DAU/MAU ratio = stickiness (Rabby leads at 0.41) | F |
| ARPU / ARPPU | Avg revenue per (paying) user; wallet range ~$4.50–$35/yr | F |
| Take rate | % fee captured on transaction value (MetaMask 0.875%, Phantom/Rainbow 0.85%) | F |
| GMV / swap volume | Gross transaction value flowing through the product; the base the take rate multiplies | F/C |
| Conversion funnel / activation | Install → funded wallet → first swap; each step loses users | F |
| TTFT (time-to-first-transaction) | Onboarding KPI: minutes from install to first executed tx | F |
| Retention / churn | % of users returning (top wallets ~60–70% 30-day) | F |
| LTV / CAC | Lifetime value vs acquisition cost; wallets have near-zero paid CAC, so LTV = retention × ARPU | F |
| NPS / session length | Satisfaction proxy; engagement depth | F |
| Interchange | Card-swipe fee income (relevant to wallet card programs, Cash App) | F |
| PFOF | Payment for order flow — Robinhood's model; the TradFi cousin of routing kickbacks | F |
| Spread | Hidden margin baked into a quoted price (Trust Wallet's model; Cash App bitcoin) | F/C |
| Slippage | Price movement between quote and execution | C |
| Onramp / offramp | Fiat→crypto / crypto→fiat rails (MoonPay, Stripe); wallets take commission | C |
| Self-custody | User holds keys; the sector's identity and its legal shield | C |
| Seed phrase | 12/24-word key backup; the #1 named UX villain | C |
| MPC | Multi-party computation key splitting — no single seed phrase (Privy/Dynamic model) | C |
| Passkeys | FaceID/device-bound auth replacing passwords/seeds | F/C |
| Account abstraction (AA) / smart wallet | Programmable accounts: session keys, spend limits, sponsored gas (ERC-4337; Base Account) | C |
| Gas abstraction / gasless (sponsored) tx | App pays or hides network fees | C |
| Embedded wallet / WaaS | Wallet-as-a-service invisibly inside an app (Privy, Turnkey, Para) | C |
| Intents | User states outcome ("swap X for best Y"), not the tx path | C |
| Solver | Competitive agent that fulfills an intent | C |
| Simulation / tx preview | Dry-running a transaction against chain state before signing to show exact outcome — aomi's core verb | C |
| Drainer / phishing | Malicious signature-harvesting kits ($83.85M stolen 2025) | C |
| Allowlist / revocable delegation | Scoping what an agent/contract may touch; kill-switch | C |
| Approval (ERC-20 / Permit2) | Standing permission for a contract to spend tokens — top attack vector | C |
| AI copilot vs agent | Copilot suggests, human clicks; agent executes under policy. Wallets will say "copilot" in public and buy "agent with guardrails" | F/C |
| Builder codes | Hyperliquid's rev-share mechanism for front-ends routing order flow | C |

---

## 4. Pain Points (ranked)

1. **Monetization pressure under fee compression.** Swap take rates (0.85–0.875%) are the whole P&L; Uniswap Wallet went to 0% interface fee late 2025 and exchange-affiliated wallets undercut with incentives ([Vultisig](https://vultisig.com/articles/crypto-wallet-swap-fees-compared), [PANews on Phantom's embedded-swap share erosion](https://www.panewslab.com/en/articles/32878e91-cc53-4864-b27d-68c407dbb890)). Wallets are diversifying into perps, stablecoins, cards, tokens — anything that adds monetizable surface.
2. **Differentiation crisis.** All major wallets route ~100% of swaps through the same aggregators (0x/1inch/Jupiter) ([RateX](https://ratex.ai/blog/the-wallet-wars-2025-market-structure-revenue-models-and-user-behavior.3fe/)); same tokens, same charts, same swap screen. Rainbow's answer is a token; Phantom's is perps; nobody's is a fundamentally different interaction model — yet.
3. **UX complexity blocks the mainstream.** 13% of Americans find wallets easy; >75% of builders name onboarding the top obstacle; complexity + low visibility are the top behavioral barriers ([Forbes](https://www.forbes.com/sites/garydrenik/2025/11/11/how-ux-upgrades-are-driving-the-next-wave-of-web3-adoption/), [Cointelegraph](https://cointelegraph.com/news/from-barrier-to-breakthrough-solving-ux-can-catalyze-mass-adoption-of-crypto), [CoinDesk](https://www.coindesk.com/opinion/2025/04/12/crypto-s-biggest-barrier-to-adoption-it-s-not-regulation-it-s-ux)).
4. **Security losses & support burden.** $83.85M drained via phishing in 2025 across 106K victims (down 83% from $494M in 2024, but new EIP-7702 vectors emerged) ([Scam Sniffer](https://drops.scamsniffer.io/scam-sniffer-2025-crypto-phishing-losses-fall-83-to-84-million/)). Every drained user is a support ticket, a chargeback-less refund demand, and churn.
5. **Cross-chain fragmentation.** Trust/Bitget support 70+ chains; most support far fewer; Solana + EVM + L2s + Hyperliquid each need bespoke execution paths ([RateX](https://ratex.ai/blog/the-wallet-wars-2025-market-structure-revenue-models-and-user-behavior.3fe/)). Multichain breadth is now table stakes (it's what powered Phantom's 2025 run).
6. **Cost/team constraints on shipping AI safely.** See §2b — the MetaMask safety checklist (simulation, scanning, enclaves, insurance) defines a bar mid-tail teams cannot fund internally.
7. **Regulatory anxiety about "advice."** AI that recommends trades inside a financial app walks into investment-advice territory with no agent-liability case law ([CCN](https://www.ccn.com/news/crypto/ai-agent-crypto-wallets-legal-risks-investors-warn/)). Kraken's framing — "surfaces recommendations and reasoning but waits for user approval" ([Bankless](https://www.bankless.com/read/news/kraken-rebuilds-app-around-embedded-ai-intelligence)) — is the compliance-approved posture aomi should mirror.

---

## 5. How They Evaluate Vendors

What a Head of Product at a wallet (or fintech crypto lead) requires before embedding third-party execution/AI — synthesized from the integration patterns above (Hyperliquid builder codes, Privy/Turnkey diligence norms, app-store rules):

**Must-haves**
- **Non-custodial, keys never leave** — they will not hand key material to a vendor, full stop. Integration must work atop their existing signer (their own stack or Privy/Turnkey/Para). MetaMask's enclave-signing design shows the expected posture.
- **Deterministic pre-signature safety**: every proposed tx simulated against live forked state, human-readable outcome, policy engine (spend caps, allowlists, revocation). This is now the *published* bar (MetaMask Guard Mode).
- **Security audits + track record**: independent audits of the execution path, incident history, bug bounty. A live reference deployment (aomi × Somm) matters more than claims.
- **White-label/brandability**: the chat surface must look 100% native; no vendor logo in a consumer wallet. SDK quality (mobile-first — React Native/Swift/Kotlin — not just web) is screened in week one.
- **Latency**: quotes and simulation must land inside the attention window users tolerate on a swap screen (~1–3s perceived); Telegram bots won on speed.
- **Economics**: rev-share on incremental swap/perp volume (builder-code-style) beats SaaS seats; wallets already understand "you keep the take rate, vendor gets bps or a share."
- **App-store compliance**: post-Epic, US iOS apps can link out for crypto/NFT payments ([The Block](https://www.theblock.co/post/353047/u-s-app-store-to-allow-apps-to-skirt-30-fee-on-nft-crypto-sales-following-apples-legal-defeat)), but Apple still bans ICO facilitation and reward-for-task token schemes ([Decrypt](https://decrypt.co/317589/apple-loosens-nft-crypto-ios-app-rules)) — and Apple is appealing, so the vendor must not create review-rejection risk.
- **Regulatory posture**: execution-only framing (user intent → verified execution), no discretionary recommendations, clear audit logs of who authorized what. Fintechs (Revolut/Cash App) additionally need SOC 2, data-residency answers, and model-risk documentation.

**Deal killers**: requiring custody or key export; unsimulated LLM-initiated signing; a token/points agenda attached to the vendor; consumer-brand ambitions (vendor competing with the wallet — Coinbase's stack fails this test for every non-Coinbase wallet); web-only SDK; opaque model behavior with no eval suite; anything that reads as "investment advice" to counsel.

---

## 6. Competitive Landscape: "AI trading inside consumer apps" (B2B)

| Player | Offer | Custody model | Traction | Is it aomi's competitor? |
|---|---|---|---|---|
| **Coinbase AgentKit / CDP / x402** | Agent wallets, agentic payments protocol | CDP-managed (Coinbase infra) | 100M+ x402 tx on Base; 5,000 Coinbase Business customers, ~$1B volume ([Chainalysis](https://www.chainalysis.com/blog/x402-agentic-payments-adoption/), [Cryptonews AU](https://cryptonews.com.au/news/coinbase-business-launches-ai-payment-tools-for-the-agent-economy-134384/)) | Ecosystem plumbing, Base-gravity; **no rival wallet will build on Coinbase**. Not a neutral vendor. |
| **thirdweb AI** (ex-Nebula, rebranded Sept 2025) | Chat/agent API to read/write onchain ([thirdweb](https://blog.thirdweb.com/changelog/nebula-is-now-thirdweb-ai/)) | Dev-provided wallets | Dev-tool usage; consumer app deprecated | Closest API analog, but developer-platform DNA, no simulation-gated safety harness, no white-label consumer chat surface. |
| **MetaMask Agent Wallet / OKX Agentic Wallet** | In-house agentic wallets | Self-custodial, own users | Early access / launched Mar 2026 | In-house builds for their OWN users — they validate the category and won't license to competitors. |
| **0x, LI.FI, Jupiter, 1inch** | Swap/bridge routing APIs | Non-custodial routing | Power ~100% of wallet swaps; 0x powers Bankr ([0x case study](https://0x.org/case-studies/bankr)) | Complements — aomi's execution layer can route through them. No AI/intent layer of their own (yet; 0x's Bankr work shows appetite). |
| **Crossmint** | Stablecoin/wallet/agentic-commerce APIs, Visa agentic cards | Custodial + smart wallets | $23.6M (Ribbit, Mar 2025); 40K clients incl. MoneyGram, Western Union ([CoinDesk](https://www.coindesk.com/business/2025/03/18/blockchain-firm-crossmint-used-by-adidas-red-bull-raises-usd23-6m-in-funding)) | Adjacent — commerce/payments, not trading UX. |
| **Stripe/Bridge/Privy** | Payments + embedded wallets | MPC, app-controlled | 75M+ accounts | Channel, not competitor; Stripe's agentic direction is *payments*, not trading. |
| **Bankr, Griffain, Hey Anon, Wayfinder, Infinex** | B2C chat-to-trade apps with tokens | Own wallets | Bankr $4.75B ecosystem volume ([Unchained](https://unchainedcrypto.com/press-release/bankr-launches-the-console-the-financial-interface-for-the-agentic-economy/)) | B2C — they compete with wallets for the user, which is exactly why wallets need their own answer. Bankr Console hints at platform ambitions — watch it. |
| **Brian (brianknows)** | Early "intent API" for chat-to-tx | Non-custodial | Effectively wound down/pivoted circa 2025 — **could not confirm via search; verify before citing publicly** | Cautionary tale: intent API without a safety/verification moat was too thin. |

**The gap**: there is no neutral, non-custodial, white-label vendor selling "a chat-to-trade surface your users trust and your lawyers accept" to wallets and fintechs. Everyone is either (a) an incumbent building in-house for itself, (b) swap plumbing without AI, (c) B2C token projects competing with the wallets, or (d) key/payments infrastructure. aomi's simulation-before-signature + scoped delegation + EVM/SVM + embeddable chat is the missing SKU — and MetaMask's $10K-insurance-wrapped launch just wrote aomi's requirements doc in public.

---

## 7. Messaging Guidance

### (a) Head of Product, self-custody wallet (Rainbow archetype)

**They care about (their words):** "Swap volume per MAU is my whole P&L and Uniswap just went to zero-fee." / "Everything that touches signing goes through the security team, and they've watched drainers eat $84M." / "I have eight engineers and a token launch; I can't staff an AI platform team."

**Consultant-voice pitch:** Every trade proposed in chat is simulated against a fork of live chain state before the user signs, so the model can describe an outcome but can never cause an unverified one. The wallet keeps its keys, its brand, and its 85bps — the harness adds a conversational surface that turns passive balances into swap and perps volume the current UI never captures. It ships as an embeddable surface plus SDK, not a platform project.

**Avoid:** "AI copilot," "autonomous," "we manage wallets," "financial advice," "revolutionary UX," any token/points talk.

**ROI frame:** take-rate uplift per MAU. If chat lifts swaps/MAU by even 0.2 swaps/mo at ~$400 average size × 0.85%, that's ~$0.68/MAU/mo — against Rainbow-class ARPU of ~$1.4–2/yr, that's a 4–8x ARPU story before perps. Anchor with: Phantom added $20.6M/yr by embedding someone else's execution venue ([Crypto Briefing](https://cryptobriefing.com/phantom-20m-builder-code-revenue-hyperliquid/)); Telegram bots proved users pay ~1% to trade by text ([CoinGecko](https://www.coingecko.com/learn/top-telegram-trading-bots)).

### (b) Crypto lead, retail fintech (Revolut / Cash App archetype)

**They care about:** "Crypto revenue is volatile — Robinhood's just fell 47% in a quarter; I need engagement that survives price cycles." / "Nothing ships without model-risk sign-off, audit logs, and a story for the regulator." / "Bitcoin volume is 54% of our revenue and 6% of our profit — I need margin, not more spread."

**Consultant-voice pitch:** The harness converts an existing product API into a guarded execution layer: user intent arrives in natural language, every resulting transaction is simulated and policy-checked before signature, and every authorization is logged per user. It is execution-only by construction — no recommendations, no discretion — which keeps it on the tooling side of the advice line while adding a self-custody product line the incumbents (Robinhood agentic trading, Kraken's AI app) are already normalizing.

**Avoid:** "advice," "yield," "autonomous trading," "disruption," custody ambiguity of any kind, crypto-native slang (degen, ape, DeFAI).

**ROI frame:** margin mix + retention. Onchain swap take rates (0.85%) are ~3–10x the effective margin of spread-based bitcoin sales (Cash App's bitcoin gross margin ≈ 2–3% of revenue, [Block 10-K](https://www.sec.gov/Archives/edgar/data/1512673/000162828026012254/xyz-20251231.htm)); a conversational surface also counters the engagement collapse behind Robinhood's -47% crypto quarter ([Yahoo](https://finance.yahoo.com/markets/stocks/articles/robinhood-q1-2026-earnings-revenue-203244837.html)).

### (c) Embedded-wallet provider partnerships lead (Privy/Turnkey/Para)

**They care about:** "We sell wallet creation; customers now ask what the wallet can *do* — especially 'how do I add an agent safely.'" / "Anything that increases transactions per wallet increases our invoice." / "We will never let a partner touch key material or dilute our security story."

**Consultant-voice pitch:** The harness sits strictly above the key layer: it consumes the provider's signer interface, adds intent parsing, forked-state simulation, and scoped, revocable delegation, and returns transactions for the provider's existing signing flow. For the provider's 1,000+ app customers it converts "embedded wallet" into "embedded agent with guardrails" — a joint SKU that raises transactions per wallet without changing the trust model.

**Avoid:** anything implying key handling, "replacement," "wallet infrastructure" (that's *their* word), or competing SDK surfaces.

**ROI frame:** attach rate and usage-based billing — every agent-initiated transaction is metered volume on the provider's infrastructure; a co-sell into their base (Privy 75M+ accounts, Dynamic 50M+, Para 10M+) is distribution aomi cannot buy directly.

---

### Data-quality flags (read before quoting externally)
- CoinLaw/SQMagazine aggregate pages are secondary compilations with opaque methodology — use their figures as directional, prefer primary sources (SEC filings, DeFiLlama, company posts) where they conflict.
- Conflicts to reconcile before publishing: Trust Wallet MAU (17M vs 115M), Coinbase Wallet MAU (3.2M vs 70M — the 70M almost certainly conflates exchange users), MetaMask revenue ($198.6M cumulative vs $325M annualized estimate), Rainbow Q3-2025 fees ($161K vs $897K), Zerion MAU (300K company-stated vs 2M estimate).
- PYUSD market-cap figure is a spring-2025 snapshot — stale.
- Brian (brianknows) wind-down could not be confirmed in searches — verify before citing.
- RateX "Wallet Wars 2025" ARPU/retention numbers are third-party estimates, not company disclosures.
