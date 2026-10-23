// Voice-over script for film.html, in Cecilia's voice. Line ids follow the scene table (row 1 is clips 0 and 1).
// Times are on the film's playback clock (after EDIT in film.html reorders the authored scenes). `start` is where
// the line begins, `anchors` pin a spoken word to the moment its animation happens, `end` is where the line should finish.
// skills/slide-to-video/scripts/build-timeline.mjs stretches the film between these points so picture follows the voice.
export const OLD_END = 110;   // last frame of the silent cut (DUR in film.html)
export const END_HOLD = 1.5;  // extra hold on the logo after the last line
export const DISPLAY = [      // spoken → subtitle form (longest first)
  ['point zero zero nine', '0.009'], ['point one', '0.1'], ['point two', '0.2'],
  ['twenty-two thousand', '22,000'], ['twenty-five thousand', '25,000'], ['six hundred and sixty', '660'],
  ['fifteen basis points', '15 bps'], ['nineteen basis points', '19 bps'], ['three percent', '3%'],
  ['aomi dot dev', 'aomi.dev'], ['x four oh two', 'x402'],
];

export const LINES = [
  // 1 · announce, and the intent
  { id: 0, start: 1.0, end: 2.6,
    text: 'Announcing Aomi Task API.',
    anchors: [['Task', 1, 1.8]] },
  { id: 1, start: 5.8, end: 14.2,
    text: "Here's a treasury agent on Arc sending one long instruction: rebalance into EURC, JPYC and MXNB, fill within fifteen basis points of mid, keep twenty-five thousand USDC for payroll, and revert everything if any leg fails.",
    anchors: [['treasury', 1, 6.6], ['instruction', 1, 10.6], ['rebalance', 1, 11.2], ['fifteen', 1, 12.0], ['payroll', 1, 12.8], ['revert', 1, 13.6]] },
  // 2 · harness + fork
  { id: 2, start: 16.6, end: 25.6,
    text: "Aomi's harness turns that into transactions across StableFX and Arc pools, so the agent never writes calldata. Then it runs the whole batch on an internal fork of Arc, and checks every constraint against the result.",
    anchors: [['harness', 1, 17.0], ['transactions', 1, 19.0], ['pools', 1, 19.6], ['calldata', 1, 20.8], ['fork', 1, 21.8], ['constraint', 1, 23.2], ['result', 1, 25.2]] },
  // 3 · outcome fingerprint
  { id: 3, start: 27.0, end: 33.6,
    text: "What comes back is an outcome fingerprint, signed by Aomi: twenty-two thousand USDC out, EURC and JPYC in, every constraint passed, and the MXNB leg skipped, because the best fill was nineteen basis points from mid. Getting this far costs one cent. The buyer sees the outcome before anything touches its wallet.",
    anchors: [['fingerprint', 1, 27.4], ['signed', 1, 27.8], ['twenty-two', 1, 28.6], ['EURC', 1, 29.2], ['constraint', 1, 29.8], ['skipped', 1, 31.0], ['cent', 1, 32.0], ['wallet', 1, 32.8]] },
  // 4 · decide + pay
  { id: 4, start: 35.6, end: 40.2,
    text: "Now the buyer decides. If it wants the batch, it pays three percent of the USDC leaving its wallet, here six hundred and sixty USDC, over x four oh two, and gets the full bundle.",
    anchors: [['decides', 1, 36.6], ['percent', 1, 37.2], ['sixty', 1, 38.4], ['bundle', 1, 39.6]] },
  // 5 · the buyer executes
  { id: 5, start: 43.2, end: 48.6,
    text: "Then it signs and broadcasts the bundle itself. Aomi never holds its keys or its funds. What Aomi sells is the work: a harness that runs complex money-lego intents faster, more reliably, and with fewer tokens.",
    anchors: [['signs', 1, 43.8], ['keys', 1, 44.8], ['work', 1, 46.4], ['faster', 1, 47.4]] },
  // 6 · watch it live: footage where the capture is clear, the session log where it went black
  { id: 6, start: 49.6, end: 56.8,
    text: "Watch a real run on Arc Mainnet. The agent asks to send point one and point two USDC to two ops wallets, and pays one cent over x four oh two to prepare. It polls for free until the simulation passes every check. Retrieval costs three percent of the thirty cents moved, so point zero zero nine USDC. Then its own wallet signs, both transfers confirm onchain, and the recipient balances are verified.",
    anchors: [['real', 1, 49.8], ['wallets', 1, 50.1], ['cent', 1, 50.5], ['free', 1, 51.3], ['passes', 1, 52.3], ['three', 1, 53.0], ['signs', 1, 53.9], ['confirm', 1, 55.4], ['verified', 1, 56.6]] },
  // 7 · why it matters: x402 over data
  { id: 7, start: 57.8, end: 65.0,
    text: 'Why does this matter? x four oh two already lets agents pay for data. The chain sits in between as a neutral rail, so neither side has to trust the other.',
    anchors: [['matter', 1, 58.4], ['pay', 1, 60.6], ['rail', 1, 63.8], ['trust', 1, 64.6]] },
  // 8 · the gap: services
  { id: 8, start: 65.7, end: 70.0,
    text: 'But what if an agent wants to buy a service? The outcome of the work cannot be pre-verified before delivery.',
    anchors: [['service', 1, 66.0], ['outcome', 1, 66.6], ['delivery', 1, 68.4]] },
  // 9 · even humans
  { id: 9, start: 73.6, end: 78.4,
    text: "People haven't solved this either. You cannot tell whether a contractor does good jobs before seeing them work.",
    anchors: [['contractor', 1, 75.8], ['jobs', 1, 76.9], ['work', 1, 77.6]] },
  // 10 · two loops
  { id: 10, start: 81.2, end: 88.6,
    text: "This loop never completes in the human economy. Machines can do better, because their service is usually the result of processing data, which can be checked before it's delivered. That's the loop the Task API runs.",
    anchors: [['loop', 1, 81.6], ['human', 1, 83.8], ['Machines', 1, 84.6], ['checked', 1, 85.6], ['delivered', 1, 86.8], ['loop', 2, 87.4], ['runs', 1, 88.0]] },
  // 11 · thesis
  { id: 11, start: 89.6, end: 92.4,
    text: 'A transparent settlement layer, plus machine work that can be checked before delivery, makes outcome-based pricing for services possible.',
    anchors: [['transparent', 1, 90.0], ['checked', 1, 90.8], ['outcome-based', 1, 91.6]] },
  // 12 · trust + roadmap
  { id: 12, start: 94.8, end: 100.4,
    text: "One trust assumption remains: today, the buyer trusts that Aomi's simulation ran honestly. Next, we plan to run the harness in a trusted execution environment, so buying a service becomes trustless.",
    anchors: [['assumption', 1, 95.4], ['honestly', 1, 96.6], ['environment', 1, 98.8], ['trustless', 1, 99.8]] },
  // 13 · outro
  { id: 13, start: 102.6, end: 106.0,
    text: 'The Task API is live, settling in USDC on Arc. Try it at aomi dot dev.',
    anchors: [['live', 1, 103.4], ['aomi', 1, 105.6]] },
];
