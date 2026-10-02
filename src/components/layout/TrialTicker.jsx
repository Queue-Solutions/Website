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
        <span key={index} className="flex shrink-0 items-center gap-3 px-8 text-[13px] tracking-wide" dir={isArabic ? "rtl" : "ltr"}>
          <span className="text-white/60">
            {isArabic ? (
              <>
                جرّب <span className="font-semibold text-white">MolarBear</span> مجانًا لمدة 14 يومًا
              </>
            ) : (
              <>
                Try <span className="font-semibold text-white">MolarBear</span> free for 14 days
              </>
            )}
          </span>
          <span className="inline-flex items-center gap-1.5 font-semibold text-white underline decoration-white/30 underline-offset-4 transition group-hover:decoration-white">
            {copy.ribbonCta}
            <FaArrowRight className="text-[9px] rtl:rotate-180" />
          </span>
          <span className="ms-5 text-white/25" aria-hidden="true">/</span>
        </span>
      ))}
    </div>
  );

  return (
    <Link
      to={getPathForPageId("trial", locale)}
      onClick={() => trackLeadClick("molarbear_trial", "top_ticker")}
      className="group block h-9 overflow-hidden bg-slate-950"
      aria-label={copy.ribbon}
    >
      <div
        className="h-full"
        style={{
          maskImage: "linear-gradient(90deg, transparent, black 4%, black 96%, transparent)",
          WebkitMaskImage: "linear-gradient(90deg, transparent, black 4%, black 96%, transparent)",
        }}
      >
        <div className="flex h-full w-max items-center animate-ticker" dir="ltr">
          {half(false)}
          {half(true)}
        </div>
      </div>
    </Link>
  );
}
