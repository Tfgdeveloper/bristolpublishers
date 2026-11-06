import React from "react";

const logoBarStyle = `
  @keyframes marquee {
    0%   { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }

  .logo-track {
    display: flex;
    align-items: center;
    width: max-content;
    animation: marquee 35s linear infinite;
  }
  .logo-track:hover {
    animation-play-state: paused;
  }

  /* ════════════════════════════════════
     BASE — Small Mobile (≤ 479px)
     ════════════════════════════════════ */
  .lb-wrap {
    background-color: #FF4545;
    width: 100%;
    overflow: hidden;
    height: 50px;             /* ← Reduced from 80px */
    display: flex;
    align-items: center;
  }

  .lb-logo-item {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 16px;          /* ← Reduced from 28px */
  }

  .lb-logo-img {
    width: 70px;             /* ← Fixed width for uniform size */
    height: 24px;            /* ← Fixed height for uniform size */
    object-fit: contain;     /* ← Ensures image fits without stretching */
    opacity: 0.92;
  }

  /* ════════════════════════════════════
     LARGE MOBILE  480px – 767px
     ════════════════════════════════════ */
  @media (min-width: 480px) {
    .lb-wrap      { height: 56px; }
    .lb-logo-item { margin: 0 20px; }
    .lb-logo-img  { width: 80px; height: 28px; }
  }

  /* ════════════════════════════════════
     TABLET  768px – 1023px
     ════════════════════════════════════ */
  @media (min-width: 768px) {
    .lb-wrap      { height: 64px; }
    .lb-logo-item { margin: 0 24px; }
    .lb-logo-img  { width: 90px; height: 32px; }
  }

  /* ════════════════════════════════════
     LAPTOP  1024px – 1439px
     ════════════════════════════════════ */
  @media (min-width: 1024px) {
    .lb-wrap      { height: 72px; }
    .lb-logo-item { margin: 0 28px; }
    .lb-logo-img  { width: 100px; height: 36px; }
  }

  /* ════════════════════════════════════
     MONITOR  1440px – 1919px
     ════════════════════════════════════ */
  @media (min-width: 1440px) {
    .lb-wrap      { height: 80px; }
    .lb-logo-item { margin: 0 32px; }
    .lb-logo-img  { width: 110px; height: 40px; }
  }

  /* ════════════════════════════════════
     ULTRA-WIDE  ≥ 1920px
     ════════════════════════════════════ */
  @media (min-width: 1920px) {
    .lb-wrap      { height: 88px; }
    .lb-logo-item { margin: 0 36px; }
    .lb-logo-img  { width: 120px; height: 44px; }
  }

  /* ════════════════════════════════════
     REDUCE MOTION
     ════════════════════════════════════ */
  @media (prefers-reduced-motion: reduce) {
    .logo-track { animation: none !important; }
  }
`;

const logos = [
  { src: "/images/logo/Kobo.png", alt: "Kobo" },
  { src: "/images/logo/Amazon.png", alt: "Amazon" },
  { src: "/images/logo/AppleBooks.png", alt: "Apple Books" },
  { src: "/images/logo/Barnes.png", alt: "Barnes & Noble" },
  { src: "/images/logo/Ingram.png", alt: "IngramSpark" },
];

const allLogos = [...logos, ...logos, ...logos, ...logos, ...logos];

const LogoBar: React.FC = () => {
  return (
    <>
      <style>{logoBarStyle}</style>
      <div className="lb-wrap">
        <div className="logo-track">
          {allLogos.map((logo, i) => (
            <div key={i} className="lb-logo-item">
              <img
                src={logo.src}
                alt={logo.alt}
                className="lb-logo-img"
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default LogoBar;