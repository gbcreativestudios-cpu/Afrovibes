import { useRef, useState } from "react";
import { motion } from "framer-motion";

// Matches GB Studios' custom Button component: the button nudges toward
// the cursor as it moves over it, then springs back on mouse-leave, using
// the same spring physics GB uses (stiffness 150, damping 15, mass 0.1).
// Disabled on touch/coarse-pointer devices, where there's no hover to track.
const SPRING = { type: "spring", stiffness: 150, damping: 15, mass: 0.1 };
const STRENGTH = 0.35; // fraction of cursor offset the button travels

export default function MagneticButton({ children, className }) {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const isCoarsePointer =
    typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;

  const handleMouseMove = (e) => {
    if (isCoarsePointer || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setPosition({
      x: (e.clientX - rect.left - rect.width / 2) * STRENGTH,
      y: (e.clientY - rect.top - rect.height / 2) * STRENGTH,
    });
  };

  const handleMouseLeave = () => setPosition({ x: 0, y: 0 });

  return (
    <motion.span
      ref={ref}
      className={className}
      style={{ display: "inline-block" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={SPRING}
    >
      {children}
    </motion.span>
  );
}
