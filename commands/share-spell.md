---
name: share-spell
description: Export a spell for sharing with others
---

# /share-spell

Invoke the `sharing-a-spell` skill to export one of your spells in a portable format.

## Usage

```
/share-spell writing-an-email
/share-spell writing-an-email --strict
/share-spell writing-an-email --bundle
```

## Modes

- **default**: keeps full Wizard frontmatter (kind, audience, complexity, etc.)
- **`--strict`**: strips Wizard-specific fields. Output is the vanilla upstream `SKILL.md` format (see README "Lineage" for the upstream project).
- **`--bundle`**: zips the SKILL.md plus its `examples/` and `references/` folders.

## Output

A single markdown file (or zip) that the recipient can drop into their own `WIZARD_HOME` and use immediately.

Nothing is sent over the network. Sharing means producing a file; you choose how to deliver it.
