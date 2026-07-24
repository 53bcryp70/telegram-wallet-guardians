# Local Seed Shares — Authoritative Implementation Brief

This repository is a **12-hour hackathon prototype**, not a production wallet-security product. These instructions are authoritative for product scope and implementation. If another file conflicts with this brief on product/crypto rules, **this file wins**. Do not add product code until the cryptographic checkpoint in section 8 passes.

## Dual agents (Cursor + Codex)

Both agents work in this repo. **Proposed roles** (full detail in [`roles.md`](roles.md)):

| Agent | Codename | Job |
|-------|----------|-----|
| **Codex** | **Builder** | Implement exactly per this brief; vendor pin; section 8 checkpoint; `npm run verify` |
| **Cursor** | **Guardian / Orchestrator** | Claims/handoffs, scope guard, review against this brief, `.cursor/` config |

Protocol: [`docs/coordination.md`](docs/coordination.md). Boards: [`AGENT_CLAIMS.md`](AGENT_CLAIMS.md), [`AGENT_HANDOFF.md`](AGENT_HANDOFF.md).

### Brief-lock

Neither agent may change **product or cryptographic requirements** in this file without **explicit user approval**. Coordination/role wording above may be refined; sections 1–11 stay locked unless the user says otherwise.

### Before you change code

1. Read [`AGENT_CLAIMS.md`](AGENT_CLAIMS.md).
2. Claim the paths you will edit (status `active`).
3. Do not edit paths another agent has claimed unless `done` or the user overrides.
4. When finished: mark claim `done`, update [`AGENT_HANDOFF.md`](AGENT_HANDOFF.md) if needed.

### Skill indexes

- Cursor: [`skills-for-cursor.md`](skills-for-cursor.md) → `.cursor/skills/`
- Codex: [`specific-skills-for-codex.md`](specific-skills-for-codex.md) → `.agents/skills/`

**This repository is public.** Never commit secrets (`.env`, private keys, bot tokens, API/access keys, deploy credentials, funded/user seed phrases) — git history is permanent. Owner-only inputs (approvals, credentials, device tests) are listed in [`HUMAN_INPUT.md`](HUMAN_INPUT.md); request them from the user, never store them. Allowed test material: section 9 fixed public entropy + pinned public SLIP-39 vector 23 only. Crypto lane stays single-threaded under Codex.

---

## 1. Product and hard boundary

Build **Local Seed Shares**, a static Telegram Main Mini App. It performs exactly this workflow:

```text
English 24-word BIP-39 phrase
  -> normalize and validate
  -> 32-byte BIP-39 entropy
  -> one SLIP-39 group, 2-of-3 member split
  -> three 33-word, non-extendable SLIP-39 shares

exactly two compatible shares
  -> 32-byte entropy
  -> canonical English 24-word BIP-39 phrase
```

The application supports only English 24-word BIP-39 phrases intended for Wallet in Telegram's DeFi Account. It splits BIP-39 *entropy*, not `mnemonicToSeed`, the PBKDF2 wallet seed, private keys, addresses, or accounts.

After the initial same-origin static files load, all normalization, validation, secure randomness, SLIP-39 splitting, pair verification, recovery, and clipboard writes run locally in the browser/WebView. The application makes no application-initiated network requests and does not intentionally transmit or persist phrases or shares.

The initial HTTPS static download is unavoidable. Never say the app "never uses the network." Use this wording instead:

> The application files are downloaded from the static host when the Mini App opens. After loading, cryptographic processing happens locally on this device. The app makes no application-initiated network requests and does not intentionally transmit or save your phrase or shares.

## 2. Strict scope

Implement only:

- Fixed one-group 2-of-3 SLIP-39 sharing.
- Exactly three generated 33-word shares.
- Recovery from exactly two shares.
- Empty SLIP-39 passphrase in production.
- Historic/non-extendable shares produced by the pinned browser bundle.
- A plain Vite + TypeScript + vanilla DOM/CSS app.

Do not implement or add:

- Configurable thresholds, share counts, passphrases, or groups.
- Other BIP-39 word counts, wordlists, arbitrary text, generic TON mnemonics, wallet connection/import/creation, key/address derivation, or blockchain access.
- Backend, API, serverless function, webhook, polling bot, database, account system, bot token, analytics, telemetry, advertising, error reporting, or Telegram user data.
- Telegram JavaScript bridge, `window.Telegram`, Telegram storage, `sendData`, `answerWebAppQuery`, or Telegram share URLs.
- Persistent storage: localStorage, sessionStorage, IndexedDB, cookies, Cache Storage, service workers, URL/query/fragment state, page-title state, or console logging of sensitive data.
- `fetch`, XMLHttpRequest, WebSocket, EventSource, sendBeacon, WebTransport, RTCPeerConnection, dynamic remote imports, remote scripts, styles, fonts, images, CDNs, QR codes, file downloads, bulk exports, direct chat sending, recipient pickers, or `Copy all`.
- Hand-written cryptographic primitives, manual SLIP-39 parsing, a second checksum/identifier parser, or an incompatible custom Shamir format.

Never use `Math.random` for security-sensitive data. Never use a real wallet phrase in tests, docs, logs, screenshots, or commits.

## 3. Required visible warnings

Display prominently:

> Hackathon prototype. Use only with a disposable test wallet containing no real funds.

> Supports only the English 24-word BIP-39 recovery phrase from Wallet in Telegram's DeFi Account.

> These shares reconstruct your original 24-word phrase through Local Seed Shares. Do not enter them directly into Trezor or another wallet's SLIP-39 recovery flow because that may restore a different wallet.

Near shares display:

> Anyone with two shares can recover the wallet phrase. Do not send or store two shares through the same Telegram account, chat, device, or storage location.

> Normal Telegram Cloud Chats are stored in Telegram's cloud. When chat transfer is necessary, prefer a Secret Chat and keep the shares separated.

Also state the project is not affiliated with or approved by Telegram, Wallet in Telegram, Trezor, SatoshiLabs, or Ian Coleman.

## 4. Toolchain and dependencies

Require Node.js `>=22.12.0` and npm. Add this engines field:

```json
{ "engines": { "node": ">=22.12.0" } }
```

Use exact versions:

```bash
npm install --save-exact @scure/bip39@2.2.0
npm install --save-dev --save-exact vite@8.1.5 typescript@7.0.2 vitest@4.1.10 @playwright/test@1.61.1 @types/node@22.20.1
npx playwright install chromium
```

Commit the resulting `package-lock.json`. Do not add `slip39` as an npm dependency or add broad Node/browser polyfill packages.

Use Vite TypeScript with `base: "./"` and production source maps disabled:

```ts
export default defineConfig({ base: "./", build: { sourcemap: false } });
```

The final Mini App URL must end in `/` or redirect to one. Telegram query parameters must be ignored; never read `tgWebAppData`, `tgWebAppVersion`, `tgWebAppPlatform`, `tgWebAppThemeParams`, or `tgWebAppStartParam`.

## 5. Pinned SLIP-39 vendor artifact

Use exactly this artifact, unmodified:

```text
Repository: iancoleman/slip39
Release: 0.0.3
Commit: 14a2e631acbf1fd51b68324827bac9cdc83cb178
Bundle path: src/js/slip39-libs.js
Bundle Git blob SHA: 7dd2f48649dbb7a316b4c49e2fa8098d4edbc7a3
License path: LICENSE
License Git blob SHA: a7d8d0bbcd7d7b75a9e672ba8ce8323ad8ae00a8
License: MIT
```

Place the exact files at:

```text
public/vendor/slip39-libs.js
public/vendor/LICENSE-iancoleman-slip39.txt
```

Acquire and verify during implementation:

```bash
curl --fail --location "https://raw.githubusercontent.com/iancoleman/slip39/14a2e631acbf1fd51b68324827bac9cdc83cb178/src/js/slip39-libs.js" --output public/vendor/slip39-libs.js
curl --fail --location "https://raw.githubusercontent.com/iancoleman/slip39/14a2e631acbf1fd51b68324827bac9cdc83cb178/LICENSE" --output public/vendor/LICENSE-iancoleman-slip39.txt
git hash-object public/vendor/slip39-libs.js
git hash-object public/vendor/LICENSE-iancoleman-slip39.txt
sha256sum public/vendor/slip39-libs.js
```

The two Git blob hashes must match above. If either does not match, delete the downloaded vendor files, stop, and report a vendor-integrity failure. Record the SHA-256 in `VENDOR_NOTES.md`.

Do not modify, reformat, minify, patch, tree-shake, modernize, or import the bundle into Node/Vitest. Do not copy the Ian Coleman UI, jQuery, Bootstrap, or styles. The bundle is experimental, modifies built-in prototypes, and creates historic non-extendable shares. Application code accesses it only through `src/slip39.ts`.

Load it as a classic same-origin script before Vite's module at the end of `index.html`:

```html
<script src="%BASE_URL%vendor/slip39-libs.js"></script>
<script type="module" src="/src/main.ts"></script>
```

Do not load it dynamically. If `window.slip39libs?.slip39` is missing, visibly show: `SLIP-39 engine failed to load. Reload the application.` and set `document.documentElement.dataset.appReady = "error"`.

Avoid `for...in` over arrays or strings everywhere in application/test code because the vendor bundle modifies prototypes. Use `for...of`, `map`, `forEach`, and `every`.

## 6. Required source shape and interfaces

Create only the small structure below unless a file is truly essential:

```text
index.html
public/vendor/slip39-libs.js
public/vendor/LICENSE-iancoleman-slip39.txt
public/licenses/
src/main.ts
src/style.css
src/bip39.ts
src/slip39.ts
src/vendor-global.d.ts
tests/bip39.test.ts
tests/fixtures/slip39-vector-23.json
e2e/app.spec.ts
README.md
VENDOR_NOTES.md
THIRD_PARTY_NOTICES.md
TELEGRAM_SETUP.md
package.json
package-lock.json
tsconfig.json
vite.config.ts
playwright.config.ts
```

`src/vendor-global.d.ts` declares only the vendor API actually used: `window.slip39libs.slip39.fromArray`, `fromPath`, and `recoverSecret`.

`src/bip39.ts` exports:

```ts
normalizeMnemonic(input: string): string
validate24WordMnemonic(input: string): { ok: boolean; normalized?: string; error?: string }
mnemonicTo32ByteEntropy(normalizedMnemonic: string): Uint8Array
entropyTo24WordMnemonic(entropy: Uint8Array): string
```

Use only:

```ts
import { entropyToMnemonic, mnemonicToEntropy, validateMnemonic } from "@scure/bip39";
import { wordlist } from "@scure/bip39/wordlists/english.js";
```

Normalize using NFKD, trim, whitespace collapse, then lowercase. Require exactly 24 words, English wordlist membership, valid checksum, and exactly 32 entropy bytes. Do not autocorrect, remove punctuation, or echo full input in errors.

`src/slip39.ts` exports only:

```ts
type ShareTriplet = readonly [string, string, string];
generateTwoOfThree(entropy: Uint8Array): ShareTriplet;
recoverTwoOfThree(shareA: string, shareB: string): Uint8Array;
```

Production generation requires exactly 32 bytes and calls:

```ts
getSlip39().fromArray(Array.from(entropy), {
  passphrase: "",
  threshold: 1,
  groups: [[2, 3, "Local Seed Shares"]],
  iterationExponent: 0,
  title: "Local Seed Shares"
}).fromPath("r/0").mnemonics;
```

This means one group, group threshold 1, three members, member threshold 2, empty passphrase, iteration exponent 0, and non-extendable behavior from the pinned bundle. Never use three `[1, 1]` groups.

Normalize generated shares; require exactly three, exactly 33 words each, and return a tuple. Recovery normalizes two shares, requires 33 words and non-identical strings, invokes `recoverSecret([a, b], "")`, then requires exactly 32 output bytes. Do not manually parse metadata. Convert vendor errors into `Enter two different compatible 33-word shares from the same set.`

Use in-memory state only:

```ts
type AppState = {
  busy: boolean;
  generatedShares: [string, string, string] | null;
  recoveredMnemonic: string | null;
};
```

Do not expose secrets on `window`.

## 7. Minimal UI and exact behavior

Build one simple mobile-friendly page with two stacked sections, not a framework, tabs, cards, animations, settings, or dialogs.

### Create shares

Provide a password input, reveal/hide control, word count, `Create 3 shares`, and `Clear`. Use `autocomplete="off"`, `autocapitalize="none"`, `spellcheck="false"`, `translate="no"`, and `lang="en"`. Never call `navigator.clipboard.readText()`.

On creation:

1. Validate and decode the 24 words.
2. Ensure `globalThis.crypto?.getRandomValues` exists before calling the vendor engine; otherwise show `Secure random-number generation is unavailable.`
3. Generate shares.
4. Recover every pair (1+2, 1+3, 2+3) and compare byte-for-byte with original entropy.
5. If any check fails, show no shares, clear sensitive state/input, and show `Share verification failed. No shares were displayed.`
6. Only then clear the original phrase and show three hidden readonly share fields.

Each share has one copy button. Copy only its normalized 33 words with single spaces—no label, number, punctuation, or warning. No Copy All exists. Clipboard writes happen only in explicit button handlers via `navigator.clipboard.writeText`. If a write fails, leave/reveal only the relevant readonly field, select it, and show `Copy failed. Select the text and copy it manually.`

### Recover phrase

Provide two password inputs, each with reveal/hide and word count, `Recover 24 words`, and `Clear`. Require exactly two different compatible 33-word shares. Recover using the empty passphrase, require 32 bytes, convert to a valid 24-word English phrase, and display it hidden with explicit reveal/copy/clear actions. Before copying state: `Copying places the complete wallet recovery phrase in your device clipboard.`

Use stable DOM IDs:

```text
seed-input, seed-reveal, create-shares, clear-seed, split-error,
share-section, share-1, share-2, share-3, copy-share-1, copy-share-2, copy-share-3,
recover-share-a, recover-share-b, recover-button, recover-error,
recovered-seed, recovered-seed-reveal, copy-recovered-seed, clear-recovery,
status-message
```

Install listeners, validate vendor availability, then set `document.documentElement.dataset.appReady = "true"`.

When hidden via `visibilitychange`, change sensitive inputs to password mode and hide generated share text and recovered phrase but retain shares while the same page stays alive. On a new page load state is empty. Explicit clear removes visible text/references and overwrites mutable byte arrays where practical. Never promise complete JavaScript memory zeroization.

Use a busy state for synchronous crypto. Before create/recover, disable both operation buttons, set a container `aria-busy="true"`, display `Creating and verifying shares…` or `Recovering phrase…`, await one `requestAnimationFrame`, then do work. Always restore controls in `finally`.

Use these safe user-facing errors only:

```text
Enter exactly 24 English BIP-39 words.
The recovery phrase contains an unknown word or invalid character.
The recovery phrase checksum is invalid.
The phrase did not decode to 32 bytes.
Enter two shares.
Each share must contain exactly 33 words.
Enter two different compatible 33-word shares from the same set.
Recovered data did not contain 32 bytes.
SLIP-39 engine failed to load. Reload the application.
Secure random-number generation is unavailable.
Share verification failed. No shares were displayed.
Copy failed. Select the text and copy it manually.
```

## 8. Mandatory first checkpoint

Before styling or full UI work, prove in Chromium that:

1. The vendor global exists.
2. Official vector 23 recovers correctly.
3. Fixed test entropy generates three 33-word shares.
4. Every two-share pair recovers it.
5. Generation reaches `crypto.getRandomValues`.
6. No remote resource is loaded.

If this checkpoint fails, stop and report the exact technical blocker. Do not fake shares, redesign the cryptography, or substitute an incompatible scheme.

## 9. Tests and test-only data

Use the public, fixed test entropy only:

```text
000102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f
```

Derive its mnemonic during tests using `entropyToMnemonic`; never hard-code a supposedly real mnemonic.

Vitest is for BIP-39 only: normalization, valid phrase, invalid checksum, wrong count, and 32-byte phrase/entropy round trip.

Playwright Chromium is for all vendor/SLIP-39 work and the UI. Test vendor loading, the official vector, fixed 2-of-3 generation, all three recovery pairs, one-share clipboard copying, absence of Copy All, full split/recover UI, and no post-load network request. Do not force the classic browser global into Node/Vitest.

Vendor this exact fixture at `tests/fixtures/slip39-vector-23.json`:

```json
{
  "name": "23. Basic sharing 2-of-3 (256 bits)",
  "mnemonics": [
    "humidity disease academic always aluminum jewelry energy woman receiver strategy amuse duckling lying evidence network walnut tactics forget hairy rebound impulse brother survive clothes stadium mailman rival ocean reward venture always armed unwrap",
    "humidity disease academic agency actress jacket gross physics cylinder solution fake mortgage benefit public busy prepare sharp friar change work slow purchase ruler again tricycle involve viral wireless mixture anatomy desert cargo upgrade"
  ],
  "passphrase": "TREZOR",
  "expectedMasterSecretHex": "c938b319067687e990e05e0da0ecce1278f75ff58d9853f19dcaeed5de104aae"
}
```

This fixture is compatibility-only. Production adapter functions never accept a passphrase; use the vendor global directly in the Playwright fixture test with `TREZOR`.

For the positive randomness proof, before page navigation use `context.addInitScript` to wrap `Crypto.prototype.getRandomValues`, increment `window.__secureRandomCalls`, and preserve original behavior. Generate shares and require the count be above zero. Do not make Web Crypto removal a mandatory test. Use browser context clipboard permissions only in e2e tests; application source never reads clipboard.

Configure Playwright against `npm run preview -- --host 127.0.0.1` on port 4173. Use Chromium only, `test.setTimeout(60_000)`, expect timeout at least 15 seconds, and DOM-state waits rather than arbitrary sleeps.

For network testing: attach listeners before navigation, allow only initial same-origin HTTP requests, wait for `data-app-ready="true"`, clear the request record, execute split and recovery, then require zero new network requests. Ignore browser-internal `about:`, `data:`, and `blob:` URLs.

## 10. Build, CSP, licenses, and docs

Use scripts:

```json
{
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "typecheck": "tsc --noEmit",
  "test": "vitest run",
  "test:e2e": "playwright test",
  "verify": "npm run typecheck && npm run test && npm run build && npm run test:e2e"
}
```

Run `npm run verify` and fix all failures before reporting code completion. The production app must contain `dist/index.html` and `dist/vendor/slip39-libs.js`.

For the prototype, use only same-origin bundled assets and this CSP when serving production:

```text
default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; font-src 'none'; connect-src 'none'; object-src 'none'; base-uri 'none'; form-action 'none';
```

Do not set `X-Frame-Options`. Do not place `frame-ancestors` in a meta tag. Do not apply `connect-src 'none'` to normal Vite dev server behavior.

Copy installed dependency licenses into `public/licenses/` as `LICENSE-scure-bip39.txt`, `LICENSE-scure-base.txt`, and `LICENSE-noble-hashes.txt`; include the vendor license too. Create `THIRD_PARTY_NOTICES.md` listing vendor and runtime dependencies, version/license/repository/purpose. Note that a complete legal audit of embedded historic Browserify dependencies is outside hackathon scope.

Keep docs concise: README (scope, warning, local boundary, commands), VENDOR_NOTES (pin, hashes, license, SHA-256, prototype modifications, non-extendable/experimental limitations), THIRD_PARTY_NOTICES, and TELEGRAM_SETUP (BotFather + static hosting only).

## 11. Telegram and release rules

Telegram is a launcher only. Deployment is a static HTTPS host. The owner must create a bot in BotFather, keep its token out of the repository, configure the Main Mini App with the trailing-slash production URL, and manually test a mobile client. No webhook, polling process, backend, or bridge is needed.

Code completion is not blocked by unavailable owner credentials. It requires `npm run verify` passing, `dist/index.html`, `dist/vendor/slip39-libs.js`, `dist/licenses/`, and the four documentation files. Report external deployment, bot creation, BotFather configuration, and physical-device testing separately as pending unless actually performed.

Final report format:

```text
Build: PASS or FAIL
Typecheck: PASS or FAIL
BIP-39 tests: PASS or FAIL
Official SLIP-39 vector 23: PASS or FAIL
Generated 2-of-3 round trip: PASS or FAIL
Secure randomness test: PASS or FAIL
Chromium interface test: PASS or FAIL
Post-load network requests: PASS or FAIL
Production directory: dist/
Vendor SHA-256: <value>
Static deployment: pending or complete
Telegram bot creation: pending or complete
BotFather Main Mini App configuration: pending or complete
Physical-device test: pending or complete
```

End every final report with:

> Hackathon prototype only. It uses pinned experimental, non-extendable browser SLIP-39 code and has not been independently reviewed. Do not use it with real wallet funds.
