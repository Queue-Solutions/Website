// Plain data (no Vite imports) so scripts/prerender.mjs can read it at build time too.
// Ready-made products: pricing plans and the copy for their SEO landing pages.

export const LANDING_PAGES = {
  "restaurant-pos-egypt": { productId: "queue-pos", video: "/videos/queue-pos-demo.mp4", poster: "/case-studies/queue-pos-poster.webp", videoOrientation: "landscape" },
  "dental-clinic-software-egypt": { productId: "molarbear", video: "/videos/molarbear-demo.mp4", poster: "/case-studies/molarbear-poster.webp", videoOrientation: "landscape" },
};

export const PRODUCT_LANDING = {
  "queue-pos": "restaurant-pos-egypt",
  molarbear: "dental-clinic-software-egypt",
};

export const PRICING = {
  "queue-pos": [{ id: "lifetime", price: 20000, period: "lifetime", featured: true }],
  molarbear: [
    { id: "essential", price: 15000, period: "year" },
    { id: "professional", price: 22200, period: "year", featured: true },
    { id: "clinic", price: 38400, period: "year" },
  ],
};

// Yearly plans are billed once a year; the site leads with the monthly equivalent.
export function monthlyPrice(plan) {
  return Math.round(plan.price / 12);
}

export const PRODUCT_COPY = {
  en: {
    "restaurant-pos-egypt": {
      seoTitle: "Restaurant POS System in Egypt | Queue POS: EGP 20,000 Lifetime",
      seoDescription:
        "Queue POS is a complete restaurant and café management system for Egypt: cashier, kitchen display, inventory, staff shifts, and branch reports in Arabic and English. One-time price, no monthly fees.",
      eyebrow: "Restaurant POS for Egypt",
      title: "Run your restaurant from one screen, with no monthly subscription",
      description:
        "Queue POS handles the cashier, the kitchen, the stock, the staff, and the reports in one Windows app, in Arabic and English. Pay once and it is yours.",
      priceNote: "One-time payment · lifetime licence",
      videoTitle: "A 90-second tour of Queue POS",
      featuresTitle: "Everything a restaurant needs, already built in",
      features: [
        { title: "Fast table-based POS", text: "Tap a table, add items, split the bill, take cash, card, or wallet, and print an 80mm or 58mm receipt." },
        { title: "Kitchen display", text: "Orders go straight to the kitchen or bar screen and move from Start to Ready to Served." },
        { title: "Inventory that counts itself", text: "Every sale deducts ingredients by recipe, with low-stock alerts and purchase records." },
        { title: "Staff, shifts, and cash-up", text: "PIN sign-in, roles, shift closing, and manager approval when the drawer does not match." },
        { title: "Reports and branches", text: "Sales over time, best-selling items, payment methods, and a view per branch." },
        { title: "Works offline, backs itself up", text: "Runs on one PC without internet, with automatic daily backups and one-click restore." },
      ],
      pricingTitle: "Simple pricing",
      pricingDescription: "No monthly fees and no surprises. Try it free for 14 days before you pay.",
      plans: {
        lifetime: {
          name: "Queue POS",
          audience: "For restaurants, cafés, and cloud kitchens",
          features: [
            "Point of sale, orders, and receipts",
            "Kitchen display and bar routing",
            "Inventory with recipe deduction",
            "Staff roles, PIN sign-in, and shifts",
            "Reports, delivery, and multi-branch",
            "Arabic and English, light and dark themes",
            "14-day free trial before you pay",
          ],
        },
      },
      faq: [
        { q: "Is there a monthly subscription?", a: "No. Queue POS costs EGP 20,000 once, and the licence is yours for life." },
        { q: "Does it need internet?", a: "No. It runs on a Windows PC in your restaurant with a local database, so it keeps working if the connection drops." },
        { q: "Does it support Arabic?", a: "Yes. The whole system, including receipts, works in Arabic and English, and each user can choose their language." },
        { q: "Can I try it first?", a: "Yes. Every installation includes a 14-day free trial. Request a demo and we will set it up with you." },
        { q: "Can I bring my existing menu?", a: "Yes. Import the menu or inventory from a spreadsheet, or even straight from a PDF menu." },
      ],
    },
    "dental-clinic-software-egypt": {
      seoTitle: "Dental Clinic Software in Egypt | MolarBear: Plans from EGP 1,250/month",
      seoDescription:
        "MolarBear is dental clinic management software for Egypt: patients, appointments, dental chart, X-rays, payments, inventory, and doctor commissions. Three plans from EGP 1,250 a month, billed yearly.",
      eyebrow: "Dental clinic software for Egypt",
      title: "The desk and the doctor on one board, and every pound accounted for",
      description:
        "MolarBear manages patients, appointments, treatments, X-rays, payments, and doctor earnings in one Windows app built for how Egyptian clinics really work.",
      priceNote: "Plans from EGP 1,250 a month, billed yearly",
      videoTitle: "A 90-second tour of MolarBear",
      featuresTitle: "Built around a real clinic day",
      features: [
        { title: "Clinic Flow board", text: "Reception sends the patient in, the doctor records the work, and the bill returns to the desk." },
        { title: "Dental chart and X-rays", text: "Chart every tooth and import X-rays straight from NanoPix sensor software." },
        { title: "Appointments", text: "The whole day on one timeline, with every doctor and chair." },
        { title: "Payments and instalments", text: "Itemised receipts, balances, and payments split across open treatments." },
        { title: "Inventory and lab costs", text: "Track materials, reorder in time, and record each lab's charge per case." },
        { title: "Doctor earnings", text: "Each dentist's share calculated automatically after lab and assistant costs." },
      ],
      pricingTitle: "Choose the plan that fits your clinic",
      pricingDescription: "Prices per clinic in Egyptian pounds, billed once a year. Book a demo to see it with your own workflow.",
      plans: {
        essential: {
          name: "Essential",
          audience: "For a solo dentist who mainly needs patient management, appointments, treatment and financial tracking.",
          features: ["Patient files and dental chart", "Appointments", "Treatments and receipts", "Payments and financial tracking", "X-ray import"],
        },
        professional: {
          name: "Professional",
          audience: "For a growing dental practice that needs inventory, multiple doctors, commissions, and advanced reports.",
          features: ["Everything in Essential", "Inventory and materials", "Multiple doctors", "Doctor commissions", "Advanced reports", "Multiple users"],
        },
        clinic: {
          name: "Clinic",
          audience: "For multi-doctor clinics that need unlimited users and computers, advanced permissions, and customisation.",
          features: ["Everything in Professional", "Unlimited users", "Unlimited computers", "Advanced permissions", "Cloud backup", "Customisation"],
        },
      },
      faq: [
        { q: "How is MolarBear priced?", a: "Three plans, billed yearly: Essential at EGP 1,250 a month (EGP 15,000 a year), Professional at EGP 1,850 a month (EGP 22,200 a year), and Clinic at EGP 3,200 a month (EGP 38,400 a year)." },
        { q: "Does it work with my X-ray sensor?", a: "MolarBear imports X-rays directly from NanoPix sensor software. Ask us about other sensors." },
        { q: "Can the reception and the doctor use different computers?", a: "Yes. The Clinic Flow board is shared, so both computers see the same patients in real time." },
        { q: "Is it in Arabic?", a: "Yes. MolarBear works in Arabic and English, and prices are in Egyptian pounds." },
        { q: "Can I move my existing patient records?", a: "Yes. Past work can be recorded with its original dates, so patients already mid-treatment carry over cleanly." },
      ],
    },
  },
  ar: {
    "restaurant-pos-egypt": {
      seoTitle: "برنامج كاشير وإدارة مطاعم في مصر | Queue POS بسعر 20,000 جنيه مدى الحياة",
      seoDescription:
        "Queue POS نظام متكامل لإدارة المطاعم والكافيهات في مصر: كاشير وشاشة مطبخ ومخزون وورديات وتقارير فروع بالعربية والإنجليزية. سعر واحد دون اشتراك شهري.",
      eyebrow: "برنامج كاشير للمطاعم في مصر",
      title: "أدِر مطعمك من شاشة واحدة، ودون اشتراك شهري",
      description:
        "يدير Queue POS الكاشير والمطبخ والمخزون والموظفين والتقارير من برنامج ويندوز واحد، بالعربية والإنجليزية. تدفع مرة واحدة ويصبح ملكك.",
      priceNote: "دفعة واحدة · ترخيص مدى الحياة",
      videoTitle: "جولة في Queue POS خلال 90 ثانية",
      featuresTitle: "كل ما يحتاجه المطعم، جاهز من اليوم الأول",
      features: [
        { title: "كاشير سريع حسب الطاولات", text: "اختر الطاولة وأضف الأصناف وقسّم الفاتورة واستلم نقدًا أو بطاقة أو محفظة، واطبع إيصالًا حراريًا." },
        { title: "شاشة المطبخ", text: "الطلبات تصل مباشرة إلى شاشة المطبخ أو البار وتنتقل من «بدء» إلى «جاهز» إلى «تم التقديم»." },
        { title: "مخزون يحسب نفسه", text: "كل عملية بيع تخصم الخامات حسب الوصفة، مع تنبيهات النقص وسجل المشتريات." },
        { title: "الموظفون والورديات والخزينة", text: "دخول برقم سري، وصلاحيات، وتقفيل وردية باعتماد المدير عند وجود فرق." },
        { title: "التقارير والفروع", text: "المبيعات عبر الزمن، والأصناف الأكثر مبيعًا، وطرق الدفع، وتقارير لكل فرع." },
        { title: "يعمل دون إنترنت ويحفظ نسخًا احتياطية", text: "يعمل على جهاز واحد دون إنترنت، مع نسخ احتياطي يومي تلقائي واستعادة بضغطة." },
      ],
      pricingTitle: "سعر واضح وبسيط",
      pricingDescription: "لا اشتراكات شهرية ولا مفاجآت. جرّب النظام مجانًا لمدة 14 يومًا قبل الدفع.",
      plans: {
        lifetime: {
          name: "Queue POS",
          audience: "للمطاعم والكافيهات والمطابخ السحابية",
          features: [
            "كاشير وطلبات وإيصالات",
            "شاشة مطبخ وتوجيه طلبات البار",
            "مخزون بخصم تلقائي حسب الوصفات",
            "صلاحيات الموظفين والدخول برقم سري والورديات",
            "تقارير وتوصيل وتعدد الفروع",
            "عربي وإنجليزي، ووضع فاتح وداكن",
            "تجربة مجانية لمدة 14 يومًا قبل الدفع",
          ],
        },
      },
      faq: [
        { q: "هل يوجد اشتراك شهري؟", a: "لا. سعر Queue POS هو 20,000 جنيه تُدفع مرة واحدة، والترخيص ملكك مدى الحياة." },
        { q: "هل يحتاج البرنامج إلى إنترنت؟", a: "لا. يعمل على جهاز ويندوز داخل المطعم بقاعدة بيانات محلية، ويستمر في العمل إذا انقطع الاتصال." },
        { q: "هل يدعم اللغة العربية؟", a: "نعم. النظام بالكامل، بما في ذلك الإيصالات، يعمل بالعربية والإنجليزية، ويختار كل مستخدم لغته." },
        { q: "هل يمكنني تجربته أولًا؟", a: "نعم. كل تثبيت يتضمن فترة تجربة مجانية لمدة 14 يومًا. اطلب عرضًا تجريبيًا وسنجهزه معك." },
        { q: "هل يمكنني إضافة المنيو الحالي؟", a: "نعم. يمكنك استيراد المنيو أو المخزون من ملف Excel، أو حتى من ملف PDF للمنيو مباشرة." },
      ],
    },
    "dental-clinic-software-egypt": {
      seoTitle: "برنامج إدارة عيادات الأسنان في مصر | MolarBear بباقات تبدأ من 1,250 جنيه شهريًا",
      seoDescription:
        "MolarBear برنامج لإدارة عيادات الأسنان في مصر: ملفات المرضى والمواعيد ومخطط الأسنان والأشعة والمدفوعات والمخزون ونسب الأطباء. ثلاث باقات تبدأ من 1,250 جنيه شهريًا، والدفع سنويًا.",
      eyebrow: "برنامج عيادات أسنان في مصر",
      title: "الاستقبال والطبيب على لوحة واحدة، وكل جنيه محسوب",
      description:
        "يدير MolarBear المرضى والمواعيد والعلاجات والأشعة والمدفوعات ومستحقات الأطباء في برنامج ويندوز واحد، مصمم وفق طريقة عمل العيادات المصرية فعلًا.",
      priceNote: "باقات تبدأ من 1,250 جنيه شهريًا، والدفع سنويًا",
      videoTitle: "جولة في MolarBear خلال 90 ثانية",
      featuresTitle: "مصمم حول يوم العمل الحقيقي في العيادة",
      features: [
        { title: "لوحة سير العيادة", text: "يُدخل الاستقبال المريض، ويسجل الطبيب ما تم، وتعود الفاتورة إلى الاستقبال." },
        { title: "مخطط الأسنان والأشعة", text: "توثيق حالة كل سن واستيراد الأشعة مباشرة من برنامج NanoPix." },
        { title: "المواعيد", text: "اليوم كاملًا على خط زمني واحد، لكل طبيب وكل كرسي." },
        { title: "المدفوعات والأقساط", text: "إيصالات مفصلة وأرصدة ومدفوعات موزعة على العلاجات المفتوحة." },
        { title: "المخزون وتكاليف المعامل", text: "متابعة الخامات وإعادة الطلب في الوقت المناسب، وتسجيل تكلفة كل معمل لكل حالة." },
        { title: "مستحقات الأطباء", text: "نصيب كل طبيب محسوب تلقائيًا بعد خصم تكاليف المعمل والمساعد." },
      ],
      pricingTitle: "اختر الباقة المناسبة لعيادتك",
      pricingDescription: "الأسعار لكل عيادة بالجنيه المصري، والدفع مرة واحدة سنويًا. احجز عرضًا تجريبيًا لتراه وفق طريقة عمل عيادتك.",
      plans: {
        essential: {
          name: "الأساسية",
          audience: "لطبيب الأسنان المستقل الذي يحتاج أساسًا إلى إدارة المرضى والمواعيد ومتابعة العلاجات والحسابات.",
          features: ["ملفات المرضى ومخطط الأسنان", "المواعيد", "العلاجات والإيصالات", "المدفوعات والمتابعة المالية", "استيراد الأشعة"],
        },
        professional: {
          name: "الاحترافية",
          audience: "للعيادة النامية التي تحتاج إلى المخزون وتعدد الأطباء ونسبهم وتقارير متقدمة.",
          features: ["كل مزايا الباقة الأساسية", "المخزون والخامات", "تعدد الأطباء", "نسب الأطباء", "تقارير متقدمة", "تعدد المستخدمين"],
        },
        clinic: {
          name: "العيادة",
          audience: "للعيادات متعددة الأطباء التي تحتاج مستخدمين وأجهزة بلا حدود وصلاحيات متقدمة وتخصيصًا.",
          features: ["كل مزايا الباقة الاحترافية", "عدد غير محدود من المستخدمين", "عدد غير محدود من الأجهزة", "صلاحيات متقدمة", "نسخ احتياطي سحابي", "تخصيص حسب العيادة"],
        },
      },
      faq: [
        { q: "كم سعر MolarBear؟", a: "ثلاث باقات والدفع سنويًا: الأساسية بـ 1,250 جنيه شهريًا (15,000 جنيه سنويًا)، والاحترافية بـ 1,850 جنيه شهريًا (22,200 جنيه سنويًا)، والعيادة بـ 3,200 جنيه شهريًا (38,400 جنيه سنويًا)." },
        { q: "هل يعمل مع جهاز الأشعة لدي؟", a: "يستورد MolarBear الأشعة مباشرة من برنامج NanoPix. تواصل معنا بخصوص الأجهزة الأخرى." },
        { q: "هل يمكن أن يعمل الاستقبال والطبيب على جهازين مختلفين؟", a: "نعم. لوحة سير العيادة مشتركة، فيرى الجهازان المرضى أنفسهم لحظيًا." },
        { q: "هل البرنامج بالعربية؟", a: "نعم. يعمل MolarBear بالعربية والإنجليزية، والأسعار بالجنيه المصري." },
        { q: "هل يمكن نقل سجلات المرضى الحالية؟", a: "نعم. يمكن تسجيل الأعمال السابقة بتواريخها الأصلية، فتنتقل حالات المرضى الجارية دون مشكلات." },
      ],
    },
  },
};
