import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { site } from "../data/content";

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
        <div className={`nav-links${open ? " open" : ""}`} id="navLinks">
          <Link to="/events" onClick={() => setOpen(false)}>
            Events
          </Link>
          <Link to="/merch" onClick={() => setOpen(false)}>
            Merch
          </Link>
          <Link to="/who-we-are" onClick={() => setOpen(false)}>
            Who We Are
          </Link>
          <Link to="/connect" onClick={() => setOpen(false)}>
            Connect
          </Link>
          <Link className="nav-cta" to="/events" onClick={() => setOpen(false)}>
            Get Tickets
          </Link>
        </div>
        <Link className="nav-cta" to="/events">
          Get Tickets
        </Link>
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
    </nav>
  );
}
