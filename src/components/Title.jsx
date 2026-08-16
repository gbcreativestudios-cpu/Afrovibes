import { site } from "../data/content";

// Renders a page/section/event/card title. `color` is the individual
// per-title override (still editable per-item in Decap, or per-event for
// event titles). `category` identifies which global typography bucket
// (Site Settings → Global Typography) this title belongs to — if that
// category has its own color set, it wins over the individual color;
// leaving the global color blank means nothing changes here and the
// individual color (or the theme default, if that's blank too) applies
// as before. Font size, weight, line-height and letter-spacing all come
// from the category's CSS rules — no per-title override for those
// anymore, so every title in a category always matches.
export default function Title({ as: Tag = "h2", text, color, category, className, style, children }) {
  const globalColor = category ? site.typographyScale?.[category]?.color : undefined;
  const finalColor = globalColor || color || undefined;

  const merged = { ...style };
  if (finalColor) merged.color = finalColor;

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
