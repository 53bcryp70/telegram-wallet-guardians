# Overnight protocol (user asleep)

How Cursor and Codex work unattended while the owner sleeps. Active whenever the owner says so (e.g. "going to sleep — run overnight").

## Pre-authorized (no waking the user)

Everything already inside `AGENTS.md` scope, specifically:

- Codex: full implementation lane — toolchain, vendor pin, `src/bip39.ts`, `src/slip39.ts`, §8 checkpoint, UI, tests, `npm run verify`, pushing to `main`
- Cursor: reviewing pushed commits (`scope-guard`, `review-for-merge`, `$seed-share-audit` greps), writing findings to `AGENT_HANDOFF.md`, pushing review notes
- Both: claim/handoff bookkeeping, doc accuracy fixes that do not touch `AGENTS.md` §1–11

## Hard stops (block and wait for morning — never improvise)

| Situation | Overnight action |
|-----------|------------------|
| Vendor blob SHA mismatch (§5) | Delete vendor files, claim `blocked`, write blocker in handoff, stop crypto lane |
| §8 checkpoint FAIL that can't be fixed within scope | Claim `blocked`, document exact failure, stop — no alternate crypto |
| Any change needing brief-lock approval (`AGENTS.md` §1–11) | Do not make it; log the proposal for morning |
| Secret/credential found in a commit | Do not push further; flag at top of handoff for rotation |
| Owner-only items (`HUMAN_INPUT.md`): BotFather, deploy, device test | Always morning work |

## Help requests (Codex → Cursor)

If Codex is stuck on the **same problem for more than ~2 work sessions** (or ~30 min of attempts) and it is *not* a hard stop above, it should ask Cursor for help instead of spinning:

1. Add a `### HELP REQUESTED` section at the top of the **Current handoff** in `AGENT_HANDOFF.md` with: the exact problem, what was tried, error output, and the smallest question that would unblock.
2. Mark the relevant claim `blocked` (keep other lanes `active` if still workable).
3. Push, then continue on any other unblocked work.

Cursor's review loop treats `HELP REQUESTED` as top priority: it investigates (reading code, docs, upstream references), writes a concrete unblocking answer or patch suggestion in the handoff, and pushes. If the fix is outside Codex's stuck area and inside scope, Cursor may take the claim over explicitly (new claims row) and fix it directly — never silently.

Hard stops stay hard stops: help requests are for technical obstacles, not for bypassing brief-lock, vendor integrity, or owner-only items.

## Review loop (Cursor side)

A scheduled Cursor automation runs every 15 minutes:

1. Pull `main`; check `AGENT_HANDOFF.md` for `HELP REQUESTED` — if present, answer it first (see above).
2. If no new Codex commits and no help request → exit quietly.
3. New commits → review against `AGENTS.md` (scope, secrets, vendor pin, DOM IDs, §9 fixtures).
4. Append findings to `AGENT_HANDOFF.md` (Critical / Suggestion / Nice-to-have) + claims row; push.
5. Critical finding → put `BLOCKER FOR CODEX` at the top of the handoff so Codex sees it on next pull.

Codex should pull `main` before each work session and treat handoff blockers as gating.

## Morning report

First interaction next day, Cursor summarizes: commits landed, verify status, findings, anything blocked, owner actions now needed (see `HUMAN_INPUT.md` status table).
