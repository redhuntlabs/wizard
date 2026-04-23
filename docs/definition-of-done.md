# V1 Definition of Done

V1 is "done" when all six self-tests below pass on a clean install.

## The six self-tests

### Test 1: Basic functionality

The meta-builder can interview a user, draft a `content`-kind spell, run try-it, and save it.

**Procedure**:

1. Clean install in a sandbox `$WIZARD_HOME`
2. `/build-spell`
3. Provide: "I want a skill for writing a friendly Sunday email to my parents"
4. Verify the meta-builder routes to `building-a-spell`, runs an Express interview (because context is rich), shows a strawman, runs try-it, and saves the file
5. Verify the file passes `node scripts/validate-spell.js <path>`

**Pass**: file saved, validator passes, content is non-trivial.

### Test 2: Intuitive UX

The interview adapts depth and offers a workflow-shape strawman.

**Procedure**:

1. `/build-spell` with a vague prompt: "I want a skill for trips."
2. Verify Standard or Deep mode (not Express) because context is thin
3. Provide enough context after a few clarifying questions
4. Verify the meta-builder offers a workflow-shape strawman (likely matches `pre-meeting-prep` or a custom guided workflow shape) before drafting from scratch
5. Verify the user can pivot mid-interview ("actually, I just want a packing list") and the meta-builder re-routes

**Pass**: depth adapts; strawman offered; pivot handled.

### Test 3: Iron Law enforcement

The meta-builder cannot be talked into saving without try-it.

**Procedure**:

```
node scripts/adversarial-tests/attempt-skip-tryit.js
```

The static test verifies `building-a-spell/SKILL.md` contains:

- The verbatim Iron Law forbidden-excuses table
- The `<MUST-STOP>` block before save
- The phrase "no save without PASS"

**Pass**: script exits 0.

### Test 4: Batch Iron Law

When asked to build multiple spells in one session, the meta-builder completes one before starting the next.

**Procedure**:

```
node scripts/adversarial-tests/attempt-batch-builds.js
```

The static test verifies `building-a-spell/SKILL.md` AND `intuitive-interviewing/SKILL.md` contain:

- The verbatim Batch Iron Law (Second Iron Law) text
- The forbidden-excuses table for batching
- The `<MUST-STOP>` block before starting a second interview

**Pass**: script exits 0.

### Test 5: Chain runnability

`general-research-loop` runs end-to-end on a real research question and produces a verified brief.

**Procedure**:

1. Clean install
2. `/cast-spell general-research-loop`
3. Input: "What does the evidence say about 4-day work weeks, 2020-2025?"
4. Verify each of the four stages fires its gate
5. Verify the final output has a verified bibliography (no `[NEEDS RE-RUN]` left)

**Pass**: brief produced; every citation verified or explicitly hedged.

### Test 6: General parity

The two walkthroughs in [general-parity-tutorial.md](general-parity-tutorial.md) are reproducible: a user with the framework can build, with the meta-builder only, a research-rigor chain and a dev-rigor chain.

**Procedure**:

1. Follow Walkthrough 1 step-by-step in a clean sandbox
2. Verify the resulting `general-research-loop` (built by hand) is structurally equivalent to the bundled one
3. Follow Walkthrough 2 step-by-step
4. Verify the resulting `dev-tdd-loop` (built by hand) is structurally equivalent to the bundled one

**Pass**: both walkthroughs reproducible; resulting chains have the same primitives (discipline + workflow + subagent + chain) as the bundled equivalents.

## Validator and loader sanity

In addition to the six self-tests, before tagging V1:

- `node scripts/validate-spell.js spells/**/SKILL.md` exits 0 for every file
- `node scripts/build-loader-paths.js` succeeds and produces `.loader-cache/skills/` with one symlink (or junction or copy fallback) per SKILL.md

## What V1 does NOT need to satisfy

- Telemetry (we don't ship any)
- A central registry (V1 ships file-based sharing only)
- Migration tools from the upstream framework (manual cp + strict-mode export covers it)
- A GUI (V1 is CLI + Markdown)

## How to release

After the six self-tests pass and validator + loader are clean:

1. Tag the commit `v1.0.0`
2. Update `package.json` and `.claude-plugin/plugin.json` and `.cursor-plugin/plugin.json` and `gemini-extension.json` versions to `1.0.0`
3. Write release notes summarizing the bundled spells
4. Optionally: post to the relevant communities

V1 is shipped.
