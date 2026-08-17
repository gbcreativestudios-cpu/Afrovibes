import { motion } from "framer-motion";
import Title from "./Title";

// Shows a "Our Partners" title above a strip of partner/sponsor logos that
// scroll in an infinite loop. The whole section (title + strip) is toggled
// on/off from Decap; the strip's background color also comes from Decap and
// falls back to the theme's default dark panel when left blank.
//
// Exact same technique as the GB Studios site's BrandTicker: framer-motion
// animates a plain 0% -> -50% transform, linear, on infinite repeat — no
// JS width measurement needed, and the logo list repeats enough times to
// guarantee the track always overflows the viewport even with very few
// partner logos.
const MIN_ITEMS_PER_HALF = 12;
const DURATION = 26; // seconds per loop, matches the previous CSS timing

export default function PartnersSection({ enabled, bgColor, logos, title }) {
  // Decap's list widget (single sub-field, no wrapper) saves each entry as
  // a plain URL string, not `{ url }` — handle both shapes, same as
  // HeroBackground does for the hero slideshow images.
  const list = (logos || [])
    .map((l) => (typeof l === "string" ? l : l?.url))
    .filter(Boolean);

  if (!enabled || list.length === 0) return null;

  const repeats = Math.max(1, Math.ceil(MIN_ITEMS_PER_HALF / list.length));
  const track = Array.from({ length: repeats * 2 }, () => list).flat();

  return (
    <section className="section partners-section" style={bgColor ? { backgroundColor: bgColor } : undefined}>
      <div className="container">
        <div className="section-head partners-head">
          <Title as="h2" text={title.text} color={title.color} category="headline" />
        </div>
      </div>
      <div className="partners-strip">
        <motion.div
          className="partners-track"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ ease: "linear", duration: DURATION, repeat: Infinity }}
        >
          {track.map((url, i) => (
            <div className="partners-logo" key={i}>
              <img src={url} alt="Partner logo" loading="lazy" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
