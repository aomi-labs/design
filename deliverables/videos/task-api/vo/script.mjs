// Voice-over script for film.html, in Cecilia's voice.
// Times are on the film's original (silent) clock. `start` is where the line begins, `anchors` pin a spoken
// word to the moment its animation happens, `end` is where the line should finish.
// skills/slide-to-video/scripts/build-timeline.mjs stretches the film between these points so picture follows the voice.
// Line 9 ("watch it live") narrates the live take: footage where the capture is clear, the session log where it went black.
export const OLD_END = 108;   // last frame of the silent cut (DUR in film.html)
export const END_HOLD = 1.5;  // extra hold on the logo after the last line
export const DISPLAY = [      // spoken → subtitle form (longest first)
  ['point zero zero nine', '0.009'], ['point one', '0.1'], ['point two', '0.2'],
  ['twenty-two thousand', '22,000'], ['twenty-five thousand', '25,000'], ['six hundred and sixty', '660'],
  ['fifteen basis points', '15 bps'], ['nineteen basis points', '19 bps'], ['three percent', '3%'],
  ['aomi dot dev', 'aomi.dev'], ['x four oh two', 'x402'],
];

export const LINES = [
  { id: 0, start: 1.0, end: 3.6,
    text: "Here's Aomi's Task API.",
    anchors: [['Task', 1, 1.6]] },
  { id: 1, start: 5.8, end: 13.2,
    text: 'x four oh two lets agents pay for data: call an API, pay in USDC, get the data. The chain sits in between as a neutral rail, so neither side has to trust the other.',
    anchors: [['call', 1, 7.0], ['pay', 2, 8.6], ['get', 1, 10.2], ['rail', 1, 11.8], ['trust', 1, 12.6]] },
  { id: 2, start: 13.7, end: 18.6,
    text: "That works for data, because data arrives the moment you pay, and you can see what you got. But what if an agent wants to buy a service? The payment can be enforced. Whether the work was delivered, and how well, can't.",
    anchors: [['service', 1, 14.0], ['enforced', 1, 15.4], ['delivered', 1, 17.0], ['well', 1, 17.6]] },
  { id: 3, start: 22.2, end: 26.4,
    text: "People haven't solved this either. After one visit, you can't really tell whether a contractor did a good job.",
    anchors: [['visit', 1, 22.8], ['contractor', 1, 24.2], ['job', 1, 25.0]] },
  { id: 4, start: 29.2, end: 36.4,
    text: "With people, quality is only known after you've paid, so the loop breaks. Machines can do better: a machine's service is usually the result of processing data, so it can be checked before it's delivered. The seller runs the work, shows the buyer proof of the outcome, gets paid, and only then delivers.",
    anchors: [['people', 1, 29.6], ['breaks', 1, 31.8], ['Machines', 1, 32.6], ['runs', 1, 33.0], ['proof', 1, 33.6], ['paid', 2, 34.2], ['delivers', 1, 34.8]] },
  { id: 5, start: 37.6, end: 46.2,
    text: "That's what the Aomi Task API does for onchain execution. Here, a treasury agent on Arc sends one long instruction: rebalance into EURC, JPYC and MXNB, fill within fifteen basis points of mid, keep twenty-five thousand USDC for payroll, and revert everything if any leg fails.",
    anchors: [['API', 1, 37.8], ['treasury', 1, 38.8], ['instruction', 1, 42.6], ['rebalance', 1, 43.2], ['fifteen', 1, 44.0], ['payroll', 1, 44.8], ['revert', 1, 45.6]] },
  { id: 6, start: 48.6, end: 57.6,
    text: "Aomi's harness turns that into transactions across StableFX and Arc pools, so the agent never writes calldata. Then it runs the whole batch on an internal fork of Arc, and checks every constraint against the result.",
    anchors: [['harness', 1, 49.0], ['transactions', 1, 51.0], ['pools', 1, 51.6], ['calldata', 1, 52.8], ['fork', 1, 53.8], ['constraint', 1, 55.2], ['result', 1, 57.2]] },
  { id: 7, start: 59.0, end: 65.6,
    text: "What comes back is an outcome fingerprint, signed by Aomi: twenty-two thousand USDC out, EURC and JPYC in, every constraint passed, and the MXNB leg skipped, because the best fill was nineteen basis points from mid. Getting this far costs one cent. The buyer sees the outcome before anything touches its wallet.",
    anchors: [['fingerprint', 1, 59.4], ['signed', 1, 59.8], ['twenty-two', 1, 60.6], ['EURC', 1, 61.2], ['constraint', 1, 61.8], ['skipped', 1, 63.0], ['cent', 1, 64.0], ['wallet', 1, 64.8]] },
  { id: 8, start: 67.6, end: 72.2,
    text: "Now the buyer decides. If it wants the batch, it pays three percent of the USDC leaving its wallet, here six hundred and sixty USDC, over x four oh two, and gets the full bundle.",
    anchors: [['decides', 1, 68.6], ['percent', 1, 69.2], ['sixty', 1, 70.4], ['bundle', 1, 71.6]] },
  { id: 13, start: 75.2, end: 80.6,
    text: "Then it signs and broadcasts the bundle itself. Aomi never holds its keys or its funds. What Aomi sells is the work: a harness that runs complex money-lego intents faster, more reliably, and with fewer tokens.",
    anchors: [['signs', 1, 75.8], ['keys', 1, 76.8], ['work', 1, 78.4], ['faster', 1, 79.4]] },
  { id: 9, start: 81.6, end: 88.8,
    text: "Here's a real run on Arc Mainnet. The agent asks to send point one and point two USDC to two ops wallets, and pays one cent over x four oh two to prepare. It polls for free until the simulation passes every check. Retrieval costs three percent of the thirty cents moved, so point zero zero nine USDC. Then its own wallet signs, both transfers confirm onchain, and the recipient balances are verified.",
    anchors: [['real', 1, 81.8], ['wallets', 1, 82.1], ['cent', 1, 82.5], ['free', 1, 83.3], ['passes', 1, 84.3], ['three', 1, 85.0], ['signs', 1, 85.9], ['confirm', 1, 87.4], ['verified', 1, 88.6]] },
  { id: 10, start: 89.6, end: 92.4,
    text: 'So a transparent settlement layer, plus machine work that can be checked before delivery, makes outcome-based pricing for services possible.',
    anchors: [['transparent', 1, 90.0], ['checked', 1, 90.8], ['outcome-based', 1, 91.6]] },
  { id: 11, start: 94.8, end: 100.4,
    text: "One trust assumption remains: today, the buyer trusts that Aomi's simulation ran honestly. Next, we plan to run the harness in a trusted execution environment, so buying a service becomes trustless.",
    anchors: [['assumption', 1, 95.4], ['honestly', 1, 96.6], ['environment', 1, 98.8], ['trustless', 1, 99.8]] },
  { id: 12, start: 102.6, end: 106.0,
    text: 'The Task API is live, settling in USDC on Arc. Try it at aomi dot dev.',
    anchors: [['live', 1, 103.4], ['aomi', 1, 105.6]] },
];
