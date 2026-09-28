import { FaArrowRight, FaCheck, FaDesktop, FaExternalLinkAlt, FaGlobe, FaLayerGroup } from "react-icons/fa";
import { trackLeadClick } from "../../lib/analytics";

const PLATFORM_ICONS = { web: FaGlobe, webapp: FaLayerGroup, desktop: FaDesktop };

// Whole card is the click target: live projects open in a new tab, the rest open the
// project form prefilled with a demo request. The raw URL is never shown.
export default function ProjectCard({ index, project, setShowForm, ui }) {
  const isLive = Boolean(project.href);
  const PlatformIcon = PLATFORM_ICONS[project.platform] ?? FaGlobe;
  const ctaLabel = isLive ? ui.visitProject : ui.requestDemo;
  const number = String(index + 1).padStart(2, "0");

  const shared = {
    className:
      "group relative flex h-full w-full flex-col overflow-hidden rounded-[1.75rem] border border-slate-200/90 bg-white text-start shadow-[0_18px_50px_rgba(15,23,42,0.08)] transition duration-300 hover:-translate-y-1.5 hover:border-slate-300 hover:shadow-[0_28px_70px_rgba(15,23,42,0.16)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2",
    "aria-label": `${project.title}: ${ctaLabel}`,
  };

  const body = (
    <>
      <div
        className="relative aspect-[16/10] overflow-hidden"
        style={{
          backgroundColor: project.accentSoft,
          backgroundImage: `radial-gradient(circle at 50% 55%, ${project.accent}33 0%, transparent 62%), linear-gradient(135deg, ${project.accent}22 0%, transparent 55%)`,
        }}
      >
        {/* Geometric backdrop: dot grid + concentric rings centred on the logo */}
        <div
          className="absolute inset-0 opacity-50"
          style={{
            backgroundImage: `radial-gradient(${project.accent}55 1px, transparent 1.2px)`,
            backgroundSize: "18px 18px",
            maskImage: "radial-gradient(circle at center, black 20%, transparent 75%)",
            WebkitMaskImage: "radial-gradient(circle at center, black 20%, transparent 75%)",
          }}
          aria-hidden="true"
        />
        {[62, 44].map((size) => (
          <div
            key={size}
            className="absolute left-1/2 top-1/2 aspect-square -translate-x-1/2 -translate-y-1/2 rounded-full border transition duration-700 group-hover:scale-110"
            style={{ width: `${size}%`, borderColor: `${project.accent}40` }}
            aria-hidden="true"
          />
        ))}

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="h-24 w-24 overflow-hidden rounded-[1.6rem] bg-white shadow-[0_18px_40px_rgba(15,23,42,0.22)] ring-4 ring-white/70 transition duration-500 group-hover:scale-105 sm:h-28 sm:w-28">
            <img src={project.logo} alt={`${project.title} logo`} className="h-full w-full object-cover" loading="lazy" width="112" height="112" />
          </div>
        </div>

        <span className="absolute start-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-[11px] font-semibold text-slate-700 shadow-sm backdrop-blur">
          <PlatformIcon className="text-[10px]" style={{ color: project.accent }} />
          {ui.platforms[project.platform]}
        </span>
        <span className="absolute end-4 top-4 font-mono text-xs font-semibold tracking-widest text-slate-900/35 mix-blend-multiply">
          {number}
        </span>
        {isLive ? (
          <span className="absolute bottom-4 end-4 inline-flex items-center gap-1.5 rounded-full bg-emerald-500/95 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
            <span className="h-1.5 w-1.5 rounded-full bg-white" /> {ui.live}
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: project.accent }}>
          {project.category}
        </p>
        <h3 className="mt-2 text-[1.35rem] font-bold leading-tight text-slate-950">{project.title}</h3>
        <p className="mt-1 text-sm font-medium text-slate-500">{project.client}</p>
        <p className="mt-3 text-[15px] leading-7 text-slate-600">{project.summary}</p>

        <ul className="mt-4 space-y-2">
          {project.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2.5 text-sm leading-6 text-slate-700">
              <span
                className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[8px] text-white"
                style={{ backgroundColor: project.accent }}
              >
                <FaCheck />
              </span>
              {feature}
            </li>
          ))}
        </ul>

        <div className="mt-5 flex flex-wrap gap-1.5">
          {project.stack.map((tech) => (
            <span key={tech} className="rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-[11px] font-medium text-slate-600" dir="ltr">
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-auto pt-5">
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
            <span className="text-sm font-semibold text-slate-900">{project.result}</span>
            <span
              className="inline-flex shrink-0 items-center gap-2 rounded-full px-3.5 py-2 text-xs font-semibold text-white transition group-hover:gap-3"
              style={{ backgroundColor: project.accent }}
            >
              {ctaLabel}
              {isLive ? <FaExternalLinkAlt className="text-[10px]" /> : <FaArrowRight className="text-[10px] rtl:rotate-180" />}
            </span>
          </div>
        </div>
      </div>
    </>
  );

  if (isLive) {
    return (
      <a {...shared} href={project.href} target="_blank" rel="noopener" onClick={() => trackLeadClick("portfolio_visit", project.id)}>
        {body}
      </a>
    );
  }

  return (
    <button
      {...shared}
      type="button"
      onClick={() => {
        trackLeadClick("demo_request", project.id);
        setShowForm(`${ui.modal.demoPrefix} ${project.title}.`);
      }}
    >
      {body}
    </button>
  );
}
