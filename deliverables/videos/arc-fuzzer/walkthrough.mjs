// A builder's protocol, fuzzed whole — the Aomi security agent on a real Arc Studio app.
//
// Recorded inside Cecilia's Chrome over CDP (META.cdp): the take needs her real Arc Studio
// session and MetaMask. The first half is her account: the project, the deployment, Aomi Fuzz
// finding it. The second half runs a LIVE campaign on arc-studio-fuzz.vercel.app against the
// deployed protocol and ends on the reproduced finding, then sends it back to Arc Studio.
//
// During the take she does two things by hand: approves one MetaMask signature at step 4
// (Sign in to Aomi), and nothing else. Every other action replays. Each take runs a real
// campaign (~10 min); if a provider fails mid-run the take fails and is re-run.
export const META = {
  title: "A builder's protocol, fuzzed whole",
  subtitle: 'Aomi connects to your Arc Studio app, forks your real deployment, and its security agent fuzzes the whole protocol until a finding reproduces.',
  eyebrow: 'Shipped · Aomi security agent for Arc Studio',
  link: 'arc-studio-fuzz.vercel.app',
  viewport: { width: 1600, height: 900 },
  reducedMotion: 'reduce',
  cdp: 'http://localhost:9222',
};

export const DISPLAY = [
  ['U S D C', 'USDC'],
  ['W gold', 'WGLD'],
  ['A M M', 'AMM'],
  ['a hundred and seventy-five thousand', '175,000'],
];

const STUDIO = 'https://studio.arc.io/app/e715072f-f9fb-416c-a85e-28acf20bf623';
const FUZZ = 'https://arc-studio-fuzz.vercel.app';
const APP = `${FUZZ}/apps/e715072f-f9fb-416c-a85e-28acf20bf623`;
const tab = (name) => `[role=tab]:has-text("${name}")`;
const toolRow = (name) => `details[data-tool-name="${name}"] >> nth=0 >> summary`;

export const STEPS = [
  // ---- the builder's world --------------------------------------------------------------
  { id: 1, title: 'Your Arc Studio project',
    say: "You built this in Arc Studio: a lending pool, its collateral token, an A M M, and the price oracle that reads it. It's in your projects like anything else.",
    do: [['goto', STUDIO], ['wait', 2], ['focus', 'text=Arc Lending Protocol Manager >> nth=0']] },
  { id: 2, title: 'Open Aomi Fuzz',
    say: "Aomi Fuzz connects to your Arc Studio account. No setup and no handlers to write: it reads what you already built.",
    do: [['goto', FUZZ], ['wait', 1.5], ['focus', 'text=apps in your Arc Studio account'], ['click', 'a[href="/apps/e715072f-f9fb-416c-a85e-28acf20bf623"]'], ['waitFor', 'text=FUZZ TARGETS', 60], ['wait', .8]] },
  { id: 3, title: 'It found your deployment',
    say: "It found the contracts, and the one you deployed to Arc testnet, with the three it's wired to. That matters: this bug doesn't live in any one of them.",
    do: [['waitFor', 'text=Fuzzing your live deployment', 60], ['focus', 'text=The fork also holds']] },
  { id: 4, title: 'Sign in to Aomi',
    say: "One wallet signature signs you in to Aomi. It never signs a transaction, and nothing is ever sent to the chain.",
    do: [['click', 'text=Sign in to Aomi'], ['waitFor', 'text=Aomi ·', 180], ['focus', 'text=Aomi ·']] },

  // ---- the mechanism ------------------------------------------------------------------------
  { id: 5, title: 'The attack surface', voAt: 'end',
    say: "We run it. First the attack surface: every writable function, by every kind of actor, in any order. At three calls deep that's a hundred and seventy-five thousand ordered sequences. Nobody checks that by hand.",
    do: [['click', '[data-testid=run-aomi-fuzz]'], ['waitFor', 'details[data-tool-name="arc_map_attack_surface"]', 120], ['click', toolRow('arc_map_attack_surface')], ['wait', 2]] },
  { id: 6, title: 'The agent proposes', speed: 4,
    say: "The agent proposes: a threat model, the roles, the rules that must hold, and its own attack path in order. It never decides whether something is a bug.",
    do: [['waitFor', 'details[data-tool-name="arc_fuzz_start"]', 600], ['click', toolRow('arc_fuzz_start')], ['wait', 2.5]] },
  { id: 7, title: 'The engine judges', speed: 6,
    say: "The campaign engine judges. It runs the agent's path first, then searches breadth-first from a snapshot, pruning states it has already seen. When a step never succeeds, it tells the agent to resize and go again.",
    do: [['waitFor', 'details[data-tool-name="arc_fuzz_round"]', 900], ['click', toolRow('arc_fuzz_round')], ['wait', 2.5]] },
  { id: 8, title: 'The fork executes',
    say: "Every sequence runs on a held fork of Arc, pinned at one block and reset between runs: your real deployment, with nothing broadcast. Every result is kept.",
    do: [['click', tab('All events')], ['wait', .6], ['click', '[data-testid=ledger] summary:has-text("sim_replay_traces") >> nth=0'], ['wait', 2]] },
  { id: 9, title: 'The conversation',
    say: "The agent is told the world is already real. It deploys nothing and edits nothing itself.",
    do: [['click', tab('Chat')], ['wait', .8], ['focus', 'text=do not call sim_open'], ['wait', 1.5]] },
  { id: 10, title: 'The finding', speed: 40, voAt: 'end', hold: 2,
    say: "Then it lands. Pump the A M M, deposit the pumped collateral, borrow against it: the oracle believed the spot price. Cut to three calls and replayed twice before it counts.",
    do: [['click', tab('Tools')], ['waitFor', '[data-testid=verified-finding]', 2400], ['focus', '[data-testid=verified-finding]']] },
  { id: 11, title: 'Back to Arc Studio', voAt: 'end',
    say: "And it goes back where you work: one click sends the finding to Arc Studio as a fix request.",
    do: [['waitFor', '[data-testid=send-fix]', 120], ['click', '[data-testid=send-fix]'], ['waitFor', 'text=Fix request sent to Arc Studio', 120], ['focus', 'text=Fix request sent to Arc Studio']] },
];
