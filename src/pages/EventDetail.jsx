import { Link, useParams } from "react-router-dom";
import { events, formatEventDate, getTitle, isPastEvent } from "../data/content";
import NotFound from "./NotFound";
import Title from "../components/Title";

export default function EventDetail() {
  const { id } = useParams();
  const e = events.find((x) => x.id === id);
  if (!e) return <NotFound />;

  const past = isPastEvent(e);
  const momentsTitle = getTitle("eventDetail", "momentsTitle", "The Moments.");
  const videosTitle = getTitle("eventDetail", "videosTitle", "The Videos.");

  const facts = [
    e.date && { label: "Date", value: formatEventDate(e.date) },
    e.time && { label: "Time", value: e.time },
    e.location && { label: "Location", value: e.location },
    e.venue && { label: "Venue", value: e.venue },
    ...(e.customFields || [])
      .filter((cf) => cf.title || cf.content)
      .map((cf) => ({ label: cf.title, value: cf.content })),
  ].filter(Boolean);

  return (
    <main className="event-detail">
      <div className="container">
        <Link className="back" to="/events">
          ← Back to events
        </Link>
        <div className="detail-hero" style={{ backgroundImage: `url('${e.image}')` }}>
          <div>
            <div className="event-meta" style={{ color: "var(--white)", marginBottom: 12 }}>
              {formatEventDate(e.date)} · {e.location}
            </div>
            <Title as="h1" text={e.title} fontSize={e.titleFontSize} color={e.titleColor} />
          </div>
        </div>
        <div className="detail-content">
          <aside>
            <h3 className="aside-label">Experience</h3>
            <p className="muted">{e.status}</p>
            {e.status === "TICKETS AVAILABLE" && (
              <a className="btn btn-primary" href={e.url} target="_blank" rel="noreferrer">
                Get Ticket
              </a>
            )}
          </aside>
          <div>
            <p style={{ fontSize: "1.2rem", color: "#ddd", maxWidth: 750 }}>{e.desc}</p>

            {facts.length > 0 && (
              <div className="event-facts">
                {facts.map((f, i) => (
                  <div className="event-fact" key={i}>
                    <span className="fact-label">{f.label}</span>
                    <span className="fact-value">{f.value}</span>
                  </div>
                ))}
              </div>
            )}

            {past && (
              <>
                <Title
                  as="h2"
                  text={momentsTitle.text}
                  fontSize={momentsTitle.fontSize}
                  color={momentsTitle.color}
                  style={{ fontWeight: 900, fontSize: "2rem", marginTop: 55 }}
                />
                <div className="gallery">
                  {(e.gallery || []).map((x, i) => (
                    <img key={i} src={x} alt={`${e.title} experience`} />
                  ))}
                </div>
                {e.showVideos && e.galleryVideos && e.galleryVideos.length > 0 && (
                  <>
                    <Title
                      as="h2"
                      text={videosTitle.text}
                      fontSize={videosTitle.fontSize}
                      color={videosTitle.color}
                      style={{ fontWeight: 900, fontSize: "2rem", marginTop: 55 }}
                    />
                    <div className="gallery video-gallery">
                      {e.galleryVideos.map((v, i) =>
                        /\.(mp4|webm|mov)(\?.*)?$/i.test(v) ? (
                          <video key={i} src={v} controls playsInline />
                        ) : (
                          <a key={i} className="btn btn-outline" href={v} target="_blank" rel="noreferrer">
                            Watch Video {i + 1}
                          </a>
                        )
                      )}
                    </div>
                  </>
                )}
                {e.instagram && (
                  <a className="btn btn-outline" style={{ marginTop: 25 }} href={e.instagram} target="_blank" rel="noreferrer">
                    Watch on Instagram
                  </a>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
