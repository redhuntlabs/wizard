# Shape: Brainstorm Then Cluster

## Trigger keywords

brainstorm, ideate, generate ideas, come up with, possibilities, options for, ways to

## Output type

A clustered list of ideas with the top few highlighted.

## Strawman

```
Inputs:
  - The question or prompt
  - Constraints (budget, time, audience, etc.)
  - Target idea count (default 15)

Steps:
  1. Generate raw ideas without filtering (target count)
  2. Look for natural clusters (themes, mechanisms, audiences)
  3. Name each cluster
  4. Pick the top 1-3 ideas overall using your stated criteria
  5. For each top pick, write one sentence on why it's promising
  6. Note one cluster that's missing (signal of where to brainstorm next)

Quality bar:
  - Reached target count in step 1 (don't filter early)
  - 3-5 clusters (if 1, prompt was too narrow; if 8+, too broad)
  - Top picks have explicit "why" not just "this one"
```

## Common variations

- **Brainstorm with constraints**: add criteria check after step 1
- **Solo brainstorm**: shorter; skip step 5
- **Brainstorm a name**: replace clustering with sound/feel grouping
