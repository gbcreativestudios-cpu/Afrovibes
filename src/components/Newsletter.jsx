import { getTitle } from "../data/content";
import Title from "./Title";

export default function Newsletter() {
  const title = getTitle("newsletter", "title", "Join The Vibe.");

  const onSubmit = (e) => {
    e.preventDefault();
    const email = e.target.querySelector("input").value;
    alert(`Thanks! ${email} is on the list.`);
    e.target.reset();
  };

  return (
    <section className="newsletter">
      <div className="container">
        <Title as="h2" text={title.text} fontSize={title.fontSize} color={title.color} />
        <p>Stay in the loop. Get first access to upcoming experiences, events and drops.</p>
        <form className="newsletter-form" onSubmit={onSubmit}>
          <input type="email" placeholder="Enter your email" required />
          <button type="submit">Subscribe</button>
        </form>
      </div>
    </section>
  );
}
