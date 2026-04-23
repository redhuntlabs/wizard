# Sharing Spells

Spells are plain Markdown files. You can share one with a friend, publish a personal pack to GitHub, or contribute upstream. The `/share-spell` command supports three export modes.

## The three export modes

### Default mode

Exports the SKILL.md as-is, with full Wizard frontmatter (`kind`, `audience`, `complexity`, `version`, `source`, etc.).

```
/share-spell writing-an-email
```

Output: a single SKILL.md file the recipient can drop into their `$WIZARD_HOME` and use immediately if they have Wizard installed.

**Use when**: sharing with someone who also uses Wizard.

### Strict mode

Exports the SKILL.md stripped of Wizard-specific frontmatter, leaving only the fields that match the upstream skill-file format. (See the Lineage section in the [README](../README.md) for what "upstream" means here.)

```
/share-spell writing-an-email --format strict
```

Removed: `kind`, `audience`, `complexity`, `time`, `source`. Body sections that are kind-specific (e.g., the discipline-kind `<MUST-STOP>` block) are preserved as plain Markdown.

**Use when**: sharing with someone who uses the upstream framework and not Wizard. The output is a vanilla SKILL.md they can drop in.

### Bundle mode

Exports the SKILL.md plus its examples, references, workflow-shape templates, and any composed spells, packaged as a `.zip`.

```
/share-spell general-research-loop --format bundle
```

Output: `general-research-loop-bundle.zip` containing the chain SKILL.md plus the four composed spells and their examples.

**Use when**: sharing a chain or a discipline-kind spell that needs its examples to be useful.

## How to install a shared spell

The recipient drops the file (or unzips the bundle) into their `$WIZARD_HOME`:

```
~/.wizard/spells/<category>/<spell-name>/SKILL.md
```

Then it's discoverable via `/list-spells` and usable via `/cast-spell <name>`.

## Publishing a pack

A "pack" is a folder of related spells shared together. Suggested layout:

```
my-pack/
  README.md          # what's in the pack, who it's for
  spells/
    <name>/SKILL.md
    <name>/SKILL.md
    ...
```

Push to GitHub. Users clone or download into `$WIZARD_HOME/spells/`.

There is no central registry in V1 — you share via GitHub, gist, or attachment.

## Versioning shared spells

When you share, the `version` field travels with the file. Recipients will see updates if the source publishes a newer version. See [versioning-and-updates.md](versioning-and-updates.md) for the semver rules.

## Contributing back to the bundled library

If you've built a spell that's broadly useful — likely a content or workflow kind that would help "anyone" — open a PR against this repo. See [CONTRIBUTING.md](../CONTRIBUTING.md). The bar for the bundled library is high; expect to provide:

- Worked examples
- Validator passing
- Tester verdict (PASS) attached to the PR

For audience-specific or specialist spells, prefer publishing as a community pack rather than bundled.

## What does NOT travel

- Your `$WIZARD_HOME` notes file
- Local conflict-resolution markers
- Telemetry (we don't collect any)

The shared file is exactly what the recipient gets.
