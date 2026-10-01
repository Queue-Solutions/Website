import { FaArrowLeft, FaArrowRight, FaCheck, FaExternalLinkAlt, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import PageShell from "../components/layout/PageShell";
import ActionButton from "../components/ui/ActionButton";
import AuditBanner from "../components/ui/AuditBanner";
import DemoVideo from "../components/ui/DemoVideo";
import ProjectLogoStage from "../components/ui/ProjectLogoStage";
import Reveal from "../components/ui/Reveal";
import Testimonials from "../components/ui/Testimonials";
import TrialBanner from "../components/ui/TrialBanner";
import { PRICING } from "../content/products";
import { getTestimonials } from "../content/testimonials";
import { trackLeadClick } from "../lib/analytics";
import { formatPrice } from "../lib/format";
import { getPathForPageId } from "../lib/routes";

export default function CaseStudy({ content, setShowForm, slug }) {
  const { locale, ui } = content;
  const projects = content.portfolio.projects;
  const index = projects.findIndex((item) => item.id === slug);
  const project = projects[index];
  const next = projects[(index + 1) % projects.length];
  const story = project.caseStudy;
  const testimonials = getTestimonials(locale, project.id);
  const plans = PRICING[project.id];
  const startingPrice = plans ? Math.min(...plans.map((plan) => plan.price)) : null;

  const primaryAction = project.href ? (
    <a
      href={project.href}
      target="_blank"
      rel="noopener"
      onClick={() => trackLeadClick("portfolio_visit", project.id)}
      className="inline-flex h-12 items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold text-white transition hover:brightness-110"
      style={{ backgroundColor: project.accent }}
    >
      {ui.visitProject} <FaExternalLinkAlt className="text-xs" />
    </a>
  ) : (
    <button
      type="button"
      onClick={() => {
        trackLeadClick("demo_request", project.id);
        setShowForm(`${ui.modal.demoPrefix} ${project.title}.`);
      }}
      className="inline-flex h-12 items-center justify-center rounded-full px-6 text-sm font-semibold text-white transition hover:brightness-110"
      style={{ backgroundColor: project.accent }}
    >
      {ui.requestDemo}
    </button>
  );

  return (
    <PageShell>
      {/* Hero */}
      <section className="px-5 pb-12 pt-6 sm:px-6 sm:pb-16 sm:pt-10">
        <div className="mx-auto max-w-6xl">
          <Link
            to={getPathForPageId("portfolio", locale)}
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-slate-900"
          >
            <FaArrowLeft className="text-xs rtl:rotate-180" /> {ui.backToPortfolio}
          </Link>

          <div className="mt-6 grid items-center gap-8 md:grid-cols-[1.1fr_0.9fr] md:gap-12">
            <Reveal trigger="mount" className="space-y-5 text-start">
              <p className="text-xs font-semibold uppercase tracking-[0.22em]" style={{ color: project.accent }}>
                {ui.caseStudyEyebrow} · {project.category}
              </p>
              <h1 className="text-4xl font-bold leading-[1.05] text-slate-950 sm:text-5xl">{project.title}</h1>
              <p className="text-lg leading-8 text-slate-600">{project.summary}</p>
              <div className="flex flex-col gap-3 pt-1 sm:flex-row">
                {primaryAction}
                {project.landing ? (
                  <Link
                    to={getPathForPageId("landing", locale, project.landing)}
                    className="inline-flex h-12 items-center justify-center rounded-full border border-slate-300 bg-white px-6 text-sm font-semibold text-slate-900 transition hover:border-slate-400"
                  >
                    {ui.pricing.from} {formatPrice(startingPrice, locale)} {ui.pricing.currency} · {ui.pricing.seePricing}
                  </Link>
                ) : null}
              </div>
            </Reveal>

            <Reveal trigger="mount" delay={0.08}>
              <div className="group overflow-hidden rounded-[1.75rem] border border-slate-200 shadow-[0_24px_60px_rgba(15,23,42,0.12)]">
                <ProjectLogoStage project={project} ui={ui} className="aspect-[4/3]" logoSize="h-28 w-28 sm:h-32 sm:w-32" />
              </div>
            </Reveal>
          </div>

          <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-[1.25rem] border border-slate-200 bg-slate-200 text-start md:grid-cols-4">
            {[
              [ui.client, project.client],
              [ui.industry, story.industry],
              [ui.platform, ui.platforms[project.platform]],
              [ui.builtWith, project.stack.join(" · ")],
            ].map(([label, value]) => (
              <div key={label} className="bg-white px-5 py-4">
                <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">{label}</dt>
                <dd className="mt-1 text-sm font-semibold text-slate-900">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {project.id === "molarbear" ? (
        <section className="px-5 pb-12 sm:px-6 sm:pb-16">
          <div className="mx-auto max-w-6xl">
            <TrialBanner locale={locale} source="case_study" />
          </div>
        </section>
      ) : null}

      {/* Challenge and solution, before and after */}
      <section className="border-y border-slate-200/70 bg-white/70 px-5 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 text-start md:grid-cols-2 md:gap-14">
          <Reveal>
            <h2 className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-400">{ui.challenge}</h2>
            <p className="mt-4 text-lg leading-8 text-slate-700">{story.challenge}</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="text-sm font-semibold uppercase tracking-[0.22em]" style={{ color: project.accent }}>{ui.solution}</h2>
            <p className="mt-4 text-lg leading-8 text-slate-700">{story.solution}</p>
          </Reveal>
        </div>

        <div className="mx-auto mt-12 grid max-w-6xl gap-5 md:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-[1.5rem] border border-slate-200 bg-slate-50 p-6 text-start sm:p-7">
              <p className="inline-flex rounded-full bg-slate-200 px-3 py-1 text-xs font-bold uppercase tracking-wider text-slate-600">{ui.before}</p>
              <ul className="mt-5 space-y-3">
                {story.before.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[15px] leading-7 text-slate-600">
                    <FaTimes className="mt-2 shrink-0 text-xs text-slate-400" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <div
              className="h-full rounded-[1.5rem] border p-6 text-start sm:p-7"
              style={{ backgroundColor: `${project.accent}10`, borderColor: `${project.accent}40` }}
            >
              <p className="inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider text-white" style={{ backgroundColor: project.accent }}>
                {ui.after}
              </p>
              <ul className="mt-5 space-y-3">
                {story.after.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[15px] font-medium leading-7 text-slate-800">
                    <FaCheck className="mt-2 shrink-0 text-xs" style={{ color: project.accent }} /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Features */}
      <section className="px-5 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-2xl font-bold text-slate-950 sm:text-3xl">{ui.highlightsTitle}</h2>
          <div className={`mt-10 grid gap-5 ${story.highlights.length === 4 ? "sm:grid-cols-2 lg:grid-cols-4" : "md:grid-cols-3"}`}>
            {story.highlights.map((item, itemIndex) => (
              <Reveal key={item.title} delay={itemIndex * 0.05} className="rounded-[1.5rem] border border-slate-200 bg-white p-6 text-start shadow-[0_14px_40px_rgba(15,23,42,0.05)]">
                <span className="font-mono text-xs font-bold" style={{ color: project.accent }}>
                  {String(itemIndex + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-lg font-bold text-slate-950">{item.title}</h3>
                <p className="mt-2 text-[15px] leading-7 text-slate-600">{item.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Demo video and screenshots */}
      {project.video || project.gallery?.length ? (
        <section className="border-y border-slate-200/70 bg-white/70 px-5 py-14 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-6xl space-y-10">
            <h2 className="text-center text-2xl font-bold text-slate-950 sm:text-3xl">{project.video ? ui.watchDemo : ui.screenshotsTitle}</h2>
            {project.video ? (
              <DemoVideo orientation={project.videoOrientation} poster={project.poster} src={project.video} title={project.title} />
            ) : null}
            {project.gallery?.length && project.videoOrientation !== "portrait" ? (
              <div className={`grid gap-5 ${project.gallery.length > 1 ? "sm:grid-cols-2 lg:grid-cols-3" : ""}`}>
                {project.gallery.map((src, shotIndex) => (
                  <Reveal key={src} delay={shotIndex * 0.04} className="overflow-hidden rounded-[1.25rem] border border-slate-200 bg-white shadow-[0_14px_40px_rgba(15,23,42,0.08)]">
                    <img src={src} alt={`${project.title} ${shotIndex + 1}`} loading="lazy" className="block w-full object-cover" />
                  </Reveal>
                ))}
              </div>
            ) : null}
          </div>
        </section>
      ) : null}

      {testimonials.length ? (
        <section className="px-5 py-14 sm:px-6 sm:py-20">
          <Testimonials items={testimonials} />
        </section>
      ) : null}

      {/* Closing CTA and next project */}
      <section className="px-5 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-6xl space-y-8">
          <div className="flex flex-col items-center gap-4 text-center">
            <h2 className="max-w-2xl text-2xl font-bold text-slate-950 sm:text-3xl">{content.portfolio.cta.title}</h2>
            <div className="flex flex-col gap-3 sm:flex-row">
              {primaryAction}
              <ActionButton onClick={() => setShowForm(true)} variant="secondary" className="justify-center">
                {ui.startProject}
              </ActionButton>
            </div>
          </div>

          <AuditBanner setShowForm={setShowForm} ui={ui} />

          <Link
            to={getPathForPageId("case-study", locale, next.id)}
            className="group flex items-center justify-between gap-4 rounded-[1.5rem] border border-slate-200 bg-white p-4 text-start transition hover:border-slate-300 hover:shadow-[0_14px_40px_rgba(15,23,42,0.08)] sm:p-5"
          >
            <div className="flex items-center gap-4">
              <img src={next.logo} alt="" className="h-14 w-14 rounded-2xl border border-slate-100 object-cover" loading="lazy" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">{ui.nextCaseStudy}</p>
                <p className="mt-1 text-lg font-bold text-slate-950">{next.title}</p>
              </div>
            </div>
            <FaArrowRight className="text-slate-400 transition group-hover:translate-x-1 group-hover:text-slate-900 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
