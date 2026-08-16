import Title from "./Title";

// A fully optional home page section — just a title and a paragraph, both
// editable in Decap. Toggled on/off from Decap; renders nothing when off or
// when both fields are empty, so it never shows an accidental blank block.
export default function CustomSection({ enabled, title, paragraph }) {
  const hasText = Boolean(title?.text) || Boolean(paragraph);
  if (!enabled || !hasText) return null;

  return (
    <section className="section custom-section">
      <div className="container custom-section-inner">
        {title?.text && (
          <Title as="h2" text={title.text} color={title.color} category="headline" />
        )}
        {paragraph && <p>{paragraph}</p>}
      </div>
    </section>
  );
}
