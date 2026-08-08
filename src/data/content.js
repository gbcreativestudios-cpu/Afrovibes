// Eagerly import every content JSON file at build time.
// Decap CMS writes/edits these files directly; every git push (including
// CMS saves) triggers a fresh Netlify build that picks up the changes.
const eventModules = import.meta.glob("../../content/events/*.json", { eager: true });
const productModules = import.meta.glob("../../content/products/*.json", { eager: true });
const teamModules = import.meta.glob("../../content/team/*.json", { eager: true });
const siteModule = import.meta.glob("../../content/site.json", { eager: true });

export const events = Object.values(eventModules)
  .map((m) => m.default)
  .sort((a, b) => new Date(a.date) - new Date(b.date));

export const products = Object.values(productModules).map((m) => m.default);

export const team = Object.values(teamModules)
  .map((m) => m.default)
  .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

export const site = Object.values(siteModule)[0]?.default ?? {
  whatsappNumber: "15550000000",
  contactEmail: "hello@afrovibes.ca",
  instagramUrl: "https://instagram.com/",
  tiktokUrl: "https://tiktok.com/",
};

export const money = (n) => `CAD $${Number(n).toFixed(2)}`;
