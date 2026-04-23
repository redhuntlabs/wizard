# Worked Example — Discipline Skill (No Untested Claims)

End-to-end inference from `tests/inference-fixtures/transcripts/09-discipline-no-untested-claims.md`.

## 1. Input transcript (12 turns; middle collapsed)

> ## Turn 1 — User
> Help me put together a market-sizing brief for the home-EV-charger segment. **Ground rule: every factual claim you make must cite a source. No exceptions. If you don't have a source, say "no source" and I'll fetch it.**
>
> ## Turn 2 — Agent
> Understood. Starting with the headline:
> > The US home-EV-charger market is approximately $1.8B in 2026, growing at roughly 22% per year.
> That figure aligns with what I've seen in industry reports.

## … (turns 3–10 collapsed: user catches first violation → agent retracts $1.8B and 22% as unsourced → user supplies BNEF report → agent restates with proper citation → agent then cites Wood Mackenzie → user asks for publication month → agent admits it cannot verify the report exists → second retraction) …

> ## Turn 11 — User
> That's the second retraction in one session. **The rule isn't optional — verify before stating, every time. Do not write any more numbers in this brief unless you can name the report, the year, and the section.**
>
> ## Turn 12 — Agent
> Acknowledged. Going forward in this session: every numeric claim will carry a citation in the same sentence, formatted as `(SourceName, Year, §Section)`. If I cannot produce that citation, I will write `[no source]` instead of the number. No exceptions for figures that "feel right" — those were exactly the cases that broke twice.

## 2. Pass 1 — Suitability check

```yaml
outcome: BUILDABLE
reason: |
  10 substantive turns. The repeating pattern is not steps or stages — it is a
  rule being violated and re-asserted twice (turns 2→3 and turns 8→11), each
  followed by a retraction. That violation→assertion cycle is the signature of
  a discipline skill, not a workflow.
```

→ Continue to Stage 2.

## 3. Pass 2 — Context dictionary

Kind detection prompt shown to user:

> *"This looks like a `discipline` skill (vs `workflow`). Confirm? \[D/w]"*

User: `D` (confirms).

```yaml
name: citing-every-factual-claim
kind: discipline
audience: knowledge-worker
complexity: simple
inputs:
  - draft text containing factual or numeric claims
outputs:
  - same draft, with every claim either citation-tagged or replaced by [no source]
quality_bar: |
  Zero numeric or factual claims appear in the output without an inline citation
  naming source, year, and section — or the explicit marker [no source].
rules_extracted_verbatim:
  - source_turn: 1
    text: "every factual claim you make must cite a source. No exceptions."
  - source_turn: 1
    text: "If you don't have a source, say \"no source\" and I'll fetch it."
  - source_turn: 3
    text: "Either you have a specific report with a name and a year, or you don't."
  - source_turn: 11
    text: "verify before stating, every time."
  - source_turn: 11
    text: "Do not write any more numbers in this brief unless you can name the report, the year, and the section."
  - source_turn: 12
    text: "every numeric claim will carry a citation in the same sentence, formatted as `(SourceName, Year, §Section)`. If I cannot produce that citation, I will write `[no source]` instead of the number."
```

Every entry under `rules_extracted_verbatim` is a string that appears in the
source transcript. None are paraphrased. None are invented.

## 4. Pass 3 — Draft SKILL.md

```markdown
---
name: citing-every-factual-claim
description: Use when producing any brief, memo, or analysis containing factual or numeric claims. Enforces a zero-tolerance citation discipline — every claim cites source/year/section, or it is replaced by [no source].
kind: discipline
audience: knowledge-worker
ai-tools: any
complexity: simple
time: ongoing
version: 0.1.0
source: inferred
---

# Citing Every Factual Claim

## What this does

Holds the line on a single rule: no factual or numeric claim leaves the draft
without an inline citation. Replaces "feels right" estimates with the explicit
marker `[no source]` so the gap is visible to the reader.

## When to use

- You are writing a brief or memo that will be used to make a decision
- The reader will hold you to specific numbers
- Any claim could be misread as load-bearing

## The rules (verbatim from source transcript)

These are the must/never clauses. Each is a direct quote from the user (or, in
the last case, from the agent's acknowledgment of the user's rule). The
turn number identifies the source.

> **(turn 1)** *"every factual claim you make must cite a source. No exceptions."*

> **(turn 1)** *"If you don't have a source, say 'no source' and I'll fetch it."*

> **(turn 3)** *"Either you have a specific report with a name and a year, or you don't."*

> **(turn 11)** *"verify before stating, every time."*

> **(turn 11)** *"Do not write any more numbers in this brief unless you can name the report, the year, and the section."*

> **(turn 12, acknowledged)** *"every numeric claim will carry a citation in the same sentence, formatted as `(SourceName, Year, §Section)`. If I cannot produce that citation, I will write `[no source]` instead of the number."*

## How it works (Hard gates)

1. **Before writing any number or named-fact claim:** name the source out loud
   (in the chat, in a comment, or in the same sentence). If you cannot, write
   `[no source]` and stop.
2. **Citation format is fixed:** `(SourceName, Year, §Section)`. Inline, in
   the same sentence as the claim. Footnotes and "as I've seen elsewhere"
   are not citations.
3. **Retraction protocol:** if a claim is challenged and the source cannot be
   produced, retract immediately and replace with `[no source]`. Do not
   restate until a verifiable source is named.

## Quality bar

Zero claims in the output without either an inline citation (source, year,
section) or the explicit `[no source]` marker. A second retraction in one
session means tighten the rule, not loosen it.

<!-- inferred-from: tests/inference-fixtures/transcripts/09-discipline-no-untested-claims.md -->
<!-- inferred-at: 2026-04-24T10:10:00Z -->

> _Inferred from `09-discipline-no-untested-claims.md` on 2026-04-24. Quoted segments preserved verbatim._
```

Validator gate: passes. Strawman shown.

## 5. User response

```
approve
```

## 6. Hand-off

Handed to `building-a-spell` Stage 2 with `kind=discipline`. The
`building-a-discipline-spell` specialist took over from there.

## What this example demonstrates

Pass 3 rule #2 — *"no fabricated discipline rules"* — is why every must/never
clause in the draft above can be traced back to a specific user (or
user-acknowledged) turn in the source transcript. The
`rules_extracted_verbatim` block in the context dictionary makes the
provenance machine-checkable: a downstream linter (or a human reviewer) can
diff each quoted rule against the transcript and reject any that don't appear
verbatim. That is the single strongest guarantee this skill offers — and it
is the reason a discipline skill inferred from this fixture cannot quietly
mutate "must cite a source" into a softer "should cite a source where
practical."
