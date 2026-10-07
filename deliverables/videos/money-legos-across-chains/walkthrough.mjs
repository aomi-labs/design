export const META = {
  title: 'Money legos across chains',
  subtitle: 'Base to Arbitrum plus Solana, orchestrated from one request.',
  eyebrow: 'Aomi staging · Multi-chain orchestration',
  link: 'chat-staging.aomi.dev',
  viewport: { width: 1920, height: 1080 },
  intro: 3.4,
  outro: 4.6,
};

export const DISPLAY = [
  ['zero-point-zero-five', '0.05'],
  ['three-point-nine-nine-two-one-five', '3.99215'],
  ['U-S-D-C', 'USDC'],
  ['M-S-O-L', 'mSOL'],
];

export const STEPS = [
  {
    id: 1,
    title: 'Every network, no switching',
    say: 'Aomi works across EVM and Solana without making the user switch networks between steps.',
    do: [],
    maxZoom: 1.35,
  },
  {
    id: 2,
    title: 'One multi-chain request',
    say: 'This single request combines a Base lending position, a bridge to Arbitrum, and a Solana liquid-staking route.',
    do: [],
    maxZoom: 1.35,
  },
  {
    id: 3,
    title: 'Activate the protocol stack',
    say: 'Aomi activates five protocol skills, checks both wallets, and builds each leg on the chain where it belongs.',
    do: [],
    maxZoom: 1.35,
  },
  {
    id: 4,
    title: 'Simulate Base and Arbitrum',
    say: 'On Base, an ordered four-transaction simulation supplies four U-S-D-C to Aave and routes another four through Across to Arbitrum.',
    do: [],
    maxZoom: 1.35,
  },
  {
    id: 5,
    title: 'Keep the bridge claim precise',
    say: 'The bridge quote returns three-point-nine-nine-two-one-five U-S-D-C on Arbitrum. Delivery is not claimed; the quote and source-chain calls are what were simulated.',
    do: [],
    maxZoom: 1.35,
  },
  {
    id: 6,
    title: 'Simulate the Solana leg',
    say: 'On Solana, account creation and a zero-point-zero-five SOL Marinade stake pass together in one atomic simulation.',
    do: [],
    maxZoom: 1.35,
  },
  {
    id: 7,
    title: 'Stop at the evidence boundary',
    say: 'The Kamino leg is withheld because the simulator cannot validate spending newly minted M-S-O-L in that same batch. Every transaction remains unsigned.',
    do: [],
    maxZoom: 1.35,
  },
  {
    id: 8,
    title: 'Simulation before authority',
    say: 'One orchestration layer, multiple chains, and simulation as the gate before wallet authority.',
    do: [],
    zoom: false,
  },
];
