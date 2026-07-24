# Roles: Cursor & Codex

How **Cursor** and **Codex** work together on **Local Seed Shares** (`telegram-wallet-guardians`).

Product/crypto rules in [`AGENTS.md`](AGENTS.md) win over this file if they conflict.

---

## Overview

| Agent | Primary environment | Main strength |
|-------|---------------------|---------------|
| **Cursor** | Cursor IDE / Composer | IDE orchestration, review polish, Cursor rules/skills |
| **Codex** | Codex CLI / autonomous agent | Implementation, BIP-39/SLIP-39 paths, Vitest/Playwright, `npm run verify` |

---

## Cursor — Role & Responsibilities

### Cursor owns

- Everything under `.cursor/` (rules, skills, hooks)
- Dual-agent docs: `roles.md`, claim/handoff boards (shared writes OK)
- Review polish and merge readiness from the IDE
- Non-crypto copy tweaks that stay within `AGENTS.md` wording constraints

### Cursor should defer to Codex when

- Implementing `src/`, vendor pin, tests, Vite/Playwright config
- Running or fixing `npm run verify`
- Any BIP-39 / SLIP-39 / entropy / share logic
- Long autonomous implementation toward the section 8 checkpoint

### Cursor must not

- Edit paths claimed `active` by Codex in `AGENT_CLAIMS.md`
- Expand product scope beyond `AGENTS.md`
- Commit real wallet phrases, tokens, or secrets

---

## Codex — Role & Responsibilities

### Codex owns

- App implementation (`src/`, `index.html`, `public/vendor/`, tests, e2e)
- Toolchain files (`package.json`, lockfile, Vite/TS/Playwright configs)
- Security-sensitive crypto adapters and verification gates
- Everything under `.agents/skills/`

### Codex should defer to Cursor when

- Editing `.cursor/rules` or `.cursor/skills`
- Needing IDE/browser visual review after UI exists
- Dual-agent process changes the user assigns to Cursor

### Codex must not

- Edit paths claimed `active` by Cursor in `AGENT_CLAIMS.md`
- Commit secrets or real mnemonics
- Violate `AGENTS.md` scope (backends, Telegram bridge, storage, network, etc.)

---

## Coordination Rules

### 1. Single source of truth

| Concern | Canonical file |
|---------|----------------|
| Product + crypto brief | `AGENTS.md` |
| Agent roles | `roles.md` |
| Live path claims | `AGENT_CLAIMS.md` |
| Cross-agent handoffs | `AGENT_HANDOFF.md` |
| Protocol detail | `docs/coordination.md` |

### 2. Handoffs

Use `AGENT_HANDOFF.md`: goal, done so far, files touched, next agent, acceptance criteria.

### 3. Conflict avoidance

Claim before edit. Prefer: Cursor → `.cursor/` + review; Codex → `src/`, tests, vendor, CI scripts.

### 4. Default when unclear

Codex implements against `AGENTS.md`; Cursor reviews and coordinates.

---

## Quick Reference

| Need | Agent |
|------|-------|
| Implement Mini App / crypto / tests | Codex |
| Cursor rules or IDE workflows | Cursor |
| Parallel work | Claim paths → work → handoff |
| Scope questions | `AGENTS.md` wins |
