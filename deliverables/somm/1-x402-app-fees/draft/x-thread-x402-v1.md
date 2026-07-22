# X thread — x402 app fees (v1, derived from medium v2)

Rule from the brief: the thread is DERIVED from the finished doc, not written
independently. Each tweet maps to a section of the medium draft.

**1/7** Most paid APIs put a toll booth in front of every request: verify
payment → serve → repeat. For a conversational product that round-trip IS the
latency budget. We built Somm.Finance's app fees on x402 with one twist: we
almost never check. 🧵

**2/7** x402 = HTTP's forgotten `402 Payment Required`, turned into a
machine-readable payment loop. Server answers with a quote → client pays
on-chain → retries with a receipt header. No accounts. No API keys. The
protocol is the billing relationship.

**3/7** The twist: a deferred credit gate. Every session keeps a running
credit balance, and we only consult it at a checkpoint every TURN_CAP turns.
Between checkpoints the balance is allowed to run NEGATIVE.

**4/7** Concretely: credit₀ = 1, TURN_CAP = 3, cost 5/turn. Turns 2 and 3 ride
through on credit; the gate slams at the turn-4 checkpoint and the debt is
caught there. The user experiences a session, not a meter.

**5/7** The second half is MPP — multi-path payments. One x402 settlement fans
out along the path: model provider's share, Somm's app fee, partner's cut,
each on its own leg of the route.

**6/7** Because settlement happens at checkpoints, the fee split is computed
once per gate, not re-derived per request. That's the difference between exact
partner accounting and rounded partner disputes.

**7/7** If you're building paid agent APIs: bill at checkpoints, let credit
run negative inside a window you control, compute splits at settlement time.
Full write-up on Medium → [link when live]
