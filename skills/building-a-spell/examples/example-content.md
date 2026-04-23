# Worked Example: Building a Content-Kind Spell

This walks through a complete build of `writing-a-status-update` from trigger to saved file.

## Trigger

User: "I send a Friday status update to my manager every week. Can we capture how I do it?"

## Stage 0: Context extraction

Extracted:
- name: `writing-a-status-update`
- kind: `content` (it's a writing task with a known shape)
- audience: `knowledge-worker`
- complexity: `simple`
- frequency: weekly (mentioned)

Confirmation message:
> I heard: a weekly status update for your manager, you want to capture how you write it. Sound right? Anything to add or correct?

User: "Yes, plus I want it to default to 5 bullets max."

Updated context: add `quality_constraint: max 5 bullets`.

## Stage 1: Depth + shape

Interviewer picks **Standard** depth (it's a content kind, but the user has a quality constraint that might generalize).

Workflow-shape match: `recurring-stakeholder-update`. Strawman shown:

```
Inputs: this week's wins, blockers, asks
Steps:
  1. Open with one-sentence headline
  2. List wins (max 3)
  3. List blockers (max 1)
  4. List asks (max 1)
Quality bar: under 5 bullets total, no jargon, ask is concrete
```

User: "Close. I also include a 'next week' line. And the headline should mention the OKR."

Adjustments captured.

## Stage 2: Kind-route

Kind = content. No specialist builder needed; draft inline using `templates/spell-template.md`.

## Stage 3: Try-it

Tester dispatched with:
- The draft
- Goal: "weekly status update to manager"
- Domain: "knowledge-worker / engineering manager"
- Examples: 1 prior week's update from the user

Tester runs 3 scenarios:
1. Normal week (3 wins, 1 blocker, 1 ask)
2. Bad week (1 win, 2 blockers)
3. Off-week (no significant wins, just signal)

All 3 produce outputs that pass the Quality bar. Verdict: **PASS**.

## Stage 4: Save

Path: `~/.wizard/work/writing-a-status-update/SKILL.md`

Confirmation:
> Saved to ~/.wizard/work/writing-a-status-update/SKILL.md.
>
> Next time you say "draft my status update" or similar, this spell will fire.

## What the resulting SKILL.md looks like

```markdown
---
name: writing-a-status-update
description: Use when drafting a recurring stakeholder update (status, weekly report, EOY recap)
kind: content
audience: knowledge-worker
ai-tools: any
complexity: simple
time: 5 min
version: 0.1.0
source: personal
---

# Writing a Status Update
...
```

(Full body matches the template structure.)

## Total time

About 8 minutes from first message to saved file. Much of that is the user articulating the constraints; the interviewer asks 4 questions total because Stage 0 extraction handled most.
