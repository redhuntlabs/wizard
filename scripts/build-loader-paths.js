#!/usr/bin/env node
// build-loader-paths.js
// Assembles the unified loader cache that platforms (Codex, etc.) symlink into.
// Cache layout:
//   .loader-cache/
//     skills/
//       <skill-name>/SKILL.md       <- from repo skills/
//       <spell-name>/SKILL.md       <- from repo spells/<category>/
//
// Cross-platform: tries symlink, falls back to junction (Windows), falls back to copy.

import {
  existsSync,
  mkdirSync,
  readdirSync,
  rmSync,
  statSync,
  symlinkSync,
  copyFileSync,
} from "node:fs";
import { join, resolve, dirname, basename } from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, "..");
const CACHE = join(REPO_ROOT, ".loader-cache", "skills");

function tryLink(src, dest) {
  // 1. Try symlink (works everywhere with permission)
  try {
    if (existsSync(dest)) rmSync(dest, { recursive: true, force: true });
    const type = statSync(src).isDirectory() ? "dir" : "file";
    symlinkSync(src, dest, type);
    return "symlink";
  } catch (e) {
    // ignore, try fallback
  }
  // 2. Try junction on Windows
  if (process.platform === "win32") {
    try {
      execSync(`cmd /c mklink /J "${dest}" "${src}"`, { stdio: "ignore" });
      return "junction";
    } catch {
      // ignore, try fallback
    }
  }
  // 3. Copy as last resort
  try {
    copyDir(src, dest);
    return "copy";
  } catch (e) {
    throw new Error(`failed to link/copy ${src} -> ${dest}: ${e.message}`);
  }
}

function copyDir(src, dest) {
  if (!statSync(src).isDirectory()) {
    mkdirSync(dirname(dest), { recursive: true });
    copyFileSync(src, dest);
    return;
  }
  mkdirSync(dest, { recursive: true });
  for (const entry of readdirSync(src)) {
    const s = join(src, entry);
    const d = join(dest, entry);
    if (statSync(s).isDirectory()) copyDir(s, d);
    else copyFileSync(s, d);
  }
}

function listSkillFolders(root) {
  if (!existsSync(root)) return [];
  const result = [];
  function walk(dir) {
    for (const entry of readdirSync(dir)) {
      const full = join(dir, entry);
      if (!statSync(full).isDirectory()) continue;
      if (existsSync(join(full, "SKILL.md"))) result.push(full);
      else walk(full);
    }
  }
  walk(root);
  return result;
}

function main() {
  if (existsSync(CACHE)) {
    rmSync(CACHE, { recursive: true, force: true });
  }
  mkdirSync(CACHE, { recursive: true });

  const skillFolders = [
    ...listSkillFolders(join(REPO_ROOT, "skills")),
    ...listSkillFolders(join(REPO_ROOT, "spells")),
  ];

  let symlinks = 0,
    junctions = 0,
    copies = 0,
    collisions = 0;

  const seen = new Set();
  for (const src of skillFolders) {
    const name = basename(src);
    if (seen.has(name)) {
      console.warn(`name collision: ${name} (skipping second occurrence at ${src})`);
      collisions++;
      continue;
    }
    seen.add(name);
    const dest = join(CACHE, name);
    const method = tryLink(src, dest);
    if (method === "symlink") symlinks++;
    else if (method === "junction") junctions++;
    else copies++;
  }

  console.log(
    `Loader cache built at ${CACHE}: ${symlinks} symlinks, ${junctions} junctions, ${copies} copies, ${collisions} collisions skipped, ${skillFolders.length} total skill folders.`,
  );
}

main();
