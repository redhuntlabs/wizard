# Wizard for Developers

Wizard is a meta-builder for skills, runnable in any AI coding tool, with first-class support for non-dev workflows AND dev workflows. If you only want the dev parts, this page is for you. (For prior-art and provenance, see the Lineage section in the [README](../README.md).)

## What you get for dev work

Out of the box, the bundled library includes a `dev/` track:

- [brainstorming-a-feature](../spells/dev/brainstorming-a-feature/SKILL.md)
- [writing-an-implementation-plan](../spells/dev/writing-an-implementation-plan/SKILL.md)
- [executing-a-plan-step-by-step](../spells/dev/executing-a-plan-step-by-step/SKILL.md)
- [verifying-before-shipping](../spells/work/verifying-before-shipping/SKILL.md) — discipline-kind
- [responding-to-feedback](../spells/work/responding-to-feedback/SKILL.md) — code review responses
- [wrapping-up-a-piece](../spells/work/wrapping-up-a-piece/SKILL.md) — closing-pass discipline

Plus the chained workflow [dev-tdd-loop](../spells/chains/dev-tdd-loop/SKILL.md) which composes the four core dev spells into one runnable pipeline.

## 5-minute setup

Pick your tool. Each integration is one of: a plugin descriptor (Claude Code, Cursor), a CLI extension (Gemini), or an `AGENTS.md` (Codex, OpenCode, Copilot CLI). See [the README](../README.md#install) for tool-by-tool instructions.

## Try it: dev-tdd-loop

```
/cast-spell dev-tdd-loop
```

Drop in a feature ticket. The chain:

1. `brainstorming-a-feature` — sharp problem statement, 3-5 approaches, recommendation, alternative
2. `writing-an-implementation-plan` — file-level plan with per-step verifications
3. `executing-a-plan-step-by-step` — execute with discipline; failures stop and diagnose
4. `verifying-before-shipping` — gates "done" behind explicit acceptance-criteria verification

## Build your own dev spells

```
/build-spell
```

The meta-builder interviews you, drafts the SKILL.md, runs a try-it test, and saves to `$WIZARD_HOME` (default `~/.wizard/`). It supports four kinds:

- `content` — produces a written artifact (PR descriptions, commit messages, postmortems)
- `workflow` — multi-stage process (release checklist, incident response)
- `discipline` — non-negotiable rule + excuses table + hard gate (no merge without tests, never paste secrets, etc.)
- `subagent` — dispatches helper agents in parallel (researching N libraries, scanning N repos)

Discipline-kind spells are pressure-tested: built first, then run twice — once without the skill (baseline), once with — to verify the skill actually changes behavior.

## Upstream-format compatibility

You can export any spell in **strict** mode for compatibility with the upstream skill-file format:

```
/share-spell writing-an-implementation-plan --format strict
```

This drops Wizard-specific frontmatter (`kind`, `audience`, `complexity`) and emits a vanilla SKILL.md. See [sharing-spells.md](sharing-spells.md).

## What this isn't trying to be

- A replacement for the upstream framework. If you want the upstream dev workflow specifically, install that. We're a standalone, generalized framework — see the Lineage section in the [README](../README.md).
- A test framework. The "tests" in TDD-for-skills are interview/try-it cycles, not pytest.
- A code agent. We give your existing AI assistant better recipes; we don't run code ourselves.

## Where to go next

- [philosophy.md](philosophy.md) — why behavioral engineering matters; the 1% rule
- [skills-primitives.md](skills-primitives.md) — the building blocks (excuses tables, hard gates, warning signs)
- [taxonomy.md](taxonomy.md) — when to use which kind
- [general-parity-tutorial.md](general-parity-tutorial.md) — end-to-end walkthrough of building a non-trivial dev workflow
- [definition-of-done.md](definition-of-done.md) — V1 release criteria + the 6 self-tests
