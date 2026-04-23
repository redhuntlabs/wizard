#!/usr/bin/env node
// new-spell.js
// Scaffolds a new SKILL.md from the appropriate template into the wizard home dir.
//
// Usage:
//   node scripts/new-spell.js <name> [--kind <kind>] [--category <cat>] [--template simple|full|chained]

import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { join, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { wizardHome } from "./wizard-home.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, "..");
const WIZARD_HOME = wizardHome();

function parseArgs(argv) {
  const args = { positional: [] };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a.startsWith("--")) {
      args[a.slice(2)] = argv[++i];
    } else {
      args.positional.push(a);
    }
  }
  return args;
}

function templatePath(template) {
  if (template === "simple") return join(REPO_ROOT, "templates", "spell-template-simple.md");
  if (template === "chained") return join(REPO_ROOT, "templates", "spell-template-chained.md");
  return join(REPO_ROOT, "templates", "spell-template.md");
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const name = args.positional[0];
  if (!name) {
    console.error("Usage: new-spell.js <name> [--kind K] [--category C] [--template T]");
    process.exit(2);
  }
  if (!/^[a-z][a-z0-9-]+$/.test(name)) {
    console.error(`name "${name}" must be lowercase-hyphenated`);
    process.exit(2);
  }

  const kind = args.kind || "content";
  const category = args.category || "personal";
  const template = args.template || (kind === "workflow" ? "chained" : "full");

  const tpl = readFileSync(templatePath(template), "utf8");
  const filled = tpl
    .replace(/<lowercase-hyphenated-name>|<name>|<chain-name>/g, name)
    .replace(/<Display Name>/g, name.split("-").map((w) => w[0].toUpperCase() + w.slice(1)).join(" "))
    .replace(/^kind: <.*?>$/m, `kind: ${kind}`);

  const dest = join(WIZARD_HOME, category, name);
  if (existsSync(join(dest, "SKILL.md"))) {
    console.error(`already exists: ${join(dest, "SKILL.md")}`);
    console.error("use a different name or delete the existing file first.");
    process.exit(1);
  }
  mkdirSync(dest, { recursive: true });
  writeFileSync(join(dest, "SKILL.md"), filled);

  console.log(`Created: ${join(dest, "SKILL.md")}`);
  console.log(`Open in your editor and fill in the placeholders.`);
  console.log(`Then validate: node scripts/validate-spell.js "${join(dest, "SKILL.md")}"`);
}

main();
