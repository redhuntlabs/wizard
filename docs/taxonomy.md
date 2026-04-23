# Taxonomy

Every spell has three taxonomy fields in frontmatter: `kind`, `complexity`, and `audience`. They drive how the meta-builder interviews you, how the tester evaluates the result, and how `/list-spells` filters.

## Kind (4 values)

The `kind` is the most important taxonomy decision — it picks the specialist builder skill and the testing methodology.

### `content`

Produces a written artifact (email, summary, status update, brief).

- **Builder**: `building-a-spell` (default flow)
- **Tester mode**: standard (run the skill on a realistic input, evaluate output quality)
- **Examples**: `writing-an-email`, `writing-a-status-update`, `summarizing-a-document`

### `workflow`

A multi-stage process with explicit handoffs between stages.

- **Builder**: `building-a-workflow-spell` (specialist)
- **Tester mode**: standard (walk the stages on a realistic input)
- **Examples**: `planning-a-trip`, `interview-synthesis`, `executing-a-plan-step-by-step`

### `discipline`

A non-negotiable rule with excuses table and hard gate. Shapes behavior under pressure.

- **Builder**: `building-a-discipline-spell` (specialist)
- **Tester mode**: discipline (baseline-without then with-skill, plus pressure scenarios)
- **Examples**: `verifying-before-shipping`, `verifying-before-citing`, `decisions-need-an-alternative`

### `subagent`

Dispatches helper agents in parallel or isolation.

- **Builder**: `building-a-subagent-spell` (specialist)
- **Tester mode**: standard, with extra checks on context-flow declaration and partial-failure handling
- **Examples**: `researching-five-things-in-parallel`

## Complexity (4 values)

Drives the template chosen, the depth of the interview, and how the tester sets up the run.

- **simple** — single-pass; runs in one shot. (Most `content` and discipline-kind spells.)
- **guided** — has stages but no explicit handoff artifacts; the AI walks the user through. (Most `workflow` spells.)
- **chained** — explicit stages with named handoff artifacts and gates between them. Composes multiple spells. (`composes:` field is required.)
- **long-running** — minutes to hours; subagents or multi-session. (Most `subagent` and large `chained` spells.)

## Audience (7 values)

Drives `/list-spells --audience` filtering and the tone of the SKILL.md. Allowed values (from [scripts/spell.schema.json](../scripts/spell.schema.json)):

- **anyone** — the default; no role-specific assumptions
- **knowledge-worker** — assumes work-context (meetings, status updates, projects)
- **researcher** — assumes research context (sources, methods, citations)
- **dev** — assumes developer context (codebase, terminal, CI). Allows dev jargon.
- **student** — assumes academic context (assignments, study, learning)
- **founder** — assumes founder context (fundraising, hiring, customer conversations)
- **operator** — assumes operations context (incidents, runbooks, on-call)

If you find yourself wanting an eighth, file an issue — but the answer is usually "use `anyone` and put the specialization in the description."

## Decision tree: which kind?

1. Does it enforce a rule the user keeps breaking? → `discipline`
2. Does it dispatch multiple agents that work independently? → `subagent`
3. Does it have multiple stages with handoffs? → `workflow`
4. Otherwise → `content`

If you're not sure, the meta-builder will ask you and route accordingly.

## Decision tree: which complexity?

1. Does it dispatch subagents or take longer than 10 minutes wall-clock? → `long-running`
2. Does it compose other spells via explicit handoff artifacts? → `chained`
3. Does it have multiple stages but a single executor? → `guided`
4. Otherwise → `simple`

## Why these axes

- `kind` is about *what behavior to engineer*
- `complexity` is about *what execution flow to support*
- `audience` is about *who reads the SKILL.md*

These three axes cover the design space for the kinds of skills users have built. If you find yourself wanting a fifth, file an issue — but the answer is usually "use `discipline` plus a workflow."

## Mapping to upstream concepts

| Upstream concept | Wizard kind |
|---|---|
| Most "skill" markdowns | `content` or `workflow` |
| The Iron Law and rule-shaped skills | `discipline` |
| Subagent dispatch in `dispatching-parallel-agents` | `subagent` |
| Workflow chains in `executing-plans` | `workflow` with `complexity: chained` |

We added `kind` as an explicit field because in a multi-domain framework, the routing matters more than it does in a dev-only one.
