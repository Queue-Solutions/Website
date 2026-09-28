import { useEffect, useMemo, useRef } from "react";
import { useLocation } from "react-router-dom";
import { absoluteUrl, buildPath, buildStructuredData, getSeo } from "../../content/seo";
import { getAbsoluteUrl } from "../../lib/routes";

const GA_MEASUREMENT_ID = "G-19YFREF1C7";

function upsertMeta(selector, attributes) {
  let element = document.head.querySelector(selector);

  if (!element) {
    element = document.createElement("meta");
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });
}

function upsertLink(selector, attributes) {
  let element = document.head.querySelector(selector);

  if (!element) {
    element = document.createElement("link");
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });
}

export default function RouteSeo({ content, pageId, slug = null }) {
  const location = useLocation();
  const trackedInitialView = useRef(false);
  const locale = content.locale;
  const seo = useMemo(() => getSeo(locale, pageId, slug), [locale, pageId, slug]);
  const canonicalUrl = absoluteUrl(buildPath(pageId, locale, slug));
  const pageLocation = getAbsoluteUrl(`${location.pathname}${location.search}${location.hash}`);

  useEffect(() => {
    document.title = seo.title;

    upsertMeta('meta[name="description"]', {
      name: "description",
      content: seo.description,
    });
    upsertMeta('meta[property="og:type"]', {
      property: "og:type",
      content: "website",
    });
    upsertMeta('meta[property="og:title"]', {
      property: "og:title",
      content: seo.title,
    });
    upsertMeta('meta[property="og:description"]', {
      property: "og:description",
      content: seo.description,
    });
    upsertMeta('meta[property="og:url"]', {
      property: "og:url",
      content: canonicalUrl,
    });
    upsertMeta('meta[property="og:site_name"]', {
      property: "og:site_name",
      content: content.siteDetails.name,
    });
    upsertMeta('meta[name="twitter:title"]', {
      name: "twitter:title",
      content: seo.title,
    });
    upsertMeta('meta[name="twitter:description"]', {
      name: "twitter:description",
      content: seo.description,
    });
    upsertMeta('meta[property="og:locale"]', {
      property: "og:locale",
      content: locale === "ar" ? "ar_EG" : "en_US",
    });
    upsertMeta('meta[property="og:image"]', { property: "og:image", content: seo.image });
    const structuredData = document.getElementById("structured-data");
    if (structuredData) {
      structuredData.textContent = JSON.stringify(buildStructuredData(locale, pageId, slug));
    }
    upsertLink('link[rel="canonical"]', {
      rel: "canonical",
      href: canonicalUrl,
    });
    [
      ["en", buildPath(pageId, "en", slug)],
      ["ar", buildPath(pageId, "ar", slug)],
      ["x-default", buildPath(pageId, "en", slug)],
    ].forEach(([hreflang, path]) => {
      upsertLink(`link[rel="alternate"][hreflang="${hreflang}"]`, { rel: "alternate", hreflang, href: absoluteUrl(path) });
    });
  }, [canonicalUrl, content.siteDetails.name, locale, pageId, seo.description, seo.image, seo.title, slug]);

  useEffect(() => {
    if (!trackedInitialView.current) {
      trackedInitialView.current = true;
      return;
    }

    if (typeof window.gtag !== "function") {
      return;
    }

    window.gtag("config", GA_MEASUREMENT_ID, {
      page_location: pageLocation,
      page_path: `${location.pathname}${location.search}`,
      page_title: seo.title,
    });
  }, [location.hash, location.pathname, location.search, pageLocation, seo.title]);

  return null;
}
