import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { TRIAL_COPY } from "../../content/trial";
import { trackLeadClick } from "../../lib/analytics";
import { getPathForPageId } from "../../lib/routes";

const REPEATS = 4;

// Scrolling MolarBear offer line pinned above the site header. The whole strip links to the
// trial page; the text loops seamlessly (two identical halves) and pauses on hover.
export default function TrialTicker({ locale }) {
  const copy = TRIAL_COPY[locale];
  const isArabic = locale === "ar";

  const half = (hidden) => (
    <div className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {Array.from({ length: REPEATS }, (_, index) => (
        <span key={index} className="flex shrink-0 items-center gap-3 px-7" dir={isArabic ? "rtl" : "ltr"}>
          <span className="rounded-full bg-white/15 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em] text-white ring-1 ring-inset ring-white/25">
            IDC 2026
          </span>
          <img src="/portfolio/molarbear.webp" alt="" className="h-6 w-6 shrink-0 rounded-md bg-white object-cover ring-1 ring-white/40" />
          <span className="text-[13px] font-medium text-white/90 sm:text-sm">
            {isArabic ? (
              <>
                جرّب <strong className="font-bold text-white">MolarBear</strong> لعيادات الأسنان{" "}
                <strong className="font-bold text-amber-200">مجانًا لمدة 14 يومًا</strong>
              </>
            ) : (
              <>
                Try <strong className="font-bold text-white">MolarBear</strong> dental software{" "}
                <strong className="font-bold text-amber-200">free for 14 days</strong>
              </>
            )}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-[12px] font-bold text-purple-700 shadow-[0_4px_14px_rgba(76,29,149,0.35)] transition group-hover:bg-amber-100">
            {copy.ribbonCta}
            <FaArrowRight className="text-[9px] rtl:rotate-180" />
          </span>
          <span className="ms-4 h-1 w-1 rounded-full bg-white/40" aria-hidden="true" />
        </span>
      ))}
    </div>
  );

  return (
    <Link
      to={getPathForPageId("trial", locale)}
      onClick={() => trackLeadClick("molarbear_trial", "top_ticker")}
      className="group relative block h-10 overflow-hidden border-b border-white/10 bg-[linear-gradient(90deg,#3b0764_0%,#6d28d9_35%,#7c3aed_50%,#6d28d9_65%,#3b0764_100%)] shadow-[0_6px_20px_rgba(76,29,149,0.25)]"
      aria-label={copy.ribbon}
    >
      {/* Soft sheen across the strip */}
      <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.14)_0%,rgba(255,255,255,0)_55%)]" aria-hidden="true" />
      <div
        className="relative h-full"
        style={{
          maskImage: "linear-gradient(90deg, transparent, black 5%, black 95%, transparent)",
          WebkitMaskImage: "linear-gradient(90deg, transparent, black 5%, black 95%, transparent)",
        }}
      >
        <div className="flex h-full w-max items-center animate-ticker group-hover:[animation-play-state:paused]" dir="ltr">
          {half(false)}
          {half(true)}
        </div>
      </div>
    </Link>
  );
}
