import React, { useEffect, lazy, Suspense, useState, useCallback } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { LiveChatWidget } from "@livechat/widget-react";

import Navbar from "./components/navbar";
import FooterSection from "./components/footerSection";
import { QuoteModalProvider } from "./components/Quotemodal";
import ImagePopup from "./components/Imagepopup";
import Seo, { type SeoKey } from "./components/Seo";

const Hero = lazy(() => import("./components/hero"));
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

const AboutPage = lazy(() => import("./components/pages/About/page"));
const PublishingPage = lazy(() => import("./components/pages/services/publishing/page"));
const GhostwritingPage = lazy(() => import("./components/pages/services/ghostwriting/page"));
const FormattingPage = lazy(() => import("./components/pages/services/formatting/page"));
const CoverDesignPage = lazy(() => import("./components/pages/services/cover-design/page"));
const MarketingPage = lazy(() => import("./components/pages/services/marketing/page"));
const AudioBookPage = lazy(() => import("./components/pages/services/audio-book/page"));
const PortfolioPage = lazy(() => import("./components/pages/portfolio/page"));
const ContactPage = lazy(() => import("./components/pages/contact/page"));

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

/* Inner pages get the same Navbar + Footer as the home page, plus their own SEO tags */
const withSuspense = (Component: React.FC, seo: SeoKey) => (
  <>
    <Seo page={seo} />
    <Navbar />
    <Suspense fallback={<Loader />}>
      <Component />
    </Suspense>
    <FooterSection />
  </>
);

/* New page always opens at the top (hash links like /#about still scroll to their section) */
const ScrollToTop: React.FC = () => {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
};

const HomePage: React.FC = () => {
  return (
    <Suspense fallback={<Loader />}>
      <ImagePopup />
      <Hero />
      <AboutSection />
      <Cta />
      <Frankfurt />
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
      <Seo page="home" />
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

  // Force the chat open whenever an agent sends a message
  const handleNewEvent = useCallback(
    (event: { type: string; author?: { type: string } }) => {
      if (event.author?.type !== "agent") return;
      if (!AGENT_EVENT_TYPES.includes(event.type)) return;

      setChatVisibility("maximized");
      forceOpenChat();

      if (document.hidden) setPendingOpen(true);
    },
    []
  );

  const handleVisibilityChanged = useCallback(
    ({ visibility }: { visibility: ChatVisibility }) => {
      setChatVisibility(visibility);
      if (visibility === "maximized") setPendingOpen(false);
    },
    []
  );

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
        <ScrollToTop />
        <QuoteModalProvider>
          <Routes>
            <Route path="/" element={<MainLayout />} />
            <Route path="/about" element={withSuspense(AboutPage, "about")} />
            <Route path="/services/publishing" element={withSuspense(PublishingPage, "publishing")} />
            <Route path="/services/ghostwriting" element={withSuspense(GhostwritingPage, "ghostwriting")} />
            <Route path="/services/formatting" element={withSuspense(FormattingPage, "formatting")} />
            <Route path="/services/cover-design" element={withSuspense(CoverDesignPage, "coverDesign")} />
            <Route path="/services/marketing" element={withSuspense(MarketingPage, "marketing")} />
            <Route path="/services/audio-book" element={withSuspense(AudioBookPage, "audioBook")} />
            <Route path="/portfolio" element={withSuspense(PortfolioPage, "portfolio")} />
            <Route path="/contact" element={withSuspense(ContactPage, "contact")} />
            <Route
              path="/thank-you"
              element={
                <Suspense fallback={<Loader />}>
                  <title>Thank You | Bristol Publishers</title>
                  <meta name="robots" content="noindex, nofollow" />
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