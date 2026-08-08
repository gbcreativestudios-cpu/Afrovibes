import { team } from "../data/content";

const headingStyle = {
  fontSize: "clamp(1.6rem,3vw,2.4rem)",
  color: "var(--purple)",
  letterSpacing: "-.02em",
};

export default function About() {
  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <h1>WHO WE ARE.</h1>
          <p>
            Afrovibes is a social experience brand dedicated to bringing people together through
            unforgettable events that inspire connection, excitement, and lasting memories.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container about-block">
          <div>
            <h2 style={headingStyle}>Great People. Great Experiences.</h2>
          </div>
          <div>
            <p>
              We believe the best moments happen when great people share great experiences.
              That's why we create events that are engaging, inclusive, and designed to leave
              everyone with stories worth telling.
            </p>
            <div className="values">
              <div className="value">
                <strong>Connection</strong>
                <p>Creating spaces for genuine interaction.</p>
              </div>
              <div className="value">
                <strong>Adventure</strong>
                <p>Giving people a reason to try something different.</p>
              </div>
              <div className="value">
                <strong>Community</strong>
                <p>Building a vibrant community where everyone feels welcome.</p>
              </div>
              <div className="value">
                <strong>Memories</strong>
                <p>Designing moments worth remembering.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section statement">
        <div className="container about-block">
          <div>
            <h2 style={headingStyle}>Bring People Together.</h2>
          </div>
          <div>
            <p>
              To create exceptional social experiences that bring people together through fun,
              interactive, and thoughtfully curated events, fostering genuine connections,
              unforgettable memories, and a vibrant community where everyone feels welcome.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container about-block">
          <div>
            <h2 style={headingStyle}>Redefine Connection.</h2>
          </div>
          <div>
            <p>
              To become the leading lifestyle and experience brand known for redefining how people
              connect, celebrate, and create memories through innovative events that inspire
              community and meaningful human interaction.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <h2 style={headingStyle}>Meet The Team.</h2>
            </div>
          </div>
          <div className="grid team-grid">
            {team.map((t, i) => (
              <div className="team-card" key={i}>
                <img src={t.image} alt={t.name} />
                <h3>{t.name}</h3>
                <p>{t.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
