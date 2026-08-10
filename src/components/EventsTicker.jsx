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
        <div className={`ticker-track${paused ? " paused" : ""}`}>
          {renderGroup()}
          {renderGroup("b")}
        </div>
      </div>
    </div>
  );
}
