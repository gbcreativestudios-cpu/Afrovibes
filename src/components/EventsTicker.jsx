import { useRef } from "react";
import { motion } from "framer-motion";
import { EventCard } from "./EventCards";
import useIsMobile from "../hooks/useIsMobile";

// Exact same technique as the GB Studios site's BrandTicker/Process
// tickers: framer-motion animates a plain 0% -> -50% transform, linear,
// on infinite repeat. Percentage transforms are relative to the track's
// own width, so this stays seamless at any screen size with no JS width
// measurement or resize listener.
//
// This ticker can be fed as few as 1-3 events (Home.jsx passes
// upcoming.slice(1, 4)). With only two duplicated groups that's not
// enough content to fill a wide desktop viewport, so each of the two
// groups repeats the event list enough times on its own to guarantee the
// track always overflows the viewport, regardless of how many events
// exist.
const MIN_ITEMS_PER_HALF = 12;
// A fixed duration reads much faster on a narrow phone screen than on
// desktop (the same motion covers a bigger fraction of the screen each
// second), so mobile gets a slower duration to feel like the same speed.
const DURATION_DESKTOP = 42;
const DURATION_MOBILE = 65;

export default function EventsTicker({ events }) {
  const trackRef = useRef(null);
  const isMobile = useIsMobile();
  const duration = isMobile ? DURATION_MOBILE : DURATION_DESKTOP;

  // Tapping the ticker toggles pause/play by pausing the underlying Web
  // Animation framer-motion creates for this transform — that's a native
  // browser API built exactly for this, so it preserves position with no
  // manual math. Tapping an actual link/button inside a card (Details,
  // Get Ticket) should still navigate normally instead of pausing.
  const handleClick = (e) => {
    if (e.target.closest("a")) return;
    const el = trackRef.current;
    if (!el || !el.getAnimations) return;
    const anim = el.getAnimations()[0];
    if (!anim) return;
    if (anim.playState === "paused") anim.play();
    else anim.pause();
  };

  if (!events.length) return null;

  const repeats = Math.max(1, Math.ceil(MIN_ITEMS_PER_HALF / events.length));
  const repeatedEvents = Array.from({ length: repeats }, () => events).flat();

  const renderGroup = (suffix = "") => (
    <div className="ticker-group" aria-hidden={suffix ? "true" : undefined}>
      {repeatedEvents.map((e, i) => (
        <div className="ticker-item" key={`${e.id}-${suffix || "a"}-${i}`}>
          <EventCard e={e} />
        </div>
      ))}
    </div>
  );

  return (
    <div className="ticker-bleed">
      <div className="ticker" onClick={handleClick} role="button" tabIndex={0} aria-label="Upcoming events, tap to pause">
        <motion.div
          ref={trackRef}
          className="ticker-track"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ ease: "linear", duration, repeat: Infinity }}
        >
          {renderGroup()}
          {renderGroup("b")}
        </motion.div>
      </div>
    </div>
  );
}
