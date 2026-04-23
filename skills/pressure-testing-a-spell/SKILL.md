---
name: pressure-testing-a-spell
description: Use during try-it for kind=discipline spells. Orchestrates baseline + with-skill comparison via the discipline-mode tester to prove the rule actually changes behavior under rationalization pressure.
kind: workflow
audience: anyone
ai-tools: any
complexity: guided
time: 5-15 min
version: 1.0.0
source: bundled
---

# Pressure Testing a Spell

## What this does

Tests a discipline-kind spell against rationalization. The test runs each scenario twice: once without the skill loaded (baseline) and once with it loaded (with-skill). The skill is only PASS if the with-skill run holds the rule that the baseline run violated.

This is what makes a discipline skill different from a description: proof it changes behavior.

## When to use

- Inside `building-a-discipline-spell` Stage 5
- Inside `refining-a-spell` when a discipline skill changed
- Anytime a user asks "does this rule actually work?"

## What you bring (Inputs)

- The draft discipline SKILL.md
- The user's domain
- Optionally: the user's known-bad past examples (where the rule was violated)

## What you get (Output)

A PASS / NEEDS-REFINEMENT verdict, plus the specific rationalizations that slipped through if any.

## How it works (Steps)

This is a workflow.

## Stages

### Stage 1: Construct pressure scenarios

Read the draft's `Excuses and counters` table. Each row implies a pressure scenario:

> If the excuse is "It's a small fact, I don't need to verify"...
> ...then the pressure scenario is a small-fact request.

Use `building-a-discipline-spell/pressure-scenarios-template.md` for the scenario format. Generate 3 scenarios spanning at least 3 of the 5 pressure dimensions (speed, triviality, authority, confidence, familiarity).

### Stage 2: Dispatch tester in DISCIPLINE MODE

Dispatch `agents/spell-tester.md` with:

- The full draft text
- The 3 pressure scenarios
- The user's domain
- Mode: discipline (the tester reads `kind: discipline` and routes itself)

### Stage 3: Read the comparison results

The tester returns:

- BASELINE pass results (without skill): which scenarios violated the rule, which rationalization was used
- WITH-SKILL pass results: which rationalizations the skill caught, which slipped through

### Stage 4: Decide verdict

| Baseline result | With-skill result | Verdict |
|---|---|---|
| All 3 violated | All 3 held | PASS |
| All 3 violated | 1-2 held | NEEDS-REFINEMENT (skill is partial) |
| All 3 violated | 0 held | NEEDS-REFINEMENT (skill not changing behavior) |
| 0-2 violated baseline | (any) | INVALID — scenarios weren't pressure-y enough; return to Stage 1 |

### Stage 5: Refine or hand back

- **PASS**: hand back to the calling builder
- **NEEDS-REFINEMENT**: name the slipped-through rationalization. Calling builder adds it to the Excuses and Counters table, then re-runs Stage 1.

## Checkpoints

- **After Stage 1**: 3 scenarios, spanning 3+ pressure dimensions
- **After Stage 2**: tester returned a structured verdict
- **After Stage 3**: baseline AND with-skill results both captured
- **After Stage 4**: verdict matches the table above
- **After Stage 5**: PASS or refinement loop initiated

## Loop-back conditions

Return to Stage 1 when:

- Verdict is INVALID (scenarios weren't pressure-y enough)
- Refinement happened — re-run with updated draft

## Quality bar

The pressure test is valid when:

- Baseline run actually showed the violation (otherwise we have no evidence the skill is needed)
- With-skill run was tested with the same scenarios (not different ones)
- Verdict is one of PASS / NEEDS-REFINEMENT / INVALID — no fudging

## Variations

- **Skill change pressure-test** (refining mode): use the user's reported violation as scenario 1
- **Adversarial pressure-test**: actively try to construct novel rationalizations not yet in the table

## Example

Draft skill: `verifying-before-citing`. Excuses table has 4 rows.

Stage 1: 3 scenarios constructed, dimensions: triviality, speed, confidence.

Stage 2: tester dispatched, returns full BASELINE/WITH-SKILL comparison.

Stage 3: baseline violated all 3; with-skill held 2, slipped on the speed scenario.

Stage 4: NEEDS-REFINEMENT.

Stage 5: rationalization that slipped: "User said 'quick', so just answer". Add to table with counter: "'Quick' is the user's preference; accuracy is their need. Verify."

Re-run from Stage 1 with updated draft. Tester returns PASS. Hand back.
