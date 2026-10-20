import { motion, useReducedMotion } from 'framer-motion';

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
          <radialGradient id="journalLilyPetal" cx="50%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#FFFDF9" stopOpacity="0.98" />
            <stop offset="55%" stopColor="#DFA89B" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#A8B59A" stopOpacity="0.4" />
          </radialGradient>

          <linearGradient id="stemOlive" x1="80" y1="88" x2="80" y2="148" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#7B8870" />
            <stop offset="100%" stopColor="#A8B59A" stopOpacity="0.5" />
          </linearGradient>

          <radialGradient id="coreGold" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFDF9" />
            <stop offset="100%" stopColor="#D3B77A" />
          </radialGradient>
        </defs>

        {/* Outer Warm Botanical Halos */}
        <circle cx="80" cy="74" r="54" stroke="#D3B77A" strokeOpacity="0.3" strokeWidth="1" strokeDasharray="3 5" />
        <circle cx="80" cy="74" r="42" stroke="#A8B59A" strokeOpacity="0.25" strokeWidth="1" />

        {/* Stem & Lanceolate Leaves */}
        <path d="M80 92C80 112 79 128 80 146" stroke="url(#stemOlive)" strokeWidth="2" strokeLinecap="round" />
        <path d="M80 118C68 116 54 108 52 98C64 98 74 106 80 118Z" fill="#A8B59A" fillOpacity="0.45" stroke="#7B8870" strokeOpacity="0.4" strokeWidth="0.9" />
        <path d="M80 124C92 122 106 114 108 104C96 104 86 112 80 124Z" fill="#DFA89B" fillOpacity="0.4" stroke="#7B8870" strokeOpacity="0.4" strokeWidth="0.9" />

        {/* 6 Characteristic Lily Petals */}
        <g transform="translate(80, 72)">
          {/* 3 Outer Petals */}
          {[-45, 0, 45].map((deg, idx) => (
            <path
              key={`welcome-outer-${idx}`}
              d="M0 6 C-15 -14 -20 -36 0 -54 C20 -36 15 -14 0 6 Z"
              fill="#FFFDF9"
              fillOpacity="0.88"
              stroke="#DFA89B"
              strokeWidth="0.8"
              transform={`rotate(${deg})`}
            />
          ))}

          {/* 3 Inner Petals */}
          {[-22, 22, 180].map((deg, idx) => (
            <path
              key={`welcome-inner-${idx}`}
              d="M0 4 C-12 -12 -16 -30 0 -46 C16 -30 12 -12 0 4 Z"
              fill="url(#journalLilyPetal)"
              transform={`rotate(${deg})`}
            />
          ))}

          {/* Long Stamens & Center Anthers */}
          {[-28, -14, 0, 14, 28].map((deg, idx) => (
            <g key={`welcome-stamen-${idx}`} transform={`rotate(${deg})`}>
              <line x1="0" y1="0" x2="0" y2="-28" stroke="#D3B77A" strokeWidth="0.9" />
              <circle cx="0" cy="-29" r="2" fill="#7B8870" />
            </g>
          ))}

          <circle cx="0" cy="0" r="4.5" fill="url(#coreGold)" />
        </g>

        {/* Starlight Accents */}
        <circle cx="48" cy="34" r="2" fill="#D3B77A" />
        <circle cx="116" cy="36" r="1.5" fill="#FFFDF9" />
        <circle cx="122" cy="92" r="2" fill="#DFA89B" />
      </motion.svg>
    </div>
  );
} 