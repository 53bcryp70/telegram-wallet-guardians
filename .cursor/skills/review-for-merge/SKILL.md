---
name: review-for-merge
description: Review a change or handoff for merge readiness against roles, claims, secrets, and acceptance criteria. Use before merge, after Codex finishes a handoff, or when the user asks for a review.
---

# Review for merge

## Checklist

- [ ] Diff matches the claimed paths / handoff goal
- [ ] No secrets, tokens, keys, or seed material
- [ ] Dangerous Telegram actions have confirmations
- [ ] Wallet/guardian behavior matches the spec
- [ ] Tests or manual checks noted in handoff/PR
- [ ] `AGENT_CLAIMS.md` has no stale `active` rows for this work
- [ ] `roles.md` boundaries respected (or intentional exception documented)

## Output

List findings as Critical / Suggestion / Nice-to-have. Do not implement Codex-owned fixes unless the user asks Cursor to take them.
