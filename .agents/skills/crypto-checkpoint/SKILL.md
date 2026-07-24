---
name: crypto-checkpoint
description: Run and report the AGENTS.md section 8 cryptographic checkpoint (vendor global, vector 23, 2-of-3 round trip, getRandomValues, no remote loads). Use before UI polish or when verifying SLIP-39 integrity.
---

# Crypto checkpoint

Prove these in **Chromium** before treating crypto as done (`AGENTS.md` §8–9).

## Checklist

Copy and fill:

```text
[ ] 1 Vendor global window.slip39libs.slip39 exists
[ ] 2 Official vector 23 recovers (fixture TREZOR passphrase in test only)
[ ] 3 Fixed test entropy -> three 33-word shares
[ ] 4 Pairs 1+2, 1+3, 2+3 recover entropy byte-for-byte
[ ] 5 crypto.getRandomValues reached during generation (initScript counter)
[ ] 6 No post-load remote network requests
```

## Fixed test entropy only

```text
000102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f
```

Derive mnemonic via `entropyToMnemonic` in tests — never hard-code a “real” phrase.

## Fixture

Use `tests/fixtures/slip39-vector-23.json` exactly as specified in `AGENTS.md` §9. Production adapters never take a passphrase; the Playwright vector test may call the vendor global with `TREZOR`.

## Rules

- Do not force the classic browser global into Node/Vitest
- Do not fake PASS, redesign crypto, or swap libraries
- On any FAIL: stop, write blocker into `AGENT_HANDOFF.md`, status `blocked` on claim

## Output

```text
Crypto checkpoint
1 Vendor global: PASS|FAIL — notes
2 Vector 23: PASS|FAIL
3 Generate 2-of-3: PASS|FAIL
4 Pair round trips: PASS|FAIL
5 getRandomValues: PASS|FAIL
6 Post-load network: PASS|FAIL
Vendor SHA-256: …
Next: UI | fix blocker | handoff Cursor
```
