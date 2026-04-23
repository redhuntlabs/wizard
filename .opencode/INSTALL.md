# Installing Wizard for OpenCode

## Prerequisites

- [OpenCode.ai](https://opencode.ai) installed

## Installation

Add to the `plugin` array in your `opencode.json` (global or project-level):

```json
{
  "plugin": ["wizard@git+https://github.com/redhuntlabs/wizard.git"]
}
```

Restart OpenCode. The plugin auto-installs and registers all skills.

Verify by asking: "What spells do I have?"

## Bootstrap mechanism

OpenCode auto-loads `AGENTS.md` from plugin roots. The framework's presence is established through that file, which points to `using-wizard` as the boot skill. No session-start hook is needed.

## Usage

Use OpenCode's native `skill` tool:

```
use skill tool to list skills
use skill tool to load wizard/building-a-spell
```

## Updating

Restart OpenCode. Plugins auto-update unless pinned.

To pin a version:

```json
{
  "plugin": ["wizard@git+https://github.com/redhuntlabs/wizard.git#v1.0.0"]
}
```

## Tool name mapping

OpenCode equivalents for Claude Code tools referenced in skills:

| Claude Code | OpenCode |
|---|---|
| `Skill` | `skill` |
| `Task` (subagent) | `@mention` syntax |
| `TodoWrite` | `todowrite` |
| `Read` / `Write` | native file tools |

## Troubleshooting

If skills don't appear:

1. `opencode run --print-logs "hello" 2>&1 | grep -i wizard`
2. Verify the plugin line in `opencode.json`
3. Update OpenCode to a recent version

## Uninstall

Remove the entry from your `opencode.json` and restart OpenCode.
