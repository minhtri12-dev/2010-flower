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

  const renderCorolla = () => {
    switch (variant) {
      case 'lotus':
        return (
          <g transform={`translate(60, ${headY}) rotate(${rotation})`}>
            {[-48, -22, 22, 48].map((deg, idx) => (
              <path
                key={`back-${idx}`}
                d="M0 4 C-11 -10 -9 -28 0 -38 C9 -28 11 -10 0 4 Z"
                fill={colorTheme.secondary}
                fillOpacity="0.65"
                transform={`rotate(${deg})`}
              />
            ))}
            {[-34, 0, 34].map((deg, idx) => (
              <path
                key={`mid-${idx}`}
                d="M0 4 C-13 -8 -11 -26 0 -36 C11 -26 13 -8 0 4 Z"
                fill={`url(#${gradPetalId})`}
                transform={`rotate(${deg})`}
              />
            ))}
            <path
              d="M0 6 C-9 -6 -8 -22 0 -31 C8 -22 9 -6 0 6 Z"
              fill={colorTheme.secondary}
              fillOpacity="0.95"
            />
          </g>
        );

      case 'cosmos':
        return (
          <g transform={`translate(60, ${headY}) rotate(${rotation})`}>
            {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, idx) => (
              <path
                key={`cosmos-${idx}`}
                d="M0 0 C-8 -10 -10 -26 -3 -32 C0 -30 0 -29 3 -32 C10 -26 8 -10 0 0 Z"
                fill={idx % 2 === 0 ? `url(#${gradPetalId})` : colorTheme.secondary}
                fillOpacity={idx % 2 === 0 ? 0.95 : 0.8}
                transform={`rotate(${deg})`}
              />
            ))}
          </g>
        );

      case 'bellflower':
        return (
          <g transform={`translate(60, ${headY}) rotate(${rotation})`}>
            {[0, 60, 120, 180, 240, 300].map((deg, idx) => (
              <path
                key={`bell-${idx}`}
                d="M0 2 C-12 -6 -7 -26 0 -34 C7 -26 12 -6 0 2 Z"
                fill={`url(#${gradPetalId})`}
                stroke={colorTheme.secondary}
                strokeOpacity="0.5"
                strokeWidth="0.6"
                transform={`rotate(${deg})`}
              />
            ))}
            <circle cx="0" cy="0" r="12" fill={colorTheme.secondary} fillOpacity="0.4" />
          </g>
        );

      case 'camellia':
      default:
        return (
          <g transform={`translate(60, ${headY}) rotate(${rotation})`}>
            {[0, 72, 144, 216, 288].map((deg, idx) => (
              <path
                key={`cam-outer-${idx}`}
                d="M0 2 C-16 -8 -15 -28 0 -32 C15 -28 16 -8 0 2 Z"
                fill={`url(#${gradPetalId})`}
                transform={`rotate(${deg})`}
              />
            ))}
            {[36, 108, 180, 252, 324].map((deg, idx) => (
              <path
                key={`cam-inner-${idx}`}
                d="M0 2 C-12 -6 -11 -21 0 -24 C11 -21 12 -6 0 2 Z"
                fill={colorTheme.secondary}
                fillOpacity="0.9"
                transform={`rotate(${deg})`}
              />
            ))}
          </g>
        );
    }
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
              <stop offset="100%" stopColor="#7B8870" stopOpacity="0.45" />
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

          <motion.path
            d={`M 60 145 Q ${controlX} ${midY} 60 ${headY}`}
            stroke={`url(#${gradStemId})`}
            strokeWidth="2.2"
            strokeLinecap="round"
            initial={{ pathLength: shouldReduceMotion ? 1 : 0, opacity: 0.3 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.42, ease: 'easeOut' }}
          />

          <motion.path
            d={`M 60 ${midY + 10} C 44 ${midY + 6} 36 ${midY - 4} 38 ${midY - 12} C 48 ${midY - 10} 56 ${midY - 1} 60 ${midY + 10} Z`}
            fill="#A8B59A"
            fillOpacity="0.4"
            stroke="#7B8870"
            strokeOpacity="0.5"
            strokeWidth="0.9"
            style={{ transformOrigin: `60px ${midY + 10}px` }}
            initial={{ scale: shouldReduceMotion ? 1 : 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              delay: shouldReduceMotion ? 0 : 0.18,
              duration: 0.45,
              ease: [0.22, 1, 0.36, 1],
            }}
          />

          <motion.path
            d={`M 60 ${midY + 2} C 76 ${midY - 2} 84 ${midY - 12} 82 ${midY - 20} C 72 ${midY - 18} 64 ${midY - 9} 60 ${midY + 2} Z`}
            fill="#DFA89B"
            fillOpacity="0.35"
            stroke="#7B8870"
            strokeOpacity="0.5"
            strokeWidth="0.9"
            style={{ transformOrigin: `60px ${midY + 2}px` }}
            initial={{ scale: shouldReduceMotion ? 1 : 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              delay: shouldReduceMotion ? 0 : 0.24,
              duration: 0.45,
              ease: [0.22, 1, 0.36, 1],
            }}
          />

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
            {renderCorolla()}
            <circle cx="60" cy={headY} r="5.2" fill={`url(#${gradCoreId})`} />
            <circle
              cx="60"
              cy={headY}
              r="9.5"
              stroke="#D3B77A"
              strokeOpacity="0.7"
              strokeWidth="0.9"
              strokeDasharray="2 3"
            />
          </motion.g>
        </svg>
      </motion.div>
    </div>
  );
}

export const PlantedFlowerSvg = memo(PlantedFlowerSvgComponent);