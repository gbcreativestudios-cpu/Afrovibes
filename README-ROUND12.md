# Afrovibes — Round 12

Builds on Rounds 10 and 11 — apply those first if you haven't already.

## 12A — Upcoming Events ticker glitch fixed

Root cause: the ticker recalculates its scroll speed every time the
browser fires a `resize` event — and on mobile, scrolling makes the
address bar show/hide, which fires `resize` even though only the
*height* changed, not the width. Every time that happened, the code
reassigned the animation's duration mid-run, and browsers visibly
jump/restart an animation when you do that — that's the "breaks while
scrolling, doesn't loop right" glitch.

Fixed by only reacting when the viewport's *width* actually changes
(ignoring the address-bar height changes), plus a short debounce so
rapid resizes don't retrigger it repeatedly. The ticker now holds its
speed and loop steady through scrolling.

(Note: this same fix will also need to go onto the Events-page gallery
ticker — that's covered in Round 17, since you asked for that one
separately.)

## 12B — Partners section restructured

- The background color control (Site Settings → Our Partners →
  "Section Background Color") now colors the **whole section** —
  title and logos together — instead of just a strip behind the logos.
- The logo strip itself no longer has its own background or border —
  logos sit directly on the section's background, exactly as
  requested.
- Leave the color blank and the section just uses the site's normal
  dark background, same as before.

## Files changed
- `src/components/EventsTicker.jsx`
- `src/components/PartnersSection.jsx`
- `src/index.css`
- `public/admin/config.yml`

## How to apply
```
cd Afrovibes
unzip -o CHANGES-round10.zip -d .   # skip if already applied
unzip -o CHANGES-round11.zip -d .   # skip if already applied
unzip -o CHANGES-round12.zip -d .
git add -A
git commit -m "Round 12: fix Upcoming Events ticker glitch, restructure Partners section background"
git push
```
