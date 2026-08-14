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

  return (
    <Tag className={className} style={merged}>
      {text || children}
    </Tag>
  );
}
