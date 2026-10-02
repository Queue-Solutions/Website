import { motion as Motion, useMotionValue, useSpring } from "framer-motion";
import shellBackground from "../../../images/background.avif";
import { useEffect, useState } from "react";

function MouseAura() {
  const [enabled, setEnabled] = useState(false);
  const initialX = typeof window === "undefined" ? 0 : window.innerWidth / 2;
  const initialY = typeof window === "undefined" ? 0 : window.innerHeight / 2;
  const mouseX = useMotionValue(initialX);
  const mouseY = useMotionValue(initialY);
  const auraX = useSpring(mouseX, { stiffness: 210, damping: 18, mass: 0.8 });
  const auraY = useSpring(mouseY, { stiffness: 210, damping: 18, mass: 0.8 });
  const trailX = useSpring(mouseX, { stiffness: 95, damping: 16, mass: 0.95 });
  const trailY = useSpring(mouseY, { stiffness: 95, damping: 16, mass: 0.95 });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const updateEnabled = () => setEnabled(mediaQuery.matches);

    updateEnabled();
    mediaQuery.addEventListener("change", updateEnabled);

    if (!mediaQuery.matches) {
      return () => mediaQuery.removeEventListener("change", updateEnabled);
    }

    mouseX.set(window.innerWidth / 2);
    mouseY.set(window.innerHeight / 2);

    const move = (event) => {
      mouseX.set(event.clientX);
      mouseY.set(event.clientY);
    };

    window.addEventListener("mousemove", move);
    return () => {
      mediaQuery.removeEventListener("change", updateEnabled);
      window.removeEventListener("mousemove", move);
    };
  }, [mouseX, mouseY]);

  if (!enabled) {
    return null;
  }

  // Clipped to the viewport so the glow never makes the page scroll sideways near the edges.
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <Motion.div
        className="pointer-events-none absolute h-[30rem] w-[30rem] rounded-full bg-purple-400/30 blur-[120px]"
        style={{ left: auraX, top: auraY, x: "-50%", y: "-50%" }}
      />
      <Motion.div
        className="pointer-events-none absolute h-52 w-52 rounded-full border border-white/55 bg-white/24 blur-3xl"
        style={{ left: trailX, top: trailY, x: "-50%", y: "-50%" }}
      />
      <Motion.div
        className="pointer-events-none absolute h-24 w-24 rounded-full bg-fuchsia-200/50 blur-2xl"
        style={{ left: trailX, top: trailY, x: "-50%", y: "-50%" }}
      />
    </div>
  );
}

export default function PageShell({ children }) {
  return (
    <div className="relative overflow-hidden bg-[radial-gradient(circle_at_top,rgba(196,181,253,0.22),transparent_22%),linear-gradient(180deg,#eef2f7_0%,#e9edf6_52%,#e6ebf5_100%)] text-slate-900">
      <MouseAura />
      <div className="pointer-events-none absolute inset-0">
        <img
          src={shellBackground}
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover object-center opacity-[0.04] md:opacity-[0.08]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(237,242,247,0.62)_0%,rgba(233,237,246,0.72)_42%,rgba(230,235,245,0.82)_100%)]" />
        <div className="absolute left-1/2 top-[-10rem] hidden h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-purple-300/25 blur-3xl md:block" />
        <div className="absolute right-[-8rem] top-[28rem] hidden h-[24rem] w-[24rem] rounded-full bg-sky-200/25 blur-3xl md:block" />
        <div className="absolute left-[-8rem] top-[62rem] hidden h-[22rem] w-[22rem] rounded-full bg-violet-200/25 blur-3xl md:block" />
        <div className="absolute inset-0 hidden opacity-40 md:block">
          <div className="h-full w-full bg-[linear-gradient(to_right,rgba(148,163,184,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(168,85,247,0.08)_1px,transparent_1px)] bg-[size:88px_88px]" />
        </div>
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
}
