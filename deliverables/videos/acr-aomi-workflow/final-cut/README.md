# ACR × Aomi — short proportional cut

This revision follows the approved short script, with one evidence-driven correction: the treasury section is an implementation walkthrough, not a recorded successful payment. The project source says testnet PolicyWallets lack the required replay-protection interface and production payment acceptance remains pending. The live public app's treasury capability check stalled on `Check active skills` and was cancelled; it produced no usable contract-read, simulation, authorization, or settlement trace.

## What the video shows

- Actual read-only ACR chat footage and expanded `acr_check_bill` / `acr_rate` results from the previous verified recording.
- Fresh external Chrome captures of the homepage and GitHub implementation on 2026-10-19.
- GitHub `integrations/aomi/src/lib.rs`: API tools, treasury skill, conditional `evm-core` namespace.
- GitHub `integrations/aomi/src/skill/workflows.md`: staging, simulation, owner authorization, receipt verification and reconciliation.
- GitHub `apps/terminal/components/AgentChat.tsx`: actual `AomiWidget` integration.
- White official Aomi mark, using the original SVG geometry. No gold logo and no nonuniform image scaling.

## Output and validation

`acr-aomi-final.mp4` is the full 1920×1080 H.264/AAC deliverable. `final-cut.srt` contains subtitles. All shots use uniform proportional scaling onto a 16:9 canvas with square pixels; the render contains no reused anamorphic video segments. `verification.json` records timing, source boundaries and aspect-ratio checks.

The music remains the original vibrant 124 BPM electronic score. Voiceover is ElevenLabs. API credentials are not stored in this folder. Raw recording frames and rendering intermediates are ignored by Git.

Run `edit.py` with Pillow, ffmpeg, and Node available to regenerate from the captured inputs and existing voice files. The script asserts a runtime below two minutes.

The finished film does not establish deployed on-chain E2E success. Replacing the source walkthrough with real contract reads and an authorized testnet payment requires a compatible configured deployment and successful receipt reconciliation.
