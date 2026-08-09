import { Link } from "react-router-dom";
import { events, products, money, formatEventDate, getTitle } from "../data/content";
import { FeaturedEventCard } from "../components/EventCards";
import EventsTicker from "../components/EventsTicker";
import Title from "../components/Title";

export default function Home() {
  const upcoming = events.filter((e) => e.status !== "PAST");
  const next = upcoming[0];
  const rest = upcoming.slice(1, 4);
  const past = events.filter((e) => e.status === "PAST");

  const heroTitle = getTitle("home", "heroTitle", "Make Plans. Make Memories.");
  const nextEventTitle = getTitle("home", "nextEventTitle", "Next Event.");
  const upcomingEventTitle = getTitle("home", "upcomingEventTitle", "Upcoming Event.");
  const pastVibesTitle = getTitle("home", "pastVibesTitle", "Past Vibes.");
  const statementTitle = getTitle("home", "statementTitle", "The Best Memories Are Shared.");
  const merchTeaserTitle = getTitle("home", "merchTeaserTitle", "Wear The Vibe.");

  return (
    <main>
      <section className="hero">
        <div className="hero-bg" />
        <div className="container hero-content">
          <Title as="h1" text={heroTitle.text} fontSize={heroTitle.fontSize} color={heroTitle.color} />
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
              <Link
                className="past-card"
                to={`/event/${past[0].id}`}
                style={{ backgroundImage: `url('${past[0].image}')` }}
              >
                <div className="past-card-content">
                  <div className="event-meta" style={{ color: "var(--white)", marginBottom: 8 }}>
                    {formatEventDate(past[0].date)}
                  </div>
                  <Title as="h3" text={past[0].title} fontSize={past[0].titleFontSize} color={past[0].titleColor} />
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
                          {formatEventDate(e.date)}
                        </div>
                        <Title as="h3" text={e.title} fontSize={e.titleFontSize} color={e.titleColor} />
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
          <Title as="h2" text={statementTitle.text} fontSize={statementTitle.fontSize} color={statementTitle.color} />
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
