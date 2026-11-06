import React, { useEffect, useState } from "react";

const fontStyle = `@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');`;

const Preloader: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
    const [exiting, setExiting] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setExiting(true);
            setTimeout(onComplete, 700);
        }, 3000);
        return () => clearTimeout(timer);
    }, [onComplete]);

    const bars = [14, 22, 34, 44, 36, 48, 38, 28, 18, 26, 40, 48, 34, 22, 14];
    const delays = [0, .09, .18, .27, .36, .27, .18, .09, 0, .09, .18, .27, .36, .27, .18];

    return (
        <>
            <style>{fontStyle}</style>
            <div
                className={`fixed inset-0 z-[9999] bg-[#0e0604] flex flex-col items-center justify-center gap-7
          transition-all duration-700 ease-in-out
          ${exiting ? "opacity-0 scale-105 pointer-events-none" : "opacity-100 scale-100"}`}
            >
                <div className="flex items-center gap-3 animate-[fadeUp_0.6s_cubic-bezier(0.22,1,0.36,1)_0.3s_both]">
                    <div className="w-11 h-11 rounded-full border-2 border-white/70 flex items-center justify-center">
                        <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" />
                        </svg>
                    </div>
                    <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "3rem", letterSpacing: "0.12em" }} className="text-white">
                        BELLA
                    </span>
                </div>

                <div className="flex items-center gap-[5px] h-12 animate-[fadeUp_0.5s_cubic-bezier(0.22,1,0.36,1)_0.65s_both]">
                    {bars.map((h, i) => (
                        <div
                            key={i}
                            className="w-1 rounded-full bg-[#e85d00]"
                            style={{
                                height: `${h}px`,
                                animation: `wave 1.1s ease-in-out ${delays[i]}s infinite`,
                            }}
                        />
                    ))}
                </div>

                <div className="w-56 h-[2px] bg-white/10 rounded-full overflow-hidden animate-[fadeUp_0.4s_ease_0.9s_both]">
                    <div className="h-full rounded-full bg-gradient-to-r from-[#e85d00] to-[#ff8c00] animate-[load_1.8s_cubic-bezier(0.4,0,0.2,1)_1s_forwards] w-0" />
                </div>

                <span
                    style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.3em" }}
                    className="text-white/35 text-sm animate-[fadeUp_0.5s_ease_1s_both]"
                >
                    EVERY VOICE REALLY MATTERS
                </span>
            </div>
        </>
    );
};

export default Preloader;