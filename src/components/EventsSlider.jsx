import { useLayoutEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EventCard } from "./EventCards";

const SWIPE_DISTANCE = 60; // px
const SWIPE_VELOCITY = 300; // px/s
// Matches the breakpoint the rest of the site already uses to switch the
// normal events grid down from 3 columns to 2 (see .events-grid rules in
// index.css), so "desktop" here means the same thing it does everywhere
// else on the site.
const DESKTOP_BREAKPOINT = 900;
const DESKTOP_PAGE_SIZE = 3;

function useIsDesktop() {
  const query = `(min-width: ${DESKTOP_BREAKPOINT + 1}px)`;
  const [isDesktop, setIsDesktop] = useState(
    () => typeof window !== "undefined" && window.matchMedia(query).matches
  );

  useLayoutEffect(() => {
    const mql = window.matchMedia(query);
    const handler = (e) => setIsDesktop(e.matches);
    mql.addEventListener("change", handler);
    setIsDesktop(mql.matches);
    return () => mql.removeEventListener("change", handler);
  }, [query]);

  return isDesktop;
}

// Fixed-size pages of 3 for desktop, except the final page always shows a
// full 3 cards by anchoring to the end of the list — so with, say, 5
// events, page 1 is cards 1-3 and page 2 slides back to show cards 3-5
// (reusing card 3) rather than ever showing a half-empty page.
function desktopPageStarts(count, pageSize) {
  if (count <= pageSize) return [0];
  const starts = [];
  for (let start = 0; start < count; start += pageSize) {
    starts.push(Math.min(start, count - pageSize));
  }
  return starts.filter((s, i) => i === 0 || s !== starts[i - 1]);
}

export default function EventsSlider({ events, hideLocation = false }) {
  const isDesktop = useIsDesktop();
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  if (!events.length) return null;

  if (isDesktop) {
    const starts = desktopPageStarts(events.length, DESKTOP_PAGE_SIZE);
    const pageIndex = Math.min(index, starts.length - 1);
    const start = starts[pageIndex];
    const visible = events.slice(start, start + DESKTOP_PAGE_SIZE);

    const goToPage = (next, dir) => {
      if (next < 0 || next >= starts.length) return;
      setDirection(dir);
      setIndex(next);
    };

    return (
      <div className="events-slider events-slider-desktop">
        <div className="events-slider-viewport">
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.div
              key={start}
              className="events-slider-page grid events-grid"
              custom={direction}
              initial={{ x: direction >= 0 ? 60 : -60, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: direction >= 0 ? -60 : 60, opacity: 0 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
            >
              {visible.map((e) => (
                <EventCard e={e} key={e.id} hideLocation={hideLocation} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {starts.length > 1 && (
          <>
            <button
              type="button"
              className="events-slider-arrow events-slider-arrow-left"
              onClick={() => goToPage(pageIndex - 1, -1)}
              disabled={pageIndex === 0}
              aria-label="Previous events"
            >
              ‹
            </button>
            <button
              type="button"
              className="events-slider-arrow events-slider-arrow-right"
              onClick={() => goToPage(pageIndex + 1, 1)}
              disabled={pageIndex === starts.length - 1}
              aria-label="More events"
            >
              ›
            </button>

            <div className="events-slider-dots">
              {starts.map((_, i) => (
                <button
                  type="button"
                  key={i}
                  className={`events-slider-dot${i === pageIndex ? " active" : ""}`}
                  onClick={() => goToPage(i, i > pageIndex ? 1 : -1)}
                  aria-label={`Go to page ${i + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    );
  }

  // Mobile: unchanged — one card at a time, moved by swipe/drag, the
  // arrow buttons, or the dots. No autoplay.
  const mobileIndex = Math.min(index, events.length - 1);

  const goTo = (nextIndex, dir) => {
    if (nextIndex < 0 || nextIndex >= events.length) return;
    setDirection(dir);
    setIndex(nextIndex);
  };

  const handleDragEnd = (_e, info) => {
    const pastDistance = Math.abs(info.offset.x) > SWIPE_DISTANCE;
    const pastVelocity = Math.abs(info.velocity.x) > SWIPE_VELOCITY;
    if (!pastDistance && !pastVelocity) return;

    if (info.offset.x < 0) goTo(mobileIndex + 1, 1);
    else goTo(mobileIndex - 1, -1);
  };

  return (
    <div className="events-slider">
      <div className="events-slider-viewport">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={events[mobileIndex].id}
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
            <EventCard e={events[mobileIndex]} hideLocation={hideLocation} />
          </motion.div>
        </AnimatePresence>
      </div>

      {events.length > 1 && (
        <>
          <button
            type="button"
            className="events-slider-arrow events-slider-arrow-left"
            onClick={() => goTo(mobileIndex - 1, -1)}
            disabled={mobileIndex === 0}
            aria-label="Previous event"
          >
            ‹
          </button>
          <button
            type="button"
            className="events-slider-arrow events-slider-arrow-right"
            onClick={() => goTo(mobileIndex + 1, 1)}
            disabled={mobileIndex === events.length - 1}
            aria-label="Next event"
          >
            ›
          </button>

          <div className="events-slider-dots">
            {events.map((e, i) => (
              <button
                type="button"
                key={e.id}
                className={`events-slider-dot${i === mobileIndex ? " active" : ""}`}
                onClick={() => goTo(i, i > mobileIndex ? 1 : -1)}
                aria-label={`Go to event ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
