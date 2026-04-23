import { execSync } from "node:child_process";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import assert from "node:assert/strict";

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(__dirname, "../../..");
const wrapper = join(repoRoot, "scripts/chat-context/opencode.js");
const fixture = join(__dirname, "fixture-session.json");

const out = execSync(
  `node ${wrapper}`,
  { env: { ...process.env, OPENCODE_SESSION_FILE: fixture }, encoding: "utf8" },
);

const json = JSON.parse(out);
assert.equal(json.turnCount, 5);
assert.equal(json.source.tool, "opencode");
assert.match(json.transcript, /## Turn 1 — User/);
assert.match(json.transcript, /## Turn 5 — User/);

console.log("OpenCode wrapper test passed.");
