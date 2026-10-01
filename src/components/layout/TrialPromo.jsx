import { AnimatePresence, motion as Motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaGift, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import { TRIAL_COPY } from "../../content/trial";
import { trackLeadClick } from "../../lib/analytics";
import { getPathForPageId } from "../../lib/routes";

const DISMISS_KEY = "molarbear-trial-promo-dismissed";

function wasDismissed() {
  try {
    return window.sessionStorage.getItem(DISMISS_KEY) === "1";
  } catch {
    return false;
  }
}

// Small offer card in the bottom corner (opposite the WhatsApp button). Not rendered on the
// trial page itself, and hidden for the rest of the session once closed.
export default function TrialPromo({ locale }) {
  const copy = TRIAL_COPY[locale];
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (wasDismissed()) {
      return undefined;
    }
    const timer = window.setTimeout(() => setVisible(true), 2500);
    return () => window.clearTimeout(timer);
  }, []);

  const dismiss = () => {
    setVisible(false);
    try {
      window.sessionStorage.setItem(DISMISS_KEY, "1");
    } catch {
      // Ignore: the card just comes back on the next page.
    }
  };

  return (
    <AnimatePresence>
      {visible ? (
        <Motion.div
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.96 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-5 left-5 z-50 w-[calc(100vw-7.5rem)] max-w-[22rem] sm:bottom-6 sm:left-6"
        >
          <div className="relative overflow-hidden rounded-[1.4rem] border border-white/60 bg-white text-start shadow-[0_24px_60px_rgba(15,23,42,0.22)]">
            <div className="h-1" style={{ background: "linear-gradient(90deg, #2f7d8c, #6cc3cf)" }} />
            <button
              type="button"
              onClick={dismiss}
              aria-label={locale === "ar" ? "إغلاق" : "Close"}
              className="absolute end-2.5 top-3 flex h-7 w-7 items-center justify-center rounded-full text-xs text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
            >
              <FaTimes />
            </button>
            <div className="flex items-center gap-3 p-3.5 pe-10">
              <img src="/portfolio/molarbear.webp" alt="" className="h-12 w-12 shrink-0 rounded-xl border border-slate-100 object-cover" />
              <div className="min-w-0">
                <p className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#2f7d8c]">
                  <FaGift /> {locale === "ar" ? "مجانًا لمدة 14 يومًا" : "Free for 14 days"}
                </p>
                <p className="mt-0.5 text-[13px] font-semibold leading-5 text-slate-900 sm:text-sm">{copy.ribbon}</p>
              </div>
            </div>
            <Link
              to={getPathForPageId("trial", locale)}
              onClick={() => {
                trackLeadClick("molarbear_trial", "promo_card");
                setVisible(false);
              }}
              className="mx-3.5 mb-3.5 flex h-10 items-center justify-center rounded-full bg-[#2f7d8c] text-sm font-semibold text-white transition hover:brightness-110"
            >
              {copy.ribbonCta}
            </Link>
          </div>
        </Motion.div>
      ) : null}
    </AnimatePresence>
  );
}
