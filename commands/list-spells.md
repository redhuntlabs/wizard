---
name: list-spells
description: Browse all available spells (yours plus bundled)
---

# /list-spells

Invoke the `discovering-spells` skill to browse what's available.

## Usage

```
/list-spells
/list-spells --kind discipline
/list-spells --audience researcher
/list-spells --updates
```

Flags:

- `--kind <K>` — filter by kind (`content`, `workflow`, `discipline`, `subagent`)
- `--audience <A>` — filter by audience (`anyone`, `researcher`, `dev`, etc.)
- `--mine` — only your personal library
- `--bundled` — only the bundled seed library
- `--updates` — show your overrides whose bundled version has a newer release (see `docs/versioning-and-updates.md`)
