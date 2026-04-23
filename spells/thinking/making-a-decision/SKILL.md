---
name: making-a-decision
description: Use when picking between options - produces a recommendation with explicit alternative considered and reason rejected
kind: workflow
audience: anyone
ai-tools: any
complexity: simple
time: 10-30 min
version: 1.0.0
source: bundled
---

# Making a Decision

## What this does

Produces a written decision with the criteria, the options scored, the recommendation, the runner-up, and the reason the runner-up lost. Documents what would change your mind.

## When to use

- Picking between two or more concrete options
- Documenting a decision so future-you (or your team) remembers why
- Closing out a comparison that's been dragging
- Any decision worth more than 30 minutes of consideration

## What you bring (Inputs)

- The decision (one sentence: "should I X or Y")
- The criteria that matter (3-5)
- The options under consideration (2+)

## What you get (Output)

A written decision document: criteria + scoring + recommendation + alternative + reversal trigger.

## How it works (Steps)

This is a workflow.

## Stages

### Stage 1: State the decision

In one sentence. ("Should I X or Y.")

### Stage 2: List the criteria

3-5 criteria, weighted (numeric or simple high/med/low).

### Stage 3: Score each option

Score every option against every criterion. A 3-option, 4-criterion grid is enough.

### Stage 4: Pick the winner

Based on the score, name the winner.

### Stage 5: Name the strongest runner-up

Explicitly name the second-best option.

### Stage 6: Reject the runner-up explicitly

State: "I considered [runner-up] and rejected it because [reason]." The reason must be specific (cite criteria, not "it wasn't as good").

### Stage 7: State the reversal trigger

"I would change my mind if [concrete event or metric]." The trigger must be observable.

## Checkpoints

- **After Stage 2**: at least 3 criteria
- **After Stage 3**: every option scored against every criterion
- **After Stage 6**: rejection reason cites specific criteria
- **After Stage 7**: reversal trigger is concrete (metric, date, or observation)

## Loop-back conditions

- If Stage 3 reveals a missing criterion, return to Stage 2 and add it
- If Stage 6 cannot produce a real reason, the decision is not ready — the winner and runner-up may be too close; add a tiebreaker criterion in Stage 2

## Quality bar

- At least 2 options, scored
- At least 3 criteria
- Step 6 names a real reason, not "the winner was better"
- Step 7 is concrete (a metric, a date, an observation)

## Variations

- **Reversible decision**: shorter; only need 2 criteria and a trial period
- **High-stakes decision**: add a "kill criterion" — what makes you abandon the chosen option
- **Hire / no-hire**: replace criteria with "must-haves" + "nice-to-haves"
- **Vendor selection**: criteria include cost, lock-in, support quality, integration fit

## Example

**Input**: Pick between two analytics vendors: Acme and Beta.

**Output**:

> **Decision**: Pick Acme as our analytics vendor.
>
> **Criteria** (weighted 1-3):
> - Price (3): Acme $40k/yr, Beta $25k/yr
> - Integration with our stack (3): Acme native, Beta needs adapter
> - Time to first dashboard (2): Acme 1 day, Beta 1 week
> - Support quality (2): both 8/10
> - Future-proofing (1): Acme hot, Beta cooling
>
> **Scoring**: Acme wins on integration, time-to-first-dashboard, future-proofing. Beta wins on price.
>
> **Recommendation**: Acme.
>
> **Considered alternative**: Beta. Rejected because integration cost would erase the price advantage in year 1, and the slower time-to-first-dashboard delays our Q3 reporting commitment.
>
> **Would change mind if**: Acme raises price by >40% at renewal, OR Beta releases native integration before we sign.
