// Plain data (no Vite imports) so scripts/prerender.mjs can read it at build time too.
// Company facts, services, process, and FAQ shared by the pages, the structured data,
// the prerendered HTML, and llms.txt, so search engines and AI assistants read the same answers.

export const COMPANY = {
  name: "Queue Solutions",
  email: "queuesolutions25@gmail.com",
  telephone: "+201127435060",
  whatsappDisplay: "+20 11 27435060",
  whatsappHref: "https://wa.me/201127435060",
  country: "EG",
  areaServed: [
    { code: "EG", en: "Egypt", ar: "مصر" },
    { code: "SA", en: "Saudi Arabia", ar: "السعودية" },
    { code: "AE", en: "United Arab Emirates", ar: "الإمارات" },
    { code: "KW", en: "Kuwait", ar: "الكويت" },
    { code: "QA", en: "Qatar", ar: "قطر" },
  ],
  sameAs: ["https://www.instagram.com/queue.solutions/", "https://www.facebook.com/profile.php?id=61585024646035"],
  knowsAbout: [
    "Website development",
    "Arabic RTL website design",
    "E-commerce development",
    "Mobile app development",
    "Custom business software",
    "Restaurant POS software",
    "Dental clinic management software",
    "AI automation",
    "AI call agents",
    "WhatsApp Business AI chatbots",
    "IT services",
  ],
};

export const SERVICES = {
  en: [
    {
      id: "ai-automation",
      icon: "brain",
      title: "AI Automation",
      description:
        "For the repeated work businesses do every day: lead replies, follow-up, reminders, handoffs, and admin updates.",
    },
    {
      id: "ai-call-agent",
      icon: "headset",
      title: "AI Call Agent",
      description:
        "An AI voice agent that answers calls, handles common questions, captures lead details, and turns missed calls into new clients.",
    },
    {
      id: "mobile-apps",
      icon: "mobile",
      title: "Mobile App Development",
      description:
        "Mobile apps for your customers or your internal team, with clean flows, solid performance, and a look that matches your brand.",
    },
    {
      id: "websites",
      icon: "globe",
      title: "Website Development",
      description: "Websites that feel credible, load fast, and help visitors understand your value quickly.",
    },
    {
      id: "custom-systems",
      icon: "cogs",
      title: "Custom Systems",
      description:
        "Internal tools, desktop software, and dashboards that give your team one clear place to track work, data, and decisions.",
    },
    {
      id: "it-services",
      icon: "code",
      title: "IT Services",
      description: "We support the technical setup behind your work so your tools stay stable, connected, and easy to manage.",
    },
  ],
  ar: [
    {
      id: "ai-automation",
      icon: "brain",
      title: "الأتمتة بالذكاء الاصطناعي",
      description: "للمهام التي تتكرر كل يوم: الرد على العملاء، والمتابعة، والتذكيرات، وتسليم المهام، والتحديثات الإدارية.",
    },
    {
      id: "ai-call-agent",
      icon: "headset",
      title: "وكيل المكالمات الذكي",
      description: "وكيل صوتي يرد على المكالمات، ويجيب عن الأسئلة الشائعة، ويسجل بيانات العميل، ويحوّل المكالمات الفائتة إلى عملاء جدد.",
    },
    {
      id: "mobile-apps",
      icon: "mobile",
      title: "تطوير تطبيقات الجوال",
      description: "تطبيقات لعملائك أو لفريقك الداخلي، بتجربة استخدام سلسة وأداء قوي وهوية تعكس علامتك التجارية.",
    },
    {
      id: "websites",
      icon: "globe",
      title: "تطوير المواقع الإلكترونية",
      description: "مواقع موثوقة وسريعة، تساعد الزائر على فهم قيمة ما تقدمه في ثوانٍ.",
    },
    {
      id: "custom-systems",
      icon: "cogs",
      title: "الأنظمة المخصصة",
      description: "أدوات داخلية وبرامج سطح مكتب ولوحات تحكم تمنح فريقك مكانًا واحدًا واضحًا لمتابعة العمل والبيانات والقرارات.",
    },
    {
      id: "it-services",
      icon: "code",
      title: "خدمات تقنية المعلومات",
      description: "ندعم البنية التقنية لأعمالك لتبقى أدواتك مستقرة ومترابطة وسهلة الإدارة.",
    },
  ],
};

export const PROCESS_STEPS = {
  en: [
    {
      num: "01",
      title: "Discovery",
      description: "We learn how the business works today, where the friction is, and what a better outcome looks like.",
    },
    {
      num: "02",
      title: "Planning",
      description: "We shape the structure, decide what matters first, and set a practical path to a strong first release.",
    },
    {
      num: "03",
      title: "Development",
      description: "We design, build, connect, and refine the system so it feels polished in use and stable behind the scenes.",
    },
    {
      num: "04",
      title: "Launch and Support",
      description: "We launch carefully, fix what needs attention, and support the handoff so the result keeps working after go-live.",
    },
  ],
  ar: [
    {
      num: "01",
      title: "الاستكشاف",
      description: "نفهم كيف يعمل نشاطك اليوم، وأين تكمن نقاط التعطل، وما النتيجة التي تعتبرها نجاحًا.",
    },
    {
      num: "02",
      title: "التخطيط",
      description: "نضع الهيكل، ونحدد الأولويات، ونرسم أقصر طريق إلى إصدار أول قوي.",
    },
    {
      num: "03",
      title: "التطوير",
      description: "نصمم ونبني ونربط الأنظمة ونحسّنها، ليكون المنتج سلسًا في الاستخدام ومستقرًا من الداخل.",
    },
    {
      num: "04",
      title: "الإطلاق والدعم",
      description: "نطلق المشروع بعناية، ونعالج ما يحتاج إلى تحسين، ونواصل الدعم ليستمر النجاح بعد التسليم.",
    },
  ],
};

// Direct, self-contained answers: shown on the home page and published as FAQPage structured data.
export const COMPANY_FAQ = {
  en: [
    {
      q: "What does Queue Solutions do?",
      a: "Queue Solutions is a software and AI studio based in Egypt. We build websites, mobile apps, custom business systems, AI automation, and AI call agents, and we provide IT services for businesses in Egypt and the Gulf.",
    },
    {
      q: "Which countries does Queue Solutions work with?",
      a: "We are based in Egypt and work with businesses across Egypt and the Gulf, including Saudi Arabia, the UAE, Kuwait, and Qatar. Projects run remotely, in Arabic or English.",
    },
    {
      q: "Do you build Arabic websites and apps?",
      a: "Yes. We build Arabic-first, right-to-left websites and systems as well as English and bilingual ones. Glowmia, Queue POS, and MolarBear all work in Arabic.",
    },
    {
      q: "What AI solutions can you build for my business?",
      a: "We build AI that answers customers on WhatsApp with one-click human takeover, AI call agents that answer the phone and capture leads, AI assistants inside websites, and automation for follow-up, reminders, and admin work.",
    },
    {
      q: "Do you sell ready-made software?",
      a: "Yes. Queue POS is a restaurant and café management system for a one-time EGP 20,000 with no monthly fees. MolarBear is dental clinic software with plans from EGP 15,000 per year. Both run on Windows in Arabic and English.",
    },
    {
      q: "How much does a custom project cost?",
      a: "It depends on the scope. Send us the details by WhatsApp, email, or the project form and we reply within 24 hours with a clear recommendation. We also offer a free digital audit of your website or social pages.",
    },
    {
      q: "How do I start a project with Queue Solutions?",
      a: "Message us on WhatsApp at +20 11 27435060, email queuesolutions25@gmail.com, or fill in the project form. Every project follows four steps: discovery, planning, development, then launch and support.",
    },
  ],
  ar: [
    {
      q: "ماذا تقدم Queue Solutions؟",
      a: "Queue Solutions شركة برمجيات وذكاء اصطناعي مقرها مصر. نصمم المواقع الإلكترونية وتطبيقات الجوال والأنظمة المخصصة، ونبني حلول الأتمتة ووكلاء المكالمات بالذكاء الاصطناعي، ونقدم خدمات تقنية المعلومات للشركات في مصر والخليج.",
    },
    {
      q: "في أي دول تعمل Queue Solutions؟",
      a: "مقرنا في مصر، ونعمل مع الشركات في مصر ودول الخليج، ومنها السعودية والإمارات والكويت وقطر. ندير المشاريع عن بُعد بالعربية أو الإنجليزية.",
    },
    {
      q: "هل تصممون مواقع وتطبيقات باللغة العربية؟",
      a: "نعم. نبني مواقع وأنظمة عربية أولًا تدعم الكتابة من اليمين إلى اليسار، إلى جانب المواقع الإنجليزية وثنائية اللغة. Glowmia وQueue POS وMolarBear تعمل جميعها بالعربية.",
    },
    {
      q: "ما حلول الذكاء الاصطناعي التي يمكنكم بناؤها لنشاطي؟",
      a: "نبني ذكاءً اصطناعيًا يرد على العملاء عبر واتساب مع إمكانية تحويل المحادثة إلى موظف بضغطة، ووكلاء مكالمات يردون على الهاتف ويسجلون بيانات العملاء، ومساعدين أذكياء داخل المواقع، وأتمتة للمتابعة والتذكيرات والمهام الإدارية.",
    },
    {
      q: "هل لديكم برامج جاهزة؟",
      a: "نعم. Queue POS نظام لإدارة المطاعم والكافيهات بسعر 20,000 جنيه مرة واحدة دون اشتراك شهري، وMolarBear برنامج لإدارة عيادات الأسنان بباقات تبدأ من 15,000 جنيه سنويًا. يعمل كلاهما على ويندوز بالعربية والإنجليزية.",
    },
    {
      q: "كم تكلفة المشروع المخصص؟",
      a: "تعتمد التكلفة على حجم المشروع. أرسل لنا التفاصيل عبر واتساب أو البريد الإلكتروني أو نموذج المشروع، وسنرد خلال 24 ساعة بتوصية واضحة. كما نقدم تقييمًا رقميًا مجانيًا لموقعك أو صفحاتك على السوشيال ميديا.",
    },
    {
      q: "كيف أبدأ مشروعًا مع Queue Solutions؟",
      a: "راسلنا على واتساب ‎+20 11 27435060، أو عبر البريد queuesolutions25@gmail.com، أو املأ نموذج المشروع. يمر كل مشروع بأربع مراحل: الاستكشاف، ثم التخطيط، ثم التطوير، ثم الإطلاق والدعم.",
    },
  ],
};

export const FAQ_TITLE = { en: "Frequently asked questions", ar: "الأسئلة الشائعة" };
