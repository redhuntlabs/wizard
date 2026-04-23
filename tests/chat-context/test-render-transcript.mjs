import { renderTranscript } from "../../scripts/chat-context/render-transcript.js";
import assert from "node:assert/strict";

const out = renderTranscript({
  turns: [
    { role: "user", content: "Find me 3 sources on X" },
    { role: "agent", content: "Here are 3 candidates", tool_calls: [{ name: "web_search", args_summary: "query=X" }] },
    { role: "user", content: "Verify each" },
  ],
  source: "claude-code",
  sessionId: "abc",
  lastN: 50,
});

assert.match(out, /captured:/);
assert.match(out, /source: claude-code \(session: abc\)/);
assert.match(out, /turns: 3 of 3/);
assert.match(out, /## Turn 1 — User/);
assert.match(out, /## Turn 2 — Agent/);
assert.match(out, /\[tool calls collapsed: web_search\(query=X\)\]/);
assert.match(out, /## Turn 3 — User/);

const truncated = renderTranscript({
  turns: Array.from({ length: 60 }, (_, i) => ({ role: i % 2 ? "agent" : "user", content: `t${i}` })),
  source: "cursor",
  lastN: 50,
});
assert.match(truncated, /turns: 50 of 60/);

console.log("All render-transcript tests passed.");
