import { FaArrowRight, FaBrain, FaCode, FaCogs, FaDatabase, FaGlobe, FaHeadset, FaMobileAlt } from "react-icons/fa";
import PageShell from "../components/layout/PageShell";
import ActionButton from "../components/ui/ActionButton";
import AnimatedImage from "../components/ui/AnimatedImage";
import AuditBanner from "../components/ui/AuditBanner";
import ExpandableText from "../components/ui/ExpandableText";
import FocusSection from "../components/ui/FocusSection";
import Reveal from "../components/ui/Reveal";
import SectionHeading from "../components/ui/SectionHeading";

const iconMap = {
  brain: FaBrain,
  code: FaCode,
  cogs: FaCogs,
  database: FaDatabase,
  globe: FaGlobe,
  headset: FaHeadset,
  mobile: FaMobileAlt,
};

export default function Services({ content, navTo, setShowForm }) {
  const servicesContent = content.services;
  const ui = content.ui;
  const locale = content.locale;

  return (
    <PageShell>
      <FocusSection
        className="border-y border-slate-300/50 bg-slate-100/58 px-5 pb-8 pt-6 sm:px-6 sm:pb-20 sm:pt-16 md:pt-20"
        innerClassName="mx-auto grid max-w-xl items-stretch gap-6 md:max-w-6xl md:grid-cols-1"
      >
          <Reveal className="mx-auto h-full w-full max-w-xl rounded-[2rem] border border-slate-300/70 bg-slate-100/78 p-4 shadow-[0_30px_80px_rgba(15,23,42,0.08)] backdrop-blur sm:p-8 md:max-w-none md:p-10">
            <div className="flex h-full flex-col justify-center space-y-6 sm:space-y-8">
            <SectionHeading
              as="h1"
              locale={locale}
              mobileDescription={servicesContent.hero.mobileDescription}
              mobileTitle={servicesContent.hero.mobileTitle}
              title={servicesContent.hero.title}
              description={servicesContent.hero.description}
            />

            <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-row sm:gap-4">
              <ActionButton onClick={() => navTo("contact")} className="w-full justify-center">
                {ui.contactUs}
              </ActionButton>
              <ActionButton onClick={() => navTo("portfolio")} variant="secondary" className="w-full justify-center">
                {ui.viewPortfolio}
              </ActionButton>
            </div>
            </div>
          </Reveal>
      </FocusSection>

      <FocusSection className="bg-slate-950 px-5 pb-14 pt-8 sm:px-6 sm:py-20 md:py-24" innerClassName="mx-auto">
        <Reveal className="mx-auto grid w-full max-w-xl gap-6 rounded-[2rem] border border-white/10 bg-slate-950 p-4 shadow-[0_30px_80px_rgba(15,23,42,0.18)] backdrop-blur sm:max-w-2xl sm:p-5 md:max-w-6xl md:grid-cols-[1.04fr_0.96fr] md:items-stretch md:gap-8 md:p-10">
          <div className="order-1 relative min-h-[23rem] overflow-hidden rounded-[2rem] border border-white/8 bg-slate-950 p-4 text-white shadow-[0_30px_80px_rgba(15,23,42,0.18)] sm:min-h-[26rem] sm:p-8 md:order-1 md:min-h-[34rem] md:p-8">
            <div className="absolute -left-12 top-10 h-40 w-40 rounded-full bg-purple-500/20 blur-3xl" />
            <div className="absolute bottom-0 right-0 h-48 w-48 rounded-full bg-sky-400/15 blur-3xl" />
            <div className="relative flex h-full w-full flex-col justify-start">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-purple-200 sm:text-sm sm:tracking-[0.24em]">
                {servicesContent.automationHighlight.eyebrow}
              </p>
              <h2 className="mt-3 text-[1.45rem] font-bold leading-[1.05] text-white md:hidden">
                {servicesContent.automationHighlight.mobileTitle ?? servicesContent.automationHighlight.title}
              </h2>
              <h2 className="mt-4 hidden text-3xl font-bold leading-tight text-white sm:text-4xl md:block">
                {servicesContent.automationHighlight.title}
              </h2>
              <p className="mt-3 text-[13px] leading-5 text-slate-300 md:hidden">
                {servicesContent.automationHighlight.mobileDescription ?? servicesContent.automationHighlight.description}
              </p>
              <p className="mt-4 hidden text-base leading-8 text-slate-300 md:block">
                {servicesContent.automationHighlight.description}
              </p>
              <div className="mt-4 rounded-[1.15rem] border border-white/10 bg-white/8 px-3 py-2.5 text-[12px] leading-5 text-slate-200 backdrop-blur md:mt-6 md:rounded-[1.5rem] md:px-5 md:py-4 md:text-sm md:leading-7">
                <p className="text-[12px] leading-5 text-slate-200 md:hidden">
                  {servicesContent.automationHighlight.mobileNote ?? servicesContent.automationHighlight.note}
                </p>
                <p className="hidden text-sm leading-7 text-slate-200 md:block">
                  {servicesContent.automationHighlight.note}
                </p>
              </div>

              <div className="mt-4 flex flex-wrap gap-2 md:mt-6 md:gap-3">
                {servicesContent.automationHighlight.chips.map((chip, index) => (
                  <span
                    key={chip}
                    className={`rounded-full border border-white/12 bg-white/8 px-3 py-1.5 text-[12px] font-medium text-white/90 backdrop-blur sm:px-4 sm:text-sm ${index > 2 ? "hidden md:inline-flex" : ""}`}
                  >
                    {chip}
                  </span>
                ))}
              </div>

              <div className="mt-5 md:mt-8">
                <ActionButton onClick={() => navTo("contact")} variant="secondary" className="w-full justify-center sm:w-auto">
                  {ui.contactUs}
                </ActionButton>
              </div>
            </div>
          </div>

          <div className="order-2 grid gap-4 md:order-2 md:grid-rows-[auto_1fr]">
            <AnimatedImage
              src={servicesContent.automationHighlight.image}
              alt={servicesContent.automationHighlight.imageAlt}
              className="mx-auto w-full max-w-sm sm:max-w-xl md:max-w-none"
              imageClassName="h-[11rem] object-center sm:h-[15rem] md:h-[22rem]"
            />

            <div className="grid grid-cols-2 gap-3 md:hidden">
              {servicesContent.automationHighlight.points.map((point, index) => (
                <div
                  key={point.title}
                  className="mx-auto flex h-full w-full max-w-sm flex-col justify-between rounded-[1.35rem] border border-white/10 bg-white/[0.05] p-4 shadow-[0_14px_32px_rgba(15,23,42,0.16)] sm:max-w-none"
                >
                  <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-purple-200/90">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 text-[1rem] font-bold leading-[1.2] text-white">
                    {servicesContent.automationHighlight.mobilePointTitles?.[index] ?? point.title}
                  </h3>
                </div>
              ))}
            </div>

            <div className="hidden gap-4 sm:grid-cols-2 md:grid">
              {servicesContent.automationHighlight.points.map((point) => (
                <div key={point.title} className="mx-auto flex h-full w-full max-w-sm flex-col justify-start rounded-[1.5rem] border border-white/10 bg-slate-900/92 p-5 shadow-[0_18px_40px_rgba(15,23,42,0.2)] sm:max-w-none md:p-5">
                  <h3 className="text-lg font-bold text-white">{point.title}</h3>
                  <p className="mt-2 text-[15px] leading-7 text-slate-300">{point.description}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </FocusSection>

      <FocusSection className="border-y border-slate-300/50 bg-slate-100/58 px-5 py-14 sm:px-6 sm:py-20 md:py-24" innerClassName="mx-auto">
        <Reveal className="mx-auto grid w-full max-w-xl gap-6 rounded-[2rem] border border-slate-900/90 bg-slate-950 p-4 shadow-[0_30px_80px_rgba(15,23,42,0.08)] backdrop-blur sm:max-w-2xl sm:p-5 md:max-w-6xl md:grid-cols-[0.96fr_1.04fr] md:items-stretch md:gap-8 md:border-slate-300/70 md:bg-slate-100/76 md:p-10">
          <div className="order-2 grid gap-4 md:order-1 md:grid-rows-[auto_1fr]">
            <AnimatedImage
              src={servicesContent.callAgentHighlight.image}
              alt={servicesContent.callAgentHighlight.imageAlt}
              className="mx-auto w-full max-w-sm sm:max-w-xl md:max-w-none"
              imageClassName="h-[11rem] object-[center_35%] sm:h-[15rem] md:h-[22rem] md:object-center"
            />

            <div className="grid grid-cols-2 gap-3 md:hidden">
              {servicesContent.callAgentHighlight.points.map((point, index) => (
                <div
                  key={point.title}
                  className="mx-auto flex h-full w-full max-w-sm flex-col justify-between rounded-[1.35rem] border border-slate-300/60 bg-slate-50/88 p-4 shadow-[0_14px_32px_rgba(15,23,42,0.08)] sm:max-w-none"
                >
                  <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-purple-600/90">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 text-[1rem] font-bold leading-[1.2] text-slate-950">
                    {servicesContent.callAgentHighlight.mobilePointTitles?.[index] ?? point.title}
                  </h3>
                </div>
              ))}
            </div>

            <div className="hidden gap-4 sm:grid-cols-2 md:grid">
              {servicesContent.callAgentHighlight.points.map((point) => (
                <div key={point.title} className="mx-auto flex h-full w-full max-w-sm flex-col justify-start rounded-[1.5rem] border border-slate-300/60 bg-slate-50/88 p-5 sm:max-w-none md:p-5">
                  <h3 className="text-lg font-bold text-slate-950">{point.title}</h3>
                  <p className="mt-2 text-[15px] leading-7 text-slate-600">{point.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="order-1 relative min-h-[23rem] overflow-hidden rounded-[2rem] bg-slate-950 p-4 text-white shadow-[0_30px_80px_rgba(15,23,42,0.18)] sm:min-h-[26rem] sm:p-8 md:order-2 md:min-h-[34rem] md:p-8">
            <div className="absolute -right-12 top-10 h-40 w-40 rounded-full bg-purple-500/20 blur-3xl" />
            <div className="absolute bottom-0 left-0 h-48 w-48 rounded-full bg-sky-400/15 blur-3xl" />
            <div className="relative flex h-full w-full flex-col justify-start">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-purple-200 sm:text-sm sm:tracking-[0.24em]">
                {servicesContent.callAgentHighlight.eyebrow}
              </p>
              <h2 className="mt-3 text-[1.45rem] font-bold leading-[1.05] text-white md:hidden">
                {servicesContent.callAgentHighlight.mobileTitle ?? servicesContent.callAgentHighlight.title}
              </h2>
              <h2 className="mt-4 hidden text-3xl font-bold leading-tight text-white sm:text-4xl md:block">
                {servicesContent.callAgentHighlight.title}
              </h2>
              <p className="mt-3 text-[13px] leading-5 text-slate-300 md:hidden">
                {servicesContent.callAgentHighlight.mobileDescription ?? servicesContent.callAgentHighlight.description}
              </p>
              <p className="mt-4 hidden text-base leading-8 text-slate-300 md:block">
                {servicesContent.callAgentHighlight.description}
              </p>
              <div className="mt-4 rounded-[1.15rem] border border-white/10 bg-white/8 px-3 py-2.5 text-[12px] leading-5 text-slate-200 backdrop-blur md:mt-6 md:rounded-[1.5rem] md:px-5 md:py-4 md:text-sm md:leading-7">
                <p className="text-[12px] leading-5 text-slate-200 md:hidden">
                  {servicesContent.callAgentHighlight.mobileNote ?? servicesContent.callAgentHighlight.note}
                </p>
                <p className="hidden text-sm leading-7 text-slate-200 md:block">
                  {servicesContent.callAgentHighlight.note}
                </p>
              </div>

              <div className="mt-4 flex flex-wrap gap-2 md:mt-6 md:gap-3">
                {servicesContent.callAgentHighlight.chips.map((chip, index) => (
                  <span
                    key={chip}
                    className={`rounded-full border border-white/12 bg-white/8 px-3 py-1.5 text-[12px] font-medium text-white/90 backdrop-blur sm:px-4 sm:text-sm ${index > 2 ? "hidden md:inline-flex" : ""}`}
                  >
                    {chip}
                  </span>
                ))}
              </div>

              <div className="mt-5 md:mt-8">
                <ActionButton onClick={() => navTo("contact")} variant="secondary" className="w-full justify-center sm:w-auto">
                  {ui.contactUs}
                </ActionButton>
              </div>
            </div>
          </div>
        </Reveal>
      </FocusSection>

      <FocusSection
        className="bg-slate-950 px-5 py-14 sm:px-6 sm:py-18 md:py-20"
        inactiveOpacity={1}
        inactiveScale={1}
        innerClassName="mx-auto max-w-xl space-y-6 md:max-w-6xl md:space-y-8"
      >
          <Reveal>
            <SectionHeading
              className="space-y-3 md:space-y-4"
              descriptionClassName="max-w-[20rem] text-slate-300 sm:max-w-2xl md:max-w-3xl"
              eyebrow={ui.capabilities}
              locale={locale}
              mobileDescription={servicesContent.capabilitiesMobileDescription}
              mobileTitle={servicesContent.capabilitiesMobileTitle}
              titleClassName="text-white"
              title={servicesContent.capabilitiesTitle}
              description={servicesContent.capabilitiesDescription}
            />
          </Reveal>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3 xl:gap-8">
            {servicesContent.services.map((service, index) => {
              const Icon = iconMap[service.icon];

              return (
                <Reveal key={service.title} delay={index * 0.06}>
                  <article className="group mx-auto w-full max-w-sm overflow-hidden rounded-[2rem] border border-slate-300/70 bg-slate-100/82 shadow-[0_24px_60px_rgba(15,23,42,0.08)] transition hover:-translate-y-1 hover:shadow-[0_28px_70px_rgba(15,23,42,0.12)] md:max-w-none">
                    <div className="relative h-44 overflow-hidden sm:h-60">
                      <img
                        src={service.image}
                        alt={service.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/55 via-transparent to-transparent" />
                      <div className="absolute start-5 top-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-50/92 text-purple-700 shadow-lg">
                        <Icon />
                      </div>
                    </div>

                    <div className="space-y-4 p-5 sm:p-7">
                      <div className="flex items-center justify-between">
                        <h3 className="text-[1.35rem] font-bold leading-tight text-slate-950 sm:text-2xl">{service.title}</h3>
                        <FaArrowRight className="text-slate-300 transition group-hover:translate-x-1 group-hover:text-purple-600 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
                      </div>
                      <ExpandableText
                        className="text-[15px] leading-6 text-slate-600 sm:text-base sm:leading-7"
                        locale={locale}
                        mobileWords={6}
                        text={service.description}
                      />
                      <div className="pt-2">
                        <ActionButton onClick={() => navTo("contact")} variant="subtle" className="w-full justify-center sm:w-auto">
                          {ui.discussService}
                        </ActionButton>
                      </div>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
      </FocusSection>

      <FocusSection className="border-y border-slate-300/50 bg-slate-100/58 px-5 py-14 sm:px-6 sm:py-20 md:py-24" innerClassName="mx-auto">
        <Reveal className="mx-auto grid w-full max-w-xl items-start gap-6 rounded-[2rem] border border-slate-300/70 bg-slate-100/76 p-5 shadow-[0_30px_80px_rgba(15,23,42,0.08)] backdrop-blur sm:max-w-2xl sm:p-6 md:max-w-6xl md:grid-cols-[0.92fr_1.08fr] md:gap-8 md:p-10">
          <div className="mx-auto w-full max-w-xl">
            <SectionHeading
              eyebrow={ui.whyQueue}
              locale={locale}
              mobileDescription={servicesContent.reasonsMobileDescription}
              mobileTitle={servicesContent.reasonsMobileTitle}
              title={servicesContent.reasonsTitle}
              description={servicesContent.reasonsDescription}
            />
          </div>

          <div className="grid grid-cols-2 gap-3 md:hidden">
            {servicesContent.reasons.map((item, index) => (
                <div
                  key={item.title}
                  className="mx-auto flex h-full w-full max-w-sm flex-col items-center justify-center rounded-[1.35rem] border border-slate-300/60 bg-slate-50/88 p-4 text-center shadow-[0_14px_32px_rgba(15,23,42,0.08)] sm:max-w-none"
                >
                  <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-purple-600/90">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h4 className="mt-4 text-[1rem] font-bold leading-[1.2] text-slate-950">
                    {servicesContent.reasonsMobileTitles?.[index] ?? item.title}
                  </h4>
                </div>
            ))}
          </div>

          <div className="hidden gap-4 sm:grid-cols-2 md:grid">
            {servicesContent.reasons.map((item) => (
              <div key={item.title} className="mx-auto w-full max-w-sm rounded-[1.5rem] border border-slate-300/60 bg-slate-50/88 p-5 sm:max-w-none sm:p-6">
                <h4 className="text-xl font-bold text-slate-950">{item.title}</h4>
                <p className="mt-2 leading-7 text-slate-600">{item.description}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </FocusSection>
      <section className="px-5 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <AuditBanner setShowForm={setShowForm} ui={ui} />
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}
