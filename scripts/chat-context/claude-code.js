#!/usr/bin/env node
// scripts/chat-context/claude-code.js
// Reads a Claude Code transcript JSONL and emits a normalized transcript JSON.
// Usage:
//   node scripts/chat-context/claude-code.js [--last N]
// Reads $CLAUDE_TRANSCRIPT_PATH for the source file.

import { readFileSync, existsSync } from "node:fs";
import { renderTranscript } from "./render-transcript.js";

const args = process.argv.slice(2);
let lastN = 50;
for (let i = 0; i < args.length; i++) {
  if (args[i] === "--last") {
    lastN = args[i + 1] === "all" ? null : parseInt(args[i + 1], 10);
    i++;
  }
}

const path = process.env.CLAUDE_TRANSCRIPT_PATH;
if (!path || !existsSync(path)) {
  process.stderr.write(
    "claude-code wrapper: CLAUDE_TRANSCRIPT_PATH not set or file missing.\n",
  );
  process.exit(1);
}

const lines = readFileSync(path, "utf8").trim().split(/\r?\n/).filter(Boolean);
const turns = lines.map((line) => {
  const obj = JSON.parse(line);
  const tool_calls = (obj.tool_calls || []).map((tc) => ({
    name: tc.name,
    args_summary: JSON.stringify(tc.input || tc.arguments || {}).slice(0, 80),
  }));
  return {
    role: obj.role === "assistant" ? "agent" : obj.role,
    content: typeof obj.content === "string" ? obj.content : JSON.stringify(obj.content),
    tool_calls: tool_calls.length ? tool_calls : undefined,
  };
});

const transcript = renderTranscript({
  turns,
  source: "claude-code",
  transcriptPath: path,
  lastN,
});

console.log(JSON.stringify({
  transcript,
  turnCount: lastN ? Math.min(lastN, turns.length) : turns.length,
  source: { tool: "claude-code", transcriptPath: path, capturedAt: new Date().toISOString() },
}));
