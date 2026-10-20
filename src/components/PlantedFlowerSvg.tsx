import { memo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import type { PlantedFlower } from '../types/garden';

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

  const gradPetalId = `petal-grad-${id}`;
  const gradStemId = `stem-grad-${id}`;
  const gradCoreId = `core-grad-${id}`;

  const headY = 145 - stemHeight;
  const midY = (145 + headY) / 2;
  const controlX = 60 + stemCurve;

  const swayDuration = 5.2 + (index % 4) * 0.85;

  const renderLilyCorolla = () => {
    if (variant === 'lily-bud') {
      return (
        <g transform={`translate(60, ${headY}) rotate(${rotation})`}>
          <path
            d="M0 6 C-8 -10 -6 -26 0 -38 C6 -26 8 -10 0 6 Z"
            fill="#A8B59A"
            stroke="#7B8870"
            strokeWidth="1"
          />
          <path
            d="M-3 -2 C-10 -12 -8 -24 0 -34"
            stroke="#DFA89B"
            strokeWidth="1.2"
            fill="none"
          />
        </g>
      );
    }

    return (
      <g transform={`translate(60, ${headY}) rotate(${rotation})`}>
        {/* 3 Outer Petals */}
        {[-42, 0, 42].map((deg, idx) => (
          <path
            key={`outer-${idx}`}
            d="M0 4 C-14 -12 -18 -32 0 -48 C18 -32 14 -12 0 4 Z"
            fill={colorTheme.secondary}
            fillOpacity="0.88"
            stroke={colorTheme.primary}
            strokeWidth="0.8"
            transform={`rotate(${deg})`}
          />
        ))}

        {/* 3 Inner Petals (Curving gracefully outwards) */}
        {[-21, 21, 180].map((deg, idx) => (
          <path
            key={`inner-${idx}`}
            d="M0 2 C-11 -10 -14 -28 0 -42 C14 -28 11 -10 0 2 Z"
            fill={`url(#${gradPetalId})`}
            transform={`rotate(${deg})`}
          />
        ))}

        {/* Long Lily Stamens & Anthers */}
        {[-25, -12, 0, 12, 25].map((deg, idx) => (
          <g key={`stamen-${idx}`} transform={`rotate(${deg})`}>
            <line x1="0" y1="0" x2="0" y2="-26" stroke="#D3B77A" strokeWidth="0.9" />
            <circle cx="0" cy="-27" r="2" fill="#7B8870" />
          </g>
        ))}
      </g>
    );
  };

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
            <radialGradient id={gradPetalId} cx="50%" cy="35%" r="65%">
              <stop offset="0%" stopColor={colorTheme.secondary} stopOpacity="0.98" />
              <stop offset="60%" stopColor={colorTheme.primary} stopOpacity="0.92" />
              <stop offset="100%" stopColor="#A8B59A" stopOpacity="0.4" />
            </radialGradient>

            <linearGradient
              id={gradStemId}
              x1="60"
              y1={headY}
              x2="60"
              y2="145"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#A8B59A" stopOpacity="0.95" />
              <stop offset="55%" stopColor="#7B8870" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#343B30" stopOpacity="0.25" />
            </linearGradient>

            <radialGradient id={gradCoreId} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFFDF9" />
              <stop offset="100%" stopColor={colorTheme.core} />
            </radialGradient>
          </defs>

          <motion.circle
            cx="60"
            cy={headY}
            r="26"
            fill={colorTheme.glow}
            style={{ filter: 'blur(8px)' }}
            initial={{ opacity: 0, scale: 0.2 }}
            animate={{ opacity: 0.75, scale: 1 }}
            transition={{
              delay: shouldReduceMotion ? 0 : 0.24,
              duration: 0.65,
              ease: 'easeOut',
            }}
          />

          {/* Stem */}
          <motion.path
            d={`M 60 145 Q ${controlX} ${midY} 60 ${headY}`}
            stroke={`url(#${gradStemId})`}
            strokeWidth="2.2"
            strokeLinecap="round"
            initial={{ pathLength: shouldReduceMotion ? 1 : 0, opacity: 0.3 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.42, ease: 'easeOut' }}
          />

          {/* Lanceolate Leaf Left */}
          <motion.path
            d={`M 60 ${midY + 12} C 42 ${midY + 6} 30 ${midY - 8} 34 ${midY - 22} C 44 ${midY - 14} 54 ${midY - 2} 60 ${midY + 12} Z`}
            fill="#A8B59A"
            fillOpacity="0.45"
            stroke="#7B8870"
            strokeOpacity="0.55"
            strokeWidth="0.9"
            style={{ transformOrigin: `60px ${midY + 12}px` }}
            initial={{ scale: shouldReduceMotion ? 1 : 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              delay: shouldReduceMotion ? 0 : 0.18,
              duration: 0.45,
              ease: [0.22, 1, 0.36, 1],
            }}
          />

          {/* Lanceolate Leaf Right */}
          <motion.path
            d={`M 60 ${midY + 4} C 78 ${midY - 2} 90 ${midY - 16} 86 ${midY - 30} C 76 ${midY - 22} 66 ${midY - 8} 60 ${midY + 4} Z`}
            fill="#DFA89B"
            fillOpacity="0.35"
            stroke="#7B8870"
            strokeOpacity="0.55"
            strokeWidth="0.9"
            style={{ transformOrigin: `60px ${midY + 4}px` }}
            initial={{ scale: shouldReduceMotion ? 1 : 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              delay: shouldReduceMotion ? 0 : 0.24,
              duration: 0.45,
              ease: [0.22, 1, 0.36, 1],
            }}
          />

          {/* Lily Flower Corolla */}
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
              delay: shouldReduceMotion ? 0 : 0.22,
              duration: 0.68,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {renderLilyCorolla()}
            <circle cx="60" cy={headY} r="4.5" fill={`url(#${gradCoreId})`} />
          </motion.g>
        </svg>
      </motion.div>
    </div>
  );
}

export const PlantedFlowerSvg = memo(PlantedFlowerSvgComponent);