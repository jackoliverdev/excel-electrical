import Link from "next/link";
import { ThemeToggleButton } from "@/components/Theme/ThemeToggleButton";
import { ElectricsLogo } from "@/components/Brand/ElectricsLogo";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Why us", href: "#why-us" },
  { label: "Areas", href: "#areas" },
  { label: "Contact", href: "#contact" },
];

export function DesktopNavbar() {
  return (
    <header className="electrics-desktop-nav sticky top-0 z-[70] hidden lg:block">
      <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-6 xl:px-8">
        <Link href="/#top" aria-label="Excel Electrics home" className="shrink-0 py-2">
          <ElectricsLogo width={228} height={58} priority />
        </Link>

        <nav aria-label="Primary navigation" className="flex items-center gap-1 xl:gap-2">
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 text-sm font-semibold text-foreground transition-colors hover:text-brand-blue dark:text-white/95 dark:hover:text-brand-blue"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="#contact"
            className="ml-2 inline-flex items-center rounded-md bg-brand-blue px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:opacity-90 dark:bg-white dark:text-brand-blue dark:hover:bg-white/90 dark:hover:opacity-100"
          >
            Get a quote
          </Link>
          <ThemeToggleButton className="ml-1 border-[var(--border)] text-foreground hover:border-brand-blue hover:text-brand-blue dark:!border-white/35 dark:!text-white dark:hover:!border-white dark:hover:!bg-white/10 dark:hover:!text-white" />
        </nav>
      </div>
    </header>
  );
}
