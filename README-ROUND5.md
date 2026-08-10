# AfroVibes — Round 5 (Who We Are images + mobile nav/hero fix)

Drop these files into your repo at the same paths, then `npm run build`
to confirm. No new files this round — everything is an edit to existing
files.

CHANGES-round5.patch is a git diff of this round only, in case you'd
rather `git apply CHANGES-round5.patch` from your repo root.

## What changed

### Who We Are — alternating image sections
- "Great People. Great Experiences." — image left, text right (desktop)
- "Bring People Together." — image right, text left (desktop)
- "Redefine Connection." — image left, text right (desktop)
- Mobile: every section stacks with the image below the text
- Placeholder images reused from existing event content — swap them
  anytime in Decap under Site Settings → "Who We Are — Feature Images"

### Mobile nav / hero / banner fix
- Nav now measures its own height and is always solid on mobile
  (no longer fades transparent into the content behind it)
- Homepage hero (mobile only) now starts right below the nav instead
  of running underneath it
- Who We Are top banner (mobile only) is thinner and also starts right
  after the nav
