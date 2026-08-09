import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Newsletter from "./components/Newsletter";
import WhatsAppButton from "./components/WhatsAppButton";
import ScrollReveal from "./components/ScrollReveal";
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
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
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
