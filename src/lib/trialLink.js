// Getting the MolarBear installer link to the dentist's PC.
// - Email: sent automatically through EmailJS from the Queue Solutions Gmail. Inactive until the three
//   EmailJS values below are filled in (they are public keys, safe to keep in front-end code).
// - WhatsApp: one tap. Automatic WhatsApp sending needs the WhatsApp Business API and a server.

import { TRIAL_DOWNLOAD } from "../content/trial";

export const EMAILJS = {
  serviceId: "",
  templateId: "",
  publicKey: "",
};

export const TRIAL_LINK_URL = `https://queuesolutions.org${TRIAL_DOWNLOAD.url}`;

export function isEmailSendingConfigured() {
  return Boolean(EMAILJS.serviceId && EMAILJS.templateId && EMAILJS.publicKey);
}

export async function sendTrialLinkEmail({ toEmail, toName, locale }) {
  if (!isEmailSendingConfigured()) {
    throw new Error("EmailJS is not configured");
  }
  const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      service_id: EMAILJS.serviceId,
      template_id: EMAILJS.templateId,
      user_id: EMAILJS.publicKey,
      template_params: {
        to_email: toEmail,
        to_name: toName,
        download_link: TRIAL_LINK_URL,
        trial_days: TRIAL_DOWNLOAD.days,
        language: locale,
      },
    }),
  });
  if (!response.ok) {
    throw new Error(`EmailJS responded ${response.status}`);
  }
}

// Phones and tablets can't run the Windows installer, so they get the link sent to them instead.
export function isLikelyPhone() {
  if (typeof window === "undefined") return false;
  const mobileAgent = /Android|iPhone|iPad|iPod|Mobile|IEMobile|Opera Mini/i.test(navigator.userAgent);
  const touchOnly = window.matchMedia?.("(pointer: coarse)").matches && !window.matchMedia?.("(pointer: fine)").matches;
  return mobileAgent || Boolean(touchOnly && window.innerWidth < 1024);
}

export function phoneDigits(phone = "") {
  return phone.replace(/\D/g, "");
}

// Opens WhatsApp with a chat to that number and the message ready to send.
export function whatsappToNumber(phone, text) {
  return `https://wa.me/${phoneDigits(phone)}?text=${encodeURIComponent(text)}`;
}

export function mailtoLink(toEmail, subject, body) {
  return `mailto:${encodeURIComponent(toEmail)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function fillLink(text) {
  return text.replace("{link}", TRIAL_LINK_URL);
}
