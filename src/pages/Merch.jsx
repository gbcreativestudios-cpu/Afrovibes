import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { products, money } from "../data/content";

function ProductCard({ p }) {
  return (
    <Link className="product-card" to={`/product/${p.id}`}>
      <div className="product-image" style={{ backgroundImage: `url('${p.image}')` }} />
      <div className="product-body">
        <div
          className="muted"
          style={{ fontWeight: 500, fontSize: ".7rem", textTransform: "uppercase", letterSpacing: ".08em" }}
        >
          {p.category}
        </div>
        <h3>{p.name}</h3>
        <div className="price">{money(p.price)}</div>
      </div>
    </Link>
  );
}

export default function Merch() {
  const categories = useMemo(() => [...new Set(products.map((p) => p.category))], []);
  const [active, setActive] = useState("all");
  const list = active === "all" ? products : products.filter((p) => p.category === active);

  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <h1>WEAR THE VIBE.</h1>
          <p>Afrovibes merch made for the moments before, during and after the experience.</p>
        </div>
      </section>
      <section className="section" style={{ paddingTop: 20 }}>
        <div className="container">
          <div className="filters">
            <button className={`filter${active === "all" ? " active" : ""}`} onClick={() => setActive("all")}>
              All
            </button>
            {categories.map((c) => (
              <button key={c} className={`filter${active === c ? " active" : ""}`} onClick={() => setActive(c)}>
                {c}
              </button>
            ))}
          </div>
          <div className="grid products-grid">
            {list.map((p) => (
              <ProductCard key={p.id} p={p} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
