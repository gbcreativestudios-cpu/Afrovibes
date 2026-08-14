# Afrovibes — Round 17+18 (merged)

Builds on Rounds 10–16 — apply those first if you haven't already.

## Events page titles now have a Font Weight option

**Page & Section Titles → Events Page** — each of the three Events
titles ("Next Event", "Our Calendar", "Past Events") now has a **Font
Weight** dropdown (300–900) alongside its existing Text/Font Size/Color
fields. Leave it blank to keep the current default (900, bold).

This is scoped to just the Events page titles for now — every other
title sitewide is unchanged, since the full typography overhaul
(Round 21) will handle weight globally.

## Events page ticker glitch — fixed (same bug as Round 12)

The photo ticker under Past Events had the exact same bug as the
Upcoming Events ticker on the homepage: it recalculated its scroll
speed on every `resize` event, including the height-only resizes
mobile browsers fire when the address bar shows/hides during scroll —
which restarts the animation mid-run and causes the visible glitch.
Same fix applied here: only react to real width changes, with a short
debounce.

## Connect page — spacing fixes

- **After the "Let's Talk" button** (smartphone only): tightened the
  gap before the next section a bit — was carrying both the hero's
  bottom padding and the next section's top padding stacked together.
- **After "Let's Create Something," before Partnerships / Brand
  Activations / etc.** (smartphone only): that gap was 60px (a grid
  spacing value) vs. the ~22px gap under "Send Us A Message" and its
  paragraph — now matched to the same ~22px so both sections feel
  consistent. Desktop layout for both sections is untouched.

## Files changed
- `content/titles.json` — added `fontWeight` field to the 3 Events
  page titles
- `src/components/Title.jsx` — now accepts/applies an optional
  `fontWeight` prop
- `src/data/content.js` — `getTitle()` passes `fontWeight` through
- `src/pages/Events.jsx` — wired `fontWeight` into the 3 title renders
- `src/components/GalleryTicker.jsx` — same resize-glitch fix as
  Round 12's EventsTicker
- `src/pages/Connect.jsx` — added a scoping class to the services
  block so its mobile spacing can be tuned without affecting other
  pages that share the same layout class
- `src/index.css` — the two mobile-only spacing tweaks
- `public/admin/config.yml` — new Font Weight dropdown for Events
  page titles

## How to apply
```
cd Afrovibes
unzip -o CHANGES-round10.zip -d .   # skip if already applied
unzip -o CHANGES-round11.zip -d .   # skip if already applied
unzip -o CHANGES-round12.zip -d .   # skip if already applied
unzip -o CHANGES-round13.zip -d .   # skip if already applied
unzip -o CHANGES-round15.zip -d .   # skip if already applied
unzip -o CHANGES-round17.zip -d .
git add -A
git commit -m "Round 17+18: Events title font-weight option, fix Events page ticker glitch, Connect page mobile spacing"
git push
```
