#!/usr/bin/env bash
set -euo pipefail
SCRIPT="$(cd "$(dirname "$0")/../.." && pwd)/scripts/chat-context/detect-tool.js"

run() {
  local label="$1"; shift
  local expected="$1"; shift
  local got
  got=$(env -i HOME="$HOME" PATH="$PATH" "$@" node "$SCRIPT")
  if [ "$got" = "$expected" ]; then
    echo "OK   $label → $got"
  else
    echo "FAIL $label → expected $expected, got $got"
    exit 1
  fi
}

run "no env"                 "unknown"
run "claude-code env"        "claude-code"  CLAUDE_TRANSCRIPT_PATH=/tmp/x
run "cursor env"             "cursor"       CURSOR_AGENT_TRANSCRIPT_DIR=/tmp/x
run "codex env"              "codex"        CODEX_SESSION_DIR=/tmp/x
run "gemini env"             "gemini"       GEMINI_SESSION_FILE=/tmp/x
run "opencode env"           "opencode"     OPENCODE_PLUGIN_CONTEXT=1
run "copilot env"            "copilot"      COPILOT_SESSION_ID=abc123

echo
echo "All detect-tool tests passed."
