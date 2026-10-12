// Aomi security agent fuzzing a seeded lending protocol (arc-studio-fuzz, /harness/replay).
// The page replays a real completed campaign — run 18, Claude Sonnet 5 — through the client's
// own protocol, so the trace and finding are genuine while the take needs no live model.
export const META = {
  title: 'An agent that fuzzes a whole protocol',
  subtitle: 'Aomi seeds a deployed protocol into a simulation world, and its security agent fuzzes it until a finding reproduces.',
  eyebrow: 'Shipped · Aomi security agent',
  link: 'arc-studio-fuzz.vercel.app',
  viewport: { width: 1600, height: 900 },
  // No spinners: the screencast then captures only real changes in the trace.
  reducedMotion: 'reduce',
};

export const DISPLAY = [
  ['U S D C', 'USDC'],
  ['W gold', 'WGLD'],
];

const URL = 'http://localhost:3110/harness/replay';
const tab = (name) => `[role=tab]:has-text("${name}")`;
const toolRow = (name) => `details[data-tool-name="${name}"] >> nth=0 >> summary`;

export const STEPS = [
  { id: 1, title: 'A lending protocol',
    say: "Here's a small lending protocol: a pool, a collateral token, an A M M, and a price oracle. Lenders supply U S D C, and borrowers post W gold as collateral.",
    do: [['goto', URL], ['wait', 1], ['focus', '[data-testid=protocol-contracts]']] },
  { id: 2, title: 'The oracle',
    say: "The pool values that collateral through the oracle, and the oracle just reads the A M M's spot price. A bug like that only shows up across contracts.",
    do: [['click', '[data-testid=protocol-contracts] >> text=PriceOracle'], ['wait', 1.2], ['focus', 'text=spotPrice']] },
  { id: 3, title: 'Seed and run',
    say: "We start a campaign. The harness has already seeded the whole deployed protocol into the agent's simulation world, with code, storage, and balances at their real addresses.",
    do: [['click', '[data-testid=run-aomi-fuzz]'], ['waitFor', '[data-testid=seeded-world]', 30], ['focus', '[data-testid=seeded-world]']] },
  { id: 4, title: 'The agent plans',
    say: "The agent reads the source, writes a threat model, and starts a campaign: actors, actions in attack order, and the properties that must hold.",
    do: [['waitFor', 'details[data-tool-name="arc_fuzz_start"]', 60], ['click', toolRow('arc_fuzz_start')], ['wait', 2.5]] },
  { id: 5, title: 'Fuzz rounds',
    say: "Each round, the app hands the agent a batch of call sequences. It replays them in the simulation, and every property is checked against the results.",
    do: [['waitFor', 'details[data-tool-name="arc_fuzz_round"]', 60], ['click', toolRow('arc_fuzz_round')], ['wait', 2.5]] },
  { id: 6, title: 'Every event',
    say: "Under the tool calls, every runtime event is kept: statuses, balance changes, probe outputs. Any result can be audited.",
    do: [['click', tab('All events')], ['wait', .6], ['click', '[data-testid=ledger] summary:has-text("sim_replay_traces") >> nth=0'], ['wait', 2]] },
  { id: 7, title: 'The conversation',
    say: "The chat shows what the agent was told: the world is already seeded, so it never deploys or edits code itself.",
    do: [['click', tab('Chat')], ['wait', 3]] },
  { id: 8, title: 'The finding', voAt: 'end', hold: 2,
    say: "Then it lands. The agent buys W gold to pump the spot price, deposits it, and borrows far more than the collateral is worth. The app cuts the trace to three calls and reproduces it twice.",
    do: [['click', tab('Tools')], ['waitFor', '[data-testid=verified-finding]', 60], ['focus', '[data-testid=verified-finding]']] },
];
