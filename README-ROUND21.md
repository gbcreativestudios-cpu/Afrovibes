# Afrovibes — Round 21 (Final): Global Typography System

Builds on Rounds 10–18 — apply those first if you haven't already.

This replaces every scattered per-page/per-title font-size and
font-weight control with **one panel**: Site Settings → Global
Typography, organized into 12 categories matching the structure we
agreed on. Adjust Weight, Size, Line Height, or Letter Spacing for a
category, and every matching element sitewide moves together — always,
from now on, since they all read from the same shared setting.

## The 12 categories

1. **Home Page Hero** — the big title at the top of the Home page
2. **Other Page Heroes** — the banner title on Who We Are / Events /
   Merch / Connect / individual Event pages / Product pages
3. **Headlines (Section Titles)** — every section title sitewide
4. **Subheadings** — event titles shown on cards (Next Event,
   Upcoming, Past) — also now covers the "Connection / Adventure /
   Community / Memories" words on the About page
5. **Body Copy** — every paragraph, sitewide
6. **Captions** — team member names, merch product names, home page
   merch card labels
7. **Quotes/Testimonials** — not used anywhere yet, ready for later
8. **Navigation** — the top menu links
9. **Buttons (CTAs)** — every button sitewide
10. **Form Labels** — Connect page placeholder text, product option
    labels ("Size", "Color")
11. **Metadata** — event dates, prices, small uppercase tags
12. **Footer & Legal** — footer links, copyright line

## How Color works (the one exception)

Every property in a category (Weight, Size, Line Height, Letter
Spacing) is now single-source — there's no more per-item override for
those. **Color works differently, exactly as you asked**: individual
items — a specific title, or a specific event's title — can still
have their own color set right where they always did in Decap. If you
also set a Color at the category level, it overrides every individual
color in that category. Leave a category's Color blank in Global
Typography, and nothing changes — individual colors (or the theme
default, if that's blank too) keep working exactly as before.

## Size is fluid, automatically

Each category's Size field is one number — the desktop reference size
in pixels. Mobile isn't a second field: this round calculates a
proportional, smaller size for narrow screens and scales smoothly
between them (bigger display text shrinks proportionally more on
phones than body text does, which stays close to its full size for
readability) — the "professional proportion" scaling you asked for.

## Every Size/Weight field is pre-filled with what the site already looks like

Opening Global Typography for the first time, every field already
shows the site's actual current number — nothing changes visually
until you edit one yourself.

## A few things that changed as a natural side effect of unifying

Some elements that were previously styled inconsistently now share
one setting, which is the whole point — but it means a few of them
shift slightly to match each other:
- Merch product names, team member names, and the merch card labels
  were three different weights (900 / 900 / 500) — now one shared
  Captions weight
- The "Connection / Adventure / Community / Memories" words on the
  About page get a bit bigger and bolder (were 500/1.3rem, now share
  the Subheadings setting)
- The Featured event card's title (on the Events page) no longer gets
  its own extra-large size — it now matches every other event title,
  consistently

## Also in this round

- **"Explore" / "Social" footer headers removed** completely, as
  requested — the footer just shows the links and social icons
  directly now.
- The Events page per-title Font Weight option added in **Round 17**
  is now superseded by the global Headlines category and has been
  removed — weight is controlled from one place sitewide.
- Individual per-title Font Size fields (previously in every title's
  Decap entry) are removed — size now comes entirely from Global
  Typography.

## Files changed
- `content/site.json` — new `typographyScale` object (replaces the
  old scattered `typography` object), pre-filled with current values
- `content/titles.json` — removed `fontSize`/`fontWeight` from every
  title entry
- `src/components/TypographySettings.jsx` — fully rewritten: computes
  fluid responsive sizing per category, injects CSS variables
- `src/components/Title.jsx` — rewritten with the category + color
  override logic
- `src/components/Footer.jsx` — removed Explore/Social headers
- `src/components/EventCards.jsx`, `CustomSection.jsx`,
  `Newsletter.jsx`, `PartnersSection.jsx` — wired to categories
- `src/pages/Home.jsx`, `About.jsx`, `Connect.jsx`, `EventDetail.jsx`,
  `Events.jsx`, `Merch.jsx`, `NotFound.jsx` — every title wired to its
  category
- `src/index.css` — every relevant selector now reads from the
  unified category variables instead of hardcoded/scattered values
- `src/data/content.js` — defaults updated
- `public/admin/config.yml` — old "Text Weights & Styles" section
  replaced with the new Global Typography panel; per-title Font
  Size/Weight fields removed

## How to apply
```
cd Afrovibes
unzip -o CHANGES-round10.zip -d .   # skip if already applied
unzip -o CHANGES-round11.zip -d .   # skip if already applied
unzip -o CHANGES-round12.zip -d .   # skip if already applied
unzip -o CHANGES-round13.zip -d .   # skip if already applied
unzip -o CHANGES-round15.zip -d .   # skip if already applied
unzip -o CHANGES-round17.zip -d .   # skip if already applied
unzip -o CHANGES-round21.zip -d .
git add -A
git commit -m "Round 21: global typography system — 12 categories replacing all scattered font controls"
git push
```

After this is live, open Site Settings → Global Typography in Decap to
see all 12 categories, each pre-filled with the site's current values.
