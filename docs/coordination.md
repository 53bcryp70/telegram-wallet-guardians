# Agent coordination

Protocol for **Cursor** and **Codex** working in this repo at the same time.

## Claim before edit

1. Open [`AGENT_CLAIMS.md`](../AGENT_CLAIMS.md).
2. Add a row: agent, task summary, paths/globs, `active`, timestamp (UTC).
3. Edit only your claimed paths.
4. Set status to `done` when finished (or `blocked` with a reason).

### Claim row format

```markdown
| 2026-07-24T20:00Z | cursor | Draft guardian alert UX | docs/specs/alerts.md | active |
```

## Handoff

When the other agent must continue:

1. Update [`AGENT_HANDOFF.md`](../AGENT_HANDOFF.md) (replace the "Current handoff" section).
2. Mark your claim `done`.
3. Do not start the other agent's work unless the user asks you to switch roles.

## Suggested ownership map

| Area | Default owner |
|------|----------------|
| `AGENTS.md`, `roles.md`, `docs/` (product) | Cursor |
| `.cursor/` | Cursor |
| `.agents/` | Codex |
| `src/bot/`, `src/wallet/`, `src/guardians/` | Codex |
| `tests/`, `.github/workflows/` | Codex |
| `AGENT_CLAIMS.md`, `AGENT_HANDOFF.md` | Shared (whoever is acting) |

Adjust the map in PRs when the tree grows; keep this table accurate.

## Conflict resolution

1. Stale `active` claim (>24h, no commits) → ask user, or mark `stale` and reclaim.
2. Same-file need → user picks owner, or serialize (finish claim A, then claim B).
3. Accidental overlap → stop, restore via git if needed, re-claim cleanly.

## Skills

- Cursor loads project skills from `.cursor/skills/` (see `skills-for-cursor.md`).
- Codex loads project skills from `.agents/skills/` (see `specific-skills-for-codex.md`).
- Shared behavior (claim/handoff) exists in both skill trees with matching names.
