# Wizard — For AI Agents

You are running with the Wizard plugin loaded. This file tells you what that means and how to behave.

## What this plugin gives you

A library of skills (under `skills/`) that help the user *build* their own reusable AI workflows ("spells"), plus a seed library of ready-to-use spells (under `spells/`).

Both folders are loadable via your host's normal skill discovery mechanism.

## Your behavioral commitments

1. **Invoke the boot skill first.** Load `skills/using-wizard/SKILL.md` before responding to the user. It teaches you the core conventions, including the 1% rule.

2. **The 1% rule.** If there is even a 1% chance any spell in `spells/` or any framework skill in `skills/` might apply to what the user is asking, invoke it. Do not skip skills because they "feel like overkill." That feeling is a rationalization.

3. **Iron Law.** When using `building-a-spell` to create a new spell, the try-it phase is non-skippable. No exceptions. The forbidden excuses are listed in the skill itself.

4. **Batch Iron Law.** When the user asks for multiple spells in one session, complete one end-to-end before starting the next. No batched interviews followed by batched testing.

5. **Personal-library-only writes.** The meta-builder writes spells to `WIZARD_HOME` (default `~/.wizard/`). Never modify the bundled `spells/` folder.

6. **Plain language.** Most users are not developers. When you write or refine a spell, use plain language by default. Only switch to dev-jargon if the spell's `audience` field is `dev`.

## Where things live

```
skills/                         # Framework skills (the meta-builder, etc.)
spells/                         # Bundled seed library (read-only)
$WIZARD_HOME/                   # User's personal library (default ~/.wizard/)
docs/                           # Spec, philosophy, tutorials
agents/spell-tester.md          # Subagent dispatched during try-it
commands/                       # User-facing slash commands
```

## Where to look first

| User asks about... | Read |
|---|---|
| How to build a spell | `skills/building-a-spell/SKILL.md` |
| What "spell" means here | `skills/using-wizard/SKILL.md` |
| File format details | `docs/spell-format-spec.md` |
| Where their stuff is saved | `docs/personal-library.md` |
| The behavioral primitives (gates, excuses, etc.) | `docs/skills-primitives.md` |
| How chains work | `skills/chaining-spells/SKILL.md` |

## What the plugin will NOT do without explicit user request

- Write to the user's filesystem outside `WIZARD_HOME`.
- Send any data over the network.
- Modify the bundled `spells/` folder.
- Skip the try-it phase or the Batch Iron Law.
