import Title from "./Title";

// Shows a "Our Partners" title above a strip of partner/sponsor logos that
// scroll in an infinite loop. The whole section (title + strip) is toggled
// on/off from Decap; the strip's background color also comes from Decap and
// falls back to the theme's default dark panel when left blank.
export default function PartnersSection({ enabled, bgColor, logos, title }) {
  // Decap's list widget (single sub-field, no wrapper) saves each entry as
  // a plain URL string, not `{ url }` — handle both shapes, same as
  // HeroBackground does for the hero slideshow images.
  const list = (logos || [])
    .map((l) => (typeof l === "string" ? l : l?.url))
    .filter(Boolean);

  if (!enabled || list.length === 0) return null;

  const track = [...list, ...list];

  return (
    <section className="section partners-section">
      <div className="container">
        <div className="section-head partners-head">
          <Title as="h2" text={title.text} fontSize={title.fontSize} color={title.color} />
        </div>
      </div>
      <div className="partners-strip" style={bgColor ? { backgroundColor: bgColor } : undefined}>
        <div className="partners-track">
          {track.map((url, i) => (
            <div className="partners-logo" key={i}>
              <img src={url} alt="Partner logo" loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
