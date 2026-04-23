#!/usr/bin/env node
// validate-spell.js
// Validates one or all spell SKILL.md files against the schema and
// the body-section + token-budget rules from docs/spell-format-spec.md.
//
// Usage:
//   node scripts/validate-spell.js <path-to-SKILL.md>
//   node scripts/validate-spell.js <path-to-spell-folder>
//   node scripts/validate-spell.js --all

import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join, basename, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, "..");
const SCHEMA = JSON.parse(
  readFileSync(join(__dirname, "spell.schema.json"), "utf8"),
);

// ---------- token budgets (words) ----------
const TOKEN_BUDGETS = {
  boot: 300,
  framework: 500,
  builder: 1500,
  seed: 800,
};

// Map by name pattern.
function budgetFor(name) {
  if (name === "using-wizard") return TOKEN_BUDGETS.boot;
  if (
    name.startsWith("building-a-") ||
    name === "pressure-testing-a-spell" ||
    name === "inferring-a-spell-from-examples"
  )
    return TOKEN_BUDGETS.builder;
  if (
    name === "intuitive-interviewing" ||
    name === "refining-a-spell" ||
    name === "chaining-spells" ||
    name === "sharing-a-spell" ||
    name === "discovering-spells"
  )
    return TOKEN_BUDGETS.framework;
  return TOKEN_BUDGETS.seed;
}

// ---------- jargon list ----------
const DEV_JARGON = [
  "TDD",
  "RED phase",
  "GREEN phase",
  "REFACTOR phase",
  "monorepo",
  "git worktree",
  "race condition",
  "deserialize",
  "monkey patch",
  "stub",
];

// ---------- required sections ----------
const REQUIRED_BODY_SECTIONS = [
  "What this does",
  "When to use",
  "What you bring (Inputs)",
  "What you get (Output)",
  "How it works (Steps)",
  "Quality bar",
  "Variations",
  "Example",
];

const KIND_EXTRA_SECTIONS = {
  discipline: [
    "The non-negotiable rule",
    "Excuses and counters",
    "Warning signs",
    "Hard gates",
  ],
  workflow: ["Stages", "Checkpoints", "Loop-back conditions"],
  subagent: [
    "Parallelism",
    "Context handed to each subagent",
    "Aggregation",
    "Partial-failure handling",
  ],
};

// ---------- frontmatter parser (zero-deps) ----------
function parseFrontmatter(text) {
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return { frontmatter: null, body: text };
  const fmRaw = match[1];
  const body = match[2];
  const fm = {};
  let currentKey = null;
  for (const line of fmRaw.split(/\r?\n/)) {
    if (!line.trim()) continue;
    const listMatch = line.match(/^\s+-\s+(.+)$/);
    if (listMatch && currentKey) {
      if (!Array.isArray(fm[currentKey])) fm[currentKey] = [];
      fm[currentKey].push(listMatch[1].trim());
      continue;
    }
    const kvMatch = line.match(/^([a-zA-Z][\w-]*):\s*(.*)$/);
    if (kvMatch) {
      currentKey = kvMatch[1];
      const value = kvMatch[2].trim();
      fm[currentKey] = value === "" ? null : value;
    }
  }
  return { frontmatter: fm, body };
}

// ---------- schema check (lightweight, no AJV) ----------
function checkSchema(fm, errors) {
  for (const required of SCHEMA.required) {
    if (!(required in fm) || fm[required] === null || fm[required] === "") {
      errors.push(`missing required frontmatter field: ${required}`);
    }
  }
  if (fm.name && !/^[a-z][a-z0-9-]+$/.test(fm.name)) {
    errors.push(`name "${fm.name}" must be lowercase-hyphenated`);
  }
  if (fm.kind && !SCHEMA.properties.kind.enum.includes(fm.kind)) {
    errors.push(`kind "${fm.kind}" must be one of ${SCHEMA.properties.kind.enum.join(", ")}`);
  }
  if (fm.audience && !SCHEMA.properties.audience.enum.includes(fm.audience)) {
    errors.push(`audience "${fm.audience}" not in allowed list`);
  }
  if (fm.complexity && !SCHEMA.properties.complexity.enum.includes(fm.complexity)) {
    errors.push(`complexity "${fm.complexity}" not in allowed list`);
  }
  if (fm.source && !SCHEMA.properties.source.enum.includes(fm.source)) {
    errors.push(`source "${fm.source}" not in allowed list`);
  }
  if (fm.version && !/^\d+\.\d+\.\d+$/.test(fm.version)) {
    errors.push(`version "${fm.version}" must be semver MAJOR.MINOR.PATCH`);
  }
}

// ---------- body checks ----------
function checkBodySections(fm, body, errors, warnings) {
  const headers = [...body.matchAll(/^##\s+(.+)$/gm)].map((m) => m[1].trim());
  const required = [
    ...REQUIRED_BODY_SECTIONS,
    ...(KIND_EXTRA_SECTIONS[fm.kind] || []),
  ];
  for (const section of required) {
    if (!headers.includes(section)) {
      errors.push(`missing required H2 section: "${section}"`);
    }
  }
}

// ---------- token-budget check ----------
function checkTokenBudget(fm, body, errors, warnings) {
  const wordCount = body.trim().split(/\s+/).filter(Boolean).length;
  const budget = budgetFor(fm.name);
  if (wordCount > budget) {
    if (body.includes("token-budget-exception")) {
      warnings.push(
        `over budget (${wordCount} > ${budget} words) but exception declared`,
      );
    } else {
      errors.push(
        `word count ${wordCount} exceeds budget ${budget} for skill type "${fm.name}". Add "<!-- token-budget-exception: <reason> -->" comment if intentional.`,
      );
    }
  }
}

// ---------- plain-language warnings ----------
function checkPlainLanguage(fm, body, warnings) {
  if (fm.audience === "dev") return; // dev jargon allowed for dev audience
  for (const term of DEV_JARGON) {
    const re = new RegExp(`\\b${term.replace(/[.*+?^${}()|[\\]\\\\]/g, "\\$&")}\\b`, "i");
    if (re.test(body)) {
      warnings.push(`uses dev jargon "${term}" but audience is "${fm.audience}"`);
    }
  }
  const sentences = body
    .replace(/```[\s\S]*?```/g, "")
    .split(/(?<=[.!?])\s+/);
  let longCount = 0;
  for (const s of sentences) {
    if (s.split(/\s+/).length > 30) longCount++;
  }
  if (longCount > 3) {
    warnings.push(`${longCount} sentences over 30 words; consider shortening`);
  }
}

// ---------- file validator ----------
function validateFile(skillPath) {
  const errors = [];
  const warnings = [];
  if (!existsSync(skillPath)) {
    return { ok: false, errors: [`file not found: ${skillPath}`], warnings: [] };
  }
  const text = readFileSync(skillPath, "utf8");
  const { frontmatter, body } = parseFrontmatter(text);
  if (!frontmatter) {
    return { ok: false, errors: ["no YAML frontmatter found"], warnings: [] };
  }
  checkSchema(frontmatter, errors);
  if (frontmatter.kind) {
    checkBodySections(frontmatter, body, errors, warnings);
  }
  if (frontmatter.name) {
    checkTokenBudget(frontmatter, body, errors, warnings);
  }
  if (frontmatter.audience) {
    checkPlainLanguage(frontmatter, body, warnings);
  }
  // name must match folder
  const folderName = basename(dirname(skillPath));
  if (frontmatter.name && frontmatter.name !== folderName) {
    errors.push(
      `frontmatter name "${frontmatter.name}" does not match folder "${folderName}"`,
    );
  }
  return { ok: errors.length === 0, errors, warnings };
}

// ---------- collect all SKILL.md ----------
function findAllSkills(dir) {
  const results = [];
  function walk(d) {
    if (!existsSync(d)) return;
    for (const entry of readdirSync(d)) {
      const full = join(d, entry);
      const s = statSync(full);
      if (s.isDirectory()) walk(full);
      else if (entry === "SKILL.md") results.push(full);
    }
  }
  walk(dir);
  return results;
}

// ---------- main ----------
function main() {
  const arg = process.argv[2];
  if (!arg) {
    console.error(
      "Usage: validate-spell.js <SKILL.md | folder | --all>",
    );
    process.exit(2);
  }

  let files = [];
  if (arg === "--all") {
    files = [
      ...findAllSkills(join(REPO_ROOT, "skills")),
      ...findAllSkills(join(REPO_ROOT, "spells")),
    ];
  } else if (existsSync(arg) && statSync(arg).isDirectory()) {
    const candidate = join(arg, "SKILL.md");
    if (existsSync(candidate)) files = [candidate];
    else files = findAllSkills(arg);
  } else {
    files = [arg];
  }

  let totalErrors = 0;
  let totalWarnings = 0;
  let validated = 0;

  for (const f of files) {
    const { ok, errors, warnings } = validateFile(f);
    validated++;
    const rel = f.replace(REPO_ROOT + "/", "");
    if (ok && warnings.length === 0) {
      console.log(`OK   ${rel}`);
    } else if (ok) {
      console.log(`OK   ${rel}  (${warnings.length} warning${warnings.length === 1 ? "" : "s"})`);
      for (const w of warnings) console.log(`     warn: ${w}`);
    } else {
      console.log(`FAIL ${rel}`);
      for (const e of errors) console.log(`     error: ${e}`);
      for (const w of warnings) console.log(`     warn:  ${w}`);
    }
    totalErrors += errors.length;
    totalWarnings += warnings.length;
  }

  console.log(
    `\n${validated} file${validated === 1 ? "" : "s"} validated, ${totalErrors} error${totalErrors === 1 ? "" : "s"}, ${totalWarnings} warning${totalWarnings === 1 ? "" : "s"}.`,
  );
  process.exit(totalErrors === 0 ? 0 : 1);
}

main();
