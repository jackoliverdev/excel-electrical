"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { ElectricsSection } from "@/components/Electrics/ElectricsSection";
import { LightningBolt } from "@/components/Electrics/LightningBolt";

const pillars = [
  {
    title: "Electrical work",
    items: [
      "Fault finding & repairs",
      "New lights, sockets & upgrades",
      "Consumer unit (fuse box) replacements",
      "Electrical safety checks (EICR)",
      "Electrical Installation Certificates (EICs) - installs, additions & alterations",
    ],
  },
  {
    title: "Fire safety",
    items: [
      "Smoke alarm installation & upgrades",
      "Heat detectors for kitchens & garages",
      "Fire alarm systems for homes",
      "Replacing old or faulty alarms",
      "Making sure your home meets current safety standards",
    ],
  },
  {
    title: "Access & security",
    items: [
      "Door entry systems (intercoms, keypads & fobs)",
      "Access control for homes & flats",
      "Repairs and upgrades to existing systems",
    ],
  },
  {
    title: "Garage doors & electric gates",
    items: [
      "Automated garage doors",
      "Electric gate installations",
      "Converting manual systems to electric",
      "Repairs, servicing & fault finding",
    ],
  },
  {
    title: "EV charging",
    items: [
      "Home EV charger installation",
      "EV charger repairs and upgrades",
      "Load checks and smart charging advice",
    ],
  },
];

type Pillar = (typeof pillars)[number];

/** Reveal window for a single line (fraction of the bolt's charge). */
const LINE_SPAN = 0.24;
/** Lines reveal across this much of the charge, so they track the fill descending the bolt. */
const REVEAL_RANGE = 0.78;

type BoltLineProps = {
  charge: MotionValue<number>;
  /** Charge value at which this line starts revealing. */
  at: number;
  as?: "div" | "li";
  className?: string;
  children: React.ReactNode;
};

/** Fades + slides a line in as the bolt's charge sweeps past its position. */
function BoltLine({ charge, at, as = "div", className, children }: BoltLineProps) {
  const opacity = useTransform(charge, [at, at + LINE_SPAN], [0, 1]);
  const y = useTransform(charge, [at, at + LINE_SPAN], [-6, 0]);
  const Component = as === "li" ? motion.li : motion.div;

  return (
    <Component style={{ opacity, y }} className={className}>
      {children}
    </Component>
  );
}

type ServicePillarProps = {
  pillar: Pillar;
  index: number;
  total: number;
  /** Whole-section scroll progress (0 → 1 across the grid). */
  regionProgress: MotionValue<number>;
  /** True on the wide (single-row) desktop layout. */
  isWide: boolean;
  reduceMotion: boolean;
};

function ServicePillar({ pillar, index, total, regionProgress, isWide, reduceMotion }: ServicePillarProps) {
  // Mobile / tablet (stacked): each bolt owns a back-to-back slice of the section's scroll,
  // so one finishes before the next begins — a single continuous flow down the page.
  const segment = 1 / total;
  const sequentialCharge = useTransform(
    regionProgress,
    [index * segment, (index + 1) * segment],
    [0, 1],
    { clamp: true },
  );

  const staticCharge = useMotionValue(1);
  // Desktop charges every bolt together off the shared progress.
  const charge = reduceMotion ? staticCharge : isWide ? regionProgress : sequentialCharge;

  // Each line (title + list items) lights up as the fill sweeps down past its position.
  const lineCount = pillar.items.length + 1;
  const lineAt = (line: number) => (line / lineCount) * REVEAL_RANGE;

  return (
    <div className="relative min-h-[7rem] pl-6 xl:pl-6">
      <LightningBolt
        progress={charge}
        className="pointer-events-none absolute left-0 top-0 z-10 h-full w-[18px] xl:left-[-0.85rem] xl:w-[22px]"
      />
      <BoltLine charge={charge} at={lineAt(0)} className="flex items-baseline gap-2">
        <span className="font-mono text-[10px] font-semibold tabular-nums text-[#905bf4] md:text-[11px]">
          {String(index + 1).padStart(2, "0")}
        </span>
        <h3 className="text-foreground text-[15px] font-semibold leading-snug tracking-tight md:text-base">
          {pillar.title}
        </h3>
      </BoltLine>
      <ul className="mt-3 space-y-1 border-t border-[#4b378c]/30 pt-2.5 text-[13px] leading-snug text-[var(--text-muted)] md:text-sm md:leading-relaxed">
        {pillar.items.map((item, itemIndex) => (
          <BoltLine key={item} as="li" charge={charge} at={lineAt(itemIndex + 1)} className="flex gap-2">
            <span className="mt-[0.45em] h-1 w-1 shrink-0 rounded-full bg-[#4b378c]/55" aria-hidden />
            <span>{item}</span>
          </BoltLine>
        ))}
      </ul>
    </div>
  );
}

export function ElectricsServices() {
  const regionRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion() ?? false;
  const [isWide, setIsWide] = useState(false);

  // Single-row desktop layout (Tailwind `xl`) charges every bolt together.
  useEffect(() => {
    const mql = window.matchMedia("(min-width: 1280px)");
    const update = () => setIsWide(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);

  const { scrollYProgress } = useScroll({
    target: regionRef,
    offset: ["start 0.9", "end 0.5"],
  });
  const regionProgress = useTransform(scrollYProgress, [0, 1], [0, 1], { clamp: true });

  return (
    <ElectricsSection id="services">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#905bf4] md:text-xs">
          What we can help with
        </p>
        <div className="-mx-3 sm:mx-0">
          <h2 className="text-foreground mt-2 text-2xl font-semibold tracking-tight md:text-3xl">
            Practical support for your home
          </h2>
        </div>
      </div>
      <p className="text-muted mx-auto mt-3 max-w-4xl text-center text-sm leading-relaxed md:max-w-5xl md:text-base">
        From everyday electrics and safer alarms to access systems, automation and EV charging, we bring the same
        tidy, professional approach.
      </p>

      <div ref={regionRef} className="mx-auto mt-10 max-w-7xl md:mt-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-10 xl:grid-cols-5 xl:gap-6">
          {pillars.map((pillar, index) => (
            <ServicePillar
              key={pillar.title}
              pillar={pillar}
              index={index}
              total={pillars.length}
              regionProgress={regionProgress}
              isWide={isWide}
              reduceMotion={reduceMotion}
            />
          ))}
        </div>
      </div>
    </ElectricsSection>
  );
}
