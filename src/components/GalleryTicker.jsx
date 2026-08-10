import { useEffect, useMemo, useRef } from "react";
import { site } from "../data/content";

// Constant on-screen speed in px/second. A fixed animation *duration*
// (the old approach) covers a much shorter distance on mobile, since the
// cards are narrower there — same time, less travel, so it reads as
// almost frozen. Deriving the duration from the track's real scrollWidth
// keeps the visual speed constant across every screen size.
const PX_PER_SECOND = 190;

// Deterministic shuffle (no external deps, stable across re-renders for the
// same input) so the order looks "random" without reshuffling on every
// render, which would make the loop visibly jump.
function shuffle(arr) {
  const a = [...arr];
  let seed = a.length + 1;
  const rand = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function GalleryTicker({ events }) {
  const limit = Number(site.galleryTickerLimit) > 0 ? Number(site.galleryTickerLimit) : 10;

  const images = useMemo(() => {
    // Only ever pull from each event's image gallery — video links live in
    // a separate `galleryVideos` field and are never picked up here.
    const all = events.flatMap((e) => e.gallery || []);
    return shuffle(all).slice(0, limit);
  }, [events, limit]);

  const trackRef = useRef(null);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const setSpeed = () => {
      // scrollWidth spans both duplicated copies; translateX(-50%) only
      // needs to travel one copy's worth of distance per loop.
      const distance = el.scrollWidth / 2;
      if (distance > 0) {
        el.style.animationDuration = `${distance / PX_PER_SECOND}s`;
      }
    };

    setSpeed();
    window.addEventListener("resize", setSpeed);
    return () => window.removeEventListener("resize", setSpeed);
  }, [images]);

  if (images.length === 0) return null;

  // Two identical groups, each carrying its own trailing gap (via CSS
  // padding-right on .gallery-ticker-group), so translateX(-50%) always
  // travels exactly one group's width and lands on an exact copy —
  // no leftover half-gap at the wrap point, which is what produced the
  // blank flash before the next copy caught up.
  const renderGroup = (suffix) => (
    <div className="gallery-ticker-group" aria-hidden={suffix ? "true" : undefined}>
      {images.map((src, i) => (
        <div className="gallery-ticker-item" key={`${suffix || "a"}-${i}`} style={{ backgroundImage: `url('${src}')` }} />
      ))}
    </div>
  );

  return (
    <div className="gallery-ticker-bleed">
      <div className="gallery-ticker" aria-label="Photos from past events">
        <div className="gallery-ticker-track" ref={trackRef}>
          {renderGroup()}
          {renderGroup("b")}
        </div>
      </div>
    </div>
  );
}
