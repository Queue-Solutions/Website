// Plain data (no Vite imports) so scripts/prerender.mjs can read it at build time too.
import { COMPANY, COMPANY_FAQ, PROCESS_STEPS, SERVICES } from "./company.js";
import { getProjects, PROJECT_IDS } from "./projects.js";
import { LANDING_PAGES, PRICING, PRODUCT_COPY } from "./products.js";
import { TRIAL_COPY, TRIAL_DOWNLOAD } from "./trial.js";

export const SITE_ORIGIN = "https://queuesolutions.org";
export const SITE_NAME = "Queue Solutions";
export const OG_IMAGE = `${SITE_ORIGIN}/og-image.jpg`;

export const SEO = {
  en: {
    home: {
      title: "Queue Solutions | Web Development, Custom Systems & AI Automation in Egypt",
      description:
        "Queue Solutions builds websites, custom business systems, POS and clinic software, and AI automation for companies in Egypt and the Gulf. Talk to us on WhatsApp.",
    },
    services: {
      title: "Services | Website Development, AI Agents & Custom Software | Queue Solutions",
      description:
        "Website development, mobile apps, custom systems, AI automation, AI call agents, and IT services. One partner for your customer-facing and operational technology.",
    },
    portfolio: {
      title: "Portfolio | Websites, AI Agents & Desktop Systems | Queue Solutions",
      description:
        "See real projects by Queue Solutions: Glowmia fashion store with AI stylist, Egypt Gold AI jewellery design and WhatsApp AI, Tokyo AC, Queue POS, and MolarBear dental software.",
    },
    process: {
      title: "Our Process | From Discovery to Launch | Queue Solutions",
      description:
        "How Queue Solutions works: discovery, planning, development, launch and support. A clear process that keeps your project moving without losing quality.",
    },
    contact: {
      title: "Contact Queue Solutions | Get a Free Project Consultation",
      description:
        "Tell us what you want to improve. Contact Queue Solutions by WhatsApp, email, or the project form and get a clear recommendation within 24 hours.",
    },
  },
  ar: {
    home: {
      title: "Queue Solutions | تصميم مواقع وبرمجة أنظمة وأتمتة بالذكاء الاصطناعي في مصر",
      description:
        "تصمم Queue Solutions المواقع الإلكترونية وتبرمج الأنظمة المخصصة وبرامج نقاط البيع وإدارة العيادات وحلول الأتمتة بالذكاء الاصطناعي للشركات في مصر والخليج.",
    },
    services: {
      title: "خدماتنا | تصميم مواقع وتطبيقات ووكلاء ذكاء اصطناعي | Queue Solutions",
      description:
        "تطوير المواقع وتطبيقات الجوال والأنظمة المخصصة والأتمتة بالذكاء الاصطناعي ووكلاء المكالمات الذكية وخدمات تقنية المعلومات، مع شريك تقني واحد.",
    },
    portfolio: {
      title: "أعمالنا | مواقع ووكلاء ذكاء اصطناعي وبرامج سطح مكتب | Queue Solutions",
      description:
        "مشاريع حقيقية من Queue Solutions: متجر Glowmia بمنسقة أزياء ذكية، وتصميم المجوهرات والواتساب الذكي لـ Egypt Gold، ونظام Tokyo AC، وQueue POS للمطاعم، وMolarBear لعيادات الأسنان.",
    },
    process: {
      title: "منهجية العمل | من الفكرة حتى الإطلاق | Queue Solutions",
      description:
        "كيف نعمل في Queue Solutions: الاستكشاف، ثم التخطيط، ثم التطوير، ثم الإطلاق والدعم. مراحل واضحة تحافظ على جودة مشروعك وسرعة إنجازه.",
    },
    contact: {
      title: "تواصل معنا | استشارة مجانية لمشروعك | Queue Solutions",
      description:
        "أخبرنا بما تريد تحسينه. تواصل مع Queue Solutions عبر واتساب أو البريد الإلكتروني أو نموذج المشروع، واحصل على توصية واضحة خلال 24 ساعة.",
    },
  },
};

export const PAGE_IDS = ["home", "services", "portfolio", "process", "contact"];
export const LOCALES = ["en", "ar"];
export const LANDING_SLUGS = Object.keys(LANDING_PAGES);

const PAGE_SLUGS = { home: "", services: "services", portfolio: "portfolio", process: "process", contact: "contact", trial: "molarbear-trial" };

// Every indexable route: the five main pages, one case study per project, and the product landing pages.
export const ALL_ROUTES = [
  ...PAGE_IDS.map((pageId) => ({ pageId, slug: null })),
  ...PROJECT_IDS.map((slug) => ({ pageId: "case-study", slug })),
  ...LANDING_SLUGS.map((slug) => ({ pageId: "landing", slug })),
  { pageId: "trial", slug: null },
];

export function buildPath(pageId, locale = "en", slug = null) {
  let path;
  if (pageId === "case-study") path = `work/${slug}`;
  else if (pageId === "landing") path = slug;
  else path = PAGE_SLUGS[pageId] ?? "";

  if (locale === "ar") {
    return path ? `/ar/${path}` : "/ar/";
  }
  return path ? `/${path}` : "/";
}

export function parsePath(pathname = "/") {
  const clean = pathname.replace(/\/+$/, "") || "/";
  const segments = clean.split("/").filter(Boolean);
  let locale = "en";

  if (segments[0] === "ar") {
    locale = "ar";
    segments.shift();
  }

  if (segments[0] === "work" && segments.length === 2 && PROJECT_IDS.includes(segments[1])) {
    return { locale, pageId: "case-study", slug: segments[1] };
  }
  if (segments.length === 1 && LANDING_SLUGS.includes(segments[0])) {
    return { locale, pageId: "landing", slug: segments[0] };
  }

  const path = segments.join("/");
  const pageId = Object.keys(PAGE_SLUGS).find((id) => PAGE_SLUGS[id] === path) ?? null;
  return { locale, pageId, slug: null };
}

export function absoluteUrl(path) {
  return new URL(path, SITE_ORIGIN).toString();
}

export function getSeo(locale, pageId, slug = null) {
  if (pageId === "case-study") {
    const project = getProjects(locale).find((item) => item.id === slug);
    return {
      title:
        locale === "ar"
          ? `دراسة حالة ${project.title} | ${project.category} | ${SITE_NAME}`
          : `${project.title} Case Study | ${project.category} | ${SITE_NAME}`,
      description: project.summary,
      image: project.gallery?.[0] ? absoluteUrl(project.gallery[0]) : OG_IMAGE,
    };
  }
  if (pageId === "landing") {
    const copy = PRODUCT_COPY[locale][slug];
    return { title: copy.seoTitle, description: copy.seoDescription, image: absoluteUrl(LANDING_PAGES[slug].poster) };
  }
  if (pageId === "trial") {
    const copy = TRIAL_COPY[locale];
    return { title: copy.seoTitle, description: copy.seoDescription, image: absoluteUrl("/case-studies/molarbear-clinic-flow.webp") };
  }
  return { ...(SEO[locale][pageId] ?? SEO[locale].home), image: OG_IMAGE };
}

const ORGANIZATION_ID = `${SITE_ORIGIN}/#organization`;
const WEBSITE_ID = `${SITE_ORIGIN}/#website`;

const BREADCRUMB_LABELS = {
  en: { home: "Home", services: "Services", portfolio: "Portfolio", process: "Process", contact: "Contact", trial: "MolarBear free trial" },
  ar: { home: "الرئيسية", services: "خدماتنا", portfolio: "أعمالنا", process: "منهجية العمل", contact: "تواصل معنا", trial: "تجربة MolarBear المجانية" },
};

const WEBPAGE_TYPES = { contact: "ContactPage", portfolio: "CollectionPage", "case-study": "ItemPage" };

// Home > [Portfolio >] current page, using the visible names people and AI assistants would cite.
export function getBreadcrumbs(locale, pageId, slug = null) {
  const labels = BREADCRUMB_LABELS[locale];
  const crumbs = [{ name: labels.home, path: buildPath("home", locale) }];
  if (pageId === "home") return crumbs;
  if (pageId === "case-study") {
    crumbs.push({ name: labels.portfolio, path: buildPath("portfolio", locale) });
    crumbs.push({ name: getProjects(locale).find((item) => item.id === slug).title, path: buildPath(pageId, locale, slug) });
  } else if (pageId === "landing") {
    crumbs.push({ name: PRODUCT_COPY[locale][slug].eyebrow, path: buildPath(pageId, locale, slug) });
  } else {
    crumbs.push({ name: labels[pageId], path: buildPath(pageId, locale) });
  }
  return crumbs;
}

const faqPage = (items, url) => ({
  "@type": "FAQPage",
  "@id": `${url}#faq`,
  mainEntity: items.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
});

const serviceNode = (service, locale) => ({
  "@type": "Service",
  "@id": `${SITE_ORIGIN}/#service-${service.id}`,
  name: service.title,
  serviceType: SERVICES.en.find((item) => item.id === service.id).title,
  description: service.description,
  provider: { "@id": ORGANIZATION_ID },
  areaServed: COMPANY.areaServed.map((area) => ({ "@type": "Country", name: area[locale] })),
  url: absoluteUrl(buildPath("services", locale)),
});

export function buildStructuredData(locale, pageId, slug = null) {
  const seo = getSeo(locale, pageId, slug);
  const url = absoluteUrl(buildPath(pageId, locale, slug));
  const inLanguage = locale === "ar" ? "ar-EG" : "en";
  const breadcrumbs = getBreadcrumbs(locale, pageId, slug);
  const graph = [
    {
      "@type": "ProfessionalService",
      "@id": ORGANIZATION_ID,
      name: SITE_NAME,
      alternateName: "Queue",
      url: SITE_ORIGIN,
      logo: { "@type": "ImageObject", url: `${SITE_ORIGIN}/icon-512.png`, width: 512, height: 512 },
      image: OG_IMAGE,
      email: COMPANY.email,
      telephone: COMPANY.telephone,
      priceRange: "EGP",
      address: { "@type": "PostalAddress", addressCountry: COMPANY.country },
      areaServed: COMPANY.areaServed.map((area) => ({ "@type": "Country", name: area.en, identifier: area.code })),
      knowsLanguage: ["ar", "en"],
      knowsAbout: COMPANY.knowsAbout,
      slogan: "Where your ideas come true",
      description: SEO[locale].home.description,
      sameAs: COMPANY.sameAs,
      contactPoint: {
        "@type": "ContactPoint",
        telephone: COMPANY.telephone,
        email: COMPANY.email,
        url: COMPANY.whatsappHref,
        contactType: "sales",
        areaServed: COMPANY.areaServed.map((area) => area.code),
        availableLanguage: ["Arabic", "English"],
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: locale === "ar" ? "خدمات Queue Solutions" : "Queue Solutions services",
        itemListElement: SERVICES[locale].map((service) => ({
          "@type": "Offer",
          itemOffered: { "@id": `${SITE_ORIGIN}/#service-${service.id}`, "@type": "Service", name: service.title },
        })),
      },
    },
    {
      "@type": "WebSite",
      "@id": WEBSITE_ID,
      url: SITE_ORIGIN,
      name: SITE_NAME,
      description: SEO[locale].home.description,
      inLanguage: ["en", "ar-EG"],
      publisher: { "@id": ORGANIZATION_ID },
    },
    {
      "@type": WEBPAGE_TYPES[pageId] ?? "WebPage",
      "@id": `${url}#webpage`,
      url,
      name: seo.title,
      description: seo.description,
      inLanguage,
      isPartOf: { "@id": WEBSITE_ID },
      about: { "@id": ORGANIZATION_ID },
      primaryImageOfPage: { "@type": "ImageObject", url: seo.image },
      ...(breadcrumbs.length > 1 ? { breadcrumb: { "@id": `${url}#breadcrumb` } } : {}),
    },
  ];

  if (breadcrumbs.length > 1) {
    graph.push({
      "@type": "BreadcrumbList",
      "@id": `${url}#breadcrumb`,
      itemListElement: breadcrumbs.map((crumb, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: crumb.name,
        item: absoluteUrl(crumb.path),
      })),
    });
  }

  if (pageId === "home") {
    graph.push(faqPage(COMPANY_FAQ[locale], url));
  }

  if (pageId === "services") {
    graph.push(...SERVICES[locale].map((service) => serviceNode(service, locale)));
  }

  if (pageId === "process") {
    graph.push({
      "@type": "HowTo",
      name: seo.title,
      description: seo.description,
      inLanguage,
      step: PROCESS_STEPS[locale].map((step, index) => ({
        "@type": "HowToStep",
        position: index + 1,
        name: step.title,
        text: step.description,
      })),
    });
  }

  const projects = getProjects(locale);
  const softwareFor = (project) => ({
    "@type": project.href ? "WebApplication" : "SoftwareApplication",
    name: project.title,
    description: project.summary,
    applicationCategory: "BusinessApplication",
    operatingSystem: project.platform === "desktop" ? "Windows" : "Web",
    ...(project.href ? { url: project.href } : {}),
    creator: { "@id": ORGANIZATION_ID },
  });

  if (pageId === "portfolio") {
    graph.push({
      "@type": "ItemList",
      name: seo.title,
      itemListElement: projects.map((project, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: absoluteUrl(buildPath("case-study", locale, project.id)),
        name: project.title,
      })),
    });
  }

  if (pageId === "case-study") {
    const project = projects.find((item) => item.id === slug);
    graph.push({
      "@type": "Article",
      headline: seo.title,
      description: project.caseStudy.challenge,
      image: seo.image,
      inLanguage,
      author: { "@id": ORGANIZATION_ID },
      publisher: { "@id": ORGANIZATION_ID },
      about: softwareFor(project),
      mainEntityOfPage: `${url}#webpage`,
    });
  }

  if (pageId === "trial") {
    graph.push({
      "@type": "SoftwareApplication",
      "@id": `${url}#software`,
      name: "MolarBear",
      description: TRIAL_COPY[locale].seoDescription,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Windows 10, Windows 11",
      softwareVersion: TRIAL_DOWNLOAD.version,
      inLanguage: ["ar", "en"],
      creator: { "@id": ORGANIZATION_ID },
      offers: {
        "@type": "Offer",
        name: locale === "ar" ? "تجربة مجانية لمدة 14 يومًا" : "14-day free trial",
        price: 0,
        priceCurrency: "EGP",
        availability: "https://schema.org/InStock",
        url,
      },
    });
    graph.push(faqPage(TRIAL_COPY[locale].faq, url));
  }

  if (pageId === "landing") {
    const { productId } = LANDING_PAGES[slug];
    const project = projects.find((item) => item.id === productId);
    const copy = PRODUCT_COPY[locale][slug];
    graph.push({
      ...softwareFor(project),
      image: seo.image,
      offers: PRICING[productId].map((plan) => ({
        "@type": "Offer",
        name: copy.plans[plan.id].name,
        price: plan.price,
        priceCurrency: "EGP",
        availability: "https://schema.org/InStock",
        url,
      })),
    });
    graph.push(faqPage(copy.faq, url));
  }

  return { "@context": "https://schema.org", "@graph": graph };
}
