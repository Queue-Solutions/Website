import { motion as Motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FaCheck, FaChevronDown, FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import {
  buildLeadRecord,
  insertLeadRecord,
  isValidEmail,
  normalizeDigitsToEnglish,
  normalizePhoneDigits,
  PHONE_COUNTRIES,
  sendLeadNotification,
} from "../../lib/leadCapture";
import ActionButton from "../ui/ActionButton";

const inputClassName =
  "w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 placeholder-slate-400 transition focus:border-purple-500/50 focus:outline-none";

export default function ContactFormModal({ content, initialIdea = "", initialMode = "project", setShowForm }) {
  const [mode, setMode] = useState(initialMode);
  const [website, setWebsite] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    businessName: "",
    email: "",
    phoneCountry: "EG",
    phone: "",
    whatsapp: "",
    idea: initialIdea,
  });
  const [submitState, setSubmitState] = useState("idle");
  const [showWhatsappError, setShowWhatsappError] = useState(false);
  const [validationErrors, setValidationErrors] = useState({
    name: "",
    businessName: "",
    email: "",
    phone: "",
    idea: "",
  });
  const [scrollIndicator, setScrollIndicator] = useState({ canScroll: false, height: 120, top: 0 });
  const scrollRef = useRef(null);
  const indicatorTrackRef = useRef(null);
  const modal = content.ui.modal;
  const isAudit = mode === "audit";
  const isArabic = content.locale === "ar";
  const activePhoneCountry = PHONE_COUNTRIES.find((country) => country.code === formData.phoneCountry) ?? PHONE_COUNTRIES[0];
  const trimmedName = formData.name.trim();
  const trimmedBusinessName = formData.businessName.trim();
  const trimmedEmail = formData.email.trim();
  const trimmedIdea = formData.idea.trim();
  const phoneDigits = normalizeDigitsToEnglish(formData.phone).replace(/\D/g, "");
  const normalizedPhoneDigits = normalizePhoneDigits(formData.phone, activePhoneCountry);
  const isPhoneValid =
    normalizedPhoneDigits.length >= activePhoneCountry.min &&
    normalizedPhoneDigits.length <= activePhoneCountry.max &&
    !/^(\d)\1+$/.test(normalizedPhoneDigits);
  const emailPlaceholder = isArabic
    ? "\u0627\u0644\u0628\u0631\u064a\u062f \u0627\u0644\u0625\u0644\u0643\u062a\u0631\u0648\u0646\u064a (\u0627\u062e\u062a\u064a\u0627\u0631\u064a)"
    : "Email (optional)";
  const requiredMessages = {
    name: modal.nameRequired ?? (isArabic ? "\u0623\u062f\u062e\u0644 \u0627\u0633\u0645\u0643 \u0627\u0644\u0643\u0627\u0645\u0644." : "Enter your full name."),
    businessName:
      modal.businessNameRequired ??
      (isArabic ? "\u0623\u062f\u062e\u0644 \u0627\u0633\u0645 \u0627\u0644\u0634\u0631\u0643\u0629." : "Enter your business name."),
    phone: modal.phoneRequired ?? (isArabic ? "\u0623\u062f\u062e\u0644 \u0631\u0642\u0645 \u0627\u0644\u0647\u0627\u062a\u0641." : "Enter your phone number."),
    idea: modal.ideaRequired ?? (isArabic ? "\u0627\u0643\u062a\u0628 \u0641\u0643\u0631\u0629 \u0627\u0644\u0645\u0634\u0631\u0648\u0639." : "Enter your project idea."),
  };
  const errorMessage = isArabic
    ? "\u062a\u0639\u0630\u0631 \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0646\u0645\u0648\u0630\u062c \u0627\u0644\u0622\u0646. \u062d\u0627\u0648\u0644 \u0645\u0631\u0629 \u0623\u062e\u0631\u0649 \u0628\u0639\u062f \u0644\u062d\u0638\u0627\u062a."
    : "The form could not be sent right now. Please try again in a moment.";
  const sendingLabel = isArabic ? "\u062c\u0627\u0631\u064a \u0627\u0644\u0625\u0631\u0633\u0627\u0644..." : "Sending...";

  const getFieldClassName = (fieldName) =>
    `${inputClassName} ${validationErrors[fieldName] ? "border-red-300 bg-red-50/70 focus:border-red-400" : ""}`.trim();

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setShowForm(false);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [setShowForm]);

  useEffect(() => {
    const element = scrollRef.current;
    if (!element) {
      return undefined;
    }

    const updateScrollIndicator = () => {
      const { clientHeight, scrollHeight, scrollTop } = element;
      const trackHeight = indicatorTrackRef.current?.clientHeight ?? clientHeight;
      const canScroll = scrollHeight > clientHeight + 4;

      if (!canScroll) {
        setScrollIndicator({ canScroll: false, height: 0, top: 0 });
        return;
      }

      const thumbHeight = Math.max(trackHeight * (clientHeight / scrollHeight), 72);
      const maxOffset = Math.max(trackHeight - thumbHeight, 0);
      const top = scrollHeight === clientHeight ? 0 : (scrollTop / (scrollHeight - clientHeight)) * maxOffset;

      setScrollIndicator({ canScroll: true, height: thumbHeight, top });
    };

    updateScrollIndicator();
    element.addEventListener("scroll", updateScrollIndicator, { passive: true });

    const resizeObserver = new ResizeObserver(() => updateScrollIndicator());
    resizeObserver.observe(element);

    return () => {
      element.removeEventListener("scroll", updateScrollIndicator);
      resizeObserver.disconnect();
    };
  }, [
    modal.description,
    modal.idea,
    showWhatsappError,
    submitState,
    validationErrors.businessName,
    validationErrors.email,
    validationErrors.idea,
    validationErrors.name,
    validationErrors.phone,
  ]);

  const resetSubmitState = () => {
    if (submitState !== "idle") {
      setSubmitState("idle");
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    resetSubmitState();

    if (validationErrors[name]) {
      setValidationErrors((previous) => ({ ...previous, [name]: "" }));
    }

    if (name === "phone" || name === "whatsapp") {
      setShowWhatsappError(false);
    }

    setFormData((previous) => ({
      ...previous,
      [name]: name === "phone" ? normalizeDigitsToEnglish(value).replace(/\D/g, "") : value,
    }));
  };

  const handleWhatsappChange = (value) => {
    resetSubmitState();
    setShowWhatsappError(false);
    setFormData((previous) => ({ ...previous, whatsapp: value }));
  };

  const handleCountryChange = (value) => {
    resetSubmitState();

    if (validationErrors.phone) {
      setValidationErrors((previous) => ({ ...previous, phone: "" }));
    }

    setShowWhatsappError(false);
    setFormData((previous) => ({ ...previous, phoneCountry: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const nextValidationErrors = { name: "", businessName: "", email: "", phone: "", idea: "" };

    if (!trimmedName) {
      nextValidationErrors.name = requiredMessages.name;
    }

    if (!trimmedBusinessName) {
      nextValidationErrors.businessName = requiredMessages.businessName;
    }

    if (trimmedEmail && !isValidEmail(trimmedEmail)) {
      nextValidationErrors.email = modal.emailInvalid;
    }

    if (!phoneDigits) {
      nextValidationErrors.phone = requiredMessages.phone;
    } else if (!isPhoneValid) {
      nextValidationErrors.phone = modal.phoneInvalid;
    }

    if (!trimmedIdea) {
      nextValidationErrors.idea = requiredMessages.idea;
    }

    const hasValidationErrors = Object.values(nextValidationErrors).some(Boolean);

    if (hasValidationErrors || !formData.whatsapp) {
      setValidationErrors(nextValidationErrors);
      setShowWhatsappError(!formData.whatsapp);
      return;
    }

    setSubmitState("submitting");

    const trimmedWebsite = website.trim();
    const leadMessage = isAudit
      ? [`[${modal.auditTag}]`, trimmedWebsite ? `${modal.auditWebsiteLabel}: ${trimmedWebsite}` : "", trimmedIdea].filter(Boolean).join("\n")
      : trimmedIdea;
    const leadSubject = `${isAudit ? modal.auditSubject : modal.emailSubject} ${trimmedName}`;
    const leadRecord = buildLeadRecord({
      activePhoneCountry,
      formData: { ...formData, idea: leadMessage, service: isAudit ? "digital_audit" : "project" },
      pageUrl: typeof window !== "undefined" ? window.location.href : null,
      subject: leadSubject,
      userAgent: typeof navigator !== "undefined" ? navigator.userAgent : null,
    });

    try {
      await insertLeadRecord(leadRecord);

      try {
        await sendLeadNotification({
          businessName: trimmedBusinessName,
          email: trimmedEmail,
          message: leadMessage,
          name: trimmedName,
          phone: leadRecord.phone,
          replyTo: trimmedEmail,
          subject: leadSubject,
          whatsappLabel: formData.whatsapp === "yes" ? modal.whatsappYes : modal.whatsappNo,
        });
      } catch (emailError) {
        console.warn("Lead saved in Supabase but email notification failed.", emailError);
      }

      setFormData({ name: "", businessName: "", email: "", phoneCountry: "EG", phone: "", whatsapp: "", idea: "" });
      setValidationErrors({ name: "", businessName: "", email: "", phone: "", idea: "" });
      setShowWhatsappError(false);
      setSubmitState("success");
    } catch (submitError) {
      console.error("Lead capture failed.", submitError);
      setSubmitState("error");
    }
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/45 p-4 backdrop-blur"
      onClick={() => setShowForm(false)}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-inquiry-title"
        className="animate-fade-in relative w-full max-w-xl overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_30px_80px_rgba(15,23,42,0.2)]"
        onClick={(event) => event.stopPropagation()}
      >
        {scrollIndicator.canScroll ? (
          <div
            ref={indicatorTrackRef}
            className="pointer-events-none absolute bottom-8 right-3 top-8 z-10 h-auto sm:bottom-10 sm:right-4 sm:top-10 md:bottom-12 md:right-5 md:top-10"
          >
            <Motion.div
              className="w-1.5 rounded-full bg-gradient-to-b from-purple-400 via-fuchsia-400 to-sky-400 shadow-[0_0_18px_rgba(168,85,247,0.28)]"
              animate={{ height: scrollIndicator.height, y: scrollIndicator.top, opacity: 1 }}
              transition={{ duration: 0.18, ease: "linear" }}
            />
          </div>
        ) : null}

        <div ref={scrollRef} className="modal-scroll max-h-[92vh] overflow-y-auto px-5 py-5 pr-8 sm:px-8 sm:py-8 sm:pr-12 md:px-10 md:py-10 md:pr-14">
          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-purple-700">{isAudit ? modal.auditEyebrow : modal.eyebrow}</p>
            <h2 id="project-inquiry-title" className="text-[2rem] font-bold leading-[1.08] text-slate-950 sm:text-3xl">
              {isAudit ? modal.auditTitle : modal.title}
            </h2>
            <p className="text-slate-600">{isAudit ? modal.auditDescription : modal.description}</p>
          </div>

          {submitState !== "success" ? (
            <div role="tablist" className="mt-6 grid grid-cols-2 gap-1 rounded-2xl border border-slate-200 bg-slate-100 p-1">
              {[
                ["project", modal.modeProject],
                ["audit", modal.modeAudit],
              ].map(([id, label]) => (
                <button
                  key={id}
                  type="button"
                  role="tab"
                  aria-selected={mode === id}
                  onClick={() => {
                    setMode(id);
                    // A prefilled demo request makes no sense as an audit request.
                    if (initialIdea && formData.idea === initialIdea) {
                      setFormData((previous) => ({ ...previous, idea: "" }));
                    }
                  }}
                  className={`flex items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold transition ${
                    mode === id ? "bg-white text-slate-950 shadow-sm" : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  {label}
                  {id === "audit" ? (
                    <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold uppercase text-emerald-700">{modal.freeBadge}</span>
                  ) : null}
                </button>
              ))}
            </div>
          ) : null}

          {submitState === "success" ? (
            <div className="mt-8 space-y-5">
              <div className="rounded-[2rem] border border-emerald-100 bg-[linear-gradient(180deg,#f7fffb_0%,#ecfdf5_100%)] p-6 shadow-[0_20px_50px_rgba(16,185,129,0.08)]">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500 text-white shadow-[0_16px_30px_rgba(16,185,129,0.22)]">
                  <FaCheck />
                </div>
                <h3 className="mt-5 text-xl font-bold text-slate-950 sm:text-2xl">{modal.successTitle}</h3>
                <p className="mt-3 text-base leading-7 text-slate-600">{modal.successDescription}</p>
              </div>
              <ActionButton className="w-full" onClick={() => setShowForm(false)} type="button">
                {modal.successButton}
              </ActionButton>
            </div>
          ) : (
            <form noValidate onSubmit={handleSubmit} className="mt-8 space-y-4">
              <input
                type="text"
                name="name"
                placeholder={modal.name}
                onChange={handleInputChange}
                value={formData.name}
                className={getFieldClassName("name")}
              />
              {validationErrors.name ? (
                <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{validationErrors.name}</p>
              ) : null}

              <input
                type="text"
                name="businessName"
                placeholder={modal.businessName}
                onChange={handleInputChange}
                value={formData.businessName}
                className={getFieldClassName("businessName")}
              />
              {validationErrors.businessName ? (
                <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{validationErrors.businessName}</p>
              ) : null}

              <input
                type="email"
                name="email"
                placeholder={emailPlaceholder}
                autoComplete="email"
                onChange={handleInputChange}
                value={formData.email}
                className={getFieldClassName("email")}
              />
              {validationErrors.email ? (
                <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{validationErrors.email}</p>
              ) : null}

              <div className="grid gap-3 sm:grid-cols-[13rem_minmax(0,1fr)]">
                <CountryDropdown
                  countries={PHONE_COUNTRIES}
                  isArabic={isArabic}
                  label={modal.phoneCountry}
                  onChange={handleCountryChange}
                  value={formData.phoneCountry}
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder={modal.phone}
                  inputMode="numeric"
                  autoComplete="tel-national"
                  onChange={handleInputChange}
                  value={formData.phone}
                  className={getFieldClassName("phone")}
                />
              </div>
              {validationErrors.phone ? (
                <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{validationErrors.phone}</p>
              ) : null}

              <div className="space-y-3">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">{modal.whatsappQuestion}</p>
                <div className="grid gap-3 sm:grid-cols-2">
                  <WhatsappOption
                    active={formData.whatsapp === "yes"}
                    description={modal.whatsappYesHint}
                    icon={<FaWhatsapp />}
                    label={modal.whatsappYes}
                    onClick={() => handleWhatsappChange("yes")}
                    tone="whatsapp"
                  />
                  <WhatsappOption
                    active={formData.whatsapp === "no"}
                    description={modal.whatsappNoHint}
                    icon={<FaPhoneAlt />}
                    label={modal.whatsappNo}
                    onClick={() => handleWhatsappChange("no")}
                    tone="calls"
                  />
                </div>
                {showWhatsappError ? (
                  <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{modal.whatsappRequired}</p>
                ) : null}
              </div>

              {isAudit ? (
                <input
                  type="text"
                  name="website"
                  dir="ltr"
                  placeholder={modal.auditWebsite}
                  onChange={(event) => setWebsite(event.target.value)}
                  value={website}
                  className={`${inputClassName} text-start`}
                />
              ) : null}

              <textarea
                name="idea"
                placeholder={isAudit ? modal.auditIdea : modal.idea}
                rows="5"
                onChange={handleInputChange}
                value={formData.idea}
                className={`${getFieldClassName("idea")} resize-none`}
              />
              {validationErrors.idea ? (
                <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{validationErrors.idea}</p>
              ) : null}

              <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                <ActionButton className="sm:flex-1" onClick={() => setShowForm(false)} type="button" variant="secondary">
                  {modal.cancel}
                </ActionButton>
                <ActionButton className="sm:flex-1" disabled={submitState === "submitting"} type="submit">
                  {submitState === "submitting" ? sendingLabel : isAudit ? modal.auditSubmit : modal.submit}
                </ActionButton>
              </div>

              {submitState === "error" ? (
                <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{errorMessage}</p>
              ) : null}
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

function CountryDropdown({ countries, isArabic, label, onChange, value }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);
  const selectedCountry = countries.find((country) => country.code === value) ?? countries[0];

  useEffect(() => {
    if (!open) {
      return undefined;
    }

    const handlePointerDown = (event) => {
      if (!rootRef.current?.contains(event.target)) {
        setOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      window.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      <label className="sr-only" htmlFor="phoneCountryButton">
        {label}
      </label>
      <button
        id="phoneCountryButton"
        type="button"
        aria-expanded={open}
        aria-haspopup="listbox"
        className={`${inputClassName} flex items-center justify-between gap-3 bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(248,250,252,0.96)_100%)] pr-3 text-left shadow-[0_12px_30px_rgba(148,163,184,0.08)] hover:border-purple-300/70`}
        onClick={() => setOpen((previous) => !previous)}
      >
        <div className="flex min-w-0 items-center gap-2">
          <p className="truncate text-base font-medium text-slate-900">
            {selectedCountry.label[isArabic ? "ar" : "en"].replace(` (${selectedCountry.dialCode})`, "")}
          </p>
          <span className="shrink-0 rounded-full bg-purple-50 px-2.5 py-1 text-xs font-semibold text-purple-700">
            {selectedCountry.dialCode}
          </span>
        </div>
        <span
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl border border-purple-100 bg-white text-purple-600 shadow-[0_10px_24px_rgba(168,85,247,0.12)] transition ${
            open ? "rotate-180" : ""
          }`}
        >
          <FaChevronDown className="text-xs" />
        </span>
      </button>

      {open ? (
        <Motion.div
          initial={{ opacity: 0, y: 8, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.16, ease: "easeOut" }}
          className="absolute left-0 right-0 top-[calc(100%+0.6rem)] z-30 overflow-hidden rounded-[1.5rem] border border-slate-200/90 bg-white/95 p-2 shadow-[0_24px_60px_rgba(15,23,42,0.16)] backdrop-blur"
        >
          <div className="max-h-64 space-y-1 overflow-y-auto pr-1">
            {countries.map((country) => {
              const selected = country.code === value;

              return (
                <button
                  key={country.code}
                  type="button"
                  role="option"
                  aria-selected={selected}
                  className={`flex w-full items-center justify-between gap-3 rounded-[1.1rem] px-3 py-3 text-left transition ${
                    selected
                      ? "bg-[linear-gradient(135deg,rgba(245,243,255,1)_0%,rgba(239,246,255,1)_100%)] text-slate-950 shadow-[inset_0_0_0_1px_rgba(168,85,247,0.18)]"
                      : "text-slate-700 hover:bg-slate-50 hover:text-slate-950"
                  }`}
                  onClick={() => {
                    onChange(country.code);
                    setOpen(false);
                  }}
                >
                  <div className="min-w-0">
                    <p className="text-sm font-medium">
                      {country.label[isArabic ? "ar" : "en"].replace(` (${country.dialCode})`, "")}
                    </p>
                  </div>
                  <span
                    className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold transition ${
                      selected ? "bg-white text-purple-700 shadow-[0_10px_20px_rgba(168,85,247,0.14)]" : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {country.dialCode}
                  </span>
                </button>
              );
            })}
          </div>
        </Motion.div>
      ) : null}
    </div>
  );
}

function WhatsappOption({ active, description, icon, label, onClick, tone }) {
  const activeClassName =
    tone === "whatsapp"
      ? "border-emerald-300 bg-emerald-50 shadow-[0_16px_30px_rgba(16,185,129,0.12)]"
      : "border-purple-200 bg-[linear-gradient(135deg,rgba(248,250,252,1)_0%,rgba(241,245,249,1)_100%)] shadow-[0_16px_30px_rgba(148,163,184,0.14)]";
  const iconClassName =
    tone === "whatsapp"
      ? active
        ? "bg-emerald-500 text-white"
        : "bg-white text-emerald-500 shadow-sm"
      : active
        ? "bg-slate-900 text-white"
        : "bg-white text-slate-500 shadow-sm";

  return (
    <Motion.button
      type="button"
      onClick={onClick}
      whileHover={{ y: -2, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      className={`flex items-center gap-3 rounded-[1.5rem] border px-4 py-4 text-left transition ${
        active ? activeClassName : "border-slate-200 bg-slate-50 hover:border-purple-200 hover:bg-white"
      }`}
    >
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl text-base sm:h-12 sm:w-12 sm:text-lg ${
          iconClassName
        }`}
      >
        {icon}
      </div>
      <div>
        <p className="text-sm font-semibold text-slate-950">{label}</p>
        <p className="mt-1 text-sm leading-6 text-slate-600">{description}</p>
      </div>
    </Motion.button>
  );
}
