---
name: draft-bot-spec
description: Draft a Telegram bot feature spec for wallet guardians (flow, copy, confirmations, edge cases) under docs/specs/. Use when designing product/UX before Codex implements.
---

# Draft bot spec

## Steps

1. Claim `docs/specs/` via `claim-work`.
2. Create or update `docs/specs/<feature>.md` with:

```markdown
# <Feature>

## Problem
## User flow (Telegram)
## Messages / buttons
## Confirmations (dangerous actions)
## Data touched
## Out of scope
## Acceptance criteria
## Handoff notes for Codex
```

3. Keep copy concise; mark any signing/fund paths as Codex-owned implementation.
4. When ready for build, run the `handoff` skill to Codex.
