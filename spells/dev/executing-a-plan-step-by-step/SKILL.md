---
name: executing-a-plan-step-by-step
description: Use when executing a written implementation plan - per step read, change, verify, mark done; loop back on failure
kind: workflow
audience: dev
ai-tools: any
complexity: chained
time: depends on plan
version: 1.0.0
source: bundled
composes:
  - writing-an-implementation-plan
---

# Executing a Plan Step by Step

<!-- token-budget-exception: chained workflow with per-step + failure cycle requires extra detail -->

## What this does

Executes an implementation plan step-by-step with discipline: read what the step says, make the change, run the step's verification, mark done. On verification failure, stop and diagnose before moving on.

## When to use

- You have a written implementation plan (from writing-an-implementation-plan or equivalent)
- You're starting or resuming execution
- The plan has multiple steps with verifications

## Do not use when

- There's no written plan (write one first; see writing-an-implementation-plan)
- The plan has no per-step verifications (fix the plan first)
- You're doing exploratory work without a clear destination

## What you bring (Inputs)

- The written plan
- Working dev environment
- Any credentials/access the plan calls for

## What you get (Output)

A completed implementation, plus an updated plan document with each step marked done and any deviations recorded.

## How it works (Steps)

This is a chained workflow. Each step is a sub-cycle.

## Stages

### Stage 1: Pick up where you left off

Open the plan. Find the first step that's not marked done. If the plan has no marks yet, start at step 1.

If you're resuming after a break, re-read the steps that were already done — you need that context loaded back into your head.

### Stage 2: Per-step cycle

For each step:

#### Step.A: Read the step in full

What does this step say to do? What does it say is the verification? What files does it touch?

If the step is unclear, do NOT improvise. Update the plan first to clarify, then execute the clarified step.

#### Step.B: Read the surrounding code

Before touching anything, read the file(s) the step affects in their current state. Skipping this is the #1 cause of "AI confidently wrote the wrong thing."

#### Step.C: Make the change

Make the smallest change that satisfies the step. Do NOT make adjacent improvements ("while I'm here..."). Adjacent changes go in a side notebook for later, not in this commit.

#### Step.D: Run the verification

Run exactly the verification the plan specified. Capture the output.

#### Step.E: Decide

- **Verification passes**: mark the step done in the plan. Move to next step.
- **Verification fails**: STOP. Do not move on. Go to Stage 3 (failure cycle).

#### Step.F: Commit (if appropriate)

If the step left the system in a working state, commit. Use a message that references the step.

### Stage 3: Failure cycle

When verification fails:

1. Read the actual error / failing output (don't guess)
2. Form a hypothesis ("this fails because X")
3. Make the smallest possible change to test the hypothesis
4. Re-run verification
5. If still failing after 2-3 attempts, escalate: read more code, add logging, or ask for help. Do NOT keep trying random changes.

If the failure reveals the plan was wrong, update the plan before continuing. Don't silently work around the plan.

### Stage 4: Side notebook

Maintain a "deferred" list as you go: things you noticed that should change later, but aren't part of this plan. This is where "while I'm here..." goes. You'll address it after the plan is done (or never, which is also fine).

### Stage 5: Plan completion

When all steps are marked done:

- Run the acceptance-criteria checks from the plan
- If all pass: the plan is done; archive the plan with the deferred list attached
- If any fail: the plan was incomplete — add steps to fix and execute them

## Checkpoints

- **Per step**: verification passes before moving on
- **Per failure**: max 2-3 attempts before escalating
- **End of plan**: all acceptance criteria pass

## Loop-back conditions

- Verification fails: do not move on (Stage 3)
- The step is unclear: clarify the plan first
- The plan turned out wrong: update the plan, don't silently improvise

## Quality bar

- Each step done has a recorded verification result
- No "while I'm here" changes mixed into step commits
- Failures are diagnosed, not papered over
- The plan document accurately reflects what happened (deviations recorded)

## Variations

- **Solo session**: maintain the plan file as your single source of truth
- **Pair / mob**: read step aloud before changing; pair on verification
- **Long-running plan over many sessions**: at the start of each session, do Stage 1 (resume) deliberately — don't just dive in

## Example

**Input**: A 12-step implementation plan for SSO.

**Process**:

- Step 1 (migration): write SQL → run on local db → verify columns exist → commit. Done.
- Step 2 (backend handler): read existing auth.ts → write saml.ts → unit test for happy path passes → commit. Done.
- Step 3 (middleware integration): change middleware.ts → integration test fails (unexpected token shape) → diagnose: SAML response is XML, not JSON → fix parser → re-run test → passes → commit. Done.
- ... continue through step 12 ...
- Acceptance: end-to-end smoke against Auth0 sandbox passes; existing password login still works. Plan complete; deferred list (3 items) saved for future ticketing.
