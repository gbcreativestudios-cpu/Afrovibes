import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Site-wide fade/slide-in on load and on scroll. Runs as a plain DOM
// pass (not React state) so it works across every page without having
// to hand-wire a class onto every component, and re-scans on each route
// change since React Router swaps content without a full page reload.
const SELECTOR = [
  ".hero-content",
  ".page-hero > .container > *",
  ".about-banner",
  ".section-head",
  ".event-card",
  ".product-card",
  ".team-card",
  ".value",
  ".past-gallery-card",
  ".past-row",
  ".detail-hero",
  ".detail-content aside",
  ".connect-form",
  ".footer-col",
].join(",");

export default function ScrollReveal() {
  const { pathname } = useLocation();

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const nodes = Array.from(document.querySelectorAll(SELECTOR));
    if (nodes.length === 0) return;

    if (reduced) {
      nodes.forEach((n) => n.classList.add("reveal-in"));
      return;
    }

    nodes.forEach((n, i) => {
      n.classList.add("reveal");
      n.style.transitionDelay = `${Math.min(i % 6, 5) * 60}ms`;
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );

    nodes.forEach((n) => observer.observe(n));

    // Anything already on-screen at first paint (hero, page-hero copy)
    // should animate in immediately instead of waiting on a scroll event.
    const raf = requestAnimationFrame(() => {
      nodes.forEach((n) => {
        const rect = n.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          n.classList.add("reveal-in");
          observer.unobserve(n);
        }
      });
    });

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, [pathname]);

  return null;
}
