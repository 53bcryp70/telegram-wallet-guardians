# Agent handoff

Replace the **Current handoff** section when passing work between Cursor and Codex.

---

## Current handoff

**From:** cursor  
**To:** codex  
**Updated:** 2026-07-24T21:41Z  
**Last Cursor review:** commits `1db9026` (`feat: add local seed sharing prototype`) + merge `f5dfd2a`

### BLOCKER FOR CODEX

Required visible warning copy from `AGENTS.md` §3 is incomplete in `src/main.ts`. Fix before treating the prototype as merge-ready / verify-complete. Do not expand scope beyond restoring the exact brief strings.

### Goal

Review Codex prototype landing on `main` (`1db9026`) against `AGENTS.md` (scope-guard + review-for-merge). Shared boards only — Cursor did not edit Codex `active` implementation paths.

### Scope / verify snapshot (non-blocking positives)

| Check | Result |
|-------|--------|
| Scope §1–2 forbidden features (backend, Telegram bridge, storage, app network, Copy All, second crypto lib) | PASS — none found in `src/` |
| Vendor §5 blob SHAs | PASS — bundle `7dd2f48649dbb7a316b4c49e2fa8098d4edbc7a3`, license `a7d8d0bbcd7d7b75a9e672ba8ce8323ad8ae00a8` |
| Vendor SHA-256 in `VENDOR_NOTES.md` | PASS — `d717e72eda18f696a90e73a4506faecfb8e1e836bf46709867b14e16832234da` |
| Toolchain pins / engines | PASS — exact versions per §4; `base: "./"`; `sourcemap: false` |
| DOM IDs §7 | PASS — all required IDs present |
| Fixtures §9 | PASS — fixed entropy `00010203…1f` derived in tests; pinned vector 23 JSON exact; TREZOR only in Playwright vendor vector path |
| Secret hygiene | PASS — no tokens/keys/credentials/funded mnemonics in the diff |
| Production SLIP-39 call shape | PASS — one group `[[2,3,"Local Seed Shares"]]`, empty passphrase, `iterationExponent: 0`, `fromPath("r/0")` |
| Pair verification before display | PASS — UI recovers 1+2 / 1+3 / 2+3 before showing shares |
| `npm run verify` | NOT REPORTED in handoff; Cursor did not re-run (no `node_modules` in this environment) |

### Critical

1. **[AGENTS §3] `src/main.ts` — missing required prominent warnings**
   - Add exactly: `Supports only the English 24-word BIP-39 recovery phrase from Wallet in Telegram's DeFi Account.`
   - Near shares, replace the weaker Trezor substitute with exactly: `These shares reconstruct your original 24-word phrase through Local Seed Shares. Do not enter them directly into Trezor or another wallet's SLIP-39 recovery flow because that may restore a different wallet.`
   - Near shares, add exactly: `Normal Telegram Cloud Chats are stored in Telegram's cloud. When chat transfer is necessary, prefer a Secret Chat and keep the shares separated.`
   - Add affiliation disclaimer exactly: project is not affiliated with or approved by Telegram, Wallet in Telegram, Trezor, SatoshiLabs, or Ian Coleman.
   - Keep the existing disposable-wallet warning (already present).

### Suggestions

1. **[AGENTS §1] Local-boundary wording** — Header currently says processing is local / no automatic clipboard read. Prefer the brief’s full wording about static-host download + no application-initiated network requests + no intentional transmit/save.
2. **[AGENTS §7] Engine error string** — `src/slip39.ts` throws `SLIP-39 engine failed to load.` while the allowlisted user-facing string is `SLIP-39 engine failed to load. Reload the application.` Align adapter + `splitErrorFor` allowlist.
3. **[AGENTS §7] Nested `<main>`** — `index.html` has `<main id="app">` and `main.ts` injects another `<main class="app-shell">`. Keep a single landmark (e.g. outer `#app` as `div`).
4. **Process** — Crypto-lane claim still `active`; after warning fix + `npm run verify`, mark claim `done` and hand off with the §11 final report lines.
5. **[AGENTS §7] Non-allowlisted recover error** — `entropyTo24WordMnemonic` can throw `Recovered data did not contain a valid 24-word phrase.`, which `recoverErrorFor` collapses to the generic incompatible-shares message. Map to an allowlisted string or avoid the extra throw path.

### Nice-to-have

1. Playwright `webServer.command` uses `node node_modules/vite/bin/vite.js preview --host 127.0.0.1` instead of `npm run preview -- --host 127.0.0.1` — functionally fine; match brief for clarity.
2. Vitest covers the required BIP-39 cases; optional extra case for unknown-word error string if you want belt-and-suspenders.

### Next steps (for Codex)

1. Claim/keep `src/main.ts` (and tiny `src/slip39.ts` error-string tweak if desired).
2. Insert the missing §3 strings verbatim; do not invent alternate warning copy.
3. Run `npm run verify`; fix any FAIL lines.
4. `$handoff` with verify status + §11 report; mark crypto-lane claim `done`.

### Acceptance criteria

- All §3 required warnings visible in the UI
- No new scope creep
- `npm run verify` green and reported
- Vendor hashes unchanged

### Notes / risks

- Cursor reviewed boards only; did not modify `src/**` or `public/vendor/**` (Codex `active` claim).
- No `HELP REQUESTED` section was present.
- Overnight hard stops not triggered (vendor hashes match; no secrets found).

### History

#### 2026-07-24T21:41Z — Cursor → Codex (prototype review; BLOCKER)

Reviewed `1db9026` / `f5dfd2a`. Scope/vendor/fixtures/secrets PASS. **Critical:** missing AGENTS §3 required warning copy in `src/main.ts` → `BLOCKER FOR CODEX`. Details in Current handoff.

#### 2026-07-24T22:00Z — Codex implementation start (superseded by `1db9026`)

Codex claimed crypto lane and later landed full prototype on `main` (`1db9026`) including toolchain, vendor pin, adapters, minimal UI, Vitest, and Playwright §8/UI checks.


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
