import React, { useState, useRef, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Phone } from "lucide-react";

const NAV_ITEMS = [
  { label: "HOME", href: "/" },
  { label: "ABOUT", href: "/#about" },
  { label: "SERVICES", href: "/#services" },
  { label: "PORTFOLIO", href: "/#portfolio" },
  { label: "CONTACT", href: "/#contact" },
];

const navStyles = `
  @keyframes slideDown {
    from { opacity: 0; transform: translateY(-16px); max-height: 0; }
    to   { opacity: 1; transform: translateY(0);     max-height: 600px; }
  }
  @keyframes ctaFloat {
    0%, 100% { transform: translateY(0px); }
    50%       { transform: translateY(-5px); }
  }
  @keyframes ctaShimmer {
    0%        { left: -120%; }
    55%, 100% { left: 130%; }
  }
  @keyframes ctaPhonePulse {
    0%, 100% { transform: rotate(0deg); }
    20%      { transform: rotate(-14deg); }
    40%      { transform: rotate(14deg); }
    60%      { transform: rotate(-7deg); }
    80%      { transform: rotate(7deg); }
  }
  @keyframes ctaParticleFly {
    0%   { transform: translate(0,0) scale(1); opacity: 1; }
    100% { transform: translate(var(--p-tx),var(--p-ty)) scale(0); opacity: 0; }
  }

  /* ── Hamburger lines ── */
  .hbg-line {
    display: block;
    height: 2px;
    background: white;
    border-radius: 2px;
    transition: transform 0.3s ease, opacity 0.3s ease, width 0.3s ease;
    transform-origin: center;
  }
  .hbg-open .hbg-line:nth-child(1) { transform: translateY(7px) rotate(45deg); }
  .hbg-open .hbg-line:nth-child(2) { opacity: 0; transform: scaleX(0); }
  .hbg-open .hbg-line:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

  /* ── Mobile drawer ── */
  .mobile-menu {
    animation: slideDown 0.32s cubic-bezier(0.22,1,0.36,1) forwards;
    overflow: hidden;
  }
  .mobile-nav-link {
    font-family: 'Montserrat', sans-serif;
    font-size: 0.88rem;
    letter-spacing: 0.06em;
    font-weight: 600;
    color: rgba(255,255,255,0.85);
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 13px 20px;
    transition: color 0.2s, background 0.2s;
    border-radius: 10px;
  }
  .mobile-nav-link:hover,
  .mobile-nav-link.active { color: #FF4545; background: rgba(255,69,69,0.07); }

  /* ── CTA button ── */
  .cta-btn-outer {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 16px;
    margin: -16px;
    animation: ctaFloat 3.2s ease-in-out infinite;
  }
  .cta-particle {
    position: absolute;
    border-radius: 50%;
    pointer-events: none;
    top: 50%; left: 50%;
    margin-top: -2px; margin-left: -2px;
    animation: ctaParticleFly var(--p-dur) ease-out var(--p-delay) infinite;
  }
  .cta-main-btn {
    position: relative;
    overflow: hidden;
    display: inline-flex;
    align-items: center;
    gap: 7px;
    padding: 9px 20px;
    border-radius: 9999px;
    border: none;
    cursor: pointer;
    background: linear-gradient(90deg, #fe5858e8 0%, #FF4545 100%);
    font-family: 'Montserrat', sans-serif;
    font-weight: 600;
    font-size: 18px!important;
    letter-spacing: 0.08em;
    color: #ffffff;
    white-space: nowrap;
    transition: transform 0.15s ease, box-shadow 0.15s ease;
    box-shadow: 0 4px 18px rgba(255,69,69,0.48);
  }
  .cta-main-btn:hover { transform: scale(1.05); box-shadow: 0 6px 26px rgba(255,69,69,0.68); }
  .cta-shine {
    position: absolute; top: 0; left: -120%;
    width: 50%; height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.28), transparent);
    animation: ctaShimmer 3.5s ease-in-out infinite 1.2s;
    pointer-events: none;
  }
  .cta-phone-icon {
    animation: ctaPhonePulse 3s ease-in-out infinite 1.5s;
    display: inline-flex; flex-shrink: 0;
  }

  /* Responsive CTA sizes */
  @media (max-width: 479px) {
    .cta-main-btn { font-size: 10px; padding: 7px 13px; gap: 5px; }
  }
  @media (min-width: 1440px) {
    .cta-main-btn { font-size: 13px; padding: 11px 24px; }
  }
  @media (min-width: 1920px) {
    .cta-main-btn { font-size: 14px; padding: 12px 28px; }
  }

  /* ── Navbar base ── */
  .nb-nav {
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 50;
    width: 100%;
    transition: background 0.35s ease, box-shadow 0.35s ease, backdrop-filter 0.35s ease;
  }
  .nb-nav.scrolled {
    background: linear-gradient(180deg, #1B465F 0%, #14384C 50%, #0E2432 100%);
    backdrop-filter: blur(14px);
    box-shadow: 0 4px 32px rgba(0,0,0,0.35);
  }

  /* Top bar */
  .nb-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px 16px;
  }

  /* Logo */
  .nb-logo {
    cursor: pointer;
  }
  .nb-logo img { height: 44px; width: auto; display: block; }

  /* Desktop nav links — hidden by default, shown md+ */
  .nb-links {
    display: none;
    align-items: center;
    gap: 28px;
    list-style: none;
    margin: 0; padding: 0;
  }

  /* Desktop nav link style */
  .nb-link {
    font-family: 'Montserrat', sans-serif;
    font-size: 0.78rem;
    letter-spacing: 0.05em;
    font-weight: 600;
    text-decoration: none;
    color: white;
    padding-bottom: 2px;
    border-bottom: 1px solid transparent;
    transition: color 0.2s ease, border-color 0.2s ease;
    cursor: pointer;
    background: none;
  }
  .nb-link:hover { color: #FF4545; }
  .nb-link.active { color: #FF4545; border-bottom-color: #FF4545; }

  /* Hamburger button */
  .nb-hamburger {
    display: flex;
    flex-direction: column;
    gap: 5px;
    width: 32px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 4px;
    flex-shrink: 0;
  }
  .nb-hamburger .hbg-line { width: 100%; }
  .nb-hamburger .hbg-line:nth-child(3) { width: 70%; }

  /* Right side row */
  .nb-right {
    display: flex;
    align-items: center;
    gap: 14px;
    overflow: visible;
  }

  /* Mobile drawer */
  .nb-drawer {
    display: none;
    flex-direction: column;
    gap: 4px;
    padding: 8px 12px 16px;
    background: linear-gradient(160deg, rgba(13,18,48,0.97) 0%, rgba(4,5,23,0.98) 100%);
    border-top: 1px solid rgba(255,69,69,0.15);
    border-radius: 0 0 18px 18px;
    backdrop-filter: blur(16px);
  }
  .nb-drawer.open { display: flex; }

  .nb-drawer-divider {
    height: 1px;
    background: rgba(255,255,255,0.06);
    margin: 6px 4px;
  }

  /* ════ TABLET 768px ════ */
  @media (min-width: 768px) {
    .nb-bar        { padding: 16px 28px; }
    .nb-logo img   { height: 50px; }
    .nb-hamburger  { display: none; }
    .nb-links      { display: flex; }
    .nb-drawer     { display: none !important; }
  }

  /* ════ LAPTOP 1024px ════ */
  @media (min-width: 1024px) {
    .nb-bar      { padding: 18px 40px; }
    .nb-logo img { height: 54px; }
    .nb-links    { gap: 32px; }
  }

  /* ════ MONITOR 1440px ════ */
  @media (min-width: 1440px) {
    .nb-bar      { padding: 20px 56px; }
    .nb-logo img { height: 58px; }
    .nb-links    { gap: 36px; }
  }

  /* ════ ULTRA-WIDE 1920px ════ */
  @media (min-width: 1920px) {
    .nb-bar      { padding: 22px 80px; }
    .nb-logo img { height: 78px; }
    .nb-links    { gap: 42px; }
  }

  @media (prefers-reduced-motion: reduce) {
    .cta-btn-outer { animation: none !important; }
    .cta-phone-icon { animation: none !important; }
    .cta-shine { animation: none !important; }
  }
`;

const NAV_SECTION_IDS = ["home", "about", "services", "portfolio", "contact"];
const NAV_OFFSET = 80; // height of the fixed navbar

/* "/#about" → "about", "/" → "home" */
const sectionIdFromHref = (href: string) => {
  const hash = href.split("#")[1];
  return hash || "home";
};

const Navbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const btnOuterRef = useRef<HTMLDivElement>(null);

  const { pathname } = useLocation();
  const navigate = useNavigate();
  const onHome = pathname === "/";

  /* ── Scroll spy: only meaningful on the home page ── */
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      if (!onHome) {
        setActiveSection("");
        return;
      }
      const scrollPos = window.scrollY + 160;
      let current = "home";
      for (const id of NAV_SECTION_IDS) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollPos) current = id;
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [onHome]);

  /* ── Nav click: scroll on home, otherwise go home then scroll ── */
  const handleNavClick = useCallback((e: React.MouseEvent, href: string) => {
    e.preventDefault();
    setMobileOpen(false);
    const id = sectionIdFromHref(href);

    if (onHome) {
      if (id === "home") {
        window.scrollTo({ top: 0, behavior: "smooth" });
        window.history.replaceState(null, "", "/");
        return;
      }
      const el = document.getElementById(id);
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
        window.scrollTo({ top, behavior: "smooth" });
        window.history.replaceState(null, "", `#${id}`);
      }
    } else {
      // App.tsx (MainLayout) scrolls to the section once the home page has loaded
      navigate(id === "home" ? "/" : `/#${id}`);
    }
  }, [onHome, navigate]);

  /* ── Logo click → top of home page ── */
  const handleLogoClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setMobileOpen(false);
    if (onHome) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
    }
  }, [onHome, navigate]);

  /* ── Particles ── */
  useEffect(() => {
    const outer = btnOuterRef.current;
    if (!outer) return;
    const colors = ["#FF4545", "#FF6B6B", "#FFB3B3", "#FF8C8C", "#FFCECE", "#fe5858"];
    const created: HTMLDivElement[] = [];
    for (let i = 0; i < 14; i++) {
      const p = document.createElement("div");
      p.className = "cta-particle";
      const angle = (360 / 14) * i + Math.random() * 20;
      const dist = 36 + Math.random() * 26;
      const rad = (angle * Math.PI) / 180;
      const tx = (Math.cos(rad) * dist).toFixed(1);
      const ty = (Math.sin(rad) * dist).toFixed(1);
      p.style.cssText = `
                --p-tx:${tx}px;--p-ty:${ty}px;
                --p-dur:${(1.4 + Math.random() * 1.2).toFixed(2)}s;
                --p-delay:${(Math.random() * 1.6).toFixed(2)}s;
                width:${(4 + Math.random() * 4).toFixed(1)}px;
                height:${(4 + Math.random() * 4).toFixed(1)}px;
                background:${colors[i % colors.length]};
            `;
      outer.appendChild(p);
      created.push(p);
    }
    return () => created.forEach(p => p.remove());
  }, []);

  return (
    <>
      <style>{navStyles}</style>

      <nav className={`nb-nav${scrolled || !onHome ? " scrolled" : ""}`}>

        {/* ── TOP BAR ── */}
        <div className="nb-bar">

          {/* Logo */}
          <a href="/" className="nb-logo" onClick={handleLogoClick}>
            <img src="/images/logo.png" alt="Bristol Publishers" />
          </a>

          {/* Desktop nav links */}
          <ul className="nb-links">
            {NAV_ITEMS.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className={`nb-link${activeSection === sectionIdFromHref(item.href) ? " active" : ""}`}
                  onClick={(e) => handleNavClick(e, item.href)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Right side — CTA + hamburger */}
          <div className="nb-right">
            <div style={{ overflow: "visible" }}>
              <div className="cta-btn-outer" ref={btnOuterRef}>
                <a href="tel:+17373855397" className="cta-main-btn" style={{ textDecoration: "none" }}>
                  <span className="cta-shine" />
                  <span className="cta-phone-icon">
                    <Phone size={14} strokeWidth={2.3} />
                  </span>
                  <span>(737) 385-5397</span>
                </a>
              </div>
            </div>

            {/* Hamburger — only visible below 768px */}
            <button
              className={`nb-hamburger${mobileOpen ? " hbg-open" : ""}`}
              onClick={() => setMobileOpen((o) => !o)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              <span className="hbg-line" />
              <span className="hbg-line" />
              <span className="hbg-line" />
            </button>
          </div>
        </div>

        {/* ── MOBILE DRAWER ── */}
        <div className={`nb-drawer${mobileOpen ? " open mobile-menu" : ""}`}>
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`mobile-nav-link${activeSection === sectionIdFromHref(item.href) ? " active" : ""}`}
              onClick={(e) => handleNavClick(e, item.href)}
            >
              {item.label}
            </a>
          ))}

          <div className="nb-drawer-divider" />

          {/* Mobile CTA */}
          <a
            href="tel:+17373855397"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "12px 20px",
              background: "linear-gradient(90deg,#fe5858e8,#FF4545)",
              borderRadius: "10px",
              textDecoration: "none",
              color: "white",
              fontFamily: "'Montserrat',sans-serif",
              fontSize: "0.84rem",
              fontWeight: 600,
              letterSpacing: "0.08em",
            }}
          >
            <Phone size={15} strokeWidth={2.2} />
            (737) 385-5397
          </a>
        </div>
      </nav>
    </>
  );
};

export default Navbar;