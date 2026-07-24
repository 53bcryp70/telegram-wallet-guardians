---
name: implement-feature
description: Implement Local Seed Shares exactly per AGENTS.md (vendor pin, BIP-39, SLIP-39, UI, tests). Use when building the Mini App, advancing the section 8 checkpoint, or wiring create/recover flows.
---

# Implement feature

Authoritative brief: `AGENTS.md`. Coordination: `roles.md`, `$claim-work`, `$handoff`.

## Before coding

1. Read handoff + `AGENTS.md` §§1–2, 4–6.
2. `$claim-work` for the lane you will own.
3. Do not start UI polish before `$crypto-checkpoint` can PASS (or is in progress for §8 proofs).

## Build order

| Stage | Deliverables | Gate |
|-------|----------------|------|
| 0 Toolchain | `package.json` engines, exact deps, Vite `base: "./"`, scripts | installs clean |
| 1 Vendor | `public/vendor/slip39-libs.js` + license; blob SHAs match §5 | hash check |
| 2 BIP-39 | `src/bip39.ts` + `tests/bip39.test.ts` | Vitest PASS |
| 3 SLIP-39 | `src/slip39.ts` + Playwright crypto proofs | `$crypto-checkpoint` PASS |
| 4 UI | `src/main.ts`, `src/style.css`, `index.html`, §7 DOM IDs (WebView constraints: `docs/telegram-launcher-notes.md`) | manual + e2e |
| 5 Verify | licenses, docs, `npm run verify` | `$run-tests` PASS |

Required file shape is listed in `AGENTS.md` §6 — prefer that list over new modules.

## Interfaces (do not invent extras)

`bip39.ts`: `normalizeMnemonic`, `validate24WordMnemonic`, `mnemonicTo32ByteEntropy`, `entropyTo24WordMnemonic`

`slip39.ts`: `generateTwoOfThree`, `recoverTwoOfThree` (empty passphrase in production)

## Hard stops

- Vendor Git blob SHA mismatch → delete vendor files, report, stop
- §8 failure → stop; no fake shares; no alternate Shamir library
- Scope creep pressure → refuse; cite §2; `$handoff` if needed

## Done

`$run-tests` then `$handoff` to Cursor with report lines from §11.
