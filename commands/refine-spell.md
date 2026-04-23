---
name: refine-spell
description: Improve an existing spell based on real usage
---

# /refine-spell

Invoke the `refining-a-spell` skill to update a spell in your library.

## Usage

```
/refine-spell writing-an-email
/refine-spell writing-an-email --bump minor
```

## What happens next

The skill walks you through:

1. Loading the current SKILL.md
2. Identifying what changed (new step, clearer wording, better example, etc.)
3. Re-running the tester (mandatory after any change)
4. Bumping the version field appropriately
5. Saving back to your `WIZARD_HOME`

Re-testing is non-skippable. A change without a re-test is treated like a new build that skipped try-it.
