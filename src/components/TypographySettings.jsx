import { useEffect } from "react";
import { site } from "../data/content";

// Applies the CMS-editable typography controls (Site Settings → Text
// Weights) as CSS custom properties on the document root. Each control
// is independent — setting one (e.g. Footer Text Weight) only ever
// touches the CSS variable it owns, so it can never bleed into a
// section that reads a different variable. Leaving a field blank in the
// CMS falls through to the per-selector fallback already baked into
// index.css, so nothing needs a value set to look right.
export default function TypographySettings() {
  useEffect(() => {
    const t = site.typography || {};
    const root = document.documentElement.style;

    const apply = (varName, value) => {
      if (value === undefined || value === null || value === "") {
        root.removeProperty(varName);
      } else {
        root.setProperty(varName, value);
      }
    };

    apply("--weight-footer", t.footerWeight);
    apply("--weight-about-body", t.aboutBodyWeight);
    apply("--weight-home-body", t.homeBodyWeight);
    apply("--weight-events-body", t.eventsBodyWeight);
    apply("--weight-event-detail-body", t.eventDetailBodyWeight);
    apply("--weight-merch-body", t.merchBodyWeight);
    apply("--weight-product-detail-body", t.productDetailBodyWeight);
    apply("--weight-connect-body", t.connectBodyWeight);
    apply("--values-heading-weight", t.valuesHeadingWeight);
    apply("--values-heading-color", t.valuesHeadingColor);
    apply("--values-heading-size", t.valuesHeadingSize);
  }, []);

  return null;
}
