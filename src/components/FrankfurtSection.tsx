import React, { useEffect, useRef, useState } from "react";
import SplitText from "./SplitText";

/* ------------------------------------------------------------------ */
/*  Content: edit here                                                 */
/* ------------------------------------------------------------------ */
const EYEBROW = "Frankfurt Book Fair";
const HEADING_DARK = "We Were at the";
const HEADING_RED = "Frankfurt Book Fair";
const SUBTEXT =
  "Our team traveled to the world's largest book fair to meet authors, publishers, and industry partners from around the globe. Here's a look at our time on the show floor.";
const VIDEO_SRC = "/images/frankfurt.mp4";
const VIDEO_POSTER = "/images/frankfurt-poster.jpg"; // thumbnail shown before play

/* ------------------------------------------------------------------ */
/*  Fade-up on scroll (replaces the old fadeUp keyframes)              */
/* ------------------------------------------------------------------ */
const reveal = (visible: boolean, delay = "") =>
  `transition-all duration-700 ease-out ${delay} ${
    visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
  } motion-reduce:transition-none motion-reduce:translate-y-0`;

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLElement>(null);
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

const FrankfurtSection: React.FC = () => {
  const { ref, visible } = useInView(0.08);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const play = () => {
    const v = videoRef.current;
    if (!v) return;
    setPlaying(true);
    v.play().catch(() => setPlaying(false));
  };

  return (
    <section
      ref={ref}
      id="frankfurt"
      aria-labelledby="ff-heading"
      className="relative w-full overflow-hidden py-[60px] pb-[70px] lg:pb-[100px] lg:pt-[90px]
        bg-[linear-gradient(180deg,#FFFFFF_0%,#FFF9F9_25%,#FFE8E8_55%,#FFD6D6_80%,#FFFFFF_100%)]"
    >
      {/* Decorative orbs */}
      <div
        className="pointer-events-none absolute left-[-6%] top-[20%] h-[220px] w-[220px] animate-pulse rounded-full
          bg-[radial-gradient(circle,rgba(255,69,69,0.07)_0%,transparent_65%)]
          min-[480px]:h-[280px] min-[480px]:w-[280px] lg:h-[400px] lg:w-[400px] motion-reduce:animate-none"
      />
      <div
        className="pointer-events-none absolute bottom-[15%] right-[-5%] h-[200px] w-[200px] rounded-full
          bg-[radial-gradient(circle,rgba(255,69,69,0.07)_0%,transparent_70%)]
          min-[480px]:h-[250px] min-[480px]:w-[250px] lg:h-[360px] lg:w-[360px]"
      />

      <div
        className="relative mx-auto max-w-[1200px] px-[18px] min-[480px]:px-6 md:px-8 lg:px-10
          min-[1440px]:max-w-[1380px] min-[1440px]:px-14
          min-[1920px]:max-w-[1700px] min-[1920px]:px-20 min-[2560px]:max-w-[80%]"
      >
        {/* ── Eyebrow ── */}
        <div className={`mb-[18px] flex items-center gap-3 ${reveal(visible)}`}>
          <div
            className={`h-0.5 bg-[#FF4545] transition-[width] delay-200 duration-700 min-[1920px]:h-1 ${
              visible ? "w-12" : "w-0"
            }`}
          />
          <span
            className="font-['Montserrat',sans-serif] text-[0.75rem] uppercase tracking-[0.25em] text-[#FF4545]
              min-[1920px]:text-[1.1rem] min-[1920px]:font-semibold min-[2560px]:text-[1.3rem]"
          >
            {EYEBROW}
          </span>
        </div>

        {/* ── Heading + subtext ── */}
        <div
          className="mb-9 flex flex-col gap-4 md:mb-12 md:flex-row md:items-end md:justify-between md:gap-6
            lg:mb-14 min-[1440px]:mb-16 min-[1920px]:mb-20"
        >
          <h2
            id="ff-heading"
            aria-label={`${HEADING_DARK} ${HEADING_RED}`}
            className={`m-0 font-['Montserrat',sans-serif] text-[42px] font-extrabold leading-[0.95]
              tracking-[-0.02em] text-[#0A0A0A] min-[1920px]:text-[3rem] min-[1920px]:leading-none
              min-[2560px]:text-[4rem] ${reveal(visible, "delay-100")}`}
          >
            {visible && (
              <>
                <SplitText
                  text={HEADING_DARK}
                  className="text-[#0A0A0A]"
                  delay={35} duration={1.1} ease="power3.out"
                  splitType="chars"
                  from={{ opacity: 0, y: 45 }} to={{ opacity: 1, y: 0 }}
                  threshold={0.1} rootMargin="-50px" textAlign="left"
                />
                {" "}
                <SplitText
                  text={HEADING_RED}
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
            className={`m-0 max-w-[380px] font-['DM_Sans',sans-serif] text-[clamp(0.85rem,2.5vw,1.05rem)] font-light
              leading-relaxed text-[#444] min-[1920px]:max-w-[700px] min-[1920px]:text-[24px]
              min-[2560px]:text-[28px] ${reveal(visible, "delay-300")}`}
          >
            {SUBTEXT}
          </p>
        </div>

        {/* ── Video (smaller, centered) ── */}
        <div
          className={`relative mx-auto aspect-video w-full max-w-[720px] overflow-hidden rounded-[14px] bg-[#0A0A0A]
            shadow-[0_30px_70px_rgba(255,69,69,0.18),0_10px_30px_rgba(0,0,0,0.12)]
            md:rounded-[18px] lg:max-w-[800px] lg:rounded-[20px]
            min-[1920px]:max-w-[1000px] min-[2560px]:max-w-[1200px] ${reveal(visible, "delay-500")}`}
        >
          <video
            ref={videoRef}
            src={VIDEO_SRC}
            poster={VIDEO_POSTER}
            preload="metadata"
            playsInline
            controls={playing}
            onEnded={() => setPlaying(false)}
            className="block h-full w-full object-cover"
          />

          {!playing && (
            <button
              type="button"
              onClick={play}
              aria-label="Play video from the Frankfurt Book Fair"
              className="group absolute inset-0 grid cursor-pointer place-items-center border-0 p-0
                bg-gradient-to-t from-black/45 to-black/10 transition-colors duration-300
                hover:from-black/55 hover:to-black/20
                focus-visible:outline focus-visible:outline-[3px] focus-visible:-outline-offset-[3px] focus-visible:outline-[#FF4545]"
            >
              <span
                className="relative grid h-14 w-14 place-items-center rounded-full bg-[#FF4545]
                  shadow-[0_12px_30px_rgba(255,69,69,0.45)] transition-transform duration-300
                  group-hover:scale-110 motion-reduce:group-hover:scale-100
                  min-[480px]:h-16 min-[480px]:w-16 md:h-[72px] md:w-[72px] lg:h-20 lg:w-20
                  min-[1920px]:h-24 min-[1920px]:w-24"
              >
                {/* Pulsing ring */}
                <span
                  aria-hidden="true"
                  className="absolute inset-0 animate-ping rounded-full border-2 border-[#FF4545] opacity-60 motion-reduce:animate-none"
                />
                <svg width="26" height="26" viewBox="0 0 24 24" fill="#fff" aria-hidden="true" className="relative ml-1">
                  <path d="M8 5.14v13.72a1 1 0 0 0 1.52.85l10.6-6.86a1 1 0 0 0 0-1.7L9.52 4.29A1 1 0 0 0 8 5.14z" />
                </svg>
              </span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default FrankfurtSection;