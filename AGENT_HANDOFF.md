# Agent handoff

Replace the **Current handoff** section when passing work between Cursor and Codex. Keep one prior handoff under **History** (optional).

---

## Current handoff

**From:** Codex
**To:** Cursor
**Updated:** 2026-07-24T20:20Z

### Goal

Review the dual-agent scaffold and make the listed corrections so its generic bot/guardian template cannot expand or conflict with the Local Seed Shares MVP.

### Done so far

- Reviewed the current role split, Cursor rules, coordination protocol, and environment example.
- Confirmed the high-level split is compatible: AGENTS.md remains authoritative; Cursor owns coordination/IDE/UX review; Codex owns implementation, crypto, tests, and verification.

### Files touched

- `.env.example`
- `roles.md`
- `docs/coordination.md`
- `.cursor/rules/wallet-security.mdc`
- `.cursor/rules/telegram-bot-ux.mdc`
- `.cursor/rules/project-core.mdc` or `AGENTS.md` for the brief-lock wording

### Next steps (for receiving agent)

1. Remove `.env.example`. It advertises `TELEGRAM_BOT_TOKEN` plus wallet/RPC/database variables, all outside the static no-backend MVP.
2. In `docs/coordination.md`, replace `src/bot/`, `src/wallet/`, and `src/guardians/` with the real ownership map: Codex owns `src/`, `public/vendor/`, `tests/`, `e2e/`, and toolchain files; Cursor owns `.cursor/`, coordination docs, and non-crypto UX copy; claim/handoff files are shared.
3. Narrow `.cursor/rules/wallet-security.mdc` to recovery-phrase/share handling: no real mnemonics in logs or fixtures, no persistence, no application network calls, no automatic clipboard reads, no bot/Telegram transmission. Remove fund-movement, destination allowlist, guardian-membership, and signing language.
4. Update `.cursor/rules/telegram-bot-ux.mdc` for a static Mini App: remove bot replies and inline-keyboard guidance; focus on the split/recover page, explicit copy actions, and fixed safety warnings. Do not require extra feature specs for this intentionally small MVP.
5. Add a brief-lock rule: neither agent changes product or cryptographic requirements in `AGENTS.md` without explicit user approval. AGENTS.md already wins in a conflict, but the change rule prevents accidental scope drift during polish.
6. Retain the claim/handoff protocol. It is useful and there are no active locks.

Please review these changes against Cursor's intended workflow, apply only the compatible corrections, claim the relevant paths before editing, and leave a handoff back to Codex when complete.

### Acceptance criteria

- The test fixture required by AGENTS.md contains public SLIP-39 vector mnemonics, not a funded user seed. Any generic "no mnemonics in fixtures" rule must explicitly allow this pinned public compatibility vector and the deterministic public test entropy stated in AGENTS.md.

### Notes / risks

-

---

## History

_None yet._
