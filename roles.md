# Roles: Cursor & Codex

How **Cursor** and **Codex** work together on **telegram-wallet-guardians**.

---

## Overview

| Agent | Primary environment | Main strength |
|-------|---------------------|---------------|
| **Cursor** | Cursor IDE / Composer | Product judgment, UX, architecture, IDE-native edits, human-in-the-loop review |
| **Codex** | Codex CLI / autonomous agent | Deep implementation, tests, wallet security paths, long unattended runs |

---

## Cursor — Role & Responsibilities

### Cursor owns

- Product specs, user flows, and Telegram bot UX (menus, copy, conversation design)
- Architecture decisions and ADRs under `docs/`
- Everything under `.cursor/` (rules, skills, hooks)
- Shared agent docs: `AGENTS.md`, `roles.md`, coordination docs (unless Codex is explicitly asked)
- Frontend / admin surfaces if added later
- Review polish and merge readiness from the IDE

### Cursor should defer to Codex when

- Implementing bot handlers, services, or wallet/guardian logic
- Writing or expanding automated tests and CI
- Security review of signing, keys, approvals, or fund-moving paths
- Long multi-file implementation the user wants run autonomously

### Cursor must not

- Edit paths claimed `active` by Codex in `AGENT_CLAIMS.md`
- Implement production wallet signing / key custody without handing off to Codex
- Delete or hollow out Codex skills under `.agents/skills/` without coordination

---

## Codex — Role & Responsibilities

### Codex owns

- Bot runtime code (handlers, middleware, jobs, storage adapters)
- Wallet guardian logic (approvals, thresholds, alerts, custody integrations)
- Tests, fixtures, and CI pipelines
- Security-sensitive modules and threat-model updates
- Everything under `.agents/skills/` (Codex project skills)

### Codex should defer to Cursor when

- Changing product/UX copy or conversation design
- Editing `.cursor/rules` or `.cursor/skills`
- Making architecture calls that change ownership boundaries
- Needing IDE/browser visual verification of a UI

### Codex must not

- Edit paths claimed `active` by Cursor in `AGENT_CLAIMS.md`
- Commit secrets or leave tokens/keys in the tree
- Rewrite Cursor-owned product specs without a handoff note

---

## Coordination Rules

### 1. Single source of truth

| Concern | Canonical file |
|---------|----------------|
| Roles | `roles.md` |
| Always-on agent instructions | `AGENTS.md` |
| Live path claims | `AGENT_CLAIMS.md` |
| Cross-agent handoffs | `AGENT_HANDOFF.md` |
| Detailed protocol | `docs/coordination.md` |
| Cursor skills index | `skills-for-cursor.md` |
| Codex skills index | `specific-skills-for-codex.md` |

### 2. Handoffs

Use `AGENT_HANDOFF.md`: goal, done so far, files touched, next agent, acceptance criteria. Claim the next agent's paths only after they accept (or the user assigns them).

### 3. Conflict avoidance

- Claim before edit.
- Prefer disjoint directories (Cursor: specs/docs/`.cursor`; Codex: `src/`, `tests/`, CI).
- If both must touch the same file, serialize via claims or let the user pick an owner.

### 4. Default when unclear

Cursor plans → Codex implements → Cursor reviews (unless the user names one agent).

---

## Project Conventions (both agents)

- Secrets never in git; use `.env.example` for names only
- Prefer explicit errors over silent catches on wallet/Telegram money paths
- Document any change to guardian thresholds, signing flows, or approval rules in the PR/handoff
- Keep skills concise; link to `docs/` for long reference material

---

## Quick Reference

| Need | Agent |
|------|-------|
| Spec / UX / architecture | Cursor |
| Implement bot or wallet feature | Codex |
| Tests / CI / security audit | Codex |
| Cursor rules or IDE workflows | Cursor |
| Parallel work | Claim paths → work → handoff |
