---
name: intuitive-interviewing
description: Use when conducting any interview-style flow with a user (building a spell, refining one, gathering requirements). Picks depth, filters questions by relevance, matches against known shapes, and detects mid-stream pivots.
kind: workflow
audience: anyone
ai-tools: any
complexity: guided
time: 5-15 min
version: 1.0.0
source: bundled
---

# Intuitive Interviewing

<!-- token-budget-exception: 7 capabilities (context extraction, depth selection, shape match, relevance filter, strawman, pivots, examples) require detailed coverage -->

## What this does

Turns a 12-phase interview into a context-aware conversation. Detects what the user already said, picks the right depth, matches against known workflow shapes, drafts a strawman early, and pivots when scope shifts.

## When to use

- Inside `building-a-spell` (Stage 1)
- Inside `refining-a-spell` (when capturing what changed)
- Anywhere a user-facing requirements interview happens

## What you bring (Inputs)

A context dictionary from the calling skill, containing whatever was already extracted (from the user's trigger phrase + any prior turns).

## What you get (Output)

A filled interview: every required frontmatter field has a value, every required body section has content, plus any kind-specific extras.

## How it works (Steps)

This is a workflow with explicit stages and gates.

## Stages

### Stage A: Pick depth

Inspect the context dictionary. Pick depth as follows:

| If... | Use depth |
|---|---|
| User explicitly said "quick", "simple", "just" | Express |
| Context dictionary has 4+ extracted fields already | Express |
| Kind is `discipline` | Deep (always) |
| User is first-time (no `$WIZARD_HOME` content) | Standard |
| Otherwise | Standard |

Allow user override: "Tell me which depth you'd like (express / standard / deep)" — but only if depth was ambiguous.

**Output handed to next stage**: chosen depth.

### Stage B: Match against workflow shapes

Read all shapes under `skills/building-a-spell/workflow-shapes/`. Score each by overlap of:
- Trigger keywords vs context dictionary's `name` and `description`
- Output type vs context dictionary's `output`
- Step count and shape

If top score >= 0.7, propose it as a strawman:

> "This looks like a `<shape-name>`. Here's a draft. What would you change?"

If top score < 0.7, skip to Stage C.

**Output handed to next stage**: strawman draft (or none).

### Stage C: Relevance-filtered question pass

Use the question pool at `skills/building-a-spell/interview-questions.md`. For each question in the depth's "Always ask" list:

- Is it already answered by context or strawman? **Skip.**
- Is it answered by inference from a related answer? **Confirm in passing, don't ask separately.**
- Otherwise, ask it.

For "Conditionally ask" questions, ask only when the trigger condition fires.

For "Skip" questions, never ask in this depth.

**Hard rule**: Never ask the user a question whose answer is already in the conversation. This is the #1 reason interviews feel rote.

**Output handed to next stage**: a complete interview record.

### Stage D: Detect mid-stream pivot

After every user response, check:

| Pivot signal | Action |
|---|---|
| User says "actually let's also do X" | Likely two spells — split now |
| User answers in a way that contradicts an earlier extraction | Pause, confirm, update context |
| User shifts audience ("oh, this would also be for my whole team") | Re-route via Stage A with new audience |
| User shifts kind (mentions a rule when describing content) | Confirm: "This sounds like a discipline kind. Want to switch?" |

**Output handed to next stage**: optionally re-routed flow.

### Stage E: Confirm and hand back

Show the user the complete interview record, ask "anything to change?", then hand back to the caller.

## Checkpoints

Pass each stage gate only when:

- **After A**: depth is set
- **After B**: strawman either accepted-with-deltas or explicitly skipped
- **After C**: every required field has a value
- **After D**: no unresolved pivot signals
- **After E**: user confirmed (or explicitly declined to confirm)

## Loop-back conditions

Return to Stage A when:

- A pivot in Stage D changes the kind or depth significantly
- The strawman in Stage B was wrong shape — re-run Stage B with the corrected output type

## The Batch Iron Law (Second Iron Law)

When the calling skill is building multiple spells in one session, complete one spell end-to-end (interview → strawman → try-it → save) before starting the next interview. The interview for spell N+1 cannot start until spell N has reached "saved" state.

### Forbidden excuses

| If you think... | Reality |
|---|---|
| "I'll batch the interviews and test them all at the end" | Interviews need test feedback to refine. Sequence them. |
| "They share context so I can save tokens" | Token savings are illusory; quality cost is real. |
| "Let me draft all three first, then iterate" | Drafting in batch encourages copy-paste defects. |

All forbidden excuses get the same response: **Finish this one through save. Then start the next.**

## Quality bar

The interview is good enough when:

- Every required frontmatter field is filled
- Every required body section has content
- The user has not been asked a question whose answer they already gave
- Strawman was offered if any shape matched at 0.7+
- Mid-stream pivots, if any, were named explicitly and the user agreed to the new direction

## Variations

- **Re-interview after refine**: skip Stage B (no strawman); start at Stage C with the existing skill as base context.
- **Headless mode**: when called by another skill (not user-facing), all stages run silently from a structured input.

## Example

Context dictionary on entry:
```
{name: "preparing-for-a-meeting", kind: "workflow",
 audience: "knowledge-worker", complexity: "guided"}
```

- **Stage A**: Picks Standard. Two extracted fields, knowledge-worker audience.
- **Stage B**: Workflow-shape match: `pre-meeting-prep` at 0.85. Strawman shown.
- **Stage C**: Asks 3 questions (the strawman covered the rest).
- **Stage D**: User adds "and also for 1:1s" mid-flow. Confirmed: still one spell; widen scope of `When to use`.
- **Stage E**: Confirmed. Handed back to caller.

Total interview: 4 messages. Felt like a chat, not a form.
