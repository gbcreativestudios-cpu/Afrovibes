import { Link } from "react-router-dom";
import { getTitle } from "../data/content";
import Title from "../components/Title";

export default function NotFound() {
  const title = getTitle("notFound", "title", "Page Not Found");

  return (
    <main className="empty">
      <div className="container">
        <Title as="h1" text={title.text} color={title.color} category="hero-page" />
        <Link className="btn btn-primary" to="/">
          Back Home
        </Link>
      </div>
    </main>
  );
}
