---
name: review-for-merge
description: Review a Local Seed Shares change or handoff for merge readiness against AGENTS.md, claims, secrets, and verify status. Use before merge, after Codex finishes, or when the user asks for review.
---

# Review for merge

Run after Codex handoff or before push/merge. Pair with `scope-guard` first.

## Checklist

### Process

- [ ] Diff matches `AGENT_HANDOFF.md` goal and `AGENT_CLAIMS.md` paths
- [ ] No stale `active` claims for this work
- [ ] Handoff lists how to re-verify

### Scope & secrets

- [ ] `scope-guard` verdict is PASS
- [ ] No `.env`, tokens, funded/user mnemonics, private keys
- [ ] Test data uses only §9 allowlist: fixed public entropy and/or pinned `slip39-vector-23.json`

### Crypto / vendor (if touched)

- [ ] `public/vendor/slip39-libs.js` blob SHA matches brief
- [ ] License file present; `VENDOR_NOTES.md` has SHA-256
- [ ] App accesses vendor only via `src/slip39.ts`
- [ ] Section 8 checkpoint reported PASS (or Explicit blockers)

### UI (if touched)

- [ ] Required DOM IDs from §7 present
- [ ] Hackathon / disposable-wallet warnings present
- [ ] No Copy All; per-share copy only
- [ ] No clipboard read in app source

### Verify

- [ ] `npm run verify` PASS, or handoff lists exact FAIL lines
- [ ] Production paths noted: `dist/index.html`, `dist/vendor/slip39-libs.js`

## Output

```markdown
## Review

**Verdict:** approve | request changes

### Critical
### Suggestions
### Nice-to-have
```

Do not implement Codex-owned crypto fixes unless the user reassigns Cursor.
