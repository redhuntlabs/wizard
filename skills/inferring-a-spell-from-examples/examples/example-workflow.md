# Worked Example — Workflow Skill (Research Loop)

End-to-end inference from `tests/inference-fixtures/transcripts/05-workflow-research-loop.md`.

## 1. Input transcript (14 turns; middle collapsed)

> ## Turn 1 — User
> I want to understand the current state of small modular nuclear reactors in the US — regulatory status, deployed units, expected timeline. Walk me through your research approach before you start.
>
> ## Turn 2 — Agent
> I'll work through this in four stages.
> First, scope: I'll narrow the question to commercial small modular reactors (SMRs) under 300 MW and to the US specifically …
> Then, search: I'll pull the NRC's current SMR docket list, recent DOE funding announcements …
> Next, verify: I'll cross-check each claim from the trackers against the NRC docket …
> Finally, write: I'll synthesize into a short brief with citations.
> If verify turns up gaps, I'll loop back to search before writing.

## … (turns 3–12 collapsed: scope confirmed → search produced 6 claims → verify caught 3 errors → loop back to search for 3 names → second-pass search → write the brief) …

> ## Turn 13 — User
> That's exactly what I needed. The verify step caught three errors — I'll trust this output.
>
> ## Turn 14 — Agent
> Yes, the loop-back from verify to search was worth the extra turn. Without it the brief would have repeated the trackers' overstated readiness on Holtec and missed the Kairos construction permit.

## 2. Pass 1 — Suitability check

```yaml
outcome: BUILDABLE
reason: |
  12 substantive turns. Repeating pattern is explicit: the agent declared four
  named stages in turn 2 (scope → search → verify → write) and the rest of the
  transcript executed them in order, with one observed loop-back (verify →
  search → verify). That's a workflow with a built-in correction step.
```

→ Continue to Stage 2.

## 3. Pass 2 — Context dictionary

Kind detection prompt shown to user:

> *"This looks like a `workflow` skill (vs `discipline`). Confirm? \[W/d]"*

User: `W` (confirms).

```yaml
name: researching-with-source-verification
kind: workflow
audience: knowledge-worker
complexity: guided
inputs:
  - research question
  - scope boundaries (what's in / what's out)
  - acceptable source types
outputs:
  - short brief with inline citations
  - explicit caveat / limitations paragraph
stages:
  - name: scope
    purpose: "Define what counts and what doesn't, in writing, before searching"
  - name: search
    purpose: "Pull primary sources first (regulator dockets, official filings), then trackers"
  - name: verify
    purpose: "Cross-check every tracker claim against a primary source; correct or retract"
  - name: draft
    purpose: "Synthesize into a brief; cite sources inline"
  - name: write
    purpose: "Final pass — tighten language, add caveats paragraph"
loop_backs:
  - "If verify finds ≥ 1 correction, loop back to search for the affected items before writing"
quality_bar: |
  Every factual claim in the final brief has a primary-source citation.
  Trackers are used as leads, never as the authority.
```

## 4. Pass 3 — Draft SKILL.md (strawman v1)

```markdown
---
name: researching-with-source-verification
description: Use when producing a short research brief where accuracy matters more than speed. Runs a five-stage loop with mandatory primary-source verification before writing.
kind: workflow
audience: knowledge-worker
ai-tools: any
complexity: guided
time: 30-90 min per brief
version: 0.1.0
source: inferred
---

# Researching with Source Verification

## What this does

Produces a short research brief with primary-source citations. Has an explicit
verify stage that loops back to search if it catches errors — this is the
single most important step.

## When to use

- The brief will be used to make a decision, not just for awareness
- Industry trackers exist but you don't fully trust their numbers

## How it works (Stages)

1. **Scope** — write down what's in and what's out before searching.
2. **Search** — pull primary sources first; collect tracker claims as leads.
3. **Verify** — cross-check each tracker claim against a primary source.
4. **Draft** — synthesize; every claim cites its source inline.
5. **Write** — tighten and add a caveats paragraph.

## Loop-back conditions

- Verify finds ≥ 1 correction → return to Search for the affected items.

## Quality bar

Every factual claim has a primary-source citation. Trackers are leads, never
the authority.

<!-- inferred-from: tests/inference-fixtures/transcripts/05-workflow-research-loop.md -->
<!-- inferred-at: 2026-04-24T10:05:00Z -->

> _Inferred from `05-workflow-research-loop.md` on 2026-04-24. Quoted segments preserved verbatim._
```

Validator gate: passes. Strawman shown to user.

## 5. User response — refine

```
refine: drop the "draft" stage — I want it written directly during verify
```

The skill applies the edit (collapse `draft` into `write`, since `verify` is
where corrections happen and the brief is composed in one pass after verify
clears). Strawman re-rendered — only the changed `Stages` block shown:

```markdown
## How it works (Stages)

1. **Scope** — write down what's in and what's out before searching.
2. **Search** — pull primary sources first; collect tracker claims as leads.
3. **Verify** — cross-check each tracker claim against a primary source.
4. **Write** — once verify is clean, write the brief in one pass with inline
   citations and a caveats paragraph.

## Loop-back conditions

- Verify finds ≥ 1 correction → return to Search for the affected items.
```

(Four stages instead of five; `draft` removed.)

## 6. User response — approve

```
approve
```

## 7. Hand-off

Handed to `building-a-spell` Stage 2 with `kind=workflow`. The
`building-a-workflow-spell` specialist took over from there — it picked
up the four-stage definition and the verify→search loop-back as-is and
proceeded into Stage 3 (try-it).

## What this example demonstrates

- The `refine` interaction in Stage 4 is non-destructive: only the strawman
  changes, the context dictionary is updated underneath, and the validator
  re-runs before the next render.
- A workflow inferred from a transcript that *itself* declared its stages
  (turn 2) needs almost no structural invention — Pass 2 is mostly a transcription
  job, not a synthesis job. That's the easy case.
