import { useEffect } from "react";
import { site } from "../data/content";

// Global Typography (Round 21). Twelve categories, each independently
// controlling Weight / Size / Line Height / Letter Spacing / Color from
// one Decap panel. Every category's Size is fluid — editors set ONE
// desktop reference number and this file works out a proportional
// mobile size and a smooth scale in between, using a fixed professional
// shrink ratio per category (display text shrinks proportionally more on
// small screens than body text, which needs to stay readable). Nothing
// here needs a second "mobile size" field.
//
// Color works differently: it's the one property that can still be set
// per-item in Decap (per-title, or per-event for event titles). A
// category's global Color only ever overrides those individual colors
// when an editor actually sets it — see Title.jsx for that half of the
// logic. Leaving a category's Color blank here changes nothing.

// Reference viewport widths the fluid scale interpolates between.
const MIN_VIEWPORT_PX = 380;
const MAX_VIEWPORT_PX = 1440;

// [weight, desktopSizePx, mobileRatio, lineHeight, letterSpacingEm]
// mobileRatio x desktopSizePx = the smallest size the category ever
// shrinks to, at MIN_VIEWPORT_PX and below.
const CATEGORY_DEFAULTS = {
  "hero-home": [900, 104, 0.4, 0.9, -0.06],
  "hero-page": [900, 96, 0.4, 0.9, -0.06],
  headline: [900, 72, 0.38, 0.9, -0.055],
  subheading: [900, 24, 0.7, 1.1, -0.03],
  body: [600, 17.6, 0.94, 1.5, 0],
  caption: [700, 20, 0.85, 1.2, -0.01],
  quote: [600, 22, 0.85, 1.4, 0],
  nav: [500, 12.5, 0.92, 1.2, 0.08],
  cta: [600, 11.8, 0.9, 1, 0.08],
  formlabel: [500, 11.5, 0.95, 1.3, 0.1],
  metadata: [700, 12, 0.92, 1.3, 0.09],
  footer: [300, 12, 0.95, 1.4, 0],
};

// Standard "fluid type" formula: a clamp() that holds at minSize below
// MIN_VIEWPORT_PX, holds at maxSize above MAX_VIEWPORT_PX, and scales
// smoothly (viewport-width-driven) in between -- the "professional
// proportion" scaling, not a hard jump at a breakpoint.
function fluidClamp(maxPx, ratio) {
  const maxRem = maxPx / 16;
  const minRem = (maxPx * ratio) / 16;
  const minVwRem = MIN_VIEWPORT_PX / 16;
  const maxVwRem = MAX_VIEWPORT_PX / 16;
  const slope = (maxRem - minRem) / (maxVwRem - minVwRem);
  const intercept = minRem - slope * minVwRem;
  const preferred = `calc(${intercept.toFixed(4)}rem + ${(slope * 100).toFixed(4)}vw)`;
  return `clamp(${minRem.toFixed(4)}rem, ${preferred}, ${maxRem.toFixed(4)}rem)`;
}

export default function TypographySettings() {
  useEffect(() => {
    const scale = site.typographyScale || {};
    const root = document.documentElement.style;

    const apply = (varName, value) => {
      if (value === undefined || value === null || value === "") {
        root.removeProperty(varName);
      } else {
        root.setProperty(varName, value);
      }
    };

    for (const category of Object.keys(CATEGORY_DEFAULTS)) {
      const [defWeight, defSize, ratio, defLine, defTracking] = CATEGORY_DEFAULTS[category];
      const c = scale[category] || {};

      const weight = c.weight || defWeight;
      const sizePx = Number(c.size) > 0 ? Number(c.size) : defSize;
      const line = c.lineHeight || defLine;
      const tracking = c.letterSpacing !== undefined && c.letterSpacing !== "" ? c.letterSpacing : defTracking;

      apply(`--t-${category}-weight`, weight);
      apply(`--t-${category}-size`, fluidClamp(sizePx, ratio));
      apply(`--t-${category}-line`, line);
      apply(`--t-${category}-tracking`, `${tracking}em`);
      // Color as a plain CSS var, consumed directly by categories that
      // have no per-item color stored anywhere (body copy, nav, CTAs,
      // form labels, metadata, footer). The categories that DO have an
      // individual per-item color (hero-home, hero-page, headline,
      // subheading, caption when used for titles) resolve their color
      // override in Title.jsx/JS instead, since a plain CSS var can't
      // override an inline per-item color -- see that file.
      apply(`--t-${category}-color`, c.color);
    }
  }, []);

  return null;
}
