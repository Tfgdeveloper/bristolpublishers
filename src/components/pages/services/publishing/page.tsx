import React, { useEffect, useRef, useState } from "react";
import SplitText from "@/components/SplitText";
import { openQuoteModal } from "@/components/Quotemodal";
import { useNavigate } from "react-router-dom";
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

  @keyframes ap-bookFloat0 { 0%{transform:rotate(-10deg) translateY(0)} 100%{transform:rotate(-8deg) translateY(-18px)} }
  @keyframes ap-bookFloat1 { 0%{transform:rotate(5deg) translateY(0)} 100%{transform:rotate(7deg) translateY(-14px)} }
  @keyframes ap-bookFloat2 { 0%{transform:rotate(9deg) translateY(0)} 100%{transform:rotate(11deg) translateY(-20px)} }
  @keyframes ap-bookFloat3 { 0%{transform:rotate(-6deg) translateY(0)} 100%{transform:rotate(-4deg) translateY(-16px)} }
`;

const ctaStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

  @keyframes fadeUp { from { opacity: 0; transform: translateY(28px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes floatMockup { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-14px); } }
  @keyframes shimmerBorder { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
  @keyframes pulseDot { 0%, 100% { transform: scale(1); opacity: 0.6; } 50% { transform: scale(1.4); opacity: 1; } }

  .cta-btn-primary { font-family: 'Montserrat', sans-serif; letter-spacing: 0.12em; font-size: 1rem; padding: 14px 38px; border-radius: 999px; background: white; color: #FF4545; border: none; cursor: pointer; transition: transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease; box-shadow: 0 6px 28px rgba(255,255,255,0.15); white-space: nowrap; }
  .cta-btn-primary:hover { transform: translateY(-3px); box-shadow: 0 12px 40px rgba(255,255,255,0.25); background: #fff0f0; }
  .cta-btn-secondary { font-family: 'Montserrat', sans-serif; letter-spacing: 0.08em; font-size: 1rem; padding: 12px 38px; border-radius: 999px; background: transparent; color: rgba(255,255,255,0.75); border: 1px solid rgba(255,255,255,0.25); cursor: pointer; transition: transform 0.25s ease, border-color 0.25s ease, color 0.25s ease; white-space: nowrap; }
  .cta-btn-secondary:hover { transform: translateY(-3px); border-color: rgba(255,255,255,0.6); color: white; }
`;

const MarqueeRow: React.FC<MarqueeRowProps> = ({ children, direction, speed = 1.2 }) => {
    const trackRef = useRef<HTMLDivElement>(null);
    const isDragging = useRef(false);
    const startX = useRef(0);
    const currentTranslate = useRef(direction === "left" ? 0 : 0);
    const startTranslate = useRef(0);
    const singleSetWidth = useRef(0);

    useEffect(() => {
        const updateWidth = () => {
            if (trackRef.current) {
                singleSetWidth.current = trackRef.current.scrollWidth / 2;
            }
        };
        updateWidth();

        const ro = new ResizeObserver(updateWidth);
        if (trackRef.current) ro.observe(trackRef.current);
        return () => ro.disconnect();
    }, [children]);

    useEffect(() => {
        let animationId: number;

        const animate = () => {
            if (!isDragging.current && singleSetWidth.current > 0) {
                if (direction === "left") {
                    currentTranslate.current -= speed;
                    if (currentTranslate.current <= -singleSetWidth.current) {
                        currentTranslate.current += singleSetWidth.current;
                    }
                } else {
                    currentTranslate.current += speed;
                    if (currentTranslate.current >= 0) {
                        currentTranslate.current -= singleSetWidth.current;
                    }
                }
            }

            if (trackRef.current) {
                trackRef.current.style.transform = `translateX(${currentTranslate.current}px)`;
            }
            animationId = requestAnimationFrame(animate);
        };

        animationId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationId);
    }, [direction, speed]);

    const handleDragStart = (clientX: number) => {
        isDragging.current = true;
        startX.current = clientX;
        startTranslate.current = currentTranslate.current;
        if (trackRef.current) trackRef.current.style.cursor = "grabbing";
    };

    const handleDragMove = (clientX: number) => {
        if (!isDragging.current) return;
        const dx = clientX - startX.current;

        let newTranslate = startTranslate.current + dx;

        if (singleSetWidth.current > 0) {
            if (newTranslate <= -singleSetWidth.current) {
                newTranslate += singleSetWidth.current;
                startTranslate.current += singleSetWidth.current;
            } else if (newTranslate >= 0) {
                newTranslate -= singleSetWidth.current;
                startTranslate.current -= singleSetWidth.current;
            }
        }

        currentTranslate.current = newTranslate;
    };

    const handleDragEnd = () => {
        isDragging.current = false;
        if (trackRef.current) trackRef.current.style.cursor = "grab";
    };

    const onMouseDown = (e: React.MouseEvent) => {
        e.preventDefault();
        handleDragStart(e.clientX);

        const onMouseMove = (ev: MouseEvent) => handleDragMove(ev.clientX);
        const onMouseUp = () => {
            handleDragEnd();
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseup", onMouseUp);
        };

        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseup", onMouseUp);
    };

    const onTouchStart = (e: React.TouchEvent) => {
        handleDragStart(e.touches[0].clientX);

        const onTouchMove = (ev: TouchEvent) => handleDragMove(ev.touches[0].clientX);
        const onTouchEnd = () => {
            handleDragEnd();
            window.removeEventListener("touchmove", onTouchMove);
            window.removeEventListener("touchend", onTouchEnd);
        };

        window.addEventListener("touchmove", onTouchMove);
        window.addEventListener("touchend", onTouchEnd);
    };

    return (
        <div style={{ overflow: "hidden" }}>
            <div
                ref={trackRef}
                style={{
                    display: "flex",
                    width: "max-content",
                    cursor: "grab",
                    touchAction: "pan-y",
                }}
                onMouseDown={onMouseDown}
                onTouchStart={onTouchStart}
            >
                {children}
                {children}
            </div>
        </div>
    );
};

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

/* ── Title / ALT helpers: every book's name comes from ROW_TOP + ROW_BOTTOM ── */
const BOOK_TITLES: Record<string, string> = Object.fromEntries(
    [...ROW_TOP, ...ROW_BOTTOM].map(b => [b.src, b.title])
);
const bookTitle = (src: string) => BOOK_TITLES[src] ?? "Book Cover";
const toAlt = (text: string) => text.replace(/\s+/g, "-");

const contactStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

  @keyframes fadeUpContact { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes fadeLeft { from { opacity: 0; transform: translateX(-40px); } to { opacity: 1; transform: translateX(0); } }
  @keyframes fadeRight { from { opacity: 0; transform: translateX(40px); } to { opacity: 1; transform: translateX(0); } }
  @keyframes rotateSlow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
  @keyframes orbPulse { 0%, 100% { opacity: 0.45; transform: scale(1); } 50% { opacity: 0.75; transform: scale(1.1); } }
  @keyframes floatOrb { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-12px); } }
  @keyframes successPop { 0% { opacity: 0; transform: scale(0.7); } 70% { transform: scale(1.08); } 100% { opacity: 1; transform: scale(1); } }
  @keyframes checkDraw { from { stroke-dashoffset: 40; } to { stroke-dashoffset: 0; } }

  .field-wrap { position: relative; }
  .field-input { width: 100%; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1); border-radius: 14px; padding: 18px 20px 18px 56px; color: white; font-family: 'DM Sans', sans-serif; font-size: 0.95rem; font-weight: 300; outline: none; transition: border-color 0.3s ease, background 0.3s ease, box-shadow 0.3s ease; box-sizing: border-box; caret-color: #FF4545; }
  .field-input::placeholder { color: rgba(255,255,255,0.25); }
  .field-input:focus { border-color: rgba(255,69,69,0.6); background: rgba(255,69,69,0.04); box-shadow: 0 0 0 3px rgba(255,69,69,0.1), 0 8px 32px rgba(0,0,0,0.3); }
  .field-input:focus + .field-icon { color: #FF4545 !important; }
  .field-icon { position: absolute; left: 18px; top: 50%; transform: translateY(-50%); color: rgba(255,255,255,0.25); transition: color 0.3s ease; pointer-events: none; display: flex; align-items: center; }
  .field-icon-textarea { top: 20px; transform: none; }
  .field-label { position: absolute; left: 56px; top: 18px; font-family: 'DM Sans', sans-serif; font-size: 0.92rem; color: rgba(255,255,255,0.25); pointer-events: none; transition: all 0.25s cubic-bezier(0.22,1,0.36,1); transform-origin: left; }
  .field-input:focus ~ .field-label, .field-input:not(:placeholder-shown) ~ .field-label { top: -10px; left: 14px; font-size: 0.72rem; color: #FF4545; background: #0a0e2a; padding: 0 6px; border-radius: 4px; letter-spacing: 0.06em; }
  textarea.field-input { resize: none; padding-top: 18px; line-height: 1.65; min-height: 140px; }
  .submit-btn { width: 100%; padding: 18px; border-radius: 14px; background: linear-gradient(90deg, #FF4545 0%, #fe5858 100%); color: white; font-family: 'Bebas Neue', sans-serif; font-size: 1.1rem; letter-spacing: 0.15em; border: none; cursor: pointer; position: relative; overflow: hidden; transition: transform 0.25s ease, box-shadow 0.25s ease; box-shadow: 0 8px 32px rgba(255,69,69,0.3); display: flex; align-items: center; justify-content: center; gap: 10px; }
  .submit-btn::before { content: ''; position: absolute; inset: 0; background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.12) 50%, transparent 100%); transform: translateX(-100%); transition: transform 0.5s ease; }
  .submit-btn:hover { transform: translateY(-3px); box-shadow: 0 16px 48px rgba(255,69,69,0.45); }
  .submit-btn:hover::before { transform: translateX(100%); }
  .submit-btn:active { transform: translateY(-1px); }
  .info-card { transition: transform 0.3s ease, border-color 0.3s ease; }
  .info-card:hover { transform: translateX(6px); border-color: rgba(255,69,69,0.4) !important; }
`;

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

interface MarqueeRowProps {
    children: React.ReactNode;
    direction: "left" | "right";
    speed?: number;
}

interface BookCardProps {
    item: { src: string; title: string; genre: string };
    height?: number;
    width?: number;
}

const INFO_ITEMS = [
    {
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.7A2 2 0 012 .99h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
            </svg>
        ),
        label: "Phone",
        value: "(737) 385-5397",
    },
    {
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
            </svg>
        ),
        label: "Email",
        value: "info@bristolpublishers.com",
    },
];

const BookCard: React.FC<BookCardProps> = ({ item, height = 260, width = 180 }) => (
    <div className="portfolio-img-card" style={{ width: `${width}px`, height: `${height}px`, margin: "0 10px" }}>
        <img src={item.src} alt={toAlt(item.title)} title={item.title} style={{ width: "100%", height: "100%", objectFit: "cover" }}
            onError={e => {
                const t = e.currentTarget; t.style.display = "none"; const parent = t.parentElement!;
                parent.style.background = `hsl(${Math.random() * 360}, 25%, 18%)`;
                const fb = document.createElement("div"); fb.style.cssText = `width:100%;height:100%;display:flex;align-items:center;justify-content:center;padding:16px;`;
                fb.innerHTML = `<span style="font-family:'Bebas Neue',sans-serif;font-size:1rem;color:rgba(255,255,255,0.35);text-align:center;letter-spacing:0.05em;">${item.title}</span>`;
                parent.appendChild(fb);
            }}
        />
        <div className="overlay">
            <div>
                <p className="overlay-label">{item.title}</p>
                <p className="overlay-sub">{item.genre}</p>
            </div>
        </div>
        <div style={{ position: "absolute", top: 0, right: 0, width: "3px", height: "40px", background: "linear-gradient(to bottom, #FF4545, transparent)", borderRadius: "0 14px 0 0" }} />
    </div>
);

function useApInView(threshold = 0.12) {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const el = ref.current; if (!el) return;
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold });
        obs.observe(el);
        return () => obs.disconnect();
    }, [threshold]);
    return { ref, visible };
}

const SCATTERED_BOOKS = [
    { src: "/images/Portfolio/22.jpg", top: "110px", left: "5%", right: undefined as string | undefined, w: 170, h: 235, rot: -10, delay: 0.1 },
    { src: "/images/Portfolio/11.jpg", top: "380px", left: "3%", right: undefined as string | undefined, w: 185, h: 250, rot: 5, delay: 0.25 },
    { src: "/images/Portfolio/04.jpg", top: "130px", left: undefined as string | undefined, right: "5%", w: 170, h: 235, rot: 9, delay: 0.15 },
    { src: "/images/Portfolio/19.jpg", top: "400px", left: undefined as string | undefined, right: "3%", w: 155, h: 215, rot: -6, delay: 0.3 },
];

const PUBLISHING_FAQS = [
    { q: "What publishing formats do you offer?", a: "We offer comprehensive publishing in Print (Paperback and Hardcover), eBook (ePub, Mobi, PDF), and Audiobook formats. Our team ensures your book meets all platform specifications globally." },
    { q: "Do I retain the rights to my book?", a: "Absolutely. You retain 100% of your copyrights and royalties. We act as your publishing partner, providing the services you need while you maintain complete ownership and creative control." },
    { q: "How long does the publishing process take?", a: "The timeline varies based on the services required. A standard publishing package typically takes 4 to 8 weeks from manuscript finalization to market availability, including formatting, cover design, and distribution setup." },
    { q: "Will my book be available in bookstores?", a: "Yes! We distribute your book to major retailers including Amazon, Barnes & Noble, Ingram, and Apple Books. This makes your book available to order in physical bookstores worldwide." },
    { q: "Do you provide ISBN and copyright registration?", a: "Yes, we provide a free ISBN for both your print and eBook versions, and we guide you through the copyright registration process to ensure your work is legally protected." },
];

const FAQ_BOOKS = [
    { src: "/images/Portfolio/07.jpg", w: 180, h: 260, rot: -6, z: 1, x: "0px", y: "20px" },
    { src: "/images/Portfolio/03.jpg", w: 190, h: 270, rot: 4, z: 2, x: "60px", y: "0px" },
    { src: "/images/Portfolio/09.jpg", w: 185, h: 265, rot: -3, z: 3, x: "120px", y: "30px" },
];

const openLiveChat = () => {
    const livechat = (window as any).LiveChatWidget;
    if (livechat) {
        livechat.call("maximize");
    }
};

const PublishingHero: React.FC = () => {
    const { ref, visible } = useApInView(0.05);

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
                            <img src={b.src} alt={toAlt(bookTitle(b.src))} title={bookTitle(b.src)} style={{ width: "100%", height: `${b.h}px`, objectFit: "cover", display: "block", borderRadius: "10px", filter: "brightness(.85) saturate(1.1) contrast(1.05)", boxShadow: "0 24px 60px rgba(0,0,0,.7), inset 0 0 30px rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)" }}
                                onError={e => { e.currentTarget.style.display = "none"; const p = e.currentTarget.parentElement as HTMLElement; const absW = p.parentElement as HTMLElement; absW.style.height = `${b.h}px`; absW.style.borderRadius = "10px"; absW.style.background = `linear-gradient(135deg, hsl(${i * 25 + 340},30%,15%), hsl(${i * 25 + 350},40%,22%))`; absW.style.border = "1px solid rgba(255,255,255,.1)"; }} />
                        </div>
                    </div>
                );
            })}

            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", zIndex: 2, pointerEvents: "none", width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(circle,rgba(80,130,255,.06) 0%,transparent 65%)" }} />
            <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", zIndex: 4, padding: "120px 360px 100px", paddingTop: "140px", textAlign: "center" }}>
                <div style={{ maxWidth: "820px", width: "100%" }}>
                    <div style={{ display: "inline-flex", alignItems: "center", gap: "12px", marginBottom: "24px", opacity: visible ? 1 : 0, animation: visible ? "ap-fadeUp .5s ease .1s forwards" : "none" }}>
                        <div style={{ width: visible ? "32px" : "0", height: "2px", background: "#FF4545", transition: "width .8s ease .3s" }} />
                        <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: ".75rem", letterSpacing: ".3em", color: "#FF4545", fontWeight: 600 }}>PUBLISHING SERVICES</span>
                        <div style={{ width: visible ? "32px" : "0", height: "2px", background: "#FF4545", transition: "width .8s ease .3s" }} />
                    </div>
                    <h1 style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 800, fontSize: "clamp(2rem,3.8vw,3.4rem)", letterSpacing: "-.025em", lineHeight: 1.1, color: "white", margin: "0 0 28px", opacity: visible ? 1 : 0, animation: visible ? "ap-fadeUp .7s ease .2s forwards" : "none" }}>
                        Transform Your Manuscript Into<br /><span style={{ color: "#FF4545" }}>A Published Book</span>
                    </h1>
                    <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "1.05rem", lineHeight: 1.85, color: "rgba(255,255,255,.52)", fontWeight: 300, margin: "0 auto 38px", maxWidth: "560px", opacity: visible ? 1 : 0, animation: visible ? "ap-fadeUp .7s ease .38s forwards" : "none" }}>
                        Navigate the publishing world with confidence. From formatting and editing to global distribution, we provide end-to-end book publishing services designed to bring your stories to readers everywhere.
                    </p>
                    <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap", opacity: visible ? 1 : 0, animation: visible ? "ap-fadeUp .7s ease .5s forwards" : "none" }}>
                        <button onClick={() => openQuoteModal()} className="ap-btn-primary" style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 700, fontSize: ".92rem", letterSpacing: ".08em", padding: "14px 42px", borderRadius: "999px", background: "linear-gradient(90deg,#fe5858 0%,#FF4545 100%)", color: "#fff", border: "none", cursor: "pointer", boxShadow: "0 8px 28px rgba(255,69,69,.4)" }}>Start Publishing</button>
                        <button onClick={openLiveChat} className="ap-btn-outline" style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 600, fontSize: ".92rem", letterSpacing: ".06em", padding: "13px 42px", borderRadius: "999px", background: "transparent", color: "rgba(255,255,255,.7)", border: "1px solid rgba(255,255,255,.22)", cursor: "pointer" }}>Live Chat</button>
                    </div>
                </div>
            </div>
        </section>
    );
};

const PublishingMarquee: React.FC = () => {
    const { ref, visible } = useApInView(0.05);
    return (
        <section ref={ref} style={{ background: "linear-gradient(180deg, #FFFFFF 0%, #FFF9F9 25%, #FFE8E8 55%, #FFD6D6 80%, #FFFFFF 100%)", width: "100%", overflow: "hidden", padding: "100px 0 110px", position: "relative" }}>
            <div style={{ position: "absolute", top: "20%", left: "-6%", width: "450px", height: "450px", borderRadius: "50%", background: "radial-gradient(circle, rgba(255,69,69,0.7) 0%, transparent 65%)", animation: "orbPulse 7s ease-in-out infinite", pointerEvents: "none" }} />
            <div style={{ position: "absolute", bottom: "15%", right: "-5%", width: "380px", height: "380px", borderRadius: "50%", background: "radial-gradient(circle, rgba(255,69,69,0.7) 0%, transparent 70%)", pointerEvents: "none" }} />

            <div style={{ maxWidth: "1200px", margin: "0 auto 60px", padding: "0 40px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "22px", opacity: visible ? 1 : 0, animation: visible ? "fadeUp 0.6s ease forwards" : "none" }}>
                    <div style={{ height: "2px", background: "#FF4545", width: visible ? "48px" : "0", transition: "width 0.8s ease 0.2s" }} />
                    <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "0.85rem", letterSpacing: "0.25em", color: "#FF4545" }}>PUBLISHED BOOKS</span>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "20px" }}>
                    <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: "clamp(2.5rem, 4.5vw, 4.5rem)", letterSpacing: "-0.02em", lineHeight: 0.9, color: "white", margin: 0 }}>
                        {visible && (<>
                            <SplitText text="Recently" className="text-[#0A0A0A]" delay={35} duration={1.1} ease="power3.out" splitType="chars" from={{ opacity: 0, y: 45 }} to={{ opacity: 1, y: 0 }} threshold={0.1} rootMargin="-50px" textAlign="left" />{" "}
                            <SplitText text="Published" className="text-[#FF4545]" delay={42} duration={1.2} ease="power3.out" splitType="chars" from={{ opacity: 0, y: 45 }} to={{ opacity: 1, y: 0 }} threshold={0.1} rootMargin="-50px" textAlign="left" />
                        </>)}
                    </h2>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1.1rem", lineHeight: 1.75, color: "#0A0A0A", maxWidth: "340px", margin: 0, fontWeight: 300, opacity: visible ? 1 : 0, animation: visible ? "fadeUp 0.7s ease 0.3s forwards" : "none" }}>
                        We have helped hundreds of authors bring their manuscripts to life. Browse through our collection of professionally published works spanning multiple genres and formats.
                    </p>
                </div>
            </div>

            <div style={{ position: "relative", marginBottom: "16px" }}>
                <MarqueeRow direction="left" speed={1.2}>
                    {ROW_TOP.map((item, i) => (<BookCard key={i} item={item} height={400} width={250} />))}
                </MarqueeRow>
            </div>

            <div style={{ position: "relative" }}>
                <MarqueeRow direction="right" speed={1.2}>
                    {ROW_BOTTOM.map((item, i) => (<BookCard key={i} item={item} height={400} width={250} />))}
                </MarqueeRow>
            </div>
        </section>
    );
};

const PublishingCTA: React.FC = () => {
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

const PublishingFAQ: React.FC = () => {
    const { ref, visible } = useApInView(0.08);
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section ref={ref} style={{ background: "linear-gradient(180deg,#FFFFFF 0%,#FFF9F9 30%,#FFE8E8 60%,#FFD6D6 85%,#FFFFFF 100%)", width: "100%", overflow: "hidden", padding: "110px 0 100px", position: "relative" }}>
            <div style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none", backgroundImage: `linear-gradient(rgba(0,0,0,.02) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,.02) 1px,transparent 1px)`, backgroundSize: "60px 60px" }} />
            <div style={{ position: "absolute", top: "10%", left: "-6%", width: "450px", height: "450px", borderRadius: "50%", background: "radial-gradient(circle,rgba(255,69,69,.08) 0%,transparent 65%)", pointerEvents: "none" }} />

            <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 48px", position: "relative", zIndex: 1 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 400px", gap: "80px", alignItems: "center" }}>
                    <div style={{ opacity: visible ? 1 : 0, animation: visible ? "ap-fadeLeft .85s ease .2s forwards" : "none" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "22px" }}>
                            <div style={{ height: "2px", background: "#FF4545", width: visible ? "36px" : "0", transition: "width .8s ease .2s" }} />
                            <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: ".8rem", letterSpacing: ".28em", color: "#FF4545", fontWeight: 600 }}>PUBLISHING FAQS</span>
                        </div>
                        <h2 style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 800, fontSize: "clamp(2rem,4vw,3.2rem)", letterSpacing: "-.025em", lineHeight: 1.1, color: "#0A0A0A", marginBottom: "42px" }}>
                            Publishing & Distribution<br /><span style={{ color: "#FF4545" }}>Questions</span>
                        </h2>
                        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                            {PUBLISHING_FAQS.map((faq, i) => {
                                const isOpen = openIndex === i;
                                return (
                                    <div key={i} onClick={() => setOpenIndex(isOpen ? null : i)} style={{ background: isOpen ? "rgba(255,255,255,.8)" : "rgba(255,255,255,.5)", border: `1px solid ${isOpen ? "rgba(255,69,69,.3)" : "rgba(0,0,0,.08)"}`, borderRadius: "14px", padding: "22px 24px", cursor: "pointer", transition: "background .3s ease, border-color .3s ease, box-shadow .3s ease", boxShadow: isOpen ? "0 8px 30px rgba(255,69,69,.08)" : "0 4px 15px rgba(0,0,0,.03)", backdropFilter: "blur(8px)" }}>
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

const PublishingPage: React.FC = () => (
    <>
        <style>{pageStyles}</style>
        <PublishingHero />
        <PublishingMarquee />
        <PublishingCTA />
        <PublishingFAQ />
        <ContactForm />
    </>
);

export default PublishingPage;