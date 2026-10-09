// Voice-over script for film.html, in Cecilia's voice.
// Times are on the film's original (silent) clock. `start` is where the line begins, `anchors` pin a spoken
// word to the moment its animation happens, `end` is where the line should finish.
// skills/slide-to-video/scripts/build-timeline.mjs stretches the film between these points so picture follows the voice.
export const OLD_END = 135;   // last frame of the silent cut (DUR in film.html)
export const END_HOLD = 1.5;  // extra hold on the logo after the last line
export const DISPLAY = [      // spoken → subtitle form (longest first)
  ['wrapped staked ETH', 'wstETH'], ['staked ETH', 'stETH'], ['m SOL', 'mSOL'], ['dot env', '.env'],
  ['Lite S V M', 'LiteSVM'], ['twenty-seven', '27'],
];

export const LINES = [
  { id: 1, start: 0.5, end: 9.6,
    text: "Here's a pretty normal DeFi request: stake ETH with Lido and borrow USDC against it on Aave. And the same on Solana, with Marinade and Kamino.",
    anchors: [['Lido', 1, 1.6], ['Aave', 1, 3.6], ['Solana', 1, 5.6], ['Kamino', 1, 8.4]] },
  { id: 2, start: 11.8, end: 32.9,
    text: "On the left is Claude Code with no harness. It has to go find the contract addresses, fetch the ABIs, ask you for an RPC endpoint, and write its own script. Then it hits a revert, error twenty-seven, because Aave actually takes wrapped staked ETH, not staked ETH. And then it asks for your private key in a dot env file. On the right it's the same model, through Aomi. It reads the wrap rate, simulates the stake, checks the loan-to-value, and all six steps pass on a fork as one bundle.",
    anchors: [['left', 1, 12.4], ['addresses', 1, 15.2], ['ABIs', 1, 17.4], ['RPC', 1, 18.8], ['script', 1, 20.8], ['twenty-seven', 1, 23.6], ['private', 1, 27.7], ['right', 1, 30.6], ['bundle', 1, 32.6]] },
  { id: 3, start: 33.6, end: 50.8,
    text: "On Solana it's the same story with different failures: a rate-limited RPC, a missing token account, Kamino's refresh rule, and the transaction size limit. Aomi simulates it all in Lite S V M and sends one transaction.",
    anchors: [['rate-limited', 1, 36.3], ['token', 1, 40.0], ['refresh', 1, 42.5], ['size', 1, 46.3], ['Lite', 1, 49.6]] },
  { id: 4, start: 51.2, end: 55.0,
    text: "The point of having a harness is performance, token efficiency, and security. A lot of people argue frontier models can transact without any harness, and they kind of can. But a harness makes them work better, so if you want to productionize an agentic financial workflow, it's a no-brainer.",
    anchors: [['performance', 1, 51.9], ['efficiency', 1, 52.7], ['security', 1, 53.5], ['no-brainer', 1, 54.7]] },
  { id: 5, start: 55.2, end: 61.6,
    text: 'The harness is the loop around the model: it gets the context, builds the call, simulates it, then commits, and if anything fails, it goes back and reads again.',
    anchors: [['loop', 1, 55.9], ['context', 1, 56.3], ['builds', 1, 56.6], ['simulates', 1, 56.9], ['commits', 1, 57.4], ['reads', 1, 58.3]] },
  { id: 6, start: 62.2, end: 69.8,
    text: "First, context instantiation. Reading chain state and wallet state is deterministic, so it doesn't need intelligence. It can basically be shrunk to a software function, so what took Claude a dozen calls is one call for the model.",
    anchors: [['context', 1, 62.4], ['function', 1, 64.9], ['dozen', 1, 67.0]] },
  { id: 7, start: 70.2, end: 75.4,
    text: "Then transaction construction. The model just says what to call. The harness builds the bytes, and its protocol skills already know the rules, like Aave wanting wrapped staked ETH, or Kamino needing a reserve refresh. Those are the things Claude had to learn by failing.",
    anchors: [['call', 1, 70.6], ['bytes', 1, 71.6], ['wrapped', 1, 72.0], ['refresh', 1, 73.6], ['failing', 1, 74.9]] },
  { id: 8, start: 79.0, end: 83.6,
    text: "Those same failures still happen here, but they happen on a fork, before anything is sent.",
    anchors: [['failures', 1, 79.9], ['fork', 1, 81.7]] },
  { id: 9, start: 85.4, end: 96.0,
    text: "Every call runs against a fork of live state first. When it reverts, the error comes back to the model as back pressure, and only a green run gets committed. It's the same idea as CI for coding agents: tests push back when something breaks, so the model writes good code.",
    anchors: [['fork', 1, 86.1], ['reverts', 1, 87.6], ['pressure', 1, 88.2], ['committed', 1, 89.5], ['CI', 1, 90.3]] },
  { id: 10, start: 100.8, end: 105.6,
    text: 'Once everything passes, Aomi compresses the sequence into one transaction: a smart wallet bundle on Ethereum, one versioned transaction on Solana. That saves gas and settlement time, and the model does less.',
    anchors: [['compresses', 1, 103.5], ['bundle', 1, 104.0], ['versioned', 1, 104.3], ['gas', 1, 104.8]] },
  { id: 11, start: 106.7, end: 113.0,
    text: "And the key never goes to the model. Commit hands your wallet a signable transaction, and you sign it, or a scoped session or an agent wallet signs within the limits you set. On Solana, a Swig role enforces those limits onchain.",
    anchors: [['key', 1, 107.0], ['sign', 1, 107.8], ['session', 1, 108.1], ['wallet', 2, 108.4], ['Swig', 1, 109.3]] },
  { id: 12, start: 115.4, end: 118.8,
    text: 'Then the chain settles it like any other transaction, and Aomi checks the result against the simulation you approved.',
    anchors: [['settles', 1, 116.7], ['checks', 1, 117.4]] },
  { id: 14, start: 121.8, end: 125.6,
    text: "Performance, token efficiency, and security. That's what the harness adds.",
    anchors: [['efficiency', 1, 122.4], ['security', 1, 123.0]] },
  { id: 15, start: 126.4, end: 128.6,
    text: 'The model interprets the intent, your wallet holds the key, and Aomi facilitates everything in between.',
    anchors: [['model', 1, 126.6], ['key', 1, 127.2], ['between', 1, 127.9]] },
];
