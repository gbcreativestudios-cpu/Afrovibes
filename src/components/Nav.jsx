import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`nav${scrolled ? " scrolled" : ""}`}>
      <div className="container nav-inner">
        <Link className="logo" to="/">
          AFRO<span>VIBES</span>
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
          {open ? "✕" : "☰"}
        </button>
      </div>
    </nav>
  );
}
