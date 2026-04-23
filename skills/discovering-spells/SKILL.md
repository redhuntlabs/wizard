---
name: discovering-spells
description: Use when browsing what spells are available - bundled seeds, your personal library, or both. Filter by kind, audience, or update status.
kind: workflow
audience: anyone
ai-tools: any
complexity: simple
time: under 2 min
version: 1.0.0
source: bundled
---

# Discovering Spells

<!-- token-budget-exception: discovery + filtering + update detection requires extra examples -->

## What this does

Lists spells available in the current session: bundled seeds, the user's personal library, and (optionally) updates available for overrides.

Output is grouped, scannable, and ranked by relevance to the user's recent context.

## When to use

- User invoked `/list-spells`
- User asks "what skills do I have?" or "what spells exist?"
- User wants to see updates to their overrides

## What you bring (Inputs)

- (Optional) Filter flags: `--kind`, `--audience`, `--mine`, `--bundled`, `--updates`
- (Optional) Recent context (used for ranking; auto-extracted)

## What you get (Output)

A grouped list of matching spells, each shown as: `name — description (kind / audience / version)`.

## How it works (Steps)

This is a workflow.

## Stages

### Stage 1: Resolve sources

Default sources: bundled `spells/` + `$WIZARD_HOME`. If `--mine`, only personal. If `--bundled`, only bundled.

### Stage 2: Apply filters

Apply each flag in turn. Filter by `kind`, `audience`, etc. as the user specified.

### Stage 3: Detect overrides and updates

For each personal spell, check if a bundled spell with the same name exists.

If yes and the bundled version is newer than the personal version, mark the entry with `(update available: bundled vX.Y.Z)`.

If `--updates` flag is set, only show entries where an update is available.

### Stage 4: Rank by relevance

Rank by:

1. Update available (top, if `--updates`)
2. Recently invoked
3. Trigger keyword overlap with recent user messages
4. Alphabetical within group

### Stage 5: Group and print

Group by kind, then by audience. Print:

```
Discipline (3)
  - verifying-before-citing — Use when about to state a factual claim... (researcher / 1.0.0)
  - decisions-need-an-alternative — Use when making a choice... (anyone / 1.0.0) [update available: 1.1.0]
  ...

Workflow (5)
  ...
```

Show counts in headers. If a group is empty, omit it.

### Stage 6: Print actions

End with one-liner suggestions:

- "Run a spell: `/cast-spell <name>`"
- "Build a new one: `/build-spell`"
- "Update one: `/refine-spell <name>` (or take bundled: `/refine-spell <name> --take-bundled`)"

## Checkpoints

- **After Stage 1**: source list resolved
- **After Stage 2**: filtered set generated
- **After Stage 3**: overrides + updates marked
- **After Stage 4**: ranked
- **After Stage 5**: printed grouped
- **After Stage 6**: actions printed

## Loop-back conditions

Return to Stage 2 when the user adds or changes a filter mid-list.

## Quality bar

The list is good enough when:

- Every spell in the source set that matches filters is shown
- Overrides and updates are correctly marked
- Output fits on one screen for typical filter results (under 30 entries)

## Variations

- **Search mode**: `--query "<term>"` filters by description contains
- **JSON mode**: `--json` for tooling integration
- **Single-line mode**: `--brief` shows just `name — description`

## Example

```
/list-spells --kind discipline --audience anyone

Discipline / anyone (4):
  - verifying-before-citing — Use when about to state a factual claim... (1.0.0)
  - decisions-need-an-alternative — Use when making a decision... (1.0.0)
  - verifying-before-shipping — Use when about to declare done... (1.0.0)
  - using-wizard — boot skill (1.0.0)

Try: /cast-spell verifying-before-citing
Build a new one: /build-spell
```
