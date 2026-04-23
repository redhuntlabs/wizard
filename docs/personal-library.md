# Personal Library

Your spells live in your own folder. The framework never touches them on its own.

## Where it lives

The `WIZARD_HOME` environment variable controls the location.

| Platform | Default |
|---|---|
| macOS, Linux | `~/.wizard/` |
| Windows | `%USERPROFILE%\.wizard\` |

Override by setting `WIZARD_HOME` to any absolute path.

## Folder structure

`WIZARD_HOME` mirrors the bundled `spells/` structure:

```
~/.wizard/
  README.md                 # auto-created on first run
  personal/                 # default category for your spells
    <your-name>/SKILL.md
  everyday/                 # override or add to bundled categories
    <your-name>/SKILL.md
  work/
  thinking/
  research/
  dev/
  chains/
```

Categories are just folders. Create new ones as you like.

## Loader resolution order

When the host AI asks for a spell:

1. Check `WIZARD_HOME` first.
2. If not found, check the bundled `spells/` folder.

**User version always wins on name collision.** This means you can override any bundled spell by creating one with the same name in your `WIZARD_HOME`.

## What the meta-builder does

- **Always writes to `WIZARD_HOME`**, never to bundled `spells/`.
- New spell goes to `WIZARD_HOME/<category>/<name>/SKILL.md`.
- Default category if none specified: `personal/`.
- Creates parent directories as needed.

## What the framework never does

- Modifies bundled `spells/` (read-only).
- Overwrites a user spell without explicit confirmation.
- Sends your spells anywhere. Everything stays local.

## First-run initialization

On first session after install, the boot skill checks `WIZARD_HOME`. If it doesn't exist:

1. Creates the directory.
2. Writes a `README.md` with quick-start instructions.
3. Creates an empty `personal/` subfolder.
4. Prints a one-line greeting.

If it already exists, no action.

## Conflict handling

When you build a spell with a name that already exists in your `WIZARD_HOME`:

```
A spell named "writing-an-email" already exists at:
  ~/.wizard/personal/writing-an-email/SKILL.md (version 0.3.2)

What would you like to do?
  1. Overwrite (loses old version)
  2. Save as a new name
  3. Save as a new version (writing-an-email-v2)
  4. Cancel
```

The meta-builder waits for explicit user choice. No silent overwrites.

## Backing up

`WIZARD_HOME` is a plain folder of markdown files. Back it up however you back up anything else (git, Time Machine, Dropbox, rsync). No special tooling needed.

## Sharing across machines

Symlink `WIZARD_HOME` to a synced folder (Dropbox, iCloud Drive, etc.) and your spells follow you across machines. Or commit the folder to a private git repo.

See also: `docs/versioning-and-updates.md` for how bundled-seed updates interact with your overrides.
