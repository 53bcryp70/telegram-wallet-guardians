# Specific Skills for Codex

Codex = **Builder**. Skills: [`.agents/skills/`](.agents/skills/). Roles: [`roles.md`](roles.md). Law: [`AGENTS.md`](AGENTS.md).

## Overview

| Skill | Purpose | When to use |
|-------|---------|-------------|
| `claim-work` | Lock paths | Starting a lane |
| `handoff` | Write `AGENT_HANDOFF.md` | Checkpoint/verify done → Cursor review |
| `implement-feature` | Build per `AGENTS.md` | Vendor, crypto, UI, tests |
| `crypto-checkpoint` | Section 8 proofs | Before UI polish / after SLIP-39 work |
| `seed-share-audit` | Scope + secret audit | Before merge / after large `src/` changes |
| `run-tests` | `npm run verify` | After implementation |

## Invocation

Use `$skill-name` (example: `$crypto-checkpoint`).

## Workflows

1. `$claim-work` → `$implement-feature` (vendor + bip39 + slip39) → `$crypto-checkpoint`
2. UI + tests → `$run-tests` → `$seed-share-audit` → `$handoff`

## Fixture note

§9 public vector + fixed test entropy are required and allowed. Do not use funded/user seeds.

## Quick reference

Protocol: `docs/coordination.md` · Claims: `AGENT_CLAIMS.md` · Read `AGENT_HANDOFF.md` for Cursor’s adopted/rejected review notes.
