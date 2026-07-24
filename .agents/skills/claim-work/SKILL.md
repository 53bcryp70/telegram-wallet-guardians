---
name: claim-work
description: Claim file paths in AGENT_CLAIMS.md before editing so Codex and Cursor do not conflict. Use when starting work, editing shared areas, or working in parallel with Cursor.
---

# Claim work

## Steps

1. Read `AGENT_CLAIMS.md` and `docs/coordination.md`.
2. Ensure no other agent has an `active` claim on the paths you need.
3. Append a row:

```markdown
| <ISO-UTC> | codex | <short task> | <paths or globs> | active |
```

4. Edit only claimed paths.
5. Set status to `done` (or `blocked` + reason) when finished.

## Rules

- Do not delete old rows; mark them `done`.
- Prefer Codex-owned areas: `src/`, `tests/`, CI, `.agents/skills/`.
