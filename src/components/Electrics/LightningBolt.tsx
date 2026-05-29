"use client";

import { useId } from "react";
import { motion, useTransform, type MotionValue } from "motion/react";

/**
 * Vertical lightning bolt that echoes the Excel Electrics brand mark (sharp, angular zig-zag).
 *
 * The full gradient bolt is drawn once, then revealed top → bottom by a clip rectangle that
 * grows with `progress`. Clipping (rather than a stroke dash) gives one solid, continuous fill
 * with no gaps, even though the bolt is stretched vertically to each card's height.
 */
const BOLT_PATH = "M14 2 L6 26 L18 44 L7 62 L17 82 L9 102 L14 118";
const VIEWBOX_WIDTH = 24;
const VIEWBOX_HEIGHT = 120;

type LightningBoltProps = {
  /** 0 → 1 charge for this bolt; the colour fills from top to bottom as it grows. */
  progress: MotionValue<number>;
  className?: string;
};

export function LightningBolt({ progress, className }: LightningBoltProps) {
  const uid = useId().replace(/[:]/g, "");
  const gradientId = `bolt-fill-${uid}`;
  const clipId = `bolt-clip-${uid}`;

  const revealHeight = useTransform(progress, (v) => Math.min(1, Math.max(0, v)) * VIEWBOX_HEIGHT);

  return (
    <svg
      aria-hidden
      className={className}
      viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
      preserveAspectRatio="none"
      fill="none"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#b794ff" />
          <stop offset="45%" stopColor="#905bf4" />
          <stop offset="100%" stopColor="#4b378c" />
        </linearGradient>
        <clipPath id={clipId}>
          <motion.rect x={0} y={0} width={VIEWBOX_WIDTH} height={revealHeight} />
        </clipPath>
      </defs>

      {/* Un-charged track */}
      <path
        d={BOLT_PATH}
        stroke="#4b378c"
        strokeOpacity={0.2}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />

      {/* Solid charged fill, revealed top → bottom by scroll */}
      <g clipPath={`url(#${clipId})`}>
        <path
          d={BOLT_PATH}
          stroke={`url(#${gradientId})`}
          strokeWidth={2.4}
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          style={{ filter: "drop-shadow(0 0 3px rgba(144, 91, 244, 0.5))" }}
        />
      </g>
    </svg>
  );
}
