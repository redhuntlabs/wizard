---
name: preparing-for-a-meeting
description: Use when prepping for any work meeting (1:1, customer call, interview, review) - 60-second-readable brief
kind: workflow
audience: knowledge-worker
ai-tools: any
complexity: simple
time: 5-15 min
version: 1.0.0
source: bundled
---

# Preparing for a Meeting

## What this does

Generates a 60-second-readable brief you scan before the meeting starts. Three things you must know, two things to mention, three questions you could ask.

## When to use

- Any meeting where you need to walk in able to talk substance
- 1:1s where you want to follow up on prior threads
- Customer calls where the client's recent context matters
- Interviews (yours or theirs)

## What you bring (Inputs)

- Meeting topic or attendees
- Meeting purpose (intro / sale / interview / review / decision / other)
- Time available to prep (5-30 min)

## What you get (Output)

A one-screen brief with: TLDR, Key facts, Things to mention, Questions to ask.

## How it works (Steps)

This is a simple workflow.

## Stages

### Stage 1: Identify the must-know facts

Three things you'd be embarrassed not to know in this meeting. Examples: their company's recent news, their last interaction with you, the current state of the project being discussed.

### Stage 2: Find each fact (with source)

For each must-know, find the answer and note the source so you could verify mid-meeting if asked.

### Stage 3: Pick 2 things to mention

Specific things from prior interactions or recent context that the other party would notice and appreciate. Avoids generic "great chat last time" filler.

### Stage 4: Generate 3 questions

Open-ended questions you could ask. Specific to the context, not generic ("what are your priorities?").

### Stage 5: Format

TLDR (1 sentence) / Key facts (3 bullets with sources) / Things to mention (2 bullets) / Questions to ask (3 bullets).

## Checkpoints

- **After Stage 1**: 3 must-knows identified
- **After Stage 2**: every must-know has an answer with a source
- **After Stage 3**: things-to-mention reference recent / specific / non-obvious info
- **After Stage 4**: questions are open-ended and specific
- **After Stage 5**: brief fits on one screen

## Loop-back conditions

Return to Stage 1 if research reveals a must-know you missed.

## Quality bar

- Brief is one screen (under 250 words)
- Every fact has a source
- Things-to-mention are non-obvious (not "saw your post on LinkedIn")
- Questions are not yes/no

## Variations

- **1:1 prep**: replace "things to mention" with "open threads from last 1:1"
- **Customer call prep**: add "their likely objections" section
- **Interview prep**: add "stated values + how I match" section
- **Quick prep (5 min)**: skip Stage 3; do 2 must-knows, 2 questions

## Example

**Input**: Hiring sync with Eng Manager Pat, 30 min, discussing two open roles.

**Output**:

> **TLDR**: Pat needs help unblocking their senior backend role; their staff role is on hold.
>
> **Key facts**:
> - Senior backend role open since Jan; 2 candidates in pipeline (Greenhouse link)
> - Staff role on hold since March (per Pat's last update)
> - Pat's team shipped the new auth system last week (slack #eng)
>
> **Things to mention**:
> - Auth ship — congrats; ask about retro
> - The new sourcing tool we trialed; results from last week
>
> **Questions to ask**:
> 1. What changed about the staff role hold?
> 2. Of the 2 candidates in pipeline, which would you push to onsite this week?
> 3. ...
