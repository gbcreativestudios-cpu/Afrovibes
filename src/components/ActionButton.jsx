import { Link } from "react-router-dom";
import { getNextEvent } from "../data/content";

// The 3 fixed destinations every button "slot" on the site can be set to.
// Editors never change where these go — only which one appears in which
// slot, and whether that slot is shown at all (see each slot's Decap
// fields: `action`, `label`, `enabled`). Styling (color/shape) belongs to
// the slot itself, not the action — so dropping Shop Merch into the nav's
// slot picks up the nav slot's own look automatically.
const ACTIONS = {
  tickets: {
    defaultLabel: "Get Tickets",
    resolveHref() {
      const next = getNextEvent();
      if (next && next.status === "TICKETS AVAILABLE" && next.url) {
        return { href: next.url, external: true };
      }
      return { to: "/events" };
    },
  },
  events: {
    defaultLabel: "Explore Events",
    resolveHref: () => ({ to: "/events" }),
  },
  merch: {
    defaultLabel: "Shop Merch",
    resolveHref: () => ({ to: "/merch" }),
  },
};

// `slot` is a { action, label, enabled } object read from site.json
// (e.g. site.buttonSlots.heroPrimary). `className` is the slot's own
// fixed visual style (e.g. "nav-cta", "btn btn-primary btn-purple") —
// pass it from the call site so the slot's look never changes, only
// what fills it. Returns null when the slot is off or points at an
// unknown action, so callers can render unconditionally.
export default function ActionButton({ slot, className, onClick }) {
  if (!slot || slot.enabled === false) return null;

  const action = ACTIONS[slot.action];
  if (!action) return null;

  const label = slot.label?.trim() || action.defaultLabel;
  const dest = action.resolveHref();

  if (dest.external) {
    return (
      <a className={className} href={dest.href} target="_blank" rel="noreferrer" onClick={onClick}>
        {label}
      </a>
    );
  }

  return (
    <Link className={className} to={dest.to} onClick={onClick}>
      {label}
    </Link>
  );
}
