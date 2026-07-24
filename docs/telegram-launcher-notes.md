# Telegram launcher notes (curated for this project)

Facts both agents may rely on when reasoning about the Mini App **as a launcher target**. Source: official docs (`core.telegram.org/bots/webapps`). Everything SDK-related is intentionally excluded — see the warning below.

## ⚠️ Do NOT import generic Mini App guides

Public agent resources exist for Telegram Mini Apps (`tma-llms-txt` llms.txt guides, `telegram-mini-app-skills` SKILL.md, community docs). **Most of their content is forbidden here** by `AGENTS.md` §2:

| Their advice | Our rule |
|--------------|----------|
| Load `telegram-web-app.js` / `@telegram-apps/sdk` / `@twa-dev/sdk` | No Telegram JS bridge, no `window.Telegram` |
| Validate `initData` with HMAC on a backend | No backend, no Telegram user data |
| CloudStorage / DeviceStorage / SecureStorage | No persistence of any kind |
| MainButton, haptics, theming via SDK | Plain DOM/CSS only |
| TON Connect / wallets / Stars payments | No blockchain access |
| ngrok + webhook local testing | No webhook; use `npm run preview` + Playwright |

If a proposal cites one of those guides, run Cursor's `scope-guard` before accepting anything.

## Launcher facts that DO matter to us

- **HTTPS only**; the Main Mini App URL is set in BotFather (`/mybots` → Bot Settings → Configure Mini App). Our URL must end in `/` or redirect to one (`AGENTS.md` §4).
- **Load fast**: the WebView expects the app to load promptly (slow loads risk termination and hurt UX). Our bundle is small; keep it that way — no fonts, no frameworks.
- **Main Mini App opens full-screen height by default** (Bot API 7.6+); users cannot shrink it. A `mode=compact` link parameter exists — we do not need it, but its presence must not break layout.
- **Direct links** like `https://t.me/<bot>?startapp=...` pass `tgWebAppStartParam` to the app. We **must ignore** it and all `tgWebApp*` query parameters (`AGENTS.md` §4) — the app must render identically with or without them.
- **Splash screen** (icon + light/dark colors) is configurable in BotFather under Configure Mini App → Configure Splash Screen. Owner-side polish only; no code impact.
- **Responsive WebView**: same document runs on Android, iOS, and Desktop Telegram. Test narrow mobile widths; the §7 single-page two-section layout must not overflow horizontally.
- **No `X-Frame-Options`, no `frame-ancestors` meta** — Telegram embeds the page (already in `TELEGRAM_SETUP.md`).
- The bot profile shows a **Launch app** button once the Main Mini App is configured — that is the entire Telegram integration for this project.

## Where this feeds in

- Owner steps: `TELEGRAM_SETUP.md`
- UI constraints: `.cursor/rules/mini-app-ui.mdc`
- Scope enforcement: `.cursor/skills/scope-guard`, `.agents/skills/seed-share-audit`
