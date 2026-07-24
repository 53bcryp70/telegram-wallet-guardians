# Local Seed Shares

Hackathon prototype for a static Telegram Mini App. It will accept an English 24-word BIP-39 phrase, create a fixed one-group 2-of-3 set of three 33-word non-extendable SLIP-39 shares, and restore the original phrase from exactly two shares.

The initial app files load from a static HTTPS host. After that, cryptographic processing is local; the planned app has no backend, storage, Telegram bridge, analytics, or application-initiated network requests.

> Hackathon prototype only. Use only with a disposable test wallet containing no real funds.

Implementation requirements, dependencies, validation gates, test fixtures, and release rules are authoritative in [AGENTS.md](AGENTS.md).

Planned commands after implementation:

```bash
npm run verify
npm run build
```

Do not enter shares directly into another wallet's SLIP-39 recovery flow. Recover the original 24 words through this app first.
