# Specific Skills for Codex

Codex project skills live in [`.agents/skills/`](.agents/skills/). Shared roles: [`roles.md`](roles.md).

## Overview

| Skill | Purpose | When to use |
|-------|---------|-------------|
| `claim-work` | Lock paths in `AGENT_CLAIMS.md` | Starting work / parallel with Cursor |
| `handoff` | Write `AGENT_HANDOFF.md` | Passing work to Cursor for UX/review |
| `implement-feature` | Build from spec/handoff | Bot, guardian, wallet feature work |
| `wallet-security-audit` | Security review | Signing, thresholds, transfers, custody |
| `run-tests` | Run/fix test suite | After implementation / before handoff |

## Invocation

In Codex, skills can be invoked with `$skill-name` (for example `$implement-feature`).

## Workflows

1. **Build from Cursor spec**: read handoff → `$claim-work` → `$implement-feature` → `$run-tests` → `$handoff`
2. **Security pass**: `$wallet-security-audit` on changed wallet/guardian paths
3. **Parallel work**: claim disjoint paths; do not touch Cursor `active` claims

## Handoff to Cursor

Use when product/UX decisions, `.cursor/` config, or merge review is needed.

## Quick Reference

Skills dir: `.agents/skills/` · Protocol: `docs/coordination.md` · Claims: `AGENT_CLAIMS.md`
