import { useState } from "react";
import { getTitle, site } from "../data/content";
import Title from "./Title";

// Netlify Forms only captures a submission if the POST body is
// application/x-www-form-urlencoded and includes "form-name" matching the
// static form Netlify indexed at build time (see the hidden twin form in
// index.html). This encodes a plain {field: value} object into that format.
function encodeFormData(data) {
  return Object.keys(data)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join("&");
}

export default function Newsletter() {
  const title = getTitle("newsletter", "title", "Join The Vibe.");
  const paragraph = site.newsletter?.paragraph || "Stay in the loop. Get first access to upcoming experiences, events and drops.";
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const onSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.querySelector("input[type=email]").value;

    setStatus("sending");
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encodeFormData({ "form-name": "newsletter", email }),
    })
      .then(() => {
        setStatus("sent");
        form.reset();
      })
      .catch(() => setStatus("error"));
  };

  return (
    <section className="newsletter">
      <div className="container">
        <Title as="h2" text={title.text} color={title.color} category="headline" />
        <p>{paragraph}</p>
        <form
          className="newsletter-form"
          name="newsletter"
          data-netlify="true"
          netlify-honeypot="nl-bot-field"
          onSubmit={onSubmit}
        >
          <input type="hidden" name="form-name" value="newsletter" />
          <input type="text" name="nl-bot-field" style={{ display: "none" }} tabIndex="-1" autoComplete="off" />
          <input type="email" placeholder="Enter your email" required />
          <button type="submit" disabled={status === "sending"}>
            {status === "sending" ? "Joining..." : status === "sent" ? "Joined!" : "Subscribe"}
          </button>
        </form>
        {status === "error" && (
          <p style={{ color: "var(--pink)", marginTop: 10 }}>Something went wrong — please try again.</p>
        )}
      </div>
    </section>
  );
}
