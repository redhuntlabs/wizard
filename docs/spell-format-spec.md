# Spell File Format

This is the canonical spec for a Wizard spell. The validator (`scripts/validate-spell.js`) enforces it.

## File Layout

A spell is a folder containing at minimum a `SKILL.md` file. The folder name is the spell's `name`.

```
spells/<category>/<name>/
  SKILL.md            # required
  examples/           # optional: worked examples, sample inputs/outputs
  references/         # optional: long reference material loaded on demand
```

## Frontmatter

YAML frontmatter at the top of `SKILL.md`. All fields below the divider are required.

```yaml
---
name: writing-an-email
description: Use when drafting any email - replies, cold outreach, asks, status updates
kind: content
audience: anyone
ai-tools: any
complexity: simple
time: 2-5 min
version: 1.0.0
source: bundled
---
```

### Required fields

| Field | Type | Description |
|---|---|---|
| `name` | string | Lowercase, hyphenated, unique. Must match folder name. Pattern: `^[a-z][a-z0-9-]+$` |
| `description` | string | Trigger pattern. Starts with "Use when..." so the host AI knows when to invoke. |
| `kind` | enum | One of: `content`, `workflow`, `discipline`, `subagent` |
| `audience` | enum | One of: `anyone`, `knowledge-worker`, `researcher`, `dev`, `student`, `founder`, `operator` |
| `ai-tools` | enum or list | `any` or specific tool name(s): `claude`, `cursor`, `codex`, `gemini`, `chatgpt`, `copilot`, `opencode` |
| `complexity` | enum | One of: `simple`, `guided`, `chained`, `long-running` |
| `time` | string | Human-readable estimate. Examples: `2-5 min`, `15 min`, `multi-session` |
| `version` | string | Semver. Bundled seeds start at `1.0.0`. User-built start at `0.1.0`. |
| `source` | enum | One of: `bundled`, `personal`, `community` |

### Optional fields

| Field | Type | Description |
|---|---|---|
| `composes` | list of names | For `kind: workflow` chain spells; lists constituent spell names |
| `tags` | list of strings | Free-form tags for discovery |

## Body Sections

A spell body has these required H2 sections in order:

```markdown
# <Display Name>

## What this does

One paragraph. Plain language. No jargon.

## When to use

Bulleted list of triggering situations. Mirror the description field.

## What you bring (Inputs)

What the user provides at invocation. Be specific.

## What you get (Output)

The artifact, decision, or state change produced.

## How it works (Steps)

Numbered steps. Each step is one focused action.

## Quality bar

How to know the output is good enough. Specific criteria.

## Variations

When to deviate. Common adaptations.

## Example

One worked example: input + output.
```

### Kind-specific additional sections

**`kind: discipline`** must add:

```markdown
## The non-negotiable rule

State the rule as a single sentence. No hedging.

## Excuses and counters

| If you think... | Reality |
|---|---|
| "<common rationalization>" | <counter> |

## Warning signs

Bullet list of signals that the rule is about to be broken.

## Hard gates

Concrete checkpoints where the agent must stop and verify the rule held.
```

**`kind: workflow`** must add:

```markdown
## Stages

Numbered stages with explicit handoff artifacts between them.

## Checkpoints

What must be true to pass each stage gate.

## Loop-back conditions

When to return to an earlier stage.
```

**`kind: subagent`** must add:

```markdown
## Parallelism

How many subagents, when to use serial vs parallel.

## Context handed to each subagent

Explicit declaration. Subagents are stateless.

## Aggregation

How results are combined.

## Partial-failure handling

What to do if some subagents fail.
```

## Token Budgets

Enforced by `validate-spell.js`. Word count of body content (frontmatter excluded).

| Skill type | Budget |
|---|---|
| Boot skills (loaded every session) | under 300 words |
| Frequently-loaded framework skills | under 500 words |
| Builder skills (meta-builders) | under 1500 words |
| Seed spells | under 800 words |
| Heavy reference (loaded on demand) | no limit; document why in a comment |

Going over budget requires a `# token-budget-exception: <reason>` comment in the body.

## Plain-Language Heuristics

The validator runs these checks (warnings, not errors):

- **Jargon list**: flags use of `RED/GREEN/REFACTOR`, `TDD`, `monorepo`, `subagent`, `worktree`, etc. unless `audience: dev`.
- **Sentence length**: warns on sentences over 30 words.
- **Reading level**: warns on Flesch-Kincaid grade above 12 unless `audience: dev` or `audience: researcher`.

## JSON Schema

Validators use the schema at `scripts/spell.schema.json` (generated from this spec). Keep this doc and the schema in sync; the validator checks both.

## Upstream-format compatibility

Our `name` and `description` fields match the upstream skill-file format exactly so files are portable. All other fields are extensions and are non-breaking on import to the upstream framework (it ignores unknown frontmatter keys).

The `sharing-a-spell` skill offers a `--strict` export mode that strips our extra fields for clean upstream-format compatibility. (See the Lineage section in the [README](../README.md) for what "upstream" means here.)

## Provenance footnote (for inferred skills)

Skills produced by `inferring-a-spell-from-examples` carry a provenance footnote at the end of the body. Two forms:

```html
<!-- inferred-from: <transcript-source> -->
<!-- inferred-at: <ISO-8601 timestamp> -->

> _Inferred from `<transcript-source>` on <date>. Quoted segments preserved verbatim._
```

The HTML comments are machine-readable (e.g. `/refine-spell --from-traces` can use them to find related runs). The blockquote is shown to the human reader.

The footnote does NOT use the frontmatter `source` field (which remains `bundled | personal | community`). Provenance lives in the body to keep the schema stable.
