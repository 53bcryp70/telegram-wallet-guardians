# UX backlog (owner-approved, post-Telegram test)

Owner confirmed on 2026-07-25: current Mini App crypto/create/recover flow **works** inside Telegram (`@SeedphraseSocialRecoveryBot`).

These are **UI/UX polish** items for a later Codex pass. Do **not** change crypto behavior, vendor pin, §3 warning *wording*, or add Telegram bridge / network / storage.

Live URL (owner deploy): `https://sweet-wildflower-02b2.53bcryp70.workers.dev/`

## Backlog

### 1. Copy feedback
When the user taps Copy (share or recovered phrase), give clear feedback that copy succeeded (temporary button label change, color/state change, and/or status message). Today copy works but feels silent.

### 2. Choose path first: Create vs Recover
Opening screen should ask the user to choose:
- **Create shares from seed phrase**, or
- **Recover phrase from shares**

Then navigate/scroll to (or show) only that section. Avoid dumping both full flows at once.

### 3. Warnings placement / scroll
Keep mandatory §3 warnings at the top, but make them easy to scroll past so the primary action is reachable quickly on a phone WebView.

### 4. DeFi Wallet next-step (placeholder)
Near create flow, tell the user that in theory they open their **Wallet in Telegram DeFi Account** next. Include a **greyed-out / disabled** link or button (not working yet — no live deep link required in this pass). Do not add Telegram JS bridge or remote loads.

### 5. Copy test seed phrase button
Add a button that fills/copies the **public §9 test mnemonic only**, derived at runtime from fixed entropy `00010203…1f` (do not hard-code a “real” mnemonic string in source if avoidable — derive via `@scure/bip39` like tests). Label it clearly as disposable test words with no funds.

### 6. More appealing UI
Restyle for a cleaner mobile Mini App look (`src/style.css` + light `src/main.ts` structure). Constraints:
- Still vanilla DOM/CSS, no framework
- Keep all stable DOM IDs from `AGENTS.md` §7
- Keep verbatim §3 warning texts
- No cards-heavy dashboard; one clear job per screen/section
- No purple-glow / generic AI aesthetic; pick a simple calm mobile look suitable for a security tool

## Acceptance for this backlog pass

- `npm run verify` still PASS
- Existing e2e crypto checkpoint still PASS (extend assertions for new UI affordances where stable)
- No secrets, no `window.Telegram`, no persistence, no app-initiated network
- Redeploy note for owner after green verify

## Out of scope (do not do)

- Changing SLIP-39 / BIP-39 logic
- Backend, analytics, QR, Copy all, configurable thresholds
- Enabling a real DeFi Wallet deep link without separate owner approval
