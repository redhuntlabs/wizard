---
name: inferring-a-spell-from-examples
description: Use when the user invokes /capture-this-chat or /build-spell --from-transcript. Reads a transcript and produces a context dictionary plus a draft SKILL.md, which hands off to building-a-spell at Stage 2.
kind: workflow
audience: anyone
ai-tools: any
complexity: guided
time: 1-3 min per inference
version: 1.0.0
source: bundled
---

# Inferring a Spell from Examples

## What this does

Reads a transcript (a saved chat session, a meeting notes file, or the current chat) and infers a skill from it. Produces a draft `SKILL.md` and hands it off to the regular meta-builder at Stage 2.

This skill is invoked by `/capture-this-chat` and by `/build-spell --from-transcript <path>`. It never runs alone — it always hands off to `building-a-spell`.

## When to use

- The user runs `/capture-this-chat` or `/build-spell --from-transcript`
- A transcript or chat-context blob has been provided as input
- The user wants to convert demonstrated behavior into a reusable skill

## What you bring (Inputs)

- A transcript blob (markdown text in the normalized format, see `docs/capturing-chats.md`)
- The provenance of the transcript (a file path, a chat session ID, or both)

## What you get (Output)

A context dictionary plus a draft `SKILL.md`, handed back to `building-a-spell` Stage 2 (kind-route → specialist → try-it → save). The user sees a strawman with `Approve · Refine · Re-do as interview` choices.

## How it works (Steps)

This skill runs three sequential passes. Each pass is a hard gate.

## Stages

### Stage 1: Suitability check (Pass 1)

Read the transcript. Decide one of three outcomes:

| Outcome | Triggers | Action |
|---|---|---|
| `BUILDABLE` | ≥ 5 substantive turns AND a discernible repeating pattern (steps, rules, output shape) | Continue to Stage 2 |
| `TOO-THIN` | < 5 substantive turns, OR no repeated structure (one-shot Q&A) | Stop. Tell user: *"Not enough structure to infer a skill. Want to try the regular interview? Run `/build-spell`."* |
| `TOO-BROAD` | ≥ 2 distinct tasks tangled (e.g. research + email drafting in one transcript) | Stop. Tell user: *"I see two tasks here: A and B. Pick one to capture, or run them through the regular interview separately."* |

A "substantive turn" excludes: greetings, acknowledgments, single-word confirmations, error messages.

Output of Stage 1: `{ outcome: "BUILDABLE" | "TOO-THIN" | "TOO-BROAD", reason: string }`. If outcome is not `BUILDABLE`, halt.

### Stage 2: Structure extraction (Pass 2)

Reads the transcript and the signal reference at `skills/inferring-a-spell-from-examples/signals.md`. Derives the **context dictionary**.

**Step 2a: Kind detection.** Match the transcript against each kind's signals in `signals.md`. Pick the kind with the strongest match. Use the tie-breaking rules from `signals.md`.

Always confirm with the user via a one-tap prompt that includes the runner-up:

> *"This looks like a `discipline` skill (vs `workflow`). Confirm? \[D/w]"*

Single-letter response (`D` / `W` / `c` / `s`) overrides; anything else is treated as confirmation of the suggested kind.

**Step 2b: Other fields.** Extract `name`, `audience`, `complexity`, `inputs`, `outputs`, `steps`, `quality_bar` per the rules below.

**Step 2c: Field extraction rules.**

| Field | Rule |
|---|---|
| `name` | Verb-led, lowercase-hyphenated, ≤ 6 words. Verb from most-frequent action; object from most-frequent noun phrase. Example: a transcript about checking citations → `verifying-citations-before-shipping`. |
| `audience` | Match vocabulary: "grants/papers/citations" → `researcher`; "PRs/tests/deploys" → `dev`; "OKRs/status/stakeholders" → `knowledge-worker`. No domain markers → `anyone` (default). |
| `complexity` | 1–2 steps → `simple`; 3–6 steps with sequence → `guided`; ≥ 7 steps OR multi-tool OR multiple loop-backs → `chained`. (Map to schema enum: simple/guided/chained/long-running.) |
| `inputs` | Things the user provided to the agent (artifacts, parameters, constraints). |
| `outputs` | Artifacts the agent produced. |
| `steps` | Ordered actions in the conversation, deduplicated. Use direct quotes where possible. |
| `quality_bar` | Any "this counts as done when…" statement; otherwise infer from the user's rejection turns ("no, that's wrong because …"). |

**Rule of last resort:** if a field has no clear signal, record `null` in the dictionary AND set the corresponding draft body line to `# TODO: confirm`. **Never fabricate.**

Output of Stage 2: a fully-typed context dictionary (matching the spec §3 hand-off contract).

### Stage 3: Draft generation (Pass 3)

Take the context dictionary from Stage 2. Load the kind-specific template from `templates/spell-template-<kind>.md` (already exists; falls back to `templates/spell-template.md` for `content`). Fill it in.

**Three hard rules:**

1. **Direct quotes preferred over paraphrase.** Steps and quality-bar copy should use the user's own words from the transcript when available. Paraphrase only when the original is awkward or contains unrelated content.
2. **No fabricated discipline rules.** A "must" / "never" / hard-gate clause may appear in the draft ONLY IF a near-verbatim version appears in the source transcript. This is the single most important rule — fabricating creates skills that pass try-it once and silently misfire later. The runner in Task 1.7 enforces this with zero tolerance.
3. **All required frontmatter present.** Even if a field had to be guessed, it's present and either has a value or is marked `# TODO: confirm` in the body. The validator must pass before the strawman is shown.

**Provenance footnote.** Append to the bottom of the body:

```html
<!-- inferred-from: <transcript-source> -->
<!-- inferred-at: <ISO-8601 timestamp> -->

> _Inferred from `<transcript-source>` on <date>. Quoted segments preserved verbatim._
```

The HTML comments are machine-readable; the blockquote is shown to the reader.

**Validator gate.** After draft generation, run `validate-spell.js` on the draft text in memory. If it fails, fix the draft (do not show the strawman). If you can't fix it after one pass, halt with a clear error to the user — never show a draft that wouldn't pass the validator.

Output of Stage 3: a complete draft `SKILL.md` (in memory) that passes the validator, plus the provenance footnote.

### Stage 4: Strawman UX

Show the user a **header summary** with the four most important fields, plus the **full draft** below.

```
┌─────────────────────────────────────────────────────────┐
│ Inferred from: <source> (<N> turns)                     │
│                                                         │
│ Suggested name:  <name>                                 │
│ Kind:            <kind>  (vs <runner-up>) [K/r]         │
│ Audience:        <audience>                             │
│ Complexity:      <complexity>                           │
│                                                         │
│ Steps detected:                                         │
│   <numbered list>                                       │
│                                                         │
│ ───── Full draft below ─────                            │
│ <the draft SKILL.md>                                    │
│                                                         │
│ Approve · Refine · Re-do as interview?                  │
└─────────────────────────────────────────────────────────┘
```

**User responses:**

| User says | Skill does |
|---|---|
| `approve` / `a` / `yes` | Hand off to `building-a-spell` Stage 2 (kind-route → specialist → try-it). |
| `refine: <freeform>` (e.g. *"drop step 4, add a tone constraint"*) | Apply the edits. Re-render the strawman. Re-prompt. |
| `interview` / `i` / `bail` | Hand off to `building-a-spell` Stage 1 with inferred fields as **pre-filled defaults** (user can accept-with-Enter). |
| Single-letter kind override (`d`, `c`, `s`, `w`) | Re-run Pass 3 with overridden kind. Re-render strawman. |

**Safety net:** if the user `refine`s 4 or more times without converging, proactively suggest bailing to interview:

> *"Inference may be off — want to switch to the regular interview? You won't lose the work so far; the inferred fields will pre-fill the questions."*

**Conflict detection:** if a refine edit adds discipline language ("must", "never", "hard gate") to a non-discipline draft, prompt:

> *"Adding hard gates suggests this is now a discipline skill — re-classify? \[Y/n]"*

If `Y`, re-route to Pass 3 with `kind: discipline`.

**Hand-off contract.** When the user approves, return to the caller with:

```yaml
context: { ...the dictionary... }
draft_skill_md: |
  ---
  ...
  ---
  ...
provenance:
  type: transcript        # or: chat-capture
  path: <path>
  session_id: <id>        # optional
```

The caller (`building-a-spell` Stage -1) resumes at Stage 2 with this payload.

## Checkpoints

- After Stage 1: outcome is `BUILDABLE`, `TOO-THIN`, or `TOO-BROAD`. Only `BUILDABLE` proceeds.
- After Stage 2: every required frontmatter field has a value (use `null` + `# TODO: confirm` for ambiguous, never fabricate).
- After Stage 3: drafted `SKILL.md` passes `validate-spell.js` before being shown to the user.
- After Stage 4: user has chosen Approve, Refine, or Bail.

## Loop-back conditions

- User chooses Refine: re-render strawman with edits applied; loop until Approve or Bail.
- User overrides kind via single-letter tap: re-run Pass 3 with overridden kind.
- 4+ refines without converging: proactively suggest bail to interview.

## Quality bar

A successful inference produces a draft that:

- Passes `validate-spell.js` with zero errors
- Contains no fabricated discipline rules (rules must be grounded in the transcript)
- Includes a provenance footnote citing the source transcript
- Is accepted by Stage 3 try-it ≥ 70% of the time on first attempt

## Variations

- **`--from-transcript <path>`**: read a file from disk, hand to Pass 1
- **`/capture-this-chat`**: a chat-context wrapper has already produced the transcript blob; skip the file read

## Example

See worked examples for each kind:

- [`examples/example-content.md`](examples/example-content.md) — email-drafting transcript → content skill
- [`examples/example-workflow.md`](examples/example-workflow.md) — research-loop transcript → workflow skill (with one refine)
- [`examples/example-discipline.md`](examples/example-discipline.md) — no-untested-claims transcript → discipline skill (verbatim rule extraction)
