import { useEffect, useRef, useState } from "react";
import { EventCard } from "./EventCards";

// Constant on-screen speed in px/second, same approach as GalleryTicker:
// deriving the animation duration from the track's real rendered width
// keeps the visual speed identical on every screen size and card count,
// instead of a fixed-time animation that reads faster or slower as the
// content width changes.
const PX_PER_SECOND = 70;

export default function EventsTicker({ events }) {
  const [paused, setPaused] = useState(false);
  const trackRef = useRef(null);

  // Tapping the ticker toggles pause/play. Tapping an actual link/button
  // inside a card (Details, Get Ticket) should still navigate normally
  // instead of just pausing the scroll.
  const handleClick = (e) => {
    if (e.target.closest("a")) return;
    setPaused((p) => !p);
  };

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    // Only recompute when the viewport's WIDTH actually changes. Mobile
    // browsers fire "resize" when the address bar shows/hides during
    // scroll (a height-only change) — reacting to that reassigns
    // animation-duration on an already-running animation, which browsers
    // visibly jump/restart. Ignoring height-only resizes, plus a short
    // debounce, is what stops the mid-scroll glitch.
    let lastWidth = window.innerWidth;
    let debounceId = null;

    const setSpeed = () => {
      // scrollWidth spans both duplicated groups; translateX(-50%) only
      // needs to travel one group's worth of distance per loop.
      const distance = el.scrollWidth / 2;
      if (distance > 0) {
        el.style.animationDuration = `${distance / PX_PER_SECOND}s`;
      }
    };

    const handleResize = () => {
      if (window.innerWidth === lastWidth) return;
      lastWidth = window.innerWidth;
      clearTimeout(debounceId);
      debounceId = setTimeout(setSpeed, 150);
    };

    setSpeed();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(debounceId);
    };
  }, [events]);

  if (!events.length) return null;

  const renderGroup = (suffix = "") => (
    <div className="ticker-group" aria-hidden={suffix ? "true" : undefined}>
      {events.map((e, i) => (
        <div className="ticker-item" key={`${e.id}-${suffix || "a"}-${i}`}>
          <EventCard e={e} />
        </div>
      ))}
    </div>
  );

  return (
    <div className="ticker-bleed">
      <div className="ticker" onClick={handleClick} role="button" tabIndex={0} aria-label="Upcoming events, tap to pause">
        <div className={`ticker-track${paused ? " paused" : ""}`} ref={trackRef}>
          {renderGroup()}
          {renderGroup("b")}
        </div>
      </div>
    </div>
  );
}
