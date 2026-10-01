// Campaign attribution for the MolarBear trial page: UTM parameters are captured on arrival,
// kept for the session, attached to every GA4 event, and saved with the lead.
const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];
const STORAGE_KEY = "queue-campaign-utm";

export function captureUtm() {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  const fromUrl = Object.fromEntries(UTM_KEYS.filter((key) => params.get(key)).map((key) => [key, params.get(key).slice(0, 100)]));

  try {
    if (Object.keys(fromUrl).length) {
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(fromUrl));
      return fromUrl;
    }
    return JSON.parse(window.sessionStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return fromUrl;
  }
}

export function getUtm() {
  return captureUtm();
}

export function describeUtm(utm = getUtm()) {
  const entries = Object.entries(utm);
  return entries.length ? entries.map(([key, value]) => `${key}=${value}`).join(", ") : "direct / none";
}

export function trackCampaignEvent(name, params = {}) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  const utm = getUtm();
  window.gtag("event", name, {
    campaign_page: "molarbear_trial",
    campaign_source: utm.utm_source,
    campaign_medium: utm.utm_medium,
    campaign_name: utm.utm_campaign,
    ...params,
  });
}
