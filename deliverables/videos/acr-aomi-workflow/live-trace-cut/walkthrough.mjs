export const STEPS = [
  {
    "id": 1,
    "title": "What is ACR?",
    "say": "A C R stands for Arc Compute Rate. It publishes reference indices for A I inference, G P U compute, and data delivery, with updates recorded on-chain."
  },
  {
    "id": 2,
    "title": "Review the bill",
    "say": "Deployed on Arc, A C R's PolicyWallet contract holds a business's U S D C, enforces spending limits, and links each payment to a verifiable record of the decision behind it."
  },
  {
    "id": 3,
    "title": "Read the evidence",
    "say": "Aomi combines A C R's internal A P Is with the ability to read its on-chain contracts and prepare transactions for a connected wallet to authorize."
  },
  {
    "id": 4,
    "title": "APIs and contracts",
    "say": "Here, the agent reads the treasury contract on Arc testnet. It checks the owner and pause status, then reads the remaining budget and token balance. The demo bill fits both limits. The A P I supplies the bill; the contract supplies the spending constraints."
  },
  {
    "id": 5,
    "title": "Transaction pipeline",
    "say": "The next steps are to prepare the payment, simulate it, and ask the connected owner to authorize it. Then verify the receipt before marking the bill paid. This demo shows real contract reads with synthetic bills and mock U S D C; no payment has been submitted."
  },
  {
    "id": 6,
    "title": "Why this infrastructure matters",
    "say": "The workflow's building blocks, tools, A P I clients, and prompt text, are packaged in a Rust program. Developers can write arbitrary logic and expose it through tools, with skills guiding how the agent uses them."
  },
  {
    "id": 7,
    "title": "The app implementation",
    "say": "A general-purpose agent framework can call A P Is. Aomi also provides cloud-hosted, protocol-agnostic contract access and transaction simulation and execution. The team defines its workflow without having to build that infrastructure itself."
  },
  {
    "id": 8,
    "title": "Frontend integration",
    "say": "The frontend imports Aomi\u2019s widget and points it at the app. The same workflow is now available through chat inside A C R\u2019s existing interface."
  },
  {
    "id": 9,
    "title": "ACR \u00d7 Aomi",
    "say": "A C R, powered by Aomi."
  }
];
