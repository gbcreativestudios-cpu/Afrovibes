import { Link } from "react-router-dom";
import { formatEventDate, isNextEvent, site } from "../data/content";
import Title from "./Title";
import { Reveal } from "./Reveal";

const AVAILABLE_RATIOS = new Set(["1:1", "4:5", "3:4", "2:3", "3:2", "4:3", "16:9", "21:9"]);

export function thumbnailMode(type) {
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

export function EventCard({ e, index = 0, animate = true }) {
  const inner = (
    <>
      <Link className="event-card-link" to={`/event/${e.id}`}>
        <EventImage e={e} mode={thumbnailMode("upcoming")} />
        <div className="event-info">
          <div className="event-meta">{formatEventDate(e.date)}</div>
          <Title as="h3" text={e.title} color={e.titleColor} category="subheading" />
        </div>
      </Link>
      <div className="event-actions">
        <span className="btn btn-outline">Coming Soon</span>
        <Link className="btn btn-outline" to={`/event/${e.id}`}>
          Details
        </Link>
      </div>
    </>
  );

  // `animate=false` is used inside EventsSlider, which already animates
  // each card's entrance itself (slide/drag transition) — stacking our
  // own scroll-reveal on top of that caused a visible "double motion"
  // (slide in, then fade-and-slide again). Plain static grids (Events
  // page "calendar" section) still want the scroll reveal, so it stays
  // the default there.
  if (!animate) {
    return <article className="event-card">{inner}</article>;
  }

  return (
    <Reveal as="article" className="event-card" index={index}>
      {inner}
    </Reveal>
  );
}

export function FeaturedEventCard({ e }) {
  return (
    <Reveal as="article" className="event-card featured">
      <Link className="event-card-media" to={`/event/${e.id}`}>
        <EventImage e={e} mode={thumbnailMode("next")} />
      </Link>
      <div className="event-body">
        <Link className="event-card-link" to={`/event/${e.id}`}>
          <div className="event-info">
            <div className="event-meta">{formatEventDate(e.date)}</div>
            <Title as="h3" text={e.title} color={e.titleColor} category="subheading" />
          </div>
        </Link>
        <div className="event-actions">
          <TicketButton e={e} />
          <Link className="btn btn-outline" to={`/event/${e.id}`}>
            Details
          </Link>
        </div>
      </div>
    </Reveal>
  );
}

export function PastEventRow({ e, index = 0 }) {
  return (
    <Reveal as={Link} className="past-row" index={index} to={`/event/${e.id}`}>
      <div className="past-row-meta">
        <div className="past-row-date">{formatEventDate(e.date)}</div>
        <Title as="h3" className="past-row-title" text={e.title} color={e.titleColor} category="subheading" />
      </div>
      <EventImage e={e} mode={thumbnailMode("pastEvents")} className="past-row-thumb" />
    </Reveal>
  );
}

export function PastEventGalleryCard({ e, index = 0 }) {
  const thumbs = (e.gallery || []).slice(0, 4);
  return (
    <Reveal as={Link} className="past-gallery-card" index={index} to={`/event/${e.id}`}>
      <EventImage e={e} mode={thumbnailMode("pastHome")} className="past-gallery-main" />
      <div className="past-gallery-overlay">
        <div className="event-meta" style={{ color: "var(--white)", marginBottom: 6 }}>
          {formatEventDate(e.date)}
        </div>
        <Title as="h3" text={e.title} color={e.titleColor} category="subheading" style={{ margin: 0 }} />
      </div>
      {thumbs.length > 0 && (
        <div className="past-gallery-strip">
          {thumbs.map((g, i) => (
            <div key={i} className="past-thumb" style={{ backgroundImage: `url('${g}')` }} />
          ))}
        </div>
      )}
    </Reveal>
  );
}
