---
name: researching-a-company
description: Use when researching a company before a meeting, interview, sale, partnership, or investment
kind: workflow
audience: knowledge-worker
ai-tools: any
complexity: guided
time: 15-30 min
version: 1.0.0
source: bundled
---

# Researching a Company

## What this does

Produces a one-page company brief covering what they do, who runs it, how they're funded, what they shipped recently, and what's about to be at risk for them.

## When to use

- Before a sales call, interview, partnership conversation, or investment discussion
- When you need to walk into a meeting able to talk substance
- When you're vetting a potential employer

## What you bring (Inputs)

- Company name (and website if you have it)
- Why you're researching (sales / interview / partnership / investment / general curiosity)
- Time budget (default 20 minutes)

## What you get (Output)

A one-page brief: Company-at-a-glance / Recent moves / People / Money / Likely concerns / 3 questions you could ask them.

## How it works (Steps)

This is a workflow.

## Stages

### Stage 1: Snapshot

From the company website + about page: what they do in one sentence, who their customers are, headcount range, HQ.

### Stage 2: Recent moves

Last 6 months: product launches, leadership changes, fundraises, layoffs. Sources: blog, press releases, LinkedIn, news search.

### Stage 3: People

Founders + 1-2 senior people likely to come up in your context. Background, prior companies, public talks. Source the facts (link per claim).

### Stage 4: Money

For a private company: stage, latest round, lead investors, last valuation. For a public company: market cap, last earnings highlights, key metrics.

### Stage 5: Likely concerns

What's a known headwind, customer complaint, or competitor pressure? Sources: G2 reviews, Glassdoor, Reddit, customer subreddits, recent press.

### Stage 6: Three questions

Generate 3 questions you could ask them in your meeting. Open-ended, specific, non-obvious.

## Checkpoints

- **After Stage 1**: snapshot fits in 3 sentences
- **After Stage 2**: every "recent move" has a source link
- **After Stage 3**: every person fact has a source link
- **After Stage 4**: numbers have a source and date (stale = useless)
- **After Stage 5**: at least 1 specific concern with a source
- **After Stage 6**: 3 questions, none answerable by reading the website

## Loop-back conditions

Return to Stage 2 if Stage 5 surfaces a concern from a date you didn't cover.

## Quality bar

- Every fact has a source you could quote
- "Recent moves" are within the last 6 months
- Money figures are dated
- No fabricated headlines or quotes — verify before including

## Variations

- **Sales prep**: emphasize Stage 5 (likely concerns = your value props)
- **Interview prep**: add "stated values + how I match" section
- **Investor due diligence**: deepen Stage 4; add competitive landscape

## Example

**Input**: Acme Corp, prepping for a sales meeting next week.

**Output**:

> **Acme Corp** — B2B observability platform, ~200 employees, SF HQ.
>
> **Recent moves**:
> - Apr 2026: launched AI anomaly detection (blog link)
> - Mar 2026: hired new CRO from Datadog (LinkedIn link)
>
> **People**: CEO Jane Doe (ex-Datadog VP), CRO John Roe (ex-New Relic VP).
>
> **Money**: Series C, $80M raised Sep 2025 (Sequoia lead, $400M valuation, Crunchbase link).
>
> **Likely concerns**: 4 G2 reviews from Q1 mention pricing complexity (link).
>
> **Questions to ask**:
> 1. How is the new CRO planning to address the pricing-complexity feedback?
> 2. ...
