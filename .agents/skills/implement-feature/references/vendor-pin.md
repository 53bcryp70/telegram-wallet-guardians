# Pin checklist (Codex)

Use with `$implement-feature` stage 1 and `$crypto-checkpoint`.

## Exact pin (`AGENTS.md` §5)

| Field | Value |
|-------|-------|
| Repo | iancoleman/slip39 |
| Release | 0.0.3 |
| Commit | `14a2e631acbf1fd51b68324827bac9cdc83cb178` |
| Bundle path | `src/js/slip39-libs.js` |
| Bundle git blob | `7dd2f48649dbb7a316b4c49e2fa8098d4edbc7a3` |
| License git blob | `a7d8d0bbcd7d7b75a9e672ba8ce8323ad8ae00a8` |

## Local paths

- `public/vendor/slip39-libs.js`
- `public/vendor/LICENSE-iancoleman-slip39.txt`

## Verify

```bash
git hash-object public/vendor/slip39-libs.js
git hash-object public/vendor/LICENSE-iancoleman-slip39.txt
# SHA-256 → record in VENDOR_NOTES.md
```

Mismatch → delete files, stop, report vendor-integrity failure.
