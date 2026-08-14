// Eagerly import every content JSON file at build time.
// Decap CMS writes/edits these files directly; every git push (including
// CMS saves) triggers a fresh Netlify build that picks up the changes.
const eventModules = import.meta.glob("../../content/events/*.json", { eager: true });
const productModules = import.meta.glob("../../content/products/*.json", { eager: true });
const teamModules = import.meta.glob("../../content/team/*.json", { eager: true });
const siteModule = import.meta.glob("../../content/site.json", { eager: true });
const titlesModule = import.meta.glob("../../content/titles.json", { eager: true });

export const events = Object.values(eventModules)
  .map((m) => m.default)
  .sort((a, b) => a.date.localeCompare(b.date));

export const products = Object.values(productModules).map((m) => m.default);

export const team = Object.values(teamModules)
  .map((m) => m.default)
  .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

export const site = Object.values(siteModule)[0]?.default ?? {
  whatsappNumber: "15550000000",
  contactEmail: "hello@afrovibes.ca",
  instagramUrl: "https://instagram.com/",
  tiktokUrl: "https://tiktok.com/",
  logoImage: "",
  footerLogoImage: "",
  footerLogoSize: null,
  favicon: "",
  galleryTickerLimit: 10,
  heroBackground: { enabled: false, interval: 4, images: [] },
  heroScrollIndicator: { enabled: true },
  partners: { enabled: true, bgColor: "", logos: [] },
  customSection: { enabled: false, paragraph: "" },
  nextEventBg: { color: "" },
  aboutBanner: { enabled: false, image: "", text: "", size: "compact" },
  aboutFeatures: {
    greatPeopleImage: "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?auto=format&fit=crop&w=1200&q=85",
    bringPeopleImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=85",
    redefineImage: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=85",
  },
  eventThumbnails: {
    next: "adapt",
    upcoming: "adapt",
    pastEvents: "adapt",
    pastHome: "adapt",
  },
  buttonSlots: {
    navCta: { action: "tickets", label: "", enabled: true },
    heroPrimary: { action: "events", label: "", enabled: true },
    heroSecondary: { action: "merch", label: "", enabled: true },
  },
  socialLinks: [],
  typography: {
    footerWeight: "",
    footerBodyColor: "",
    aboutBodyWeight: "",
    homeBodyWeight: "",
    eventsBodyWeight: "",
    eventDetailBodyWeight: "",
    merchBodyWeight: "",
    productDetailBodyWeight: "",
    connectBodyWeight: "",
    homeBodyColor: "",
    eventsBodyColor: "",
    eventDetailBodyColor: "",
    aboutBodyColor: "",
    merchBodyColor: "",
    productDetailBodyColor: "",
    connectBodyColor: "",
    valuesHeadingWeight: "",
    valuesHeadingColor: "",
    valuesHeadingSize: "",
  }
};

// Content JSON files predating a given round won't have every new nested
// object yet (e.g. a site.json saved before heroBackground existed). This
// backfills any missing nested settings with safe defaults so the site
// never crashes reading `site.heroBackground.images` etc. on older data.
const siteDefaults = {
  heroBackground: { enabled: false, interval: 4, images: [] },
  heroScrollIndicator: { enabled: true },
  upcomingEventsViewAll: { enabled: false },
  partners: { enabled: true, bgColor: "", logos: [] },
  customSection: { enabled: false, paragraph: "" },
  nextEventBg: { color: "" },
  aboutBanner: { enabled: false, image: "", text: "", size: "compact" },
  aboutFeatures: {
    greatPeopleImage: "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?auto=format&fit=crop&w=1200&q=85",
    bringPeopleImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=85",
    redefineImage: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=85",
  },
  eventThumbnails: {
    next: "adapt",
    upcoming: "adapt",
    pastEvents: "adapt",
    pastHome: "adapt",
  },
  buttonSlots: {
    navCta: { action: "tickets", label: "", enabled: true },
    heroPrimary: { action: "events", label: "", enabled: true },
    heroSecondary: { action: "merch", label: "", enabled: true },
  },
  typography: {
    footerWeight: "",
    footerBodyColor: "",
    aboutBodyWeight: "",
    homeBodyWeight: "",
    eventsBodyWeight: "",
    eventDetailBodyWeight: "",
    merchBodyWeight: "",
    productDetailBodyWeight: "",
    connectBodyWeight: "",
    homeBodyColor: "",
    eventsBodyColor: "",
    eventDetailBodyColor: "",
    aboutBodyColor: "",
    merchBodyColor: "",
    productDetailBodyColor: "",
    connectBodyColor: "",
    valuesHeadingWeight: "",
    valuesHeadingColor: "",
    valuesHeadingSize: "",
  }
};
if (!Array.isArray(site.socialLinks)) site.socialLinks = [];
for (const key of Object.keys(siteDefaults)) {
  if (!site[key]) site[key] = siteDefaults[key];
  else if (typeof siteDefaults[key] === "object" && !Array.isArray(siteDefaults[key])) {
    site[key] = { ...siteDefaults[key], ...site[key] };
  }
}

export const titles = Object.values(titlesModule)[0]?.default ?? {};

// Reads a CMS-editable title. `group`/`key` locate it inside titles.json;
// `fallbackText` is only used if that entry is missing (e.g. the JSON
// hasn't been re-published yet), so pages never render blank headings.
// fontSize/color come back as undefined (not "") when unset, so <Title>'s
// "only override if truthy" check falls through to the CSS/style default.
export function getTitle(group, key, fallbackText = "") {
  const entry = titles?.[group]?.[key] || {};
  return {
    text: entry.text || fallbackText,
    fontSize: entry.fontSize || undefined,
    color: entry.color || undefined,
  };
}

export const money = (n) => `CAD $${Number(n).toFixed(2)}`;

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

// Events store date as an ISO "YYYY-MM-DD" string (reliable to sort/compare
// across every browser). This turns that into the full "August 19, 2026"
// display format used throughout the site, without ever constructing a Date object
// (Safari/WebKit parses non-ISO date strings inconsistently, which is what
// caused events to display out of order before).
export function formatEventDate(iso) {
  const [year, month, day] = iso.split("-").map(Number);
  return `${MONTHS[month - 1]} ${day}, ${year}`;
}

// Today as a local "YYYY-MM-DD" string. Built from local date parts (not
// `new Date().toISOString()`, which is UTC and can land on the wrong day
// depending on the visitor's timezone) so the past/upcoming split matches
// what the calendar actually shows wherever someone is viewing the site.
function todayISO() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

// An event is "past" the day after its date — the event's own day still
// counts as current/upcoming. This is computed from the date automatically;
// there's no manual "PAST" status to keep in sync by hand.
export function isPastEvent(e) {
  return e.date < todayISO();
}

export function getUpcomingEvents(list = events) {
  return list.filter((e) => !isPastEvent(e)).sort((a, b) => a.date.localeCompare(b.date));
}

export function getNextEvent(list = events) {
  return getUpcomingEvents(list)[0] ?? null;
}

export function isNextEvent(e, list = events) {
  const next = getNextEvent(list);
  return Boolean(next && e?.id === next.id);
}
