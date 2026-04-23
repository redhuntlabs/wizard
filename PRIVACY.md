# Privacy

**Wizard collects no data. None.**

## What stays on your machine

- Every spell you install, build, or run executes inside your AI tool's local process.
- Spells you build with `/build-spell` are written to `$WIZARD_HOME` (default: `~/.wizard/`) on your local filesystem.
- Interview answers, try-it test outputs, and personal-library contents never leave your machine.

## What we don't do

- No telemetry of any kind — no usage events, no install pings, no error reports.
- No analytics, no fingerprinting, no remote logging.
- No network requests originated by the framework itself. (Your AI tool may make its own network requests to its model provider; that's governed by your AI tool's privacy policy, not ours.)
- No cloud sync, no centralized library, no account.

## What you control

- Your personal spells live in `$WIZARD_HOME` and can be deleted, moved, or version-controlled by you at any time.
- Sharing a spell (via `/share-spell`) is an explicit, user-initiated action that produces a local file you choose what to do with.

## Third-party services

Wizard itself integrates with no third-party services. The AI tool you use it inside (Claude Code, Cursor, Codex, Gemini, OpenCode, Copilot CLI) has its own privacy policy that governs how it processes the prompts and skill content it sees.

## Contact

Questions: open an issue at <https://github.com/redhuntlabs/wizard/issues>.

## Changes

This policy will be updated only if the framework's data behavior changes. Any change will be reflected here and announced in the release notes.

_Last updated: 2026-04-19_
