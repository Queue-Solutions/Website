import { AnimatePresence, motion as Motion } from "framer-motion";
import { useState } from "react";
import PageShell from "../components/layout/PageShell";
import ActionButton from "../components/ui/ActionButton";
import AnimatedImage from "../components/ui/AnimatedImage";
import ExpandableText from "../components/ui/ExpandableText";
import FocusSection from "../components/ui/FocusSection";
import ProjectCard from "../components/ui/ProjectCard";
import Reveal from "../components/ui/Reveal";
import SectionHeading from "../components/ui/SectionHeading";

const FILTER_IDS = ["all", "web", "desktop", "ai"];

export default function Portfolio({ content, setShowForm }) {
  const portfolio = content.portfolio;
  const ui = content.ui;
  const locale = content.locale;
  const [filter, setFilter] = useState("all");
  const visibleProjects =
    filter === "all" ? portfolio.projects : portfolio.projects.filter((project) => project.filters.includes(filter));

  return (
    <PageShell>
      <FocusSection trigger="mount" className="border-y border-slate-300/50 bg-slate-100/58 px-5 pb-8 pt-8 sm:px-6 sm:pb-14 sm:pt-16 md:pt-20" innerClassName="mx-auto max-w-xl space-y-4 text-center md:max-w-6xl md:space-y-8">
          <Reveal trigger="mount">
            <div className="inline-flex rounded-full border border-purple-200 bg-slate-50/90 px-4 py-2 text-sm font-medium text-purple-700 shadow-[0_12px_30px_rgba(168,85,247,0.12)] backdrop-blur">
              {portfolio.hero.eyebrow}
            </div>
          </Reveal>
          <Reveal trigger="mount" delay={0.08}>
            <SectionHeading
              align="center"
              locale={locale}
              mobileDescription={portfolio.hero.mobileDescription}
              mobileTitle={portfolio.hero.mobileTitle}
              title={portfolio.hero.title}
              description={portfolio.hero.description}
            />
          </Reveal>
          <Reveal trigger="mount" delay={0.12}>
            <div role="tablist" className="mx-auto flex max-w-full flex-wrap justify-center gap-2">
              {FILTER_IDS.map((id) => {
                const count = id === "all" ? portfolio.projects.length : portfolio.projects.filter((p) => p.filters.includes(id)).length;
                const active = filter === id;

                return (
                  <button
                    key={id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setFilter(id)}
                    className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition ${
                      active
                        ? "border-slate-950 bg-slate-950 text-white shadow-[0_12px_30px_rgba(15,23,42,0.18)]"
                        : "border-slate-300/80 bg-white/80 text-slate-600 hover:border-purple-300 hover:text-purple-700"
                    }`}
                  >
                    {ui.filters[id]}
                    <span className={`rounded-full px-1.5 text-[11px] ${active ? "bg-white/20" : "bg-slate-100 text-slate-500"}`}>{count}</span>
                  </button>
                );
              })}
            </div>
          </Reveal>
      </FocusSection>

      <section className="bg-slate-950 px-5 pb-14 pt-10 sm:px-6 sm:pb-20 sm:pt-16 md:pb-24">
        <Motion.div layout className="mx-auto grid max-w-md gap-6 md:max-w-6xl md:grid-cols-2 xl:grid-cols-3 xl:gap-7">
          <AnimatePresence mode="popLayout">
            {visibleProjects.map((project) => (
              <Motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 24, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <ProjectCard
                  index={portfolio.projects.indexOf(project)}
                  project={project}
                  setShowForm={setShowForm}
                  ui={ui}
                />
              </Motion.div>
            ))}
          </AnimatePresence>
        </Motion.div>
      </section>

      <FocusSection
        trigger="mount"
        className="border-y border-slate-300/50 bg-slate-100/58 px-5 py-14 sm:px-6 sm:py-20 md:py-24"
        innerClassName="mx-auto grid max-w-xl items-stretch gap-6 rounded-[2rem] border border-slate-300/70 bg-slate-100/76 p-6 shadow-[0_30px_80px_rgba(15,23,42,0.08)] backdrop-blur md:max-w-6xl md:grid-cols-[1.1fr_0.9fr] md:gap-8 md:p-10"
      >
          <Reveal trigger="mount" className="h-full overflow-hidden rounded-[1.75rem] bg-slate-950 p-5 shadow-[0_24px_60px_rgba(15,23,42,0.18)] sm:p-8">
            <div className="flex h-full flex-col justify-center space-y-5">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-purple-200">
              {portfolio.cta.eyebrow}
            </p>
            <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl">
              <span className="md:hidden">{portfolio.cta.mobileTitle ?? portfolio.cta.title}</span>
              <span className="hidden md:inline">{portfolio.cta.title}</span>
            </h2>
            <ExpandableText
              className="max-w-2xl text-base text-slate-300 md:text-lg"
              desktopText={portfolio.cta.description}
              locale={locale}
              mobileWords={7}
              text={portfolio.cta.mobileDescription ?? portfolio.cta.description}
            />
            <ActionButton onClick={() => setShowForm(true)} variant="secondary" className="w-full justify-center sm:w-auto">{ui.startProject}</ActionButton>
            </div>
          </Reveal>

          <AnimatedImage
            src={portfolio.cta.image}
            alt={portfolio.cta.imageAlt}
            className="mx-auto h-full w-full max-w-sm sm:max-w-xl md:max-w-none"
            imageClassName="h-[12.75rem] object-center sm:h-[20rem] md:h-full md:min-h-72"
          />
      </FocusSection>
    </PageShell>
  );
}
