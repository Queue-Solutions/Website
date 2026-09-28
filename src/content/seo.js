// Plain data (no Vite imports) so scripts/prerender.mjs can read it at build time too.
import { getProjects, PROJECT_IDS } from "./projects.js";
import { LANDING_PAGES, PRICING, PRODUCT_COPY } from "./products.js";

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

const PAGE_SLUGS = { home: "", services: "services", portfolio: "portfolio", process: "process", contact: "contact" };

// Every indexable route: the five main pages, one case study per project, and the product landing pages.
export const ALL_ROUTES = [
  ...PAGE_IDS.map((pageId) => ({ pageId, slug: null })),
  ...PROJECT_IDS.map((slug) => ({ pageId: "case-study", slug })),
  ...LANDING_SLUGS.map((slug) => ({ pageId: "landing", slug })),
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
  return { ...(SEO[locale][pageId] ?? SEO[locale].home), image: OG_IMAGE };
}

const ORGANIZATION_ID = `${SITE_ORIGIN}/#organization`;

export function buildStructuredData(locale, pageId, slug = null) {
  const seo = getSeo(locale, pageId, slug);
  const url = absoluteUrl(buildPath(pageId, locale, slug));
  const inLanguage = locale === "ar" ? "ar-EG" : "en";
  const graph = [
    {
      "@type": "ProfessionalService",
      "@id": ORGANIZATION_ID,
      name: SITE_NAME,
      url: SITE_ORIGIN,
      logo: `${SITE_ORIGIN}/icon-512.png`,
      image: OG_IMAGE,
      email: "queuesolutions25@gmail.com",
      telephone: "+201127435060",
      priceRange: "EGP",
      address: { "@type": "PostalAddress", addressCountry: "EG" },
      areaServed: ["EG", "SA", "AE", "KW", "QA"],
      knowsLanguage: ["ar", "en"],
      description: SEO[locale].home.description,
      sameAs: ["https://www.instagram.com/queue.solutions/", "https://www.facebook.com/profile.php?id=61585024646035"],
      contactPoint: { "@type": "ContactPoint", telephone: "+201127435060", contactType: "sales", availableLanguage: ["Arabic", "English"] },
    },
    { "@type": "WebSite", "@id": `${SITE_ORIGIN}/#website`, url: SITE_ORIGIN, name: SITE_NAME, inLanguage, publisher: { "@id": ORGANIZATION_ID } },
    { "@type": "WebPage", "@id": `${url}#webpage`, url, name: seo.title, description: seo.description, inLanguage, isPartOf: { "@id": `${SITE_ORIGIN}/#website` } },
  ];

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
    graph.push({
      "@type": "FAQPage",
      mainEntity: copy.faq.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    });
  }

  return { "@context": "https://schema.org", "@graph": graph };
}
