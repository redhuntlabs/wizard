# Kind-detection signals

A reference for `inferring-a-skill-from-examples` Stage 2.
Match transcript content against these signals; pick the kind with the strongest match.

## `discipline` signals

- Imperative phrases: "must", "never", "do not", "always", "no exceptions"
- The user enforces a rule and the agent course-corrects
- The user rejects an output and cites a rule violation
- The pattern is "agent does X → user blocks → agent retries with rule applied"
- Hard gates appear ("don't ship without Y", "verify before Z")

## `workflow` signals

- Numbered or named stages ("first", "then", "after that", "finally")
- Hand-offs between stages (output of stage A becomes input of stage B)
- Loop-backs ("if Y then go back to step 2")
- Multi-step process with clear sequence
- The user names stages or asks about progress

## `content` signals

- Output is a recognizable artifact (email, status update, summary, plan, doc)
- Pattern is "draft → tweak → re-draft" rather than rule enforcement
- Style or tone constraints dominate
- The user provides a recipient/audience and the agent produces text
- The same artifact shape is produced multiple times with different inputs

## `subagent` signals

- The user dispatches multiple sub-tasks in parallel
- Results are aggregated at the end
- Mentions of "researcher / tester / reviewer / critic / implementer agent"
- "Run these in parallel" or "do all three at once"
- Results are compared against each other ("which one is best?")

## Tie-breaking

If two kinds tie:
- `discipline` beats `workflow` (a discipline-shaped workflow is fine; the discipline rules are the more important capture)
- `workflow` beats `content` (a workflow producing content is captured as the workflow)
- `subagent` beats `workflow` only when ≥ 3 parallel branches are present (otherwise it's a workflow with parallel steps)

If signals are absent in all four categories: the transcript is `TOO-THIN`; route back to Stage 1.
