import { FaArrowRight, FaEnvelope, FaFacebookF, FaInstagram, FaPaperPlane, FaWhatsapp } from "react-icons/fa";
import PageShell from "../components/layout/PageShell";
import ActionButton from "../components/ui/ActionButton";
import AnimatedImage from "../components/ui/AnimatedImage";
import FocusSection from "../components/ui/FocusSection";
import Reveal from "../components/ui/Reveal";
import SectionHeading from "../components/ui/SectionHeading";

export default function Contact({ content, setShowForm }) {
  const contact = content.contact;
  const ui = content.ui;
  const site = content.siteDetails;
  const locale = content.locale;
  const whatsappHref = site.whatsappHref ?? "https://wa.me/201127435060";
  const cards = ui.contactCards;

  return (
    <PageShell>
      <FocusSection
        className="border-y border-slate-300/50 bg-slate-100/58 px-5 pb-14 pt-16 sm:px-6 sm:pb-20 sm:pt-20 md:pt-24"
        innerClassName="mx-auto grid max-w-xl items-stretch gap-6 md:max-w-6xl md:grid-cols-[1fr_0.95fr] md:gap-12"
      >
          <div className="mx-auto w-full max-w-xl space-y-6 sm:space-y-8">
            <Reveal>
              <div className="inline-flex rounded-full border border-purple-200 bg-slate-50/90 px-4 py-2 text-sm font-medium text-purple-700 shadow-[0_12px_30px_rgba(168,85,247,0.12)] backdrop-blur">
                {contact.hero.eyebrow}
              </div>
            </Reveal>

            <Reveal delay={0.06}>
              <SectionHeading
                locale={locale}
                mobileDescription={contact.hero.mobileDescription}
                mobileTitle={contact.hero.mobileTitle}
                title={contact.hero.title}
                description={contact.hero.description}
              />
            </Reveal>

            <div className="grid auto-rows-fr gap-4 sm:grid-cols-2">
              <ContactCard
                className="sm:min-h-[13.75rem]"
                icon={<FaEnvelope />}
                eyebrow={cards.emailEyebrow}
                tone="email"
                title={ui.contactCards.emailTitle}
                body={site.email}
                ctaLabel={cards.emailAction}
                href={`mailto:${site.email}`}
              />
              <ContactCard
                className="sm:min-h-[13.75rem]"
                icon={<FaWhatsapp />}
                eyebrow={cards.whatsappEyebrow}
                tone="whatsapp"
                title={cards.whatsappTitle}
                body={cards.whatsappBody}
                href={whatsappHref}
                rel="noreferrer"
                target="_blank"
              />
              <ContactCard
                icon={<FaPaperPlane />}
                eyebrow={cards.formEyebrow}
                tone="form"
                title={ui.contactCards.formTitle}
                body={ui.contactCards.formBody}
                ctaLabel={ui.contactCards.formAction}
                className="sm:col-span-2 sm:min-h-[12.75rem]"
                onClick={() => setShowForm(true)}
              />
            </div>
          </div>

          <AnimatedImage
            src={contact.hero.image}
            alt={contact.hero.imageAlt}
            className="mx-auto h-full w-full max-w-sm sm:max-w-xl md:max-w-none"
            imageClassName="h-[12.75rem] object-center sm:h-[20rem] md:h-full md:min-h-[30rem]"
          />
      </FocusSection>

      <FocusSection className="bg-slate-950 px-5 py-14 sm:px-6 sm:py-20 md:py-24" innerClassName="mx-auto grid max-w-xl items-stretch gap-6 md:max-w-6xl md:grid-cols-[1fr_0.9fr] md:gap-8">
          <Reveal className="h-full overflow-hidden rounded-[2rem] bg-slate-950 p-5 shadow-[0_24px_60px_rgba(15,23,42,0.18)] sm:p-8 md:p-10">
            <div className="flex h-full flex-col justify-center">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-purple-200">
              {ui.contactWhy}
            </p>
            <h2 className="mt-4 text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
              {contact.whyTitle}
            </h2>

            <div className="mt-8 grid gap-4">
              {contact.reasons.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-[1.25rem] border border-white/10 bg-white/8 px-4 py-4 text-slate-100 backdrop-blur"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-400/18 text-purple-200">
                    <FaArrowRight className="text-sm rtl:rotate-180" />
                  </span>
                  <span className="leading-6">{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <SocialPill href={whatsappHref} icon={<FaWhatsapp />}>
                {cards.whatsappTitle}
              </SocialPill>
              {content.socialLinks.map((link) => (
                <SocialPill key={link.id} href={link.href} icon={link.id === "instagram" ? <FaInstagram /> : <FaFacebookF />}>
                  {link.label}
                </SocialPill>
              ))}
            </div>
            </div>
          </Reveal>

          <Reveal className="flex h-full flex-col overflow-hidden rounded-[2rem] border border-slate-300/70 bg-slate-100/82 shadow-[0_24px_60px_rgba(15,23,42,0.08)]">
            <img
              src={contact.cta.image}
              alt={contact.cta.imageAlt}
              className="h-40 w-full object-cover object-center sm:h-64"
            />
            <div className="flex flex-1 flex-col justify-center space-y-5 p-6 sm:p-8">
              <SectionHeading
                eyebrow={contact.cta.eyebrow}
                locale={locale}
                mobileDescription={contact.cta.mobileDescription}
                mobileTitle={contact.cta.mobileTitle}
                title={contact.cta.title}
                description={contact.cta.description}
              />
              <ActionButton onClick={() => setShowForm(true)} className="w-full justify-center sm:w-auto">{ui.startProject}</ActionButton>
            </div>
          </Reveal>
      </FocusSection>
    </PageShell>
  );
}

function ContactCard({ body, className = "", ctaLabel, eyebrow, href, icon, onClick, rel, target, title, tone = "email" }) {
  const toneClasses = {
    email: {
      panel:
        "border-slate-200 bg-white shadow-[0_14px_32px_rgba(15,23,42,0.05)] hover:border-violet-300 hover:shadow-[0_18px_36px_rgba(15,23,42,0.08)]",
      icon: "bg-violet-50 text-violet-700",
      eyebrow: "text-violet-700",
      cta: "text-violet-700",
    },
    whatsapp: {
      panel:
        "border-slate-200 bg-white shadow-[0_14px_32px_rgba(15,23,42,0.05)] hover:border-green-300 hover:shadow-[0_18px_36px_rgba(15,23,42,0.08)]",
      icon: "bg-green-50 text-green-600",
      eyebrow: "text-green-700",
      cta: "text-green-700",
    },
    form: {
      panel:
        "border-slate-200 bg-white shadow-[0_14px_32px_rgba(15,23,42,0.05)] hover:border-violet-300 hover:shadow-[0_18px_36px_rgba(15,23,42,0.08)]",
      icon: "bg-violet-50 text-violet-700",
      eyebrow: "text-violet-700",
      cta: "text-violet-700",
    },
  };
  const theme = toneClasses[tone] ?? toneClasses.email;
  const baseClassName = `group relative mx-auto flex min-h-[13.75rem] w-full flex-col overflow-hidden rounded-[1.5rem] border p-5 text-start backdrop-blur transition duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2 sm:max-w-none sm:p-6 ${theme.panel}`.trim();

  const content = (
    <>
      <div className="flex items-start justify-between gap-4">
        <div className={`flex h-12 w-12 items-center justify-center rounded-[1.1rem] text-base ${theme.icon}`}>
          {icon}
        </div>
        {eyebrow ? (
          <span className={`rounded-full bg-slate-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] ${theme.eyebrow}`}>
            {eyebrow}
          </span>
        ) : null}
      </div>
      <div className="mt-5 space-y-2">
        <h3 className="text-[1.15rem] font-bold leading-[1.1] tracking-[-0.03em] text-slate-950 sm:text-[1.3rem]">{title}</h3>
        <p className={`max-w-[28rem] text-[0.98rem] leading-7 text-slate-600 ${tone === "email" ? "break-all text-slate-700" : ""}`}>
          {body}
        </p>
      </div>
      {ctaLabel ? (
        <div className={`mt-auto pt-5 text-sm font-semibold ${theme.cta}`}>
          <span className="inline-flex items-center gap-2">
            {ctaLabel}
            <FaArrowRight className="text-xs transition-transform duration-200 group-hover:translate-x-0.5 rtl:rotate-180" />
          </span>
        </div>
      ) : null}
    </>
  );

  if (href) {
    return (
      <Reveal className={className}>
        <a href={href} target={target} rel={rel} className={baseClassName}>
          {content}
        </a>
      </Reveal>
    );
  }

  return (
    <Reveal className={className}>
      <button type="button" onClick={onClick} className={`${baseClassName} appearance-none`}>
        {content}
      </button>
    </Reveal>
  );
}

function SocialPill({ children, href, icon }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="flex w-full items-center justify-center gap-3 rounded-full border border-slate-300/70 bg-slate-100/88 px-4 py-3 font-medium text-slate-700 shadow-[0_12px_30px_rgba(15,23,42,0.06)] transition hover:border-purple-300 hover:text-purple-700 sm:w-auto sm:px-5"
    >
      {icon}
      {children}
    </a>
  );
}
