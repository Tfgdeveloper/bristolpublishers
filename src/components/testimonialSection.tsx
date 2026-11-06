import React, { useEffect, useRef, useState, useCallback } from "react";
import SplitText from "./SplitText";

const testimonialsStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(30px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes rotateSlow {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }
  @keyframes orbPulse {
    0%, 100% { opacity: 0.45; transform: scale(1); }
    50%       { opacity: 0.75; transform: scale(1.08); }
  }
  @keyframes progressBar {
    from { width: 0%; }
    to   { width: 100%; }
  }
  @keyframes avatarGlow {
    0%, 100% { box-shadow: 0 0 0 3px rgba(255,69,69,0.3),  0 0 20px rgba(255,69,69,0.15); }
    50%       { box-shadow: 0 0 0 3px rgba(255,69,69,0.65), 0 0 30px rgba(255,69,69,0.30); }
  }
  @keyframes quoteFloat {
    0%, 100% { transform: translateY(0px);   opacity: 0.12; }
    50%       { transform: translateY(-6px);  opacity: 0.18; }
  }

  .tcard {
    transition: transform 0.55s cubic-bezier(0.22,1,0.36,1),
                box-shadow  0.55s ease,
                border-color 0.55s ease,
                opacity 0.55s ease;
    transform-origin: center bottom;
  }
  .tcard:hover {
    transform: translateY(-22px) scale(1.08) !important;
    box-shadow: 0 40px 80px rgba(255,69,69,0.35), 0 0 0 1px rgba(255,69,69,0.6) !important;
    border-color: rgba(255,69,69,0.5) !important;
  }
  .nav-btn {
    transition: transform 0.25s ease, background 0.25s ease, box-shadow 0.25s ease;
  }
  .nav-btn:hover {
    transform: scale(1.08);
    background: rgba(255,69,69,0.18) !important;
    box-shadow: 0 0 24px rgba(255,69,69,0.2) !important;
  }
  .dot-btn { transition: all 0.3s ease; cursor: pointer; }

  /* ════════════════════════════════════
     BASE — Small Mobile (≤ 479px)
     ════════════════════════════════════ */

  .tm-section {
    background: linear-gradient(180deg, #FFFFFF 0%, #FFF9F9 25%, #FFE8E8 55%, #FFD6D6 80%, #FFFFFF 100%);
    width: 100%;
    overflow: hidden;
    padding: 60px 0 70px;
    position: relative;
  }

  .tm-orb-tl {
    position: absolute; top: 10%; left: -8%;
    width: 260px; height: 260px; border-radius: 50%;
    background: radial-gradient(circle, rgba(255,69,69,0.06) 0%, transparent 65%);
    animation: orbPulse 7s ease-in-out infinite;
    pointer-events: none;
  }
  .tm-orb-br {
    position: absolute; bottom: 5%; right: -6%;
    width: 220px; height: 220px; border-radius: 50%;
    background: radial-gradient(circle, rgba(255,69,69,0.07) 0%, transparent 70%);
    pointer-events: none;
    opacity: 0.15;
  }

  .tm-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 16px;
  }

  /* Header */
  .tm-header { margin-bottom: 36px; }

  .tm-eyebrow {
    display: flex; align-items: center; gap: 12px;
    margin-bottom: 16px;
  }
  .tm-eyebrow-line {
    height: 2px; background: #FF4545;
    transition: width 0.8s ease 0.2s;
  }
  .tm-eyebrow-text {
    font-family: 'Montserrat', sans-serif;
    font-size: 0.72rem; letter-spacing: 0.25em; color: #FF4545;
  }

  .tm-heading {
    font-family: 'Montserrat', sans-serif;
    font-weight: 800;
    font-size: clamp(2rem, 7vw, 4.5rem);
    letter-spacing: -0.02em;
    line-height: 0.92;
    color: #0A0A0A;
    margin: 0;
  }

  /* Slider viewport */
  .tm-slider-viewport {
    overflow: hidden;
    padding-top: 32px;
    margin-bottom: 28px;
  }

  .tm-track {
    display: flex;
    will-change: transform;
  }

  /* Card */
  .tm-card {
    flex-shrink: 0;
    border-radius: 18px;
    padding: 24px 20px 22px;
    overflow: hidden;
    backdrop-filter: blur(12px);
    position: relative;
  }

  .tm-card-quote {
    position: absolute; top: 10px; right: 16px;
    font-family: 'Montserrat', serif;
    font-size: 6rem; line-height: 1;
    color: #FF4545;
    animation: quoteFloat 4s ease-in-out infinite;
    user-select: none; pointer-events: none;
  }

  .tm-card-head {
    display: flex; align-items: center; gap: 12px;
    margin-bottom: 18px; position: relative; z-index: 2;
  }

  .tm-avatar {
    width: 48px; height: 48px; border-radius: 50%;
    overflow: hidden; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
    position: relative;
  }
  .tm-avatar img {
    width: 100%; height: 100%; object-fit: cover;
  }
  .tm-avatar-initials {
    position: absolute;
    font-family: 'Montserrat', sans-serif;
    font-size: 1rem; color: #fff;
    letter-spacing: 0.05em;
  }

  .tm-author-name {
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(0.88rem, 2vw, 1.1rem);
    letter-spacing: 0.04em; color: #FF4545;
    margin: 0 0 2px;
  }
  .tm-author-role {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.72rem; color: #0A0A0A;
    margin: 0; font-weight: 300;
  }

  .tm-tag {
    margin-left: auto;
    font-family: 'Montserrat', sans-serif;
    font-size: 0.65rem; letter-spacing: 0.1em;
    padding: 4px 10px; border-radius: 999px;
    background: rgba(255,69,69,0.12);
    border: 1px solid rgba(255,69,69,0.25);
    color: #FF4545;
    white-space: nowrap;
    flex-shrink: 0;
  }

  .tm-divider {
    height: 1px;
    background: linear-gradient(90deg, rgba(255,69,69,0.3), transparent);
    margin-bottom: 16px;
  }

  .tm-text {
    font-family: 'DM Sans', sans-serif;
    font-size: clamp(0.82rem, 1.8vw, 0.92rem);
    line-height: 1.75; color: #0A0A0A;
    margin: 0 0 18px; font-weight: 300;
    font-style: italic; position: relative; z-index: 2;
  }

  .tm-card-foot {
    display: flex; justify-content: space-between; align-items: center;
  }
  .tm-book-name {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.7rem; color: #555; font-style: italic;
  }

  /* Progress bar */
  .tm-progress-wrap {
    height: 2px;
    background: rgba(0,0,0,0.08);
    border-radius: 999px; overflow: hidden;
    margin-bottom: 22px;
  }
  .tm-progress-bar {
    height: 100%;
    background: linear-gradient(90deg, #FF4545, #fe5858);
    border-radius: 999px;
  }

  /* Controls */
  .tm-controls {
    display: flex; align-items: center; justify-content: center; gap: 16px;
  }
  .tm-nav-btn {
    width: 42px; height: 42px; border-radius: 50%;
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,69,69,0.7);
    cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    color: #FF4545;
  }
  .tm-dots {
    display: flex; gap: 8px; align-items: center;
  }


  /* ════════════════════════════════════
     LARGE MOBILE  480px – 767px
     ════════════════════════════════════ */
  @media (min-width: 480px) {
    .tm-section    { padding: 70px 0 80px; }
    .tm-container  { padding: 0 22px; }
    .tm-header     { margin-bottom: 40px; }
    .tm-card       { padding: 26px 22px 24px; border-radius: 20px; }
    .tm-card-quote { font-size: 7rem; }
    .tm-avatar     { width: 52px; height: 52px; }
    .tm-orb-tl     { width: 320px; height: 320px; }
    .tm-orb-br     { width: 280px; height: 280px; }
  }


  /* ════════════════════════════════════
     TABLET  768px – 1023px
     ════════════════════════════════════ */
  @media (min-width: 768px) {
    .tm-section    { padding: 80px 0 90px; }
    .tm-container  { padding: 0 28px; }
    .tm-header     { margin-bottom: 52px; }
    .tm-eyebrow-text { font-size: 0.78rem; }
    .tm-card       { padding: 28px 24px 24px; border-radius: 20px; }
    .tm-card-quote { font-size: 7.5rem; }
    .tm-avatar     { width: 54px; height: 54px; }
    .tm-slider-viewport { padding-top: 36px; margin-bottom: 32px; }
    .tm-nav-btn    { width: 46px; height: 46px; }
    .tm-orb-tl     { width: 380px; height: 380px; }
    .tm-orb-br     { width: 340px; height: 340px; }
  }


  /* ════════════════════════════════════
     LAPTOP  1024px – 1439px
     ════════════════════════════════════ */
  @media (min-width: 1024px) {
    .tm-section    { padding: 100px 0 110px; }
    .tm-container  { padding: 0 40px; }
    .tm-header     { margin-bottom: 60px; }
    .tm-card       { padding: 30px 26px 26px; border-radius: 22px; }
    .tm-card-quote { font-size: 8rem; }
    .tm-avatar     { width: 56px; height: 56px; }
    .tm-slider-viewport { padding-top: 40px; margin-bottom: 38px; }
    .tm-nav-btn    { width: 48px; height: 48px; }
    .tm-orb-tl     { width: 440px; height: 440px; }
    .tm-orb-br     { width: 380px; height: 380px; }
  }


  /* ════════════════════════════════════
     MONITOR  1440px – 1919px
     ════════════════════════════════════ */
  @media (min-width: 1440px) {
    .tm-section    { padding: 110px 0 120px; }
    .tm-container  { padding: 0 56px; max-width: 1380px; }
    .tm-header     { margin-bottom: 68px; }
    .tm-eyebrow-text { font-size: 0.85rem; }
    .tm-card       { padding: 32px 30px 28px; border-radius: 22px; }
    .tm-card-quote { font-size: 8.5rem; }
    .tm-avatar     { width: 58px; height: 58px; }
    .tm-slider-viewport { padding-top: 44px; margin-bottom: 44px; }
    .tm-orb-tl     { width: 500px; height: 500px; }
    .tm-orb-br     { width: 420px; height: 420px; }
  }


  /* ════════════════════════════════════
     ULTRA-WIDE  ≥ 1920px
     ════════════════════════════════════ */
  @media (min-width: 1920px) {
    .tm-section    { padding: 130px 0 140px; }
    .tm-container  { padding: 0 80px; max-width: 100%; }
    .tm-header     { margin-bottom: 80px; }
    .tm-card       { padding: 36px 34px 30px; border-radius: 24px; }
    .tm-card-quote { font-size: 10rem; top: 14px; right: 20px; }
    .tm-avatar     { width: 62px; height: 62px; }
    .tm-slider-viewport { padding-top: 48px; margin-bottom: 48px; }
    .tm-nav-btn    { width: 82px; height: 82px; }
    .tm-orb-tl     { width: 680px; height: 680px; }
    .tm-orb-br     { width: 600px; height: 600px; }

    .tm-eyebrow {
    display: flex; align-items: center; gap: 12px;
    margin-bottom: 16px;
    }
   .tm-eyebrow-line {
    height: 2px; background: #FF4545;
    transition: width 0.8s ease 0.2s;
    }
   .tm-eyebrow-text {
    font-family: 'Montserrat', sans-serif;
    font-size: 1.3rem; letter-spacing: 0.25em; color: #FF4545; font-weight: 600;
    }

   .tm-heading {
    font-family: 'Montserrat', sans-serif;
    font-weight: 800;
    font-size: 4rem;
    letter-spacing: -0.02em;
    line-height: 0.92;
    color: #0A0A0A;
    margin: 0;
    }

   .tm-text {
    font-family: 'DM Sans', sans-serif;
    font-size: 24px;
    line-height: 1.75; color: #0A0A0A;
    margin: 0 0 18px; font-weight: 300;
    font-style: italic; position: relative; z-index: 2;
    }

   .tm-author-name {
    font-family: 'Montserrat', sans-serif;
    font-size: 28px;
    letter-spacing: 0.04em; color: #FF4545;
    margin: 0 0 2px;
    font-weight: 600;
    }
   .tm-author-role {
    font-family: 'DM Sans', sans-serif;
    font-size: 20px; color: #0A0A0A;
    margin: 0; font-weight: 300;
    }

   .tm-tag {
    margin-left: auto;
    font-family: 'Montserrat', sans-serif;
    font-size: 16px; letter-spacing: 0.1em;
    padding: 4px 10px; border-radius: 999px;
    background: rgba(255,69,69,0.12);
    border: 1px solid rgba(255,69,69,0.25);
    color: #FF4545;
    white-space: nowrap;
    flex-shrink: 0;
    }

   .tm-book-name {
    font-family: 'DM Sans', sans-serif;
    font-size: 16px; color: #555; font-style: italic;
    }

  }

    @media (min-width: 2560px) {
    .tm-section    { padding: 130px 0 140px; }
    .tm-container  { padding: 0 80px; max-width: 80%; }
    .tm-header     { margin-bottom: 80px; }
    .tm-card       { padding: 36px 34px 30px; border-radius: 24px; }
    .tm-card-quote { font-size: 10rem; top: 14px; right: 20px; }
    .tm-avatar     { width: 62px; height: 62px; }
    .tm-slider-viewport { padding-top: 48px; margin-bottom: 48px; }
    .tm-nav-btn    { width: 82px; height: 82px; }
    .tm-orb-tl     { width: 680px; height: 680px; }
    .tm-orb-br     { width: 600px; height: 600px; }

    .tm-eyebrow {
    display: flex; align-items: center; gap: 12px;
    margin-bottom: 16px;
    }
   .tm-eyebrow-line {
    height: 2px; background: #FF4545;
    transition: width 0.8s ease 0.2s;
    }
   .tm-eyebrow-text {
    font-family: 'Montserrat', sans-serif;
    font-size: 1.1rem; letter-spacing: 0.25em; color: #FF4545; font-weight: 600;
    }

   .tm-heading {
    font-family: 'Montserrat', sans-serif;
    font-weight: 800;
    font-size: 5rem;
    letter-spacing: -0.02em;
    line-height: 0.92;
    color: #0A0A0A;
    margin: 0;
    }

   .tm-text {
    font-family: 'DM Sans', sans-serif;
    font-size: 28px;
    line-height: 1.75; color: #0A0A0A;
    margin: 0 0 18px; font-weight: 300;
    font-style: italic; position: relative; z-index: 2;
    }

   .tm-author-name {
    font-family: 'Montserrat', sans-serif;
    font-size: 30px;
    letter-spacing: 0.04em; color: #FF4545;
    margin: 0 0 2px;
    font-weight: 600;
    }
   .tm-author-role {
    font-family: 'DM Sans', sans-serif;
    font-size: 24px; color: #0A0A0A;
    margin: 0; font-weight: 300;
    }

   .tm-tag {
    margin-left: auto;
    font-family: 'Montserrat', sans-serif;
    font-size: 18px; letter-spacing: 0.1em;
    padding: 4px 10px; border-radius: 999px;
    background: rgba(255,69,69,0.12);
    border: 1px solid rgba(255,69,69,0.25);
    color: #FF4545;
    white-space: nowrap;
    flex-shrink: 0;
    }

   .tm-book-name {
    font-family: 'DM Sans', sans-serif;
    font-size: 18px; color: #555; font-style: italic;
    }

  }



  /* ════════════════════════════════════
     REDUCE MOTION
     ════════════════════════════════════ */
  @media (prefers-reduced-motion: reduce) {
    .tm-orb-tl { animation: none !important; }
  }
`;

function useInView(threshold = 0.1) {
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

const TESTIMONIALS = [
    { name: "Sarah Mitchell", role: "Fantasy Author", avatar: "/images/testimonials/sarah.jpg", initials: "SM", color: "#cf7a58", rating: 5, book: "The Ember Chronicles", tag: "Publishing", text: "Working with Bristol Publishers made the book publishing process seamless. I finally saw my book published without feeling lost. Their support was exceptional every step of the way." },
    { name: "Michael David", role: "Business Writer", avatar: "/images/testimonials/michael.jpg", initials: "MD", color: "#3b5fa0", rating: 5, book: "The Mindset Blueprint", tag: "Ghostwriting", text: "Their team guided me step by step — from editing and formatting to publishing and marketing. The support helped my book reach more readers than I ever imagined. Highly recommended!" },
    { name: "Amanda Lewis", role: "Memoir Author", avatar: "/images/testimonials/amanda.jpg", initials: "AL", color: "#6ea88a", rating: 5, book: "Between Two Worlds", tag: "Formatting", text: "I had no idea where to begin after writing my manuscript. Bristol Publishers helped me move forward with absolute clarity and the most professional support I've ever experienced." },
    { name: "James Harrington", role: "Sci-Fi Novelist", avatar: "/images/testimonials/james.jpg", initials: "JH", color: "#7b5ea8", rating: 5, book: "Void Architect", tag: "Cover Design", text: "The cover design team completely understood my vision. The result was stunning — exactly what I'd imagined but couldn't articulate. Sales speak for themselves: bestseller in week one." },
    { name: "Priya Nair", role: "Self-Help Author", avatar: "/images/testimonials/priya.jpg", initials: "PN", color: "#a87b3e", rating: 5, book: "Rewrite Your Story", tag: "Marketing", text: "From my very first call, I felt heard and supported. The marketing campaign they built for my book was strategic, targeted, and delivered real results. I couldn't be happier." },
    { name: "Thomas Brennan", role: "Audio Book Creator", avatar: "/images/testimonials/thomas.jpg", initials: "TB", color: "#3e8aa8", rating: 5, book: "Deep Ocean Silence", tag: "Audio Book", text: "The audio production quality blew me away. Professional narration, perfect mastering, distributed everywhere. Bristol Publishers turned my words into a listening experience people love." },
];

const ITEMS = [...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS];
const AUTO_DELAY = 4500;

const StarRating: React.FC<{ count: number }> = ({ count }) => (
    <div style={{ display: "flex", gap: "3px" }}>
        {Array.from({ length: count }).map((_, i) => (
            <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#FF4545" stroke="none">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
        ))}
    </div>
);

const Testimonials: React.FC = () => {
    const { ref, visible } = useInView(0.08);
    const trackRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const [dims, setDims] = useState({ itemWidth: 0, stepSize: 0 });
    const [active, setActive] = useState(TESTIMONIALS.length);
    const [enableTransition, setEnableTransition] = useState(true);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    // ── Responsive dimension calculator ──
    const calculateDims = useCallback(() => {
        const cw = containerRef.current?.offsetWidth ?? 0;
        if (!cw) return;

        let visibleCards: number;
        let gap: number;

        if (cw < 480) {
            // 1 card, full width with small margin
            visibleCards = 1;
            gap = 14;
        } else if (cw < 768) {
            // 1.2 cards visible (peek)
            visibleCards = 1;
            gap = 14;
        } else if (cw < 1024) {
            // 2 cards
            visibleCards = 2;
            gap = 16;
        } else {
            // 3 cards
            visibleCards = 3;
            gap = 20;
        }

        const totalGaps = (visibleCards - 1) * gap;
        const itemW = (cw - totalGaps) / visibleCards;
        setDims({ itemWidth: itemW, stepSize: itemW + gap });
    }, []);

    useEffect(() => {
        calculateDims();
        const ro = new ResizeObserver(calculateDims);
        if (containerRef.current) ro.observe(containerRef.current);
        return () => ro.disconnect();
    }, [calculateDims]);

    const next = useCallback(() => {
        setEnableTransition(true);
        setActive(p => p + 1);
    }, []);

    const prev = useCallback(() => {
        setEnableTransition(true);
        setActive(p => p - 1);
    }, []);

    const goTo = useCallback((i: number) => {
        setEnableTransition(true);
        setActive(TESTIMONIALS.length + i);
    }, []);

    useEffect(() => {
        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(next, AUTO_DELAY);
        return () => { if (timerRef.current) clearTimeout(timerRef.current); };
    }, [active, next]);

    const handleTransitionEnd = (e: React.TransitionEvent<HTMLDivElement>) => {
        if (e.propertyName !== "transform") return;
        let jump: number | null = null;
        if (active >= TESTIMONIALS.length * 2) jump = active - TESTIMONIALS.length;
        else if (active < TESTIMONIALS.length) jump = active + TESTIMONIALS.length;
        if (jump !== null) { setEnableTransition(false); setActive(jump); }
    };

    const translateX = -(active - 1) * dims.stepSize;
    const dotActive = active % TESTIMONIALS.length;

    return (
        <>
            <style>{testimonialsStyles}</style>

            <section ref={ref} id="testimonials" className="tm-section">

                <div className="tm-orb-tl" />
                <div className="tm-orb-br" />

                <div className="tm-container">

                    {/* ── HEADER ── */}
                    <div className="tm-header">
                        <div
                            className="tm-eyebrow"
                            style={{ opacity: visible ? 1 : 0, animation: visible ? "fadeUp 0.6s ease forwards" : "none" }}
                        >
                            <div className="tm-eyebrow-line" style={{ width: visible ? "48px" : "0" }} />
                            <span className="tm-eyebrow-text">AUTHOR STORIES</span>
                        </div>

                        <h2
                            className="tm-heading"
                            style={{ opacity: visible ? 1 : 0, animation: visible ? "fadeUp 0.65s ease 0.1s forwards" : "none" }}
                        >
                            {visible && (
                                <>
                                    <SplitText
                                        text="That Speak for"
                                        className="text-[#0A0A0A]"
                                        delay={35} duration={1.1} ease="power3.out"
                                        splitType="chars"
                                        from={{ opacity: 0, y: 45 }} to={{ opacity: 1, y: 0 }}
                                        threshold={0.1} rootMargin="-50px" textAlign="left"
                                    />
                                    <br />
                                    <SplitText
                                        text="Themselves"
                                        className="text-[#FF4545]"
                                        delay={42} duration={1.2} ease="power3.out"
                                        splitType="chars"
                                        from={{ opacity: 0, y: 45 }} to={{ opacity: 1, y: 0 }}
                                        threshold={0.1} rootMargin="-50px" textAlign="left"
                                    />
                                </>
                            )}
                        </h2>
                    </div>

                    {/* ── SLIDER ── */}
                    <div ref={containerRef} className="tm-slider-viewport">
                        <div
                            ref={trackRef}
                            className="tm-track"
                            style={{
                                gap: `${dims.stepSize - dims.itemWidth}px`,
                                transform: `translateX(${translateX}px)`,
                                transition: enableTransition ? "transform 0.65s cubic-bezier(0.25,1,0.5,1)" : "none",
                            }}
                            onTransitionEnd={handleTransitionEnd}
                        >
                            {ITEMS.map((t, index) => {
                                const isCenter = index === active;
                                return (
                                    <div
                                        key={`t-${index}`}
                                        className="tcard tm-card"
                                        style={{
                                            flex: `0 0 ${dims.itemWidth}px`,
                                            border: `1px solid ${isCenter ? "rgba(255,69,69,0.4)" : "rgba(0,0,0,0.08)"}`,
                                            background: isCenter ? "rgba(255,255,255,0.97)" : "rgba(255,255,255,0.82)",
                                            boxShadow: isCenter
                                                ? "0 25px 60px rgba(255,69,69,0.25), 0 0 0 1px rgba(255,69,69,0.45)"
                                                : "0 8px 28px rgba(0,0,0,0.07)",
                                            transform: isCenter ? "translateY(-16px) scale(1.05)" : "translateY(0) scale(0.96)",
                                            opacity: isCenter ? 1 : 0.82,
                                        }}
                                    >
                                        <div className="tm-card-quote">"</div>

                                        <div className="tm-card-head">
                                            <div
                                                className="tm-avatar"
                                                style={{
                                                    background: t.color,
                                                    animation: isCenter ? "avatarGlow 3s ease-in-out infinite" : "none",
                                                }}
                                            >
                                                <img
                                                    src={t.avatar}
                                                    alt={t.name}
                                                    onError={e => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                                                />
                                                <span className="tm-avatar-initials">{t.initials}</span>
                                            </div>
                                            <div>
                                                <p className="tm-author-name">{t.name}</p>
                                                <p className="tm-author-role">{t.role}</p>
                                            </div>
                                            <span className="tm-tag">{t.tag}</span>
                                        </div>

                                        <div className="tm-divider" />
                                        <p className="tm-text">"{t.text}"</p>

                                        <div className="tm-card-foot">
                                            <StarRating count={t.rating} />
                                            <span className="tm-book-name">"{t.book}"</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Progress bar */}
                    <div className="tm-progress-wrap">
                        <div
                            key={`prog-${active}`}
                            className="tm-progress-bar"
                            style={{
                                opacity: 0.2,
                                animation: `progressBar ${AUTO_DELAY}ms linear forwards`,
                            }}
                        />
                    </div>

                    {/* Controls */}
                    <div className="tm-controls">
                        <button className="nav-btn tm-nav-btn" onClick={prev} aria-label="Previous">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M15 18l-6-6 6-6" />
                            </svg>
                        </button>

                        <div className="tm-dots">
                            {TESTIMONIALS.map((_, i) => (
                                <div
                                    key={i}
                                    className="dot-btn"
                                    onClick={() => goTo(i)}
                                    style={{
                                        width: dotActive === i ? "26px" : "8px",
                                        height: "8px",
                                        borderRadius: "999px",
                                        background: dotActive === i
                                            ? "linear-gradient(90deg,#FF4545,#fe5858)"
                                            : "rgba(231,29,29,0.22)",
                                    }}
                                />
                            ))}
                        </div>

                        <button className="nav-btn tm-nav-btn" onClick={next} aria-label="Next">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M9 18l6-6-6-6" />
                            </svg>
                        </button>
                    </div>

                </div>
            </section>
        </>
    );
};

export default Testimonials;