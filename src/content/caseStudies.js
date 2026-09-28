// Plain data (no Vite imports) so scripts/prerender.mjs can read it at build time too.
// Long-form case study copy per project. Short card copy lives in projects.js.

export const CASE_STUDIES = {
  en: {
    glowmia: {
      industry: "Fashion retail",
      challenge:
        "Glowmia sells occasion dresses to shoppers who usually buy through Instagram messages. Every sale meant long chats about size, fit, and which dress suits which event, and many shoppers left without deciding.",
      solution:
        "We built an Arabic-first online boutique with a full dress archive, sizes, and cart, and paired it with an AI stylist that answers the same questions a shop assistant would, any time of day.",
      before: [
        "Sales depended on slow back-and-forth in DMs",
        "Shoppers struggled to compare dresses and sizes",
        "No proper catalogue to share with new customers",
      ],
      after: [
        "A branded store that works on every phone",
        "An AI stylist advises on fit, colour, and occasion",
        "Side-by-side comparison helps shoppers decide faster",
      ],
      highlights: [
        { title: "Arabic-first storefront", text: "Right-to-left design, elegant typography, and a catalogue built for mobile shoppers." },
        { title: "AI styling assistant", text: "Answers questions about fit and occasion and recommends pieces from the real collection." },
        { title: "Compare and decide", text: "Shoppers can place dresses side by side instead of switching between tabs." },
      ],
    },
    "egypt-gold-design": {
      industry: "Jewellery",
      challenge:
        "Custom jewellery inquiries arrived as vague messages like \"something elegant for an engagement\". The workshop spent hours going back and forth before it could even quote a price.",
      solution:
        "We built Maison DIA, a private AI design studio for Egypt Gold. The client describes the idea or uploads a reference, and the agent guides them through stone, metal, and silhouette until a clear brief is ready.",
      before: [
        "Unclear requests that needed many follow-up calls",
        "Quotes delayed until the idea was finally clear",
        "No premium online experience for high-value clients",
      ],
      after: [
        "Every inquiry arrives as a structured design brief",
        "The workshop can price a piece straight away",
        "A luxury experience that matches the brand",
      ],
      highlights: [
        { title: "Guided design conversation", text: "The agent asks the right questions about stone, metal, size, and style, one step at a time." },
        { title: "Reference images", text: "Clients can upload a photo of a piece they love and build on it." },
        { title: "Ready-to-quote brief", text: "The result is a clean summary the workshop can price without extra calls." },
      ],
    },
    "egypt-gold-whatsapp": {
      industry: "Jewellery retail",
      challenge:
        "Egypt Gold receives a constant flow of WhatsApp questions about prices, availability, and branches. Staff could not answer everyone quickly, especially after hours, and good leads went cold.",
      solution:
        "We built a control panel that connects to WhatsApp Business. AI answers customers instantly using an approved knowledge base, and any team member can take over a conversation with one click.",
      before: [
        "Customers waited hours for simple answers",
        "After-hours messages were answered the next day",
        "No overview of what customers were asking",
      ],
      after: [
        "Instant, consistent replies around the clock",
        "Staff step in only when a human is needed",
        "Analytics show common questions and bot performance",
      ],
      highlights: [
        { title: "AI that stays on-message", text: "Replies come only from facts the business approved, with a full prompt history." },
        { title: "One-click takeover", text: "A shared inbox lets any agent take a chat from the AI at any moment." },
        { title: "Replies, templates, analytics", text: "Quick replies, Meta templates, and a review queue in one dashboard." },
      ],
    },
    "tokyo-ac": {
      industry: "HVAC services",
      challenge:
        "Tokyo International Company has served air-conditioning customers for over 30 years. Customer records, contracts, and technician visits lived in paper files and spreadsheets that were hard to search and easy to lose.",
      solution:
        "We built a Windows desktop system that keeps every customer, unit, contract, job card, and invoice in one place. It runs on the office's existing computers and keeps working without internet.",
      before: [
        "Customer history scattered across paper and sheets",
        "Hard to know which units were under contract",
        "Invoices prepared manually after each visit",
      ],
      after: [
        "One record per customer and every unit they own",
        "Job cards assigned and tracked per technician",
        "Invoices generated directly from completed work",
      ],
      highlights: [
        { title: "Customers and units", text: "Every unit, its location, and its contract status on the customer's file." },
        { title: "Technician job cards", text: "Visits are scheduled, assigned, and closed with the work recorded." },
        { title: "Works offline", text: "A local database means the office keeps working even when the internet drops." },
      ],
    },
    "queue-pos": {
      industry: "Restaurants & cafés",
      challenge:
        "Many restaurants run on a basic cashier program, paper kitchen tickets, and a notebook for stock. Owners cannot see real profit, stock runs out without warning, and cash drawers rarely match.",
      solution:
        "Queue POS is our own restaurant management system. It runs the floor, the kitchen, the stock, the staff, and the reports from one Windows app, in Arabic and English, with no monthly subscription.",
      before: [
        "Orders shouted or written on paper for the kitchen",
        "Stock counted by hand and ingredients running out",
        "No clear view of sales, shifts, or branch performance",
      ],
      after: [
        "Orders go straight to the kitchen display",
        "Stock deducts automatically from each recipe",
        "Live reports per branch, cashier, and item",
      ],
      highlights: [
        { title: "Table-based POS", text: "See every table, its bill, and how long guests have been seated. Split bills and print thermal receipts." },
        { title: "Kitchen display", text: "Tickets move from Start to Ready to Served, routed to the kitchen or the bar." },
        { title: "Inventory and recipes", text: "Ingredients deduct automatically on every sale, with reorder alerts." },
        { title: "Staff, shifts, cash-up", text: "PIN sign-in, roles, and shift closing with manager approval for differences." },
      ],
    },
    molarbear: {
      industry: "Dental clinics",
      challenge:
        "Dental clinics juggle a reception desk, one or more doctors, lab bills, and patients who pay in instalments. Paper files and spreadsheets make it easy to lose track of who owes what and what was done.",
      solution:
        "MolarBear connects the desk and the doctor on one live board. The desk sends a patient in, the doctor records the work, and the bill returns to the desk as an itemised receipt with payments split across treatments.",
      before: [
        "Paper patient files and manual appointment books",
        "Treatments billed twice or forgotten",
        "Doctor commissions calculated by hand at month end",
      ],
      after: [
        "Every patient's history, X-rays, and balance in one file",
        "One place to open a treatment and take a payment",
        "Doctor earnings calculated automatically, lab costs included",
      ],
      highlights: [
        { title: "Clinic Flow board", text: "Reception, with the doctor, ready to pay: both computers see the same live board." },
        { title: "Dental chart and X-rays", text: "Chart each tooth and pull X-rays straight from the NanoPix sensor software." },
        { title: "Money made clear", text: "Itemised receipts, instalments, expenses, and a daily view of what was collected." },
        { title: "Doctor earnings", text: "Each dentist's share worked out after lab and assistant costs." },
      ],
    },
  },
  ar: {
    glowmia: {
      industry: "تجارة الأزياء",
      challenge:
        "تبيع Glowmia فساتين المناسبات لعميلات اعتدن الشراء عبر رسائل إنستجرام. كانت كل عملية بيع تتطلب محادثات طويلة عن المقاس والقَصّة والفستان المناسب لكل مناسبة، وكثير من العميلات كن يغادرن دون قرار.",
      solution:
        "بنينا متجرًا إلكترونيًا عربيًا يضم أرشيف الفساتين كاملًا بالمقاسات وسلة الشراء، ومعه منسقة أزياء ذكية تجيب عن الأسئلة نفسها التي تجيب عنها موظفة المتجر، في أي وقت.",
      before: [
        "المبيعات معتمدة على رسائل بطيئة ومتقطعة",
        "صعوبة المقارنة بين الفساتين والمقاسات",
        "لا يوجد كتالوج احترافي يُرسل للعملاء الجدد",
      ],
      after: [
        "متجر يحمل هوية العلامة ويعمل على كل الهواتف",
        "منسقة ذكية تنصح بالمقاس واللون والمناسبة",
        "مقارنة القطع جنبًا إلى جنب تسرّع القرار",
      ],
      highlights: [
        { title: "متجر عربي بالكامل", text: "تصميم من اليمين إلى اليسار، وخطوط أنيقة، وكتالوج مصمم لمستخدمي الهاتف." },
        { title: "منسقة أزياء ذكية", text: "تجيب عن أسئلة المقاس والمناسبة وترشح قطعًا من المجموعة الفعلية." },
        { title: "قارني واختاري", text: "تضع العميلة الفساتين جنبًا إلى جنب بدلًا من التنقل بين الصفحات." },
      ],
    },
    "egypt-gold-design": {
      industry: "المجوهرات",
      challenge:
        "كانت طلبات المجوهرات المخصصة تصل برسائل عامة مثل «شيء أنيق للخطوبة»، فتقضي الورشة ساعات في الأسئلة والمتابعة قبل أن تتمكن من تقديم سعر.",
      solution:
        "بنينا Maison DIA، استوديو تصميم خاصًا بالذكاء الاصطناعي لـ Egypt Gold. يصف العميل فكرته أو يرفع صورة مرجعية، ويقوده الوكيل خطوة بخطوة في اختيار الأحجار والمعدن والشكل حتى يكتمل ملف التصميم.",
      before: [
        "طلبات غير واضحة تحتاج إلى مكالمات متابعة كثيرة",
        "تأخر التسعير حتى تتضح الفكرة",
        "لا توجد تجربة رقمية فاخرة لعملاء القطع الثمينة",
      ],
      after: [
        "كل طلب يصل في صورة ملف تصميم منظم",
        "الورشة تسعّر القطعة مباشرة",
        "تجربة فاخرة تليق بالعلامة التجارية",
      ],
      highlights: [
        { title: "محادثة تصميم موجهة", text: "يطرح الوكيل الأسئلة الصحيحة عن الحجر والمعدن والمقاس والطراز، خطوة بخطوة." },
        { title: "صور مرجعية", text: "يرفع العميل صورة لقطعة أعجبته ويبني عليها تصميمه." },
        { title: "ملف جاهز للتسعير", text: "النتيجة ملخص واضح تسعّره الورشة دون مكالمات إضافية." },
      ],
    },
    "egypt-gold-whatsapp": {
      industry: "تجارة المجوهرات",
      challenge:
        "تتلقى Egypt Gold سيلًا مستمرًا من رسائل واتساب عن الأسعار والمتوفر والفروع. لم يكن الفريق قادرًا على الرد على الجميع بسرعة، خاصة بعد مواعيد العمل، فكانت فرص كثيرة تضيع.",
      solution:
        "بنينا لوحة تحكم مرتبطة بواتساب للأعمال: يرد الذكاء الاصطناعي على العملاء فورًا اعتمادًا على قاعدة معرفة معتمدة، ويستطيع أي موظف تولي المحادثة بضغطة واحدة.",
      before: [
        "العملاء ينتظرون ساعات لإجابات بسيطة",
        "رسائل ما بعد مواعيد العمل يُرد عليها في اليوم التالي",
        "لا توجد رؤية واضحة لما يسأل عنه العملاء",
      ],
      after: [
        "ردود فورية وموحدة على مدار الساعة",
        "الموظف يتدخل فقط عند الحاجة الفعلية",
        "تقارير توضح الأسئلة الأكثر تكرارًا وأداء الرد الآلي",
      ],
      highlights: [
        { title: "ذكاء اصطناعي منضبط", text: "الردود مبنية فقط على معلومات اعتمدتها الشركة، مع سجل كامل لتعديلات التعليمات." },
        { title: "تحويل بضغطة واحدة", text: "صندوق وارد مشترك يتيح لأي موظف تولي المحادثة في أي لحظة." },
        { title: "ردود جاهزة وتقارير", text: "ردود سريعة وقوالب Meta وقائمة مراجعة في لوحة واحدة." },
      ],
    },
    "tokyo-ac": {
      industry: "خدمات التكييف",
      challenge:
        "تخدم شركة طوكيو الدولية عملاء التكييف منذ أكثر من 30 عامًا. كانت سجلات العملاء والعقود وزيارات الفنيين موزعة بين الملفات الورقية وجداول البيانات، فيصعب البحث فيها ويسهل ضياعها.",
      solution:
        "بنينا نظام ويندوز يجمع العملاء والوحدات والعقود وأوامر العمل والفواتير في مكان واحد، ويعمل على أجهزة المكتب الحالية دون الحاجة إلى إنترنت.",
      before: [
        "تاريخ العميل موزع بين الورق والجداول",
        "صعوبة معرفة الوحدات المشمولة بعقود الصيانة",
        "الفواتير تُعد يدويًا بعد كل زيارة",
      ],
      after: [
        "سجل موحد لكل عميل وكل وحدة يمتلكها",
        "أوامر عمل تُسند وتُتابع لكل فني",
        "فواتير تصدر مباشرة من العمل المنجز",
      ],
      highlights: [
        { title: "العملاء والوحدات", text: "كل وحدة وموقعها وحالة عقدها في ملف العميل." },
        { title: "أوامر عمل الفنيين", text: "جدولة الزيارات وإسنادها وإغلاقها مع تسجيل ما تم." },
        { title: "يعمل دون إنترنت", text: "قاعدة بيانات محلية تضمن استمرار العمل حتى لو انقطع الاتصال." },
      ],
    },
    "queue-pos": {
      industry: "المطاعم والمقاهي",
      challenge:
        "تعتمد مطاعم كثيرة على برنامج كاشير بسيط وأوراق للمطبخ ودفتر للمخزون، فلا يعرف المالك ربحه الحقيقي، وتنفد الخامات دون إنذار، ونادرًا ما تتطابق الخزينة.",
      solution:
        "Queue POS هو نظامنا الخاص لإدارة المطاعم. يدير الصالة والمطبخ والمخزون والموظفين والتقارير من برنامج ويندوز واحد، بالعربية والإنجليزية، ودون اشتراك شهري.",
      before: [
        "الطلبات تُنقل للمطبخ شفهيًا أو على الورق",
        "جرد يدوي للمخزون ونفاد مفاجئ للخامات",
        "لا رؤية واضحة للمبيعات والورديات وأداء الفروع",
      ],
      after: [
        "الطلبات تصل مباشرة إلى شاشة المطبخ",
        "خصم تلقائي للمخزون حسب وصفة كل صنف",
        "تقارير لحظية لكل فرع وكاشير وصنف",
      ],
      highlights: [
        { title: "كاشير حسب الطاولات", text: "كل طاولة وفاتورتها ومدة جلوس الضيوف، مع تقسيم الفاتورة والطباعة الحرارية." },
        { title: "شاشة المطبخ", text: "الطلبات تنتقل من «بدء» إلى «جاهز» إلى «تم التقديم»، وتُوجَّه للمطبخ أو البار." },
        { title: "المخزون والوصفات", text: "الخامات تُخصم تلقائيًا مع كل عملية بيع، مع تنبيهات إعادة الطلب." },
        { title: "الموظفون والورديات", text: "دخول برقم سري، وصلاحيات، وتقفيل وردية باعتماد المدير عند وجود فرق." },
      ],
    },
    molarbear: {
      industry: "عيادات الأسنان",
      challenge:
        "تتعامل عيادات الأسنان مع استقبال وطبيب أو أكثر وفواتير معامل ومرضى يدفعون على أقساط. الملفات الورقية والجداول تجعل من السهل ضياع ما تم وما هو مستحق.",
      solution:
        "يربط MolarBear الاستقبال بالطبيب على لوحة مباشرة واحدة: يُدخل الاستقبال المريض، ويسجل الطبيب ما تم، وتعود الفاتورة إلى الاستقبال بإيصال مفصل وتوزيع المدفوعات على العلاجات.",
      before: [
        "ملفات مرضى ورقية ودفتر مواعيد يدوي",
        "علاجات تُحاسب مرتين أو تُنسى",
        "حساب نسب الأطباء يدويًا في نهاية الشهر",
      ],
      after: [
        "تاريخ المريض وأشعته ورصيده في ملف واحد",
        "مكان واحد لبدء العلاج واستلام الدفع",
        "حساب تلقائي لمستحقات الأطباء شاملًا تكاليف المعامل",
      ],
      highlights: [
        { title: "لوحة سير العيادة", text: "الاستقبال، مع الطبيب، جاهز للدفع: الجهازان يريان اللوحة نفسها لحظيًا." },
        { title: "مخطط الأسنان والأشعة", text: "توثيق حالة كل سن واستيراد الأشعة مباشرة من برنامج NanoPix." },
        { title: "حسابات واضحة", text: "إيصالات مفصلة وأقساط ومصروفات ومتابعة يومية للتحصيل." },
        { title: "مستحقات الأطباء", text: "نصيب كل طبيب محسوب بعد خصم تكاليف المعمل والمساعد." },
      ],
    },
  },
};
