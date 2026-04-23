# Workflow Shapes

Each file in this folder is a strawman template for a common task shape. The `intuitive-interviewing` skill scans this folder and proposes the best-matching shape early in the interview, so the user iterates on a draft instead of answering a 12-question form.

## Format

Each shape file is plain markdown with these sections:

- `## Trigger keywords` — words/phrases in the user's input that signal this shape
- `## Output type` — what the user gets at the end (email, summary, decision, etc.)
- `## Strawman` — a draft spell body the user can edit
- `## Common variations` — known forks of the shape

## Current shapes

1. `personalized-outbound-message.md` — cold emails, DMs, intros
2. `recurring-stakeholder-update.md` — status reports, weekly updates
3. `summary-with-quotes.md` — document/article summaries with pull quotes
4. `pre-meeting-prep.md` — research a person/company before a meeting
5. `decision-with-alternatives.md` — pick one option from many
6. `triage-incoming-list.md` — sort, label, prioritize a list
7. `learn-from-source.md` — turn a source (book, paper, video) into notes
8. `brainstorm-then-cluster.md` — generate ideas, group, pick top
9. `verify-fact-or-claim.md` — check a statement against sources
10. `compare-two-things.md` — side-by-side option comparison
11. `extract-action-items.md` — pull todos out of meeting notes / threads
12. `respond-to-feedback.md` — reply to feedback constructively

## Adding a new shape

1. Build a shape file using the format above.
2. Verify the meta-builder picks it for matching inputs.
3. Add 1-2 example fillings.
4. Submit per the contributing guide.
