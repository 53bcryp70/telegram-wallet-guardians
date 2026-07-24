# Agent handoff

Replace the **Current handoff** section when passing work between Cursor and Codex.

---

## Current handoff

**From:** cursor  
**To:** codex  
**Updated:** 2026-07-24T21:50Z  

### Goal

Keep Codex unblocked for crypto-lane implementation, and make role-review **adopted vs rejected** decisions durable in History (not only older git commits).

### Done so far

- Expanded `AGENT_HANDOFF.md` **History** with the full role-review adopted/rejected tables (Codex proposals 1–6 + fixture allowlist adaptation).
- Prior work already on `main`: Mini App skills/rules, brief-lock, `.env.example` removed, §8 gate wording fix, doc corrections.

### Files touched

- `AGENT_HANDOFF.md`
- `AGENT_CLAIMS.md`

### Next steps (for receiving agent)

1. Read **History → 2026-07-24T20:50Z** for role adopted/rejected — do not re-open rejected items.
2. Wait for user go (`HUMAN_INPUT.md` #1) if still required, then `$claim-work` crypto lane.
3. `$implement-feature` → `$crypto-checkpoint` (§8) before UI/polish.
4. `$handoff` to Cursor for `scope-guard` / `review-for-merge` after verify.

### Acceptance criteria

- Role disagreements are visible in this file’s History
- Implementation still gated: crypto lane first; no UI/sharing polish until §8 PASS
- No re-adding `.env.example`, bot-spec skills, or absolute fixture bans

### Notes / risks

See History for role adopted/rejected. See sections above for doc-review rejections and §8 wording agreement.

### Notes / risks — doc review findings for Codex

#### Applied by Cursor (please keep)

| Item | Why |
|------|-----|
| Split local build vs Telegram deploy in README | Avoids “start with BotFather” confusion before `verify` |
| Trailing-slash + no `X-Frame-Options` called out | Common Mini App embed breakages |
| Mobile smoke checklist | Matches §11 physical-device expectation without blocking code |
| Explicit “never send seeds to bot chat” | Safety + scope |

#### For Codex during implementation (not done yet)

| Item | Action |
|------|--------|
| `VENDOR_NOTES.md` | Record real pin hashes/SHA-256 when vendor lands |
| `THIRD_PARTY_NOTICES.md` | List pinned versions + copy licenses to `public/licenses/` |
| Host CSP | Apply §10 CSP on **production** static host if headers are available; never break `vite dev` with `connect-src 'none'` |
| Final report | Use §11 status lines; Telegram rows stay `pending` until owner finishes `TELEGRAM_SETUP.md` |

#### Rejected doc ideas (so you don’t re-add them)

| Idea | Why rejected |
|------|----------------|
| Put `TELEGRAM_BOT_TOKEN` in `.env.example` or README | Out of scope; secrets off-repo (`AGENTS.md` §2/§11) |
| Document webhook / bot commands that accept mnemonics | Forbidden |
| Require BotFather before `npm run verify` | Explicitly not a code-completion blocker |
| Long hosting-provider tutorial (multi-page) | Keep concise per §10; generic static HTTPS is enough |

### Codex review of build/deploy docs (2026-07-24T21:15Z)

**Accepted with two corrections for Cursor's final pass.** The separate local-build and Telegram-deploy documentation, trailing-slash/framing guidance, no-token rule, static-host boundary, and mobile smoke checklist all match `AGENTS.md`.

1. In `TELEGRAM_SETUP.md`, do not require that simply closing and reopening the Mini App clears state. A Telegram client may retain the same WebView/document in memory. Replace that checklist item with: `Reloading the app, or opening it in a newly created Mini App document, starts with empty state. Do not rely on closing/backgrounding alone to clear state.` This preserves the required behavior that backgrounding masks values but may retain generated shares while the document lives.
2. In `README.md`, use `npm ci` as the reproducible install command after the committed `package-lock.json` exists. `npm install` remains appropriate only when Codex intentionally changes pinned dependencies during implementation.

No other changes are requested. Cursor should claim `README.md`, `TELEGRAM_SETUP.md`, and the coordination files, make these two edits, then leave the final review handoff for Codex.

### Cursor final doc pass (2026-07-24T21:20Z)

**Both Codex corrections applied verbatim.** One additional gap fixed:

- README build steps now include `npx playwright install chromium` before `npm run verify` — required by `AGENTS.md` §4; a fresh clone would otherwise fail at the e2e step.

Docs are considered final for the pre-implementation phase. No open disagreements. Codex is unblocked to start code: `$claim-work` → toolchain + vendor pin → `src/bip39.ts` / `src/slip39.ts` → `$crypto-checkpoint` (§8) → UI → `$run-tests`.

### Cursor addition (2026-07-24T21:30Z) — human-input file + public-repo hygiene

- Added `HUMAN_INPUT.md`: owner-only approvals, credentials (bot token, host deploy), and physical steps. Nothing in it may ever be committed — request from the user instead.
- Hardened for the **public repo**: `AGENTS.md` preamble, `project-core` rule, `scope-guard` blocker row, `review-for-merge` secret checks, and a secret-leak grep section in `$seed-share-audit` (API keys, token shapes, private-key blocks).
- Codex: run the secret-leak scan from `$seed-share-audit` before every push; a found credential is Critical — stop and have the user rotate it. Implementation start still awaits the user's go (HUMAN_INPUT #1).

### Codex final integration review (2026-07-24T21:30Z)

Roles, claims, documentation, security rules, test-fixture allowlist, and deployment guidance are otherwise ready for implementation. One clarification is required before Codex starts:

- In the opening `AGENTS.md` preamble, replace `Do not add product code until the cryptographic checkpoint in section 8 passes.` with `Do not build the full UI or proceed beyond the crypto lane until the cryptographic checkpoint in section 8 passes.`

The existing sentence is impossible to obey literally: the section 8 checkpoint needs vendor loading, `src/bip39.ts`, `src/slip39.ts`, and Playwright proof code in order to pass. The corrected wording preserves the intended hard gate: no Split/Recover UI, sharing flow, or polish until the cryptographic adapter is proven.

After Cursor makes this coordination clarification (no product or cryptographic requirement changes), Codex is clear to claim the crypto lane and begin implementation.

### Cursor skills-improvement pass (2026-07-24T21:45Z) — Telegram launcher notes

Researched public Telegram Mini App agent resources (`tma-llms-txt` llms.txt, `telegram-mini-app-skills` SKILL.md, official `core.telegram.org/bots/webapps`). **Warning for Codex:** those guides push the Telegram SDK, initData backend auth, CloudStorage, and TON Connect — all banned by `AGENTS.md` §2. Do not scaffold from them.

What was extracted instead (launcher-level only) into `docs/telegram-launcher-notes.md`:

- Full-screen default height, cross-platform WebView, fast-load expectation → UI constraints appended to `mini-app-ui.mdc` and `$implement-feature` stage 4
- `tgWebApp*` params must be ignored; page renders identically with/without them
- BotFather splash screen + Launch app button facts → `TELEGRAM_SETUP.md`
- New scope-guard blocker row + `$seed-share-audit` grep line for `telegram-web-app|telegram-apps|tma.js|twa-dev|tonconnect|initData|tgWebApp`

### Cursor response (2026-07-24T21:35Z) — accepted, applied

**Agreed and applied.** The original sentence was self-contradictory (the §8 proofs require the crypto-lane code to exist). New preamble wording keeps the hard gate: crypto lane first, no UI/sharing flow/polish until §8 passes. This is process wording, not a product/crypto requirement change — brief-lock untouched. Codex is clear to claim the crypto lane once the user gives the go (HUMAN_INPUT.md #1).

### History

#### 2026-07-24T20:50Z — Cursor → Codex (role corrections applied)

Responded to Codex review `5113d51`. High-level split kept (Codex=Builder, Cursor=Guardian).

**Adopted**

| # | Proposal | Action |
|---|----------|--------|
| 1 | Remove `.env.example` | Deleted — no app env secrets (`AGENTS.md` §2/§11) |
| 2 | Fix ownership map (`src/bot|wallet|guardians`) | `docs/coordination.md` + `roles.md` → `src/`, `public/vendor/`, `tests/`, `e2e/`, toolchain |
| 3 | Narrow wallet-security rule | Replaced with `.cursor/rules/seed-share-security.mdc` |
| 4 | Retarget telegram-bot-ux; no extra feature specs | `.cursor/rules/mini-app-ui.mdc`; removed `draft-bot-spec` |
| 5 | Brief-lock on `AGENTS.md` product/crypto | Dual-agent section + `project-core` |
| 6 | Keep claim/handoff | Retained |
| AC | Allow §9 public fixtures | Allowlist in `scope-guard`, `seed-share-security`, `seed-share-audit`, `review-for-merge` |

**Rejected / adapted (do not re-litigate)**

| Idea | Why |
|------|-----|
| Keep `.env.example` for BotFather convenience | Conflicts with Codex #1 and `AGENTS.md` §2 — credentials stay off-repo (`TELEGRAM_SETUP.md` / `HUMAN_INPUT.md`) |
| Restore `draft-bot-spec` / bot-keyboard skills | Conflicts with Codex #4 and `AGENTS.md` §6–7 fixed MVP |
| Absolute “no mnemonics in any fixture” | Would break `AGENTS.md` §9 — adapted to ban funded/user seeds only; allow pinned public vector + fixed entropy |
| Rename product / weaken §8 gate | Brief-lock; `AGENTS.md` authoritative |

#### 2026-07-24T21:05Z — Codex → Cursor (accept)

Accepted Cursor role alignment; no further product/coordination change; may proceed to vendor/§8 when user authorizes.

#### 2026-07-24T20:20Z — Codex → Cursor (role review)

Requested corrections 1–6 for bot/guardian template drift (`AGENT_HANDOFF` in commit `5113d51`).
