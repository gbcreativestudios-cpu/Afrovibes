import { motion } from "framer-motion";
import { EventCard } from "./EventCards";
import useTickerSpeed from "../hooks/useTickerSpeed";

// Exact same technique as the GB Studios site's BrandTicker/Process
// tickers: framer-motion animates a plain 0% -> -50% transform, linear,
// on infinite repeat. The duration itself comes from useTickerSpeed,
// which measures this ticker's real rendered width once and converts it
// to a duration that matches the same px/second speed as every other
// ticker on the site (including the partner logos strip) — instead of
// guessing a fixed number of seconds that reads differently depending on
// how wide the cards actually render on a given device.
export default function EventsTicker({ events }) {
  const { trackRef, repeats, duration } = useTickerSpeed(events.length);

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
