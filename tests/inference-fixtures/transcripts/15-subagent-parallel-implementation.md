<!-- fixture-id: 15 -->
<!-- expected-kind: subagent -->
<!-- captured: 2026-04-16T17:42:00Z -->
<!-- source: synthetic — hand-written for pressure testing -->
<!-- turns: 10 -->

## Turn 1 — User
We need a CSV import feature for the customer-data uploader. I want to see three implementation attempts in parallel — different approaches — and pick the best. Don't converge prematurely; let the three subagents design independently.

## Turn 2 — Agent
Dispatching three implementation subagents in parallel, each in its own git worktree, with the same brief but different design constraints.

Subagent A — streaming approach: builds the importer around a streaming CSV parser; never holds more than one row in memory; designed for files up to 10GB.

Subagent B — batch approach: reads the file into chunks of 10k rows; batched DB writes; designed for the typical 100MB-and-under case with the lowest latency.

Subagent C — queue-based approach: parses the file into a queue of per-row jobs; workers process the queue; designed for resilience to mid-import failures.

All three subagents share the same acceptance test (parse a 50k-row sample, write to staging table, return import-summary JSON) so the outputs are comparable.

## Turn 3 — Agent
**Subagent A (streaming) — returned.**

> Implementation: Node.js readable stream → csv-parse transform → per-row validator → INSERT statements batched in groups of 500 inside a single transaction.
> Memory profile on 50k rows: 38MB peak. On a 1M-row synthetic file: 41MB peak — confirms the streaming claim.
> Time on 50k rows: 4.2s.
> Code size: 180 lines.

## Turn 4 — Agent
**Subagent B (batch) — returned.**

> Implementation: read entire file into memory → parse as one array → split into 10k-row chunks → COPY each chunk into the staging table.
> Memory profile on 50k rows: 110MB peak (the whole file held in memory).
> Time on 50k rows: 1.8s — fastest of the three because COPY is dramatically faster than INSERT.
> Code size: 95 lines.
> Cap: would OOM on files above ~2GB on our standard 4GB worker.

## Turn 5 — Agent
**Subagent C (queue-based) — returned.**

> Implementation: parse file → enqueue per-row jobs to a Redis-backed BullMQ queue → 4 worker processes consume in parallel → each worker writes one row at a time with retry on failure.
> Memory profile on 50k rows: 55MB peak.
> Time on 50k rows: 12s — slowest because of queue round-trips per row.
> Code size: 320 lines.
> Resilience: kills the worker process mid-import and the remaining rows are picked up by other workers; only the in-flight rows risk duplicate inserts. The other two approaches lose all progress on a mid-import failure.

## Turn 6 — Agent
**Aggregating the three subagent attempts:**

| | A (streaming) | B (batch) | C (queue) |
|---|---|---|---|
| Time on 50k rows | 4.2s | 1.8s | 12s |
| Peak memory | 38MB | 110MB | 55MB |
| Largest tractable file | 10GB+ | ~2GB | 10GB+ |
| Resilience to mid-run failure | None (transaction rollback) | None | High (queue-replay) |
| Code size | 180 lines | 95 lines | 320 lines |
| Operational deps | None | None | Redis + BullMQ |

## Turn 7 — Agent
**Picking the best:** Subagent A's streaming implementation is the best fit for our actual usage pattern.

Reasoning across the three attempts:
- Subagent B is fastest but the file-size cap matches none of the customer files we've seen larger than 500MB; we'd hit OOM on the long tail.
- Subagent C's resilience is impressive but adds a Redis dependency and 320 lines of code for a problem (mid-import recovery) that customers can solve by re-uploading.
- Subagent A's 4.2s on 50k rows is well within the 30s p95 SLO, holds memory under any input size, and the 180-line implementation is the easiest to maintain.

If usage shifts toward 1GB+ files where re-upload becomes painful, the queue-based approach in subagent C becomes worth revisiting — its work is not wasted, it's just early.

## Turn 8 — User
Agreed. The three-attempt parallel design surfaced the file-size cap on the batch approach, which I wouldn't have caught from a single implementation run.

## Turn 9 — Agent
That's why dispatching all three implementations at once is worth the cost — none of the subagents knew the others were running, so the comparison reflects three honest attempts at the brief rather than one attempt that gets compared against ad-hoc alternatives later.

The two losing implementations also become future options if constraints change, since they were built and benchmarked with the same acceptance test.

## Turn 10 — User
Right. Ship subagent A's branch.
