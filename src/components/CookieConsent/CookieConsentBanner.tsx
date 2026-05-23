"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const STORAGE_KEY = "excelelectrics_cookie_consent_v1";

/** All cookies including analytics (use when loading non-essential scripts). */
export const COOKIE_CONSENT_ACCEPTED = "accepted";
/** Essential cookies only; do not load optional analytics or marketing cookies. */
export const COOKIE_CONSENT_ESSENTIAL_ONLY = "essential_only";

function hasStoredChoice(): boolean {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    return v === COOKIE_CONSENT_ACCEPTED || v === COOKIE_CONSENT_ESSENTIAL_ONLY;
  } catch {
    return false;
  }
}

export function CookieConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (hasStoredChoice()) return;
    const timer = window.setTimeout(() => setVisible(true), 0);
    return () => window.clearTimeout(timer);
  }, []);

  const dismiss = (value: typeof COOKIE_CONSENT_ACCEPTED | typeof COOKIE_CONSENT_ESSENTIAL_ONLY) => {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      /* ignore */
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-desc"
      aria-live="polite"
      className="fixed inset-x-0 bottom-0 z-[130] border-t border-[var(--border)] bg-[var(--surface)] px-4 py-4 shadow-[0_-8px_30px_-12px_rgba(15,23,42,0.25)] md:px-6 md:py-5 dark:shadow-[0_-8px_30px_-12px_rgba(0,0,0,0.45)]"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-4 md:flex-row md:items-center md:justify-between md:gap-8">
        <div className="min-w-0 flex-1 space-y-2">
          <h2 id="cookie-consent-title" className="text-base font-semibold text-foreground">
            Cookies on this site
          </h2>
          <p id="cookie-consent-desc" className="text-sm leading-relaxed text-[var(--text-muted)]">
            We use cookies as explained in our{" "}
            <Link
              href="/legal#cookie-policy"
              className="font-medium text-brand-blue underline-offset-2 hover:underline"
            >
              Cookie policy
            </Link>
            {" "}
            - including those needed for the site to work and any analytics we list there.             Choose <strong className="font-semibold text-foreground">Accept</strong> for the full experience, or{" "}
            <strong className="font-semibold text-foreground">Essential only</strong> to use necessary cookies only.
          </p>
        </div>
        <div className="flex shrink-0 flex-wrap items-center gap-3 md:justify-end">
          <button
            type="button"
            onClick={() => dismiss(COOKIE_CONSENT_ACCEPTED)}
            className="inline-flex cursor-pointer items-center justify-center rounded-md bg-brand-blue px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-blue/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/45"
          >
            Accept
          </button>
          <button
            type="button"
            onClick={() => dismiss(COOKIE_CONSENT_ESSENTIAL_ONLY)}
            className="inline-flex cursor-pointer items-center justify-center rounded-md border border-[var(--border)] bg-[var(--surface)] px-6 py-2.5 text-sm font-semibold text-foreground transition hover:border-brand-blue/45 hover:text-brand-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/40"
          >
            Essential only
          </button>
        </div>
      </div>
    </div>
  );
}
