# Telegram Wallet Guardians — Agent Instructions

Both **Cursor** and **Codex** work in this repo. Read this file first, then [`roles.md`](roles.md).

## Who does what

| Agent | Role | Owns |
|-------|------|------|
| **Cursor** | Product + UX + IDE orchestration | Specs, Telegram UX flows, `.cursor/`, architecture decisions, review polish |
| **Codex** | Implementation + security + tests | Bot logic, wallet/guardian code, CI, security-sensitive paths, automated tests |

Full boundaries: [`roles.md`](roles.md). Concurrent-work protocol: [`docs/coordination.md`](docs/coordination.md).

## Before you change code

1. Read [`AGENT_CLAIMS.md`](AGENT_CLAIMS.md).
2. Claim the paths you will edit (add a row, status `active`).
3. Do not edit paths another agent has claimed unless the claim is `done` or the user overrides.
4. When finished: mark claim `done`, update [`AGENT_HANDOFF.md`](AGENT_HANDOFF.md) if the other agent must continue.

## Shared conventions

- Prefer small, reviewable diffs. One concern per change.
- Never commit secrets (`.env`, private keys, bot tokens, seed phrases).
- Wallet / signing / key-handling code is **Codex-owned** by default; Cursor may propose designs but Codex implements and audits.
- Do not rewrite the other agent's in-progress claim. Prefer handoff notes.
- Keep skills and rules updated when workflows change.

## Skill indexes

- Cursor: [`skills-for-cursor.md`](skills-for-cursor.md) → `.cursor/skills/`
- Codex: [`specific-skills-for-codex.md`](specific-skills-for-codex.md) → `.agents/skills/`

## Default when the user does not specify an agent

- Product, UX, docs, Cursor config, architecture → **Cursor**
- Feature implementation, tests, security, CI, long autonomous runs → **Codex**
- Ambiguous → Cursor drafts the plan; Codex implements after claim
