import React, { useEffect, useRef, useState } from "react";
import SplitText from "@/components/SplitText";
import {
    Phone, Mail, MapPin, Clock, Send, User,
    MessageCircle, ChevronDown, CheckCircle
} from "lucide-react";

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
  @keyframes cp-successPop { 0%{opacity:0;transform:scale(.7)} 70%{transform:scale(1.08)} 100%{opacity:1;transform:scale(1)} }
  @keyframes cp-checkDraw  { from{stroke-dashoffset:40} to{stroke-dashoffset:0} }
  @keyframes cp-rotateSlow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
  @keyframes cp-shimmer    { 0%{background-position:-600px 0} 100%{background-position:600px 0} }

  .cp-ap-marquee-left  { display:flex; width:max-content; animation:cp-marqueeLeft  50s linear infinite; }
  .cp-ap-marquee-right { display:flex; width:max-content; animation:cp-marqueeRight 55s linear infinite; }

  .cp-info-card { transition:transform .3s ease, border-color .3s ease, box-shadow .3s ease; }
  .cp-info-card:hover { transform:translateX(6px); border-color:rgba(255,69,69,.4) !important; box-shadow:0 8px 30px rgba(255,69,69,.08) !important; }

  .cp-service-pill {
    transition:all .25s ease; cursor:pointer;
  }
  .cp-service-pill:hover {
    background:#FF4545 !important;
    color:#fff !important;
    border-color:#FF4545 !important;
    transform:translateY(-2px);
    box-shadow:0 6px 20px rgba(255,69,69,.3);
  }
  .cp-service-pill.selected {
    background:#FF4545 !important;
    color:#fff !important;
    border-color:#FF4545 !important;
  }

  .cp-field-wrap { position:relative; }
  .cp-field-input {
    width:100%; background:rgba(255,255,255,.04);
    border:1px solid rgba(255,255,255,.1); border-radius:14px;
    padding:18px 20px 18px 56px; color:white;
    font-family:'DM Sans',sans-serif; font-size:.95rem; font-weight:300;
    outline:none; transition:border-color .3s ease,background .3s ease,box-shadow .3s ease;
    box-sizing:border-box; caret-color:#FF4545;
  }
  .cp-field-input::placeholder { color:rgba(255,255,255,.25); }
  .cp-field-input:focus {
    border-color:rgba(255,69,69,.6); background:rgba(255,69,69,.04);
    box-shadow:0 0 0 3px rgba(255,69,69,.1),0 8px 32px rgba(0,0,0,.3);
  }
  .cp-field-input:focus + .cp-field-icon { color:#FF4545 !important; }
  .cp-field-icon {
    position:absolute; left:18px; top:50%; transform:translateY(-50%);
    color:rgba(255,255,255,.25); transition:color .3s ease;
    pointer-events:none; display:flex; align-items:center;
  }
  .cp-field-icon-ta { top:20px; transform:none; }
  .cp-field-label {
    position:absolute; left:56px; top:18px;
    font-family:'DM Sans',sans-serif; font-size:.92rem; color:rgba(255,255,255,.25);
    pointer-events:none; transition:all .25s cubic-bezier(.22,1,.36,1); transform-origin:left;
  }
  .cp-field-input:focus ~ .cp-field-label,
  .cp-field-input:not(:placeholder-shown) ~ .cp-field-label {
    top:-10px; left:14px; font-size:.72rem; color:#FF4545;
    background:#0a1a24; padding:0 6px; border-radius:4px; letter-spacing:.06em;
  }
  .cp-select {
    width:100%; background:rgba(255,255,255,.04);
    border:1px solid rgba(255,255,255,.1); border-radius:14px;
    padding:18px 20px 18px 56px; color:white;
    font-family:'DM Sans',sans-serif; font-size:.95rem; font-weight:300;
    outline:none; transition:border-color .3s ease,background .3s ease;
    box-sizing:border-box; appearance:none; cursor:pointer;
  }
  .cp-select:focus { border-color:rgba(255,69,69,.6); background:rgba(255,69,69,.04); }
  .cp-select option { background:#0d1a28; color:white; }
  textarea.cp-field-input { resize:none; padding-top:18px; line-height:1.65; min-height:140px; }
  .cp-submit-btn {
    width:100%; padding:18px; border-radius:14px;
    background:linear-gradient(90deg,#FF4545 0%,#fe5858 100%);
    color:white; font-family:'Montserrat',sans-serif; font-size:.95rem;
    font-weight:700; letter-spacing:.1em; border:none; cursor:pointer;
    position:relative; overflow:hidden;
    transition:transform .25s ease,box-shadow .25s ease;
    box-shadow:0 8px 32px rgba(255,69,69,.3);
    display:flex; align-items:center; justify-content:center; gap:10px;
  }
  .cp-submit-btn::before {
    content:''; position:absolute; inset:0;
    background:linear-gradient(90deg,transparent 0%,rgba(255,255,255,.12) 50%,transparent 100%);
    transform:translateX(-100%); transition:transform .5s ease;
  }
  .cp-submit-btn:hover { transform:translateY(-3px); box-shadow:0 16px 48px rgba(255,69,69,.45); }
  .cp-submit-btn:hover::before { transform:translateX(100%); }
  .cp-submit-btn:disabled { opacity:.7; cursor:not-allowed; transform:none; }

  .cp-faq-item { transition:border-color .25s ease, box-shadow .25s ease; cursor:pointer; }
  .cp-faq-item:hover { border-color:rgba(255,69,69,.25) !important; }
`;

// ── DATA ──────────────────────────────────────────────────────────────────────
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

const SERVICES_LIST = [
    "Book Publishing", "Ghostwriting", "Book Cover Design",
    "Formatting & Proofreading", "Book Marketing", "Audiobook Production", "Not Sure Yet",
];

const INFO_ITEMS = [
    {
        icon: <Phone size={22} />,
        label: "Phone",
        value: "+99 123 456 789",
        sub: "Mon–Fri, 9am–6pm EST",
        color: "rgba(255,69,69,.12)",
    },
    {
        icon: <Mail size={22} />,
        label: "Email",
        value: "info@bristolpublishers.com",
        sub: "We reply within 24 hours",
        color: "rgba(255,69,69,.12)",
    },
    {
        icon: <MapPin size={22} />,
        label: "Office",
        value: "Bristol Publishers HQ",
        sub: "United States",
        color: "rgba(255,69,69,.12)",
    },
    {
        icon: <Clock size={22} />,
        label: "Hours",
        value: "Monday – Friday",
        sub: "9:00 AM – 6:00 PM EST",
        color: "rgba(255,69,69,.12)",
    },
];

const FAQS = [
    { q: "How quickly will you respond?", a: "We typically respond within 24 hours. Our team ensures every inquiry is reviewed carefully so you receive accurate and helpful guidance without delay." },
    { q: "Is the initial consultation completely free?", a: "Yes, your first consultation is free. It’s designed to help us understand your goals and recommend the best publishing path for your book." },
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
                                    <img src={b.src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "saturate(.6) brightness(.55)", pointerEvents: "none" }} onError={e => { e.currentTarget.style.display = "none"; (e.currentTarget.parentElement as HTMLElement).style.background = `hsl(${i * 25},18%,14%)`; }} />
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
                            <img src={b.src} alt="" style={{ width: "100%", height: `${b.h}px`, objectFit: "cover", display: "block", borderRadius: "10px", filter: "brightness(.85) saturate(1.1) contrast(1.05)", boxShadow: "0 24px 60px rgba(0,0,0,.7),inset 0 0 30px rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)" }} onError={e => { e.currentTarget.style.display = "none"; const p = e.currentTarget.parentElement as HTMLElement; const abs = p.parentElement as HTMLElement; abs.style.height = `${b.h}px`; abs.style.borderRadius = "10px"; abs.style.background = `linear-gradient(135deg,hsl(${i * 40 + 200},30%,15%),hsl(${i * 40 + 210},40%,22%))`; abs.style.border = "1px solid rgba(255,255,255,.1)"; }} />
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
                        Book a complimentary consultation and gain valuable insights into your publishing opportunities and discover what’s waiting for your manuscript.
                    </p>
                    <div style={{ display: "flex", justifyContent: "center", gap: "24px", flexWrap: "wrap", opacity: visible ? 1 : 0, animation: visible ? "cp-fadeUp .7s ease .5s forwards" : "none" }}>
                        {[{ icon: <Phone size={15} />, label: "Free Consultation" }, { icon: <Clock size={15} />, label: "Fast Response Time" }, { icon: <CheckCircle size={15} />, label: "Expert Publishing Guidance" }].map((b, i) => (
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

// ── CONTACT FORM + INFO ───────────────────────────────────────────────────────
const CpForm: React.FC = () => {
    const { ref, visible } = useCpInView(0.06);
    const [form, setForm] = useState({ name: "", phone: "", email: "", service: "", message: "" });
    const [selectedService, setSelectedService] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
        setForm(f => ({ ...f, [e.target.name]: e.target.value }));

    const handleSubmit = (e: React.MouseEvent) => {
        e.preventDefault();
        if (!form.name || !form.email || !form.message) return;
        setLoading(true);
        setTimeout(() => { setLoading(false); setSubmitted(true); }, 1600);
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
                                <div key={i} className="cp-info-card" style={{ display: "flex", alignItems: "center", gap: "16px", padding: "18px 22px", borderRadius: "16px", background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.07)", backdropFilter: "blur(6px)", transition: "transform .3s ease,border-color .3s ease" }}>
                                    <div style={{ width: "48px", height: "48px", borderRadius: "14px", flexShrink: 0, background: item.color, border: "1px solid rgba(255,69,69,.2)", display: "flex", alignItems: "center", justifyContent: "center", color: "#FF4545" }}>{item.icon}</div>
                                    <div>
                                        <p style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: ".72rem", letterSpacing: ".15em", color: "rgba(255,255,255,.3)", margin: "0 0 2px" }}>{item.label}</p>
                                        <p style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 600, fontSize: ".88rem", color: "rgba(255,255,255,.85)", margin: "0 0 2px" }}>{item.value}</p>
                                        <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: ".72rem", color: "rgba(255,255,255,.3)", margin: 0, fontWeight: 300 }}>{item.sub}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ── RIGHT — form ── */}
                    <div style={{ opacity: visible ? 1 : 0, animation: visible ? "cp-fadeRight .9s ease .3s forwards" : "none" }}>
                        <div style={{ borderRadius: "26px", padding: "2px", background: "linear-gradient(135deg,rgba(255,69,69,.35),rgba(26,36,95,.6),rgba(255,69,69,.2))" }}>
                            <div style={{ borderRadius: "24px", background: "linear-gradient(180deg,#1B465F 0%,#14384C 50%,#0E2432 100%)", padding: "44px 40px", position: "relative", overflow: "hidden" }}>
                                <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(rgba(255,255,255,.015) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.015) 1px,transparent 1px)`, backgroundSize: "40px 40px", pointerEvents: "none" }} />

                                {submitted ? (
                                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "480px", gap: "20px", animation: "cp-successPop .5s cubic-bezier(.22,1,.36,1) forwards", position: "relative", zIndex: 2 }}>
                                        <div style={{ width: "90px", height: "90px", borderRadius: "50%", background: "rgba(255,69,69,.1)", border: "2px solid rgba(255,69,69,.35)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#FF4545" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                <polyline points="20 6 9 17 4 12" style={{ strokeDasharray: 40, strokeDashoffset: 0, animation: "cp-checkDraw .5s ease .3s both" }} />
                                            </svg>
                                        </div>
                                        <div style={{ textAlign: "center" }}>
                                            <p style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 800, fontSize: "1.8rem", color: "white", margin: "0 0 10px", letterSpacing: "-.01em" }}>Message Sent!</p>
                                            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "1rem", color: "rgba(255,255,255,.5)", margin: "0 0 6px", fontWeight: 300 }}>We'll get back to you within 24 hours.</p>
                                            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: ".82rem", color: "rgba(255,255,255,.3)", margin: 0, fontWeight: 300 }}>Check your inbox for a confirmation email.</p>
                                        </div>
                                        <button onClick={() => { setSubmitted(false); setForm({ name: "", phone: "", email: "", service: "", message: "" }); setSelectedService(""); }} style={{ fontFamily: "'Montserrat',sans-serif", letterSpacing: ".1em", fontWeight: 600, fontSize: ".82rem", padding: "11px 28px", borderRadius: "999px", background: "transparent", color: "rgba(255,255,255,.5)", border: "1px solid rgba(255,255,255,.12)", cursor: "pointer", marginTop: "8px", transition: "border-color .2s ease,color .2s ease" }}>
                                            SEND ANOTHER MESSAGE
                                        </button>
                                    </div>
                                ) : (
                                    <div style={{ display: "flex", flexDirection: "column", gap: "18px", position: "relative", zIndex: 2 }}>
                                        <div style={{ marginBottom: "4px" }}>
                                            <p style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 700, fontSize: "1.1rem", color: "white", margin: "0 0 4px" }}>Send Us a Message</p>
                                            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: ".82rem", color: "rgba(255,255,255,.3)", margin: 0, fontWeight: 300 }}>Free consultation — no commitment required</p>
                                        </div>

                                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                                            <div className="cp-field-wrap">
                                                <input className="cp-field-input" type="text" name="name" placeholder=" " value={form.name} onChange={handleChange} autoComplete="off" />
                                                <span className="cp-field-icon"><User size={18} /></span>
                                                <label className="cp-field-label">Full Name *</label>
                                            </div>
                                            <div className="cp-field-wrap">
                                                <input className="cp-field-input" type="tel" name="phone" placeholder=" " value={form.phone} onChange={handleChange} autoComplete="off" />
                                                <span className="cp-field-icon"><Phone size={18} /></span>
                                                <label className="cp-field-label">Phone Number</label>
                                            </div>
                                        </div>

                                        <div className="cp-field-wrap">
                                            <input className="cp-field-input" type="email" name="email" placeholder=" " value={form.email} onChange={handleChange} autoComplete="off" />
                                            <span className="cp-field-icon"><Mail size={18} /></span>
                                            <label className="cp-field-label">Email Address *</label>
                                        </div>

                                        {/* Service selector — pills */}
                                        <div>
                                            <p style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 600, fontSize: ".72rem", letterSpacing: ".12em", color: "rgba(255,255,255,.35)", margin: "0 0 10px" }}>SERVICE INTERESTED IN</p>
                                            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                                                {SERVICES_LIST.map((s, i) => (
                                                    <button key={i} className={`cp-service-pill${selectedService === s ? " selected" : ""}`}
                                                        onClick={() => setSelectedService(selectedService === s ? "" : s)}
                                                        style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 600, fontSize: ".7rem", letterSpacing: ".05em", padding: "6px 14px", borderRadius: "999px", background: selectedService === s ? "#FF4545" : "rgba(255,255,255,.06)", border: `1px solid ${selectedService === s ? "#FF4545" : "rgba(255,255,255,.1)"}`, color: selectedService === s ? "#fff" : "rgba(255,255,255,.6)", cursor: "pointer" }}>
                                                        {s}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="cp-field-wrap">
                                            <textarea className="cp-field-input" name="message" placeholder=" " value={form.message} onChange={handleChange} style={{ minHeight: "130px" }} />
                                            <span className="cp-field-icon cp-field-icon-ta"><MessageCircle size={18} /></span>
                                            <label className="cp-field-label">Your Message *</label>
                                        </div>

                                        <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: ".72rem", color: "rgba(255,255,255,.22)", margin: 0, fontWeight: 300 }}>
                                            * Required fields. We never share your information with third parties.
                                        </p>

                                        <button className="cp-submit-btn" onClick={handleSubmit} disabled={loading || !form.name || !form.email || !form.message}>
                                            {loading ? (
                                                <>
                                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" style={{ animation: "cp-rotateSlow .8s linear infinite" }}><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" /></svg>
                                                    SENDING...
                                                </>
                                            ) : (
                                                <>Send Message <Send size={17} /></>
                                            )}
                                        </button>
                                    </div>
                                )}
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
                                        <ChevronDown size={16} color={isOpen ? "#FF4545" : "rgba(0,0,0,.3)"} />
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

// ── MAIN PAGE ─────────────────────────────────────────────────────────────────
const ContactPage: React.FC = () => (
    <>
        <style>{pageStyles}</style>
        <CpHero />
        <CpForm />
        <CpFaq />
    </>
);

export default ContactPage;