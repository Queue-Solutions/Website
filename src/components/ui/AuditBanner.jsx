import { FaSearch } from "react-icons/fa";
import { trackLeadClick } from "../../lib/analytics";

export default function AuditBanner({ setShowForm, ui }) {
  return (
    <div className="relative overflow-hidden rounded-[1.75rem] bg-slate-950 px-6 py-8 text-start text-white shadow-[0_30px_80px_rgba(15,23,42,0.2)] sm:px-10 sm:py-10">
      <div className="absolute -end-16 -top-16 h-56 w-56 rounded-full bg-purple-500/25 blur-3xl" aria-hidden="true" />
      <div className="absolute -bottom-20 start-10 h-48 w-48 rounded-full bg-emerald-400/15 blur-3xl" aria-hidden="true" />
      <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-400/15 text-emerald-300">
            <FaSearch />
          </span>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-300">{ui.audit.eyebrow}</p>
            <h2 className="mt-2 text-xl font-bold leading-snug sm:text-2xl">{ui.audit.title}</h2>
            <p className="mt-2 max-w-2xl text-[15px] leading-7 text-slate-300">{ui.audit.description}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => {
            trackLeadClick("digital_audit", "banner");
            setShowForm({ mode: "audit" });
          }}
          className="inline-flex h-12 shrink-0 items-center justify-center rounded-full bg-white px-6 text-sm font-semibold text-slate-950 transition hover:bg-emerald-50"
        >
          {ui.audit.action}
        </button>
      </div>
    </div>
  );
}
