import { Link } from "react-router-dom";
import { events, products, money, formatEventDate, getTitle, isPastEvent, site } from "../data/content";
import { FeaturedEventCard, thumbnailMode } from "../components/EventCards";
import EventsSlider from "../components/EventsSlider";
import HeroBackground from "../components/HeroBackground";
import Title from "../components/Title";
import ActionButton from "../components/ActionButton";
import PartnersSection from "../components/PartnersSection";
import CustomSection from "../components/CustomSection";
import ScrollIndicator from "../components/ScrollIndicator";
import MagneticButton from "../components/MagneticButton";
import { FadeIn, Reveal } from "../components/Reveal";

function PastHomeCard({ e, small = false, index = 0 }) {
  const mode = thumbnailMode("pastHome");
  const ratioStyle = mode !== "adapt" ? { aspectRatio: mode.replace(":", "/") } : undefined;
  return (
    <Reveal
      as={Link}
      className={`past-card${small ? " small" : ""} ${mode === "adapt" ? "thumbnail-adapt" : "thumbnail-ratio"}`}
      to={`/event/${e.id}`}
      style={ratioStyle}
      index={index}
    >
      <img src={e.image} alt={e.title} />
      <div className="past-card-content">
        <div className="event-meta" style={{ color: "var(--white)", marginBottom: 8 }}>
          {formatEventDate(e.date)}
        </div>
        <Title as="h3" text={e.title} color={e.titleColor} category="subheading" />
      </div>
    </Reveal>
  );
}

export default function Home() {
  const upcoming = events.filter((e) => !isPastEvent(e));
  const next = upcoming[0];
  const rest = upcoming.slice(1, 4);
  const past = events.filter(isPastEvent);

  const heroTitle = getTitle("home", "heroTitle", "Make Plans. Make Memories.");
  const nextEventTitle = getTitle("home", "nextEventTitle", "Next Event.");
  const upcomingEventTitle = getTitle("home", "upcomingEventTitle", "Upcoming Event.");
  const pastVibesTitle = getTitle("home", "pastVibesTitle", "Past Vibes.");
  const statementTitle = getTitle("home", "statementTitle", "The Best Memories Are Shared.");
  const mediaLinkText = getTitle("home", "mediaLinkText", "View Our Media");
  const merchTeaserTitle = getTitle("home", "merchTeaserTitle", "Wear The Vibe.");
  const partnersTitle = getTitle("home", "partnersTitle", "Our Partners");
  const customSectionTitle = getTitle("home", "customSectionTitle", "");

  const nextEventBg = site.nextEventBg?.color || undefined;

  return (
    <main className="home-page">
      <section className="hero">
        <HeroBackground
          enabled={site.heroBackground?.enabled}
          interval={site.heroBackground?.interval}
          images={site.heroBackground?.images}
        />
        <div className="hero-bg" />
        <FadeIn className="container hero-content hero-content-pushed">
          <Title as="h1" text={heroTitle.text} color={heroTitle.color} category="hero-home" />
          <div className="actions actions-stack-mobile">
            <MagneticButton>
              <ActionButton slot={site.buttonSlots?.heroPrimary} className="btn btn-primary btn-purple" />
            </MagneticButton>
            <ActionButton slot={site.buttonSlots?.heroSecondary} className="btn btn-outline" />
          </div>
        </FadeIn>
        <ScrollIndicator enabled={site.heroScrollIndicator?.enabled ?? true} />
      </section>

      <PartnersSection
        enabled={site.partners?.enabled ?? true}
        bgColor={site.partners?.bgColor}
        logos={site.partners?.logos}
        logoHeight={site.partners?.logoHeight}
        logoGap={site.partners?.logoGap}
        title={partnersTitle}
      />

      <CustomSection
        enabled={site.customSection?.enabled ?? false}
        title={customSectionTitle}
        paragraph={site.customSection?.paragraph}
      />

      {next && (
        <section className="section" style={{ backgroundColor: nextEventBg || "var(--purple)" }}>
          <div className="container">
            <Reveal className="section-head">
              <div>
                <Title as="h2" text={nextEventTitle.text} color={nextEventTitle.color} category="headline" />
              </div>
            </Reveal>
            <div className="grid events-grid single">
              <FeaturedEventCard e={next} hideLocation />
            </div>
          </div>
        </section>
      )}

      {rest.length > 0 && (
        <section className="section" style={{ paddingTop: 30 }}>
          <div className="container">
            <Reveal className="section-head">
              <div>
                <Title as="h2" text={upcomingEventTitle.text} color={upcomingEventTitle.color} category="headline" />
              </div>
              {site.upcomingEventsViewAll?.enabled && (
                <Link className="btn btn-outline" to="/events">
                  View All Events
                </Link>
              )}
            </Reveal>
            <EventsSlider events={rest} hideLocation />
          </div>
        </section>
      )}

      {past.length > 0 && (
        <section className="section" style={{ paddingTop: 30 }}>
          <div className="container">
            <Reveal className="section-head">
              <div>
                <Title as="h2" text={pastVibesTitle.text} color={pastVibesTitle.color} category="headline" />
              </div>
              <Link className="btn btn-outline" to="/events">
                View All Events
              </Link>
            </Reveal>
            <div
              className="grid past-grid"
              style={past.length < 2 ? { gridTemplateColumns: "1fr" } : undefined}
            >
              <PastHomeCard e={past[0]} index={0} />
              {past.length > 1 && (
                <div className="past-stack">
                  {past.slice(1).map((e, i) => (
                    <PastHomeCard key={e.id} e={e} small index={i + 1} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      <section className="section statement">
        <Reveal as="div" className="container statement-inner">
          <Title as="h2" text={statementTitle.text} color={statementTitle.color} category="hero-home" />
          <p>
            We create experiences that give people a reason to step away from routine, connect
            with others, try something new, and leave with stories worth telling.
          </p>
          <Link
            className="media-link"
            to="/events#past-events"
            style={mediaLinkText.color ? { color: mediaLinkText.color } : undefined}
          >
            {mediaLinkText.text}
          </Link>
        </Reveal>
      </section>

      <section className="section merch-teaser">
        <div className="container">
          <Reveal className="section-head">
            <div>
              <Title as="h2" text={merchTeaserTitle.text} color={merchTeaserTitle.color} category="hero-home" />
            </div>
            <Link className="btn btn-primary merch-shop-btn-desktop" to="/merch">
              Shop Merch
            </Link>
          </Reveal>
          <div className="stack">
            {products.slice(0, 5).map((p, i) => (
              <Reveal as={Link} key={p.id} className="merch-card" to={`/product/${p.id}`} index={i}>
                <div className="merch-visual" style={{ backgroundImage: `url('${p.image}')` }}>
                  <div className="merch-label">
                    {p.category}
                    <span className="merch-price">{money(p.price)}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Link className="btn btn-primary merch-shop-btn-mobile" to="/merch">
            Shop Merch
          </Link>
        </div>
      </section>
    </main>
  );
}
