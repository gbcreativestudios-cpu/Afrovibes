import { events } from "../data/content";
import { EventCard, FeaturedEventCard, PastEventRow } from "../components/EventCards";
import GalleryTicker from "../components/GalleryTicker";

export default function Events() {
  const upcoming = events.filter((e) => e.status !== "PAST");
  const past = events.filter((e) => e.status === "PAST");
  const next = upcoming[0];
  const rest = upcoming.slice(1);

  return (
    <main>
      {next && (
        <section className="section" style={{ paddingTop: 160 }}>
          <div className="container">
            <div className="section-head">
              <div>
                <h2>NEXT EVENT.</h2>
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
                <h2>OUR CALENDAR.</h2>
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
              <h2>PAST EVENTS.</h2>
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
