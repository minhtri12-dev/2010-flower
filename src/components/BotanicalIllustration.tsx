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
          <radialGradient id="journalPetal" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.98" />
            <stop offset="55%" stopColor="#DFA89B" stopOpacity="0.85" />
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

        <circle cx="80" cy="74" r="54" stroke="#D3B77A" strokeOpacity="0.3" strokeWidth="1" strokeDasharray="3 5" />
        <circle cx="80" cy="74" r="42" stroke="#A8B59A" strokeOpacity="0.25" strokeWidth="1" />

        <path d="M80 92C80 112 79 128 80 146" stroke="url(#stemOlive)" strokeWidth="2" strokeLinecap="round" />
        <path d="M80 120C68 118 58 110 56 102C66 102 76 108 80 120Z" fill="#A8B59A" fillOpacity="0.4" stroke="#7B8870" strokeOpacity="0.4" strokeWidth="1" />
        <path d="M80 126C92 124 102 116 104 108C94 108 84 114 80 126Z" fill="#DFA89B" fillOpacity="0.4" stroke="#7B8870" strokeOpacity="0.4" strokeWidth="1" />

        <g>
          <path d="M80 28C66 42 62 60 80 78C98 60 94 42 80 28Z" fill="url(#journalPetal)" />
          <path d="M46 44C46 62 58 76 80 78C74 56 62 44 46 44Z" fill="#A8B59A" fillOpacity="0.6" />
          <path d="M114 44C114 62 102 76 80 78C86 56 98 44 114 44Z" fill="#A8B59A" fillOpacity="0.6" />
          <path d="M36 68C48 84 64 88 80 78C66 64 50 62 36 68Z" fill="url(#journalPetal)" />
          <path d="M124 68C112 84 96 88 80 78C94 64 110 62 124 68Z" fill="url(#journalPetal)" />
          <path d="M80 40C70 54 70 68 80 80C90 68 90 54 80 40Z" fill="#FFFDF9" fillOpacity="0.95" />
        </g>

        <circle cx="80" cy="74" r="6" fill="url(#coreGold)" />
        <circle cx="80" cy="74" r="11" stroke="#D3B77A" strokeOpacity="0.6" strokeWidth="1" />

        <circle cx="48" cy="34" r="2" fill="#D3B77A" />
        <circle cx="116" cy="36" r="1.5" fill="#FFFDF9" />
        <circle cx="122" cy="92" r="2" fill="#DFA89B" />
      </motion.svg>
    </div>
  );
}