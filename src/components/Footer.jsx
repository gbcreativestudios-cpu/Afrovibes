import { Link } from "react-router-dom";
import { site } from "../data/content";

export default function Footer() {
  const footerLogo = site.footerLogoImage || site.logoImage;
  const footerLogoHeight = site.footerLogoSize ? `${site.footerLogoSize}px` : undefined;

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col footer-brand">
            <Link className="logo footer-logo" to="/">
              {footerLogo ? (
                <img
                  src={footerLogo}
                  alt="Afrovibes"
                  className="logo-img"
                  style={footerLogoHeight ? { height: footerLogoHeight } : undefined}
                />
              ) : (
                <>
                  AFRO<span>VIBES</span>
                </>
              )}
            </Link>
            <p className="muted">
              Experiences worth showing up for. Bringing people together through fun, interactive
              and unforgettable moments.
            </p>
          </div>

          <div className="footer-bottom-row">
            <div className="footer-col">
              <h4>Explore</h4>
              <div className="footer-links">
                <Link to="/events">Events</Link>
                <Link to="/merch">Merch</Link>
                <Link to="/who-we-are">Who We Are</Link>
                <Link to="/connect">Connect With Us</Link>
              </div>
            </div>

            <div className="footer-col footer-social">
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
        </div>
        <div className="copyright">© 2026 Afrovibes. All rights reserved.</div>
      </div>
    </footer>
  );
}
