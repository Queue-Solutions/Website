import { AnimatePresence, motion as Motion } from "framer-motion";
import { lazy, startTransition, Suspense, useEffect, useState } from "react";
import { BrowserRouter, Navigate, useLocation, useNavigate } from "react-router-dom";
import ScrollManager from "./components/routing/ScrollManager";
import RouteSeo from "./components/seo/RouteSeo";
import ScrollToTopButton from "./components/layout/ScrollToTopButton";
import WhatsAppButton from "./components/layout/WhatsAppButton";
import SiteFooter from "./components/layout/SiteFooter";
import SiteHeader from "./components/layout/SiteHeader";
import { SITE_CONTENT } from "./content/siteContent";
import { getPathForPageId, getRouteForPath } from "./lib/routes";

const ContactFormModal = lazy(() => import("./components/layout/ContactFormModal"));

// Each page is its own chunk so visitors only download the page they open.
const PAGES = {
  home: lazy(() => import("./pages/Home")),
  services: lazy(() => import("./pages/Services")),
  portfolio: lazy(() => import("./pages/Portfolio")),
  process: lazy(() => import("./pages/Process")),
  contact: lazy(() => import("./pages/Contact")),
  "case-study": lazy(() => import("./pages/CaseStudy")),
  landing: lazy(() => import("./pages/ProductLanding")),
};

export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}

function AppShell() {
  // false = closed, true = open, string = open with this idea prefilled (e.g. a demo request),
  // { mode: "audit" } = open as a free digital audit request.
  const [showForm, setShowForm] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [localeFxKey, setLocaleFxKey] = useState(0);
  const [localeFxDirection, setLocaleFxDirection] = useState(1);
  const location = useLocation();
  const navigate = useNavigate();
  const { locale, pageId, slug } = getRouteForPath(location.pathname);
  const currentPage = pageId ?? "home";
  const content = SITE_CONTENT[locale];
  const isRtl = content.direction === "rtl";
  const Page = PAGES[currentPage];

  useEffect(() => {
    document.documentElement.lang = locale === "ar" ? "ar-EG" : "en";
    document.documentElement.dir = content.direction;
    document.body.dir = content.direction;
  }, [content.direction, locale]);

  const navTo = (page, pageSlug = null) => {
    setMobileMenuOpen(false);
    navigate(getPathForPageId(page, locale, pageSlug));
  };

  const handleLocaleChange = (nextLocale) => {
    if (nextLocale === locale) {
      return;
    }

    setMobileMenuOpen(false);
    setLocaleFxDirection(nextLocale === "ar" ? 1 : -1);
    setLocaleFxKey((previous) => previous + 1);
    startTransition(() => {
      navigate(getPathForPageId(currentPage, nextLocale, slug));
    });
  };

  if (!pageId) {
    return <Navigate replace to={getPathForPageId("home", locale)} />;
  }

  return (
    <div className={`min-h-screen bg-white text-slate-900 ${isRtl ? "font-sans" : ""}`}>
      <RouteSeo content={content} pageId={currentPage} slug={slug} />
      <ScrollManager />

      <SiteHeader
        content={content}
        locale={locale}
        mobileMenuOpen={mobileMenuOpen}
        onLocaleChange={handleLocaleChange}
        setMobileMenuOpen={setMobileMenuOpen}
        setShowForm={setShowForm}
      />

      <main className={currentPage === "home" ? "min-h-screen" : "min-h-screen pt-22 sm:pt-28"}>
        <AnimatePresence mode="wait">
          <Motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <Suspense fallback={<div className="min-h-screen" />}>
              <Page content={content} navTo={navTo} setShowForm={setShowForm} slug={slug} />
            </Suspense>
          </Motion.div>
        </AnimatePresence>
      </main>

      <SiteFooter content={content} />
      <WhatsAppButton content={content} />
      <ScrollToTopButton />

      <AnimatePresence initial={false}>
        {localeFxKey ? (
          <LocaleTransitionOverlay key={localeFxKey} direction={localeFxDirection} />
        ) : null}
      </AnimatePresence>

      {showForm ? (
        <Suspense fallback={null}>
          <ContactFormModal
            content={content}
            initialIdea={typeof showForm === "string" ? showForm : ""}
            initialMode={showForm?.mode ?? "project"}
            setShowForm={setShowForm}
          />
        </Suspense>
      ) : null}
    </div>
  );
}

function LocaleTransitionOverlay({ direction }) {
  const travel = direction > 0 ? [120, -120] : [-120, 120];

  return (
    <Motion.div
      className="pointer-events-none fixed inset-0 z-[55] overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.32, ease: [0.2, 0.9, 0.3, 1] }}
    >
      <Motion.div
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.14),transparent_58%)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 0.42, times: [0, 0.35, 1], ease: "easeOut" }}
      />
      <Motion.div
        className="absolute left-[-20%] top-[18%] h-40 w-[70%] rounded-full bg-[linear-gradient(90deg,rgba(168,85,247,0)_0%,rgba(168,85,247,0.22)_35%,rgba(56,189,248,0.26)_70%,rgba(56,189,248,0)_100%)] blur-3xl"
        initial={{ x: `${travel[0]}%`, opacity: 0 }}
        animate={{ x: `${travel[1]}%`, opacity: [0, 0.9, 0] }}
        transition={{ duration: 0.46, times: [0, 0.18, 1], ease: [0.2, 0.9, 0.3, 1] }}
      />
      <Motion.div
        className="absolute right-[-18%] top-[42%] h-28 w-[58%] rounded-full bg-[linear-gradient(90deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.18)_32%,rgba(167,139,250,0.28)_70%,rgba(255,255,255,0)_100%)] blur-3xl"
        initial={{ x: `${-travel[0]}%`, opacity: 0 }}
        animate={{ x: `${-travel[1]}%`, opacity: [0, 0.8, 0] }}
        transition={{ duration: 0.42, delay: 0.04, times: [0, 0.2, 1], ease: [0.2, 0.9, 0.3, 1] }}
      />
      {[0, 1, 2, 3].map((index) => (
        <Motion.span
          key={index}
          className="absolute h-2.5 w-2.5 rounded-full bg-white/70 shadow-[0_0_14px_rgba(255,255,255,0.45)]"
          style={{
            left: `${18 + index * 18}%`,
            top: `${28 + (index % 2) * 16}%`,
          }}
          initial={{ opacity: 0, x: direction > 0 ? -26 : 26, y: 10, scale: 0.6 }}
          animate={{ opacity: [0, 1, 0], x: direction > 0 ? 26 : -26, y: -10, scale: [0.6, 1, 0.8] }}
          transition={{ duration: 0.34, delay: index * 0.04, ease: "easeOut" }}
        />
      ))}
    </Motion.div>
  );
}
