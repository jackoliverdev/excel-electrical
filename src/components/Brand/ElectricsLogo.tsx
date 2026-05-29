"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";

const LIGHT_LOGO_SRC = "/ExcelElectrics/NewLogo/Excel Electrics Horizontal Light Mode.png";
const DARK_LOGO_SRC = "/ExcelElectrics/NewLogo/Excel Electrics Horizontal Dark Mode.png";
const LOGO_ASPECT_RATIO = 5000 / 1042;

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
  priority = false,
  variant = "auto",
}: ElectricsLogoProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const renderedHeight = Math.round(width / LOGO_ASPECT_RATIO);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setMounted(true));
    return () => window.cancelAnimationFrame(frame);
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
    <Image
      src={logoSrc}
      alt="Excel Electrics - Wire & Fire"
      width={width}
      height={renderedHeight}
      className={`object-contain object-left ${className}`}
      style={{ width, height: "auto" }}
      priority={priority}
    />
  );
}
