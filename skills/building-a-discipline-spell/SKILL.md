---
name: building-a-discipline-spell
description: Use when the meta-builder routes to kind=discipline. Generates a discipline spell with the rule, excuses table, warning signs, and hard gates.
kind: workflow
audience: anyone
ai-tools: any
complexity: guided
time: 15-25 min
version: 1.0.0
source: bundled
---

# Building a Discipline Spell

## What this does

Specialist builder for `kind: discipline` spells. A discipline is a non-negotiable rule the agent (or the user) keeps slipping on. This skill produces a SKILL.md tuned to enforce the rule against the agent's own rationalization.

## When to use

- Routed to from `building-a-spell` Stage 2 when `kind: discipline`
- User describes a "rule I keep skipping" or "I want the AI to never do X"

## What you bring (Inputs)

- The non-negotiable rule (one sentence)
- Why it matters (the cost of skipping)
- The rationalizations used to skip it
- The user's domain

## What you get (Output)

A draft SKILL.md with all required discipline sections, ready for `pressure-testing-a-spell` to harden.

## How it works (Steps)

This is a workflow chain. Stages are explicit.

## Stages

### Stage 1: Sharpen the rule

If the rule has any of these words, push back: "should", "try to", "consider", "when possible", "usually". A discipline rule is a hard rule.

Re-write the rule until it's:
- One sentence
- Imperative voice
- Verifiable (you can tell from output whether it was followed)

### Stage 2: Inventory the excuses

Ask the user (or extract from prior turns):

- "What's the exact thing you (or the AI) tells yourself when about to skip this rule?"

Capture verbatim. Don't paraphrase. Aim for 4-6 excuses.

For each excuse, write the counter — sharp enough to actually stop the action.

### Stage 3: List the warning signs

What patterns in the agent's own reasoning would predict the rule is about to break? Examples:

- "About to claim done without verifying"
- "About to write code without opening the test file"
- "Reasoning includes the words 'obviously' / 'just' / 'trivially'"

These warning signs let the agent self-detect.

### Stage 4: Place the hard gate

Identify the latest possible moment in the workflow where the rule could be enforced. Place a `<MUST-STOP>` block there with explicit "if this isn't true, STOP" language.

Discipline skills have ONE gate, placed late. Multiple gates dilute the effect.

### Stage 5: Invoke `pressure-testing-a-spell`

Hand off the draft to `pressure-testing-a-spell`. That skill orchestrates the discipline-mode tester (which runs the baseline + with-skill comparison).

### Stage 6: Refine based on tester output

If the tester returns NEEDS-REFINEMENT, the typical fixes are:

- Rationalization slipped through → add it to the Excuses and Counters table verbatim
- Warning sign missed → add the missing pattern
- Gate fired too late → move it earlier
- Gate fired but agent rationalized past it → strengthen the gate language ("STOP" → "STOP. The rule says X. Do that now.")

### Stage 7: Hand back to meta-builder

Return the PASSing draft. Meta-builder takes over for save.

## Checkpoints

- **After Stage 1**: rule passes the sharpness check
- **After Stage 2**: at least 4 excuses with counters
- **After Stage 3**: at least 3 warning signs
- **After Stage 4**: exactly one `<MUST-STOP>` gate in the body
- **After Stage 5**: tester returned a verdict
- **After Stage 6**: tester returns PASS

## Loop-back conditions

Return to Stage 2 when the tester finds a rationalization not in the table.
Return to Stage 4 when the gate is being rationalized past.
Return to Stage 1 when the tester finds the rule itself is too soft to enforce.

## Quality bar

The draft is good enough when:

- Rule passes the sharpness check (no soft words)
- Excuses table covers every rationalization the tester surfaced
- Warning signs are specific patterns, not vague ("be careful")
- One hard gate, late in the flow, with sharp language
- Tester returns PASS

## Variations

- **Domain-specific discipline**: include domain-specific excuses (e.g., for researchers: "everyone in the field knows this")
- **Subagent discipline**: add `<SUBAGENT-STOP>` at top to prevent recursive enforcement

## Example

See `skills/building-a-spell/examples/example-discipline.md` for a full walkthrough of building `verifying-before-citing`.
