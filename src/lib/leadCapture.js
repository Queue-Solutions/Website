import { hasSupabaseConfig, supabase } from "./supabase";

const FORM_ENDPOINT = "https://formsubmit.co/ajax/queuesolutions25@gmail.com";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const ARABIC_INDIC_DIGITS = "\u0660\u0661\u0662\u0663\u0664\u0665\u0666\u0667\u0668\u0669";
const EASTERN_ARABIC_DIGITS = "\u06F0\u06F1\u06F2\u06F3\u06F4\u06F5\u06F6\u06F7\u06F8\u06F9";
const NOT_PROVIDED = "not provided";

export const PHONE_COUNTRIES = [
  {
    code: "EG",
    dialCode: "+20",
    min: 10,
    max: 10,
    label: { en: "Egypt (+20)", ar: "\u0645\u0635\u0631 (+20)" },
  },
  {
    code: "SA",
    dialCode: "+966",
    min: 9,
    max: 9,
    label: { en: "Saudi Arabia (+966)", ar: "\u0627\u0644\u0633\u0639\u0648\u062f\u064a\u0629 (+966)" },
  },
  {
    code: "AE",
    dialCode: "+971",
    min: 9,
    max: 9,
    label: { en: "UAE (+971)", ar: "\u0627\u0644\u0625\u0645\u0627\u0631\u0627\u062a (+971)" },
  },
  {
    code: "QA",
    dialCode: "+974",
    min: 8,
    max: 8,
    label: { en: "Qatar (+974)", ar: "\u0642\u0637\u0631 (+974)" },
  },
  {
    code: "KW",
    dialCode: "+965",
    min: 8,
    max: 8,
    label: { en: "Kuwait (+965)", ar: "\u0627\u0644\u0643\u0648\u064a\u062a (+965)" },
  },
  {
    code: "BH",
    dialCode: "+973",
    min: 8,
    max: 8,
    label: { en: "Bahrain (+973)", ar: "\u0627\u0644\u0628\u062d\u0631\u064a\u0646 (+973)" },
  },
  {
    code: "US",
    dialCode: "+1",
    min: 10,
    max: 10,
    label: { en: "United States (+1)", ar: "\u0627\u0644\u0648\u0644\u0627\u064a\u0627\u062a \u0627\u0644\u0645\u062a\u062d\u062f\u0629 (+1)" },
  },
  {
    code: "GB",
    dialCode: "+44",
    min: 10,
    max: 10,
    label: { en: "United Kingdom (+44)", ar: "\u0627\u0644\u0645\u0645\u0644\u0643\u0629 \u0627\u0644\u0645\u062a\u062d\u062f\u0629 (+44)" },
  },
];

export function normalizeDigitsToEnglish(value = "") {
  return String(value).replace(/[\u0660-\u0669\u06F0-\u06F9]/g, (character) => {
    const arabicIndex = ARABIC_INDIC_DIGITS.indexOf(character);

    if (arabicIndex >= 0) {
      return String(arabicIndex);
    }

    const easternArabicIndex = EASTERN_ARABIC_DIGITS.indexOf(character);
    return easternArabicIndex >= 0 ? String(easternArabicIndex) : character;
  });
}

function cleanText(value = "") {
  return normalizeDigitsToEnglish(value).trim().replace(/\s+/g, " ");
}

function stripToPhoneDigits(value = "") {
  return normalizeDigitsToEnglish(value).replace(/\D/g, "");
}

function normalizeOptionalEmail(value = "") {
  return cleanText(value).toLowerCase();
}

function formatLocalDateTime(date = new Date()) {
  const year = String(date.getFullYear());
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

function getBrowserTimezone() {
  return Intl.DateTimeFormat().resolvedOptions().timeZone || null;
}

export function isValidEmail(value = "") {
  return EMAIL_PATTERN.test(cleanText(value).toLowerCase());
}

export function normalizePhoneDigits(value = "", activePhoneCountry = PHONE_COUNTRIES[0]) {
  let phoneDigits = stripToPhoneDigits(value);
  const dialDigits = activePhoneCountry.dialCode.replace(/\D/g, "");

  while (phoneDigits.startsWith("00")) {
    phoneDigits = phoneDigits.slice(2);
  }

  while (phoneDigits.startsWith(`0${dialDigits}`)) {
    phoneDigits = phoneDigits.slice(dialDigits.length + 1);
  }

  while (phoneDigits.startsWith(dialDigits) && phoneDigits.length > activePhoneCountry.max) {
    phoneDigits = phoneDigits.slice(dialDigits.length);
  }

  if (phoneDigits.startsWith("0") && phoneDigits.length - 1 >= activePhoneCountry.min && phoneDigits.length - 1 <= activePhoneCountry.max) {
    phoneDigits = phoneDigits.slice(1);
  }

  return phoneDigits;
}

export function buildLeadRecord({ activePhoneCountry, formData, pageUrl, subject, userAgent }) {
  const name = cleanText(formData.name);
  const company = cleanText(formData.businessName);
  const email = normalizeOptionalEmail(formData.email) || NOT_PROVIDED;
  const message = cleanText(formData.idea);
  const normalizedPhone = normalizePhoneDigits(formData.phone, activePhoneCountry);
  const normalizedPhoneValue = normalizedPhone ? `${activePhoneCountry.dialCode} ${normalizedPhone}` : null;
  const submittedAt = new Date();

  return {
    name,
    email,
    phone: normalizedPhoneValue,
    company: company || null,
    service: cleanText(formData.service) || null,
    subject: cleanText(subject) || null,
    message,
    status: "new",
    source: "website",
    page_url: cleanText(pageUrl) || null,
    user_agent: cleanText(userAgent) || null,
    whatsapp_preference: formData.whatsapp === "yes" ? "whatsapp" : "phone",
    submitted_at_local: formatLocalDateTime(submittedAt),
    submitted_timezone: cleanText(getBrowserTimezone()) || null,
  };
}

export async function insertLeadRecord(leadRecord) {
  if (!hasSupabaseConfig || !supabase) {
    throw new Error("Supabase is not configured. Check VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY");
  }

  const { error } = await supabase.from("leads").insert([leadRecord]);

  if (error) {
    throw error;
  }
}

export async function sendLeadNotification({ businessName, email, message, name, phone, replyTo, subject, whatsappLabel }) {
  const normalizedEmail = normalizeOptionalEmail(email) || NOT_PROVIDED;
  const normalizedReplyTo = normalizeOptionalEmail(replyTo);
  const payload = {
    _subject: cleanText(subject),
    name: cleanText(name),
    businessName: cleanText(businessName),
    email: normalizedEmail,
    phone: cleanText(phone),
    whatsappPreference: cleanText(whatsappLabel),
    message: cleanText(message),
  };

  if (normalizedReplyTo && normalizedReplyTo !== NOT_PROVIDED) {
    payload._replyto = normalizedReplyTo;
  }

  const response = await fetch(FORM_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Email notification failed.");
  }

  const data = await response.json().catch(() => null);

  if (data && (data.success === false || data.success === "false")) {
    throw new Error("Email notification failed.");
  }
}
