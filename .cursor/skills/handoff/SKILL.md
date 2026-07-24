---
name: handoff
description: Write a Cursor→Codex or Codex→Cursor handoff in AGENT_HANDOFF.md. Use when passing build work to Codex, returning review notes, or finishing a partial task.
---

# Handoff

## Steps

1. Mark your claim `done` or `blocked`.
2. Replace **Current handoff** in `AGENT_HANDOFF.md` (move prior current to **History** if useful, keep short).
3. Tell the user which agent is next; do not impersonate Codex.

## Template

```markdown
**From:** cursor
**To:** codex
**Updated:** <ISO-UTC>

### Goal
### Done so far
### Files touched
### Next steps (for receiving agent)
### Acceptance criteria
### Notes / risks
```

## Quality bar

- Acceptance criteria cite `AGENTS.md` sections (e.g. §8 items) and commands (`npm run verify`).
- List concrete paths, not “the app.”
- Call out secret/crypto risks explicitly.
- For review returns: paste Blockers from `scope-guard` / `review-for-merge`.
