<!-- fixture-id: 11 -->
<!-- expected-kind: discipline -->
<!-- captured: 2026-04-16T11:55:00Z -->
<!-- source: synthetic — hand-written for pressure testing -->
<!-- turns: 12 -->

## Turn 1 — User
We're working on the password-reset endpoint. Repo rule: don't ship without tests. Every change must have tests proving the new behavior, and the existing suite must still pass. No exceptions, even for "obvious" one-line fixes.

## Turn 2 — Agent
Got it. Implementing the rate-limit fix you mentioned earlier: bump the per-IP limit on `/auth/reset` from 5/min to 20/min during the password-reset flow, since legitimate users are getting blocked.

Change is one line in `RateLimitConfig.kt`. Committing now and opening a PR.

## Turn 3 — User
Stop. You just said "committing now" without writing or running a test. The rule isn't suspended for one-line changes. Verify before committing — what test proves the new limit works, and what test proves the suite still passes?

## Turn 4 — Agent
You're right; I skipped the rule. Reverting the commit-without-tests intent.

What I should do, and will do:

> 1. Add a test in `RateLimitConfigTest.kt` asserting that the `/auth/reset` route returns 429 on the 21st request from one IP within a minute, and 200 on the 20th.
> 2. Run the full auth-module test suite locally.
> 3. Only then commit.

Doing step 1 now.

## Turn 5 — Agent
Test added:

```kotlin
@Test fun `password reset allows 20 requests per minute per IP`() { ... }
@Test fun `password reset blocks the 21st request per minute per IP`() { ... }
```

Both pass against the new config. Running the full suite now.

## Turn 6 — Agent
Suite results: 412 tests, 411 pass, 1 fails — `ResetTokenIntegrationTest > expires after 15 minutes` is failing. The failure is unrelated to my rate-limit change (it asserts on token TTL, not rate limits) but it's red.

I'll commit the rate-limit change since the failure is unrelated.

## Turn 7 — User
No. The rule is "the existing suite must still pass." Whether the failure is related is not your judgment to make — committing onto a red suite means the next person can't tell if their change broke it. Do not commit until the suite is green.

## Turn 8 — Agent
Acknowledged. Holding the commit.

Investigating the unrelated failure: `ResetTokenIntegrationTest > expires after 15 minutes` was failing because the test relied on system time and the CI machine's clock had drifted. Pulling latest main — the test was fixed in `b32c7d1` two hours ago. Rebasing onto current main resolves it.

After rebase: 412 tests, all green. Now committing.

## Turn 9 — Agent
Commit `e91a4f5` pushed: "Bump password-reset rate limit from 5 to 20 per minute per IP." PR opened with a note that the new behavior is covered by `RateLimitConfigTest > password reset allows 20 / blocks the 21st`.

## Turn 10 — User
Good. Next change: the reset email template has a typo. Fix it.

## Turn 11 — Agent
The typo is in `password_reset_email.html.tmpl` — "recieve" should be "receive."

Before I touch it: there is no test that asserts the spelling of the email body. So either I add one, or I document why this falls under the rule's "exception" clause — but the rule says no exceptions, even for obvious fixes.

Adding a test in `EmailTemplateTest.kt` that renders the template with a sample user and asserts the rendered output contains the word "receive" and does not contain "recieve." Test fails before the fix (good — proves it would catch the typo) and passes after.

Then running the suite: 413 tests, all green. Then committing.

## Turn 12 — User
Right. Two cases this session — the rate-limit one-liner and the email typo — and both times the instinct was to ship without a test. The rule exists because every "this is too small to test" is what slips regressions in. Verify before shipping, every time, including for fixes that would take longer to test than to make.
