export const META = {"title":"ACR × Aomi","subtitle":"From compute evidence to on-chain action","eyebrow":"Protocol walkthrough","link":"arc-compute-rate.vercel.app","viewport":{"width":1600,"height":900},"scale":1.5,"colorScheme":"dark","intro":2.8,"outro":4};
export const DISPLAY = [["A C R","ACR"],["G P U","GPU"],["A P I","API"],["Policy Wallet","PolicyWallet"],["spend as owner","spendAsOwner"]];
export const STEPS = [
  {
    "id": 1,
    "title": "What is ACR?",
    "say": "A C R is the Arc Compute Rate: a reference rate for machine commerce. It brings compute benchmarks, billing evidence, and on-chain infrastructure into one place.",
    "do": [
      [
        "goto",
        "https://arc-compute-rate.vercel.app/"
      ],
      [
        "wait",
        3
      ]
    ],
    "zoom": false,
    "hold": 1
  },
  {
    "id": 2,
    "title": "Evidence before action",
    "say": "Here are its inference, G P U, and data indices. Aomi helps users investigate compute bills using A C R’s evidence and public price comparisons. Evidence age matters, and a benchmark never authorizes payment.",
    "do": [
      [
        "click",
        "text=TODAY’S FIXING ↓"
      ],
      [
        "wait",
        2
      ]
    ],
    "zoom": false,
    "hold": 1
  },
  {
    "id": 3,
    "title": "A protocol with infrastructure",
    "say": "This is more than an A P I integration. A C R has an on-chain oracle, attestations, and settlement infrastructure. Aomi connects protocol-specific knowledge and off-chain records to a harness that can prepare reviewed contract actions.",
    "do": [
      [
        "click",
        "summary:has-text(\"On-chain register\")"
      ],
      [
        "scroll",
        500
      ],
      [
        "wait",
        2
      ]
    ],
    "zoom": false,
    "hold": 1
  },
  {
    "id": 4,
    "title": "From a bill to a contract call",
    "say": "For treasury payments, the recorded bill determines the recipient, amount, category, and decision hash. Aomi stages spend as owner, simulates it, and requests owner authorization. The guard restricts chain, contract, and function; Policy Wallet enforces ownership, budget, and replay protection.",
    "do": [
      [
        "goto",
        "file:///Users/cecilia/Code/aomi-design-worktrees/eleven-announcer/deliverables/videos/acr-aomi-workflow/homepage-cut/scene-6.html"
      ],
      [
        "wait",
        2
      ]
    ],
    "zoom": false,
    "hold": 1
  },
  {
    "id": 5,
    "title": "Bring settlement back",
    "say": "After payment, A C R verifies the successful receipt and matching event before reconciling the original bill. That closes the loop: off-chain evidence, authorized on-chain action, and a business record that knows what settled.",
    "do": [
      [
        "goto",
        "file:///Users/cecilia/Code/aomi-design-worktrees/eleven-announcer/deliverables/videos/acr-aomi-workflow/homepage-cut/scene-7.html"
      ],
      [
        "wait",
        2
      ]
    ],
    "zoom": false,
    "hold": 1
  },
  {
    "id": 6,
    "title": "A frontend component",
    "say": "Back in the product, Ask A C R Agent is the entry point. The merged frontend imports Aomi’s widget and pins it to the hosted A C R app. The protocol keeps its own interface; the component supplies the conversation.",
    "do": [
      [
        "goto",
        "https://arc-compute-rate.vercel.app/"
      ],
      [
        "hover",
        "role=button[name=\"Ask ACR Agent\"]"
      ],
      [
        "wait",
        2
      ]
    ],
    "zoom": false,
    "hold": 1
  },
  {
    "id": 7,
    "title": "Build from the workflow",
    "say": "That is the foundation for one-shotting a protocol app. Describe the workflow, connect the infrastructure, and define the contract actions and guards. Aomi supplies the agent runtime and frontend component around those protocol-specific pieces.",
    "do": [
      [
        "click",
        "text=TODAY’S FIXING ↓"
      ],
      [
        "wait",
        3
      ]
    ],
    "zoom": false,
    "hold": 1
  },
  {
    "id": 8,
    "title": "One connected workflow",
    "say": "The frontend integration is shipped. The treasury workflow is implemented, with production payment acceptance still pending. The value is one agent that connects understanding the protocol with acting on it.",
    "do": [
      [
        "goto",
        "https://arc-compute-rate.vercel.app/"
      ],
      [
        "wait",
        3
      ]
    ],
    "zoom": false,
    "hold": 1
  }
];
