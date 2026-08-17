import { useMemo } from "react";
import { motion } from "framer-motion";
import { site } from "../data/content";

// Exact same technique as the GB Studios site's Process-section ticker:
// framer-motion animates a plain 0% -> -50% transform, linear, on
// infinite repeat. No JS width measurement or resize listener needed —
// percentage transforms already adapt to the track's real width.
//
// If the gallery has few images, two groups aren't wide enough to fill a
// wide viewport on their own, so each of the two groups repeats the
// image list enough times to guarantee the track always overflows the
// viewport.
const MIN_ITEMS_PER_HALF = 16;
const DURATION = 40; // seconds per loop, matches the previous CSS timing

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

  if (images.length === 0) return null;

  const repeats = Math.max(1, Math.ceil(MIN_ITEMS_PER_HALF / images.length));
  const repeatedImages = Array.from({ length: repeats }, () => images).flat();

  // Two identical groups, each carrying its own trailing gap (via CSS
  // padding-right on .gallery-ticker-group), so translateX(-50%) always
  // travels exactly one group's width and lands on an exact copy — no
  // leftover half-gap at the wrap point.
  const renderGroup = (suffix) => (
    <div className="gallery-ticker-group" aria-hidden={suffix ? "true" : undefined}>
      {repeatedImages.map((src, i) => (
        <div className="gallery-ticker-item" key={`${suffix || "a"}-${i}`} style={{ backgroundImage: `url('${src}')` }} />
      ))}
    </div>
  );

  return (
    <div className="gallery-ticker-bleed">
      <div className="gallery-ticker" aria-label="Photos from past events">
        <motion.div
          className="gallery-ticker-track"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ ease: "linear", duration: DURATION, repeat: Infinity }}
        >
          {renderGroup()}
          {renderGroup("b")}
        </motion.div>
      </div>
    </div>
  );
}
