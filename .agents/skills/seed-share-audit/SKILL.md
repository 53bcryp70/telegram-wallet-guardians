---
name: seed-share-audit
description: Audit Local Seed Shares code for scope and secret-handling issues (network, storage, Telegram bridge, real mnemonics, vendor pin). Use before merge or after large src/ changes.
---

# Seed-share audit

Scan changed files (and quickly grep the tree) against `AGENTS.md` §2–3, §5, §7.

## Grep targets (examples)

```bash
rg -n "fetch\\(|XMLHttpRequest|WebSocket|localStorage|sessionStorage|indexedDB|window\\.Telegram|sendBeacon|Math\\.random|mnemonicToSeed|slip39" src e2e index.html
rg -n "Copy all|copy-all|clipboard\\.read" src e2e
```

## Severity guide

| Level | Examples |
|-------|----------|
| **Critical** | Network/storage/bridge added; funded/user mnemonic committed; vendor modified; clipboard read of seed |
| **High** | Missing confirmation/warning copy; Copy All; wrong threshold/groups; passphrase in prod path |
| **Medium** | `for...in` on arrays/strings; secrets on `window`; weak clear/busy handling |
| **Low** | Doc drift, non-blocking a11y |

## Fixture allowlist (`AGENTS.md` §9)

Do **not** flag: fixed public entropy `00010203…1f`, or `tests/fixtures/slip39-vector-23.json` (TREZOR only in that compatibility test). Flag any other mnemonic-looking fixtures.

## Vendor

Confirm blob SHAs from §5 and SHA-256 recorded in `VENDOR_NOTES.md`. Bundle must remain unmodified.

## Output

```markdown
## Seed-share audit
### Critical
### High
### Medium / Low
### Verdict: merge-ready | blocked
```

Patch Critical in-claim when safe; else `$handoff` with blockers.
