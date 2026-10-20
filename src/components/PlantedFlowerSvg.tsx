import { memo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import type { PlantedFlower, FlowerVariant, FlowerColorTheme } from '../types/garden';

interface LilyFlowerHeadProps {
  idPrefix: string;
  variant: FlowerVariant;
  colorTheme: FlowerColorTheme;
  rotation?: number;
}

export function LilyFlowerHead({
  idPrefix,
  variant,
  colorTheme,
  rotation = 0,
}: LilyFlowerHeadProps) {
  const gradInnerId = `lily-inner-${idPrefix}`;
  const gradOuterId = `lily-outer-${idPrefix}`;
  const gradCoreId = `lily-core-${idPrefix}`;

  if (variant === 'lily-bud') {
    return (
      <g transform={`rotate(${rotation})`}>
        <defs>
          <linearGradient id={gradInnerId} x1="0" y1="8" x2="0" y2="-40" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#A8B59A" />
            <stop offset="48%" stopColor={colorTheme.primary} />
            <stop offset="100%" stopColor={colorTheme.secondary} />
          </linearGradient>
        </defs>
        {/* Outer clasping green-blush sepals */}
        <path
          d="M 0 8 C -10 -4 -11 -22 -2 -38 C 0 -41 2 -41 2 -38 C 11 -22 10 -4 0 8 Z"
          fill={`url(#${gradInnerId})`}
          stroke="#7B8870"
          strokeWidth="0.85"
        />
        {/* Inner parting bud tepal seam */}
        <path
          d="M 0 6 C -5 -6 -5 -22 0 -36 C 5 -22 5 -6 0 6 Z"
          fill={colorTheme.secondary}
          fillOpacity="0.72"
        />
        <path
          d="M 0 7 Q -2 -15 0 -35"
          stroke={colorTheme.accent}
          strokeWidth="0.8"
          strokeOpacity="0.65"
          fill="none"
        />
        {/* Calyx base */}
        <path
          d="M -5 5 Q 0 11 5 5"
          stroke="#7B8870"
          strokeWidth="1.4"
          strokeLinecap="round"
          fill="none"
        />
      </g>
    );
  }

  const isWideOpen = variant === 'lily-open';
  const outerAngles = isWideOpen ? [-58, 0, 58] : [-44, 0, 44];
  const innerAngles = isWideOpen ? [-118, -28, 28, 118, 180] : [-22, 22, 180];
  const stamenAngles = [-30, -18, -6, 6, 18, 30];

  return (
    <g transform={`rotate(${rotation})`}>
      <defs>
        <radialGradient id={gradOuterId} cx="50%" cy="68%" r="72%">
          <stop offset="0%" stopColor={colorTheme.secondary} />
          <stop offset="58%" stopColor={colorTheme.primary} stopOpacity="0.92" />
          <stop offset="100%" stopColor={colorTheme.secondary} stopOpacity="0.96" />
        </radialGradient>

        <radialGradient id={gradInnerId} cx="50%" cy="62%" r="70%">
          <stop offset="0%" stopColor="#FFFDF9" />
          <stop offset="50%" stopColor={colorTheme.primary} />
          <stop offset="100%" stopColor={colorTheme.accent} stopOpacity="0.88" />
        </radialGradient>

        <radialGradient id={gradCoreId} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#A8B59A" />
          <stop offset="65%" stopColor="#D3B77A" />
          <stop offset="100%" stopColor={colorTheme.accent} />
        </radialGradient>
      </defs>

      {/* 3 Outer Sculpted Tepals (Pointed tips, natural lily curve) */}
      {outerAngles.map((deg, idx) => (
        <g key={`outer-tepal-${idx}`} transform={`rotate(${deg})`}>
          <path
            d="M 0 3 C -9 -6 -13 -22 -7 -36 C -4 -42 -1 -46 0 -49 C 1 -46 4 -42 7 -36 C 13 -22 9 -6 0 3 Z"
            fill={`url(#${gradOuterId})`}
            stroke={colorTheme.accent}
            strokeOpacity="0.42"
            strokeWidth="0.7"
          />
          <path
            d="M 0 1 Q 0 -20 0 -41"
            stroke={colorTheme.accent}
            strokeOpacity="0.45"
            strokeWidth="0.75"
            fill="none"
          />
        </g>
      ))}

      {/* 3 (or 5 in wide-open view) Inner Recurved Tepals with Nectar Speckles */}
      {innerAngles.map((deg, idx) => (
        <g key={`inner-tepal-${idx}`} transform={`rotate(${deg})`}>
          <path
            d={
              isWideOpen
                ? 'M 0 2 C -11 -7 -15 -21 -8 -34 C -4 -40 -1 -43 0 -45 C 1 -43 4 -40 8 -34 C 15 -21 11 -7 0 2 Z'
                : 'M 0 2 C -10 -7 -14 -20 -7 -33 C -3 -39 -1 -42 0 -44 C 1 -42 3 -39 7 -33 C 14 -20 10 -7 0 2 Z'
            }
            fill={`url(#${gradInnerId})`}
            stroke="#FFFDF9"
            strokeOpacity="0.7"
            strokeWidth="0.7"
          />
          {/* Central Midrib Vein */}
          <path
            d="M 0 0 Q 0 -18 0 -36"
            stroke={colorTheme.accent}
            strokeOpacity="0.58"
            strokeWidth="0.9"
            fill="none"
          />
          {/* Botanical Lily Nectar Speckles near throat */}
          <circle cx="-2.2" cy="-11" r="0.75" fill={colorTheme.accent} fillOpacity="0.65" />
          <circle cx="2.4" cy="-13" r="0.7" fill={colorTheme.accent} fillOpacity="0.65" />
          <circle cx="-1.5" cy="-16" r="0.65" fill={colorTheme.accent} fillOpacity="0.55" />
          <circle cx="1.8" cy="-18" r="0.65" fill={colorTheme.accent} fillOpacity="0.55" />
        </g>
      ))}

      {/* Throat Nectar Glow */}
      <circle cx="0" cy="-1" r="4.2" fill={`url(#${gradCoreId})`} />

      {/* Central Pistil / Style & Stigma */}
      <path
        d="M 0 0 Q 1 -16 0 -29"
        stroke="#7B8870"
        strokeWidth="1.15"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="0" cy="-30" r="1.9" fill="#A8B59A" stroke="#7B8870" strokeWidth="0.6" />

      {/* 6 Long Curved Lily Stamens with Prominent Anthers */}
      {stamenAngles.map((deg, idx) => {
        const curveOffset = idx < 3 ? -3.5 : 3.5;
        const length = idx === 2 || idx === 3 ? -26 : -23;
        return (
          <g key={`stamen-${idx}`} transform={`rotate(${deg})`}>
            <path
              d={`M 0 0 Q ${curveOffset} ${length * 0.55} 0 ${length}`}
              stroke="#FFFDF9"
              strokeWidth="0.85"
              strokeOpacity="0.92"
              fill="none"
            />
            <ellipse
              cx="0"
              cy={length - 1}
              rx="2.3"
              ry="1.15"
              fill="#B6844E"
              stroke="#D3B77A"
              strokeWidth="0.45"
              transform={`rotate(${deg * 0.6} 0 ${length - 1})`}
            />
          </g>
        );
      })}
    </g>
  );
}

interface PlantedFlowerSvgProps {
  flower: PlantedFlower;
  index: number;
}

function PlantedFlowerSvgComponent({ flower, index }: PlantedFlowerSvgProps) {
  const shouldReduceMotion = useReducedMotion();
  const {
    id,
    xPercent,
    yPercent,
    variant,
    scale,
    rotation,
    stemHeight,
    stemCurve,
    colorTheme,
  } = flower;

  const gradStemId = `stem-grad-${id}`;

  const headY = 145 - stemHeight;
  const midY = (145 + headY) / 2;
  const controlX = 60 + stemCurve;

  const swayDuration = 5.2 + (index % 4) * 0.85;

  return (
    <div
      className="planted-flower-anchor"
      style={{
        left: `${xPercent}%`,
        top: `${yPercent}%`,
        zIndex: Math.round(yPercent),
      }}
      aria-hidden="true"
    >
      <motion.div
        className="flower-ground-ripple"
        initial={{ scale: 0.2, opacity: 0.7 }}
        animate={{ scale: 1.5, opacity: 0 }}
        transition={{ duration: 1.1, ease: 'easeOut' }}
        style={{ borderColor: colorTheme.core }}
      />

      <motion.div
        className="planted-flower-sway"
        style={{ scale }}
        animate={
          shouldReduceMotion
            ? {}
            : {
                rotate: [-1.5, 1.5, -1.5],
              }
        }
        transition={{
          duration: swayDuration,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <svg
          width="120"
          height="155"
          viewBox="0 0 120 155"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="planted-flower-svg"
        >
          <defs>
            <linearGradient
              id={gradStemId}
              x1="60"
              y1={headY}
              x2="60"
              y2="145"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#A8B59A" stopOpacity="0.98" />
              <stop offset="58%" stopColor="#7B8870" stopOpacity="0.88" />
              <stop offset="100%" stopColor="#343B30" stopOpacity="0.32" />
            </linearGradient>
          </defs>

          {/* Soft Warm Botanical Aura */}
          <motion.circle
            cx="60"
            cy={headY - 8}
            r="26"
            fill={colorTheme.glow}
            style={{ filter: 'blur(8px)' }}
            initial={{ opacity: 0, scale: 0.2 }}
            animate={{ opacity: 0.7, scale: 1 }}
            transition={{
              delay: shouldReduceMotion ? 0 : 0.22,
              duration: 0.65,
              ease: 'easeOut',
            }}
          />

          {/* Slender Lily Stem */}
          <motion.path
            d={`M 60 145 Q ${controlX} ${midY} 60 ${headY}`}
            stroke={`url(#${gradStemId})`}
            strokeWidth="2.3"
            strokeLinecap="round"
            initial={{ pathLength: shouldReduceMotion ? 1 : 0, opacity: 0.3 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.42, ease: 'easeOut' }}
          />

          {/* Left Lanceolate Lily Leaf */}
          <motion.path
            d={`M 60 ${midY + 14} C 43 ${midY + 8} 30 ${midY - 6} 33 ${midY - 22} C 44 ${midY - 12} 54 ${midY - 1} 60 ${midY + 14} Z`}
            fill="#A8B59A"
            fillOpacity="0.62"
            stroke="#7B8870"
            strokeOpacity="0.65"
            strokeWidth="0.9"
            style={{ transformOrigin: `60px ${midY + 14}px` }}
            initial={{ scale: shouldReduceMotion ? 1 : 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              delay: shouldReduceMotion ? 0 : 0.16,
              duration: 0.45,
              ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
            }}
          />

          {/* Right Lanceolate Lily Leaf */}
          <motion.path
            d={`M 60 ${midY + 4} C 77 ${midY - 2} 90 ${midY - 16} 87 ${midY - 31} C 76 ${midY - 21} 66 ${midY - 8} 60 ${midY + 4} Z`}
            fill="#7B8870"
            fillOpacity="0.45"
            stroke="#7B8870"
            strokeOpacity="0.65"
            strokeWidth="0.9"
            style={{ transformOrigin: `60px ${midY + 4}px` }}
            initial={{ scale: shouldReduceMotion ? 1 : 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              delay: shouldReduceMotion ? 0 : 0.22,
              duration: 0.45,
              ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
            }}
          />

          {/* Blooming Lily Head */}
          <motion.g
            style={{ transformOrigin: `60px ${headY}px` }}
            initial={{
              scale: shouldReduceMotion ? 1 : 0.08,
              opacity: 0,
            }}
            animate={{
              scale: 1,
              opacity: 1,
            }}
            transition={{
              delay: shouldReduceMotion ? 0 : 0.2,
              duration: 0.68,
              ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
            }}
          >
            <g transform={`translate(60, ${headY})`}>
              <LilyFlowerHead
                idPrefix={id}
                variant={variant}
                colorTheme={colorTheme}
                rotation={rotation}
              />
            </g>
          </motion.g>
        </svg>
      </motion.div>
    </div>
  );
}

export const PlantedFlowerSvg = memo(PlantedFlowerSvgComponent);