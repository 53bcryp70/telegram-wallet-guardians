---
name: implement-feature
description: Implement a Telegram wallet-guardian feature from a Cursor spec or handoff. Use when building bot handlers, guardian logic, storage adapters, or wiring product specs into code.
---

# Implement feature

## Steps

1. Read `AGENT_HANDOFF.md` and any linked `docs/specs/*.md`.
2. Run `$claim-work` for the paths you will touch (`src/`, `tests/`, etc.).
3. Implement the smallest vertical slice that meets acceptance criteria.
4. Add or update tests for happy path + one failure/confirmation path.
5. Do not put secrets in code or fixtures.
6. When done: mark claim `done`, update handoff for Cursor review (`$handoff`).

## Defaults

- Dangerous actions need an explicit confirmation step in the bot flow.
- Prefer clear module boundaries: telegram I/O vs domain guardian logic vs wallet adapters.
- If the spec is ambiguous on UX copy, implement a stub string and hand off to Cursor.
