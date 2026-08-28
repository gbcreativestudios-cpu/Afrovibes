import { events, getTitle, isPastEvent, site } from "../data/content";
import { EventCard, FeaturedEventCard, PastEventRow } from "../components/EventCards";
import GalleryTicker from "../components/GalleryTicker";
import Title from "../components/Title";
import { FadeIn, Reveal } from "../components/Reveal";

export default function Events() {
  const upcoming = events.filter((e) => !isPastEvent(e));
  const past = events.filter(isPastEvent);
  const next = upcoming[0];
  const rest = upcoming.slice(1);

  const heroTitle = getTitle("events", "heroTitle", "Our Events.");
  const nextEventTitle = getTitle("events", "nextEventTitle", "Next Event.");
  const calendarTitle = getTitle("events", "calendarTitle", "Our Calendar.");
  const pastEventsTitle = getTitle("events", "pastEventsTitle", "Past Events.");

  const nextEventBg = site.nextEventBg?.color || undefined;

  return (
    <main className="events-page">
      <section className="page-hero">
        <FadeIn as="div" className="container">
          <Title as="h1" text={heroTitle.text} color={heroTitle.color} category="hero-page" />
          <p className="events-copy">
            Every gathering, party, and pop-up we've thrown — what's coming up next and what
            we've already made memories out of.
          </p>
        </FadeIn>
      </section>

      {next && (
        <section className="section" style={{ paddingTop: 20, backgroundColor: nextEventBg || "var(--purple)" }}>
          <div className="container">
            <Reveal className="section-head">
              <div>
                <Title as="h2" text={nextEventTitle.text} color={nextEventTitle.color} category="headline" />
              </div>
            </Reveal>
            <div className="grid events-grid single">
              <FeaturedEventCard e={next} />
            </div>
          </div>
        </section>
      )}

      {rest.length > 0 && (
        <section className="section" style={{ paddingTop: 20 }}>
          <div className="container">
            <Reveal className="section-head">
              <div>
                <Title as="h2" text={calendarTitle.text} color={calendarTitle.color} category="headline" />
              </div>
            </Reveal>
            <div className="grid events-grid">
              {rest.map((e, i) => (
                <EventCard key={e.id} e={e} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section id="past-events" className="section" style={{ paddingTop: 20 }}>
        <div className="container">
          <Reveal className="section-head">
            <div>
              <Title as="h2" text={pastEventsTitle.text} color={pastEventsTitle.color} category="headline" />
            </div>
          </Reveal>
          {past.length > 0 ? (
            <div className="past-list">
              {past.map((e, i) => (
                <PastEventRow key={e.id} e={e} index={i} />
              ))}
            </div>
          ) : (
            <p className="muted">No past events yet — check back soon.</p>
          )}
        </div>
        {site.galleryTickerEnabled !== false && (
          <div className={site.galleryTickerHideOnMobile ? "gallery-ticker-desktop-only" : undefined}>
            <GalleryTicker events={past} />
          </div>
        )}
      </section>
    </main>
  );
}
