# Local Seed Shares

Hackathon prototype for a static Telegram Mini App. It accepts an English 24-word BIP-39 phrase, creates a fixed one-group 2-of-3 set of three 33-word non-extendable SLIP-39 shares, and restores the original phrase from exactly two shares.

The initial app files load from a static HTTPS host. After that, cryptographic processing is local; the app has no backend, storage, Telegram bridge, analytics, or application-initiated network requests.

The production build includes a `_headers` file for static hosts that support it. It applies the agreed same-origin CSP, including `connect-src 'none'`. Verify equivalent response headers when using a host that ignores `_headers`.

> Hackathon prototype only. Use only with a disposable test wallet containing no real funds.

**Authoritative build/spec:** [AGENTS.md](AGENTS.md) (sections 1–11). Do not contradict it.

## Dual agents

| Agent | Role | Focus |
|-------|------|--------|
| **Codex** | Builder | Implement per `AGENTS.md`, crypto checkpoint, `npm run verify` |
| **Cursor** | Guardian / Orchestrator | Scope guard, claims/handoffs, review, `.cursor/` |

See [`roles.md`](roles.md), [`docs/coordination.md`](docs/coordination.md), [`AGENT_CLAIMS.md`](AGENT_CLAIMS.md), [`AGENT_HANDOFF.md`](AGENT_HANDOFF.md).

## How to build (local)

Requires **Node.js `>=22.12.0`** and npm. Exact dependency versions are locked in `AGENTS.md` §4.

After implementation exists:

```bash
npm ci                            # reproducible install from package-lock.json
npx playwright install chromium   # one-time: browser for e2e tests
npm run verify                    # typecheck + unit + build + e2e
npm run build                     # output in dist/
npm run preview                   # local static preview (also used by Playwright)
```

Use `npm install` only when intentionally changing pinned dependencies.

Day-to-day while coding:

```bash
npm run dev
```

Do not start BotFather work until `npm run verify` is green and `dist/` is complete.

## How to put it in Telegram

1. Deploy `dist/` to static HTTPS (trailing-slash URL).  
2. Follow [`TELEGRAM_SETUP.md`](TELEGRAM_SETUP.md) (BotFather Main Mini App + mobile smoke test).  

Owner credentials stay off-repo. Code completion is not blocked by missing bot setup (`AGENTS.md` §11).

## Other docs

| Doc | Purpose |
|-----|---------|
| [HUMAN_INPUT.md](HUMAN_INPUT.md) | Owner-only inputs: approvals, credentials (off-repo), device tests |
| [VENDOR_NOTES.md](VENDOR_NOTES.md) | Pinned SLIP-39 artifact, hashes, and limitations |
| [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md) | Runtime/vendor licenses |
| [TELEGRAM_SETUP.md](TELEGRAM_SETUP.md) | Deploy + BotFather + device test |

Do not enter shares directly into another wallet's SLIP-39 recovery flow. Recover the original 24 words through this app first.
