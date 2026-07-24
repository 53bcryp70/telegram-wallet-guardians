# telegram-wallet-guardians

Telegram bot project for wallet guardianship (approvals, alerts, protected actions).

## Dual agents

This repo is set up for **Cursor** and **Codex** to work in parallel with clear roles:

| Agent | Focus |
|-------|--------|
| Cursor | Product, UX, architecture, IDE workflows |
| Codex | Implementation, wallet security, tests, CI |

Start here:

- [`AGENTS.md`](AGENTS.md) — always-on instructions for both agents
- [`roles.md`](roles.md) — ownership and boundaries
- [`docs/coordination.md`](docs/coordination.md) — claims + handoffs
- [`AGENT_CLAIMS.md`](AGENT_CLAIMS.md) — live path locks
- [`AGENT_HANDOFF.md`](AGENT_HANDOFF.md) — cross-agent handoff board

Skills:

- Cursor → [`.cursor/skills/`](.cursor/skills/) ([index](skills-for-cursor.md))
- Codex → [`.agents/skills/`](.agents/skills/) ([index](specific-skills-for-codex.md))

## Status

Scaffolding only: agent rules, skills, and coordination files. Application code comes next.
