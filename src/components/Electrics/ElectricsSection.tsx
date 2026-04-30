import type { ReactNode } from "react";

/**
 * Home electrics: full top padding (ingress), slightly tighter bottom so white→white seams
 * (e.g. Services → Why us) don’t read as a double band vs hero → Services (hero only supplies bottom).
 */
export const ELECTRICS_SECTION_PAD_Y = "pt-14 md:pt-20 pb-10 md:pb-14";

/** Same outer `<section>` chrome as `ElectricsSection` (use on HomeLocations electrics so seams match Why us / Services). */
export const ELECTRICS_SECTION_SHELL = `scroll-mt-28 ${ELECTRICS_SECTION_PAD_Y} bg-[var(--background)]`;
export const ELECTRICS_SECTION_SHELL_MUTED = `scroll-mt-28 ${ELECTRICS_SECTION_PAD_Y} bg-[var(--surface-muted)]`;

/**
 * Same top as {@link ELECTRICS_SECTION_PAD_Y}; bottom matches {@link ELECTRICS_HERO_BOTTOM_ONLY}.
 * Use where a band ends into a strong contrast (Areas → gradient, gradient → Contact) so the seam matches hero → Services.
 */
export const ELECTRICS_SECTION_PAD_Y_MAJOR_SEAM = "pt-14 md:pt-20 pb-14 md:pb-20";

/** Full-width section shell with {@link ELECTRICS_SECTION_PAD_Y_MAJOR_SEAM} (Areas, Contact before footer). */
export const ELECTRICS_SECTION_SHELL_MAJOR_SEAM = `scroll-mt-28 ${ELECTRICS_SECTION_PAD_Y_MAJOR_SEAM} bg-[var(--background)]`;

/** Hero inner column bottom only — pairs with first section’s top padding for the same gap as section↔section. */
export const ELECTRICS_HERO_BOTTOM_ONLY = "pb-14 md:pb-20";

type ElectricsSectionProps = {
  id?: string;
  children: ReactNode;
  className?: string;
  muted?: boolean;
  /** Larger bottom padding before footer or high-contrast band ({@link ELECTRICS_SECTION_SHELL_MAJOR_SEAM}). */
  majorSeam?: boolean;
};

export function ElectricsSection({ id, children, className = "", muted = false, majorSeam = false }: ElectricsSectionProps) {
  const shell = muted
    ? ELECTRICS_SECTION_SHELL_MUTED
    : majorSeam
      ? ELECTRICS_SECTION_SHELL_MAJOR_SEAM
      : ELECTRICS_SECTION_SHELL;

  return (
    <section id={id} className={`${shell} ${className}`}>
      <div className="mx-auto w-full max-w-7xl px-6">{children}</div>
    </section>
  );
}
