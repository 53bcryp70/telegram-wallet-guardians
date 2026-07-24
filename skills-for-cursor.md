# Skills for Cursor

Cursor-specific skills live in [`.cursor/skills/`](.cursor/skills/). Shared roles: [`roles.md`](roles.md).

## Overview

| Skill | Purpose | When to use |
|-------|---------|-------------|
| `claim-work` | Lock paths in `AGENT_CLAIMS.md` | Starting work / parallel with Codex |
| `handoff` | Write `AGENT_HANDOFF.md` | Passing work to Codex (or receiving context) |
| `draft-bot-spec` | Spec Telegram UX/flows | Designing features before implementation |
| `review-for-merge` | Merge readiness review | After Codex handoff / before merge |

## Cursor skills

### claim-work

Claim paths before editing so Codex does not collide.

### handoff

Package goal, files, and acceptance criteria for the other agent.

### draft-bot-spec

Write `docs/specs/<feature>.md` with flow, copy, confirmations, and Codex handoff notes.

### review-for-merge

Checklist review: secrets, roles, claims, confirmations, tests.

## Workflows

1. **Design → build**: `draft-bot-spec` → `handoff` → Codex `$implement-feature` → `review-for-merge`
2. **Parallel work**: both agents `claim-work` on disjoint paths

## Handoff to Codex

Use when implementation, tests, CI, or wallet security work is needed. Prefer `$implement-feature` / `$wallet-security-audit` on the Codex side.

## Quick Reference

Rules: `.cursor/rules/` · Protocol: `docs/coordination.md` · Claims: `AGENT_CLAIMS.md`
