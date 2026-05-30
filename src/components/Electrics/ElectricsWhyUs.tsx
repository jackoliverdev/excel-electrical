"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { ElectricsSection } from "@/components/Electrics/ElectricsSection";

const reasons = [
  "Friendly, tidy and respectful in your home",
  "Fully qualified and insured",
  "Clear, honest pricing",
  "We turn up when we say we will",
  "No job too small",
];

/** A hairline that charges a brand gradient left → right (clip reveal) as `progress` grows. */
function ChargeLine({ progress }: { progress: MotionValue<number> }) {
  return (
    <div aria-hidden className="relative h-px w-full overflow-hidden">
      <div className="absolute inset-0 bg-[#4b378c]/22" />
      <motion.div
        className="absolute inset-0 origin-left bg-gradient-to-r from-[#4b378c] via-[#905bf4] to-[#b794ff]"
        style={{ scaleX: progress, filter: "drop-shadow(0 0 3px rgba(144, 91, 244, 0.4))" }}
      />
    </div>
  );
}

type WhyRowProps = {
  line: string;
  index: number;
  total: number;
  /** 0 → 1 charge sweeping down the list as the block scrolls into view. */
  charge: MotionValue<number>;
};

function WhyRow({ line, index, total, charge }: WhyRowProps) {
  const slot = 1 / total;
  const start = index * slot;
  const end = (index + 1) * slot;

  const lineProgress = useTransform(charge, [start, end], [0, 1], { clamp: true });
  const tickOpacity = useTransform(charge, [start, start + slot * 0.6], [0, 1], { clamp: true });
  const tickScale = useTransform(charge, [start, start + slot * 0.6], [0.6, 1], { clamp: true });
  const textOpacity = useTransform(charge, [start, end], [0, 1], { clamp: true });
  const textX = useTransform(charge, [start, end], [-18, 0], { clamp: true });

  return (
    <li className="relative">
      <div className="flex gap-3 py-3.5 pl-0.5 text-left sm:pl-1 md:gap-4 md:py-4">
        <motion.span
          className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[#4b378c]/60 text-[11px] font-bold text-[#905bf4]"
          style={{ opacity: tickOpacity, scale: tickScale }}
          aria-hidden
        >
          ✓
        </motion.span>
        <motion.span
          className="min-w-0 flex-1 text-[15px] font-medium leading-snug text-foreground md:text-base"
          style={{ opacity: textOpacity, x: textX }}
        >
          {line}
        </motion.span>
      </div>

      <ChargeLine progress={lineProgress} />
    </li>
  );
}

export function ElectricsWhyUs() {
  const regionRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion() ?? false;

  const { scrollYProgress } = useScroll({
    target: regionRef,
    offset: ["start 0.85", "end 0.55"],
  });
  const scrollCharge = useTransform(scrollYProgress, [0, 1], [0, 1], { clamp: true });

  const staticCharge = useMotionValue(1);
  const charge = reduceMotion ? staticCharge : scrollCharge;

  // Top edge charges first, just ahead of the first row.
  const topLineProgress = useTransform(charge, [0, 1 / reasons.length], [0, 1], { clamp: true });

  return (
    <ElectricsSection id="why-us">
      <div className="mx-auto max-w-5xl text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#905bf4] md:text-xs">
          Why homeowners choose us
        </p>
        <h2 className="text-foreground mt-2 text-2xl font-semibold tracking-tight md:text-3xl">
          <span className="block sm:inline">Your home. Your safety.</span>
          <span className="block sm:ml-1 sm:inline">Done properly.</span>
        </h2>
        <p className="text-muted mt-3 text-sm leading-relaxed md:text-base">
          We treat every visit with care, from a faulty light to a full upgrade, so you always know what to expect.
        </p>
      </div>

      <div ref={regionRef} className="mx-auto mt-10 w-full max-w-2xl md:mt-12">
        <ChargeLine progress={topLineProgress} />

        <ul className="w-full">
          {reasons.map((line, index) => (
            <WhyRow key={line} line={line} index={index} total={reasons.length} charge={charge} />
          ))}
        </ul>
      </div>
    </ElectricsSection>
  );
}
