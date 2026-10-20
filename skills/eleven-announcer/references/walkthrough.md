# Writing the walkthrough

## Shape of a good walkthrough

Usually 4–8 steps and 45–120 seconds. The arc:

1. **Context** (1 step): open the app where the feature lives. Say who it's for and the problem it removes.
2. **Doing it** (2–5 steps): the shortest real path to the result. Each step is one action and one thing to notice.
3. **The proof moment** (1 step, often `voAt: 'end'`): the result appears, then the voice explains what it means.
4. **Where to find it** (optional final step, or the outro link): where to go and how to start.

One step is one idea. If a voice line needs "and then…", split the step.

## Voice lines

- Talk to a teammate: "Here's the project we'll fuzz…", "The new Fuzz tab sits next to Tests…", "In under a minute it finds a counterexample: …".
- Name what's on screen with the UI's own words, so viewers can match the voice to the picture.
- Describe what to *look at*, not every click ("we start a run with the defaults", not "click Run, then click OK").
- Explain results by what they mean: "the exact failing input is saved, so it replays as a normal test".
- No hype: no "seamless", "supercharge", "game-changing". Follow `TONE.md`.
- Spell out what a voice would misread: "zero-point-five", "ten thousand", "aomi dot dev". Map them back for subtitles in `DISPLAY`.
- At about 2.5 words a second, a 25-word line is roughly 10 s. The step holds its last frame until the line ends, so long lines make long holds. Keep lines tight, or add a `wait` so something visibly happens.

## Actions

| Action | Use |
|---|---|
| `['goto', url]` | First action of the first step, and any page change. The step's footage starts once the page has loaded. |
| `['click', sel]` | The cursor glides over, a ripple shows, then it clicks. The camera eases toward the element. |
| `['type', sel, text, {delay}]` | Clicks the field and types visibly (45 ms per character). |
| `['hover', sel]` | Shows tooltips and hover states. |
| `['focus', sel, {cursor: true}]` | Zooms onto a result without interacting with it. Add `cursor: true` to point at it. |
| `['press', key]` | Keyboard: `Enter`, `ArrowRight`, `Meta+K`… |
| `['scroll', px]` | Smooth wheel scroll (negative scrolls up). |
| `['wait', s]` | Let an animation play out on screen. |
| `['waitFor', sel, timeoutS]` | Wait for a result to appear. Static waiting is cut in the edit, so long waits cost no screen time. |

Step options:
- `voAt`: `'start'` (talk while acting) or `'end'` (act first, then explain).
- `hold`: seconds to linger after the last action (default 0.8).
- `speed`: play a step N× faster, for visible progress worth showing but not sitting through.
- `zoom: false`: keep the step at full view.
- `maxZoom`: cap the zoom (default 1.5).
- `keepZoom`: stay zoomed into the next step.

## Recording options

By default, the recorder launches its own browser and reuses the saved sign-in session.
To record with an existing Chrome profile, start a dedicated Chrome instance with a
remote debugging port and set `META.cdp` in `walkthrough.mjs`:

```js
export const META = {
  cdp: 'http://localhost:9222',
  viewport: { width: 1600, height: 900 },
  scale: 1.5,
  colorScheme: 'light',
  reducedMotion: 'reduce',
};
```

The recorder opens a new tab in the default context, so it shares that profile's
sessions and extensions. It applies the viewport and media settings to that tab.
On completion or failure, it closes its tab and disconnects; Chrome and your other
tabs stay open. Use a current Playwright version for Chrome extension compatibility.

For macOS draft narration, set `EA_SAY_VOICE` to a voice installed on your Mac and
`EA_SAY_RATE` to the speaking rate in words per minute. The default rate is 175.
These settings apply only to `tts.mjs --draft`.

## Selectors

- Prefer user-facing locators: `role=button[name="Run fuzz"]`, `role=tab[name="Fuzz"]`, `text=Counterexample found`, `[data-testid=fuzz-run]`.
- `record.mjs` waits up to 20 s for each target to be visible and scrolls it into view.
- Find selectors while exploring with the browser tools (`find`, `read_page`). If a label is ambiguous, scope it: `[data-testid=sidebar] >> text=Settings`.
- If the app is ours and has no stable hooks, suggest adding `data-testid`s in a follow-up PR rather than relying on fragile CSS.

## Safety

- Replays act on the live app every time. Use staging, test projects and testnets.
- Confirm with the user before any step that spends money, sends messages, changes production or deletes data.
- Sign-in is the user's job (`login.mjs`). Claude never types credentials, and session files stay in `~/.config/eleven-announcer/auth/`.
- Check stills for anything sensitive before sharing: API keys, emails, internal hostnames, personal data. Re-route the walkthrough, or use a demo account, instead of blurring after the fact.
