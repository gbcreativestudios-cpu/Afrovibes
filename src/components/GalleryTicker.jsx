import { useMemo } from "react";
import { motion } from "framer-motion";
import { site } from "../data/content";
import useTickerSpeed from "../hooks/useTickerSpeed";

// Exact same technique as the GB Studios site's Process-section ticker:
// framer-motion animates a plain 0% -> -50% transform, linear, on
// infinite repeat. The duration comes from useTickerSpeed, which
// measures this ticker's real rendered width once and converts it to a
// duration matching the same px/second speed as every other ticker on
// the site — that's what keeps this feeling identical to the partner
// logos strip instead of reading as sluggish on some screens.

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

  const { trackRef, repeats, duration } = useTickerSpeed(images.length);

  if (images.length === 0) return null;

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
          ref={trackRef}
          className="gallery-ticker-track"
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
