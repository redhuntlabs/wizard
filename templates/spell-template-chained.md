---
name: <chain-name>
description: Use when <trigger>
kind: workflow
audience: <audience>
ai-tools: any
complexity: chained
time: <total>
version: 0.1.0
source: personal
composes:
  - <constituent-spell-1>
  - <constituent-spell-2>
  - <constituent-spell-3>
---

# <Display Name>

## What this does

<One paragraph describing the end-to-end outcome of running the full chain.>

## When to use

- <trigger 1>
- <trigger 2>

## What you bring (Inputs)

<Inputs that flow into stage 1.>

## What you get (Output)

<Final artifact after all stages.>

## How it works (Steps)

This is a workflow chain. Each stage invokes a constituent spell.

## Stages

### Stage 1: <constituent-spell-1>

- **Goal**: <what this stage accomplishes>
- **Output handed to next stage**: <artifact name>

### Stage 2: <constituent-spell-2>

- **Goal**: <what this stage accomplishes>
- **Input from previous stage**: <artifact name>
- **Output handed to next stage**: <artifact name>

### Stage 3: <constituent-spell-3>

- **Goal**: <what this stage accomplishes>
- **Input from previous stage**: <artifact name>
- **Output**: <final artifact>

## Checkpoints

Pass each stage gate only when:

- **After stage 1**: <criterion>
- **After stage 2**: <criterion>
- **After stage 3**: <criterion>

## Loop-back conditions

Return to an earlier stage when:

- <condition 1>
- <condition 2>

## Quality bar

The chain succeeded when:

- <overall criterion>

## Variations

- **Skip stage N**: <when this is acceptable>

## Example

**Input:** <example trigger>

**Output:** <example final artifact>
