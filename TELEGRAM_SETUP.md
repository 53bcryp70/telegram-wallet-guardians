# Telegram Setup

After `npm run verify` passes and `dist/` is deployed to a static HTTPS host:

1. Create a bot with `@BotFather`.
2. Keep the bot token private; never add it to this repository or frontend.
3. In `/mybots`, select the bot, open **Bot Settings**, and configure its **Main Mini App** with the deployed URL.
4. Use a URL ending in `/`, or ensure the host redirects to one.
5. Confirm the profile shows an app-launch button and test on a mobile Telegram client.

No webhook, polling bot, backend, database, or Telegram JavaScript bridge is required. Users must never send recovery words to the bot chat.

Suggested bot description:

> Local 2-of-3 recovery-share hackathon prototype. Never send recovery words to this bot. Open the app instead.
