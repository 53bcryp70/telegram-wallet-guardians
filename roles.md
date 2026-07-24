# Roles: Cursor & Codex

Proposed operating model for **Local Seed Shares** (`telegram-wallet-guardians`).

**Authority:** [`AGENTS.md`](AGENTS.md) wins on product, crypto, scope, tests, and release rules. This file only defines *who does what*.

---

## Proposed roles (summary)

| Agent | Codename | Job on this project |
|-------|----------|---------------------|
| **Codex** | **Builder** | Implement the Mini App exactly per `AGENTS.md`, pin vendor SLIP-39, pass section 8 checkpoint, drive `npm run verify` |
| **Cursor** | **Guardian / Orchestrator** | Keep agents from colliding, enforce scope, review diffs against `AGENTS.md`, polish IDE workflows, do human-in-the-loop checks |

Default bias for a 12-hour hackathon: **Codex builds; Cursor guards and reviews.** Parallelize only on disjoint paths.

---

## Overview

| Agent | Environment | Strength here |
|-------|-------------|---------------|
| **Cursor** | Cursor IDE | Fast review, claim/handoff hygiene, `.cursor/` config, spotting scope creep |
| **Codex** | Codex CLI | Long autonomous implementation, crypto adapters, Vitest + Playwright |

---

## Codex — Builder

### Owns

- `src/**`, `index.html`, `public/vendor/**`, `public/licenses/**`
- `tests/**`, `e2e/**`
- `package.json`, `package-lock.json`, `tsconfig.json`, `vite.config.ts`, `playwright.config.ts`
- `VENDOR_NOTES.md` (hashes/SHA-256), keeping `THIRD_PARTY_NOTICES.md` / `TELEGRAM_SETUP.md` accurate
- `.agents/skills/**`
- Section 8 cryptographic checkpoint and final `npm run verify` report

### Defers to Cursor when

- Changing dual-agent process (`.cursor/`, `roles.md` process sections)
- User asks for IDE/browser visual review after UI exists
- Scope fight: Cursor cites `AGENTS.md`; user decides

### Must not

- Touch Cursor `active` claims
- Add backends, bots, Telegram JS bridge, storage, network calls, CDNs, or extra crypto schemes
- Use real wallet phrases; use only the fixed test entropy from `AGENTS.md`
- Skip the vendor integrity hashes or fake a failed checkpoint

---

## Cursor — Guardian / Orchestrator

### Owns

- `.cursor/rules/**`, `.cursor/skills/**`
- Coordination boards: `AGENT_CLAIMS.md`, `AGENT_HANDOFF.md` (shared writes), `docs/coordination.md`
- Process docs: `roles.md`, skill indexes
- Diff review vs `AGENTS.md` (scope, warnings text, forbidden features, secret hygiene)
- Optional: static hosting / BotFather checklist with the human (not blocking Codex code completion)

### Defers to Codex when

- Any implementation of BIP-39 / SLIP-39 / entropy / shares / UI wiring in `src/`
- Installing deps, running Playwright, fixing `npm run verify`
- Vendor download + `git hash-object` verification

### Must not

- Touch Codex `active` claims
- Expand or “improve” product scope past `AGENTS.md`
- Re-implement crypto in Cursor while Codex is mid-claim
- Soften security warnings or allow real-fund guidance

---

## Parallel work lanes (recommended)

Use these lanes so both agents can run at once without fighting:

| Lane | Owner | Examples |
|------|-------|----------|
| **A — Crypto core** | Codex | `src/bip39.ts`, `src/slip39.ts`, vendor pin, section 8 proofs |
| **B — App shell / UI** | Codex (after A checkpoint) | `src/main.ts`, `src/style.css`, DOM IDs from brief |
| **C — Agent ops** | Cursor | claims, handoffs, rules, skills, review notes |
| **D — Docs polish** | Cursor *or* Codex (claim it) | README clarity only; do not contradict `AGENTS.md` |

Do **not** split A across both agents. Crypto is single-threaded under Codex.

---

## Suggested sequence

1. **Codex:** vendor pin + BIP-39 + SLIP-39 adapter → section 8 checkpoint  
2. **Cursor:** review checkpoint evidence / claim hygiene  
3. **Codex:** UI + Vitest + Playwright → `npm run verify`  
4. **Cursor:** merge-readiness review against `AGENTS.md` checklist  
5. **Human (+ Cursor assist):** static host + BotFather (pending items in final report)

---

## Coordination

| Concern | File |
|---------|------|
| Product + crypto brief | `AGENTS.md` |
| Roles (this file) | `roles.md` |
| Live locks | `AGENT_CLAIMS.md` |
| Handoffs | `AGENT_HANDOFF.md` |
| Protocol | `docs/coordination.md` |

Claim before edit. Prefer handoff notes over overlapping edits. Details: [`docs/coordination.md`](docs/coordination.md).

---

## Quick reference

| Need | Agent |
|------|-------|
| Build / crypto / tests / verify | **Codex** |
| Scope guard / review / agent files | **Cursor** |
| BotFather / real device | **Human** (Cursor may assist) |
| Ambiguous product change | Stop → `AGENTS.md` → ask user |
