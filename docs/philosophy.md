# Philosophy

Wizard is a framework for shaping AI behavior with structured, reusable, testable skills — usable by anyone, in any domain, in any AI tool. (For provenance and prior-art, see the Lineage section in the [README](../README.md).)

## The core bet

The bet is that **behavior is engineerable**. Most "tell the AI to do X" attempts fail because the AI rationalizes its way out under pressure ("I know it said to verify, but this case is obvious..."). The way out is not better intentions; it's better structures.

This framework provides those structures and a meta-builder that helps anyone construct them.

## Five principles

### 1. The 1% rule

If there is a 1% chance a skill applies, it must be invoked. The cost of invoking and finding it doesn't apply is small. The cost of not invoking and being wrong is large.

### 2. The Iron Law

A spell is not real until it has been tested. The meta-builder will not save a draft until it has run a try-it test against a realistic scenario and gotten a `PASS`. There is no "I'll test it later." Later doesn't happen.

### 3. The Batch Iron Law (Second Iron Law)

When building multiple spells in one session, complete one end-to-end (interview → try-it → save) before starting the next. No batching. Batching is where Iron Laws die.

### 4. Behavioral primitives, not vibes

Spells shape behavior using a small set of explicit primitives:

- **Non-negotiable rule** — one sentence, in the imperative
- **Excuses and counters table** — the rationalizations people use to skip the rule, and the counters
- **Warning signs** — the moments where the rule is most likely to be skipped
- **Hard gates** — `<MUST-STOP>` blocks the AI cannot read past without acting

See [skills-primitives.md](skills-primitives.md) for the full set.

### 5. Plain language wins

Every shipped spell passes a plain-language check (`scripts/validate-spell.js`). If a 14-year-old can't read the SKILL.md and grasp it, the SKILL.md is wrong. This is enforced by the validator, not aspiration.

## Why TDD-for-skills

We borrow test-driven development from software and apply it to skill authorship: every spell has a try-it phase before save. The try-it is the test. If it doesn't pass, the spell doesn't ship.

For `discipline`-kind spells we go further: a baseline pass is run **without** the skill to confirm the failure mode the skill targets, then a second pass is run **with** the skill to confirm the failure mode is now blocked. This is how we know a discipline skill changes behavior, not just adds words.

## What we believe is true and what we don't yet know

We believe:

- Behavioral engineering generalizes outside dev work
- Plain-language SKILL.md files outperform jargon-laden ones
- Subagent dispatch is the missing primitive most workflows need

We don't yet know:

- How well the framework works for highly-creative tasks (poetry, painting prompts) — early seeds suggest it's useful but blunt
- How well non-developers internalize the Iron Law on their own — we lean on the meta-builder to enforce it
- Whether community contributions will gravitate to one tool's plugin format over another

## Attribution

For provenance, prior-art, and what we did and did not borrow from upstream, see the Lineage section in the [README](../README.md).
