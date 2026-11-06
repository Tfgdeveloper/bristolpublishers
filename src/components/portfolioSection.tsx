import React, { useEffect, useRef, useState } from "react";
import SplitText from "./SplitText";

const portfolioStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(32px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes rotateSlow {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }
  @keyframes orbPulse {
    0%, 100% { transform: scale(1);     opacity: 0.4; }
    50%       { transform: scale(1.12); opacity: 0.7; }
  }

  .portfolio-img-card {
    flex-shrink: 0;
    position: relative;
    overflow: hidden;
    border-radius: 12px;
    cursor: grab;
    transition: transform 0.4s cubic-bezier(0.22,1,0.36,1), box-shadow 0.4s ease;
    user-select: none;
    -webkit-user-select: none;
  }
  .portfolio-img-card:hover {
    transform: scale(1.08) translateY(-16px);
    z-index: 10;
  }
  .portfolio-img-card img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: filter 0.4s ease;
    filter: brightness(0.82) saturate(0.9);
    pointer-events: none;
  }
  .portfolio-img-card .overlay {
    position: absolute;
    inset: 0;
    opacity: 0;
    transition: opacity 0.35s ease;
    display: flex;
    align-items: flex-end;
    padding: 14px;
  }
  .portfolio-img-card:hover .overlay { opacity: 1; }
  .portfolio-img-card .overlay-label {
    font-family: 'Montserrat', sans-serif;
    font-size: 0.85rem;
    letter-spacing: 0.08em;
    color: white;
    line-height: 1.1;
  }
  .portfolio-img-card .overlay-sub {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.68rem;
    color: #FF4545;
    margin-top: 2px;
  }

  .pf-edge-left {
    position: absolute;
    left: 0;
    top: -70px;
    bottom: -40px;
    width: 80px;
    z-index: 10;
    pointer-events: none;
  }
  .pf-edge-right {
    position: absolute;
    right: 0;
    top: -70px;
    bottom: -40px;
    width: 80px;
    z-index: 10;
    pointer-events: none;
  }

  /* ════════════════════════════════════
     BASE — Small Mobile (≤ 479px)
     ════════════════════════════════════ */

  .pf-section {
    background: linear-gradient(180deg, #FFFFFF 0%, #FFF9F9 25%, #FFE8E8 55%, #FFD6D6 80%, #FFFFFF 100%);
    width: 100%;
    overflow: hidden;
    padding: 60px 0 70px;
    position: relative;
  }

  .pf-orb-tl {
    position: absolute; top: 20%; left: -6%;
    width: 220px; height: 220px; border-radius: 50%;
    background: radial-gradient(circle, rgba(255,69,69,0.07) 0%, transparent 65%);
    animation: orbPulse 7s ease-in-out infinite;
    pointer-events: none;
  }
  .pf-orb-br {
    position: absolute; bottom: 15%; right: -5%;
    width: 200px; height: 200px; border-radius: 50%;
    background: radial-gradient(circle, rgba(255,69,69,0.07) 0%, transparent 70%);
    pointer-events: none;
  }
  .pf-grid-bg {
    position: absolute; inset: 0;
    background-image:
      linear-gradient(rgba(255,255,255,0.012) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.012) 1px, transparent 1px);
    background-size: 60px 60px;
    pointer-events: none;
  }

  .pf-container {
    max-width: 1200px;
    margin: 0 auto 0px;
    padding: 0 18px;
  }

  .pf-eyebrow {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 18px;
  }
  .pf-eyebrow-line {
    height: 2px;
    background: #FF4545;
    transition: width 0.8s ease 0.2s;
  }
  .pf-eyebrow-text {
    font-family: 'Montserrat', sans-serif;
    font-size: 0.75rem;
    letter-spacing: 0.25em;
    color: #FF4545;
  }

  .pf-header-inner {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .pf-heading {
    font-family: 'Montserrat', sans-serif;
    font-weight: 800;
    font-size: clamp(2rem, 8vw, 4.5rem);
    letter-spacing: -0.02em;
    line-height: 0.9;
    color: #0A0A0A;
    margin: 0;
  }

  .pf-subtext {
    font-family: 'DM Sans', sans-serif;
    font-size: clamp(0.85rem, 2.5vw, 1.05rem);
    line-height: 1.6;
    color: #444;
    max-width: 340px;
    margin: 0;
    font-weight: 300;
  }

  /* Marquee rows */
  .pf-rows {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .pf-row-wrap {
    position: relative;
    z-index: 1;
  }

  /* Card sizes via CSS vars — overridden per breakpoint */
  .pf-book-card {
    --card-w: 130px;
    --card-h: 195px;
    --card-mx: 6px;
  }

  /* ════════════════════════════════════
     LARGE MOBILE  480px – 767px
     ════════════════════════════════════ */
  @media (min-width: 480px) {
    
    .pf-container  { padding: 0 24px; margin-bottom: 40px; }
    .pf-book-card  { --card-w: 155px; --card-h: 230px; --card-mx: 7px; }
    .pf-orb-tl     { width: 280px; height: 280px; }
    .pf-orb-br     { width: 250px; height: 250px; }
    .pf-ring       { width: 120px; height: 120px; }
    .pf-rows       { gap: 13px; }
    .pf-edge-left,
    .pf-edge-right { width: 100px; top: -80px; bottom: -50px; }
  }

  /* ════════════════════════════════════
     TABLET  768px – 1023px
     ════════════════════════════════════ */
  @media (min-width: 768px) {
    
    .pf-container  { padding: 0 32px; margin-bottom: 48px; }

    .pf-header-inner {
      flex-direction: row;
      justify-content: space-between;
      align-items: flex-end;
      gap: 24px;
    }

    .pf-book-card  { --card-w: 185px; --card-h: 275px; --card-mx: 8px; }
    .pf-orb-tl     { width: 340px; height: 340px; }
    .pf-orb-br     { width: 300px; height: 300px; }
    .pf-ring       { width: 140px; height: 140px; }
    .pf-rows       { gap: 14px; }
    .pf-edge-left,
    .pf-edge-right { width: 100px; top: -90px; bottom: -55px; }
  }

  /* ════════════════════════════════════
     LAPTOP  1024px – 1439px
     ════════════════════════════════════ */
  @media (min-width: 1024px) {
    
    .pf-container  { padding: 0 40px; margin-bottom: 56px; }
    .pf-book-card  { --card-w: 220px; --card-h: 330px; --card-mx: 9px; }
    .pf-orb-tl     { width: 400px; height: 400px; }
    .pf-orb-br     { width: 360px; height: 360px; }
    .pf-ring       { width: 155px; height: 155px; }
    .pf-rows       { gap: 15px; }
    .pf-edge-left,
    .pf-edge-right { width: 120px; top: -100px; bottom: -60px; }
  }

  /* ════════════════════════════════════
     MONITOR  1440px – 1919px
     ════════════════════════════════════ */
  @media (min-width: 1440px) {
    
    .pf-container  { padding: 0 56px; margin-bottom: 64px; max-width: 1380px; }
    .pf-book-card  { --card-w: 250px; --card-h: 390px; --card-mx: 10px; }
    .pf-orb-tl     { width: 450px; height: 450px; }
    .pf-orb-br     { width: 380px; height: 380px; }
    .pf-ring       { width: 170px; height: 170px; }
    .pf-rows       { gap: 16px; }
    .pf-edge-left,
    .pf-edge-right { width: 130px; top: -110px; bottom: -65px; }
  }

  /* ════════════════════════════════════
     ULTRA-WIDE  ≥ 1920px
     ════════════════════════════════════ */
  @media (min-width: 1920px) {
    
    .pf-container  { padding: 0 80px; margin-bottom: 72px; max-width: 100%; }
    .pf-book-card  { --card-w: 350px; --card-h: 540px; --card-mx: 12px; }
    .pf-orb-tl     { width: 540px; height: 540px; }
    .pf-orb-br     { width: 460px; height: 460px; }
    .pf-ring       { width: 190px; height: 190px; }
    .pf-rows       { gap: 18px; }
    .pf-edge-left,
    .pf-edge-right { width: 150px; top: -130px; bottom: -80px; }

    .pf-heading {
      font-family: 'Montserrat', sans-serif;
      font-weight: 800;
      font-size: 4rem;
      padding: 0 0 80px 0;
      letter-spacing: -0.02em;
      line-height: 1;
      color: #0A0A0A;
      margin: 0;
    }

    .pf-subtext {
      font-family: 'DM Sans', sans-serif;
      font-size: 24px;
      line-height: 1.6;
      color: #444;
      max-width: 700px;
      margin: 0;
      font-weight: 300;
    }

    .pf-eyebrow {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 18px;
    }
    .pf-eyebrow-line {
      height: 4px;
      background: #FF4545;
      transition: width 0.8s ease 0.2s;
    }
    .pf-eyebrow-text {
      font-family: 'Montserrat', sans-serif;
      font-size: 1.1rem;
      letter-spacing: 0.25em;
      color: #FF4545;
      font-weight: 600;
    }
  }

  @media (min-width: 2560px) {
    
    .pf-container  { padding: 0 80px; margin-bottom: 72px; max-width: 80%; }
    .pf-book-card  { --card-w: 350px; --card-h: 540px; --card-mx: 12px; }
    .pf-orb-tl     { width: 540px; height: 540px; }
    .pf-orb-br     { width: 460px; height: 460px; }
    .pf-ring       { width: 190px; height: 190px; }
    .pf-rows       { gap: 18px; }
    .pf-edge-left,
    .pf-edge-right { width: 150px; top: -140px; bottom: -90px; }

    .pf-heading {
      font-family: 'Montserrat', sans-serif;
      font-weight: 800;
      font-size: 5rem;
      padding: 0 0 130px 0;
      letter-spacing: -0.02em;
      line-height: 1;
      color: #0A0A0A;
      margin: 0;
    }

    .pf-subtext {
      font-family: 'DM Sans', sans-serif;
      font-size: 28px;
      line-height: 1.6;
      color: #444;
      max-width: 700px;
      margin: 0;
      font-weight: 300;
    }

    .pf-eyebrow {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 18px;
    }
    .pf-eyebrow-line {
      height: 4px;
      background: #FF4545;
      transition: width 0.8s ease 0.2s;
    }
    .pf-eyebrow-text {
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
    .pf-orb-tl { animation: none !important; }
    .pf-ring   { animation: none !important; }
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

const ROW_TOP: { src: string; title: string; genre: string }[] = [
  { src: "/images/Portfolio/01.jpg", title: "Reflections", genre: "Fantasy" },
  { src: "/images/Portfolio/02.jpg", title: "The Man From ST. Claus", genre: "Thriller" },
  { src: "/images/Portfolio/03.jpg", title: "Margo", genre: "Adventure" },
  { src: "/images/Portfolio/04.jpg", title: "Casters", genre: "Horror" },
  { src: "/images/Portfolio/05.jpg", title: "Human Resources Professional", genre: "Sci-Fi" },
  { src: "/images/Portfolio/06.jpg", title: "Lady Justice Aya", genre: "Literary" },
  { src: "/images/Portfolio/07.jpg", title: "Yes to Beyond", genre: "Romance" },
  { src: "/images/Portfolio/08.jpg", title: "My Poetry Inspired By Goat", genre: "Mystery" },
  { src: "/images/Portfolio/09.jpg", title: "Mr. TerriTaff", genre: "Self-Help" },
  { src: "/images/Portfolio/10.jpg", title: "From Broken To Redeemed", genre: "History" },
  { src: "/images/Portfolio/11.jpg", title: "Both Sides of the fence", genre: "Children's" },
  { src: "/images/Portfolio/12.jpg", title: "Adjust Your Crown", genre: "Sci-Fi" },
  { src: "/images/Portfolio/13.jpg", title: "Choose Me", genre: "Poetry" },
  { src: "/images/Portfolio/14.jpg", title: "My Testimony", genre: "Fantasy" },
];

const ROW_BOTTOM: { src: string; title: string; genre: string }[] = [
  { src: "/images/Portfolio/15.jpg", title: "The Mirror Within", genre: "Adventure" },
  { src: "/images/Portfolio/16.jpg", title: "Want Me", genre: "Thriller" },
  { src: "/images/Portfolio/17.jpg", title: "Chasing Or Being Chased", genre: "Romance" },
  { src: "/images/Portfolio/18.jpg", title: "Mucho Que Contar", genre: "Sci-Fi" },
  { src: "/images/Portfolio/19.jpg", title: "Awesome", genre: "History" },
  { src: "/images/Portfolio/20.jpg", title: "Green Pastures", genre: "Crime" },
  { src: "/images/Portfolio/21.jpg", title: "The Manifestos", genre: "Literary" },
  { src: "/images/Portfolio/22.jpg", title: "The Cocoon", genre: "Fantasy" },
  { src: "/images/Portfolio/23.jpg", title: "GreenLand", genre: "Psychology" },
  { src: "/images/Portfolio/24.jpg", title: "The Atrocity", genre: "Mystery" },
  { src: "/images/Portfolio/25.jpg", title: "Agony", genre: "Memoir" },
  { src: "/images/Portfolio/26.jpg", title: "Renaissance Man", genre: "Sci-Fi" },
  { src: "/images/Portfolio/27.jpg", title: "The Untold Truth", genre: "Romance" },
  { src: "/images/Portfolio/28.jpg", title: "Black Holes", genre: "Fantasy" },
];

/* BookCard reads size from CSS custom properties via a ref */
const BookCard: React.FC<{ item: { src: string; title: string; genre: string } }> = ({ item }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 130, h: 195 });

  useEffect(() => {
    const update = () => {
      if (!cardRef.current) return;
      const style = getComputedStyle(cardRef.current);
      const w = parseFloat(style.getPropertyValue("--card-w")) || 130;
      const h = parseFloat(style.getPropertyValue("--card-h")) || 195;
      setSize({ w, h });
    };
    update();
    const ro = new ResizeObserver(update);
    if (cardRef.current) ro.observe(cardRef.current);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className="portfolio-img-card pf-book-card"
      style={{
        width: `var(--card-w, ${size.w}px)`,
        height: `var(--card-h, ${size.h}px)`,
        margin: `0 var(--card-mx, 6px)`,
      }}
    >
      <img
        src={item.src}
        alt={item.title}
        onError={e => {
          const t = e.currentTarget;
          t.style.display = "none";
          const p = t.parentElement!;
          p.style.background = `hsl(${Math.random() * 360}, 25%, 18%)`;
          const fb = document.createElement("div");
          fb.style.cssText = "width:100%;height:100%;display:flex;align-items:center;justify-content:center;padding:14px;";
          fb.innerHTML = `<span style="font-family:'Bebas Neue',sans-serif;font-size:0.9rem;color:rgba(255,255,255,0.35);text-align:center;letter-spacing:0.05em;">${item.title}</span>`;
          p.appendChild(fb);
        }}
      />
      <div className="overlay" style={{
        background: "linear-gradient(to top, rgba(0,0,0,0.72) 0%, transparent 60%)",
      }}>
        <div>
          <p className="overlay-label">{item.title}</p>
          <p className="overlay-sub">{item.genre}</p>
        </div>
      </div>
      <div className="card-accent" />
    </div>
  );
};

interface MarqueeRowProps {
  items: { src: string; title: string; genre: string }[];
  direction: "left" | "right";
  speed?: number;
}

const MarqueeRow: React.FC<MarqueeRowProps> = ({ items, direction, speed = 1.2 }) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const currentT = useRef(0);
  const startT = useRef(0);
  const setWidth = useRef(0);

  // State for responsive clipPath
  const [clipInset, setClipInset] = useState({ top: 70, bottom: 40 });

  // Update clipPath inset based on viewport width
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w >= 1920) setClipInset({ top: 130, bottom: 80 });
      else if (w >= 1440) setClipInset({ top: 110, bottom: 65 });
      else if (w >= 1024) setClipInset({ top: 100, bottom: 60 });
      else if (w >= 768) setClipInset({ top: 90, bottom: 55 });
      else if (w >= 480) setClipInset({ top: 80, bottom: 50 });
      else setClipInset({ top: 70, bottom: 40 });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    const updateW = () => {
      if (trackRef.current) setWidth.current = trackRef.current.scrollWidth / 2;
    };
    updateW();
    const ro = new ResizeObserver(updateW);
    if (trackRef.current) ro.observe(trackRef.current);
    return () => ro.disconnect();
  }, [items]);

  useEffect(() => {
    let id: number;
    const animate = () => {
      if (!isDragging.current && setWidth.current > 0) {
        if (direction === "left") {
          currentT.current -= speed;
          if (currentT.current <= -setWidth.current) currentT.current += setWidth.current;
        } else {
          currentT.current += speed;
          if (currentT.current >= 0) currentT.current -= setWidth.current;
        }
      }
      if (trackRef.current) trackRef.current.style.transform = `translateX(${currentT.current}px)`;
      id = requestAnimationFrame(animate);
    };
    id = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(id);
  }, [direction, speed]);

  const dragStart = (cx: number) => {
    isDragging.current = true;
    startX.current = cx;
    startT.current = currentT.current;
    if (trackRef.current) trackRef.current.style.cursor = "grabbing";
  };
  const dragMove = (cx: number) => {
    if (!isDragging.current) return;
    let t = startT.current + (cx - startX.current);
    if (setWidth.current > 0) {
      if (t <= -setWidth.current) { t += setWidth.current; startT.current += setWidth.current; }
      else if (t >= 0) { t -= setWidth.current; startT.current -= setWidth.current; }
    }
    currentT.current = t;
  };
  const dragEnd = () => {
    isDragging.current = false;
    if (trackRef.current) trackRef.current.style.cursor = "grab";
  };

  const onMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    dragStart(e.clientX);
    const mm = (ev: MouseEvent) => dragMove(ev.clientX);
    const mu = () => { dragEnd(); window.removeEventListener("mousemove", mm); window.removeEventListener("mouseup", mu); };
    window.addEventListener("mousemove", mm);
    window.addEventListener("mouseup", mu);
  };
  const onTouchStart = (e: React.TouchEvent) => {
    dragStart(e.touches[0].clientX);
    const tm = (ev: TouchEvent) => dragMove(ev.touches[0].clientX);
    const te = () => { dragEnd(); window.removeEventListener("touchmove", tm); window.removeEventListener("touchend", te); };
    window.addEventListener("touchmove", tm);
    window.addEventListener("touchend", te);
  };

  return (
    <div style={{
      clipPath: `inset(-${clipInset.top}px 0 -${clipInset.bottom}px 0)`,
      WebkitClipPath: `inset(-${clipInset.top}px 0 -${clipInset.bottom}px 0)`,
      position: "relative"
    }}>
      <div
        ref={trackRef}
        style={{ display: "flex", width: "max-content", cursor: "grab", touchAction: "pan-y" }}
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
      >
        {items.map((item, i) => <BookCard key={i} item={item} />)}
        {items.map((item, i) => <BookCard key={`d${i}`} item={item} />)}
      </div>
    </div>
  );
};

const Portfolio: React.FC = () => {
  const { ref, visible } = useInView(0.08);

  return (
    <>
      <style>{portfolioStyles}</style>

      <section ref={ref} id="portfolio" className="pf-section">

        {/* Decorative BG */}
        <div className="pf-orb-tl" />
        <div className="pf-orb-br" />
        <div className="pf-grid-bg" />
        

        {/* ── HEADER ── */}
        <div className="pf-container">
          <div
            className="pf-eyebrow"
            style={{ opacity: visible ? 1 : 0, animation: visible ? "fadeUp 0.6s ease forwards" : "none" }}
          >
            <div className="pf-eyebrow-line" style={{ width: visible ? "48px" : "0" }} />
            <span className="pf-eyebrow-text">Our Portfolio</span>
          </div>

          <div className="pf-header-inner">
            <h2
              className="pf-heading"
              style={{ opacity: visible ? 1 : 0, animation: visible ? "fadeUp 0.65s ease 0.1s forwards" : "none" }}
            >
              {visible && (
                <>
                  <SplitText
                    text="A Curated Selection of"
                    className="text-[#0A0A0A]"
                    delay={35} duration={1.1} ease="power3.out"
                    splitType="chars"
                    from={{ opacity: 0, y: 45 }} to={{ opacity: 1, y: 0 }}
                    threshold={0.1} rootMargin="-50px" textAlign="left"
                  />
                  {" "}
                  <SplitText
                    text="Our Published Titles"
                    className="text-[#FF4545]"
                    delay={42} duration={1.2} ease="power3.out"
                    splitType="chars"
                    from={{ opacity: 0, y: 45 }} to={{ opacity: 1, y: 0 }}
                    threshold={0.1} rootMargin="-50px" textAlign="left"
                  />
                </>
              )}
            </h2>

            <p
              className="pf-subtext"
              style={{ opacity: visible ? 1 : 0, animation: visible ? "fadeUp 0.7s ease 0.3s forwards" : "none" }}
            >
              Our work spans diverse genres, where we support authors in transforming manuscripts into professionally published books. Every title in our portfolio is crafted with precision, care, and respect for the author's original voice.
            </p>
          </div>
        </div>

        {/* ── MARQUEE ROWS ── */}
        <div className="pf-rows">
          <div className="pf-row-wrap">
            <div className="pf-edge-left" style={{
              background: "linear-gradient(to right, rgba(255,255,255,1) 0%, rgba(255,255,255,0.85) 30%, rgba(255,255,255,0.4) 65%, rgba(255,255,255,0) 100%)",
            }} />
            <div className="pf-edge-right" style={{
              background: "linear-gradient(to left, rgba(255,255,255,1) 0%, rgba(255,255,255,0.85) 30%, rgba(255,255,255,0.4) 65%, rgba(255,255,255,0) 100%)",
            }} />
            <MarqueeRow items={ROW_TOP} direction="left" speed={1.2} />
          </div>

          <div className="pf-row-wrap">
            <div className="pf-edge-left" style={{
              background: "linear-gradient(to right, rgba(255,255,255,1) 0%, rgba(255,255,255,0.85) 30%, rgba(255,255,255,0.4) 65%, rgba(255,255,255,0) 100%)",
            }} />
            <div className="pf-edge-right" style={{
              background: "linear-gradient(to left, rgba(255,255,255,1) 0%, rgba(255,255,255,0.85) 30%, rgba(255,255,255,0.4) 65%, rgba(255,255,255,0) 100%)",
            }} />
            <MarqueeRow items={ROW_BOTTOM} direction="right" speed={1.2} />
          </div>
        </div>

      </section>
    </>
  );
};

export default Portfolio;