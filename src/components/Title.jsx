// Renders a page/section/event title whose text, font size, weight and
// color can all be set from Decap CMS. `fontSize`/`fontWeight`/`color` are
// optional per-title overrides — when left blank in the CMS, the heading
// falls back to whatever the surrounding CSS class (or `style` prop)
// already defines, so existing pages look unchanged until an editor
// actually sets one.
export default function Title({ as: Tag = "h2", text, fontSize, fontWeight, color, className, style, children }) {
  const merged = { ...style };
  if (fontSize) merged.fontSize = fontSize;
  if (fontWeight) merged.fontWeight = fontWeight;
  if (color) merged.color = color;

  // Editors can force fixed line breaks (independent of viewport width /
  // natural text wrap) by typing "|" where each line should end, e.g.
  // "Come for the|vibe. stay for the|memories". Titles without a "|"
  // render exactly as before.
  const content = text ?? children;
  const lines = typeof content === "string" ? content.split("|") : null;

  return (
    <Tag className={className} style={merged}>
      {lines && lines.length > 1
        ? lines.map((line, i) => (
            <span key={i} style={{ display: "block" }}>
              {line.trim()}
            </span>
          ))
        : content}
    </Tag>
  );
}
