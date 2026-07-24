---
name: handoff
description: Write a Codex→Cursor handoff in AGENT_HANDOFF.md. Use when checkpoint evidence is ready, verify finished, or Cursor must review/scope-guard.
---

# Handoff

## Steps

1. Mark claim `done` or `blocked`.
2. Replace **Current handoff** in `AGENT_HANDOFF.md`.
3. Stop; do not continue as Cursor.

## Stuck? Ask Cursor for help

If you have been stuck on the same technical problem for ~2 sessions / ~30 min (build errors, vendor loading, test flakiness — anything that is not an `AGENTS.md` hard stop), do not keep spinning:

1. Put a `### HELP REQUESTED` section at the top of **Current handoff**: exact problem, what you tried, error output, smallest unblocking question.
2. Mark that claim `blocked`; keep other lanes going if possible.
3. Push. Cursor's review loop (every 15 min) answers help requests first, with a concrete fix or an explicit claim takeover.

Hard stops (vendor SHA mismatch, §8 FAIL, brief-lock, secrets) are still hard stops — report them, don't work around them.

## Include

- Goal + stage completed (vendor / §8 / UI / verify)
- Files touched
- Commands run + PASS/FAIL (use §11 lines when possible)
- Vendor SHA-256 if crypto touched
- Exact next steps for Cursor (`scope-guard`, `review-for-merge`)
- Blockers in plain language

## Template

```markdown
**From:** codex
**To:** cursor
**Updated:** <ISO-UTC>

### Goal
### Done so far
### Files touched
### Next steps (for receiving agent)
### Acceptance criteria
### Notes / risks
```
