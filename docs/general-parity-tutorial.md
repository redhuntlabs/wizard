# General Parity Tutorial

This document demonstrates that Wizard can produce, in any domain, something equivalent in spirit to a TDD-style dev workflow. We do this with two end-to-end walkthroughs:

1. **Research walkthrough** — building a research-rigor workflow from scratch using the meta-builder
2. **Dev walkthrough** — building a feature-shipping workflow equivalent to a dev TDD loop

Both walkthroughs use only the meta-builder and the bundled framework skills. No hand-editing.

---

## Walkthrough 1: Building a research-rigor workflow

**Goal**: Build a chain that turns "I have a research question" into "I have a verified, structured brief," with discipline against citation drift along the way.

**Time**: ~2 hours of interview + try-it.

### Step 1: Build the discipline skill first

The discipline skill is the rigor primitive. Build it before the workflow that uses it.

```
/build-spell
```

> User: I want a discipline that forces me (or my AI) to actually open the primary source for every cited claim before publishing.

The meta-builder (running with `intuitive-interviewing`) recognizes "discipline" cues ("forces", "every", "before publishing") and routes to `building-a-discipline-spell`. Express-mode interview because context is rich:

- Q: What's the non-negotiable rule, in one sentence?
  → "Every cited claim must be verified against the primary source before it leaves my hands."
- Q: What are the rationalizations you (or others) use to skip this?
  → "I remember reading it, the AI told me, it's a famous quote, I'm short on time..."
- Q: What's the warning sign?
  → "When I'm about to write 'as X said' from memory."
- Q: Where's the hard gate?
  → "Right before publishing. The MUST-STOP block asks four questions; if any answer is no, verify or hedge or cut."

Strawman draft (matches the bundled `verifying-before-citing` shape) is shown to the user. User edits 2 lines. Tester dispatched in **discipline mode**:

- Baseline pass (without skill): given a paragraph with 3 claims, the AI cites all 3 from memory; 1 is misattributed (Einstein quote that's not Einstein's).
- With-skill pass: same paragraph, AI hits the MUST-STOP, verifies 2 of 3, hedges the third explicitly because the source isn't available in the session.
- Verdict: **PASS** — the skill changed behavior; the misattribution was caught.

Saved to `~/.wizard/spells/research/verifying-before-citing/`. Iron Law satisfied.

### Step 2: Build the workflow skills

Three more interviews, one per workflow:

- `literature-scan` — `building-a-workflow-spell` matches the workflow-shape `learn-from-source` as a starting point; user customizes for "scope a topic, find canonical sources, identify camps."
- `interview-synthesis` — workflow-shape `summary-with-quotes` matches; customized for tagging + theming.
- `structured-literature-review` — `complexity: chained`, `composes:` literature-scan + verifying-before-citing.

Each goes through the standard try-it cycle. Each saves only after PASS.

### Step 3: Build the subagent skill

```
/build-spell
```

> User: I want a skill that does the same research on N different topics in parallel.

Routes to `building-a-subagent-spell`. Express mode:

- Per-subagent context declaration (one item, the question, the format, time budget)
- Aggregation strategy (compare section)
- Partial-failure handling (re-run flag)

Try-it: dispatch on 3 fake companies; verify all 3 returns are in the same format; verify the compare section actually surfaces deltas. PASS. Saved as `researching-five-things-in-parallel`.

### Step 4: Chain them

```
/cast-spell chaining-spells
```

Compose: literature-scan → researching-five-things-in-parallel → structured-literature-review → verifying-before-citing.

Test the chain end-to-end on a real research question. Each stage's gate fires. Final brief has zero unverified citations.

Saved as `general-research-loop` (which is also the bundled chain — your version overrides the bundled one in your `$WIZARD_HOME`).

### What this demonstrates

You built, with the meta-builder, a domain-rigorous research workflow that:

- Has a discipline skill that genuinely changes behavior under pressure (proven by baseline-vs-with-skill comparison)
- Has multi-stage workflows with explicit handoffs and gates
- Has a parallel subagent dispatch with explicit context flow
- Composes into a runnable chain

This is functionally equivalent in spirit to a TDD loop — same primitives, different domain.

---

## Walkthrough 2: Building a feature-shipping workflow

**Goal**: Build a chain equivalent to a TDD loop, in a developer context, using only the meta-builder.

**Time**: ~2 hours.

### Step 1: Build the discipline skill

```
/build-spell
```

> User: I want a discipline that prevents me from saying a feature is shipped before I've verified the acceptance criteria.

Routes to `building-a-discipline-spell`. The bundled `verifying-before-shipping` is offered as a strawman; user customizes the acceptance-criteria language to fit their team. Discipline-mode try-it:

- Baseline: given a half-shipped feature, AI says "looks done" without checking criteria.
- With-skill: AI hits MUST-STOP, walks each criterion, finds 1 unmet, surfaces it.

PASS. Saved.

### Step 2: Build the workflow skills

- `brainstorming-a-feature` — workflow-shape `decision-with-alternatives` is a starting point; customized for problem → user → constraints → 3-5 approaches → recommendation + alternative.
- `writing-an-implementation-plan` — workflow with file-level changes, ordering, per-step verification, risks.
- `executing-a-plan-step-by-step` — `complexity: chained`, with the per-step cycle (read → change → verify → mark done) and a failure cycle.

Each tested individually. Each saved only after PASS.

### Step 3: Chain them

```
/cast-spell chaining-spells
```

Compose: brainstorming-a-feature → writing-an-implementation-plan → executing-a-plan-step-by-step → verifying-before-shipping.

End-to-end test on a small real ticket. Each gate fires. Verification stage catches 1 missing acceptance criterion (the plan didn't include rollback; user adds it and re-runs).

Saved as `dev-tdd-loop`.

### What this demonstrates

You built, in a dev context, a four-stage workflow with the same structural rigor as a classic TDD loop — using only the meta-builder.

---

## What both walkthroughs prove

The framework's primitives (kind-routing, discipline-mode pressure testing, subagent dispatch with explicit context flow, chaining with gates) are domain-agnostic. The same machinery that produces a research-rigor chain produces a dev-rigor chain. That's the parity claim.

## How to do this yourself

Both walkthroughs above use only:

- `/build-spell` (the meta-builder)
- `/cast-spell chaining-spells`
- `/cast-spell <name>` to test individual skills
- The bundled framework skills and workflow shapes as strawmen

No hand-editing of SKILL.md files is required. The meta-builder handles the structure; you bring the domain knowledge.

## Where to next

- [taxonomy.md](taxonomy.md) — pick your `kind` deliberately
- [skills-primitives.md](skills-primitives.md) — the building blocks that make discipline skills work
- [philosophy.md](philosophy.md) — why these primitives generalize
