// Voice-over script for film.html.
// Times are on the film's original (pre-voice-over) clock. `start` is where the line begins,
// `anchors` pin a spoken word to the moment its animation happens, `end` is where the line should finish.
// skills/slide-to-video/scripts/build-timeline.mjs stretches the film between these points so picture follows the voice.
export const OLD_END = 82.4;   // last frame of the original cut
export const END_HOLD = 1.6;   // extra hold on the logo after the last line
export const DISPLAY = [['zero-point-five', '0.5'], ['aomi dot dev', 'aomi.dev']]; // spoken → subtitle form

export const LINES = [
  { id: 1, start: 0.6, end: 5.3,
    text: "Say you ask an AI agent to swap 500 USDC. That request is an intent. Before it can safely settle onchain, it has to pass three security gates in our system. Let's walk through them.",
    anchors: [['USDC', 1, 1.6], ['intent', 1, 3.9], ['gates', 1, 4.9]] },
  { id: 2, start: 6.5, end: 11.4,
    text: "First, the model doesn't touch the chain directly. It works inside an execution harness. The model makes one typed call, and the harness does the rest: it reads chain state, stages the transaction, simulates it, and commits it.",
    anchors: [['harness', 1, 7.3], ['typed', 1, 8.9], ['reads', 1, 9.4], ['stages', 1, 9.78], ['simulates', 1, 10.16], ['commits', 1, 10.54]] },
  { id: 3, start: 12.45, end: 17.4,
    text: "Why do we need gates at all? A financial agent works a lot like a coding agent: it takes an intent, builds something, and ships it. But code is reviewed and tested before it deploys, while a transaction is only signed. Along the way it can be attacked, or simply built wrong. And once it settles, it's final, even when it's valid onchain but wrong for the user.",
    anchors: [['financial', 1, 12.6], ['reviewed', 1, 12.95], ['signed', 1, 14.8], ['attacked', 1, 15.0], ['built', 1, 15.4], ['settles', 1, 15.9], ['user', 1, 16.6]] },
  { id: 4, start: 21.6, end: 27.3,
    text: "At the build step, we simulate the transaction against a fork of the live chain, again and again. When a simulation fails, the error goes back to the model, which fixes the transaction and tries again. Only a transaction that passes is committed. We call this gate zero-point-five, because it runs inside the harness, while the agent is still building.",
    anchors: [['fork', 1, 22.5], ['fails', 1, 23.2], ['fixes', 1, 24.0], ['tries', 1, 24.6], ['passes', 1, 24.95], ['committed', 1, 25.7], ['zero-point-five', 1, 26.3]] },
  { id: 5, start: 30.7, end: 36.2,
    text: "Once the agent has built the transaction, it still can't sign it, because it never holds the key. Instead, it sends a signing request to a separate wallet module running in a secure enclave. That module checks the request against the user's policy, such as spending limits, allowed contracts and recipients, and only then signs. This is gate one.",
    anchors: [['key', 1, 31.5], ['request', 1, 31.9], ['module', 1, 32.3], ['checks', 1, 32.8], ['spending', 1, 32.95], ['allowed', 1, 33.3], ['recipients', 1, 33.7], ['signs', 1, 34.1], ['gate', 1, 35.2]] },
  { id: 6, start: 38.7, end: 43.9,
    text: "Gate two runs onchain. A guard contract on the user's account checks every transaction against rules the user has set, like a sanctions blocklist or a spending cap. If a transaction breaks a rule, the contract reverts it, even if the signer approved it.",
    anchors: [['guard', 1, 38.95], ['rules', 1, 39.8], ['blocklist', 1, 40.1], ['breaks', 1, 41.0], ['reverts', 1, 41.35], ['approved', 1, 42.95]] },
  { id: 7, start: 44.9, end: 52.5,
    text: "Finally, the signed transaction waits in the mempool until a block builder picks it up. As the builder packs the block, it checks each transaction against the protocol's assertions. If one fails, the builder removes it before the block is sealed. This is the last gate.",
    anchors: [['mempool', 1, 45.3], ['picks', 1, 46.0], ['packs', 1, 46.8], ['checks', 1, 49.0], ['fails', 1, 49.5], ['removes', 1, 50.1], ['sealed', 1, 51.9]] },
  { id: 8, start: 53.3, end: 55.4,
    text: "Only then is the block added to the chain, and the transaction is settled.",
    anchors: [['added', 1, 54.0], ['settled', 1, 54.4]] },
  { id: 9, start: 57.0, end: 59.6,
    text: "Each gate sees something different, so no single gate can catch everything.",
    anchors: [] },
  { id: 10, start: 60.6, end: 66.1,
    text: "Put together, every risk is stopped at the checkpoint that can see it. Simulation catches wrong decimals and stale routes. The signing policy catches a swapped payload, and partly a forged instruction. The onchain guard blocks a policy breach, like a sanctioned recipient. And the builder drops a sandwich attack. Only a transaction that passes every gate settles.",
    anchors: [['Simulation', 1, 62.35], ['signing', 1, 63.05], ['onchain', 1, 63.75], ['builder', 1, 64.45], ['Only', 1, 65.2]] },
  { id: 11, start: 67.5, end: 69.9,
    text: "This idea goes beyond our own implementation. It applies to any financial workflow.",
    anchors: [] },
  { id: 12, start: 70.55, end: 76.3,
    text: "The human's identity is canonical and persistent; it's the account that holds the real money. From it, the user authorizes sessions, which let agents act only on approved resources. Each session's authority is scoped, capped, and expires. The same checks work onchain, at a bank, or on an exchange. You can think of it as OAuth for money.",
    anchors: [['authorizes', 1, 71.1], ['scoped', 1, 71.95], ['checks', 1, 72.6], ['onchain', 1, 73.5], ['bank', 1, 73.9], ['exchange', 1, 74.3], ['OAuth', 1, 75.15]] },
  { id: 13, start: 79.4, end: 81.8,
    text: "That's how Aomi takes an agent's transaction from intent to settlement. You can read the full research at aomi dot dev.",
    anchors: [['Aomi', 1, 80.2], ['research', 1, 81.0]] },
];
