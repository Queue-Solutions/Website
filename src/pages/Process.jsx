import { FaArrowRight, FaCodeBranch, FaCompass, FaRocket, FaSitemap } from "react-icons/fa";
import PageShell from "../components/layout/PageShell";
import ActionButton from "../components/ui/ActionButton";
import AnimatedImage from "../components/ui/AnimatedImage";
import ExpandableText from "../components/ui/ExpandableText";
import FocusSection from "../components/ui/FocusSection";
import Reveal from "../components/ui/Reveal";
import SectionHeading from "../components/ui/SectionHeading";

const stepIcons = [FaCompass, FaSitemap, FaCodeBranch, FaRocket];

export default function Process({ content, setShowForm }) {
  const process = content.process;
  const ui = content.ui;
  const locale = content.locale;
  const isArabic = content.direction === "rtl";

  return (
    <PageShell>
      <FocusSection
        className="border-y border-slate-300/50 bg-slate-100/58 px-5 pb-14 pt-10 sm:px-6 sm:pb-20 sm:pt-16 md:pt-20"
        innerClassName="mx-auto grid max-w-xl items-stretch gap-6 md:max-w-6xl md:grid-cols-[0.95fr_1.05fr] md:gap-12"
      >
          <AnimatedImage
            src={process.hero.image}
            alt={process.hero.imageAlt}
            className="order-2 mx-auto h-full w-full max-w-sm sm:max-w-xl md:order-1 md:max-w-none"
            imageClassName="h-full min-h-[14rem] sm:min-h-[20rem] md:min-h-[30rem]"
          />

          <Reveal className="order-1 mx-auto h-full w-full max-w-xl rounded-[2rem] border border-slate-300/70 bg-slate-100/78 p-5 shadow-[0_30px_80px_rgba(15,23,42,0.08)] backdrop-blur sm:p-8 md:order-2 md:max-w-none md:p-10">
            <div className="flex h-full flex-col justify-center space-y-8">
            <div className="inline-flex w-fit rounded-full border border-purple-200 bg-slate-50/90 px-4 py-2 text-sm font-medium text-purple-700 shadow-[0_12px_30px_rgba(168,85,247,0.12)] backdrop-blur">
              {process.hero.eyebrow}
            </div>

            <SectionHeading
              locale={locale}
              mobileDescription={process.hero.mobileDescription}
              mobileTitle={process.hero.mobileTitle}
              title={process.hero.title}
              description={process.hero.description}
            />

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {process.hero.cards.map((card) => (
                <div
                  key={card.title}
                  className="mx-auto w-full rounded-[1.5rem] border border-slate-300/60 bg-slate-50/88 p-5 shadow-[0_18px_40px_rgba(15,23,42,0.08)] backdrop-blur"
                >
                  <p className="text-base font-semibold text-slate-950">{card.title}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{card.text}</p>
                </div>
              ))}
            </div>
            </div>
          </Reveal>
      </FocusSection>

      <FocusSection className="border-y border-slate-300/50 bg-slate-100/58 px-5 py-14 sm:px-6 sm:py-20 md:py-24" innerClassName="mx-auto max-w-xl md:max-w-5xl">
          <Reveal>
            <SectionHeading
              align="center"
              eyebrow={ui.processSteps}
              locale={locale}
              mobileTitle={process.stepsMobileTitle}
              title={process.stepsTitle}
            />
          </Reveal>

          <div className="mt-12 space-y-6 md:mt-16 md:space-y-8">
            <Reveal>
              <div className="rounded-[2rem] border border-slate-300/70 bg-slate-100/80 p-4 shadow-[0_24px_60px_rgba(15,23,42,0.08)] backdrop-blur sm:p-5 md:p-6">
                <div className="grid gap-3 md:grid-cols-4">
                  {process.steps.map((step, index) => (
                    <div
                      key={step.num}
                      className={`relative rounded-[1.4rem] border border-slate-200/80 bg-white/78 p-4 ${
                        index === 0 || index === process.steps.length - 1 ? "shadow-[0_18px_40px_rgba(15,23,42,0.06)]" : ""
                      }`}
                    >
                      <div className={"flex items-center gap-3"}>
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 via-violet-500 to-fuchsia-500 text-sm font-bold text-white shadow-[0_14px_30px_rgba(124,58,237,0.22)]">
                          {step.num}
                        </div>
                        <div className={"min-w-0 text-start"}>
                          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400">
                            {ui.phase}
                          </p>
                          <p className="mt-1 text-sm font-semibold text-slate-950 sm:text-base">{step.title}</p>
                        </div>
                      </div>
                      {index < process.steps.length - 1 ? (
                        <div className="pointer-events-none absolute inset-y-1/2 -end-5 hidden h-px w-10 -translate-y-1/2 bg-gradient-to-r from-purple-300 via-violet-300 to-sky-300 md:block" />
                      ) : null}
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <div className="grid gap-5 md:grid-cols-2 md:gap-8">
              {process.steps.map((step, index) => {
                const Icon = stepIcons[index] ?? FaCompass;
                const nextStep = process.steps[index + 1];
                const alignRight = index % 2 === 1;

                return (
                  <Reveal
                    key={step.num}
                    delay={index * 0.06}
                    className={`w-full ${alignRight ? "md:translate-y-16" : ""}`}
                  >
                    <article className="group relative mx-auto h-full max-w-xl overflow-hidden rounded-[2rem] border border-slate-300/70 bg-slate-100/84 p-5 shadow-[0_24px_60px_rgba(15,23,42,0.08)] backdrop-blur transition hover:-translate-y-1 hover:shadow-[0_30px_70px_rgba(15,23,42,0.12)] sm:p-7 md:max-w-none">
                      <div className="absolute -right-10 top-6 h-24 w-24 rounded-full bg-purple-400/10 blur-3xl" />
                      <div className="absolute bottom-0 left-0 h-28 w-28 rounded-full bg-sky-300/10 blur-3xl" />

                      <div className={"relative flex items-start justify-between gap-4"}>
                        <div className={"flex items-center gap-4"}>
                          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[1.4rem] bg-gradient-to-br from-purple-600 via-violet-500 to-fuchsia-500 text-xl font-bold text-white shadow-[0_18px_35px_rgba(124,58,237,0.28)]">
                            {step.num}
                          </div>
                          <div className="min-w-0">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-500">
                              {`${ui.stage} ${step.num}`}
                            </p>
                            <h3 className="mt-2 text-[1.55rem] font-bold leading-tight text-slate-950 sm:text-[1.9rem]">
                              {step.title}
                            </h3>
                          </div>
                        </div>

                        <div className="hidden h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-white/82 text-purple-700 shadow-sm sm:flex">
                          <Icon />
                        </div>
                      </div>

                      <div className="relative mt-6">
                        <ExpandableText
                          className="text-base leading-7 text-slate-600 md:text-lg"
                          locale={locale}
                          mobileWords={8}
                          text={step.description}
                        />
                      </div>

                      <div className={"relative mt-6 flex items-center justify-between gap-4 border-t border-slate-200/80 pt-5"}>
                        <div className="rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                          {`${ui.step} ${index + 1} ${ui.of} ${process.steps.length}`}
                        </div>
                        {nextStep ? (
                          <div className={"flex items-center gap-2 text-sm font-medium text-slate-500"}>
                            <span>{ui.next}</span>
                            <FaArrowRight className={`text-xs text-purple-500 ${isArabic ? "rotate-180" : ""}`} />
                            <span className="text-slate-700">{nextStep.title}</span>
                          </div>
                        ) : (
                          <div className="text-sm font-medium text-purple-700">
                            {ui.readyToLaunch}
                          </div>
                        )}
                      </div>
                    </article>
                  </Reveal>
                );
              })}
            </div>
          </div>
      </FocusSection>

      <FocusSection
        className="bg-slate-950 px-5 py-14 sm:px-6 sm:py-20 md:py-24"
        innerClassName="mx-auto grid max-w-xl items-stretch gap-6 rounded-[2rem] border border-slate-300/70 bg-slate-100/76 p-6 shadow-[0_30px_80px_rgba(15,23,42,0.08)] backdrop-blur md:max-w-6xl md:grid-cols-[1fr_0.9fr] md:gap-8 md:p-10"
      >
          <Reveal className="h-full overflow-hidden rounded-[1.75rem] bg-slate-950 p-5 shadow-[0_24px_60px_rgba(15,23,42,0.18)] sm:p-8">
            <div className="flex h-full flex-col justify-center space-y-5">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-purple-200">
              {process.cta.eyebrow}
            </p>
            <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl">
              <span className="md:hidden">{process.cta.mobileTitle ?? process.cta.title}</span>
              <span className="hidden md:inline">{process.cta.title}</span>
            </h2>
            <ExpandableText
              className="max-w-2xl text-base text-slate-300 md:text-lg"
              desktopText={process.cta.description}
              locale={locale}
              mobileWords={7}
              text={process.cta.mobileDescription ?? process.cta.description}
            />
            <ActionButton onClick={() => setShowForm(true)} variant="secondary" className="w-full justify-center sm:w-auto">{ui.beginProject}</ActionButton>
            </div>
          </Reveal>

          <AnimatedImage
            src={process.cta.image}
            alt={process.cta.imageAlt}
            className="mx-auto h-full w-full max-w-sm sm:max-w-xl md:max-w-none"
            imageClassName="h-full min-h-[14rem] sm:min-h-[20rem] md:min-h-72"
          />
      </FocusSection>
    </PageShell>
  );
}
