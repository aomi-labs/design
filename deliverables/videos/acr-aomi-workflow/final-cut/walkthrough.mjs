export const STEPS = [
  {
    "id": 1,
    "title": "What is ACR?",
    "say": "A C R tracks compute prices and helps businesses review their bills. Let\u2019s check one."
  },
  {
    "id": 2,
    "title": "Review the bill",
    "say": "The agent calls A C R\u2019s bill checker and rate tool. You can watch the calls and inspect their results. This example bill is flagged for review, with the recommendation grounded in the returned evidence."
  },
  {
    "id": 3,
    "title": "Read the evidence",
    "say": "The trace shows the exact amount, quantity, and public price references. Aomi explains that the pricing data is nearly thirteen days old. It also separates A C R\u2019s index from market prices. A cheaper reference does not automatically authorize payment."
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
    "say": "A C R brings the protocol. Aomi connects its APIs and contracts for the user."
  }
];
