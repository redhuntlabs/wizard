#!/usr/bin/env bash
# tests/e2e/capture-this-chat-claude-code.sh
# E2E: /capture-this-chat in Claude Code mode produces a normalized transcript.

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
cd "$REPO_ROOT"

FIXTURE="tests/chat-context/claude-code/fixture-session.jsonl"
[ -f "$FIXTURE" ] || { echo "FAIL: fixture not found"; exit 1; }

DETECTED=$(env CLAUDE_TRANSCRIPT_PATH="$FIXTURE" node scripts/chat-context/detect-tool.js)
if [ "$DETECTED" != "claude-code" ]; then
  echo "FAIL: detector picked '$DETECTED', expected 'claude-code'"
  exit 1
fi

OUT=$(env CLAUDE_TRANSCRIPT_PATH="$FIXTURE" node scripts/chat-context/claude-code.js)
echo "$OUT" | node -e '
  const data = JSON.parse(require("fs").readFileSync(0, "utf8"));
  if (data.source.tool !== "claude-code") { console.error("source mismatch"); process.exit(1); }
  if (!data.transcript.includes("## Turn 1 — User")) { console.error("missing Turn 1"); process.exit(1); }
  if (!data.transcript.includes("captured:")) { console.error("missing captured header"); process.exit(1); }
  if (!data.transcript.includes("turns:")) { console.error("missing turns header"); process.exit(1); }
'

if ! grep -q "scripts/chat-context" commands/capture-this-chat.md; then
  echo "FAIL: capture-this-chat.md does not reference the wrapper scripts"
  exit 1
fi

echo "PASS e2e: /capture-this-chat in Claude Code is wired end-to-end."
