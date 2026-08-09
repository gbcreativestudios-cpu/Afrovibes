import { useEffect, useState } from "react";
import useParallax from "../hooks/useParallax";

// Crossfades through a list of images every `interval` seconds. Renders
// nothing (falls through to the section's own solid black background) when
// disabled or no images are set.
export default function HeroBackground({ enabled, interval, images }) {
  const [active, setActive] = useState(0);
  const list = (images || []).map((i) => i.url).filter(Boolean).slice(0, 3);
  const parallaxRef = useParallax(50);

  useEffect(() => {
    if (!enabled || list.length < 2) return;
    const ms = Math.max(3, Math.min(5, Number(interval) || 4)) * 1000;
    const id = setInterval(() => {
      setActive((a) => (a + 1) % list.length);
    }, ms);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, interval, list.length]);

  if (!enabled || list.length === 0) return null;

  return (
    <div className="hero-slides" ref={parallaxRef}>
      {list.map((url, i) => (
        <div
          key={i}
          className={`hero-slide${i === active ? " active" : ""}`}
          style={{ backgroundImage: `url('${url}')` }}
        />
      ))}
    </div>
  );
}
