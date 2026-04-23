---
name: cast-spell
description: Run a spell from your library
---

# /cast-spell

Load and execute a named spell. Looks in your `WIZARD_HOME` first, then in the bundled seed library.

## Usage

```
/cast-spell writing-an-email
/cast-spell preparing-for-a-meeting
/cast-spell personal/my-custom-workflow
```

If no name is given, the `discovering-spells` skill is invoked instead so you can browse.

If the name does not match exactly, the framework suggests close matches by description.

## What happens next

The named spell's SKILL.md is loaded. The agent then executes its `How it works (Steps)` section, prompting you for inputs as needed.
