# Capturing chats

`/capture-this-chat` reads your current AI session and turns it into a draft spell. This page covers per-tool setup, troubleshooting, and the privacy guarantees.

## Quick reference

| Tool | Setup needed | Status |
|---|---|---|
| Claude Code | Nothing — works automatically | v1.0 |
| OpenCode | Nothing — works via the bundled plugin | v1.0 |
| Cursor | Nothing — works automatically | v1.0 |
| Codex CLI | Will work in v1.0.1 | Planned |
| Gemini CLI | Will work in v1.0.1 | Planned |
| GitHub Copilot CLI | Will work in v1.0.2 | Planned |

For tools not yet supported, save your chat to a file and use `/build-spell --from-transcript <path>`.

## Privacy

- All capture is **local**. No network call is made by any wrapper.
- Tool calls in the transcript are **summarized**, not sent raw. (E.g. "ran web_search" is preserved; the search arguments and full results are not.)
- The captured transcript is **shown to you before inference runs**. You can `View · Continue · Cancel`.
- Nothing is written to disk except the final saved skill. The transcript stays in memory.

> **Secrets warning.** If your transcript contains API keys, tokens, or other secrets in tool outputs, they may appear in the transcript. Review the captured transcript at the consent moment before continuing. Automated secret-scrubbing is planned for v1.1.

## Per-tool setup

### Claude Code

The `CLAUDE_TRANSCRIPT_PATH` environment variable is set automatically by Claude's session-start hook (configured in `hooks/hooks.json`). No extra setup.

### OpenCode

The bundled plugin at `.opencode/plugins/wizard.js` handles capture. Make sure the plugin is loaded in your `opencode.json`.

### Cursor

The wrapper auto-detects the most-recently-modified transcript in `~/.cursor/projects/<workspace-id>/agent-transcripts/`. If you have multiple Cursor windows open, capture grabs the most-recent — verify with the consent-moment header.

### Codex CLI / Gemini CLI / Copilot CLI

Not yet shipped. For these tools, use `/build-spell --from-transcript <path>`.

## Troubleshooting

### "Couldn't capture chat from <Tool> automatically"

Three causes, in order of likelihood:

1. **Env var not set.** Some tools require explicit env vars. See per-tool setup above.
2. **Wrong session captured.** If you have multiple sessions running in the same tool, the wrapper may grab the wrong one. Use `/capture-this-chat --tool=<tool>` to override detection, or use `--from-transcript <path>` with an explicit file.
3. **Tool version unsupported.** Tested versions are documented per wrapper. Newer versions may change session storage; the fallback is always `--from-transcript`.

### "TOO-THIN: not enough structure to infer a skill"

Your session is fewer than 5 substantive turns or shows no repeated pattern. Either keep working in the session and try again later, or run the regular interview: `/build-spell`.

### "TOO-BROAD: I see two tasks here"

Your session contains 2+ distinct tasks. Pick one with a follow-up message, or capture them separately.

## Override flags

```
/capture-this-chat --last 20            # capture last 20 turns instead of 50
/capture-this-chat --last all           # capture entire session
/capture-this-chat --tool=cursor        # override detection
```
