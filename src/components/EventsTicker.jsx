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

    // Ignoring resize noise isn't enough on its own: mobile browsers can
    // still report a genuinely different innerWidth mid-scroll (address
    // bar collapse, rotation, etc). Whenever that happens we DO need to
    // recompute the duration to keep px/second constant — but simply
    // reassigning animation-duration on a running CSS animation makes the
    // browser restart it from 0%, which is what read as the ticker
    // "going blank and resuming". The fix: read exactly how far through
    // the current loop the animation is (via the Web Animations API)
    // before changing the duration, then apply a matching negative
    // animation-delay so playback continues from the same visual spot
    // instead of snapping back to the start.
    let lastWidth = window.innerWidth;
    let debounceId = null;
    let currentDuration = null;

    const getProgress = () => {
      if (currentDuration == null || !el.getAnimations) return 0;
      const anim = el.getAnimations().find((a) => a.animationName === "ticker-scroll");
      const currentTimeMs = anim && typeof anim.currentTime === "number" ? anim.currentTime : null;
      if (currentTimeMs == null) return 0;
      const durationMs = currentDuration * 1000;
      return durationMs > 0 ? (currentTimeMs % durationMs) / durationMs : 0;
    };

    const setSpeed = () => {
      // scrollWidth spans both duplicated groups; translateX(-50%) only
      // needs to travel one group's worth of distance per loop.
      const distance = el.scrollWidth / 2;
      if (distance <= 0) return;

      const progress = getProgress();
      const newDuration = distance / PX_PER_SECOND;

      el.style.animationDuration = `${newDuration}s`;
      // Re-enter the new duration at the same relative position instead
      // of restarting at 0% — a negative delay is treated as "already
      // this far into the animation".
      el.style.animationDelay = `-${(progress * newDuration).toFixed(3)}s`;

      currentDuration = newDuration;
    };

    const handleResize = () => {
      // A few px of noise (rounding, scrollbar show/hide) isn't worth
      // reacting to — only genuine width changes need a new speed.
      if (Math.abs(window.innerWidth - lastWidth) < 5) return;
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
