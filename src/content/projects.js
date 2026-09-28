// Plain data (no Vite imports) so scripts/prerender.mjs can read it at build time too.
import { CASE_STUDIES } from "./caseStudies.js";
import { PRODUCT_LANDING } from "./products.js";

const logo = (file) => `/portfolio/${file}`;
const shot = (file) => `/case-studies/${file}.webp`;

// Language-independent project facts. Copy for each project lives in the locale blocks below.
export const PROJECT_META = {
  glowmia: {
    logo: logo("glowmia.webp"),
    gallery: [shot("glowmia-home")],
    href: "https://glowmia.vercel.app/",
    platform: "web",
    filters: ["web", "ai"],
    accent: "#7a1f3d",
    accentSoft: "#f7f2eb",
    stack: ["Next.js", "AI Stylist", "RTL"],
  },
  "egypt-gold-design": {
    logo: logo("maison-dia.svg"),
    gallery: [shot("egypt-gold-design-home")],
    href: "https://diamond-design-ai-mu.vercel.app",
    platform: "web",
    filters: ["web", "ai"],
    accent: "#b8975a",
    accentSoft: "#1a1814",
    stack: ["Next.js", "AI Agent", "Image Input"],
  },
  "egypt-gold-whatsapp": {
    logo: logo("egypt-gold-whatsapp.svg"),
    platform: "webapp",
    filters: ["ai", "web"],
    accent: "#c8962e",
    accentSoft: "#1d1a14",
    stack: ["WhatsApp Business", "Claude AI", "Dashboard"],
  },
  "tokyo-ac": {
    logo: logo("tokyo-ac.webp"),
    platform: "desktop",
    filters: ["desktop"],
    accent: "#1e4e79",
    accentSoft: "#eaf1f8",
    stack: ["Windows", "Offline-first", "Invoicing"],
  },
  "queue-pos": {
    logo: logo("queue-pos.webp"),
    video: "/videos/queue-pos-demo.mp4",
    poster: shot("queue-pos-poster"),
    videoOrientation: "landscape",
    gallery: [shot("queue-pos-reports"), shot("queue-pos-branches")],
    platform: "desktop",
    filters: ["desktop"],
    accent: "#8a5a33",
    accentSoft: "#f5efe8",
    stack: ["Windows", "Arabic / English", "Multi-branch"],
  },
  molarbear: {
    logo: logo("molarbear.webp"),
    video: "/videos/molarbear-demo.mp4",
    poster: shot("molarbear-poster"),
    videoOrientation: "landscape",
    gallery: [shot("molarbear-clinic-flow"), shot("molarbear-dental-chart"), shot("molarbear-dashboard"), shot("molarbear-patients"), shot("molarbear-inventory"), shot("molarbear-earnings")],
    platform: "desktop",
    filters: ["desktop"],
    accent: "#2f7d8c",
    accentSoft: "#eef7f8",
    stack: ["Windows", "X-ray Import", "Clinic Workflow"],
  },
};

export const PROJECT_COPY = {
  en: [
    {
      id: "glowmia",
      title: "Glowmia",
      client: "Fashion boutique",
      category: "E-commerce + AI Stylist",
      summary:
        "An Arabic-first dress boutique with a built-in styling assistant that helps shoppers pick the right piece instead of leaving undecided.",
      features: [
        "Storefront with sizes, cart, and full dress archive",
        "AI stylist that advises on fit and occasion",
        "Side-by-side comparison to help shoppers decide",
      ],
      result: "Styling help at any hour",
    },
    {
      id: "egypt-gold-design",
      title: "Egypt Gold AI Design",
      client: "Egypt Gold · Maison DIA atelier",
      category: "AI Jewellery Design",
      summary:
        "A private design studio where clients describe the piece they imagine, and an AI agent turns it into a brief the workshop can price.",
      features: [
        "Describe a piece in words or upload a reference",
        "Agent refines stone, metal, and silhouette",
        "Every inquiry arrives as a ready-to-quote brief",
      ],
      result: "Inquiries arrive ready to price",
    },
    {
      id: "egypt-gold-whatsapp",
      title: "WhatsApp AI Control",
      client: "Egypt Gold",
      category: "AI Customer Service",
      summary:
        "A control panel for Egypt Gold's WhatsApp Business line: AI answers customers instantly, and staff can take over any chat at any moment.",
      features: [
        "AI replies to customers around the clock",
        "One-click human takeover from a shared inbox",
        "Knowledge base, quick replies, and analytics",
      ],
      result: "Every message answered in seconds",
    },
    {
      id: "tokyo-ac",
      title: "Tokyo AC",
      client: "Tokyo International Company",
      category: "Service Management",
      summary:
        "A Windows system for an air-conditioning company with over 30 years in the market, covering customers, contracts, technicians, and invoicing.",
      features: [
        "Customer records and units under contract",
        "Technician job cards and invoicing",
        "Runs on existing office PCs, even offline",
      ],
      result: "One record per customer and unit",
    },
    {
      id: "queue-pos",
      title: "Queue POS",
      client: "Restaurants & cafés",
      category: "Restaurant Management",
      summary:
        "Our own restaurant system: point of sale, kitchen display, inventory, staff, and reports in one Windows app, in Arabic and English.",
      features: [
        "Table-based POS, split bills, and thermal receipts",
        "Kitchen display and recipe-based stock deduction",
        "Staff shifts, cash-up, and multi-branch reports",
      ],
      result: "Front and back of house in one system",
    },
    {
      id: "molarbear",
      title: "MolarBear",
      client: "Dental clinics",
      category: "Clinic Management",
      summary:
        "Dental clinic software that connects the front desk and the doctor: visits, treatments, payments, and X-rays on a single patient file.",
      features: [
        "Live clinic board shared by desk and doctor",
        "Treatments, itemised receipts, and split payments",
        "X-ray import, expenses, inventory, and lab costs",
      ],
      result: "One patient file from check-in to payment",
    },
  ],
  ar: [
    {
      id: "glowmia",
      title: "Glowmia",
      client: "بوتيك أزياء",
      category: "متجر إلكتروني + منسقة أزياء ذكية",
      summary:
        "متجر فساتين باللغة العربية مزوّد بمساعدة تنسيق ذكية، تساعد العميلة على اختيار القطعة المناسبة بدلًا من مغادرة الموقع دون قرار.",
      features: [
        "متجر كامل بالمقاسات وسلة الشراء وأرشيف التصاميم",
        "منسقة ذكية تنصح بالمقاس والإطلالة المناسبة للمناسبة",
        "مقارنة القطع جنبًا إلى جنب لتسهيل الاختيار",
      ],
      result: "مساعدة في الاختيار على مدار الساعة",
    },
    {
      id: "egypt-gold-design",
      title: "Egypt Gold AI Design",
      client: "Egypt Gold · أتيليه Maison DIA",
      category: "تصميم مجوهرات بالذكاء الاصطناعي",
      summary:
        "استوديو تصميم خاص يصف فيه العميل القطعة التي يتخيلها، فيحولها وكيل ذكي إلى ملف تصميم جاهز للتسعير في الورشة.",
      features: [
        "وصف القطعة بالكلمات أو رفع صورة مرجعية",
        "الوكيل يحدد الأحجار والمعدن وشكل القطعة",
        "كل طلب يصل في صورة ملف جاهز للتسعير",
      ],
      result: "طلبات تصل جاهزة للتسعير",
    },
    {
      id: "egypt-gold-whatsapp",
      title: "WhatsApp AI Control",
      client: "Egypt Gold",
      category: "خدمة عملاء بالذكاء الاصطناعي",
      summary:
        "لوحة تحكم لحساب واتساب للأعمال الخاص بـ Egypt Gold: الذكاء الاصطناعي يرد على العملاء فورًا، ويستطيع الموظف تولي أي محادثة في أي لحظة.",
      features: [
        "ردود ذكية على العملاء على مدار الساعة",
        "تحويل المحادثة إلى موظف بضغطة واحدة",
        "قاعدة معرفة وردود جاهزة وتقارير أداء",
      ],
      result: "كل رسالة يُرد عليها خلال ثوانٍ",
    },
    {
      id: "tokyo-ac",
      title: "Tokyo AC",
      client: "شركة طوكيو الدولية",
      category: "إدارة خدمات التكييف",
      summary:
        "نظام ويندوز لشركة تكييف تتمتع بخبرة تزيد على 30 عامًا، يدير العملاء والعقود والفنيين والفواتير في مكان واحد.",
      features: [
        "سجلات العملاء والوحدات المشمولة بالعقود",
        "أوامر عمل الفنيين وإصدار الفواتير",
        "يعمل على أجهزة المكتب الحالية حتى دون إنترنت",
      ],
      result: "سجل موحد لكل عميل ووحدة",
    },
    {
      id: "queue-pos",
      title: "Queue POS",
      client: "المطاعم والمقاهي",
      category: "إدارة المطاعم",
      summary:
        "نظامنا الخاص لإدارة المطاعم: نقاط البيع وشاشة المطبخ والمخزون والموظفين والتقارير في برنامج ويندوز واحد، بالعربية والإنجليزية.",
      features: [
        "نقطة بيع حسب الطاولات مع تقسيم الفاتورة والطباعة الحرارية",
        "شاشة للمطبخ وخصم تلقائي للمخزون وفق الوصفات",
        "ورديات الموظفين وتقفيل الخزينة وتقارير الفروع",
      ],
      result: "إدارة الصالة والمطبخ في نظام واحد",
    },
    {
      id: "molarbear",
      title: "MolarBear",
      client: "عيادات الأسنان",
      category: "إدارة العيادات",
      summary:
        "برنامج لعيادات الأسنان يربط الاستقبال بالطبيب: الزيارات والعلاجات والمدفوعات وصور الأشعة في ملف واحد لكل مريض.",
      features: [
        "لوحة متابعة مباشرة مشتركة بين الاستقبال والطبيب",
        "خطط العلاج وإيصالات مفصلة وتقسيم المدفوعات",
        "استيراد الأشعة والمصروفات والمخزون وتكاليف المعامل",
      ],
      result: "ملف واحد للمريض من الحجز حتى الدفع",
    },
  ],
};

export function getProjects(locale) {
  return PROJECT_COPY[locale].map((project) => ({
    ...PROJECT_META[project.id],
    ...project,
    caseStudy: CASE_STUDIES[locale][project.id],
    landing: PRODUCT_LANDING[project.id] ?? null,
  }));
}

export const PROJECT_IDS = Object.keys(PROJECT_META);
