import Link from "next/link";
import { LegalPolicyTabs } from "@/components/Legal/LegalPolicyTabs";

const ghostBtn =
  "inline-flex items-center justify-center rounded-md border border-[var(--border)] bg-[var(--surface)] px-5 py-2.5 text-sm font-semibold text-foreground transition hover:border-brand-blue/45 hover:text-brand-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/40";

const primaryBtn =
  "inline-flex items-center justify-center rounded-md bg-brand-blue px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-blue/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/45";

export function LegalHero() {
  return (
    <section className="border-b border-[var(--border)] bg-background pt-24 pb-10 md:pt-28 md:pb-12">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <p className="text-brand-gold text-[11px] font-semibold uppercase tracking-[0.18em] md:text-xs">
          Legal &amp; policies
        </p>
        <h1 className="text-foreground mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
          Terms, privacy &amp; cookies
        </h1>
        <p className="text-muted mx-auto mt-4 max-w-xl text-sm leading-relaxed md:text-base">
          Straightforward information from Excel Electrics about using this website, how we handle your
          data, and how cookies help us keep things running smoothly.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link href="/" className={ghostBtn}>
            Back to home
          </Link>
          <Link href="/#contact" className={primaryBtn}>
            Get in touch
          </Link>
        </div>

        <div className="mt-10 md:mt-12">
          <LegalPolicyTabs />
        </div>
      </div>
    </section>
  );
}
