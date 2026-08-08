import { Link } from "react-router-dom";
import { events, products, money } from "../data/content";
import { EventCard, FeaturedEventCard } from "../components/EventCards";

export default function Home() {
  const upcoming = events.filter((e) => e.status !== "PAST");
  const next = upcoming[0];
  const rest = upcoming.slice(1, 4);
  const past = events.filter((e) => e.status === "PAST");

  return (
    <main>
      <section className="hero">
        <div className="hero-bg" />
        <div className="container hero-content">
          <h1>
            MAKE PLANS. MAKE <em>MEMORIES.</em>
          </h1>
          <div className="actions">
            <Link className="btn btn-primary" to="/events">
              Explore Events
            </Link>
            <Link className="btn btn-outline" to="/merch">
              Shop Merch
            </Link>
          </div>
        </div>
      </section>

      <div className="marquee">
        <div className="marquee-track">
          CONNECTION <span>✦</span> ENERGY <span>✦</span> MEMORIES <span>✦</span> ADVENTURE{" "}
          <span>✦</span> COMMUNITY <span>✦</span> CONNECTION <span>✦</span> ENERGY <span>✦</span>{" "}
          MEMORIES <span>✦</span>
        </div>
      </div>

      {next && (
        <section className="section">
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
        <section className="section" style={{ paddingTop: 30 }}>
          <div className="container">
            <div className="section-head">
              <div>
                <h2>UPCOMING VIBES.</h2>
              </div>
              <Link className="btn btn-outline" to="/events">
                View All Events
              </Link>
            </div>
            <div className="grid events-grid">
              {rest.map((e) => (
                <EventCard key={e.id} e={e} />
              ))}
            </div>
          </div>
        </section>
      )}

      {past.length > 0 && (
        <section className="section" style={{ paddingTop: 30 }}>
          <div className="container">
            <div className="section-head">
              <div>
                <h2>PAST VIBES.</h2>
              </div>
              <Link className="btn btn-outline" to="/events">
                View All Events
              </Link>
            </div>
            <div
              className="grid past-grid"
              style={past.length < 2 ? { gridTemplateColumns: "1fr" } : undefined}
            >
              <Link
                className="past-card"
                to={`/event/${past[0].id}`}
                style={{ backgroundImage: `url('${past[0].image}')` }}
              >
                <div className="past-card-content">
                  <div className="event-meta" style={{ color: "var(--white)", marginBottom: 8 }}>
                    {past[0].date}
                  </div>
                  <h3>{past[0].title}</h3>
                </div>
              </Link>
              {past.length > 1 && (
                <div className="past-stack">
                  {past.slice(1).map((e) => (
                    <Link
                      key={e.id}
                      className="past-card small"
                      to={`/event/${e.id}`}
                      style={{ backgroundImage: `url('${e.image}')` }}
                    >
                      <div className="past-card-content">
                        <div
                          className="event-meta"
                          style={{ color: "var(--white)", marginBottom: 8 }}
                        >
                          {e.date}
                        </div>
                        <h3>{e.title}</h3>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      <section className="section statement">
        <div className="container statement-inner">
          <h2>
            THE BEST MEMORIES ARE <span>SHARED.</span>
          </h2>
          <p>
            We create experiences that give people a reason to step away from routine, connect
            with others, try something new, and leave with stories worth telling.
          </p>
        </div>
      </section>

      <section className="section merch-teaser">
        <div className="container">
          <div className="section-head">
            <div>
              <h2>WEAR THE VIBE.</h2>
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
