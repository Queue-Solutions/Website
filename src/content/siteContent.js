import aiAutomationsImage from "../../images/ai-automations.png";
import aiCallAgentImage from "../../images/Ai-Call-Agent.jpg";
import webDesignStockImage from "../../images/web-design-stock.png";

const sharedImages = {
  homeTech: webDesignStockImage,
  homeAi: aiAutomationsImage,
  officeOne: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
  officeTwo: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
  teamOne: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1200&q=80",
  servicesHero: "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1400&q=80",
  serviceAi: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80",
  serviceCallAgent: aiCallAgentImage,
  serviceMobile: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=80",
  serviceWeb: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
  serviceSystem: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1200&q=80",
  serviceModel: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80",
  serviceIt: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
  automationWorkflow: aiAutomationsImage,
  portfolioGlowmia: "https://glowmia.vercel.app/dresses/covers/dress-7-cover.png",
  portfolioAcSystem: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
  portfolioDiamond: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1200&q=80",
  creativeOffice: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1400&q=80",
  processHero: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1400&q=80",
  processCta: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1400&q=80",
  contactHero: "https://images.unsplash.com/photo-1516321165247-4aa89a48be28?auto=format&fit=crop&w=1400&q=80",
  contactCta: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1400&q=80",
};

export const SITE_CONTENT = { 
  en: {
    locale: "en",
    direction: "ltr",
    navItems: [
      { id: "home", label: "Home" },
      { id: "services", label: "Services" },
      { id: "portfolio", label: "Portfolio" },
      { id: "process", label: "Process" },
      { id: "contact", label: "Contact" },
    ],
    socialLinks: [
      { id: "instagram", label: "Instagram", href: "https://www.instagram.com/queue.solutions/" },
      { id: "facebook", label: "Facebook", href: "https://www.facebook.com/profile.php?id=61585024646035" },
    ],
    siteDetails: {
      name: "Queue Solutions",
      email: "queuesolutions25@gmail.com",
      whatsappNumber: "(+20 11 27435060)",
      whatsappHref: "https://wa.me/201127435060",
      tagline: "Websites, systems, and AI that help businesses grow",
      shortTagline: "Web, systems, and AI for modern brands",
      description:
        "Queue Solutions helps businesses present themselves more credibly online, run more smoothly behind the scenes, and reduce repetitive work with practical automation.",
    },
    ui: {
      startProject: "Start Project",
      contactUs: "Contact Us",
      viewPortfolio: "See Our Work",
      ourServices: "Our Services",
      discussService: "Talk About This Service",
      beginProject: "Start the Process",
      languageToggle: "العربية",
      languageToggleMobile: "Arabic (Egypt)",
      footerNavigate: "Navigate",
      footerConnect: "Connect",
      footerSummary: "Websites, systems, and AI for modern brands.",
      footerRights: "All rights reserved.",
      modal: {
        eyebrow: "Project Inquiry",
        title: "Tell us what you need help with",
        description:
          "Tell us what your business does, what is slowing you down, and what you want this project to improve.",
        name: "Your full name",
        businessName: "Business name",
        email: "Email (optional)",
        phone: "Phone number",
        whatsappQuestion: "Is this number on WhatsApp?",
        whatsappYes: "Yes, it has WhatsApp",
        whatsappYesHint: "We can reach you faster there if needed.",
        whatsappNo: "No, regular calls only",
        whatsappNoHint: "We will use normal calls and email instead.",
        whatsappRequired: "Choose whether this number has WhatsApp.",
        emailInvalid: "Enter a valid email address.",
        phoneInvalid: "Enter a valid phone number.",
        idea: "Project idea",
        cancel: "Cancel",
        submit: "Send Details",
        success: "Thank you. Your inquiry has been sent successfully.",
        successTitle: "Your form has been sent",
        successDescription: "Our team will review your details and reply within the next 24 hours.",
        successButton: "Close",
        emailSubject: "New Project Inquiry from",
        emailBodyTitle: "New Project Inquiry",
        emailName: "Name",
        emailEmail: "Email",
        emailPhone: "Phone",
        emailIdea: "Project Idea",
        notProvided: "Not provided",
      },
      contactCards: {
        emailTitle: "Business email",
        emailAction: "We usually reply after reviewing the form",
        whatsappTitle: "WhatsApp",
        whatsappAction: "Message us directly",
        formTitle: "Start with the form",
        formBody: "Share the main project details and we will contact you directly.",
        formAction: "Open project form",
      },
      contactWhy: "Why Businesses Contact Us",
      processSteps: "How the Work Moves",
      capabilities: "Capabilities",
      whyQueue: "Why Businesses Choose Queue",
      nextProject: "Your Next Project",
      readyToBegin: "Ready to Start?",
      getInTouch: "Let's Talk",
      resultLabel: "Result",
      visitProject: "Visit project",
    },
    home: {
      heroBadge: "Modern websites, systems, and AI workflows for growing businesses",
      heroTitleTop: "Where Your Ideas Come True",
      heroMobileTitleTop: "Where Your Ideas Come True",
      heroMobileDescription: "We design clean digital experiences, internal systems, and AI automations that make your business look sharper and run faster.",
      heroTitleAccent: "Queue Solutions",
      heroDescription: "One Place For All Your Technical Needs",
      heroCards: [
        { title: "Websites", description: "Clear, polished websites that build trust and turn interest into real inquiries." },
        { title: "Systems", description: "Simple dashboards and tools that help teams stay aligned and work with less friction." },
        { title: "AI Automations", description: "We handle follow-up, reminders, and repeated admin so your team can focus on the business." },
      ],
      sections: [
        {
          eyebrow: "",
          title: "Website Design ",
          mobileTitle: "A website that builds trust fast",
          mobileDescription: "Clear structure and strong messaging help people trust the business faster.",
          description:
            "The Perfect landing page for your business should make it easy for visitors to understand what you offer, why it matters, and how to take the next step",
          image: sharedImages.homeTech,
          imageAlt: "Premium workspace with laptop and code",
          points: [
            { title: "Clean design", description: "Clean and modern design that makes the website visually appealing and easy to navigate." },
            { title: "Functionality", description: "Fast, responsive, and reliable performance that ensures a smooth user experience on all devices." },
          ],
        },
        {
          eyebrow: "Enforce Your Buisness With AI",
          title: "We build AI automations that handles the routine work, so you can focus on growing the business",
          mobileTitle: "AI automations handles the routine work",
          mobileDescription: "Automation handles follow-up, reminders, and routing so your team can focus on growth.",
          description:
            "why do the repetitive tasks when you can have them handled automatically? We build AI automations that keep the work moving in the background, so your team can focus on clients, delivery, and growth instead of busywork.",
          image: sharedImages.homeAi,
          imageAlt: "Futuristic AI workflow screen",
          tags: ["Automated replies", "API Integrations", "Chatbots & AI Assistants", "Workflow Automation"],
        },
      ],
      gallery: {
        eyebrow: "Custome Operation systems and dashboards",
        title: "Professional, effective systems that makes the work feel easier",
        mobileTitle: "Professional and easy to trust",
        mobileDescription: "The design should feel organized, current, and ready for serious work.",
        description:
          "We design custom digital systems and dashboards that help business owners manage their operations, track performance, and make smarter decisions. Our solutions are built specifically for your business to streamline workflows, organize data, and provide real-time insights in one powerful platform..",
        images: [
          { src: sharedImages.officeOne, alt: "Software team working across laptops in a product session" },
          { src: sharedImages.officeTwo, alt: "Business intelligence dashboard with charts and metrics" },
          { src: sharedImages.teamOne, alt: "Engineering team collaborating on software delivery" },
        ],
      },
    },
    services: {
      hero: {
        eyebrow: "",
        title: "We provide practical, polished solutions that elevate your business",
        mobileTitle: "Websites, systems, and automations",
        mobileDescription: "We help businesses look stronger and waste less time on repeated work.",
        description:
          "We help businesses look sharper, work faster, and stop losing time on the repeated tasks that should already be handled.",
        image: sharedImages.servicesHero,
        imageAlt: "Digital strategy team collaborating around a laptop",
      },
      automationHighlight: {
        eyebrow: "Let automation carry the routine",
        title: "We make the repeated work run on its own, so your head stays free for growth, service, and better ideas",
        mobileTitle: "Routine work runs itself",
        description:
          "Instead of your team replying manually, chasing people, copying details between tools, or updating the same task over and over, we build automation that keeps those steps moving in the background.",
        mobileDescription:
          "Replies, follow-up, reminders, and handoffs keep moving automatically while your team focuses on real work.",
        note:
          "You focus on clients, delivery, strategy, and growing the business. We make the repeated work stop stealing attention.",
        mobileNote: "Less busywork. More time for growth.",
        chips: ["Reply faster", "Follow up automatically", "Reduce admin work", "Keep work moving"],
        image: sharedImages.automationWorkflow,
        imageAlt: "Workflow dashboard showing automated reporting and team activity",
        points: [
          {
            title: "New leads hear back right away",
            description: "The moment someone fills a form, they can receive a reply and the right next step before interest drops.",
          },
          {
            title: "Follow-up happens without chasing",
            description: "Reminders, check-ins, and routine updates can be sent automatically instead of depending on memory.",
          },
          {
            title: "The right person gets the task",
            description: "Requests can be sorted and sent to sales, operations, or support with the right details already attached.",
          },
          {
            title: "Your team gets its time back",
            description: "Less copy-paste work and fewer repeated checks means more room for delivery, sales, and creative thinking.",
          },
        ],
      },
      callAgentHighlight: {
        eyebrow: "AI call agent",
        title: "Turn missed calls into new clients with an AI agent that answers, explains, and captures the lead",
        mobileTitle: "Never miss a valuable call",
        description:
          "When someone calls and your team is busy, the opportunity should not disappear. We build AI call agents that answer instantly, explain your service clearly, collect the caller's details, and pass the conversation to your team.",
        mobileDescription:
          "The AI agent answers fast, explains your service, and sends your team the important details.",
        note:
          "The goal is simple: fewer missed opportunities, faster response, and a smoother first impression for every caller.",
        mobileNote: "Missed calls become real opportunities.",
        chips: ["Answers instantly", "Explains the service", "Captures lead details", "Reduces missed opportunities"],
        image: sharedImages.serviceCallAgent,
        imageAlt: "AI call agent interface with voice support visuals",
        points: [
          {
            title: "Missed calls stop turning into lost leads",
            description: "The call gets answered even when your team is unavailable, so potential clients are not left waiting.",
          },
          {
            title: "The service is explained clearly",
            description: "The agent can answer common questions, explain the offer, and guide the caller to the right next step.",
          },
          {
            title: "Your team receives the important details",
            description: "Names, phone numbers, service interest, and call context can all be captured automatically.",
          },
          {
            title: "It feels faster and more professional",
            description: "A quick response on the first call builds trust and makes the business feel organized from the start.",
          },
        ],
      },
      services: [
        {
          title: "AI Automations",
          icon: "brain",
          description:
            "Perfect for the repeated work businesses do every day: lead replies, follow-up, reminders, handoffs, and admin updates.",
          image: sharedImages.serviceAi,
        },
        {
          title: "AI Call Agent",
          icon: "headset",
          description:
            "An AI voice agent that answers calls, handles common questions, captures lead details, and helps turn missed calls into new clients.",
          image: sharedImages.serviceCallAgent,
        },
        {
          title: "Mobile App Development",
          icon: "mobile",
          description:
            "Mobile apps built for customers or internal teams, with clean flows, solid performance, and a product feel that matches the brand.",
          image: sharedImages.serviceMobile,
        },
        {
          title: "Website Building",
          icon: "globe",
          description:
            "We build websites that feel credible, load cleanly, and help visitors understand the value quickly.",
          image: sharedImages.serviceWeb,
        },
        {
          title: "System Design",
          icon: "cogs",
          description:
            "We create internal tools and dashboards that give your team one clear place to track work, data, and decisions.",
          image: sharedImages.serviceSystem,
        },
        {
          title: "IT Services",
          icon: "code",
          description:
            "We support the technical setup behind the work so your tools stay stable, connected, and easier to manage.",
          image: sharedImages.serviceIt,
        },
      ],
      capabilitiesTitle: "One partner for the customer-facing side and the operational side",
      capabilitiesMobileTitle: "One partner across the business",
      capabilitiesMobileDescription: "The site, system, and automation should all work together.",
      capabilitiesDescription:
        "The website, the workflow, and the internal system should feel like parts of the same business, not separate projects.",
      reasonsTitle: "Why businesses choose Queue",
      reasonsMobileTitle: "Why businesses choose us",
      reasonsMobileDescription: "The work has to look strong and solve a real business problem.",
      reasonsDescription:
        "We keep the work practical. The design needs to look strong, but it also needs to solve something real.",
      reasons: [
        {
          title: "We start with the business problem",
          description: "Before we talk about features, we ask what is slowing the business down and what a better result should look like.",
        },
        {
          title: "We care about how it feels to use",
          description: "Strong design is not decoration. It makes the product easier to trust, easier to understand, and easier to use.",
        },
        {
          title: "We choose useful technology",
          description: "The stack should support the goal. We use modern tools where they create speed, clarity, and reliability.",
        },
        {
          title: "We stay involved through delivery",
          description: "Strategy, design, build, launch, and refinement happen in one connected process instead of being passed around.",
        },
      ],
    },
    portfolio: {
      hero: {
        eyebrow: "Featured Work",
        title: "A closer look at the kind of work we help businesses launch",
        mobileTitle: "A look at the work",
        mobileDescription: "Examples of work that balance presentation, operations, and real business value.",
        description:
          "These examples show the balance we care about most: strong presentation, smoother operations, and outcomes the business can feel.",
      },
      projects: [
        {
          title: "Glowmia",
          category: "Fashion Store",
          description:
            "An Arabic-first boutique storefront with sizes, cart, and a full dress archive. Alongside it runs a styling assistant that answers questions about fit and occasion, compares pieces side by side, and helps a shopper settle on one dress instead of leaving with none.",
          image: sharedImages.portfolioGlowmia,
          result: "Styling help at any hour",
          href: "https://glowmia.vercel.app/",
          linkLabel: "glowmia.vercel.app",
        },
        {
          title: "Maison DIA",
          category: "AI Design Agent",
          description:
            "A private design studio for a jeweller. A client describes the piece they have in mind, or uploads a reference, and the agent works through stone, metal, and silhouette until there is a brief the workshop can quote from.",
          image: sharedImages.portfolioDiamond,
          result: "Enquiries arrive ready to price",
          href: "https://diamond-design-ai.vercel.app/",
          linkLabel: "diamond-design-ai.vercel.app",
        },
        {
          title: "AC Service Management System",
          category: "Desktop Software",
          description:
            "A Windows desktop system for an air conditioning company covering customers, the units under contract, technician job cards, and invoicing. It runs on the office machines the team already has and keeps working when the connection drops.",
          image: sharedImages.portfolioAcSystem,
          result: "One record per customer and unit",
        },
      ],
      cta: {
        eyebrow: "Your Next Project",
        title: "If you want work that feels sharp and makes sense, this is the standard",
        mobileTitle: "This is the standard",
        mobileDescription: "The goal is simple: clear, credible work that feels well run.",
        description:
          "The goal is not to make things look expensive. The goal is to make the business feel clear, credible, and well run.",
        image: sharedImages.creativeOffice,
        imageAlt: "Digital strategy team discussing a project",
      },
    },
    process: {
      hero: {
        eyebrow: "How We Work",
        title: "A clear process that keeps momentum without losing quality",
        mobileTitle: "A process that stays clear",
        mobileDescription: "You always know what we are doing, what comes next, and why it matters.",
        description:
          "You always know what we are doing, what comes next, and what the work is meant to improve.",
        image: sharedImages.processHero,
        imageAlt: "Project planning session",
        cards: [
          { title: "Clarity", text: "Everyone knows the goal before the build starts." },
          { title: "Momentum", text: "The work keeps moving without unnecessary detours." },
          { title: "Care", text: "Design and implementation stay aligned from start to finish." },
        ],
      },
      stepsTitle: "From first conversation to launch, the work stays clear",
      stepsMobileTitle: "From first call to launch",
      steps: [
        {
          num: "01",
          title: "Discovery",
          description:
            "We learn how the business works today, where the friction is, and what a better outcome should look like.",
        },
        {
          num: "02",
          title: "Planning",
          description:
            "We shape the structure, decide what matters first, and set a practical path to a strong first release.",
        },
        {
          num: "03",
          title: "Development",
          description:
            "We design, build, connect, and refine the system so it feels polished in use and stable behind the scenes.",
        },
        {
          num: "04",
          title: "Launch and Support",
          description:
            "We launch carefully, fix what needs attention, and support the handoff so the result keeps working after go-live.",
        },
      ],
      cta: {
        eyebrow: "Ready to Start?",
        title: "A good process matters because it protects the result",
        mobileTitle: "The process protects the result",
        mobileDescription: "A calm, well-run process leads to a stronger result.",
        description:
          "If the site feels calm and polished, the work behind it should feel the same way too.",
        image: sharedImages.processCta,
        imageAlt: "Product team planning a technical rollout",
      },
    },
    contact: {
      hero: {
        eyebrow: "Let's Talk",
        title: "Tell us what you want to improve",
        mobileTitle: "Tell us what to improve",
        mobileDescription: "Share the essentials and we will come back with the right next step.",
        description:
          "If you need a better website, a clearer internal system, or smarter automation, send the essentials and we will come back with the right next step.",
        image: sharedImages.contactHero,
        imageAlt: "Team collaboration around a table",
      },
      whyTitle: "A useful first conversation, not a sales script",
      reasons: [
        "Clear advice based on where the business is today",
        "A realistic recommendation for the highest-impact next move",
        "A project direction that fits both the brand and the way the team works",
      ],
      cta: {
        eyebrow: "Project Brief",
        title: "Send the essentials and we will take it from there",
        mobileTitle: "Send the essentials",
        mobileDescription: "You do not need a perfect brief. Just send the important parts.",
        description:
          "You do not need a perfect brief. Just tell us what you do, what is frustrating right now, and what kind of result you want.",
        image: sharedImages.contactCta,
        imageAlt: "Software team collaborating in a technology office",
      },
    },
  },
  ar: {
    locale: "ar",
    direction: "rtl",
    navItems: [
      { id: "home", label: "الرئيسية" },
      { id: "services", label: "الخدمات" },
      { id: "portfolio", label: "الأعمال" },
      { id: "process", label: "الخطوات" },
      { id: "contact", label: "تواصل معنا" },
    ],
    socialLinks: [
      { id: "instagram", label: "إنستجرام", href: "https://www.instagram.com/queue.solutions/" },
      { id: "facebook", label: "فيسبوك", href: "https://www.facebook.com/profile.php?id=61585024646035" },
    ],
    siteDetails: {
      name: "Queue Solutions",
      email: "queuesolutions25@gmail.com",
      tagline: "مواقع إلكترونية وأنظمة وأتمتة بالذكاء الاصطناعي",
      shortTagline: "مواقع وأنظمة وذكاء اصطناعي لعلامات عصرية",
      description:
        "Queue Solutions بتساعد الشركات تبان أوضح وأقوى أونلاين، وتشتغل بسلاسة من جوه، وتقلل الشغل المتكرر بأتمتة عملية.",
    },
    ui: {
      startProject: "ابدأ مشروعك",
      contactUs: "كلمنا",
      viewPortfolio: "شوف شغلنا",
      ourServices: "خدماتنا",
      discussService: "اتكلم في الخدمة دي",
      beginProject: "ابدأ مشروعك",
      languageToggle: "English",
      languageToggleMobile: "الإنجليزية",
      footerNavigate: "التنقل",
      footerConnect: "تواصل",
      footerSummary: "مواقع وأنظمة وذكاء اصطناعي لعلامات عصرية.",
      footerRights: "جميع الحقوق محفوظة.",
      modal: {
        eyebrow: "ابدأ مشروعك",
        title: "احك لنا ما الذي تريد بناءه",
        description: "شاركنا الفكرة والهدف التجاري وكل ما يساعدنا على فهم المشروع بشكل أفضل.",
        name: "اسمك الكامل",
        businessName: "اسم الشركة",
        email: "البريد الإلكتروني (اختياري)",
        phone: "رقم الهاتف",
        whatsappQuestion: "هل هذا الرقم عليه واتساب؟",
        whatsappYes: "نعم، عليه واتساب",
        whatsappYesHint: "يمكننا التواصل أسرع من خلاله عند الحاجة.",
        whatsappNo: "لا، مكالمات عادية فقط",
        whatsappNoHint: "سنعتمد على المكالمات العادية والبريد الإلكتروني.",
        whatsappRequired: "اختر هل هذا الرقم عليه واتساب أم لا.",
        emailInvalid: "أدخل بريدًا إلكترونيًا صحيحًا.",
        phoneInvalid: "أدخل رقم هاتف صحيحًا.",
        idea: "فكرة المشروع",
        cancel: "إلغاء",
        submit: "إرسال الطلب",
        success: "شكرًا لك. تم إرسال طلبك بنجاح.",
        successTitle: "تم إرسال النموذج بنجاح",
        successDescription: "سيقوم فريقنا بمراجعة التفاصيل والرد عليك خلال الـ 24 ساعة القادمة.",
        successButton: "إغلاق",
        emailSubject: "طلب مشروع جديد من",
        emailBodyTitle: "طلب مشروع جديد",
        emailName: "الاسم",
        emailEmail: "البريد الإلكتروني",
        emailPhone: "الهاتف",
        emailIdea: "فكرة المشروع",
        notProvided: "غير متوفر",
      },
      contactCards: {
        emailTitle: "البريد الرسمي",
        emailAction: "سنرد عليك بعد إرسال النموذج",
        formTitle: "ابدأ من النموذج",
        formBody: "أرسل أهم تفاصيل المشروع وسنتواصل معك مباشرة.",
        formAction: "افتح نموذج المشروع",
      },
      contactWhy: "لماذا تتواصل معنا",
      processSteps: "خطوات العمل",
      capabilities: "القدرات",
      whyQueue: "لماذا Queue Solutions",
      nextProject: "المشروع القادم",
      readyToBegin: "جاهز تبدأ؟",
      getInTouch: "خلينا نتكلم",
      resultLabel: "النتيجة",
      visitProject: "زور المشروع",
    },
    home: {
      heroBadge: "مواقع وأنظمة وأتمتة ذكية للشركات اللي عايزة تكبر",
      heroTitleTop: "هنا فكرتك بتتحول لحقيقة",
      heroMobileTitleTop: "هنا فكرتك بتتحول لحقيقة",
      heroTitleAccent: "Queue Solutions",
      heroDescription: "مكان واحد لكل احتياجاتك التقنية",
      heroCards: [
        { title: "المواقع", description: "مواقع واضحة ومظبوطة تكسب ثقة الزائر وتحوّل اهتمامه لطلب حقيقي." },
        { title: "الأنظمة", description: "لوحات وأدوات بسيطة تخلي الفريق شغال على نفس الصفحة وبأقل لخبطة." },
        { title: "الأتمتة الذكية", description: "إحنا بناخد المتابعة والتذكيرات والشغل الإداري المتكرر، وانت تركّز على نشاطك." },
      ],
      sections: [
        {
          eyebrow: "تصميم المواقع",
          title: "موقع يخلي الزائر يثق فيك من أول دقيقة",
          mobileTitle: "موقع يكسب ثقة الزائر بسرعة",
          description:
            "الصفحة الكويسة بتوصّل للزائر إنت بتقدم إيه، وليه ده يهمه، وإيه الخطوة اللي بعدها — من غير ما يدوّر أو يتلخبط.",
          mobileDescription: "بنية واضحة ورسالة مباشرة تخلي الزائر يثق فيك بسرعة.",
          image: sharedImages.homeTech,
          imageAlt: "مساحة عمل احترافية مع لابتوب وكود",
          points: [
            { title: "تصميم نظيف", description: "شكل مرتب وعصري، سهل إن أي حد يتنقل فيه من غير مجهود." },
            { title: "أداء حقيقي", description: "سرعة وثبات وتجربة مريحة على الموبايل زي الكمبيوتر بالظبط." },
          ],
        },
        {
          eyebrow: "قوّي شغلك بالذكاء الاصطناعي",
          title: "أتمتة بتشيل عنك الشغل الروتيني عشان تركّز على تكبير النشاط",
          mobileTitle: "الأتمتة تشيل عنك الشغل الروتيني",
          description:
            "ليه الفريق يعيد نفس الخطوات كل يوم وهي ممكن تتعمل لوحدها؟ بنبني أتمتة تمشّي الشغل في الخلفية — رد على العميل، متابعة، تذكيرات، وتحويل الطلب للشخص الصح — والفريق يفضى للعملاء والتنفيذ.",
          mobileDescription: "المتابعة والتذكيرات وتحويل الطلبات تمشي لوحدها، والفريق يفضى للنمو.",
          image: sharedImages.homeAi,
          imageAlt: "واجهة عمل مستقبلية للذكاء الاصطناعي",
          tags: ["ردود تلقائية", "ربط الأنظمة", "شات بوت ومساعدين أذكياء", "أتمتة سير العمل"],
        },
      ],
      gallery: {
        eyebrow: "أنظمة ولوحات تحكم مخصصة",
        title: "أنظمة محترمة بتخلي الشغل أسهل فعلًا",
        mobileTitle: "أنظمة بتخلي الشغل أسهل",
        description: "بنبني الأداة على طريقة شغلك انت، مش العكس: بيانات في مكان واحد، وشاشات مرتبة، وكل واحد في الفريق عارف هو عايز إيه منها.",
        mobileDescription: "بيانات في مكان واحد وشاشات مرتبة على طريقة شغلك انت.",
        images: [
          { src: sharedImages.officeOne, alt: "فريق استراتيجية رقمية يراجع خطة المشروع" },
          { src: sharedImages.officeTwo, alt: "لوحة تحليلات أعمال لدعم القرار" },
          { src: sharedImages.teamOne, alt: "فريق أعمال يناقش استراتيجية رقمية" },
        ],
      },
    },
    services: {
      hero: {
        eyebrow: "خدماتنا",
        title: "مواقع وأنظمة وأتمتة تشيل الضغط عن فريقك",
        mobileTitle: "شغل يشيل الضغط عن فريقك",
        description:
          "بنساعد الشركات تبان أقوى، وتشتغل أسرع، وتبطل تضيّع وقتها في شغل متكرر المفروض يمشي لوحده.",
        mobileDescription: "تبان أقوى، تشتغل أسرع، وتبطل تضيّع وقت في شغل متكرر.",
        image: sharedImages.servicesHero,
        imageAlt: "فريق استراتيجية رقمية يتعاون حول لابتوب",
      },
      automationHighlight: {
        eyebrow: "سيب الروتين للأتمتة",
        title: "خلي الشغل المتكرر يمشي لوحده، وسيب دماغك للنمو والعملاء والأفكار",
        mobileTitle: "خلي الشغل المتكرر يمشي لوحده",
        description:
          "بدل ما الفريق يرد بإيده ويجري ورا العملاء وينقل البيانات من أداة لأداة ويعيد نفس الخطوات كل يوم، بنبني أتمتة تحرّك ده كله في الخلفية.",
        mobileDescription: "بدل ما الفريق يعيد نفس الخطوات كل يوم، الأتمتة تمشيها في الخلفية.",
        note:
          "انت تركّز على العملاء والتنفيذ والاستراتيجية، واحنا نخلي الشغل المتكرر يبطل ياكل من تركيزك.",
        chips: ["رد أسرع", "متابعة تلقائية", "شغل إداري أقل", "الشغل مايقفش"],
        image: sharedImages.automationWorkflow,
        imageAlt: "لوحة تدفق عمل تعرض تقارير وأتمتة وأنشطة الفريق",
        points: [
          {
            title: "العميل الجديد يلاقي رد على طول",
            description: "أول ما يملا النموذج، توصله رسالة واضحة وخطوة تانية قبل ما اهتمامه يبرد.",
          },
          {
            title: "متابعة من غير ما تجري ورا حد",
            description: "التذكيرات ورسائل المتابعة وتحديثات الحالة تتبعت لوحدها، مش مستنية حد يفتكر.",
          },
          {
            title: "الطلب يروح للشخص الصح",
            description: "الطلبات تتفرز وتتحول للمبيعات أو التشغيل أو الدعم، وكل المعلومات المهمة معاها.",
          },
          {
            title: "الفريق يرجّع وقته",
            description: "نسخ المعلومات والمراجعات المتكررة تقل، والوقت يروح للبيع والتنفيذ والتفكير.",
          },
        ],
      },
      callAgentHighlight: {
        eyebrow: "وكيل مكالمات ذكي",
        title: "حوّل المكالمات اللي بتروح عليك لعملاء، بوكيل يرد ويشرح ويجمع بيانات العميل",
        mobileTitle: "المكالمة اللي بتروح عليك تبقى عميل",
        description:
          "لما العميل يتصل والفريق مشغول، الفرصة مالهاش لازمة تضيع. بنبني وكلاء مكالمات بالذكاء الاصطناعي يردوا على طول، ويشرحوا الخدمة بوضوح، ويجمعوا البيانات المهمة، وبعدين يسلّموها لفريقك.",
        mobileDescription: "وكيل يرد على المكالمة وقت ما الفريق مشغول، ويسلّم البيانات لفريقك.",
        note:
          "الهدف واضح: فرص ضايعة أقل، ورد أسرع، وانطباع أول محترم مع كل مكالمة.",
        chips: ["يرد على طول", "يشرح الخدمة", "يجمع بيانات العميل", "فرص ضايعة أقل"],
        image: sharedImages.serviceCallAgent,
        imageAlt: "واجهة وكيل مكالمات ذكي مع عناصر دعم صوتي",
        points: [
          {
            title: "المكالمة اللي بتروح عليك متضيعش",
            description: "المكالمة بيتم الرد عليها حتى لو الفريق مش فاضي، والعميل ما يتسابش من غير رد.",
          },
          {
            title: "الخدمة بتتشرح صح",
            description: "الوكيل يرد على الأسئلة المتكررة، ويشرح الخدمة، ويوجّه المتصل للخطوة اللي بعدها.",
          },
          {
            title: "فريقك يستلم التفاصيل المهمة",
            description: "الاسم والرقم واهتمام العميل وسياق المكالمة بيتجمعوا لوحدهم.",
          },
          {
            title: "انطباع أول محترم",
            description: "الرد السريع من أول مكالمة بيخلي نشاطك يبان منظم وجاهز لشغل جاد.",
          },
        ],
      },
      services: [
        {
          title: "أتمتة الذكاء الاصطناعي",
          icon: "brain",
          description: "مظبوطة للشغل اللي بيتكرر كل يوم: الرد على العملاء، والمتابعة، والتذكيرات، والتحويلات الداخلية، وتحديثات الإدارة.",
          image: sharedImages.serviceAi,
        },
        {
          title: "وكيل مكالمات ذكي",
          icon: "headset",
          description: "وكيل صوتي يرد على المكالمات، ويشرح الخدمة، ويجمع بيانات العميل، ويحوّل المكالمة اللي كانت هتضيع لعميل جديد.",
          image: sharedImages.serviceCallAgent,
        },
        {
          title: "تطوير تطبيقات الموبايل",
          icon: "mobile",
          description: "تطبيقات موبايل لعملائك أو لفريقك، بتجربة نضيفة وأداء قوي وإحساس منتج محترم يليق باسمك.",
          image: sharedImages.serviceMobile,
        },
        {
          title: "بناء المواقع",
          icon: "globe",
          description: "مواقع هدفها تجيبلك طلبات فعلًا: شكل قوي، وأداء نضيف، والموبايل أول أولوية.",
          image: sharedImages.serviceWeb,
        },
        {
          title: "بناء الأنظمة",
          icon: "cogs",
          description: "أنظمة تشغيل مفصّلة على شغلك، بتلم البيانات في مكان واحد وتقلل الشغل اليدوي.",
          image: sharedImages.serviceSystem,
        },
        {
          title: "نمذجة الذكاء الاصطناعي",
          icon: "database",
          description: "نماذج تعلم آلي للتوقع والتصنيف ومساعدتك تاخد القرار بأرقام مش بإحساس.",
          image: sharedImages.serviceModel,
        },
        {
          title: "خدمات تقنية المعلومات",
          icon: "code",
          description: "دعم تقدر تعتمد عليه للبنية التحتية وسير الشغل والأنظمة اليومية.",
          image: sharedImages.serviceIt,
        },
      ],
      capabilitiesTitle: "خدمات بتكمّل بعضها، مش قطع متفرقة",
      capabilitiesDescription:
        "الموقع والنظام والأتمتة بيتبنوا وهما شايفين بعض، عشان في الآخر يبانوا حاجة واحدة مش تلات حاجات ملزوقة.",
      reasonsTitle: "شكل محترم وشغل من جوه محترم",
      reasonsDescription: "الواجهة عصرية أيوه، بس التركيز الحقيقي على السرعة والوضوح وإن الحاجة تنفع عمليًا.",
      reasons: [
        { title: "تفكير بعقل صاحب النشاط", description: "كل حاجة بننفذها ليها نتيجة حقيقية وراها، مش شكل حلو وخلاص." },
        { title: "تنفيذ محترم", description: "واجهات نضيفة وتفاعل مظبوط وشغل يكبر معاك من أول يوم." },
        { title: "تقنية حديثة", description: "أدوات سريعة وبنية تستحمل التوسع، وذكاء اصطناعي لما يكون فعلًا مفيد." },
        { title: "معانا لآخر الطريق", description: "من الفكرة للتصميم للتنفيذ للإطلاق وبعده، مسار واحد ومعاك فيه." },
      ],
    },
    portfolio: {
      hero: {
        eyebrow: "أعمال مختارة",
        title: "شغل حقيقي سلّمناه لعملاء حقيقيين",
        mobileTitle: "شغل حقيقي، عملاء حقيقيين",
        description: "كل مشروع هنا وراه هدف واضح: شكل يليق بالعلامة، وتشغيل أسهل، ونتيجة صاحب النشاط يحسّها. اضغط على أي مشروع وشوفه بنفسك.",
        mobileDescription: "كل مشروع هنا وراه هدف واضح. اضغط وشوفه بنفسك.",
      },
      projects: [
        {
          title: "Glowmia",
          category: "متجر أزياء",
          description:
            "متجر إلكتروني بالعربي لبوتيك فساتين، فيه المقاسات والسلة وأرشيف التصاميم كامل. وجنبه مساعِدة تنسيق ذكية ترد على أسئلة المقاس والمناسبة، وتقارن بين القطع، وتساعد العميلة تستقر على اختيار بدل ما تسيب الموقع من غير قرار.",
          image: sharedImages.portfolioGlowmia,
          result: "مساعدة في الاختيار في أي وقت",
          href: "https://glowmia.vercel.app/",
          linkLabel: "glowmia.vercel.app",
        },
        {
          title: "Maison DIA",
          category: "وكيل تصميم ذكي",
          description:
            "استوديو تصميم خاص لمصمم مجوهرات. العميل يوصف القطعة اللي في باله أو يرفع صورة مرجعية، والوكيل يمشي معه في الحجر والمعدن وشكل القطعة لحد ما يخرج بملف تصميم الورشة تقدر تسعّره على طول.",
          image: sharedImages.portfolioDiamond,
          result: "طلبات تصل جاهزة للتسعير",
          href: "https://diamond-design-ai.vercel.app/",
          linkLabel: "diamond-design-ai.vercel.app",
        },
        {
          title: "نظام إدارة خدمة التكييف",
          category: "برنامج سطح مكتب",
          description:
            "نظام ويندوز لشركة تكييفات يغطي العملاء والوحدات اللي تحت العقد وأوامر شغل الفنيين والفواتير. يشتغل على أجهزة المكتب الموجودة فعلًا، ويفضل شغال حتى لو النت وقع.",
          image: sharedImages.portfolioAcSystem,
          result: "كل عميل ووحدة في سجل واحد",
        },
      ],
      cta: {
        eyebrow: "مشروعك القادم",
        title: "لو عايز شغل شكله محترم ويشتغل صح، ده مستوانا",
        mobileTitle: "ده مستوانا في الشغل",
        description: "هدفنا مش إن الشغل يبان غالي. هدفنا إن نشاطك يبان واضح وموثوق ومتدار كويس.",
        mobileDescription: "هدفنا نشاط يبان واضح وموثوق ومتدار كويس.",
        image: sharedImages.creativeOffice,
        imageAlt: "مكتب إبداعي احترافي",
      },
    },
    process: {
      hero: {
        eyebrow: "طريقة شغلنا",
        title: "خطوات واضحة، تعرف فيها احنا فين ورايحين على إيه",
        mobileTitle: "خطوات واضحة من أول يوم",
        description: "مفيش مفاجآت ولا كلام مبهم. في كل مرحلة تعرف احنا بنعمل إيه دلوقتي، وإيه اللي جاي، وده هيحسّن إيه في نشاطك.",
        mobileDescription: "تعرف احنا بنعمل إيه دلوقتي وإيه اللي جاي، من غير مفاجآت.",
        image: sharedImages.processHero,
        imageAlt: "جلسة تخطيط للمشروع",
        cards: [
          { title: "وضوح", text: "الهدف متفق عليه قبل ما إيد تتحط في الشغل." },
          { title: "استمرارية", text: "الشغل ماشي من غير وقفات ولا دوران في اللا شيء." },
          { title: "اهتمام", text: "التصميم والتنفيذ ماشيين مع بعض من الأول للآخر." },
        ],
      },
      stepsTitle: "من أول مكالمة لحد الإطلاق، الصورة واضحة",
      stepsMobileTitle: "من أول مكالمة للإطلاق",
      steps: [
        {
          num: "01",
          title: "الاستكشاف",
          description: "نفهم نشاطك شغال إزاي دلوقتي، وفين بالظبط التعب، والنتيجة اللي تعتبرها نجاح.",
        },
        {
          num: "02",
          title: "التخطيط",
          description: "نرسم الهيكل، ونحدد الأهم قبل المهم، ونحط أقصر طريق لأول نسخة قوية تنزل.",
        },
        {
          num: "03",
          title: "التنفيذ",
          description: "ننفذ التصميم والواجهة والمنطق والأتمتة، وعينّا على الوضوح وإن الشغل يكبر معاك.",
        },
        {
          num: "04",
          title: "الإطلاق والدعم",
          description: "ننزّل المشروع ونفضل نحسّنه وندعمه، عشان ينجح بعد التسليم مش يوم الإطلاق بس.",
        },
      ],
      cta: {
        eyebrow: "جاهز تبدأ؟",
        title: "أحسن خطوات مالهاش لازمة لو مطلعتش نتيجة",
        mobileTitle: "الخطوات مالهاش لازمة من غير نتيجة",
        description: "احنا مش بنبيع خطوات شغل، بنبيع نتيجة تحسها في نشاطك. تعالى نتكلم في اللي محتاجه فعلًا.",
        mobileDescription: "بنبيع نتيجة تحسها في نشاطك، مش خطوات شغل.",
        image: sharedImages.processCta,
        imageAlt: "مساحة عمل احترافية بسيطة",
      },
    },
    contact: {
      hero: {
        eyebrow: "تواصل معنا",
        title: "احكيلنا على نشاطك، وهنقولك من الأول رأينا بصراحة",
        mobileTitle: "احكيلنا، وهنقولك رأينا بصراحة",
        description: "مش لازم تكون حاطط كل حاجة في دماغك. ابعتلنا اللي عندك، ولو شايفين إن فيه طريق أبسط أو أرخص هنقولك عليه.",
        mobileDescription: "ابعتلنا اللي عندك، ولو فيه طريق أبسط هنقولك عليه.",
        image: sharedImages.contactHero,
        imageAlt: "فريق يتعاون حول طاولة",
      },
      whyTitle: "الموقع والنظام وخطة الأتمتة، كلهم في مكالمة واحدة",
      reasons: [
        "ترشيح واضح على قد المرحلة اللي نشاطك فيها دلوقتي",
        "رأي عملي في أسرع خطوة هتفرق معاك فعلًا",
        "اتجاه شغل محترم وواقعي، مش كلام على الورق",
      ],
      cta: {
        eyebrow: "خلينا نتكلم",
        title: "تعالى نعمل حاجة تستاهل",
        mobileTitle: "تعالى نعمل حاجة تستاهل",
        description: "ابعت تفاصيل مشروعك وهنرجعلك بخطوة واضحة تقدر تمشي عليها، حتى لو قررت متشتغلش معانا.",
        mobileDescription: "ابعت تفاصيلك وهنرجعلك بخطوة واضحة تمشي عليها.",
        image: sharedImages.contactCta,
        imageAlt: "مكتب داخلي احترافي",
      },
    },
  },
};
