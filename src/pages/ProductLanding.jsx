import { FaArrowRight, FaCheckCircle, FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";
import PageShell from "../components/layout/PageShell";
import AuditBanner from "../components/ui/AuditBanner";
import DemoVideo from "../components/ui/DemoVideo";
import FaqList from "../components/ui/FaqList";
import PricingPlans from "../components/ui/PricingPlans";
import Reveal from "../components/ui/Reveal";
import Testimonials from "../components/ui/Testimonials";
import TrialBanner from "../components/ui/TrialBanner";
import { LANDING_PAGES, PRODUCT_COPY } from "../content/products";
import { getTestimonials } from "../content/testimonials";
import { trackLeadClick } from "../lib/analytics";
import { getPathForPageId } from "../lib/routes";

export default function ProductLanding({ content, setShowForm, slug }) {
  const { locale, ui } = content;
  const landing = LANDING_PAGES[slug];
  const copy = PRODUCT_COPY[locale][slug];
  const project = content.portfolio.projects.find((item) => item.id === landing.productId);
  const testimonials = getTestimonials(locale, project.id);
  const whatsappHref = `${content.siteDetails.whatsappHref}?text=${encodeURIComponent(`${ui.modal.demoPrefix} ${project.title}.`)}`;

  const requestDemo = () => {
    trackLeadClick("demo_request", `${project.id}:landing`);
    setShowForm(`${ui.modal.demoPrefix} ${project.title}.`);
  };

  return (
    <PageShell>
      {/* Hero */}
      <section className="px-5 pb-14 pt-8 sm:px-6 sm:pb-20 sm:pt-14">
        <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-[1.05fr_0.95fr] md:gap-14">
          <Reveal trigger="mount" className="space-y-6 text-start">
            <div className="flex items-center gap-3">
              <img src={project.logo} alt={`${project.title} logo`} className="h-12 w-12 rounded-2xl border border-slate-200 bg-white object-cover shadow-sm" />
              <p className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: project.accent }}>
                {copy.eyebrow}
              </p>
            </div>
            <h1 className="text-[2.1rem] font-bold leading-[1.1] text-slate-950 sm:text-5xl">{copy.title}</h1>
            <p className="text-lg leading-8 text-slate-600">{copy.description}</p>
            <p
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold"
              style={{ backgroundColor: `${project.accent}14`, color: project.accent }}
            >
              <FaCheckCircle /> {copy.priceNote}
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={requestDemo}
                className="inline-flex h-12 items-center justify-center rounded-full px-6 text-sm font-semibold text-white transition hover:brightness-110"
                style={{ backgroundColor: project.accent }}
              >
                {ui.pricing.bookDemo}
              </button>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                onClick={() => trackLeadClick("whatsapp", `${project.id}:landing`)}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-6 text-sm font-semibold text-slate-900 transition hover:border-emerald-400 hover:text-emerald-700"
              >
                <FaWhatsapp className="text-base text-emerald-500" /> {ui.pricing.whatsappDemo}
              </a>
            </div>
          </Reveal>

          <Reveal trigger="mount" delay={0.08}>
            <DemoVideo orientation={landing.videoOrientation} poster={landing.poster} src={landing.video} title={copy.videoTitle} />
          </Reveal>
        </div>
      </section>

      {project.id === "molarbear" ? (
        <section className="px-5 pb-14 sm:px-6 sm:pb-16">
          <div className="mx-auto max-w-6xl">
            <TrialBanner locale={locale} source="dental_landing" />
          </div>
        </section>
      ) : null}

      {/* Features */}
      <section className="border-y border-slate-200/70 bg-white/70 px-5 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="mx-auto max-w-2xl text-center text-2xl font-bold text-slate-950 sm:text-4xl">{copy.featuresTitle}</h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {copy.features.map((feature, index) => (
              <Reveal key={feature.title} delay={index * 0.04} className="rounded-[1.5rem] border border-slate-200 bg-white p-6 text-start shadow-[0_14px_40px_rgba(15,23,42,0.05)]">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl text-sm font-bold text-white" style={{ backgroundColor: project.accent }}>
                  {index + 1}
                </span>
                <h3 className="mt-4 text-lg font-bold text-slate-950">{feature.title}</h3>
                <p className="mt-2 text-[15px] leading-7 text-slate-600">{feature.text}</p>
              </Reveal>
            ))}
          </div>

          {project.gallery?.length && landing.videoOrientation === "landscape" ? (
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {project.gallery.slice(0, 3).map((src, index) => (
                <img
                  key={src}
                  src={src}
                  alt={`${project.title} ${index + 1}`}
                  loading="lazy"
                  className="block w-full rounded-[1.25rem] border border-slate-200 shadow-[0_14px_40px_rgba(15,23,42,0.08)]"
                />
              ))}
            </div>
          ) : null}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="px-5 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold text-slate-950 sm:text-4xl">{copy.pricingTitle}</h2>
            <p className="mt-3 text-base leading-7 text-slate-600">{copy.pricingDescription}</p>
          </div>
          <div className="mt-12">
            <PricingPlans
              accent={project.accent}
              copy={copy}
              locale={locale}
              productId={project.id}
              productTitle={project.title}
              setShowForm={setShowForm}
              ui={ui}
            />
          </div>
        </div>
      </section>

      {testimonials.length ? (
        <section className="px-5 pb-14 sm:px-6 sm:pb-20">
          <Testimonials items={testimonials} />
        </section>
      ) : null}

      {/* FAQ */}
      <section className="border-y border-slate-200/70 bg-white/70 px-5 py-14 sm:px-6 sm:py-20">
        <h2 className="text-center text-2xl font-bold text-slate-950 sm:text-3xl">{ui.pricing.faqTitle}</h2>
        <div className="mt-8">
          <FaqList items={copy.faq} />
        </div>
      </section>

      <section className="px-5 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-6xl space-y-6">
          <Link
            to={getPathForPageId("case-study", locale, project.id)}
            className="group flex items-center justify-between gap-4 rounded-[1.5rem] border border-slate-200 bg-white p-5 text-start transition hover:border-slate-300 hover:shadow-[0_14px_40px_rgba(15,23,42,0.08)]"
          >
            <div className="flex items-center gap-4">
              <img src={project.logo} alt="" className="h-12 w-12 rounded-2xl border border-slate-100 object-cover" loading="lazy" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">{ui.caseStudyEyebrow}</p>
                <p className="mt-1 text-lg font-bold text-slate-950">{project.title}: {project.result}</p>
              </div>
            </div>
            <FaArrowRight className="shrink-0 text-slate-400 transition group-hover:translate-x-1 group-hover:text-slate-900 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
          </Link>
          <AuditBanner setShowForm={setShowForm} ui={ui} />
        </div>
      </section>
    </PageShell>
  );
}
