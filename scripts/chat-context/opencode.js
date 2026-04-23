#!/usr/bin/env node
// scripts/chat-context/opencode.js
// Reads an OpenCode session JSON (produced by the plugin) and emits a
// normalized transcript JSON.
// Usage:
//   node scripts/chat-context/opencode.js [--last N]
// Reads $OPENCODE_SESSION_FILE for the source.

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

const path = process.env.OPENCODE_SESSION_FILE;
if (!path || !existsSync(path)) {
  process.stderr.write(
    "opencode wrapper: OPENCODE_SESSION_FILE not set or file missing.\n",
  );
  process.exit(1);
}

const data = JSON.parse(readFileSync(path, "utf8"));
const turns = (data.messages || []).map((m) => ({
  role: m.role === "assistant" ? "agent" : m.role,
  content: typeof m.content === "string" ? m.content : JSON.stringify(m.content),
}));

const transcript = renderTranscript({
  turns,
  source: "opencode",
  sessionId: data.sessionId,
  lastN,
});

console.log(JSON.stringify({
  transcript,
  turnCount: lastN ? Math.min(lastN, turns.length) : turns.length,
  source: { tool: "opencode", sessionId: data.sessionId, capturedAt: new Date().toISOString() },
}));
