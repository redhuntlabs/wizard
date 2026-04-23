---
name: build-spell
description: Start building a new spell from a task you do repeatedly
---

# /build-spell

Invoke the `building-a-spell` skill to start an interview that captures a new spell.

The interview will:

1. Extract context from your trigger phrase (skip questions you already answered)
2. Pick the right depth (Express, Standard, Deep) for your skill complexity
3. Match against known workflow shapes if applicable
4. Route to the correct kind-specific builder (content / workflow / discipline / subagent)
5. Run try-it (non-skippable — Iron Law)
6. Save to your `WIZARD_HOME`

If you ask for multiple spells in one go, the meta-builder will complete each one end-to-end before starting the next (Batch Iron Law).

## Building from an existing transcript

If you have a transcript of a session that worked (from any AI tool, a meeting, or a Loom transcript), skip the interview and infer the skill from it:

```
/build-spell --from-transcript ./session.md
```

The transcript is parsed by `inferring-a-spell-from-examples`, which produces a draft you can approve, refine in chat, or fall back to the regular interview from. Try-it (Iron Law) still runs.

For capturing the *current* chat session instead, use `/capture-this-chat`.

## Usage

```
/build-spell
/build-spell I want to capture how I write status updates
/build-spell a workflow for when I review a job candidate's portfolio
/build-spell --from-transcript ./yesterday-session.md
```
