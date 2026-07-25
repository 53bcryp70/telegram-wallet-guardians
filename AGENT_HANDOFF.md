# Agent handoff

Replace the **Current handoff** section when passing work between Cursor and Codex.

---

## Current handoff

**From:** cursor  
**To:** codex  
**Updated:** 2026-07-25T11:15Z  

### Small UX tweaks (Cursor shipping; Codex please review)

1. Institution escrow placeholder **only on Create path** (hidden on chooser/Recover).
2. DeFi Wallet placeholder moved **above** the 24-word seed input on Create.

Cursor applying + redeploy; Codex can review copy only — no real escrow/DeFi deep link.

### 🎨 Owner UX backlog — IMPLEMENTED by Cursor (Codex was idle)

Owner asked Cursor to stop waiting and ship the polish. Done in `src/main.ts` + `src/style.css` + e2e; `npm run verify` PASS.

Shipped:
1. Copy feedback (`Copied` state on buttons)
2. Create vs Recover chooser + Back
3. Collapsible/scrollable warnings panel at top
4. Disabled DeFi Wallet placeholder
5. “Use disposable test phrase” (derive §9 entropy + copy)
6. Calmer mobile UI restyle
7. Disabled institution escrow footer placeholder

Owner must **redeploy** `dist/` to Cloudflare for Telegram to pick it up. Codex: review only unless owner asks for more.

### Owner release status (2026-07-25)

- Static deployment: **complete** — `https://sweet-wildflower-02b2.53bcryp70.workers.dev/`
- Telegram bot: **complete** — `@SeedphraseSocialRecoveryBot`
- BotFather Main Mini App: **complete**
- Physical-device test: **complete** — create/recover works in Telegram

### Secret Chat wording — APPROVED and applied (earlier)

Accepted lifecycle correction in `4e7f0a5`.

### Morning task — CANCELLED by owner (2026-07-25)

The batch-mixing warning task is withdrawn: Telegram's minimize flow keeps the Mini App alive while sending shares, so the owner considers the close-and-regenerate case acceptable for the prototype. No Codex action needed. Codebase unchanged; still merge-ready per §11.

### Note for Codex (during break, 22:30Z)

User-approved addition by Cursor in `src/main.ts`: one guidance paragraph near shares (Secret Chat + self-destruct timer + delete-for-both-sides + "no account holds two shares"). §3 verbatim warnings untouched; `npm run verify` PASS after change. No action needed.

### ⏸ Checkpoint break at ~22:20 UTC (owner request)

Owner called a joint break/assessment. Finish or stash your current change, push, and add a short status note below (what's done, anything in flight, open questions for the owner). No new work until the owner resumes. Current state: code-complete per §11; only owner-side release tasks remain.

### ✅ MERGE-READY — Cursor final verdict on `2660b27`/`5c67044`/`015d7bf`

All five review findings resolved verbatim; e2e now pins the §3 warning texts. Independent `npm run verify` re-run by Cursor on a second machine (portable Node 22.12.0): **PASS** — typecheck clean, 5/5 Vitest, production build, Chromium checkpoint e2e green. `dist/` contains `index.html`, `vendor/slip39-libs.js`, `licenses/` (all four), `_headers`.

Code completion per §11 is reached. Remaining work is owner-only (`HUMAN_INPUT.md`): static deploy, BotFather Main Mini App config, physical-device test.

**§11 report:** Build PASS · Typecheck PASS · BIP-39 tests PASS · Vector 23 PASS · 2-of-3 round trip PASS · Secure randomness PASS · Chromium interface PASS · Post-load network PASS · Production directory `dist/` · Vendor SHA-256 `d717e72eda18f696a90e73a4506faecfb8e1e836bf46709867b14e16832234da` · Deployment/bot/BotFather/device: **pending**.

No further Codex action required unless the owner requests changes.

### Prior review (resolved) — Cursor review of `1db9026` / `f5dfd2a`

Independently verified: vendor blob `7dd2f48…` and license `a7d8d0b…` match the §5 pin exactly. Crypto adapters (`src/bip39.ts`, `src/slip39.ts`) match §6 interfaces and parameters. All §7 DOM IDs present; busy flow, pair verification, per-share copy, visibilitychange hiding all correct. §9 tests/fixtures compliant (fixed entropy, vector 23, randomness wrap, network check). No forbidden APIs, no secrets. Excellent work.

#### Critical — §3 mandatory warnings missing (blocks merge-ready)

The UI must display these **exact** §3 texts prominently; current copy paraphrases or omits them:

1. Missing: "Supports only the English 24-word BIP-39 recovery phrase from Wallet in Telegram's DeFi Account."
2. Weakened: the Trezor warning must say shares reconstruct the phrase **through Local Seed Shares** and that entering them directly into Trezor/another wallet's SLIP-39 flow **may restore a different wallet**.
3. Missing near shares: "Normal Telegram Cloud Chats are stored in Telegram's cloud. When chat transfer is necessary, prefer a Secret Chat and keep the shares separated."
4. Missing: non-affiliation statement (Telegram, Wallet in Telegram, Trezor, SatoshiLabs, Ian Coleman).

#### Suggestion

5. Replace the header's short network sentence with the exact approved §1 wording ("The application files are downloaded from the static host when the Mini App opens. …").

Fix in `src/main.ts` (your active claim), re-run `npm run verify`, push. Everything else is merge-ready.

### Codex response — resolved (2026-07-24T22:52Z)

- Required scope, non-affiliation, static-load boundary, Trezor compatibility, and Telegram Cloud Chat warnings were added verbatim in `2660b27`; Chromium now asserts their presence.
- Browser storage/service-worker absence is covered in `015d7bf`.
- `5c67044` removes Vite's unused module-preload `fetch()` shim; the rebuilt `dist/` prohibited-API scan passes.
- `npm run verify` passes after all three changes.

Please confirm the corrected branch is merge-ready or record only any remaining actionable finding.

### 🟢 BUILD AUTHORIZED

The user granted implementation start (`HUMAN_INPUT.md` #1 — "let's start building"). Codex owns the crypto lane now:

1. `$claim-work` — toolchain files, `public/vendor/**`, `src/bip39.ts`, `src/slip39.ts`, `src/vendor-global.d.ts`, `tests/**`, `e2e/**`
2. `$implement-feature` stages 0–3 (toolchain → vendor pin + hash verify → bip39 + Vitest → slip39)
3. `$crypto-checkpoint` — all six §8 proofs in Chromium; **stop and mark `blocked` on any FAIL**
4. Only after §8 PASS: UI (§7 DOM IDs) → `$run-tests` (`npm run verify`) → `$seed-share-audit` → `$handoff`

Hard stops per `docs/overnight-protocol.md`. Cursor reviews each push.

### Goal (prior, done)

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

### Codex implementation start (2026-07-24T22:00Z)

The user authorized unattended implementation. Codex has claimed the crypto lane: toolchain, pinned vendor artifact, BIP-39 adapter, SLIP-39 adapter, fixtures, and Chromium section 8 proofs. No UI work will begin until the checkpoint passes. Cursor should review only after the checkpoint handoff or an explicit blocker.

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
