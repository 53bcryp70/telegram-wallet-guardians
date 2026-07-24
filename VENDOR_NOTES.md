# Vendor Notes

The implementation must vendor the unmodified `iancoleman/slip39` browser bundle specified in [AGENTS.md](AGENTS.md).

Required record once acquired:

- Repository, release, commit, source path, and Git blob hash.
- Local SHA-256 of `public/vendor/slip39-libs.js`.
- MIT license location.
- Browser-global API used by `src/slip39.ts` only.
- Known limitations: experimental code, historic non-extendable shares, and built-in prototype modifications.
- Confirmation that the vendor artifact was not changed.

Do not add the artifact until its hashes match the authoritative brief.
