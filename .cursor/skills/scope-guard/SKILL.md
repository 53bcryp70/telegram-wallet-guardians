---
name: scope-guard
description: Check a plan or diff against AGENTS.md hard boundaries for Local Seed Shares. Use when reviewing Codex output, before approving new files, or when someone proposes extra features.
---

# Scope guard

Read [`AGENTS.md`](../../../AGENTS.md) sections 1–2 and 7 before judging. Cite section numbers in findings.

## Blockers (fail immediately)

Flag as **Blocker** if the change introduces any of:

| Forbidden | Why |
|-----------|-----|
| Backend / API / serverless / webhook / polling bot | Telegram is launcher only |
| Bot token in repo or runtime fetch of secrets | Out of scope + secret risk |
| `window.Telegram`, `sendData`, bridge APIs | No Telegram JS bridge |
| `localStorage` / `sessionStorage` / IndexedDB / cookies / SW | No persistence |
| `fetch` / XHR / WebSocket / CDN / remote fonts | No app-initiated network |
| Configurable threshold/groups/passphrase | Fixed 2-of-3 only |
| Non-24-word BIP-39, TON mnemonics, wallet connect, key derivation | Entropy split only |
| Copy All, QR, file download, bulk export | Explicitly banned |
| Funded/user mnemonic in tests/docs/commits | Ban real seeds |
| Second SLIP-39 library or hand-rolled crypto | Pinned vendor only |
| `Math.random` for security-sensitive data | Use `crypto.getRandomValues` |
| `.env` / bot-token examples for the app | Static Mini App; no backend secrets file |
| Any API key, access key, token, or deploy credential value | Repo is **public**; owner-only items stay off-repo per `HUMAN_INPUT.md` |
| `telegram-web-app.js`, `@telegram-apps/sdk`, `@tma.js/*`, `@twa-dev/sdk`, TON Connect, `initData` validation | Generic TMA-guide imports (llms.txt / community skills) — bridge/SDK/backend all banned; see `docs/telegram-launcher-notes.md` |

## Fixture allowlist (not blockers)

Per `AGENTS.md` §9, these are **allowed**:

- Fixed public test entropy `00010203…1f` (derive mnemonic in tests; do not invent other “sample” phrases)
- `tests/fixtures/slip39-vector-23.json` public compatibility vector (Playwright may use TREZOR passphrase **only** for that vendor vector test)

## Must still be true

- English 24-word BIP-39 → 32-byte entropy → one-group 2-of-3 → three 33-word shares
- Recover from exactly two compatible shares → original 24 words
- Empty production passphrase; historic non-extendable shares from pinned bundle
- Required warning copy from section 3 still visible where relevant
- Vendor blob SHAs unchanged if vendor files touched

## Output format

```markdown
## Scope guard

**Verdict:** PASS | FAIL

### Blockers
- [AGENTS §N] path — issue — required fix

### Notes
- …

### Out of scope requests (ignore / push back)
- …
```

If FAIL, prefer `$handoff` back to Codex with blockers rather than expanding scope yourself.
