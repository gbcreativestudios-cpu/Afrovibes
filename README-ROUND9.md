# Afrovibes — Round 9 corrections

This delivery is cumulative — it includes Round 8 (Next Event card spacing,
View Our Media scroll, ticker fixes) plus everything below, since Round 8
hadn't been applied to the live repo yet. Same drop-in method as before:
unzip and overwrite the matching files in your repo, then commit & push.

## 9A — Reusable button system (nav bar + hero)
Built one button system with 3 fixed destinations:
- **Get Tickets** → the next upcoming event's ticket link (same logic the
  event cards already use), or the Events page if there's no ticket link
  set yet.
- **Explore Events** → the Events page.
- **Shop Merch** → the Merch page.

Every button "slot" — the nav bar button, and both hero buttons — now has
its own settings in Decap (**Site Settings → Buttons (Nav Bar + Hero)**):
- Which of the 3 destinations it points to
- An optional custom label (leave blank to use the destination's default
  wording, e.g. "Get Tickets")
- A toggle to show/hide that button entirely

The destinations themselves never change from Decap — only which one
fills which spot, and whether that spot is visible. Each slot keeps its
own existing look (the nav button stays purple, hero button 1 stays
purple, hero button 2 stays outline) — whichever destination you assign
to a slot picks up that slot's look automatically, so e.g. putting Shop
Merch in the nav slot makes it purple there, matching what's already in
that spot.

## 9B — Footer redesign
**Mobile:** paragraph text removed. Page links top-left, logo top-right,
social icons below the links, copyright line below everything — matching
the layout reference you sent.

**Desktop:** kept the current 3-column structure, just trimmed to the
same content as mobile (no paragraph, icon-based socials instead of text
links).

**Social icons are now Decap-editable** (**Site Settings → Social Links
(Footer)**) — add, remove, or reorder any of: Facebook, Instagram,
TikTok, WhatsApp, X/Twitter, YouTube, Threads, Snapchat, Email, or a
generic "Other" link icon. Each entry is just a platform + URL; leaving
the URL blank hides that icon.

Note: the old standalone `instagramUrl` / `tiktokUrl` / `contactEmail`
fields still exist in Decap but are no longer used anywhere on the site
— they've been superseded by Social Links. Safe to ignore; nothing will
break if they're left as-is.

---

### New files
- `src/components/ActionButton.jsx`
- `src/components/SocialIcon.jsx`

### Files touched (Round 8 + 9 combined)
- `src/index.css`
- `src/components/EventCards.jsx`
- `src/components/EventsTicker.jsx`
- `src/components/GalleryTicker.jsx`
- `src/components/Nav.jsx`
- `src/components/Footer.jsx`
- `src/data/content.js`
- `src/App.jsx`
- `src/pages/Home.jsx`
- `content/titles.json`
- `content/site.json`
- `public/admin/config.yml`

Verified: `npm run build` succeeds with no errors, and `public/admin/config.yml`
parses as valid YAML with the new Buttons/Social Links fields.
