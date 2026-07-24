# App Fees Without the Toll Booth: How Somm.Finance Bills with x402

*Draft v2 — tightened intro, added the MPP section per review.*

Most paid APIs put a toll booth in front of every request: verify payment, then
serve. For a conversational product like Somm.Finance — where one session is
dozens of turns — that round-trip **is** the latency budget. So we built our
app fees on x402 with one twist: we almost never check.

## The x402 handshake in one paragraph

x402 turns HTTP's forgotten `402 Payment Required` into a machine-readable
payment loop: the server answers with a quote, the client pays on-chain and
retries with a receipt header. No accounts, no API keys, no invoicing — the
protocol *is* the billing relationship.

## The deferred credit gate

Somm keeps a **running credit balance** per session and consults it only at a
checkpoint every `TURN_CAP` turns. Between checkpoints the balance may run
**negative** — turns keep flowing and the user is never interrupted mid-thought.

- `credit₀ = 1` — a session opens with one turn of credit
- `TURN_CAP = 3` — the gate is consulted every third turn
- `cost/turn = 5` — each turn draws the balance down
- `gate: balance ≥ 0` — requests clear only while the balance is non-negative

Turns 2 and 3 ride through on credit; the debt is caught when the gate slams at
the turn-4 checkpoint. The user experiences a session, not a meter.

## MPP: where the fee actually goes

The second half of the story is **multi-path payments**. A single x402
settlement fans out along the payment path: the model provider's share, Somm's
app fee, and the partner's cut each ride their own leg of the route. Because
settlement happens at checkpoints, the split is computed once per gate — not
re-derived per request — which is what keeps partner accounting exact instead
of rounded.

## What builders should copy

1. Bill at checkpoints, not per call — latency is a feature of your pricing.
2. Let credit run negative inside a window you control — trust is cheaper than
   a round-trip.
3. Compute fee splits at settlement time, in one place — smeared fee math is
   how partner disputes are born.

*TODO: verify the exact per-turn price with eng before publishing.*
