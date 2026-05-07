import Link from "next/link";
import { ELECTRICS_HERO_BOTTOM_ONLY } from "@/components/Electrics/ElectricsSection";

const primaryBtn =
  "group inline-flex items-center justify-center gap-2 rounded-md bg-[#7f3dff] px-6 py-3 text-sm font-semibold text-white shadow-[0_12px_28px_-14px_rgba(75,1,184,0.92)] transition-all duration-200 ease-out motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-[0_20px_36px_-18px_rgba(75,1,184,0.98)] motion-safe:active:translate-y-0 motion-safe:active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/55";

const secondaryBtn =
  "electrics-hero-secondary-btn group inline-flex items-center justify-center gap-2 rounded-md border border-white/25 bg-white/10 px-6 py-3 text-sm font-semibold text-white shadow-none backdrop-blur-sm transition-all duration-200 ease-out hover:border-white/45 hover:bg-white/16 motion-safe:hover:-translate-y-1 motion-safe:active:translate-y-0 motion-safe:active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70";

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

/** Full-bleed loop + flat scrim — minimal overlay. */
export function ElectricsHero() {
  return (
    <section id="top" className="relative isolate min-h-[70vh] scroll-mt-0 overflow-hidden bg-black md:min-h-[76vh]">
      <img
        src="/ExcelElectrics/Excel Home Hero.png"
        alt="Electric vehicle charger installation at a home"
        className="absolute inset-0 h-full w-full object-cover object-center"
        loading="eager"
        decoding="async"
      />

      <div
        className="electrics-hero-overlay absolute inset-0"
        aria-hidden
      />

      <div
        className={`relative mx-auto flex min-h-[70vh] w-full max-w-7xl items-end px-6 pt-16 md:min-h-[76vh] md:items-center ${ELECTRICS_HERO_BOTTOM_ONLY}`}
      >
        <div className="max-w-4xl space-y-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#7f3dff] md:text-xs">
            Home safety and electrical specialists
          </p>

          <h1 className="text-4xl font-semibold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl">
            <span className="block">Keeping your home</span>
            <span className="block text-[#7f3dff]">safe &amp; powered</span>
          </h1>

          <p className="text-base leading-relaxed text-slate-200 md:text-lg">
            <span className="block">Need help with electrics or fire safety at home?</span>
            <span className="block">
              We&apos;re here to make it simple - from small repairs to full installations, with clear pricing and no
              fuss.
            </span>
            <span className="block">Serving Essex, Suffolk, Cambridgeshire, Hertfordshire and London.</span>
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-1">
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
