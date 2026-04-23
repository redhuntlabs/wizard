---
name: building-a-spell
description: Use when the user wants to capture a repeatable task as a reusable spell, or asks "how do I build a workflow / skill / framework for X"
kind: workflow
audience: anyone
ai-tools: any
complexity: guided
time: 10-30 min per spell
version: 1.0.0
source: bundled
---

# Building a Spell

## What this does

Interviews the user about a task they do repeatedly, then writes a spell file (a SKILL.md) that captures it. Future sessions auto-invoke that spell whenever the trigger matches.

This skill is the meta-builder. It calls other skills (`intuitive-interviewing`, kind-specific builders, `pressure-testing-a-spell`) and dispatches the `spell-tester` subagent.

## When to use

- User describes a task they do over and over and asks to capture it
- User says "build a workflow / skill / spell for X"
- User shows you a process and says "I want this systematized"
- User wants the AI to behave the same way every time they hit a certain trigger

## What you bring (Inputs)

- A description of the task (one or two sentences is enough)
- Your domain (research, ops, writing, dev, etc.) — inferred if not stated
- Any constraints (time budget, tools available, style preferences)

## What you get (Output)

A new spell file at `$WIZARD_HOME/<category>/<name>/SKILL.md`, validated and tested.

## How it works (Steps)

This is a workflow chain. The stages below are the master flow.

## Stages

### Stage -1: Inference prelude (conditional)

Skip this stage entirely if no transcript was supplied (the default `/build-spell` flow).

If invocation came with `--from-transcript <path>` OR was routed through `/capture-this-chat`, the input includes a transcript blob plus provenance.

In that case:

1. Invoke `inferring-a-spell-from-examples` (passes the transcript + provenance).
2. The inference skill produces either:
   - A `BUILDABLE` outcome → context dictionary + draft `SKILL.md`. Resume at **Stage 2** (kind-route) with kind already set. Skip Stage 0 and Stage 1 entirely.
   - A `TOO-THIN` or `TOO-BROAD` outcome → halt with the inference skill's user-facing message. Do not enter Stages 0–4.
   - A user choice of "Re-do as interview" (bail) → resume at **Stage 1** with the inferred fields as pre-filled defaults. Stage 1's batch-confirm still runs; user can accept-with-Enter or correct.

**Output handed to next stage**: same shape as Stage 1's output (context dictionary + filled-out interview).

### Stage 0: Context extraction

Parse what the user already gave you. Pull out:

- Implied `name` (lowercase-hyphenated, derived from the task verb + object)
- Implied `kind` (use the kind-routing table below)
- Implied `audience` (default `anyone` unless context says otherwise)
- Implied `complexity` (default `simple` unless multi-stage/multi-tool)
- Any examples mentioned

Then **batch-confirm** the extracted fields in a single message: "I heard X, Y, Z — change anything?" Do NOT re-ask what was already answered.

**Output handed to next stage**: a context dictionary.

### Stage 1: Pick depth and check for shape match

Invoke `intuitive-interviewing` and pass it the context dictionary. It chooses depth (Express / Standard / Deep) and checks the workflow-shapes library at `skills/building-a-spell/workflow-shapes/`.

If a shape matches, propose it as a strawman: "This looks like a `<shape>` — here's a draft. What needs to change?"

If no shape matches, fall through to a relevance-filtered interview that skips already-answered questions.

**Output handed to next stage**: a filled-out interview (kind, audience, complexity, inputs, outputs, steps, quality bar).

### Stage 2: Kind-route to specialist builder

Read the `kind` field from Stage 1 output:

| Kind | Specialist builder |
|---|---|
| `content` | (continue inline; content is the simplest case) |
| `workflow` | `building-a-workflow-spell` |
| `discipline` | `building-a-discipline-spell` |
| `subagent` | `building-a-subagent-spell` |

Invoke the specialist (if any) and let it produce the draft SKILL.md. For `content`, draft inline using the template at `templates/spell-template.md`.

**Output handed to next stage**: a complete draft SKILL.md (in memory, not yet saved).

### Stage 3: Try-it (NON-SKIPPABLE — Iron Law)

Dispatch the `spell-tester` subagent (see `agents/spell-tester.md`) with:

- The full draft text
- The user's stated goal
- The user's domain
- Up to 2 examples from the interview

The tester returns one of three verdicts:

| Verdict | Action |
|---|---|
| `PASS` | Proceed to Stage 4 |
| `NEEDS-REFINEMENT` | Loop back to Stage 1 with the tester's specific gaps |
| `SCOPE-CHANGED` | Pivot — see "Mid-interview pivots" below |

**Output handed to next stage**: a PASSing draft + tester verdict text.

### Stage 4: Save to WIZARD_HOME

Write the draft to `$WIZARD_HOME/<category>/<name>/SKILL.md`. Default category is `personal/` unless the user named one.

If the file exists, prompt for choice (overwrite / new name / new version / cancel) — never silent overwrite.

Print the full path saved and a one-line how-to-use.

**Output handed to next stage**: the saved file path.

## Checkpoints

Pass each stage gate only when:

- **After Stage 0**: user has confirmed the extracted context (or corrected it)
- **After Stage 1**: every required frontmatter field has a value
- **After Stage 2**: draft SKILL.md exists in memory and includes all required body sections (validator-equivalent check)
- **After Stage 3**: tester returned `PASS`
- **After Stage 4**: file is written and `validate-spell.js` exits clean

## Loop-back conditions

Return to Stage 1 when:

- Tester returns `NEEDS-REFINEMENT`
- User adds context mid-interview that invalidates Stage 0's extraction
- A workflow shape was wrongly selected (mismatched outputs)

## The Iron Law

The try-it phase (Stage 3) is non-skippable. No exceptions. No exemption for "it's obviously fine." No exemption for "the user is in a hurry."

**The Iron Law applies equally to inference-built skills.** Stage 3 try-it must run regardless of how the draft was produced.

### Forbidden excuses

| If you think... | Reality |
|---|---|
| "It's obviously fine" | Obvious things have subtle bugs. Run try-it. |
| "Too simple to test" | Simple skills get used wrong most often. Run try-it. |
| "I'll test it later" | Later is when the user is depending on it. Run try-it now. |
| "I already manually checked" | Mental verification is unreliable. Run try-it. |
| "I'll fix it next time" | Next time is too late. Run try-it. |

All forbidden excuses get the same response: **Run try-it. No exceptions.**

<MUST-STOP>
Before saving any spell to `$WIZARD_HOME`, the tester must have returned `PASS`. If you are about to save without a `PASS` verdict in the conversation history, STOP. Run try-it.
</MUST-STOP>

## The Batch Iron Law (Second Iron Law)

When the user asks to build multiple spells in one session: complete one spell end-to-end (Stages 0 through 4) before starting the next.

### Forbidden excuses

| If you think... | Reality |
|---|---|
| "I'll batch the interviews and test them all at the end" | Batched testing dilutes attention. Each one needs full focus. |
| "They share context so I can save tokens" | Token savings are illusory; quality cost is real. Finish each. |
| "Let me draft all three first, then iterate" | Drafting in batch encourages copy-paste defects. One at a time. |

All forbidden excuses get the same response: **Finish this one through save. Then start the next.**

## Mid-interview pivots

If during Stage 3 the tester returns `SCOPE-CHANGED`, pause. Check what shifted:

- **Two spells in disguise**: split. Build the most-pressing one first; queue the other.
- **Wrong audience**: re-route via `intuitive-interviewing` with the corrected audience.
- **Wrong kind**: kind-route again at Stage 2.
- **Out-of-scope**: tell the user, suggest the closest existing spell or chain.

## Quality bar

A built spell passes when:

- `validate-spell.js` exits 0 with no warnings (or has a documented exception)
- Tester returned `PASS`
- File is saved to `$WIZARD_HOME` (never bundled `spells/`)
- The next session can invoke it via the 1% rule by description match alone

## Variations

- **Express mode** (Stage 1 picks it): one-question interview, single shape, fast turnaround. Best for content kind.
- **Deep mode** (Stage 1 picks it): full 12-question interview. Best for discipline kind or first-time users.
- **Re-build from existing**: user has a sketch — start at Stage 1 with the sketch as the strawman.

## Example

**Input**: "I want to capture how I draft cold outreach emails to investors."

**Stage 0**: Extracted: `name: writing-investor-cold-outreach`, `kind: content`, `audience: founder`, `complexity: simple`. Confirmed with user.

**Stage 1**: Shape match: `personalized-outbound-message`. Strawman shown. User adjusts: "add a 2-line subject-line section."

**Stage 2**: Content kind, drafted inline.

**Stage 3**: Tester runs 3 scenarios (different investor types). Verdict: PASS.

**Stage 4**: Saved to `~/.wizard/work/writing-investor-cold-outreach/SKILL.md`.

Output: "Saved. Next time you say 'help me cold-email an investor', this spell will fire automatically."
