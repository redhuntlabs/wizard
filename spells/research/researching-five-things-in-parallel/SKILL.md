---
name: researching-five-things-in-parallel
description: Use when researching N independent topics, companies, or candidates - dispatches one subagent per topic and aggregates results
kind: subagent
audience: anyone
ai-tools: any
complexity: long-running
time: 10-30 min wall-clock for 5 topics
version: 1.0.0
source: bundled
---

# Researching Five Things in Parallel

## What this does

When you need to research N independent topics (5 companies before a sales call, 5 candidates before interviews, 5 papers for a literature scan), this skill dispatches one research subagent per topic in parallel, aggregates results, and returns a unified brief.

## When to use

- Researching multiple companies, people, papers, products, or places — and the research is independent
- Pre-meeting prep when you have multiple counterparties
- Side-by-side comparison shopping
- Any "do this same thing for each of N items" research task

## Do not use when

- Items depend on each other (e.g., "research X, then based on what you find, research Y") — use a workflow instead
- N = 1
- Items require different research methods each — dispatch separately by hand

## What you bring (Inputs)

- The list of N items (max 8 recommended)
- The research question to apply to each (must be the same for all items)
- The target output format (table row, paragraph, slide)
- Any time constraint per item (default: 5 min per subagent)

## What you get (Output)

A unified document where each item appears in the same format, plus a "compare" section that surfaces deltas across items.

## How it works (Steps)

This is a subagent dispatch. For each item in the input list, one `research-helper` subagent is dispatched in parallel; the parent aggregates after all return.

## Parallelism

All N subagents (max 8 recommended) run concurrently. Wall-clock time is bounded by the slowest single subagent plus aggregation, not the sum.

## Context handed to each subagent

Each subagent receives EXACTLY:

- The single item (name + any identifier)
- The research question (verbatim, same for all)
- The output format (verbatim, same for all)
- The time budget (default 5 min)
- Permitted sources (e.g., "public web only" / "internal docs included" / "no AI-generated summaries")

Each subagent does NOT receive: the other items, their results, or your overall purpose.

### What each subagent returns

A single artifact in the agreed format. Plus a confidence rating (high/med/low) and a list of unanswered sub-questions.

## Aggregation

The parent (you) waits for all subagents, then:

1. Assembles results in input order
2. Builds a "compare" section that highlights the deltas (which item ranks highest on each dimension)
3. Lists items that returned low-confidence or partial results
4. Names the next research step for any low-confidence items

## Partial-failure handling

If a subagent fails (timeout, no sources found, ambiguous item), the result for that item is marked `[NEEDS RE-RUN: <reason>]`. The aggregation continues for the rest. Re-runs are dispatched serially with refined inputs. The chain does NOT block on one failed subagent.

## Quality bar

- Every subagent received exactly the same prompt template
- Every result is in the same format (so they're comparable)
- The compare section actually compares (not just concatenates)
- Low-confidence items are surfaced, not buried

## Variations

- **5 companies before sales calls**: format = the company-research-brief format
- **5 candidates before interviews**: format = candidate one-pager (background, signal, red flags, questions)
- **5 papers for a scan**: format = title, claim, method, finding, limitation
- **5 vendors for selection**: format = pricing, features, integration, support, references

## Example

**Input**:

- Items: Acme Inc, Beta Corp, Gamma Ltd, Delta LLC, Epsilon SA
- Research question: "What does this company do, who runs it, what are their last 3 announcements, and what's the most likely angle for a partnership conversation?"
- Format: 200-word brief per company, plus 3 talking points

**Process**: 5 research-helper subagents dispatched in parallel, each given exactly one company and the same prompt. ~8 min wall-clock.

**Output**:

- 5 briefs (one per company, all in the same format)
- Compare section: which 2 companies have the freshest news, which 1 has overlapping investors with us, which 1 is in active fundraising
- 1 marked `[NEEDS RE-RUN: company name is ambiguous, found 3 entities]`
