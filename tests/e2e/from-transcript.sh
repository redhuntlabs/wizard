#!/usr/bin/env bash
# tests/e2e/from-transcript.sh
# E2E: --from-transcript path is wired and validators are green.
# This is a static smoke test: deterministic fixture runner stands in for the
# live LLM-driven inference flow.

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
cd "$REPO_ROOT"

if ! node scripts/run-inference-fixtures.js > /tmp/inference-out.txt; then
  echo "FAIL: fixture runner exited non-zero"
  cat /tmp/inference-out.txt
  exit 1
fi

if ! grep -q "Kind correctly inferred" /tmp/inference-out.txt; then
  echo "FAIL: fixture runner did not print kind-inferred line"
  exit 1
fi

if ! node scripts/validate-spell.js skills/inferring-a-spell-from-examples/SKILL.md; then
  echo "FAIL: inferring-a-spell-from-examples does not validate"
  exit 1
fi

if ! node scripts/validate-spell.js skills/building-a-spell/SKILL.md; then
  echo "FAIL: building-a-spell (with Stage -1) does not validate"
  exit 1
fi

if ! grep -q "from-transcript" commands/build-spell.md; then
  echo "FAIL: build-spell.md is missing the --from-transcript section"
  exit 1
fi

[ -f "tests/e2e/fixtures/sample-research-transcript.md" ] || {
  echo "FAIL: sample fixture missing"
  exit 1
}

echo "PASS e2e: --from-transcript path is wired and validators are green."
