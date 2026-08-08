import { Link, useParams } from "react-router-dom";
import { events } from "../data/content";
import NotFound from "./NotFound";

export default function EventDetail() {
  const { id } = useParams();
  const e = events.find((x) => x.id === id);
  if (!e) return <NotFound />;

  return (
    <main className="event-detail">
      <div className="container">
        <Link className="back" to="/events">
          ← Back to events
        </Link>
        <div className="detail-hero" style={{ backgroundImage: `url('${e.image}')` }}>
          <div>
            <div className="event-meta" style={{ color: "var(--white)", marginBottom: 12 }}>
              {e.date} · {e.location}
            </div>
            <h1>{e.title}</h1>
          </div>
        </div>
        <div className="detail-content">
          <aside>
            <h3 style={{ fontSize: ".75rem", textTransform: "uppercase", letterSpacing: ".1em", marginBottom: 8 }}>
              Experience
            </h3>
            <p className="muted">{e.status}</p>
            {e.ticket && (
              <a className="btn btn-primary" href={e.url} target="_blank" rel="noreferrer">
                Get Ticket
              </a>
            )}
          </aside>
          <div>
            <p style={{ fontSize: "1.2rem", color: "#ddd", maxWidth: 750 }}>{e.desc}</p>
            <h2 style={{ fontWeight: 900, fontSize: "2rem", marginTop: 55 }}>THE MOMENTS.</h2>
            <div className="gallery">
              {e.gallery.map((x, i) => (
                <img key={i} src={x} alt={`${e.title} experience`} />
              ))}
            </div>
            {e.instagram && (
              <a className="btn btn-outline" style={{ marginTop: 25 }} href={e.instagram} target="_blank" rel="noreferrer">
                Watch on Instagram
              </a>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
