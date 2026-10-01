import { FaArrowRight, FaGift } from "react-icons/fa";
import { Link } from "react-router-dom";
import { TRIAL_COPY } from "../../content/trial";
import { trackLeadClick } from "../../lib/analytics";
import { getPathForPageId } from "../../lib/routes";

const REPEATS = 4;

// Scrolling MolarBear offer line pinned above the site header. The whole strip links to the
// trial page; the text loops seamlessly (two identical halves) and pauses on hover.
export default function TrialTicker({ locale }) {
  const copy = TRIAL_COPY[locale];

  const half = (hidden) => (
    <div className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {Array.from({ length: REPEATS }, (_, index) => (
        <span key={index} className="flex shrink-0 items-center gap-3 px-6 text-[13px] font-semibold sm:text-sm" dir={locale === "ar" ? "rtl" : "ltr"}>
          <FaGift className="shrink-0 text-amber-300" />
          <span>{copy.ribbon}</span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-0.5 text-[12px] font-bold text-[#1f5f6b]">
            {copy.ribbonCta}
            <FaArrowRight className="text-[9px] rtl:rotate-180" />
          </span>
          <span className="ps-3 text-white/40" aria-hidden="true">✦</span>
        </span>
      ))}
    </div>
  );

  return (
    <Link
      to={getPathForPageId("trial", locale)}
      onClick={() => trackLeadClick("molarbear_trial", "top_ticker")}
      className="group block h-9 overflow-hidden text-white sm:h-10"
      style={{ background: "linear-gradient(90deg, #1f5f6b, #2f7d8c 50%, #1f5f6b)" }}
      aria-label={copy.ribbon}
    >
      <div className="flex h-full w-max items-center animate-ticker group-hover:[animation-play-state:paused]" dir="ltr">
        {half(false)}
        {half(true)}
      </div>
    </Link>
  );
}
