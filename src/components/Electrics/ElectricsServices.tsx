"use client";

import { useEffect, useRef, useState } from "react";
import { ElectricsSection } from "@/components/Electrics/ElectricsSection";

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

const STAGGER_MS = 180;
const DRAW_MS = 1600;
const CONTENT_REVEAL_MS = 760;
const CONTENT_REVEAL_OFFSET_PX = 10;
const CONTENT_REVEAL_LAG_MS = 180;

export function ElectricsServices() {
  const regionRef = useRef<HTMLDivElement>(null);
  const [railsOn, setRailsOn] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setRailsOn(true);
      return;
    }

    const el = regionRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setRailsOn(true);
          io.disconnect();
        }
      },
      { root: null, rootMargin: "0px 0px -10% 0px", threshold: [0, 0.06, 0.12] },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

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
            <div key={pillar.title} className="relative min-h-[4rem] pl-3.5">
              <span
                aria-hidden
                className="pointer-events-none absolute left-0 top-0 w-0.5 rounded-full bg-[#4b378c]"
                style={{
                  height: "100%",
                  transformOrigin: "top center",
                  transform: railsOn ? "scaleY(1)" : "scaleY(0)",
                  transition: `transform ${DRAW_MS}ms cubic-bezier(0.22, 1, 0.36, 1) ${railsOn ? index * STAGGER_MS : 0}ms`,
                }}
              />
              <div
                style={{
                  opacity: railsOn ? 1 : 0,
                  transform: railsOn ? "translate3d(0,0,0)" : `translate3d(0,-${CONTENT_REVEAL_OFFSET_PX}px,0)`,
                  transition: `opacity ${CONTENT_REVEAL_MS}ms cubic-bezier(0.22, 1, 0.36, 1) ${railsOn ? index * STAGGER_MS + CONTENT_REVEAL_LAG_MS : 0}ms, transform ${CONTENT_REVEAL_MS}ms cubic-bezier(0.22, 1, 0.36, 1) ${railsOn ? index * STAGGER_MS + CONTENT_REVEAL_LAG_MS : 0}ms`,
                }}
              >
                <div className="flex items-baseline gap-2">
                  <span className="font-mono text-[10px] font-semibold tabular-nums text-[#905bf4] md:text-[11px]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-foreground text-[15px] font-semibold leading-snug tracking-tight md:text-base">
                    {pillar.title}
                  </h3>
                </div>
                <ul className="mt-3 space-y-1 border-t border-[#4b378c]/30 pt-2.5 text-[13px] leading-snug text-[var(--text-muted)] md:text-sm md:leading-relaxed">
                  {pillar.items.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-[0.45em] h-1 w-1 shrink-0 rounded-full bg-[#4b378c]/55" aria-hidden />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ElectricsSection>
  );
}
