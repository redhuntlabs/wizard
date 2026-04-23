<!-- fixture-id: 07 -->
<!-- expected-kind: workflow -->
<!-- captured: 2026-04-15T20:55:00Z -->
<!-- source: synthetic — hand-written for pressure testing -->
<!-- turns: 14 -->

## Turn 1 — User
Add a feature flag system to the user-settings API. Before you write any code, write the plan and let me approve it.

## Turn 2 — Agent
Here's the plan, broken into named steps.

> **Step 1 — schema:** add a `feature_flags` JSONB column to the `user_settings` table with a migration. Default empty object. Backfill is unnecessary because reads will treat missing keys as "off."
>
> **Step 2 — read path:** add a `getFlag(userId, flagName)` accessor that reads the JSONB column. Cached in Redis with a 60-second TTL.
>
> **Step 3 — write path:** add an `setFlag(userId, flagName, value)` mutation. Writes through the cache and emits an audit event.
>
> **Step 4 — admin endpoint:** an internal-only `POST /admin/feature-flags` for ops to flip flags by user.
>
> **Step 5 — tests:** unit tests for the accessor and mutation, an integration test for the admin endpoint, and a load test for the cached read path.
>
> **Step 6 — docs:** add a section to the user-settings runbook on how ops flips a flag.
>
> Estimated 2 days. I'll do them in order; each step ends with a green test run before moving on.

## Turn 3 — User
The plan looks right. One change: in step 4, the admin endpoint should also be available via a CLI command for the ops team — they prefer it over hitting the endpoint directly. Add that as part of step 4.

## Turn 4 — Agent
Updated step 4:

> **Step 4 — admin surface:** add an internal-only `POST /admin/feature-flags` endpoint **and** a `featuresctl set <user> <flag> <value>` CLI that calls the same code path. The CLI ships in the existing ops-tools package.

Approved? I'll start on step 1.

## Turn 5 — User
Approved. Go.

## Turn 6 — Agent
**Step 1 — schema:**

Migration written and applied locally:

```sql
ALTER TABLE user_settings
  ADD COLUMN feature_flags JSONB NOT NULL DEFAULT '{}';
```

Tests pass. Step 1 complete. Moving to step 2.

## Turn 7 — Agent
**Step 2 — read path:**

Added `UserSettingsService.getFlag(userId, flagName)`. Redis cache key is `flags:<userId>:<flagName>` with a 60-second TTL. Added unit tests for the cache-hit, cache-miss, and missing-key cases. All passing.

Step 2 complete. Moving to step 3.

## Turn 8 — User
Pause — I want to look at the cache key choice before you go further. One key per flag means N round-trips for any caller that reads more than one flag at a time. Is that the right shape?

## Turn 9 — Agent
Good question. You're right — most callers will read a handful of flags together (e.g. the API gateway checking 3–4 flags at request time). One key per flag costs N Redis calls per request.

Going back to step 2 to revise the cache shape: cache the whole `feature_flags` object per user under one key. Single Redis call regardless of how many flags the caller checks. The mutation in step 3 will invalidate the whole object, which is fine because writes are rare relative to reads.

Re-running step 2 tests after the change. All passing. Moving on.

## Turn 10 — Agent
**Step 3 — write path:**

Added `setFlag(userId, flagName, value)`. It updates the JSONB column, invalidates the Redis key for that user, and emits an audit event with `(userId, flagName, oldValue, newValue, actor)`. Tests pass.

Step 3 complete.

## Turn 11 — Agent
**Step 4 — admin surface:**

Added `POST /admin/feature-flags` (auth-gated to the ops role) and the `featuresctl` CLI. CLI calls into the same `setFlag` accessor used by the endpoint, so behavior is identical. Integration test exercising both the endpoint and the CLI passes.

Step 4 complete. Moving to step 5.

## Turn 12 — Agent
**Step 5 — tests:**

The unit and integration tests already exist from steps 2–4. Added the load test against the cached read path: 10k requests/sec for 60 seconds, p99 latency 4ms (cache hit), no errors.

Step 5 complete.

## Turn 13 — Agent
**Step 6 — docs:**

Added a section to the user-settings runbook covering: how to read the current flag state for a user (`featuresctl get`), how to flip a flag (`featuresctl set`), and how to read the audit log for flag changes.

All six steps complete. PR is ready for review.

## Turn 14 — User
Good — the loop-back at step 9 to reconsider the cache shape was the right call. If you'd kept going we'd have shipped a per-flag cache and re-done it later.
