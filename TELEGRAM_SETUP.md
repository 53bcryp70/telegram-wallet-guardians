# Telegram Setup

Authority: [`AGENTS.md`](AGENTS.md) §11. Telegram is a **launcher only**. This doc is for the **human owner** after code verification — it does **not** block Codex from finishing implementation.

## When to use this

Do these steps only after:

1. `npm run verify` passes locally  
2. `dist/` contains at least `index.html`, `vendor/slip39-libs.js`, and `licenses/`  
3. `dist/` is deployed to a **static HTTPS** host  

Until then, mark in the final report: `Static deployment: pending`, `Telegram bot creation: pending`, etc.

## 1. Deploy the static build

Serve the **contents of `dist/`** over HTTPS (any static host: GitHub Pages, Cloudflare Pages, Netlify, S3+CDN, etc.).

### Hosting requirements (easy to get wrong)

| Requirement | Why |
|-------------|-----|
| HTTPS | Telegram Mini Apps require it |
| URL ends with `/` **or** host redirects to a trailing-slash URL | Required by `AGENTS.md` §4 / §11 |
| Do **not** set `X-Frame-Options` | Telegram embeds the app in a WebView/iframe |
| Do **not** put `frame-ancestors` in a meta CSP | Same embedding constraint |
| Prefer the production CSP from `AGENTS.md` §10 when the host allows custom headers | `connect-src 'none'` etc. — **not** for Vite `dev` |
| Serve `vendor/` and `licenses/` as same-origin static files | No CDN for app assets |

After deploy, open the URL in a normal mobile browser once and confirm the page loads (create/recover UI visible). That does not replace Telegram testing.

## 2. Create the bot (BotFather)

1. Open Telegram → `@BotFather` → `/newbot` (or reuse an existing bot).  
2. Save the **bot token only on the owner’s machine/password manager**.  
3. **Never** put the token in this repo, `dist/`, CI secrets for a static site, or frontend code.  
4. No webhook, no polling process, no backend — do not run `/setwebhook` for this project.

Suggested bot description / about text:

> Local 2-of-3 recovery-share hackathon prototype. Never send recovery words to this bot. Open the app instead.

Optional: disable or avoid custom commands that invite users to paste seeds in chat.

## 3. Attach the Main Mini App

Exact BotFather menu labels can change; the intent is:

1. `/mybots` → select the bot  
2. Bot Settings → **Configure Mini App** / **Main Mini App** (wording varies)  
3. Set the Mini App URL to the deployed HTTPS URL **with trailing slash** (or the redirecting URL)  
4. Confirm the bot profile shows a button/menu entry that opens the app  

Do **not** configure a Telegram Web App “backend”, `sendData` flow, or payment — out of scope.

## 4. Mobile smoke test (owner)

On a **phone** Telegram client (not only Desktop):

- [ ] App opens from the bot profile / menu  
- [ ] Hackathon / disposable-wallet warnings are visible  
- [ ] Create shares with a **disposable test** 24-word phrase only  
- [ ] Each share copies alone (no “Copy all”)  
- [ ] Recover from two shares restores the same 24 words  
- [ ] Closing/reopening the Mini App clears in-memory state (empty on new load)  
- [ ] Users are never told to paste seeds into the bot chat  

If anything fails only inside Telegram but works on `npm run preview`, note WebView/hosting (trailing slash, framing, mixed content) before changing crypto.

## 5. What this project must never do

- Ask users to send recovery phrases or shares to the bot  
- Store phrases in Telegram Cloud, bots, or server logs  
- Add `window.Telegram` bridge code, analytics, or app-initiated network calls  
- Use a funded / real wallet for testing  

## Status lines for the final report

```text
Static deployment: pending or complete
Telegram bot creation: pending or complete
BotFather Main Mini App configuration: pending or complete
Physical-device test: pending or complete
```

End with the hackathon disclaimer from `AGENTS.md` §11.
