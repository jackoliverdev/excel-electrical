"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

const LIGHT_LOGO_SRC = "/ExcelElectrics/Excel Electrics Logo Purple.png";
const DARK_LOGO_SRC = "/ExcelElectrics/Excel Electrics Logo Darkmode.png";

type ElectricsLogoProps = {
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  variant?: "auto" | "light" | "dark";
};

export function ElectricsLogo({
  className = "",
  width = 220,
  height = 56,
  priority = false,
  variant = "auto",
}: ElectricsLogoProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const logoSrc =
    variant === "dark"
      ? DARK_LOGO_SRC
      : variant === "light"
        ? LIGHT_LOGO_SRC
        : mounted && resolvedTheme === "dark"
          ? DARK_LOGO_SRC
          : LIGHT_LOGO_SRC;

  return (
    <img
      src={logoSrc}
      alt="Excel Electrics - Wire & Fire"
      width={width}
      height={height}
      className={`object-contain object-left ${className}`}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding="async"
    />
  );
}
