import { site } from "../data/content";

export default function Connect() {
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
    <main>
      <section className="page-hero">
        <div className="container">
          <h1>CONNECT WITH US.</h1>
          <p>Have a brand, idea or collaboration in mind? Let's create something people will want to show up for.</p>
          <a className="btn btn-primary" style={{ marginTop: 20 }} href="#message-section">
            Let's Talk
          </a>
        </div>
      </section>

      <section className="section">
        <div className="container about-block">
          <div>
            <h2 style={{ fontSize: "clamp(1.6rem,3vw,2.4rem)", color: "var(--purple)", letterSpacing: "-.02em" }}>
              Let's Create Something.
            </h2>
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
            <h2 style={{ fontSize: "clamp(1.6rem,3vw,2.4rem)", color: "var(--purple)", letterSpacing: "-.02em" }}>
              Send Us A Message.
            </h2>
            <p>
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
            <button type="submit" className="btn btn-primary" style={{ justifySelf: "start", minHeight: 55, padding: "0 35px" }}>
              Send Message
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
