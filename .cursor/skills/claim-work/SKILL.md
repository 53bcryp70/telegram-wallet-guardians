---
name: claim-work
description: Claim file paths in AGENT_CLAIMS.md before editing so Cursor and Codex do not conflict. Use when starting work, editing shared areas, or working in parallel with Codex.
---

# Claim work

## Steps

1. Read `AGENT_CLAIMS.md`, `roles.md`, and `docs/coordination.md`.
2. Skip if another agent holds an overlapping `active` claim (ask user or wait).
3. Append a row:

```markdown
| <ISO-UTC> | cursor | <short task> | <paths or globs> | active |
```

4. Edit only those paths.
5. Set `done` or `blocked` (+ reason) when finished. Never delete history rows.

## Lane hints (Cursor)

| Prefer claiming | Avoid unless user assigns |
|-----------------|---------------------------|
| `.cursor/**`, `roles.md`, skill indexes | `src/bip39.ts`, `src/slip39.ts` |
| `AGENT_*.md`, `docs/coordination.md` | `public/vendor/**` |
| Review notes / handoff text | Whole `src/**` while Codex is active |

Keep claims tight (hours, not days). Mark stale if abandoned.
