// Meta (Facebook) Pixel. Loaded once for the whole site; does nothing until META_PIXEL_ID is set.
// Events: PageView (every page, including in-app navigation), Lead (after a trial form is
// successfully saved), Download (custom event when the MolarBear installer download starts).

export const META_PIXEL_ID = "1569612081849719";

let initialized = false;

export function initMetaPixel() {
  if (initialized || !META_PIXEL_ID || typeof window === "undefined") return;
  initialized = true;

  // Standard Meta base code, unchanged except for formatting.
  !(function (f, b, e, v, n, t, s) {
    if (f.fbq) return;
    n = f.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    };
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = !0;
    n.version = "2.0";
    n.queue = [];
    t = b.createElement(e);
    t.async = !0;
    t.src = v;
    s = b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t, s);
  })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");

  window.fbq("init", META_PIXEL_ID);
  window.fbq("track", "PageView");
}

export function trackMetaPageView() {
  if (initialized && typeof window.fbq === "function") {
    window.fbq("track", "PageView");
  }
}

export function trackMetaEvent(name, params = {}, { custom = false } = {}) {
  if (initialized && typeof window.fbq === "function") {
    window.fbq(custom ? "trackCustom" : "track", name, params);
  }
}
