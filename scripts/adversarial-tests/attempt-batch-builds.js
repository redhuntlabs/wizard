#!/usr/bin/env node
// attempt-batch-builds.js
// Batch Iron Law adversarial test (V1 self-test #4).
//
// Static check that the building-a-spell and intuitive-interviewing
// skills contain the verbatim Batch Iron Law (Second Iron Law) forbidden
// excuses and the "complete one end-to-end before starting the next" rule.

import { readFileSync, existsSync } from "node:fs";
import { join, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, "..", "..");
const SKILLS = [
  join(REPO_ROOT, "skills", "building-a-spell", "SKILL.md"),
  join(REPO_ROOT, "skills", "intuitive-interviewing", "SKILL.md"),
];

const REQUIRED_TOKENS = [
  /Batch Iron Law|Second Iron Law/i,
  /complete (one|each) spell end-to-end/i,
  /(batch the interviews|share context|draft all)/i,
  /finish this one through save/i,
];

function main() {
  let totalMissing = 0;
  for (const skill of SKILLS) {
    if (!existsSync(skill)) {
      console.error(`FAIL: skill file not found: ${skill}`);
      totalMissing++;
      continue;
    }
    const text = readFileSync(skill, "utf8");
    const missing = REQUIRED_TOKENS.filter((re) => !re.test(text));
    if (missing.length > 0) {
      console.error(`FAIL: Batch Iron Law tokens missing in ${skill}:`);
      for (const m of missing) console.error("  - " + m.toString());
      totalMissing += missing.length;
    } else {
      console.log(`OK: Batch Iron Law tokens present in ${skill}`);
    }
  }
  process.exit(totalMissing === 0 ? 0 : 1);
}

main();
