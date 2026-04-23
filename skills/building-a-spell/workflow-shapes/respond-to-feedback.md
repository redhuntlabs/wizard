# Shape: Respond To Feedback

## Trigger keywords

respond to feedback, address comments, reply to review, react to criticism, defend or accept, code review reply, manuscript revisions

## Output type

A constructive response that addresses each piece of feedback explicitly.

## Strawman

```
Inputs:
  - The piece of work (draft, code, design, doc)
  - The feedback (as a list, or a thread you'll parse first)
  - Your authority (can you accept/reject, or do you need to negotiate?)

Steps:
  1. Parse feedback into atoms (each piece becomes a separate item)
  2. For each atom, classify: blocker / suggestion / question / nit / out-of-scope
  3. For each atom, decide: accept / reject / negotiate / defer
  4. For accepts: name what changes you'll make
  5. For rejects: name your reason (one sentence; not "I disagree")
  6. For negotiates: propose a middle ground
  7. For defers: name when you will address it

Quality bar:
  - Every atom has a classification AND a decision
  - Reject reasons cite the work or the goal, not feelings
  - Negotiations propose something concrete (not "let's discuss")
  - Tone is grateful (without being sycophantic) and direct
```

## Common variations

- **Code review reply**: file/line refs per atom; "fixed in commit X" for accepts
- **Manuscript revisions**: include a separate cover letter summarizing changes
- **Design critique**: include an updated mock that shows accepts visually
