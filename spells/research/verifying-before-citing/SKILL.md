---
name: verifying-before-citing
description: Use when about to cite a source, statistic, or quote - forces verification against the actual source before the claim leaves your hands
kind: discipline
audience: anyone
ai-tools: any
complexity: simple
time: 1-3 min per claim
version: 1.0.0
source: bundled
---

<SUBAGENT-STOP>
If you were dispatched as a subagent for a specific task, skip this skill and complete your assigned task. The parent already invoked discipline.
</SUBAGENT-STOP>

# Verifying Before Citing

## What this does

Forces every cited claim, statistic, quote, or attribution to be verified against the actual primary source before it appears in writing. Eliminates "secondhand citation drift" — the failure mode where a claim is true at the start of a citation chain but mangled by the third repetition.

## When to use

- About to publish, ship, or send anything that cites a source
- About to attribute a quote to a person
- About to cite a statistic, percentage, or numeric finding
- About to summarize what a source "says" without having opened it recently
- Whenever pulling from memory, AI output, or a secondary source

## What you bring (Inputs)

- The claim and its proposed citation
- Access (or lack of access) to the primary source

## What you get (Output)

A claim that you have personally verified against the primary source, OR an explicit hedge ("according to X, who cites Y, which I have not verified") OR the claim removed.

## How it works (Steps)

This is a discipline. The behavioral structure is: a non-negotiable rule (below), an excuses-and-counters table to defeat rationalizations, warning signs to spot the moment of risk, and a hard gate that fires before publishing. Apply the gate at every citation; verify, hedge, or cut.

## The non-negotiable rule

Every cited claim, quote, statistic, or attribution must be verified against the primary source — opened, read in context — before it leaves your hands. If you cannot, you must hedge explicitly or remove the claim.

## Excuses and counters

| If you think... | Reality |
|---|---|
| "I remember reading this" | Memory drifts. Open the source. |
| "I've cited this before" | The source may have updated, or your prior cite may have been wrong. Open the source. |
| "An AI told me this is from X" | AI-attributed quotes are routinely fabricated or misattributed. Verify or remove. |
| "It's a famous quote, everyone knows it's from X" | Famous quotes are misattributed at the highest rates. Especially these. Verify. |
| "I'm short on time" | The cost of a wrong citation lasts longer than the time to verify it. Verify. |
| "It's a small detail" | Small wrong details destroy credibility for the rest. Verify. |
| "The secondary source seems reliable" | Even reliable secondaries get details wrong. Open the primary. |
| "I'll mark it for fact-check later" | "Later" doesn't happen. Verify now or hedge now or cut now. |

## Warning signs

- The phrase "I think it was X who said..." and you proceed to attribute
- A quote that's elegant, pithy, and very on-the-nose for your point (often misattributed)
- A statistic without a recent date attached
- A finding that "everyone knows" but you can't immediately name a source for
- An AI-generated draft contains a citation you didn't put there
- You're about to round a number for "readability"

## Hard gates

<MUST-STOP>
Before every citation in your final draft, ask:

1. Did I open the primary source for this specific claim in this writing session?
2. Does my paraphrase match the source in context (not just in isolated sentence)?
3. If a quote: is the wording exact?
4. If a statistic: is the year, denominator, and definition correct?

If any answer is no — verify now, or hedge explicitly, or remove. No exceptions.
</MUST-STOP>

## Quality bar

- Every quote is verified verbatim
- Every statistic has a year and source and matches the source
- Every attribution names a real, retrievable source
- Hedges (when used) are explicit about what's unverified
- A reader can follow the citation chain back to the primary

## Variations

- **High-stakes writing** (legal, medical, financial): also have a second person verify
- **Writing on a deadline**: cut more aggressively rather than hedge
- **AI-assisted drafts**: every citation introduced by the AI is suspect by default

## Example

**Without skill**: "As Einstein said, 'If you can't explain it simply, you don't understand it well enough.'"

**With skill**: STOP. Verify. The quote is widely attributed to Einstein but has no primary source — it's likely a 20th-century paraphrase of Rutherford. Two options:

1. **Hedge**: "A widely circulated saying — often attributed to Einstein, though without primary documentation — captures it: 'If you can't explain it simply...'"
2. **Cut**: rewrite the paragraph without the quote.

Either is honest. The verbatim attribution to Einstein is not.
