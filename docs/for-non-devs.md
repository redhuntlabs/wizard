# Wizard for Non-Developers

You don't need to know how to code. You need a working AI assistant (Claude Code, Cursor, ChatGPT/Codex CLI, Gemini CLI, OpenCode, or GitHub Copilot CLI) and 5 minutes.

## What is a "spell"?

A spell is a small, reusable skill that your AI assistant follows whenever the task fits. Think of it as a recipe card the AI checks before cooking. Examples:

- "Write me an email" — the AI follows your `writing-an-email` spell
- "Plan our trip to Lisbon" — the AI follows `planning-a-trip`
- "Help me prep for the 3pm meeting" — the AI follows `preparing-for-a-meeting`

You can use the bundled spells as-is, build your own (with the AI interviewing you), or share with friends and colleagues.

## 5-minute setup

Pick the AI tool you already use. Each install is 1-2 commands. See [the README](../README.md#install) for tool-by-tool instructions.

After install, the next time you start your AI tool, it will load Wizard automatically.

## Try it: use a bundled spell

Type:

> Use the writing-an-email spell to draft a reply to my landlord saying I'll be 3 days late on rent because of a paycheck delay.

The AI will follow the [writing-an-email](../spells/everyday/writing-an-email/SKILL.md) recipe — short, one ask, no padding. You'll get a draft you can send.

Other bundled spells to try:

- [summarizing-a-document](../spells/everyday/summarizing-a-document/SKILL.md) — paste a long article, get a one-page summary with quotes
- [planning-a-trip](../spells/everyday/planning-a-trip/SKILL.md)
- [troubleshooting-whats-not-working](../spells/everyday/troubleshooting-whats-not-working/SKILL.md) — for printers, apps, anything broken
- [preparing-for-a-meeting](../spells/work/preparing-for-a-meeting/SKILL.md)
- [making-a-decision](../spells/thinking/making-a-decision/SKILL.md)
- [learning-something-new](../spells/thinking/learning-something-new/SKILL.md)

Browse all of them with the slash command `/list-spells`.

## Build your own spell (the meta-builder)

You have a recurring task — say, your weekly status update to your manager. Each Friday you stare at a blank doc.

Type:

> /build-spell

The AI will interview you for 5-15 minutes (it picks a depth based on how much context you give it). It will:

1. Ask what the recurring task is and who it's for
2. Show you a draft "recipe" early (a strawman) so you can react
3. Test the recipe on your actual situation
4. Save the recipe to your personal library if it passes the test

Your new spell lives in `~/.wizard/` (your personal library). Next time you say "write my Friday update," the AI follows your own recipe.

## What kinds of things can you build?

Anything you do more than twice and want done the same way each time. Examples:

- "How I write my Sunday newsletter"
- "How I prep for therapy sessions"
- "How I research a place before traveling"
- "How I review a chapter of my novel"
- "How I make decisions about which clients to take"
- "How I read a scientific paper"
- "How I plan a workout block"
- "My discipline of always saying no to scope creep"

## What's already there for first-time tasks?

The bundled library covers ~26 common tasks. For first-time tasks where there's no recipe yet, the AI uses its general intelligence — but it's much better when it has a recipe to follow.

If you find yourself doing a task often, build a spell for it. The AI itself can prompt you: "I notice we've done this 3 times — want to /build-spell for it?"

## Where to go next

- Browse [the bundled library](../spells/) to see what shipping spells look like
- Read the [philosophy](philosophy.md) for why this works (the 1% rule, behavioral engineering)
- See [sharing-spells.md](sharing-spells.md) to share your recipes with others
- See [the format spec](spell-format-spec.md) if you want to hand-write a spell without the interview
