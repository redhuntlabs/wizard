# Skills Primitives

The universal behavioral-engineering alphabet for spell authors. These primitives appear in framework skills, builder skills, and seed spells. Use them when you want a spell to actually shape behavior, not just suggest it.

These work for ANY domain. The same primitives that enforce TDD on a developer enforce "verify before citing" on a researcher.

## 1. The Non-Negotiable Rule

A single sentence stating the rule. No hedging. No "should" or "try to."

| Bad | Good |
|---|---|
| Try to verify your sources when possible. | Every citation must be verified against the original source before output. |
| You should write a test first. | No production code without a failing test that demonstrates the need for it. |
| Consider getting a second opinion. | No decision is final without considering at least one alternative. |

If you can't write the rule as one declarative sentence, the rule isn't sharp enough yet. Refine.

## 2. Excuses and Counters Tables

People (and AIs) rationalize their way out of rules. List the rationalizations explicitly so the agent recognizes them when they happen.

```markdown
| If you think... | Reality |
|---|---|
| "It's a small change, I don't need a test" | The bug you'll write is also small. Test first. |
| "I already verified this mentally" | Mental verification is unreliable. Run the test. |
| "The user is in a hurry" | The user is more in a hurry to not ship a bug. |
```

The phrasing matters. Quote the rationalization verbatim — the exact words the agent (or user) will think when about to skip the rule. The counter must be sharp enough to actually stop the action.

## 3. Warning Signs

Bullet list of signals that the rule is about to be broken. These are detectable patterns in the agent's own reasoning.

```markdown
## Warning signs

- About to type code without first opening the test file
- About to claim "done" without running verification commands
- About to cite a fact without naming the source you'd quote
- Reasoning includes the words "obviously," "trivially," or "just"
```

When the agent notices a warning sign in its own output, it stops and re-checks the rule.

## 4. Hard Gates (MUST-STOP markers)

Concrete checkpoints where the agent must stop and verify the rule held. Use the marker `<MUST-STOP>` in the body so the host treats it as a hard barrier.

```markdown
<MUST-STOP>
Before writing any production code, this file must contain a failing test
that demonstrates the bug you intend to fix or the feature you intend to add.

If no test exists, STOP. Write the test first.
</MUST-STOP>
```

Hard gates work because the agent's own attention to the marker creates pressure to comply.

## 5. Escalation Language

When a rule is being pushed against, use language that names the pushback explicitly.

| Soft (won't hold under pressure) | Hard (holds) |
|---|---|
| "It's better to verify first." | "Stop. The rule says verify first. Do that now." |
| "We should run the test." | "No code without a failing test. Period." |
| "Maybe consider an alternative." | "Naming an alternative is required. Name one." |

Soft language gets rationalized away. Hard language doesn't.

## 6. Subagent Stop

If a spell might be invoked by a subagent that was dispatched for a specific narrow task, the spell should let the subagent skip it. Use:

```markdown
<SUBAGENT-STOP>
If you were dispatched as a subagent to execute a specific task, skip this skill
and complete your assigned task. The parent agent already invoked the relevant
discipline.
</SUBAGENT-STOP>
```

This prevents recursive interview loops when a subagent encounters a builder skill.

## 7. The 1% Rule

Embedded in the boot skill. The agent must invoke a spell whenever there's even a 1% chance one applies — not when it's certain. This is non-negotiable forcing language, not a suggestion.

If you write a spell whose `description` field could plausibly match a situation, you're trusting the 1% rule to fire it. Make `description` accurate.

## 8. Iron Law (in builder skills)

The Iron Law of building spells: no spell is saved until try-it returns PASS. Forbidden excuses for skipping try-it (list verbatim in your builder skill):

- "It's obviously fine"
- "Too simple to test"
- "I'll test it later"
- "I already manually checked"
- "I'll fix it next time"

All get the same response: "Run try-it. No exceptions."

## 9. Batch Iron Law (in builder skills)

When the user requests multiple spells in one session: complete ONE end-to-end (interview → kind-route → try-it → save) before starting the next. Forbidden excuses:

- "I'll batch the interviews and test them all at the end"
- "They share context so I can save tokens"
- "Let me draft all three first, then iterate"

All get the same response: "Finish this one through save. Then start the next."

## 10. Plain-Language Translation

When porting a dev-coded primitive to a non-dev domain, swap the metaphor. Examples:

| Original | Plain language |
|---|---|
| "RED phase" | "Run it and watch it fail" |
| "GREEN phase" | "Make it work, even crudely" |
| "REFACTOR phase" | "Clean it up without changing behavior" |
| "TDD" | "Write the check before you write the thing" |
| "git worktree" | "Make a copy you can mess with safely" |
| "subagent" | "Dispatch a helper to do one piece in parallel" |
| "race condition" | "Two things stepping on each other" |

The validator's jargon list catches dev terms in non-dev spells.

## How to use this doc

When writing or refining a spell:

1. **Discipline kind?** You need primitives 1, 2, 3, 4. Optionally 5.
2. **Workflow kind?** You need explicit stages and checkpoints. Use primitive 4 at stage gates.
3. **Subagent kind?** You need primitive 6 at the top.
4. **All builder skills?** You need primitives 8 and 9.
5. **All boot skills?** You need primitive 7.
6. **All non-dev spells?** Apply primitive 10 throughout.

The framework's own builder skills auto-include the right primitives based on `kind`. You don't have to remember; the meta-builder bakes them in.
