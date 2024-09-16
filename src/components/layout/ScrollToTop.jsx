import debounce from "debounce";
import { useEffect, useRef } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

export default function ScrollToTop() {
  const location = useLocation();
  const navigationType = useNavigationType();
  const scrollPositions = useRef({});

  useEffect(() => {
    const key = location.key;

    if (navigationType == "PUSH") {
      window.scrollTo(0, 0);
    } else if (navigationType == "POP") {
      const pos = scrollPositions.current[key] || { x: 0, y: 0 };
      window.scrollTo(pos.x, pos.y);
    }
  }, [location, navigationType]);

  useEffect(() => {
    const handleScroll = debounce(() => {
      const key = location.key;
      scrollPositions.current[key] = { x: window.scrollX, y: window.scrollY };
    }, 64);

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.key]);

  return null;
}
