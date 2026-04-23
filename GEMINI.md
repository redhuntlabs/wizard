# Wizard — For Gemini

See `AGENTS.md` for the full agent guidelines. This file is the Gemini CLI-specific entry point loaded via `gemini-extension.json`.

## Quick orientation

- **Boot skill**: `skills/using-wizard/SKILL.md`
- **Meta-builder**: `skills/building-a-spell/SKILL.md`
- **Seed library**: `spells/`
- **User's personal library**: `$WIZARD_HOME` (default `~/.wizard/`)

## How to use skills in Gemini CLI

Skills activate via the `activate_skill` tool. Gemini loads skill metadata at session start and activates the full content on demand.

When you decide to use a skill, call `activate_skill` with the skill name. Then follow the loaded content directly.

## Tool name mapping

Some framework skills reference tools by Claude Code names. Translate as needed:

| Claude Code | Gemini CLI |
|---|---|
| `Read` | `read_file` |
| `Write` | `write_file` |
| `Skill` | `activate_skill` |
| `Task` (subagent) | `dispatch_agent` |
| `TodoWrite` | `todo_write` |

## The 1% rule

If you think there is even a 1% chance any skill or spell applies to what you are doing, invoke it. This is non-negotiable. Read `skills/using-wizard/SKILL.md` for the full reasoning.

## Bootstrap

Gemini's `gemini-extension.json` references this file as `contextFileName`. The framework's presence is established at session start through this mechanism. No separate hook is needed.
