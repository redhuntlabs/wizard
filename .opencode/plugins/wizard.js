// OpenCode plugin entry for Wizard.
// OpenCode auto-discovers spells from the repo's skills/ and spells/ folders
// when the plugin is loaded. This file establishes the plugin manifest.

import { writeFileSync } from "node:fs";
import { execSync } from "node:child_process";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default {
  name: "wizard",
  version: "1.0.0",
  description:
    "Build AI spells for what you do. A meta-framework for turning any repeatable task into a reusable workflow.",

  // OpenCode reads skill paths from these globs at session start.
  skillPaths: [
    "../skills/**/SKILL.md",
    "../spells/**/SKILL.md",
  ],

  // Agent dispatch targets.
  agentPaths: ["../agents/**/*.md"],

  // User-facing slash commands.
  commandPaths: ["../commands/**/*.md"],

  // Slash-command handlers exposed to OpenCode. The /capture-this-chat
  // handler dumps the current session to a temp file and shells out to the
  // shared wrapper, so the inference engine sees the same normalized
  // transcript shape it gets from every other tool.
  commands: {
    "capture-this-chat": {
      description: "Turn the current chat session into a reusable spell",
      handler: async (ctx) => {
        const tmp = `/tmp/opencode-session-${process.pid}.json`;
        writeFileSync(
          tmp,
          JSON.stringify({
            messages: ctx.messages || [],
            sessionId: ctx.sessionId,
          }),
        );
        const wrapper = join(__dirname, "../../scripts/chat-context/opencode.js");
        return execSync(`node ${wrapper}`, {
          env: { ...process.env, OPENCODE_SESSION_FILE: tmp, OPENCODE_PLUGIN_CONTEXT: "1" },
          encoding: "utf8",
        });
      },
    },
  },

  async onActivate(context) {
    // OpenCode does not have session-start hooks; bootstrap via AGENTS.md
    // auto-load (handled by OpenCode itself) and the boot-skill 1% rule.
    return { ok: true };
  },
};
