import React, { useEffect, useRef, useState } from "react";
import SplitText from "./SplitText";
import { Link } from 'react-scroll';


const openQuoteModal = (service?: string) => {
  window.dispatchEvent(new CustomEvent("bp:open-quote-modal", { detail: service ?? "" }));
};

const ctaStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(28px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes floatMockup {
    0%, 100% { transform: translateY(0px); }
    50%       { transform: translateY(-14px); }
  }
  @keyframes shimmerBorder {
    0%   { background-position: 0% 50%; }
    50%  { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  @keyframes pulseDot {
    0%, 100% { transform: scale(1);    opacity: 0.6; }
    50%       { transform: scale(1.4); opacity: 1; }
  }

  .cta-btn-primary {
    font-family: 'Montserrat', sans-serif;
    letter-spacing: 0.1em;
    font-weight: 500;
    border-radius: 999px;
    background: linear-gradient(90deg, #fe5858e8 0%, #FF4545 100%);
    color: #fff;
    border: none;
    cursor: pointer;
    transition: transform 0.25s ease, box-shadow 0.25s ease, opacity 0.25s ease;
    white-space: nowrap;
  }
  .cta-btn-primary:hover {
    transform: translateY(-3px);
    opacity: 0.88;
    box-shadow: 0 10px 32px rgba(255,69,69,0.45);
  }

  .cta-btn-secondary {
    font-family: 'Montserrat', sans-serif;
    letter-spacing: 0.08em;
    border-radius: 999px;
    background: transparent;
    color: rgba(255,255,255,0.75);
    border: 1px solid rgba(255,255,255,0.25);
    cursor: pointer;
    transition: transform 0.25s ease, border-color 0.25s ease, color 0.25s ease;
    white-space: nowrap;
  }
  .cta-btn-secondary:hover {
    transform: translateY(-3px);
    border-color: rgba(255,255,255,0.6);
    color: white;
  }

  /* ════════════════════════════════════
     BASE — Small Mobile (≤ 479px)
     ════════════════════════════════════ */

  .cta-section {
    background: linear-gradient(180deg, #1B465F 0%, #14384C 100%);
    width: 100%;
    padding: 48px 14px 56px;
    position: relative;
    overflow: hidden;
  }

  .cta-bg-orb {
    position: absolute; top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    width: 340px; height: 200px; border-radius: 50%;
    background: radial-gradient(ellipse, rgba(255,69,69,0.07) 0%, transparent 70%);
    pointer-events: none;
  }

  /* Shimmer border wrapper */
  .cta-border-wrap {
    max-width: 1100px;
    margin: 0 auto;
    border-radius: 20px;
    position: relative;
    overflow: hidden;
    padding: 2px;
    background: linear-gradient(135deg, rgba(255,69,69,0.5), rgba(26,36,95,0.8), rgba(255,69,69,0.3));
    background-size: 300% 300%;
    animation: shimmerBorder 5s ease infinite;
  }

  /* Inner card */
  .cta-card {
    border-radius: 18px;
    background: linear-gradient(125deg, #1B465F 0%, #16394D 40%, #102A3A 100%);
    padding: 36px 22px 32px;
    overflow: hidden;
    position: relative;
    min-height: auto;
  }

  /* Decorative elements inside card */
  .cta-card-orb-tl {
    position: absolute; top: -40%; left: -5%;
    width: 260px; height: 260px; border-radius: 50%;
    background: radial-gradient(circle, rgba(255,69,69,0.09) 0%, transparent 65%);
    pointer-events: none;
  }
  .cta-card-orb-br {
    position: absolute; bottom: -30%; right: 5%;
    width: 220px; height: 220px; border-radius: 50%;
    background: radial-gradient(circle, rgba(26,36,95,0.6) 0%, transparent 70%);
    pointer-events: none;
  }
  .cta-card-grid {
    position: absolute; inset: 0;
    background-image:
      linear-gradient(rgba(255,255,255,0.012) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.012) 1px, transparent 1px);
    background-size: 50px 50px;
    pointer-events: none;
  }

  /* Text content */
  .cta-content {
    position: relative;
    z-index: 5;
    max-width: 100%;
  }

  .cta-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 18px;
  }
  .cta-badge-dot {
    width: 7px; height: 7px; border-radius: 50%;
    background: #FF4545;
    display: inline-block;
    animation: pulseDot 2s ease-in-out infinite;
    flex-shrink: 0;
  }
  .cta-badge-text {
    font-family: 'Montserrat', sans-serif;
    font-size: 0.7rem;
    letter-spacing: 0.2em;
    color: rgba(255,255,255,0.5);
  }

  .cta-heading {
    font-family: 'Montserrat', sans-serif;
    font-weight: 800;
    font-size: clamp(1.75rem, 7vw, 3rem);
    letter-spacing: -0.01em;
    line-height: 1.05;
    color: white;
    margin: 0 0 14px;
  }

  .cta-para {
    font-family: 'DM Sans', sans-serif;
    font-size: clamp(0.85rem, 2.5vw, 1.1rem);
    line-height: 1.75;
    color: rgba(255,255,255,0.5);
    margin: 0 0 26px;
    font-weight: 300;
    max-width: 520px;
  }

  .cta-btns {
    display: flex;
    gap: 12px;
    align-items: center;
    flex-wrap: wrap;
  }

  .cta-btn-primary {
    font-size: 0.78rem;
    padding: 11px 26px;
  }
  .cta-btn-secondary {
    font-size: 0.78rem;
    padding: 10px 26px;
  }

  /* Mockup image — hidden on small mobile, shown from tablet up */
  .cta-mockup {
    display: none;
  }


  /* ════════════════════════════════════
     LARGE MOBILE  480px – 767px
     ════════════════════════════════════ */
  @media (min-width: 480px) {
    .cta-section       { padding: 56px 18px 64px; }
    .cta-border-wrap   { border-radius: 22px; }
    .cta-card          { padding: 40px 28px 36px; border-radius: 20px; }
    .cta-badge-text    { font-size: 0.72rem; }
    .cta-btn-primary,
    .cta-btn-secondary { font-size: 0.82rem; padding: 11px 28px; }
    .cta-btns          { gap: 12px; }
    .cta-bg-orb        { width: 460px; height: 240px; }
  }


  /* ════════════════════════════════════
     TABLET  768px – 1023px
     ════════════════════════════════════ */
  @media (min-width: 768px) {
    .cta-section       { padding: 64px 28px 72px; }
    .cta-border-wrap   { border-radius: 24px; }
    .cta-card          {
      padding: 44px 36px 40px;
      border-radius: 22px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 24px;
      min-height: 320px;           /* ← Increased from 220px */
    }
    .cta-content       { max-width: 500px; flex: 1; }
    .cta-badge-text    { font-size: 0.75rem; }
    .cta-para          { margin-bottom: 28px; }
    .cta-btn-primary,
    .cta-btn-secondary { font-size: 0.86rem; padding: 12px 30px; }
    .cta-btns          { gap: 13px; }

    /* Show mockup from tablet */
    .cta-mockup {
      display: block;
      position: relative;
      z-index: 4;
      flex-shrink: 0;
      animation: floatMockup 5s ease-in-out infinite;
      filter:
        drop-shadow(-16px 8px 40px rgba(0,0,0,0.65))
        drop-shadow(0 0 24px rgba(255,69,69,0.10));
      pointer-events: none;
      height: 300px;               /* ← Increased from 240px */
    }
    .cta-mockup img {
      height: 300px;               /* ← Increased from 240px */
      width: auto;
      object-fit: contain;
      object-position: top right;
      display: block;
    }

    .cta-bg-orb { width: 560px; height: 260px; }
  }


  /* ════════════════════════════════════
     LAPTOP  1024px – 1439px
     ════════════════════════════════════ */
  @media (min-width: 1024px) {
    .cta-section     { padding: 72px 36px 80px; }
    .cta-card        {
      padding: 48px 52px 48px 56px;
      min-height: 360px;           /* ← Increased from 240px */
      border-radius: 24px;
    }
    .cta-content     { max-width: 520px; }
    .cta-badge       { margin-bottom: 20px; }
    .cta-para        { font-size: 1rem; margin-bottom: 30px; }
    .cta-btn-primary,
    .cta-btn-secondary { font-size: 0.9rem; padding: 13px 34px; }
    .cta-btns        { gap: 14px; }

    .cta-mockup      {
      height: 420px;               /* ← Increased from 320px */
      position: absolute;
      right: 40px;
      bottom: 12px;
    }
    .cta-mockup img  { height: 420px; }  /* ← Increased from 320px */

    .cta-bg-orb { width: 620px; height: 280px; }
  }


  /* ════════════════════════════════════
     MONITOR  1440px – 1919px
     ════════════════════════════════════ */
  @media (min-width: 1440px) {
    .cta-section     { padding: 80px 40px 90px; }
    .cta-border-wrap { border-radius: 28px; max-width: 1200px; }
    .cta-card        {
      padding: 52px 60px 52px 64px;
      min-height: 400px;           /* ← Increased from 260px */
      border-radius: 26px;
    }
    .cta-content     { max-width: 540px; }
    .cta-badge       { margin-bottom: 22px; }
    .cta-badge-text  { font-size: 0.78rem; }
    .cta-para        { font-size: 1.1rem; margin-bottom: 34px; }
    .cta-btn-primary,
    .cta-btn-secondary { font-size: 1rem; padding: 14px 38px; }
    .cta-btns        { gap: 14px; }

    .cta-mockup      { height: 500px; right: 44px; bottom: 14px; }  /* ← Increased from 380px */
    .cta-mockup img  { height: 500px; }                               /* ← Increased from 380px */

    .cta-bg-orb { width: 700px; height: 300px; }
  }


  /* ════════════════════════════════════
     ULTRA-WIDE  ≥ 1920px
     ════════════════════════════════════ */
  @media (min-width: 1920px) {
    .cta-section     { padding: 96px 60px 108px; }
    .cta-border-wrap { max-width: 100%; border-radius: 32px; }
    .cta-card        {
      padding: 64px 72px 64px 80px;
      min-height: 500px;           /* ← Increased from 400px */
      border-radius: 30px;
    }
    .cta-content     { max-width: 1020px; }
    .cta-badge-text  { font-size: 1.1rem; }
    .cta-heading {
    font-family: 'Montserrat', sans-serif;
    font-weight: 800;
    max-width: 200%;
    font-size: 4rem;
    letter-spacing: -0.01em;
    line-height: 1.05;
    color: white;
    margin: 0 0 14px;
    }
    .cta-para        { font-size: 24px; margin-bottom: 38px; max-width: 100% }
    .cta-btn-primary,
    .cta-btn-secondary { padding: 14px 38px; font-size: 1.5rem; }
    .cta-btns        { gap: 16px; }

    .cta-mockup      { height: 580px; right: 60px; bottom: 16px; }  /* ← Increased from 440px */
    .cta-mockup img  { height: 580px; }                               /* ← Increased from 440px */

    .cta-bg-orb { width: 860px; height: 360px; }
  }

    @media (min-width: 2560px) {
    .cta-section     { padding: 96px 60px 108px; }
    .cta-border-wrap { max-width: 80%; border-radius: 32px; }
    .cta-card        {
      padding: 64px 72px 64px 80px;
      min-height: 560px;           /* ← Increased from 400px */
      border-radius: 30px;
    }
    .cta-content     { max-width: 1020px; }
    .cta-badge-text  { font-size: 1.3rem; }
    .cta-heading {
    font-family: 'Montserrat', sans-serif;
    font-weight: 800;
    max-width: 200%;
    font-size: 4rem;
    letter-spacing: -0.01em;
    line-height: 1.05;
    color: white;
    margin: 0 0 14px;
    }
    .cta-para        { font-size: 28px; margin-bottom: 38px; max-width: 100% }
    .cta-btn-primary,
    .cta-btn-secondary { padding: 14px 38px; font-size: 1.5rem; }
    .cta-btns        { gap: 16px; }

    .cta-mockup      { height: 640px; right: 60px; bottom: 16px; }  /* ← Increased from 440px */
    .cta-mockup img  { height: 640px; }                               /* ← Increased from 440px */

    .cta-bg-orb { width: 860px; height: 360px; }
  }


  /* ════════════════════════════════════
     REDUCE MOTION
     ════════════════════════════════════ */
  @media (prefers-reduced-motion: reduce) {
    .cta-mockup          { animation: none !important; }
    .cta-border-wrap     { animation: none !important; }
    .cta-badge-dot       { animation: none !important; }
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

const CTABanner: React.FC = () => {
  const { ref, visible } = useInView(0.12);

  return (
    <>
      <style>{ctaStyles}</style>

      <section id="cta" className="cta-section">

        <div className="cta-bg-orb" />

        <div ref={ref} className="cta-border-wrap">
          <div className="cta-card">

            {/* Decorative layers */}
            <div className="cta-card-orb-tl" />
            <div className="cta-card-orb-br" />
            <div className="cta-card-grid" />

            {/* ── TEXT CONTENT ── */}
            <div className="cta-content">

              <div
                className="cta-badge"
                style={{ opacity: visible ? 1 : 0, animation: visible ? "fadeUp 0.5s ease forwards" : "none" }}
              >
                <span className="cta-badge-dot" />
                <span className="cta-badge-text">JOIN OUR LIST OF PUBLISHED AUTHORS</span>
              </div>

              <h2
                className="cta-heading"
                style={{ opacity: visible ? 1 : 0, animation: visible ? "fadeUp 0.6s ease 0.1s forwards" : "none" }}
              >
                {visible && (
                  <>
                    <SplitText
                      text="The Invisible Process"
                      delay={30} duration={1.0} ease="power3.out"
                      splitType="chars"
                      from={{ opacity: 0, y: 35 }} to={{ opacity: 1, y: 0 }}
                      threshold={0.1} rootMargin="-30px" textAlign="left"
                    />
                    <br />
                    <SplitText
                      text="Behind"
                      delay={35} duration={1.05} ease="power3.out"
                      splitType="chars"
                      from={{ opacity: 0, y: 35 }} to={{ opacity: 1, y: 0 }}
                      threshold={0.1} rootMargin="-30px" textAlign="left"
                    />
                    {" "}
                    <SplitText
                      text="Every Published Story"
                      className="text-[#FF4545]"
                      delay={40} duration={1.1} ease="power3.out"
                      splitType="chars"
                      from={{ opacity: 0, y: 35 }} to={{ opacity: 1, y: 0 }}
                      threshold={0.1} rootMargin="-30px" textAlign="left"
                    />
                  </>
                )}
              </h2>

              <p
                className="cta-para"
                style={{ opacity: visible ? 1 : 0, animation: visible ? "fadeUp 0.7s ease 0.35s forwards" : "none" }}
              >
                A strong book is never accidental, it is built through layers of editing, design, and strategic publishing decisions. Our role is to manage that unseen process so your work reaches the world in its strongest form.
              </p>

              <div
                className="cta-btns"
                style={{ opacity: visible ? 1 : 0, animation: visible ? "fadeUp 0.7s ease 0.45s forwards" : "none" }}
              >
                {/* <button className="cta-btn-primary">SUBMIT MANUSCRIPT</button> */}
                
                <button
                type="button"
                className="hero-cta-primary"
                onClick={() => openQuoteModal()}
              >
                REQUEST CONSULTATION
              </button>
              </div>
            </div>

            {/* ── MOCKUP IMAGE — hidden on mobile, visible tablet+ ── */}
            <div className="cta-mockup">
              <img
                src="/images/Portfolio/MOCKUP.png"
                alt="Book and tablet mockup"
              />
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default CTABanner;