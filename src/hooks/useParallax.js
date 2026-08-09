import { useEffect, useRef } from "react";

// Subtle scroll-linked parallax for background-image elements. Sets a
// `--parallax-y` CSS custom property on the element itself (consumed by
// index.css as an offset inside `background-position`), so it never
// touches layout, height, or the element's own background-image.
//
// Disabled on mobile (perf) and when the user has asked for reduced
// motion. `strength` is roughly the max pixel offset in either direction.
export default function useParallax(strength = 40) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const isMobile = window.matchMedia("(max-width: 900px)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isMobile || reduced) return;

    let ticking = false;

    const update = () => {
      ticking = false;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      // -1 when the element is a full viewport above, +1 when a full
      // viewport below, 0 when its center matches the viewport center.
      const progress = (rect.top + rect.height / 2 - vh / 2) / vh;
      const offset = Math.max(-1, Math.min(1, progress)) * strength;
      el.style.setProperty("--parallax-y", `${offset.toFixed(1)}px`);
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
    };
  }, [strength]);

  return ref;
}
