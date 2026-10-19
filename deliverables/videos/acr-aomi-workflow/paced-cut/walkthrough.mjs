export const STEPS = [
  {
    "id": 1,
    "title": "What is ACR?",
    "say": "A C R stands for Arc Compute Rate. It publishes reference indices for A I inference, G P U compute, and data delivery, with updates recorded on-chain."
  },
  {
    "id": 2,
    "title": "Review the bill",
    "say": "It also helps businesses investigate compute bills, comparing charges with published market prices. Those price comparisons are separate from A C R\u2019s reference indices."
  },
  {
    "id": 3,
    "title": "Read the evidence",
    "say": "Aomi brings those tools into the conversation. Let\u2019s check this bill and inspect the evidence. The agent flags it for review and explains that the pricing data is nearly thirteen days old. That context matters before considering a payment."
  },
  {
    "id": 4,
    "title": "APIs and contracts",
    "say": "The treasury implementation connects that review to on-chain payments. Aomi provides cloud-hosted contract access alongside the app\u2019s A P I tools. A configured deployment checks ownership, funds, budget, and replay protection before preparing a payment."
  },
  {
    "id": 5,
    "title": "Transaction pipeline",
    "say": "Here is the actual workflow on GitHub: stage the transaction, simulate it, and ask the owner to authorize it. After confirmation, verify the receipt and payment event before updating the bill. This is implemented code; deployed payment acceptance is still pending."
  },
  {
    "id": 6,
    "title": "Why this infrastructure matters",
    "say": "A general-purpose agent framework can call tools. Aomi also supplies contract access and the transaction pipeline, so the protocol team can focus on its business rules instead of assembling the blockchain execution infrastructure."
  },
  {
    "id": 7,
    "title": "The app implementation",
    "say": "A C R registers its tools and treasury skill here. The frontend imports Aomi\u2019s widget and points it at the app. That connects the protocol\u2019s workflow to the conversation inside its existing interface."
  },
  {
    "id": 8,
    "title": "ACR \u00d7 Aomi",
    "say": "A C R, powered by Aomi."
  }
];
