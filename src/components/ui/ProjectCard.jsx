import { FaArrowRight, FaCheck, FaExternalLinkAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { trackLeadClick } from "../../lib/analytics";
import { getPathForPageId } from "../../lib/routes";
import ProjectLogoStage from "./ProjectLogoStage";

// The card opens its case study (stretched link over the whole card). The action button
// sits above that link: live projects open in a new tab, the others open a prefilled demo
// request. Every card uses the same footer so the grid lines up.
export default function ProjectCard({ index, locale, project, setShowForm, ui }) {
  const isLive = Boolean(project.href);
  const caseStudyPath = getPathForPageId("case-study", locale, project.id);

  return (
    <article className="group relative flex h-full w-full flex-col overflow-hidden rounded-[1.75rem] border border-slate-200/90 bg-white text-start shadow-[0_18px_50px_rgba(15,23,42,0.08)] transition duration-300 focus-within:ring-2 focus-within:ring-purple-500 hover:-translate-y-1.5 hover:border-slate-300 hover:shadow-[0_28px_70px_rgba(15,23,42,0.16)]">
      <ProjectLogoStage index={index} project={project} ui={ui} />

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: project.accent }}>
          {project.category}
        </p>
        <h3 className="mt-2 text-[1.35rem] font-bold leading-tight text-slate-950">
          <Link to={caseStudyPath} className="outline-none after:absolute after:inset-0 after:content-['']">
            {project.title}
          </Link>
        </h3>
        <p className="mt-1 text-sm font-medium text-slate-500">{project.client}</p>
        <p className="mt-3 line-clamp-3 text-[15px] leading-7 text-slate-600">{project.summary}</p>

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

        <div className="mt-auto border-t border-slate-100 pt-4">
          <div className="mt-1 flex items-center gap-2 text-sm font-semibold text-slate-900">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: project.accent }} />
            {project.result}
          </div>

          <div className="relative z-10 mt-4 grid grid-cols-2 gap-2">
            <Link
              to={caseStudyPath}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-3 text-[13px] font-semibold text-slate-800 transition hover:border-slate-300 hover:bg-slate-50"
            >
              {ui.viewCaseStudy}
              <FaArrowRight className="text-[10px] rtl:rotate-180" />
            </Link>
            {isLive ? (
              <a
                href={project.href}
                target="_blank"
                rel="noopener"
                onClick={() => trackLeadClick("portfolio_visit", project.id)}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-full px-3 text-[13px] font-semibold text-white transition hover:brightness-110"
                style={{ backgroundColor: project.accent }}
              >
                {ui.visitProject}
                <FaExternalLinkAlt className="text-[10px]" />
              </a>
            ) : (
              <button
                type="button"
                onClick={() => {
                  trackLeadClick("demo_request", project.id);
                  setShowForm(`${ui.modal.demoPrefix} ${project.title}.`);
                }}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-full px-3 text-[13px] font-semibold text-white transition hover:brightness-110"
                style={{ backgroundColor: project.accent }}
              >
                {ui.requestDemo}
              </button>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
