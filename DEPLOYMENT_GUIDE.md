# First-time owner deployment guide

This guide is for the human owner. It takes the finished static app and makes it available as a Telegram Main Mini App. It does **not** require a backend, a server, a database, a webhook, or the bot token in this repository.

> Hackathon prototype only. Use only a disposable wallet with no real funds.

## Before you start

You need:

- A Telegram account on your phone.
- A Cloudflare account (the free plan is sufficient for this prototype).
- The project folder, including the already-built `dist` folder.

Never give anyone:

- A wallet recovery phrase.
- Your BotFather bot token.
- Your Cloudflare password or session.

The build has already passed its automated checks. If you need to rebuild it yourself, run `npm ci`, then `npm run verify` from the project folder. The files to publish are inside `dist/`.

## Part 1: Publish the static app

This guide recommends Cloudflare Pages **Direct Upload**. It is the simplest method here because it uploads the exact, already-built files and supports the included `_headers` security policy.

1. Open the [Cloudflare dashboard](https://dash.cloudflare.com/) and create or sign in to an account.
2. Open **Workers & Pages**.
3. Select **Create application** > **Get started** > **Drag and drop your files**. Labels can vary slightly as Cloudflare updates its dashboard.
4. Choose a harmless public project name, for example `local-seed-shares-demo`.
5. Drag the project’s **`dist` folder itself** into the upload area. Do not upload the repository root and do not upload `node_modules`.
   - The uploaded folder must contain `index.html` at its top level.
   - It must also contain `assets/`, `vendor/`, `licenses/`, and `_headers`.
6. Select **Deploy site** (or **Save and Deploy**).
7. Cloudflare will show a URL similar to `https://local-seed-shares-demo.pages.dev`.
8. Open that URL in a normal browser, adding a final `/` if it is not already present:

   ```text
   https://local-seed-shares-demo.pages.dev/
   ```

9. Confirm that the page displays its prototype warning and both **Create shares** and **Recover phrase** sections. Do not enter a real recovery phrase.

Why the final `/` matters: this static build uses relative asset paths. Telegram should be given the trailing-slash form so the browser consistently finds the app assets.

Cloudflare’s current Direct Upload instructions are [here](https://developers.cloudflare.com/pages/get-started/direct-upload/). The included `_headers` file supplies the restrictive production Content Security Policy. Do not add `X-Frame-Options: DENY` or `X-Frame-Options: SAMEORIGIN`: Telegram needs to embed the Mini App.

## Part 2: Create the Telegram bot

1. On your phone, open Telegram and search for **@BotFather**.
2. Send `/newbot`.
3. Choose a display name, for example `Local Seed Shares Demo`.
4. Choose a unique username ending in `bot`, for example `LocalSeedSharesDemoBot`.
5. BotFather will show a token. Save it in your password manager if you want to keep it.

Important: this project does not use the token. Do not paste it into GitHub, Codex, Cursor, Cloudflare, or any source file. Do not create a webhook or run a bot server.

Set the bot description (optional but recommended) to:

> Local 2-of-3 recovery-share hackathon prototype. Never send recovery words to this bot. Open the app instead.

## Part 3: Attach the Mini App in BotFather

1. In **@BotFather**, send `/mybots` and select the bot you just created.
2. Select **Bot Settings**.
3. Look for **Configure Mini App**, **Main Mini App**, or similar wording.
4. Create or enable the Main Mini App.
5. When BotFather asks for the website URL, paste your Cloudflare Pages URL with the trailing slash, for example:

   ```text
   https://local-seed-shares-demo.pages.dev/
   ```

6. Complete any title, short-description, or image fields BotFather asks for. Do not use wallet screenshots containing recovery words.
7. Return to the bot’s profile. It should now have an **Open App** or **Launch App** button.

Telegram documents that a Main Mini App adds this profile launch button; a menu button is optional. See [Telegram’s Mini App guide](https://core.telegram.org/bots/webapps#launching-the-main-mini-app).

## Part 4: Test on your phone

Do this only with a disposable test wallet containing no funds, or a known public test phrase. Never use a funded wallet.

1. Open your bot’s profile and tap **Open App**.
2. Confirm the warning says it is a hackathon prototype and does not support real funds.
3. Confirm the page opens normally and does not ask for Telegram permissions, a login, or a wallet connection.
4. In **Create shares**, paste a valid disposable English 24-word BIP-39 phrase and select **Create 3 shares**.
5. Confirm exactly three shares appear and each says `33 words`.
6. Copy only Share 1 and Share 2. Do not send them to the bot chat. For this first test, paste them into the app’s two recovery fields instead.
7. Select **Recover phrase** and confirm the recovered 24 words match the disposable phrase.
8. Reload or reopen the Mini App. Confirm all inputs and generated shares start empty.

For the real demo, keep the same restriction: one share is copied at a time; never use two shares in the same Telegram chat, account, device, or storage location. Normal Telegram Cloud Chats are cloud-stored. If chat transfer is necessary, prefer a Secret Chat, while remembering that a recipient can still copy or photograph a share.

## If something goes wrong

| Problem | Most likely fix |
| --- | --- |
| BotFather rejects the URL | Use the full `https://.../` URL. `localhost`, `http://`, and local file paths will not work. |
| The deployed page is blank or missing styling | Upload the **contents represented by `dist/`**, with `index.html` at its root; do not upload the project root. |
| The page loads but share creation fails | Do not change the app or crypto code. Record a screenshot without sensitive text and report the device/browser details. |
| The bot profile has no launch button | Revisit BotFather > Bot Settings > Configure/Main Mini App and ensure the URL was saved. |
| The Mini App is different from the browser version | Check the precise trailing-slash URL and confirm `vendor/slip39-libs.js` was uploaded with the rest of `dist/`. |

## Tell Codex or Cursor when these are complete

Send these four status lines, with `complete` or `pending`:

```text
Static deployment:
Telegram bot creation:
BotFather Main Mini App configuration:
Physical-device test:
```

Do not report a step as complete if it has not actually been done.
