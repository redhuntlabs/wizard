---
name: structured-literature-review
description: Use when producing a publishable or shareable literature review - chained workflow from scope to written review with verification
kind: workflow
audience: anyone
ai-tools: any
complexity: chained
time: 1-3 days
version: 1.0.0
source: bundled
composes:
  - literature-scan
  - verifying-before-citing
---

# Structured Literature Review

## What this does

Produces a publishable or shareable literature review by running a structured pipeline: scope → search → screen → extract → synthesize → write → verify. Each stage has an explicit handoff artifact and a quality gate.

## When to use

- Writing a literature review for a paper, thesis, or report
- Producing a "state of the field" memo for stakeholders
- Building a foundation for a new research project
- Updating an existing review with new evidence

## What you bring (Inputs)

- Research question (one sentence)
- Audience (academic / practitioner / executive)
- Time and depth budget
- Inclusion criteria you can articulate (date range, source types, languages)

## What you get (Output)

A written review (1-20 pages depending on scope) with: scope, methods, themes, evidence map, gaps, and a verified bibliography.

## How it works (Steps)

This is a chained workflow with 6 stages and explicit handoffs.

## Stages

### Stage 1: Scope (handoff: a one-page scope document)

- Research question
- Inclusion criteria (date range, study types, geography, languages)
- Exclusion criteria
- Audience and depth target

**Gate**: scope fits on one page; inclusion criteria are specific enough that two people would categorize the same source the same way.

### Stage 2: Search (handoff: a list of candidate sources, 30-100)

Run literature-scan to identify the canonical sources. Then expand:

- Forward citations from those canonical sources
- Backward citations from recent reviews
- Database searches with explicit queries (record the queries)

Save: source list with metadata (title, author, year, venue, where you found it).

**Gate**: at least 30 candidates; search queries are recorded.

### Stage 3: Screen (handoff: included sources list, 10-40)

Apply inclusion/exclusion criteria from Stage 1 to each candidate. Record reason for each exclusion.

**Gate**: included list is non-empty and the exclusion reasons are concrete.

### Stage 4: Extract (handoff: a structured table)

For each included source, extract: research question, method, sample, key findings, limitations, your one-line summary, and the theme(s) it speaks to.

**Gate**: every included source has every column filled. Empty cells = re-read the source.

### Stage 5: Synthesize (handoff: a themes document)

Cluster sources into 3-7 themes. For each theme: what is the consensus, what is contested, what's the strongest evidence on each side, what gaps remain.

**Gate**: every theme is supported by multiple sources; consensus and contestation are both named.

### Stage 6: Write (handoff: the final review)

Standard structure (adjust for venue):

- Introduction and scope
- Methods (search strategy, inclusion criteria, screening process)
- Themes (one section per theme; consensus → contestation → evidence)
- Gaps and future work
- Bibliography

### Stage 7: Verify (NON-SKIPPABLE)

Run verifying-before-citing on every cited claim. Open the primary source for each. Fix or hedge or cut.

**Gate**: every citation has been verified or explicitly hedged.

## Checkpoints

- After each stage's gate above. If a gate fails, loop back.

## Loop-back conditions

- Stage 2 returns < 30 candidates: scope too narrow or wrong terminology — return to Stage 1
- Stage 3 leaves < 10 included: criteria too strict — return to Stage 1
- Stage 5 finds < 3 themes: under-extracted — return to Stage 4
- Stage 7 finds repeated misattributions: do not publish until fully cleaned

## Quality bar

- Search queries are recorded and reproducible
- Every included source appears in at least one theme
- Every theme is supported by 2+ sources
- Every citation in the final draft has been opened and verified
- The review is something you'd be willing to defend in front of the cited authors

## Variations

- **Quick review** (1 day): cap at 15 included sources; 3 themes
- **Deep review** (multi-week): include grey literature, expert interviews, and a methodology section
- **Living review**: re-run the search quarterly; mark what's new

## Example

**Input**: Research question — "What does the evidence say about the effectiveness of remote work on team productivity, 2020-2025?"

**Output**: a 12-page review covering 28 sources organized into 4 themes (individual productivity, team coordination cost, manager experience, equity effects), with consensus and contestation in each, and a verified bibliography.
