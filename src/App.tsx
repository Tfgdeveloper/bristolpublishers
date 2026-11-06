import React, { useEffect, lazy, Suspense, useState, useCallback } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { LiveChatWidget } from "@livechat/widget-react";

import Navbar from "./components/navbar";
import FooterSection from "./components/footerSection";
import { QuoteModalProvider } from "./components/Quotemodal";
import ImagePopup from "./components/Imagepopup";
import { Feather } from "lucide-react";

const Hero = lazy(() => import("./components/hero"));
const LogoBar = lazy(() => import("./components/logobar"));
const AboutSection = lazy(() => import("./components/aboutSection"));
const Services = lazy(() => import("./components/serviceSection"));
const Portfolio = lazy(() => import("./components/portfolioSection"));
const CTASection = lazy(() => import("./components/ctaSection"));
const Testimonials = lazy(() => import("./components/testimonialSection"));
const ContactForm = lazy(() => import("./components/contactSection"));
const ThankYou = lazy(() => import("./components/pages/Thankyou/page"));
const PrivacyPolicy = lazy(() => import("./components/pages/Policies/Privacypolicy"));
const TermsOfService = lazy(() => import("./components/pages/Policies/Termsofservice"));
const RefundPolicy = lazy(() => import("./components/pages/Policies/Refundpolicy"));
const Frankfurt = lazy(() => import("./components/FrankfurtSection"));
const Cta = lazy(() => import("./components/Cta"));

const Loader = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "20px",
      }}
    >
      Loading...
    </div>
  );
};

const HomePage: React.FC = () => {
  return (
    <Suspense fallback={<Loader />}>
      <title>Professional Book Publishing Services | Bristol Publishers</title>
      <meta name="description" content="Turn your manuscript into a published book. Bristol Publishers offers ghostwriting, editing, cover design, formatting, marketing and global distribution." />
      <meta
        name="keywords"
        content="Bristol Publishers"
      />
      <ImagePopup/>
      <Hero />
      <AboutSection />
      <Cta/>
      <Frankfurt/>
      <Services />
      <Portfolio />
      <CTASection />
      <Testimonials />
      <ContactForm />
    </Suspense>
  );
};

const MainLayout: React.FC = () => {
  const { hash } = useLocation();

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
  }, []);

  useEffect(() => {
    if (!hash) return;
    const id = decodeURIComponent(hash.slice(1));
    let tries = 0;
    let timer: number;

    const tryScroll = () => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      } else if (tries++ < 20) {
        timer = window.setTimeout(tryScroll, 100);
      }
    };
    tryScroll();

    return () => window.clearTimeout(timer);
  }, [hash]);

  return (
    <>
      <Navbar />
      <HomePage />
      <FooterSection />
    </>
  );
};

/* Wraps a policy page with the same Navbar + Footer as the home page */
const PolicyPage: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <>
    <Navbar />
    <Suspense fallback={<Loader />}>{children}</Suspense>
    <FooterSection />
  </>
);

type ChatVisibility = "maximized" | "minimized" | "hidden";

const AGENT_EVENT_TYPES = ["message", "rich_message", "file"];

/* Force the widget open, verify it really opened, and retry if it didn't */
const forceOpenChat = (attempt = 0) => {
  const lc = (window as any).LiveChatWidget;

  try {
    lc?.call("maximize");
  } catch {
    // widget not ready yet; the retry below handles it
  }

  setTimeout(() => {
    let visibility: string | null = null;
    try {
      visibility = lc?.get("state")?.visibility ?? null;
    } catch {
      visibility = null;
    }
    if (visibility !== "maximized" && attempt < 10) {
      forceOpenChat(attempt + 1);
    }
  }, 300);
};

function App() {
  const [chatVisibility, setChatVisibility] = useState<ChatVisibility>("minimized");
  const [pendingOpen, setPendingOpen] = useState(false);

  // OPTIONAL: auto-open the chat 1 second after page load.
  // Uncomment if you want the chat to open on every visit.
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setChatVisibility("maximized");
  //     forceOpenChat();
  //   }, 1000);
  //   return () => clearTimeout(timer);
  // }, []);

  // Force the chat open whenever an agent sends a message
  const handleNewEvent = useCallback(
    (event: { type: string; author?: { type: string } }) => {
      if (event.author?.type !== "agent") return;
      if (!AGENT_EVENT_TYPES.includes(event.type)) return;

      setChatVisibility("maximized");
      forceOpenChat();

      // Visitor is on another tab: flash the title and open when they return
      if (document.hidden) setPendingOpen(true);
    },
    []
  );

  // Keep state in sync when the visitor opens/closes the chat manually
  const handleVisibilityChanged = useCallback(
    ({ visibility }: { visibility: ChatVisibility }) => {
      setChatVisibility(visibility);
      if (visibility === "maximized") setPendingOpen(false);
    },
    []
  );

  // Title flash + open-on-return while a message is waiting
  useEffect(() => {
    if (!pendingOpen) return;

    const originalTitle = document.title;
    let on = false;
    const flash = window.setInterval(() => {
      document.title = on ? originalTitle : "💬 New message!";
      on = !on;
    }, 1000);

    const onReturn = () => {
      if (!document.hidden) {
        forceOpenChat();
        setPendingOpen(false);
      }
    };
    document.addEventListener("visibilitychange", onReturn);

    return () => {
      window.clearInterval(flash);
      document.title = originalTitle;
      document.removeEventListener("visibilitychange", onReturn);
    };
  }, [pendingOpen]);

  return (
    <>
      <LiveChatWidget
        license="19067595"
        visibility={chatVisibility}
        onNewEvent={handleNewEvent}
        onVisibilityChanged={handleVisibilityChanged}
      />

      <BrowserRouter>
        {/* Must be inside BrowserRouter: the popup redirects to /thank-you */}
        <QuoteModalProvider>
          <Routes>
            <Route path="/" element={<MainLayout />} />
            <Route
              path="/thank-you"
              element={
                <Suspense fallback={<Loader />}>
                  <ThankYou />
                </Suspense>
              }
            />
            <Route path="/privacy-policy" element={<PolicyPage><PrivacyPolicy /></PolicyPage>} />
            <Route path="/terms-of-service" element={<PolicyPage><TermsOfService /></PolicyPage>} />
            <Route path="/refund-policy" element={<PolicyPage><RefundPolicy /></PolicyPage>} />
          </Routes>
        </QuoteModalProvider>
      </BrowserRouter>
    </>
  );
}

export default App;