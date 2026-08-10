# Afrovibes — Round 7 corrections

## 7A — Event date system
- Decap CMS now uses the supported `datetime` widget in date-only mode, so Event Date is editable.
- Event date is stored as `YYYY-MM-DD` and is the single source of truth.
- Dates before today are Past; today and future dates are Upcoming.
- The earliest upcoming date is automatically Next Event.
- No manual Past/Upcoming category override is used.
- Games Night is set to September 19, 2026 based on the existing event detail.

## 7B — Event card behavior
- Next Event card has no background/border.
- Next, Upcoming, Past Events-page, and Past Home-page thumbnails each have independent `Adapt to image` / `1:1` controls.
- Next Event desktop thumbnail has a fixed column width rather than a flex-growing image area.
- Ticket availability and Get Ticket UI are limited to the calculated Next Event.
- Past events never show ticket availability or Get Ticket, including Event Detail pages.

## 7C — Paragraph weight controls
Added independent paragraph-weight controls for Home, Events, Event Detail, Merch, Product Detail, Connect, plus the existing About and Footer controls.

## 7D — Home media link
Added `View Our Media` below the Best Memories statement. It links to the Past Events section on the Events page.
