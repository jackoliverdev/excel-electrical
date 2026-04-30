"use client";

import { useEffect, useRef, useState } from "react";
import { ELECTRICS_SECTION_PAD_Y_MAJOR_SEAM } from "@/components/Electrics/ElectricsSection";

const ENTRY_MS = 680;
const ENTRY_EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

export function ElectricsSmallJobs() {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setInView(true);
      return;
    }

    const el = sectionRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { root: null, rootMargin: "0px 0px -10% 0px", threshold: [0.08] },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="small-jobs"
      className={`electrics-small-jobs-band relative scroll-mt-28 overflow-hidden ${ELECTRICS_SECTION_PAD_Y_MAJOR_SEAM}`}
    >
      <div className="relative mx-auto max-w-7xl px-6">
        <div
          className="electrics-small-jobs-accent mx-auto max-w-5xl pl-5 sm:pl-7"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(18px)",
            transition: `opacity ${ENTRY_MS}ms ${ENTRY_EASE}, transform ${ENTRY_MS}ms ${ENTRY_EASE}`,
          }}
        >
          <p className="text-brand-gold text-[11px] font-semibold uppercase tracking-[0.18em] md:text-xs">
            Small jobs welcome
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white md:text-3xl">
            The same attention, every time
          </h2>
          <p className="mt-3 text-sm leading-snug text-slate-300 md:text-[15px] md:leading-normal">
            Whether it&apos;s a faulty light, a new socket, or a full upgrade — we treat every job with the same care and
            attention.
          </p>
        </div>
      </div>
    </section>
  );
}
