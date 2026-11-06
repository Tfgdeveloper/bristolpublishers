import React, { useEffect, useRef, useState } from "react";
import SplitText from "./SplitText";
import { Link } from 'react-scroll';

const openQuoteModal = (service?: string) => {
  window.dispatchEvent(new CustomEvent("bp:open-quote-modal", { detail: service ?? "" }));
};

const servicesStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(40px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes cardReveal {
    from { opacity: 0; transform: translateY(50px) scale(0.97); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }
  @keyframes rotateSlow {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }
  @keyframes iconFloat {
    0%, 100% { transform: translateY(0px); }
    50%       { transform: translateY(-6px); }
  }
  @keyframes orbPulse {
    0%, 100% { transform: scale(1);    opacity: 0.5; }
    50%       { transform: scale(1.1); opacity: 0.8; }
  }

  /* ── Card hover ── */
  .srv-card {
    transition: transform 0.35s cubic-bezier(0.22,1,0.36,1),
                box-shadow  0.35s cubic-bezier(0.22,1,0.36,1),
                border-color 0.35s ease;
    cursor: default;
    position: relative;
    overflow: hidden;
    height: 100%;
  }
  .srv-card::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(255,69,69,0.18) 0%, rgba(255,69,69,0.08) 100%);
    opacity: 0;
    transition: opacity 0.35s ease;
    border-radius: inherit;
    pointer-events: none;
  }
  .srv-card:hover { transform: translateY(-10px) scale(1.015); box-shadow: 0 30px 80px rgba(0,0,0,0.5), 0 0 40px rgba(255,69,69,0.18); border-color: rgba(255,69,69,0.45) !important; background: rgba(255,69,69,0.08) !important; }
  .srv-card:hover::before { opacity: 1; }
  .srv-card:hover .srv-icon-wrap { animation: iconFloat 2s ease-in-out infinite; box-shadow: 0 8px 32px rgba(255,69,69,0.3) !important; }
  .srv-card:hover .srv-arrow { opacity: 1 !important; transform: translate(0,0) !important; }
  .srv-card:hover .srv-num { color: rgba(255,69,69,0.15) !important; }
  .srv-card:hover .srv-line { width: 100% !important; }
  .srv-line { transition: width 0.4s ease; }

  .featured-card { background: linear-gradient(135deg, #FF4545 0%, #c42020 100%) !important; border-color: transparent !important; }
  .featured-card .srv-num   { color: rgba(255,255,255,0.12) !important; }
  .featured-card .srv-title { color: white !important; }
  .featured-card .srv-desc  { color: rgba(255,255,255,0.75) !important; }
  .featured-card .srv-icon-wrap { background: rgba(255,255,255,0.15) !important; box-shadow: none !important; }
  .featured-card .srv-icon  { color: white !important; }
  .featured-card .srv-arrow { color: white !important; }
  .featured-card .srv-line  { background: rgba(255,255,255,0.25) !important; }
  .featured-card:hover { box-shadow: 0 30px 80px rgba(255,69,69,0.4), 0 0 60px rgba(255,69,69,0.25) !important; }

  /* ════════════════════════════════════
     BASE — Small Mobile (≤ 479px)
     ════════════════════════════════════ */

  .srv-section {
    background: linear-gradient(180deg, #1B465F 0%, #14384C 50%, #0E2432 100%);
    overflow: hidden;
    padding: 60px 0 70px !important;
    position: relative;
  }

  .srv-orb-tr {
    position: absolute; top: 15%; right: -8%;
    width: 280px; height: 280px; border-radius: 50%;
    background: radial-gradient(circle, rgba(255,69,69,0.06) 0%, transparent 65%);
    animation: orbPulse 6s ease-in-out infinite;
    pointer-events: none;
  }
  .srv-orb-bl {
    position: absolute; bottom: 10%; left: -6%;
    width: 240px; height: 240px; border-radius: 50%;
    background: radial-gradient(circle, rgba(27,70,95,0.55) 0%, transparent 70%);
    pointer-events: none;
  }
  .srv-grid-bg {
    position: absolute; inset: 0;
    background-image:
      linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px);
    background-size: 60px 60px;
    pointer-events: none;
  }
  .srv-ring {
    position: absolute; bottom: 12%; right: 6%;
    width: 100px; height: 100px;
    border: 1px dashed rgba(255,69,69,0.12);
    border-radius: 50%;
    animation: rotateSlow 18s linear infinite;
    pointer-events: none;
  }

  .srv-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 18px;
  }

  /* Header block */
  .srv-header {
    margin-bottom: 40px;
  }

  .srv-eyebrow {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 18px;
  }
  .srv-eyebrow-line {
    height: 2px;
    background: #FF4545;
    transition: width 0.8s ease 0.2s;
  }
  .srv-eyebrow-text {
    font-family: 'Montserrat', sans-serif;
    font-size: 0.90rem;
    font-weight: 600;
    letter-spacing: 0.25em;
    color: #FF4545;
  }

  .srv-header-inner {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .srv-heading {
    font-family: 'Montserrat', sans-serif;
    font-weight: 800;
    font-size: clamp(1.75rem, 6vw, 3rem);
    letter-spacing: -0.02em;
    line-height: 1.07;
    color: white;
    margin: 0;
  }

  .srv-subtext {
    font-family: 'DM Sans', sans-serif;
    font-size: clamp(0.85rem, 2.5vw, 1.1rem);
    line-height: 1.75;
    color: rgba(255, 255, 255, 0.91);
    max-width: 460px;
    margin: 0;
    font-weight: 300;
  }

  /* Cards grid */
  .srv-cards-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 14px;
    align-items: stretch;
  }

  /* Single card */
  .srv-card-inner {
    background: rgba(255,255,255,0.025);
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 16px;
    padding: 22px 20px 20px;
    display: flex;
    flex-direction: column;
    gap: 0;
    backdrop-filter: blur(8px);
    height: 100%;
    box-sizing: border-box;
  }

  .srv-card-top {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 16px;
  }

  .srv-num {
    font-family: 'Montserrat', sans-serif;
    font-size: 2.8rem;
    line-height: 1;
    color: rgba(255,255,255,0.06);
    letter-spacing: -0.02em;
    transition: color 0.35s ease;
    user-select: none;
  }

  .srv-icon-wrap {
    width: 44px; height: 44px;
    border-radius: 12px;
    background: rgba(255,69,69,0.12);
    display: flex; align-items: center; justify-content: center;
    box-shadow: 0 4px 20px rgba(255,69,69,0.15);
    transition: box-shadow 0.35s ease;
  }

  .srv-icon { color: #FF4545; }

  .srv-line {
    height: 1px;
    width: 40px;
    background: rgba(255,69,69,0.35);
    margin-bottom: 14px;
    border-radius: 999px;
  }

  .srv-title {
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(1.05rem, 3vw, 1.5rem);
    letter-spacing: 0.03em;
    font-weight: 600;
    color: white;
    margin: 0 0 10px;
    line-height: 1.1;
  }

  .srv-desc {
    font-family: 'DM Sans', sans-serif;
    font-size: clamp(0.82rem, 2vw, 1rem);
    line-height: 1.7;
    color: rgba(255, 255, 255, 0.81);
    margin: 0 0 16px;
    font-weight: 300;
    flex-grow: 1;
  }

  .srv-arrow {
    color: #FF4545;
    opacity: 0;
    transform: translate(-6px, 6px);
    transition: opacity 0.3s ease, transform 0.3s ease;
    display: flex; align-items: center; gap: 6px;
    font-family: 'Montserrat', sans-serif;
    font-size: 0.82rem;
    letter-spacing: 0.1em;
    align-self: flex-end;
  }

  /* Bottom CTA banner */
  .srv-cta-banner {
    margin-top: 44px;
    padding: 26px 22px;
    border-radius: 16px;
    background: rgba(255,255,255,0.025);
    border: 1px solid rgba(255,255,255,0.07);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 18px;
    backdrop-filter: blur(8px);
  }

  .srv-cta-heading {
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(1rem, 3.5vw, 1.6rem);
    color: white;
    font-weight: 600;
    margin: 0;
    letter-spacing: 0.02em;
    line-height: 1.3;
  }

  .srv-cta-btn {
    font-family: 'Montserrat', sans-serif;
    letter-spacing: 0.1em;
    font-size: clamp(0.78rem, 2vw, 0.9rem);
    font-weight: 500;
    padding: 12px 28px;
    border-radius: 999px;
    background: linear-gradient(90deg, #FF4545, #fe5858);
    color: white;
    border: none;
    cursor: pointer;
    white-space: nowrap;
    flex-shrink: 0;
    transition: opacity 0.2s ease, transform 0.2s ease;
    box-shadow: 0 8px 32px rgba(255,69,69,0.3);
    align-self: stretch;
    text-align: center;
  }
  .srv-cta-btn:hover { opacity: 0.85; transform: translateY(-2px); }


  /* ════════════════════════════════════
     LARGE MOBILE  480px – 767px
     ════════════════════════════════════ */
  @media (min-width: 480px) {
    .srv-section   { padding: 70px 0 80px; }
    .srv-container { padding: 0 24px; }
    .srv-header    { margin-bottom: 44px; }
    .srv-cards-grid { grid-template-columns: 1fr 1fr; gap: 14px; }
    .srv-num  { font-size: 3rem; }
    .srv-orb-tr { width: 340px; height: 340px; }
    .srv-orb-bl { width: 280px; height: 280px; }
    .srv-ring   { width: 120px; height: 120px; }
    .srv-cta-banner { padding: 28px 26px; }
  }


  /* ════════════════════════════════════
     TABLET  768px – 1023px
     ════════════════════════════════════ */
  @media (min-width: 768px) {
    .srv-section   { padding: 80px 0 90px; }
    .srv-container { padding: 0 32px; }
    .srv-header    { margin-bottom: 56px; }
    .srv-eyebrow   { margin-bottom: 20px; }

    .srv-header-inner {
      flex-direction: row;
      justify-content: space-between;
      align-items: flex-end;
      gap: 24px;
    }

    .srv-cards-grid { grid-template-columns: repeat(2, 1fr); gap: 16px; }

    .srv-card-inner { padding: 26px 22px 22px; border-radius: 18px; }
    .srv-num  { font-size: 3.2rem; }
    .srv-icon-wrap { width: 48px; height: 48px; }

    .srv-cta-banner {
      margin-top: 52px;
      padding: 30px 36px;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      border-radius: 18px;
    }
    .srv-cta-btn { align-self: auto; }

    .srv-orb-tr { width: 400px; height: 400px; }
    .srv-orb-bl { width: 320px; height: 320px; }
    .srv-ring   { width: 140px; height: 140px; }
  }


  /* ════════════════════════════════════
     LAPTOP  1024px – 1439px
     ════════════════════════════════════ */
  @media (min-width: 1024px) {
    .srv-section   { padding: 100px 0 110px; }
    .srv-container { padding: 0 40px; }
    .srv-header    { margin-bottom: 64px; }

    .srv-cards-grid { grid-template-columns: repeat(3, 1fr); gap: 18px; }

    .srv-card-inner { padding: 28px 24px 24px; border-radius: 18px; }
    .srv-num  { font-size: 3.2rem; }
    .srv-icon-wrap { width: 50px; height: 50px; }

    .srv-cta-banner {
      margin-top: 58px;
      padding: 32px 44px;
      border-radius: 20px;
    }
    .srv-cta-btn { padding: 13px 32px; }

    .srv-orb-tr { width: 460px; height: 460px; }
    .srv-orb-bl { width: 360px; height: 360px; }
    .srv-ring   { width: 150px; height: 150px; }
  }


  /* ════════════════════════════════════
     MONITOR  1440px – 1919px
     ════════════════════════════════════ */
  @media (min-width: 1440px) {
    .srv-section   { padding: 110px 0 120px; }
    .srv-container { padding: 0 56px; max-width: 1380px; }
    .srv-header    { margin-bottom: 72px; }

    .srv-cards-grid { grid-template-columns: repeat(3, 1fr); gap: 20px; }

    .srv-card-inner { padding: 32px 28px 28px; border-radius: 20px; }
    .srv-num  { font-size: 3.5rem; }
    .srv-icon-wrap { width: 52px; height: 52px; border-radius: 14px; }

    .srv-cta-banner {
      margin-top: 64px;
      padding: 36px 48px;
      border-radius: 20px;
    }
    .srv-cta-btn { padding: 14px 36px; }

    .srv-orb-tr { width: 500px; height: 500px; }
    .srv-orb-bl { width: 400px; height: 400px; }
    .srv-ring   { width: 160px; height: 160px; }
  }


  /* ════════════════════════════════════
     ULTRA-WIDE  ≥ 1920px
     ════════════════════════════════════ */
  @media (min-width: 1920px) {
    .srv-section   { padding: 130px 0 140px; }
    .srv-container { padding: 0 80px; max-width: 100%; }
    .srv-header    { margin-bottom: 80px; }

    .srv-cards-grid { gap: 24px; }
    .srv-card-inner { padding: 36px 32px 30px; border-radius: 22px; }
    .srv-num  { font-size: 3rem; }
    .srv-icon-wrap { width: 78px; height: 78px; border-radius: 20px; }

    .srv-cta-banner { margin-top: 72px; padding: 40px 56px; border-radius: 22px; }
    .srv-cta-btn { padding: 15px 40px; font-size: 1.5rem; }

    .srv-orb-tr { width: 600px; height: 600px; }
    .srv-orb-bl { width: 480px; height: 480px; }
    .srv-ring   { width: 180px; height: 180px; }

    .srv-heading {
    font-family: 'Montserrat', sans-serif;
    font-weight: 800;
    font-size: 4rem;
    letter-spacing: -0.02em;
    line-height: 1.07;
    color: white;
    margin: 0;
   }

   .srv-subtext {
    font-family: 'DM Sans', sans-serif;
    font-size: 24px;
    line-height: 1.75;
    color: rgba(255,255,255,0.45);
    max-width: 700px;
    margin: 0;
    font-weight: 300;
   }

    .srv-title {
    font-family: 'Montserrat', sans-serif;
    font-size: 28px;
    letter-spacing: 0.03em;
    font-weight: 600;
    color: white;
    margin: 0 0 10px;
    line-height: 1.1;
   }

  .srv-desc {
    font-family: 'DM Sans', sans-serif;
    font-size: 24px;
    line-height: 1.7;
    color: rgba(255,255,255,0.5);
    margin: 0 0 16px;
    font-weight: 300;
    flex-grow: 1;
   }

  .srv-arrow {
    color: #FF4545;
    opacity: 0;
    transform: translate(-6px, 6px);
    transition: opacity 0.3s ease, transform 0.3s ease;
    display: flex; align-items: center; gap: 6px;
    font-family: 'Montserrat', sans-serif;
    font-size: 1.2rem;
    letter-spacing: 0.1em;
    align-self: flex-end;
   }

   .srv-eyebrow {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 18px;
  }
  .srv-eyebrow-line {
    height: 2px;
    background: #FF4545;
    transition: width 0.8s ease 0.2s;
  }
  .srv-eyebrow-text {
    font-family: 'Montserrat', sans-serif;
    font-size: 1.1rem;
    letter-spacing: 0.25em;
    color: #FF4545;
    font-weight: 600;
  }
  }

  @media (min-width: 2560px) {
    .srv-section   { padding: 130px 0 140px; }
    .srv-container { padding: 0 80px; max-width: 80%; }
    .srv-header    { margin-bottom: 80px; }

    .srv-cards-grid { gap: 24px; }
    .srv-card-inner { padding: 36px 32px 30px; border-radius: 22px; }
    .srv-num  { font-size: 4rem; }
    .srv-icon-wrap { width: 78px; height: 78px; border-radius: 20px; }

    .srv-cta-banner { margin-top: 72px; padding: 40px 56px; border-radius: 22px; }
    .srv-cta-btn { padding: 15px 40px; font-size: 1.5rem; }

    .srv-orb-tr { width: 600px; height: 600px; }
    .srv-orb-bl { width: 480px; height: 480px; }
    .srv-ring   { width: 180px; height: 180px; }

    .srv-heading {
    font-family: 'Montserrat', sans-serif;
    font-weight: 800;
    font-size: 5rem;
    letter-spacing: -0.02em;
    line-height: 1.07;
    color: white;
    margin: 0;
   }

   .srv-subtext {
    font-family: 'DM Sans', sans-serif;
    font-size: 28px;
    line-height: 1.75;
    color: rgba(255,255,255,0.45);
    max-width: 700px;
    margin: 0;
    font-weight: 300;
   }

    .srv-title {
    font-family: 'Montserrat', sans-serif;
    font-size: 32px;
    letter-spacing: 0.03em;
    font-weight: 600;
    color: white;
    margin: 0 0 10px;
    line-height: 1.1;
   }

  .srv-desc {
    font-family: 'DM Sans', sans-serif;
    font-size:28px;
    line-height: 1.7;
    color: rgba(255,255,255,0.5);
    margin: 0 0 16px;
    font-weight: 300;
    flex-grow: 1;
   }

  .srv-arrow {
    color: #FF4545;
    opacity: 0;
    transform: translate(-6px, 6px);
    transition: opacity 0.3s ease, transform 0.3s ease;
    display: flex; align-items: center; gap: 6px;
    font-family: 'Montserrat', sans-serif;
    font-size: 1.2rem;
    letter-spacing: 0.1em;
    align-self: flex-end;
   }

   .srv-eyebrow {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 18px;
  }
  .srv-eyebrow-line {
    height: 2px;
    background: #FF4545;
    transition: width 0.8s ease 0.2s;
  }
  .srv-eyebrow-text {
    font-family: 'Montserrat', sans-serif;
    font-size: 1.3rem;
    letter-spacing: 0.25em;
    color: #FF4545;
    font-weight: 600;
  }
  }


  /* ════════════════════════════════════
     REDUCE MOTION
     ════════════════════════════════════ */
  @media (prefers-reduced-motion: reduce) {
    .srv-orb-tr { animation: none !important; }
    .srv-ring   { animation: none !important; }
  }
`;

function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

const SERVICES = [
  {
    num: "01", title: "Ghostwriting & Writing Support",
    desc: "If you have an idea but need help turning it into a complete manuscript, our ghostwriting team is here to assist. We collaborate with you to develop your concept into a structured, publish-ready book while preserving your voice and vision.",
    icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>),
    featured: false,
  },
  {
    num: "02", title: "Editing & Proofreading",
    desc: "We refine your manuscript for clarity, flow, grammar, and structure while maintaining your original tone. Our editorial process ensures your book is polished, consistent, and ready for professional publishing standards.",
    icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>),
    featured: false,
  },
  {
    num: "03", title: "Book Cover Design",
    desc: `A powerful cover creates the first impression of your book. We design visually compelling, genre-specific covers that attract readers, communicate your story, and position your book as a professional publication in competitive markets."`,
    icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M8 12l2 2 4-4" /></svg>),
    featured: false,
  },
  {
    num: "04", title: "Book Publishing",
    desc: "We manage the complete publishing process from start to finish, ensuring your book is professionally released in both digital and print formats. Our team takes care of listing, formatting, and distribution so your book is accessible to readers worldwide without confusion or delays",
    icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 11 12 14 22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></svg>),
    featured: false,
  },
  {
    num: "05", title: "Book Marketing & Promotion",
    desc: "We create strategic marketing campaigns to increase your book’s visibility and reach the right audience. From PR content and articles to social media promotion, we help position your book for stronger engagement and discoverability.",
    icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>),
    featured: false,
  },
  {
    num: "06", title: "Audiobook Production",
    desc: "We transform your book into a professionally produced audiobook and create promotional trailers to enhance visibility. This allows you to reach a wider audience, including readers who prefer audio formats.",
    icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6" /><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" /></svg>),
    featured: false,
  },
];

const Services: React.FC = () => {
  const { ref, visible } = useInView(0.08);

  return (
    <>
      <style>{servicesStyles}</style>

      <section ref={ref} id="services" className="srv-section">

        {/* Decorative BG */}
        <div className="srv-orb-tr" />
        <div className="srv-orb-bl" />
        <div className="srv-grid-bg" />
        <div className="srv-ring" />

        <div className="srv-container">

          {/* ── HEADER ── */}
          <div className="srv-header">
            <div
              className="srv-eyebrow"
              style={{
                opacity: visible ? 1 : 0,
                animation: visible ? "fadeUp 0.6s ease forwards" : "none",
              }}
            >
              <div
                className="srv-eyebrow-line"
                style={{ width: visible ? "48px" : "0" }}
              />
              <span className="srv-eyebrow-text">OUR OFFERINGS</span>
            </div>

            <div className="srv-header-inner">
              <h2
                className="srv-heading"
                style={{
                  opacity: visible ? 1 : 0,
                  animation: visible ? "fadeUp 0.65s ease 0.1s forwards" : "none",
                }}
              >
                {visible && (
                  <>
                    <SplitText
                      text="Complete"
                      delay={35} duration={1.1} ease="power3.out"
                      splitType="chars"
                      from={{ opacity: 0, y: 45 }} to={{ opacity: 1, y: 0 }}
                      threshold={0.1} rootMargin="-50px" textAlign="left"
                    />
                    <br />
                    <SplitText
                      text="Publishing Roadmap"
                      className="text-[#FF4545]"
                      delay={40} duration={1.2} ease="power3.out"
                      splitType="chars"
                      from={{ opacity: 0, y: 45 }} to={{ opacity: 1, y: 0 }}
                      threshold={0.1} rootMargin="-50px" textAlign="left"
                    />
                    {" "}
                    <SplitText
                      text="Under One Roof"
                      delay={40} duration={1.2} ease="power3.out"
                      splitType="chars"
                      from={{ opacity: 0, y: 45 }} to={{ opacity: 1, y: 0 }}
                      threshold={0.1} rootMargin="-50px" textAlign="left"
                    />
                  </>
                )}
              </h2>

              <p
                className="srv-subtext"
                style={{
                  opacity: visible ? 1 : 0,
                  animation: visible ? "fadeUp 0.7s ease 0.3s forwards" : "none",
                }}
              >
                Books become successful when they are shaped, refined, and positioned correctly. Bristol helps authors move beyond the writing stage with structured publishing solutions designed to refine, design, and distribute books globally. Your manuscript is prepared with us to meet professional standards and reach readers without limitations.
              </p>
            </div>
          </div>

          {/* ── CARDS GRID ── */}
          <div className="srv-cards-grid">
            {SERVICES.map((s, i) => (
              <div
                key={i}
                className={`srv-card${s.featured ? " featured-card" : ""}`}
                style={{
                  opacity: visible ? 1 : 0,
                  animation: visible
                    ? `cardReveal 0.65s cubic-bezier(0.22,1,0.36,1) ${0.15 + i * 0.08}s forwards`
                    : "none",
                }}
              >
                <div className="srv-card-inner" style={s.featured ? {
                  background: "linear-gradient(135deg, #FF4545 0%, #c42020 100%)",
                  border: "1px solid transparent",
                } : {}}>

                  <div className="srv-card-top">
                    <span className="srv-num">{s.num}</span>
                    <div
                      className="srv-icon-wrap"
                      style={s.featured ? {
                        background: "rgba(255,255,255,0.15)",
                        boxShadow: "none",
                      } : {}}
                    >
                      <span className="srv-icon" style={s.featured ? { color: "white" } : {}}>
                        {s.icon}
                      </span>
                    </div>
                  </div>

                  <div
                    className="srv-line"
                    style={s.featured ? { background: "rgba(255,255,255,0.25)" } : {}}
                  />

                  <h3 className="srv-title">{s.title}</h3>
                  <p className="srv-desc">{s.desc}</p>

                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <span
                      className="srv-arrow"
                      style={s.featured ? { color: "white" } : {}}
                    >
                      LEARN MORE
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>

                </div>
              </div>
            ))}
          </div>

          {/* ── BOTTOM CTA BANNER ── */}
          <div
            className="srv-cta-banner"
            style={{
              opacity: visible ? 1 : 0,
              animation: visible ? "fadeUp 0.7s ease 0.75s forwards" : "none",
            }}
          >
            <p className="srv-cta-heading">Not sure where to begin? Let’s guide your next step.</p>
            <button
                type="button"
                className="hero-cta-primary"
                onClick={() => openQuoteModal()}
              >
               BEGIN YOUR FREE CONSULTATION
              </button>
          </div>

        </div>
      </section>
    </>
  );
};

export default Services;