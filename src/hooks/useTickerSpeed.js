import { useLayoutEffect, useRef, useState } from "react";

// Every scrolling ticker on the site (partner logos, upcoming events,
// past-event gallery) should feel like it's moving at the same real
// speed. Guessing a fixed duration per device class was unreliable —
// the assumed rendered item widths didn't match what real phones
// actually showed. This instead measures the ticker track's real width
// once, right after it first renders, and converts that into a duration
// that produces one consistent px/second speed everywhere.
//
// This only ever measures once per items-list change (not on resize, not
// repeatedly) — that's what keeps it from reintroducing the earlier
// stutter/jump bugs a live-recalculating version had.
const TARGET_PX_PER_SECOND = 90;
const MIN_REPEATS = 2;
const MAX_REPEATS = 24;

export default function useTickerSpeed(itemCount) {
  const trackRef = useRef(null);
  const [repeats, setRepeats] = useState(MIN_REPEATS);
  const [duration, setDuration] = useState(30);

  useLayoutEffect(() => {
    const el = trackRef.current;
    if (!el || itemCount === 0) return;

    // The track holds two identical halves (0% -> -50% loop), so half
    // its real scrollWidth is the distance one loop actually travels.
    const halfWidth = el.scrollWidth / 2;
    const viewport = window.innerWidth;

    // If the duplicated content doesn't comfortably fill one screen
    // width yet, there isn't enough of it to loop seamlessly — add
    // another repeat of the item list. This effect re-runs (because
    // `repeats` is a dependency) and re-measures the new, wider track,
    // stopping once it's safely wider than the viewport.
    if (halfWidth < viewport * 1.2 && repeats < MAX_REPEATS) {
      setRepeats((r) => r + 1);
      return;
    }

    if (halfWidth > 0) {
      setDuration(halfWidth / TARGET_PX_PER_SECOND);
    }
  }, [itemCount, repeats]);

  return { trackRef, repeats, duration };
}
