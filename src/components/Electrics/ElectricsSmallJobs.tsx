"use client";

import { useEffect, useRef, useState } from "react";
import { useMotionValue, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ELECTRICS_SECTION_PAD_Y_MAJOR_SEAM } from "@/components/Electrics/ElectricsSection";
import { LightningBolt } from "@/components/Electrics/LightningBolt";

export function ElectricsSmallJobs() {
  const sectionRef = useRef<HTMLElement>(null);
  const accentRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion() ?? false;
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      const frame = window.requestAnimationFrame(() => setIsVisible(true));
      return () => window.cancelAnimationFrame(frame);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Left accent charges top → bottom as the band scrolls into view (same clip fill as the bolts).
  const { scrollYProgress } = useScroll({
    target: accentRef,
    offset: ["start 0.9", "end 0.55"],
  });
  const scrollCharge = useTransform(scrollYProgress, [0, 1], [0, 1], { clamp: true });
  const staticCharge = useMotionValue(1);
  const charge = reduceMotion ? staticCharge : scrollCharge;

  return (
    <section
      ref={sectionRef}
      id="small-jobs"
      className={`electrics-small-jobs-band relative scroll-mt-28 overflow-hidden ${ELECTRICS_SECTION_PAD_Y_MAJOR_SEAM}`}
    >
      <div className="relative mx-auto max-w-7xl px-6">
        <div ref={accentRef} className="relative mx-auto max-w-5xl pl-7 sm:pl-9">
          {/* Charging left accent: the same brand lightning bolt as the services section */}
          <LightningBolt
            progress={charge}
            className="pointer-events-none absolute left-0 top-0 h-full w-[18px]"
          />

          <div className={`reveal-fade-up ${isVisible ? "is-visible" : ""}`}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#905bf4] md:text-xs">
              Small jobs welcome
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white md:text-3xl">
              <span className="block sm:inline">The same attention,</span>
              <span className="block sm:ml-1 sm:inline">every time.</span>
            </h2>
            <p className="mt-3 text-sm leading-snug text-slate-300 md:text-[15px] md:leading-normal">
              Whether it&apos;s a faulty light, a new socket, or a full upgrade - we treat every job with the same care and
              attention.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
