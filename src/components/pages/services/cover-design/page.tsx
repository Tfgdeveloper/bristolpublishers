import React, { useEffect, useRef, useState } from "react";
import SplitText from "@/components/SplitText";
import {
    Feather, PenTool, Palette, BookOpen, Megaphone, Headphones,
    ShieldCheck, RefreshCw, UserCheck, BadgeDollarSign,
    Phone, Mail, ArrowUpRight,
} from "lucide-react";
import { openQuoteModal } from "@/components/Quotemodal";

const abStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Montserrat:wght@400;500;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

  @keyframes ab-fadeUp    { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
  @keyframes ab-fadeRight { from{opacity:0;transform:translateX(40px)} to{opacity:1;transform:translateX(0)} }
  @keyframes ab-float     { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
  @keyframes ab-rotate    { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
  @keyframes ab-pulseDot  { 0%,100%{transform:scale(1);opacity:.6} 50%{transform:scale(1.4);opacity:1} }

  .ab-wrap { max-width:1240px; margin:0 auto; padding:0 48px; box-sizing:border-box; }

  .ab-eyebrow { display:flex; align-items:center; gap:12px; margin-bottom:20px; }
  .ab-eyebrow-line { height:2px; background:#FF4545; transition:width .8s ease .2s; }
  .ab-eyebrow span { font-family:'Montserrat',sans-serif; font-size:.78rem; letter-spacing:.28em; color:#FF4545; font-weight:600; }

  .ab-h2 { font-family:'Montserrat',sans-serif; font-weight:800; font-size:clamp(2rem,4vw,3.4rem); letter-spacing:-.025em; line-height:1.05; margin:0; }
  .ab-body { font-family:'DM Sans',sans-serif; font-size:1rem; line-height:1.85; font-weight:300; margin:0; }

  .ab-btn-primary { font-family:'Montserrat',sans-serif; font-weight:700; font-size:.92rem; letter-spacing:.08em; padding:14px 42px; border-radius:999px; background:linear-gradient(90deg,#fe5858 0%,#FF4545 100%); color:#fff; border:none; cursor:pointer; box-shadow:0 8px 28px rgba(255,69,69,.4); transition:transform .22s ease, box-shadow .22s ease; }
  .ab-btn-primary:hover { transform:translateY(-3px); box-shadow:0 10px 32px rgba(255,69,69,.55); }
  .ab-btn-outline { font-family:'Montserrat',sans-serif; font-weight:600; font-size:.92rem; letter-spacing:.06em; padding:13px 42px; border-radius:999px; background:transparent; color:rgba(255,255,255,.75); border:1px solid rgba(255,255,255,.25); cursor:pointer; transition:transform .22s ease, background .22s ease, color .22s ease, border-color .22s ease; }
  .ab-btn-outline:hover { background:#FF4545; border-color:#FF4545; color:#fff; transform:translateY(-3px); }
  .ab-btn-primary:focus-visible, .ab-btn-outline:focus-visible, .ab-service:focus-visible { outline:2px solid #FF4545; outline-offset:3px; }

  /* ── Hero ── */
  .ab-hero-grid { display:grid; grid-template-columns:1.1fr 1fr; gap:64px; align-items:center; }
  .ab-hero-stack { position:relative; height:480px; }
  .ab-hero-book { position:absolute; border-radius:10px; overflow:hidden; border:1px solid rgba(255,255,255,.1); box-shadow:0 24px 60px rgba(0,0,0,.6); }
  .ab-hero-book img { width:100%; height:100%; object-fit:cover; display:block; }

  /* ── Story ── */
  .ab-story-grid { display:grid; grid-template-columns:1fr 1fr; gap:80px; align-items:center; }
  .ab-quote { border-left:3px solid #FF4545; padding:6px 0 6px 22px; margin:28px 0 0; font-family:'Montserrat',sans-serif; font-weight:600; font-size:1.15rem; line-height:1.5; color:#0A0A0A; }

  /* ── Services ── */
  .ab-services-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:20px; }
  .ab-service { text-align:left; width:100%; border-radius:20px; padding:30px 26px; background:#fff; border:1px solid rgba(255,69,69,.1); box-shadow:0 4px 24px rgba(255,177,177,.12); cursor:pointer; transition:transform .3s ease, border-color .3s ease, box-shadow .3s ease; display:flex; flex-direction:column; gap:14px; }
  .ab-service:hover { transform:translateY(-6px); border-color:rgba(255,69,69,.45); box-shadow:0 24px 60px rgba(255,69,69,.1); }
  .ab-service-top { display:flex; justify-content:space-between; align-items:flex-start; }
  .ab-service-icon { width:52px; height:52px; border-radius:14px; background:rgba(255,69,69,.08); display:flex; align-items:center; justify-content:center; color:#FF4545; }
  .ab-service-arrow { color:rgba(10,10,10,.25); transition:color .25s ease, transform .25s ease; }
  .ab-service:hover .ab-service-arrow { color:#FF4545; transform:translate(3px,-3px); }

  /* ── Journey ── */
  .ab-journey { display:grid; grid-template-columns:repeat(4,1fr); gap:0; position:relative; }
  .ab-journey::before { content:''; position:absolute; top:27px; left:28px; right:28px; height:1px; background:rgba(255,255,255,.14); }
  .ab-step { position:relative; padding-right:28px; }
  .ab-step-num { width:56px; height:56px; border-radius:50%; background:#14384C; border:1px solid rgba(255,69,69,.45); display:flex; align-items:center; justify-content:center; font-family:'Bebas Neue',sans-serif; font-size:1.4rem; letter-spacing:.04em; color:#FF4545; position:relative; z-index:1; margin-bottom:24px; }

  /* ── Promises ── */
  .ab-promise-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:20px; }
  .ab-promise { border-radius:18px; padding:28px 22px; background:rgba(255,255,255,.7); border:1px solid rgba(0,0,0,.06); }

  /* ── CTA ── */
  .ab-cta { border-radius:28px; padding:2px; background:linear-gradient(135deg,rgba(255,69,69,.5),rgba(26,36,95,.8),rgba(255,69,69,.3)); }
  .ab-cta-inner { border-radius:26px; background:linear-gradient(125deg,#1B465F 0%,#16394D 40%,#102A3A 100%); padding:56px 60px; display:grid; grid-template-columns:1.3fr 1fr; gap:48px; align-items:center; position:relative; overflow:hidden; }
  .ab-contact-row { display:flex; align-items:center; gap:14px; padding:16px 20px; border-radius:14px; background:rgba(255,255,255,.03); border:1px solid rgba(255,255,255,.08); color:rgba(255,255,255,.8); text-decoration:none; font-family:'DM Sans',sans-serif; font-size:.95rem; transition:border-color .25s ease, transform .25s ease; }
  .ab-contact-row:hover { border-color:rgba(255,69,69,.45); transform:translateX(4px); }
  .ab-contact-icon { width:40px; height:40px; border-radius:11px; flex-shrink:0; background:rgba(255,69,69,.1); border:1px solid rgba(255,69,69,.2); display:flex; align-items:center; justify-content:center; color:#FF4545; }

  /* ════ Tablet ════ */
  @media (max-width: 1024px) {
    .ab-hero-grid, .ab-story-grid { grid-template-columns:1fr; gap:48px; }
    .ab-hero-stack { height:420px; max-width:460px; margin:0 auto; width:100%; }
    .ab-services-grid { grid-template-columns:repeat(2,1fr); }
    .ab-journey { grid-template-columns:repeat(2,1fr); row-gap:40px; }
    .ab-journey::before { display:none; }
    .ab-promise-grid { grid-template-columns:repeat(2,1fr); }
    .ab-cta-inner { grid-template-columns:1fr; padding:44px 36px; }
  }

  /* ════ Mobile ════ */
  @media (max-width: 640px) {
    .ab-wrap { padding:0 20px; }
    .ab-hero-stack { height:340px; }
    .ab-services-grid, .ab-journey, .ab-promise-grid { grid-template-columns:1fr; }
    .ab-cta-inner { padding:36px 22px; }
    .ab-btn-primary, .ab-btn-outline { width:100%; }
  }

  @media (prefers-reduced-motion: reduce) {
    .ab-hero-book, .ab-rotating { animation:none !important; }
    .ab-service:hover, .ab-btn-primary:hover, .ab-btn-outline:hover, .ab-contact-row:hover { transform:none; }
  }
`;

/* ════════════════════════════════════
   BOOK TITLES (same names as the Formatting page portfolio)
   ════════════════════════════════════ */
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

/* ── Title / ALT helpers ── */
const bookTitle = (src: string) => BOOK_TITLES[src] ?? "Book Cover";
const toAlt = (text: string) => text.replace(/\s+/g, "-");

/* ════════════════════════════════════
   DATA
   ════════════════════════════════════ */
const HERO_BOOKS = [
    { src: "/images/Portfolio/07.jpg", w: 210, h: 300, top: "60px", left: "18%", rot: -7, z: 2, delay: 0 },
    { src: "/images/Portfolio/22.jpg", w: 230, h: 330, top: "20px", left: "44%", rot: 4, z: 3, delay: .5 },
    { src: "/images/Portfolio/03.jpg", w: 190, h: 270, top: "190px", left: "4%", rot: -12, z: 1, delay: 1 },
    { src: "/images/Portfolio/16.jpg", w: 180, h: 260, top: "210px", left: "66%", rot: 10, z: 1, delay: 1.5 },
];

const STORY_BOOKS = [
    { src: "/images/Portfolio/01.jpg", rot: -6, x: 0, y: 30, z: 1 },
    { src: "/images/Portfolio/09.jpg", rot: 3, x: 90, y: 0, z: 2 },
    { src: "/images/Portfolio/13.jpg", rot: -2, x: 180, y: 40, z: 3 },
];

// Names match SERVICES_LIST in Quotemodal, so the right service is pre-selected
const SERVICES = [
    { icon: <Feather size={24} />, title: "Ghostwriting & Writing Support", desc: "Have the idea but not the time? We write with you or for you, in your voice, from outline to final draft." },
    { icon: <PenTool size={24} />, title: "Editing & Proofreading", desc: "Developmental, line and copy editing, then a careful proofread so nothing slips through to print." },
    { icon: <Palette size={24} />, title: "Book Cover Design", desc: "Covers matched to your genre and built to the exact specs of Amazon KDP, IngramSpark and other printers." },
    { icon: <BookOpen size={24} />, title: "Book Publishing", desc: "Formatting, ISBN, metadata and distribution, so your book is available in print and eBook worldwide." },
    { icon: <Megaphone size={24} />, title: "Book Marketing & Promotion", desc: "Launch plans, author branding and promotion that put your book in front of the readers it was written for." },
    { icon: <Headphones size={24} />, title: "Audiobook Production", desc: "Narration, editing and mastering to retailer standards, ready for Audible and other audio platforms." },
];

const JOURNEY = [
    { num: "01", title: "Talk to us", desc: "Tell us where your book is today and where you want it to go. We listen first, then recommend only what you need." },
    { num: "02", title: "Get a clear plan", desc: "You receive a written plan with scope, timeline and price before any work begins. No surprises later." },
    { num: "03", title: "Build the book", desc: "Writers, editors and designers work on your book while your project manager keeps you updated at every step." },
    { num: "04", title: "Publish and launch", desc: "Your book goes live on the platforms you choose, with a marketing plan to help it reach readers." },
];

const PROMISES = [
    { icon: <ShieldCheck size={22} />, title: "Your book stays yours", desc: "You keep 100% of your rights and royalties. We never reuse or resell your work." },
    { icon: <RefreshCw size={22} />, title: "Revisions until it's right", desc: "We keep refining drafts and designs until you are fully happy with the result." },
    { icon: <UserCheck size={22} />, title: "One person to call", desc: "A dedicated project manager answers your questions from first call to launch day." },
    { icon: <BadgeDollarSign size={22} />, title: "Clear pricing", desc: "You see the full price up front and approve it before we start." },
];

const openLiveChat = () => {
    const livechat = (window as any).LiveChatWidget;
    if (livechat) livechat.call("maximize");
};

/* ════════════════════════════════════
   HELPERS
   ════════════════════════════════════ */
function useAbInView(threshold = 0.12) {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const el = ref.current; if (!el) return;
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold });
        obs.observe(el); return () => obs.disconnect();
    }, [threshold]);
    return { ref, visible };
}

const Eyebrow: React.FC<{ text: string; visible: boolean }> = ({ text, visible }) => (
    <div className="ab-eyebrow">
        <div className="ab-eyebrow-line" style={{ width: visible ? "36px" : "0" }} />
        <span>{text}</span>
    </div>
);

const fallbackBg = (e: React.SyntheticEvent<HTMLImageElement>, i: number) => {
    e.currentTarget.style.display = "none";
    const p = e.currentTarget.parentElement as HTMLElement;
    p.style.background = `linear-gradient(135deg,hsl(${i * 45 + 200},30%,18%),hsl(${i * 45 + 210},40%,26%))`;
};

const lightBg = "linear-gradient(180deg,#FFFFFF 0%,#FFF9F9 30%,#FFE8E8 60%,#FFD6D6 85%,#FFFFFF 100%)";
const darkBg = "linear-gradient(180deg,#1B465F 0%,#14384C 50%,#0E2432 100%)";
const gridOverlay = { position: "absolute" as const, inset: 0, pointerEvents: "none" as const, backgroundImage: "linear-gradient(rgba(255,255,255,.012) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.012) 1px,transparent 1px)", backgroundSize: "60px 60px" };

/* ════════════════════════════════════
   HERO
   ════════════════════════════════════ */
const AbHero: React.FC = () => {
    const { ref, visible } = useAbInView(0.05);
    return (
        <section ref={ref} style={{
            background: "radial-gradient(ellipse at 0% 50%,#1B465F 0%,transparent 40%),radial-gradient(ellipse at 85% 10%,#205270 0%,transparent 38%),radial-gradient(ellipse at 50% 50%,#102838 0%,transparent 55%),#0A1A24",
            width: "100%", minHeight: "100vh", position: "relative", overflow: "hidden", display: "flex", alignItems: "center", padding: "150px 0 100px",
        }}>
            <div style={gridOverlay} />
            <div className="ab-wrap" style={{ position: "relative", zIndex: 2, width: "100%" }}>
                <div className="ab-hero-grid">
                    <div>
                        <div style={{ opacity: visible ? 1 : 0, animation: visible ? "ab-fadeUp .5s ease .1s both" : "none" }}>
                            <Eyebrow text="ABOUT BRISTOL PUBLISHERS" visible={visible} />
                        </div>
                        <h1 style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 800, fontSize: "clamp(2.2rem,4.2vw,3.8rem)", letterSpacing: "-.025em", lineHeight: 1.08, color: "#fff", margin: "0 0 26px", opacity: visible ? 1 : 0, animation: visible ? "ab-fadeUp .7s ease .2s both" : "none" }}>
                            We help authors finish, publish and <span style={{ color: "#FF4545" }}>sell their books.</span>
                        </h1>
                        <p className="ab-body" style={{ fontSize: "1.05rem", color: "rgba(255,255,255,.55)", maxWidth: "540px", marginBottom: "38px", opacity: visible ? 1 : 0, animation: visible ? "ab-fadeUp .7s ease .35s both" : "none" }}>
                            Bristol Publishers is a team of writers, editors, designers and marketers who take care of everything between your first draft and your first reader. You stay the author. We handle the rest.
                        </p>
                        <div style={{ display: "flex", gap: "14px", flexWrap: "wrap", opacity: visible ? 1 : 0, animation: visible ? "ab-fadeUp .7s ease .5s both" : "none" }}>
                            <button type="button" className="ab-btn-primary" onClick={() => openQuoteModal()}>Get a Free Quote</button>
                            <button type="button" className="ab-btn-outline" onClick={openLiveChat}>Live Chat</button>
                        </div>
                    </div>

                    <div className="ab-hero-stack" style={{ opacity: visible ? 1 : 0, animation: visible ? "ab-fadeRight .9s ease .3s both" : "none" }}>
                        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "380px", height: "380px", borderRadius: "50%", background: "radial-gradient(circle,rgba(255,69,69,.14) 0%,transparent 70%)" }} />
                        {HERO_BOOKS.map((b, i) => (
                            <div key={i} style={{ position: "absolute", top: b.top, left: b.left, zIndex: b.z, transform: `rotate(${b.rot}deg)` }}>
                                <div className="ab-hero-book" style={{ position: "relative", width: `${b.w}px`, height: `${b.h}px`, animation: `ab-float 5s ease-in-out ${b.delay}s infinite` }}>
                                    <img src={b.src} alt={toAlt(bookTitle(b.src))} title={bookTitle(b.src)} onError={e => fallbackBg(e, i)} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

/* ════════════════════════════════════
   STORY
   ════════════════════════════════════ */
const AbStory: React.FC = () => {
    const { ref, visible } = useAbInView(0.1);
    return (
        <section ref={ref} style={{ background: lightBg, width: "100%", overflow: "hidden", padding: "110px 0 100px", position: "relative" }}>
            <div className="ab-rotating" style={{ position: "absolute", top: "6%", right: "3%", width: "180px", height: "180px", border: "1px dashed rgba(255,69,69,.14)", borderRadius: "50%", animation: "ab-rotate 22s linear infinite", pointerEvents: "none" }} />
            <div className="ab-wrap">
                <div className="ab-story-grid">
                    <div style={{ position: "relative", height: "400px", maxWidth: "460px", width: "100%", margin: "0 auto", opacity: visible ? 1 : 0, transition: "opacity .8s ease" }}>
                        {STORY_BOOKS.map((b, i) => (
                            <div key={i} style={{ position: "absolute", left: `${b.x}px`, top: `${b.y}px`, zIndex: b.z, transform: visible ? `rotate(${b.rot}deg)` : `rotate(${b.rot - 10}deg) translateY(30px)`, transition: `transform .9s cubic-bezier(.22,1,.36,1) ${i * .12}s` }}>
                                <div style={{ width: "200px", height: "290px", borderRadius: "8px", overflow: "hidden", boxShadow: "12px 18px 45px rgba(0,0,0,.18)", border: "1px solid rgba(255,255,255,.5)" }}>
                                    <img src={b.src} alt={toAlt(bookTitle(b.src))} title={bookTitle(b.src)} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} onError={e => fallbackBg(e, i)} />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div style={{ opacity: visible ? 1 : 0, animation: visible ? "ab-fadeUp .8s ease .15s both" : "none" }}>
                        <Eyebrow text="OUR STORY" visible={visible} />
                        <h2 className="ab-h2" style={{ color: "#0A0A0A", marginBottom: "24px" }}>
                            {visible && (<>
                                <SplitText text="Every book deserves" className="text-[#0A0A0A]" delay={30} duration={1.0} ease="power3.out" splitType="chars" from={{ opacity: 0, y: 40 }} to={{ opacity: 1, y: 0 }} threshold={0.1} rootMargin="-40px" textAlign="left" />
                                <br />
                                <SplitText text="to be finished" className="text-[#FF4545]" delay={36} duration={1.1} ease="power3.out" splitType="chars" from={{ opacity: 0, y: 40 }} to={{ opacity: 1, y: 0 }} threshold={0.1} rootMargin="-40px" textAlign="left" />
                            </>)}
                        </h2>
                        <p className="ab-body" style={{ color: "#555", marginBottom: "18px" }}>
                            Most manuscripts never reach a reader. Not because the story isn't good, but because writing, editing, design, formatting and marketing are five different jobs, and doing all of them alone is overwhelming.
                        </p>
                        <p className="ab-body" style={{ color: "#555" }}>
                            We started Bristol Publishers to bring those jobs under one roof. First-time authors, busy professionals and experienced writers come to us at every stage: an idea, a half-finished draft, or a book that's ready but not selling. We meet you where you are and take it from there.
                        </p>
                        <p className="ab-quote">You bring the story. We bring the team that gets it onto shelves.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

/* ════════════════════════════════════
   SERVICES
   ════════════════════════════════════ */
const AbServices: React.FC = () => {
    const { ref, visible } = useAbInView(0.08);
    return (
        <section ref={ref} style={{ background: "#FFFFFF", width: "100%", overflow: "hidden", padding: "100px 0", position: "relative" }}>
            <div className="ab-wrap">
                <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "20px", alignItems: "flex-end", marginBottom: "56px" }}>
                    <div>
                        <Eyebrow text="WHAT WE DO" visible={visible} />
                        <h2 className="ab-h2" style={{ color: "#0A0A0A" }}>
                            Everything your book needs, <span style={{ color: "#FF4545" }}>in one place</span>
                        </h2>
                    </div>
                    <p className="ab-body" style={{ color: "#555", maxWidth: "340px" }}>
                        Pick one service or the whole package. Click any service to get a quote for it.
                    </p>
                </div>

                <div className="ab-services-grid">
                    {SERVICES.map((s, i) => (
                        <button key={s.title} type="button" className="ab-service" onClick={() => openQuoteModal(s.title)}
                            style={{ opacity: visible ? 1 : 0, animation: visible ? `ab-fadeUp .6s ease ${.08 + i * .07}s both` : "none" }}>
                            <div className="ab-service-top">
                                <div className="ab-service-icon">{s.icon}</div>
                                <ArrowUpRight size={20} className="ab-service-arrow" />
                            </div>
                            <h3 style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 700, fontSize: "1.08rem", color: "#0A0A0A", margin: 0, letterSpacing: "-.01em" }}>{s.title}</h3>
                            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: ".9rem", lineHeight: 1.7, color: "#555", margin: 0, fontWeight: 300 }}>{s.desc}</p>
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
};

/* ════════════════════════════════════
   JOURNEY
   ════════════════════════════════════ */
const AbJourney: React.FC = () => {
    const { ref, visible } = useAbInView(0.1);
    return (
        <section ref={ref} style={{ background: darkBg, width: "100%", overflow: "hidden", padding: "110px 0 100px", position: "relative" }}>
            <div style={gridOverlay} />
            <div className="ab-wrap" style={{ position: "relative" }}>
                <div style={{ marginBottom: "64px", maxWidth: "640px" }}>
                    <Eyebrow text="HOW WE WORK" visible={visible} />
                    <h2 className="ab-h2" style={{ color: "#fff", marginBottom: "18px" }}>
                        {visible && (<>
                            <SplitText text="From first call" delay={30} duration={1.0} ease="power3.out" splitType="chars" from={{ opacity: 0, y: 40 }} to={{ opacity: 1, y: 0 }} threshold={0.1} rootMargin="-40px" textAlign="left" />
                            <br />
                            <SplitText text="to launch day" className="text-[#FF4545]" delay={36} duration={1.1} ease="power3.out" splitType="chars" from={{ opacity: 0, y: 40 }} to={{ opacity: 1, y: 0 }} threshold={0.1} rootMargin="-40px" textAlign="left" />
                        </>)}
                    </h2>
                    <p className="ab-body" style={{ color: "rgba(255,255,255,.5)" }}>
                        Four steps, the same for every author, whether you need one service or all of them.
                    </p>
                </div>

                <ol className="ab-journey" style={{ listStyle: "none", margin: 0, padding: 0 }}>
                    {JOURNEY.map((s, i) => (
                        <li key={s.num} className="ab-step" style={{ opacity: visible ? 1 : 0, animation: visible ? `ab-fadeUp .6s ease ${.15 + i * .12}s both` : "none" }}>
                            <div className="ab-step-num">{s.num}</div>
                            <h3 style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 700, fontSize: "1.05rem", color: "#fff", margin: "0 0 10px" }}>{s.title}</h3>
                            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: ".9rem", lineHeight: 1.75, color: "rgba(255,255,255,.55)", margin: 0, fontWeight: 300 }}>{s.desc}</p>
                        </li>
                    ))}
                </ol>
            </div>
        </section>
    );
};

/* ════════════════════════════════════
   PROMISES
   ════════════════════════════════════ */
const AbPromises: React.FC = () => {
    const { ref, visible } = useAbInView(0.1);
    return (
        <section ref={ref} style={{ background: lightBg, width: "100%", overflow: "hidden", padding: "110px 0 100px", position: "relative" }}>
            <div className="ab-wrap">
                <div style={{ marginBottom: "52px" }}>
                    <Eyebrow text="OUR PROMISES" visible={visible} />
                    <h2 className="ab-h2" style={{ color: "#0A0A0A" }}>
                        What you can <span style={{ color: "#FF4545" }}>count on</span>
                    </h2>
                </div>
                <div className="ab-promise-grid">
                    {PROMISES.map((p, i) => (
                        <div key={p.title} className="ab-promise" style={{ opacity: visible ? 1 : 0, animation: visible ? `ab-fadeUp .6s ease ${.1 + i * .08}s both` : "none" }}>
                            <div style={{ width: "46px", height: "46px", borderRadius: "12px", background: "rgba(255,69,69,.1)", color: "#FF4545", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "18px" }}>{p.icon}</div>
                            <h3 style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 700, fontSize: "1rem", color: "#0A0A0A", margin: "0 0 8px" }}>{p.title}</h3>
                            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: ".88rem", lineHeight: 1.7, color: "#555", margin: 0, fontWeight: 300 }}>{p.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

/* ════════════════════════════════════
   CTA + CONTACT
   ════════════════════════════════════ */
const AbCTA: React.FC = () => {
    const { ref, visible } = useAbInView(0.1);
    return (
        <section style={{ background: "linear-gradient(180deg,#1B465F 0%,#14384C 100%)", width: "100%", padding: "90px 0", position: "relative", overflow: "hidden" }}>
            <div className="ab-wrap">
                <div ref={ref} className="ab-cta" style={{ opacity: visible ? 1 : 0, animation: visible ? "ab-fadeUp .7s ease both" : "none" }}>
                    <div className="ab-cta-inner">
                        <div style={{ position: "absolute", top: "-40%", left: "-5%", width: "350px", height: "350px", borderRadius: "50%", background: "radial-gradient(circle,rgba(255,69,69,.09) 0%,transparent 65%)", pointerEvents: "none" }} />
                        <div style={{ position: "relative", zIndex: 2 }}>
                            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", marginBottom: "20px" }}>
                                <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#FF4545", display: "inline-block", animation: "ab-pulseDot 2s ease-in-out infinite" }} />
                                <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: ".78rem", letterSpacing: ".2em", color: "rgba(255,255,255,.5)" }}>NOW ACCEPTING MANUSCRIPTS</span>
                            </div>
                            <h2 className="ab-h2" style={{ color: "#fff", fontSize: "clamp(1.9rem,3.6vw,2.8rem)", marginBottom: "16px" }}>
                                Ready to start your book?
                            </h2>
                            <p className="ab-body" style={{ color: "rgba(255,255,255,.55)", maxWidth: "440px", marginBottom: "30px" }}>
                                Tell us about your project and we'll send you a plan and a price. It's free and there's no obligation.
                            </p>
                            <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
                                <button type="button" className="ab-btn-primary" onClick={() => openQuoteModal()}>Get a Free Quote</button>
                                <button type="button" className="ab-btn-outline" onClick={openLiveChat}>Live Chat</button>
                            </div>
                        </div>

                        <div style={{ display: "flex", flexDirection: "column", gap: "14px", position: "relative", zIndex: 2 }}>
                            <a href="tel:+17373855397" className="ab-contact-row">
                                <span className="ab-contact-icon"><Phone size={18} /></span>
                                (737) 385-5397
                            </a>
                            <a href="mailto:info@bristolpublishers.com" className="ab-contact-row">
                                <span className="ab-contact-icon"><Mail size={18} /></span>
                                info@bristolpublishers.com
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const AboutPage: React.FC = () => (
    <>
        <style>{abStyles}</style>
        <AbHero />
        <AbStory />
        <AbServices />
        <AbJourney />
        <AbPromises />
        <AbCTA />
    </>
);

export default AboutPage;