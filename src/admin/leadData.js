// Turns raw rows from the `leads` table into tidy objects for the admin dashboard.
// The lead form stores trial details inside `message` as "Label: value" pairs, and the
// text cleaner flattens line breaks, so values are split on the known labels.

export const ADMIN_TIMEZONE = "Africa/Cairo";

export const LEAD_TYPES = {
  molarbear_trial: { label: "MolarBear trial", short: "Trial", tone: "bg-teal-50 text-teal-700 ring-teal-200" },
  digital_audit: { label: "Digital audit", short: "Audit", tone: "bg-emerald-50 text-emerald-700 ring-emerald-200" },
  project: { label: "Project inquiry", short: "Project", tone: "bg-violet-50 text-violet-700 ring-violet-200" },
};

const FIELD_LABELS = ["Clinic", "City", "Followed", "Source", "Version"];

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
    message: row.message || "",
    pageUrl: row.page_url || "",
    status: row.status || "new",
    whatsapp: row.whatsapp_preference === "whatsapp",
  };
}

export function whatsappLink(phone) {
  const digits = (phone || "").replace(/\D/g, "");
  return digits ? `https://wa.me/${digits}` : "";
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
  const header = ["Date", "Type", "Name", "Clinic / Company", "City", "Phone", "Email", "Source", "Medium", "Campaign", "Followed", "Message"];
  const escape = (value) => `"${String(value ?? "").replace(/"/g, '""')}"`;
  const rows = leads.map((lead) =>
    [
      lead.dateLabel,
      LEAD_TYPES[lead.type].label,
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
