# Shape: Extract Action Items

## Trigger keywords

action items, todos, next steps, follow-ups, what needs to happen, who does what, takeaways from

## Output type

A list of action items, each with an owner, a deadline, and a definition of done.

## Strawman

```
Inputs:
  - The source (meeting notes, email thread, transcript, doc)
  - The default owner (when one isn't named)
  - The default timeframe (when one isn't named)

Steps:
  1. Read the source for explicit commitments ("I will", "we'll", "let's")
  2. Read again for implicit commitments (a problem named without an owner)
  3. For each, capture: owner, action, deadline, done-when
  4. Flag any commitment without an owner — assign to default + flag for confirmation
  5. Group by owner

Quality bar:
  - Every item has an owner (explicit or default + flagged)
  - Every item has a deadline (explicit or default + flagged)
  - Every item has "done when" (a verifiable end state)
  - No "look into X" items — they aren't actionable
```

## Common variations

- **Meeting notes -> action items**: add a "decisions made" section alongside actions
- **Email thread -> action items**: include the message that contained each commitment
- **Personal todo from journaling**: skip owner (always you)
