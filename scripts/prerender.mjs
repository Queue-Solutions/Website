// Post-build step: writes one HTML file per page and language with its own title,
// description, canonical, hreflang, structured data and static content, plus the sitemap and llms.txt.
// Without this, GitHub Pages answers every URL except "/" with a 404 status.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { absoluteUrl, ALL_ROUTES, buildPath, buildStructuredData, getSeo, LOCALES } from "../src/content/seo.js";
import { renderLlmsTxt, renderStaticPage } from "./static-content.mjs";

const dist = join(dirname(fileURLToPath(import.meta.url)), "..", "dist");
const template = readFileSync(join(dist, "index.html"), "utf8");

const escapeAttr = (value) => value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

function setAttr(html, pattern, attr, value) {
  const re = new RegExp(`(<${pattern}[^>]*?${attr}=")[^"]*(")`);
  if (!re.test(html)) throw new Error(`prerender: tag not found: ${pattern}`);
  return html.replace(re, `$1${escapeAttr(value)}$2`);
}

// "/" -> index.html, "/ar/" -> ar/index.html, "/services" -> services.html (served without a redirect)
function outputFile(path) {
  if (path.endsWith("/")) return join(dist, path, "index.html");
  return join(dist, `${path}.html`);
}

const today = new Date().toISOString().slice(0, 10);
const sitemapEntries = [];

for (const locale of LOCALES) {
  for (const { pageId, slug } of ALL_ROUTES) {
    const { title, description, image } = getSeo(locale, pageId, slug);
    const path = buildPath(pageId, locale, slug);
    const url = absoluteUrl(path);
    const alternates = { en: absoluteUrl(buildPath(pageId, "en", slug)), ar: absoluteUrl(buildPath(pageId, "ar", slug)) };

    let html = template;
    html = html.replace(/<html lang="[^"]*" dir="[^"]*">/, `<html lang="${locale === "ar" ? "ar-EG" : "en"}" dir="${locale === "ar" ? "rtl" : "ltr"}">`);
    html = html.replace(/<title>[^<]*<\/title>/, `<title>${escapeAttr(title)}</title>`);
    html = setAttr(html, 'meta name="description"', "content", description);
    html = setAttr(html, 'link rel="canonical"', "href", url);
    html = setAttr(html, 'link rel="alternate" hreflang="en"', "href", alternates.en);
    html = setAttr(html, 'link rel="alternate" hreflang="ar"', "href", alternates.ar);
    html = setAttr(html, 'link rel="alternate" hreflang="x-default"', "href", alternates.en);
    html = setAttr(html, 'meta property="og:locale"', "content", locale === "ar" ? "ar_EG" : "en_US");
    html = setAttr(html, 'meta property="og:locale:alternate"', "content", locale === "ar" ? "en_US" : "ar_EG");
    html = setAttr(html, 'meta property="og:title"', "content", title);
    html = setAttr(html, 'meta property="og:description"', "content", description);
    html = setAttr(html, 'meta property="og:url"', "content", url);
    html = setAttr(html, 'meta name="twitter:title"', "content", title);
    html = setAttr(html, 'meta name="twitter:description"', "content", description);
    html = setAttr(html, 'meta property="og:image"', "content", image);
    html = setAttr(html, 'meta name="twitter:image"', "content", image);
    if (pageId === "case-study") html = html.replace('<meta property="og:type" content="website" />', '<meta property="og:type" content="article" />');
    html = html.replace(/<noscript id="site-fallback">[\s\S]*?<\/noscript>\s*/, "");
    html = html.replace('<div id="root"></div>', () => `<div id="root">${renderStaticPage(locale, pageId, slug)}</div>`);
    html = html.replace(
      /<script type="application\/ld\+json" id="structured-data">[\s\S]*?<\/script>/,
      `<script type="application/ld+json" id="structured-data">${JSON.stringify(buildStructuredData(locale, pageId, slug)).replace(/</g, "\\u003c")}</script>`,
    );

    const file = outputFile(path);
    mkdirSync(dirname(file), { recursive: true });
    writeFileSync(file, html);

    sitemapEntries.push(`  <url>
    <loc>${url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${pageId === "home" ? "1.0" : pageId === "landing" ? "0.9" : "0.8"}</priority>
    <xhtml:link rel="alternate" hreflang="en" href="${alternates.en}" />
    <xhtml:link rel="alternate" hreflang="ar" href="${alternates.ar}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${alternates.en}" />
  </url>`);
    console.log(`prerender: ${path} -> ${file.slice(dist.length + 1)}`);
  }
}

writeFileSync(
  join(dist, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${sitemapEntries.join("\n")}
</urlset>
`,
);
console.log(`prerender: sitemap.xml with ${sitemapEntries.length} URLs`);

writeFileSync(join(dist, "llms.txt"), renderLlmsTxt());
writeFileSync(join(dist, "llms-full.txt"), renderLlmsTxt({ full: true }));
console.log("prerender: llms.txt and llms-full.txt");
