# Crypto Asset-Management Sector Research for aomi (July 2026)

> Researched 2026-07-24 via web sweep (subagent). Purpose: learn the sector's structure,
> vocabulary, and pain points so aomi's marketing/pitch speaks asset managers' professional
> language. All stats carry inline sources; caveats at the bottom.

## Executive Summary

- **The onchain "risk curator" sector is real, young, and concentrated**: ~$5.9–7B TVL as of Feb–May 2026 (up from ~$300M a year prior, ~2,200% growth), with Steakhouse Financial (~$1.5B), Sentora (~$1.3B), and Gauntlet (~$1.3B) holding ~70% ([Tiger Research](https://reports.tiger-research.com/p/onchain-risk-curators-147t-vs-7b-eng), [PANews/IOSG](https://www.panewslab.com/en/articles/019c9434-0b9d-779e-b12f-8361b5bc25f2)).
- **Their #1 documented technical pain is per-platform fragmentation**: "Managing a single vault across multiple platforms means rebuilding everything from scratch, much like opening separate bank accounts with no shared infrastructure" ([Chorus One, DeFi Curators in 2025](https://chorus.one/reports-research/defi-curators-in-2025-navigating-chaos-building-resilience)). This is almost verbatim aomi's value proposition.
- **The Stream Finance collapse (Nov 2025, $93M direct loss, ~$285M contagion, $137M Euler bad debt) reset the sector's vocabulary**: post-Stream, "transparent, policy-constrained, auditable execution" is the trust currency, and opaque discretionary curation is a liability ([CoinDesk](https://www.coindesk.com/markets/2025/11/04/stream-finance-faces-usd93-million-loss-launches-legal-investigation), [BlockEden](https://blockeden.xyz/blog/2025/11/08/m-defi-contagion/)).
- **DAO treasury management is dominated by kpk (ex-karpatkey, >$2.1B managed), which itself launched "agent-powered vaults" in Nov 2025** — explicitly rules-based, *not* AI — validating the category while leaving the AI-native slot open ([Chainwire](https://chainwire.org/2025/11/13/kpk-launches-agent-powered-vaults-on-morpho/), [kpk.io](https://kpk.io/karpatkey-closes-7-million-funding-round/)).
- **The closest B2B competitor, Brahma Console, was acquired by Polymarket in March 2026 and its products were wound down by April 17, 2026** — an open positioning gap for "self-custodial execution stack for teams/institutions" ([crypto.news](https://crypto.news/polymarket-acquires-defi-startup-brahma-to-deepen-its-onchain-stack/)).
- **AI-agent competitors (Giza, Almanak, Theoriq) are B2C asset-gatherers with tokens**, not vendor infrastructure: Giza ARMA ~$3.96B cumulative agentic volume (Mar 2026), Almanak ~$132M peak TVL + token launch Dec 2025 ([The Block](https://www.theblock.co/post/344635/research-ai-agent-sector-overview), [Lars/Almanak](https://x.com/0xLars_/status/1998050704020340829)). Nobody is selling "turn *your* strategy into *your* agent" as white-label infra.
- **Crypto funds are institutionalizing**: 55% of traditional hedge funds now have crypto exposure (up from 47%), 73% of crypto fund managers prioritize yield generation, per the 7th PwC/AIMA Global Crypto Hedge Fund Report ([AIMA](https://www.aima.org/article/press-release-crypto-friendly-regulatory-changes-accelerate-institutional-investment.html), [report PDF](https://caymanfinance.ky/wp-content/uploads/2025/11/7th-Annual-Global-Crypto-Hedge-Fund-Report.pdf)).
- **RWA/tokenized funds are the fastest-growing buyer segment**: tokenized Treasuries ~$11.6–14.8B (Mar–Jun 2026), total tokenized RWA ~$22–33B depending on scope, ~75% YoY growth ([InvestaX Q1 2026](https://investax.io/blog/q1-2026-real-world-asset-tokenization-market-report), [Yellow Research](https://yellow.com/research/tokenized-rwas-31b-market-growth-real-race-starting)).
- **Price anchors exist for what this market pays infrastructure**: Aave DAO paid Gauntlet $1.6M/yr and Chaos Labs ~$1.6M/yr ($3.2M combined) for risk management; Chaos Labs later asked $3M/12mo; Fireblocks enterprise deals start ~six figures; Anchorage targets $10M+ minimums ([Messari](https://messari.io/report/gauntlet-proposal-for-aave-protocol-risk-management-failure-and-future), [The Defiant](https://thedefiant.io/news/defi/chaos-labs-terminates-aave-engagement-citing-risk-misalignment), [Openfort](https://www.openfort.io/blog/fireblocks-alternatives), [Ridgeway](https://www.ridgewayfs.com/digital-asset-security-platforms/)).
- **Non-custodial design is now table stakes, not a differentiator by itself** — every credible player (kpk, Giza, Definitive, Brahma before death) leads with it. aomi's edge must be the *harness*: simulate-before-sign, scoped delegation, policy-auditable execution across chains, sold to managers rather than competing with them for deposits.

---

## 1. Market Map

### 1a. Onchain vault / curator ecosystem

**Sector size.** Risk curators managed ~$5.9B TVL (Feb 2026) growing to ~$7B (May 2026), from ~$300M a year earlier ([Tiger Research](https://reports.tiger-research.com/p/onchain-risk-curators-147t-vs-7b-eng), [PANews/IOSG](https://www.panewslab.com/en/articles/019c9434-0b9d-779e-b12f-8361b5bc25f2)). The underlying venue, DeFi lending, holds ~$54B in deposits (Apr 2026, DefiLlama via [eco.com](https://eco.com/support/en/articles/15253994-aave-vs-morpho-vs-spark-vs-fluid-2026-lending-protocol-comparison)). Morpho — the curators' main home — reached ~$10.7B total deposits by July 2026 ([Crypto Economy](https://crypto-economy.com/morpho-and-the-institutionalization-of-defi-lending-infrastructure/)); Euler V2 ~$890M (Apr 2026, [The Big Whale](https://www.thebigwhale.io/article/morpho-vs-euler-the-modular-lending-match)); Aave defends ~51% of lending TVL share (Jan 2026).

**Top curators** (figures vary by snapshot; treat as directional):

| Curator | TVL/AUM | Notes |
|---|---|---|
| Steakhouse Financial | $1.26–1.53B | RWA/stablecoin specialist; backend for Coinbase's USDC lending; 20% share on Kamino (Solana) |
| Sentora | ~$1.34B | AI risk models; Kraken backend |
| Gauntlet | $1.29–1.88B | Quant risk firm turned curator; 30+ vaults, $2B+ vault TVL across Morpho/Drift/Kamino; publishes [VaultBook](https://vaultbook.gauntlet.xyz/) |
| Re7 Capital/Labs | ~$300M (Morpho USDC vault) | More aggressive; LST/RWA collateral |
| Block Analitica | ~$250M | Conservative, public risk reports (Maker/Sky heritage) |
| MEV Capital | ~$150M+ | Yield-first, newer collateral types |

Sources: [Tiger Research](https://reports.tiger-research.com/p/onchain-risk-curators-147t-vs-7b-eng), [Chorus One](https://chorus.one/reports-research/defi-curators-in-2025-navigating-chaos-building-resilience), [eco.com Morpho explainer](https://eco.com/support/en/articles/13064566-morpho-protocol-explained-2026), [Gauntlet](https://www.gauntlet.xyz/). Others in the space: k3, Hyperithm, Apostro, Llama Risk. A directory of 3,700+ vaults/curators exists at [DIA's DeFi Vaults Map](https://www.diadata.org/map/defi-vaults-lending/).

**Curator economics.** Performance fees typically 5–15% of generated yield ([eco.com](https://eco.com/support/en/articles/13064566-morpho-protocol-explained-2026)); some (Steakhouse flagship) run 0% for brand/TVL. Curators are **high-AUM, thin-margin, small-headcount** businesses — automation is a direct margin lever.

**Vault infrastructure layer** (partners/channels as much as competitors): Veda is the largest — $4.3B+ TVL as of July 2025, powers ether.fi Liquid, Lombard, Mantle cmETH; raised $18M led by CoinFund ([PR Newswire](https://www.prnewswire.com/news-releases/veda-raises-18m-led-by-coinfund-to-bring-institutional-grade-defi-yield-to-consumer-apps-through-3-7b-vault-platform-302488185.html), [Medium/ExaGroup](https://medium.com/exa-group/the-defi-vaultization-era-veda-aera-ipor-and-lagoon-finance-73988c17e161)). Lagoon ~$138M ([DefiLlama](https://defillama.com/protocol/lagoon)). Aera (built by Gauntlet, DAO-treasury vaults) has allocated $100M+ of treasury capital ([Aera docs](https://docs.aera.finance/aera-for-treasury-management)). Sommelier/Somm — aomi's launch partner — peaked around ~$100M TVL (2024) ([Somm blog](https://somm.finance/blog/sommelier-january-update), [DefiLlama](https://defillama.com/protocol/sommelier)); its architecture (off-chain compute driving non-custodial ERC-4626 vaults) is the pattern aomi generalizes. Yield aggregators broadly (Yearn et al.) are claimed at ~$47B TVL (Mar 2026, [TokenMetrics](https://tokenmetrics.com/blog/what-are-the-top-defi-protocols-complete-2026-guide-to-decentralized-finance/) — single source, treat cautiously).

### 1b. Crypto-native funds

Per the 7th Annual PwC/AIMA Global Crypto Hedge Fund Report (Nov 2025; 122 institutions, ~$1T combined assets): 55% of traditional hedge funds now hold crypto exposure (vs 47% in 2024), most under 2% of AUM; 71% plan to increase; 73% of crypto-native managers prioritize yield/reward generation (39% custodial staking, 35% liquid staking); 52% interested in tokenization ([AIMA press release](https://www.aima.org/article/press-release-crypto-friendly-regulatory-changes-accelerate-institutional-investment.html), [report PDF](https://caymanfinance.ky/wp-content/uploads/2025/11/7th-Annual-Global-Crypto-Hedge-Fund-Report.pdf)). Aggregator estimates put the dedicated crypto fund industry around $93B across ~870 active funds, or ~$136B including appreciation by Q2 2025 ([SQ Magazine](https://sqmagazine.co.uk/crypto-hedge-funds-statistics/) — secondary source, use with caution). Typical crypto fund sizes are $10M–$500M with lean teams; strategy archetypes: liquid token (long-biased), market-neutral/basis, quant/HFT, DeFi yield ([Crypto Insights Group guide](https://www.cryptoinsightsgroup.com/resources/industry-guide-to-crypto-hedge-funds-2025-edition)).

### 1c. DAO / protocol treasuries

- **kpk (formerly karpatkey)**: the category leader — manages >$2.1B non-custodially for GnosisDAO, ENS Endowment, Balancer, SafeDAO, Gnosis Chain, etc.; raised $7M in 2025; mandates are governance-approved policy frameworks with monthly reporting, paid as retainer or AUM % ([kpk.io](https://kpk.io/karpatkey-closes-7-million-funding-round/), [crypto.news on ENS](https://crypto.news/ens-votes-karpatkey-dao-to-manage-endowment-fund/), [Safe forum mandate](https://forum.safe.global/t/sep-24-karpatkey-safe-dao-treasury-management-core-unit/4893)). Its security model — Safe + Zodiac Roles Modifier "permissions layer" ([kpk permissions layer](https://kpk.io/permissions-layer/)) — is the incumbent architecture aomi's scoped delegation should be compared against, favorably.
- **Avantgarde Finance** (Enzyme): treasury advisory + discretionary management for DAOs/foundations ([Avantgarde](https://avantgarde.finance/services/treasury-management)).
- **Aera** (Gauntlet): autonomous treasury vaults, $100M+ allocated ([docs.aera.finance](https://docs.aera.finance/aera-for-treasury-management)).
- Mandate sizes: ENS Endowment (~$50M+ initial tranches), GnosisDAO (hundreds of millions), SafeDAO — typical mandates run $10M–$500M per DAO.
- Safe (the multisig substrate for nearly all of this) secures somewhere between $35B and $100B+ across 30+ networks depending on source/snapshot, with ~$10M protocol revenue reported for 2025 ([GlobeNewswire](https://www.globenewswire.com/news-release/2026/02/03/3231251/0/en/Safe-Project-Reports-10M-Revenue-Targets-Break-Even-and-100M-ARR-Path-by-2030.html), [eco.com Safe deep dive](https://eco.com/support/en/articles/15254042-safe-wallet-deep-dive-2026-multisig-and-smart-accounts)).

### 1d. RWA / tokenized funds

- Tokenized US Treasuries: ~$11.6B (Mar 2026, +27% YTD) to ~$14.8B across 82 assets (Jun 2026) ([InvestaX](https://investax.io/blog/q1-2026-real-world-asset-tokenization-market-report), [Coinpaprika tracker](https://coinpaprika.com/education/tokenized-treasuries-market-cap-tracker-tvl-growth/)).
- Total tokenized RWA: ~$22B AUM by May 2026 (Treasuries ~$10B, private credit ~$8B) to ~$33.5B "liquid onchain value, tripling in a year" — scope definitions differ ([eco.com](https://eco.com/support/en/articles/15254020-tokenized-rwa-market-size-2026-20b-aum-growth-trajectory), [Yellow Research](https://yellow.com/research/tokenized-rwas-31b-market-growth-real-race-starting)).
- Key products: BlackRock **BUIDL** (~$2.5B as of Q4 2025, now on 8 chains, tradeable via UniswapX since Feb 2026 — one source claims "$25B+" which could not be corroborated; treat as unreliable) ([CCN](https://www.ccn.com/education/crypto/blackrock-buidl-fund-tokenized-money-markets-explained/), [rwa.xyz/BUIDL](https://app.rwa.xyz/assets/BUIDL)); Franklin Templeton **BENJI** (~$2.5B; first SEC-registered tokenized mutual fund on public chains); **Ondo** (~$2.8B; USDY >$1B); Circle/Hashnote USYC (~$2.9B); **Superstate** (USTB/USCC); **Securitize** as the dominant issuance/transfer-agent rail ([Wag3s comparison](https://wag3s.io/blog/tokenized-rwa-treasury-ondo-buidl-benji), [InvestaX](https://investax.io/blog/q1-2026-real-world-asset-tokenization-market-report)).
- Signal of institutionalization: DTCC production testing of tokenized securities began July 2026 ([Coinpaprika](https://coinpaprika.com/education/blackrock-buidl-explained-tokenized-fund-by-securitize/)).

### 1e. The infra stack they already buy (and price anchors)

- **Custody**: Fireblocks (2,400+ institutions, 150+ chains; enterprise pricing "starts in six figures," API-usage-based), Copper (EMEA, MiCA CASP, ClearLoop off-exchange settlement), Anchorage (federally chartered bank, HSM-based, ~$10M+ client minimum), BitGo, Fordefi/Dfns/utila (MPC wallets), Safe/Squads (multisig) ([Spark comparison](https://www.spark.money/tools/custody-comparison), [Openfort](https://www.openfort.io/blog/fireblocks-alternatives), [Ridgeway](https://www.ridgewayfs.com/digital-asset-security-platforms/)). Custody is typically priced in **basis points on AUC plus platform/seat fees** — exact bps rarely public.
- **Execution/OMS/EMS**: Talos (institutional OEMS, algos, TCA — their [2026 Quant Execution Insights report](https://www.talos.com/insights/execution-cost-savings-by-the-numbers-the-talos-quant-execution-insights-report-2026) markets execution-cost savings), FalconX (prime broker; $50B+ OTC derivatives YTD 2025), Definitive (non-custodial onchain OEMS, see §5) ([Talos](https://www.talos.com/our-solutions/trading), [FalconX](https://www.falconx.io/newsroom/falconx-unlocks-24-7-electronic-access-to-otc-crypto-options)).
- **Risk/analytics as a service**: the best public price anchor — Aave DAO paid Gauntlet **$1.6M/yr** (down from $2M) and Chaos Labs similar, ~**$3.2M/yr combined**; Chaos Labs' renewal ask was **$3M/12mo**, and Aave Labs later floated **$5M/yr** which Chaos called insufficient for V4 workload ([Messari](https://messari.io/report/gauntlet-proposal-for-aave-protocol-risk-management-failure-and-future), [Aave governance](https://governance-v2.aave.com/governance/proposal/360/), [The Defiant](https://thedefiant.io/news/defi/chaos-labs-terminates-aave-engagement-citing-risk-misalignment), [Protos](https://protos.com/advisors-leave-aave-as-protocol-punishes-competitors/)). Takeaway: **$1–5M/yr per serious protocol/mandate is an accepted price band for risk/execution infrastructure**, and bps-on-AUM or %-of-yield is the accepted variable model.

---

## 2. The Language — Working Glossary

**[T] = TradFi-imported, [C] = crypto-native, [T→C] = TradFi term repurposed onchain.**

| Term | Plain-English meaning |
|---|---|
| AUM [T] | Assets under management — the money a manager runs. |
| TVL [C] | Total value locked — crypto's AUM-equivalent for a protocol/vault (deposited assets). |
| NAV [T] | Net asset value — a fund's per-share worth; crypto's problem is computing it in 24/7 markets. |
| Mandate [T] | The formal scope a client gives a manager: what they may invest in, limits, benchmark. |
| IPS [T] | Investment Policy Statement — the written rules of the mandate. |
| Curator [C] | The party that sets a vault's risk parameters and allocations on Morpho/Euler/etc. |
| Curator fee / performance fee [T→C] | Curator's cut of yield generated (typically 5–15% onchain; "2-and-20" = 2% mgmt + 20% performance in funds). |
| Hurdle rate [T] | Minimum return before performance fees kick in. |
| High-water mark [T] | Performance fees only on gains above the previous peak. |
| Drawdown [T] | Peak-to-trough loss; "max drawdown" is a key risk stat. |
| Sharpe ratio [T] | Return per unit of volatility; how funds compare risk-adjusted performance. |
| VaR [T] | Value at Risk — statistical worst-case loss estimate at a confidence level. |
| Risk bands / limits [T] | Pre-agreed ranges (e.g., max 20% in one protocol) a portfolio must stay within. |
| Rebalancing [T] | Trading back to target weights when allocations drift. |
| Basis points (bps) [T] | 1/100 of a percent — how all fees and slippage are quoted. "5 bps" = 0.05%. |
| Best execution [T] | The (often regulatory) duty to get clients the best available price. |
| TCA [T] | Transaction cost analysis — post-trade proof of execution quality. |
| Slippage [T→C] | Difference between expected and actual fill price. |
| MEV [C] | Maximal extractable value — profit bots extract by reordering/sandwiching your onchain trades. |
| Sandwich attack [C] | A bot front-runs and back-runs your swap, taxing you both ways. |
| OMS / EMS / PMS [T] | Order/Execution/Portfolio management systems — the fund back-office software stack. |
| Prime broker [T] | One-stop institution offering custody, credit, and execution (FalconX, Hidden Road). |
| Settlement / T+0 [T] | When trades finalize; onchain is atomic/instant vs TradFi's T+1/T+2. |
| Custody / qualified custodian [T] | Who holds the keys/assets; a regulated custodian many funds are required to use. |
| Non-custodial [C] | The service provider never controls client assets — the client's keys/contracts do. |
| MPC [C] | Multi-party computation — key sharding so no single party can sign alone (Fireblocks model). |
| Multisig / Safe [C] | Contract wallet requiring M-of-N approvals; the default DAO/institution wallet. |
| Smart account / AA [C] | Programmable wallet (ERC-4337/7579) that can enforce rules natively. |
| Session key / scoped delegation [C] | Time-boxed, permission-limited key granted to an agent/app — can trade, can't withdraw. |
| Policy engine [T→C] | Software layer enforcing who can do what with treasury funds (Fireblocks' term; kpk's "permissions layer"). |
| Allowlist / whitelist [C] | Pre-approved addresses/protocols/tokens — everything else is blocked. |
| Segregation of duties [T] | No single person can initiate and approve the same transaction; auditors demand it. |
| Key ceremony [C] | The formal, witnessed process of generating/distributing keys. |
| SOC 2 Type II [T] | Independent audit of a vendor's security controls over time; institutional table stakes. |
| Proof of reserves [C] | Cryptographic/onchain evidence a platform actually holds the assets it claims. |
| ERC-4626 [C] | The tokenized-vault standard; makes vault shares composable. |
| Looping [C] | Recursive borrow-redeposit leverage; the pattern that blew up Stream Finance. |
| Bad debt [T→C] | Loans a protocol can't recover — the curator's nightmare metric. |
| Oracle [C] | The price feed a protocol trusts; "hardcoded oracle" was a Stream-contagion villain. |
| LP / allocator [T] | Limited partner — the investors in a fund; "allocators" = institutions choosing managers. |
| ODD [T] | Operational due diligence — allocators' audit of a manager's ops before investing. |
| DPI/TVPI [T] | Fund return multiples (mostly VC-side; know them, rarely needed). |

---

## 3. Pain Points (ranked by frequency in sources)

**1. Per-platform fragmentation / rebuild-everything toil (curators & vault managers).** The Chorus One curator report is explicit: each venue requires "custom code, dashboards, and monitoring tools"; managing vaults across platforms "means rebuilding everything from scratch, much like opening separate bank accounts with no shared infrastructure"; curators want "one system to configure all vaults" ([Chorus One](https://chorus.one/reports-research/defi-curators-in-2025-navigating-chaos-building-resilience)). This is the single most direct product-market echo for aomi.

**2. Manual multisig operations & governance latency (DAOs).** "Most DAO treasuries are still managed by hand" — signers reviewing balances across chains, executing bridges, waiting for confirmations; a DAO with assets on five chains needs five proposals to rebalance; each cross-chain governance action adds 14–30 days; "proposals sit pending while signers are asleep" ([eco.com DAO rebalancer](https://eco.com/support/en/articles/14710279-how-to-architect-a-dao-treasury-rebalancer), [eco.com DAO treasury](https://eco.com/support/en/articles/14799687-dao-treasury-management-onchain-governance-spend), [KeeperHub](https://keeperhub.com/daos), [ChainScore](https://www.chainscorelabs.com/blog/developer-ecosystem-tools-languages-and-grants/governance-and-dao-tooling/why-cross-chain-dao-tooling-is-an-existential-necessity)).

**3. 24/7 markets vs small ops teams; NAV & reconciliation (funds).** Crypto funds trade 4–5 exchanges minimum (up to 30) plus 20–30 DEXes across 5–10 chains; fund admins can't reconcile >100k trades/day manually; NAV timing in continuous markets is unsolved; "monthly NAV cycles and delayed reporting make operations less responsive, with LPs lacking real-time views" ([1Token](https://blog.1token.tech/crypto-fund-101-accounting-and-reconciliation-for-crypto-funds/), [Cobo fund admin guide](https://www.cobo.com/post/crypto-fund-administration), [NAV Fund Services](https://www.navfundservices.com/blog/crypto-fund-administration)).

**4. Trust & transparency crisis post-Stream (everyone).** Nov 2025: Stream Finance lost $93M via an opaque off-chain "curator" strategy; xUSD fell to $0.26; Euler took $137M bad debt; Elixir's deUSD collapsed 98%; frozen funds $160M+; commentators said curators were "cosplaying risk management" ([CoinDesk](https://www.coindesk.com/markets/2025/11/04/stream-finance-faces-usd93-million-loss-launches-legal-investigation), [BlockEden](https://blockeden.xyz/blog/2025/11/08/m-defi-contagion/), [Protos](https://protos.com/stream-finance-meltdown-winners-and-losers-in-defi-risk-curator-reckoning/), [Chorus One](https://chorus.one/reports-research/defi-curators-in-2025-navigating-chaos-building-resilience)). Consequence: demand for **provable policy constraints, pre-trade simulation, and audit trails** is at an all-time high.

**5. Execution quality / MEV / slippage.** ~$2B extracted from Ethereum traders since 2020; one trader lost $714k to sandwiches in five minutes (Mar 2025); "institutions managing billions cannot tolerate slippage and need execution guarantees, audit trails that prove fair treatment"; for stablecoin ops "a 5 basis point routing decision is the difference between a profitable treasury operation and a loss" ([FXStreet](https://www.fxstreet.com/amp/cryptocurrencies/news/the-hidden-tax-costing-defi-traders-billions-202512011518), [Crypto Economy](https://crypto-economy.com/the-hidden-costs-of-decentralized-freedom/), [eco.com best execution](https://eco.com/support/en/articles/15483248-what-is-best-execution-onchain-a-definition)).

**6. Custody-vs-agility tradeoff.** Assets parked with qualified custodians are safe but slow to deploy into DeFi; curators specifically lack "custody APIs" and institutional wrappers to receive allocator flows ([Chorus One](https://chorus.one/reports-research/defi-curators-in-2025-navigating-chaos-building-resilience)). Vendors that bridge existing custody (Fireblocks/Safe/Squads) to onchain execution win (Definitive's pattern).

**7. Institutional credibility gap.** Curators lack "institutional credibility, regulatory wrappers, and advisor relationships"; no standardized risk taxonomy; allocators increasingly demand ODD reports on crypto-native providers ([Chorus One](https://chorus.one/reports-research/defi-curators-in-2025-navigating-chaos-building-resilience), [Digital Opportunities ODD](https://digopp.substack.com/p/odd-report-completed-on-arkis)).

**8. RWA ops friction.** Tokenized funds still fight thin secondary liquidity, whitelist/KYC enforcement at token level, and redemption-window design; most 2025 institutional tokenized funds ran hold-to-maturity or primary-redemption only ([Taurus](https://www.taurushq.com/blog/tokenized-funds-what-they-are-how-they-work-in-2026/), [SSGA](https://www.ssga.com/us/en/intermediary/insights/tokenized-money-market-funds-mmfs-revolutionizing-liquidity-management)).

---

## 4. How They Evaluate Vendors

**What builds credibility:**
- **SOC 2 Type II + ISO 27001** — treated like cloud-vendor due diligence: access management, incident response, availability controls ([P2P.org validator playbook](https://p2p.org/economy/validator-playbook-ethereum-staking-etf-validator-infrastructure/)).
- **Multiple named smart-contract audits** (and public reports); post-Stream, unaudited or opaque strategy contracts are disqualifying ([QuillAudits on Stream](https://x.com/QuillAudits_AI/status/1986377632926273796)).
- **Non-custodial architecture as a hard requirement** — "institutional participants... cannot accept third-party custody as part of their operational setup" (Giza's stated rationale, [Stablewatch](https://www.stablewatch.io/blog/giza-project-spotlight)); kpk markets itself as "the industry leader in non-custodial asset management" ([Chainwire](https://chainwire.org/2025/11/13/kpk-launches-agent-powered-vaults-on-morpho/)).
- **Integration with the custody stack they already have** — Definitive's differentiator is native support for Fireblocks, Fordefi, Safe, Squads, EOAs "without workarounds" ([BingX explainer](https://bingx.com/en/learn/article/what-is-definitive-edge-institutional-grade-defi-and-how-does-it-work)). Sell *into* the stack, never ask them to move keys.
- **Insurance availability** — e.g., Chainproof, a regulated carrier insuring non-custodial smart contracts for institutions ([CB Insights](https://www.cbinsights.com/company/chainproof)).
- **Track record under stress** — Gauntlet's reputation gain from normalizing a collapsed APY within 10 days after a $775M inflow (Oct 2025) shows crisis performance is marketing ([Tiger Research](https://reports.tiger-research.com/p/onchain-risk-curators-147t-vs-7b-eng)).
- **Third-party ODD reports** and reference clients ([Digital Opportunities](https://digopp.substack.com/p/odd-report-completed-on-arkis)).

**What kills a deal:** any hint the vendor touches/handles keys or can move principal; opaque or off-chain discretionary strategies (the Stream pattern); unclear liability when automation misfires; "AI decides autonomously" framing without hard permission boundaries; token-incentive gimmicks in an institutional sales motion; single-founder key-person risk; no audit trail for compliance/regulators ([Chorus One](https://chorus.one/reports-research/defi-curators-in-2025-navigating-chaos-building-resilience), [BlockEden](https://blockeden.xyz/blog/2025/11/08/m-defi-contagion/), [CB Insights institutional DeFi](https://www.cbinsights.com/research/?p=155811)).

---

## 5. AI-Agent Competitive Landscape

| Player | What they sell | Custody model | Traction | Notes |
|---|---|---|---|---|
| **Giza (ARMA)** | Autonomous stablecoin yield agent (B2C-leaning) + agent protocol | Non-custodial: ERC-7579 smart accounts + session keys (scoped: whitelisted protocols, size caps, expiry) | ~$3.96B cumulative agentic volume by Mar 2026 | Token (GIZA); consumer yield-optimizer framing ([The Block](https://www.theblock.co/post/344635/research-ai-agent-sector-overview), [ARMA docs](https://docs.arma.xyz/docs/core-features)) |
| **Almanak** | 18-agent "AI swarm" that researches/simulates/deploys strategies into vaults; "vibe coding for DeFi" | Non-custodial; multisig + TEE-secured vaults; strategies compiled to deterministic code | Peak TVL ~$132M (Dec 2025); $1B+ routed; 2,000+ strategies; ~$6M annualized revenue; token Dec 2025 | Closest philosophically (strategies→code), but B2C/prosumer + token-driven ([Lars thread](https://x.com/0xLars_/status/1998050704020340829), [Almanak](https://almanak.co/)) |
| **Brahma Console** | Self-custodial execution/automation stack for teams & institutions (Safe-based), ConsoleKit for agent builders | Non-custodial (Safe sub-accounts + policies) | $1B+ transactions processed | **Acquired by Polymarket Mar 2026; products fully wound down by Apr 17, 2026** — its institutional users need a new home ([crypto.news](https://crypto.news/polymarket-acquires-defi-startup-brahma-to-deepen-its-onchain-stack/), [IQ.wiki](https://iq.wiki/wiki/brahma)) |
| **kpk agent-powered vaults** | Rules-based (explicitly non-AI) agents executing treasury/vault strategies under auditable permission policies | Non-custodial; Safe + Zodiac Roles permissions layer | kpk manages >$2.1B overall | A manager, not a vendor — validates "agents under policy" narrative; possible partner or reference competitor ([Chainwire](https://chainwire.org/2025/11/13/kpk-launches-agent-powered-vaults-on-morpho/)) |
| **Definitive** | Non-custodial onchain OEMS: smart order routing across 100+ DEXs + 15 PMMs, TWAP/algos, post-trade reporting, RBAC | Non-custodial; plugs into Fireblocks/Fordefi/Safe/Squads | $4.1M raise (2023, BlockTower); EDGE token | Execution-only (no strategy autonomy) — complementary/adjacent, and the best model of "sell into existing custody" ([docs.definitive.fi](https://docs.definitive.fi/), [The Block](https://www.theblock.co/post/262189/a-startup-that-wants-to-make-defi-less-stressful-for-institutions-raises-4-1-million)) |
| **Theoriq** | AI agent swarms for LP/liquidity management; AlphaVault | Vault-based | ~$25M TVL in AlphaVault | Token (THQ); B2C vault products ([KuCoin](https://www.kucoin.com/blog/en-theoriq-thq-kucoin-listing-how-ai-agents-boost-defi-capital-efficiency)) |
| **Makina** | "Machines" (strategy vaults) + "Calibers" (cross-chain execution engines) for professional operators & AI agents, with protocol-level risk limits | Non-custodial protocol | Early | Infrastructure-layer framing closest to aomi's; watch closely ([cyber.fund](https://cyber.fund/content/makina-the-defi-execution-engine)) |
| Others (Mozaic, Fungi, Axal, Cortex…) | Consumer DeFAI yield agents | Varies | Small | Long tail; mostly retail token plays ([OKX Ventures overview](https://okxventures.medium.com/autonomous-agents-in-defi-transforming-finance-with-ai-522fbde45863)) |

**The gap aomi can own.** Every funded player is either (a) a **B2C asset-gatherer** competing for deposits with a token (Giza, Almanak, Theoriq), (b) **execution-only** with no strategy autonomy (Definitive, Talos), (c) **dead** (Brahma), or (d) a **manager, not a vendor** (kpk, Gauntlet). Nobody credible is selling: *"Bring your own strategy and your own custody; we give your team a non-custodial AI execution harness — simulate-before-sign, scoped delegation, multi-chain — that turns your existing API/strategy into an agent your compliance team can audit."* That's white-label, sell-to-the-manager positioning — the Veda/Securitize *infrastructure* posture applied to AI execution, arriving exactly when (i) Brahma's institutional users are orphaned, (ii) post-Stream demand for policy-constrained transparent execution peaks, and (iii) kpk has educated the market that "agents under auditable permissions" is the future but declined to make them intelligent.

---

## 6. Messaging Guidance by Persona

### Persona A: Vault curator / risk curator (Morpho/Euler/Kamino)

**They care about (their words):**
1. "We're rebuilding monitoring, execution, and dashboards from scratch for every venue and chain." (fragmentation cost)
2. "Post-Stream, allocators want proof our vaults do only what the policy says." (transparent, constrained execution)
3. "Fees are 5–15% of yield — headcount is the whole P&L." (margin/automation)

**Pitch:** "aomi turns your existing strategy logic into a non-custodial execution agent that works every venue and chain from one harness. Every rebalance is simulated before it's signed and executed under scoped delegation your depositors can verify onchain — the policy is the permission, not a promise. You keep your models, your keys, and your fee; you drop the 3 a.m. ops rotation and the per-protocol integration backlog."

**Avoid:** "AI decides for you," "set and forget," "autopilot," "10x your APY," "we manage your funds," anything token-incentive-flavored, "trustless" (overused; say *verifiable*), comparing yourself to yield aggregators.

### Persona B: Crypto fund PM / head of ops (liquid token, market-neutral)

**They care about:**
1. "Execution quality is where alpha dies — slippage, MEV, and fills we can't defend to LPs." (best execution + TCA)
2. "We're a four-person ops team covering a 24/7 market across 10 venues and 5 chains." (coverage without headcount)
3. "Everything must reconcile — fund admin, auditor, and ODD questionnaires eat quarters." (audit trail, segregation of duties)

**Pitch:** "aomi is a non-custodial execution harness that runs your strategies as agents inside mandates you define: allowlisted venues, size limits, risk bands, kill switches. Every transaction is pre-trade simulated, policy-checked, and logged to a complete audit trail your admin and auditors can consume — best execution you can actually evidence. It plugs into the custody you already use; we never hold keys or assets."

**Avoid:** "trading bot," "signals," "guaranteed returns," any performance claims, "we custody/hold/manage," "no humans needed" (say *human-defined mandates, machine-speed execution*), retail exchange vocabulary ("HODL," "degen," "moon").

### Persona C: DAO treasury manager / treasury working group

**They care about:**
1. "Five chains means five multisig proposals and a month of latency; signers are asleep when markets move." (governance latency vs market speed)
2. "The community must be able to verify we can't rug them — permissions over trust." (non-custodial, onchain-verifiable policy)
3. "Reporting to the DAO every month is a manual slog." (transparent reporting)

**Pitch:** "aomi lets your DAO approve a policy once — assets, protocols, limits — and then an agent executes within it continuously, non-custodially, across every chain you hold assets on. It's the permissions-layer model your governance already trusts (Safe-compatible, scoped delegation), upgraded with simulation before every transaction and a public execution log. Governance sets the mandate; the agent handles the 24/7 toil."

**Avoid:** anything implying the agent can exceed governance ("full autonomy"), "we take over your treasury," speed framing that sounds like bypassing governance, VC/fund jargon (say *mandate/policy*, not "2-and-20"), "AI-powered" as the lead (lead with *policy-constrained*; kpk deliberately markets non-AI — position AI as capability *inside* the same security model).

### Persona D: RWA / tokenized fund ops lead (issuer, transfer agent, ops)

**They care about:**
1. "Compliance is enforced at the token: whitelists, KYC, transfer restrictions — automation must respect them, always." (compliance-native execution)
2. "24/7 subscriptions/redemptions and multi-chain liquidity ops with a TradFi back office." (ops coverage)
3. "Our regulators and auditors need a complete, replayable record." (audit/reporting)

**Pitch:** "aomi gives your ops team a non-custodial agent that runs the onchain leg of your fund — liquidity management, rebalancing across the chains your fund is issued on, subscription/redemption flows — strictly inside your compliance rules. Every action is simulated pre-sign, checked against your allowlists and transfer restrictions, and recorded in an audit trail built for regulated reporting. Your custodian and transfer agent stay exactly where they are."

**Avoid:** "DeFi yields" as a lead (compliance first, yield second), "permissionless," "unstoppable," crypto-slang entirely, any suggestion of touching the share register or custody, "experimental/beta" language, over-claiming regulatory status ("compliant" → say *built to operate within your compliance framework*).

### Cross-persona language rules

- **Lead with the security model, not the AI**: "simulate-before-sign," "scoped delegation," "policy-constrained execution," "non-custodial by construction" are the four phrases that survive every persona's filter.
- **The market's own precedents are your shorthand**: "the kpk permissions-layer model, with intelligence"; "Veda-style infrastructure, for execution"; "what Brahma Console users lost in April."
- **Universal red-flag words**: autopilot, bot, autonomous (unqualified), guaranteed, APY-maximizing, trustless, "we hold/manage funds," degen, moonshot, "no code" (sounds unserious to quants), "revolutionary."
- **Universal green-flag words**: mandate, policy engine, allowlist, pre-trade simulation, audit trail, segregation of duties, best execution, TCA, non-custodial, scoped, verifiable, SOC 2 (when you have it — prioritize getting it; it appeared in every institutional due-diligence source).

---

### Data caveats
- Curator TVL figures vary $5.9–7B by snapshot/source (Feb vs May 2026) and by which vaults are attributed to whom; use "~$7B, top-3 ≈ 70%."
- The "$25B BUIDL" claim ([Intellectia](https://intellectia.ai/blog/rwa-tokenization-2026)) contradicts rwa.xyz-derived figures (~$2.5B); treated as unreliable.
- Aggregate crypto-fund AUM ($93B/$136B) comes from a secondary aggregator ([SQ Magazine](https://sqmagazine.co.uk/crypto-hedge-funds-statistics/)); the primary PwC/AIMA report gives survey shares, not a clean industry AUM total.
- Custody pricing is almost entirely non-public; only qualitative anchors (six-figure Fireblocks entry, $10M Anchorage minimum, bps-on-AUC norm) were findable. The Aave/Gauntlet/Chaos Labs governance record is the best public benchmark for what this sector pays for risk/execution services.
- Sommelier/Somm TVL data found is 2023–2024 vintage (~$45–100M); no reliable 2026 figure surfaced.
