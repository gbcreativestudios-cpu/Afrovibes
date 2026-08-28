import { motion } from "framer-motion";
import { EASE } from "./Reveal";

// Mirrors GB Studios' page-transition system: every route is a
// motion.div with its own enter/exit variant, all at duration 0.5 with
// the site's shared ease-out-expo curve. Content pages fade, detail
// pages (event/product) and About get a subtle scale like GB's "about"
// and "project" pages, and Connect gets the deeper scale GB uses for
// its "contact" page.
const VARIANTS = {
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  detail: {
    initial: { opacity: 0, scale: 0.98 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.98 },
  },
  connect: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
  },
};

export default function PageTransition({ children, variant = "fade" }) {
  const v = VARIANTS[variant] || VARIANTS.fade;
  return (
    <motion.div
      initial={v.initial}
      animate={v.animate}
      exit={v.exit}
      transition={{ duration: 0.5, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
