# Shape: Decision With Alternatives

## Trigger keywords

decide, decision, choose, pick, which one, should I, A vs B, vendor selection, hire which

## Output type

A recommendation plus an explicit alternative that was rejected and why.

## Strawman

```
Inputs:
  - The decision to make (one sentence)
  - The criteria that matter (3-5)
  - The options being considered (2+)

Steps:
  1. State the decision
  2. List the criteria, weighted (numeric or simple high/med/low)
  3. Score each option against each criterion
  4. Name the winner
  5. Name the strongest runner-up
  6. State explicitly: "I considered [runner-up] and rejected it because [reason]"
  7. State: what would change my mind (the leading indicator)

Quality bar:
  - At least 2 options scored
  - At least 3 criteria
  - Step 6 names a real reason, not "winner was better"
  - Step 7 is concrete (a metric, an event, a deadline)
```

## Common variations

- **Reversible decision**: shorter; only need 2 criteria + a "trial period"
- **Big bet**: requires step 7 to be very concrete + a kill criterion
- **Hire vs no-hire**: replace criteria with "must-haves" and "nice-to-haves"
