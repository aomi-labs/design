# Narration: script, anchors, subtitles

## The voice

Explain like a teacher walking someone through the deck. In each scene, say:
1. **What happens:** the mechanism, in plain words.
2. **Why it matters:** the risk it removes, or what it makes possible.
3. **Where it sits:** name the part ("This is gate one"), ideally *after* the mechanism has been explained.

Write full sentences that connect: "because", "so", "once", "instead". Not slogan fragments.

| Slop (rejected) | Teaching (accepted) |
|---|---|
| Signed. Packed. Settled. | Only then is the block added to the chain, and the transaction is settled. |
| Gate one: the agent holds no key. Signing is a request, and the wallet's policy decides. | Once the agent has built the transaction, it still can't sign it, because it never holds the key. Instead, it sends a signing request to a separate wallet module running in a secure enclave. That module checks the request against the user's policy, such as spending limits, allowed contracts and recipients, and only then signs. This is gate one. |
| Code gets reviewed before it ships. Money just gets signed. | A financial agent works a lot like a coding agent: it takes an intent, builds something, and ships it. But code is reviewed and tested before it deploys, while a transaction is only signed. |

Also apply `TONE.md`: concrete over hype, no "seamless" or "supercharge", "we" not "I", the product's own words. When a slide has a precise claim (what a guard checks, what a session caps), say it precisely. Vague narration over a precise diagram reads as hand-waving.

## Length budget

- The voice runs about **2.5 words per second** (150 wpm). A 60-word scene is about 24 seconds.
- 13 explained slides come to about 545 words, roughly 3.5 minutes. Tell the user the total early, along with the platform limit (X non-Premium: 2:20).
- If it's too long, cut whole sentences of secondary detail, not the "why". A long film that explains beats a short one that doesn't.

## Script format (`vo/script.mjs`)

Start from `assets/script-template.mjs`. Each line has:
- `text`: written to be *spoken*. Spell out what TTS would misread: "zero-point-five" not "0.5", "aomi dot dev" not "aomi.dev". Then map those back for subtitles in `DISPLAY`. Check how the brand name is pronounced on the first clip.
- `start` / `end`: on the silent film clock, roughly where the scene's voice should begin and finish.
- `anchors`: `[word, occurrence, filmTime]`.

**Picking anchors:**
- Anchor the word that *names what moves*: "fork" when the fork rises, "fails" when the card turns rose, "passes" when the check lands, "settles" when the lock closes.
- Anchors must increase in both word order and film time. If the voice says things in a different order from the animation, change the animation order to match the voice. The voice is the spine.
- Use 3–8 per line. With too few, a long line drifts away from the picture; with too many, motion jitters between tightly pinned points.
- If a word appears twice, give its occurrence number (`['gate', 2, 35.2]`).
- `build-timeline.mjs` warns when the picture would have to run more than 2.5× faster than the voice. That means a sentence describes more than its animation shows: give the animation more film time, or move the anchor.

Generate each line as its own clip. A slow line then can't push later lines out of sync, and an edit re-voices only that line. `tts.mjs` sends the neighbouring lines as context so the delivery stays continuous.

## Subtitles

- They come straight from the ElevenLabs word timings, so they always match the voice.
- One sentence per cue. Sentences over 58 characters split at the clause nearest the middle, otherwise at the word nearest it.
- They're burned into the film (white on a dark box, bottom centre, Geist 34 px). Feeds autoplay muted, so burned-in subtitles carry the film. Ship the `.srt` as well.
- Drop any on-screen captions that repeat the narration; subtitles take their place. Keep chapter tags as headings, worded to describe ("Gate 2 · Onchain guard contract").

## Mixing

- The music sits at about −17 dB between lines and ducks under the voice (sidechain). The overall mix is levelled to −16 LUFS (`finish.mjs`).
- Chord changes land on scene boundaries; chimes play on passes; soft thuds play on failures. All of these are written on the silent clock and move automatically onto the narrated clock.
