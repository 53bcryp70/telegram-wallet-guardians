# Human input required (owner-only)

Things neither Cursor nor Codex can do or provide. Everything here stays **outside this public repo** unless marked otherwise.

## 1. Decisions / approvals (blocking when they arise)

| # | What | When needed | How to give it |
|---|------|-------------|----------------|
| 1 | **Authorize implementation start** | Before Codex begins vendor pin + code | Say "start building" to Codex (or Cursor to relay) |
| 2 | **Brief-lock approvals** — any change to product/crypto requirements in `AGENTS.md` §1–11 | Only if an agent proposes one | Explicit yes/no in chat |
| 3 | **Conflict tie-breaks** — same-file claims, role disputes | Rare | Pick an owner |
| 4 | **Vendor-integrity failure call** — if downloaded SLIP-39 bundle hashes mismatch | Only on failure | Decide: retry / stop project |

## 2. Credentials & accounts (never commit; keep local)

| # | What | Used for | Storage |
|---|------|----------|---------|
| 5 | **Telegram account** | Creating the bot via @BotFather | Your phone |
| 6 | **Bot token** from BotFather | Only to configure the Mini App in BotFather itself | Password manager — **never** in repo, CI, or frontend |
| 7 | **Static-host account** (GitHub Pages / Cloudflare Pages / Netlify / etc.) | Deploying `dist/` over HTTPS | Your account; agents can prepare files but not log in |
| 8 | **Deploy credentials/tokens** for that host | Publishing the build | Local only. If you want CI deploys later, use the host's secret store — still never in this repo |

## 3. Physical actions (only you can do)

| # | What | When |
|---|------|------|
| 9 | Create the bot in **@BotFather** and set the **Main Mini App URL** (trailing slash) | After `npm run verify` passes and `dist/` is deployed — steps in `TELEGRAM_SETUP.md` |
| 10 | **Mobile smoke test** on a real phone Telegram client | After BotFather config — checklist in `TELEGRAM_SETUP.md` §4 |
| 11 | Provide a **disposable test wallet** 24-word phrase for manual device testing | Only during your own manual test. Never share it with agents, never type it into chat, never commit it. Agents use only the public §9 test entropy |

## 4. What you must NEVER give the agents

- A real or funded wallet's recovery phrase
- The bot token (agents never need it — Telegram is launcher-only, no backend)
- API keys of any kind (this project requires none; if someone asks for one, that's scope creep — refuse)
- Host login sessions/passwords

## Overnight mode

When you say "run overnight", `docs/overnight-protocol.md` applies: implementation + review continue unattended; the hard-stop list there defines what waits for morning. Saying it counts as giving #1 (implementation go) if not already given.

## Current status

| Item | Status |
|------|--------|
| Implementation authorization (#1) | **GRANTED 2026-07-24T21:13Z** — user said "let's start building" |
| Bot creation (#5–6, #9) | pending — after verify passes |
| Static host choice + deploy (#7–8) | pending — your pick; agents adapt docs |
| Physical device test (#10–11) | pending — last step |

When you complete an owner step, tell either agent and they will update the final report status lines (`AGENTS.md` §11).
