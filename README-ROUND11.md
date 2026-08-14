# Afrovibes — Round 11: mobile heading/font fix

This fixes the issue where heading text looked thin/small and blended
into the paragraph weight on mobile. Root cause: your headings relied on
"Arial Black" / "Futura" / "Century Gothic" — fonts that only exist if
they happen to be installed on the visitor's device. Desktop computers
usually have "Arial Black," so it looked right there. Phones (especially
Android) almost never have any of those fonts, so the browser silently
fell back to a generic thin system font instead.

## What changed

- Added **Jost** — a free, open-source (OFL-licensed) geometric sans
  designed as a Futura look-alike — as the real embedded brand font,
  self-hosted from your own `public/fonts/jost/` folder (not loaded from
  Google's servers, so no external requests, no tracking, no dependency
  on a third-party CDN staying up).
- All 6 weights your site actually uses (300, 400, 500, 600, 700, 900)
  are included as `.woff2` files — 76KB total, negligible load cost.
- Headings (`h1`/`h2`/`h3`) and the logo now render this font at a true
  weight 900 on every device — phone or desktop, iOS or Android — since
  the font file is always available rather than depending on what's
  installed locally.
- Added a small antialiasing fix (`-webkit-font-smoothing: antialiased`)
  that helps light text stay crisp against your dark background on
  mobile Safari/Chrome, rather than looking artificially thin.

## Why not real Futura PT?

Futura PT is a paid, commercial font — using it on a live website
requires an actual webfont license (separate from a desktop-app
license), plus the `.woff2` files themselves, neither of which you
currently have. Jost gets you a near-identical geometric look with zero
licensing risk.

## Files changed
- `src/index.css` — real `@font-face` embeds (replacing the old,
  device-dependent `local()` font lookups), updated heading font stack,
  antialiasing fix
- `public/fonts/jost/*.woff2` — the 6 font weight files (new)
- `package.json` / `package-lock.json` — added `@fontsource/jost`
  (used only to source the font files; not required at runtime)

## How to apply
This builds on **Round 10** — apply that first if you haven't already,
then this on top:
```
cd Afrovibes
unzip -o CHANGES-round10.zip -d .   # skip if already applied
unzip -o CHANGES-round11.zip -d .
npm install
git add -A
git commit -m "Round 11: fix mobile heading font (self-hosted Jost, replaces broken Arial Black/Futura fallback)"
git push
```
