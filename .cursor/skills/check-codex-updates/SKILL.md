---
name: check-codex-updates
description: Fetch the guardians remote and summarize Codex commits or role/skill proposals that landed. Use when waiting on Codex review, checking for pushed role changes, or syncing before editing shared docs.
---

# Check Codex updates

## Steps

1. `git fetch guardians` (or `origin` if that tracks `telegram-wallet-guardians`).
2. Compare: `git log --oneline HEAD..guardians/main` and `guardians/main..HEAD`.
3. If remote is ahead, inspect role/skill docs:

```bash
git log --oneline HEAD..guardians/main -- roles.md AGENTS.md .agents/skills .cursor AGENT_HANDOFF.md
git diff HEAD...guardians/main -- roles.md specific-skills-for-codex.md .agents/skills
```

4. Summarize for the user: commits, files, proposed role deltas, whether to merge now.
5. Do **not** merge/rebase unless the user asks.
6. If remote unchanged, say so and continue other Cursor work (skills/review).

## Output

```markdown
## Remote check
- Tracking: …
- Codex new commits: none | list
- Role/skill proposals: none | summary
- Action: wait | review diff | ask user to merge
```
