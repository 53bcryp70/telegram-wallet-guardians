# Vendor Notes

The browser SLIP-39 engine is the unmodified `iancoleman/slip39` release `0.0.3` bundle:

- Commit: `14a2e631acbf1fd51b68324827bac9cdc83cb178`
- Source path: `src/js/slip39-libs.js`
- Bundle Git blob: `7dd2f48649dbb7a316b4c49e2fa8098d4edbc7a3`
- License Git blob: `a7d8d0bbcd7d7b75a9e672ba8ce8323ad8ae00a8`
- Local SHA-256: `d717e72eda18f696a90e73a4506faecfb8e1e836bf46709867b14e16832234da`
- License: MIT, copied to `public/vendor/LICENSE-iancoleman-slip39.txt`

`slip39-libs.js` exposes `window.slip39libs.slip39`; application code reaches it only through `src/slip39.ts`.

Known limitations: this is experimental historic-browser code, it creates non-extendable shares, and it modifies JavaScript built-in prototypes. The bundle was hash-verified and not modified.
