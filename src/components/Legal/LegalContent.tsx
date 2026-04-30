"use client";

import { useEffect, useState } from "react";
import { LegalMarkdown } from "@/components/Legal/LegalMarkdown";
import { legalPolicies } from "@/components/Legal/legal";

export function LegalContent() {
  const [activePolicyId, setActivePolicyId] = useState<string>(legalPolicies[0]?.id ?? "");

  useEffect(() => {
    const applyHash = () => {
      const id = window.location.hash.replace(/^#/, "");
      if (id && legalPolicies.some((p) => p.id === id)) {
        setActivePolicyId(id);
      }
    };
    applyHash();
    window.addEventListener("hashchange", applyHash);
    return () => window.removeEventListener("hashchange", applyHash);
  }, []);

  const activePolicy =
    legalPolicies.find((policy) => policy.id === activePolicyId) ?? legalPolicies[0] ?? null;

  if (!activePolicy) return null;

  return (
    <section className="py-10 md:py-14">
      <div className="mx-auto w-full max-w-5xl px-6">
        <article
          id={activePolicy.id}
          className="space-y-5 rounded-xl border border-[var(--border)] border-l-[3px] border-l-brand-blue bg-[var(--surface)] p-6 pl-5 shadow-[0_18px_32px_-26px_rgba(15,23,42,0.28)] md:p-8 md:pl-7"
        >
          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">{activePolicy.title}</h2>
            <p className="text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]">
              Last updated: {activePolicy.lastUpdated}
            </p>
          </div>
          <div className="space-y-4">
            <LegalMarkdown markdown={activePolicy.markdown} />
          </div>
        </article>
      </div>
    </section>
  );
}
