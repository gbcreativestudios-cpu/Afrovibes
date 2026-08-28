import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { products, money, getTitle } from "../data/content";
import Title from "../components/Title";
import { FadeIn, Reveal } from "../components/Reveal";

function ProductCard({ p, index = 0 }) {
  return (
    <Reveal as={Link} className="product-card" to={`/product/${p.id}`} index={index}>
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
    </Reveal>
  );
}

export default function Merch() {
  const categories = useMemo(() => [...new Set(products.map((p) => p.category))], []);
  const [active, setActive] = useState("all");
  const list = active === "all" ? products : products.filter((p) => p.category === active);
  const heroTitle = getTitle("merch", "heroTitle", "Wear The Vibe.");

  return (
    <main className="merch-page">
      <section className="page-hero">
        <FadeIn as="div" className="container">
          <Title as="h1" text={heroTitle.text} color={heroTitle.color} category="hero-page" />
          <p className="merch-copy">Afrovibes merch made for the moments before, during and after the experience.</p>
        </FadeIn>
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
          {/* Matches GB's filtered-grid crossfade: switching category
              fades the old grid out and the new one in instead of
              cutting instantly. */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              className="grid products-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {list.map((p, i) => (
                <ProductCard key={p.id} p={p} index={i} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </main>
  );
}
