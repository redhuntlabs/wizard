# Contributing to Wizard

Thanks for considering a contribution. Read this in full before opening a PR.

## What goes where

There are two repos:

| Repo | Accepts |
|---|---|
| `wizard` (core) | Bug fixes, framework-skill improvements, new seed spells that demonstrate a category not yet covered, new workflow shapes, doc improvements |
| `wizard-community` (separate) | Domain-specific spells, opinionated workflow chains, experimental builders |

If your contribution is "a spell for X domain," it almost certainly belongs in `community`, not core.

## Before opening a PR

1. **Search existing PRs** (open AND closed) for the same problem. Reference what you found.
2. **Run the validator**: `node scripts/validate-spell.js <path-to-your-skill>`
3. **Run the tester**: dispatch `agents/spell-tester.md` against your spell in the appropriate mode (standard or discipline) and capture the verdict.
4. **Provide a worked example**: the input you used to test plus the output produced.

## PR template requirements

Every PR must include:

- **Problem**: what specific real-world experience motivated this change. "My agent hallucinated" or "I noticed this could break" is not enough; show the session.
- **Validator output**: paste the full output of `validate-spell.js`.
- **Tester verdict**: paste the verdict from `spell-tester` in the appropriate mode.
- **Worked example**: input + output.
- **Existing PRs**: list the PRs you searched.
- **Diff size justification**: bigger diffs need stronger problem statements.

PRs missing any of these will be closed without review.

## What we will not accept

### Domain-specific spells in core

If your spell is for a specific job (clinical research, options trading, real-estate appraisal), it goes in the community repo. Core stays domain-neutral.

### Bulk PRs

One problem per PR. PRs that batch unrelated changes will be closed.

### "Compliance" rewrites

The framework's behavioral primitives (Iron Law language, excuses tables, hard gates) are tuned for real-world agent behavior. Rewording them for stylistic preference will not be accepted without eval evidence the change improves outcomes.

### Speculative fixes

Every change must address a problem someone actually experienced. "This could theoretically fail" is not enough.

### Third-party dependencies

Wizard is zero-dependency by design (Node-only for scripts; markdown for everything else). PRs adding dependencies require strong justification and the dependency goes in `optionalDependencies`, not `dependencies`.

## How to add a new framework skill

1. Open an issue first describing the gap.
2. Wait for maintainer agreement that this belongs in core.
3. Use `building-a-spell` (yes, eat the dog food) to draft it.
4. Run `pressure-testing-a-spell` if it's a discipline-kind.
5. Submit per the PR template.

## How to add a new seed spell

1. Verify it covers a category not yet covered (check `spells/`).
2. Build it via the meta-builder.
3. Verify it passes the validator and tester.
4. Submit per the PR template.

## How to add a new workflow shape

1. Build the shape file under `skills/building-a-spell/workflow-shapes/`.
2. Include 1-2 example fillings.
3. Verify the meta-builder correctly proposes it for matching user inputs.
4. Submit per the PR template.

## Testing

```bash
node scripts/validate-spell.js <path>     # lint a single spell
node scripts/validate-spell.js --all      # lint everything
node scripts/adversarial-tests/attempt-skip-tryit.js     # Iron Law test
node scripts/adversarial-tests/attempt-batch-builds.js   # Batch Iron Law test
```

## Code of conduct

Be kind. Assume good faith. Focus criticism on the work, not the person. Maintainers may close conversations that don't follow this.

## Questions?

Open a discussion (not an issue) on the repo. Issues are for bugs and feature requests, not questions.
