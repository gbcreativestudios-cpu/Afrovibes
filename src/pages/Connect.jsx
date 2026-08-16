import { site, getTitle } from "../data/content";
import Title from "../components/Title";

export default function Connect() {
  const heroTitle = getTitle("connect", "heroTitle", "Connect With Us.");
  const createTitle = getTitle("connect", "createTitle", "Let's Create Something.");
  const messageTitle = getTitle("connect", "messageTitle", "Send Us A Message.");

  const onSubmit = (e) => {
    e.preventDefault();
    const name = e.target["c-name"].value;
    const email = e.target["c-email"].value;
    const brand = e.target["c-brand"].value;
    const type = e.target["c-type"].value;
    const msg = e.target["c-message"].value;
    const text = `Hi Afrovibes! I'd like to connect regarding a potential collaboration:%0A%0A*Name:* ${name}%0A*Email:* ${email}%0A*Brand / Organization:* ${brand}%0A*Collaboration Type:* ${type}%0A%0A*Message:*%0A${msg}`;
    window.open(`https://wa.me/${site.whatsappNumber}?text=${text}`, "_blank");
  };

  return (
    <main className="connect-page">
      <section className="page-hero">
        <div className="container">
          <Title as="h1" text={heroTitle.text} color={heroTitle.color} category="hero-page" />
          <p className="connect-copy">Have a brand, idea or collaboration in mind? Let's create something people will want to show up for.</p>
          <a className="btn btn-primary btn-mobile-fill" style={{ marginTop: 20 }} href="#message-section">
            Let's Talk
          </a>
        </div>
      </section>

      <section className="section">
        <div className="container about-block connect-services">
          <div>
            <Title as="h2" text={createTitle.text} color={createTitle.color} category="headline" />
          </div>
          <div>
            <div className="values" style={{ marginTop: 0 }}>
              <div className="value">
                <strong>Partnerships</strong>
                <p>Work with Afrovibes to connect your brand with engaging experiences and an active community.</p>
              </div>
              <div className="value">
                <strong>Brand Activations</strong>
                <p>Create memorable, experience-led moments that put your brand directly in the middle of the action.</p>
              </div>
              <div className="value">
                <strong>Event Collaborations</strong>
                <p>Partner with us to build experiences that bring the right people together.</p>
              </div>
              <div className="value">
                <strong>Community Engagement</strong>
                <p>Connect your brand with people through experiences designed around interaction, participation and shared moments.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="message-section" className="section statement">
        <div className="container about-block">
          <div>
            <Title as="h2" text={messageTitle.text} color={messageTitle.color} category="headline" />
            <p className="connect-copy">
              Tell us what you're thinking. Whether it's a partnership, collaboration, sponsorship
              or something completely new, we'd love to hear from you.
            </p>
          </div>
          <form className="connect-form" onSubmit={onSubmit}>
            <input type="text" name="c-name" placeholder="Full Name" required />
            <input type="email" name="c-email" placeholder="Email Address" required />
            <input type="text" name="c-brand" placeholder="Brand / Organization" required />
            <select name="c-type" defaultValue="" required>
              <option value="" disabled>
                Collaboration Type
              </option>
              <option value="Partnership">Partnership</option>
              <option value="Brand Activation">Brand Activation</option>
              <option value="Event Collaboration">Event Collaboration</option>
              <option value="Sponsorship">Sponsorship</option>
              <option value="Community Engagement">Community Engagement</option>
              <option value="Creative Collaboration">Creative Collaboration</option>
              <option value="Other">Other</option>
            </select>
            <textarea name="c-message" placeholder="Your Message..." required />
            <button
              type="submit"
              className="btn btn-primary btn-mobile-fill"
              style={{ justifySelf: "start", minHeight: 55, padding: "0 35px" }}
            >
              Send Message
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
