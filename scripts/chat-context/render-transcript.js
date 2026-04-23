// scripts/chat-context/render-transcript.js
// Shared utility: turn a list of {role, content, tool_calls?} turns
// into the normalized markdown format from spec §5.

export function renderTranscript({ turns, source, sessionId, transcriptPath, lastN }) {
  const total = turns.length;
  const sliced = lastN ? turns.slice(-lastN) : turns;
  const taken = sliced.length;
  const ts = new Date().toISOString();

  const header = [
    `<!-- captured: ${ts} -->`,
    `<!-- source: ${source}${sessionId ? ` (session: ${sessionId})` : ""}${transcriptPath ? ` (path: ${transcriptPath})` : ""} -->`,
    `<!-- turns: ${taken} of ${total} -->`,
    "",
  ].join("\n");

  const body = sliced
    .map((turn, i) => {
      const role = turn.role === "user" ? "User" : "Agent";
      let content = turn.content || "";
      if (turn.tool_calls && turn.tool_calls.length) {
        const summary = turn.tool_calls
          .map((tc) => `${tc.name}(${(tc.args_summary || "...").slice(0, 60)})`)
          .join(", ");
        content = `${content}\n\n[tool calls collapsed: ${summary}]`;
      }
      return `## Turn ${i + 1} — ${role}\n${content.trim()}\n`;
    })
    .join("\n");

  return header + "\n" + body;
}
