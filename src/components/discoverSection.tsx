import React, { useEffect, useRef, useState, useCallback } from "react";

const fontStyle = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;800&display=swap');

  @keyframes eqBounce {
    0%, 100% { transform: scaleY(1); }
    50% { transform: scaleY(0.4); }
  }
`;

interface BlobShape {
    color: string;
    size: number;
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
    blur: number;
    opacity: number;
}

interface Category {
    label: string;
    gradient: string;
    activeHeight: number;
    activeWidth: number;
    icon: React.ReactNode;
    accent: string; // Added accent color for waves
    blobs?: BlobShape[];
}

const SocietyIcon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
);

const TechIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
);

const MusicIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" />
    </svg>
);

const ComedyIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
);

const CATEGORIES: Category[] = [
    {
        label: "Society &\nCulture",
        gradient: "linear-gradient(160deg,#70c8e8 0%,#a0d4b0 35%,#e8a060 75%,#e06830 100%)",
        activeHeight: 310,
        activeWidth: 175,
        icon: <SocietyIcon />,
        accent: "#e06830", // Orange-ish
        blobs: [
            { color: "#40e0f0", size: 160, top: "-30px", left: "-20px", blur: 50, opacity: 0.4 },
            { color: "#ff8040", size: 130, bottom: "-20px", right: "-10px", blur: 45, opacity: 0.5 }
        ]
    },
    {
        label: "Tech &\nFuture",
        gradient: "linear-gradient(160deg,#c8a878 0%,#e07840 40%,#d05820 100%)",
        activeHeight: 285,
        activeWidth: 165,
        icon: <TechIcon />,
        accent: "#d05820", // Deep Orange
        blobs: [
            { color: "#ffe0a0", size: 140, top: "-20px", right: "-20px", blur: 50, opacity: 0.4 },
            { color: "#802000", size: 100, bottom: "10px", left: "10px", blur: 40, opacity: 0.3 }
        ]
    },
    {
        label: "Music &\nSounds",
        gradient: "linear-gradient(160deg,#78e8d8 0%,#50c8f0 40%,#4090e0 80%,#3060c8 100%)",
        activeHeight: 300,
        activeWidth: 175,
        icon: <MusicIcon />,
        accent: "#3060c8", // Blue
        blobs: [
            { color: "#60ffa0", size: 150, top: "-40px", left: "20px", blur: 50, opacity: 0.4 },
            { color: "#2040d0", size: 140, bottom: "-30px", right: "-20px", blur: 50, opacity: 0.5 }
        ]
    },
    {
        label: "Comedy\nTalks",
        gradient: "linear-gradient(160deg,#60a8e8 0%,#4888d8 50%,#3060b8 100%)",
        activeHeight: 240,
        activeWidth: 155,
        icon: <ComedyIcon />,
        accent: "#4888d8", // Light Blue
        blobs: [
            { color: "#80d0ff", size: 140, top: "-20px", left: "-20px", blur: 50, opacity: 0.4 },
            { color: "#1030a0", size: 120, bottom: "-20px", right: "10px", blur: 45, opacity: 0.4 }
        ]
    },
];

// Mapped sound waves to specific category indices (0 to 3)
const EQ_ITEMS = [
    { h: 320, cat: 0 }, { h: 180, cat: 0 }, { h: 360, cat: 0 }, { h: 140, cat: 0 },
    { h: 280, cat: 1 }, { h: 100, cat: 1 }, { h: 340, cat: 1 },
    { h: 160, cat: 2 }, { h: 300, cat: 2 }, { h: 120, cat: 2 }, { h: 260, cat: 2 },
    { h: 200, cat: 3 }, { h: 240, cat: 3 }, { h: 150, cat: 3 }
];

const DiscoverSection: React.FC = () => {
    const [activeIdx, setActiveIdx] = useState(0);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const startAuto = useCallback(() => {
        if (timerRef.current) clearInterval(timerRef.current);
        timerRef.current = setInterval(() => {
            setActiveIdx((prev) => (prev + 1) % CATEGORIES.length);
        }, 2200);
    }, []);

    useEffect(() => {
        startAuto();
        return () => { if (timerRef.current) clearInterval(timerRef.current); };
    }, [startAuto]);

    const handleClick = (idx: number) => {
        setActiveIdx(idx);
        startAuto();
    };

    return (
        <>
            <style>{fontStyle}</style>
            <section className="w-full relative overflow-hidden bg-[#1c0b05] py-14 px-12 font-['Inter',sans-serif] min-h-[520px]">

                <div className="absolute w-[300px] h-[200px] rounded-full bg-[#c84000] -top-10 right-[100px] blur-[90px] opacity-[0.18] pointer-events-none z-0" />

                <div className="flex justify-between items-start mb-11 relative z-10">
                    <p className="max-w-[340px] text-white/50 text-[1.2rem] leading-tight pt-1.5">
                        From deep-dive interviews to casual banter and true crime thrills — we've got something for every listener.
                    </p>
                    <div className="text-right">
                        <h2 className="font-['Bebas_Neue',sans-serif] text-[clamp(4.8rem,7vw,6.2rem)] leading-[0.95] text-white tracking-tight">
                            Let's Discover Your
                            <span className="text-[#e85d00] block">Favorite Talks</span>
                        </h2>
                    </div>
                </div>

                <div className="flex items-end w-full h-[400px] relative z-10 gap-3">

                    {CATEGORIES.map((cat, i) => {
                        const isActive = i === activeIdx;
                        const lines = cat.label.split("\n");

                        return (
                            <div
                                key={i}
                                onClick={() => handleClick(i)}
                                className={`relative rounded-[22px] overflow-hidden cursor-pointer flex-shrink-0 transition-all duration-500 ease-out ${isActive ? "shadow-[0_20px_50px_-12px_rgba(0,0,0,0.6)] z-20" : "opacity-40 z-10"}`}
                                style={{
                                    width: isActive ? cat.activeWidth : 98,
                                    height: isActive ? cat.activeHeight : 280,
                                }}
                            >
                                <div className="absolute inset-0 rounded-[22px]" style={{ background: cat.gradient }} />

                                {cat.blobs?.map((blob, idx) => (
                                    <div
                                        key={idx}
                                        className="absolute rounded-full pointer-events-none"
                                        style={{
                                            background: blob.color,
                                            width: blob.size,
                                            height: blob.size,
                                            top: blob.top,
                                            bottom: blob.bottom,
                                            left: blob.left,
                                            right: blob.right,
                                            filter: `blur(${blob.blur}px)`,
                                            opacity: blob.opacity,
                                        }}
                                    />
                                ))}

                                <div className="absolute inset-0 rounded-[22px] shadow-[inset_0_0_30px_rgba(0,0,0,0.25)] z-[2]" />
                                <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/[0.12] to-transparent rounded-t-[22px] z-[2]" />

                                <div className="absolute top-4 left-4 text-white/90 z-[3]">
                                    {cat.icon}
                                </div>

                                <div className={`absolute bottom-4 left-4 right-4 font-['Inter',sans-serif] font-extrabold text-white leading-tight z-[3] transition-all duration-300 ${isActive ? "opacity-100 text-lg" : "opacity-0 text-[0px]"}`}>
                                    {lines.map((line, li) => (
                                        <span key={li} className="block">{line}</span>
                                    ))}
                                </div>
                            </div>
                        );
                    })}

                    {/* Connected Sound Waves */}
                    <div className="flex-1 h-full flex items-end gap-[8px]">
                        {EQ_ITEMS.map((item, i) => {
                            const isActiveCat = item.cat === activeIdx;
                            const catAccent = CATEGORIES[item.cat].accent;

                            return (
                                <div
                                    key={i}
                                    className="flex-1 rounded-t-full origin-bottom cursor-pointer transition-all duration-500 ease-out"
                                    style={{
                                        height: `${item.h}px`,
                                        opacity: isActiveCat ? 1 : 0.25,
                                        background: isActiveCat
                                            ? `linear-gradient(to top, ${catAccent}44, ${catAccent}bb)`
                                            : "linear-gradient(to top, rgba(255,255,255,0.04), rgba(255,255,255,0.15))",
                                        animation: isActiveCat
                                            ? `eqBounce ${1.1 + (i * 0.08)}s ease-in-out ${i * 0.1}s infinite alternate`
                                            : "none",
                                        transform: !isActiveCat ? "scaleY(0.4)" : undefined,
                                    }}
                                    onMouseEnter={() => handleClick(item.cat)}
                                />
                            );
                        })}
                    </div>
                </div>

                {/* Bottom text */}
                <div className="mt-7 text-right relative z-10">
                    <p className="text-lg text-white/50">
                        And yes, there's a filter for{" "}
                        <em className="italic text-[#e85d00]">
                            "only for good vibes."
                        </em>
                    </p>
                </div>
            </section>
        </>
    );
};

export default DiscoverSection;