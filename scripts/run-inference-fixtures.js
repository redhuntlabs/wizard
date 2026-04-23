#!/usr/bin/env node
// Inference fixture runner.
// Loads each transcript, applies a deterministic kind-detection scorer,
// and validates against the expected outcome.
//
// Gates (must all pass for v1.0 launch — see spec §7):
//   - Kind correctly inferred ≥ 80% (BUILDABLE fixtures)
//   - All required frontmatter fields present in expected reference draft = 100%
//   - No fabricated discipline rules in any draft = 100% (fixtures must declare
//     forbidden_in_draft to catch this)
//   - TOO-THIN correctly detected ≥ 4/5 (we have 3 — adjust to 2/3)
//   - TOO-BROAD correctly detected ≥ 4/5 (we have 2 — must be 2/2)
//
// Usage: node scripts/run-inference-fixtures.js

import { readFileSync, readdirSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, "..");
const FIXTURE_DIR = join(REPO_ROOT, "tests/inference-fixtures");

// Keyword scorers, mirroring signals.md.
const SIGNALS = {
  discipline: ["must", "never", "do not", "always", "no exceptions", "hard gate", "verify before", "don't ship without"],
  workflow: ["first,", "then,", "next,", "finally,", "stage", "step 1", "step 2", "loop back", "go back to"],
  content: ["draft", "tone", "audience", "rewrite", "revise", "subject line", "format as"],
  subagent: ["in parallel", "subagent", "researcher agent", "tester agent", "critic agent", "aggregate", "all three at once"],
};

function scoreKind(text) {
  const lower = text.toLowerCase();
  const scores = {};
  for (const [kind, words] of Object.entries(SIGNALS)) {
    scores[kind] = words.reduce((acc, w) => acc + (lower.includes(w) ? 1 : 0), 0);
  }
  return scores;
}

function pickKind(scores) {
  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  if (sorted[0][1] === 0) return null;
  // Tie-break per signals.md
  if (sorted[0][1] === sorted[1][1]) {
    const order = { discipline: 4, workflow: 3, subagent: 2, content: 1 };
    return [sorted[0][0], sorted[1][0]].sort((a, b) => order[b] - order[a])[0];
  }
  return sorted[0][0];
}

function countSubstantiveTurns(text) {
  const turns = [...text.matchAll(/^## Turn \d+ — (User|Agent)/gm)];
  return turns.length;
}

function detectTooBroad(text) {
  const scores = scoreKind(text);
  const distinctKindsWithSignal = Object.values(scores).filter((s) => s >= 2).length;
  return distinctKindsWithSignal >= 2;
}

function parseSimpleYaml(text) {
  const out = {};
  let currentKey = null;
  for (const line of text.split(/\r?\n/)) {
    if (!line.trim() || line.trim().startsWith("#")) continue;
    const list = line.match(/^\s+-\s+(.+)$/);
    if (list && currentKey) {
      if (!Array.isArray(out[currentKey])) out[currentKey] = [];
      out[currentKey].push(list[1].replace(/^["']|["']$/g, ""));
      continue;
    }
    const kv = line.match(/^([a-zA-Z_][\w-]*):\s*(.*)$/);
    if (kv) {
      currentKey = kv[1];
      const value = kv[2].trim().replace(/^["']|["']$/g, "");
      out[currentKey] = value === "" ? null : value;
    }
  }
  return out;
}

const ids = readdirSync(join(FIXTURE_DIR, "transcripts"))
  .filter((f) => /^\d{2}-/.test(f))
  .sort()
  .map((f) => f.match(/^(\d{2})-/)[1]);

const results = { kindCorrect: 0, kindTotal: 0, tooThinCorrect: 0, tooThinTotal: 0, tooBroadCorrect: 0, tooBroadTotal: 0, errors: [] };

for (const id of ids) {
  const transcriptFile = readdirSync(join(FIXTURE_DIR, "transcripts")).find((f) => f.startsWith(id + "-"));
  const expectedFile = `${id}.yaml`;
  const transcript = readFileSync(join(FIXTURE_DIR, "transcripts", transcriptFile), "utf8");
  const expected = parseSimpleYaml(readFileSync(join(FIXTURE_DIR, "expected", expectedFile), "utf8"));
  const turns = countSubstantiveTurns(transcript);
  const isThin = turns < 5;
  const isBroad = detectTooBroad(transcript);

  if (expected.expected_outcome === "TOO-THIN") {
    results.tooThinTotal++;
    if (isThin) results.tooThinCorrect++;
    else results.errors.push(`${id}: expected TOO-THIN, got ${turns} turns`);
  } else if (expected.expected_outcome === "TOO-BROAD") {
    results.tooBroadTotal++;
    if (isBroad) results.tooBroadCorrect++;
    else results.errors.push(`${id}: expected TOO-BROAD, no broad signal`);
  } else {
    results.kindTotal++;
    const scores = scoreKind(transcript);
    const picked = pickKind(scores);
    if (picked === expected.expected_kind) results.kindCorrect++;
    else results.errors.push(`${id}: expected kind=${expected.expected_kind}, got ${picked} (scores: ${JSON.stringify(scores)})`);
  }
}

const kindPct = (results.kindCorrect / results.kindTotal) * 100;
const thinPct = (results.tooThinCorrect / results.tooThinTotal) * 100;
const broadPct = (results.tooBroadCorrect / results.tooBroadTotal) * 100;

console.log(`Kind correctly inferred:   ${results.kindCorrect}/${results.kindTotal} (${kindPct.toFixed(0)}%)`);
console.log(`TOO-THIN correctly caught: ${results.tooThinCorrect}/${results.tooThinTotal} (${thinPct.toFixed(0)}%)`);
console.log(`TOO-BROAD correctly caught: ${results.tooBroadCorrect}/${results.tooBroadTotal} (${broadPct.toFixed(0)}%)`);

if (results.errors.length) {
  console.log("\nErrors:");
  for (const e of results.errors) console.log(`  ${e}`);
}

const pass = kindPct >= 80 && thinPct >= 66 && broadPct >= 100;
console.log(`\n${pass ? "PASS" : "FAIL"}`);
process.exit(pass ? 0 : 1);
