import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

export  interface PolicySection {
  id: string;
  title: string;
  content: React.ReactNode;
}

type PolicyKey = "privacy" | "terms" | "refund";

interface PolicyLayoutProps {
  current: PolicyKey;
  title: string;
  updated: string;
  intro: React.ReactNode;
  sections: PolicySection[];
}

const POLICIES: { key: PolicyKey; label: string; to: string }[] = [
  { key: "privacy", label: "Privacy Policy",   to: "/privacy-policy" },
  { key: "terms",   label: "Terms of Service", to: "/terms-of-service" },
  { key: "refund",  label: "Refund Policy",    to: "/refund-policy" },
];

const policyStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');

  .pl-page { background: #FFFFFF; }

  /* ── Header band ── */
  .pl-hero {
    position: relative;
    overflow: hidden;
    background:
      radial-gradient(ellipse at 0% 50%,   #1B465F 0%, transparent 45%),
      radial-gradient(ellipse at 100% 0%,  #14384C 0%, transparent 50%),
      #0A1A24;
    padding: 7rem 0 2.5rem;
  }
  .pl-container {
    max-width: 1180px;
    margin: 0 auto;
    padding: 0 1rem;
    box-sizing: border-box;
  }
  .pl-back {
    display: inline-flex; align-items: center; gap: 6px;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    color: rgba(255,255,255,0.7);
    text-decoration: none;
    margin-bottom: 1.25rem;
    transition: color 0.2s ease;
  }
  .pl-back:hover { color: #FF4545; }
  .pl-title {
    font-family: 'Montserrat', sans-serif;
    font-weight: 800;
    font-size: 2.2rem;
    line-height: 1.05;
    letter-spacing: -0.03em;
    color: #fff;
    text-transform: uppercase;
    margin: 0;
  }
  .pl-updated {
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    color: rgba(255,255,255,0.6);
    margin: 0.75rem 0 0;
  }
  .pl-switch {
    display: flex; flex-wrap: wrap; gap: 8px;
    margin-top: 1.75rem;
  }
  .pl-switch a {
    font-family: 'Montserrat', sans-serif;
    font-weight: 500;
    font-size: 12px;
    letter-spacing: 0.04em;
    padding: 9px 16px;
    border-radius: 999px;
    color: rgba(255,255,255,0.85);
    border: 1px solid rgba(255,255,255,0.2);
    text-decoration: none;
    transition: background 0.2s ease, border-color 0.2s ease, color 0.2s ease;
  }
  .pl-switch a:hover { border-color: #FF4545; color: #fff; }
  .pl-switch a.active {
    background: linear-gradient(90deg, #fe5858 0%, #FF4545 100%);
    border-color: transparent;
    color: #fff;
  }

  /* ── Body ── */
  .pl-body {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
    padding-top: 2.5rem!important;
    padding-bottom: 4rem;
  }

  .pl-toc { display: none; }

  .pl-article {
    font-family: 'DM Sans', sans-serif;
    color: #26323A;
    font-size: 15px;
    line-height: 1.75;
    max-width: 760px;
  }
  .pl-intro {
    font-size: 16.5px;
    color: #0A1A24;
    padding-bottom: 1.75rem;
    margin-bottom: 0.5rem;
    border-bottom: 1px solid rgba(10,26,36,0.08);
  }
  .pl-intro p { margin: 0 0 0.75rem; }
  .pl-intro p:last-child { margin: 0; }

  .pl-section {
    scroll-margin-top: 110px;
    padding-top: 1.75rem;
  }
  .pl-section h2 {
    font-family: 'Montserrat', sans-serif;
    font-weight: 700;
    font-size: 1.15rem;
    letter-spacing: -0.01em;
    color: #0A1A24;
    margin: 0 0 0.75rem;
    display: flex; gap: 10px; align-items: baseline;
  }
  .pl-section h2 .pl-num {
    font-size: 0.8em;
    color: #FF4545;
    min-width: 1.6em;
  }
  .pl-section p { margin: 0 0 0.85rem; }
  .pl-section ul {
    margin: 0 0 0.85rem;
    padding-left: 1.2rem;
  }
  .pl-section li { margin-bottom: 0.4rem; }
  .pl-section li::marker { color: #FF4545; }
  .pl-section strong { color: #0A1A24; font-weight: 600; }
  .pl-article a { color: #E03636; text-decoration: underline; text-underline-offset: 2px; }
  .pl-article a:hover { color: #FF4545; }

  .pl-contact-card {
    margin-top: 0.5rem;
    padding: 1.1rem 1.25rem;
    border-radius: 14px;
    background: #FFF4F4;
    border: 1px solid rgba(255,69,69,0.18);
  }
  .pl-contact-card p { margin: 0 0 0.35rem; }
  .pl-contact-card p:last-child { margin: 0; }

  /* ════ TABLET 768px+ ════ */
  @media (min-width: 768px) {
    .pl-hero      { padding: 8.5rem 0 3.25rem; }
    .pl-container { padding: 0 2rem; }
    .pl-title     { font-size: 3.2rem; }
    .pl-article   { font-size: 16px; }
    .pl-intro     { font-size: 17.5px; }
    .pl-section h2 { font-size: 1.3rem; }
  }

  /* ════ LAPTOP 1024px+ — sticky contents list ════ */
  @media (min-width: 1024px) {
    .pl-container { padding: 0 2.5rem; }
    .pl-title     { font-size: 3.8rem; }
    .pl-body {
      grid-template-columns: 240px minmax(0, 1fr);
      gap: 4rem;
      padding-top: 3.5rem;
      padding-bottom: 6rem;
    }
    .pl-toc {
      display: block;
      position: sticky;
      top: 110px;
      align-self: start;
      max-height: calc(100vh - 140px);
      overflow-y: auto;
    }
    .pl-toc-title {
      font-family: 'Montserrat', sans-serif;
      font-weight: 600;
      font-size: 13px;
      color: #0A1A24;
      margin: 0 0 0.9rem;
    }
    .pl-toc ol {
      list-style: none; margin: 0; padding: 0 0 0 14px;
      border-left: 2px solid rgba(255,69,69,0.2);
      display: flex; flex-direction: column; gap: 9px;
    }
    .pl-toc a {
      font-family: 'DM Sans', sans-serif;
      font-size: 13.5px;
      line-height: 1.4;
      color: #4A5A64;
      text-decoration: none;
      transition: color 0.2s ease;
    }
    .pl-toc a:hover { color: #FF4545; }
  }

  /* ════ MONITOR 1440px+ ════ */
  @media (min-width: 1440px) {
    .pl-container { max-width: 1380px; padding: 0 3.5rem; }
    .pl-hero      { padding: 10rem 0 4rem; }
    .pl-title     { font-size: 4.5rem; }
    .pl-updated   { font-size: 15px; }
    .pl-switch a  { font-size: 13.5px; padding: 11px 20px; }
    .pl-body      { grid-template-columns: 270px minmax(0, 1fr); gap: 5rem; }
    .pl-article   { font-size: 17px; max-width: 820px; }
    .pl-intro     { font-size: 19px; }
    .pl-section h2 { font-size: 1.45rem; }
    .pl-toc a     { font-size: 14.5px; }
  }

  /* ════ ULTRA-WIDE 1920px+ ════ */
  @media (min-width: 1920px) {
    .pl-container { max-width: 1800px; padding: 0 5rem; }
    .pl-hero      { padding: 12rem 0 5rem; }
    .pl-back      { font-size: 18px; }
    .pl-title     { font-size: 6rem; }
    .pl-updated   { font-size: 20px; }
    .pl-switch a  { font-size: 18px; padding: 14px 26px; }
    .pl-body      { grid-template-columns: 360px minmax(0, 1fr); gap: 7rem; padding-top: 5rem; }
    .pl-article   { font-size: 22px; max-width: 1100px; }
    .pl-intro     { font-size: 25px; }
    .pl-section   { scroll-margin-top: 150px; padding-top: 2.5rem; }
    .pl-section h2 { font-size: 1.9rem; }
    .pl-toc       { top: 150px; }
    .pl-toc-title { font-size: 18px; }
    .pl-toc a     { font-size: 19px; }
  }

  @media (min-width: 2560px) {
    .pl-container { max-width: 80%; }
    .pl-title     { font-size: 7.5rem; }
    .pl-article   { font-size: 27px; max-width: 1400px; }
    .pl-intro     { font-size: 30px; }
    .pl-section h2 { font-size: 2.3rem; }
    .pl-toc a     { font-size: 23px; }
    .pl-toc-title { font-size: 22px; }
    .pl-switch a  { font-size: 22px; }
  }
`;

const scrollToId = (e: React.MouseEvent, id: string) => {
  e.preventDefault();
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  window.history.replaceState(null, "", `#${id}`);
};

export const ContactCard: React.FC = () => (
  <div className="pl-contact-card">
    <p><strong>Bristol Publishers</strong></p>
    <p>Email: <a href="mailto:info@bristolpublishers.com">info@bristolpublishers.com</a></p>
    <p>Phone: <a href="tel:+17373855397">(737) 385-5397</a></p>
  </div>
);

const DESCRIPTIONS: Record<PolicyKey, string> = {
  privacy: "Learn how Bristol Publishers collects, uses and protects your personal information when you use our website and services.",
  terms:   "Read the terms and conditions that apply to using the Bristol Publishers website and our book publishing services.",
  refund:  "Read the Bristol Publishers refund policy to learn how refunds work for our book publishing services, including eligibility, timelines and how to request one.",
};


const PolicyLayout: React.FC<PolicyLayoutProps> = ({ current, title, updated, intro, sections }) => {
  /* Start each policy page at the top */
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, [current]);

  return (
  <>
  <title>{`${title} | Bristol Publishers`}</title>
    <meta name="description" content={DESCRIPTIONS[current]} />
    <style>{policyStyles}</style>
    <style>{policyStyles}</style>

    <main className="pl-page">
      <header className="pl-hero">
        <div className="pl-container">
          <Link to="/" className="pl-back">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Back to home
          </Link>
          <h1 className="pl-title">{title}</h1>
          <p className="pl-updated">Last updated {updated}</p>

          <nav className="pl-switch" aria-label="Policies">
            {POLICIES.map(p => (
              <Link
                key={p.key}
                to={p.to}
                className={p.key === current ? "active" : undefined}
                aria-current={p.key === current ? "page" : undefined}
              >
                {p.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <div className="pl-container pl-body">
        <aside className="pl-toc" aria-label="On this page">
          <p className="pl-toc-title">On this page</p>
          <ol>
            {sections.map(s => (
              <li key={s.id}>
                <a href={`#${s.id}`} onClick={(e) => scrollToId(e, s.id)}>{s.title}</a>
              </li>
            ))}
          </ol>
        </aside>

        <article className="pl-article">
          <div className="pl-intro">{intro}</div>

          {sections.map((s, i) => (
            <section key={s.id} id={s.id} className="pl-section">
              <h2>
                <span className="pl-num">{String(i + 1).padStart(2, "0")}</span>
                {s.title}
              </h2>
              {s.content}
            </section>
          ))}
        </article>
      </div>
    </main>
  </>
  );
};

export default PolicyLayout;