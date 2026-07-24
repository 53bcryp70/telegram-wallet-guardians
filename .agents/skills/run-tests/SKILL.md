---
name: run-tests
description: Run and fix the project test suite for telegram-wallet-guardians. Use when verifying a change, after implementation, or before handing off for merge.
---

# Run tests

## Steps

1. Detect the stack (`package.json`, `pyproject.toml`, `go.mod`, etc.).
2. Run the standard test command for this repo (document it in the handoff if missing).
3. Fix failures caused by your change; do not broaden scope.
4. Summarize: command used, pass/fail, any skipped tests.

## Until app code exists

If there is no test runner yet, say so and add a minimal placeholder only if the user asked for scaffolding.
