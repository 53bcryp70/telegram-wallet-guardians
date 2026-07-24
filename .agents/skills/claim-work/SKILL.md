---
name: claim-work
description: Claim file paths in AGENT_CLAIMS.md before editing so Codex and Cursor do not conflict. Use when starting implementation or working in parallel with Cursor.
---

# Claim work

## Steps

1. Read `AGENT_CLAIMS.md`, `roles.md`, `docs/coordination.md`.
2. Abort if overlapping `active` claim exists (unless user overrides).
3. Append:

```markdown
| <ISO-UTC> | codex | <short task> | <paths or globs> | active |
```

4. Edit only claimed paths; mark `done` / `blocked` when finished.

## Recommended claims by stage

| Stage | Claim globs |
|-------|-------------|
| Vendor + crypto | `public/vendor/**`, `src/bip39.ts`, `src/slip39.ts`, `src/vendor-global.d.ts`, `tests/**`, `e2e/**`, `VENDOR_NOTES.md` |
| Toolchain | `package.json`, `package-lock.json`, `tsconfig.json`, `vite.config.ts`, `playwright.config.ts` |
| UI | `src/main.ts`, `src/style.css`, `index.html` |
| Skills | `.agents/skills/**` |

Prefer one lane per claim. Do not claim `.cursor/**` (Cursor-owned).
