import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import SplitText from "./SplitText";

const contactStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(30px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeLeft {
    from { opacity: 0; transform: translateX(-40px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes fadeRight {
    from { opacity: 0; transform: translateX(40px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes rotateSlow {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }
  @keyframes orbPulse {
    0%, 100% { opacity: 0.45; transform: scale(1); }
    50%       { opacity: 0.75; transform: scale(1.1); }
  }
  @keyframes floatOrb {
    0%, 100% { transform: translateY(0px); }
    50%       { transform: translateY(-12px); }
  }

  /* ── Phone card animations (same feel as the hero phone CTA) ── */
  @keyframes ctPhoneFloat {
    0%, 100% { transform: translateY(0); }
    50%       { transform: translateY(-4px); }
  }
  @keyframes ctPhoneBlink {
    0%   { box-shadow: 0 6px 22px rgba(255,69,69,0.45), 0 0 0 0 rgba(255,69,69,0.55); }
    70%  { box-shadow: 0 6px 22px rgba(255,69,69,0.45), 0 0 0 14px rgba(255,69,69,0); }
    100% { box-shadow: 0 6px 22px rgba(255,69,69,0.45), 0 0 0 0 rgba(255,69,69,0); }
  }
  @keyframes ctPhoneShimmer {
    0%        { left: -120%; }
    40%, 100% { left: 160%; }
  }
  @keyframes ctPhoneRing {
    0%, 70%, 100% { transform: rotate(0deg) scale(1); }
    75%           { transform: rotate(-14deg) scale(1.12); }
    80%           { transform: rotate(12deg) scale(1.12); }
    85%           { transform: rotate(-10deg) scale(1.08); }
    90%           { transform: rotate(8deg) scale(1.04); }
  }
  @keyframes ctParticleFly {
    0%   { transform: translate(0, 0) scale(1); opacity: 0; }
    15%  { opacity: 1; }
    100% { transform: translate(var(--p-x), var(--p-y)) scale(0.2); opacity: 0; }
  }

  /* ════════════════════════════════════
     FORM FIELDS,  light solid fill, dark text (matches hero)
     ════════════════════════════════════ */
  .field-wrap { position: relative; }

  .field-input {
    width: 100%;
    background: #F2F6F8;
    border: 1px solid #F2F6F8;
    border-radius: 12px;
    padding: 24px 18px 10px 52px;
    color: #0A1A24;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.9rem;
    font-weight: 500;
    outline: none;
    transition: border-color 0.3s ease, background 0.3s ease, box-shadow 0.3s ease;
    box-sizing: border-box;
    caret-color: #FF4545;
  }
  .field-input::placeholder { color: transparent; }
  .field-input:hover { background: #FFFFFF; }
  .field-input:focus {
    background: #FFFFFF;
    border-color: #FF4545;
    box-shadow: 0 0 0 3px rgba(255,69,69,0.25);
  }
  .field-input:-webkit-autofill,
  .field-input:-webkit-autofill:hover,
  .field-input:-webkit-autofill:focus {
    -webkit-box-shadow: 0 0 0 1000px #FFFFFF inset;
    -webkit-text-fill-color: #0A1A24;
  }

  .field-icon {
    position: absolute; left: 18px; top: 50%;
    transform: translateY(-50%);
    color: rgba(10,26,36,0.55);
    transition: color 0.3s ease;
    pointer-events: none;
    display: flex; align-items: center;
  }
  .field-input:focus + .field-icon { color: #FF4545; }
  .field-icon-textarea { top: 22px; transform: none; }

  .field-label {
    position: absolute; left: 52px; top: 50%;
    transform: translateY(-50%);
    font-family: 'DM Sans', sans-serif;
    font-size: 0.88rem;
    font-weight: 500;
    color: rgba(10,26,36,0.72);
    pointer-events: none;
    transition: all 0.25s cubic-bezier(0.22,1,0.36,1);
  }
  .field-label-textarea { top: 20px; transform: none; }

  .field-input:focus ~ .field-label,
  .field-input:not(:placeholder-shown) ~ .field-label {
    top: 7px;
    transform: none;
    font-size: 0.68rem;
    font-weight: 600;
    color: #E03636;
    letter-spacing: 0.04em;
  }

  textarea.field-input {
    resize: none;
    padding-top: 28px;
    line-height: 1.65;
    min-height: 120px;
  }

  /* ── Custom Select Dropdown ── */
  .select-wrap { position: relative; }

  .select-trigger {
    width: 100%;
    min-height: 56px;
    background: #F2F6F8;
    border: 1px solid #F2F6F8;
    border-radius: 12px;
    padding: 24px 44px 10px 52px;
    color: #0A1A24;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.9rem;
    font-weight: 500;
    outline: none;
    cursor: pointer;
    transition: border-color 0.3s ease, background 0.3s ease, box-shadow 0.3s ease;
    box-sizing: border-box;
    text-align: left;
    display: flex; align-items: center;
    user-select: none;
    position: relative;
  }
  .select-trigger:hover { background: #FFFFFF; }
  .select-trigger.open,
  .select-trigger:focus-visible {
    background: #FFFFFF;
    border-color: #FF4545;
    box-shadow: 0 0 0 3px rgba(255,69,69,0.25);
  }

  .select-icon {
    position: absolute; left: 18px; top: 50%;
    transform: translateY(-50%);
    color: rgba(10,26,36,0.55);
    transition: color 0.3s ease;
    pointer-events: none;
    display: flex; align-items: center;
  }
  .select-trigger.open .select-icon { color: #FF4545; }

  .select-chevron {
    position: absolute; right: 16px; top: 50%;
    transform: translateY(-50%);
    color: rgba(10,26,36,0.55);
    transition: color 0.3s ease, transform 0.3s ease;
    pointer-events: none;
    display: flex; align-items: center;
  }
  .select-chevron.rotated { transform: translateY(-50%) rotate(180deg); color: #FF4545; }

  .select-label {
    position: absolute; left: 52px; top: 50%;
    transform: translateY(-50%);
    font-family: 'DM Sans', sans-serif;
    font-size: 0.88rem;
    font-weight: 500;
    color: rgba(10,26,36,0.72);
    pointer-events: none;
    transition: all 0.25s cubic-bezier(0.22,1,0.36,1);
  }
  .select-label.lifted {
    top: 7px;
    transform: none;
    font-size: 0.68rem;
    font-weight: 600;
    color: #E03636;
    letter-spacing: 0.04em;
  }

  .select-dropdown {
    position: absolute; top: calc(100% + 6px); left: 0; right: 0;
    background: #FFFFFF;
    border: 1px solid rgba(255,69,69,0.35);
    border-radius: 12px;
    z-index: 100;
    box-shadow: 0 20px 60px rgba(0,0,0,0.45);
    animation: fadeUp 0.2s ease forwards;
    max-height: 280px;
    overflow-y: auto;
  }
  .select-dropdown::-webkit-scrollbar { width: 4px; }
  .select-dropdown::-webkit-scrollbar-track { background: transparent; }
  .select-dropdown::-webkit-scrollbar-thumb { background: rgba(255,69,69,0.4); border-radius: 999px; }

  .select-option {
    padding: 13px 18px;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.88rem;
    font-weight: 500;
    color: #0A1A24;
    cursor: pointer;
    transition: background 0.18s ease, color 0.18s ease, padding-left 0.18s ease;
    display: flex; align-items: center; gap: 10px;
    border-bottom: 1px solid rgba(10,26,36,0.06);
  }
  .select-option:last-child { border-bottom: none; }
  .select-option:hover { background: rgba(255,69,69,0.08); color: #E03636; padding-left: 22px; }
  .select-option.selected { background: rgba(255,69,69,0.12); color: #E03636; }

  .select-option-dot {
    width: 6px; height: 6px; border-radius: 50%;
    background: rgba(255,69,69,0.45); flex-shrink: 0;
  }
  .select-option.selected .select-option-dot { background: #FF4545; }

  /* ── Submit Button ── */
  .submit-btn {
    width: 100%; padding: 16px;
    border-radius: 12px;
    background: linear-gradient(90deg, #FF4545 0%, #fe5858 100%);
    color: white;
    font-family: 'Montserrat', sans-serif;
    font-size: 0.9rem; letter-spacing: 0.15em;
    border: none; cursor: pointer;
    position: relative; overflow: hidden;
    transition: transform 0.25s ease, box-shadow 0.25s ease;
    box-shadow: 0 8px 32px rgba(255,69,69,0.3);
    display: flex; align-items: center; justify-content: center; gap: 10px;
  }
  .submit-btn::before {
    content: '';
    position: absolute; inset: 0;
    background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.12) 50%, transparent 100%);
    transform: translateX(-100%);
    transition: transform 0.5s ease;
  }
  .submit-btn:hover { transform: translateY(-3px); box-shadow: 0 16px 48px rgba(255,69,69,0.45); }
  .submit-btn:hover::before { transform: translateX(100%); }
  .submit-btn:active { transform: translateY(-1px); }
  .submit-btn:disabled { opacity: 0.75; cursor: not-allowed; transform: none; }
  .submit-btn:focus-visible,
  .ct-info-card:focus-visible { outline: 2px solid #FF4545; outline-offset: 3px; }

  .info-card {
    transition: transform 0.3s ease, border-color 0.3s ease;
  }
  .info-card:hover {
    transform: translateX(6px);
    border-color: rgba(255,69,69,0.4) !important;
  }

  .ct-section {
    background: linear-gradient(180deg, #1B465F 0%, #14384C 50%, #0E2432 100%);
    width: 100%;
    overflow: hidden;
    padding: 60px 0 70px;
    position: relative;
  }

  .ct-orb-tr {
    position: absolute; top: 15%; right: -6%;
    width: 240px; height: 240px; border-radius: 50%;
    background: radial-gradient(circle, rgba(255,69,69,0.07) 0%, transparent 65%);
    animation: orbPulse 6s ease-in-out infinite;
    pointer-events: none;
  }
  .ct-orb-bl {
    position: absolute; bottom: 10%; left: -5%;
    width: 200px; height: 200px; border-radius: 50%;
    background: radial-gradient(circle, rgba(27,70,95,0.55) 0%, transparent 70%);
    pointer-events: none;
  }
  .ct-grid-bg {
    position: absolute; inset: 0;
    background-image:
      linear-gradient(rgba(255,255,255,0.012) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.012) 1px, transparent 1px);
    background-size: 60px 60px;
    pointer-events: none;
  }
  .ct-ring {
    position: absolute; top: 8%; left: 4%;
    width: 100px; height: 100px;
    border: 1px dashed rgba(255,69,69,0.1);
    border-radius: 50%;
    animation: rotateSlow 22s linear infinite;
    pointer-events: none;
  }
  .ct-float-orb {
    position: absolute; top: 30%; right: 10%;
    width: 50px; height: 50px; border-radius: 50%;
    background: radial-gradient(circle, rgba(255,69,69,0.18) 0%, transparent 70%);
    animation: floatOrb 5s ease-in-out infinite;
    pointer-events: none;
    filter: blur(2px);
  }

  .ct-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 16px;
  }

  .ct-header { margin-bottom: 36px; }

  .ct-eyebrow {
    display: flex; align-items: center; gap: 12px;
    margin-bottom: 16px;
  }
  .ct-eyebrow-line {
    height: 2px; background: #FF4545;
    transition: width 0.8s ease 0.2s;
  }
  .ct-eyebrow-text {
    font-family: 'Montserrat', sans-serif;
    font-size: 0.7rem; letter-spacing: 0.25em; color: #FF4545;
  }

  .ct-heading {
    font-family: 'Montserrat', sans-serif;
    font-weight: 800;
    font-size: clamp(2rem, 7vw, 4.5rem);
    letter-spacing: -0.02em;
    line-height: 0.92;
    color: white;
    margin: 0;
  }

  .ct-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 32px;
    align-items: start;
  }

  .ct-info-cards {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-bottom: 0;
  }

  .ct-info-card {
    display: flex; align-items: center; gap: 14px;
    padding: 16px 18px;
    border-radius: 12px;
    background: rgba(255,255,255,0.028);
    border: 1px solid rgba(255,255,255,0.07);
    backdrop-filter: blur(6px);
    text-decoration: none;
  }

  .ct-info-icon {
    width: 40px; height: 40px; border-radius: 10px;
    flex-shrink: 0;
    background: rgba(255,69,69,0.1);
    border: 1px solid rgba(255,69,69,0.2);
    display: flex; align-items: center; justify-content: center;
    color: #FF4545;
  }

  .ct-info-label {
    font-family: 'Montserrat', sans-serif;
    font-size: 0.7rem; letter-spacing: 0.15em;
    color: rgba(255,255,255,0.35);
    margin: 0 0 2px;
  }
  .ct-info-value {
    font-family: 'DM Sans', sans-serif;
    font-size: clamp(0.8rem, 2vw, 0.92rem);
    color: rgba(255,255,255,0.75);
    margin: 0; font-weight: 400;
    word-break: break-all;
  }

  /* ════════════════════════════════════
     PHONE CARD,  animated like the phone CTA
     ════════════════════════════════════ */
  .ct-phone-outer {
    position: relative;
    animation: ctPhoneFloat 3.2s ease-in-out infinite;
  }
  .ct-phone-particle {
    position: absolute;
    border-radius: 50%;
    pointer-events: none;
    top: 50%; left: 50%;
    margin-top: -2px; margin-left: -2px;
    opacity: 0;
    animation: ctParticleFly var(--p-dur) ease-out var(--p-delay) infinite;
  }
  .ct-info-card.ct-phone-card {
    position: relative;
    overflow: hidden;
    background: linear-gradient(90deg, #fe5858e8 0%, #FF4545 100%);
    border: 1px solid rgba(255,255,255,0.18);
    animation: ctPhoneBlink 1.8s ease-out infinite;
    cursor: pointer;
  }
  .ct-info-card.ct-phone-card:hover {
    transform: scale(1.03);
    border-color: rgba(255,255,255,0.35) !important;
  }
  .ct-phone-card .ct-info-icon {
    background: rgba(255,255,255,0.18);
    border-color: rgba(255,255,255,0.35);
    color: #fff;
  }
  .ct-phone-card .ct-info-icon svg {
    animation: ctPhoneRing 3s ease-in-out infinite 1.5s;
  }
  .ct-phone-card .ct-info-label { color: rgba(255,255,255,0.85); }
  .ct-phone-card .ct-info-value { color: #fff; font-weight: 600; letter-spacing: 0.04em; }
  .ct-phone-shine {
    position: absolute; top: 0; left: -120%;
    width: 50%; height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.28), transparent);
    animation: ctPhoneShimmer 3.5s ease-in-out infinite 1.2s;
    pointer-events: none;
  }

  .ct-form-border {
    border-radius: 20px;
    padding: 2px;
    background: linear-gradient(135deg, rgba(255,69,69,0.35), rgba(26,36,95,0.6), rgba(255,69,69,0.2));
  }

  .ct-form-card {
    border-radius: 18px;
    background: linear-gradient(180deg, #1B465F 0%, #14384C 50%, #0E2432 100%);
    padding: 28px 20px;
    position: relative;
  }

  .ct-form-grid-bg {
    position: absolute; inset: 0;
    border-radius: inherit;
    background-image:
      linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px);
    background-size: 40px 40px;
    pointer-events: none;
  }

  .ct-form-fields {
    display: flex; flex-direction: column;
    gap: 16px; position: relative; z-index: 2;
  }

  .ct-name-phone {
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .ct-error {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.8rem;
    color: #FF8A8A;
    margin-top: 8px;
    padding: 10px 14px;
    background: rgba(255,69,69,0.1);
    border: 1px solid rgba(255,69,69,0.25);
    border-radius: 8px;
    display: flex; align-items: center; gap: 8px;
  }

  @media (min-width: 480px) {
    .ct-section    { padding: 70px 0 80px; }
    .ct-container  { padding: 0 22px; }
    .ct-header     { margin-bottom: 40px; }
    .ct-form-card  { padding: 32px 26px; }
    .ct-name-phone { grid-template-columns: 1fr 1fr; }
    .ct-info-card  { padding: 18px 20px; }
    .ct-orb-tr     { width: 300px; height: 300px; }
    .ct-orb-bl     { width: 260px; height: 260px; }
    .ct-ring       { width: 120px; height: 120px; }
  }

  @media (min-width: 768px) {
    .ct-section    { padding: 80px 0 90px; }
    .ct-container  { padding: 0 28px; }
    .ct-header     { margin-bottom: 52px; }
    .ct-eyebrow-text { font-size: 0.75rem; }
    .ct-grid {
      grid-template-columns: 1fr 1.2fr;
      gap: 36px;
    }
    .ct-info-cards { gap: 13px; }
    .ct-info-card  { padding: 18px 20px; border-radius: 13px; }
    .ct-info-icon  { width: 42px; height: 42px; border-radius: 11px; }
    .ct-form-border { border-radius: 22px; }
    .ct-form-card   { padding: 36px 30px; border-radius: 20px; }
    .ct-name-phone  { grid-template-columns: 1fr 1fr; }
    .ct-orb-tr { width: 360px; height: 360px; }
    .ct-orb-bl { width: 320px; height: 320px; }
    .ct-ring   { width: 140px; height: 140px; }
    .ct-float-orb { width: 64px; height: 64px; }
  }

  @media (min-width: 1024px) {
    .ct-section    { padding: 100px 0 110px; }
    .ct-container  { padding: 0 40px; }
    .ct-header     { margin-bottom: 60px; }
    .ct-grid {
      grid-template-columns: 1fr 1.35fr;
      gap: 48px;
    }
    .ct-info-cards { gap: 14px; }
    .ct-info-card  { padding: 18px 22px; border-radius: 14px; }
    .ct-info-icon  { width: 44px; height: 44px; border-radius: 12px; }
    .ct-info-value { font-size: 0.9rem; word-break: normal; }
    .ct-form-border { border-radius: 24px; }
    .ct-form-card   { padding: 40px 36px; border-radius: 22px; }
    .field-input    { padding: 25px 19px 11px 54px; font-size: 0.92rem; border-radius: 13px; }
    .field-label    { font-size: 0.9rem; left: 54px; }
    .select-trigger { padding: 25px 44px 11px 54px; font-size: 0.92rem; border-radius: 13px; min-height: 58px; }
    .select-label   { font-size: 0.9rem; left: 54px; }
    textarea.field-input { min-height: 130px; padding-top: 30px; }
    .submit-btn     { padding: 17px; font-size: 0.95rem; border-radius: 13px; }
    .ct-orb-tr { width: 420px; height: 420px; }
    .ct-orb-bl { width: 380px; height: 380px; }
    .ct-ring   { width: 155px; height: 155px; }
    .ct-float-orb { width: 76px; height: 76px; }
  }

  @media (min-width: 1440px) {
    .ct-section    { padding: 110px 0 120px; }
    .ct-container  { padding: 0 56px; max-width: 1380px; }
    .ct-header     { margin-bottom: 68px; }
    .ct-eyebrow-text { font-size: 0.85rem; }
    .ct-grid {
      grid-template-columns: 1fr 1.35fr;
      gap: 56px;
    }
    .ct-info-cards { gap: 14px; }
    .ct-info-card  { padding: 18px 22px; }
    .ct-info-value { font-size: 0.92rem; }
    .ct-form-border { border-radius: 26px; }
    .ct-form-card   { padding: 44px 40px; border-radius: 24px; }
    .field-input    { padding: 26px 20px 12px 56px; font-size: 0.95rem; border-radius: 14px; }
    .field-label    { font-size: 0.92rem; left: 56px; }
    .select-trigger { padding: 26px 44px 12px 56px; font-size: 0.95rem; border-radius: 14px; min-height: 60px; }
    .select-label   { font-size: 0.92rem; left: 56px; }
    textarea.field-input { min-height: 140px; }
    .submit-btn     { padding: 18px; font-size: 1rem; border-radius: 14px; }
    .ct-orb-tr { width: 460px; height: 460px; }
    .ct-orb-bl { width: 400px; height: 400px; }
    .ct-ring   { width: 160px; height: 160px; }
    .ct-float-orb { width: 80px; height: 80px; }
  }

  @media (min-width: 1920px) {
    .ct-section    { padding: 130px 0 140px; }
    .ct-container  { padding: 0 80px; max-width: 100%; }
    .ct-header     { margin-bottom: 80px; }
    .ct-grid { gap: 72px; }
    .ct-info-cards { gap: 16px; }
    .ct-info-card  { padding: 20px 26px; border-radius: 16px; }
    .ct-info-icon  { width: 58px; height: 58px; border-radius: 13px; }
    .ct-info-label { font-size: 1rem; }
    .ct-info-value { font-size: 1.2rem; }
    .ct-form-border { border-radius: 28px; }
    .ct-form-card   { padding: 52px 48px; border-radius: 26px; }
    .field-input    { padding: 32px 22px 14px 60px; font-size: 1.2rem; border-radius: 15px; }
    .field-label    { font-size: 1.1rem; left: 60px; }
    .field-icon     { left: 20px; }
    .select-trigger { padding: 32px 52px 14px 60px; font-size: 1.2rem; border-radius: 15px; min-height: 72px; }
    .select-label   { font-size: 1.1rem; left: 60px; }
    .select-icon    { left: 20px; }
    .select-chevron { right: 20px; }
    .field-input:focus ~ .field-label,
    .field-input:not(:placeholder-shown) ~ .field-label,
    .select-label.lifted { font-size: 0.85rem; top: 9px; }
    .select-option  { font-size: 1.1rem; padding: 16px 22px; }
    textarea.field-input { min-height: 155px; padding-top: 36px; }
    .field-label-textarea, .field-icon-textarea { top: 26px; }
    .submit-btn     { padding: 20px; font-size: 1.5rem; font-weight: 600; border-radius: 15px; letter-spacing: 0.18em; }
    .ct-eyebrow-text { font-size: 1.1rem; font-weight: 600; }
    .ct-heading { font-size: 4rem; }
    .ct-orb-tr { width: 560px; height: 560px; }
    .ct-orb-bl { width: 480px; height: 480px; }
    .ct-ring   { width: 180px; height: 180px; }
    .ct-float-orb { width: 90px; height: 90px; }
  }

  @media (min-width: 2560px) {
    .ct-section    { padding: 130px 0 140px; }
    .ct-container  { padding: 0 80px; max-width: 80%; }
    .ct-header     { margin-bottom: 80px; }
    .ct-grid { gap: 72px; }
    .ct-info-cards { gap: 16px; }
    .ct-info-card  { padding: 20px 26px; border-radius: 16px; }
    .ct-info-icon  { width: 58px; height: 58px; border-radius: 13px; }
    .ct-info-label { font-size: 1.2rem; }
    .ct-info-value { font-size: 1.8rem; }
    .ct-form-border { border-radius: 28px; }
    .ct-form-card   { padding: 52px 48px; border-radius: 26px; }
    .field-input    { padding: 38px 22px 16px 60px; font-size: 1.5rem; border-radius: 15px; }
    .field-label    { font-size: 1.3rem; left: 60px; }
    .field-icon     { left: 20px; }
    .select-trigger { padding: 38px 52px 16px 60px; font-size: 1.5rem; border-radius: 15px; min-height: 86px; }
    .select-label   { font-size: 1.3rem; left: 60px; }
    .select-icon    { left: 20px; }
    .select-chevron { right: 20px; }
    .field-input:focus ~ .field-label,
    .field-input:not(:placeholder-shown) ~ .field-label,
    .select-label.lifted { font-size: 1rem; top: 11px; }
    .select-option  { font-size: 1.3rem; padding: 18px 24px; }
    textarea.field-input { min-height: 155px; padding-top: 42px; }
    .field-label-textarea, .field-icon-textarea { top: 30px; }
    .submit-btn     { padding: 40px 30px; font-size: 1.5rem; font-weight: 600; border-radius: 15px; letter-spacing: 0.18em; }
    .ct-eyebrow-text { font-size: 1.3rem; font-weight: 600; }
    .ct-heading { font-size: 5rem; }
    .ct-orb-tr { width: 560px; height: 560px; }
    .ct-orb-bl { width: 480px; height: 480px; }
    .ct-ring   { width: 180px; height: 180px; }
    .ct-float-orb { width: 90px; height: 90px; }
  }

  @media (prefers-reduced-motion: reduce) {
    .ct-orb-tr    { animation: none !important; }
    .ct-ring      { animation: none !important; }
    .ct-float-orb { animation: none !important; }
    .ct-phone-outer,
    .ct-info-card.ct-phone-card,
    .ct-phone-shine,
    .ct-phone-card .ct-info-icon svg { animation: none !important; }
    .ct-phone-particle { display: none; }
  }
`;

const SERVICES_LIST = [
  "Ghostwriting & Writing Support",
  "Editing & Proofreading",
  "Book Cover Design",
  "Book Publishing",
  "Book Marketing & Promotion",
  "Audiobook Production",
];

/* Sparks that drift out from the phone card */
const PHONE_PARTICLES = Array.from({ length: 12 }, (_, i) => {
  const angle = (i / 12) * Math.PI * 2;
  const dist = 38 + (i % 3) * 10;
  return {
    x: `${Math.round(Math.cos(angle) * dist * 3.4)}px`,
    y: `${Math.round(Math.sin(angle) * dist)}px`,
    size: i % 3 === 0 ? 5 : 4,
    color: i % 2 === 0 ? "#FF4545" : "rgba(255,255,255,0.85)",
    dur: `${2.2 + (i % 4) * 0.35}s`,
    delay: `${(i * 0.24).toFixed(2)}s`,
  };
});

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
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

const phoneIcon = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.7A2 2 0 012 .99h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
  </svg>
);

const emailIcon = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
  </svg>
);

// ── Custom Select Component ──
interface SelectProps {
  value: string;
  onChange: (val: string) => void;
}

const ServiceSelect: React.FC<SelectProps> = ({ value, onChange }) => {
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
    <div className="select-wrap" ref={wrapRef}>
      <button
        type="button"
        className={`select-trigger${value ? " has-value" : ""}${open ? " open" : ""}`}
        onClick={() => setOpen(o => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Service interested in"
      >
        {value || ""}
        <span className="select-icon">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        </span>
        <span className={`select-chevron${open ? " rotated" : ""}`}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </span>
      </button>

      <span className={`select-label${value ? " lifted" : ""}`}>Service Interested In *</span>

      {open && (
        <div className="select-dropdown" role="listbox">
          {SERVICES_LIST.map((svc) => (
            <div
              key={svc}
              role="option"
              aria-selected={value === svc}
              className={`select-option${value === svc ? " selected" : ""}`}
              onClick={() => { onChange(svc); setOpen(false); }}
            >
              <span className="select-option-dot" />
              {svc}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ── Main ContactForm ──
const ContactForm: React.FC = () => {
  const navigate = useNavigate();
  const { ref, visible } = useInView(0.08);
  const [form, setForm] = useState({ name: "", phone: "", email: "", service: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
    if (error) setError("");
  };

  const handleServiceChange = (val: string) => {
    setForm(f => ({ ...f, service: val }));
    if (error) setError("");
  };

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message || !form.service) {
      setError("Please fill in all required fields,  Name, Email, Service, and Message.");
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
          Message: form.message,

        }),
      });

      const data = await res.json();
      console.log("Lead submitted:", data);

      navigate(`/thank-you?name=${encodeURIComponent(form.name)}&service=${encodeURIComponent(form.service)}`);
    } catch (err) {
      console.error("Submission error:", err);
      setError("Something went wrong. Please try again or email us directly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{contactStyles}</style>

      <section ref={ref} id="contact" className="ct-section">

        <div className="ct-orb-tr" />
        <div className="ct-orb-bl" />
        <div className="ct-grid-bg" />
        <div className="ct-ring" />
        <div className="ct-float-orb" />

        <div className="ct-container">

          {/* ── HEADER ── */}
          <div className="ct-header">
            <div
              className="ct-eyebrow"
              style={{ opacity: visible ? 1 : 0, animation: visible ? "fadeUp 0.6s ease forwards" : "none" }}
            >
              <div className="ct-eyebrow-line" style={{ width: visible ? "48px" : "0" }} />
              <span className="ct-eyebrow-text">START YOUR JOURNEY</span>
            </div>

            <h2
              className="ct-heading"
              style={{ opacity: visible ? 1 : 0, animation: visible ? "fadeUp 0.65s ease 0.1s forwards" : "none" }}
            >
              {visible && (
                <>
                  <SplitText
                    text="Let's prepare your" delay={35} duration={1.1} ease="power3.out"
                    splitType="chars" from={{ opacity: 0, y: 45 }} to={{ opacity: 1, y: 0 }}
                    threshold={0.1} rootMargin="-50px" textAlign="left"
                  />
                  {" "}
                  <br />
                  <SplitText
                    text="book" className="text-[#FF4545]"
                    delay={42} duration={1.2} ease="power3.out"
                    splitType="chars" from={{ opacity: 0, y: 45 }} to={{ opacity: 1, y: 0 }}
                    threshold={0.1} rootMargin="-50px" textAlign="left"
                  />
                  <br />
                  <SplitText
                    text="for readers beyond the draft stage"
                    delay={42} duration={1.2} ease="power3.out"
                    splitType="chars" from={{ opacity: 0, y: 45 }} to={{ opacity: 1, y: 0 }}
                    threshold={0.1} rootMargin="-50px" textAlign="left"
                  />
                </>
              )}
            </h2>
          </div>

          {/* ── MAIN GRID ── */}
          <div className="ct-grid">

            {/* LEFT,  Info cards */}
            <div
              style={{ opacity: visible ? 1 : 0, animation: visible ? "fadeLeft 0.9s ease 0.3s forwards" : "none" }}
            >
              <div className="ct-info-cards">

                {/* Phone,  animated CTA card */}
                <div className="ct-phone-outer">
                  {PHONE_PARTICLES.map((p, i) => (
                    <span
                      key={i}
                      className="ct-phone-particle"
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
                  <a href="tel:+17373855397" className="info-card ct-info-card ct-phone-card">
                    <span className="ct-phone-shine" aria-hidden="true" />
                    <div className="ct-info-icon">{phoneIcon}</div>
                    <div>
                      <p className="ct-info-label">CALL US NOW</p>
                      <p className="ct-info-value">(737) 385-5397</p>
                    </div>
                  </a>
                </div>

                {/* Email */}
                <a href="mailto:info@bristolpublishers.com" className="info-card ct-info-card">
                  <div className="ct-info-icon">{emailIcon}</div>
                  <div>
                    <p className="ct-info-label">Email</p>
                    <p className="ct-info-value">info@bristolpublishers.com</p>
                  </div>
                </a>

              </div>
            </div>

            {/* RIGHT,  Form */}
            <div
              style={{ opacity: visible ? 1 : 0, animation: visible ? "fadeRight 0.9s ease 0.4s forwards" : "none" }}
            >
              <div className="ct-form-border">
                <div className="ct-form-card">
                  <div className="ct-form-grid-bg" />

                  <div className="ct-form-fields">

                    {/* Name + Phone row */}
                    <div className="ct-name-phone">
                      <div className="field-wrap">
                        <input id="ct-name" className="field-input" type="text" name="name" placeholder=" " value={form.name} onChange={handleChange} autoComplete="name" />
                        <span className="field-icon">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" />
                          </svg>
                        </span>
                        <label htmlFor="ct-name" className="field-label">Full Name *</label>
                      </div>

                      <div className="field-wrap">
                        <input id="ct-phone" className="field-input" type="tel" name="phone" placeholder=" " value={form.phone} onChange={handleChange} autoComplete="tel" />
                        <span className="field-icon">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.7A2 2 0 012 .99h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                          </svg>
                        </span>
                        <label htmlFor="ct-phone" className="field-label">Phone Number *</label>
                      </div>
                    </div>

                    {/* Email */}
                    <div className="field-wrap">
                      <input id="ct-email" className="field-input" type="email" name="email" placeholder=" " value={form.email} onChange={handleChange} autoComplete="email" />
                      <span className="field-icon">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
                        </svg>
                      </span>
                      <label htmlFor="ct-email" className="field-label">Email Address *</label>
                    </div>

                    {/* Service Dropdown */}
                    <ServiceSelect value={form.service} onChange={handleServiceChange} />

                    {/* Message */}
                    <div className="field-wrap">
                      <textarea id="ct-message" className="field-input" name="message" placeholder=" " value={form.message} onChange={handleChange} />
                      <span className="field-icon field-icon-textarea">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                        </svg>
                      </span>
                      <label htmlFor="ct-message" className="field-label field-label-textarea">Your Message *</label>
                    </div>

                    <label style={{ display: "flex", alignItems: "flex-start", gap: "8px", fontSize: "12px", lineHeight: 1.5, color: "#6b7280", textAlign: "left", marginTop: "8px", }}>
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

                    {/* Error */}
                    {error && (
                      <div className="ct-error" role="alert">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                        </svg>
                        {error}
                      </div>
                    )}

                    {/* Submit */}
                    <button className="submit-btn" onClick={handleSubmit} disabled={loading}>
                      {loading ? (
                        <>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" style={{ animation: "rotateSlow 0.8s linear infinite" }}>
                            <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                          </svg>
                          SENDING...
                        </>
                      ) : (
                        <>
                          <span style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 600 }}>SEND NOW</span>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" />
                          </svg>
                        </>
                      )}
                    </button>

                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default ContactForm;