---
name: writing-an-implementation-plan
description: Use when turning a feature spec into a step-by-step implementation plan - file-level changes, order, checkpoints, and risks
kind: workflow
audience: dev
ai-tools: any
complexity: guided
time: 30-90 min
version: 1.0.0
source: bundled
---

# Writing an Implementation Plan

## What this does

Turns a feature spec (output of brainstorming-a-feature, or a written PRD) into an executable implementation plan: file-level changes, ordering, checkpoints, risks, and rollback. Designed so a different person — or future-you in a different session — could execute it without asking clarifying questions.

## When to use

- After a feature has been brainstormed and an approach chosen
- Before starting to code any non-trivial feature
- When handing implementation to someone else
- When the work spans multiple sessions and needs continuity

## What you bring (Inputs)

- The chosen approach (from brainstorming-a-feature or a PRD)
- Read access to the codebase
- The acceptance criteria (how will we know it's done)

## What you get (Output)

A plan document with: scope, file-level changes (paths + what changes), ordering with dependencies, per-step verification, risks and rollback, and the acceptance criteria.

## How it works (Steps)

This is a workflow.

## Stages

### Stage 1: Restate scope

In one paragraph, restate what's being built and what's explicitly out of scope. Out-of-scope is critical — it prevents drift mid-implementation.

### Stage 2: Inventory file-level changes

Walk the codebase and list every file that needs to change. For each: full path + 1-3 line description of what changes there.

If you're adding new files, list them too.

If you're not sure which files need to change for a given concern, that's a discovery task — note it explicitly.

### Stage 3: Order the steps

Order is important. Rules of thumb:

- Foundations first (data model → API → UI)
- Each step should leave the system in a working state if possible
- Risky steps early (so you discover unknowns before you've sunk cost)
- Steps should be independently verifiable

### Stage 4: Define per-step verification

For each step: how will you know it worked? Examples:

- Unit test passes
- Curl a specific endpoint and see expected response
- Open the page and see the new component
- Migration runs without error and rollback also works

If a step has no verification, it's not done — split it into substeps that do.

### Stage 5: Name the risks

What could go wrong? For each risk: likelihood, impact, and mitigation or rollback.

Common risks:

- Migration is irreversible
- Performance regresses
- Hidden coupling to a system we don't see
- Acceptance criterion was misunderstood

### Stage 6: Name acceptance criteria

How does the user / reviewer / customer know this feature is complete? List 3-7 specific, testable conditions.

### Stage 7: Estimate

For each step: rough hours. For the whole plan: total + buffer (typical: 30%).

## Checkpoints

- **After Stage 2**: file inventory covers every behavior change you described in Stage 1
- **After Stage 3**: order is justifiable (not arbitrary)
- **After Stage 4**: every step has verification
- **After Stage 6**: acceptance criteria are specific, not "feature works"

## Loop-back conditions

- If Stage 2 turns up a part of the system you don't understand: pause and read it before planning the changes there
- If Stage 4 can't define verification for a step: split the step
- If estimate is implausibly small: you're missing steps

## Quality bar

- Another engineer (or your future self) could execute this plan without asking clarifying questions
- Every step has explicit verification
- Risks include at least one "what if I'm wrong about the approach" risk
- Acceptance criteria are testable, not aspirational

## Variations

- **Tiny refactor**: collapse stages 2-7 into a single bullet list
- **Architectural change**: add a "design decisions" section explaining trade-offs
- **Multi-PR feature**: split the plan along PR boundaries; each PR is a sub-plan

## Example

**Input**: Approach from brainstorm — add SSO via Auth0 SAML.

**Output (plan excerpt)**:

- Scope: SAML 2.0 SSO for enterprise admins via Auth0. Out of scope: SCIM, OIDC, social logins.
- Files:
  - `backend/auth/saml.ts` (new) — SAML response handling
  - `backend/auth/middleware.ts` — add SAML branch
  - `backend/db/migrations/2026_04_19_sso.sql` — add `sso_provider`, `sso_external_id` columns
  - `frontend/login/SSOButton.tsx` (new) — entry button
  - `docs/admin/sso-setup.md` (new)
- Order: migration → backend handler → middleware integration → frontend button → docs → end-to-end smoke test against Auth0 sandbox
- Verifications: per step, listed
- Risks: (1) attribute mapping varies by IdP — mitigation: test with Okta + Azure AD sandboxes; (2) migration adds nullable columns, safe to roll back
- Acceptance: admin can configure IdP in Auth0; users can sign in via the SSO button; existing password users unaffected; rollback documented
- Estimate: 3 weeks + 30% buffer
