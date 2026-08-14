# Afrovibes — Round 13+14 (merged)

Builds on Rounds 10–12 — apply those first if you haven't already.

## "View All Events" hidden by default (with toggle)

The button next to the **Upcoming Events** title on the homepage is now
hidden by default. Turn it back on in Decap: **Site Settings →
Upcoming Events — "View All Events" Button → "Show this button?"**.

(The "View All Events" link next to **Past Events** is untouched — you
only asked about the one beside Upcoming Events.)

## Merch teaser section — mobile-only fixes

- **"Take The Vibe With You" title**: on smartphone widths only, it now
  wraps to 2 lines and is center-aligned. Desktop is untouched — it
  still sits left-aligned next to the Shop Merch button exactly as
  before.
- **Shop Merch button**: on smartphone widths only, it's no longer next
  to the title (which was causing the overflow) — it now sits centered
  directly below the stacked merch cards. Desktop is untouched — the
  button stays right where it was, beside the title.
- **All screen sizes**: added a little extra top spacing between the
  section heading and the card stack, so they don't feel cramped
  together.

## Files changed
- `content/site.json` — added `upcomingEventsViewAll` toggle (default off)
- `src/data/content.js` — default/backfill for the new toggle
- `src/pages/Home.jsx` — toggle wiring + duplicate Shop Merch button
  (desktop version + mobile version, CSS shows only the right one per
  breakpoint)
- `src/index.css` — mobile-only title wrap/center, mobile-only button
  reposition, universal stack top-spacing increase
- `public/admin/config.yml` — new Decap field for the toggle

## How to apply
```
cd Afrovibes
unzip -o CHANGES-round10.zip -d .   # skip if already applied
unzip -o CHANGES-round11.zip -d .   # skip if already applied
unzip -o CHANGES-round12.zip -d .   # skip if already applied
unzip -o CHANGES-round13.zip -d .
git add -A
git commit -m "Round 13+14: hide View All Events by default, mobile-only merch teaser fixes"
git push
```
