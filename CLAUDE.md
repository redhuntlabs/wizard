# Wizard — For Claude

See `AGENTS.md` for the full agent guidelines. This file is the Claude Code-specific entry point.

## Quick orientation

- **Boot skill**: `skills/using-wizard/SKILL.md` (auto-loaded by `hooks/session-start`)
- **Meta-builder**: `skills/building-a-spell/SKILL.md`
- **Seed library**: `spells/`
- **User's personal library**: `$WIZARD_HOME` (default `~/.wizard/`)

## How to use skills in Claude Code

Use the `Skill` tool. Never use `Read` on skill files. The `Skill` tool loads the content into your context as a single coherent unit.

```
Skill: wizard:building-a-spell
```

## How to dispatch the tester

Use the `Task` tool with `subagent_type: spell-tester`. The `agents/spell-tester.md` file defines the agent.

## Slash commands

All commands are thin wrappers around skills:

- `/build-spell` → `building-a-spell`
- `/cast-spell [name]` → loads and runs the named spell
- `/list-spells` → `discovering-spells`
- `/refine-spell [name]` → `refining-a-spell`
- `/share-spell [name]` → `sharing-a-spell`

## The 1% rule

If you think there is even a 1% chance any skill or spell applies to what you are doing, invoke it. This is non-negotiable. Read `skills/using-wizard/SKILL.md` for the full reasoning.
