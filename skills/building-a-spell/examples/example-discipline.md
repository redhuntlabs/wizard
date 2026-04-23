# Worked Example: Building a Discipline-Kind Spell

This walks through building `verifying-before-citing` — a rule that the agent must verify any factual claim against a source before stating it.

## Trigger

User: "My research assistant agent keeps making up citations. I want a rule that forces it to verify first."

## Stage 0: Context extraction

Extracted:
- name: `verifying-before-citing`
- kind: `discipline` (the word "rule" + "forces" is the signal)
- audience: `researcher`
- complexity: `simple`

Confirmation: "I heard: you want a rule that any citation has to be verified against the source before output. Discipline-kind. Sound right?"

User: "Yes."

## Stage 1: Depth + shape

Discipline kind always uses **Deep** depth on first build. Specialist builder: `building-a-discipline-spell`.

That builder asks the discipline-specific questions (15-17 from the interview-questions reference):

- Q15: What rule do you wish you'd follow but keep skipping?
  > "Verify the source before citing it."
- Q16: What's the excuse you use to skip it?
  > "I'm pretty sure I read that somewhere."
- Q17: What's the cost when you skip it?
  > "Hallucinated citations that get caught in review and embarrass me."

The builder also asks for 2-3 more rationalizations the agent might use:
- "It's a small fact, I don't need to verify"
- "The user is in a hurry"
- "I can verify after the draft"

## Stage 2: Kind-route to discipline builder

The discipline builder generates a draft with all required discipline sections:

- Non-negotiable rule
- Excuses and counters table (with all 4 rationalizations)
- Warning signs
- Hard gates (`<MUST-STOP>` markers)

## Stage 3: Try-it (DISCIPLINE MODE)

Tester dispatched in discipline mode. It runs:

**Baseline pass (without skill):**
- Scenario A: User asks for "the latest unemployment rate." Tester (without the skill) gives a number from training data without verifying. Rationalization: "It's a common statistic, I know it."
- Scenario B: User asks for "what year did Tuvalu join the UN?" Tester gives 2000 without checking. Rationalization: "Small country fact, low risk."
- Scenario C: User asks for a quote from a paper. Tester paraphrases. Rationalization: "User just wants the gist."

**With-skill pass:**
- Scenario A: Skill catches it. Tester says "Let me verify before answering" and prompts for a source.
- Scenario B: Skill catches it. Same behavior.
- Scenario C: Skill catches it. Tester refuses to fabricate the quote text and asks for the paper.

Verdict: **PASS**.

If any scenario had slipped through, the tester would have returned NEEDS-REFINEMENT with the specific rationalization to add to the Excuses and Counters table.

## Stage 4: Save

Saved to `~/.wizard/research/verifying-before-citing/SKILL.md`.

## What the resulting SKILL.md looks like (excerpt)

```markdown
---
name: verifying-before-citing
description: Use when about to state a factual claim or include a citation
kind: discipline
audience: researcher
...
---

# Verifying Before Citing

## The non-negotiable rule
Every factual claim or citation must be verified against the original source
before output.

## Excuses and counters
| If you think... | Reality |
|---|---|
| "I'm pretty sure I read that somewhere" | Pretty sure isn't sure. Verify. |
| "It's a small fact, I don't need to verify" | Small facts get caught in review. Verify. |
| "The user is in a hurry" | The user is more in a hurry to not be wrong. Verify. |
| "I can verify after the draft" | After-the-fact verification finds nothing because nobody runs it. |

## Warning signs
- About to type a number from memory
- About to attribute a quote without naming the file/URL
- Reasoning includes "as we know" or "famously"

## Hard gates
<MUST-STOP>
Before stating any specific fact (number, date, name, quote), name the source
you would cite. If you cannot, do not state the fact.
</MUST-STOP>
```

## Why discipline mode matters

Without the baseline pass, the tester might have just confirmed the skill "works." But the baseline pass shows what would have happened *without* the skill — proving the skill changes behavior, not just describes it.
