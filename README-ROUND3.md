# AfroVibes — Round 3 changes

Drop these files into your existing repo at the same paths (they'll overwrite
the current versions), then run `npm run build` (or your usual dev command)
to confirm. Two files are brand new:

- src/components/ScrollReveal.jsx  (new — site-wide entrance animations)
- src/hooks/useParallax.js         (new — parallax hook used by 3 banners)

CHANGES.patch is a `git diff` of everything, in case you'd rather apply it
with `git apply CHANGES.patch` from your repo root instead of copying files
by hand.

## What changed
1. Footer (mobile): logo/tagline centered on top; Explore (left) and
   Social (right) side-by-side below it.
2. Hero buttons + Connect page buttons: stack/fill width on mobile only.
3. Past events row (mobile): date left, title right, on one line under
   the thumbnail.
4. "Explore Events" button: purple (scoped to that one button).
5. Gallery ticker: speed now scales with actual content width instead of
   a fixed 40s duration, so it no longer crawls on mobile.
6. Parallax: homepage hero, event detail banner, "Who We Are" banner.
   Off on mobile, respects prefers-reduced-motion.
7. Site-wide fade/slide-in animations on load and scroll.
8. Small body-copy text: bolder Futura weight + a slight size bump
   (hero subhead, event descriptions, page-hero intros, about-block
   copy, muted paragraph blurbs).
