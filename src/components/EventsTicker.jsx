import { useState } from "react";
import { EventCard } from "./EventCards";

export default function EventsTicker({ events }) {
  const [paused, setPaused] = useState(false);

  // Tapping the ticker toggles pause/play. Tapping an actual link/button
  // inside a card (Details, Get Ticket) should still navigate normally
  // instead of just pausing the scroll.
  const handleClick = (e) => {
    if (e.target.closest("a")) return;
    setPaused((p) => !p);
  };

  // Duplicate the list so the scrolling loop is seamless (translateX(-50%)
  // lands exactly back at the start of the second copy).
  const track = events.length > 1 ? [...events, ...events] : events;

  return (
    <div className="ticker" onClick={handleClick} role="button" tabIndex={0} aria-label="Upcoming events, tap to pause">
      <div className={`ticker-track${paused ? " paused" : ""}`}>
        {track.map((e, i) => (
          <div className="ticker-item" key={`${e.id}-${i}`}>
            <EventCard e={e} />
          </div>
        ))}
      </div>
    </div>
  );
}
