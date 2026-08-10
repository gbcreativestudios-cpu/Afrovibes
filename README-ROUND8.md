# Afrovibes — Round 8 corrections

## 8A — Next Event card desktop spacing
The title/date block was vertically centered inside the card independently
of the Get Ticket / Details buttons below it, so on a tall desktop image
the buttons ended up far from the text. Title+meta and the buttons are now
grouped into a single column that centers together, so they always stay
close no matter the image height.

## 8B — "View Our Media" now jumps straight to Past Events
Found the actual cause: `ScrollToTop` in `App.jsx` force-scrolled every
route change to the very top of the page, ignoring the `#past-events`
hash in the link. It now detects a hash, waits for the page to render,
and scrolls to that section (offset so the fixed nav doesn't cover the
heading) instead of always landing at the top.

## 8C — "View Our Media" text is now CMS-editable
Added `home.mediaLinkText` to `content/titles.json` and Decap's
`public/admin/config.yml`, following the same pattern as the other
section titles (Content Manager → Titles → Home Page → "View Our Media"
Link).

## 8D — Upcoming Event ticker (home): loop + speed
Found leftover duplicate/legacy CSS in `index.css` from an earlier round
that was still conflicting with the newer, already-partially-fixed ticker
rules further down the file. Removed the dead duplicate block entirely.
The ticker's scroll speed is now computed from its actual rendered width
(same approach as the gallery ticker) instead of a fixed-time animation,
so it runs at a consistent visual speed regardless of screen size or
number of events, and loops seamlessly.

## 8E — Events page gallery ticker (Past Events): speed + loop
This ticker never had the "two identical groups with a trailing gap"
structure the other ticker used for a seamless loop, so it was prone to
the same jump/blank-flash at the wrap point. Applied the same technique,
and increased its speed (was noticeably slower than the home ticker).

---

### Files touched
- `src/index.css`
- `src/components/EventCards.jsx`
- `src/components/EventsTicker.jsx`
- `src/components/GalleryTicker.jsx`
- `src/App.jsx`
- `src/pages/Home.jsx`
- `content/titles.json`
- `public/admin/config.yml`

### How to apply
```
git apply CHANGES-round8.patch
```
(Verified: applies cleanly to the current `main`, and `npm run build`
succeeds with no errors after applying.)
