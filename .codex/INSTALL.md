# Installing Wizard for Codex

Codex discovers skills via symlinks in `~/.agents/skills/`.

## Prerequisites

- Git
- Node.js 18+

## Installation

1. **Clone the repo:**

   ```bash
   git clone https://github.com/redhuntlabs/wizard.git ~/.codex/wizard
   cd ~/.codex/wizard && npm install
   ```

   `npm install` runs `build-loader-paths.js` which assembles the unified skill directory.

2. **Create the skills symlink:**

   **macOS / Linux:**
   ```bash
   mkdir -p ~/.agents/skills
   ln -s ~/.codex/wizard/.loader-cache/skills ~/.agents/skills/wizard
   ```

   **Windows (PowerShell, no admin needed):**
   ```powershell
   New-Item -ItemType Directory -Force -Path "$env:USERPROFILE\.agents\skills"
   cmd /c mklink /J "$env:USERPROFILE\.agents\skills\wizard" "$env:USERPROFILE\.codex\wizard\.loader-cache\skills"
   ```

3. **Restart Codex** to discover the skills.

## Bootstrap mechanism

Codex auto-loads `AGENTS.md` from the repo root at session start. That file tells the agent the framework is loaded and points to `using-wizard` as the boot skill.

There is no session-start hook on Codex. The `AGENTS.md` mechanism is the documented alternative.

## Verify

```bash
ls -la ~/.agents/skills/wizard
```

Then in Codex, ask: "List my spells"

## Updating

```bash
cd ~/.codex/wizard && git pull && npm install
```

Skills update instantly through the symlink.

## Uninstalling

```bash
rm ~/.agents/skills/wizard
rm -rf ~/.codex/wizard
```
