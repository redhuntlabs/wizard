---
name: breaking-down-a-problem
description: Use when a problem feels too big or vague to start - decomposes it into pieces you can actually work on
kind: workflow
audience: anyone
ai-tools: any
complexity: simple
time: 10-20 min
version: 1.0.0
source: bundled
---

# Breaking Down a Problem

## What this does

Turns "this problem is too big" into a one-page problem statement plus a list of subproblems sized so you can start work on the smallest one today.

## When to use

- A problem feels too big or vague to begin
- You've been stuck on something for a week with no progress
- A new project is being scoped and you need to chunk it
- Someone hands you "fix X" and you don't know where to start

## What you bring (Inputs)

- The problem in your own words (a sentence or paragraph)
- The deadline or stakes (so we right-size the breakdown)

## What you get (Output)

- A precise 1-sentence problem statement
- 3-7 subproblems
- The smallest one you can start on today

## How it works (Steps)

This is a workflow.

## Stages

### Stage 1: Sharpen the problem statement

Re-write the problem as one sentence with three parts: **observed** (what is happening), **desired** (what should be happening), **gap** (the difference).

Example: *"Onboarding takes new users 14 days to reach activation; we want under 3 days; current funnel drops 60% on day 2."*

### Stage 2: Identify the dimensions

What are the axes along which the problem could be split? Common axes: by user segment, by time/lifecycle, by component, by cause type, by responsibility, by cost.

Pick 1-2 axes that look most productive.

### Stage 3: Decompose

Along the chosen axes, list 3-7 subproblems. Each subproblem should be:

- **Observable** (you can tell whether it's solved)
- **Reasonably independent** (solving one shouldn't require solving all)
- **Sized to be worked on** (a day to a week, not a quarter)

### Stage 4: Identify the smallest startable one

Of the subproblems, which can you start today with the inputs you have? That's your first move. Anything else is queued.

### Stage 5: Validate

Read the breakdown back: does solving the subproblems together solve the original? If not, the decomposition missed something. Loop back.

## Checkpoints

- **After Stage 1**: problem statement has observed + desired + gap
- **After Stage 2**: at least one axis chosen and rationale recorded
- **After Stage 3**: 3-7 subproblems, each independent and sized
- **After Stage 4**: one subproblem identified as today's starter
- **After Stage 5**: subproblems collectively address the original gap

## Loop-back conditions

Return to Stage 2 if Stage 5 reveals the breakdown doesn't reconstitute the original problem.

## Quality bar

- Problem statement is one sentence with all 3 parts
- Subproblems are independent (you can work one without the others)
- The "start today" subproblem is genuinely sized for today
- The set covers the original problem (not just the easy parts)

## Variations

- **Decision-shaped problem**: the subproblems become criteria; route to `making-a-decision`
- **People-shaped problem**: subproblems become "have conversation with X"
- **Code-shaped problem**: subproblems become tickets

## Example

**Input**: "Our product launch is going badly and I don't know what to fix first."

- Stage 1: "Launch had 1,200 signups (target: 5,000); top channels were Twitter and HN; conversion to active is 8% (target: 25%); biggest drop is on the pricing page."
- Stage 2: Axes: top of funnel, pricing page conversion, activation. Pick: pricing page (biggest drop) and activation.
- Stage 3:
  1. Diagnose pricing-page drop (today)
  2. A/B test 3 pricing-page variants (this week)
  3. Diagnose day-2 activation drop (this week)
  4. Send activation nudge email at hour 24 (next week)
  5. Re-run launch on a new channel (next month)
- Stage 4: Start today: Diagnose pricing-page drop using session replays.
- Stage 5: Confirmed subproblems collectively address "launch is going badly."
