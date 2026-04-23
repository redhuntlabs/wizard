---
name: interview-synthesis
description: Use when turning raw interview notes into themes - produces themes, verbatim quotes, and decisions or hypotheses
kind: workflow
audience: anyone
ai-tools: any
complexity: guided
time: 30-90 min per round of interviews
version: 1.0.0
source: bundled
---

# Interview Synthesis

## What this does

Turns raw interview notes (1-N interviews) into a structured synthesis: themes that recurred, verbatim quotes that anchor each theme, and the decisions or hypotheses the synthesis supports.

## When to use

- After user research interviews
- After expert interviews for journalism / writing / product work
- After internal stakeholder interviews
- After any structured set of conversations where the next step is "what do we do with this"

## What you bring (Inputs)

- Raw notes from N interviews (transcripts or your shorthand)
- The original research question (what were you trying to learn)
- Who the synthesis is for (you / a team / a client) — drives format

## What you get (Output)

A document with: research question, methods, themes (3-7), verbatim supporting quotes per theme, surprises, and the decisions or hypotheses the data supports.

## How it works (Steps)

This is a workflow.

## Stages

### Stage 1: Re-read with fresh eyes

Read all the notes through once without highlighting anything. Just take in the totality. This guards against latching onto the first idea.

### Stage 2: Tag each note

Go through each interview and tag observations. Tags are short — 2-4 words. Examples: "Pricing confusion," "Wants integration," "Onboarding too slow."

Don't merge tags yet. Keep them granular.

### Stage 3: Cluster tags into themes

Group similar tags. Aim for 3-7 themes. If you have 1-2, you're under-clustering. If you have 15+, you're over-tagging.

A theme is interesting if it appears in more than one interview AND is non-obvious.

### Stage 4: Find the verbatim quote per theme

For each theme, pull the strongest 1-2 verbatim quotes. Use the speaker's actual words. These anchor the theme and prevent paraphrasing drift.

### Stage 5: Note surprises

What did you NOT expect to hear? What contradicted your hypothesis going in? Surprises are often the most valuable output.

### Stage 6: State the decisions or hypotheses

The synthesis should support concrete next steps. Examples:

- Decision: "We will rebuild the onboarding flow."
- Hypothesis: "Pricing confusion drives churn in months 2-3 — we should test a clearer pricing page."

If the synthesis doesn't support any decision or hypothesis, you under-interviewed or under-tagged.

### Stage 7: Write the document

Standard structure:

- **Question**: what we were trying to learn
- **Method**: N interviews, who, when, format
- **Themes (3-7)** with verbatim quotes
- **Surprises**
- **Decisions and hypotheses**
- **Next steps** (more interviews? a test? a decision?)

## Checkpoints

- **After Stage 2**: every interview has been tagged
- **After Stage 3**: 3-7 themes, each appearing in 2+ interviews
- **After Stage 4**: every theme has a verbatim quote
- **After Stage 6**: at least 1 decision or hypothesis is named

## Loop-back conditions

- If a theme has no verbatim quote: cut it (it's your projection, not data)
- If the synthesis supports no decision: you may need more interviews — name the gap explicitly

## Quality bar

- Verbatim quotes are quoted exactly, with speaker attribution if appropriate
- Themes are non-obvious (if the theme is "users want it to be easier," cut it — too generic)
- Surprises section is present even if short
- Decisions/hypotheses are concrete

## Variations

- **Single interview**: skip clustering; instead, find the 3-5 most interesting points
- **Quantitative + qualitative**: pair counts (how many interviewees said X) with the quote
- **Long-running research**: each round of interviews updates the prior synthesis; mark what changed

## Example

**Input**: 8 interviews with new SaaS users about onboarding.

**Output**:

- Question: Why are users dropping off in week 1?
- Themes:
  1. **Setup felt longer than promised** (6/8) — "I thought it'd take 5 minutes; I spent 40."
  2. **Sample data made things worse, not better** (5/8) — "I couldn't tell what was demo and what was mine."
  3. **Email reminders felt naggy** (4/8) — "Three emails in two days; I unsubscribed."
- Surprises: nobody mentioned pricing.
- Decisions: cut sample data from default; reduce onboarding emails to 1.
- Hypothesis: clearer setup-time estimate would reduce week-1 drop by 20%.
- Next: A/B test the setup-time estimate language.
