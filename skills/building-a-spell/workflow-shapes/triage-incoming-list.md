# Shape: Triage Incoming List

## Trigger keywords

triage, sort, prioritize, label, categorize, inbox, queue, backlog, sweep, group, organize this list

## Output type

The same list, with each item labeled, prioritized, and possibly assigned an action.

## Strawman

```
Inputs:
  - The list (emails, tickets, ideas, candidates, etc.)
  - The labels you use (define them; max 5)
  - The action verbs you use ("respond now", "delegate", "archive", etc.)

Steps:
  1. For each item, scan and extract the core ask
  2. Label it (one of the predefined labels)
  3. Assign a priority (P0 / P1 / P2 or similar)
  4. Pick an action verb
  5. Group items by action verb at the end (one section per verb)

Quality bar:
  - Every item has a label, priority, and action
  - Labels are mutually exclusive (no item has two)
  - "Respond now" group is short enough to actually finish today
```

## Common variations

- **Email triage**: add a "draft a reply" step for "respond now" items
- **Hiring pipeline**: labels = "advance / hold / reject"; action = next interview round
- **Idea triage**: labels = "do / file / drop"; no priority needed
