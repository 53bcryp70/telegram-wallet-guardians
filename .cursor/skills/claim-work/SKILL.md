---
name: claim-work
description: Claim file paths in AGENT_CLAIMS.md before editing so Cursor and Codex do not conflict. Use when starting work, editing shared areas, or working in parallel with Codex.
---

# Claim work

## Steps

1. Read `AGENT_CLAIMS.md` and `docs/coordination.md`.
2. Ensure no other agent has an `active` claim on the paths you need.
3. Append a row:

```markdown
| <ISO-UTC> | cursor | <short task> | <paths or globs> | active |
```

4. Do the work only within claimed paths.
5. Set status to `done` (or `blocked` + reason) when finished.

## Rules

- Do not delete old rows; mark them `done`.
- If blocked by another claim, update `AGENT_HANDOFF.md` or ask the user.
