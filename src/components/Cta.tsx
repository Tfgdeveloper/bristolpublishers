import React, { useEffect, useRef, useState } from "react";

const openQuoteModal = (service?: string) => {
  window.dispatchEvent(new CustomEvent("bp:open-quote-modal", { detail: service ?? "" }));
};

function useInView(threshold = 0.12) {
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

const Cta: React.FC = () => {
  const { ref, visible } = useInView(0.08);

  return (
    <section
      ref={ref}
      id="services"
      className="relative overflow-hidden py-[30px] 
        bg-[linear-gradient(180deg,#1B465F_0%,#14384C_50%,#0E2432_100%)]"
    >
      {/* ── Decorative background ── */}
      <div
        className="pointer-events-none absolute right-[-8%] top-[15%] h-[280px] w-[280px] animate-pulse rounded-full
          bg-[radial-gradient(circle,rgba(255,69,69,0.06)_0%,transparent_65%)]
          min-[480px]:h-[340px] min-[480px]:w-[340px] md:h-[400px] md:w-[400px] lg:h-[460px] lg:w-[460px]
          min-[1440px]:h-[500px] min-[1440px]:w-[500px] min-[1920px]:h-[600px] min-[1920px]:w-[600px]
          motion-reduce:animate-none"
      />
      <div
        className="pointer-events-none absolute bottom-[10%] left-[-6%] h-[240px] w-[240px] rounded-full
          bg-[radial-gradient(circle,rgba(27,70,95,0.55)_0%,transparent_70%)]
          min-[480px]:h-[280px] min-[480px]:w-[280px] md:h-[320px] md:w-[320px] lg:h-[360px] lg:w-[360px]
          min-[1440px]:h-[400px] min-[1440px]:w-[400px] min-[1920px]:h-[480px] min-[1920px]:w-[480px]"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[size:60px_60px]
          bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)]"
      />
      <div
        className="pointer-events-none absolute bottom-[12%] right-[6%] h-[100px] w-[100px] animate-spin rounded-full
          border border-dashed border-[rgba(255,69,69,0.12)] [animation-duration:18s]
          min-[480px]:h-[120px] min-[480px]:w-[120px] md:h-[140px] md:w-[140px] lg:h-[150px] lg:w-[150px]
          min-[1440px]:h-[160px] min-[1440px]:w-[160px] min-[1920px]:h-[180px] min-[1920px]:w-[180px]
          motion-reduce:animate-none"
      />

      {/* ── Container ── */}
      <div
        className="relative mx-auto max-w-[1200px] px-[18px] min-[480px]:px-6 md:px-8 lg:px-10
          min-[1440px]:max-w-[1380px] min-[1440px]:px-14
          min-[1920px]:max-w-full min-[1920px]:px-20 min-[2560px]:max-w-[80%]"
      >
        {/* ── CTA banner ── */}
        <div
          className={`flex flex-col items-start gap-[18px] rounded-2xl border border-white/[0.07] bg-white/[0.025]
            px-[22px] py-[26px] backdrop-blur-[8px]
            min-[480px]:px-[26px] min-[480px]:py-7
            md:flex-row md:items-center md:justify-between md:rounded-[18px] md:px-9 md:py-[30px]
            lg:rounded-[20px] lg:px-11 lg:py-8
            min-[1440px]:px-12 min-[1440px]:py-9
            min-[1920px]:rounded-[22px] min-[1920px]:px-14 min-[1920px]:py-10
            transition-all delay-700 duration-700 ease-out motion-reduce:transition-none
            ${visible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0 motion-reduce:translate-y-0"}`}
        >
          <p
            className="m-0 font-['Montserrat',sans-serif] text-[clamp(1rem,3.5vw,1.6rem)] font-semibold
              leading-[1.3] tracking-[0.02em] text-white"
          >
            Not sure where to begin? Let’s guide your next step.
          </p>

          <button type="button" className="hero-cta-primary" onClick={() => openQuoteModal()}>
            BEGIN YOUR FREE CONSULTATION
          </button>
        </div>
      </div>
    </section>
  );
};

export default Cta;