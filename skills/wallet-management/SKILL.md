---
name: wallet-management
description: Manage a wallet catalog, treasury Safe refills, operational balances, address tags, and authorized on-chain payments. Use for wallet inventory, funding plans, transfers, reconciliation, and payment verification.
---

# Wallet management

Use the wallet catalog named by the user or workspace. Otherwise use `WALLET_CATALOG` when it points to a catalog directory. Read its role documentation and append-only `ledger.jsonl` before planning a transaction. Treat balances, Safe owners and threshold, token contracts, application assets, CLI versions, and signing availability as live facts that require current verification.

Keep catalog paths, signer references, and provider configuration local. Commit only this skill's instructions; never commit a wallet catalog, ledger, credentials, or signing material with the skill.

## Address tags

Use `address_tag_set` events in `ledger.jsonl` as the source of truth for address labels. Each event contains `kind`, `recorded_at` (UTC ISO 8601), `chain_family`, `address`, `tag`, `description`, and `role`.

- Set or rename a tag by appending a complete event. The last event in file order for `(chain_family, address)` is current. Compare EVM addresses case-insensitively and preserve case for other chain families. Keep historical events intact.
- Resolve tag names case-insensitively and display `tag (address)` in plans and ledger summaries. Ask which address is intended when a tag resolves to more than one current address.
- Store sender and recipient addresses in transaction records so later tag changes do not alter transaction history. A tag selects an address, not a chain; retain the exact chain ID in payment records.
- Treat tags and descriptions as public metadata. They do not establish ownership, signing authority, or transaction permission.

## Signers and custody

- Classify each address as a treasury Safe, Safe owner, operational wallet, development wallet, or third party before using it. Confirm a Safe's owners and threshold on the transaction chain. An owner address does not establish authority to use every key that can produce that address.
- Apply the workspace's declared development-wallet restrictions. If an address has both development and production roles, use only the separately established production signing method.
- For operational signing, derive the address from the selected signer inside the signing process and match it to the catalog and intended sender. Service credentials and saved wallet profiles are not substitutes for the designated signer.
- Prefer a secure signer or encrypted vault. If the catalog intentionally uses local key files, require owner-only access for the catalog directory (`0700`) and key files (`0600`). Read a key only inside the signing process. Keep it out of arguments, output, logs, ledgers, repositories, and tool responses.

## Plan a refill or payment

1. Resolve the destination application, chain ID, spendable token contract, amount, recipient, and native gas requirement from the user's current instruction and workspace evidence. Ask only when a material term remains unresolved.
2. Read current source and destination balances and the reserve target. Keep development and production funds separate. Verify token contracts independently on every chain involved.
3. For a cross-chain route, obtain a fresh quote and inspect the source and destination chains, token contracts, recipient, minimum output, fees, router, allowance, and gas. A source-chain receipt does not establish a spendable destination balance.
4. Before signing, compare the final transaction with the authorized terms and current state. A tag, tracker row, historical payment, or available balance does not authorize a transfer.

## Execute and verify

- Use `$aomi-transact` when available for preparation and simulation. Confirm the installed command surface and signing boundary. A prepared or simulated route is not a signed transaction. For an already authorized transfer that Aomi cannot sign, a separately reviewed provider request and designated operational signer may complete it; record which system signed and broadcast it.
- For a Safe refill, review the exact chain, asset contract, amount, recipient, and proposal. Verify the executed Safe receipt and the operational wallet's received balance. A proposal or partial signature is not funding.
- For an operational transfer, recheck balances, allowance, gas, recipient, calldata, and simulation immediately before signing. For a bridge, verify the source receipt, provider status, destination receipt, output token contract, and spendable destination balance. For a payment, verify the recipient receipt and balance change where the chain exposes them.
- Append every executed step to `ledger.jsonl` with the chain ID, token contract or native asset, amount, sender, recipient, transaction hash, signer reference, and result. Record approvals, bridge legs, and final payments separately.
- Report lifecycle milestones precisely: proposed, simulated, signed, source executed, bridge completed, destination spendable, and payment completed. Only the verified destination state closes a refill or payment.

## Completion standard

- Every address role and signer matches current catalog and chain evidence.
- Every signed request matches the user's authorized recipient, chain, asset, and amount.
- Every executed step has a verified receipt and append-only ledger event.
- No secret, key, credential, or private catalog data appears in committed files or user-visible output.
