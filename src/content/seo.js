// Plain data (no Vite imports) so scripts/prerender.mjs can read it at build time too.
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

const PAGE_SLUGS = { home: "", services: "services", portfolio: "portfolio", process: "process", contact: "contact" };

export function buildPath(pageId, locale = "en") {
  const slug = PAGE_SLUGS[pageId] ?? "";
  if (locale === "ar") {
    return slug ? `/ar/${slug}` : "/ar/";
  }
  return slug ? `/${slug}` : "/";
}

export function parsePath(pathname = "/") {
  const clean = pathname.replace(/\/+$/, "") || "/";
  const segments = clean.split("/").filter(Boolean);
  let locale = "en";

  if (segments[0] === "ar") {
    locale = "ar";
    segments.shift();
  }

  const slug = segments.join("/");
  const pageId = Object.keys(PAGE_SLUGS).find((id) => PAGE_SLUGS[id] === slug) ?? null;
  return { locale, pageId };
}

export function absoluteUrl(path) {
  return new URL(path, SITE_ORIGIN).toString();
}

export function buildStructuredData(locale, pageId, projects = []) {
  const graph = [
    {
      "@type": "ProfessionalService",
      "@id": `${SITE_ORIGIN}/#organization`,
      name: SITE_NAME,
      url: SITE_ORIGIN,
      logo: `${SITE_ORIGIN}/icon-512.png`,
      image: OG_IMAGE,
      email: "queuesolutions25@gmail.com",
      telephone: "+201127435060",
      priceRange: "$$",
      address: { "@type": "PostalAddress", addressCountry: "EG" },
      areaServed: ["EG", "SA", "AE", "KW", "QA"],
      knowsLanguage: ["ar", "en"],
      description: SEO[locale].home.description,
      sameAs: ["https://www.instagram.com/queue.solutions/", "https://www.facebook.com/profile.php?id=61585024646035"],
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+201127435060",
        contactType: "sales",
        availableLanguage: ["Arabic", "English"],
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_ORIGIN}/#website`,
      url: SITE_ORIGIN,
      name: SITE_NAME,
      inLanguage: locale === "ar" ? "ar-EG" : "en",
      publisher: { "@id": `${SITE_ORIGIN}/#organization` },
    },
    {
      "@type": "WebPage",
      "@id": `${absoluteUrl(buildPath(pageId, locale))}#webpage`,
      url: absoluteUrl(buildPath(pageId, locale)),
      name: SEO[locale][pageId].title,
      description: SEO[locale][pageId].description,
      inLanguage: locale === "ar" ? "ar-EG" : "en",
      isPartOf: { "@id": `${SITE_ORIGIN}/#website` },
    },
  ];

  if (pageId === "portfolio" && projects.length) {
    graph.push({
      "@type": "ItemList",
      name: SEO[locale].portfolio.title,
      itemListElement: projects.map((project, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": project.href ? "WebApplication" : "SoftwareApplication",
          name: project.title,
          description: project.summary,
          applicationCategory: "BusinessApplication",
          operatingSystem: project.platform === "desktop" ? "Windows" : "Web",
          ...(project.href ? { url: project.href } : {}),
          creator: { "@id": `${SITE_ORIGIN}/#organization` },
        },
      })),
    });
  }

  return { "@context": "https://schema.org", "@graph": graph };
}
