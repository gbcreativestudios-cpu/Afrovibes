import { Link } from "react-router-dom";
import { site } from "../data/content";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <Link className="logo" to="/">
              {site.logoImage ? (
                <img src={site.logoImage} alt="Afrovibes" className="logo-img" />
              ) : (
                <>
                  AFRO<span>VIBES</span>
                </>
              )}
            </Link>
            <p className="muted" style={{ maxWidth: 330 }}>
              Experiences worth showing up for. Bringing people together through fun, interactive
              and unforgettable moments.
            </p>
          </div>
          <div>
            <h4>Explore</h4>
            <div className="footer-links">
              <Link to="/events">Events</Link>
              <Link to="/merch">Merch</Link>
              <Link to="/who-we-are">Who We Are</Link>
              <Link to="/connect">Connect With Us</Link>
            </div>
          </div>
          <div>
            <h4>Social</h4>
            <div className="footer-links">
              <a href={site.instagramUrl} target="_blank" rel="noreferrer">
                Instagram
              </a>
              <a href={site.tiktokUrl} target="_blank" rel="noreferrer">
                TikTok
              </a>
              <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>
            </div>
          </div>
        </div>
        <div className="copyright">© 2026 Afrovibes. All rights reserved.</div>
      </div>
    </footer>
  );
}
