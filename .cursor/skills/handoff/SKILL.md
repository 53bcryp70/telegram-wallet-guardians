---
name: handoff
description: Write a Cursor→Codex or Codex→Cursor handoff in AGENT_HANDOFF.md. Use when passing work to the other agent, finishing a partial task, or asking Codex to implement a plan.
---

# Handoff

## Steps

1. Mark your `AGENT_CLAIMS.md` row `done` (or leave `blocked` with reason).
2. Replace the **Current handoff** section in `AGENT_HANDOFF.md` with:

- From / To / Updated (UTC)
- Goal
- Done so far
- Files touched
- Next steps
- Acceptance criteria
- Notes / risks

3. Move the previous current handoff into **History** if useful (keep it short).
4. Tell the user the receiving agent is next (do not impersonate the other agent).

## Good handoffs

- Concrete paths and acceptance checks
- Explicit out-of-scope items
- Security risks called out for wallet/Telegram money paths
