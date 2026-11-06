import React, { useEffect, useRef, useState, useCallback } from "react";

const fontStyle = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;800&display=swap');

  @keyframes eqBounce {
    0%, 100% { transform: scaleY(0.3); }
    50% { transform: scaleY(1); }
  }
`;

interface Creator {
    name: string;
    show: string;
    img: string;
    accent: string;
    gradient: string;
}

const CREATORS: Creator[] = [
    {
        name: "Alexander Himawan",
        show: "Conqueror Convo",
        img: "/images/creator-1.jpg",
        accent: "#e85d00",
        gradient: "linear-gradient(160deg, #e85d00 0%, #d04800 100%)"
    },
    {
        name: "Sarah Lauravioza",
        show: "Vioza Talks",
        img: "/images/creator-2.jpg",
        accent: "#c83060",
        gradient: "linear-gradient(160deg, #c83060 0%, #a02050 100%)"
    },
    {
        name: "Josephyne Alexandria",
        show: "Alexandria Show",
        img: "/images/creator-3.jpg",
        accent: "#2858c8",
        gradient: "linear-gradient(160deg, #2858c8 0%, #1e40a0 100%)"
    },
    {
        name: "Michael Torres",
        show: "The Night Grind",
        img: "/images/creator-4.jpg",
        accent: "#20a080",
        gradient: "linear-gradient(160deg, #20a080 0%, #108060 100%)"
    },
    {
        name: "Emily Zhang",
        show: "Tech Unboxed",
        img: "/images/creator-5.jpg",
        accent: "#8040c0",
        gradient: "linear-gradient(160deg, #8040c0 0%, #6020a0 100%)"
    },
        {
        name: "Michael Torres",
        show: "The Night Grind",
        img: "/images/creator-4.jpg",
        accent: "#20a080",
        gradient: "linear-gradient(160deg, #20a080 0%, #108060 100%)"
    },
    {
        name: "Emily Zhang",
        show: "Tech Unboxed",
        img: "/images/creator-5.jpg",
        accent: "#8040c0",
        gradient: "linear-gradient(160deg, #8040c0 0%, #6020a0 100%)"
    }
];

const CreatorsSection: React.FC = () => {
    const [activeIdx, setActiveIdx] = useState(0);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const startAuto = useCallback(() => {
        if (timerRef.current) clearInterval(timerRef.current);
        timerRef.current = setInterval(() => {
            setActiveIdx((prev) => (prev + 1) % CREATORS.length);
        }, 3000);
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
            <section className="w-full relative overflow-hidden bg-[#1c0b05] py-20 px-12 font-['Inter',sans-serif] min-h-[700px] flex flex-col justify-center">

                <div className="absolute w-[500px] h-[300px] rounded-full bg-[#e85d00] top-0 left-1/2 -translate-x-1/2 blur-[150px] opacity-[0.12] pointer-events-none z-0" />

                <div className="relative z-10 text-center mb-16 max-w-3xl mx-auto">
                    <h2 className="font-['Bebas_Neue',sans-serif] text-[clamp(4.8rem,7vw,6.2rem)] leading-[0.95] text-white tracking-tight mb-6">
                        Behind Every Podcast <br/> <span className="text-[#e85d00]">is a Bold Voice.</span>
                    </h2>
                    <p className="text-white/50 text-[1.25rem] leading-tight">
                        We feature new podcasters every month and share their unique stories and content with the world.
                    </p>
                </div>

                <div className="relative z-10 flex items-end justify-center gap-4 h-[480px] w-full max-w-6xl mx-auto">

                    {CREATORS.map((creator, i) => {
                        const isActive = i === activeIdx;

                        return (
                            <div
                                key={i}
                                onClick={() => handleClick(i)}
                                className="relative rounded-[28px] overflow-hidden cursor-pointer transition-all duration-700 ease-out flex-shrink-0"
                                style={{
                                    width: isActive ? "380px" : "120px",
                                    height: isActive ? "480px" : "380px",
                                    background: isActive ? creator.gradient : "rgba(255,255,255,0.04)",
                                    boxShadow: isActive ? `0 25px 60px -15px ${creator.accent}88` : "0 10px 30px -10px rgba(0,0,0,0.3)"
                                }}
                            >
                                <div
                                    className="absolute inset-0 z-[1] transition-all duration-700 ease-out"
                                    style={{
                                        opacity: isActive ? 1 : 0,
                                        transform: isActive ? "scale(1)" : "scale(1.1)",
                                    }}
                                >
                                    <img
                                        src={creator.img}
                                        alt={creator.name}
                                        className="w-full h-full object-cover object-top"
                                        onError={(e) => {
                                            const target = e.currentTarget;
                                            target.style.display = 'none';
                                            if (target.parentElement) {
                                                target.parentElement.style.background = creator.gradient;
                                            }
                                        }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                                </div>

                                <div className="absolute inset-0 flex items-end justify-center gap-[6px] p-6 z-[2]">
                                    {[...Array(7)].map((_, barIdx) => (
                                        <div
                                            key={barIdx}
                                            className="flex-1 rounded-t-full origin-bottom transition-all duration-300"
                                            style={{
                                                background: isActive ? "rgba(255,255,255,0.35)" : "rgba(255,255,255,0.1)",
                                                height: "100%",
                                                animation: isActive ? `eqBounce ${1.2 + (barIdx * 0.15)}s ease-in-out ${barIdx * 0.1}s infinite alternate` : "none",
                                                transform: isActive ? "scaleY(1)" : "scaleY(0.15)"
                                            }}
                                        />
                                    ))}
                                </div>

                                <div
                                    className="absolute inset-0 flex items-center justify-center z-[3] transition-opacity duration-500"
                                    style={{ opacity: isActive ? 0 : 1 }}
                                >
                                    <div className="w-14 h-14 rounded-full border-2 border-white/20 flex items-center justify-center bg-black/20 backdrop-blur-sm">
                                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                                            <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                                            <line x1="12" y1="19" x2="12" y2="23" />
                                        </svg>
                                    </div>
                                </div>

                                <div
                                    className="absolute bottom-0 left-0 right-0 p-8 z-[4] transition-all duration-500 ease-out"
                                    style={{
                                        opacity: isActive ? 1 : 0,
                                        transform: isActive ? "translateY(0)" : "translateY(30px)",
                                    }}
                                >
                                    <p className="text-white font-extrabold text-2xl leading-tight mb-1">{creator.name}</p>
                                    <p className="text-white/70 text-sm font-medium mb-5">{creator.show}</p>

                                    <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-sm font-bold transition-transform hover:scale-105"
                                        style={{ color: creator.accent }}
                                    >
                                        Listen Now
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M7 17L17 7M17 7H7M17 7v10" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="relative z-10 flex justify-center mt-16">
                    <button
                        className={`group mt-9 inline-flex cursor-pointer items-center gap-2.5 rounded-full border-[1.5px] border-[#d4623a]/55 bg-transparent py-3 pl-6 pr-3.5 font-['Bebas_Neue'] text-sm tracking-[0.12em] text-[#d4623a] transition-all duration-200 hover:border-[#d4623a] hover:bg-[#d4623a]/10`}
                    >
                        Join The Creators Now
                        <span className="flex h-[34px] w-[34px] flex-shrink-0 items-center justify-center rounded-full bg-[#d4623a]">
                            <svg
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="white"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M7 17L17 7M17 7H7M17 7v10" />
                            </svg>
                        </span>
                    </button>
                </div>
            </section>
        </>
    );
};

export default CreatorsSection;