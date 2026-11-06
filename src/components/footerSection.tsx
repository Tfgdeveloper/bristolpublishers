import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const footerStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500&display=swap');

  @keyframes rotateSlow {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }
  @keyframes orbPulse {
    0%, 100% { opacity: 0.4; transform: scale(1); }
    50%       { opacity: 0.7; transform: scale(1.1); }
  }

  /* ── Blinking phone number ── */
  @keyframes ftPhoneBlink {
    0%, 100% { color: #0A0A0A; }
    50%       { color: #FF4545; }
  }
  @keyframes ftPhoneFloat {
    0%, 100% { transform: translateX(0); }
    50%       { transform: translateX(4px); }
  }
  @keyframes ftPhoneRing {
    0%, 70%, 100% { transform: rotate(0deg) scale(1); }
    75%           { transform: rotate(-14deg) scale(1.12); }
    80%           { transform: rotate(12deg) scale(1.12); }
    85%           { transform: rotate(-10deg) scale(1.08); }
    90%           { transform: rotate(8deg) scale(1.04); }
  }

  .footer-link {
    font-family: 'DM Sans', sans-serif;
    font-weight: 300;
    color: #0A0A0A;
    text-decoration: none;
    transition: color 0.2s ease;
    font-size: clamp(0.82rem, 1.8vw, 1rem);
    cursor: pointer;
  }
  .footer-link:hover { color: #FF4545; }
  .footer-link:focus-visible { outline: 2px solid #FF4545; outline-offset: 3px; border-radius: 3px; }

  /* ════════════════════════════════════
     BASE — Small Mobile (≤ 479px)
     ════════════════════════════════════ */
  .ft-footer {
    background: linear-gradient(180deg, #FFFFFF 0%, #FFF9F9 25%, #FFE8E8 55%, #FFD6D6 80%, #FFFFFF 100%);
    width: 100%;
    position: relative;
    overflow: hidden;
    font-family: 'DM Sans', sans-serif;
  }

  .ft-orb-tl {
    position: absolute; top: 10%; left: -6%;
    width: 220px; height: 220px; border-radius: 50%;
    background: radial-gradient(circle, rgba(255,69,69,0.07) 0%, transparent 65%);
    animation: orbPulse 7s ease-in-out infinite;
    pointer-events: none;
  }
  .ft-orb-br {
    position: absolute; bottom: 20%; right: -5%;
    width: 200px; height: 200px; border-radius: 50%;
    background: radial-gradient(circle, rgba(255,69,69,0.07) 0%, transparent 70%);
    opacity: 0.15; pointer-events: none;
  }
  .ft-ring {
    position: absolute; top: 8%; right: 5%;
    width: 90px; height: 90px;
    border: 1px dashed rgba(255,69,69,0.1);
    border-radius: 50%;
    animation: rotateSlow 20s linear infinite;
    pointer-events: none;
  }

  .ft-container {
    position: relative;
    max-width: 1200px;
    margin: 0 auto;
    padding: 56px 16px 0;
  }

  /* ── TOP GRID (logo col + nav cols) ── */
  .ft-top-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 36px;
    padding-bottom: 40px;
    border-bottom: 1px solid rgba(0,0,0,0.08);
  }

  .ft-logo-wrap { margin-bottom: 16px; }
  .ft-logo-wrap img { height: 48px; width: auto; }

  .ft-tagline {
    font-size: clamp(0.82rem, 2vw, 1rem);
    line-height: 1.8;
    color: #0A0A0A;
    font-weight: 300;
    margin: 0 0 18px;
  }

  .ft-contact {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .ft-contact a {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    font-weight: 500;
  }
  .ft-contact svg { flex-shrink: 0; color: #FF4545; }

  .ft-phone-btn {
    align-self: flex-start;
    display: inline-flex;
    align-items: center;
    gap: 10px;
    font-family: 'DM Sans', sans-serif;
    font-weight: 600;
    font-size: clamp(0.9rem, 1.9vw, 1.05rem);
    text-decoration: none;
    white-space: nowrap;
    animation: ftPhoneBlink 1.6s ease-in-out infinite, ftPhoneFloat 2.4s ease-in-out infinite;
  }
  .ft-phone-btn:hover { animation-play-state: paused; color: #FF4545; }
  .ft-phone-btn:focus-visible { outline: 2px solid #FF4545; outline-offset: 3px; border-radius: 3px; }
  .ft-contact .ft-phone-btn svg {
    color: #FF4545;
    animation: ftPhoneRing 2s ease-in-out infinite;
  }

  .ft-nav-cols {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 28px 20px;
  }

  .ft-nav-title {
    font-family: 'Montserrat', sans-serif;
    font-weight: 600;
    font-size: 0.78rem;
    letter-spacing: 0.18em;
    color: #FF4545;
    margin: 0 0 14px;
    text-transform: uppercase;
  }

  .ft-nav-list {
    list-style: none;
    padding: 0; margin: 0;
    display: flex; flex-direction: column;
    gap: 10px;
  }

  /* ── BOTTOM BAR ── */
  .ft-bottom {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 20px 0 28px;
  }
  .ft-copyright {
    font-size: 0.74rem;
    color: rgba(0,0,0,0.45);
    margin: 0;
    font-weight: 300;
  }
  .ft-legal-links {
    display: flex;
    flex-wrap: wrap;
    gap: 8px 18px;
  }
  .ft-legal-links .footer-link { font-size: 0.8rem; }

  /* ════ LARGE MOBILE 480px+ ════ */
  @media (min-width: 480px) {
    .ft-container     { padding: 64px 22px 0; }
    .ft-top-grid      { gap: 40px; padding-bottom: 44px; }
    .ft-logo-wrap img { height: 52px; }
    .ft-tagline       { max-width: 420px; }
    .ft-nav-cols      { grid-template-columns: repeat(3, 1fr); gap: 24px 16px; }
    .ft-orb-tl        { width: 280px; height: 280px; }
    .ft-orb-br        { width: 260px; height: 260px; }
    .ft-ring          { width: 110px; height: 110px; }
  }

  /* ════ TABLET 768px+ ════ */
  @media (min-width: 768px) {
    .ft-container { padding: 72px 28px 0; }
    .ft-top-grid {
      grid-template-columns: 1.3fr 2fr;
      gap: 48px;
      padding-bottom: 52px;
      align-items: start;
    }
    .ft-logo-wrap img { height: 54px; }
    .ft-tagline       { max-width: 300px; }
    .ft-nav-cols      { gap: 20px; }
    .ft-nav-title     { font-size: 0.82rem; }
    .ft-bottom {
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      padding: 22px 0 32px;
    }
    .ft-orb-tl { width: 340px; height: 340px; }
    .ft-orb-br { width: 300px; height: 300px; }
    .ft-ring   { width: 130px; height: 130px; }
  }

  /* ════ LAPTOP 1024px+ ════ */
  @media (min-width: 1024px) {
    .ft-container { padding: 80px 40px 0; }
    .ft-top-grid {
      grid-template-columns: 1.4fr 1fr 1fr 1fr;
      gap: 48px;
      padding-bottom: 60px;
    }
    .ft-nav-cols      { display: contents; }
    .ft-logo-wrap img { height: 56px; }
    .ft-tagline       { max-width: 300px; }
    .ft-nav-title     { font-size: 0.85rem; margin-bottom: 18px; }
    .ft-nav-list      { gap: 11px; }
    .ft-bottom        { padding: 24px 0 36px; }
    .ft-orb-tl { width: 400px; height: 400px; }
    .ft-orb-br { width: 360px; height: 360px; }
    .ft-ring   { width: 150px; height: 150px; }
  }

  /* ════ MONITOR 1440px+ ════ */
  @media (min-width: 1440px) {
    .ft-container     { padding: 88px 56px 0; max-width: 1380px; }
    .ft-top-grid      { gap: 56px; padding-bottom: 64px; }
    .ft-logo-wrap img { height: 60px; }
    .ft-tagline       { max-width: 320px; font-size: 1rem; }
    .ft-nav-title     { font-size: 0.9rem; margin-bottom: 20px; }
    .ft-nav-list      { gap: 12px; }
    .ft-bottom        { padding: 24px 0 40px; }
    .ft-copyright     { font-size: 0.8rem; }
    .ft-legal-links .footer-link { font-size: 0.85rem; }
    .ft-orb-tl { width: 420px; height: 420px; }
  }

  /* ════ ULTRA-WIDE 1920px+ ════ */
  @media (min-width: 1920px) {
    .ft-container     { padding: 100px 80px 0; max-width: 100%; }
    .ft-top-grid      { gap: 72px; padding-bottom: 72px; }
    .ft-logo-wrap img { height: 78px; }
    .ft-tagline       { max-width: 520px; font-size: 24px; margin-bottom: 24px; }
    .ft-contact       { gap: 12px; }
    .ft-contact svg   { width: 22px; height: 22px; }
    .ft-phone-btn     { font-size: 1.4rem; gap: 12px; }
    .ft-nav-title     { font-size: 1.2rem; margin-bottom: 24px; }
    .ft-nav-list      { gap: 16px; }
    .footer-link      { font-size: 1.3rem; }
    .ft-bottom        { padding: 28px 0 48px; }
    .ft-copyright     { font-size: 1rem; }
    .ft-legal-links .footer-link { font-size: 1rem; }
    .ft-orb-tl { width: 500px; height: 500px; }
    .ft-orb-br { width: 440px; height: 440px; }
    .ft-ring   { width: 170px; height: 170px; }
  }

  @media (min-width: 2560px) {
    .ft-container     { max-width: 80%; }
    .ft-tagline       { max-width: 640px; font-size: 26px; }
    .ft-nav-title     { font-size: 1.4rem; }
    .footer-link      { font-size: 1.5rem; }
    .ft-phone-btn     { font-size: 1.65rem; }
    .ft-copyright     { font-size: 1.15rem; }
    .ft-legal-links .footer-link { font-size: 1.15rem; }
  }

  @media (prefers-reduced-motion: reduce) {
    .ft-orb-tl { animation: none !important; }
    .ft-ring   { animation: none !important; }
    .ft-phone-btn, .ft-contact .ft-phone-btn svg { animation: none !important; }
  }
`;

/* type "section" = scroll to a section on the landing page
   type "page"    = go to a separate route                   */
type FooterLink = { label: string; type: "section" | "page"; to: string };

const NAV_COLS: { title: string; links: FooterLink[] }[] = [
  {
    title: "Quick Nav",
    links: [
      { label: "Home",      type: "section", to: "home" },
      { label: "About Us",  type: "section", to: "about" },
      { label: "Services",  type: "section", to: "services" },
      { label: "Portfolio", type: "section", to: "portfolio" },
      { label: "Contact",   type: "section", to: "contact" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Ghostwriting",          type: "section", to: "services" },
      { label: "Editing & Proofreading", type: "section", to: "services" },
      { label: "Cover Design",          type: "section", to: "services" },
      { label: "Book Publishing",       type: "section", to: "services" },
      { label: "Book Marketing",        type: "section", to: "services" },
      { label: "Audiobook Production",  type: "section", to: "services" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy",   type: "page", to: "/privacy-policy" },
      { label: "Terms of Service", type: "page", to: "/terms-of-service" },
      { label: "Refund Policy",    type: "page", to: "/refund-policy" },
    ],
  },
];

const LEGAL_LINKS: FooterLink[] = NAV_COLS[2].links;

const FooterSection: React.FC = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  /* On the landing page: smooth-scroll. On any other page: go to "/#id"
     (ScrollManager then scrolls to the section once it has rendered). */
  const goToSection = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    if (pathname === "/") {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.replaceState(null, "", `#${id}`);
    } else {
      navigate(`/#${id}`);
    }
  };

  const renderLink = (link: FooterLink) =>
    link.type === "section" ? (
      <a href={`/#${link.to}`} className="footer-link" onClick={(e) => goToSection(e, link.to)}>
        {link.label}
      </a>
    ) : (
      <Link to={link.to} className="footer-link">{link.label}</Link>
    );

  return (
    <>
      <style>{footerStyles}</style>

      <footer className="ft-footer">
        <div className="ft-orb-tl" />
        <div className="ft-orb-br" />
        <div className="ft-ring" />

        <div className="ft-container">

          {/* ── TOP GRID ── */}
          <div className="ft-top-grid">

            <div className="ft-logo-col">
              <div className="ft-logo-wrap">
                <a href="/#home" onClick={(e) => goToSection(e, "home")}>
                  <img src="/images/footerlogo.png" alt="Bristol Publishers" />
                </a>
              </div>
              <p className="ft-tagline">
                Bristol Publishers handle the complexity of publishing so your focus remains on creativity while we manage execution. Because finishing a book is not the end, it's the transition from creation to recognition.
              </p>
              <div className="ft-contact">
                <a href="tel:+17373855397" className="ft-phone-btn">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.7A2 2 0 012 .99h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                  </svg>
                  (737) 385-5397
                </a>
                <a href="mailto:info@bristolpublishers.com" className="footer-link">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
                  </svg>
                  info@bristolpublishers.com
                </a>
               <div className="footer-link flex items-start gap-2 font-bold">
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="mt-1 shrink-0"
  >
    <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>

  <span className="font-semibold">
    1919 Taylor Street STE F<br />
    Houston, TX 77007
  </span>
</div>
              </div>
            </div>

            {/* On laptop+ display:contents places these directly in the 4-col grid */}
            <div className="ft-nav-cols">
              {NAV_COLS.map(col => (
                <nav key={col.title} aria-label={col.title}>
                  <p className="ft-nav-title">{col.title}</p>
                  <ul className="ft-nav-list">
                    {col.links.map(link => (
                      <li key={link.label}>{renderLink(link)}</li>
                    ))}
                  </ul>
                </nav>
              ))}
            </div>
          </div>

          {/* ── BOTTOM BAR ── */}
          <div className="ft-bottom">
            <p className="ft-copyright">©2026 Bristol Publishers. All Rights Reserved.</p>
            <div className="ft-legal-links">
              {LEGAL_LINKS.map(l => (
                <Link key={l.label} to={l.to} className="footer-link">{l.label}</Link>
              ))}
            </div>
          </div>

        </div>
      </footer>
    </>
  );
};

export default FooterSection;