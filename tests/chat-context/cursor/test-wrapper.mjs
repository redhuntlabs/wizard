import { execSync } from "node:child_process";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import assert from "node:assert/strict";

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(__dirname, "../../..");
const wrapper = join(repoRoot, "scripts/chat-context/cursor.js");

const out = execSync(
  `node ${wrapper}`,
  { env: { ...process.env, CURSOR_AGENT_TRANSCRIPT_DIR: __dirname }, encoding: "utf8" },
);

const json = JSON.parse(out);
assert.equal(json.turnCount, 5);
assert.equal(json.source.tool, "cursor");
assert.match(json.transcript, /## Turn 1 — User/);
assert.match(json.transcript, /draft a status email/);
assert.match(json.transcript, /\[tool calls collapsed: Write\(/);
assert.match(json.transcript, /## Turn 5 — User/);

console.log("Cursor wrapper test passed.");
