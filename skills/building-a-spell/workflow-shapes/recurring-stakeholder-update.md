# Shape: Recurring Stakeholder Update

## Trigger keywords

status update, weekly report, monthly update, EOY recap, board update, manager update, project update, standup, friday update

## Output type

A short, scannable update sent on a cadence.

## Strawman

```
Inputs:
  - This period's wins (max 3)
  - This period's blockers (max 1, with the ask)
  - Next period's focus (1 sentence)
  - Optional: relevant metric

Steps:
  1. Headline: one sentence naming the most important thing
  2. Wins: bulleted, results-first (not activity-first)
  3. Blockers: name the blocker, name the ask, name the deadline
  4. Next: one sentence
  5. Optional: one metric line

Quality bar:
  - Under 5 bullets total
  - Every win is a result, not an activity (e.g. "shipped X" not "worked on X")
  - Every blocker has an explicit ask
  - No jargon outside the team's shared vocabulary
```

## Common variations

- **Board update**: add a "decisions needed" section
- **Team-internal**: add a "shoutouts" line
- **Project update**: replace "wins/blockers" with "milestones hit / at-risk / next"
