import { FaGift } from "react-icons/fa";
import { Link } from "react-router-dom";
import { TRIAL_COPY } from "../../content/trial";
import { trackLeadClick } from "../../lib/analytics";
import { getPathForPageId } from "../../lib/routes";

// MolarBear free-trial call to action, used on the MolarBear case study and product page.
export default function TrialBanner({ locale, source }) {
  const copy = TRIAL_COPY[locale];

  return (
    <div
      className="relative overflow-hidden rounded-[1.75rem] px-6 py-7 text-start text-white shadow-[0_24px_60px_rgba(47,125,140,0.3)] sm:px-10 sm:py-9"
      style={{ background: "linear-gradient(135deg, #1f5f6b, #2f7d8c 55%, #4fb3c1)" }}
    >
      <div className="absolute -end-10 -top-10 h-48 w-48 rounded-full bg-white/10 blur-2xl" aria-hidden="true" />
      <div className="relative flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <img src="/portfolio/molarbear.webp" alt="" className="h-16 w-16 shrink-0 rounded-2xl border-2 border-white/70 object-cover" loading="lazy" />
          <div>
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-amber-200">
              <FaGift /> {copy.idcTitle}
            </p>
            <p className="mt-1 text-2xl font-bold uppercase leading-tight sm:text-3xl">
              {copy.headlineTop} {copy.headlineBottom}
            </p>
            <p className="mt-1 text-sm text-white/80">{copy.noCard}</p>
          </div>
        </div>
        <Link
          to={getPathForPageId("trial", locale)}
          onClick={() => trackLeadClick("molarbear_trial", source)}
          className="inline-flex h-13 shrink-0 items-center justify-center rounded-full bg-white px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-[#1f5f6b] transition hover:-translate-y-0.5"
        >
          {copy.cta}
        </Link>
      </div>
    </div>
  );
}
