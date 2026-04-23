<!-- fixture-id: 14 -->
<!-- expected-kind: subagent -->
<!-- captured: 2026-04-16T16:18:00Z -->
<!-- source: synthetic — hand-written for pressure testing -->
<!-- turns: 10 -->

## Turn 1 — User
I have a draft blog post explaining our new pricing model. Before I publish, send the draft to three critic agents in parallel — each with a different lens — and aggregate their feedback. I want it pressure-tested from angles I wouldn't think of myself.

## Turn 2 — Agent
Dispatching three critic agents in parallel, each with a distinct lens, all reading the same draft.

Subagent A — pricing-skeptic critic: a hostile reader who suspects you're hiding a cost increase behind a "simplification" narrative. Will flag every place the post obscures the bottom-line number.

Subagent B — existing-customer critic: a current paying customer reading the post for "what does this mean for my bill on the next renewal?" Will flag every claim that's vague about backward compatibility.

Subagent C — tone-and-style critic: a copyeditor reading for clarity, jargon, and unnecessary marketing language. Will flag every passive sentence and every superlative.

All three subagents see the same draft and return at once.

## Turn 3 — Agent
**Subagent A (pricing-skeptic critic) — returned.**

> Three places where the post hides the bottom line:
> 1. "Most customers will see no change" — define "most." If 80% see no change and 20% pay more, this sentence is dishonest by omission.
> 2. The example calculation uses a customer at the Pro tier with 5 seats. The Pro tier's per-seat charge went from $12 to $14 in the new model — readers will compute this themselves.
> 3. The "transparent pricing" framing claims simplicity, but the new model has 3 dimensions where the old one had 2. That's not simpler.

## Turn 4 — Agent
**Subagent B (existing-customer critic) — returned.**

> Three things a current customer will ask that the draft doesn't answer:
> 1. When does my current contract roll into the new model — at renewal, immediately, never?
> 2. If my usage exceeds the new tier's included quota in month 1, am I auto-upgraded or charged per-unit?
> 3. The "grandfathering" promise on the legacy Starter tier — is that for the contract life or in perpetuity? The draft says "we'll honor your current pricing" without specifying for how long.

## Turn 5 — Agent
**Subagent C (tone-and-style critic) — returned.**

> Five flags:
> 1. "Industry-leading transparency" — superlative without evidence. Cut.
> 2. "We're excited to share..." — opens with marketing throat-clearing. Cut.
> 3. Three passive constructions in the second section ("pricing was redesigned," "feedback was gathered," "complexity was reduced"). Active voice would let you name who did what.
> 4. "Robust" appears four times. Pick another word three times.
> 5. The CTA "Reach out to your account manager" is buried in the last paragraph. If this is the action you want readers to take, it should also appear as a callout near the top.

## Turn 6 — Agent
**Aggregating across the three critic subagents:**

Themes that appeared in two or more critics:

> 1. **Hiding the bottom line** (A + B): the post is vague about who pays more and when. Both critics flagged the "most customers will see no change" sentence as evasive.
> 2. **Insufficient specifics on transition** (B alone but reinforces A's concern): three concrete questions a current customer will ask are unanswered.
> 3. **Marketing throat-clearing** (C alone): superlatives and passive voice make the post sound less honest, which compounds A's concern.

Top three changes I'd make to the draft before publishing:

> 1. Replace "most customers will see no change" with the actual percentage and a one-line explanation of who pays more.
> 2. Add a "what this means for current customers" section with the three transition questions answered explicitly.
> 3. Cut superlatives and at least the three passive constructions C flagged.

## Turn 7 — User
Useful. The pricing-skeptic was the right call — I wouldn't have written that lens for myself. Send the revised draft back to subagent A only and see if the new version passes.

## Turn 8 — Agent
Dispatching subagent A (pricing-skeptic critic) on the revised draft. Single agent this time — the other two had non-overlapping concerns.

## Turn 9 — Agent
**Subagent A (re-review) — returned.**

> Two of three earlier flags addressed:
> - "Most customers" replaced with "78% of customers see no change; 22% see a per-seat increase from $12 to $14." Resolved.
> - The dimension-count framing now reads "three pricing dimensions instead of two — more granular, not simpler." Resolved.
>
> One earlier flag still partly open:
> - The Pro-tier example still uses a 5-seat company, which now reads as cherry-picked given the per-seat increase is the change. Recommend showing both a 5-seat example and a 25-seat example so readers can see the impact at different scales.

## Turn 10 — User
Good. The parallel critic dispatch surfaced the framing issue, and the targeted re-dispatch caught the one remaining hole.
