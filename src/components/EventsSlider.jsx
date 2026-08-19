import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EventCard } from "./EventCards";

// Replaces the old auto-scrolling ticker: the card sits still, and the
// visitor moves between events by swiping (drag, via framer-motion) or
// tapping the arrows/dots. No autoplay, no animation the visitor didn't
// trigger themselves.
const SWIPE_DISTANCE = 60; // px
const SWIPE_VELOCITY = 300; // px/s

export default function EventsSlider({ events }) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  if (!events.length) return null;

  const goTo = (nextIndex, dir) => {
    if (nextIndex < 0 || nextIndex >= events.length) return;
    setDirection(dir);
    setIndex(nextIndex);
  };

  const handleDragEnd = (_e, info) => {
    const pastDistance = Math.abs(info.offset.x) > SWIPE_DISTANCE;
    const pastVelocity = Math.abs(info.velocity.x) > SWIPE_VELOCITY;
    if (!pastDistance && !pastVelocity) return;

    if (info.offset.x < 0) goTo(index + 1, 1);
    else goTo(index - 1, -1);
  };

  return (
    <div className="events-slider">
      <div className="events-slider-viewport">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={events[index].id}
            className="events-slider-slide"
            custom={direction}
            initial={{ x: direction >= 0 ? 60 : -60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: direction >= 0 ? -60 : 60, opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            drag={events.length > 1 ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.6}
            onDragEnd={handleDragEnd}
          >
            <EventCard e={events[index]} />
          </motion.div>
        </AnimatePresence>
      </div>

      {events.length > 1 && (
        <>
          <button
            type="button"
            className="events-slider-arrow events-slider-arrow-left"
            onClick={() => goTo(index - 1, -1)}
            disabled={index === 0}
            aria-label="Previous event"
          >
            ‹
          </button>
          <button
            type="button"
            className="events-slider-arrow events-slider-arrow-right"
            onClick={() => goTo(index + 1, 1)}
            disabled={index === events.length - 1}
            aria-label="Next event"
          >
            ›
          </button>

          <div className="events-slider-dots">
            {events.map((e, i) => (
              <button
                type="button"
                key={e.id}
                className={`events-slider-dot${i === index ? " active" : ""}`}
                onClick={() => goTo(i, i > index ? 1 : -1)}
                aria-label={`Go to event ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
