import { execSync } from "node:child_process";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import assert from "node:assert/strict";

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(__dirname, "../../..");
const wrapper = join(repoRoot, "scripts/chat-context/claude-code.js");
const fixture = join(__dirname, "fixture-session.jsonl");

const out = execSync(
  `node ${wrapper}`,
  { env: { ...process.env, CLAUDE_TRANSCRIPT_PATH: fixture }, encoding: "utf8" },
);

const json = JSON.parse(out);
assert.equal(json.turnCount, 6);
assert.equal(json.source.tool, "claude-code");
assert.match(json.transcript, /## Turn 1 — User/);
assert.match(json.transcript, /## Turn 6 — Agent/);
assert.match(json.transcript, /\[tool calls collapsed:/);

console.log("Claude Code wrapper test passed.");
