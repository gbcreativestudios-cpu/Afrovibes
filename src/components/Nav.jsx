import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { site } from "../data/content";
import ActionButton from "./ActionButton";
import { EASE } from "./Reveal";

function NavLinks({ onLinkClick }) {
  return (
    <>
      <Link to="/events" onClick={onLinkClick}>
        Events
      </Link>
      <Link to="/merch" onClick={onLinkClick}>
        Merch
      </Link>
      <Link to="/who-we-are" onClick={onLinkClick}>
        Who We Are
      </Link>
      <Link to="/connect" onClick={onLinkClick}>
        Connect
      </Link>
      <ActionButton slot={site.buttonSlots?.navCta} className="nav-cta" onClick={onLinkClick} />
    </>
  );
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Expose the nav's real rendered height as a CSS variable so sections
  // like the homepage hero and the Who We Are banner can start right
  // after it (instead of guessing a fixed pixel value that breaks if the
  // logo image or padding ever changes).
  useEffect(() => {
    const el = navRef.current;
    if (!el) return;

    const setHeight = () => {
      document.documentElement.style.setProperty("--nav-height", `${el.offsetHeight}px`);
    };

    setHeight();
    const observer = new ResizeObserver(setHeight);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <nav className={`nav${scrolled ? " scrolled" : ""}`} ref={navRef}>
      <div className="container nav-inner">
        <Link className="logo" to="/">
          {site.logoImage ? (
            <img src={site.logoImage} alt="Afrovibes" className="logo-img" />
          ) : (
            <>
              AFRO<span>VIBES</span>
            </>
          )}
        </Link>
        {/* Desktop nav links — always mounted, hidden on mobile via CSS.
            No animation needed here; the mobile overlay below handles
            the animated open/close, matching GB's mobile menu treatment
            without disturbing the always-visible desktop nav. */}
        <div className="nav-links" id="navLinks">
          <NavLinks onLinkClick={() => {}} />
        </div>
        <ActionButton slot={site.buttonSlots?.navCta} className="nav-cta" />
        <button className="menu" onClick={() => setOpen((v) => !v)} aria-label="Toggle menu">
          {open ? (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M2 2L18 18M18 2L2 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M2 5H18M2 10H18M2 15H18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu overlay — matches GB's AnimatePresence fade/slide
          treatment (opacity + y:-20, duration ~0.35) instead of a plain
          display toggle. */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="nav-links open"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            <NavLinks onLinkClick={() => setOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
