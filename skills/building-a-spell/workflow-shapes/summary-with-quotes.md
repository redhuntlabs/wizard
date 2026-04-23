# Shape: Summary With Quotes

## Trigger keywords

summarize, summary, tldr, brief, recap, key points, takeaways, highlights, executive summary

## Output type

A short summary of a longer source, with verbatim quotes for the most important claims.

## Strawman

```
Inputs:
  - The source (article, paper, transcript, doc)
  - Audience (who reads the summary)
  - Length budget (number of bullets or words)

Steps:
  1. Read the full source
  2. Pull out the 3-5 most important claims (not the most interesting prose)
  3. For each claim, find one verbatim quote that supports it
  4. Write one bullet per claim: claim in your words, then the quote
  5. Add a one-sentence overall takeaway at the top

Quality bar:
  - Within length budget
  - Every claim has a verbatim quote (no paraphrasing posing as quote)
  - Quotes are accurate (copy-paste, not retyped)
  - Takeaway sentence stands alone (someone could read just it)
```

## Common variations

- **Pure summary** (no quotes): drop step 3 and step 4's quote portion
- **Quote-only**: just steps 3-4, no claim wrapping
- **Disagreement summary**: add "what's contested in this source" as a final bullet
