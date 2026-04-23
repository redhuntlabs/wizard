---
name: verifying-before-shipping
description: Use when about to declare any piece of work done, complete, shipped, or finished - in any domain
kind: discipline
audience: anyone
ai-tools: any
complexity: simple
time: 2-10 min
version: 1.0.0
source: bundled
---

<SUBAGENT-STOP>
If you were dispatched as a subagent for a specific task, skip this skill and complete your assigned task. The parent already invoked discipline.
</SUBAGENT-STOP>

# Verifying Before Shipping

## What this does

Forces a verification pass before any "this is done" declaration. Works for shipped code, sent docs, published posts, completed tasks, and finished plans.

## When to use

- About to mark a task done in a tracker
- About to send a "this is shipped" message
- About to close a ticket / PR / case
- About to tell someone "all set"

## What you bring (Inputs)

- The work being declared done
- The original definition of done (or an inferred one if none was set)

## What you get (Output)

Either: confirmation the work is genuinely done (and a "done" declaration), or a list of the specific gaps that must close first.

## How it works (Steps)

This is a discipline. The behavioral structure is: a non-negotiable rule (below), an excuses-and-counters table to defeat rationalizations, warning signs to spot the moment of risk, and a hard gate that fires before any "done" declaration. Apply the gate; verify each acceptance criterion against actual evidence; declare done only on a clean pass.

## The non-negotiable rule

Before declaring any work done, run the verification — actually run it, do not assert it from memory.

## Excuses and counters

| If you think... | Reality |
|---|---|
| "I just finished it, of course it works" | Just-finished work has the highest bug density. Verify. |
| "I already manually checked everything" | Manual checking is unreliable. Run the verification step. |
| "The user is in a hurry" | The user is more in a hurry to not have a regression. Verify. |
| "It's a tiny change" | Tiny changes break things in small ways that are hard to find later. Verify. |
| "I'll verify and ship in parallel" | "In parallel" usually means "ship now and verify if there's a complaint." Verify first. |
| "Verification is overkill for this" | Then you don't actually know it's done. Verify. |

## Warning signs

- About to type "done" or "shipped" or "all set" in a message
- Reasoning includes the words "it should work" or "it must be working"
- About to close a ticket without re-reading the original ticket
- About to send a doc without re-reading it end-to-end
- Time pressure is high and the verification step is the easiest one to skip

## Hard gates

<MUST-STOP>
Before declaring this done, name the verification step you ran (a command output, a re-read, a smoke test, a checklist) and what it returned. If you cannot name it, you have not verified. Run it now.
</MUST-STOP>

## Quality bar

- Verification step is named and was actually run (not skipped, not "implied")
- Output of verification is captured in your reasoning
- If verification surfaced gaps, they were addressed before declaring done
- "Done" declaration references the verification step

## Variations

- **Code shipping**: verification = "tests passed AND smoke test on staging AND error budget intact"
- **Doc shipping**: verification = "re-read end to end AND links work AND examples are accurate"
- **Task closing**: verification = "re-read the original ticket AND every acceptance criterion is met"
- **Decision shipping**: verification = "the alternative was named and its rejection reason still holds"

## Example

**Input**: Just finished a doc draft, about to send to manager.

**Without skill**: "Sent! Let me know what you think." (manager finds 3 broken links and a placeholder paragraph)

**With skill**: STOP. Verification step = re-read end to end + click every link. Re-read finds: placeholder still in paragraph 3. Two links broken. Fix both. Verify again. Now send.
