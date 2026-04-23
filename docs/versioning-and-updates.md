# Versioning and Updates

How spell versions work and what happens when the framework ships an update.

## Version field

Every spell has a `version` field in frontmatter, using semver (`MAJOR.MINOR.PATCH`).

| Source | Starting version | Bumped by |
|---|---|---|
| Bundled seed | `1.0.0` | Framework releases |
| Personal | `0.1.0` | `/refine-spell` on save |
| Community | author's choice | Author |

## Semver meaning for spells

| Bump | When |
|---|---|
| `PATCH` (1.0.X) | Wording fixes, clearer examples, no behavior change |
| `MINOR` (1.X.0) | New steps, new variations, new optional inputs — backwards compatible |
| `MAJOR` (X.0.0) | Removed steps, changed required inputs, changed output shape — breaking |

A spell in `0.x.y` is considered draft. The `/refine-spell` skill prompts to bump to `1.0.0` once you've used it 3+ times successfully.

## What happens on framework update

When you update the Wizard plugin:

- **Bundled `spells/` gets the new versions.** That's expected.
- **Your `WIZARD_HOME` is NEVER touched.** Even if you have an override of a bundled spell.

This means: if you customized `writing-an-email` and the framework ships a new bundled version, your override stays intact. You decide if and when to merge.

## Discovering updates to overrides

Run:

```
/list-spells --updates
```

This shows every spell in your `WIZARD_HOME` whose name matches a bundled one with a newer version. For each, you see:

- Your version vs bundled version
- A diff (markdown-aware, ignoring whitespace)
- Suggested merge actions

## Manual merge prompt

For each update, you can:

1. **Keep mine** — no change.
2. **Take theirs** — replace your override with the new bundled version (your old version is renamed `<name>.backup-vX.Y.Z`).
3. **Merge interactively** — the meta-builder walks you through the diff section by section, asking what to keep.
4. **Skip for now** — defer the decision; reappears next time you run `--updates`.

## When personal versions hit 1.0

Your spell starts at `0.1.0`. After successful `/cast-spell` invocations, the framework tracks usage. After 3 successes (no NEEDS-REFINEMENT verdicts), `/refine-spell` will offer:

```
You've used "<name>" 5 times successfully. Bump to 1.0.0?
```

This is a soft prompt. Decline as often as you like.

## Version field in shared exports

When you `/share-spell`, the version is included in the exported file. The recipient's framework will respect it on import (same name + same version = no install prompt; same name + different version = "you already have version X, install Y? side-by-side?").

## Why this matters

Without versioning, framework updates would either silently break your customizations or silently leave you on stale versions. Semver + explicit override + interactive merge means you always know where you stand and you stay in control.

See also: `docs/personal-library.md` for `WIZARD_HOME` mechanics.
