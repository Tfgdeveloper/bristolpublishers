import React, { useState, useRef, useCallback } from "react";

const CARD_HEIGHT = 320;

interface Podcast {
    title: string;
    host: string;
    desc: string;
    accent: string;
    gradient: string;
}

const PODCASTS: Podcast[] = [
    {
        title: "Mind Over Hype",
        host: "Livia Tran",
        desc: "A fresh perspective on mental clarity and productivity. It's not just self-help; it's science-based and personal.",
        accent: "#e85d00",
        gradient: "linear-gradient(135deg,#a0d8c0,#68b8e8 50%,#e8a060)",
    },
    {
        title: "Culture Pulse",
        host: "Darren Malik",
        desc: "A real-time pulse on what's shaping culture, told intimately and precisely.",
        accent: "#e85d00",
        gradient: "linear-gradient(135deg,#58c898,#e87848 55%,#e05828)",
    },
    {
        title: "The Quiet Investor",
        host: "Emma Raines",
        desc: "Calm, data-driven conversations about money, markets, and the long game.",
        accent: "#1e5fb0",
        gradient: "linear-gradient(135deg,#2858c8,#4888e0 45%,#88b8f0)",
    },
    {
        title: "Track Therapy",
        host: "Ray & Chi",
        desc: "Spontaneous, deeply touching moments. A feel-good boost for your midweek blues.",
        accent: "#7838b0",
        gradient: "linear-gradient(135deg,#8848c8,#b858a0 45%,#e87898)",
    },
    {
        title: "Echoes The OG",
        host: "Whispr Studios",
        desc: "An immersive storytelling series combining sound design with narrative fiction.",
        accent: "#285050",
        gradient: "linear-gradient(135deg,#184040,#286868 45%,#48a890)",
    },
];

const MicIcon = ({ size = 12, color = "currentColor" }: { size?: number; color?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
        <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
        <line x1="12" y1="19" x2="12" y2="23" />
    </svg>
);

const ArrowIcon = ({ color = "white", size = 13 }: { color?: string; size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 17L17 7M17 7H7M17 7v10" />
    </svg>
);

const PersonIcon = () => (
    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="1.2" strokeLinecap="round">
        <circle cx="12" cy="8" r="5" />
        <path d="M3 21c0-5 3.8-9 9-9s9 4 9 9" />
    </svg>
);

interface HoverCardProps {
    podcast: Podcast;
    visible: boolean;
    topPx: number;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
}

const HoverCard: React.FC<HoverCardProps> = ({ podcast, visible, topPx, onMouseEnter, onMouseLeave }) => (
    <div
        className="absolute right-4 w-64 rounded-[20px] overflow-hidden z-[100] shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
        style={{
            top: topPx,
            background: "#f5f0e8",
            opacity: visible ? 1 : 0,
            transform: visible ? "scale(1)" : "scale(0.9)",
            pointerEvents: visible ? "auto" : "none",
            transition:
                "opacity 0.3s cubic-bezier(0.4,0,0.2,1), transform 0.35s cubic-bezier(0.4,0,0.2,1), top 0.38s cubic-bezier(0.4,0,0.2,1)",
        }}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
    >
        <div className="flex items-center justify-between px-3.5 pt-3.5 pb-2.5">
            <div
                className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: podcast.accent }}
            >
                <MicIcon size={14} color="white" />
            </div>
            <div className="flex-1 px-2 text-right">
                <p className="text-[0.95rem] font-extrabold leading-tight" style={{ color: "#1a0a04" }}>
                    {podcast.title}
                </p>
                <p className="text-[0.7rem] mt-0.5" style={{ color: "rgba(26,10,4,0.5)" }}>
                    By : {podcast.host}
                </p>
            </div>
            <div
                className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: podcast.accent }}
            >
                <ArrowIcon />
            </div>
        </div>

        <div
            className="w-full h-52 flex items-center justify-center"
            style={{ background: podcast.gradient }}
        >
            <PersonIcon />
        </div>

        <div
            className="flex items-center justify-center gap-2 mx-3.5 my-3 py-2.5 rounded-full text-white text-[0.8rem] font-bold cursor-pointer"
            style={{ background: podcast.accent }}
        >
            Join Show Now
            <div className="w-[22px] h-[22px] rounded-full bg-white flex items-center justify-center">
                <ArrowIcon color={podcast.accent} size={11} />
            </div>
        </div>
    </div>
);

const TrendingSection: React.FC = () => {
    const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
    const [cardTop, setCardTop] = useState(0);
    const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const rightColRef = useRef<HTMLDivElement>(null);
    const rowRefs = useRef<(HTMLDivElement | null)[]>([]);

    const handleMouseEnterRow = useCallback((idx: number) => {
        if (hideTimeoutRef.current) {
            clearTimeout(hideTimeoutRef.current);
            hideTimeoutRef.current = null;
        }

        const row = rowRefs.current[idx];
        const col = rightColRef.current;
        if (!row || !col) return;

        const colH = col.offsetHeight;
        const rowMid = row.offsetTop + row.offsetHeight / 2;
        const half = CARD_HEIGHT / 2;
        const padding = 12;

        const clamped = Math.min(
            Math.max(rowMid - half, padding),
            colH - CARD_HEIGHT - padding
        );

        setCardTop(clamped);
        setHoveredIdx(idx);
    }, []);

    const handleMouseLeaveRow = useCallback(() => {
        // Add a small delay before hiding the card to let the mouse travel to the floating card
        hideTimeoutRef.current = setTimeout(() => {
            setHoveredIdx(null);
        }, 150); // 150ms is enough time to move the mouse
    }, []);

    const handleCardMouseEnter = useCallback(() => {
        // Cancel the hide timeout if the mouse successfully enters the card
        if (hideTimeoutRef.current) {
            clearTimeout(hideTimeoutRef.current);
            hideTimeoutRef.current = null;
        }
    }, []);

    const handleCardMouseLeave = useCallback(() => {
        // Hide immediately when leaving the card
        setHoveredIdx(null);
    }, []);

    const activePodcast = hoveredIdx !== null ? PODCASTS[hoveredIdx] : PODCASTS[0];

    return (
        <section
            className="relative w-full overflow-hidden grid bg-[#1c0b05] min-h-[600px]"
            style={{ gridTemplateColumns: "50% 50%", fontFamily: "'Inter', sans-serif" }}
        >
            <div className="absolute w-64 h-44 rounded-full pointer-events-none"
                style={{ background: "#b83800", top: -20, left: 0, filter: "blur(80px)", opacity: 0.16, zIndex: 0 }}
            />

            <div className="relative z-[2] px-10 py-16 pl-12">
                <h2 className="font-extrabold leading-[1.05] tracking-tight text-white"
                    style={{ fontSize: "clamp(4.8rem,5vw,6.2rem)" }}
                >
                    DISCOVER OUR{" "}
                    <span className="block text-[#e85d00]">TRENDING TALKS</span>
                </h2>
            </div>

            <div
                ref={rightColRef}
                className="relative z-[2] flex flex-col border-l border-white/[0.07]"
            >
                <HoverCard
                    podcast={activePodcast}
                    visible={hoveredIdx !== null}
                    topPx={cardTop}
                    onMouseEnter={handleCardMouseEnter}
                    onMouseLeave={handleCardMouseLeave}
                />

                {PODCASTS.map((pod, i) => (
                    <div
                        key={i}
                        ref={(el) => { rowRefs.current[i] = el; }}
                        onMouseEnter={() => handleMouseEnterRow(i)}
                        onMouseLeave={handleMouseLeaveRow}
                        className="grid items-center cursor-pointer transition-colors duration-200"
                        style={{
                            gridTemplateColumns: "1fr 1fr 36px",
                            padding: "24px 28px",
                            borderTop: i === 0 ? "1px solid rgba(255,255,255,0.07)" : "none",
                            borderBottom: i < PODCASTS.length - 1 ? "1px solid rgba(255,255,255,0.07)" : "none",
                            background: hoveredIdx === i ? "rgba(255,255,255,0.04)" : "transparent",
                        }}
                    >
                        <div>
                            <p className="text-white font-extrabold text-[1.25rem] leading-tight">
                                {pod.title}
                            </p>
                            <div className="flex items-center gap-1.5 mt-1.5 text-[0.8rem] font-medium text-white/45">
                                <MicIcon size={12} color="rgba(255,255,255,0.45)" />
                                {pod.host}
                            </div>
                        </div>

                        <p
                            className="text-[1rem] leading-relaxed pr-3 transition-colors duration-200"
                            style={{ color: hoveredIdx === i ? "rgba(255,255,255,0.55)" : "rgba(255,255,255,0.38)" }}
                        >
                            {pod.desc}
                        </p>

                        <div
                            className="justify-self-end text-[1rem] transition-all duration-200"
                            style={{
                                color: hoveredIdx === i ? "#e85d00" : "rgba(255,255,255,0.3)",
                                transform: hoveredIdx === i ? "translate(2px,-2px)" : "none",
                            }}
                        >
                            ↗
                        </div>
                    </div>
                ))}

                <div className="text-right px-7 py-4">
                    <a href="#" className="text-[0.85rem] font-semibold text-[#e85d00] no-underline inline-flex items-center gap-1.5 hover:gap-3 transition-all duration-200">
                        Load More →
                    </a>
                </div>
            </div>
        </section>
    );
};

export default TrendingSection;