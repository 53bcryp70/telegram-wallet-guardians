# Agent claims

Live lockboard so Cursor and Codex do not edit the same paths. Protocol: [`docs/coordination.md`](docs/coordination.md). Roles: [`roles.md`](roles.md).

Status values: `active` | `done` | `blocked` | `stale`

| When (UTC) | Agent | Task | Paths / globs | Status |
|------------|-------|------|---------------|--------|
| 2026-07-25T17:20Z | codex | Review external BackupBuddy.io partner link and record authorization blocker | AGENT_CLAIMS.md, AGENT_HANDOFF.md | done |
| 2026-07-25T17:00Z | cursor | Rewrite product-facing README | README.md, AGENT_CLAIMS.md | done |
| 2026-07-25T16:56Z | cursor | Record owner NO to TON mnemonic support for hackathon | AGENT_HANDOFF.md, AGENT_CLAIMS.md | done |
| 2026-07-25T16:55Z | cursor | Merge Codex bare-share fix with ready-to-send + random test phrase | src/main.ts, e2e/app.spec.ts, AGENT_*.md | done |
| 2026-07-25T16:40Z | codex | Restore bare 33-word `Copy share` output and separate guardian-message action | src/main.ts, e2e/app.spec.ts, AGENT_CLAIMS.md, AGENT_HANDOFF.md | done |
| 2026-07-25T16:45Z | cursor | Owner: random disposable BIP-39 for test-phrase button (Codex review) | src/main.ts, e2e/app.spec.ts, AGENT_*.md, docs/ux-backlog-post-telegram.md | done |
| 2026-07-25T13:10Z | codex | Review Cursor's combined Copy share message against the locked SLIP-39 clipboard contract; hand off correction | AGENT_CLAIMS.md, AGENT_HANDOFF.md | done |
| 2026-07-25T11:45Z | cursor | Owner: institution only on create; DeFi note above seed input | src/main.ts, e2e/app.spec.ts, AGENT_*.md | done |
| 2026-07-25T11:20Z | cursor | Owner-assigned: implement UX backlog (Codex idle) | src/main.ts, src/style.css, e2e/app.spec.ts, AGENT_*.md | done |
| 2026-07-25T11:15Z | cursor | Record Telegram PASS + UX backlog for Codex | docs/ux-backlog-post-telegram.md, AGENT_*.md, HUMAN_INPUT.md | done |
| 2026-07-25T10:00Z | codex | Review Cursor Secret Chat guidance and hand off one lifecycle wording correction | AGENT_CLAIMS.md, AGENT_HANDOFF.md | done |
| 2026-07-25T10:40Z | cursor | Approve + apply Codex Secret Chat wording correction | src/main.ts, AGENT_*.md | done |
| 2026-07-25T09:40Z | cursor | Batch-mixing warning near shares — cancelled by owner (minimize flow suffices) | src/main.ts, e2e/app.spec.ts, AGENT_*.md | done |
| 2026-07-24T22:30Z | cursor | User-approved: add Secret Chat/self-destruct transfer guidance near shares | src/main.ts, AGENT_*.md | done |
| 2026-07-24T22:05Z | cursor | Final merge review: warning fixes verified, independent verify PASS, merge-ready | AGENT_HANDOFF.md, AGENT_CLAIMS.md | done |
| 2026-07-24T21:50Z | cursor | Review prototype commits 1db9026/f5dfd2a; findings in handoff | AGENT_HANDOFF.md, AGENT_CLAIMS.md | done |
| 2026-07-24T22:00Z | codex | Implement crypto lane through section 8 checkpoint | package.json, package-lock.json, tsconfig.json, vite.config.ts, playwright.config.ts, index.html, public/vendor/**, public/licenses/**, src/bip39.ts, src/slip39.ts, src/vendor-global.d.ts, tests/**, e2e/**, VENDOR_NOTES.md, THIRD_PARTY_NOTICES.md, AGENT_*.md | done |
| 2026-07-24T21:13Z | cursor | Record build authorization; hand crypto lane to Codex | HUMAN_INPUT.md, AGENT_HANDOFF.md, AGENT_CLAIMS.md | done |
| 2026-07-24T21:50Z | cursor | Persist role-review adopted/rejected table in AGENT_HANDOFF History for Codex | AGENT_HANDOFF.md, AGENT_CLAIMS.md | done |
| 2026-07-24T21:45Z | cursor | Curate Telegram launcher notes; block generic TMA-guide imports in skills | docs/telegram-launcher-notes.md, TELEGRAM_SETUP.md, .cursor/rules/mini-app-ui.mdc, .cursor/skills/scope-guard/**, .agents/skills/seed-share-audit/**, .agents/skills/implement-feature/** | done |
| 2026-07-24T21:35Z | cursor | Apply Codex §8-gate wording clarification in AGENTS.md preamble | AGENTS.md (preamble), AGENT_CLAIMS.md, AGENT_HANDOFF.md | done |
| 2026-07-24T21:30Z | cursor | Add HUMAN_INPUT.md + public-repo secret hygiene in rules/skills | HUMAN_INPUT.md, README.md, AGENTS.md (preamble), .cursor/rules/project-core.mdc, .cursor/skills/**, .agents/skills/seed-share-audit/** | done |
| 2026-07-24T21:30Z | codex | Final integration review; hand off one pre-code wording correction | AGENT_CLAIMS.md, AGENT_HANDOFF.md | done |
| 2026-07-24T21:20Z | cursor | Apply Codex doc corrections + playwright install step | README.md, TELEGRAM_SETUP.md, AGENT_CLAIMS.md, AGENT_HANDOFF.md | done |
| 2026-07-24T21:15Z | codex | Review Cursor build/deploy documentation proposal and hand off two corrections | AGENT_CLAIMS.md, AGENT_HANDOFF.md | done |
| 2026-07-24T20:55Z | cursor | Review TELEGRAM_SETUP/README; hand improvements to Codex | TELEGRAM_SETUP.md, README.md, AGENT_CLAIMS.md, AGENT_HANDOFF.md | done |
| 2026-07-24T21:05Z | codex | Review Cursor response and record outcome | AGENT_CLAIMS.md, AGENT_HANDOFF.md | done |
| 2026-07-24T20:45Z | cursor | Apply Codex role-review corrections; deepen skills; hand off | roles.md, docs/**, .cursor/**, .agents/skills/**, AGENTS.md, AGENT_*.md, skills-*.md, README.md, .env.example | done |
| 2026-07-24T20:30Z | cursor | Align co-work files + propose Local Seed Shares roles | roles.md, docs/coordination.md, .cursor/**, .agents/skills/**, skills-*.md, AGENT_*.md | done |
| 2026-07-24T20:20Z | codex | Review dual-agent role proposal and hand off required scope corrections to Cursor | AGENT_CLAIMS.md, AGENT_HANDOFF.md | done |
| 2026-07-24T20:05Z | cursor | Scaffold dual-agent rules/skills/docs | AGENTS.md, roles.md, docs/, .cursor/, .agents/, AGENT_*.md, README.md, skills-*.md | done |

<!-- Agents: insert new rows above this comment. Keep history; mark done instead of deleting. -->
