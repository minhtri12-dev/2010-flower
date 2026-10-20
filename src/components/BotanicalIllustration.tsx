import { motion, useReducedMotion } from 'framer-motion';
import { FLOWER_COLOR_THEMES } from '../types/garden';
import { LilyFlowerHead } from './PlantedFlowerSvg';

export function BotanicalIllustration() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="botanical-frame" aria-hidden="true">
      <motion.svg
        width="156"
        height="156"
        viewBox="0 0 160 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        animate={
          shouldReduceMotion
            ? {}
            : {
                y: [0, -4, 0],
                rotate: [0, 1, -1, 0],
              }
        }
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <defs>
          <linearGradient id="stemOliveWelcome" x1="80" y1="78" x2="80" y2="148" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#7B8870" />
            <stop offset="100%" stopColor="#A8B59A" stopOpacity="0.45" />
          </linearGradient>
        </defs>

        {/* Warm Botanical Journal Halos */}
        <circle cx="80" cy="72" r="56" stroke="#D3B77A" strokeOpacity="0.35" strokeWidth="1" strokeDasharray="3 5" />
        <circle cx="80" cy="72" r="44" stroke="#A8B59A" strokeOpacity="0.28" strokeWidth="1" />

        {/* Slender Stem & Lanceolate Leaves */}
        <path d="M80 82C80 108 79 126 80 146" stroke="url(#stemOliveWelcome)" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M80 120C65 114 50 102 48 88C61 92 73 104 80 120Z" fill="#A8B59A" fillOpacity="0.52" stroke="#7B8870" strokeOpacity="0.5" strokeWidth="0.9" />
        <path d="M80 126C95 120 110 108 112 94C99 98 87 110 80 126Z" fill="#7B8870" fillOpacity="0.38" stroke="#7B8870" strokeOpacity="0.5" strokeWidth="0.9" />

        {/* Side Lily Bud Accent */}
        <g transform="translate(56, 78) rotate(-28) scale(0.55)">
          <LilyFlowerHead
            idPrefix="welcome-bud"
            variant="lily-bud"
            colorTheme={FLOWER_COLOR_THEMES[1]}
          />
        </g>

        {/* Main Blooming Lily Emblem */}
        <g transform="translate(80, 76) scale(1.12)">
          <LilyFlowerHead
            idPrefix="welcome-hero"
            variant="lily-open"
            colorTheme={FLOWER_COLOR_THEMES[0]}
          />
        </g>

        {/* Honey Gold Botanical Motes */}
        <circle cx="44" cy="36" r="2" fill="#D3B77A" />
        <circle cx="118" cy="38" r="1.6" fill="#DFA89B" />
        <circle cx="122" cy="88" r="1.8" fill="#D3B77A" />
      </motion.svg>
    </div>
  );
}