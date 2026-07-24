---
name: run-tests
description: Run Local Seed Shares verification (typecheck, Vitest, build, Playwright) via npm run verify when available. Use after implementation or before handoff.
---

# Run tests

## Preferred

```bash
npm run verify
```

That should equal: typecheck + Vitest + build + Playwright (`AGENTS.md` §10).

## If scripts are partial

Run what exists, in order:

1. `npm run typecheck`
2. `npm run test` (Vitest — BIP-39 only)
3. `npm run build` — confirm `dist/index.html` and `dist/vendor/slip39-libs.js`
4. `npm run test:e2e` (Playwright Chromium, preview `:4173`)

## Fix policy

- Fix failures caused by your change
- Do not broaden scope to silence tests
- Do not weaken assertions to greenwash §8

## Report (map to §11)

```text
Typecheck: PASS|FAIL
BIP-39 tests: PASS|FAIL
Official SLIP-39 vector 23: PASS|FAIL
Generated 2-of-3 round trip: PASS|FAIL
Secure randomness test: PASS|FAIL
Chromium interface test: PASS|FAIL
Post-load network requests: PASS|FAIL
Production directory: dist/
Vendor SHA-256: <value>
```

Then `$handoff` or continue fixing.

## Until toolchain exists

State that clearly; scaffold with `$implement-feature` using exact versions from §4 — no alternate stacks.
