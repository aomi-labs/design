# ACR × Aomi — chat-first cut

This revision enters the live chat after a short ACR introduction. Approximately 40% of the finished film covers the real conversation, completed tool calls, expanded arguments/results, and the recommendation.

Captured from the external Chrome browser on 2026-10-19, using ACR's deployed homepage and embedded Aomi widget. The opening chat segment is an actual 4 fps screen capture of a read-only request completing. Subsequent tool-detail shots are held screenshots from the same live browser session, not fabricated UI or reconstructed responses. Waiting and inspection are edited for narration.

Observed calls: `acr_check_bill` and `acr_rate`. The request checked an example 0.47 USDC invoice for 23,000 inference tokens. The assistant escalated for review, cited public price references, disclosed 12.9-day-old price evidence, and distinguished the nominal ACR index from market pricing. The homepage and tool returned different freshness snapshots; the film does not claim they are synchronized.

The later treasury scenes are source-backed workflow illustrations reused from the prior cut. They explain preparation, simulation, owner authorization, and receipt reconciliation; they are not evidence of a deployed treasury transaction. No payment was submitted.

Music: original vibrant 124 BPM electronic instrumental, retained from the approved music revision. Narration: ElevenLabs. No API credentials are stored in this deliverable.

Outputs: `acr-aomi-chat-cut.mp4`, `chat-cut.srt`, and `verification.json`. Local raw frames and rendering intermediates are ignored by Git. `edit.py` recreates the film from captured media and voice clips; it requires Pillow and ffmpeg. The predecessor `homepage-cut` supplies existing verified protocol scenes and their narration.
