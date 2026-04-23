# Shape: Compare Two Things

## Trigger keywords

compare, X vs Y, difference between, side by side, which is better, contrast

## Output type

A side-by-side comparison table with a recommendation.

## Strawman

```
Inputs:
  - The two (or more) things being compared
  - The use case (so the comparison is grounded)
  - The criteria that matter for that use case

Steps:
  1. State the use case
  2. List criteria as a column header set
  3. For each criterion, fill in for each option (concrete; numbers/specifics)
  4. Note which option wins each row
  5. Add a "tiebreaker" row if there's no clear winner
  6. Recommend, naming the deciding criterion

Quality bar:
  - At least 4 criteria
  - Every cell is a specific value (no "yes/decent/medium")
  - Recommendation names ONE deciding criterion, not a tie of three
  - Acknowledge what the loser is better at (avoids selection bias)
```

## Common variations

- **Tools comparison**: criteria include cost, learning curve, integrations
- **Job offers**: criteria include comp, growth, lifestyle, risk
- **Apartments / houses**: criteria include cost, location, space, condition
