import { Link } from "react-router-dom";
import { formatEventDate, isNextEvent, site } from "../data/content";
import Title from "./Title";

const AVAILABLE_RATIOS = new Set(["1:1", "4:5", "3:4", "2:3", "3:2", "4:3", "16:9", "21:9"]);

function thumbnailMode(type) {
  const value = site.eventThumbnails?.[type];
  return value === "adapt" || AVAILABLE_RATIOS.has(value) ? value : "adapt";
}

function EventImage({ e, mode, className = "event-img" }) {
  const ratioStyle = mode !== "adapt" ? { aspectRatio: mode.replace(":", "/") } : undefined;
  return (
    <div
      className={`${className} ${mode === "adapt" ? "thumbnail-adapt" : "thumbnail-ratio"}`}
      style={ratioStyle}
    >
      <img src={e.image} alt={e.title} />
      {className === "event-img" && isNextEvent(e) && <span className="event-status">{e.status}</span>}
    </div>
  );
}

function TicketButton({ e }) {
  if (!isNextEvent(e) || e.status !== "TICKETS AVAILABLE") return null;

  if (!e.url) {
    return <span className="btn btn-primary">Get Ticket</span>;
  }

  return (
    <a
      className="btn btn-primary"
      href={e.url}
      target="_blank"
      rel="noreferrer"
      onClick={(ev) => ev.stopPropagation()}
    >
      Get Ticket
    </a>
  );
}

export function EventCard({ e }) {
  return (
    <article className="event-card">
      <Link className="event-card-link" to={`/event/${e.id}`}>
        <EventImage e={e} mode={thumbnailMode("upcoming")} />
        <div className="event-info">
          <div className="event-meta">
            {formatEventDate(e.date)} · {e.location}
          </div>
          <Title as="h3" text={e.title} fontSize={e.titleFontSize} color={e.titleColor} />
        </div>
      </Link>
      <div className="event-actions">
        <span className="btn btn-outline">Coming Soon</span>
        <Link className="btn btn-outline" to={`/event/${e.id}`}>
          Details
        </Link>
      </div>
    </article>
  );
}

export function FeaturedEventCard({ e }) {
  return (
    <article className="event-card featured">
      <Link className="event-card-link" to={`/event/${e.id}`}>
        <EventImage e={e} mode={thumbnailMode("next")} />
        <div className="event-info">
          <div className="event-meta">
            {formatEventDate(e.date)} · {e.location}
          </div>
          <Title as="h3" text={e.title} fontSize={e.titleFontSize} color={e.titleColor} />
        </div>
      </Link>
      <div className="event-actions">
        <TicketButton e={e} />
        <Link className="btn btn-outline" to={`/event/${e.id}`}>
          Details
        </Link>
      </div>
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
      <EventImage e={e} mode={thumbnailMode("pastEvents")} className="past-row-thumb" />
    </Link>
  );
}

export function PastEventGalleryCard({ e }) {
  const thumbs = (e.gallery || []).slice(0, 4);
  return (
    <Link className="past-gallery-card" to={`/event/${e.id}`}>
      <EventImage e={e} mode={thumbnailMode("pastHome")} className="past-gallery-main" />
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
