import { useEffect, useState } from "react";

// A fixed animation duration reads at a very different felt speed on a
// narrow phone screen than on a wide desktop one, since the same
// px/second motion covers a much bigger fraction of a small screen per
// second. This just tracks a single breakpoint so tickers can use a
// different duration on mobile — no scrollWidth/JS measurement involved,
// so it can't reintroduce lag.
export default function useIsMobile(breakpoint = 640) {
  const query = `(max-width: ${breakpoint}px)`;
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.matchMedia(query).matches
  );

  useEffect(() => {
    const mql = window.matchMedia(query);
    const handler = (e) => setIsMobile(e.matches);
    mql.addEventListener("change", handler);
    setIsMobile(mql.matches);
    return () => mql.removeEventListener("change", handler);
  }, [query]);

  return isMobile;
}
