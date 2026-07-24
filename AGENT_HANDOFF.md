# Agent handoff

Replace the **Current handoff** section when passing work between Cursor and Codex.

---

## Current handoff

**From:** cursor  
**To:** codex  
**Updated:** 2026-07-24T20:50Z  

### Goal

Respond to Codex’s dual-agent review: apply compatible corrections, document disagreements, finish Local Seed Shares skills, then unblock Codex to build (vendor → §8 checkpoint).

### Done so far

- Merged Codex commit `5113d51` (role-review handoff).
- Applied Codex corrections 1–6 (see Adopted below).
- Replaced bot/guardian template with Mini App rules/skills (`scope-guard`, `mini-app-ui`, `seed-share-security`, `crypto-checkpoint`, `seed-share-audit`, etc.).
- Explicitly allowlisted `AGENTS.md` §9 public vector + fixed test entropy in security/scope skills.

### Files touched

- Removed `.env.example`
- `roles.md`, `docs/coordination.md`, `AGENTS.md` (dual-agent + brief-lock)
- `.cursor/rules/**`, `.cursor/skills/**`
- `.agents/skills/**` (incl. `crypto-checkpoint`, `seed-share-audit`)
- `skills-for-cursor.md`, `specific-skills-for-codex.md`, `README.md`, `AGENT_CLAIMS.md`

### Next steps (for receiving agent)

1. `$claim-work` for vendor + `src/bip39.ts` + `src/slip39.ts` + toolchain
2. `$implement-feature` through `$crypto-checkpoint` (§8) — stop on FAIL
3. Then UI + `$run-tests` / `npm run verify`
4. `$handoff` back to Cursor for `scope-guard` + `review-for-merge`

### Acceptance criteria

- Vendor blob SHAs match `AGENTS.md` §5
- Section 8 all PASS in Chromium
- Fixtures may include only the pinned public SLIP-39 vector 23 + deterministic public test entropy from §9 (not user/funded seeds)

### Notes / risks — Codex proposals: adopted vs rejected

#### Adopted (from Codex handoff)

| # | Proposal | Action |
|---|----------|--------|
| 1 | Remove `.env.example` (bot token / RPC / DB vars) | **Done** — deleted; static Mini App needs no env secrets (`AGENTS.md` §2, §11) |
| 2 | Fix ownership map away from `src/bot|wallet|guardians` | **Done** — `docs/coordination.md` + `roles.md` use `src/`, `public/vendor/`, `tests/`, `e2e/`, toolchain |
| 3 | Narrow wallet-security rule to phrase/share handling | **Done** — replaced with `.cursor/rules/seed-share-security.mdc` (no fund-movement / allowlist / guardian-membership language) |
| 4 | Retarget telegram-bot-ux to static Mini App; no extra feature-spec requirement | **Done** — `.cursor/rules/mini-app-ui.mdc`; removed `draft-bot-spec` skill; `docs/specs/` is non-authoritative notes only |
| 5 | Brief-lock: do not change product/crypto in `AGENTS.md` without user approval | **Done** — in `AGENTS.md` dual-agent section + `.cursor/rules/project-core.mdc` |
| 6 | Keep claim/handoff protocol | **Done** — retained |
| AC | Allow §9 public vector + fixed test entropy in “no mnemonic fixtures” rules | **Done** — explicit allowlist in `scope-guard`, `seed-share-security`, `seed-share-audit`, `review-for-merge` |

#### Rejected / not adopted

| Proposal / idea | Why rejected |
|-----------------|--------------|
| Silent keep of `.env.example` “for BotFather convenience” | **Rejected** — conflicts with Codex #1 and `AGENTS.md` §2 (no bot token / backend). Owner credentials stay outside the repo per §11; `TELEGRAM_SETUP.md` is enough. |
| Restoring `draft-bot-spec` / bot-keyboard UX skills | **Rejected** — conflicts with Codex #4 and `AGENTS.md` §6–7 (fixed small MVP; no extra product-spec pipeline). |
| Generic ban: “no mnemonics in any fixture, ever” | **Rejected as absolute** — would break `AGENTS.md` §9 vector 23 + fixed entropy. **Adapted** to: ban real/funded user seeds; allow only the pinned public fixtures named in §9. |
| Renaming product away from Local Seed Shares / weakening §8 gate | **Rejected if proposed later** — `AGENTS.md` is authoritative; brief-lock forbids agent-only edits. |

No other Codex role changes were pushed beyond this handoff; high-level split (Codex=Builder, Cursor=Guardian) **confirmed compatible** — kept.

### Codex review outcome (2026-07-24T21:05Z)

**Accepted.** Cursor correctly applied all six requested corrections.

- `.env.example` is removed.
- Ownership now matches the static Mini App rather than a bot or guardian backend.
- The generic wallet and bot templates were replaced with recovery-phrase/share, static-Mini-App, and section 8 checkpoint guidance.
- The brief-lock prevents agent-only product or cryptographic changes.
- Public vector 23 and deterministic test entropy are allowlisted without permitting real or funded seeds.
- The claim and handoff protocol remains in place.

No product, cryptographic, or coordination change is requested from Cursor. Codex may proceed with the vendor and section 8 checkpoint when the user authorizes implementation.

### History

#### 2026-07-24T20:20Z — Codex → Cursor (role review)

Review dual-agent scaffold; request corrections 1–6 so bot/guardian template cannot expand past Local Seed Shares MVP. Claim `done` on review-only paths.
