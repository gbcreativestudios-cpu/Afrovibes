import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Newsletter from "./components/Newsletter";
import WhatsAppButton from "./components/WhatsAppButton";
import TypographySettings from "./components/TypographySettings";
import PageTransition from "./components/PageTransition";
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
          window.scrollTo({ top, behavior: "instant" });
          return;
        }
        window.scrollTo({ top: 0, behavior: "instant" });
      });
      return;
    }
    window.scrollTo({ top: 0, behavior: "instant" });
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

// Matches GB Studios' router: AnimatePresence mode="wait" keyed on the
// route so every navigation cross-fades/scales the outgoing page out
// before the new one animates in, instead of cutting instantly.
function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/events" element={<PageTransition><Events /></PageTransition>} />
        <Route path="/event/:id" element={<PageTransition variant="detail"><EventDetail /></PageTransition>} />
        <Route path="/merch" element={<PageTransition><Merch /></PageTransition>} />
        <Route path="/product/:id" element={<PageTransition variant="detail"><ProductDetail /></PageTransition>} />
        <Route path="/who-we-are" element={<PageTransition variant="detail"><About /></PageTransition>} />
        <Route path="/connect" element={<PageTransition variant="connect"><Connect /></PageTransition>} />
        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <>
      <Favicon />
      <TypographySettings />
      <ScrollToTop />
      <Nav />
      <AnimatedRoutes />
      <Newsletter />
      <Footer />
      <WhatsAppButton />
    </>
  );
}
