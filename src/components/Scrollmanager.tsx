import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Place once inside <BrowserRouter>, above <Routes>.
 * - URL has a hash (e.g. "/#about"): scrolls to that section once it exists.
 * - No hash: scrolls to the top when the page changes (e.g. opening a policy page).
 */
const ScrollManager: React.FC = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
      return;
    }

    const id = decodeURIComponent(hash.slice(1));
    let tries = 0;
    let timer: number;

    const tryScroll = () => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      } else if (tries++ < 20) {
        timer = window.setTimeout(tryScroll, 100); // wait for the section to render
      }
    };
    tryScroll();

    return () => window.clearTimeout(timer);
  }, [pathname, hash]);

  return null;
};

export default ScrollManager;