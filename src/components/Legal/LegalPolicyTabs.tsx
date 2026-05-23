"use client";

import { useEffect, useState } from "react";
import { legalPolicies } from "@/components/Legal/legal";

const tabBase =
  "rounded-md px-5 py-2.5 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/45 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]";

const tabActive = "bg-brand-blue text-white shadow-sm hover:bg-brand-blue";

const tabInactive =
  "border border-[var(--border)] bg-[var(--surface)] text-foreground hover:border-brand-blue/45 hover:bg-[color-mix(in_srgb,var(--brand-blue)_10%,var(--surface))] dark:hover:bg-[color-mix(in_srgb,var(--brand-blue)_20%,var(--surface))]";

export function LegalPolicyTabs() {
  const [activeId, setActiveId] = useState<string>(legalPolicies[0]?.id ?? "");

  useEffect(() => {
    const sync = () => {
      const raw = window.location.hash.replace(/^#/, "");
      if (raw && legalPolicies.some((p) => p.id === raw)) {
        setActiveId(raw);
      } else if (!raw && legalPolicies[0]) {
        setActiveId(legalPolicies[0].id);
      }
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  const select = (id: string) => {
    setActiveId(id);
    window.history.pushState(null, "", `#${id}`);
  };

  return (
    <nav
      aria-label="Choose a policy"
      className="flex flex-wrap items-center justify-center gap-2 md:gap-3"
    >
      {legalPolicies.map((policy) => {
        const isActive = policy.id === activeId;
        return (
          <button
            key={policy.id}
            type="button"
            onClick={() => select(policy.id)}
            className={`${tabBase} ${isActive ? tabActive : tabInactive}`}
            aria-current={isActive ? "page" : undefined}
          >
            {policy.title}
          </button>
        );
      })}
    </nav>
  );
}
