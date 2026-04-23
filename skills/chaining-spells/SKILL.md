---
name: chaining-spells
description: Use when composing multiple spells into a chain that runs end-to-end (e.g. brainstorm -> plan -> execute -> verify).
kind: workflow
audience: anyone
ai-tools: any
complexity: chained
time: varies (chain runtime + setup)
version: 1.0.0
source: bundled
---

# Chaining Spells

<!-- token-budget-exception: chained workflow with stages, gates, and loop-back conditions requires extra words -->

## What this does

Builds and runs a chain — a workflow spell whose stages each invoke another existing spell. The chain handles handoffs, loop-backs, and stop-on-failure.

## When to use

- User says "do X then Y then Z" where each is a known spell
- User wants to formalize a multi-spell workflow they keep doing manually
- Loading a default chain (e.g. `general-research-loop`)

## What you bring (Inputs)

- The names of the spells to chain (in order)
- The handoff artifact between each pair

## What you get (Output)

A new chain spell (kind: workflow, complexity: chained) saved to `$WIZARD_HOME`, plus a runnable execution path.

## How it works (Steps)

This is a workflow — and the resulting chain is also a workflow. Don't confuse the two.

## Stages

### Stage 1: Identify constituents

List the spells in the order they'll run. Verify each exists (in `$WIZARD_HOME` or bundled). Reject the chain if any are missing — offer to build them first.

### Stage 2: Define handoffs

For each adjacent pair (A → B):

- What does A produce?
- What does B require as input?
- Do they match, or does a translation step exist?

If they don't match, the chain isn't yet runnable. Either:

- Edit B's `What you bring (Inputs)` to accept A's output, OR
- Insert a translator spell between them, OR
- Reject the chain and tell the user

### Stage 3: Define stage gates

For each transition, name what must be true to pass to the next stage. Default: "the constituent spell's Quality bar was met."

### Stage 4: Define loop-back conditions

When does the chain return to an earlier stage?

Default: "if any stage's Quality bar is not met after the constituent finishes, return to that stage and re-run."

Document any custom loop-backs.

### Stage 5: Build the chain SKILL.md

Use `templates/spell-template-chained.md`. Set `composes:` to the list of constituent names.

### Stage 6: Test the chain end-to-end

Standard tester runs 1-2 scenarios that exercise the full chain. Each constituent must run; each handoff must succeed.

If any constituent fails, the chain test fails. Refine that constituent first; then re-run the chain test.

### Stage 7: Save

Save to `$WIZARD_HOME/chains/<chain-name>/SKILL.md`.

## Checkpoints

- **After Stage 1**: every constituent name resolves
- **After Stage 2**: every handoff is matched (or has a translator)
- **After Stage 3**: every transition has a gate
- **After Stage 4**: loop-backs documented (or empty)
- **After Stage 5**: SKILL.md drafted
- **After Stage 6**: end-to-end test PASSed
- **After Stage 7**: file saved

## Loop-back conditions

Return to Stage 1 when:

- A constituent breaks during testing — fix that constituent in its own refinement, then re-run the chain
- A handoff exposes that the constituents are wrong order — re-sequence

## Quality bar

A chain is good enough when:

- Every constituent runs in its declared order
- Every handoff produces the artifact the next stage requires
- End-to-end test passes for at least 1 realistic scenario

## Variations

- **Linear chain**: no loop-backs (most chains)
- **Conditional chain**: a stage may skip based on a check (document the check)
- **Looping chain**: returns to an earlier stage on a defined trigger (document the trigger)

## Example

```
Chain: general-research-loop
Constituents:
  1. breaking-down-a-problem      (output: 1-page problem statement)
  2. literature-scan              (output: list of 5-10 sources)
  3. summarizing-a-document       (run per source; output: per-source notes)
  4. interview-synthesis          (output: combined synthesis)
  5. verifying-before-citing      (discipline; runs throughout)

Handoffs:
  - 1 -> 2: problem statement seeds the search query
  - 2 -> 3: each source goes to a separate summarize run
  - 3 -> 4: combined notes feed synthesis
  - 5 is a discipline that doesn't transition; it's loaded throughout

Loop-backs:
  - After 4: if synthesis exposes a question the lit-scan missed,
    return to stage 2 with the new query
```
