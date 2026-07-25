# Local Seed Shares

A static Telegram Mini App that splits an English **24-word BIP-39** recovery phrase into a fixed **2-of-3** set of SLIP-39 shares, and restores the original phrase from any two compatible shares.

Built as a hackathon prototype for social recovery–style backups of the English BIP-39 phrase used with **Wallet in Telegram’s DeFi Account**.

> **Hackathon prototype.** Use only with a disposable test wallet containing no real funds.

**Live demo:** open [@SeedphraseSocialRecoveryBot](https://t.me/SeedphraseSocialRecoveryBot) in Telegram → **Open App**  
**Static host:** https://sweet-wildflower-02b2.53bcryp70.workers.dev/

---

## What it does

```text
English 24-word BIP-39 phrase
  → validate (English wordlist + BIP-39 checksum)
  → 32-byte entropy
  → one SLIP-39 group, 2-of-3
  → three 33-word shares

Any two compatible shares
  → 32-byte entropy
  → original 24-word BIP-39 phrase
```

Designed for phrases that are **standard English BIP-39** (24 words, valid checksum), as used for Wallet in Telegram’s DeFi Account recovery flow.

## Local by design

- After the Mini App files load from the static host, cryptographic work runs **on the device**.
- No backend, no accounts, no analytics, no Telegram JS bridge.
- No application-initiated network requests after load; phrases and shares are not intentionally transmitted or saved by the app.
- Clipboard writes happen only when you tap Copy.

## Safety (read before use)

- Anyone with **two shares** can recover the phrase. Keep shares separated (different people / channels / storage).
- Prefer a **Secret Chat** if you must send a share in Telegram; normal Cloud Chats are stored in Telegram’s cloud.
- Shares from this app reconstruct the phrase **through Local Seed Shares**. Do not enter them directly into Trezor or another wallet’s SLIP-39 recovery — that may restore a different wallet.
- Not affiliated with or approved by Telegram, Wallet in Telegram, Trezor, SatoshiLabs, or Ian Coleman.

## Features

- Create shares / Recover phrase chooser (mobile-friendly)
- Pair-verification before shares are shown
- Per-share **Copy share** (33 words) and **Copy ready-to-send message** (Secret Chat draft + share)
- Disposable test phrase generator (random valid BIP-39, for demos)
- Share-sent checklist and institution placeholder (BackupBuddy.io listed for a future path)

## Requirements

- Node.js `>=22.12.0` and npm  
- Exact dependency versions are pinned in [`AGENTS.md`](AGENTS.md) §4 and `package-lock.json`

## Develop locally

```bash
npm ci
npx playwright install chromium   # once, for e2e
npm run verify                    # typecheck + unit + build + Playwright
npm run dev                       # Vite dev server
```

Production output is written to `dist/` (`npm run build`). Preview with:

```bash
npm run preview
```

## Deploy to Telegram

1. Publish the contents of `dist/` over **HTTPS** (URL should end with `/`).
2. Create a bot in [@BotFather](https://t.me/BotFather) and set the **Main Mini App** URL to that host.
3. Keep the bot token **off** this repository — the Mini App does not need it.

Step-by-step: [`DEPLOYMENT_GUIDE.md`](DEPLOYMENT_GUIDE.md) · [`TELEGRAM_SETUP.md`](TELEGRAM_SETUP.md)

The production `_headers` file sets a strict same-origin CSP (`connect-src 'none'`) on hosts that honor it.

## Project docs

| Doc | Purpose |
|-----|---------|
| [`AGENTS.md`](AGENTS.md) | Authoritative product / crypto / test brief |
| [`VENDOR_NOTES.md`](VENDOR_NOTES.md) | Pinned SLIP-39 browser bundle + hashes |
| [`THIRD_PARTY_NOTICES.md`](THIRD_PARTY_NOTICES.md) | Licenses |
| [`HUMAN_INPUT.md`](HUMAN_INPUT.md) | Owner-only credentials and device checks |
| [`roles.md`](roles.md) · [`docs/coordination.md`](docs/coordination.md) | Dual-agent (Cursor / Codex) workflow |

## License / status

Hackathon prototype. Uses pinned experimental, non-extendable browser SLIP-39 code and has not been independently reviewed. **Do not use with real wallet funds.**
