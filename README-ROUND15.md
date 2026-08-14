# Afrovibes — Round 15+16 (merged)

Builds on Rounds 10–13 — apply those first if you haven't already.

## Merch cards — mobile typography/padding

On mobile-width cards, the category label and price were sized for a
much bigger card and were pushing past the edges. Fixed:
- Reduced the category label and price font sizes to fit the smaller
  mobile card
- Reduced the inner padding so there's more usable width
- Centered the text, so labels like "Water Bottle" sit tidy on one
  line instead of hugging the left edge and risking overflow

Desktop cards are untouched — this only applies at mobile widths.

## Newsletter paragraph — now editable in Decap

Added a Decap field: **Site Settings → Newsletter Section (Text) →
Paragraph**. (The section title was already editable elsewhere — under
Page & Section Titles → Newsletter Section → Title — that's unchanged.)

## Newsletter email box — solid white fill, black text

The email input was a translucent white overlay with white text (hard
to read against the purple background at a glance). It's now a solid
white fill with black text, exactly as asked — no more translucency.

## Events page — "The Moment We Have Shared" wraps on mobile

Same fix as the Merch title in Round 13: on smartphone widths, this
heading now wraps to 2 lines and centers itself instead of getting
squeezed down to a tiny single line. Desktop is untouched.

## Files changed
- `content/site.json` — added `newsletter.paragraph` field
- `src/data/content.js` — default/backfill for the new field
- `src/components/Newsletter.jsx` — reads the paragraph from Decap
  instead of a hardcoded string
- `src/index.css` — merch card mobile sizing, newsletter input
  colors, Events page title mobile wrap
- `public/admin/config.yml` — new Decap field for the paragraph

## How to apply
```
cd Afrovibes
unzip -o CHANGES-round10.zip -d .   # skip if already applied
unzip -o CHANGES-round11.zip -d .   # skip if already applied
unzip -o CHANGES-round12.zip -d .   # skip if already applied
unzip -o CHANGES-round13.zip -d .   # skip if already applied
unzip -o CHANGES-round15.zip -d .
git add -A
git commit -m "Round 15+16: merch card mobile typography, newsletter paragraph field + white input, events title mobile wrap"
git push
```
