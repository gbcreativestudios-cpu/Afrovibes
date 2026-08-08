export default function Newsletter() {
  const onSubmit = (e) => {
    e.preventDefault();
    const email = e.target.querySelector("input").value;
    alert(`Thanks! ${email} is on the list.`);
    e.target.reset();
  };

  return (
    <section className="newsletter">
      <div className="container">
        <h2>Join The Vibe.</h2>
        <p>Stay in the loop. Get first access to upcoming experiences, events and drops.</p>
        <form className="newsletter-form" onSubmit={onSubmit}>
          <input type="email" placeholder="Enter your email" required />
          <button type="submit">Subscribe</button>
        </form>
      </div>
    </section>
  );
}
