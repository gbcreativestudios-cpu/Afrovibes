# Afrovibes — Round 10 corrections

No GitHub push credentials are available in this environment, so this is
delivered as a patch file (`CHANGES-round10.patch`) — same drop-in method
as Round 8: apply it to your repo, then commit & push (or use the
"Apply patch" steps below).

## 10A — "Sticker" replaced with an image-based Partners section

The scrolling text marquee right below the hero (the word loop —
CONNECTION / ENERGY / MEMORIES / etc.) is gone. In its place is a proper
**Our Partners** section:

- A section title at the top — **"OUR PARTNERS"** by default, fully
  editable in Decap under **Page & Section Titles → Home Page → "Our
  Partners" Title** (same text/font-size/color controls every other
  section title has).
- Below the title, a strip that holds your partner **logo images**
  (not text) and scrolls them in a smooth infinite loop, left to right,
  looping seamlessly — same strolling motion as before.
- The strip has its own background color, editable in Decap under
  **Site Settings → Our Partners (Homepage Logo Strip) → Strip
  Background Color**. Leave it blank to keep the default dark panel.
- The **on/off toggle** is preserved — **Site Settings → Our Partners →
  "Show this section?"** hides the whole thing (title + logos) when off,
  same as the old ticker's toggle did.
- Add/remove/reorder logos from **Site Settings → Our Partners →
  Partner Logos** — each entry is one image upload.

If no logos are added yet, the section simply doesn't render (no empty
strip), so the site looks clean until you upload some.

## 10B — New optional "Info Section" right after Partners

Immediately below the Partners section there's a second section that is
**fully optional**:

- Toggle it on/off in **Site Settings → Optional Info Section
  (Homepage) → "Show this section?"** — off by default.
- When on, it shows a title (**Page & Section Titles → Home Page →
  "Optional Info Section Title"**) and a paragraph (**Site Settings →
  Optional Info Section (Homepage) → Paragraph**).
- Use it for anything — an announcement, a mission blurb, a callout —
  or leave it off and it takes up zero space.

## 10C — Hero section cleaned up + breathing scroll arrow

- The old ticker is no longer wedged directly under the hero, so the
  hero now reads as one clean, full block on its own.
- The hero's title/buttons are nudged down slightly for a touch more
  breathing room at the top.
- A small downward arrow now sits at the bottom of the hero, gently
  "breathing" (fading/moving) to hint that there's more to scroll to.
  Clicking it smooth-scrolls to the next section. It has its own toggle
  too — **Site Settings → Hero Scroll-Down Arrow → "Show scroll
  arrow?"**.

## Notes

- Existing sites that already had words saved in the old "Homepage
  Scrolling Ticker" field are unaffected by data loss — that field is
  simply no longer read; add your partner logos fresh in the new
  **Our Partners** field.
- All three new pieces (Partners, Optional Info Section, Scroll Arrow)
  degrade gracefully — each one only renders when its toggle is on
  *and* it actually has content, so nothing shows up blank.

## Files changed
- `content/site.json` — replaced `heroTicker` with `heroScrollIndicator`,
  `partners`, `customSection`
- `content/titles.json` — added `partnersTitle`, `customSectionTitle`
  under `home`
- `public/admin/config.yml` — new Decap fields for the above
- `src/data/content.js` — updated site defaults/backfill
- `src/pages/Home.jsx` — wired in the new sections, removed old ticker
- `src/index.css` — styling for the new sections + breathing arrow
- `src/components/PartnersSection.jsx` — new
- `src/components/CustomSection.jsx` — new
- `src/components/ScrollIndicator.jsx` — new

## How to apply
```
cd Afrovibes
git apply CHANGES-round10.patch
git add -A
git commit -m "Round 10: image-based Partners section, optional info section, hero scroll arrow"
git push
```
