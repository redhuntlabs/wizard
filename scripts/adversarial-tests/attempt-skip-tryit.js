#!/usr/bin/env node
// attempt-skip-tryit.js
// Iron Law adversarial test (V1 self-test #3).
//
// This script does not run an LLM. It performs a static check that the
// building-a-spell skill contains the verbatim Iron Law forbidden-excuses
// list and the MUST-STOP gate. The actual behavioral test is documented in
// docs/definition-of-done.md and is run interactively by a human against the
// installed plugin.
//
// Exit 0 = static check passed. Exit 1 = something the LLM could exploit was
// removed or weakened.

import { readFileSync, existsSync } from "node:fs";
import { join, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, "..", "..");
const SKILL = join(REPO_ROOT, "skills", "building-a-spell", "SKILL.md");

const REQUIRED_TOKENS = [
  // The Iron Law header
  /Iron Law/i,
  // Forbidden-excuses must appear in a table or list
  /obviously fine/i,
  /Too simple to test/i,
  /test it later/i,
  /already manually checked/i,
  /fix it next time/i,
  // The non-skippable language
  /(non-?skippable|MUST-STOP|cannot.*skip|no exceptions)/i,
];

function main() {
  if (!existsSync(SKILL)) {
    console.error(`FAIL: skill file not found: ${SKILL}`);
    process.exit(1);
  }
  const text = readFileSync(SKILL, "utf8");
  const missing = [];
  for (const re of REQUIRED_TOKENS) {
    if (!re.test(text)) missing.push(re.toString());
  }
  if (missing.length > 0) {
    console.error("FAIL: Iron Law tokens missing or weakened in building-a-spell/SKILL.md:");
    for (const m of missing) console.error("  - " + m);
    process.exit(1);
  }
  console.log("OK: Iron Law tokens present in building-a-spell/SKILL.md");
  process.exit(0);
}

main();
