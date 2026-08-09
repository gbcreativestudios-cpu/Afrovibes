import { Link } from "react-router-dom";
import { formatEventDate } from "../data/content";
import Title from "./Title";

export function EventCard({ e }) {
  return (
    <article className="event-card">
      <Link to={`/event/${e.id}`}>
        <div className="event-img" style={{ backgroundImage: `url('${e.image}')` }}>
          <span className="event-status">{e.status}</span>
        </div>
        <div className="event-info">
          <div className="event-meta">
            {formatEventDate(e.date)} · {e.location}
          </div>
          <Title as="h3" text={e.title} fontSize={e.titleFontSize} color={e.titleColor} />
          <div className="event-actions">
            {e.status === "TICKETS AVAILABLE" ? (
              <a
                className="btn btn-primary"
                href={e.url}
                target="_blank"
                rel="noreferrer"
                onClick={(ev) => ev.stopPropagation()}
              >
                Get Ticket
              </a>
            ) : (
              <span className="btn btn-outline">Coming Soon</span>
            )}
            <Link className="btn btn-outline" to={`/event/${e.id}`}>
              Details
            </Link>
          </div>
        </div>
      </Link>
    </article>
  );
}

export function FeaturedEventCard({ e }) {
  return (
    <article className="event-card featured">
      <Link to={`/event/${e.id}`}>
        <div className="event-img" style={{ backgroundImage: `url('${e.image}')` }}>
          <span className="event-status">{e.status}</span>
        </div>
        <div className="event-info">
          <div className="event-meta">
            {formatEventDate(e.date)} · {e.location}
          </div>
          <Title as="h3" text={e.title} fontSize={e.titleFontSize} color={e.titleColor} />
          <div className="event-actions">
            {e.status === "TICKETS AVAILABLE" ? (
              <a
                className="btn btn-primary"
                href={e.url}
                target="_blank"
                rel="noreferrer"
                onClick={(ev) => ev.stopPropagation()}
              >
                Get Ticket
              </a>
            ) : (
              <span className="btn btn-outline">Coming Soon</span>
            )}
            <Link className="btn btn-outline" to={`/event/${e.id}`}>
              Details
            </Link>
          </div>
        </div>
      </Link>
    </article>
  );
}

export function PastEventRow({ e }) {
  return (
    <Link className="past-row" to={`/event/${e.id}`}>
      <div className="past-row-meta">
        <div className="past-row-date">{formatEventDate(e.date)}</div>
        <Title
          as="h3"
          className="past-row-title"
          text={e.title}
          fontSize={e.titleFontSize}
          color={e.titleColor}
        />
      </div>
      <div className="past-row-thumb" style={{ backgroundImage: `url('${e.image}')` }} />
    </Link>
  );
}

export function PastEventGalleryCard({ e }) {
  const thumbs = e.gallery.slice(0, 4);
  return (
    <Link className="past-gallery-card" to={`/event/${e.id}`}>
      <div className="past-gallery-main" style={{ backgroundImage: `url('${e.image}')` }}>
        <div className="past-gallery-overlay">
          <div className="event-meta" style={{ color: "var(--white)", marginBottom: 6 }}>
            {formatEventDate(e.date)} · {e.location}
          </div>
          <Title
            as="h3"
            text={e.title}
            fontSize={e.titleFontSize}
            color={e.titleColor}
            style={{ fontWeight: 900, fontSize: "1.4rem", margin: 0 }}
          />
        </div>
      </div>
      {thumbs.length > 0 && (
        <div className="past-gallery-strip">
          {thumbs.map((g, i) => (
            <div key={i} className="past-thumb" style={{ backgroundImage: `url('${g}')` }} />
          ))}
        </div>
      )}
    </Link>
  );
}
