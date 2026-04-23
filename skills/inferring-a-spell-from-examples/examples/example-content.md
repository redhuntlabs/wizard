# Worked Example — Content Skill (Email Drafting)

End-to-end inference from `tests/inference-fixtures/transcripts/01-content-email-drafting.md`.

## 1. Input transcript (12 turns; middle collapsed)

> ## Turn 1 — User
> I need to email my landlord. The bathroom radiator has been leaking for two weeks, I've called twice with no callback, and I want it fixed before the weekend. The audience here is a property manager who is friendly in person but ignores informal texts. Please draft something firm but polite.
>
> ## Turn 2 — Agent
> Here is a first draft:
> > Subject line: Bathroom radiator — repair request, follow-up #3
> > Hi Marco, …
> > I wanted to follow up on the radiator leak in the bathroom of apartment 4B. …

## … (turns 3–10 collapsed: 4 draft → revise cycles on tone, deadline phrasing, paragraph length, and opener personalization) …

> ## Turn 11 — User
> Perfect. Send it.
>
> ## Turn 12 — Agent
> Sending now. Final version:
> > Subject line: Following up on the bathroom radiator
> > Hi Marco, hope Lucia's first weeks of kindergarten have been going smoothly. …

## 2. Pass 1 — Suitability check

```yaml
outcome: BUILDABLE
reason: |
  10 substantive turns (turns 1–10; turns 11–12 are the send-confirmation pair).
  Clear repeating pattern: user provides a constraint → agent revises one part of
  the draft → user accepts or constrains again. Five distinct revision cycles
  (tone, subject line, deadline phrasing, paragraph length, personalized opener),
  all on a single artifact. Single coherent task — not too thin, not too broad.
```

→ Continue to Stage 2.

## 3. Pass 2 — Context dictionary

Kind detection prompt shown to user:

> *"This looks like a `content` skill (vs `workflow`). Confirm? \[C/w]"*

User: `C` (confirms).

```yaml
name: drafting-polite-firm-emails
kind: content
audience: anyone
complexity: simple
inputs:
  - recipient (with relationship context)
  - situation
  - the ask and any deadline
  - tone constraint (e.g. "firm but polite")
outputs:
  - email body
  - subject line (≤ 50 chars)
steps:
  - "Restate the ask and the deadline in your own words before drafting"
  - "Draft with neutral-warm tone — firm on the ask, soft on the opener"
  - "Open with one specific personal detail when the recipient is known"
  - "Format for phone: 2–3 sentence paragraphs, blank line between"
  - "Keep the subject line under 50 characters and free of passive-aggressive markers (no '#3', no 'URGENT')"
quality_bar: |
  Recipient would feel respected, not lectured. Deadline reads as a real ask,
  not a wish ("by Saturday" — never "if at all possible").
```

## 4. Pass 3 — Draft SKILL.md

```markdown
---
name: drafting-polite-firm-emails
description: Use when drafting an email that needs a firm ask but a warm tone — landlord requests, vendor follow-ups, polite escalations. Produces a phone-readable email with a clean subject line.
kind: content
audience: anyone
ai-tools: any
complexity: simple
time: 2-5 min
version: 0.1.0
source: inferred
---

# Drafting Polite, Firm Emails

## What this does

Drafts an email that holds a firm ask (a deadline, a fix, a decision) without
sounding clipped or legalistic. Tuned for recipients you have a real relationship
with but who ignore informal pings.

## When to use

- You need something done by a date and the previous channel was ignored
- The recipient is a known human (not a faceless support queue)

## What you bring (Inputs)

- Recipient name + one specific personal detail (recent thing they mentioned)
- The situation in one or two sentences
- The ask and the deadline

## What you get (Output)

A short email (≤ 4 paragraphs of 2–3 sentences each) with a subject line under
50 characters that does not contain `#3`, `URGENT`, or `follow-up`.

## How it works (Steps)

1. Restate the ask and the deadline back to yourself before writing.
2. Open with one specific detail, not "hope you're well."
3. State the situation in one short paragraph.
4. State the ask with the date — no hedging words ("if possible", "when you can").
5. Close with one offer (availability, alternative, etc.) and a thanks.
6. Re-check the subject line: under 50 chars, no passive-aggression.

## Quality bar

Recipient would feel respected, not lectured. The deadline reads as a real ask.

<!-- inferred-from: tests/inference-fixtures/transcripts/01-content-email-drafting.md -->
<!-- inferred-at: 2026-04-24T10:00:00Z -->

> _Inferred from `01-content-email-drafting.md` on 2026-04-24. Quoted segments preserved verbatim._
```

Validator gate: passes (0 errors). Strawman shown.

## 5. User response

```
approve
```

## 6. Hand-off

Handed to `building-a-spell` Stage 2 with `kind=content`. The
`building-a-content-spell` specialist took over from there.
