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
              className="rounded-md px-3 py-2 text-sm font-semibold hover:text-brand-blue dark:hover:text-brand-blue"
              style={{ color: "var(--foreground)" }}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="#contact"
            className="ml-2 inline-flex items-center rounded-md bg-brand-blue px-4 py-2.5 text-sm font-semibold shadow-sm hover:bg-blue-600 dark:bg-white dark:hover:bg-white/90"
          >
            <span style={{ color: "var(--surface)" }}>Get a quote</span>
          </Link>
          <ThemeToggleButton className="ml-1 dark:hover:bg-white/10" />
        </nav>
      </div>
    </header>
  );
}
