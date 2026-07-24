# Agent coordination

Protocol for **Cursor** and **Codex** on **Local Seed Shares**. Roles: [`roles.md`](../roles.md). Product law: [`AGENTS.md`](../AGENTS.md).

## Claim before edit

1. Open [`AGENT_CLAIMS.md`](../AGENT_CLAIMS.md).
2. Add a row: agent, task summary, paths/globs, `active`, timestamp (UTC).
3. Edit only your claimed paths.
4. Set status to `done` when finished (or `blocked` with a reason).

### Claim row format

```markdown
| 2026-07-24T21:00Z | codex | Section 8 crypto checkpoint | src/bip39.ts, src/slip39.ts, public/vendor/**, e2e/** | active |
```

## Handoff

1. Update [`AGENT_HANDOFF.md`](../AGENT_HANDOFF.md) (replace **Current handoff**).
2. Mark your claim `done`.
3. Do not start the other agent's lane unless the user reassigns you.

## Ownership map

| Area | Default owner |
|------|----------------|
| `AGENTS.md` (product/crypto brief) | Shared read; **brief-lock** — edits only with explicit user approval |
| `roles.md`, `docs/coordination.md`, skill indexes | Cursor |
| `.cursor/**` | Cursor |
| `.agents/**` | Codex |
| `src/**`, `index.html`, `public/**` | Codex |
| `tests/**`, `e2e/**`, package/toolchain configs | Codex |
| `VENDOR_NOTES.md`, verify report | Codex |
| `TELEGRAM_SETUP.md` | Codex drafts; human executes |
| `AGENT_CLAIMS.md`, `AGENT_HANDOFF.md` | Shared (acting agent) |

## Conflict resolution

1. Stale `active` claim (>24h, no commits) → ask user, or mark `stale` and reclaim.
2. Same-file need → user picks owner, or serialize claims.
3. Accidental overlap → stop, restore if needed, re-claim.

## Skills

- Cursor: `.cursor/skills/` → [`skills-for-cursor.md`](../skills-for-cursor.md)
- Codex: `.agents/skills/` → [`specific-skills-for-codex.md`](../specific-skills-for-codex.md)
