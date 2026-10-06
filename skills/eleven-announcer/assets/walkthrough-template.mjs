// Walkthrough script → walkthrough.mjs in the production folder (deliverables/videos/<slug>/).
//
// One step = one thing the viewer should notice, with one voice line.
//   title   short chip shown in the window bar ("Start a fuzz run")
//   say     the voice-over line (teach: what we're doing → what to look at → why it matters)
//   do      actions, run in order:
//             ['goto', url]                     open a page (the recording starts once it has loaded)
//             ['click', selector]               glide the cursor there, ripple, click
//             ['type', selector, text]          click the field, type visibly (45 ms/char)
//             ['hover', selector]               glide the cursor there
//             ['focus', selector]               zoom to an element without touching it
//             ['press', key]                    e.g. 'Enter', 'ArrowRight'
//             ['scroll', pixels]                smooth wheel scroll
//             ['wait', seconds]                 let something animate or load
//             ['waitFor', selector, timeoutS]   wait until something appears (static waiting is cut later)
//   voAt    'start' (default): talk while acting · 'end': act first, then explain the result
//   hold    seconds to linger after the actions (default .8)
//   speed   play this step N× faster (long progress you still want to show)
//   zoom    false to keep this step at full view · maxZoom to cap the zoom (default 1.5)
//
// Selectors: prefer what a user sees: 'role=button[name="Run fuzz"]', 'text=Findings', '[data-testid=…]'.
// Every action replays against the live app on each recording. Only use actions that are safe to repeat
// (test data, staging, testnet), and confirm with the user before any step that creates real side effects.
export const META = {
  title: 'The new feature, by name',
  subtitle: 'One sentence on what it does and who it is for.',
  eyebrow: 'Shipped · Arch Studio',
  link: 'studio.example.com/fuzz',
  viewport: { width: 1600, height: 900 },   // 16:9 keeps the window filling the frame
  // storageState: '~/.config/eleven-announcer/auth/studio.example.com.json',  // default: derived from the first goto host
};
export const DISPLAY = [];                   // spoken form → subtitle form, e.g. ['aomi dot dev', 'aomi.dev']

export const STEPS = [
  { id: 1, title: 'Open the project',
    say: "Here's the project we'll fuzz: an AMM pool contract that's already deployed on a test chain.",
    do: [['goto', 'https://studio.example.com/projects/amm'], ['wait', .6]] },
  { id: 2, title: 'Start a fuzz run',
    say: "The new Fuzz tab sits next to Tests. We pick the swap function and start a run with the default ten thousand cases.",
    do: [['click', 'role=tab[name="Fuzz"]'], ['click', 'text=swap'], ['click', 'role=button[name="Run fuzz"]']] },
  { id: 3, title: 'Watch it find a bug', speed: 3, voAt: 'end',
    say: "In under a minute it finds a counterexample: a swap that rounds the fee down to zero. The exact input is saved, so it replays as a regular test.",
    do: [['waitFor', 'text=Counterexample found', 90], ['focus', 'text=Counterexample found']] },
];
