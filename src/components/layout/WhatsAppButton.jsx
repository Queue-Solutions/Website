import { AnimatePresence, motion as Motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { trackLeadClick } from "../../lib/analytics";

const GREETING = {
  en: "Hello Queue Solutions, I would like to discuss a project.",
  ar: "مرحبًا Queue Solutions، أود مناقشة مشروع.",
};

export default function WhatsAppButton({ content }) {
  const href = `${content.siteDetails.whatsappHref}?text=${encodeURIComponent(GREETING[content.locale] ?? GREETING.en)}`;
  const [visible, setVisible] = useState(false);

  // Phones keep the first screen clean: the button appears once the visitor starts scrolling.
  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 639px)");
    const update = () => setVisible(!mobileQuery.matches || window.scrollY > window.innerHeight * 0.5);

    update();
    window.addEventListener("scroll", update, { passive: true });
    mobileQuery.addEventListener("change", update);
    return () => {
      window.removeEventListener("scroll", update);
      mobileQuery.removeEventListener("change", update);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible ? (
        <Motion.a
          href={href}
          target="_blank"
          rel="noreferrer"
          aria-label={content.ui.whatsappFloat}
          onClick={() => trackLeadClick("whatsapp", "floating_button")}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
          className="group fixed bottom-5 right-5 z-50 flex h-14 items-center rounded-full bg-[#25D366] pl-4 pr-4 text-white shadow-[0_18px_40px_rgba(37,211,102,0.35)] transition hover:bg-[#1ebe5b] sm:bottom-6 sm:right-6"
        >
          <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#25D366]/30 [animation-duration:2.6s]" aria-hidden="true" />
          <FaWhatsapp className="text-[1.6rem]" />
          <span className="hidden max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold transition-all duration-300 group-hover:ml-2 group-hover:max-w-[14rem] sm:inline">
            {content.ui.whatsappFloat}
          </span>
        </Motion.a>
      ) : null}
    </AnimatePresence>
  );
}
