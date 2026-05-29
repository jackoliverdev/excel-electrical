"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ELECTRICS_HERO_BOTTOM_ONLY } from "@/components/Electrics/ElectricsSection";

const primaryBtn =
  "group inline-flex items-center justify-center gap-2 rounded-md bg-[#905bf4] px-6 py-3 text-sm font-semibold text-white shadow-none transition-all duration-200 ease-out motion-safe:hover:-translate-y-1 motion-safe:active:translate-y-0 motion-safe:active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/55";

const secondaryBtn =
  "electrics-hero-secondary-btn group inline-flex items-center justify-center gap-2 rounded-md border border-[#b8a3f9]/55 bg-white/10 px-6 py-3 text-sm font-semibold text-[#efe8ff] shadow-none backdrop-blur-sm transition-all duration-200 ease-out hover:border-[#905bf4] hover:bg-[#905bf4]/18 motion-safe:hover:-translate-y-1 motion-safe:active:translate-y-0 motion-safe:active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70";

function IconMail({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function IconWrench({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  );
}

/**
 * Hero entry — uses the site-wide `reveal-rise` system, but eased a little slower than the
 * default 700ms so the staggered intro feels calmer.
 */
const HERO_REVEAL_DURATION_MS = 1050;
const revealDelay = (ms: number) =>
  ({ "--reveal-delay": `${ms}ms`, transitionDuration: `${HERO_REVEAL_DURATION_MS}ms` }) as React.CSSProperties;

/** Full-bleed loop + flat scrim — minimal overlay. */
export function ElectricsHero() {
  const contentRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = contentRef.current;
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

  const visibleClass = isVisible ? "is-visible" : "";

  return (
    <section id="top" className="relative isolate min-h-[70vh] scroll-mt-0 overflow-hidden bg-black md:min-h-[76vh]">
      <Image
        src="/ExcelElectrics/Excel Home Hero.png"
        alt="Electric vehicle charger installation at a home"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      <div
        className="electrics-hero-overlay absolute inset-0"
        aria-hidden
      />

      <div
        className={`relative mx-auto flex min-h-[70vh] w-full max-w-7xl items-end px-6 pt-16 md:min-h-[76vh] md:items-center ${ELECTRICS_HERO_BOTTOM_ONLY}`}
      >
        <div ref={contentRef} className="max-w-4xl space-y-6">
          <p
            className={`reveal-rise ${visibleClass} text-[11px] font-semibold uppercase tracking-[0.2em] text-[#905bf4] md:text-xs`}
            style={revealDelay(0)}
          >
            Home safety and electrical specialists
          </p>

          <h1
            className={`reveal-rise ${visibleClass} text-4xl font-semibold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl`}
            style={revealDelay(130)}
          >
            <span className="block">Keeping your home</span>
            <span className="block text-[#905bf4]">safe &amp; powered</span>
          </h1>

          <p
            className={`reveal-rise ${visibleClass} text-base leading-relaxed text-slate-200 md:text-lg`}
            style={revealDelay(260)}
          >
            <span className="block">Need help with electrics or fire safety at home?</span>
            <span className="block">
              We&apos;re here to make it simple - from small repairs to full installations, with clear pricing and no
              fuss.
            </span>
            <span className="block">Serving Essex, Suffolk, Cambridgeshire, Hertfordshire and London.</span>
          </p>

          <div className={`reveal-rise ${visibleClass} flex flex-wrap items-center gap-3 pt-1`} style={revealDelay(390)}>
            <Link href="#contact" className={primaryBtn}>
              <span
                className="electrics-hero-btn-mail-icon inline-flex shrink-0 motion-safe:transition-transform motion-safe:duration-200 motion-safe:ease-out motion-safe:group-hover:-translate-y-1"
                aria-hidden
              >
                <IconMail className="h-5 w-5" />
              </span>
              Send an enquiry
            </Link>
            <Link href="#services" className={secondaryBtn}>
              <span className="electrics-hero-btn-wrench-icon inline-flex shrink-0" aria-hidden>
                <IconWrench className="h-5 w-5" />
              </span>
              What we can help with
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
