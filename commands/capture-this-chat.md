---
name: capture-this-chat
description: Turn the current chat session into a reusable spell
---

# /capture-this-chat

Captures the current chat session and routes it through `inferring-a-spell-from-examples`. The inference skill produces a draft SKILL.md you can approve, refine, or replace with the regular interview.

## How it works

1. **Detect host tool.** Run `scripts/chat-context/detect-tool.js` to identify which AI tool you're in (Claude Code, Cursor, OpenCode, Codex, Gemini, or Copilot CLI).
2. **Capture transcript.** Invoke the matching wrapper at `scripts/chat-context/<tool>.js` to get the last 50 turns (or `--last N` if specified) as a normalized markdown transcript.
3. **Show consent.** Display: `"Captured N turns from this session. View · Continue · Cancel."` Wait for user choice.
4. **Hand off to inference.** Pass the transcript blob to `inferring-a-spell-from-examples`. The skill produces a strawman.
5. **Resume the meta-builder.** When the user approves the strawman, hand off to `building-a-spell` Stage 2 (kind-route → try-it → save).

## Usage

```
/capture-this-chat
/capture-this-chat --last 20
/capture-this-chat --last all
/capture-this-chat --tool=cursor    # override detection
```

## Fallback when capture fails

If the host tool can't be detected, or the wrapper fails:

```
Couldn't capture chat from <Tool> automatically.
Reason: <reason>

Two ways to continue:
  1. Save your chat to a file and run:
       /build-spell --from-transcript <path>
  2. Run the regular interview:
       /build-spell

See docs/capturing-chats.md for setup help.
```

## Privacy

- All capture is local. No network call.
- Tool calls in the transcript are summarized (not raw JSON) before inference reads them.
- The transcript is shown to you before inference runs (consent moment).
- Nothing is written to disk except the final saved skill at Stage 4.
