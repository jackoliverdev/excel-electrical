import Image from "next/image";

const LOGO_SRC = "/ExcelElectrics/ExcelElectrics.png";

type ElectricsLogoProps = {
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
};

export function ElectricsLogo({
  className = "",
  width = 220,
  height = 56,
  priority = false,
}: ElectricsLogoProps) {
  return (
    <Image
      src={LOGO_SRC}
      alt="Excel Electrics — Wire & Fire"
      width={width}
      height={height}
      className={`h-auto w-auto max-w-full object-contain object-left ${className}`}
      style={{ width: "auto", height: "auto" }}
      priority={priority}
      sizes={`${width}px`}
    />
  );
}
