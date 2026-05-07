"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ThemeToggleButton } from "@/components/Theme/ThemeToggleButton";
import { ElectricsLogo } from "@/components/Brand/ElectricsLogo";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Why us", href: "#why-us" },
  { label: "Areas", href: "#areas" },
  { label: "Contact", href: "#contact" },
];

export function MobileNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const close = () => setIsOpen(false);

  return (
    <header className="electrics-desktop-nav sticky top-0 z-[120] lg:hidden">
      <div className="mx-auto flex h-[72px] w-full max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/#top" aria-label="Excel Electrics home" className="min-w-0 flex-1 py-1 pr-3" onClick={close}>
          <ElectricsLogo width={224} height={58} className="h-auto w-full max-w-[224px]" priority />
        </Link>

        <div className="shrink-0 flex items-center gap-2">
          <ThemeToggleButton className="dark:hover:bg-white/10" />
          <button
            type="button"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-nav-panel"
            onClick={() => setIsOpen((prev) => !prev)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-md border hover:border-brand-blue hover:text-brand-blue dark:hover:border-brand-blue dark:hover:bg-white/10 dark:hover:text-brand-blue"
            style={{ borderColor: "var(--border)", color: "var(--foreground)" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              {isOpen ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <>
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {isOpen ? (
        <>
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 top-[73px] z-[110] bg-black/50"
          />
          <div
            id="mobile-nav-panel"
            className="electrics-desktop-nav fixed inset-x-0 top-[73px] z-[120] shadow-lg"
          >
            <nav aria-label="Mobile navigation" className="mx-auto flex w-full max-w-7xl flex-col px-4 py-4 sm:px-6">
              {navLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={close}
                  className="text-foreground rounded-md px-3 py-3 text-sm font-semibold transition-colors hover:text-brand-blue active:text-brand-blue"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="#contact"
                onClick={close}
                className="mt-2 inline-flex items-center justify-center rounded-md bg-[#7f3dff] px-4 py-3 text-sm font-semibold text-white shadow-[0_12px_24px_-14px_rgba(75,1,184,0.92)] transition hover:bg-[#7f3dff] hover:text-white"
                style={{ color: "#ffffff" }}
              >
                Get a quote
              </Link>
            </nav>
          </div>
        </>
      ) : null}
    </header>
  );
}
