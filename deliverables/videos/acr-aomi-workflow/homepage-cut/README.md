# ACR × Aomi — homepage-led demo

Final edit: 128.000 seconds, eight scenes, ElevenLabs voiceover, burned-in captions and separate SRT, quiet ambient music.

## Content

1. What ACR is: compute benchmarks, billing evidence, on-chain infrastructure.
2. Evidence and public price comparisons; evidence age and payment authorization are separate.
3. The homepage's real on-chain contract register.
4. The implemented bill-to-PolicyWallet flow: staging, simulation, explicit owner authorization, guard and contract boundaries.
5. Verified settlement back into the original obligation.
6. Frontend widget import and pinned application routing.
7. Workflow-led app scaffolding with protocol tools and guards.
8. Shipped frontend versus pending production payment acceptance.

## Evidence and editorial choices

Original repository: https://github.com/kaustubh76/ACR---Arc-Compute-Rate
Reviewed main: `a10b7a72f7413b5f79eb5ba29de73ab7c899ba09`.

Footage: public https://arc-compute-rate.vercel.app/ captured in an external headed browser at 1600 × 900. Six scenes show the real ACR interface (71.4% of scene time). Five are newly recorded homepage footage; the frontend scene uses the repository’s shipped desktop screenshot, visibly labeled as repository evidence. Two illustrations explain the treasury execution and reconciliation implementation. Both label themselves as implementation walkthroughs, not live payments. The ACR navy/amber/teal theme is used throughout.

The agent drawer is not opened live in this film because the browser inspection path was denied. The full-app screenshot comes from `docs/evidence/agent-drawer/desktop.jpg` at the reviewed source commit. Its implementation claim was checked in `apps/terminal/components/AgentChat.tsx`; this film does not claim to demonstrate a completed live chat or signed transaction.

Treasury evidence: `services/index_api/index_api/payments.py`, `contracts/src/PolicyWallet.sol`, `integrations/aomi/src/skill/`, and `integrations/aomi/DEPLOYMENTS.md`. Production acceptance remains pending.

Narration: eight successful ElevenLabs timestamped synthesis responses. All returned character alignments were verified against the exact script. Credentials are not stored in the deliverable.

Music: original quiet sustained synthesis; no arpeggios, percussion, or outro chime.

## Rebuild

Run the Eleven Announcer record, compose, render, and finish scripts against this directory. Existing ElevenLabs voice clips can be reused. New synthesis reads `ELEVEN_API_KEY` and `ELEVEN_VOICE_ID` from the process environment.

Raw frames and generated videos remain local and are ignored by Git.

## Verification

The final 1920 × 1080, 30 fps H.264/AAC preview decoded all 3,840 frames successfully. Duration is 128 seconds; eight voice clips and 43 caption cues fit without overlap. Audio peak is -1.4 dB. Representative frames and the encoded outro were visually checked. See `verification.json` for file sizes and checksum.
