import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { products, money, site } from "../data/content";
import NotFound from "./NotFound";

export default function ProductDetail() {
  const { id } = useParams();
  const p = products.find((x) => x.id === id);

  const [size, setSize] = useState(p?.sizes[0]);
  const [color, setColor] = useState(p?.colors[0]);
  const [custom, setCustom] = useState(p?.custom[0]);
  const [text, setText] = useState("");
  const [qty, setQty] = useState(1);

  if (!p) return <NotFound />;

  const customFee = custom === "No customization" ? 0 : 5 * qty;
  const total = p.price * qty + customFee;
  const mainImage = p.detailImage || p.image;
  const galleryImages = p.gallery?.length ? p.gallery.map((g) => g.image) : [mainImage];

  const processOrder = () => {
    const customLine = custom === "No customization" ? "None" : `${custom}${text ? ` — "${text}"` : ""}`;
    const msg = `Hi Afrovibes! I'd like to order:%0A%0AProduct: ${p.name}%0ASize: ${size}%0AColor: ${color.name}%0AQuantity: ${qty}%0ACustomization: ${customLine}%0ACustomization Fee: CAD $${customFee.toFixed(
      2
    )}%0ATotal: CAD $${total.toFixed(2)}%0A%0APlease let me know the next steps.`;
    window.open(`https://wa.me/${site.whatsappNumber}?text=${msg}`, "_blank");
  };

  return (
    <main>
      <div className="container product-detail product-detail-page">
        <div className="product-gallery">
          <img className="product-main" src={mainImage} alt={p.name} />
          {galleryImages.map((g, i) => (
            <img key={i} src={g} alt={`${p.name} detail ${i + 1}`} />
          ))}
        </div>
        <div className="product-copy">
          <Link className="back" to="/merch">
            ← Back to merch
          </Link>
          <div
            className="muted"
            style={{ fontWeight: 500, fontSize: ".7rem", textTransform: "uppercase", letterSpacing: ".08em", marginTop: 20 }}
          >
            {p.category}
          </div>
          <h1>{p.name}</h1>
          <div className="price" style={{ fontSize: "1.3rem" }}>
            {money(p.price)}
          </div>
          <p className="muted">
            A piece of the Afrovibes experience. Choose your fit, color and optional personalization.
          </p>

          <div className="option">
            <label>Size</label>
            <div className="sizes">
              {p.sizes.map((s) => (
                <button key={s} className={`size${s === size ? " selected" : ""}`} onClick={() => setSize(s)}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="option">
            <label>Color — {color.name}</label>
            <div className="swatches">
              {p.colors.map((c, i) => (
                <button
                  key={i}
                  className={`swatch${c.name === color.name ? " selected" : ""}`}
                  title={c.name}
                  style={{ background: c.hex }}
                  onClick={() => setColor(c)}
                />
              ))}
            </div>
          </div>

          <div className="option">
            <label>Customize Your Merch</label>
            <select value={custom} onChange={(e) => setCustom(e.target.value)}>
              {p.custom.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {custom !== "No customization" && (
            <div className="option">
              <label>Custom Text</label>
              <input
                className="text-input"
                value={text}
                placeholder="Enter your text"
                onChange={(e) => setText(e.target.value)}
              />
            </div>
          )}

          <div className="option">
            <label>Quantity</label>
            <div className="qty">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))}>−</button>
              <span>{qty}</span>
              <button onClick={() => setQty((q) => q + 1)}>+</button>
            </div>
          </div>

          <div className="summary">
            <div className="summary-row">
              <span>Product</span>
              <span>{money(p.price * qty)}</span>
            </div>
            <div className="summary-row">
              <span>Customization</span>
              <span>{custom === "No customization" ? "—" : money(customFee)}</span>
            </div>
            <div className="summary-row total">
              <span>Total</span>
              <span>{money(total)}</span>
            </div>
          </div>

          <button className="btn btn-primary" style={{ width: "100%", marginTop: 20 }} onClick={processOrder}>
            Process Order
          </button>
        </div>
      </div>
    </main>
  );
}
