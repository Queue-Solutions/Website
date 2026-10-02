// Turns raw rows from the `leads` table into tidy objects for the admin dashboard.
// The lead form stores trial details inside `message` as "Label: value" pairs, and the
// text cleaner flattens line breaks, so values are split on the known labels.

export const ADMIN_TIMEZONE = "Africa/Cairo";

export const LEAD_TYPES = {
  molarbear_trial: { label: "MolarBear trial", short: "Trial", tone: "bg-teal-50 text-teal-700 ring-teal-200" },
  digital_audit: { label: "Digital audit", short: "Audit", tone: "bg-emerald-50 text-emerald-700 ring-emerald-200" },
  project: { label: "Project inquiry", short: "Project", tone: "bg-violet-50 text-violet-700 ring-violet-200" },
};

// Sales pipeline for a lead, in order. "lost" sits outside the funnel.
export const LEAD_STATUSES = [
  { id: "new", label: "New", tone: "bg-sky-50 text-sky-700 ring-sky-200", bar: "bg-sky-500" },
  { id: "contacted", label: "Contacted", tone: "bg-amber-50 text-amber-800 ring-amber-200", bar: "bg-amber-500" },
  { id: "installed", label: "Installed", tone: "bg-violet-50 text-violet-700 ring-violet-200", bar: "bg-violet-500" },
  { id: "paid", label: "Paid", tone: "bg-emerald-50 text-emerald-700 ring-emerald-200", bar: "bg-emerald-500" },
  { id: "lost", label: "Not interested", tone: "bg-slate-100 text-slate-500 ring-slate-200", bar: "bg-slate-400" },
];

export const STATUS_BY_ID = Object.fromEntries(LEAD_STATUSES.map((status) => [status.id, status]));

// How many leads reached each pipeline stage. A paid clinic also counts as contacted and installed;
// a lead marked "not interested" was at least contacted.
export function pipelineCounts(leads) {
  const order = ["new", "contacted", "installed", "paid"];
  const rank = (status) => (status === "lost" ? 1 : Math.max(0, order.indexOf(status)));
  return order.map((id, index) => ({ ...STATUS_BY_ID[id], count: leads.filter((lead) => rank(lead.status) >= index).length }));
}

const FIELD_LABELS = ["Clinic", "City", "Followed", "Source", "Device", "Version"];

function extractFields(message = "") {
  const pattern = new RegExp(`(${FIELD_LABELS.join("|")}):\\s*`, "g");
  const matches = [...message.matchAll(pattern)];
  const fields = {};
  matches.forEach((match, index) => {
    const start = match.index + match[0].length;
    const end = index + 1 < matches.length ? matches[index + 1].index : message.length;
    fields[match[1].toLowerCase()] = message.slice(start, end).trim();
  });
  return fields;
}

function parseUtm(source = "") {
  return Object.fromEntries(
    source
      .split(/,\s*/)
      .map((pair) => pair.split("="))
      .filter(([key, value]) => key?.startsWith("utm_") && value)
      .map(([key, value]) => [key.trim(), value.trim()]),
  );
}

const dayFormatter = new Intl.DateTimeFormat("en-CA", { timeZone: ADMIN_TIMEZONE, year: "numeric", month: "2-digit", day: "2-digit" });
const displayFormatter = new Intl.DateTimeFormat("en-GB", {
  timeZone: ADMIN_TIMEZONE,
  day: "2-digit",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

export function dayKey(date) {
  return dayFormatter.format(date);
}

export function normalizeLead(row) {
  const type = LEAD_TYPES[row.service] ? row.service : "project";
  const fields = type === "molarbear_trial" ? extractFields(row.message) : {};
  const utm = parseUtm(fields.source);
  const date = new Date(row.created_at ?? row.submitted_at_local?.replace(" ", "T") ?? Date.now());
  const followed = fields.followed && fields.followed !== "none" ? fields.followed.split(/,\s*/) : [];
  // Early trial leads stored the city in `company`; later ones store the clinic there.
  const clinic = type === "molarbear_trial" ? fields.clinic || (fields.city ? "" : row.company) || "" : row.company || "";
  const city = fields.city && fields.city !== "-" ? fields.city : type === "molarbear_trial" && !fields.clinic ? row.company || "" : "";
  const email = row.email && row.email !== "not provided" ? row.email : "";

  return {
    id: row.id,
    type,
    date,
    day: dayKey(date),
    dateLabel: displayFormatter.format(date),
    name: row.name || "",
    clinic,
    city,
    phone: row.phone || "",
    email,
    followed,
    source: utm.utm_source || (type === "molarbear_trial" ? "direct" : ""),
    medium: utm.utm_medium || "",
    campaign: utm.utm_campaign || "",
    version: fields.version || "",
    device: fields.device || "",
    arabic: (row.page_url || "").includes("/ar/"),
    message: row.message || "",
    pageUrl: row.page_url || "",
    status: STATUS_BY_ID[row.status] ? row.status : "new",
    whatsapp: row.whatsapp_preference === "whatsapp",
  };
}

export function whatsappLink(phone, text = "") {
  const digits = (phone || "").replace(/\D/g, "");
  if (!digits) return "";
  return text ? `https://wa.me/${digits}?text=${encodeURIComponent(text)}` : `https://wa.me/${digits}`;
}


// Pre-written WhatsApp message with the installer link, in the language the lead signed up in.
export function trialLinkMessage(lead) {
  const name = lead.name || "";
  const TRIAL_LINK = `https://queuesolutions.org${lead.arabic ? "/ar" : ""}/molarbear-trial?get=1`;
  return lead.arabic
    ? `أهلًا ${name}، شكرًا لتسجيلك في تجربة MolarBear المجانية لمدة 14 يومًا.\nهذا رابط التحميل، افتحه على كمبيوتر العيادة (ويندوز 10 أو 11):\n${TRIAL_LINK}\n\nلو احتجت مساعدة في التثبيت، رد على هذه الرسالة.`
    : `Hi ${name}, thanks for signing up for the MolarBear 14-day free trial.\nHere is your download link. Please open it on your clinic's Windows PC (Windows 10 or 11):\n${TRIAL_LINK}\n\nIf you need help installing, just reply to this message.`;
}

export function countBy(items, key) {
  const counts = new Map();
  items.forEach((item) => {
    const value = (typeof key === "function" ? key(item) : item[key]) || "Unknown";
    counts.set(value, (counts.get(value) ?? 0) + 1);
  });
  return [...counts.entries()].sort((a, b) => b[1] - a[1]);
}

export function lastNDays(count) {
  const days = [];
  for (let offset = count - 1; offset >= 0; offset -= 1) {
    days.push(dayKey(new Date(Date.now() - offset * 86400000)));
  }
  return days;
}

export function toCsv(leads) {
  const header = ["Date", "Type", "Status", "Name", "Clinic / Company", "City", "Phone", "Email", "Source", "Medium", "Campaign", "Followed", "Message"];
  const escape = (value) => `"${String(value ?? "").replace(/"/g, '""')}"`;
  const rows = leads.map((lead) =>
    [
      lead.dateLabel,
      LEAD_TYPES[lead.type].label,
      STATUS_BY_ID[lead.status].label,
      lead.name,
      lead.clinic,
      lead.city,
      lead.phone,
      lead.email,
      lead.source,
      lead.medium,
      lead.campaign,
      lead.followed.join(" + "),
      lead.message,
    ]
      .map(escape)
      .join(","),
  );
  // BOM so Excel opens Arabic names correctly.
  const lineBreak = String.fromCharCode(13, 10);
  return String.fromCharCode(0xfeff) + [header.map(escape).join(","), ...rows].join(lineBreak);
}
