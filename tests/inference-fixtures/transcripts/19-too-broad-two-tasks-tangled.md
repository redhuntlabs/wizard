<!-- fixture-id: 19 -->
<!-- expected-kind: none -->
<!-- captured: 2026-04-16T20:10:00Z -->
<!-- source: synthetic — hand-written for pressure testing -->
<!-- turns: 10 -->

## Turn 1 — User
Two things this session, interleaved as I think of them. First, research the recent EU AI Act timelines for general-purpose AI obligations. Second, I need to draft an email to our compliance officer summarizing what you find. Hop between them as you make progress.

## Turn 2 — Agent
I'll work the research in stages — first scope (which obligations, which dates), then search (the official EU sources), then verify against the published Regulation text. While that runs I'll start the email draft so we can iterate on tone in parallel.

Stage 1 — scope: focusing on general-purpose AI model provider obligations under the EU AI Act, specifically the dates that providers must register, document, and disclose training data. Step 1 is bounding the question to GPAI, not to high-risk systems.

## Turn 3 — User
Good. While you do step 2, draft the opening of the email — recipient is Anika our compliance officer, audience is non-lawyer, tone should be matter-of-fact.

## Turn 4 — Agent
Email draft, opening:

> Subject line: EU AI Act — GPAI provider obligations and timelines
>
> Hi Anika,
>
> Sharing a quick summary of what I found on the EU AI Act's obligations for general-purpose AI model providers. Format as one-paragraph context, then a bullet list of dates. Happy to revise if you want a different shape.

That's the opening. Continuing the research stage in parallel.

## Turn 5 — Agent
Step 2 — search. The EU AI Act (Regulation 2024/1689) entered into force on 1 August 2024. The general-purpose AI model provider obligations apply from 2 August 2025 (12 months after entry into force) per Article 113.

Stage 3 — verify against the published Regulation text: confirmed in the Official Journal version. The 2 August 2025 date is correct for GPAI provider obligations; the high-risk system obligations have a different (longer) timeline.

## Turn 6 — User
Good. Drop those into the email. Revise the bullet section to lead with the 2 August 2025 date since that's the one Anika cares about.

## Turn 7 — Agent
Revised email body:

> Hi Anika,
>
> Sharing a quick summary of what I found on the EU AI Act's obligations for general-purpose AI model providers.
>
> - **2 August 2025** — GPAI provider obligations begin (Article 113 of Regulation 2024/1689). Providers must publish a summary of training content, comply with EU copyright law, and maintain technical documentation.
> - **2 August 2026** — most other AI Act obligations (high-risk systems, conformity assessments) begin.
> - **2 August 2027** — full applicability including AI systems already on the market before entry into force.
>
> Let me know if you want a different shape — happy to rewrite as a memo if a bullet list is too dense.
>
> Thanks,
> Mira

## Turn 8 — User
Good. Now go back to the research — what about the GPAI models with "systemic risk"? Those have additional obligations, right?

## Turn 9 — Agent
Going back to the search step on the systemic-risk subset.

Step 2 (revisited): GPAI models with systemic risk are defined in Article 51 — currently those above 10^25 FLOPS in training compute. Additional obligations under Article 55: model evaluation, adversarial testing, serious incident reporting, cybersecurity protections.

Then step 3 (revisited) — verified against Article 51 and Article 55 of the Regulation. Same effective date (2 August 2025) per Article 113.

## Turn 10 — User
Append a second bullet group to the email under a "Systemic-risk GPAI models — additional" header. Same tone, same format as the first list.

## Turn 11 — Agent
Final email:

> Subject line: EU AI Act — GPAI provider obligations and timelines
>
> Hi Anika,
>
> Sharing a quick summary of what I found on the EU AI Act's obligations for general-purpose AI model providers.
>
> **All GPAI providers — effective 2 August 2025**
> - Publish a summary of training content (Article 113 of Regulation 2024/1689).
> - Comply with EU copyright law.
> - Maintain technical documentation.
>
> **Systemic-risk GPAI models — additional, also effective 2 August 2025**
> - Model evaluation and adversarial testing (Article 55).
> - Serious-incident reporting.
> - Cybersecurity protections appropriate to the risk level.
>
> Most other AI Act obligations (high-risk systems, conformity assessments) begin 2 August 2026; full applicability 2 August 2027.
>
> Let me know if you want a different shape.
>
> Thanks,
> Mira
