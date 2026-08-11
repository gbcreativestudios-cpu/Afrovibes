import { Link } from "react-router-dom";
import { site } from "../data/content";
import SocialIcon from "./SocialIcon";

function socialHref(link) {
  if (link.platform === "email" && link.url && !link.url.startsWith("mailto:")) {
    return `mailto:${link.url}`;
  }
  return link.url;
}

export default function Footer() {
  const footerLogo = site.footerLogoImage || site.logoImage;
  const footerLogoHeight = site.footerLogoSize ? `${site.footerLogoSize}px` : undefined;
  const socialLinks = (site.socialLinks || []).filter((l) => l.url);

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
              {socialLinks.length > 0 && (
                <div className="social-icons">
                  {socialLinks.map((l, i) => (
                    <a
                      key={i}
                      href={socialHref(l)}
                      target={l.platform === "email" ? undefined : "_blank"}
                      rel="noreferrer"
                      aria-label={l.platform}
                    >
                      <SocialIcon platform={l.platform} />
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="copyright">© 2026 Afrovibes. All rights reserved.</div>
      </div>
    </footer>
  );
}
