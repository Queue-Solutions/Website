import { useCallback, useEffect, useRef, useState } from "react";
import {
  FaCalendarAlt,
  FaChartBar,
  FaCheck,
  FaCheckCircle,
  FaCopy,
  FaDesktop,
  FaDownload,
  FaEnvelope,
  FaFacebookF,
  FaGift,
  FaInstagram,
  FaLaptop,
  FaPhoneAlt,
  FaPlay,
  FaRedo,
  FaTimes,
  FaUsers,
  FaWhatsapp,
  FaWindows,
} from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import FaqList from "../components/ui/FaqList";
import { TRIAL_COPY, TRIAL_DOWNLOAD } from "../content/trial";
import { trackLeadClick } from "../lib/analytics";
import { trackMetaEvent } from "../lib/metaPixel";
import { captureUtm, describeUtm, trackCampaignEvent } from "../lib/campaign";
import {
  buildLeadRecord,
  insertLeadRecord,
  isValidEmail,
  normalizeDigitsToEnglish,
  normalizePhoneDigits,
  PHONE_COUNTRIES,
  sendLeadNotification,
} from "../lib/leadCapture";
import { getPathForPageId } from "../lib/routes";
import {
  fillLink,
  isEmailSendingConfigured,
  isLikelyPhone,
  mailtoLink,
  sendTrialLinkEmail,
  TRIAL_LINK_URL,
  whatsappToNumber,
} from "../lib/trialLink";

const ACCENT = "#2f7d8c";
const BEAR = "/portfolio/molarbear.webp";
const DEMO_VIDEO = "/videos/molarbear-demo.mp4";
const DEMO_POSTER = "/case-studies/molarbear-poster.webp";
const REGISTERED_KEY = "molarbear-trial-registered";
const CONTACT_KEY = "molarbear-trial-contact";
const FEATURE_ICONS = { calendar: FaCalendarAlt, users: FaUsers, desktop: FaDesktop, chart: FaChartBar };

const inputClassName =
  "w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-base text-slate-900 placeholder-slate-400 transition focus:border-[#2f7d8c] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#2f7d8c]/10";

function startDownload() {
  const anchor = document.createElement("a");
  anchor.href = TRIAL_DOWNLOAD.url;
  anchor.download = TRIAL_DOWNLOAD.fileName;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
}

function readContact() {
  try {
    return JSON.parse(window.localStorage.getItem(CONTACT_KEY) || "null");
  } catch {
    return null;
  }
}

function readRegistered() {
  try {
    return window.localStorage.getItem(REGISTERED_KEY) === "1";
  } catch {
    return false;
  }
}

function TrialButton({ children, className = "", location, onClick }) {
  return (
    <a
      href="#trial-form"
      onClick={(event) => {
        trackCampaignEvent("trial_cta_click", { cta_location: location });
        onClick?.(event);
      }}
      className={`inline-flex h-14 items-center justify-center gap-2 rounded-full px-8 text-base font-bold uppercase tracking-wide text-white shadow-[0_18px_40px_rgba(47,125,140,0.35)] transition hover:-translate-y-0.5 hover:brightness-110 ${className}`}
      style={{ backgroundColor: ACCENT }}
    >
      {children}
    </a>
  );
}

// Full-screen player: opens from a tap (so it can start with sound), closes on Esc or the backdrop,
// and ends on a "start my trial" prompt.
function DemoVideoModal({ copy, onClose, onStartTrial }) {
  const videoRef = useRef(null);
  const [ended, setEnded] = useState(false);
  const watched = useRef(0);

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === "Escape") onClose();
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    videoRef.current?.play().catch(() => {});
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const onTimeUpdate = (event) => {
    const { currentTime, duration } = event.currentTarget;
    const percent = duration ? Math.floor((currentTime / duration) * 4) * 25 : 0;
    if (percent > watched.current && percent < 100) {
      watched.current = percent;
      trackCampaignEvent("demo_video_progress", { percent });
    }
  };

  const replay = () => {
    setEnded(false);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 p-3 backdrop-blur-sm sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={copy.videoTitle}
      onClick={onClose}
    >
      <div className="relative w-full max-w-5xl" onClick={(event) => event.stopPropagation()}>
        <button
          type="button"
          onClick={onClose}
          aria-label={copy.closeVideo}
          className="absolute -top-12 end-0 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
        >
          <FaTimes />
        </button>
        <div className="relative overflow-hidden rounded-2xl bg-black shadow-2xl sm:rounded-[1.75rem]">
          <video
            ref={videoRef}
            className="block aspect-video w-full"
            src={DEMO_VIDEO}
            poster={DEMO_POSTER}
            controls
            playsInline
            preload="auto"
            onTimeUpdate={onTimeUpdate}
            onEnded={() => {
              setEnded(true);
              trackCampaignEvent("demo_video_complete");
            }}
          />
          {ended ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-slate-950/85 p-6 text-center text-white">
              <img src={BEAR} alt="" className="h-14 w-14 rounded-2xl border-2 border-white/80 object-cover sm:h-16 sm:w-16" />
              <p className="text-xl font-bold sm:text-3xl">{copy.videoEndTitle}</p>
              <p className="text-sm text-white/80 sm:text-base">{copy.videoEndText}</p>
              <div className="mt-2 flex flex-col items-center gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={onStartTrial}
                  className="inline-flex h-12 items-center justify-center rounded-full px-7 text-sm font-bold uppercase tracking-wide text-white shadow-lg transition hover:brightness-110 sm:h-14 sm:text-base"
                  style={{ backgroundColor: ACCENT }}
                >
                  {copy.cta}
                </button>
                <button type="button" onClick={replay} className="inline-flex items-center gap-2 text-sm font-semibold text-white/80 hover:text-white">
                  <FaRedo className="text-xs" /> {copy.replay}
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default function MolarBearTrial({ content }) {
  const location = useLocation();
  const { locale, ui } = content;
  const copy = TRIAL_COPY[locale];
  const project = content.portfolio.projects.find((item) => item.id === "molarbear");
  const social = Object.fromEntries(content.socialLinks.map((link) => [link.id, link.href]));
  const [form, setForm] = useState({ name: "", email: "", phoneCountry: "EG", phone: "", clinic: "", city: "" });
  const [follows, setFollows] = useState({ facebook: false, instagram: false });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(() => (typeof window !== "undefined" && readRegistered() ? "done" : "idle"));
  const formStarted = useRef(false);
  const [onPhone] = useState(() => isLikelyPhone());
  const [contact, setContact] = useState(() => (typeof window !== "undefined" ? readContact() : null));
  const [emailState, setEmailState] = useState("idle");
  const [linkCopied, setLinkCopied] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);
  const country = PHONE_COUNTRIES.find((item) => item.code === form.phoneCountry) ?? PHONE_COUNTRIES[0];
  const whatsappHelp = `${content.siteDetails.whatsappHref}?text=${encodeURIComponent(copy.whatsappText)}`;

  useEffect(() => {
    captureUtm();
    trackCampaignEvent("trial_page_view", { language: locale });
  }, [locale]);

  const markFormStart = () => {
    if (!formStarted.current) {
      formStarted.current = true;
      trackCampaignEvent("trial_form_start");
    }
  };

  const update = (field) => (event) => {
    const value = field === "phone" ? normalizeDigitsToEnglish(event.target.value).replace(/\D/g, "") : event.target.value;
    setForm((previous) => ({ ...previous, [field]: value }));
    setErrors((previous) => ({ ...previous, [field]: "", submit: "" }));
  };

  const toggleFollow = (platform) => {
    // Ticking the box opens the page so the visitor can follow; unticking just clears it.
    if (!follows[platform]) {
      window.open(social[platform], "_blank", "noopener");
      trackCampaignEvent("social_follow_click", { platform });
    }
    setFollows((previous) => ({ ...previous, [platform]: !previous[platform] }));
  };

  const handleDownloadClick = (source) => {
    trackCampaignEvent("setup_download", { method: source, file_name: TRIAL_DOWNLOAD.fileName });
    trackMetaEvent("Download", { content_name: TRIAL_DOWNLOAD.fileName, method: source }, { custom: true });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const name = form.name.trim();
    const email = form.email.trim();
    const clinic = form.clinic.trim();
    const city = form.city.trim();
    const phoneDigits = normalizePhoneDigits(form.phone, country);
    const nextErrors = {
      name: name ? "" : copy.errors.name,
      email: isValidEmail(email) ? "" : copy.errors.email,
      phone:
        phoneDigits.length >= country.min && phoneDigits.length <= country.max && !/^(\d)\1+$/.test(phoneDigits) ? "" : copy.errors.phone,
      clinic: clinic ? "" : copy.errors.clinic,
    };

    if (Object.values(nextErrors).some(Boolean)) {
      setErrors(nextErrors);
      trackCampaignEvent("trial_form_error", { fields: Object.keys(nextErrors).filter((key) => nextErrors[key]).join(",") });
      return;
    }

    setStatus("submitting");
    const followed = Object.keys(follows).filter((key) => follows[key]);
    const subject = `MolarBear trial (IDC 2026): ${name}, ${clinic}`;
    const message = [
      `MolarBear ${TRIAL_DOWNLOAD.days}-day free trial (IDC 2026 campaign)`,
      `Clinic: ${clinic}`,
      `City: ${city || "-"}`,
      `Followed: ${followed.length ? followed.join(", ") : "none"}`,
      `Source: ${describeUtm()}`,
      `Device: ${onPhone ? "phone" : "computer"}`,
      `Version: ${TRIAL_DOWNLOAD.version}`,
    ].join("\n");
    const leadRecord = buildLeadRecord({
      activePhoneCountry: country,
      formData: { name, businessName: clinic, email, phone: form.phone, whatsapp: "", idea: message, service: "molarbear_trial" },
      pageUrl: window.location.href,
      subject,
      userAgent: navigator.userAgent,
    });

    // Count the lead if either channel records it; only block the download when both fail.
    const results = await Promise.allSettled([
      insertLeadRecord(leadRecord),
      sendLeadNotification({ businessName: clinic, email, message, name, phone: leadRecord.phone, replyTo: email, subject, whatsappLabel: "-" }),
    ]);

    if (results.every((result) => result.status === "rejected")) {
      console.error("Trial lead could not be saved.", results);
      setStatus("idle");
      setErrors({ submit: copy.errors.submit });
      trackCampaignEvent("trial_form_failed");
      return;
    }

    trackLeadClick("molarbear_trial", "form");
    trackMetaEvent("Lead", { content_name: "MolarBear 14-day trial", content_category: "molarbear_trial" });
    trackCampaignEvent("trial_form_complete", { followed: followed.join(",") || "none" });
    const savedContact = { name, email, phone: leadRecord.phone };
    try {
      window.localStorage.setItem(REGISTERED_KEY, "1");
      window.localStorage.setItem(CONTACT_KEY, JSON.stringify(savedContact));
    } catch {
      // Private mode: the visitor just sees the form again next time.
    }
    setContact(savedContact);
    setStatus("done");
    if (onPhone) {
      trackCampaignEvent("pc_download_prompt", { device: "phone" });
    } else {
      handleDownloadClick("auto");
      startDownload();
    }
    if (isEmailSendingConfigured()) {
      setEmailState("sending");
      sendTrialLinkEmail({ toEmail: email, toName: name, locale })
        .then(() => {
          setEmailState("sent");
          trackCampaignEvent("download_link_sent", { channel: "email", device: onPhone ? "phone" : "computer" });
        })
        .catch((sendError) => {
          console.warn("Download link email failed.", sendError);
          setEmailState("failed");
        });
    }
    document.getElementById("trial-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const openDemo = (from) => {
    setVideoOpen(true);
    trackCampaignEvent("demo_video_play", { video_location: from });
    trackMetaEvent("ViewContent", { content_name: "MolarBear demo video", content_category: "molarbear_trial" });
  };

  const closeDemo = useCallback(() => setVideoOpen(false), []);

  const startTrialFromVideo = () => {
    setVideoOpen(false);
    trackCampaignEvent("trial_cta_click", { cta_location: "video_end" });
    window.setTimeout(() => document.getElementById("trial-form")?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
  };

  const withEmail = (text) => text.replace("{email}", contact?.email || "");

  const copyTrialLink = async () => {
    try {
      await navigator.clipboard.writeText(TRIAL_LINK_URL);
    } catch {
      window.prompt(copy.copyLink, TRIAL_LINK_URL);
    }
    setLinkCopied(true);
    trackCampaignEvent("download_link_sent", { channel: "copy", device: onPhone ? "phone" : "computer" });
  };

  const fieldError = (field) => (errors[field] ? <p className="mt-1.5 text-sm text-red-600">{errors[field]}</p> : null);
  const label = (text, optional = false) => (
    <span className="mb-1.5 block text-sm font-semibold text-slate-700">
      {text}
      {optional ? <span className="font-normal text-slate-400"> ({copy.fields.optional})</span> : <span className="text-red-500"> *</span>}
    </span>
  );

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#eef8f9_0%,#ffffff_38%,#ffffff_100%)] text-slate-900">
      {/* Minimal campaign header */}
      <header className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-6">
        <Link to={getPathForPageId("home", locale)} aria-label={content.siteDetails.name}>
          <img src="/queue-logo.png" alt={content.siteDetails.name} className="h-10 w-10 object-contain" />
        </Link>
        <div className="flex items-center gap-3">
          <Link to={`${getPathForPageId("trial", locale === "ar" ? "en" : "ar")}${location.search}`} className="text-sm font-semibold text-slate-500 hover:text-slate-900">
            {copy.otherLanguage}
          </Link>
          <img src={BEAR} alt="MolarBear" className="h-11 w-11 rounded-xl border border-slate-200 bg-white object-cover shadow-sm" />
        </div>
      </header>

      {/* Hero + form */}
      <section className="px-5 pb-14 pt-2 sm:px-6 sm:pb-20 sm:pt-6">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-12">
          <div className="min-w-0 text-center lg:pt-6 lg:text-start">
            <div className="relative mx-auto inline-block lg:mx-0">
              <div className="absolute inset-0 -z-10 scale-125 rounded-full bg-[#2f7d8c]/15 blur-2xl" aria-hidden="true" />
              <img src={BEAR} alt="MolarBear" className="h-28 w-28 rounded-[2rem] border-4 border-white bg-white object-cover shadow-[0_20px_50px_rgba(47,125,140,0.25)] sm:h-36 sm:w-36" />
            </div>

            <h1 className="mt-5 font-bold leading-[1.02]">
              <span className="block bg-gradient-to-r from-[#1f5f6b] via-[#2f7d8c] to-[#4fb3c1] bg-clip-text pb-1 text-[clamp(2.25rem,11vw,4.5rem)] uppercase text-transparent">
                {copy.headlineTop}
              </span>
              <span className="mt-1 block text-[1.6rem] text-slate-950 sm:text-4xl">{copy.headlineBottom}</span>
            </h1>
            <p className="mt-4 text-lg font-semibold text-slate-900 sm:text-xl">{copy.subheadline}</p>
            <p className="mx-auto mt-2 max-w-xl text-[15px] leading-7 text-slate-600 sm:text-base lg:mx-0">{copy.description}</p>

            <div className="mt-6 flex flex-col items-center gap-2 lg:items-start">
              <TrialButton location="hero" className="w-full sm:w-auto">
                {copy.cta}
              </TrialButton>
              <p className="text-sm font-medium text-slate-500">{copy.noCard}</p>
              <button
                type="button"
                onClick={() => openDemo("hero")}
                className="group mt-2 inline-flex items-center gap-3 rounded-full border border-slate-200 bg-white py-1.5 pe-5 ps-1.5 text-sm font-bold text-slate-800 shadow-sm transition hover:border-[#2f7d8c]/40 hover:shadow-md"
              >
                <span className="relative flex h-9 w-9 items-center justify-center rounded-full text-white" style={{ backgroundColor: ACCENT }}>
                  <span className="absolute inset-0 animate-ping rounded-full bg-[#2f7d8c]/40" aria-hidden="true" />
                  <FaPlay className="relative ms-0.5 text-xs" />
                </span>
                {copy.watchDemo}
              </button>
            </div>

            <div className="mx-auto mt-6 flex max-w-md items-center gap-4 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-start lg:mx-0">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-400 text-lg text-white">
                <FaGift />
              </span>
              <div>
                <p className="text-sm font-bold uppercase tracking-wide text-amber-800">{copy.idcTitle}</p>
                <p className="text-sm font-medium text-slate-800">{copy.idcText}</p>
                <p className="text-xs text-slate-500">{copy.idcDates}</p>
              </div>
            </div>
          </div>

          {/* Form card */}
          <div id="trial-form" className="min-w-0 scroll-mt-6 lg:sticky lg:top-6">
            <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_30px_80px_rgba(15,23,42,0.14)]">
              <div className="h-1.5" style={{ background: `linear-gradient(90deg, ${ACCENT}, #6cc3cf)` }} />

              {status === "done" && onPhone ? (
                <div className="space-y-5 p-6 text-start sm:p-8">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl" aria-hidden="true">🎉</span>
                    <h2 className="text-2xl font-bold leading-tight text-slate-950">{copy.successTitle}</h2>
                  </div>
                  <div className="flex gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4">
                    <FaLaptop className="mt-0.5 shrink-0 text-lg text-amber-600" />
                    <div>
                      <p className="text-sm font-bold text-slate-900">{copy.pcOnlyTitle}</p>
                      <p className="mt-1 text-sm leading-6 text-slate-700">{copy.pcOnlyText}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <p className="text-sm font-bold text-slate-900">{copy.getLinkTitle}</p>
                    {emailState === "sending" ? (
                      <p className="flex items-center gap-2 rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-600">
                        <FaEnvelope className="shrink-0 text-slate-400" /> {withEmail(copy.emailSending)}
                      </p>
                    ) : emailState === "sent" ? (
                      <p className="flex items-start gap-2 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800">
                        <FaCheckCircle className="mt-0.5 shrink-0" /> {withEmail(copy.emailSent)}
                      </p>
                    ) : (
                      <a
                        href={mailtoLink(contact?.email || "", copy.mailSubject, fillLink(copy.mailBody))}
                        onClick={() => trackCampaignEvent("download_link_sent", { channel: "email_manual", device: "phone" })}
                        className="flex h-12 w-full items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-800 transition hover:border-slate-400"
                      >
                        <FaEnvelope className="shrink-0" /> <span className="min-w-0 truncate">{withEmail(copy.emailButton)}</span>
                      </a>
                    )}
                    {contact?.phone ? (
                      <a
                        href={whatsappToNumber(contact.phone, fillLink(copy.shareText))}
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => trackCampaignEvent("download_link_sent", { channel: "whatsapp", device: "phone" })}
                        className="flex h-14 w-full items-center justify-center gap-2 rounded-full bg-[#25D366] text-base font-bold text-white shadow-[0_14px_30px_rgba(37,211,102,0.3)] transition hover:brightness-105"
                      >
                        <FaWhatsapp className="text-xl" /> {copy.whatsappSelf}
                      </a>
                    ) : null}
                    <button
                      type="button"
                      onClick={copyTrialLink}
                      className="flex w-full items-center justify-between gap-3 rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-3 text-start"
                    >
                      <span className="min-w-0 truncate text-xs text-slate-500" dir="ltr">{TRIAL_LINK_URL}</span>
                      <span className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-slate-800">
                        {linkCopied ? <FaCheckCircle className="text-emerald-500" /> : <FaCopy />} {linkCopied ? copy.linkCopied : copy.copyLink}
                      </span>
                    </button>
                  </div>

                  <ul className="grid gap-2 sm:grid-cols-3">
                    {copy.successFacts.map((fact) => (
                      <li key={fact} className="flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-700">
                        <FaCheckCircle className="shrink-0 text-emerald-500" /> {fact}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={TRIAL_DOWNLOAD.url}
                    download={TRIAL_DOWNLOAD.fileName}
                    onClick={() => handleDownloadClick("button_phone")}
                    className="block text-center text-xs font-medium text-slate-400 underline underline-offset-4 hover:text-slate-600"
                  >
                    {copy.downloadAnyway}
                  </a>
                  <a
                    href={whatsappHelp}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => trackCampaignEvent("trial_help_whatsapp")}
                    className="flex items-center justify-center gap-2 text-sm font-semibold text-emerald-700 hover:text-emerald-800"
                  >
                    <FaWhatsapp className="text-base" /> {copy.needHelp}
                  </a>
                </div>
              ) : status === "done" ? (
                <div className="space-y-5 p-6 text-start sm:p-8">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl" aria-hidden="true">🎉</span>
                    <h2 className="text-2xl font-bold leading-tight text-slate-950">{copy.successTitle}</h2>
                  </div>
                  <p className="text-[15px] leading-7 text-slate-600">{copy.successText}</p>
                  {emailState === "sent" ? (
                    <p className="flex items-start gap-2 rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
                      <FaEnvelope className="mt-0.5 shrink-0" /> {withEmail(copy.pcEmailSent)}
                    </p>
                  ) : null}
                  <a
                    href={TRIAL_DOWNLOAD.url}
                    download={TRIAL_DOWNLOAD.fileName}
                    onClick={() => handleDownloadClick("button")}
                    className="flex h-14 w-full items-center justify-center gap-3 rounded-full text-base font-bold uppercase tracking-wide text-white shadow-[0_18px_40px_rgba(47,125,140,0.35)] transition hover:brightness-110"
                    style={{ backgroundColor: ACCENT }}
                  >
                    <FaDownload /> {copy.downloadButton}
                  </a>
                  <ul className="grid gap-2 sm:grid-cols-3">
                    {copy.successFacts.map((fact) => (
                      <li key={fact} className="flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-700">
                        <FaCheckCircle className="shrink-0 text-emerald-500" /> {fact}
                      </li>
                    ))}
                  </ul>
                  <div className="rounded-2xl border border-slate-200 p-4">
                    <p className="text-sm font-bold text-slate-900">{copy.stepsTitle}</p>
                    <ol className="mt-3 space-y-3">
                      {copy.steps.map((step, index) => (
                        <li key={step} className="flex items-start gap-3 text-sm leading-6 text-slate-700">
                          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white" style={{ backgroundColor: ACCENT }}>
                            {index + 1}
                          </span>
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>
                  <a
                    href={whatsappHelp}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => trackCampaignEvent("trial_help_whatsapp")}
                    className="flex items-center justify-center gap-2 text-sm font-semibold text-emerald-700 hover:text-emerald-800"
                  >
                    <FaWhatsapp className="text-base" /> {copy.needHelp}
                  </a>
                </div>
              ) : (
                <form noValidate onSubmit={handleSubmit} onFocus={markFormStart} className="space-y-4 p-6 text-start sm:p-8">
                  <h2 className="text-xl font-bold uppercase tracking-wide text-slate-950 sm:text-2xl">{copy.formTitle}</h2>

                  <label className="block">
                    {label(copy.fields.name)}
                    <input className={inputClassName} value={form.name} onChange={update("name")} placeholder={copy.placeholders.name} autoComplete="name" />
                    {fieldError("name")}
                  </label>

                  <label className="block">
                    {label(copy.fields.email)}
                    <input className={inputClassName} type="email" dir="ltr" value={form.email} onChange={update("email")} placeholder="doctor@example.com" autoComplete="email" />
                    {fieldError("email")}
                  </label>

                  <div>
                    {label(copy.fields.phone)}
                    <div className="grid grid-cols-[7rem_minmax(0,1fr)] gap-2" dir="ltr">
                      <select aria-label={ui.modal.phoneCountry} className={`${inputClassName} px-3`} value={form.phoneCountry} onChange={update("phoneCountry")}>
                        {PHONE_COUNTRIES.map((item) => (
                          <option key={item.code} value={item.code}>
                            {item.code} {item.dialCode}
                          </option>
                        ))}
                      </select>
                      <input
                        className={inputClassName}
                        value={form.phone}
                        onChange={update("phone")}
                        inputMode="numeric"
                        autoComplete="tel-national"
                        placeholder="10 1234 5678"
                        aria-label={copy.fields.phone}
                      />
                    </div>
                    {fieldError("phone")}
                  </div>

                  <label className="block">
                    {label(copy.fields.clinic)}
                    <input className={inputClassName} value={form.clinic} onChange={update("clinic")} placeholder={copy.placeholders.clinic} autoComplete="organization" />
                    {fieldError("clinic")}
                  </label>

                  <label className="block">
                    {label(copy.fields.city, true)}
                    <input className={inputClassName} value={form.city} onChange={update("city")} placeholder={copy.placeholders.city} autoComplete="address-level2" />
                  </label>

                  <div role="group" aria-labelledby="trial-social-title" className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
                    <p id="trial-social-title" className="text-sm font-semibold text-slate-700">{copy.socialTitle}</p>
                    <div className="mt-3 grid gap-2 sm:grid-cols-2">
                      {[
                        { platform: "facebook", text: copy.socialFacebook, icon: FaFacebookF, color: "#1877f2" },
                        { platform: "instagram", text: copy.socialInstagram, icon: FaInstagram, color: "#e1306c" },
                      ].map(({ platform, text, icon, color }) => {
                        const Icon = icon;
                        return (
                        <button
                          key={platform}
                          type="button"
                          role="checkbox"
                          aria-checked={follows[platform]}
                          onClick={() => toggleFollow(platform)}
                          className={`flex items-center gap-3 rounded-xl border bg-white px-3 py-2.5 text-start text-sm font-semibold transition ${
                            follows[platform] ? "border-emerald-300 text-slate-900" : "border-slate-200 text-slate-700 hover:border-slate-300"
                          }`}
                        >
                          <span
                            className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border text-[10px] ${
                              follows[platform] ? "border-emerald-500 bg-emerald-500 text-white" : "border-slate-300 bg-white text-transparent"
                            }`}
                          >
                            <FaCheck />
                          </span>
                          <Icon className="shrink-0 text-base" style={{ color }} />
                          {text}
                        </button>
                        );
                      })}
                    </div>
                    <p className="mt-2 text-xs text-slate-400">{copy.socialHint}</p>
                  </div>

                  {errors.submit ? <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{errors.submit}</p> : null}

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="flex h-14 w-full items-center justify-center gap-2 rounded-full text-base font-bold uppercase tracking-wide text-white shadow-[0_18px_40px_rgba(47,125,140,0.35)] transition hover:brightness-110 disabled:cursor-wait disabled:opacity-70"
                    style={{ backgroundColor: ACCENT }}
                  >
                    {status === "submitting" ? copy.submitting : <>{copy.submit} <span aria-hidden="true">🐻</span></>}
                  </button>
                  <p className="flex items-center justify-center gap-3 text-xs font-medium text-slate-500">
                    <span className="inline-flex items-center gap-1.5"><FaWindows /> {copy.fileInfo}</span>
                    <span>·</span>
                    <span>{copy.noCard}</span>
                  </p>
                  <p className="text-center text-xs leading-5 text-slate-400">{copy.pcNote}</p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Demo video */}
      <section className="px-5 pb-14 sm:px-6 sm:pb-20">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: ACCENT }}>{copy.videoKicker}</p>
          <h2 className="mt-2 text-2xl font-bold text-slate-950 sm:text-4xl">{copy.videoTitle}</h2>
          <p className="mx-auto mt-3 max-w-2xl text-[15px] leading-7 text-slate-600 sm:text-base">{copy.videoText}</p>
          <button
            type="button"
            onClick={() => openDemo("section")}
            aria-label={copy.watchDemo}
            className="group relative mt-8 block w-full overflow-hidden rounded-[1.5rem] border border-slate-200 bg-slate-900 shadow-[0_30px_80px_rgba(15,23,42,0.18)] sm:rounded-[2rem]"
          >
            <img src={DEMO_POSTER} alt="" className="block aspect-video w-full object-cover transition duration-500 group-hover:scale-[1.02]" loading="lazy" />
            <span className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-slate-950/10 to-transparent" aria-hidden="true" />
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-white text-xl shadow-2xl transition group-hover:scale-110 sm:h-24 sm:w-24 sm:text-3xl" style={{ color: ACCENT }}>
                <span className="absolute inset-0 animate-ping rounded-full bg-white/50" aria-hidden="true" />
                <FaPlay className="relative ms-1" />
              </span>
            </span>
            <span className="absolute bottom-3 start-3 rounded-full bg-slate-950/70 px-3 py-1 text-xs font-semibold text-white sm:bottom-5 sm:start-5 sm:text-sm">
              {copy.videoCaption}
            </span>
          </button>
          <TrialButton location="video" className="mt-8 w-full sm:w-auto">
            {copy.cta}
          </TrialButton>
        </div>
      </section>

      {/* What it does */}
      <section className="bg-slate-50 px-5 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-2xl font-bold text-slate-950 sm:text-4xl">{copy.featuresTitle}</h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {copy.features.map((feature) => {
              const Icon = FEATURE_ICONS[feature.icon];
              return (
                <div key={feature.title} className="rounded-[1.5rem] border border-slate-200 bg-white p-6 text-start shadow-[0_14px_40px_rgba(15,23,42,0.05)]">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl text-lg text-white" style={{ backgroundColor: ACCENT }}>
                    <Icon />
                  </span>
                  <h3 className="mt-4 text-lg font-bold text-slate-950">{feature.title}</h3>
                  <p className="mt-1.5 text-[15px] leading-7 text-slate-600">{feature.text}</p>
                </div>
              );
            })}
          </div>
          <div className="mt-8 overflow-hidden rounded-[1.5rem] border border-slate-200 shadow-[0_24px_60px_rgba(15,23,42,0.1)]">
            <img src={project.gallery[0]} alt="MolarBear Clinic Flow" className="block w-full" loading="lazy" />
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="px-5 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto grid max-w-5xl items-center gap-10 md:grid-cols-[0.7fr_1.3fr]">
          <img src={BEAR} alt="" className="mx-auto h-40 w-40 rounded-[2.5rem] border border-slate-100 object-cover shadow-[0_20px_50px_rgba(47,125,140,0.2)] sm:h-56 sm:w-56" loading="lazy" />
          <div className="text-start">
            <h2 className="text-2xl font-bold text-slate-950 sm:text-4xl">{copy.howTitle}</h2>
            <ol className="mt-8 space-y-5">
              {copy.how.map((step, index) => (
                <li key={step.title} className="flex items-start gap-4">
                  <span className="font-mono text-3xl font-bold leading-none" style={{ color: ACCENT }}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-lg font-bold uppercase tracking-wide text-slate-950">{step.title}</h3>
                    <p className="mt-1 text-[15px] leading-7 text-slate-600">{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Why try it */}
      <section className="px-5 pb-14 sm:px-6 sm:pb-20">
        <div className="mx-auto max-w-4xl rounded-[2rem] px-6 py-12 text-center text-white sm:px-12" style={{ background: `linear-gradient(135deg, #1f5f6b, ${ACCENT})` }}>
          <h2 className="text-2xl font-bold uppercase sm:text-4xl">{copy.whyTitle}</h2>
          <div className="mx-auto mt-5 max-w-xl space-y-1 text-base leading-7 text-white/85 sm:text-lg">
            {copy.whyText.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
          <a
            href="#trial-form"
            onClick={() => trackCampaignEvent("trial_cta_click", { cta_location: "why" })}
            className="mt-8 inline-flex h-14 items-center justify-center rounded-full bg-white px-8 text-base font-bold uppercase tracking-wide text-[#1f5f6b] transition hover:-translate-y-0.5"
          >
            {copy.cta}
          </a>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-slate-50 px-5 py-14 sm:px-6 sm:py-20">
        <h2 className="text-center text-2xl font-bold text-slate-950 sm:text-3xl">{copy.faqTitle}</h2>
        <div className="mt-8">
          <FaqList items={copy.faq} />
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-5 py-16 text-center sm:px-6 sm:py-20">
        <img src={BEAR} alt="" className="mx-auto h-20 w-20 rounded-3xl border border-slate-100 object-cover shadow-sm" loading="lazy" />
        <h2 className="mt-5 text-3xl font-bold uppercase text-slate-950 sm:text-4xl">{copy.finalTitle}</h2>
        <p className="mt-2 text-lg text-slate-600">{copy.finalText}</p>
        <TrialButton location="final" className="mt-7 w-full sm:w-auto">
          {copy.submit} <span aria-hidden="true">🐻</span>
        </TrialButton>
        <p className="mt-4 text-sm text-slate-400">{copy.byline}</p>
        <Link
          to={getPathForPageId("landing", locale, "dental-clinic-software-egypt")}
          className="mt-2 inline-block text-sm font-semibold text-[#2f7d8c] hover:underline"
        >
          {copy.seePlans}
        </Link>
      </section>

      {/* Minimal footer */}
      <footer className="border-t border-slate-200 px-5 py-8 sm:px-6">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-5 text-center sm:flex-row sm:justify-between sm:text-start">
          <div className="flex items-center gap-3">
            <img src="/queue-logo.png" alt={content.siteDetails.name} className="h-9 w-9 object-contain" />
            <p className="text-sm font-semibold text-slate-700">{copy.byline}</p>
          </div>
          <div className="flex flex-col items-center gap-2 text-sm text-slate-600 sm:flex-row sm:gap-5">
            <a href={`mailto:${content.siteDetails.email}`} className="inline-flex items-center gap-2 hover:text-slate-900">
              <FaEnvelope className="text-slate-400" /> {content.siteDetails.email}
            </a>
            <a href={content.siteDetails.whatsappHref} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-slate-900" dir="ltr">
              <FaPhoneAlt className="text-slate-400" /> +20 112 743 5060
            </a>
          </div>
          <div className="flex items-center gap-2">
            {[
              { platform: "facebook", icon: FaFacebookF },
              { platform: "instagram", icon: FaInstagram },
            ].map(({ platform, icon }) => {
              const Icon = icon;
              return (
              <a
                key={platform}
                href={social[platform]}
                target="_blank"
                rel="noreferrer"
                aria-label={platform}
                onClick={() => trackCampaignEvent("social_follow_click", { platform, location: "footer" })}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition hover:border-slate-300 hover:text-slate-900"
              >
                <Icon />
              </a>
              );
            })}
          </div>
        </div>
      </footer>

      {videoOpen ? <DemoVideoModal copy={copy} onClose={closeDemo} onStartTrial={startTrialFromVideo} /> : null}
    </div>
  );
}
