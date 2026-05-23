"use client";

import { useEffect, useRef, useState } from "react";
import { ELECTRICS_SECTION_PAD_Y_MAJOR_SEAM } from "@/components/Electrics/ElectricsSection";

export function ElectricsSmallJobs() {
  const sectionRef = useRef<HTMLElement>(null);
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

  return (
    <section
      ref={sectionRef}
      id="small-jobs"
      className={`electrics-small-jobs-band relative scroll-mt-28 overflow-hidden ${ELECTRICS_SECTION_PAD_Y_MAJOR_SEAM}`}
    >
      <div className="relative mx-auto max-w-7xl px-6">
        <div
          className={`electrics-small-jobs-accent reveal-fade-up mx-auto max-w-5xl pl-5 sm:pl-7 ${isVisible ? "is-visible" : ""}`}
        >
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
    </section>
  );
}
