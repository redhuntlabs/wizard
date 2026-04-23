<!-- fixture-id: 03 -->
<!-- expected-kind: content -->
<!-- captured: 2026-04-15T16:02:00Z -->
<!-- source: synthetic — hand-written for pressure testing -->
<!-- turns: 10 -->

## Turn 1 — User
I have a 24-page architecture review doc on our payments stack. My VP wants the gist before her 1:1 with the CTO this afternoon. The audience is non-technical executive — she cares about risk, cost, and timeline, not implementation details. Please draft a bullet summary, no more than ten bullets.

[doc contents elided — agent has access to the full text via the workspace]

## Turn 2 — Agent
Here's a first draft:

> - Current payments stack is built on a 2018 monolith with three tightly-coupled services.
> - Two of the three services share a database, which causes intermittent deadlocks during peak load.
> - The team proposes splitting the deadlock-prone service into its own database over the next two quarters.
> - Estimated engineering cost: 2.5 engineer-quarters.
> - Estimated risk during migration: a 4-hour planned downtime window for cutover.
> - Long-term benefit: removes a class of incidents that has cost ~12 hours of P1 outage in the last 12 months.
> - Open question: whether to migrate to managed Postgres or stay on self-hosted.
> - Open question: whether the migration blocks the EU expansion (currently scheduled for Q4).
> - The doc recommends starting in Q3.
> - The doc does not address the impact on the chargeback workflow.

## Turn 3 — Agent
Hold on — re-reading my draft, the tone is too engineer-y for an exec. Words like "deadlock-prone service" and "monolith" will lose her. Want me to revise toward plain language?

## Turn 4 — User
Yes, please. Rewrite each bullet so a senior exec who has never opened a database admin tool understands the impact. Keep the numbers, lose the jargon.

## Turn 5 — Agent
Revised:

> - The payments system was built in 2018 and three of its parts are stitched together too tightly to scale safely.
> - Two of those parts share a single database, which causes the system to freeze under heavy traffic.
> - The team proposes separating one part out so each has its own database. Work would span two quarters.
> - Engineering cost: roughly 2.5 person-quarters.
> - Risk during the change: one planned 4-hour outage to cut over.
> - Long-term payoff: eliminates a recurring incident pattern that caused ~12 hours of severe outage in the past year.
> - Open question: managed cloud database vs. continuing to run our own.
> - Open question: will this work delay the EU launch (currently Q4)?
> - The doc's recommendation is to start in Q3.
> - The doc does not cover how this affects the chargeback flow — worth flagging.

## Turn 6 — User
Better. Re-order: she'll skim the first three bullets, so put the recommendation, the cost, and the risk at the top. The history of why it's broken matters less.

## Turn 7 — Agent
Reordered:

> - **Recommendation in the doc:** start the work in Q3, finish over two quarters.
> - **Engineering cost:** roughly 2.5 person-quarters.
> - **Risk during the change:** one planned 4-hour outage to cut over.
> - **Long-term payoff:** eliminates a recurring incident pattern that caused ~12 hours of severe outage in the past year.
> - The payments system was built in 2018 and three of its parts are stitched together too tightly to scale safely.
> - Two of those parts share a single database, which causes the system to freeze under heavy traffic.
> - The proposal: separate one part out so each has its own database.
> - Open question: managed cloud database vs. continuing to run our own.
> - Open question: will this work delay the EU launch (currently Q4)?
> - The doc does not cover how this affects the chargeback flow — worth flagging.

## Turn 8 — User
The bold labels at the top look great but the rest reads inconsistently. Format as the same labeled style throughout — every bullet gets a short bold lead.

## Turn 9 — Agent
Final formatted version:

> - **Recommendation:** start in Q3, finish over two quarters.
> - **Cost:** roughly 2.5 person-quarters of engineering work.
> - **Risk during change:** one planned 4-hour outage to cut over.
> - **Long-term payoff:** eliminates an incident pattern that caused ~12 hours of severe outage in the past year.
> - **What's broken:** payments system from 2018, three core parts stitched together too tightly to scale safely.
> - **Specific failure mode:** two parts share one database, which freezes under heavy traffic.
> - **Proposed fix:** separate one part out so each part has its own database.
> - **Open question 1:** managed cloud database vs. continuing to run our own.
> - **Open question 2:** does this delay the Q4 EU launch?
> - **Gap to flag:** the doc does not cover how this affects the chargeback flow.

## Turn 10 — User
That's perfect. Sending to her now.
