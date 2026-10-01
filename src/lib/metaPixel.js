// Meta (Facebook) Pixel helpers. The Pixel itself is installed in index.html <head> exactly as
// Meta Events Manager provides it (PageView on every full page load, skipped on /admin).
// These helpers send the extra events through that same Pixel:
// PageView on in-app page changes, Lead after a successful trial form save, and the custom
// Download event when the MolarBear installer download starts.

export const META_PIXEL_ID = "1569612081849719";

function pixelReady() {
  return typeof window !== "undefined" && typeof window.fbq === "function" && !window.location.pathname.startsWith("/admin");
}

export function trackMetaPageView() {
  if (pixelReady()) {
    window.fbq("track", "PageView");
  }
}

export function trackMetaEvent(name, params = {}, { custom = false } = {}) {
  if (pixelReady()) {
    window.fbq(custom ? "trackCustom" : "track", name, params);
  }
}
