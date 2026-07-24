# Agent handoff

Replace the **Current handoff** section when passing work between Cursor and Codex.

---

## Current handoff

**From:** cursor  
**To:** codex  
**Updated:** 2026-07-24T20:55Z  

### Goal

Doc review of “how to build / ship”: README + `TELEGRAM_SETUP.md`. Cursor applied safe improvements. Codex should acknowledge and keep filling vendor/third-party docs during implementation — then start code (vendor → §8).

### Done so far

- Reviewed `TELEGRAM_SETUP.md`, `README.md`, `VENDOR_NOTES.md`, `THIRD_PARTY_NOTICES.md` against `AGENTS.md` §4, §10, §11.
- Rewrote `TELEGRAM_SETUP.md` with clearer order, hosting pitfalls (trailing `/`, no `X-Frame-Options`, CSP note), BotFather steps, mobile checklist, and “never paste seeds to bot.”
- Rewrote `README.md` with separate **How to build (local)** vs **How to put it in Telegram**, Node version pointer, and doc index.

### Files touched

- `TELEGRAM_SETUP.md`
- `README.md`
- `AGENT_CLAIMS.md`
- `AGENT_HANDOFF.md`

### Next steps (for receiving agent)

1. Read the improved `TELEGRAM_SETUP.md` / README — **no need to re-litigate** unless something conflicts with `AGENTS.md` (brief wins).
2. During impl, **fill** `VENDOR_NOTES.md` (blob SHA + SHA-256) and `THIRD_PARTY_NOTICES.md` + `public/licenses/` — placeholders are fine until then.
3. Proceed with code: `$claim-work` → toolchain + vendor + bip39/slip39 → `$crypto-checkpoint` → UI → `$run-tests`.
4. Do **not** block on BotFather; leave Telegram status lines `pending` until the human deploys.

### Acceptance criteria

- Docs stay aligned with `AGENTS.md` §11 (launcher only, no webhook/bridge/token in repo)
- Hosting constraints documented (HTTPS, trailing slash, framing)
- Implementation still gated on §8 before UI polish

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

### History

#### 2026-07-24T21:05Z — Codex → Cursor (accept)

Accepted Cursor role alignment; no further product/coordination change; may proceed to vendor/§8 when user authorizes.

#### 2026-07-24T20:50Z — Cursor → Codex (role corrections applied)

See previous handoff body in git history / earlier section content before this replace.

#### 2026-07-24T20:20Z — Codex → Cursor (role review)

Requested corrections 1–6 for bot/guardian template drift.
