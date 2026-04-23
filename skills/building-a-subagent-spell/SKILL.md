---
name: building-a-subagent-spell
description: Use when the meta-builder routes to kind=subagent. Generates a spell that dispatches one or more subagents to do work in parallel or in isolation.
kind: workflow
audience: anyone
ai-tools: any
complexity: guided
time: 15-25 min
version: 1.0.0
source: bundled
---

# Building a Subagent Spell

## What this does

Specialist builder for `kind: subagent` spells. A subagent spell dispatches one or more helper agents — each with no context but what you hand it — and aggregates their results.

Used when: the work has independent pieces that can run in parallel, or when the work needs isolation from the main conversation.

## When to use

- Routed to from `building-a-spell` Stage 2 when `kind: subagent`
- User describes work that has multiple independent parts ("research these 5 things", "review each chapter separately")

## What you bring (Inputs)

- The task that has independent parts
- The unit of work each subagent will handle
- The aggregation strategy (how to combine results)

## What you get (Output)

A draft SKILL.md with explicit `Parallelism`, `Context handed to each subagent`, `Aggregation`, and `Partial-failure handling` sections.

## How it works (Steps)

This is a workflow.

## Stages

### Stage 1: Identify the unit of independence

Ask the user: "What's the smallest piece that one helper could do alone, given just the task and a few sentences of context?"

If you can't name it, this isn't a subagent kind. Re-route.

If the units depend on each other, name the dependency — you may need to dispatch in waves rather than all in parallel.

### Stage 2: Decide parallelism

| Pattern | When |
|---|---|
| All-parallel | Units are fully independent (5 different companies to research) |
| Wave-parallel | Units have a partial order (research 5 companies, then compare top 3) |
| Serial | Each unit's output influences the next; consider if this is really a workflow kind |

Document the chosen pattern in `## Parallelism`.

### Stage 3: Declare context-flow EXPLICITLY

Subagents are stateless. They get only what you hand them. This is the section users get wrong most often.

Write `## Context handed to each subagent` as a literal list:

```markdown
## Context handed to each subagent

Each subagent receives EXACTLY:

1. <field 1>: <description>
2. <field 2>: <description>
3. <field 3>: <description>

Each subagent does NOT receive:

- The user's full conversation history
- Other subagents' progress or outputs
- Any state from prior dispatches in this session
```

If you find yourself wanting to hand the subagent "the full context," you don't need a subagent — you need a workflow stage.

### Stage 4: Define aggregation

How are results combined?

| Pattern | Mechanism |
|---|---|
| Union | All results listed, deduped |
| Pick-one | Best result selected by named criterion |
| Weighted vote | Each result scored; weighted sum |
| Sequential refinement | First result is base; later results layer on |

Document in `## Aggregation`.

### Stage 5: Plan partial-failure handling

Subagents fail. Some return junk, some time out, some refuse the task.

For each failure mode, name the response:

- **Subagent times out**: <re-dispatch with shorter scope / give up that unit / fall back to inline>
- **Subagent returns nonsense**: <discard that unit / re-dispatch with stricter framing>
- **Subagent refuses**: <re-frame the task / split further / inline-fallback>

Document in `## Partial-failure handling`.

### Stage 6: Hand off to standard tester

Standard mode tester runs 2 scenarios:

1. **Happy path**: all subagents succeed. Verify aggregation.
2. **Partial failure**: one subagent returns junk. Verify failure handling.

### Stage 7: Hand back to meta-builder

Return the PASSing draft.

## Checkpoints

- **After Stage 1**: unit of independence is named and atomic
- **After Stage 2**: parallelism pattern chosen and rationale recorded
- **After Stage 3**: context-flow declared as a literal list of fields
- **After Stage 4**: aggregation pattern named
- **After Stage 5**: at least 3 failure modes have responses
- **After Stage 6**: tester PASSed both happy and partial-failure scenarios

## Loop-back conditions

Return to Stage 1 when:

- The "unit" turns out to need other units' outputs — this is workflow, not subagent
- The aggregation requires too much context to be useful — re-think the unit boundary

## Quality bar

The draft is good enough when:

- Context handed to each subagent is a literal explicit list (no "the relevant context")
- Failure modes have concrete responses
- Tester ran the partial-failure scenario, not just happy path

## Variations

- **Single dispatch** (one subagent, used for isolation): degenerate parallelism = 1
- **Recursive subagents** (subagents that themselves dispatch subagents): require explicit depth limit
- **Long-running subagents**: complexity becomes `long-running`

## Example

```
Subagent skill: researching-five-things-in-parallel
Unit: "research one company"
Parallelism: all-parallel (5 subagents)

Context handed to each subagent:
  1. Company name
  2. The 4 attributes to research (per-company, identical)
  3. The output schema (markdown table row)
  Subagent does NOT receive: other companies' results, user's broader goal

Aggregation: union, sorted by company name, formatted as a single table

Partial-failure handling:
  - Timeout: re-dispatch with "summarize in 50 words max"
  - Junk: discard, mark row "<RESEARCH FAILED>"
  - Refusal: inline-fallback (lead agent does that one company)
```
