import { team, getTitle, site } from "../data/content";
import Title from "../components/Title";
import useParallax from "../hooks/useParallax";

export default function About() {
  const parallaxRef = useParallax(40);
  const heroTitle = getTitle("about", "heroTitle", "Who We Are.");
  const greatPeopleTitle = getTitle("about", "greatPeopleTitle", "Great People. Great Experiences.");
  const bringPeopleTitle = getTitle("about", "bringPeopleTitle", "Bring People Together.");
  const redefineTitle = getTitle("about", "redefineTitle", "Redefine Connection.");
  const teamTitle = getTitle("about", "teamTitle", "Meet The Team.");

  const banner = site.aboutBanner;
  const features = site.aboutFeatures || {};

  return (
    <main className="about-page">
      {banner?.enabled && (
        <section
          ref={parallaxRef}
          className={`about-banner${banner.size === "landscape" ? " about-banner-landscape" : ""}`}
          style={banner.image ? { backgroundImage: `url('${banner.image}')` } : undefined}
        >
          {banner.text && (
            <div className="container">
              <p>{banner.text}</p>
            </div>
          )}
        </section>
      )}

      <section className="page-hero">
        <div className="container">
          <Title as="h1" text={heroTitle.text} color={heroTitle.color} category="hero-page" />
          <p className="about-copy">
            Afrovibes is a social experience brand dedicated to bringing people together through
            unforgettable events that inspire connection, excitement, and lasting memories.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container about-feature-grid about-feature-image-left">
          <div
            className="about-feature-media"
            style={features.greatPeopleImage ? { backgroundImage: `url('${features.greatPeopleImage}')` } : undefined}
          />
          <div className="about-feature-text">
            <Title as="h2" text={greatPeopleTitle.text} color={greatPeopleTitle.color} category="headline" />
            <p className="about-copy">
              We believe the best moments happen when great people share great experiences.
              That's why we create events that are engaging, inclusive, and designed to leave
              everyone with stories worth telling.
            </p>
            <div className="values">
              <div className="value">
                <strong>Connection</strong>
                <p>Creating spaces for genuine interaction.</p>
              </div>
              <div className="value">
                <strong>Adventure</strong>
                <p>Giving people a reason to try something different.</p>
              </div>
              <div className="value">
                <strong>Community</strong>
                <p>Building a vibrant community where everyone feels welcome.</p>
              </div>
              <div className="value">
                <strong>Memories</strong>
                <p>Designing moments worth remembering.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section statement">
        <div className="container about-feature-grid">
          <div
            className="about-feature-media"
            style={features.bringPeopleImage ? { backgroundImage: `url('${features.bringPeopleImage}')` } : undefined}
          />
          <div className="about-feature-text">
            <Title as="h2" text={bringPeopleTitle.text} color={bringPeopleTitle.color} category="headline" />
            <p className="about-copy">
              To create exceptional social experiences that bring people together through fun,
              interactive, and thoughtfully curated events, fostering genuine connections,
              unforgettable memories, and a vibrant community where everyone feels welcome.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container about-feature-grid about-feature-image-left">
          <div
            className="about-feature-media"
            style={features.redefineImage ? { backgroundImage: `url('${features.redefineImage}')` } : undefined}
          />
          <div className="about-feature-text">
            <Title as="h2" text={redefineTitle.text} color={redefineTitle.color} category="headline" />
            <p className="about-copy">
              To become the leading lifestyle and experience brand known for redefining how people
              connect, celebrate, and create memories through innovative events that inspire
              community and meaningful human interaction.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <Title as="h2" text={teamTitle.text} color={teamTitle.color} category="headline" />
            </div>
          </div>
          <div className="grid team-grid">
            {team.map((t, i) => (
              <div className="team-card" key={i}>
                <img src={t.image} alt={t.name} />
                <h3>{t.name}</h3>
                <p>{t.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
