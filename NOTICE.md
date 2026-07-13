# Third-Party Notices

This project loads and uses the following third-party software at runtime.
Neither is modified or redistributed as part of this repository — both are
fetched by the browser directly from their published CDN packages.

## Aksharamukha

- **Author:** Vinodh Rajan ([virtualvinodh.com](https://virtualvinodh.com))
- **Source:** https://github.com/virtualvinodh/aksharamukha-python
- **License:** GNU Affero General Public License v3.0 (AGPL-3.0)
- **Role:** The transliteration engine itself — all script conversion logic,
  orthographic rules, and mapping data used by this site.

## Aksharamukha.js

- **Author:** Param ([paramsid.com](https://www.paramsid.com))
- **Source:** https://github.com/paramsiddharth/aksharamukha.js
- **npm package:** https://www.npmjs.com/package/aksharamukha
- **Role:** Browser-compatible packaging of the Aksharamukha Python engine
  (via Pyodide/WebAssembly), loaded from jsDelivr CDN
  (`cdn.jsdelivr.net/npm/aksharamukha`).

## Fonts

- **Fraunces**, **Source Serif 4**, **JetBrains Mono**, **Noto Sans**, and
  **Noto Sans Devanagari** — all served via Google Fonts, licensed under the
  SIL Open Font License 1.1.

---

If you fork or redistribute this repository, please keep this notice intact
and preserve attribution to the original Aksharamukha project, without which
this site would not exist.
