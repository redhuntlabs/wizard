---
name: brainstorming-a-feature
description: Use when scoping a new feature - produces problem statement, 3-5 candidate approaches, and a recommendation with explicit alternative
kind: workflow
audience: dev
ai-tools: any
complexity: guided
time: 30-90 min
version: 1.0.0
source: bundled
---

# Brainstorming a Feature

## What this does

Turns a feature idea into a structured brainstorm: a sharp problem statement, the user it serves, the constraints that bound the solution, 3-5 candidate approaches with trade-offs, and a recommendation with an explicit alternative considered.

## When to use

- Starting work on a new feature
- Before writing an implementation plan
- When the team disagrees on approach
- When the feature feels mushy and needs sharpening

## What you bring (Inputs)

- A one-line description of the feature ("we want to add X")
- The user (which user; what role; what they're trying to do)
- Known constraints (timeline, tech, dependencies, regulatory)

## What you get (Output)

A brainstorm document: problem statement, user, constraints, 3-5 candidate approaches with trade-offs, recommendation, and the alternative considered.

## How it works (Steps)

This is a workflow.

## Stages

### Stage 1: Sharpen the problem

Write the problem in one sentence. Format: "[User] needs to [do X] but [obstacle], which causes [pain]."

If you cannot complete that sentence, the problem isn't sharp enough yet. Interview a real user or revisit the source request.

### Stage 2: Name the user

Specifically. Not "users." Which segment, which role, which context. If multiple — pick the primary one for v1.

### Stage 3: Enumerate constraints

What MUST be true of any solution? Examples:

- Ships in Q2
- No new infra
- Backwards compatible with API v1
- Doesn't increase p95 latency

Constraints are not preferences — they're hard limits.

### Stage 4: Generate 3-5 candidate approaches

For each: 1-3 sentences describing what it is, what it requires, what it costs, what it forecloses.

If you can only think of one, you haven't brainstormed. Force at least 3, even if some are obviously bad — bad approaches sharpen the good ones.

### Stage 5: Score and recommend

For each approach against criteria like: time-to-ship, risk, fit with existing system, user experience, future flexibility. Pick a winner.

### Stage 6: Name the alternative

Explicitly: "I considered [runner-up] and rejected it because [reason]." This is non-negotiable. (See decisions-need-an-alternative.)

### Stage 7: Name the assumptions you'd want to validate

Each chosen approach rests on assumptions. List the top 3. Mark which are cheap to test and which are not.

## Checkpoints

- **After Stage 1**: problem statement fits the format
- **After Stage 4**: 3-5 distinct approaches, not 1 + 2 strawmen
- **After Stage 6**: alternative is named with a real reason

## Loop-back conditions

- If the chosen approach violates a constraint: scrap and re-pick
- If no approach satisfies all constraints: the constraints conflict — escalate

## Quality bar

- Problem statement passes the "could a stranger understand it?" test
- 3+ approaches, each with trade-offs (not just one written-up answer)
- Alternative considered is plausible (not a strawman)
- Top assumptions are listed and labeled by test cost

## Variations

- **Tiny feature**: 2 approaches is enough; cap at 30 min
- **Architecturally significant**: include one "do-nothing" option and one "buy-instead-of-build" option
- **Compliance-driven**: constraints section grows; approaches are evaluated against each constraint individually

## Example

**Input**: "Add SSO."

**Output**:

- Problem: "Enterprise admins need to manage user access centrally but our app only supports per-user passwords, which causes IT to refuse renewal."
- User: enterprise IT admin (300+ seats)
- Constraints: ships in Q2, no new identity infra, must support SAML 2.0 + OIDC
- Approaches:
  1. Build SSO ourselves on top of Auth0 (3 weeks, low risk, $X/mo)
  2. Use a SaaS auth provider's SSO addon (1 week, vendor lock-in, higher cost)
  3. Defer SSO and ship SCIM-only (2 weeks, doesn't fully solve the problem)
- Recommendation: #1
- Considered #2, rejected because: lock-in cost grows with seat count and we'd need to migrate within 18 months
- Assumptions: (a) Auth0 SAML setup is as quick as docs claim (cheap to test), (b) our user model maps cleanly to SAML attributes (medium to test)
