---
name: wrapping-up-a-piece
description: Use when finishing a piece of work - the closing pass that prevents a "done" piece from coming back at you a week later
kind: workflow
audience: knowledge-worker
ai-tools: any
complexity: simple
time: 5-15 min
version: 1.0.0
source: bundled
---

# Wrapping Up a Piece

## What this does

Runs a structured closing pass on a piece of work: handoff, archive, follow-up. Distinct from `verifying-before-shipping` (which is "is this done?"). This is "now that it's done, what closes it for good?"

## When to use

- A project, milestone, or task has reached "done" status
- You're handing off work to someone else
- You're closing out before time off or a context switch
- You want to prevent the work from boomeranging back

## What you bring (Inputs)

- The finished piece of work
- Who else is affected (handoff target, downstream consumers, future-you)
- Whether anything was deferred from this piece

## What you get (Output)

A clean closure: handoff message sent, artifacts archived, deferrals captured, retrospective if warranted.

## How it works (Steps)

This is a workflow.

## Stages

### Stage 1: Handoff

Identify who needs the work next (or who needs to know it's done). Send them: a one-line summary, a link to the artifact, a one-line "what they should know" note.

### Stage 2: Archive

Put the artifact where future-you (or future-them) will find it. Include a one-paragraph context note: why the work happened, what it solved, who decided what.

### Stage 3: Capture deferrals

What did you cut from scope, push to next time, or punt? Write each as a ticket / todo / note with enough context that someone (or you in 3 months) could pick it up cold.

### Stage 4: Retrospective (if warranted)

For pieces over 1 week of work, write 3 lines: what went well, what didn't, what you'd do differently. Even just for yourself.

### Stage 5: Tell the world (optionally)

If someone external benefits from knowing this is done (a customer, a partner, a stakeholder), send the message. Brief, references the artifact, names what changes for them.

### Stage 6: Close the file

Mark the ticket / project / doc closed. Resist re-opening for "one more thing" — that goes in deferrals.

## Checkpoints

- **After Stage 1**: handoff sent (or explicitly "no handoff needed")
- **After Stage 2**: artifact has a context note (not just a file link)
- **After Stage 3**: every deferral is captured somewhere retrievable
- **After Stage 4**: retro written for substantial pieces
- **After Stage 5**: external comms sent (if applicable)
- **After Stage 6**: project state changed to closed

## Loop-back conditions

Return to Stage 3 when, while writing the retro, you realize a deferral you missed.

## Quality bar

- Handoff message is short (under 5 sentences) and includes the artifact link
- Archive context note explains the "why," not just the "what"
- Deferrals are retrievable — you could find them cold in 3 months
- File is genuinely closed (no "open with one more thing" left)

## Variations

- **Hand off to a colleague**: Stage 1 grows; include a 15-min sync if it's complex
- **Solo close (no handoff)**: skip Stage 1
- **Multi-month project**: Stage 4 retro is mandatory, even if just for yourself
- **Customer-facing close**: Stage 5 is mandatory

## Example

**Input**: Just finished a 3-week migration project.

**Output**:

> **Stage 1**: Sent handoff to ops team — link to runbook, one-line summary, the 3 things they should know.
> **Stage 2**: Archived migration scripts and decisions doc to /projects/2026-q2-migration/. Added context note: why we migrated, what we considered, who decided.
> **Stage 3**: 4 deferrals captured as tickets: monitoring backfill, customer comms for stragglers, post-migration audit, decommission of old infra.
> **Stage 4**: Retro written: rollout was smoother than expected (good prep), but customer comms were rushed (start earlier next time).
> **Stage 5**: Sent customer-facing email to affected accounts.
> **Stage 6**: Project marked closed. Open tickets are explicit deferrals, not loose ends.
