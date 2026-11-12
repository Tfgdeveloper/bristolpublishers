import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { Link } from "react-router-dom";

/* ------------------------------------------------------------------ */
/*  Settings                                                           */
/* ------------------------------------------------------------------ */
const IMAGE_SRC = "/images/frankfurtpopup.jpg";
const IMAGE_TITLE = "This Halloween, give your book a treat: 50% off all publishing services";
const IMAGE_ALT = IMAGE_TITLE.replace(/\s+/g, "-");
const LINK_HREF = "";
const SHOW_ONCE_PER_SESSION = false;
const STORAGE_KEY = "image-popup-seen";

const smoothEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function ImagePopup() {
    const [open, setOpen] = useState(false);

    // Open as soon as the page (including images) has finished loading
    useEffect(() => {
        if (SHOW_ONCE_PER_SESSION) {
            try {
                if (sessionStorage.getItem(STORAGE_KEY)) return;
            } catch { /* storage blocked: just show it */ }
        }

        const show = () => setOpen(true);
        if (document.readyState === "complete") {
            show();
            return;
        }
        window.addEventListener("load", show, { once: true });
        return () => window.removeEventListener("load", show);
    }, []);

    // Escape to close + lock page scroll while open
    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        window.addEventListener("keydown", onKey);
        return () => {
            document.body.style.overflow = prevOverflow;
            window.removeEventListener("keydown", onKey);
        };
    }, [open]);

    function close() {
        setOpen(false);
        if (SHOW_ONCE_PER_SESSION) {
            try { sessionStorage.setItem(STORAGE_KEY, "1"); } catch { /* ignore */ }
        }
    }

    const image = (
        <img
            src={IMAGE_SRC}
            alt={IMAGE_ALT}
            title={IMAGE_TITLE}
            className="block max-h-[calc(100vh-48px)] w-auto max-w-full rounded-[18px] object-contain"
        />
    );

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    className="fixed inset-0 z-[1000] grid place-items-center bg-black/70 p-6 backdrop-blur-[3px]"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    transition={{ duration: 0.35 }}
                    onClick={close}
                >

                    <motion.div
                        role="dialog"
                        aria-modal="true"
                        aria-label={IMAGE_ALT}
                        className="relative w-fit max-w-[1100px] shadow-[0_30px_80px_rgba(0,0,0,0.5)]"
                        initial={{ opacity: 0, y: 40, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 30, scale: 0.97 }}
                        transition={{ duration: 0.5, ease: smoothEase }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            type="button"
                            aria-label="Close"
                            onClick={close}
                            autoFocus
                            className="absolute -right-3 -top-3 z-10 grid h-9 w-9 cursor-pointer place-items-center rounded-full border-0 bg-[#E8391D] text-white shadow-lg transition duration-200 hover:rotate-90 hover:bg-[#c0271a] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#ffb27a] motion-reduce:hover:rotate-0"
                        >
                            <X size={18} strokeWidth={3} />
                        </button>

                        {LINK_HREF ? (
                            <a href={LINK_HREF} onClick={close} className="block">{image}</a>
                        ) : (
                            image
                        )}
                    </motion.div>

                </motion.div>
            )}
        </AnimatePresence>
    );
}