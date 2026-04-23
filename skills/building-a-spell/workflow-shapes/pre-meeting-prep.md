# Shape: Pre-Meeting Prep

## Trigger keywords

prep for meeting, before meeting, meeting prep, research a person, research a company, brief me on, background on, ahead of call

## Output type

A short brief about a person, company, or topic that the user can read in 60 seconds before a meeting.

## Strawman

```
Inputs:
  - Who/what the meeting is about (person, company, topic)
  - Meeting purpose (intro / sales / interview / review / negotiation)
  - Time available to prep (sets depth)

Steps:
  1. Identify 3 things you'd be embarrassed not to know
  2. Find the answer to each (named source per fact)
  3. Identify 2 things the other party would be impressed you noticed
  4. Generate 3 questions you could ask
  5. Format as: TLDR / Key facts (with sources) / Things to mention / Questions to ask

Quality bar:
  - Under 1 page
  - Every fact names its source (so user can verify mid-meeting)
  - Questions are open-ended (not yes/no)
  - "Things to mention" reference recent / specific / non-obvious info
```

## Common variations

- **1:1 prep**: replace "things to mention" with "open threads from last 1:1"
- **Sales call prep**: add "their likely objections" section
- **Interview prep**: add "their stated values + how I match" section
