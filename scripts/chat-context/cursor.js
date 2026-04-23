#!/usr/bin/env node
// scripts/chat-context/cursor.js
// Reads a Cursor agent transcript JSONL and emits normalized transcript JSON.
// Usage:
//   node scripts/chat-context/cursor.js [--last N]
// Source: $CURSOR_AGENT_TRANSCRIPT_DIR — picks the most recently modified
// .jsonl file in that directory (recursive).

import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join } from "node:path";
import { renderTranscript } from "./render-transcript.js";

const args = process.argv.slice(2);
let lastN = 50;
for (let i = 0; i < args.length; i++) {
  if (args[i] === "--last") {
    lastN = args[i + 1] === "all" ? null : parseInt(args[i + 1], 10);
    i++;
  }
}

const dir = process.env.CURSOR_AGENT_TRANSCRIPT_DIR;
if (!dir || !existsSync(dir)) {
  process.stderr.write(
    "cursor wrapper: CURSOR_AGENT_TRANSCRIPT_DIR not set or missing.\n",
  );
  process.exit(1);
}

function findJsonlFiles(root) {
  const out = [];
  const stack = [root];
  while (stack.length) {
    const cur = stack.pop();
    let entries;
    try { entries = readdirSync(cur); } catch { continue; }
    for (const e of entries) {
      const p = join(cur, e);
      let st;
      try { st = statSync(p); } catch { continue; }
      if (st.isDirectory()) stack.push(p);
      else if (e.endsWith(".jsonl")) out.push({ path: p, mtime: st.mtimeMs });
    }
  }
  return out;
}

const files = findJsonlFiles(dir).sort((a, b) => b.mtime - a.mtime);
if (!files.length) {
  process.stderr.write(`cursor wrapper: no .jsonl files in ${dir}\n`);
  process.exit(1);
}
const path = files[0].path;

const lines = readFileSync(path, "utf8").trim().split(/\r?\n/).filter(Boolean);
const turns = lines.map((line) => {
  const obj = JSON.parse(line);
  const items = (obj.message && obj.message.content) || [];
  const textParts = [];
  const tool_calls = [];
  for (const it of items) {
    if (it.type === "text" && typeof it.text === "string") textParts.push(it.text);
    else if (it.type === "tool_use") {
      tool_calls.push({
        name: it.name,
        args_summary: JSON.stringify(it.input || {}).slice(0, 80),
      });
    }
  }
  return {
    role: obj.role === "assistant" ? "agent" : obj.role,
    content: textParts.join("\n\n"),
    tool_calls: tool_calls.length ? tool_calls : undefined,
  };
});

const transcript = renderTranscript({
  turns,
  source: "cursor",
  transcriptPath: path,
  lastN,
});

console.log(JSON.stringify({
  transcript,
  turnCount: lastN ? Math.min(lastN, turns.length) : turns.length,
  source: { tool: "cursor", transcriptPath: path, capturedAt: new Date().toISOString() },
}));
