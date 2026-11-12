import React, { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";

/* ════════════════════════════════════
   CONFIG
   ════════════════════════════════════ */
const LEAD_URL =
  "https://leads.authorpublishers.us/api/lead/hqiSJReizNxoPkBqXxCcfLr3haDtYvBM";

const SERVICES_LIST = [
  "Ghostwriting & Writing Support",
  "Editing & Proofreading",
  "Book Cover Design",
  "Book Publishing",
  "Book Marketing & Promotion",
  "Audiobook Production",
];

/* ════════════════════════════════════
   STYLES (prefixed qm- so they never clash with other sections)
   ════════════════════════════════════ */
const qmStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600;700;800&family=DM+Sans:wght@400;500;600&display=swap');

  @keyframes qmFadeIn  { from { opacity: 0; } to { opacity: 1; } }
  @keyframes qmFadeOut { from { opacity: 1; } to { opacity: 0; } }
  @keyframes qmPopIn {
    from { opacity: 0; transform: translateY(24px) scale(0.97); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }
  @keyframes qmPopOut {
    from { opacity: 1; transform: translateY(0) scale(1); }
    to   { opacity: 0; transform: translateY(16px) scale(0.98); }
  }
  @keyframes qmDropIn {
    from { opacity: 0; transform: translateY(8px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes qmSpin { to { transform: rotate(360deg); } }

  /* ── Backdrop ── */
  .qm-overlay {
    position: fixed; inset: 0;
    z-index: 10000;
    display: flex; align-items: center; justify-content: center;
    padding: 16px;
    background: rgba(6,16,22,0.72);
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
    animation: qmFadeIn 0.22s ease forwards;
  }
  .qm-overlay.closing { animation: qmFadeOut 0.18s ease forwards; }

  /* ── Dialog ── */
  .qm-border {
    position: relative;
    width: 100%;
    max-width: 560px;
    border-radius: 22px;
    padding: 2px;
    background: linear-gradient(135deg, rgba(255,69,69,0.55), rgba(26,36,95,0.7), rgba(255,69,69,0.3));
    box-shadow: 0 30px 80px rgba(0,0,0,0.55);
    animation: qmPopIn 0.28s cubic-bezier(0.22,1,0.36,1) forwards;
  }
  .qm-overlay.closing .qm-border { animation: qmPopOut 0.18s ease forwards; }

  .qm-card {
    position: relative;
    border-radius: 20px;
    background: linear-gradient(180deg, #1B465F 0%, #14384C 50%, #0E2432 100%);
    padding: 28px 20px 24px;
    max-height: calc(100vh - 36px);
    max-height: calc(100dvh - 36px);
    overflow-y: auto;
    box-sizing: border-box;
  }
  .qm-card::-webkit-scrollbar { width: 4px; }
  .qm-card::-webkit-scrollbar-thumb { background: rgba(255,69,69,0.4); border-radius: 999px; }

  .qm-close {
    position: absolute; top: 14px; right: 14px;
    width: 36px; height: 36px;
    border-radius: 50%;
    border: 1px solid rgba(255,255,255,0.18);
    background: rgba(255,255,255,0.06);
    color: #fff;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer;
    transition: background 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
    z-index: 3;
  }
  .qm-close:hover { background: #FF4545; border-color: #FF4545; transform: rotate(90deg); }

  .qm-title {
    font-family: 'Montserrat', sans-serif;
    font-weight: 800;
    font-size: 1.5rem;
    letter-spacing: -0.02em;
    line-height: 1.1;
    color: #fff;
    margin: 0 44px 6px 0;
  }
  .qm-title span { color: #FF4545; }
  .qm-sub {
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    line-height: 1.55;
    color: rgba(255,255,255,0.7);
    margin: 0 0 22px;
  }

  .qm-fields { display: flex; flex-direction: column; gap: 14px; }
  .qm-row { display: grid; grid-template-columns: 1fr; gap: 14px; }

  /* ── Fields,  light solid fill, dark text ── */
  .qm-field { position: relative; }

  .qm-input {
    width: 100%;
    background: #F2F6F8;
    border: 1px solid #F2F6F8;
    border-radius: 12px;
    padding: 24px 16px 10px 48px;
    color: #0A1A24;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    font-weight: 500;
    outline: none;
    box-sizing: border-box;
    caret-color: #FF4545;
    transition: border-color 0.25s ease, background 0.25s ease, box-shadow 0.25s ease;
  }
  .qm-input::placeholder { color: transparent; }
  .qm-input:hover { background: #fff; }
  .qm-input:focus {
    background: #fff;
    border-color: #FF4545;
    box-shadow: 0 0 0 3px rgba(255,69,69,0.25);
  }
  .qm-input:-webkit-autofill,
  .qm-input:-webkit-autofill:hover,
  .qm-input:-webkit-autofill:focus {
    -webkit-box-shadow: 0 0 0 1000px #fff inset;
    -webkit-text-fill-color: #0A1A24;
  }
  textarea.qm-input {
    resize: none;
    min-height: 100px;
    padding-top: 28px;
    line-height: 1.6;
  }

  .qm-icon {
    position: absolute; left: 16px; top: 50%;
    transform: translateY(-50%);
    color: rgba(10,26,36,0.55);
    pointer-events: none;
    display: flex; align-items: center;
    transition: color 0.25s ease;
  }
  .qm-icon-textarea { top: 20px; transform: none; }
  .qm-input:focus + .qm-icon { color: #FF4545; }

  .qm-label {
    position: absolute; left: 48px; top: 50%;
    transform: translateY(-50%);
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    font-weight: 500;
    color: rgba(10,26,36,0.72);
    pointer-events: none;
    transition: all 0.22s cubic-bezier(0.22,1,0.36,1);
  }
  .qm-label-textarea { top: 18px; transform: none; }
  .qm-input:focus ~ .qm-label,
  .qm-input:not(:placeholder-shown) ~ .qm-label,
  .qm-label.lifted {
    top: 7px;
    transform: none;
    font-size: 10.5px;
    font-weight: 600;
    color: #E03636;
    letter-spacing: 0.04em;
  }

  /* ── Select ── */
  .qm-select-trigger {
    width: 100%;
    min-height: 54px;
    background: #F2F6F8;
    border: 1px solid #F2F6F8;
    border-radius: 12px;
    padding: 24px 42px 10px 48px;
    color: #0A1A24;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    font-weight: 500;
    text-align: left;
    cursor: pointer;
    display: flex; align-items: center;
    box-sizing: border-box;
    transition: border-color 0.25s ease, background 0.25s ease, box-shadow 0.25s ease;
  }
  .qm-select-trigger:hover { background: #fff; }
  .qm-select-trigger.open,
  .qm-select-trigger:focus-visible {
    background: #fff;
    border-color: #FF4545;
    box-shadow: 0 0 0 3px rgba(255,69,69,0.25);
    outline: none;
  }
  .qm-select-trigger.open .qm-icon { color: #FF4545; }

  .qm-chevron {
    position: absolute; right: 14px; top: 50%;
    transform: translateY(-50%);
    color: rgba(10,26,36,0.55);
    pointer-events: none;
    display: flex; align-items: center;
    transition: transform 0.25s ease, color 0.25s ease;
  }
  .qm-chevron.rotated { transform: translateY(-50%) rotate(180deg); color: #FF4545; }

  .qm-dropdown {
    position: absolute; top: calc(100% + 6px); left: 0; right: 0;
    background: #fff;
    border: 1px solid rgba(255,69,69,0.35);
    border-radius: 12px;
    box-shadow: 0 16px 48px rgba(0,0,0,0.45);
    z-index: 5;
    max-height: 240px;
    overflow-y: auto;
    animation: qmDropIn 0.18s ease forwards;
  }
  .qm-option {
    padding: 12px 16px;
    font-family: 'DM Sans', sans-serif;
    font-size: 13.5px;
    font-weight: 500;
    color: #0A1A24;
    cursor: pointer;
    display: flex; align-items: center; gap: 8px;
    border-bottom: 1px solid rgba(10,26,36,0.06);
    transition: background 0.15s ease, color 0.15s ease, padding-left 0.15s ease;
  }
  .qm-option:last-child { border-bottom: none; }
  .qm-option:hover { background: rgba(255,69,69,0.08); color: #E03636; padding-left: 20px; }
  .qm-option.selected { background: rgba(255,69,69,0.12); color: #E03636; }
  .qm-option-dot { width: 5px; height: 5px; border-radius: 50%; background: rgba(255,69,69,0.45); flex-shrink: 0; }
  .qm-option.selected .qm-option-dot { background: #FF4545; }

  /* ── Error + submit ── */
  .qm-error {
    font-family: 'DM Sans', sans-serif;
    font-size: 12.5px;
    color: #FF8A8A;
    padding: 10px 12px;
    background: rgba(255,69,69,0.1);
    border: 1px solid rgba(255,69,69,0.25);
    border-radius: 10px;
    display: flex; align-items: center; gap: 8px;
  }

  .qm-submit {
    width: 100%;
    padding: 15px;
    margin-top: 4px;
    border: none;
    border-radius: 12px;
    background: linear-gradient(90deg, #FF4545 0%, #fe5858 100%);
    color: #fff;
    font-family: 'Montserrat', sans-serif;
    font-weight: 600;
    font-size: 13.5px;
    letter-spacing: 0.14em;
    cursor: pointer;
    display: flex; align-items: center; justify-content: center; gap: 10px;
    box-shadow: 0 8px 28px rgba(255,69,69,0.35);
    transition: transform 0.22s ease, box-shadow 0.22s ease;
  }
  .qm-submit:hover { transform: translateY(-2px); box-shadow: 0 14px 40px rgba(255,69,69,0.5); }
  .qm-submit:disabled { opacity: 0.75; cursor: not-allowed; transform: none; }

  .qm-close:focus-visible,
  .qm-submit:focus-visible { outline: 2px solid #FF4545; outline-offset: 3px; }

  .qm-note {
    font-family: 'DM Sans', sans-serif;
    font-size: 12px;
    color: rgba(255,255,255,0.55);
    text-align: center;
    margin: 12px 0 0;
  }
  .qm-note a { color: #fff; font-weight: 600; text-decoration: none; }
  .qm-note a:hover { color: #FF4545; }

  /* ════ 480px+ ════ */
  @media (min-width: 480px) {
    .qm-card  { padding: 32px 28px 26px; }
    .qm-row   { grid-template-columns: 1fr 1fr; }
    .qm-title { font-size: 1.75rem; }
  }

  /* ════ 1440px+ ════ */
  @media (min-width: 1440px) {
    .qm-border { max-width: 620px; }
    .qm-card   { padding: 40px 36px 30px; }
    .qm-title  { font-size: 2rem; }
    .qm-sub    { font-size: 15px; }
    .qm-input, .qm-select-trigger, .qm-label { font-size: 15px; }
    .qm-input, .qm-select-trigger { min-height: 58px; }
  }

  /* ════ 1920px+ ════ */
  @media (min-width: 1920px) {
    .qm-border { max-width: 780px; border-radius: 28px; }
    .qm-card   { padding: 52px 48px 38px; border-radius: 26px; }
    .qm-close  { width: 46px; height: 46px; top: 20px; right: 20px; }
    .qm-title  { font-size: 2.6rem; }
    .qm-sub    { font-size: 20px; margin-bottom: 28px; }
    .qm-fields, .qm-row { gap: 18px; }
    .qm-input, .qm-select-trigger { font-size: 19px; min-height: 70px; padding: 32px 20px 12px 58px; }
    .qm-select-trigger { padding-right: 52px; }
    .qm-label  { font-size: 18px; left: 58px; }
    .qm-icon   { left: 20px; }
    .qm-input:focus ~ .qm-label,
    .qm-input:not(:placeholder-shown) ~ .qm-label,
    .qm-label.lifted { font-size: 13px; top: 9px; }
    textarea.qm-input { min-height: 140px; padding-top: 36px; }
    .qm-label-textarea, .qm-icon-textarea { top: 24px; }
    .qm-option { font-size: 17px; padding: 15px 20px; }
    .qm-submit { font-size: 18px; padding: 20px; }
    .qm-note   { font-size: 16px; }
  }

  @media (min-width: 2560px) {
    .qm-border { max-width: 960px; }
    .qm-title  { font-size: 3.2rem; }
    .qm-sub    { font-size: 24px; }
    .qm-input, .qm-select-trigger { font-size: 23px; min-height: 84px; padding-top: 38px; }
    .qm-label  { font-size: 22px; }
    .qm-submit { font-size: 22px; padding: 24px; }
    .qm-note   { font-size: 19px; }
  }

  @media (prefers-reduced-motion: reduce) {
    .qm-overlay, .qm-border, .qm-dropdown { animation: none !important; }
    .qm-close:hover { transform: none; }
  }
`;

/* ════════════════════════════════════
   OPEN / CLOSE,  works from any component, no context needed.
   Buttons fire a browser event; the provider (mounted once in App) listens.
   ════════════════════════════════════ */
const OPEN_EVENT = "bp:open-quote-modal";
const CLOSE_EVENT = "bp:close-quote-modal";

/** Open the popup from anywhere. Pass a service name to pre-select it. */
export const openQuoteModal = (service?: unknown) => {
  window.dispatchEvent(
    new CustomEvent(OPEN_EVENT, { detail: typeof service === "string" ? service : "" })
  );
};

export const closeQuoteModal = () => {
  window.dispatchEvent(new CustomEvent(CLOSE_EVENT));
};

/** Hook version, so existing `const { openQuoteModal } = useQuoteModal()` code keeps working. */
export const useQuoteModal = () => ({ openQuoteModal, closeQuoteModal });

export const QuoteModalProvider: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [service, setService] = useState("");

  useEffect(() => {
    const onOpen = (e: Event) => {
      setService((e as CustomEvent<string>).detail || "");
      setIsOpen(true);
    };
    const onClose = () => setIsOpen(false);
    window.addEventListener(OPEN_EVENT, onOpen);
    window.addEventListener(CLOSE_EVENT, onClose);
    return () => {
      window.removeEventListener(OPEN_EVENT, onOpen);
      window.removeEventListener(CLOSE_EVENT, onClose);
    };
  }, []);

  const handleClose = useCallback(() => setIsOpen(false), []);

  return (
    <>
      {children}
      {isOpen && <QuoteModal initialService={service} onClose={handleClose} />}
    </>
  );
};

/* ════════════════════════════════════
   SERVICE SELECT
   ════════════════════════════════════ */
const QmSelect: React.FC<{ value: string; onChange: (v: string) => void }> = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div
      className="qm-field"
      ref={wrapRef}
      onKeyDown={(e) => {
        // Escape closes the list first, not the whole modal
        if (e.key === "Escape" && open) { e.stopPropagation(); setOpen(false); }
      }}
    >
      <button
        type="button"
        className={`qm-select-trigger${open ? " open" : ""}`}
        onClick={() => setOpen(o => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Service interested in"
      >
        {value}
        <span className="qm-icon">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        </span>
        <span className={`qm-chevron${open ? " rotated" : ""}`}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </span>
      </button>

      <span className={`qm-label${value ? " lifted" : ""}`}>Service Interested In *</span>

      {open && (
        <div className="qm-dropdown" role="listbox">
          {SERVICES_LIST.map(svc => (
            <div
              key={svc}
              role="option"
              aria-selected={value === svc}
              className={`qm-option${value === svc ? " selected" : ""}`}
              onClick={() => { onChange(svc); setOpen(false); }}
            >
              <span className="qm-option-dot" />
              {svc}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

/* ════════════════════════════════════
   MODAL
   ════════════════════════════════════ */
const QuoteModal: React.FC<{ initialService: string; onClose: () => void }> = ({ initialService, onClose }) => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", phone: "", email: "", service: initialService, message: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [closing, setClosing] = useState(false);

  const dialogRef = useRef<HTMLDivElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);

  const requestClose = useCallback(() => {
    if (closing) return;
    setClosing(true);
    window.setTimeout(onClose, 180); // let the exit animation play
  }, [closing, onClose]);

  /* Lock page scroll, focus the first field, restore focus on close */
  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    firstInputRef.current?.focus();

    return () => {
      document.body.style.overflow = prevOverflow;
      previouslyFocused?.focus?.();
    };
  }, []);

  /* Escape closes; Tab stays inside the dialog */
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") { requestClose(); return; }
    if (e.key !== "Tab" || !dialogRef.current) return;

    const focusables = dialogRef.current.querySelectorAll<HTMLElement>(
      'button:not([disabled]), [href], input, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (!focusables.length) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];

    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
    if (error) setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.email || !form.service || !form.message) {
      setError("Please fill in all required fields,  Name, Phone, Email, Service, and Message.");
      return;
    }
    if (form.phone.replace(/\D/g, "").length < 7) {
      setError("Please enter a valid phone number.");
      return;
    }
    setLoading(true);
    setError("");

    try {
      const res = await fetch(LEAD_URL, {
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
      console.log("Popup lead submitted:", data);

      onClose();
      navigate(`/thank-you?name=${encodeURIComponent(form.name)}&service=${encodeURIComponent(form.service)}`);
    } catch (err) {
      console.error("Submission error:", err);
      setError("Something went wrong. Please try again or call us directly.");
    } finally {
      setLoading(false);
    }
  };

  return createPortal(
    <>
      <style>{qmStyles}</style>

      <div
        className={`qm-overlay${closing ? " closing" : ""}`}
        onMouseDown={(e) => { if (e.target === e.currentTarget) requestClose(); }}
      >
        <div
          ref={dialogRef}
          className="qm-border"
          role="dialog"
          aria-modal="true"
          aria-labelledby="qm-title"
          onKeyDown={handleKeyDown}
        >
          <div className="qm-card">
            <button type="button" className="qm-close" onClick={requestClose} aria-label="Close">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            <h2 id="qm-title" className="qm-title">Get your <span>free quote</span></h2>
            <p className="qm-sub">Tell us about your book and we'll get back to you with a plan and a price.</p>

            <form className="qm-fields" onSubmit={handleSubmit} noValidate>
              <div className="qm-row">
                <div className="qm-field">
                  <input ref={firstInputRef} id="qm-name" className="qm-input" type="text" name="name" placeholder=" " value={form.name} onChange={handleChange} autoComplete="name" />
                  <span className="qm-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" />
                    </svg>
                  </span>
                  <label htmlFor="qm-name" className="qm-label">Full Name *</label>
                </div>

                <div className="qm-field">
                  <input id="qm-phone" className="qm-input" type="tel" name="phone" placeholder=" " value={form.phone} onChange={handleChange} autoComplete="tel" required aria-required="true" />
                  <span className="qm-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.7A2 2 0 012 .99h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                    </svg>
                  </span>
                  <label htmlFor="qm-phone" className="qm-label">Phone Number *</label>
                </div>
              </div>

              <div className="qm-field">
                <input id="qm-email" className="qm-input" type="email" name="email" placeholder=" " value={form.email} onChange={handleChange} autoComplete="email" />
                <span className="qm-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
                  </svg>
                </span>
                <label htmlFor="qm-email" className="qm-label">Email Address *</label>
              </div>

              <QmSelect
                value={form.service}
                onChange={(v) => { setForm(f => ({ ...f, service: v })); if (error) setError(""); }}
              />

              <div className="qm-field">
                <textarea id="qm-message" className="qm-input" name="message" placeholder=" " value={form.message} onChange={handleChange} />
                <span className="qm-icon qm-icon-textarea">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                  </svg>
                </span>
                <label htmlFor="qm-message" className="qm-label qm-label-textarea">Your Message *</label>
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

              {error && (
                <div className="qm-error" role="alert">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  {error}
                </div>
              )}

              <button type="submit" className="qm-submit" disabled={loading}>
                {loading ? (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" style={{ animation: "qmSpin 0.8s linear infinite" }}>
                      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                    </svg>
                    SENDING...
                  </>
                ) : (
                  <>
                    SEND NOW
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" />
                    </svg>
                  </>
                )}
              </button>

              <p className="qm-note">
                Prefer to talk? Call <a href="tel:+17373855397">(737) 385-5397</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>,
    document.body
  );
};

export default QuoteModalProvider;