import React, { useEffect, useRef, useState } from "react";
import SplitText from "@/components/SplitText";
import { useNavigate } from "react-router-dom";

// Same endpoint + service list as the Quote modal
const LEAD_URL =
    "https://leads.authorpublishers.us/api/lead/hqiSJReizNxoPkBqXxCcfLr3haDtYvBM";

const pageStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Montserrat:wght@400;500;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

  @keyframes cp-fadeUp   { from{opacity:0;transform:translateY(32px)} to{opacity:1;transform:translateY(0)} }
  @keyframes cp-fadeLeft { from{opacity:0;transform:translateX(-40px)} to{opacity:1;transform:translateX(0)} }
  @keyframes cp-fadeRight{ from{opacity:0;transform:translateX(40px)}  to{opacity:1;transform:translateX(0)} }
  @keyframes cp-rotate   { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
  @keyframes cp-pulse    { 0%,100%{opacity:.4;transform:scale(1)} 50%{opacity:.75;transform:scale(1.08)} }
  @keyframes cp-pulseDot { 0%,100%{transform:scale(1);opacity:.6} 50%{transform:scale(1.4);opacity:1} }
  @keyframes cp-marqueeLeft  { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
  @keyframes cp-marqueeRight { 0%{transform:translateX(-50%)} 100%{transform:translateX(0)} }
  @keyframes cp-float0 { 0%{transform:rotate(-10deg) translateY(0)} 100%{transform:rotate(-8deg) translateY(-18px)} }
  @keyframes cp-float1 { 0%{transform:rotate(5deg) translateY(0)} 100%{transform:rotate(7deg) translateY(-14px)} }
  @keyframes cp-float2 { 0%{transform:rotate(9deg) translateY(0)} 100%{transform:rotate(11deg) translateY(-20px)} }
  @keyframes cp-float3 { 0%{transform:rotate(-6deg) translateY(0)} 100%{transform:rotate(-4deg) translateY(-16px)} }
  @keyframes cp-rotateSlow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
  @keyframes cp-dropIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }

  .cp-ap-marquee-left  { display:flex; width:max-content; animation:cp-marqueeLeft  50s linear infinite; }
  .cp-ap-marquee-right { display:flex; width:max-content; animation:cp-marqueeRight 55s linear infinite; }

  .cp-info-card { transition:transform .3s ease, border-color .3s ease, box-shadow .3s ease; }
  .cp-info-card:hover { transform:translateX(6px); border-color:rgba(255,69,69,.4) !important; box-shadow:0 8px 30px rgba(255,69,69,.08) !important; }

  /* ════ FORM FIELDS — same look as the Quote modal ════ */
  .cpf-fields { display: flex; flex-direction: column; gap: 14px; }
  .cpf-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
  .cpf-field { position: relative; }

  .cpf-input {
    width: 100%;
    background: #F2F6F8;
    border: 1px solid #F2F6F8;
    border-radius: 12px;
    padding: 24px 16px 10px 48px;
    color: #0A1A24;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    font-weight: 500;
    outline: none;
    box-sizing: border-box;
    caret-color: #FF4545;
    transition: border-color 0.25s ease, background 0.25s ease, box-shadow 0.25s ease;
  }
  .cpf-input::placeholder { color: transparent; }
  .cpf-input:hover { background: #fff; }
  .cpf-input:focus {
    background: #fff;
    border-color: #FF4545;
    box-shadow: 0 0 0 3px rgba(255,69,69,0.25);
  }
  .cpf-input:-webkit-autofill,
  .cpf-input:-webkit-autofill:hover,
  .cpf-input:-webkit-autofill:focus {
    -webkit-box-shadow: 0 0 0 1000px #fff inset;
    -webkit-text-fill-color: #0A1A24;
  }
  textarea.cpf-input {
    resize: none;
    min-height: 120px;
    padding-top: 28px;
    line-height: 1.6;
  }

  .cpf-icon {
    position: absolute; left: 16px; top: 50%;
    transform: translateY(-50%);
    color: rgba(10,26,36,0.55);
    pointer-events: none;
    display: flex; align-items: center;
    transition: color 0.25s ease;
  }
  .cpf-icon-textarea { top: 20px; transform: none; }
  .cpf-input:focus + .cpf-icon { color: #FF4545; }

  .cpf-label {
    position: absolute; left: 48px; top: 50%;
    transform: translateY(-50%);
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    font-weight: 500;
    color: rgba(10,26,36,0.72);
    pointer-events: none;
    transition: all 0.22s cubic-bezier(0.22,1,0.36,1);
  }
  .cpf-label-textarea { top: 18px; transform: none; }
  .cpf-input:focus ~ .cpf-label,
  .cpf-input:not(:placeholder-shown) ~ .cpf-label,
  .cpf-label.lifted {
    top: 7px;
    transform: none;
    font-size: 10.5px;
    font-weight: 600;
    color: #E03636;
    letter-spacing: 0.04em;
  }

  /* Select */
  .cpf-select-trigger {
    width: 100%;
    min-height: 54px;
    background: #F2F6F8;
    border: 1px solid #F2F6F8;
    border-radius: 12px;
    padding: 24px 42px 10px 48px;
    color: #0A1A24;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    font-weight: 500;
    text-align: left;
    cursor: pointer;
    display: flex; align-items: center;
    box-sizing: border-box;
    transition: border-color 0.25s ease, background 0.25s ease, box-shadow 0.25s ease;
  }
  .cpf-select-trigger:hover { background: #fff; }
  .cpf-select-trigger.open,
  .cpf-select-trigger:focus-visible {
    background: #fff;
    border-color: #FF4545;
    box-shadow: 0 0 0 3px rgba(255,69,69,0.25);
    outline: none;
  }
  .cpf-select-trigger.open .cpf-icon { color: #FF4545; }

  .cpf-chevron {
    position: absolute; right: 14px; top: 50%;
    transform: translateY(-50%);
    color: rgba(10,26,36,0.55);
    pointer-events: none;
    display: flex; align-items: center;
    transition: transform 0.25s ease, color 0.25s ease;
  }
  .cpf-chevron.rotated { transform: translateY(-50%) rotate(180deg); color: #FF4545; }

  .cpf-dropdown {
    position: absolute; top: calc(100% + 6px); left: 0; right: 0;
    background: #fff;
    border: 1px solid rgba(255,69,69,0.35);
    border-radius: 12px;
    box-shadow: 0 16px 48px rgba(0,0,0,0.45);
    z-index: 20;
    max-height: 260px;
    overflow-y: auto;
    animation: cp-dropIn 0.18s ease forwards;
  }
  .cpf-option {
    padding: 12px 16px;
    font-family: 'DM Sans', sans-serif;
    font-size: 13.5px;
    font-weight: 500;
    color: #0A1A24;
    cursor: pointer;
    display: flex; align-items: center; gap: 8px;
    border-bottom: 1px solid rgba(10,26,36,0.06);
    transition: background 0.15s ease, color 0.15s ease, padding-left 0.15s ease;
  }
  .cpf-option:last-child { border-bottom: none; }
  .cpf-option:hover { background: rgba(255,69,69,0.08); color: #E03636; padding-left: 20px; }
  .cpf-option.selected { background: rgba(255,69,69,0.12); color: #E03636; }
  .cpf-option-dot { width: 5px; height: 5px; border-radius: 50%; background: rgba(255,69,69,0.45); flex-shrink: 0; }
  .cpf-option.selected .cpf-option-dot { background: #FF4545; }

  /* Consent, error, submit */
  .cpf-consent {
    display: flex; align-items: flex-start; gap: 8px;
    font-family: 'DM Sans', sans-serif;
    font-size: 12px; line-height: 1.5;
    color: rgba(255,255,255,0.55);
    text-align: left; margin-top: 4px;
  }
  .cpf-consent a { color: inherit; text-decoration: underline; }
  .cpf-consent a:hover { color: #fff; }

  .cpf-error {
    font-family: 'DM Sans', sans-serif;
    font-size: 12.5px;
    color: #FF8A8A;
    padding: 10px 12px;
    background: rgba(255,69,69,0.1);
    border: 1px solid rgba(255,69,69,0.25);
    border-radius: 10px;
    display: flex; align-items: center; gap: 8px;
  }

  .cpf-submit {
    width: 100%;
    padding: 15px;
    margin-top: 4px;
    border: none;
    border-radius: 12px;
    background: linear-gradient(90deg, #FF4545 0%, #fe5858 100%);
    color: #fff;
    font-family: 'Montserrat', sans-serif;
    font-weight: 600;
    font-size: 13.5px;
    letter-spacing: 0.14em;
    cursor: pointer;
    display: flex; align-items: center; justify-content: center; gap: 10px;
    box-shadow: 0 8px 28px rgba(255,69,69,0.35);
    transition: transform 0.22s ease, box-shadow 0.22s ease;
  }
  .cpf-submit:hover { transform: translateY(-2px); box-shadow: 0 14px 40px rgba(255,69,69,0.5); }
  .cpf-submit:disabled { opacity: 0.75; cursor: not-allowed; transform: none; }
  .cpf-submit:focus-visible { outline: 2px solid #FF4545; outline-offset: 3px; }

  .cpf-note {
    font-family: 'DM Sans', sans-serif;
    font-size: 12px;
    color: rgba(255,255,255,0.55);
    text-align: center;
    margin: 4px 0 0;
  }
  .cpf-note a { color: #fff; font-weight: 600; text-decoration: none; }
  .cpf-note a:hover { color: #FF4545; }

  @media (max-width: 479px) {
    .cpf-row { grid-template-columns: 1fr; }
  }

  .cp-faq-item { transition:border-color .25s ease, box-shadow .25s ease; cursor:pointer; }
  .cp-faq-item:hover { border-color:rgba(255,69,69,.25) !important; }
`;

// ── DATA ──────────────────────────────────────────────────────────────────────

/* Book titles (same names as the Portfolio section) */
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

const SCATTERED_BOOKS = [
    { src: "/images/Portfolio/07.jpg", top: "110px", left: "5%", right: undefined as string | undefined, w: 170, h: 235, rot: -10, delay: .1 },
    { src: "/images/Portfolio/13.jpg", top: "380px", left: "3%", right: undefined as string | undefined, w: 185, h: 250, rot: 5, delay: .25 },
    { src: "/images/Portfolio/18.jpg", top: "130px", left: undefined as string | undefined, right: "5%", w: 170, h: 235, rot: 9, delay: .15 },
    { src: "/images/Portfolio/28.jpg", top: "400px", left: undefined as string | undefined, right: "3%", w: 155, h: 215, rot: -6, delay: .3 },
];

// Same list as the Quote modal, so leads arrive with the same service names
const SERVICES_LIST = [
    "Ghostwriting & Writing Support",
    "Editing & Proofreading",
    "Book Cover Design",
    "Book Publishing",
    "Book Marketing & Promotion",
    "Audiobook Production",
];

const INFO_ITEMS = [
    {
        icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.7A2 2 0 012 .99h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" /></svg>,
        label: "Phone", value: "(737) 385-5397", sub: "", href: "tel:+17373855397", color: "rgba(255,69,69,.12)",
    },
    {
        icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>,
        label: "Email", value: "info@bristolpublishers.com", sub: "We reply within 24 hours", href: "mailto:info@bristolpublishers.com", color: "rgba(255,69,69,.12)",
    },
];

const FAQS = [
    { q: "How quickly will you respond?", a: "We typically respond within 24 hours. Our team ensures every inquiry is reviewed carefully so you receive accurate and helpful guidance without delay." },
    { q: "Is the initial consultation completely free?", a: "Yes, your first consultation is free. It's designed to help us understand your goals and recommend the best publishing path for your book." },
    { q: "Can I receive a customized quote before making a decision?", a: "Absolutely. After reviewing your manuscript or idea, we provide a tailored quote based on the services you actually need—no hidden costs." },
    { q: "Do you work with first-time authors?", a: "Yes. Many of our clients are first-time authors. We guide you through every step, from concept development to final publication." },
    { q: "How long does the publishing process take?", a: "Timelines vary depending on the project, but most books are completed within a few weeks to a few months depending on scope and revisions." },
    { q: "Will I retain the rights to my book?", a: "Yes. You retain full rights and ownership of your book throughout and after the publishing process." },
];

// ── HELPERS ───────────────────────────────────────────────────────────────────
function useCpInView(threshold = 0.1) {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const el = ref.current; if (!el) return;
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold });
        obs.observe(el); return () => obs.disconnect();
    }, [threshold]);
    return { ref, visible };
}

// ── HERO ──────────────────────────────────────────────────────────────────────
const CpHero: React.FC = () => {
    const { ref, visible } = useCpInView(0.05);
    return (
        <section ref={ref} style={{ background: `radial-gradient(ellipse at 0% 50%,#1B465F 0%,transparent 38%),radial-gradient(ellipse at 80% 0%,#205270 0%,transparent 36%),radial-gradient(ellipse at 100% 65%,#1A4259 0%,transparent 40%),radial-gradient(ellipse at 50% 50%,#102838 0%,transparent 55%),#0A1A24`, width: "100%", minHeight: "100vh", position: "relative", display: "flex", flexDirection: "column", overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none", backgroundImage: `linear-gradient(rgba(255,255,255,.012) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.012) 1px,transparent 1px)`, backgroundSize: "60px 60px" }} />
            <div style={{ position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none", display: "grid", gridTemplateRows: "1fr 1fr 1fr", overflow: "hidden" }}>
                {[{ cls: "cp-ap-marquee-left", rows: PORTFOLIO_ROW1 }, { cls: "cp-ap-marquee-right", rows: PORTFOLIO_ROW2 }, { cls: "cp-ap-marquee-left", rows: [...PORTFOLIO_ROW1].reverse() }].map((row, ri) => (
                    <div key={ri} style={{ overflow: "hidden", display: "flex", alignItems: "center" }}>
                        <div className={row.cls} style={{ opacity: .38 }}>
                            {[...row.rows, ...row.rows].map((b, i) => (
                                <div key={i} style={{ flexShrink: 0, width: "160px", height: "90%", margin: "0 8px", borderRadius: "8px", overflow: "hidden" }}>
                                    <img src={b.src} alt={toAlt(bookTitle(b.src))} title={bookTitle(b.src)} style={{ width: "100%", height: "100%", objectFit: "cover", filter: "saturate(.6) brightness(.55)", pointerEvents: "none" }} onError={e => { e.currentTarget.style.display = "none"; (e.currentTarget.parentElement as HTMLElement).style.background = `hsl(${i * 25},18%,14%)`; }} />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <div style={{ position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none", background: `linear-gradient(to bottom,rgba(10,26,36,.70) 0%,rgba(10,26,36,.45) 30%,rgba(10,26,36,.45) 70%,rgba(10,26,36,.80) 100%)` }} />
            {SCATTERED_BOOKS.map((b, i) => {
                const isLeft = b.left !== undefined;
                return (
                    <div key={i} style={{ position: "absolute", zIndex: 3, pointerEvents: "none", top: b.top, ...(b.left !== undefined ? { left: b.left } : {}), ...(b.right !== undefined ? { right: b.right } : {}), width: `${b.w}px`, opacity: visible ? 1 : 0, transition: `opacity 1s ease ${b.delay}s`, filter: `drop-shadow(0 0 12px rgba(255,69,69,0.65)) drop-shadow(0 0 30px rgba(255,45,80,0.40)) drop-shadow(0 0 6px rgba(255,150,150,0.80))` }}>
                        <div style={{ transform: visible ? `rotate(${b.rot}deg) translateY(0)` : `rotate(${b.rot + (isLeft ? -25 : 25)}deg) translateY(40px) translateX(${isLeft ? -80 : 80}px)`, transition: `transform 1s cubic-bezier(.22,1,.36,1) ${b.delay}s`, animation: visible ? `cp-float${i} 4s ease-in-out ${1 + b.delay}s infinite alternate` : "none" }}>
                            <img src={b.src} alt={toAlt(bookTitle(b.src))} title={bookTitle(b.src)} style={{ width: "100%", height: `${b.h}px`, objectFit: "cover", display: "block", borderRadius: "10px", filter: "brightness(.85) saturate(1.1) contrast(1.05)", boxShadow: "0 24px 60px rgba(0,0,0,.7),inset 0 0 30px rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)" }} onError={e => { e.currentTarget.style.display = "none"; const p = e.currentTarget.parentElement as HTMLElement; const abs = p.parentElement as HTMLElement; abs.style.height = `${b.h}px`; abs.style.borderRadius = "10px"; abs.style.background = `linear-gradient(135deg,hsl(${i * 40 + 200},30%,15%),hsl(${i * 40 + 210},40%,22%))`; abs.style.border = "1px solid rgba(255,255,255,.1)"; }} />
                        </div>
                    </div>
                );
            })}
            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", zIndex: 2, pointerEvents: "none", width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(circle,rgba(80,130,255,.06) 0%,transparent 65%)" }} />
            <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", zIndex: 4, padding: "120px 360px 100px", paddingTop: "140px", textAlign: "center" }}>
                <div style={{ maxWidth: "820px", width: "100%" }}>
                    <div style={{ display: "inline-flex", alignItems: "center", gap: "12px", marginBottom: "24px", opacity: visible ? 1 : 0, animation: visible ? "cp-fadeUp .5s ease .1s forwards" : "none" }}>
                        <div style={{ width: visible ? "32px" : "0", height: "2px", background: "#FF4545", transition: "width .8s ease .3s" }} />
                        <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: ".75rem", letterSpacing: ".3em", color: "#FF4545", fontWeight: 600 }}>CONTACT US</span>
                        <div style={{ width: visible ? "32px" : "0", height: "2px", background: "#FF4545", transition: "width .8s ease .3s" }} />
                    </div>
                    <h1 style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 800, fontSize: "clamp(2rem,3.8vw,3.4rem)", letterSpacing: "-.025em", lineHeight: 1.1, color: "white", margin: "0 0 24px", opacity: visible ? 1 : 0, animation: visible ? "cp-fadeUp .7s ease .2s forwards" : "none" }}>
                        Let's Explore What's Possible for <br /><span style={{ color: "#FF4545" }}>Your Book.</span>
                    </h1>
                    <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "1.05rem", lineHeight: 1.85, color: "rgba(255,255,255,.52)", fontWeight: 300, margin: "0 auto 38px", maxWidth: "540px", opacity: visible ? 1 : 0, animation: visible ? "cp-fadeUp .7s ease .35s forwards" : "none" }}>
                        Book a complimentary consultation and gain valuable insights into your publishing opportunities and discover what's waiting for your manuscript.
                    </p>
                    <div style={{ display: "flex", justifyContent: "center", gap: "24px", flexWrap: "wrap", opacity: visible ? 1 : 0, animation: visible ? "cp-fadeUp .7s ease .5s forwards" : "none" }}>
                        {[
                            { icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.7A2 2 0 012 .99h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" /></svg>, label: "Free Consultation" },
                            { icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>, label: "Fast Response Time" },
                            { icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>, label: "Expert Publishing Guidance" },
                        ].map((b, i) => (
                            <div key={i} style={{ display: "flex", alignItems: "center", gap: "7px", color: "rgba(255,255,255,.4)" }}>
                                <span style={{ color: "#FF4545" }}>{b.icon}</span>
                                <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: ".82rem", fontWeight: 400 }}>{b.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

// ── SERVICE SELECT (same as Quote modal) ──────────────────────────────────────
const CpSelect: React.FC<{ value: string; onChange: (v: string) => void }> = ({ value, onChange }) => {
    const [open, setOpen] = useState(false);
    const wrapRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
        };
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, []);

    return (
        <div
            className="cpf-field"
            ref={wrapRef}
            onKeyDown={(e) => { if (e.key === "Escape" && open) setOpen(false); }}
        >
            <button
                type="button"
                className={`cpf-select-trigger${open ? " open" : ""}`}
                onClick={() => setOpen(o => !o)}
                aria-haspopup="listbox"
                aria-expanded={open}
                aria-label="Service interested in"
            >
                {value}
                <span className="cpf-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                </span>
                <span className={`cpf-chevron${open ? " rotated" : ""}`}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9" />
                    </svg>
                </span>
            </button>

            <span className={`cpf-label${value ? " lifted" : ""}`}>Service Interested In *</span>

            {open && (
                <div className="cpf-dropdown" role="listbox">
                    {SERVICES_LIST.map(svc => (
                        <div
                            key={svc}
                            role="option"
                            aria-selected={value === svc}
                            className={`cpf-option${value === svc ? " selected" : ""}`}
                            onClick={() => { onChange(svc); setOpen(false); }}
                        >
                            <span className="cpf-option-dot" />
                            {svc}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

// ── CONTACT FORM + INFO ───────────────────────────────────────────────────────
const CpForm: React.FC = () => {
    const navigate = useNavigate();
    const { ref, visible } = useCpInView(0.06);
    const [form, setForm] = useState({ name: "", phone: "", email: "", service: "", message: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm(f => ({ ...f, [e.target.name]: e.target.value }));
        if (error) setError("");
    };

    // Same validation + payload as the Quote modal
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.name || !form.phone || !form.email || !form.service || !form.message) {
            setError("Please fill in all required fields — Name, Phone, Email, Service, and Message.");
            return;
        }
        if (form.phone.replace(/\D/g, "").length < 7) {
            setError("Please enter a valid phone number.");
            return;
        }
        setLoading(true);
        setError("");

        try {
            const res = await fetch(LEAD_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    Name: form.name,
                    Email: form.email,
                    "Phone Number": form.phone,
                    "Service Name": form.service,
                    Message: form.message,
                }),
            });
            const data = await res.json();
            console.log("Contact page lead submitted:", data);

            navigate(`/thank-you?name=${encodeURIComponent(form.name)}&service=${encodeURIComponent(form.service)}`);
        } catch (err) {
            console.error("Submission error:", err);
            setError("Something went wrong. Please try again or call us directly.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section ref={ref} style={{ background: "linear-gradient(180deg,#1B465F 0%,#14384C 50%,#0E2432 100%)", width: "100%", overflow: "hidden", padding: "110px 0 110px", position: "relative" }}>
            <div style={{ position: "absolute", top: "10%", right: "-6%", width: "460px", height: "460px", borderRadius: "50%", background: "radial-gradient(circle,rgba(255,69,69,.07) 0%,transparent 65%)", animation: "cp-pulse 6s ease-in-out infinite", pointerEvents: "none" }} />
            <div style={{ position: "absolute", bottom: "10%", left: "-5%", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle,rgba(27,70,95,.55) 0%,transparent 70%)", pointerEvents: "none" }} />
            <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(rgba(255,255,255,.012) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.012) 1px,transparent 1px)`, backgroundSize: "60px 60px", pointerEvents: "none" }} />
            <div style={{ position: "absolute", top: "6%", left: "4%", width: "160px", height: "160px", border: "1px dashed rgba(255,69,69,.1)", borderRadius: "50%", animation: "cp-rotate 22s linear infinite", pointerEvents: "none" }} />

            <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 48px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: "72px", alignItems: "start" }}>

                    {/* ── LEFT — info ── */}
                    <div style={{ opacity: visible ? 1 : 0, animation: visible ? "cp-fadeLeft .9s ease .2s forwards" : "none" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "22px" }}>
                            <div style={{ height: "2px", background: "#FF4545", width: visible ? "36px" : "0", transition: "width .8s ease .2s" }} />
                            <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: ".78rem", letterSpacing: ".28em", color: "#FF4545", fontWeight: 600 }}>GET IN TOUCH</span>
                        </div>
                        <h2 style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 800, fontSize: "clamp(2rem,3.5vw,3rem)", letterSpacing: "-.025em", lineHeight: 1.05, color: "white", margin: "0 0 16px" }}>
                            {visible && (<><SplitText text="Let's Explore the" delay={30} duration={1.0} ease="power3.out" splitType="chars" from={{ opacity: 0, y: 40 }} to={{ opacity: 1, y: 0 }} threshold={0.1} rootMargin="-40px" textAlign="left" /><br /><SplitText text="Possibilities Ahead" className="text-[#FF4545]" delay={36} duration={1.1} ease="power3.out" splitType="chars" from={{ opacity: 0, y: 40 }} to={{ opacity: 1, y: 0 }} threshold={0.1} rootMargin="-40px" textAlign="left" /></>)}
                        </h2>
                        <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "1rem", lineHeight: 1.85, color: "rgba(255,255,255,.42)", fontWeight: 300, margin: "0 0 36px" }}>
                            Your manuscript represents months, or even years of dedication and creativity.
                            Let's discuss how to transform that effort into a professionally published book with lasting impact.
                        </p>

                        <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "40px" }}>
                            {INFO_ITEMS.map((item, i) => (
                                <a key={i} href={item.href} className="cp-info-card" style={{ display: "flex", alignItems: "center", gap: "16px", padding: "18px 22px", borderRadius: "16px", background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.07)", backdropFilter: "blur(6px)", textDecoration: "none" }}>
                                    <div style={{ width: "48px", height: "48px", borderRadius: "14px", flexShrink: 0, background: item.color, border: "1px solid rgba(255,69,69,.2)", display: "flex", alignItems: "center", justifyContent: "center", color: "#FF4545" }}>{item.icon}</div>
                                    <div>
                                        <p style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: ".72rem", letterSpacing: ".15em", color: "rgba(255,255,255,.3)", margin: "0 0 2px" }}>{item.label}</p>
                                        <p style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 600, fontSize: ".88rem", color: "rgba(255,255,255,.85)", margin: "0 0 2px" }}>{item.value}</p>
                                        <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: ".72rem", color: "rgba(255,255,255,.3)", margin: 0, fontWeight: 300 }}>{item.sub}</p>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* ── RIGHT — form ── */}
                    <div style={{ opacity: visible ? 1 : 0, animation: visible ? "cp-fadeRight .9s ease .3s forwards" : "none" }}>
                        <div style={{ borderRadius: "26px", padding: "2px", background: "linear-gradient(135deg,rgba(255,69,69,.35),rgba(26,36,95,.6),rgba(255,69,69,.2))" }}>
                            <div style={{ borderRadius: "24px", background: "linear-gradient(180deg,#1B465F 0%,#14384C 50%,#0E2432 100%)", padding: "40px 36px", position: "relative" }}>
                                <div style={{ position: "absolute", inset: 0, borderRadius: "24px", backgroundImage: `linear-gradient(rgba(255,255,255,.015) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.015) 1px,transparent 1px)`, backgroundSize: "40px 40px", pointerEvents: "none" }} />

                                <div style={{ position: "relative", zIndex: 2 }}>
                                    <div style={{ marginBottom: "22px" }}>
                                        <p style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 800, fontSize: "1.5rem", letterSpacing: "-.02em", color: "white", margin: "0 0 6px" }}>
                                            Get your <span style={{ color: "#FF4545" }}>free quote</span>
                                        </p>
                                        <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "14px", lineHeight: 1.55, color: "rgba(255,255,255,.7)", margin: 0 }}>
                                            Tell us about your book and we'll get back to you with a plan and a price.
                                        </p>
                                    </div>

                                    <form className="cpf-fields" onSubmit={handleSubmit} noValidate>
                                        {/* Name + Phone */}
                                        <div className="cpf-row">
                                            <div className="cpf-field">
                                                <input id="cpf-name" className="cpf-input" type="text" name="name" placeholder=" " value={form.name} onChange={handleChange} autoComplete="name" />
                                                <span className="cpf-icon">
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                                                </span>
                                                <label htmlFor="cpf-name" className="cpf-label">Full Name *</label>
                                            </div>

                                            <div className="cpf-field">
                                                <input id="cpf-phone" className="cpf-input" type="tel" name="phone" placeholder=" " value={form.phone} onChange={handleChange} autoComplete="tel" aria-required="true" />
                                                <span className="cpf-icon">
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.7A2 2 0 012 .99h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" /></svg>
                                                </span>
                                                <label htmlFor="cpf-phone" className="cpf-label">Phone Number *</label>
                                            </div>
                                        </div>

                                        {/* Email */}
                                        <div className="cpf-field">
                                            <input id="cpf-email" className="cpf-input" type="email" name="email" placeholder=" " value={form.email} onChange={handleChange} autoComplete="email" />
                                            <span className="cpf-icon">
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                                            </span>
                                            <label htmlFor="cpf-email" className="cpf-label">Email Address *</label>
                                        </div>

                                        {/* Service */}
                                        <CpSelect
                                            value={form.service}
                                            onChange={(v) => { setForm(f => ({ ...f, service: v })); if (error) setError(""); }}
                                        />

                                        {/* Message */}
                                        <div className="cpf-field">
                                            <textarea id="cpf-message" className="cpf-input" name="message" placeholder=" " value={form.message} onChange={handleChange} />
                                            <span className="cpf-icon cpf-icon-textarea">
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" /></svg>
                                            </span>
                                            <label htmlFor="cpf-message" className="cpf-label cpf-label-textarea">Your Message *</label>
                                        </div>

                                        {/* Consent — same text as the Quote modal */}
                                        <label className="cpf-consent">
                                            <input
                                                type="checkbox"
                                                name="terms_accepted"
                                                value="yes"
                                                checked
                                                readOnly
                                                onClick={(e) => e.preventDefault()}
                                                style={{ marginTop: "2px", flexShrink: 0, accentColor: "#dce1e8" }}
                                            />
                                            <span>
                                                By checking this box and submitting this form, I confirm that I have read
                                                and agree to the{" "}
                                                <a href="/terms-of-service" target="_blank" rel="noopener noreferrer">Terms of Service</a>{" "}
                                                and{" "}
                                                <a href="/privacy-policy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
                                                , and I consent to being contacted by phone, email, or text message
                                                regarding my inquiry. Message and data rates may apply. Consent is not a
                                                condition of purchase.
                                            </span>
                                        </label>

                                        {/* Error */}
                                        {error && (
                                            <div className="cpf-error" role="alert">
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
                                                {error}
                                            </div>
                                        )}

                                        {/* Submit */}
                                        <button type="submit" className="cpf-submit" disabled={loading}>
                                            {loading ? (
                                                <>
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" style={{ animation: "cp-rotateSlow .8s linear infinite" }}>
                                                        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                                                    </svg>
                                                    SENDING...
                                                </>
                                            ) : (
                                                <>
                                                    SEND NOW
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" /></svg>
                                                </>
                                            )}
                                        </button>

                                        <p className="cpf-note">
                                            Prefer to talk? Call <a href="tel:+17373855397">(737) 385-5397</a>
                                        </p>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

// ── FAQ SECTION ───────────────────────────────────────────────────────────────
const CpFaq: React.FC = () => {
    const { ref, visible } = useCpInView(0.08);
    const [open, setOpen] = useState<number | null>(null);
    return (
        <section ref={ref} style={{ background: "linear-gradient(180deg,#FFFFFF 0%,#FFF9F9 30%,#FFE8E8 60%,#FFD6D6 85%,#FFFFFF 100%)", width: "100%", overflow: "hidden", padding: "110px 0 100px", position: "relative" }}>
            <div style={{ position: "absolute", top: "8%", left: "-6%", width: "420px", height: "420px", borderRadius: "50%", background: "radial-gradient(circle,rgba(255,69,69,.08) 0%,transparent 70%)", pointerEvents: "none" }} />
            <div style={{ position: "absolute", bottom: "5%", right: "-4%", width: "460px", height: "460px", borderRadius: "50%", background: "radial-gradient(circle,rgba(255,69,69,.07) 0%,transparent 70%)", pointerEvents: "none" }} />
            <div style={{ position: "absolute", top: "6%", right: "3%", width: "180px", height: "180px", border: "1px dashed rgba(255,69,69,.14)", borderRadius: "50%", animation: "cp-rotate 22s linear infinite", pointerEvents: "none" }} />

            <div style={{ maxWidth: "860px", margin: "0 auto", padding: "0 48px" }}>
                <div style={{ textAlign: "center", marginBottom: "56px" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", marginBottom: "20px", opacity: visible ? 1 : 0, animation: visible ? "cp-fadeUp .6s ease forwards" : "none" }}>
                        <div style={{ height: "2px", background: "#FF4545", width: visible ? "32px" : "0", transition: "width .8s ease .2s" }} />
                        <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: ".78rem", letterSpacing: ".28em", color: "#FF4545", fontWeight: 600 }}>COMMON QUESTIONS</span>
                        <div style={{ height: "2px", background: "#FF4545", width: visible ? "32px" : "0", transition: "width .8s ease .2s" }} />
                    </div>
                    <h2 style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 800, fontSize: "clamp(2rem,4vw,3rem)", letterSpacing: "-.025em", lineHeight: 1.05, color: "#0A0A0A", margin: 0, opacity: visible ? 1 : 0, animation: visible ? "cp-fadeUp .7s ease .2s forwards" : "none" }}>
                        Here Are Answers Every Author Should Know <span style={{ color: "#FF4545" }}>—</span>
                    </h2>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    {FAQS.map((faq, i) => {
                        const isOpen = open === i;
                        return (
                            <div key={i} className="cp-faq-item" onClick={() => setOpen(isOpen ? null : i)} style={{ background: isOpen ? "rgba(255,255,255,.85)" : "rgba(255,255,255,.6)", border: `1px solid ${isOpen ? "rgba(255,69,69,.3)" : "rgba(0,0,0,.08)"}`, borderRadius: "16px", padding: "22px 26px", boxShadow: isOpen ? "0 8px 30px rgba(255,69,69,.08)" : "0 4px 15px rgba(0,0,0,.03)", backdropFilter: "blur(8px)", opacity: visible ? 1 : 0, animation: visible ? `cp-fadeUp .6s ease ${.15 + i * .06}s forwards` : "none" }}>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "20px" }}>
                                    <h3 style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 600, fontSize: "1.05rem", color: isOpen ? "#0A0A0A" : "#333", margin: 0, lineHeight: 1.4 }}>{faq.q}</h3>
                                    <div style={{ width: "32px", height: "32px", borderRadius: "50%", flexShrink: 0, background: isOpen ? "rgba(255,69,69,.1)" : "rgba(0,0,0,.05)", display: "flex", alignItems: "center", justifyContent: "center", transition: "background .3s ease,transform .4s cubic-bezier(.22,1,.36,1)", transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={isOpen ? "#FF4545" : "rgba(0,0,0,.3)"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="6 9 12 15 18 9" />
                                        </svg>
                                    </div>
                                </div>
                                <div style={{ maxHeight: isOpen ? "300px" : "0px", opacity: isOpen ? 1 : 0, overflow: "hidden", transition: "max-height .45s cubic-bezier(.22,1,.36,1),opacity .35s ease,margin .35s ease", marginTop: isOpen ? "16px" : "0px" }}>
                                    <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: ".95rem", lineHeight: 1.8, color: "#555", margin: 0, fontWeight: 300 }}>{faq.a}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div style={{ marginTop: "48px", textAlign: "center", opacity: visible ? 1 : 0, animation: visible ? "cp-fadeUp .7s ease .6s forwards" : "none" }}>
                    <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: ".92rem", color: "#666", margin: "0 0 16px", fontWeight: 300 }}>
                        Still have questions? We're happy to answer them directly.
                    </p>
                    <a href="mailto:info@bristolpublishers.com" style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 700, fontSize: ".85rem", letterSpacing: ".1em", color: "#FF4545", textDecoration: "none", borderBottom: "1px solid rgba(255,69,69,.3)", paddingBottom: "2px" }}>
                        info@bristolpublishers.com
                    </a>
                </div>
            </div>
        </section>
    );
};

const ContactPage: React.FC = () => (
    <>
        <style>{pageStyles}</style>
        <CpHero />
        <CpForm />
        <CpFaq />
    </>
);

export default ContactPage;