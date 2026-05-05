import Link from "next/link";
import { ElectricsLogo } from "@/components/Brand/ElectricsLogo";

/** Replace with your live Facebook Page and LinkedIn company URLs when ready */
const FOOTER_FACEBOOK_HREF = "https://www.facebook.com/";
const FOOTER_LINKEDIN_HREF = "https://www.linkedin.com/";

const FOOTER_PHONE_TEL = "tel:+442033025558";
const FOOTER_PHONE_LABEL = "020 3302 5558";

const footerLinks = [
  { label: "Services", href: "#services" },
  { label: "Why us", href: "#why-us" },
  { label: "Areas", href: "#areas" },
  { label: "Contact", href: "#contact" },
];

const footerLegalLinks = [
  { label: "Terms of use", href: "/legal#terms-of-use" },
  { label: "Privacy policy", href: "/legal#privacy-policy" },
  { label: "Cookie policy", href: "/legal#cookie-policy" },
];

const socialIconBtnClass =
  "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-300/70 bg-white/90 shadow-sm transition hover:-translate-y-px hover:border-brand-blue/45 hover:shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/40 dark:border-white/20 dark:bg-white/[0.08] dark:shadow-[0_1px_4px_rgba(0,0,0,0.2)] dark:hover:border-white/35 dark:hover:bg-white/[0.12]";

export function SiteFooter() {
  return (
    <footer className="electrics-small-jobs-gradient-bg border-t border-[color:var(--electrics-nav-footer-edge)]">
      <div className="mx-auto w-full max-w-7xl px-6 pt-4 pb-10 md:pt-5 md:pb-12">
        <div className="flex flex-col gap-8 md:grid md:grid-cols-2 md:items-stretch md:gap-x-10 lg:gap-x-12">
          <div className="flex min-h-0 min-w-0 flex-col md:h-full">
            <Link
              href="/#top"
              aria-label="Excel Electrics home"
              className="inline-block shrink-0 leading-none"
            >
              <ElectricsLogo width={200} height={52} />
            </Link>
            <p className="mt-4 max-w-md flex-1 text-sm leading-relaxed text-[var(--text-muted)] dark:text-slate-300">
              Friendly, local electricians for your home - electrics, fire safety, access and automation.
              Clear pricing and dependable service across Essex, Suffolk, Cambridge, London and Hertfordshire.
            </p>
            <div
              className="mt-4 flex shrink-0 flex-wrap items-center gap-2"
              aria-label="Excel Electrics on social media"
            >
              <a
                href={FOOTER_FACEBOOK_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className={socialIconBtnClass}
                aria-label="Excel Electrics on Facebook"
              >
                <img
                  src="/icons/2023_Facebook_icon.svg"
                  alt=""
                  width={18}
                  height={18}
                  className="h-[18px] w-[18px] object-contain"
                />
              </a>
              <a
                href={FOOTER_LINKEDIN_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className={socialIconBtnClass}
                aria-label="Excel Electrics on LinkedIn"
              >
                <img
                  src="/icons/linkedin.svg"
                  alt=""
                  width={18}
                  height={18}
                  className="h-[18px] w-[18px] object-contain"
                />
              </a>
            </div>
          </div>

          <div className="flex min-h-0 min-w-0 flex-col items-end gap-4 md:gap-3.5 md:pt-9">
            <div className="flex flex-col items-end gap-0">
              <nav
                aria-label="Footer links"
                className="flex flex-wrap justify-end gap-x-3 gap-y-1.5 text-sm font-medium text-foreground dark:text-white/95"
              >
                {footerLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="rounded-md px-1 transition hover:text-brand-blue dark:hover:bg-white/15 dark:hover:text-white"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
              <nav
                aria-label="Legal and policies"
                className="flex flex-wrap justify-end gap-x-2.5 gap-y-1 text-xs text-[var(--text-muted)] dark:text-slate-400"
              >
                {footerLegalLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="rounded-md px-0.5 transition hover:text-foreground hover:underline dark:hover:text-slate-200"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
            <div className="w-full shrink-0 text-sm text-[var(--text-muted)] text-right dark:text-slate-300">
              <p>
                <a
                  href="mailto:info@excelelectrics.com"
                  className="font-medium text-brand-blue transition hover:underline dark:text-white dark:hover:text-white"
                >
                  info@excelelectrics.com
                </a>
              </p>
              <p className="mt-2">
                <a
                  href={FOOTER_PHONE_TEL}
                  className="font-medium text-foreground transition hover:text-brand-blue dark:text-white/95 dark:hover:text-white"
                >
                  {FOOTER_PHONE_LABEL}
                </a>
              </p>
              <address className="mt-2 text-xs leading-snug not-italic text-[var(--text-muted)] dark:text-slate-400">
                124 City Road
                <br />
                London, EC1V 2NX
              </address>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-[color:var(--electrics-nav-footer-edge)] pt-6 text-xs text-[var(--text-muted)] dark:text-slate-400">
          <p>© {new Date().getFullYear()} Excel Electrics. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
