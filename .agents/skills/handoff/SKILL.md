---
name: handoff
description: Write a Codex→Cursor handoff in AGENT_HANDOFF.md. Use when checkpoint evidence is ready, verify finished, or Cursor must review/scope-guard.
---

# Handoff

## Steps

1. Mark claim `done` or `blocked`.
2. Replace **Current handoff** in `AGENT_HANDOFF.md`.
3. Stop; do not continue as Cursor.

## Include

- Goal + stage completed (vendor / §8 / UI / verify)
- Files touched
- Commands run + PASS/FAIL (use §11 lines when possible)
- Vendor SHA-256 if crypto touched
- Exact next steps for Cursor (`scope-guard`, `review-for-merge`)
- Blockers in plain language

## Template

```markdown
**From:** codex
**To:** cursor
**Updated:** <ISO-UTC>

### Goal
### Done so far
### Files touched
### Next steps (for receiving agent)
### Acceptance criteria
### Notes / risks
```
