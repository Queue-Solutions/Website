// Client testimonials.
//
// These are DRAFTS written for each client to review. A testimonial is only shown on
// the site once `approved: true` is set, which should happen only after that client has
// read the quote, edited it if they want, and agreed to have it published under their
// name. Replace `author`/`role` with the real person's name and title at that point.

export const TESTIMONIALS = [
  {
    projectId: "egypt-gold-whatsapp",
    approved: false,
    author: { en: "Egypt Gold team", ar: "فريق Egypt Gold" },
    role: { en: "Egypt Gold", ar: "Egypt Gold" },
    quote: {
      en: "Customers get an answer on WhatsApp in seconds, even at midnight, and our staff only step in when it really needs a person.",
      ar: "العملاء يحصلون على رد على واتساب خلال ثوانٍ حتى في منتصف الليل، وفريقنا يتدخل فقط عندما يحتاج الأمر إلى شخص فعلًا.",
    },
  },
  {
    projectId: "egypt-gold-design",
    approved: false,
    author: { en: "Egypt Gold team", ar: "فريق Egypt Gold" },
    role: { en: "Egypt Gold · Maison DIA", ar: "Egypt Gold · Maison DIA" },
    quote: {
      en: "Design requests now reach the workshop as clear briefs. We can price a custom piece straight away instead of chasing the client with questions.",
      ar: "طلبات التصميم تصل إلى الورشة الآن كملفات واضحة، فنسعّر القطعة المخصصة مباشرة بدلًا من ملاحقة العميل بالأسئلة.",
    },
  },
  {
    projectId: "tokyo-ac",
    approved: false,
    author: { en: "Management", ar: "الإدارة" },
    role: { en: "Tokyo International Company", ar: "شركة طوكيو الدولية" },
    quote: {
      en: "After 30 years of paper files, every customer, unit, and job card is finally in one place, and it keeps working even when the internet is down.",
      ar: "بعد 30 عامًا من الملفات الورقية، أصبح كل عميل ووحدة وأمر عمل في مكان واحد، والنظام يعمل حتى عند انقطاع الإنترنت.",
    },
  },
  {
    projectId: "glowmia",
    approved: false,
    author: { en: "Glowmia founder", ar: "مؤسسة Glowmia" },
    role: { en: "Glowmia", ar: "Glowmia" },
    quote: {
      en: "The styling assistant answers the questions we used to answer one by one in DMs, so shoppers decide faster and we have time to focus on the collection.",
      ar: "المنسقة الذكية تجيب عن الأسئلة التي كنا نرد عليها واحدة تلو الأخرى في الرسائل، فتقرر العميلات أسرع ونتفرغ نحن للمجموعة.",
    },
  },
];

export function getTestimonials(locale, projectId) {
  return TESTIMONIALS.filter((item) => item.approved && (!projectId || item.projectId === projectId)).map((item) => ({
    projectId: item.projectId,
    author: item.author[locale],
    role: item.role[locale],
    quote: item.quote[locale],
  }));
}
