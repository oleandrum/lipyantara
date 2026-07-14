// main.ts — Deno Desktop entrypoint for the native Lipyantara app
//
// Serves the app-only UI (index.html) from this folder. Run from within
// app/, or via the deno.json "desktop" config which sets this as the entry.

import { serveDir } from "jsr:@std/http/file-server";

Deno.serve((req) => {
  return serveDir(req, {
    fsRoot: import.meta.dirname,
    urlRoot: "",
  });
});
