#!/usr/bin/env node
// scripts/adversarial-tests/attempt-skip-tryit-via-inference.js
// Asserts that the inference path cannot bypass Stage 3 (try-it).
//
// Strategy: scan the inference skill and the building-a-spell SKILL.md
// for any wording that would let an inference-built draft skip try-it.
// Also asserts the Iron Law section explicitly mentions inference.

import { readFileSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "../..");

const inference = readFileSync(
  join(ROOT, "skills/inferring-a-spell-from-examples/SKILL.md"),
  "utf8",
);
const builder = readFileSync(
  join(ROOT, "skills/building-a-spell/SKILL.md"),
  "utf8",
);

const fails = [];

if (/\$WIZARD_HOME|save to disk|write the skill/i.test(inference)) {
  if (!/(Stage 4|hand off|hands? off).*save/is.test(inference)) {
    fails.push(
      "inference SKILL.md appears to claim it saves the skill itself (only Stage 4 in building-a-spell may save).",
    );
  }
}

if (!/Stage 2/.test(inference)) {
  fails.push("inference SKILL.md must reference handing off to Stage 2.");
}
// Look for actual bypass language. The inference skill is allowed to have its
// own internal "Stage 4: Strawman UX" — that is NOT a reference to
// building-a-spell's Stage 4 (save), so a bare "Stage 4" match is too
// loose. Only fail on language that genuinely encourages skipping try-it.
if (/(skip|bypass)\s+(stage\s*3|try-?it)/i.test(inference)) {
  fails.push(
    "inference SKILL.md contains language that suggests skipping try-it / Stage 3.",
  );
}
// Affirmatively assert that try-it (Stage 3) is referenced as still running.
if (!/try-?it/i.test(inference)) {
  fails.push(
    "inference SKILL.md must reference try-it (so the hand-off back to Stage 3 is explicit).",
  );
}

if (!/Iron Law applies equally to inference-built skills/i.test(builder)) {
  fails.push(
    "building-a-spell must state 'Iron Law applies equally to inference-built skills'.",
  );
}

const stageMinus1 = builder.match(/### Stage -1[\s\S]*?(?=### Stage 0|## )/);
if (!stageMinus1) {
  fails.push("building-a-spell has no Stage -1 section.");
} else {
  if (!/Stage 2/.test(stageMinus1[0])) {
    fails.push("Stage -1 must resume at Stage 2.");
  }
  if (/Stage 4/.test(stageMinus1[0])) {
    fails.push(
      "Stage -1 must NOT mention Stage 4 directly (would bypass try-it).",
    );
  }
}

if (fails.length === 0) {
  console.log(
    "PASS attempt-skip-tryit-via-inference: inference cannot bypass Stage 3.",
  );
  process.exit(0);
} else {
  console.log("FAIL attempt-skip-tryit-via-inference:");
  for (const f of fails) console.log(`  - ${f}`);
  process.exit(1);
}
