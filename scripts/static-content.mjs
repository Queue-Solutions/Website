// Static, semantic HTML for each prerendered page. It sits inside <div id="root"> so crawlers and
// AI assistants that do not run JavaScript still read the real content and links; React replaces it on load.
import { COMPANY, COMPANY_FAQ, FAQ_TITLE, PROCESS_STEPS, SERVICES } from "../src/content/company.js";
import { LANDING_PAGES, monthlyPrice, PRICING, PRODUCT_COPY } from "../src/content/products.js";
import { getProjects } from "../src/content/projects.js";
import { absoluteUrl, buildPath, getBreadcrumbs, getSeo, LANDING_SLUGS, PAGE_IDS, SEO, SITE_NAME } from "../src/content/seo.js";
import { TRIAL_COPY } from "../src/content/trial.js";

const LABELS = {
  en: {
    nav: { home: "Home", services: "Services", portfolio: "Portfolio", process: "Process", contact: "Contact" },
    otherLanguage: "العربية",
    services: "Services",
    products: "Ready-made software",
    work: "Selected work",
    process: "How we work",
    contact: "Contact Queue Solutions",
    whatsapp: "WhatsApp",
    email: "Email",
    areaServed: "Serving",
    challenge: "The challenge",
    solution: "What we built",
    before: "Before",
    after: "After",
    highlights: "Key features",
    industry: "Industry",
    client: "Client",
    builtWith: "Built with",
    liveProject: "Open live project",
    caseStudy: "Read the case study",
    pricing: "Pricing",
    features: "Features",
    currency: "EGP",
    perYear: "per year",
    perMonth: "a month, billed yearly",
    oneTime: "one-time",
    from: "from",
  },
  ar: {
    nav: { home: "الرئيسية", services: "خدماتنا", portfolio: "أعمالنا", process: "منهجية العمل", contact: "تواصل معنا" },
    otherLanguage: "English",
    services: "خدماتنا",
    products: "برامج جاهزة",
    work: "من أعمالنا",
    process: "كيف نعمل",
    contact: "تواصل مع Queue Solutions",
    whatsapp: "واتساب",
    email: "البريد الإلكتروني",
    areaServed: "نخدم",
    challenge: "التحدي",
    solution: "ما الذي بنيناه",
    before: "قبل",
    after: "بعد",
    highlights: "أهم المميزات",
    industry: "القطاع",
    client: "العميل",
    builtWith: "التقنيات",
    liveProject: "افتح المشروع المباشر",
    caseStudy: "اقرأ دراسة الحالة",
    pricing: "الأسعار",
    features: "المميزات",
    currency: "جنيه",
    perYear: "سنويًا",
    perMonth: "شهريًا، والدفع سنويًا",
    oneTime: "مرة واحدة",
    from: "تبدأ من",
  },
};

const esc = (value) =>
  String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const list = (items, render = esc) => `<ul>${items.map((item) => `<li>${render(item)}</li>`).join("")}</ul>`;
const link = (href, text) => `<a href="${esc(href)}">${esc(text)}</a>`;
const price = (value, locale) => value.toLocaleString(locale === "ar" ? "ar-EG" : "en-US");

function priceLine(productId, locale) {
  const t = LABELS[locale];
  const plans = PRICING[productId];
  if (plans[0].period === "year") {
    const lowest = Math.min(...plans.map(monthlyPrice));
    return `${t.from} ${price(lowest, locale)} ${t.currency} ${t.perMonth}`;
  }
  const lowest = Math.min(...plans.map((plan) => plan.price));
  return `${price(lowest, locale)} ${t.currency} ${t.oneTime}`;
}

function faqSection(title, items) {
  return `<section><h2>${esc(title)}</h2>${items.map((item) => `<h3>${esc(item.q)}</h3><p>${esc(item.a)}</p>`).join("")}</section>`;
}

function servicesSection(locale, heading = "h2") {
  const t = LABELS[locale];
  return `<section><${heading}>${esc(t.services)}</${heading}>${SERVICES[locale]
    .map((service) => `<h3>${esc(service.title)}</h3><p>${esc(service.description)}</p>`)
    .join("")}</section>`;
}

function productsSection(locale) {
  const t = LABELS[locale];
  const items = LANDING_SLUGS.map((slug) => {
    const { productId } = LANDING_PAGES[slug];
    const copy = PRODUCT_COPY[locale][slug];
    return `<h3>${link(buildPath("landing", locale, slug), copy.eyebrow)}</h3><p>${esc(copy.seoDescription)} ${esc(priceLine(productId, locale))}.</p>`;
  });
  return `<section><h2>${esc(t.products)}</h2>${items.join("")}</section>`;
}

function workSection(locale) {
  const t = LABELS[locale];
  return `<section><h2>${esc(t.work)}</h2>${getProjects(locale)
    .map(
      (project) =>
        `<article><h3>${link(buildPath("case-study", locale, project.id), project.title)}</h3><p>${esc(project.category)} · ${esc(project.client)}</p><p>${esc(project.summary)}</p></article>`,
    )
    .join("")}</section>`;
}

function processSection(locale, heading = "h2") {
  const t = LABELS[locale];
  return `<section><${heading}>${esc(t.process)}</${heading}><ol>${PROCESS_STEPS[locale]
    .map((step) => `<li><strong>${esc(step.title)}</strong>: ${esc(step.description)}</li>`)
    .join("")}</ol></section>`;
}

function contactSection(locale) {
  const t = LABELS[locale];
  return `<section><h2>${esc(t.contact)}</h2><ul><li>${esc(t.whatsapp)}: ${link(COMPANY.whatsappHref, COMPANY.whatsappDisplay)}</li><li>${esc(t.email)}: ${link(`mailto:${COMPANY.email}`, COMPANY.email)}</li><li>${esc(t.areaServed)}: ${esc(COMPANY.areaServed.map((area) => area[locale]).join(locale === "ar" ? "، " : ", "))}</li></ul></section>`;
}

function pageBody(locale, pageId, slug) {
  const t = LABELS[locale];
  const seo = getSeo(locale, pageId, slug);

  if (pageId === "case-study") {
    const project = getProjects(locale).find((item) => item.id === slug);
    const cs = project.caseStudy;
    return [
      `<h1>${esc(project.title)}</h1>`,
      `<p>${esc(project.summary)}</p>`,
      `<ul><li>${esc(t.client)}: ${esc(project.client)}</li><li>${esc(t.industry)}: ${esc(cs.industry)}</li><li>${esc(t.builtWith)}: ${esc(project.stack.join(", "))}</li></ul>`,
      `<h2>${esc(t.challenge)}</h2><p>${esc(cs.challenge)}</p>`,
      `<h2>${esc(t.solution)}</h2><p>${esc(cs.solution)}</p>`,
      `<h3>${esc(t.before)}</h3>${list(cs.before)}`,
      `<h3>${esc(t.after)}</h3>${list(cs.after)}`,
      `<h2>${esc(t.highlights)}</h2>${cs.highlights.map((item) => `<h3>${esc(item.title)}</h3><p>${esc(item.text)}</p>`).join("")}`,
      project.href ? `<p>${link(project.href, t.liveProject)}</p>` : "",
      project.landing ? `<p>${link(buildPath("landing", locale, project.landing), `${t.pricing}: ${PRODUCT_COPY[locale][project.landing].eyebrow}`)}</p>` : "",
    ].join("");
  }

  if (pageId === "landing") {
    const { productId } = LANDING_PAGES[slug];
    const copy = PRODUCT_COPY[locale][slug];
    const plans = PRICING[productId]
      .map((plan) => {
        const planCopy = copy.plans[plan.id];
        const amount =
          plan.period === "year"
            ? `${price(monthlyPrice(plan), locale)} ${t.currency} ${t.perMonth} (${price(plan.price, locale)} ${t.currency} ${t.perYear})`
            : `${price(plan.price, locale)} ${t.currency} ${t.oneTime}`;
        return `<h3>${esc(planCopy.name)}: ${esc(amount)}</h3><p>${esc(planCopy.audience)}</p>${list(planCopy.features)}`;
      })
      .join("");
    return [
      `<p>${esc(copy.eyebrow)}</p>`,
      `<h1>${esc(copy.title)}</h1>`,
      `<p>${esc(copy.description)}</p>`,
      `<p><strong>${esc(copy.priceNote)}</strong></p>`,
      `<section><h2>${esc(copy.featuresTitle)}</h2>${copy.features.map((item) => `<h3>${esc(item.title)}</h3><p>${esc(item.text)}</p>`).join("")}</section>`,
      `<section><h2>${esc(copy.pricingTitle)}</h2><p>${esc(copy.pricingDescription)}</p>${plans}</section>`,
      faqSection(FAQ_TITLE[locale], copy.faq),
    ].join("");
  }

  const heading = seo.title.replace(` | ${SITE_NAME}`, "").replace(`${SITE_NAME} | `, `${SITE_NAME}: `);
  const intro = `<h1>${esc(heading)}</h1><p>${esc(seo.description)}</p>`;
  switch (pageId) {
    case "home":
      return [intro, servicesSection(locale), productsSection(locale), workSection(locale), processSection(locale), faqSection(FAQ_TITLE[locale], COMPANY_FAQ[locale])].join("");
    case "services":
      return [intro, servicesSection(locale), productsSection(locale)].join("");
    case "portfolio":
      return [intro, workSection(locale)].join("");
    case "process":
      return [intro, processSection(locale)].join("");
    case "trial": {
      const copy = TRIAL_COPY[locale];
      return [
        `<p>${esc(copy.idcTitle)} · ${esc(copy.idcDates)}</p>`,
        `<h1>${esc(`${copy.headlineTop} ${copy.headlineBottom}`)}</h1>`,
        `<p>${esc(copy.subheadline)} ${esc(copy.description)}</p>`,
        `<p>${esc(copy.noCard)}</p>`,
        `<section><h2>${esc(copy.featuresTitle)}</h2>${copy.features.map((item) => `<h3>${esc(item.title)}</h3><p>${esc(item.text)}</p>`).join("")}</section>`,
        `<section><h2>${esc(copy.howTitle)}</h2><ol>${copy.how.map((item) => `<li><strong>${esc(item.title)}</strong>: ${esc(item.text)}</li>`).join("")}</ol></section>`,
        faqSection(copy.faqTitle, copy.faq),
      ].join("");
    }
    default:
      return intro;
  }
}

export function renderStaticPage(locale, pageId, slug = null) {
  const t = LABELS[locale];
  const otherLocale = locale === "ar" ? "en" : "ar";
  const crumbs = getBreadcrumbs(locale, pageId, slug);
  const nav = PAGE_IDS.map((id) => `<li>${link(buildPath(id, locale), t.nav[id])}</li>`).join("");
  const breadcrumb =
    crumbs.length > 1
      ? `<nav aria-label="Breadcrumb"><ol>${crumbs.map((crumb) => `<li>${link(crumb.path, crumb.name)}</li>`).join("")}</ol></nav>`
      : "";

  return `<div class="prerender">
<header><a href="${buildPath("home", locale)}"><strong>${SITE_NAME}</strong></a><nav><ul>${nav}<li>${link(buildPath(pageId, otherLocale, slug), t.otherLanguage)}</li></ul></nav></header>
<main>${breadcrumb}${pageBody(locale, pageId, slug)}</main>
<footer>${contactSection(locale)}</footer>
</div>`;
}

// llms.txt (https://llmstxt.org): a plain summary with links that AI assistants can read in one request.
export function renderLlmsTxt({ full = false } = {}) {
  const en = "en";
  const lines = [
    `# ${SITE_NAME}`,
    "",
    `> ${SEO.en.home.description}`,
    "",
    `${SITE_NAME} is a software and AI studio based in Egypt. It designs and builds websites, mobile apps, custom business systems, AI automation, and AI call agents, and sells two ready-made Windows products: Queue POS for restaurants and MolarBear for dental clinics. It works in Arabic and English with businesses in ${COMPANY.areaServed.map((area) => area.en).join(", ")}.`,
    "",
    "## Contact",
    "",
    `- WhatsApp: ${COMPANY.whatsappDisplay} (${COMPANY.whatsappHref})`,
    `- Email: ${COMPANY.email}`,
    `- Website: ${absoluteUrl("/")} (Arabic: ${absoluteUrl("/ar/")})`,
    ...COMPANY.sameAs.map((href) => `- ${href.includes("instagram") ? "Instagram" : "Facebook"}: ${href}`),
    "",
    "## Services",
    "",
    ...SERVICES.en.map((service) => `- ${service.title}: ${service.description}`),
    "",
    "## Ready-made products",
    "",
    ...LANDING_SLUGS.map((slug) => {
      const { productId } = LANDING_PAGES[slug];
      const copy = PRODUCT_COPY.en[slug];
      return `- [${copy.eyebrow}](${absoluteUrl(buildPath("landing", en, slug))}): ${copy.seoDescription} Price: ${priceLine(productId, en)}.`;
    }),
    "",
    "## Case studies",
    "",
    ...getProjects(en).map((project) => `- [${project.title}](${absoluteUrl(buildPath("case-study", en, project.id))}): ${project.category} for ${project.client}. ${project.summary}`),
    "",
    "## Pages",
    "",
    ...PAGE_IDS.map((id) => `- [${SEO.en[id].title}](${absoluteUrl(buildPath(id, en))}): ${SEO.en[id].description}`),
    "",
    "## FAQ",
    "",
    ...COMPANY_FAQ.en.flatMap((item) => [`### ${item.q}`, "", item.a, ""]),
  ];

  if (full) {
    lines.push("## Process", "", ...PROCESS_STEPS.en.map((step) => `${step.num}. ${step.title}: ${step.description}`), "");
    for (const slug of LANDING_SLUGS) {
      const { productId } = LANDING_PAGES[slug];
      const copy = PRODUCT_COPY.en[slug];
      const product = getProjects(en).find((project) => project.id === productId);
      lines.push(`## ${product.title}: ${copy.eyebrow}`, "", copy.description, "");
      lines.push(...copy.features.map((item) => `- ${item.title}: ${item.text}`), "");
      lines.push("### Pricing", "", copy.pricingDescription, "");
      lines.push(
        ...PRICING[productId].map((plan) => {
          const planCopy = copy.plans[plan.id];
          const amount =
            plan.period === "year"
              ? `EGP ${price(monthlyPrice(plan), en)} a month, billed yearly (EGP ${price(plan.price, en)} per year)`
              : `EGP ${price(plan.price, en)} one-time`;
          return `- ${planCopy.name}: ${amount}. ${planCopy.audience} Includes: ${planCopy.features.join("; ")}.`;
        }),
        "",
      );
      lines.push("### FAQ", "", ...copy.faq.flatMap((item) => [`- Q: ${item.q}`, `  A: ${item.a}`]), "");
    }
    for (const project of getProjects(en)) {
      const cs = project.caseStudy;
      lines.push(
        `## Case study: ${project.title}`,
        "",
        `Client: ${project.client}. Industry: ${cs.industry}. Built with: ${project.stack.join(", ")}.${project.href ? ` Live: ${project.href}` : ""}`,
        "",
        `Challenge: ${cs.challenge}`,
        "",
        `Solution: ${cs.solution}`,
        "",
        ...cs.after.map((item) => `- ${item}`),
        "",
      );
    }
    lines.push("## Arabic pages", "", ...PAGE_IDS.map((id) => `- [${SEO.ar[id].title}](${absoluteUrl(buildPath(id, "ar"))})`), "");
  } else {
    lines.push("## Optional", "", `- [Full details: products, pricing, and case studies](${absoluteUrl("/llms-full.txt")})`, "");
  }

  return `${lines.join("\n").trim()}\n`;
}
