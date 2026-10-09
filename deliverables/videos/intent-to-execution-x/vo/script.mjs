// Voice-over for the X cut (≤ 2:20) of ../intent-to-execution/film.html, in Cecilia's voice.
// Times are written on the FULL film's clock and converted to this cut's clock through cut.js (the edit list),
// so they line up with the same animations as the long version.
import fs from 'node:fs';
const CUT = JSON.parse(fs.readFileSync(new URL('../cut.js', import.meta.url), 'utf8').match(/\[[\s\S]*\]/)[0]);
const x = t => { let acc = 0; for (const [a, b] of CUT) { if (t < a) return acc; if (t <= b) return +(acc + t - a).toFixed(3); acc += b - a; } return acc; };

export const OLD_END = x(135);  // last frame of the cut's silent clock
export const END_HOLD = 1.5;
export const DISPLAY = [['wrapped staked ETH', 'wstETH'], ['staked ETH', 'stETH'], ['dot env', '.env'], ['Lite S V M', 'LiteSVM']];

const line = (id, start, end, text, anchors) => ({ id, start: x(start), end: x(end), text, anchors: anchors.map(([w, n, t]) => [w, n, x(t)]) });
export const LINES = [
  line(1, .5, 9.6, "Here's a normal DeFi request: stake ETH with Lido and borrow USDC against it on Aave. Same thing on Solana, with Marinade and Kamino.",
    [['Lido', 1, 1.6], ['Aave', 1, 3.6], ['Solana', 1, 5.6], ['Kamino', 1, 8.4]]),
  line(2, 11.8, 32.8, "On the left, Claude Code with no harness. It hunts for contract addresses, asks you for an RPC, hits a revert because Aave takes wrapped staked ETH, not staked ETH, and then wants your private key in a dot env file. On the right, the same model through Aomi reads the state, simulates every step, and ships one bundle.",
    [['addresses', 1, 16.6], ['revert', 1, 23.6], ['private', 1, 27.7], ['right', 1, 30.2], ['bundle', 1, 32.5]]),
  line(3, 51.2, 55.0, "The point of a harness is performance, token efficiency, and security. Frontier models can kind of transact without one, but a harness makes them work better, so if you want to productionize agentic finance, it's a no-brainer.",
    [['performance', 1, 51.9], ['efficiency', 1, 52.7], ['security', 1, 53.5], ['no-brainer', 1, 54.7]]),
  line(4, 62.2, 68.3, "Reading chain and wallet state is deterministic, so Aomi shrinks it to a software function: one call instead of a dozen.",
    [['function', 1, 64.9], ['dozen', 1, 67.0]]),
  line(5, 85.4, 96.0, "Every call runs on a fork first. A revert comes back to the model as back pressure, like failing tests for a coding agent, and only a green run gets committed.",
    [['fork', 1, 86.1], ['revert', 1, 87.6], ['pressure', 1, 88.2], ['tests', 1, 90.3]]),
  line(6, 101.4, 106.0, "Once everything passes, Aomi compresses the sequence into one transaction: a smart wallet bundle on Ethereum, one versioned transaction on Solana. That saves gas and settlement time, and the model does less.",
    [['compresses', 1, 103.5], ['bundle', 1, 104.0], ['versioned', 1, 104.3], ['gas', 1, 104.8]]),
  line(7, 106.7, 113.0, "And the key never goes to the model. Commit hands your wallet a signable transaction, and you sign it, or a scoped session or an agent wallet signs within the limits you set. On Solana, a Swig role enforces those limits onchain.",
    [['key', 1, 107.0], ['sign', 1, 107.8], ['session', 1, 108.1], ['wallet', 2, 108.4], ['Swig', 1, 109.3]]),
  line(8, 121.8, 123.7, "Performance, token efficiency, and security.",
    [['efficiency', 1, 122.4], ['security', 1, 123.0]]),
  line(9, 126.4, 128.6, "The model interprets the intent, your wallet holds the key, and Aomi facilitates everything in between.",
    [['model', 1, 126.6], ['key', 1, 127.2], ['between', 1, 127.9]]),
];
