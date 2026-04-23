# Interview Questions Reference

The full pool of interview questions the meta-builder may ask. The `intuitive-interviewing` skill picks a relevance-filtered subset based on context and depth mode.

Questions are grouped by phase. Within each phase, questions are ordered from highest-signal to lowest-signal.

## Phase 1: Trigger and outcome

1. In one sentence, what's the situation that makes you want to use this?
2. In one sentence, what does success look like when you're done?
3. How often do you do this — weekly, monthly, sometimes?
4. When this goes wrong today, what's the most common failure?

## Phase 2: Inputs

5. What information / files / context do you bring with you?
6. Is there anything that's almost always true that you wouldn't think to mention?
7. What would make you abort partway through?

## Phase 3: Steps

8. Walk me through what you do today, step by step.
9. Which step gives you the most trouble?
10. Which step do you skip when you're in a hurry — and what breaks when you skip it?

## Phase 4: Quality bar

11. How do you know it's good enough to ship?
12. What would a peer flag as "this isn't done yet"?

## Phase 5: Variations

13. Are there cases where this works differently? Name two.

## Phase 6: Audience

14. Will this only ever be for you, or do you want to share it later?

## Phase 7: Anti-rationalization (only for `kind: discipline`)

15. What rule do you wish you'd follow but keep skipping?
16. What's the excuse you use to skip it?
17. What's the cost when you skip it?

## Phase 8: Subagent context (only for `kind: subagent`)

18. What pieces could be done in parallel by a helper that has no other context?
19. What does the helper need to know to do one piece well?
20. How do you combine the helpers' outputs?

## Phase 9: Workflow stages (only for `kind: workflow`)

21. What are the natural stopping points?
22. What artifact do you hand from one stage to the next?
23. When do you have to loop back to an earlier stage?

## Phase 10: Time and complexity

24. How long does this take you today?
25. If we did it perfectly, how long would it take?

## Phase 11: AI tool fit

26. Are you running this in one specific tool (Claude / Cursor / Codex / etc.) or "wherever"?

## Phase 12: Naming

27. If you had to give this a 2-3 word name, what would it be?

## Mode-to-question mapping

The `intuitive-interviewing` skill uses this mapping:

| Mode | Always ask | Conditionally ask | Skip |
|---|---|---|---|
| Express | 1, 5, 8, 11 | 2 (only if 1 was vague) | everything else |
| Standard | 1, 2, 5, 8, 11, 13, 14 | 4, 9, 10, 21, 22 (kind-dependent) | 3, 6, 7, 25, 26, 27 |
| Deep | all in user's `kind` band | none | none |

The "in user's `kind` band" rule means a `discipline` build always asks 15-17, a `workflow` build always asks 21-23, etc.

## Questions you should NEVER ask

These were tried in early prototypes and made the interview feel hostile or rote:

- "Are you sure you want this?" (paternalistic)
- "Why don't you just X?" (dismissive)
- "Can you formalize that?" (jargon)
- "What are the edge cases?" (unbounded; ask for "two cases that work differently" instead — Q13)

## Adaptive shortcuts

If the user's first message already answers Phase 1 + Phase 2 + part of Phase 3, the interviewer should:

1. Echo the extracted content back as a confirmation
2. Skip those questions entirely
3. Pick up at the first unanswered phase

This is the difference between "intuitive" and "rote."
