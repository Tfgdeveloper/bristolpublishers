import React, { useRef, useState, useEffect } from "react";
import SplitText from "./SplitText";
import { useNavigate } from "react-router-dom";

const fontStyle = `@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Montserrat:wght@400;500;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');`;

const PHONE_DISPLAY = "(737) 385-5397";
const PHONE_TEL = "tel:+17373855397";

/* Opens the quote popup (QuoteModalProvider in App.tsx listens for this event).
   No import needed, so the hero can never crash because of the modal. */
const openQuoteModal = (service?: string) => {
  window.dispatchEvent(new CustomEvent("bp:open-quote-modal", { detail: service ?? "" }));
};

/* Sparks that drift out from the phone CTA */
const CTA_PARTICLES = Array.from({ length: 10 }, (_, i) => {
  const angle = (i / 10) * Math.PI * 2;
  const dist = 34 + (i % 3) * 10;
  return {
    x: `${Math.round(Math.cos(angle) * dist * 1.8)}px`,
    y: `${Math.round(Math.sin(angle) * dist)}px`,
    size: i % 3 === 0 ? 5 : 4,
    color: i % 2 === 0 ? "#FF4545" : "rgba(255,255,255,0.85)",
    dur: `${2.2 + (i % 4) * 0.35}s`,
    delay: `${(i * 0.27).toFixed(2)}s`,
  };
});

const SERVICES_LIST = [
  "Ghostwriting & Writing Support",
  "Editing & Proofreading",
  "Book Cover Design",
  "Book Publishing",
  "Book Marketing & Promotion",
  "Audiobook Production",
];

const animStyles = `
  /* ════════════════════════════════════
     KEYFRAMES
     ════════════════════════════════════ */
  @keyframes marqueeLeft {
    0%   { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  @keyframes rotateSlow {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(10px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* ════════════════════════════════════
     BACKGROUND MARQUEE
     ════════════════════════════════════ */
  .marquee-track-left {
    display: flex;
    width: max-content;
    animation: marqueeLeft 55s linear infinite;
  }
  .hero-book-card {
    flex-shrink: 0;
    border-radius: 12px;
    overflow: hidden;
    opacity: 0.82;
  }
  .hero-book-card img {
    display: block;
    object-fit: cover;
    pointer-events: none;
    filter: saturate(0.9) brightness(0.82);
  }
  .hero-marquee-bg {
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 190px;
    display: flex;
    align-items: center;
    overflow: hidden;
    z-index: 0;
    pointer-events: none;
  }
  .hero-book-card-item { width: 110px; height: 165px; margin: 0 5px; border-radius: 8px; }

  /* ════════════════════════════════════
     BASE — Small Mobile (≤ 479px)
     ════════════════════════════════════ */
  .hero-section {
    position: relative;
    width: 100%;
    min-height: 100vh;
    display: flex;
    align-items: center;
    overflow: hidden;
  }

  .hero-layout {
    position: relative;
    z-index: 10;
    width: 100%;
    max-width: 1440px;
    margin: 0 auto;
    padding: 6rem 1rem 3rem;
    display: grid;
    grid-template-columns: 1fr;
    gap: 2.5rem;
    align-items: center;
    box-sizing: border-box;
  }

  /* ── Left column ── */
  .hero-left {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    text-shadow: 0 2px 18px rgba(10,26,36,0.75);
  }

  .hero-title-main {
    font-family: 'Montserrat', sans-serif;
    font-weight: 700;
    font-size: 2.6rem;
    letter-spacing: -0.03em;
    line-height: 1;
    color: #fff;
    text-transform: uppercase;
    margin: 0;
  }

  .hero-title-sub {
    font-family: 'Montserrat', sans-serif;
    font-weight: 600;
    font-size: 1.15rem;
    letter-spacing: -0.02em;
    line-height: 1.1;
    color: #fff;
    text-transform: uppercase;
    margin: 0.6rem 0 0;
  }

  .hero-desc {
    color: rgba(255,255,255,0.85);
    font-family: 'Montserrat', sans-serif;
    font-size: 13.5px;
    line-height: 1.7;
    max-width: 560px;
    margin: 1.25rem 0 0;
  }

  /* ── CTAs ── */
  .hero-cta-row {
    display: flex;
    gap: 14px;
    flex-wrap: wrap;
    align-items: center;
    margin-top: 1.75rem;
  }

  .hero-cta-primary {
    font-family: 'Montserrat', sans-serif;
    font-weight: 500;
    letter-spacing: 0.1em;
    padding: 12px 28px;
    border-radius: 999px;
    background: linear-gradient(90deg, #fe5858 0%, #FF4545 100%);
    color: #fff;
    border: none;
    cursor: pointer;
    font-size: 0.8rem;
    white-space: nowrap;
    text-decoration: none;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }
  .hero-cta-primary:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 32px rgba(255,69,69,0.45);
  }

  /* ── Animated phone CTA ── */
  @keyframes heroCtaFloat {
    0%, 100% { transform: translateY(0); }
    50%       { transform: translateY(-4px); }
  }
  @keyframes heroCtaShimmer {
    0%        { left: -120%; }
    40%, 100% { left: 160%; }
  }
  @keyframes heroCtaPhonePulse {
    0%, 70%, 100% { transform: rotate(0deg) scale(1); }
    75%           { transform: rotate(-14deg) scale(1.12); }
    80%           { transform: rotate(12deg) scale(1.12); }
    85%           { transform: rotate(-10deg) scale(1.08); }
    90%           { transform: rotate(8deg) scale(1.04); }
  }
  @keyframes heroCtaParticleFly {
    0%   { transform: translate(0, 0) scale(1); opacity: 0; }
    15%  { opacity: 1; }
    100% { transform: translate(var(--p-x), var(--p-y)) scale(0.2); opacity: 0; }
  }

  .hero-cta-btn-outer {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 16px;
    margin: -16px;
    animation: heroCtaFloat 3.2s ease-in-out infinite;
  }
  .hero-cta-particle {
    position: absolute;
    border-radius: 50%;
    pointer-events: none;
    top: 50%; left: 50%;
    margin-top: -2px; margin-left: -2px;
    opacity: 0;
    z-index: 50;
    animation: heroCtaParticleFly var(--p-dur) ease-out var(--p-delay) infinite;
  }
  .hero-cta-main-btn {
    position: relative;
    overflow: hidden;
    display: inline-flex;
    align-items: center;
    gap: 7px;
    padding: 12px 24px;
    border-radius: 9999px;
    border: none;
    cursor: pointer;
    background: linear-gradient(90deg, #fe5858e8 0%, #FF4545 100%);
    font-family: 'Montserrat', sans-serif;
    font-weight: 600;
    font-size: 0.8rem;
    letter-spacing: 0.08em;
    color: #ffffff;
    text-decoration: none;
    white-space: nowrap;
    transition: transform 0.15s ease, box-shadow 0.15s ease;
    box-shadow: 0 4px 18px rgba(255,69,69,0.48);
  }
  .hero-cta-main-btn:hover { transform: scale(1.05); box-shadow: 0 6px 26px rgba(255,69,69,0.68); }
  .hero-cta-shine {
    position: absolute; top: 0; left: -120%;
    width: 50%; height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.28), transparent);
    animation: heroCtaShimmer 3.5s ease-in-out infinite 1.2s;
    pointer-events: none;
  }
  .hero-cta-phone-icon {
    animation: heroCtaPhonePulse 3s ease-in-out infinite 1.5s;
    display: inline-flex; flex-shrink: 0;
  }

  .hero-cta-primary:focus-visible,
  .hero-cta-main-btn:focus-visible,
  .hf-submit-btn:focus-visible,
  .hf-select-trigger:focus-visible {
    outline: 2px solid #FF4545;
    outline-offset: 3px;
  }

  /* ════════════════════════════════════
     GLASS FORM
     ════════════════════════════════════ */
  .hero-form {
    width: 100%;
    max-width: 520px;
    justify-self: center;
    box-sizing: border-box;
    background: rgba(255,255,255,0.06);
    backdrop-filter: blur(16px) saturate(140%);
    -webkit-backdrop-filter: blur(16px) saturate(140%);
    border: 1px solid rgba(255,255,255,0.18);
    border-radius: 20px;
    padding: 24px 18px;
    box-shadow: 0 24px 60px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.08);
  }

  .hero-form-title {
    font-family: 'Montserrat', sans-serif;
    font-weight: 700;
    font-size: 1.2rem;
    color: #fff;
    margin: 0 0 4px;
  }
  .hero-form-sub {
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    color: rgba(255,255,255,0.65);
    margin: 0 0 18px;
  }

  .hero-form-fields {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  /* ── Floating label field — light solid fill, dark text ── */
  .hf-field-wrap { position: relative; }

  .hf-field-input {
    width: 100%;
    background: #F2F6F8;
    border: 1px solid #F2F6F8;
    border-radius: 12px;
    padding: 22px 16px 10px 48px;
    color: #0A1A24;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    font-weight: 500;
    outline: none;
    transition: border-color 0.3s ease, background 0.3s ease, box-shadow 0.3s ease;
    box-sizing: border-box;
    caret-color: #FF4545;
  }
  .hf-field-input::placeholder { color: transparent; }
  .hf-field-input:hover { background: #FFFFFF; }
  .hf-field-input:focus {
    background: #FFFFFF;
    border-color: #FF4545;
    box-shadow: 0 0 0 3px rgba(255,69,69,0.25);
  }
  /* keep browser autofill from turning fields yellow */
  .hf-field-input:-webkit-autofill,
  .hf-field-input:-webkit-autofill:hover,
  .hf-field-input:-webkit-autofill:focus {
    -webkit-box-shadow: 0 0 0 1000px #FFFFFF inset;
    -webkit-text-fill-color: #0A1A24;
  }

  .hf-field-icon {
    position: absolute; left: 16px; top: 50%;
    transform: translateY(-50%);
    color: rgba(10,26,36,0.55);
    transition: color 0.3s ease;
    pointer-events: none;
    display: flex; align-items: center;
  }
  .hf-field-input:focus + .hf-field-icon { color: #FF4545; }

  .hf-field-label {
    position: absolute; left: 48px; top: 50%;
    transform: translateY(-50%);
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    font-weight: 500;
    color: rgba(10,26,36,0.72);
    pointer-events: none;
    transition: all 0.25s cubic-bezier(0.22,1,0.36,1);
  }
  .hf-field-input:focus ~ .hf-field-label,
  .hf-field-input:not(:placeholder-shown) ~ .hf-field-label {
    top: 7px;
    transform: none;
    font-size: 10.5px;
    font-weight: 600;
    color: #E03636;
    letter-spacing: 0.04em;
  }

  /* ── Select ── */
  .hf-select-wrap { position: relative; }

  .hf-select-trigger {
    width: 100%;
    min-height: 54px;
    background: #F2F6F8;
    border: 1px solid #F2F6F8;
    border-radius: 12px;
    padding: 22px 42px 10px 48px;
    color: #0A1A24;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: border-color 0.3s ease, background 0.3s ease, box-shadow 0.3s ease;
    box-sizing: border-box;
    text-align: left;
    display: flex; align-items: center;
    user-select: none;
    position: relative;
  }
  .hf-select-trigger:hover { background: #FFFFFF; }
  .hf-select-trigger.open {
    background: #FFFFFF;
    border-color: #FF4545;
    box-shadow: 0 0 0 3px rgba(255,69,69,0.25);
  }

  .hf-select-icon {
    position: absolute; left: 16px; top: 50%;
    transform: translateY(-50%);
    color: rgba(10,26,36,0.55);
    transition: color 0.3s ease;
    pointer-events: none;
    display: flex; align-items: center;
  }
  .hf-select-trigger.open .hf-select-icon { color: #FF4545; }

  .hf-select-chevron {
    position: absolute; right: 14px; top: 50%;
    transform: translateY(-50%);
    color: rgba(10,26,36,0.55);
    transition: color 0.3s ease, transform 0.3s ease;
    pointer-events: none;
    display: flex; align-items: center;
  }
  .hf-select-chevron.rotated { transform: translateY(-50%) rotate(180deg); color: #FF4545; }

  .hf-select-label {
    position: absolute; left: 48px; top: 50%;
    transform: translateY(-50%);
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    font-weight: 500;
    color: rgba(10,26,36,0.72);
    pointer-events: none;
    transition: all 0.25s cubic-bezier(0.22,1,0.36,1);
  }
  .hf-select-label.lifted {
    top: 7px;
    transform: none;
    font-size: 10.5px;
    font-weight: 600;
    color: #E03636;
    letter-spacing: 0.04em;
  }

  .hf-select-dropdown {
    position: absolute; top: calc(100% + 6px); left: 0; right: 0;
    background: #FFFFFF;
    border: 1px solid rgba(255,69,69,0.35);
    border-radius: 12px;
    z-index: 200;
    box-shadow: 0 16px 48px rgba(0,0,0,0.45);
    animation: fadeUp 0.18s ease forwards;
    max-height: 240px;
    overflow-y: auto;
  }
  .hf-select-dropdown::-webkit-scrollbar { width: 3px; }
  .hf-select-dropdown::-webkit-scrollbar-thumb { background: rgba(255,69,69,0.4); border-radius: 999px; }

  .hf-select-option {
    padding: 12px 16px;
    font-family: 'DM Sans', sans-serif;
    font-size: 13.5px;
    font-weight: 500;
    color: #0A1A24;
    cursor: pointer;
    transition: background 0.15s ease, color 0.15s ease, padding-left 0.15s ease;
    display: flex; align-items: center; gap: 8px;
    border-bottom: 1px solid rgba(10,26,36,0.06);
  }
  .hf-select-option:last-child { border-bottom: none; }
  .hf-select-option:hover { background: rgba(255,69,69,0.08); color: #E03636; padding-left: 20px; }
  .hf-select-option.selected { background: rgba(255,69,69,0.12); color: #E03636; }
  .hf-select-option-dot { width: 5px; height: 5px; border-radius: 50%; background: rgba(255,69,69,0.45); flex-shrink: 0; }
  .hf-select-option.selected .hf-select-option-dot { background: #FF4545; }

  /* ── Error ── */
  .hf-error {
    font-family: 'DM Sans', sans-serif;
    font-size: 12px;
    color: #FF8A8A;
    padding: 10px 12px;
    background: rgba(255,69,69,0.10);
    border: 1px solid rgba(255,69,69,0.25);
    border-radius: 10px;
    display: flex; align-items: center; gap: 7px;
  }

  /* ── Submit ── */
  .hf-submit-btn {
    font-family: 'Montserrat', sans-serif;
    letter-spacing: 0.1em;
    font-weight: 600;
    font-size: 13px;
    padding: 15px 0;
    border-radius: 12px;
    background: linear-gradient(90deg, #fe5858 0%, #FF4545 100%);
    color: #fff;
    border: none;
    cursor: pointer;
    width: 100%;
    margin-top: 4px;
    display: flex; align-items: center; justify-content: center; gap: 8px;
    position: relative; overflow: hidden;
    transition: transform 0.22s ease, box-shadow 0.22s ease;
    box-shadow: 0 6px 24px rgba(255,69,69,0.3);
  }
  .hf-submit-btn:hover { transform: translateY(-2px); box-shadow: 0 12px 36px rgba(255,69,69,0.45); }
  .hf-submit-btn:active { transform: translateY(-1px); }
  .hf-submit-btn:disabled { opacity: 0.7; cursor: not-allowed; transform: none; }


  /* ════════════════════════════════════
     LARGE MOBILE  480px – 767px
     ════════════════════════════════════ */
  @media (min-width: 480px) {
    .hero-layout { padding: 7rem 1.5rem 3.5rem; }
    .hero-title-main { font-size: 3.2rem; }
    .hero-title-sub  { font-size: 1.4rem; }
    .hero-desc { font-size: 14.5px; }
    .hero-form { padding: 28px 24px; }
    .hero-marquee-bg { height: 230px; }
    .hero-book-card-item { width: 140px; height: 210px; margin: 0 6px; }
  }


  /* ════════════════════════════════════
     TABLET  768px – 1023px
     ════════════════════════════════════ */
  @media (min-width: 768px) {
    .hero-layout { padding: 8rem 2rem 4rem; gap: 3rem; }
    .hero-title-main { font-size: 4rem; }
    .hero-title-sub  { font-size: 1.75rem; }
    .hero-desc { font-size: 15.5px; }
    .hero-cta-primary, .hero-cta-main-btn { font-size: 0.88rem; }
    .hero-form { padding: 32px 30px; border-radius: 22px; }
    .hero-form-title { font-size: 1.35rem; }
    .hero-marquee-bg { height: 280px; }
    .hero-book-card-item { width: 170px; height: 260px; margin: 0 8px; }
  }


  /* ════════════════════════════════════
     LAPTOP  1024px – 1439px  → 2 columns
     ════════════════════════════════════ */
  @media (min-width: 1024px) {
    .hero-layout {
      grid-template-columns: 1.1fr 0.9fr;
      gap: 3rem;
      padding: 7rem 2.5rem 4rem;
    }
    .hero-title-main { font-size: 3.5rem; }
    .hero-title-sub  { font-size: 2rem; margin-top: 0.8rem; }
    .hero-desc { font-size: 17px; max-width: 640px; margin-top: 1.5rem; }
    .hero-cta-row { margin-top: 2.25rem; gap: 18px; }
    .hero-cta-primary { padding: 14px 32px; font-size: 0.95rem; }
    .hero-cta-main-btn { font-size: 0.95rem; padding: 14px 30px; gap: 8px; }
    .hero-cta-phone-icon svg { width: 17px; height: 17px; }
    .hero-form { max-width: 540px; padding: 36px 34px; border-radius: 24px; }
    .hero-form-title { font-size: 1.6rem; }
    .hero-form-sub { font-size: 14.5px; margin-bottom: 22px; }
    .hero-form-fields { gap: 14px; }
    .hf-field-input, .hf-select-trigger { font-size: 15px; min-height: 58px; }
    .hf-field-label, .hf-select-label { font-size: 15px; }
    .hf-submit-btn { font-size: 14px; padding: 17px 0; }
    .hero-marquee-bg { height: 320px; }
    .hero-book-card-item { width: 200px; height: 305px; margin: 0 10px; }
  }


  /* ════════════════════════════════════
     MONITOR  ≥ 1440px
     ════════════════════════════════════ */
  @media (min-width: 1440px) {
    .hero-layout { max-width: 1680px; padding: 8rem 4rem 5rem; gap: 4rem; }
    .hero-title-main { font-size: 4.75rem; }
    .hero-title-sub  { font-size: 2.7rem; margin-top: 1rem; }
    .hero-desc { font-size: 19.5px; max-width: 720px; margin-top: 1.75rem; }
    .hero-cta-row { margin-top: 2.5rem; gap: 20px; }
    .hero-cta-primary { padding: 16px 40px; font-size: 1.05rem; }
    .hero-cta-main-btn { font-size: 1.05rem; padding: 16px 36px; gap: 10px; }
    .hero-cta-phone-icon svg { width: 19px; height: 19px; }
    .hero-form { max-width: 620px; padding: 46px 44px; border-radius: 26px; }
    .hero-form-title { font-size: 1.95rem; }
    .hero-form-sub { font-size: 16px; margin-bottom: 26px; }
    .hero-form-fields { gap: 16px; }
    .hf-field-input { font-size: 16.5px; min-height: 64px; padding: 26px 18px 11px 54px; }
    .hf-select-trigger { font-size: 16.5px; min-height: 64px; padding: 26px 48px 11px 54px; }
    .hf-field-label, .hf-select-label { font-size: 16.5px; left: 54px; }
    .hf-field-input:focus ~ .hf-field-label,
    .hf-field-input:not(:placeholder-shown) ~ .hf-field-label,
    .hf-select-label.lifted { font-size: 12px; top: 8px; }
    .hf-field-icon, .hf-select-icon { left: 18px; }
    .hf-select-option { font-size: 15.5px; padding: 14px 18px; }
    .hf-submit-btn { font-size: 15.5px; padding: 19px 0; border-radius: 14px; }
    .hero-marquee-bg { height: 380px; }
    .hero-book-card-item { width: 230px; height: 360px; margin: 0 10px; }
  }


  /* ════════════════════════════════════
     ULTRA-WIDE  ≥ 1920px
     ════════════════════════════════════ */
  @media (min-width: 1920px) {
    .hero-layout { max-width: 2000px; padding: 10rem 5rem 6rem; gap: 5rem; }
    .hero-title-main { font-size: 6.75rem; }
    .hero-title-sub  { font-size: 3.5rem; margin-top: 1.2rem; }
    .hero-desc { font-size: 25px; max-width: 920px; margin-top: 2rem; }
    .hero-cta-row { margin-top: 3rem; gap: 24px; }
    .hero-cta-primary { padding: 20px 50px; font-size: 1.35rem; }
    .hero-cta-main-btn { font-size: 1.35rem; padding: 20px 46px; gap: 12px; }
    .hero-cta-phone-icon svg { width: 23px; height: 23px; }
    .hero-form { max-width: 780px; padding: 56px 54px; border-radius: 30px; }
    .hero-form-title { font-size: 2.5rem; }
    .hero-form-sub { font-size: 20px; margin-bottom: 30px; }
    .hero-form-fields { gap: 18px; }
    .hf-field-input { font-size: 20px; min-height: 78px; padding: 32px 22px 13px 64px; border-radius: 16px; }
    .hf-select-trigger { font-size: 20px; min-height: 78px; padding: 32px 56px 13px 64px; border-radius: 16px; }
    .hf-field-label, .hf-select-label { font-size: 20px; left: 64px; }
    .hf-field-input:focus ~ .hf-field-label,
    .hf-field-input:not(:placeholder-shown) ~ .hf-field-label,
    .hf-select-label.lifted { font-size: 14px; top: 10px; }
    .hf-field-icon, .hf-select-icon { left: 22px; }
    .hf-field-icon svg, .hf-select-icon svg { width: 20px; height: 20px; }
    .hf-select-chevron { right: 20px; }
    .hf-select-option { font-size: 19px; padding: 17px 22px; }
    .hf-submit-btn { font-size: 20px; padding: 24px 0; border-radius: 16px; letter-spacing: 0.14em; }
    .hero-marquee-bg { height: 440px; }
    .hero-book-card-item { width: 260px; height: 400px; margin: 0 12px; }
  }

  @media (min-width: 2560px) {
    .hero-layout { max-width: 2500px; padding: 12rem 6rem 7rem; gap: 6rem; }
    .hero-title-main { font-size: 11rem; }
    .hero-title-sub  { font-size: 4.5rem; }
    .hero-desc { font-size: 32px; max-width: 1180px; }
    .hero-cta-primary { padding: 24px 60px; font-size: 1.75rem; }
    .hero-cta-main-btn { font-size: 1.75rem; padding: 24px 56px; gap: 14px; }
    .hero-cta-phone-icon svg { width: 28px; height: 28px; }
    .hero-form { max-width: 940px; padding: 66px 64px; }
    .hero-form-title { font-size: 3.1rem; }
    .hero-form-sub { font-size: 25px; }
    .hero-form-fields { gap: 22px; }
    .hf-field-input { font-size: 25px; min-height: 94px; padding: 40px 26px 16px 76px; }
    .hf-select-trigger { font-size: 25px; min-height: 94px; padding: 40px 64px 16px 76px; }
    .hf-field-label, .hf-select-label { font-size: 25px; left: 76px; }
    .hf-field-input:focus ~ .hf-field-label,
    .hf-field-input:not(:placeholder-shown) ~ .hf-field-label,
    .hf-select-label.lifted { font-size: 17px; top: 12px; }
    .hf-field-icon, .hf-select-icon { left: 26px; }
    .hf-field-icon svg, .hf-select-icon svg { width: 24px; height: 24px; }
    .hf-select-option { font-size: 23px; padding: 20px 26px; }
    .hf-submit-btn { font-size: 25px; padding: 28px 0; }
    .hero-marquee-bg { height: 500px; }
    .hero-book-card-item { width: 300px; height: 460px; }
  }

  /* ════════════════════════════════════
     REDUCE MOTION
     ════════════════════════════════════ */
  @media (prefers-reduced-motion: reduce) {
    .marquee-track-left { animation: none !important; }
    .hero-cta-primary, .hf-submit-btn { transition: none !important; }
    .hero-cta-btn-outer, .hero-cta-shine, .hero-cta-phone-icon { animation: none !important; }
    .hero-cta-particle { display: none; }
  }
`;

const ROW_TOP = [
  { src: "/images/Portfolio/01.jpg", title: "Reflections" },
  { src: "/images/Portfolio/02.jpg", title: "The Man From ST. Claus" },
  { src: "/images/Portfolio/03.jpg", title: "Margo" },
  { src: "/images/Portfolio/04.jpg", title: "Casters" },
  { src: "/images/Portfolio/05.jpg", title: "Human Resources Professional" },
  { src: "/images/Portfolio/06.jpg", title: "Lady Justice Aya" },
  { src: "/images/Portfolio/07.jpg", title: "Yes to Beyond" },
  { src: "/images/Portfolio/08.jpg", title: "My Poetry Inspired By Goat" },
  { src: "/images/Portfolio/09.jpg", title: "Mr. TerriTaff" },
  { src: "/images/Portfolio/10.jpg", title: "From Broken To Redeemed" },
  { src: "/images/Portfolio/11.jpg", title: "Both Sides of the fence" },
  { src: "/images/Portfolio/12.jpg", title: "Adjust Your Crown" },
];

const HeroBookCard: React.FC<{ src: string; title: string }> = ({ src, title }) => (
  <div className="hero-book-card hero-book-card-item">
    <img
      src={src}
      alt=""
      aria-hidden="true"
      data-title={title}
      style={{ width: "100%", height: "100%" }}
      onError={(e) => {
        const t = e.currentTarget;
        t.style.display = "none";
        const p = t.parentElement!;
        p.style.background = `hsl(${Math.random() * 360},20%,15%)`;
      }}
    />
  </div>
);

/* ── Service Select ── */
interface HFSelectProps {
  value: string;
  onChange: (val: string) => void;
}

const HeroServiceSelect: React.FC<HFSelectProps> = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, []);

  return (
    <div className="hf-select-wrap" ref={wrapRef}>
      <button
        type="button"
        className={`hf-select-trigger${value ? " has-value" : ""}${open ? " open" : ""}`}
        onClick={() => setOpen(o => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Service interested in"
      >
        {value || ""}
        <span className="hf-select-icon">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        </span>
        <span className={`hf-select-chevron${open ? " rotated" : ""}`}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </span>
      </button>

      <span className={`hf-select-label${value ? " lifted" : ""}`}>Service Interested In</span>

      {open && (
        <div className="hf-select-dropdown" role="listbox">
          {SERVICES_LIST.map((svc) => (
            <div
              key={svc}
              role="option"
              aria-selected={value === svc}
              className={`hf-select-option${value === svc ? " selected" : ""}`}
              onClick={() => { onChange(svc); setOpen(false); }}
            >
              <span className="hf-select-option-dot" />
              {svc}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

/* ── Icons ── */
const iconUser = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" />
  </svg>
);
const iconPhone = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.7A2 2 0 012 .99h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
  </svg>
);
const iconEmail = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
  </svg>
);

/* ── Main Hero ── */
const Hero: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", phone: "", email: "", service: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
    if (error) setError("");
  };

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) {
      setError("Please fill in your Name and Email.");
      return;
    }
    setLoading(true);
    setError("");

    try {
      const res = await fetch("https://leads.authorpublishers.us/api/lead/hqiSJReizNxoPkBqXxCcfLr3haDtYvBM", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Name: form.name,
          Email: form.email,
          "Phone Number": form.phone,
          "Service Name": form.service,

        }),
      });

      const data = await res.json();
      console.log("Hero lead submitted:", data);

      navigate(`/thank-you?name=${encodeURIComponent(form.name)}&service=${encodeURIComponent(form.service)}`);
    } catch (err) {
      console.error("Submission error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{fontStyle}</style>
      <style>{animStyles}</style>

      <section
        className="hero-section"
        id="home"
        style={{
          background: `
            radial-gradient(ellipse at 0% 50%,   #1B465F 0%, transparent 38%),
            radial-gradient(ellipse at 20% 100%, #205270 0%, transparent 36%),
            radial-gradient(ellipse at 75% 0%,   #14384C 0%, transparent 42%),
            radial-gradient(ellipse at 100% 65%, #1A4259 0%, transparent 40%),
            radial-gradient(ellipse at 50% 50%,  #102838 0%, transparent 55%),
            #0A1A24
          `,
        }}
      >
        {/* ── BACKGROUND MARQUEE ── */}
        <div className="hero-marquee-bg">
          <div style={{ overflow: "hidden", width: "100%" }}>
            <div className="marquee-track-left">
              {ROW_TOP.map((b, i) => <HeroBookCard key={i} src={b.src} title={b.title} />)}
              {ROW_TOP.map((b, i) => <HeroBookCard key={`d${i}`} src={b.src} title={b.title} />)}
            </div>
          </div>
        </div>

        {/* Dark overlay */}
        <div
          className="absolute inset-0"
          style={{
            zIndex: 1,
            background: `linear-gradient(to bottom,
              rgba(10,26,36,0.72) 0%,
              rgba(10,26,36,0.62) 40%,
              rgba(10,26,36,0.76) 60%,
              rgba(10,26,36,0.94) 100%
            )`,
          }}
        />

        {/* ── CONTENT: left text / right form ── */}
        <div className="hero-layout">

          {/* LEFT */}
          <div className="hero-left">
            <h1 className="hero-title-main">
              <SplitText
                text="Bristol"
                className="text-[#FF4545]"
                delay={100} duration={2.25} ease="power3.out"
                splitType="chars" from={{ opacity: 0, y: 40 }} to={{ opacity: 1, y: 0 }}
                threshold={0.1} rootMargin="-100px" textAlign="left"
              />
            </h1>

            <h2 className="hero-title-sub">
              <SplitText
                text="The Trusted Name"
                delay={100} duration={2.25} ease="power3.out"
                splitType="chars" from={{ opacity: 0, y: 40 }} to={{ opacity: 1, y: 0 }}
                threshold={0.1} rootMargin="-100px" textAlign="left"
              />
            </h2>

            <p className="hero-desc">
              Completing your manuscript is only the creative phase of your journey. The real transformation happens next, where Bristol Publishers steps in to shape your work into a polished, globally accessible publication.
            </p>

            <div className="hero-cta-row">
              <button
                type="button"
                className="hero-cta-primary"
                onClick={() => openQuoteModal()}
              >
                GET A QUOTE
              </button>

              <span className="hero-cta-btn-outer">
                {CTA_PARTICLES.map((p, i) => (
                  <span
                    key={i}
                    className="hero-cta-particle"
                    aria-hidden="true"
                    style={{
                      width: p.size,
                      height: p.size,
                      background: p.color,
                      "--p-x": p.x,
                      "--p-y": p.y,
                      "--p-dur": p.dur,
                      "--p-delay": p.delay,
                    } as React.CSSProperties}
                  />
                ))}
                <a href={PHONE_TEL} className="hero-cta-main-btn">
                  <span className="hero-cta-shine" aria-hidden="true" />
                  <span className="hero-cta-phone-icon" aria-hidden="true">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                      stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.64A2 2 0 012 .82h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                    </svg>
                  </span>
                  {PHONE_DISPLAY}
                </a>
              </span>
            </div>
          </div>

          {/* RIGHT — glass form */}
          <div className="hero-form">
            <p className="hero-form-title">Get Started Today</p>
            <p className="hero-form-sub">Tell us about your book and we'll get back to you with a quote.</p>

            <div className="hero-form-fields">
              <div className="hf-field-wrap">
                <input
                  id="hf-name" className="hf-field-input" type="text" name="name"
                  placeholder=" " value={form.name} onChange={handleChange} autoComplete="name"
                />
                <span className="hf-field-icon">{iconUser}</span>
                <label htmlFor="hf-name" className="hf-field-label">Your Name *</label>
              </div>

              <div className="hf-field-wrap">
                <input
                  id="hf-email" className="hf-field-input" type="email" name="email"
                  placeholder=" " value={form.email} onChange={handleChange} autoComplete="email"
                />
                <span className="hf-field-icon">{iconEmail}</span>
                <label htmlFor="hf-email" className="hf-field-label">Email Address *</label>
              </div>

              <div className="hf-field-wrap">
                <input
                  id="hf-phone" className="hf-field-input" type="tel" name="phone"
                  placeholder=" " value={form.phone} onChange={handleChange} autoComplete="tel"
                />
                <span className="hf-field-icon">{iconPhone}</span>
                <label htmlFor="hf-phone" className="hf-field-label">Phone Number *</label>
              </div>

              <HeroServiceSelect
                value={form.service}
                onChange={(val) => { setForm(f => ({ ...f, service: val })); if (error) setError(""); }}
              />

              <label style={{display: "flex", alignItems: "flex-start", gap: "8px", fontSize: "12px", lineHeight: 1.5, color: "#6b7280", textAlign: "left", marginTop: "8px",}}>
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
                        <a href="/terms-of-service" target="_blank" rel="noopener noreferrer" style={{ color: "inherit", textDecoration: "underline" }}>
                          Terms of Service
                        </a>{" "}
                        and{" "}
                        <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" style={{ color: "inherit", textDecoration: "underline" }}>
                          Privacy Policy
                        </a>
                        , and I consent to being contacted by phone, email, or text message
                        regarding my inquiry. Message and data rates may apply. Consent is not a
                        condition of purchase.
                      </span>
                    </label>

              {error && (
                <div className="hf-error" role="alert">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  {error}
                </div>
              )}

              <button className="hf-submit-btn" onClick={handleSubmit} disabled={loading}>
                {loading ? (
                  <>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" style={{ animation: "rotateSlow 0.8s linear infinite" }}>
                      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                    </svg>
                    SENDING...
                  </>
                ) : (
                  <>
                    SUBMIT
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" />
                    </svg>
                  </>
                )}
              </button>
            </div>
          </div>

        </div>
      </section>
    </>
  );
};

export default Hero;