---
name: general-research-loop
description: Use when doing serious research on any topic - chains literature scan, parallel research, structured review, and citation verification
kind: workflow
audience: anyone
ai-tools: any
complexity: chained
time: 1-3 days
version: 1.0.0
source: bundled
composes:
  - literature-scan
  - researching-five-things-in-parallel
  - structured-literature-review
  - verifying-before-citing
---

# General Research Loop

## What this does

The default chain for serious research on any topic. Runs four bundled spells in sequence: scan the field, parallelize deep-dives on the canonical 5-8 sources, synthesize into a structured review, and verify every citation before publishing. Equivalent in spirit to a discipline-rigorous research workflow.

## When to use

- Producing a research output that someone will rely on (memo, paper, brief, decision document)
- The topic is unfamiliar enough that you need to map it before deep-diving
- The output is for an audience who can check your sources

## Do not use when

- A 30-minute read of one canonical source is enough — just read it
- You're already an expert on this topic — go straight to writing
- The decision deadline is in hours — use a faster, less rigorous flow

## What you bring (Inputs)

- Research question (one sentence)
- Audience and depth target (memo / paper / brief)
- Time budget
- Source-access constraints (what databases, what languages)

## What you get (Output)

A verified, structured research document: scope, methods, themes, evidence, gaps, and a bibliography where every citation has been opened.

## How it works (Steps)

This is a chain of 4 spells. Each stage hands an artifact to the next.

## Stages

### Stage 1: Map the field (literature-scan)

- **Skill**: `literature-scan`
- **Input**: research question
- **Output handoff**: a one-page brief identifying the canonical 5-10 sources and the major positions
- **Gate**: at least 5 sources identified; positions are distinct

### Stage 2: Deep-dive in parallel (researching-five-things-in-parallel)

- **Skill**: `researching-five-things-in-parallel`
- **Input**: the 5-8 canonical sources from Stage 1, with the same per-source extraction prompt (research question, method, finding, limitation, your one-line summary)
- **Output handoff**: a structured table of source-level extracts plus a compare section
- **Gate**: every source has a complete row; low-confidence entries are flagged for re-run

### Stage 3: Synthesize (structured-literature-review, partial)

- **Skill**: `structured-literature-review` — invoked from Stage 5 (Synthesize) onward, since Stages 1-4 of that skill are already done by Stages 1-2 of this chain
- **Input**: the source extracts from Stage 2
- **Output handoff**: a draft review with themes, consensus, contestation, and gaps
- **Gate**: 3-7 themes; each theme supported by 2+ sources

### Stage 4: Verify (verifying-before-citing)

- **Skill**: `verifying-before-citing`
- **Input**: the draft from Stage 3
- **Output handoff**: a verified final draft where every citation has been opened or explicitly hedged or removed
- **Gate**: zero unverified citations in the final draft

## Checkpoints

- **After Stage 1**: 5+ canonical sources identified
- **After Stage 2**: every source has a complete extraction; low-confidence flagged
- **After Stage 3**: 3-7 themes, each supported by 2+ sources
- **After Stage 4**: zero unverified citations remain in the final draft

## Loop-back conditions

- Stage 1 returns < 5 sources: scope too narrow → revise question, restart Stage 1
- Stage 2 returns ≥ 2 low-confidence entries: re-run those subagents with refined inputs before proceeding
- Stage 3 finds < 3 themes: under-extraction → return to Stage 2 with deeper extraction prompts
- Stage 4 finds repeated misattributions in the AI-generated draft: do not publish; clean and re-verify

## Quality bar

- Every chain stage's gate passed before moving on
- Final draft has a verified bibliography
- Final draft is something you would defend in front of the cited authors
- The chain is reproducible — someone else with your inputs would arrive at a comparable output

## Variations

- **Quick brief** (1 day): cap Stage 1 at 5 sources; cap Stage 3 at 3 themes; skip the compare-section in Stage 2
- **Deep review** (multi-day): expand Stage 2 to 10+ sources; add a methods section to the final draft
- **Updating an existing brief**: skip Stage 1; re-run Stage 2 only on new sources since last update; re-synthesize what changed

## Example

**Input**: "Produce a research brief on the effectiveness of carbon border adjustment mechanisms for an executive audience, ~6 pages, this week."

**Flow**:

1. Stage 1 finds 8 canonical sources (3 IMF, 2 academic, 2 policy think tanks, 1 critique) and 3 camps
2. Stage 2 dispatches 8 parallel research subagents, returns a comparison table; 1 source flagged for re-run because the data was paywalled — re-run with abstract-only extraction
3. Stage 3 synthesizes into 4 themes (effectiveness, equity, design choices, political feasibility)
4. Stage 4 verifies 23 citations; 2 quotes hedged because the original source could not be opened in time

**Output**: 6-page executive brief with verified bibliography.
