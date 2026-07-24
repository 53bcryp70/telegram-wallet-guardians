# Skills for Cursor

Cursor = **Guardian / Orchestrator**. Skills: [`.cursor/skills/`](.cursor/skills/). Roles: [`roles.md`](roles.md).

## Overview

| Skill | Purpose | When to use |
|-------|---------|-------------|
| `claim-work` | Lock paths in `AGENT_CLAIMS.md` | Starting work / parallel with Codex |
| `handoff` | Write `AGENT_HANDOFF.md` | Passing work to Codex or returning notes |
| `scope-guard` | Diff/plan vs `AGENTS.md` boundaries | Reviewing Codex output / new proposals |
| `review-for-merge` | Merge readiness | After verify / before merge |
| `check-codex-updates` | Fetch/summarize remote Codex commits | Waiting on Codex / before shared-doc edits |

## Workflows

1. **After Codex build**: `scope-guard` → `review-for-merge` → approve or `handoff` blockers back
2. **Parallel ops**: `claim-work` on `.cursor/**` / docs only while Codex owns `src/**`
3. **Awaiting Codex**: `check-codex-updates` on remote `guardians`

## Quick reference

Rules: `.cursor/rules/` · Protocol: `docs/coordination.md` · Claims: `AGENT_CLAIMS.md`  
Fixture allowlist: `AGENTS.md` §9 only (public entropy + vector 23).
