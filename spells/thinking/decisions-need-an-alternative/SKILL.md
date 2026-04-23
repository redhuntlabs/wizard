---
name: decisions-need-an-alternative
description: Use when about to recommend or commit to a decision - forces naming an alternative considered and the reason it lost
kind: discipline
audience: anyone
ai-tools: any
complexity: simple
time: 2-5 min added to any decision
version: 1.0.0
source: bundled
---

<SUBAGENT-STOP>
If you were dispatched as a subagent for a specific task, skip this skill and complete your assigned task. The parent already invoked discipline.
</SUBAGENT-STOP>

# Decisions Need an Alternative

## What this does

Forces every decision to name at least one explicit alternative that was considered and the reason it lost. Prevents the "obvious choice" trap that's the source of most preventable bad calls.

## When to use

- About to recommend an option to someone
- About to commit to a path
- About to close out a comparison
- About to tell someone "let's do X"

## What you bring (Inputs)

- The decision being made
- The recommended option

## What you get (Output)

The decision PLUS an explicit "considered alternative" with reason rejected.

## How it works (Steps)

This is a discipline. The behavioral structure is: a non-negotiable rule (below), an excuses-and-counters table to defeat rationalizations, warning signs to spot the moment of risk, and a hard gate that fires before declaring the decision. Apply the gate at every decision; name an alternative or pause.

## The non-negotiable rule

No decision is final without naming at least one alternative considered and the specific reason it was rejected.

## Excuses and counters

| If you think... | Reality |
|---|---|
| "There's an obvious choice" | "Obvious" is the rationalization that costs the most. Name an alternative. |
| "I considered alternatives in my head" | If they're not written down, they don't count. Write them. |
| "We're in a hurry" | The cost of a bad decision is bigger than the cost of writing one alternative. |
| "There's no real alternative" | "Do nothing" is always an alternative. So is "wait a week." Name one. |
| "Everyone agrees on this" | Universal agreement is a warning sign, not a green light. Name the dissent. |
| "This is reversible, doesn't need rigor" | Reversible decisions still benefit from one named alternative. 30 seconds. |

## Warning signs

- Reasoning includes "obviously," "clearly," "the answer is"
- You're recommending something without having to think about why
- You feel time pressure to skip the comparison
- Everyone in the room nodded immediately
- You can't say what would have been a reasonable second-best

## Hard gates

<MUST-STOP>
Before declaring a decision (in writing or out loud), name at least one alternative
you considered and the specific reason it lost. If you cannot, you have not
made the decision yet — you have made an assumption. Stop and consider one alternative now.
</MUST-STOP>

## Quality bar

- An alternative is named (not "I considered other options")
- The reason it lost is specific (cites the criteria, not "it wasn't as good")
- The alternative is plausible — not a strawman set up to lose
- "Do nothing" or "wait" was considered if both could work

## Variations

- **Big decision**: name 2 alternatives
- **Reversible**: 1 alternative + a trial period
- **Group decision**: each major participant should be able to name an alternative; if they all name the same one, that's a healthy sign

## Example

**Without skill**: "We should switch to vendor Acme."

**With skill**: STOP. Name an alternative. "We could stay with current vendor Beta and renegotiate. We rejected this because Beta's last proposal increased price by 30% with no roadmap concessions, and the renegotiation would consume Q3 cycles we need elsewhere." Now declare the decision: switch to Acme.
