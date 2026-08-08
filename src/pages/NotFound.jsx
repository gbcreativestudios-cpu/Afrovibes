import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main className="empty">
      <div className="container">
        <h1>PAGE NOT FOUND</h1>
        <Link className="btn btn-primary" to="/">
          Back Home
        </Link>
      </div>
    </main>
  );
}
