#!/usr/bin/env node
// scripts/chat-context/detect-tool.js
// Detects the host AI tool from environment signals.
// Usage:
//   node scripts/chat-context/detect-tool.js
// Prints one of: claude-code | cursor | codex | gemini | opencode | copilot | unknown
// Exit 0 always (unknown is a valid result).

import { existsSync, statSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { homedir } from "node:os";

function recentlyModified(dir, maxAgeMs) {
  if (!existsSync(dir)) return false;
  try {
    const entries = readdirSync(dir);
    const now = Date.now();
    return entries.some((e) => {
      try {
        const m = statSync(join(dir, e)).mtimeMs;
        return now - m < maxAgeMs;
      } catch { return false; }
    });
  } catch { return false; }
}

function detect() {
  const env = process.env;
  const home = homedir();
  const FIVE_MIN = 5 * 60 * 1000;

  if (env.CLAUDE_TRANSCRIPT_PATH) return "claude-code";
  if (env.CURSOR_AGENT_TRANSCRIPT_DIR || (process.title || "").includes("cursor")) return "cursor";
  if (env.CODEX_SESSION_DIR) return "codex";
  if (recentlyModified(join(home, ".codex/sessions"), FIVE_MIN)) return "codex";
  if (env.GEMINI_SESSION_FILE) return "gemini";
  if (env.OPENCODE_PLUGIN_CONTEXT) return "opencode";
  if (env.COPILOT_SESSION_ID) return "copilot";
  return "unknown";
}

console.log(detect());
