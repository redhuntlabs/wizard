# How inference works

`inferring-a-spell-from-examples` is the framework skill that turns a transcript into a draft spell. This page explains what signals it uses, what it deliberately won't do, and when to bail to the regular interview.

## The three passes

```
Pass 1: SUITABILITY      "Is this transcript even buildable into a skill?"
   ↓ pass
Pass 2: STRUCTURE        "What kind, audience, name, scope, steps?"
   ↓ pass
Pass 3: DRAFT            "Write the actual SKILL.md."
   ↓
Hand off to building-a-spell at Stage 2 (try-it still runs).
```

## Pass 1 — Suitability

| Outcome | Means | Action |
|---|---|---|
| `BUILDABLE` | ≥ 5 substantive turns + a discernible pattern | Continue |
| `TOO-THIN` | Fewer than 5 substantive turns OR no repeated pattern | Halt; suggest interview |
| `TOO-BROAD` | 2+ distinct tasks tangled | Halt; ask user to pick one |

A "substantive turn" excludes greetings, single-word confirms, and error messages.

## Pass 2 — Kind-detection signals

The full signal table lives in [`skills/inferring-a-spell-from-examples/signals.md`](../skills/inferring-a-spell-from-examples/signals.md). Quick summary:

| Kind | Look for |
|---|---|
| `discipline` | Imperatives ("must", "never"); user enforcing rules; agent course-correcting |
| `workflow` | Numbered/named stages; hand-offs; loop-backs |
| `content` | Recognizable artifact (email, doc, summary); draft → tweak pattern |
| `subagent` | Parallel sub-tasks dispatched and aggregated |

Ties are broken in this order: `discipline` > `workflow` > `subagent` > `content`. (See signals.md for the full rules.)

You'll always be asked to confirm the kind before the strawman is shown.

## Pass 3 — Draft generation rules

1. **Direct quotes preferred over paraphrase.** Steps and quality-bar copy use your words from the transcript when possible.
2. **No fabricated discipline rules.** A "must" or "never" clause appears in the draft only if it appeared in the transcript.
3. **All required frontmatter present.** Even guessed fields are present and either valued or marked `# TODO: confirm`.
4. **Validator must pass before strawman is shown.**

## When to bail to interview

Bail (`Re-do as interview`) when:
- The strawman's kind is fundamentally wrong (and the runner-up was also wrong)
- The strawman is missing the most important step or rule
- You've refined 4+ times without converging
- The transcript was demonstrating something *adjacent* to the skill you actually want to capture

When you bail, the inferred fields become **pre-filled defaults** in the regular interview. You can accept-with-Enter or correct each one. No work is lost.

## What inference will NOT do

- **Save anything to disk.** Only `building-a-spell` Stage 4 saves.
- **Skip try-it.** The Iron Law applies equally to inference-built skills.
- **Modify any specialist builder.** `building-a-discipline-spell` etc. don't know inference exists.
- **Call any external service.** Pure-text reasoning, no network.
- **Invent rules not present in the transcript.** Hard rule, zero-tolerance.

## Worked examples

See [`skills/inferring-a-spell-from-examples/examples/`](../skills/inferring-a-spell-from-examples/examples/) for a content, workflow, and discipline example.
