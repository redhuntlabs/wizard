---
name: summarizing-a-document
description: Use when summarizing an article, paper, transcript, or doc - with verbatim quotes for the most important claims
kind: content
audience: anyone
ai-tools: any
complexity: simple
time: 5-10 min
version: 1.0.0
source: bundled
---

# Summarizing a Document

## What this does

Produces a short, scannable summary of a longer source. The summary's central claims are each backed by a verbatim quote so the reader can verify quickly.

## When to use

- Sharing a long article, paper, or transcript with someone who won't read it
- Capturing what you read so you can refer back without re-reading
- Preparing for a meeting where the source will come up

## What you bring (Inputs)

- The source (article, paper, transcript, doc)
- The intended reader (so the level matches)
- A length budget (default: 5 bullets)

## What you get (Output)

A markdown summary with: a one-sentence takeaway at the top, then 3-5 bullets, each pairing a claim (in your words) with a verbatim quote from the source.

## How it works (Steps)

1. Read the full source once.
2. Identify the 3-5 most important claims (not the most interesting prose).
3. For each claim, find one verbatim quote that supports it. Copy-paste, do not retype.
4. Write the bullet: claim in your own words, then the quote in italics with location (page, paragraph, or timestamp).
5. Write the one-sentence takeaway at the top: what would the reader do differently after reading this summary?

## Quality bar

- Within length budget
- Every claim has a verbatim quote (no paraphrasing posing as quote)
- Quotes are accurate (copy-paste, not retyped from memory)
- Takeaway is action-oriented, not descriptive

## Variations

- **Pure summary** (no quotes): drop step 3-4's quote portion; useful for very informal sharing
- **Disagreement summary**: add a final bullet "what's contested in this source"
- **Comparison summary**: when summarizing 2+ sources, end with a one-line comparison

## Example

**Input**: A 2,000-word article on remote work productivity for an engineering manager.

**Output**:

> **Takeaway**: Async-first teams should default to written status updates over meetings; the data shows 25% productivity gains but only when managers also reduce 1:1 cadence.
>
> - **Async beats sync for individual contributor productivity** — *"Engineers in async-first teams shipped 25% more features per sprint than peers in sync-first teams."* (para 4)
> - **The gain disappears if managers don't also adjust** — *"Managers who maintained weekly 1:1s erased the async productivity gain."* (para 7)
> - ...
