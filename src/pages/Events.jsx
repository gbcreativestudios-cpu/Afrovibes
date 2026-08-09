import { events, getTitle, isPastEvent, site } from "../data/content";
import { EventCard, FeaturedEventCard, PastEventRow } from "../components/EventCards";
import GalleryTicker from "../components/GalleryTicker";
import Title from "../components/Title";

export default function Events() {
  const upcoming = events.filter((e) => !isPastEvent(e));
  const past = events.filter(isPastEvent);
  const next = upcoming[0];
  const rest = upcoming.slice(1);

  const nextEventTitle = getTitle("events", "nextEventTitle", "Next Event.");
  const calendarTitle = getTitle("events", "calendarTitle", "Our Calendar.");
  const pastEventsTitle = getTitle("events", "pastEventsTitle", "Past Events.");

  const nextEventBg = site.nextEventBg?.color || undefined;

  return (
    <main>
      {next && (
        <section className="section" style={{ paddingTop: 160, backgroundColor: nextEventBg || "var(--purple)" }}>
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
        <section className="section" style={{ paddingTop: 20 }}>
          <div className="container">
            <div className="section-head">
              <div>
                <Title as="h2" text={calendarTitle.text} fontSize={calendarTitle.fontSize} color={calendarTitle.color} />
              </div>
            </div>
            <div className="grid events-grid">
              {rest.map((e) => (
                <EventCard key={e.id} e={e} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section" style={{ paddingTop: 20 }}>
        <div className="container">
          <div className="section-head">
            <div>
              <Title as="h2" text={pastEventsTitle.text} fontSize={pastEventsTitle.fontSize} color={pastEventsTitle.color} />
            </div>
          </div>
          {past.length > 0 ? (
            <div className="past-list">
              {past.map((e) => (
                <PastEventRow key={e.id} e={e} />
              ))}
            </div>
          ) : (
            <p className="muted">No past events yet — check back soon.</p>
          )}
        </div>
        <GalleryTicker events={past} />
      </section>
    </main>
  );
}
