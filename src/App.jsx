import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Newsletter from "./components/Newsletter";
import WhatsAppButton from "./components/WhatsAppButton";
import ScrollReveal from "./components/ScrollReveal";
import TypographySettings from "./components/TypographySettings";
import Home from "./pages/Home";
import Events from "./pages/Events";
import EventDetail from "./pages/EventDetail";
import Merch from "./pages/Merch";
import ProductDetail from "./pages/ProductDetail";
import About from "./pages/About";
import Connect from "./pages/Connect";
import NotFound from "./pages/NotFound";
import { site } from "./data/content";

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      // Give the new page a moment to render so the target section
      // actually exists before we try to scroll to it.
      const id = hash.slice(1);
      requestAnimationFrame(() => {
        const el = document.getElementById(id);
        if (el) {
          // Offset by the fixed nav's height so the section heading
          // isn't hidden underneath it.
          const navHeight = 96;
          const top = el.getBoundingClientRect().top + window.scrollY - navHeight;
          window.scrollTo({ top, behavior: "smooth" });
          return;
        }
        window.scrollTo(0, 0);
      });
      return;
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

function Favicon() {
  useEffect(() => {
    if (!site.favicon) return;
    let link = document.querySelector("link[rel='icon']");
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
    }
    link.href = site.favicon;
  }, []);
  return null;
}

export default function App() {
  return (
    <>
      <Favicon />
      <TypographySettings />
      <ScrollToTop />
      <ScrollReveal />
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/event/:id" element={<EventDetail />} />
        <Route path="/merch" element={<Merch />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/who-we-are" element={<About />} />
        <Route path="/connect" element={<Connect />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Newsletter />
      <Footer />
      <WhatsAppButton />
    </>
  );
}
