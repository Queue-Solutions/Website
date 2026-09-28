import { FaDesktop, FaGlobe, FaLayerGroup } from "react-icons/fa";

const PLATFORM_ICONS = { web: FaGlobe, webapp: FaLayerGroup, desktop: FaDesktop };

// Brand-coloured stage with a geometric backdrop and the project logo centred on it.
export default function ProjectLogoStage({ className = "aspect-[16/10]", index, logoSize = "h-24 w-24 sm:h-28 sm:w-28", project, ui }) {
  const PlatformIcon = PLATFORM_ICONS[project.platform] ?? FaGlobe;
  const isDark = project.accentSoft.startsWith("#1");

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        backgroundColor: project.accentSoft,
        backgroundImage: `radial-gradient(circle at 50% 55%, ${project.accent}33 0%, transparent 62%), linear-gradient(135deg, ${project.accent}22 0%, transparent 55%)`,
      }}
    >
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
          className="absolute left-1/2 top-1/2 aspect-square max-h-[92%] -translate-x-1/2 -translate-y-1/2 rounded-full border transition duration-700 group-hover:scale-110"
          style={{ width: `${size}%`, borderColor: `${project.accent}40` }}
          aria-hidden="true"
        />
      ))}

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className={`${logoSize} overflow-hidden rounded-[1.6rem] bg-white shadow-[0_18px_40px_rgba(15,23,42,0.22)] ring-4 ring-white/70 transition duration-500 group-hover:scale-105`}>
          <img src={project.logo} alt={`${project.title} logo`} className="h-full w-full object-cover" loading="lazy" width="112" height="112" />
        </div>
      </div>

      <span className="absolute start-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-[11px] font-semibold text-slate-700 shadow-sm">
        <PlatformIcon className="text-[10px]" style={{ color: project.accent }} />
        {ui.platforms[project.platform]}
      </span>
      {typeof index === "number" ? (
        <span className={`absolute end-4 top-4 font-mono text-xs font-semibold tracking-widest ${isDark ? "text-white/40" : "text-slate-900/35"}`}>
          {String(index + 1).padStart(2, "0")}
        </span>
      ) : null}
      {project.href ? (
        <span className="absolute bottom-4 end-4 inline-flex items-center gap-1.5 rounded-full bg-emerald-500/95 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
          <span className="h-1.5 w-1.5 rounded-full bg-white" /> {ui.live}
        </span>
      ) : null}
    </div>
  );
}
