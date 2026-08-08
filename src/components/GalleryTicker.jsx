import { useMemo } from "react";

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
  const images = useMemo(() => {
    const all = events.flatMap((e) => e.gallery || []);
    return shuffle(all);
  }, [events]);

  if (images.length === 0) return null;

  // Always duplicate the list, even for a single image, so
  // translateX(-50%) always has a matching second copy to scroll into
  // instead of snapping back at the loop point.
  const track = [...images, ...images];

  return (
    <div className="gallery-ticker-bleed">
      <div className="gallery-ticker" aria-label="Photos from past events">
        <div className="gallery-ticker-track">
          {track.map((src, i) => (
            <div className="gallery-ticker-item" key={i} style={{ backgroundImage: `url('${src}')` }} />
          ))}
        </div>
      </div>
    </div>
  );
}
