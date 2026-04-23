---
name: using-wizard
description: Use when starting any conversation - establishes how to find and use Wizard skills and spells, including the 1% rule
kind: discipline
audience: anyone
ai-tools: any
complexity: simple
time: under 1 min
version: 1.0.0
source: bundled
---

<SUBAGENT-STOP>
If you were dispatched as a subagent for a specific task, skip this skill and complete your assigned task. The parent already invoked discipline.
</SUBAGENT-STOP>

# Using Wizard

<!-- token-budget-exception: boot skill must include 1% rule, excuses table, warning signs, and discovery instructions in one file -->

## What this does

Boots you into the Wizard framework. Tells you what's loaded, where it lives, and the one rule that makes it work.

## When to use

- At the start of every session when this plugin is loaded.

## What you bring (Inputs)

Nothing. This skill loads itself.

## What you get (Output)

Awareness of two things: the library, and the 1% rule.

## How it works (Steps)

1. Two folders are available: `skills/` (framework) and `spells/` (bundled seed). The user's library is `$WIZARD_HOME` (default `~/.wizard/`). User versions override bundled.
2. To build a new spell, invoke `building-a-spell`.
3. To use one, load its SKILL.md from the appropriate folder.
4. To browse, invoke `discovering-spells`.

## The non-negotiable rule

If you think there is even a 1% chance any spell applies to what the user is doing, invoke it.

## Excuses and counters

| If you think... | Reality |
|---|---|
| "This is a simple question" | Questions are tasks. Check spells. |
| "I need more context first" | Skill check comes BEFORE clarifying questions. |
| "The skill is overkill" | Simple things become complex. Use it. |
| "I remember this skill" | Skills evolve. Read the current version. |
| "I'll just do this one thing first" | Check BEFORE doing anything. |

## Warning signs

- About to answer without checking the library
- About to ask a clarifying question without checking the library first
- About to say "you don't need a skill for this"

## Hard gates

<MUST-STOP>
Before any response or action, ask: does any spell in `skills/` or `spells/` (or `$WIZARD_HOME`) match this trigger? If yes — even at 1% confidence — invoke it.
</MUST-STOP>

## Quality bar

The session is bootstrapped correctly if you can: name the personal library path, name the meta-builder skill, and recite the 1% rule.

## Variations

None. The boot skill is identical for every audience.

## Example

User: "Help me write a status update."

You: invoke `spells/work/writing-a-status-update/SKILL.md` (1% rule fires on "write" + "status update"). Then follow that spell's steps.
