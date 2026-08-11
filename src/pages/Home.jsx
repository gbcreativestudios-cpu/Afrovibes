import { Fragment } from "react";
import { Link } from "react-router-dom";
import { events, products, money, formatEventDate, getTitle, isPastEvent, site } from "../data/content";
import { FeaturedEventCard, thumbnailMode } from "../components/EventCards";
import EventsTicker from "../components/EventsTicker";
import HeroBackground from "../components/HeroBackground";
import Title from "../components/Title";
import ActionButton from "../components/ActionButton";

function PastHomeCard({ e, small = false }) {
  const mode = thumbnailMode("pastHome");
  const ratioStyle = mode !== "adapt" ? { aspectRatio: mode.replace(":", "/") } : undefined;
  return (
    <Link
      className={`past-card${small ? " small" : ""} ${mode === "adapt" ? "thumbnail-adapt" : "thumbnail-ratio"}`}
      to={`/event/${e.id}`}
      style={ratioStyle}
    >
      <img src={e.image} alt={e.title} />
      <div className="past-card-content">
        <div className="event-meta" style={{ color: "var(--white)", marginBottom: 8 }}>
          {formatEventDate(e.date)}
        </div>
        <Title as="h3" text={e.title} fontSize={e.titleFontSize} color={e.titleColor} />
      </div>
    </Link>
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

  const tickerWords = (site.heroTicker?.words || []).map((w) => w.text).filter(Boolean);
  const tickerEnabled = (site.heroTicker?.enabled ?? true) && tickerWords.length > 0;
  const tickerTrack = tickerEnabled ? [...tickerWords, ...tickerWords] : [];

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
        <div className="container hero-content">
          <Title as="h1" text={heroTitle.text} fontSize={heroTitle.fontSize} color={heroTitle.color} />
          <div className="actions actions-stack-mobile">
            <ActionButton slot={site.buttonSlots?.heroPrimary} className="btn btn-primary btn-purple" />
            <ActionButton slot={site.buttonSlots?.heroSecondary} className="btn btn-outline" />
          </div>
        </div>
      </section>

      {tickerEnabled && (
        <div className="marquee">
          <div className="marquee-track">
            {tickerTrack.map((w, i) => (
              <Fragment key={i}>
                {w} <span>✦</span>
              </Fragment>
            ))}
          </div>
        </div>
      )}

      {next && (
        <section className="section" style={{ backgroundColor: nextEventBg || "var(--purple)" }}>
          <div className="container">
            <div className="section-head">
              <div>
                <Title as="h2" text={nextEventTitle.text} fontSize={nextEventTitle.fontSize} color={nextEventTitle.color} />
              </div>
            </div>
            <div className="grid events-grid single">
              <FeaturedEventCard e={next} />
            </div>
          </div>
        </section>
      )}

      {rest.length > 0 && (
        <section className="section" style={{ paddingTop: 30 }}>
          <div className="container">
            <div className="section-head">
              <div>
                <Title as="h2" text={upcomingEventTitle.text} fontSize={upcomingEventTitle.fontSize} color={upcomingEventTitle.color} />
              </div>
              <Link className="btn btn-outline" to="/events">
                View All Events
              </Link>
            </div>
            <EventsTicker events={rest} />
          </div>
        </section>
      )}

      {past.length > 0 && (
        <section className="section" style={{ paddingTop: 30 }}>
          <div className="container">
            <div className="section-head">
              <div>
                <Title as="h2" text={pastVibesTitle.text} fontSize={pastVibesTitle.fontSize} color={pastVibesTitle.color} />
              </div>
              <Link className="btn btn-outline" to="/events">
                View All Events
              </Link>
            </div>
            <div
              className="grid past-grid"
              style={past.length < 2 ? { gridTemplateColumns: "1fr" } : undefined}
            >
              <PastHomeCard e={past[0]} />
              {past.length > 1 && (
                <div className="past-stack">
                  {past.slice(1).map((e) => (
                    <PastHomeCard key={e.id} e={e} small />
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      <section className="section statement">
        <div className="container statement-inner">
          <Title as="h2" text={statementTitle.text} fontSize={statementTitle.fontSize} color={statementTitle.color} />
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
        </div>
      </section>

      <section className="section merch-teaser">
        <div className="container">
          <div className="section-head">
            <div>
              <Title as="h2" text={merchTeaserTitle.text} fontSize={merchTeaserTitle.fontSize} color={merchTeaserTitle.color} />
            </div>
            <Link className="btn btn-primary" to="/merch">
              Shop Merch
            </Link>
          </div>
          <div className="stack">
            {products.slice(0, 5).map((p) => (
              <Link key={p.id} className="merch-card" to={`/product/${p.id}`}>
                <div className="merch-visual" style={{ backgroundImage: `url('${p.image}')` }}>
                  <div className="merch-label">
                    {p.category}
                    <span className="merch-price">{money(p.price)}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
