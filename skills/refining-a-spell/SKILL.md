---
name: refining-a-spell
description: Use when an existing spell needs improvement based on usage. Captures what changed, re-runs the tester (mandatory), bumps the version, and saves.
kind: workflow
audience: anyone
ai-tools: any
complexity: guided
time: 5-15 min
version: 1.0.0
source: bundled
---

# Refining a Spell

<!-- token-budget-exception: refinement requires re-test (with forbidden excuses), semver, conflict-handling, and discipline-mode notes -->

## What this does

Updates an existing spell in the user's library. Walks through the diff, re-runs the tester (this is non-skippable), bumps the version field, and saves.

## When to use

- User invoked `/refine-spell <name>`
- User says "this skill needs to also handle X"
- A spell's tester verdict changes (e.g., a new edge case found in production use)

## What you bring (Inputs)

- The name of the spell to refine
- What needs to change (and ideally why — what failed in real use)

## What you get (Output)

The updated SKILL.md, validated, re-tested, and saved with bumped version.

## How it works (Steps)

This is a workflow.

## Stages

### Stage 1: Load the current version

Find the spell in `$WIZARD_HOME` (preferred) or bundled `spells/`. If it's bundled and not yet overridden, copy it to `$WIZARD_HOME/personal/<name>/` first — never modify the bundled file.

### Stage 2: Capture the diff

Ask: "What needs to change?" and "What real situation showed you this was needed?"

The "what real situation" question is required. A refinement without a real-world trigger is speculative — push back: "Want to wait until you hit a real case?"

### Stage 3: Apply the change

Edit the SKILL.md. Common changes:

- New step → add to `How it works (Steps)` and to `Quality bar`
- New variation → add to `Variations`
- Better example → swap the Example block
- New rationalization (discipline) → add to `Excuses and counters`
- New input → update `What you bring (Inputs)` and add a step to capture it

### Stage 4: Re-run the tester (NON-SKIPPABLE)

Any change requires re-test. The kind of test depends on the kind:

| Kind | Test |
|---|---|
| `content`, `workflow`, `subagent` | Standard mode tester on 2-3 scenarios |
| `discipline` | `pressure-testing-a-spell` with at least one scenario that exercises the change |

### Forbidden excuses (re-test is non-skippable)

| If you think... | Reality |
|---|---|
| "It's a tiny wording change" | Tiny changes shift behavior. Re-test. |
| "I already manually verified" | Re-test. |
| "The previous version passed" | The previous version is no longer the current version. Re-test. |
| "I'll re-test next time" | Re-test now. |

All forbidden excuses get the same response: **Re-test. No exceptions.**

<MUST-STOP>
Before saving any refined spell, the tester must have returned PASS for the new version. If you are about to save without a fresh PASS, STOP. Re-test.
</MUST-STOP>

### Stage 5: Bump the version

Apply semver:

- Wording-only change → PATCH (1.0.0 → 1.0.1)
- New optional capability → MINOR (1.0.0 → 1.1.0)
- Removed step or changed required input → MAJOR (1.0.0 → 2.0.0)

If the current version is 0.x.y and the user has used this spell 3+ times successfully, prompt: "Bump to 1.0.0?"

### Stage 6: Save and confirm

Write to `$WIZARD_HOME/<category>/<name>/SKILL.md`. Show the user the diff summary and the new version.

## Checkpoints

- **After Stage 1**: file loaded; if from bundled, copy to personal first
- **After Stage 2**: diff captured; real situation named
- **After Stage 3**: edits applied
- **After Stage 4**: tester returned PASS for the new version
- **After Stage 5**: version bumped per semver rules
- **After Stage 6**: file saved; diff summary shown

## Loop-back conditions

Return to Stage 3 when:

- Tester returns NEEDS-REFINEMENT — apply the suggested fix
- Tester returns SCOPE-CHANGED — pivot via `intuitive-interviewing`

## Quality bar

The refinement is good enough when:

- The change is documented in the user's words (so future-them remembers why)
- A fresh PASS verdict exists for the new version (not assumed from old version)
- Version bump matches the change type (no MAJOR for typo fixes; no PATCH for new steps)

## Variations

- **Bug-fix refinement** (something was wrong): name the bug in a comment in the SKILL.md
- **Generalization refinement** (works for more cases now): add the new variations explicitly
- **Sharpening refinement** (was too vague): tighten Quality bar criteria

## Example

User: "My `writing-a-status-update` skill keeps including too much detail when I'm in a hurry. Make it shorter."

- Stage 1: Load `~/.wizard/work/writing-a-status-update/SKILL.md`.
- Stage 2: Real situation: "Today's update was 7 bullets when manager wanted 3."
- Stage 3: Add "rush mode" variation: "Trim to 3 bullets max; only wins + asks."
- Stage 4: Tester runs 2 scenarios in rush mode. PASS.
- Stage 5: MINOR bump (new optional variation). 1.0.0 → 1.1.0.
- Stage 6: Saved. Showed diff summary.
