---
name: responding-to-feedback
description: Use when replying to feedback on your work (review comments, manuscript revisions, design critique, criticism)
kind: workflow
audience: knowledge-worker
ai-tools: any
complexity: guided
time: 10-30 min
version: 1.0.0
source: bundled
---

# Responding to Feedback

## What this does

Turns a pile of feedback (comments, edits, critique) into a structured response that addresses each piece explicitly: accept, reject, negotiate, or defer — with reasons.

## When to use

- Code review with many comments
- Manuscript revisions from an editor or reviewer
- Design critique session output
- Performance review feedback you need to respond to
- Customer feedback on a delivered product

## What you bring (Inputs)

- The piece of work
- The feedback (as a list, or a thread to parse first)
- Your authority (can you accept/reject unilaterally, or do you need to negotiate?)

## What you get (Output)

A response that addresses every atom of feedback with a classification and a decision, plus the implementation plan for accepts.

## How it works (Steps)

This is a workflow.

## Stages

### Stage 1: Parse into atoms

Break the feedback into individual atoms — one issue per atom. A comment that says "this is unclear and the example is wrong" is two atoms.

### Stage 2: Classify each atom

For each atom, label one of:

- **blocker**: must address to ship
- **suggestion**: could improve the work; not required
- **question**: the reviewer wants info, not a change
- **nit**: minor stylistic preference
- **out-of-scope**: belongs in a different conversation

### Stage 3: Decide each atom

For each, decide:

- **accept**: name what you'll change
- **reject**: name your reason in one sentence (cite the work or the goal, not feelings)
- **negotiate**: propose a middle ground
- **defer**: name when you'll address it (next version / next milestone / never)

### Stage 4: Draft the response

For each atom, write one short paragraph: classification → decision → reasoning. Group by classification: blockers first.

### Stage 5: Tone check

Read the whole response back. Tone target: grateful (without sycophancy), direct, focused on the work not the person.

### Stage 6: Update the work

For accepts, do the actual changes. For negotiates that get agreement, do those too. Don't ship the response without doing the work.

## Checkpoints

- **After Stage 1**: every distinct issue is its own atom
- **After Stage 2**: every atom has a classification
- **After Stage 3**: every atom has a decision
- **After Stage 4**: response addresses every atom (no atoms silently dropped)
- **After Stage 5**: tone is grateful + direct
- **After Stage 6**: accepted changes are reflected in the actual work

## Loop-back conditions

Return to Stage 3 when a negotiation produces a counter that changes the original decision.

## Quality bar

- Every atom is addressed (none dropped silently)
- Reject reasons cite the work or the goal, not "I disagree"
- Negotiations propose something concrete, not "let's discuss"
- Tone is grateful + direct (not defensive, not sycophantic)

## Variations

- **Code review reply**: file/line refs per atom; "fixed in commit X" for accepts
- **Manuscript revisions**: include a separate cover letter summarizing changes
- **Design critique**: include an updated mock that shows accepts visually
- **Performance review reply**: address each piece of feedback, but tone shifts to "what I'm doing about it"

## Example

**Input**: Code review with 8 comments on a new feature.

**Output (excerpt)**:

> **Blockers (2)**:
> - Comment on `auth.ts:42` (concurrency bug): **Accept**. Fixed in commit abc123 with a mutex.
> - Comment on `api.ts:88` (missing test): **Accept**. Added test in commit def456.
>
> **Suggestions (3)**:
> - Comment on naming `getUser` → `fetchUser`: **Reject**. The codebase uses `get*` for synchronous-feeling reads (see `getOrders`); switching one breaks consistency. Keeping as is.
> - ...
>
> **Nits (2)**: All accepted; bundled in commit ghi789.
>
> **Out-of-scope (1)**: Comment about refactoring the whole module — agreed it's needed; filed as separate ticket #1234.
