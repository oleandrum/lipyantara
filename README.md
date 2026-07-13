# Lipyantara (लिप्यन्तर)

A personal, offline-first Sanskrit script converter for **Devanāgarī**, **IAST**,
**Harvard-Kyoto**, **ITRANS**, and **Velthuis** — powered by the real
[Aksharamukha](https://github.com/virtualvinodh/aksharamukha-python) transliteration
engine, running entirely in the browser. Nothing typed here ever leaves the page.

*Lipyantara* (लिप्यन्तर, from *lipi* "script" + *antara* "other/change") is the
Sanskrit word for transliteration itself.

🔗 **[Live site →](https://oleandrum.github.io/lipyantara/)**

## What this is

This is a small, reduced-scope interface — five scripts, not the 100+ that
Aksharamukha supports — built for personal, everyday use converting Sanskrit
text between Devanāgarī and its most common romanizations. For the full tool,
see the [official Aksharamukha converter](https://www.aksharamukha.com/converter).

## Features

- Live, bidirectional conversion between Devanāgarī, IAST, Harvard-Kyoto,
  ITRANS, and Velthuis
- Runs **entirely offline** in the browser after the first load — no server,
  no API calls, no data leaves the device
- Swap, copy, and clear controls
- Quick reference tables for each romanization scheme (`/schemes`)
- Light / dark / system theme switcher
- Responsive layout — the two text panes stack vertically on tablet and
  smaller screens

## How it works

The engine is the actual [Aksharamukha Python package](https://github.com/virtualvinodh/aksharamukha-python)
by Vinodh Rajan, compiled to WebAssembly via [Pyodide](https://pyodide.org)
and wrapped for browser use by [Aksharamukha.js](https://github.com/paramsiddharth/aksharamukha.js).
It's loaded once from a CDN (`cdn.jsdelivr.net`, ~17 MB) and cached by the
browser afterward — no build step, no framework, just static HTML, CSS, and
vanilla JS.

## Project structure

```
index.html                 the converter
schemes/
  iast.html                IAST ↔ Devanāgarī reference table
  harvard-kyoto.html       Harvard-Kyoto ↔ Devanāgarī reference table
  itrans.html              ITRANS ↔ Devanāgarī reference table
  velthuis.html            Velthuis ↔ Devanāgarī reference table
```

## Running locally

No build step — just open `index.html` in a browser, or serve the folder
with any static file server:

```sh
python3 -m http.server 8000
```

## Deployment

Deployed via GitHub Pages from the repository root. See
[`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml)
for the GitHub Actions deploy configuration.

## Credits & license

This repository's own code (HTML/CSS/JS) is licensed under the
[MIT License](LICENSE).

The transliteration engine itself — [Aksharamukha](https://github.com/virtualvinodh/aksharamukha-python)
by [Vinodh Rajan](https://virtualvinodh.com) — is licensed under
**GNU AGPL 3.0** and is used here unmodified, loaded at runtime from its
published CDN package. See [`NOTICE.md`](NOTICE.md) for full third-party
attribution.

The browser port, [Aksharamukha.js](https://github.com/paramsiddharth/aksharamukha.js),
is by Param and is what makes running the engine client-side possible.
