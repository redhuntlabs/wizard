---
name: sharing-a-spell
description: Use when exporting a spell for someone else to use. Produces a portable file in either Wizard format or strict (upstream-compatible) format.
kind: workflow
audience: anyone
ai-tools: any
complexity: simple
time: under 2 min
version: 1.0.0
source: bundled
---

# Sharing a Spell

<!-- token-budget-exception: three export modes (default/strict/bundle) each need explanation -->

## What this does

Exports one of your spells as a portable markdown file (or zip with examples) that others can drop into their own library.

Two modes:

- **default**: keeps full Wizard frontmatter
- **strict**: strips Wizard-specific fields for compatibility with the upstream Obra-style format

Nothing is sent over the network. Sharing means producing a file; you decide how to deliver it.

## When to use

- User invoked `/share-spell <name>`
- User wants to publish to the community repo
- User wants to send a colleague their workflow

## What you bring (Inputs)

- The name of the spell to share
- (Optional) Mode: default, `--strict`, or `--bundle`

## What you get (Output)

- **default mode**: a single `<name>.md` file with full frontmatter
- **strict mode**: a single `<name>.md` file with only `name` + `description` frontmatter
- **bundle mode**: a `<name>.zip` containing the SKILL.md and any `examples/` and `references/` folders

## How it works (Steps)

This is a workflow.

## Stages

### Stage 1: Locate the spell

Find it in `$WIZARD_HOME` or bundled `spells/`. Reject if not found; offer name suggestions.

### Stage 2: Choose mode

If the user didn't specify, ask:

- "Default" — for someone using Wizard
- "Strict" — for someone using the upstream Obra-style format (see CHANGELOG for the upstream repo URL)
- "Bundle" — include examples/ and references/ as a zip

### Stage 3: Generate the export

**Default mode**: copy the SKILL.md verbatim (frontmatter and body).

**Strict mode**: re-emit frontmatter with only `name` and `description`. Strip body sections that don't exist in the upstream format if any. Add a footer comment: `<!-- Originally exported from Wizard. -->`

**Bundle mode**: zip the SKILL.md plus any peer folders. Strict-mode flag still applies to the SKILL.md inside the zip.

### Stage 4: Write the export

Default location: `~/Desktop/<name>.md` (or `.zip`). Allow user to override with `--out <path>`.

### Stage 5: Print install instructions

Print a one-liner the recipient can run:

```
mv <name>.md $WIZARD_HOME/personal/<name>/SKILL.md
```

For strict mode, the upstream Obra-style install path:

```
mv <name>.md ~/.claude/skills/<name>/SKILL.md
```

## Checkpoints

- **After Stage 1**: file located
- **After Stage 2**: mode selected
- **After Stage 3**: export generated; for strict mode, frontmatter has only `name` + `description`
- **After Stage 4**: file written
- **After Stage 5**: install instructions printed

## Loop-back conditions

Return to Stage 2 when the user changes mode mid-stream.

## Quality bar

The export is good enough when:

- File is at the expected output path
- Default mode preserves all frontmatter
- Strict mode has only `name` + `description` frontmatter
- Bundle mode includes examples/ and references/ if they exist
- Install instruction is correct for the mode

## Variations

- **Inline share** (paste into chat): print the file content instead of writing — useful for sending in Slack/email
- **Anonymized share**: strip mentions of the user's name, employer, etc., before export

## Example

```
/share-spell writing-a-status-update --strict --out ~/Desktop/status.md
```

Output:
- File `~/Desktop/status.md` with frontmatter `name: writing-a-status-update` and `description: Use when...` only
- Body kept intact
- Footer comment about origin
- Install one-liner printed
