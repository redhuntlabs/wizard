<!-- fixture-id: 05 -->
<!-- expected-kind: workflow -->
<!-- captured: 2026-04-15T18:11:00Z -->
<!-- source: synthetic — hand-written for pressure testing -->
<!-- turns: 14 -->

## Turn 1 — User
I want to understand the current state of small modular nuclear reactors in the US — regulatory status, deployed units, expected timeline. Walk me through your research approach before you start.

## Turn 2 — Agent
I'll work through this in four stages.

First, scope: I'll narrow the question to commercial small modular reactors (SMRs) under 300 MW and to the US specifically, since "small reactor" can otherwise sweep in research reactors and naval propulsion. Step 1 is just defining what we're counting.

Then, search: I'll pull the NRC's current SMR docket list, recent DOE funding announcements, and the two or three most-cited industry trackers. Step 2 is gathering primary sources.

Next, verify: I'll cross-check each claim from the trackers against the NRC docket, since trade press tends to be optimistic on timelines.

Finally, write: I'll synthesize into a short brief with citations.

If verify turns up gaps, I'll loop back to search before writing.

## Turn 3 — User
Sounds right. Start with stage 1 — define the scope. Show me what you're including and excluding.

## Turn 4 — Agent
**Step 1 — scope:**

Include:
- Commercial light-water SMRs under 300 MWe sited or proposed in the US.
- Non-light-water designs (molten salt, gas-cooled) under the same size threshold if they have an active NRC application.

Exclude:
- Microreactors under 20 MWe (different regulatory path, worth a separate brief).
- Research reactors at national labs.
- International deployments unless the US is the originating vendor.

Acceptable to you?

## Turn 5 — User
Approved. Move on.

## Turn 6 — Agent
**Step 2 — search:**

Sources I'm pulling from:
- NRC's current new-reactor docket (lists every active design certification and combined license).
- DOE Office of Nuclear Energy press releases from the last 18 months for funding signals.
- The IAEA ARIS database for design specifications.
- Two industry trackers — Nuclear Innovation Alliance's quarterly report and Third Way's "advanced reactor map."

Initial findings:
- NuScale's VOYGR has design certification (2023) but its first deployment customer (UAMPS) cancelled in late 2023.
- TerraPower's Natrium is in pre-application review with NRC, target operational date 2030.
- X-energy's Xe-100 is in pre-application review, partnering with Dow for a Texas deployment around 2030.
- Holtec SMR-300 filed for design certification in 2024.
- One additional name (Kairos Power's KP-FHR) appears in trackers but I'm not sure about its commercial readiness.

## Turn 7 — User
Good. Move to the verify stage.

## Turn 8 — Agent
**Step 3 — verify:**

Cross-checking each claim against the NRC docket directly:
- NuScale design certification — confirmed in NRC docket, certification rule effective Feb 2023. ✓
- UAMPS cancellation — confirmed in November 2023 joint statement, NRC docket reflects withdrawal of associated COL. ✓
- TerraPower Natrium — NRC docket shows construction permit application accepted for review March 2024, not just pre-application as I said. Correcting that.
- X-energy Xe-100 — pre-application status confirmed, but the Dow deployment date in the tracker says "early 2030s" not "around 2030." Tightening the language.
- Holtec SMR-300 — NRC docket shows the design certification application was submitted but not yet accepted for review as of latest update. Tracker overstated the status.
- Kairos KP-FHR — NRC docket confirms a construction permit was issued July 2024 for a demonstration reactor in Tennessee. So it's farther along than I had it.

Three of my six claims needed correction. I want to loop back to search for one more pass before writing.

## Turn 9 — User
Agreed. Go back to the search step for those three names.

## Turn 10 — Agent
**Step 2 (second pass)** — re-searching TerraPower, Holtec, and Kairos against the NRC docket and recent regulatory filings:

- TerraPower Natrium: construction permit application under review, target first operations 2030 per Wyoming PUC filings. Wyoming siting approval received April 2024.
- Holtec SMR-300: design certification application *received* in mid-2024; NRC has not yet docketed it for active review (the queue for acceptance is about 6 months). Two utilities (PSEG, Entergy) signed early-stage MOUs.
- Kairos KP-FHR: 35 MWe demonstration reactor under construction in Oak Ridge, TN; commercial deployment timeline depends on demo results, target 2030.

Now ready to move to the write stage.

## Turn 11 — User
Good. Write the brief.

## Turn 12 — Agent
**Step 4 — write:**

> **US Small Modular Reactors — current state (April 2026)**
>
> *Regulatory status*
> NuScale's VOYGR is the only SMR with NRC design certification (effective Feb 2023). TerraPower's Natrium has a construction permit application under active NRC review since March 2024. X-energy and Holtec are at earlier stages — pre-application and not-yet-docketed respectively. Kairos Power received a construction permit in July 2024 for a 35 MWe demonstration unit in Oak Ridge.
>
> *Deployed or under construction*
> One unit (Kairos demonstration) is under construction. Zero commercial SMRs are operating in the US.
>
> *Expected timeline*
> The earliest commercial operation date in any active filing is 2030 (TerraPower, X-energy/Dow). Industry trackers' more optimistic dates do not match the NRC dockets.
>
> *Caveats*
> NuScale's VOYGR has design certification but no active customer following the UAMPS cancellation. Designs with certification are not the same as designs with deployment paths.
>
> [Sources: NRC new-reactor docket; IAEA ARIS; Wyoming PUC docket 20000-625-EA-24; DOE press releases.]

## Turn 13 — User
That's exactly what I needed. The verify step caught three errors — I'll trust this output.

## Turn 14 — Agent
Yes, the loop-back from verify to search was worth the extra turn. Without it the brief would have repeated the trackers' overstated readiness on Holtec and missed the Kairos construction permit.
