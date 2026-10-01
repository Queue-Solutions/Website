import { motion as Motion } from "framer-motion";
import { FaArrowRight, FaChevronDown } from "react-icons/fa";
import { Link } from "react-router-dom";
import PageShell from "../components/layout/PageShell";
import ActionButton from "../components/ui/ActionButton";
import AuditBanner from "../components/ui/AuditBanner";
import FaqList from "../components/ui/FaqList";
import ProjectCard from "../components/ui/ProjectCard";
import ProjectLogoStage from "../components/ui/ProjectLogoStage";
import Testimonials from "../components/ui/Testimonials";
import Reveal from "../components/ui/Reveal";
import { COMPANY_FAQ, FAQ_TITLE } from "../content/company";
import { PRICING } from "../content/products";
import { TRIAL_COPY } from "../content/trial";
import { getTestimonials } from "../content/testimonials";
import { trackLeadClick } from "../lib/analytics";
import { formatPrice } from "../lib/format";
import { getPathForPageId } from "../lib/routes";

const FEATURED_IDS = ["glowmia", "egypt-gold-design", "egypt-gold-whatsapp"];
const PRODUCT_IDS = ["queue-pos", "molarbear"];

function SectionHeader({ action, description, eyebrow, title }) {
  return (
    <div className="flex flex-col gap-5 text-start md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-purple-700">{eyebrow}</p>
        <h2 className="mt-3 text-[1.75rem] font-bold leading-tight text-slate-950 sm:text-4xl">{title}</h2>
        {description ? <p className="mt-3 text-base leading-7 text-slate-600 sm:text-lg">{description}</p> : null}
      </div>
      {action}
    </div>
  );
}

export default function Home({ content, navTo, setShowForm }) {
  const { home, portfolio, process, ui, locale } = content;
  const featured = FEATURED_IDS.map((id) => portfolio.projects.find((project) => project.id === id));
  const products = PRODUCT_IDS.map((id) => portfolio.projects.find((project) => project.id === id));
  const testimonials = getTestimonials(locale);

  return (
    <PageShell>
      {/* Hero: on phones the first screen shows only the name; the pitch and buttons follow on scroll */}
      <section className="relative flex min-h-[100svh] items-center px-5 pb-16 pt-24 sm:min-h-[88svh] sm:pt-32">
        <div className="mx-auto w-full max-w-5xl text-center">
          <Motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.05 }}
            className="font-bold leading-[1.04] text-slate-950"
          >
            <span className="block bg-gradient-to-r from-slate-950 via-purple-700 to-violet-500 bg-clip-text pb-[0.1em] text-[3.4rem] text-transparent sm:text-7xl lg:text-[6rem]">
              {home.heroTitleAccent}
            </span>
            <span className="mt-3 hidden text-5xl leading-[1.2] sm:block lg:text-[3.6rem]">{home.heroTitleTop}</span>
          </Motion.h1>

          <Motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.15 }}
            className="mx-auto mt-6 hidden max-w-2xl text-xl leading-8 text-slate-600 sm:block"
          >
            {home.heroDescription}
          </Motion.p>

          <Motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="mt-9 hidden items-center justify-center gap-4 sm:flex"
          >
            <ActionButton onClick={() => setShowForm(true)} className="justify-center px-8">
              {ui.startProject}
            </ActionButton>
            <ActionButton onClick={() => navTo("portfolio")} variant="secondary" className="justify-center px-8">
              {ui.viewPortfolio}
            </ActionButton>
          </Motion.div>
        </div>

        <Motion.div
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 8, 0] }}
          transition={{ opacity: { delay: 0.9, duration: 0.5 }, y: { delay: 0.9, duration: 1.6, repeat: Infinity, ease: "easeInOut" } }}
          className="absolute inset-x-0 bottom-8 flex justify-center text-purple-700/70 sm:hidden"
        >
          <FaChevronDown />
        </Motion.div>
      </section>

      <section className="px-5 pb-16 sm:hidden">
        <Motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-md text-center"
        >
          <p className="text-[1.75rem] font-bold leading-[1.2] text-slate-950">{home.heroTitleTop}</p>
          <p className="mt-4 text-base leading-7 text-slate-600">{home.heroDescription}</p>
          <div className="mt-8 flex flex-col gap-3">
            <ActionButton onClick={() => setShowForm(true)} className="w-full justify-center px-8">
              {ui.startProject}
            </ActionButton>
            <ActionButton onClick={() => navTo("portfolio")} variant="secondary" className="w-full justify-center px-8">
              {ui.viewPortfolio}
            </ActionButton>
          </div>
        </Motion.div>
      </section>

      {/* Featured work */}
      <section className="border-t border-slate-200/70 px-5 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-6xl space-y-10">
          <Reveal>
            <div className="flex flex-col gap-5 text-start md:flex-row md:items-end md:justify-between">
              <div className="max-w-2xl">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-purple-700">{portfolio.hero.eyebrow}</p>
                <h2 className="mt-3 text-[1.75rem] font-bold leading-tight text-slate-950 sm:text-4xl">{portfolio.hero.title}</h2>
              </div>
              <ActionButton onClick={() => navTo("portfolio")} variant="secondary" className="w-full justify-center md:w-auto">
                {ui.viewPortfolio}
              </ActionButton>
            </div>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-3">
            {featured.map((project, index) => (
              <Reveal key={project.id} delay={index * 0.05} className="h-full">
                <ProjectCard
                  index={portfolio.projects.indexOf(project)}
                  locale={locale}
                  project={project}
                  setShowForm={setShowForm}
                  ui={ui}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Ready-made products */}
      <section className="px-5 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-6xl space-y-10">
          <Reveal>
            <SectionHeader eyebrow={ui.productsSection.eyebrow} title={ui.productsSection.title} description={ui.productsSection.description} />
          </Reveal>
          <div className="grid gap-6 md:grid-cols-2">
            {products.map((project, index) => {
              const plans = PRICING[project.id];
              const lowest = Math.min(...plans.map((plan) => plan.price));
              const yearly = plans[0].period === "year";

              return (
                <Reveal key={project.id} delay={index * 0.05} className="h-full">
                  <article className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white text-start shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
                    <ProjectLogoStage project={project} ui={ui} className="aspect-[2/1]" />
                    <div className="flex flex-1 flex-col p-6 sm:p-7">
                      <p className="text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: project.accent }}>
                        {project.category}
                      </p>
                      <h3 className="mt-2 text-2xl font-bold text-slate-950">{project.title}</h3>
                      <p className="mt-3 flex-1 text-[15px] leading-7 text-slate-600">{project.summary}</p>
                      <div className="mt-5 flex items-baseline gap-2 border-t border-slate-100 pt-5">
                        <span className="text-sm font-medium text-slate-500">{yearly ? ui.pricing.from : ""}</span>
                        <span className="text-3xl font-bold text-slate-950">{formatPrice(lowest, locale)}</span>
                        <span className="text-sm font-semibold text-slate-500">
                          {ui.pricing.currency} {yearly ? ui.pricing.perYear : `· ${ui.pricing.oneTime}`}
                        </span>
                      </div>
                      <div className="mt-5 grid grid-cols-2 gap-2">
                        <Link
                          to={getPathForPageId("landing", locale, project.landing)}
                          className="inline-flex h-11 items-center justify-center rounded-full border border-slate-200 bg-white px-3 text-[13px] font-semibold text-slate-800 transition hover:bg-slate-50"
                        >
                          {ui.pricing.seePricing}
                        </Link>
                        {project.id === "molarbear" ? (
                          <Link
                            to={getPathForPageId("trial", locale)}
                            onClick={() => trackLeadClick("molarbear_trial", "home")}
                            className="inline-flex h-11 items-center justify-center rounded-full px-3 text-[13px] font-semibold text-white transition hover:brightness-110"
                            style={{ backgroundColor: project.accent }}
                          >
                            {TRIAL_COPY[locale].headlineTop}
                          </Link>
                        ) : (
                          <button
                            type="button"
                            onClick={() => {
                              trackLeadClick("demo_request", `${project.id}:home`);
                              setShowForm(`${ui.modal.demoPrefix} ${project.title}.`);
                            }}
                            className="inline-flex h-11 items-center justify-center rounded-full px-3 text-[13px] font-semibold text-white transition hover:brightness-110"
                            style={{ backgroundColor: project.accent }}
                          >
                            {ui.requestDemo}
                          </button>
                        )}
                      </div>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Client testimonials: hidden until at least one is approved in content/testimonials.js */}
      {testimonials.length ? (
        <section className="px-5 pb-16 sm:px-6 sm:pb-24">
          <Reveal>
            <Testimonials items={testimonials} title={ui.testimonialsTitle} />
          </Reveal>
        </section>
      ) : null}

      {/* How we work */}
      <section className="border-y border-slate-200/70 bg-white/60 px-5 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-6xl space-y-10">
          <Reveal>
            <SectionHeader
              eyebrow={ui.processSteps}
              title={process.stepsTitle}
              action={
                <button type="button" onClick={() => navTo("process")} className="inline-flex items-center gap-2 text-sm font-semibold text-purple-700 hover:text-purple-900">
                  {process.hero.eyebrow} <FaArrowRight className="text-xs rtl:rotate-180" />
                </button>
              }
            />
          </Reveal>
          <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {process.steps.map((step, index) => (
              <Reveal key={step.num} delay={index * 0.05} className="h-full">
                <li className="h-full rounded-[1.5rem] border border-slate-200 bg-white p-6 text-start">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 to-violet-500 text-sm font-bold text-white">
                    {step.num}
                  </span>
                  <h3 className="mt-4 text-lg font-bold text-slate-950">{step.title}</h3>
                  <p className="mt-2 text-[15px] leading-7 text-slate-600">{step.description}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* FAQ: direct answers, mirrored in the FAQPage structured data */}
      <section className="px-5 pt-16 sm:px-6 sm:pt-24">
        <div className="mx-auto max-w-6xl space-y-10">
          <Reveal className="text-center">
            <h2 className="text-[1.75rem] font-bold leading-tight text-slate-950 sm:text-4xl">{FAQ_TITLE[locale]}</h2>
          </Reveal>
          <Reveal>
            <FaqList items={COMPANY_FAQ[locale]} />
          </Reveal>
        </div>
      </section>

      {/* Free audit and final CTA */}
      <section className="px-5 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-6xl space-y-12">
          <Reveal>
            <AuditBanner setShowForm={setShowForm} ui={ui} />
          </Reveal>
          <Reveal className="text-center">
            <h2 className="mx-auto max-w-2xl text-[1.75rem] font-bold leading-tight text-slate-950 sm:text-4xl">{content.contact.cta.title}</h2>
            <p className="mx-auto mt-3 max-w-xl text-base leading-7 text-slate-600">{content.contact.cta.mobileDescription}</p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <ActionButton onClick={() => setShowForm(true)} className="w-full justify-center px-8 sm:w-auto">
                {ui.startProject}
              </ActionButton>
              <ActionButton onClick={() => navTo("contact")} variant="secondary" className="w-full justify-center px-8 sm:w-auto">
                {ui.contactUs}
              </ActionButton>
            </div>
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}
