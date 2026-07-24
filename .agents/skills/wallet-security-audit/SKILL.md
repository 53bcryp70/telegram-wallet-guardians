---
name: wallet-security-audit
description: Audit wallet, signing, guardian approval, and fund-moving paths for security issues. Use when reviewing custody code, changing thresholds, adding transfers, or before merge of security-sensitive changes.
---

# Wallet security audit

## Focus

- Key/material handling (no leakage to logs, Telegram, or git)
- Confirmation steps for irreversible actions
- Threshold / multisig / guardian membership changes
- Allowlists, amount limits, replay / idempotency
- Authn of Telegram users vs wallet authorities

## Output

Report findings as:

- **Critical** — must fix before merge
- **High** — fix soon; document risk if deferred
- **Medium / Low** — suggestions

For each finding: location, risk, recommended fix. Prefer patching Critical issues in-claim; otherwise `$handoff` to Cursor with blockers listed.
