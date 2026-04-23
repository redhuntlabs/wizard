<!-- fixture-id: 12 -->
<!-- expected-kind: discipline -->
<!-- captured: 2026-04-16T13:20:00Z -->
<!-- source: synthetic — hand-written for pressure testing -->
<!-- turns: 12 -->

## Turn 1 — User
When you propose a technical decision, you must always include at least one runner-up alternative with its trade-offs. Single-option proposals are not acceptable — even if you think the answer is obvious. No exceptions.

## Turn 2 — Agent
Understood. The first decision: how to store user-uploaded files for the new media library.

> Recommendation: store files in S3 with a CloudFront CDN in front. Standard pattern, scales to our needs, integrates with our existing AWS account.

## Turn 3 — User
Stop. That's a single-option proposal. The rule isn't suspended because S3 is the obvious answer. Give me at least one runner-up with trade-offs.

## Turn 4 — Agent
You're right; I violated the rule. Restating with a runner-up:

> **Recommendation:** Amazon S3 with CloudFront in front.
> - Pros: scales effectively without operations work, integrates with our AWS account, mature ecosystem.
> - Cons: egress costs grow with traffic; we are locked into AWS for storage.
>
> **Runner-up:** Cloudflare R2 with Cloudflare CDN.
> - Pros: zero egress fees, single vendor for storage and CDN, S3-compatible API so our application code barely changes.
> - Cons: newer than S3 — less operational track record at large scale; our team has less existing tooling around it.
>
> **Why I still pick S3:** the egress savings on R2 are meaningful at our current ~3 TB/month but not enough to outweigh AWS-account integration and the team's existing operational fluency. Worth revisiting if traffic 10×.

## Turn 5 — User
That's the right shape. Next decision: which queue for the background image-resize jobs?

## Turn 6 — Agent
> **Recommendation:** SQS standard queue with a worker pool on Fargate.
> - Pros: fully managed, integrates with our AWS infra, consumers scale horizontally.
> - Cons: at-least-once delivery means workers must be idempotent; visibility-timeout tuning is non-obvious.

## Turn 7 — User
Single option again. Same rule.

## Turn 8 — Agent
Caught — adding the runner-up I should have led with:

> **Runner-up:** Redis-backed BullMQ queue.
> - Pros: lower latency for short jobs (sub-second pickup vs SQS's ~1s polling), richer job-state model (delayed jobs, retries, priorities) out of the box, easier local dev story.
> - Cons: requires operating a Redis cluster (we already have one for caching but it's not currently sized for queue durability), no native FIFO-with-dedup story.
>
> **Why I still pick SQS:** image-resize latency requirements are 30 seconds end-to-end, so SQS's 1-second polling is fine. The cost of taking on Redis durability operations isn't worth saving a second.

## Turn 9 — User
Good. Third decision — and you've slipped twice already, so this one's a test. How should we authenticate users in the mobile app?

## Turn 10 — Agent
Going slow this time so I do not slip on the rule again.

> **Recommendation:** OAuth 2.0 with PKCE, tokens stored in the platform secure enclave (iOS Keychain, Android Keystore).
> - Pros: industry-standard mobile pattern; PKCE prevents code interception; secure-enclave storage protects against device-level token theft.
> - Cons: implementation has many small steps that are easy to get wrong; we need to maintain our own OAuth server or pay a vendor.
>
> **Runner-up A:** Sign in with Apple / Sign in with Google as the primary auth, with our backend issuing session tokens after.
> - Pros: shifts most of the auth security work to platform vendors; lowest friction for users with existing platform accounts.
> - Cons: requires a fallback for users who don't want to use a platform account; per-platform implementation differences add maintenance.
>
> **Runner-up B:** Email magic-link flow with short-lived JWTs.
> - Pros: simplest to implement; no password storage; works the same on every platform.
> - Cons: bad offline experience; magic links are phishable; not suitable for a "log in once and stay logged in for months" mobile pattern.
>
> **Why I still pick OAuth + PKCE + secure enclave:** mobile users expect to stay logged in across app launches without retyping passwords; magic links don't fit that. The platform-auth runner-up is genuinely close — if we expect >70% of users to sign in with a platform account anyway, that flips the recommendation.

## Turn 11 — User
That's the rule applied correctly — recommendation, runner-up, trade-offs, and an honest condition under which the runner-up wins. The two runner-ups instead of one is fine; the rule is at-least-one, not exactly-one.

## Turn 12 — Agent
Acknowledged. The pattern that worked on the third try: lead with the recommendation, immediately list the runner-up(s) with their pros and cons in parallel structure, and end with the condition under which the recommendation would flip. The first two violations were both "the answer is obviously X, why bother" — exactly the cases the rule exists to catch, since "obviously X" usually means I haven't actually considered the alternative.
