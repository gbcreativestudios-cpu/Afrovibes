# AfroVibes — event card bug fixes

6 files changed, no new files. Drop into your repo at the same paths,
then `npm run build` to confirm.

## Fixed
1. Next Event card border restored (was accidentally set to none)
2. Event card action buttons realigned — now sit in normal flow, left-
   aligned directly under the title/info text, on mobile and desktop
3. Upcoming Event thumbnail ratio now actually responds to your CMS
   selection (was silently stuck on default due to a value mismatch),
   and now has the full ratio option list like Next/Past do
4. All 4 card types (Next, Upcoming, Past-Events-page, Past-Home-page)
   now use the same underlying, correctly-working sizing mechanism
5. "Get Ticket" now shows on the event detail page even before a ticket
   URL has been added (matches the card's existing fallback behavior)

Your currently-set "Upcoming" thumbnail value has been corrected from
the broken "square" to the working "1:1" automatically in site.json —
no need to re-pick it in the CMS.
