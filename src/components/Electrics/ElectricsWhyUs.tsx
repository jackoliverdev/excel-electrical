"use client";

import { useEffect, useRef, useState } from "react";
import { ElectricsSection } from "@/components/Electrics/ElectricsSection";

const reasons = [
  "Friendly, tidy and respectful in your home",
  "Fully qualified and insured",
  "Clear, honest pricing",
  "We turn up when we say we will",
  "No job too small",
];

/** Same rail duration as `ElectricsServices` (`DRAW_MS`); wider stagger so each row finishes before the next feels rushed */
const STAGGER_MS = 320;
const REVEAL_MS = 1600;
/** One easing curve — line draw + text slide share identical timing (left → right, same beat) */
const REVEAL_EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

export function ElectricsWhyUs() {
  const regionRef = useRef<HTMLDivElement>(null);
  const [rowsOn, setRowsOn] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setRowsOn(true);
      return;
    }

    const el = regionRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setRowsOn(true);
          io.disconnect();
        }
      },
      { root: null, rootMargin: "0px 0px -8% 0px", threshold: [0.08] },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  const lineStyle = (delayMs: number) =>
    ({
      transform: rowsOn ? "scaleX(1)" : "scaleX(0)",
      transition: `transform ${REVEAL_MS}ms ${REVEAL_EASE}`,
      transitionDelay: `${delayMs}ms`,
    }) as const;

  /** Text only slides L→R; tick stays fixed so it isn’t clipped by overflow during motion */
  const textStyle = (delayMs: number) =>
    ({
      opacity: rowsOn ? 1 : 0,
      transform: rowsOn ? "translateX(0)" : "translateX(-18px)",
      transition: `opacity ${REVEAL_MS}ms ${REVEAL_EASE}, transform ${REVEAL_MS}ms ${REVEAL_EASE}`,
      transitionDelay: `${delayMs}ms`,
    }) as const;

  const tickStyle = (delayMs: number) =>
    ({
      opacity: rowsOn ? 1 : 0,
      transition: `opacity ${REVEAL_MS}ms ${REVEAL_EASE}`,
      transitionDelay: `${delayMs}ms`,
    }) as const;

  return (
    <ElectricsSection id="why-us">
      <div className="mx-auto max-w-5xl text-center">
        <p className="text-brand-gold text-[11px] font-semibold uppercase tracking-[0.18em] md:text-xs">
          Why homeowners choose us
        </p>
        <h2 className="text-foreground mt-2 text-2xl font-semibold tracking-tight md:text-3xl">
          Your home. Your safety. Done properly.
        </h2>
        <p className="text-muted mt-3 text-sm leading-relaxed md:text-base">
          We treat every visit with care - from a single faulty light to a full upgrade - so you always know what to
          expect.
        </p>
      </div>

      <div ref={regionRef} className="mx-auto mt-10 w-full max-w-2xl md:mt-12">
        {/* Top edge: draws left → right when block enters (same technique as link underlines / nav rules) */}
        <div
          aria-hidden
          className="h-px w-full origin-left bg-[color-mix(in_srgb,var(--brand-blue)_28%,var(--border))]"
          style={lineStyle(0)}
        />

        <ul className="w-full">
          {reasons.map((line, index) => {
            const start = rowsOn ? index * STAGGER_MS : 0;

            return (
              <li key={line} className="relative">
                <div className="flex gap-3 py-3.5 text-left md:gap-4 md:py-4 pl-0.5 sm:pl-1">
                  <span
                    className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-brand-blue/45 text-[11px] font-bold text-brand-blue"
                    style={tickStyle(start)}
                    aria-hidden
                  >
                    ✓
                  </span>
                  <span
                    className="min-w-0 flex-1 text-foreground text-[15px] font-medium leading-snug md:text-base"
                    style={textStyle(start)}
                  >
                    {line}
                  </span>
                </div>

                <div
                  aria-hidden
                  className="h-px w-full origin-left bg-[var(--border)]"
                  style={lineStyle(start)}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </ElectricsSection>
  );
}
