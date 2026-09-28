import { AnimatePresence, motion as Motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 420);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible ? (
        <Motion.button
          type="button"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.25 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-[5.5rem] right-5 z-50 flex h-12 w-12 sm:bottom-24 sm:right-7 items-center justify-center rounded-full border border-white/70 bg-white/90 text-slate-900 shadow-[0_18px_45px_rgba(15,23,42,0.15)] backdrop-blur transition hover:border-purple-300 hover:text-purple-700"
          aria-label="Scroll back to top"
        >
          <FaArrowUp />
        </Motion.button>
      ) : null}
    </AnimatePresence>
  );
}
