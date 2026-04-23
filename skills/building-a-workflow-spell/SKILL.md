---
name: building-a-workflow-spell
description: Use when the meta-builder routes to kind=workflow. Generates a workflow spell with explicit stages, checkpoints, and loop-back conditions.
kind: workflow
audience: anyone
ai-tools: any
complexity: guided
time: 15-30 min
version: 1.0.0
source: bundled
---

# Building a Workflow Spell

## What this does

Specialist builder for `kind: workflow` spells. A workflow has multiple stages with explicit handoff artifacts and checkpoints between them.

## When to use

- Routed to from `building-a-spell` Stage 2 when `kind: workflow`
- User describes a process with natural stopping points and intermediate artifacts

## What you bring (Inputs)

- The workflow's overall goal
- The natural stages (or the steps the user does today, which we'll cluster)
- The artifact handed from each stage to the next

## What you get (Output)

A draft SKILL.md with explicit `Stages`, `Checkpoints`, and `Loop-back conditions` sections, ready for the standard tester.

## How it works (Steps)

This is a workflow chain.

## Stages

### Stage 1: Identify the natural stopping points

A stage is a place where you could (and sometimes do) stop, hand the work to someone else, and return to it later.

Ask the user (or extract): "What are the natural stopping points in this process?"

If the user says "no stopping points, it's one continuous flow" — this isn't a workflow; it's a content kind. Re-route.

### Stage 2: Name each stage and its artifact

Each stage has:

- **Goal**: what this stage accomplishes
- **Input**: artifact from the previous stage (or initial inputs for stage 1)
- **Output**: artifact handed to the next stage

If you can't name the output artifact, the stage isn't well-defined yet. Sharpen.

### Stage 3: Write checkpoints

For each stage transition, write the checkpoint — what must be true to pass the gate.

Checkpoints are tested, not asserted. Each checkpoint should be verifiable: the artifact has a property you can check.

### Stage 4: Identify loop-back conditions

A workflow without loop-backs is a pipeline (one-way). Most real workflows loop back — when the artifact at stage N reveals stage N-1 was wrong.

Capture loop-back conditions explicitly. If there are none, that's a finding — confirm with user.

### Stage 5: If the workflow composes other spells, declare them

When stages are themselves named spells, add a `composes` field to frontmatter:

```yaml
composes:
  - <constituent-spell-1>
  - <constituent-spell-2>
```

This makes the workflow a chain. See `chaining-spells/SKILL.md` for details on chain mechanics.

### Stage 6: Hand off to standard tester

Standard mode (not discipline mode). Tester runs 2-3 scenarios end-to-end through all stages.

If a checkpoint repeatedly fails, that stage's checkpoint is wrong (too strict or too loose). Refine in Stage 3.

### Stage 7: Hand back to meta-builder

Return the PASSing draft.

## Checkpoints

- **After Stage 1**: at least 2 stopping points named (else re-route to content)
- **After Stage 2**: every stage has goal + input + output artifact
- **After Stage 3**: every stage transition has a verifiable checkpoint
- **After Stage 4**: loop-back conditions documented (or explicitly "none, this is a pipeline")
- **After Stage 5**: if composes is set, every name resolves to a real spell
- **After Stage 6**: tester returns PASS

## Loop-back conditions

Return to Stage 2 when:

- A checkpoint can't be made verifiable — the stage's output artifact wasn't well-defined
- Tester finds two stages can't be cleanly separated — merge them

## Quality bar

The draft is good enough when:

- Each stage has a named output artifact
- Each transition has a verifiable checkpoint
- Loop-back conditions are documented (even if empty)
- If `composes` is set, every name resolves
- Tester returns PASS on 2-3 end-to-end scenarios

## Variations

- **Linear pipeline** (no loop-backs): document explicitly
- **Tree workflow** (branches): rare; document branch conditions in stages
- **Re-entrant workflow** (resumable from any stage): document state-restore inputs per stage

## Example

```
Workflow: structured-literature-review
Stages:
  1. Define the question (output: 1-sentence research question)
  2. Snowball search (output: 20-30 candidate papers)
  3. Screen by abstract (output: 8-12 included papers)
  4. Extract findings (output: per-paper extraction sheet)
  5. Synthesize (output: 1-page synthesis)

Checkpoints:
  - After 1: question is single-sentence and falsifiable
  - After 2: candidate count >= 20
  - After 3: inclusion criteria documented
  - After 4: every included paper has a filled extraction sheet
  - After 5: synthesis cites every included paper

Loop-backs:
  - After 3: if <8 included, return to stage 2 (broaden search)
  - After 5: if synthesis exposes a contradiction, return to stage 4 (re-extract)
```
