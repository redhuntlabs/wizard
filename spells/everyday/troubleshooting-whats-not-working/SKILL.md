---
name: troubleshooting-whats-not-working
description: Use when something is broken, failing, or not behaving as expected (any domain - software, gadget, process, plan)
kind: workflow
audience: anyone
ai-tools: any
complexity: guided
time: 10-30 min
version: 1.0.0
source: bundled
---

# Troubleshooting What's Not Working

## What this does

Walks you from "something is wrong" to a verified diagnosis using evidence, not guesses. Works for software bugs, broken appliances, stalled projects, or interpersonal issues.

## When to use

- Something stopped working that used to work
- Something is producing the wrong result
- A plan isn't going as expected and you can't tell why

## What you bring (Inputs)

- Description of what you expected to happen
- Description of what actually happened
- When it last worked / when the symptom started

## What you get (Output)

A diagnosis (the cause) plus a verified fix attempt or, if unfixable yet, a clear "next thing to test."

## How it works (Steps)

This is a guided workflow.

## Stages

### Stage 1: State the symptom precisely

Write one sentence: "When X, I expect Y, but I get Z." If you can't write this sentence, the symptom isn't precise enough yet. Sharpen.

### Stage 2: Capture the recent change

What changed since this last worked? Be specific: "I updated the app" or "we moved offices" or "she started a new job." If "nothing changed," challenge that — something always did.

### Stage 3: Bisect

Find the smallest scenario that still produces the symptom. Strip away anything optional. The smaller the failing case, the easier the cause is to see.

### Stage 4: Form one hypothesis

State: "I think the cause is X because of evidence Y." One hypothesis at a time.

### Stage 5: Test the hypothesis

Design a check that would prove the hypothesis wrong if it's wrong. Run the check. Record what you observed.

### Stage 6: Decide

- Hypothesis confirmed → proceed to fix and verify the fix actually fixed it
- Hypothesis disproved → return to Stage 4 with a new hypothesis (don't recycle the old one)
- Hypothesis inconclusive → tighten the test in Stage 5

### Stage 7: Verify the fix

After fixing: reproduce the original symptom scenario. The symptom must be gone. Otherwise the fix didn't fix it (despite what you'd like to believe).

## Checkpoints

- **After Stage 1**: symptom is one sentence, with expected vs actual
- **After Stage 2**: at least one change identified
- **After Stage 3**: smallest failing case noted
- **After Stage 4**: one hypothesis with named evidence
- **After Stage 5**: test was actually run; result recorded
- **After Stage 7**: original symptom no longer reproducible

## Loop-back conditions

Return to Stage 4 when a hypothesis is disproved.
Return to Stage 1 when bisection reveals the symptom statement was wrong.

## Quality bar

- Symptom statement is precise and falsifiable
- One hypothesis at a time (not "could be A, B, or C")
- Fix is verified by reproducing the original case
- If unfixable today, there's a clear next test

## Variations

- **Software bug**: Stage 5 test is usually a runnable script or command
- **Broken appliance**: Stage 5 test might require a multimeter or replacement part
- **Process problem**: Stage 5 test might be "run it once with the proposed change and observe"
- **Interpersonal**: hypothesis is about motivation; test is a clarifying conversation, not a confrontation

## Example

**Input**: My monthly invoice automation worked all year, last week it sent invoices to the wrong customers.

- Stage 1: "When the cron runs on the 1st, I expect each invoice to go to its own customer; it's going to the previous customer in the list."
- Stage 2: "Last week the dev updated the lookup library."
- Stage 3: Smallest failing case: 2 customers, both got each other's invoice.
- Stage 4: Hypothesis: the lookup change introduced an off-by-one.
- Stage 5: Run with library version pinned back to last month. Symptom gone.
- Stage 6: Hypothesis confirmed.
- Stage 7: Fix is to either roll back or patch. After patch, run with 5 test customers. Symptom stays gone.
