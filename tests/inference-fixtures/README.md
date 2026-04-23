# Inference Fixtures

20 hand-crafted transcripts for pressure-testing `inferring-a-skill-from-examples`.

## Composition

| ID range | Kind | Count |
|---|---|---|
| 01–04 | content | 4 |
| 05–08 | workflow | 4 |
| 09–12 | discipline | 4 |
| 13–15 | subagent | 3 |
| 16–18 | TOO-THIN (suitability negative) | 3 |
| 19–20 | TOO-BROAD (suitability negative) | 2 |

## Expected file schema

```yaml
expected_outcome: BUILDABLE        # or TOO-THIN | TOO-BROAD
expected_kind: workflow            # only set when expected_outcome == BUILDABLE
expected_audience: researcher      # advisory; not gated
expected_signals:                  # ≥3 specific signals the skill must surface
  - "stages: scope, search, verify, draft"
  - "loop-back from verify to search"
  - "quality bar: every claim has source"
forbidden_in_draft:                # zero-tolerance — fail if any appear
  - "must"                         # would imply false discipline
  - "never"
```

## Running

```bash
node scripts/run-inference-fixtures.js
```

Exits 0 only if all gates from the design spec §7 pass.
