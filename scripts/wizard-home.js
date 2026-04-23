// scripts/wizard-home.js
// Single source of truth for resolving the wizard spell-library home dir.
//
// Resolution order:
//   1. WIZARD_HOME env var
//   2. ~/.wizard (default)
//
// Use:
//   import { wizardHome } from "./wizard-home.js";
//   const home = wizardHome();

import { homedir } from "node:os";
import { join } from "node:path";

export function wizardHome() {
  if (process.env.WIZARD_HOME) return process.env.WIZARD_HOME;
  return join(homedir(), ".wizard");
}
