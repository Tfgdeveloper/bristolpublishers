import React, { useEffect, useRef, useState } from "react";
import SplitText from "@/components/SplitText";
import { useNavigate } from "react-router-dom";
import { openQuoteModal } from "@/components/Quotemodal";
import ContactForm from "@/components/contactSection";

const pageStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Montserrat:wght@400;500;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

  @keyframes ap-fadeUp   { from{opacity:0;transform:translateY(32px)} to{opacity:1;transform:translateY(0)} }
  @keyframes ap-fadeLeft { from{opacity:0;transform:translateX(-40px)} to{opacity:1;transform:translateX(0)} }
  @keyframes ap-fadeRight{ from{opacity:0;transform:translateX(40px)}  to{opacity:1;transform:translateX(0)} }
  @keyframes ap-rotate   { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
  @keyframes ap-float    { 0%,100%{transform:translateY(0)}  50%{transform:translateY(-14px)} }
  @keyframes ap-pulse    { 0%,100%{opacity:.4;transform:scale(1)} 50%{opacity:.75;transform:scale(1.08)} }
  @keyframes ap-marqueeLeft  { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
  @keyframes ap-marqueeRight { 0%{transform:translateX(-50%)} 100%{transform:translateX(0)} }

  .ap-marquee-left  { display:flex; width:max-content; animation:ap-marqueeLeft  50s linear infinite; }
  .ap-marquee-right { display:flex; width:max-content; animation:ap-marqueeRight 55s linear infinite; }

  .ap-check { opacity:0; transform:translateX(-10px); transition:opacity .4s ease, transform .4s ease; }
  .ap-check.vis { opacity:1; transform:translateX(0); }

  .ap-btn-primary { transition:transform .22s ease, box-shadow .22s ease; }
  .ap-btn-primary:hover { transform:translateY(-3px); box-shadow:0 10px 32px rgba(255,69,69,.45); }
  .ap-btn-outline { transition:transform .22s ease, background .22s ease, color .22s ease; }
  .ap-btn-outline:hover { background:#FF4545 !important; color:#fff !important; transform:translateY(-3px); }
  
  .ap-cta-primary { transition:transform .2s ease, box-shadow .2s ease; }
  .ap-cta-primary:hover { transform:translateY(-3px); box-shadow:0 10px 32px rgba(255,69,69,.45); }
  .ap-cta-outline2 { transition:transform .2s ease, background .2s ease, color .2s ease; }
  .ap-cta-outline2:hover { background:#FF4545 !important; color:#fff !important; transform:translateY(-3px); }

  /* Scattered Books Floating Keyframes */
  @keyframes ap-bookFloat0 { 0%{transform:rotate(-10deg) translateY(0)} 100%{transform:rotate(-8deg) translateY(-18px)} }
  @keyframes ap-bookFloat1 { 0%{transform:rotate(5deg) translateY(0)} 100%{transform:rotate(7deg) translateY(-14px)} }
  @keyframes ap-bookFloat2 { 0%{transform:rotate(9deg) translateY(0)} 100%{transform:rotate(11deg) translateY(-20px)} }
  @keyframes ap-bookFloat3 { 0%{transform:rotate(-6deg) translateY(0)} 100%{transform:rotate(-4deg) translateY(-16px)} }
`;

const ctaStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(28px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  @keyframes floatMockup {
    0%, 100% { transform: translateY(0px);    }
    50%       { transform: translateY(-14px); }
  }

  @keyframes shimmerBorder {
    0%   { background-position: 0% 50%;   }
    50%  { background-position: 100% 50%; }
    100% { background-position: 0% 50%;   }
  }

  @keyframes pulseDot {
    0%, 100% { transform: scale(1);   opacity: 0.6; }
    50%       { transform: scale(1.4); opacity: 1;   }
  }

  .cta-btn-primary {
    font-family: 'Montserrat', sans-serif;
    letter-spacing: 0.12em;
    font-size: 1rem;
    padding: 14px 38px;
    border-radius: 999px;
    background: white;
    color: #FF4545;
    border: none;
    cursor: pointer;
    transition: transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease;
    box-shadow: 0 6px 28px rgba(255,255,255,0.15);
    white-space: nowrap;
  }

  .cta-btn-primary:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 40px rgba(255,255,255,0.25);
    background: #fff0f0;
  }

  .cta-btn-secondary {
    font-family: 'Montserrat', sans-serif;
    letter-spacing: 0.08em;
    font-size: 1rem;
    padding: 12px 38px;
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
`;

const BOOK_TITLES: Record<string, string> = {
    "/images/Portfolio/01.jpg": "Reflections",
    "/images/Portfolio/02.jpg": "The Man From ST. Claus",
    "/images/Portfolio/03.jpg": "Margo",
    "/images/Portfolio/04.jpg": "Casters",
    "/images/Portfolio/05.jpg": "Human Resources Professional",
    "/images/Portfolio/06.jpg": "Lady Justice Aya",
    "/images/Portfolio/07.jpg": "Yes to Beyond",
    "/images/Portfolio/08.jpg": "My Poetry Inspired By Goat",
    "/images/Portfolio/09.jpg": "Mr. TerriTaff",
    "/images/Portfolio/10.jpg": "From Broken To Redeemed",
    "/images/Portfolio/11.jpg": "Both Sides of the fence",
    "/images/Portfolio/12.jpg": "Adjust Your Crown",
    "/images/Portfolio/13.jpg": "Choose Me",
    "/images/Portfolio/14.jpg": "My Testimony",
    "/images/Portfolio/15.jpg": "The Mirror Within",
    "/images/Portfolio/16.jpg": "Want Me",
    "/images/Portfolio/17.jpg": "Chasing Or Being Chased",
    "/images/Portfolio/18.jpg": "Mucho Que Contar",
    "/images/Portfolio/19.jpg": "Awesome",
    "/images/Portfolio/20.jpg": "Green Pastures",
    "/images/Portfolio/21.jpg": "The Manifestos",
    "/images/Portfolio/22.jpg": "The Cocoon",
    "/images/Portfolio/23.jpg": "GreenLand",
    "/images/Portfolio/24.jpg": "The Atrocity",
    "/images/Portfolio/25.jpg": "Agony",
    "/images/Portfolio/26.jpg": "Renaissance Man",
    "/images/Portfolio/27.jpg": "The Untold Truth",
    "/images/Portfolio/28.jpg": "Black Holes",
};

const bookTitle = (src: string) => BOOK_TITLES[src] ?? "Book Cover";
const toAlt = (text: string) => text.replace(/\s+/g, "-");

const PORTFOLIO_ROW1 = [
    { src: "/images/Portfolio/01.jpg" }, { src: "/images/Portfolio/02.jpg" }, { src: "/images/Portfolio/03.jpg" },
    { src: "/images/Portfolio/04.jpg" }, { src: "/images/Portfolio/05.jpg" }, { src: "/images/Portfolio/06.jpg" },
    { src: "/images/Portfolio/07.jpg" }, { src: "/images/Portfolio/08.jpg" }, { src: "/images/Portfolio/09.jpg" },
    { src: "/images/Portfolio/10.jpg" }, { src: "/images/Portfolio/11.jpg" }, { src: "/images/Portfolio/12.jpg" },
];
const PORTFOLIO_ROW2 = [
    { src: "/images/Portfolio/15.jpg" }, { src: "/images/Portfolio/16.jpg" }, { src: "/images/Portfolio/17.jpg" },
    { src: "/images/Portfolio/18.jpg" }, { src: "/images/Portfolio/19.jpg" }, { src: "/images/Portfolio/20.jpg" },
    { src: "/images/Portfolio/21.jpg" }, { src: "/images/Portfolio/22.jpg" }, { src: "/images/Portfolio/23.jpg" },
    { src: "/images/Portfolio/24.jpg" }, { src: "/images/Portfolio/25.jpg" }, { src: "/images/Portfolio/26.jpg" },
];

// ── Shared LiveChat helper ──
const openLiveChat = () => {
    const livechat = (window as any).LiveChatWidget;
    if (livechat) {
        livechat.call("maximize");
    }
};

function useApInView(threshold = 0.12) {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const el = ref.current; if (!el) return;
        const obs = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
            { threshold }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, [threshold]);
    return { ref, visible };
}

const CHECKS = [
    "Unfinished manuscript", "No professional to review your work", "Mentally stressed about publishing",
    "Tough to focus on writing", "Being too much of a perfectionist", "Stressful deadlines & schedules",
    "Not getting questions answered", "No creative direction or vision", "Low motivation to continue",
    "Not happy with your progress",
];

const SCATTERED_BOOKS = [
    { src: "/images/Portfolio/22.jpg", top: "110px", left: "5%", right: undefined as string | undefined, w: 170, h: 235, rot: -10, delay: 0.1 },
    { src: "/images/Portfolio/11.jpg", top: "380px", left: "3%", right: undefined as string | undefined, w: 185, h: 250, rot: 5, delay: 0.25 },
    { src: "/images/Portfolio/04.jpg", top: "130px", left: undefined as string | undefined, right: "5%", w: 170, h: 235, rot: 9, delay: 0.15 },
    { src: "/images/Portfolio/19.jpg", top: "400px", left: undefined as string | undefined, right: "3%", w: 155, h: 215, rot: -6, delay: 0.3 },
];

const FAQS = [
    { q: "How long does the publishing process take?", a: "The timeline depends on your manuscript and the services you select. Most projects move forward in a few weeks, while larger projects may take longer due to required editing and revisions." },
    { q: "Will I have control over my book decisions?", a: "Yes, you stay in control of your book at every stage. We provide guidance and recommendations, but all key decisions regarding content, design, and publishing remain yours." },
    { q: "Do you work with specific genres only?", a: "No, we work with a wide range of genres, including fiction, nonfiction, memoirs, and business books. Our team adapts based on the needs of each individual project." },
    { q: "Can I publish both an ebook and a paperback?", a: "Yes, we support publishing in both ebook and paperback formats. This helps you reach readers who prefer digital reading as well as those who enjoy physical books." },
    { q: "What happens after my book is published?", a: "After publishing, we can assist with visibility through targeted book promotion services. This includes content support, guidance on online presence, and audience targeting approaches." },
];

const FAQ_BOOKS = [
    { src: "/images/Portfolio/07.jpg", w: 180, h: 260, rot: -6, z: 1, x: "0px", y: "20px" },
    { src: "/images/Portfolio/03.jpg", w: 190, h: 270, rot: 4, z: 2, x: "60px", y: "0px" },
    { src: "/images/Portfolio/09.jpg", w: 185, h: 265, rot: -3, z: 3, x: "120px", y: "30px" },
];

const AboutHero: React.FC = () => {
    const { ref, visible } = useApInView(0.05);
    const navigate = useNavigate();
    return (
        <section ref={ref} style={{
            background: `radial-gradient(ellipse at 0% 50%,#1B465F 0%,transparent 38%), radial-gradient(ellipse at 80% 0%,#205270 0%,transparent 36%), radial-gradient(ellipse at 100% 65%,#1A4259 0%,transparent 40%), radial-gradient(ellipse at 50% 50%,#102838 0%,transparent 55%), #0A1A24`,
            width: "100%", minHeight: "100vh", paddingTop: "0px", position: "relative", display: "flex", flexDirection: "column", overflow: "hidden",
        }}>
            <div style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none", backgroundImage: `linear-gradient(rgba(255,255,255,.012) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.012) 1px,transparent 1px)`, backgroundSize: "60px 60px" }} />

            <div style={{ position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none", display: "grid", gridTemplateRows: "1fr 1fr 1fr", overflow: "hidden", gap: 0 }}>
                {[
                    { cls: "ap-marquee-left", rows: PORTFOLIO_ROW1 },
                    { cls: "ap-marquee-right", rows: PORTFOLIO_ROW2 },
                    { cls: "ap-marquee-left", rows: [...PORTFOLIO_ROW1].reverse() },
                ].map((row, ri) => (
                    <div key={ri} style={{ overflow: "hidden", display: "flex", alignItems: "center" }}>
                        <div className={row.cls} style={{ opacity: .38 }}>
                            {[...row.rows, ...row.rows].map((b, i) => (
                                <div key={i} style={{ flexShrink: 0, width: "160px", height: "90%", margin: "0 8px", borderRadius: "8px", overflow: "hidden" }}>
                                    <img src={b.src} alt={toAlt(bookTitle(b.src))} title={bookTitle(b.src)} style={{ width: "100%", height: "100%", objectFit: "cover", filter: "saturate(.6) brightness(.55)", pointerEvents: "none" }}
                                        onError={e => { e.currentTarget.style.display = "none"; (e.currentTarget.parentElement as HTMLElement).style.background = `hsl(${i * 25},18%,14%)` }} />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <div style={{ position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none", background: `linear-gradient(to bottom, rgba(10,26,36,.70) 0%, rgba(10,26,36,.45) 30%, rgba(10,26,36,.45) 70%, rgba(10,26,36,.80) 100%)` }} />

            {SCATTERED_BOOKS.map((b, i) => {
                const isLeft = b.left !== undefined;
                return (
                    <div key={i} style={{
                        position: "absolute", zIndex: 3, pointerEvents: "none", top: b.top,
                        ...(b.left !== undefined ? { left: b.left } : {}), ...(b.right !== undefined ? { right: b.right } : {}),
                        width: `${b.w}px`, opacity: visible ? 1 : 0, transition: `opacity 1s ease ${b.delay}s`,
                        filter: `drop-shadow(0 0 12px rgba(255,69,69,0.65)) drop-shadow(0 0 30px rgba(255,45,80,0.40)) drop-shadow(0 0 6px rgba(255,150,150,0.80))`,
                    }}>
                        <div style={{
                            transform: visible ? `rotate(${b.rot}deg) translateY(0) translateX(0)` : `rotate(${b.rot + (isLeft ? -25 : 25)}deg) translateY(40px) translateX(${isLeft ? -80 : 80}px)`,
                            transition: `transform 1s cubic-bezier(.22,1,.36,1) ${b.delay}s`,
                            animation: visible ? `ap-bookFloat${i} 4s ease-in-out ${1 + b.delay}s infinite alternate` : "none"
                        }}>
                            <img src={b.src} alt={toAlt(bookTitle(b.src))} title={bookTitle(b.src)} style={{
                                width: "100%", height: `${b.h}px`, objectFit: "cover", display: "block", borderRadius: "10px",
                                filter: "brightness(.85) saturate(1.1) contrast(1.05)", boxShadow: "0 24px 60px rgba(0,0,0,.7), inset 0 0 30px rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)"
                            }}
                                onError={e => {
                                    e.currentTarget.style.display = "none"; const p = e.currentTarget.parentElement as HTMLElement; const absW = p.parentElement as HTMLElement;
                                    absW.style.height = `${b.h}px`; absW.style.borderRadius = "10px"; absW.style.background = `linear-gradient(135deg, hsl(${i * 25 + 340},30%,15%), hsl(${i * 25 + 350},40%,22%))`; absW.style.border = "1px solid rgba(255,255,255,.1)";
                                }} />
                        </div>
                    </div>
                );
            })}

            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", zIndex: 2, pointerEvents: "none", width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(circle,rgba(80,130,255,.06) 0%,transparent 65%)" }} />

            <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", zIndex: 4, padding: "120px 360px 100px", paddingTop: "140px", textAlign: "center" }}>
                <div style={{ maxWidth: "820px", width: "100%" }}>
                    <div style={{ display: "inline-flex", alignItems: "center", gap: "12px", marginBottom: "24px", opacity: visible ? 1 : 0, animation: visible ? "ap-fadeUp .5s ease .1s forwards" : "none" }}>
                        <div style={{ width: visible ? "32px" : "0", height: "2px", background: "#FF4545", transition: "width .8s ease .3s" }} />
                        <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: ".75rem", letterSpacing: ".3em", color: "#FF4545", fontWeight: 600 }}>ABOUT US</span>
                        <div style={{ width: visible ? "32px" : "0", height: "2px", background: "#FF4545", transition: "width .8s ease .3s" }} />
                    </div>
                    <h1 style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 800, fontSize: "clamp(2rem,3.8vw,3.4rem)", letterSpacing: "-.025em", lineHeight: 1.1, color: "white", margin: "0 0 28px", opacity: visible ? 1 : 0, animation: visible ? "ap-fadeUp .7s ease .2s forwards" : "none" }}>
                        Bristol Publishers<br /><span style={{ color: "#FF4545" }}>Helping Authors</span><br />Get Real Results
                    </h1>
                    <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "1.05rem", lineHeight: 1.85, color: "rgba(255,255,255,.52)", fontWeight: 300, margin: "0 auto 38px", maxWidth: "560px", opacity: visible ? 1 : 0, animation: visible ? "ap-fadeUp .7s ease .38s forwards" : "none" }}>
                        Finishing a manuscript often leads to more questions than answers. Many authors feel unsure about editing, publishing steps, and how to reach readers. Bristol Publishers offers clear guidance and reliable support, so your book moves forward without delay, with complete <strong style={{ color: "rgba(255,255,255,.85)", fontWeight: 600 }}>book publishing services</strong> designed for real results.
                    </p>
                    <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap", opacity: visible ? 1 : 0, animation: visible ? "ap-fadeUp .7s ease .5s forwards" : "none" }}>
                        <button
                            className="ap-btn-primary"
                            onClick={() => openQuoteModal()}
                            style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 700, fontSize: ".92rem", letterSpacing: ".08em", padding: "14px 42px", borderRadius: "999px", background: "linear-gradient(90deg,#fe5858 0%,#FF4545 100%)", color: "#fff", border: "none", cursor: "pointer", boxShadow: "0 8px 28px rgba(255,69,69,.4)" }}
                        >
                            Get Started
                        </button>

                        <button
                            className="ap-btn-outline"
                            onClick={() => navigate("/portfolio")}
                            style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 600, fontSize: ".92rem", letterSpacing: ".06em", padding: "13px 42px", borderRadius: "999px", background: "transparent", color: "rgba(255,255,255,.7)", border: "1px solid rgba(255,255,255,.22)", cursor: "pointer" }}
                        >
                            Our Work
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

const AboutUsSection: React.FC = () => {
    const { ref: sectionRef, visible } = useApInView(0.08);

    return (
        <section ref={sectionRef} style={{ background: "linear-gradient(180deg,#FFFFFF 0%,#FFF9F9 30%,#FFE8E8 60%,#FFD6D6 85%,#FFFFFF 100%)", width: "100%", overflow: "hidden", padding: "110px 0 100px", position: "relative" }}>
            <div style={{ position: "absolute", top: "8%", left: "-6%", width: "420px", height: "420px", borderRadius: "50%", background: "radial-gradient(circle,rgba(255,69,69,.08) 0%,transparent 70%)", pointerEvents: "none" }} />
            <div style={{ position: "absolute", top: "6%", right: "3%", width: "190px", height: "190px", border: "1px dashed rgba(255,69,69,.15)", borderRadius: "50%", animation: "ap-rotate 22s linear infinite", pointerEvents: "none" }} />

            <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 48px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "28px", opacity: visible ? 1 : 0, animation: visible ? "ap-fadeUp .6s ease forwards" : "none" }}>
                    <div style={{ width: visible ? "36px" : "0", height: "2px", background: "#FF4545", transition: "width .8s ease .2s" }} />
                    <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: ".82rem", letterSpacing: ".28em", color: "#FF4545", fontWeight: 600 }}>ABOUT US</span>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 400px", gap: "80px", alignItems: "center" }}>
                    <div style={{ opacity: visible ? 1 : 0, animation: visible ? "ap-fadeLeft .85s ease .2s forwards" : "none" }}>
                        <h2 style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 800, fontSize: "clamp(2.2rem,4vw,3.6rem)", lineHeight: 1.1, letterSpacing: "-.025em", color: "#0A0A0A", marginBottom: "18px" }}>
                            {visible && (<><SplitText text="Not Able To Make" className="text-[#0A0A0A]" delay={30} duration={1.0} ease="power3.out" splitType="chars" from={{ opacity: 0, y: 45 }} to={{ opacity: 1, y: 0 }} threshold={0.1} rootMargin="-40px" textAlign="left" /><br /><SplitText text="Ideas Into Words?" className="text-[#FF4545]" delay={38} duration={1.1} ease="power3.out" splitType="chars" from={{ opacity: 0, y: 55 }} to={{ opacity: 1, y: 0 }} threshold={0.1} rootMargin="-40px" textAlign="left" /><br /><SplitText text="We Get It Done." className="text-[#0A0A0A]" delay={46} duration={1.1} ease="power3.out" splitType="chars" from={{ opacity: 0, y: 55 }} to={{ opacity: 1, y: 0 }} threshold={0.1} rootMargin="-40px" textAlign="left" /></>)}
                        </h2>
                        <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "1.05rem", lineHeight: 1.8, color: "#444", fontWeight: 300, marginBottom: "28px", maxWidth: "560px" }}>
                            Many writers face burnout at some point,  stressed about transforming ideas into words. There are many reasons why this happens. Bristol Publishers is here to solve every one of them.
                        </p>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 28px", marginBottom: "36px" }}>
                            {CHECKS.map((item, i) => (
                                <div key={i} className={`ap-check${visible ? " vis" : ""}`} style={{ transitionDelay: `${.4 + i * .06}s`, borderRadius: "8px", padding: "6px 8px" }}>
                                    <div style={{ display: "flex", alignItems: "flex-start", gap: "9px" }}>
                                        <div style={{ flexShrink: 0, width: "19px", height: "19px", borderRadius: "50%", background: "linear-gradient(135deg,#FF4545,#ff7070)", display: "flex", alignItems: "center", justifyContent: "center", marginTop: "2px" }}>
                                            <svg width="9" height="7" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                        </div>
                                        <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: ".9rem", lineHeight: 1.5, color: "#1a1a1a", fontWeight: 400 }}>{item}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div style={{ height: "1px", background: "linear-gradient(to right,rgba(255,69,69,.3),transparent)", marginBottom: "32px" }} />
                        <div style={{ display: "flex", gap: "14px", flexWrap: "wrap", alignItems: "center" }}>
                            <button
                                onClick={() => openQuoteModal()}
                                className="ap-cta-primary" style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 700, fontSize: ".9rem", letterSpacing: ".08em", padding: "13px 34px", borderRadius: "999px", background: "linear-gradient(90deg,#fe5858 0%,#FF4545 100%)", color: "#fff", border: "none", cursor: "pointer" }}>Get A Quote</button>
                            <button
                                onClick={openLiveChat}
                                className="ap-cta-outline2" style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 700, fontSize: ".9rem", letterSpacing: ".08em", padding: "12px 34px", borderRadius: "999px", background: "transparent", color: "#FF4545", border: "2px solid #FF4545", cursor: "pointer" }}>Live Chat</button>
                            <a href="tel:+17373855397" style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 600, fontSize: ".9rem", color: "#0A0A0A", textDecoration: "none", display: "flex", alignItems: "center", gap: "8px" }}>
                                <div style={{ width: "34px", height: "34px", borderRadius: "50%", background: "rgba(255,69,69,.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#FF4545" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.64A2 2 0 012 .82h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" /></svg>
                                </div>(737) 385-5397
                            </a>
                        </div>
                    </div>

                    <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center", minHeight: "500px", opacity: visible ? 1 : 0, animation: visible ? "ap-fadeRight .9s ease .35s forwards" : "none" }}>
                        <div style={{ position: "absolute", width: "300px", height: "300px", borderRadius: "50%", background: "radial-gradient(circle,rgba(255,69,69,.15) 0%,transparent 70%)", pointerEvents: "none" }} />
                        <div style={{ position: "absolute", top: "-20px", right: "-10px", display: "grid", gridTemplateColumns: "repeat(7,10px)", gap: "7px", opacity: .45, zIndex: 0 }}>
                            {Array.from({ length: 42 }).map((_, i) => (<div key={i} style={{ width: "3px", height: "3px", borderRadius: "50%", background: "#FF4545" }} />))}
                        </div>
                        <div style={{ position: "relative", zIndex: 2, borderRadius: "6px", overflow: "hidden", boxShadow: "0 40px 80px rgba(0,0,0,.18),0 0 0 1px rgba(255,69,69,.12)", transform: "rotate(3deg)", animation: "ap-float 5s ease-in-out infinite" }}>
                            <img src="/images/About1.webp" alt="Bristol-Publishers" title="Bristol Publishers" style={{ display: "block", width: "300px", height: "400px", objectFit: "cover", filter: "brightness(.93) saturate(1.05)" }} />
                            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg,transparent 40%,rgba(255,255,255,.06) 50%,transparent 60%)", pointerEvents: "none" }} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const AboutCTA: React.FC = () => {
    const { ref, visible } = useApInView(0.1);

    return (
        <>
            <style>{ctaStyles}</style>
            <section
                style={{
                    background: "linear-gradient(180deg, #1B465F 0%, #14384C 100%)",
                    width: "100%",
                    padding: "80px 40px 90px",
                    position: "relative",
                    overflow: "hidden",
                }}
            >
                <div style={{
                    position: "absolute", top: "50%", left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "700px", height: "300px",
                    borderRadius: "50%",
                    background: "radial-gradient(ellipse, rgba(255,69,69,0.07) 0%, transparent 70%)",
                    pointerEvents: "none",
                }} />

                <div
                    ref={ref}
                    style={{
                        maxWidth: "1100px",
                        margin: "0 auto",
                        borderRadius: "28px",
                        position: "relative",
                        overflow: "hidden",
                        padding: "2px",
                        background: "linear-gradient(135deg, rgba(255,69,69,0.5), rgba(26,36,95,0.8), rgba(255,69,69,0.3))",
                        backgroundSize: "300% 300%",
                        animation: "shimmerBorder 5s ease infinite",
                    }}
                >
                    <div style={{
                        borderRadius: "26px",
                        background: "linear-gradient(125deg, #1B465F 0%, #16394D 40%, #102A3A 100%)", display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "52px 60px 52px 64px",
                        overflow: "hidden",
                        position: "relative",
                        minHeight: "260px",
                    }}>

                        <div style={{
                            position: "absolute", top: "-40%", left: "-5%",
                            width: "350px", height: "350px", borderRadius: "50%",
                            background: "radial-gradient(circle, rgba(255,69,69,0.09) 0%, transparent 65%)",
                            pointerEvents: "none",
                        }} />
                        <div style={{
                            position: "absolute", bottom: "-30%", right: "25%",
                            width: "300px", height: "300px", borderRadius: "50%",
                            background: "radial-gradient(circle, rgba(26,36,95,0.6) 0%, transparent 70%)",
                            pointerEvents: "none",
                        }} />

                        <div style={{
                            position: "absolute", inset: 0,
                            backgroundImage: `
                                linear-gradient(rgba(255,255,255,0.012) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(255,255,255,0.012) 1px, transparent 1px)
                            `,
                            backgroundSize: "50px 50px",
                            pointerEvents: "none",
                        }} />

                        <div style={{ position: "relative", zIndex: 5, maxWidth: "540px", flex: "1" }}>

                            <div style={{
                                display: "inline-flex", alignItems: "center", gap: "8px",
                                marginBottom: "22px",
                                opacity: visible ? 1 : 0,
                                animation: visible ? "fadeUp 0.5s ease forwards" : "none",
                            }}>
                                <span style={{
                                    width: "7px", height: "7px", borderRadius: "50%",
                                    background: "#FF4545",
                                    display: "inline-block",
                                    animation: "pulseDot 2s ease-in-out infinite",
                                }} />
                                <span style={{
                                    fontFamily: "'Montserrat', sans-serif",
                                    fontSize: "0.78rem",
                                    letterSpacing: "0.2em",
                                    color: "rgba(255,255,255,0.5)",
                                }}>NOW ACCEPTING MANUSCRIPTS</span>
                            </div>

                            <h2 style={{
                                fontFamily: "'Montserrat', sans-serif",
                                fontWeight: 800,
                                fontSize: "clamp(2rem, 4.5vw, 3rem)",
                                letterSpacing: "-0.01em",
                                lineHeight: 1.03,
                                color: "white",
                                margin: "0 0 18px",
                            }}>
                                {visible && (
                                    <>
                                        <SplitText
                                            text="Your Book Is Not"
                                            delay={30}
                                            duration={1.0}
                                            ease="power3.out"
                                            splitType="chars"
                                            from={{ opacity: 0, y: 35 }}
                                            to={{ opacity: 1, y: 0 }}
                                            threshold={0.1}
                                            rootMargin="-30px"
                                            textAlign="left"
                                        />
                                        <br />
                                        <SplitText
                                            text="Meant To Stay"
                                            delay={35}
                                            duration={1.05}
                                            ease="power3.out"
                                            splitType="chars"
                                            from={{ opacity: 0, y: 35 }}
                                            to={{ opacity: 1, y: 0 }}
                                            threshold={0.1}
                                            rootMargin="-30px"
                                            textAlign="left"
                                        />
                                        <br />
                                        <SplitText
                                            text="Unpublished"
                                            className="text-[#FF4545]"
                                            delay={40}
                                            duration={1.1}
                                            ease="power3.out"
                                            splitType="chars"
                                            from={{ opacity: 0, y: 35 }}
                                            to={{ opacity: 1, y: 0 }}
                                            threshold={0.1}
                                            rootMargin="-30px"
                                            textAlign="left"
                                        />
                                    </>
                                )}
                            </h2>

                            <p style={{
                                fontFamily: "'DM Sans', sans-serif",
                                fontSize: "1.1rem",
                                lineHeight: 1.75,
                                color: "rgba(255,255,255,0.5)",
                                margin: "0 0 34px",
                                fontWeight: 300,
                                maxWidth: "420px",
                                opacity: visible ? 1 : 0,
                                animation: visible ? "fadeUp 0.7s ease 0.35s forwards" : "none",
                            }}>
                                Take the next step with confidence. Let us help you complete your book,
                                publish it, and reach the readers who are waiting for your story.
                            </p>

                            <div style={{
                                display: "flex", gap: "14px", alignItems: "center", flexWrap: "wrap",
                                opacity: visible ? 1 : 0,
                                animation: visible ? "fadeUp 0.7s ease 0.45s forwards" : "none",
                            }}>
                                <button
                                    onClick={() => openQuoteModal()}
                                    className="px-10 py-3.5 rounded-full text-white text-sm transition-all duration-200 hover:opacity-90"
                                    style={{
                                        fontFamily: "'Montserrat', sans-serif",
                                        letterSpacing: "0.25em",
                                        background: "linear-gradient(90deg, #fe5858e8 0%, #FF4545 100%)",
                                    }}
                                >
                                    Get Started
                                </button>
                                <button
                                    onClick={openLiveChat}
                                    className="cta-btn-secondary"
                                >Live Chat</button>
                            </div>
                        </div>

                        <div style={{
                            position: "absolute",
                            right: "40px",
                            bottom: "20px",
                            height: "400px",
                            zIndex: 4,
                            animation: "floatMockup 5s ease-in-out infinite",
                            filter: `
                                drop-shadow(-20px 10px 50px rgba(0,0,0,0.7))
                                drop-shadow(0 0 30px rgba(255,69,69,0.12))
                            `,
                            pointerEvents: "none",
                        }}>
                            <img
                                src="/images/Portfolio/MOCKUP.png"
                                alt="Book-and-tablet-mockup"
                                title="Book and tablet mockup"
                                style={{
                                    height: "400px",
                                    width: "auto",
                                    objectFit: "contain",
                                    objectPosition: "top right",
                                }}
                            />
                        </div>

                    </div>
                </div>
            </section>
        </>
    );
};

const AboutFAQ: React.FC = () => {
    const { ref, visible } = useApInView(0.08);
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section ref={ref} style={{
            background: "linear-gradient(180deg,#FFFFFF 0%,#FFF9F9 30%,#FFE8E8 60%,#FFD6D6 85%,#FFFFFF 100%)",
            width: "100%", overflow: "hidden", padding: "110px 0 100px", position: "relative"
        }}>
            <div style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none", backgroundImage: `linear-gradient(rgba(0,0,0,.02) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,.02) 1px,transparent 1px)`, backgroundSize: "60px 60px" }} />
            <div style={{ position: "absolute", top: "10%", left: "-6%", width: "450px", height: "450px", borderRadius: "50%", background: "radial-gradient(circle,rgba(255,69,69,.08) 0%,transparent 65%)", pointerEvents: "none" }} />

            <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 48px", position: "relative", zIndex: 1 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 400px", gap: "80px", alignItems: "center" }}>

                    <div style={{ opacity: visible ? 1 : 0, animation: visible ? "ap-fadeLeft .85s ease .2s forwards" : "none" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "22px" }}>
                            <div style={{ height: "2px", background: "#FF4545", width: visible ? "36px" : "0", transition: "width .8s ease .2s" }} />
                            <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: ".8rem", letterSpacing: ".28em", color: "#FF4545", fontWeight: 600 }}>FAQS</span>
                        </div>
                        <h2 style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 800, fontSize: "clamp(2rem,4vw,3.2rem)", letterSpacing: "-.025em", lineHeight: 1.1, color: "#0A0A0A", marginBottom: "42px" }}>
                            Answers You May Be<br /><span style={{ color: "#FF4545" }}>Looking For</span>
                        </h2>
                        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                            {FAQS.map((faq, i) => {
                                const isOpen = openIndex === i;
                                return (
                                    <div key={i} onClick={() => setOpenIndex(isOpen ? null : i)} style={{
                                        background: isOpen ? "rgba(255,255,255,.8)" : "rgba(255,255,255,.5)",
                                        border: `1px solid ${isOpen ? "rgba(255,69,69,.3)" : "rgba(0,0,0,.08)"}`,
                                        borderRadius: "14px", padding: "22px 24px", cursor: "pointer",
                                        transition: "background .3s ease, border-color .3s ease, box-shadow .3s ease",
                                        boxShadow: isOpen ? "0 8px 30px rgba(255,69,69,.08)" : "0 4px 15px rgba(0,0,0,.03)",
                                        backdropFilter: "blur(8px)"
                                    }}>
                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "20px" }}>
                                            <h3 style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 600, fontSize: "1.05rem", color: isOpen ? "#0A0A0A" : "#333", margin: 0, lineHeight: 1.4, transition: "color .3s ease" }}>{faq.q}</h3>
                                            <div style={{ width: "32px", height: "32px", borderRadius: "50%", flexShrink: 0, background: isOpen ? "rgba(255,69,69,.1)" : "rgba(0,0,0,.05)", display: "flex", alignItems: "center", justifyContent: "center", transition: "background .3s ease, transform .4s cubic-bezier(.22,1,.36,1)", transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}>
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={isOpen ? "#FF4545" : "rgba(0,0,0,.3)"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
                                            </div>
                                        </div>
                                        <div style={{ maxHeight: isOpen ? "300px" : "0px", opacity: isOpen ? 1 : 0, overflow: "hidden", transition: "max-height .45s cubic-bezier(.22,1,.36,1), opacity .35s ease, margin .35s ease", marginTop: isOpen ? "16px" : "0px" }}>
                                            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: ".95rem", lineHeight: 1.75, color: "#555", margin: 0, fontWeight: 300, paddingLeft: "2px" }}>{faq.a}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div style={{ position: "relative", minHeight: "480px", opacity: visible ? 1 : 0, animation: visible ? "ap-fadeRight .9s ease .35s forwards" : "none" }}>
                        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "350px", height: "350px", borderRadius: "50%", background: "radial-gradient(circle,rgba(255,69,69,.08) 0%,transparent 70%)", pointerEvents: "none" }} />
                        <div style={{ position: "relative", width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                            {FAQ_BOOKS.map((b, i) => (
                                <div key={i} style={{ position: "absolute", left: `calc(50% - 140px + ${parseInt(b.x)}px)`, top: b.y, zIndex: b.z, transform: `rotate(${b.rot}deg)`, transition: "transform .45s cubic-bezier(.22,1,.36,1), filter .3s ease", cursor: "pointer" }}
                                    onMouseEnter={e => { e.currentTarget.style.transform = `rotate(0deg) translateY(-15px) scale(1.06)`; e.currentTarget.style.filter = `drop-shadow(0 0 18px rgba(255,69,69,.3))`; e.currentTarget.style.zIndex = "10"; }}
                                    onMouseLeave={e => { e.currentTarget.style.transform = `rotate(${b.rot}deg) translateY(0) scale(1)`; e.currentTarget.style.filter = `drop-shadow(0 0 0 rgba(0,0,0,0))`; e.currentTarget.style.zIndex = b.z.toString(); }}
                                >
                                    <img src={b.src} alt={toAlt(bookTitle(b.src))} title={bookTitle(b.src)} style={{ width: `${b.w}px`, height: `${b.h}px`, objectFit: "cover", borderRadius: "8px", display: "block", filter: "brightness(.95) saturate(1.05)", boxShadow: "12px 18px 45px rgba(0,0,0,.15), inset 0 0 0 1px rgba(255,255,255,.5)", border: "1px solid rgba(255,255,255,.4)" }}
                                        onError={e => { e.currentTarget.style.display = "none"; const p = e.currentTarget.parentElement as HTMLElement; p.style.width = `${b.w}px`; p.style.height = `${b.h}px`; p.style.borderRadius = "8px"; p.style.background = `linear-gradient(135deg, hsl(${i * 45 + 340},20%,85%), hsl(${i * 45 + 350},25%,75%))`; }} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

/* Contact section: same component as the home page (light input fields,
   animated phone card, consent checkbox), imported from components/contactSection */
const AboutPage: React.FC = () => (
    <>
        <style>{pageStyles}</style>
        <AboutHero />
        <AboutUsSection />
        <AboutCTA />
        <AboutFAQ />
        <ContactForm />
    </>
);

export default AboutPage;