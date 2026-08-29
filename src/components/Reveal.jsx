import { forwardRef, useMemo } from "react";
import { motion } from "framer-motion";

// GB Studios' signature entrance curve — a strong ease-out-expo used
// site-wide for anything animating into view (hero copy, section
// content, grid cards). Everything in this file shares it so the two
// sites feel like the same motion system.
export const EASE = [0.16, 1, 0.3, 1];

function resolveMotionComponent(as) {
  if (typeof as === "string") return motion[as] || motion.div;
  return motion(as);
}

// On-mount reveal — plays immediately on render rather than waiting for
// scroll. Use for anything already in the viewport at load: hero copy,
// page-hero copy, banners. Mirrors GB's hero treatment: opacity + y:30->0,
// duration 0.8, the shared ease-out-expo curve. forwardRef so callers
// (e.g. useParallax) can still attach a ref to the underlying element.
export const FadeIn = forwardRef(function FadeIn(
  { as = "div", children, delay = 0, y = 30, className, style, ...rest },
  ref
) {
  const Comp = useMemo(() => resolveMotionComponent(as), [as]);
  return (
    <Comp
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay, ease: EASE }}
      className={className}
      style={style}
      {...rest}
    >
      {children}
    </Comp>
  );
});

// Scroll-triggered reveal — same easing/duration as FadeIn, but plays
// once when the element scrolls into view. `index` gives grids of cards
// GB's per-card stagger (delay: i * 0.1). `hoverLift` adds a Framer
// Motion-driven hover lift (translateY) instead of a CSS :hover
// transition — keeping transform fully owned by Framer Motion avoids the
// "double motion" that showed up when a CSS transition on the same
// element tried to smooth the same property Framer was already
// animating.
export const Reveal = forwardRef(function Reveal(
  { as = "div", children, index = 0, y = 30, className, style, once = true, hoverLift = false, ...rest },
  ref
) {
  const Comp = useMemo(() => resolveMotionComponent(as), [as]);
  return (
    <Comp
      ref={ref}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.2 }}
      whileHover={hoverLift ? { y: -5, transition: { duration: 0.25, ease: EASE } } : undefined}
      transition={{ duration: 0.8, delay: index * 0.1, ease: EASE }}
      className={className}
      style={style}
      {...rest}
    >
      {children}
    </Comp>
  );
});
