export function trackLeadClick(channel, label) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", "generate_lead", { method: channel, event_label: label });
  }
}
