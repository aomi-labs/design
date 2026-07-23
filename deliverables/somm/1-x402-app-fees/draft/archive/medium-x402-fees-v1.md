# App Fees Without the Toll Booth: How Somm.Finance Bills with x402

*Draft v1 — first pass from the adopted explainer doc.*

Every API business eventually meets the same villain: the toll booth. Verify payment,
then serve the request. Verify again, serve again. It works, but it puts a
payment round-trip in front of every single call — and for a conversational
product like Somm.Finance, where one user session is dozens of turns, that
latency is the product.

## The x402 idea

The x402 spec resurrects HTTP's forgotten status code — `402 Payment Required` —
and turns it into a machine-readable payment handshake. A server that wants
payment answers with a 402 and a quote; the client pays and retries with a
receipt header. No accounts, no API keys, no invoicing.

## What we do differently: the deferred credit gate

Somm doesn't check payment on every turn. Instead we keep a **running credit
balance** per session and only re-check it at a checkpoint every `TURN_CAP`
turns. Between checkpoints the balance is allowed to run **negative** — turns
keep flowing, the user isn't billed each time.

- `credit₀ = 1` — a session starts with one turn of credit
- `TURN_CAP = 3` — the gate is consulted every third turn
- `cost/turn = 5` — each turn draws down the balance
- `gate: balance ≥ 0` — a request clears only while the balance is non-negative

The debt is caught when the gate slams shut at the next checkpoint. Turns 2 and
3 ride through on credit; turn 4 pays for everyone.

## Why this matters for app fees

App-level fees stack on top of the model bill. Because settlement is deferred to
checkpoints, the fee math happens in one place — the gate — instead of being
smeared across every request handler.

*TODO(v2): the MPP section — multi-path payments and how partner fees split.*
*TODO: verify the exact per-turn price with eng before publishing.*
