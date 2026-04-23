# Shape: Verify Fact or Claim

## Trigger keywords

fact-check, verify, is it true that, source for, citation, double-check, confirm, validate this

## Output type

A verdict (true / false / mixed / unverifiable) with the source(s) used.

## Strawman

```
Inputs:
  - The claim, stated as a single sentence
  - Where you first encountered it (so you can compare to canonical sources)

Steps:
  1. Restate the claim precisely (specific numbers, dates, named entities)
  2. Identify what would have to be true for it to be true
  3. Search for an authoritative source that addresses each "must be true"
  4. Compare the claim's specifics to the source's specifics
  5. Issue verdict + name source(s) used

Quality bar:
  - Restatement is precise enough to be falsifiable
  - At least one source named per "must be true"
  - Verdict words used precisely: "true / false / partly true / unverifiable"
  - Never "probably true" — that means unverifiable
```

## Common variations

- **Fact-check with timeline**: add date the source was published
- **Quote check**: verify the wording AND the attribution AND the context
- **Statistic check**: verify the number AND the methodology AND the year
