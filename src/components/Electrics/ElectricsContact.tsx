"use client";

import { useEffect, useRef, useState } from "react";
import { useMotionValue, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ElectricsSection } from "@/components/Electrics/ElectricsSection";
import { LightningBolt } from "@/components/Electrics/LightningBolt";

const labelClass =
  "text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--text-muted)]";

const inputClass =
  "w-full rounded-md border border-[var(--border)] bg-transparent px-3 py-2.5 text-sm text-foreground outline-none transition placeholder:text-[var(--text-muted)] focus:border-[#905bf4] focus:ring-2 focus:ring-[#905bf4]/25 focus:ring-offset-0";

/** Muted blue → full blue on hover */
const submitPrimaryBtn =
  "mt-1 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-md bg-[#905bf4]/82 px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#905bf4] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#905bf4]/45 sm:w-auto sm:self-start";

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

export function ElectricsContact() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const accentRef = useRef<HTMLDivElement | null>(null);
  const reduceMotion = useReducedMotion() ?? false;
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1023px)");
    const updateIsMobile = () => setIsMobile(mediaQuery.matches);
    const frame = window.requestAnimationFrame(updateIsMobile);
    mediaQuery.addEventListener("change", updateIsMobile);
    return () => {
      window.cancelAnimationFrame(frame);
      mediaQuery.removeEventListener("change", updateIsMobile);
    };
  }, []);

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

  // Left accent charges top → bottom as the contact details scroll into view (same clip fill as the bolts).
  const { scrollYProgress } = useScroll({
    target: accentRef,
    offset: ["start 0.9", "end 0.6"],
  });
  const scrollCharge = useTransform(scrollYProgress, [0, 1], [0, 1], { clamp: true });
  const staticCharge = useMotionValue(1);
  const charge = reduceMotion ? staticCharge : scrollCharge;

  const visibleClass = isVisible ? "is-visible" : "";
  const textRevealClass = isMobile ? "reveal-fade-up" : "reveal-slide-left";
  const formRevealClass = isMobile ? "reveal-fade-up" : "reveal-slide-right";

  return (
    <ElectricsSection id="contact" majorSeam>
      <div ref={sectionRef}>
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#905bf4] md:text-xs">
            Need a quote or advice?
          </p>
          <h2 className="text-foreground mt-2 text-2xl font-semibold tracking-tight md:text-3xl">Get in touch</h2>
          <p className="text-muted mx-auto mt-3 max-w-2xl text-sm leading-relaxed md:text-base">
            Send a quick message or email us - we&apos;ll reply as soon as we can, usually the same day.
          </p>
        </div>

        <div className="mx-auto mt-8 max-w-3xl border-t border-[#4b378c]/30 pt-8 md:mt-10 md:pt-10 lg:mt-12 lg:max-w-5xl lg:pt-12">
          <div
            className="grid gap-8 lg:grid-cols-[minmax(0,220px)_1fr] lg:gap-0 lg:divide-x lg:divide-[#4b378c]/30"
          >
            <aside className={`lg:pr-10 ${textRevealClass} ${visibleClass}`}>
            <div ref={accentRef} className="relative pl-7">
              {/* Charging left accent: the same brand lightning bolt as the services section */}
              <LightningBolt
                progress={charge}
                className="pointer-events-none absolute left-0 top-0 h-full w-[18px]"
              />
              <div>
                <p className={labelClass}>Email</p>
                <a
                  href="mailto:info@excelelectrics.com"
                  className="mt-1.5 block text-base font-semibold text-[color:var(--foreground)] underline-offset-2 hover:underline"
                >
                  info@excelelectrics.com
                </a>
              </div>
              <div className="mt-6">
                <p className={labelClass}>Phone</p>
                <a
                  href="tel:+447730591822"
                  className="mt-1.5 block text-[15px] font-medium text-foreground hover:text-[#905bf4]"
                >
                  07730591822
                </a>
                <p className="text-muted mt-1 text-xs leading-snug">Mon-Fri, 08:00-17:00</p>
              </div>
              <div className="mt-6">
                <address className="text-[15px] font-medium leading-snug text-foreground not-italic">
                  124 City Road
                  <br />
                  London, EC1V 2NX
                </address>
                <p className="text-muted mt-1 text-xs leading-snug">Registered office</p>
              </div>
            </div>
          </aside>

            <form
              className={`flex flex-col gap-4 lg:min-w-0 lg:pl-10 ${formRevealClass} ${visibleClass}`}
              action="#"
              method="post"
            >
            <div className="hidden" aria-hidden="true">
              <label htmlFor="enquiry-company">Company</label>
              <input
                id="enquiry-company"
                name="company"
                type="text"
                tabIndex={-1}
                autoComplete="off"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="enquiry-name" className={labelClass}>
                Name
              </label>
              <input
                id="enquiry-name"
                name="name"
                type="text"
                autoComplete="name"
                className={inputClass}
                placeholder="Your name"
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-4">
              <div className="space-y-2">
                <label htmlFor="enquiry-email" className={labelClass}>
                  Email
                </label>
                <input
                  id="enquiry-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className={inputClass}
                  placeholder="you@example.com"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="enquiry-phone" className={labelClass}>
                  Phone <span className="font-normal normal-case text-[var(--text-muted)]">(optional)</span>
                </label>
                <input
                  id="enquiry-phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  className={inputClass}
                  placeholder="Best number for a call-back"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="enquiry-message" className={labelClass}>
                Message
              </label>
              <textarea
                id="enquiry-message"
                name="message"
                rows={4}
                className={`${inputClass} min-h-[100px] resize-y`}
                placeholder="Briefly describe the job or question."
              />
            </div>
            <button type="submit" className={submitPrimaryBtn}>
              <span className="inline-flex shrink-0" aria-hidden>
                <IconMail className="h-5 w-5" />
              </span>
              Send message
            </button>
            </form>
          </div>
        </div>
      </div>
    </ElectricsSection>
  );
}
