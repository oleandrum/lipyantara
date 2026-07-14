# Lipyantara (लिप्यन्तर)

A personal, offline-first Sanskrit script converter for **Devanāgarī**, **IAST**,
**Harvard-Kyoto**, **ITRANS**, and **Velthuis** — powered by the real
[Aksharamukha](https://github.com/virtualvinodh/aksharamukha-python) transliteration
engine, running entirely in the browser (or natively on macOS). Nothing typed
here ever leaves the device.

*Lipyantara* (लिप्यन्तर, from *lipi* "script" + *antara* "other/change") is the
Sanskrit word for transliteration itself.

🔗 **[Live site →](https://oleandrum.github.io/lipyantara/)**
🔗 **[Open the app view →](https://oleandrum.github.io/lipyantara/app.html)**
💾 **[Download for macOS →](https://github.com/oleandrum/lipyantara/releases/latest)**

## Three ways to use it

1. **Web** — the full site at the live link above, with background, reference
   tables for each scheme, and a "why this exists" pitch.
2. **Installed web app (iPhone/iPad/Android)** — open the
   [app view](https://oleandrum.github.io/lipyantara/app.html), then
   *Share → Add to Home Screen* in Safari. A service worker caches the engine
   after first load, so it keeps working offline.
3. **Native macOS app** — a real `.app`/`.dmg`, built with
   [`deno desktop`](https://deno.com/blog/v2.9#deno-desktop) from the same
   app-only UI. See [Building the macOS app](#building-the-macos-app) below.

## What this is

This is a small, reduced-scope interface — five scripts, not the 100+ that
Aksharamukha supports — built for personal, everyday use converting Sanskrit
text between Devanāgarī and its most common romanizations. For the full tool,
see the [official Aksharamukha converter](https://www.aksharamukha.com/converter).

## Features

- Live, bidirectional conversion between Devanāgarī, IAST, Harvard-Kyoto,
  ITRANS, and Velthuis
- Runs **entirely offline** after the first load — no server, no data leaves
  the device
- Swap, copy, and clear controls
- Quick reference tables for each romanization scheme (web version, `/schemes`)
- Light / dark / system theme switcher
- Responsive layout — text panes stack vertically on tablet and smaller screens
- Installable as a PWA on iOS/Android, or as a native app on macOS

## How it works

The engine is the actual [Aksharamukha Python package](https://github.com/virtualvinodh/aksharamukha-python)
by Vinodh Rajan, compiled to WebAssembly via [Pyodide](https://pyodide.org)
and wrapped for browser use by [Aksharamukha.js](https://github.com/paramsiddharth/aksharamukha.js).
It's loaded once from a CDN (`cdn.jsdelivr.net`, ~17 MB) and cached afterward
(by the browser on web, or by the service worker as a PWA) — no build step,
no framework, just static HTML, CSS, and vanilla JS.

The macOS app wraps the same interface using `deno desktop` (Deno 2.9+),
which opens it in a native WKWebView window and compiles it to a standalone
`.app`/`.dmg`. It still fetches the engine from the CDN on first launch —
this keeps the app small and the engine always up to date, at the cost of
needing an internet connection the very first time it's opened.

## Project structure

```
site/                    deployed to GitHub Pages
├── index.html            marketing page (background, reference table links)
├── app.html               app-only UI — also the PWA start_url
├── manifest.json           PWA manifest
├── sw.js                    service worker (offline caching)
├── icons/                    PWA / favicon icons (16-512px, apple-touch-icon)
└── schemes/
    ├── iast.html
    ├── harvard-kyoto.html
    ├── itrans.html
    └── velthuis.html

app/                      native macOS app source (deno desktop)
├── index.html             same app-only UI as site/app.html
├── main.ts                  deno desktop entrypoint (static file server)
├── deno.json                 app name, bundle identifier, icon config
└── icons/
    └── app.icns             macOS app icon (used for the compiled binary)
```

`site/app.html` and `app/index.html` are intentionally near-duplicates — one
is served over the web (with a service worker for offline PWA use), the other
is embedded directly into the compiled native binary. Keep them in sync by
hand when making UI changes.

## Running locally

**Web:** no build step — just open `site/index.html` in a browser, or serve
the folder:

```sh
cd site
python3 -m http.server 8000
```

**Native app (dev mode with hot reload):**

```sh
cd app
deno desktop --hmr --include index.html --icon icons/app.icns --allow-read=. main.ts
```

## Building the macOS app

```sh
cd app
deno desktop --include index.html --icon icons/app.icns --allow-read=. \
  --output Lipyantara.dmg main.ts
```

For an Intel build from Apple Silicon (or vice versa):

```sh
deno desktop --include index.html --icon icons/app.icns --allow-read=. \
  --target x86_64-apple-darwin --output Lipyantara-intel.dmg main.ts
```

Built `.app`/`.dmg` files are **not** committed to this repository (see
`.gitignore`) — they're distributed as
[GitHub Release](https://github.com/oleandrum/lipyantara/releases) assets
instead. To publish a new build: create a new release on GitHub and attach
the `.dmg` as an asset named `Lipyantara.dmg`, so the download link on the
site and in this README keeps working.

`deno desktop` is **experimental** as of Deno 2.9 — expect some rough edges.

## Deployment

The web site (`site/`) deploys via GitHub Pages through
[`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml),
triggered on pushes that touch `site/**`. Set **Settings → Pages → Source**
to **GitHub Actions**.

## Citation

If you use this in academic or research work, please cite it. GitHub's
**"Cite this repository"** button (sidebar) generates APA/BibTeX from
[`CITATION.cff`](CITATION.cff), or cite directly via DOI:

> Markovich, I. (2026). *Lipyantara* (v1.0.1) [Software]. Zenodo.
> <https://doi.org/10.5281/zenodo.21357335>

## Credits & license

This repository's own code (HTML/CSS/JS/TS) is licensed under the
[MIT License](LICENSE).

The transliteration engine itself — [Aksharamukha](https://github.com/virtualvinodh/aksharamukha-python)
by [Vinodh Rajan](https://virtualvinodh.com) — is licensed under
**GNU AGPL 3.0** and is used here unmodified, loaded at runtime from its
published CDN package. See [`NOTICE.md`](NOTICE.md) for full third-party
attribution.

The browser port, [Aksharamukha.js](https://github.com/paramsiddharth/aksharamukha.js),
is by Param and is what makes running the engine client-side (and inside the
native app) possible.
