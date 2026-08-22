import { useState } from "react";
import { site, getTitle } from "../data/content";
import Title from "../components/Title";

// Netlify Forms only captures a submission if the POST body is
// application/x-www-form-urlencoded and includes "form-name" matching the
// static form Netlify indexed at build time (see the hidden twin form in
// index.html). This encodes a plain {field: value} object into that format.
function encodeFormData(data) {
  return Object.keys(data)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join("&");
}

export default function Connect() {
  const heroTitle = getTitle("connect", "heroTitle", "Connect With Us.");
  const createTitle = getTitle("connect", "createTitle", "Let's Create Something.");
  const messageTitle = getTitle("connect", "messageTitle", "Send Us A Message.");
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const defaultServices = [
    { title: "Partnerships", text: "Work with Afrovibes to connect your brand with engaging experiences and an active community." },
    { title: "Brand Activations", text: "Create memorable, experience-led moments that put your brand directly in the middle of the action." },
    { title: "Event Collaborations", text: "Partner with us to build experiences that bring the right people together." },
    { title: "Community Engagement", text: "Connect your brand with people through experiences designed around interaction, participation and shared moments." },
  ];
  const services = site.connectServices?.length ? site.connectServices : defaultServices;

  const onSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const data = {
      "form-name": "contact",
      "c-name": form["c-name"].value,
      "c-email": form["c-email"].value,
      "c-brand": form["c-brand"].value,
      "c-type": form["c-type"].value,
      "c-message": form["c-message"].value,
    };

    setStatus("sending");
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encodeFormData(data),
    })
      .then(() => {
        setStatus("sent");
        form.reset();
      })
      .catch(() => setStatus("error"));
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
              {services.map((s, i) => (
                <div className="value" key={i}>
                  <strong>{s.title}</strong>
                  <p>{s.text}</p>
                </div>
              ))}
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
          <form
            className="connect-form"
            name="contact"
            data-netlify="true"
            netlify-honeypot="bot-field"
            onSubmit={onSubmit}
          >
            <input type="hidden" name="form-name" value="contact" />
            <input type="text" name="bot-field" style={{ display: "none" }} tabIndex="-1" autoComplete="off" />
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
              disabled={status === "sending"}
              style={{ justifySelf: "start", minHeight: 55, padding: "0 35px" }}
            >
              {status === "sending" ? "Sending..." : "Send Message"}
            </button>
            {status === "sent" && (
              <p style={{ color: "var(--white)", margin: 0 }}>
                Thanks — your message is in! We'll get back to you soon.
              </p>
            )}
            {status === "error" && (
              <p style={{ color: "var(--pink)", margin: 0 }}>
                Something went wrong sending that. Please try again.
              </p>
            )}
          </form>
        </div>
      </section>
    </main>
  );
}
