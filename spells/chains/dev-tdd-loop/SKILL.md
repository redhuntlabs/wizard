---
name: dev-tdd-loop
description: Use when shipping any non-trivial dev feature - chains brainstorm, plan, step-by-step execution, and verification before shipping
kind: workflow
audience: dev
ai-tools: any
complexity: chained
time: hours to weeks depending on feature
version: 1.0.0
source: bundled
composes:
  - brainstorming-a-feature
  - writing-an-implementation-plan
  - executing-a-plan-step-by-step
  - verifying-before-shipping
---

# Dev TDD Loop

## What this does

The default chain for shipping any non-trivial dev feature. Runs four bundled spells in sequence: brainstorm the approach, write the implementation plan, execute step-by-step with per-step verification, and run a final verification pass before declaring "done." Equivalent in spirit to a TDD-rigorous engineering workflow.

## When to use

- Shipping a feature beyond a one-line tweak
- Onboarding a team to a structured engineering workflow
- When "we shipped it but it broke" has happened more than once
- When the implementation will span more than a few hours

## Do not use when

- Trivial fix (typo, copy change, single-line guard)
- Pure exploration / spike — use it AFTER the spike, when productionizing
- Emergency hotfix where the verification step happens via post-mortem instead

## What you bring (Inputs)

- A feature request, ticket, or one-line description
- Codebase access
- A definition of "shipped" (deploy, merge to main, release tag, etc.)

## What you get (Output)

- A brainstorm document
- An implementation plan with per-step verifications
- The implemented feature with all step verifications passing
- A verification pass against acceptance criteria, completed before shipping

## How it works (Steps)

This is a chain of 4 spells. Each stage hands an artifact to the next.

## Stages

### Stage 1: Brainstorm (brainstorming-a-feature)

- **Skill**: `brainstorming-a-feature`
- **Input**: feature request
- **Output handoff**: brainstorm doc with sharp problem statement, 3-5 candidate approaches, recommendation, alternative considered, top assumptions
- **Gate**: problem statement passes the "stranger could understand it" test; alternative is plausible

### Stage 2: Plan (writing-an-implementation-plan)

- **Skill**: `writing-an-implementation-plan`
- **Input**: chosen approach from Stage 1
- **Output handoff**: implementation plan with file-level changes, ordering, per-step verifications, risks, acceptance criteria
- **Gate**: every step has explicit verification; another engineer could execute without clarifying questions

### Stage 3: Execute (executing-a-plan-step-by-step)

- **Skill**: `executing-a-plan-step-by-step`
- **Input**: the plan from Stage 2
- **Output handoff**: implemented feature, plan marked done with deviations recorded, deferred-list captured
- **Gate**: every step's verification passes; no "while I'm here" changes mixed in

### Stage 4: Verify before shipping (verifying-before-shipping)

- **Skill**: `verifying-before-shipping`
- **Input**: implemented feature + acceptance criteria from Stage 2
- **Output handoff**: a documented verification pass
- **Gate**: every acceptance criterion verified or explicitly waived with a reason

## Checkpoints

- **After Stage 1**: problem statement is sharp; alternative is plausible
- **After Stage 2**: every plan step has explicit verification
- **After Stage 3**: every step's verification has been run and passed; deferred list captured
- **After Stage 4**: every acceptance criterion verified or explicitly waived

## Loop-back conditions

- Stage 1 chosen approach turns out infeasible mid-Stage 2: return to Stage 1 with the new constraints
- Stage 2 missing per-step verifications: do not start Stage 3 — fix the plan first
- Stage 3 verification fails repeatedly: pause execution; investigate; possibly return to Stage 2 to re-plan that segment
- Stage 4 surfaces an unmet acceptance criterion: return to Stage 3 to add steps; re-verify

## Quality bar

- Every chain stage's gate passed before moving on
- The deferred list is captured (not lost)
- The verification pass at Stage 4 is documented, not just "I checked it"
- Future-you (or a teammate) can read the artifacts and understand why each decision was made

## Variations

- **Tiny feature**: skip Stage 1 (problem is obvious); collapse Stages 2-3 into a 1-page plan + execute; keep Stage 4 always
- **Spike followed by productionizing**: run the spike unmanaged, then run the chain on the productionizing pass
- **Multi-PR feature**: run Stages 1-2 once for the whole feature; run Stages 3-4 per-PR

## Example

**Input**: Ticket — "Add SSO for enterprise customers."

**Flow**:

1. Stage 1 produces a brainstorm; recommends Auth0 SAML; alternative (SaaS auth) considered and rejected on lock-in cost
2. Stage 2 produces a 12-step plan; 5 files, 1 migration, per-step verifications all defined
3. Stage 3 executes the 12 steps; step 3 (middleware) fails initially because of XML/JSON parser confusion → diagnosed and fixed → continues; deferred list captures 3 unrelated improvements noticed along the way
4. Stage 4 runs the 6 acceptance criteria; all pass; one criterion (rollback playbook) was added during implementation and explicitly verified

**Output**: SSO shipped, plan archived, deferred list filed, verification documented.
