# ACR × Aomi

## What is ACR?

ACR is the Arc Compute Rate: a reference rate for machine commerce. It brings compute benchmarks, billing evidence, and on-chain infrastructure into one place.

## Evidence before action

Here are its inference, GPU, and data indices. Aomi helps users investigate compute bills using ACR’s evidence and public price comparisons. Evidence age matters, and a benchmark never authorizes payment.

## A protocol with infrastructure

This is more than an API integration. ACR has an on-chain oracle, attestations, and settlement infrastructure. Aomi connects protocol-specific knowledge and off-chain records to a harness that can prepare reviewed contract actions.

## From a bill to a contract call

For treasury payments, the recorded bill determines the recipient, amount, category, and decision hash. Aomi stages spendAsOwner, simulates it, and requests owner authorization. The guard restricts chain, contract, and function; PolicyWallet enforces ownership, budget, and replay protection.

## Bring settlement back

After payment, ACR verifies the successful receipt and matching event before reconciling the original bill. That closes the loop: off-chain evidence, authorized on-chain action, and a business record that knows what settled.

## A frontend component

Back in the product, Ask ACR Agent is the entry point. The merged frontend imports Aomi’s widget and pins it to the hosted ACR app. The protocol keeps its own interface; the component supplies the conversation.

## Build from the workflow

That is the foundation for one-shotting a protocol app. Describe the workflow, connect the infrastructure, and define the contract actions and guards. Aomi supplies the agent runtime and frontend component around those protocol-specific pieces.

## One connected workflow

The frontend integration is shipped. The treasury workflow is implemented, with production payment acceptance still pending. The value is one agent that connects understanding the protocol with acting on it.
