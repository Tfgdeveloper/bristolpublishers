import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const thankYouStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes slideUp {
    from { opacity: 0; transform: translateY(60px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes orbPulse {
    0%, 100% { opacity: 0.45; transform: scale(1); }
    50%       { opacity: 0.75; transform: scale(1.1); }
  }
  @keyframes rotateSlow {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }
  @keyframes floatOrb {
    0%, 100% { transform: translateY(0px); }
    50%       { transform: translateY(-14px); }
  }
  @keyframes ringPulse {
    0%, 100% { box-shadow: 0 0 0 0 rgba(255,69,69,0.4); }
    50%       { box-shadow: 0 0 0 18px rgba(255,69,69,0); }
  }
  @keyframes checkDraw {
    from { stroke-dashoffset: 60; }
    to   { stroke-dashoffset: 0; }
  }
  @keyframes checkScale {
    from { opacity: 0; transform: scale(0.5); }
    60%  { transform: scale(1.1); }
    to   { opacity: 1; transform: scale(1); }
  }
  @keyframes badgePop {
    from { opacity: 0; transform: scale(0.8) translateY(10px); }
    to   { opacity: 1; transform: scale(1) translateY(0); }
  }
  @keyframes stepSlide {
    from { opacity: 0; transform: translateX(-20px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes dotBlink {
    0%, 80%, 100% { opacity: 0.2; transform: scale(0.8); }
    40%           { opacity: 1;   transform: scale(1); }
  }
  @keyframes lineGrow {
    from { width: 0; }
    to   { width: 48px; }
  }

  .ty-page {
    min-height: 100vh;
    background: linear-gradient(180deg, #1B465F 0%, #14384C 45%, #0E2432 100%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 60px 20px;
    position: relative;
    overflow: hidden;
    animation: fadeIn 0.5s ease forwards;
  }

  .ty-bg-grid {
    position: absolute; inset: 0;
    background-image:
      linear-gradient(rgba(255,255,255,0.012) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.012) 1px, transparent 1px);
    background-size: 60px 60px;
    pointer-events: none;
  }
  .ty-orb-tr {
    position: absolute; top: 8%; right: -6%;
    width: 420px; height: 420px; border-radius: 50%;
    background: radial-gradient(circle, rgba(255,69,69,0.07) 0%, transparent 65%);
    animation: orbPulse 6s ease-in-out infinite;
    pointer-events: none;
  }
  .ty-orb-bl {
    position: absolute; bottom: 5%; left: -8%;
    width: 380px; height: 380px; border-radius: 50%;
    background: radial-gradient(circle, rgba(27,70,95,0.6) 0%, transparent 70%);
    pointer-events: none;
  }
  .ty-orb-mid {
    position: absolute; top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    width: 700px; height: 700px; border-radius: 50%;
    background: radial-gradient(circle, rgba(255,69,69,0.025) 0%, transparent 60%);
    pointer-events: none;
  }
  .ty-ring-tl {
    position: absolute; top: 6%; left: 5%;
    width: 110px; height: 110px;
    border: 1px dashed rgba(255,69,69,0.1);
    border-radius: 50%;
    animation: rotateSlow 22s linear infinite;
    pointer-events: none;
  }
  .ty-ring-br {
    position: absolute; bottom: 8%; right: 7%;
    width: 80px; height: 80px;
    border: 1px dashed rgba(255,255,255,0.06);
    border-radius: 50%;
    animation: rotateSlow 18s linear infinite reverse;
    pointer-events: none;
  }
  .ty-float-1 {
    position: absolute; top: 22%; right: 12%;
    width: 54px; height: 54px; border-radius: 50%;
    background: radial-gradient(circle, rgba(255,69,69,0.18) 0%, transparent 70%);
    animation: floatOrb 5s ease-in-out infinite;
    filter: blur(2px);
    pointer-events: none;
  }
  .ty-float-2 {
    position: absolute; bottom: 20%; left: 10%;
    width: 36px; height: 36px; border-radius: 50%;
    background: radial-gradient(circle, rgba(255,69,69,0.12) 0%, transparent 70%);
    animation: floatOrb 7s ease-in-out infinite 1.5s;
    filter: blur(2px);
    pointer-events: none;
  }

  .ty-brand {
    position: relative; z-index: 2;
    display: flex; align-items: center; gap: 10px;
    margin-bottom: 40px;
    animation: slideUp 0.5s ease 0.05s both;
  }
  .ty-brand-dot {
    width: 8px; height: 8px; border-radius: 50%;
    background: #FF4545;
    box-shadow: 0 0 10px rgba(255,69,69,0.6);
  }
  .ty-brand-name {
    font-family: 'Montserrat', sans-serif;
    font-size: 0.75rem;
    letter-spacing: 0.3em;
    color: rgba(255,255,255,0.35);
    font-weight: 500;
  }

  .ty-card {
    position: relative; z-index: 2;
    width: 100%;
    max-width: 580px;
    background: rgba(255,255,255,0.028);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 28px;
    padding: 52px 40px 44px;
    text-align: center;
    backdrop-filter: blur(14px);
    box-shadow:
      0 40px 100px rgba(0,0,0,0.45),
      0 0 0 1px rgba(255,255,255,0.04) inset,
      0 1px 0 rgba(255,255,255,0.1) inset;
    animation: slideUp 0.7s cubic-bezier(0.22,1,0.36,1) 0.1s both;
  }

  .ty-card::before {
    content: '';
    position: absolute; inset: -1px;
    border-radius: 29px;
    background: linear-gradient(
      135deg,
      rgba(255,69,69,0.35) 0%,
      rgba(255,255,255,0.04) 40%,
      rgba(255,69,69,0.2) 80%,
      rgba(255,255,255,0.04) 100%
    );
    z-index: -1;
    pointer-events: none;
  }

  .ty-icon-wrap {
    position: relative;
    width: 100px; height: 100px;
    margin: 0 auto 30px;
  }
  .ty-icon-ring-outer {
    position: absolute; inset: -12px;
    border: 1px dashed rgba(255,69,69,0.2);
    border-radius: 50%;
    animation: rotateSlow 14s linear infinite;
  }
  .ty-icon-ring-inner {
    position: absolute; inset: -4px;
    border: 1px solid rgba(255,69,69,0.1);
    border-radius: 50%;
    animation: rotateSlow 9s linear infinite reverse;
  }
  .ty-icon-circle {
    width: 100px; height: 100px; border-radius: 50%;
    background: rgba(255,69,69,0.1);
    border: 2px solid rgba(255,69,69,0.35);
    display: flex; align-items: center; justify-content: center;
    position: relative; z-index: 1;
    animation: checkScale 0.6s cubic-bezier(0.22,1,0.36,1) 0.4s both,
               ringPulse 3s ease 1.5s infinite;
  }

  .ty-badge {
    display: inline-flex; align-items: center; gap: 8px;
    background: rgba(255,69,69,0.1);
    border: 1px solid rgba(255,69,69,0.25);
    border-radius: 999px;
    padding: 7px 18px;
    margin-bottom: 22px;
    animation: badgePop 0.5s cubic-bezier(0.22,1,0.36,1) 0.7s both;
  }
  .ty-badge-dot {
    width: 7px; height: 7px; border-radius: 50%;
    background: #FF4545;
    box-shadow: 0 0 8px rgba(255,69,69,0.7);
    animation: dotBlink 1.6s ease-in-out infinite;
  }
  .ty-badge-text {
    font-family: 'Montserrat', sans-serif;
    font-size: 0.65rem;
    letter-spacing: 0.22em;
    color: #FF4545;
    font-weight: 600;
  }

  .ty-eyebrow {
    display: flex; align-items: center; justify-content: center; gap: 12px;
    margin-bottom: 14px;
    animation: slideUp 0.5s ease 0.85s both;
  }
  .ty-eyebrow-line {
    height: 2px; width: 32px;
    background: linear-gradient(90deg, transparent, #FF4545);
    border-radius: 999px;
    animation: lineGrow 0.6s ease 1s both;
  }
  .ty-eyebrow-line.right {
    background: linear-gradient(90deg, #FF4545, transparent);
  }
  .ty-eyebrow-text {
    font-family: 'Montserrat', sans-serif;
    font-size: 0.65rem;
    letter-spacing: 0.25em;
    color: rgba(255,255,255,0.3);
  }

  .ty-title {
    font-family: 'Montserrat', sans-serif;
    font-weight: 800;
    font-size: clamp(2rem, 6vw, 3rem);
    letter-spacing: -0.025em;
    line-height: 1.05;
    color: white;
    margin: 0 0 14px;
    animation: slideUp 0.6s ease 0.9s both;
  }
  .ty-title-accent { color: #FF4545; }

  .ty-sub {
    font-family: 'DM Sans', sans-serif;
    font-size: clamp(0.88rem, 2.2vw, 1rem);
    color: rgba(255,255,255,0.45);
    font-weight: 300;
    line-height: 1.72;
    margin: 0 auto 28px;
    max-width: 420px;
    animation: slideUp 0.6s ease 1s both;
  }

  .ty-service-pill {
    display: inline-flex; align-items: center; gap: 10px;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.09);
    border-radius: 12px;
    padding: 12px 20px;
    margin-bottom: 32px;
    animation: slideUp 0.5s ease 1.1s both;
  }
  .ty-service-label {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.78rem;
    color: rgba(255,255,255,0.3);
    font-weight: 300;
  }
  .ty-service-value {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.88rem;
    color: white;
    font-weight: 400;
  }

  .ty-divider {
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent);
    margin: 0 0 28px;
    animation: fadeIn 0.4s ease 1.2s both;
  }

  .ty-steps-label {
    font-family: 'Montserrat', sans-serif;
    font-size: 0.65rem;
    letter-spacing: 0.2em;
    color: rgba(255,255,255,0.25);
    margin-bottom: 16px;
    text-align: left;
    animation: fadeIn 0.4s ease 1.2s both;
  }

  .ty-steps {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 32px;
    text-align: left;
  }

  .ty-step {
    display: flex; align-items: flex-start; gap: 14px;
    padding: 14px 16px;
    background: rgba(255,255,255,0.022);
    border: 1px solid rgba(255,255,255,0.055);
    border-radius: 13px;
    transition: border-color 0.3s ease, background 0.3s ease;
  }
  .ty-step:hover {
    background: rgba(255,255,255,0.038);
    border-color: rgba(255,69,69,0.2);
  }
  .ty-step:nth-child(1) { animation: stepSlide 0.5s ease 1.3s both; }
  .ty-step:nth-child(2) { animation: stepSlide 0.5s ease 1.42s both; }
  .ty-step:nth-child(3) { animation: stepSlide 0.5s ease 1.54s both; }

  .ty-step-icon {
    width: 32px; height: 32px; border-radius: 9px;
    background: rgba(255,69,69,0.1);
    border: 1px solid rgba(255,69,69,0.18);
    flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
    color: #FF4545;
  }

  .ty-step-title {
    font-family: 'Montserrat', sans-serif;
    font-size: 0.78rem;
    font-weight: 600;
    color: rgba(255,255,255,0.85);
    margin: 0 0 3px;
    letter-spacing: 0.02em;
  }
  .ty-step-desc {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.82rem;
    color: rgba(255,255,255,0.4);
    font-weight: 300;
    line-height: 1.55;
    margin: 0;
  }

  .ty-btn {
    width: 100%;
    padding: 17px;
    border-radius: 13px;
    background: linear-gradient(90deg, #FF4545 0%, #fe5858 100%);
    color: white;
    font-family: 'Montserrat', sans-serif;
    font-size: 0.88rem;
    letter-spacing: 0.15em;
    font-weight: 700;
    border: none; cursor: pointer;
    position: relative; overflow: hidden;
    transition: transform 0.25s ease, box-shadow 0.25s ease;
    box-shadow: 0 8px 32px rgba(255,69,69,0.35);
    display: flex; align-items: center; justify-content: center; gap: 10px;
    margin-bottom: 18px;
    animation: slideUp 0.5s ease 1.65s both;
  }
  .ty-btn::before {
    content: '';
    position: absolute; inset: 0;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent);
    transform: translateX(-100%);
    transition: transform 0.55s ease;
  }
  .ty-btn:hover { transform: translateY(-3px); box-shadow: 0 16px 48px rgba(255,69,69,0.5); }
  .ty-btn:hover::before { transform: translateX(100%); }
  .ty-btn:active { transform: translateY(-1px); }

  .ty-fine {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.75rem;
    color: rgba(255,255,255,0.2);
    animation: fadeIn 0.4s ease 1.8s both;
  }
  .ty-fine a {
    color: rgba(255,69,69,0.55);
    text-decoration: none;
    transition: color 0.2s ease;
  }
  .ty-fine a:hover { color: #FF4545; }

  .ty-dots {
    position: relative; z-index: 2;
    display: flex; gap: 8px;
    margin-top: 32px;
    animation: fadeIn 0.4s ease 2s both;
  }
  .ty-dot {
    width: 6px; height: 6px; border-radius: 50%;
    background: rgba(255,255,255,0.1);
  }
  .ty-dot.active {
    background: #FF4545;
    box-shadow: 0 0 8px rgba(255,69,69,0.5);
  }

  @media (max-width: 479px) {
    .ty-card { padding: 36px 20px 30px; border-radius: 22px; }
    .ty-icon-wrap { width: 84px; height: 84px; margin-bottom: 24px; }
    .ty-icon-circle { width: 84px; height: 84px; }
    .ty-title { font-size: 1.8rem; }
    .ty-steps { gap: 8px; }
    .ty-step { padding: 12px 14px; }
    .ty-orb-tr { width: 260px; height: 260px; }
    .ty-orb-bl { width: 240px; height: 240px; }
  }

  @media (min-width: 768px) {
    .ty-card { padding: 60px 52px 52px; }
    .ty-icon-wrap { width: 108px; height: 108px; }
    .ty-icon-circle { width: 108px; height: 108px; }
    .ty-steps { gap: 12px; }
  }

  @media (min-width: 1440px) {
    .ty-card { max-width: 640px; padding: 68px 60px 60px; }
    .ty-title { font-size: 3.2rem; }
    .ty-sub { font-size: 1.05rem; max-width: 460px; }
    .ty-step-title { font-size: 0.82rem; }
    .ty-step-desc { font-size: 0.86rem; }
    .ty-btn { font-size: 0.95rem; padding: 18px; border-radius: 14px; }
    .ty-orb-tr { width: 500px; height: 500px; }
    .ty-orb-bl { width: 440px; height: 440px; }
  }

  @media (min-width: 1920px) {
    .ty-card { max-width: 720px; padding: 80px 72px 68px; }
    .ty-icon-wrap { width: 120px; height: 120px; }
    .ty-icon-circle { width: 120px; height: 120px; }
    .ty-title { font-size: 3.8rem; }
    .ty-sub { font-size: 1.15rem; max-width: 520px; }
    .ty-badge-text { font-size: 0.75rem; }
    .ty-step { padding: 18px 20px; border-radius: 16px; }
    .ty-step-icon { width: 38px; height: 38px; border-radius: 11px; }
    .ty-step-title { font-size: 0.92rem; }
    .ty-step-desc { font-size: 0.96rem; }
    .ty-btn { font-size: 1.1rem; padding: 20px; letter-spacing: 0.18em; }
    .ty-fine { font-size: 0.88rem; }
    .ty-eyebrow-text { font-size: 0.75rem; }
    .ty-brand-name { font-size: 0.85rem; }
  }

  @media (min-width: 2560px) {
    .ty-card { max-width: 860px; padding: 96px 88px 80px; }
    .ty-icon-wrap { width: 140px; height: 140px; }
    .ty-icon-circle { width: 140px; height: 140px; }
    .ty-title { font-size: 4.8rem; }
    .ty-sub { font-size: 1.35rem; max-width: 640px; }
    .ty-step { padding: 22px 24px; border-radius: 18px; }
    .ty-step-icon { width: 44px; height: 44px; }
    .ty-step-title { font-size: 1.05rem; }
    .ty-step-desc { font-size: 1.1rem; }
    .ty-btn { font-size: 1.3rem; padding: 24px; }
    .ty-fine { font-size: 1rem; }
    .ty-steps-label { font-size: 0.8rem; }
  }

  @media (prefers-reduced-motion: reduce) {
    .ty-orb-tr, .ty-ring-tl, .ty-ring-br,
    .ty-float-1, .ty-float-2,
    .ty-icon-ring-outer, .ty-icon-ring-inner { animation: none !important; }
  }
`;

const ThankYou: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const name = searchParams.get("name") || "Author";
  const service = searchParams.get("service") || "";

  const firstName = name.split(" ")[0];

  return (
    <>
      <title>Thank You | Bristol Publishers</title>
      <style>{thankYouStyles}</style>

      <div className="ty-page">

        <div className="ty-bg-grid" />
        <div className="ty-orb-tr" />
        <div className="ty-orb-bl" />
        <div className="ty-orb-mid" />
        <div className="ty-ring-tl" />
        <div className="ty-ring-br" />
        <div className="ty-float-1" />
        <div className="ty-float-2" />

        {/* Brand */}
        <div className="ty-brand">
          <div className="ty-brand-dot" />
          <span className="ty-brand-name">BRISTOL PUBLISHERS</span>
        </div>

        {/* Card */}
        <div className="ty-card">

          {/* Icon */}
          <div className="ty-icon-wrap">
            <div className="ty-icon-ring-outer" />
            <div className="ty-icon-ring-inner" />
            <div className="ty-icon-circle">
              <svg
                width="42" height="42" viewBox="0 0 24 24"
                fill="none" stroke="#FF4545" strokeWidth="2.2"
                strokeLinecap="round" strokeLinejoin="round"
              >
                <polyline
                  points="20 6 9 17 4 12"
                  style={{
                    strokeDasharray: 60,
                    strokeDashoffset: 60,
                    animation: "checkDraw 0.7s ease 0.9s forwards",
                  }}
                />
              </svg>
            </div>
          </div>

          {/* Badge */}
          <div className="ty-badge">
            <div className="ty-badge-dot" />
            <span className="ty-badge-text">MESSAGE RECEIVED</span>
          </div>

          {/* Eyebrow */}
          <div className="ty-eyebrow">
            <div className="ty-eyebrow-line" />
            <span className="ty-eyebrow-text">YOUR JOURNEY BEGINS</span>
            <div className="ty-eyebrow-line right" />
          </div>

          {/* Title */}
          <h1 className="ty-title">
            Thank you,{" "}
            <span className="ty-title-accent">{firstName}!</span>
          </h1>

          {/* Subtitle */}
          <p className="ty-sub">
            Your enquiry has been successfully submitted. Our publishing team will carefully review your details and be in touch shortly.
          </p>

          {/* Service pill */}
          {service && (
            <div className="ty-service-pill">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FF4545" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              <span className="ty-service-label">Service Requested:</span>
              <span className="ty-service-value">{service}</span>
            </div>
          )}

          <div className="ty-divider" />

          {/* Steps */}
          <p className="ty-steps-label">WHAT HAPPENS NEXT</p>

          <div className="ty-steps">

            <div className="ty-step">
              <div className="ty-step-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <div>
                <p className="ty-step-title">Confirmation Email</p>
                <p className="ty-step-desc">A copy of your submission will arrive in your inbox within the next few minutes.</p>
              </div>
            </div>

            <div className="ty-step">
              <div className="ty-step-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <path d="M21 21l-4.35-4.35" />
                </svg>
              </div>
              <div>
                <p className="ty-step-title">Team Review</p>
                <p className="ty-step-desc">A Bristol publishing consultant will review your enquiry and prepare the right approach for your book.</p>
              </div>
            </div>

            <div className="ty-step">
              <div className="ty-step-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.7A2 2 0 012 .99h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                </svg>
              </div>
              <div>
                <p className="ty-step-title">We Reach Out — Within 24 Hours</p>
                <p className="ty-step-desc">Expect a personal call or email to discuss your project and map out the next steps together.</p>
              </div>
            </div>

          </div>

          {/* CTA */}
          <button
            className="ty-btn"
            onClick={() => navigate("/")}
          >
            BACK TO WEBSITE
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>

          <p className="ty-fine">
            Bristol Publishers &nbsp;·&nbsp;{" "}
            <a href="mailto:info@bristolpublishers.com">info@bristolpublishers.com</a>
          </p>

        </div>

        <div className="ty-dots">
          <div className="ty-dot" />
          <div className="ty-dot active" />
          <div className="ty-dot" />
        </div>

      </div>
    </>
  );
};

export default ThankYou;