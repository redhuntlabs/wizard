<!-- fixture-id: 06 -->
<!-- expected-kind: workflow -->
<!-- captured: 2026-04-15T19:40:00Z -->
<!-- source: synthetic — hand-written for pressure testing -->
<!-- turns: 12 -->

## Turn 1 — User
Review PR #842 on the billing service. Walk me through how you do reviews so I know what to expect.

## Turn 2 — Agent
I work in four stages.

First, checkout: I'll pull the branch and run the test suite locally so I'm reviewing the code as it actually behaves, not as the CI summary describes it.

Then, diff: I'll read the diff against main, but in dependency order — schema and migrations first, then the service code that uses them, then tests, then docs.

Next, critique: I'll write up the issues — categorized as blocker, suggestion, or nit — with line references.

Finally, suggest: for each blocker I'll propose a concrete fix or a question that needs to be resolved.

If the diff turns out to depend on an unmerged PR, I'll loop back to the checkout step to pull that one too.

## Turn 3 — User
Good. Start with the checkout stage.

## Turn 4 — Agent
**Step 1 — checkout:**

Pulled `feat/billing-async-invoices`. The test suite passed locally on first run (218 tests, 14.2 seconds). One thing to flag: the branch is based on commit `a8f1c2b` of main, which is 11 days old. Worth a rebase before merging, but doesn't change the review itself.

## Turn 5 — User
Move on.

## Turn 6 — Agent
**Step 2 — diff:**

Reading in dependency order.

*Migration (`20260403_async_invoice_jobs.sql`):* adds an `invoice_jobs` table with status enum (pending, running, succeeded, failed) and a foreign key to `invoices`. The `status` column has no default, which will break inserts that don't specify it. Worth flagging.

*Service code (`InvoiceJobRunner.kt`):* implements a polling loop with a 5-second sleep. Two issues stand out — the loop has no shutdown signal handling, and the database call inside the loop holds a connection for the full poll interval rather than releasing between polls.

*Tests (`InvoiceJobRunnerTest.kt`):* covers the happy path and the failure-retry path, but not the "service shutting down mid-run" case. Given the issue with shutdown handling, this is a notable gap.

*Docs:* the runbook section was added; readable.

## Turn 7 — User
Wait — before you move to the critique stage, look at whether this depends on the queue refactor in PR #839. I think the polling loop is supposed to be replaced by the queue.

## Turn 8 — Agent
Good catch. Going back to the checkout step to pull #839 alongside.

**Step 1 (revisited)** — pulled #839 onto the same workspace. Reading the new context: yes, #839 introduces a `JobQueue` abstraction and the polling loop in #842 is meant to be replaced by `JobQueue.poll()` once #839 lands. The diff in #842 still has the raw polling loop because #839 hadn't merged when #842 was opened.

This changes the critique. Re-running the diff stage with the new context.

## Turn 9 — Agent
**Step 2 (second pass) — diff with #839 context:**

*Service code:* the polling loop is acceptable as a temporary state, but the PR description doesn't say "this will be replaced by JobQueue when #839 lands." It should — otherwise a future reader will fix the connection-holding issue without realizing the whole loop is going away.

*Migration:* status default issue still stands; doesn't depend on #839.

*Tests:* the shutdown-mid-run case is still missing, but if the loop is going away, writing the test against the soon-to-be-deleted code is wasted effort. Worth noting in the critique but not blocking.

## Turn 10 — Agent
**Step 3 — critique:**

> **Blockers (must resolve before merge)**
> - Migration: `invoice_jobs.status` has no default value. Inserts that omit it will fail. Suggest `DEFAULT 'pending'`.
>
> **Suggestions (should resolve, not blocking)**
> - PR description should note that `InvoiceJobRunner.runLoop()` is temporary and will be replaced by the `JobQueue.poll()` from #839. Otherwise a reviewer of a later PR will fix the wrong layer.
> - Connection lifecycle: the polling loop holds a DB connection across the 5-second sleep. If you're keeping this code for more than a week, release between polls. If #839 lands first, ignore.
>
> **Nits**
> - Branch is 11 days behind main. Rebase recommended.
> - Test coverage for shutdown-mid-run is missing; deferring until #839 lands.

## Turn 11 — Agent
**Step 4 — suggest:**

For the only blocker, the fix is one line in the migration:

> `status invoice_job_status NOT NULL DEFAULT 'pending'`

For the temporary-code note in the PR description, suggested phrasing:

> "Note: `InvoiceJobRunner.runLoop()` is a stopgap until PR #839's `JobQueue` abstraction lands. Don't optimize the polling loop in this PR — the loop is going away."

## Turn 12 — User
Helpful. The loop-back to pull #839 is what I wanted to make sure you'd do — without that the critique would have been a long list of issues against code that's being deleted.
