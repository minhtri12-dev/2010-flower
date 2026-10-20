import { motion, useReducedMotion } from 'framer-motion';

interface FinalSurpriseStageProps {
  onRestartGarden: () => void;
  onBack: () => void;
}

export function FinalSurpriseStage({
  onRestartGarden,
  onBack,
}: FinalSurpriseStageProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.section
      className="welcome-card final-surprise-card"
      initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      aria-label="One Last Surprise"
    >
      <div className="final-bouquet-frame" aria-hidden="true">
        <motion.svg
          width="170"
          height="170"
          viewBox="0 0 160 160"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          animate={
            shouldReduceMotion
              ? {}
              : {
                  y: [0, -5, 0],
                  scale: [1, 1.02, 1],
                }
          }
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <defs>
            <radialGradient id="bouquetCoreGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFFDF9" stopOpacity="1" />
              <stop offset="50%" stopColor="#D3B77A" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#7B8870" stopOpacity="0.2" />
            </radialGradient>
            <radialGradient id="petalPinkWarm" cx="50%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#FFFDF9" stopOpacity="0.98" />
              <stop offset="60%" stopColor="#DFA89B" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#A8B59A" stopOpacity="0.4" />
            </radialGradient>
          </defs>

          <circle cx="80" cy="74" r="58" stroke="#D3B77A" strokeOpacity="0.28" strokeWidth="1" strokeDasharray="4 4" />
          <circle cx="80" cy="74" r="46" stroke="#A8B59A" strokeOpacity="0.32" strokeWidth="1" />
          <circle cx="80" cy="74" r="32" fill="url(#bouquetCoreGlow)" fillOpacity="0.3" style={{ filter: 'blur(8px)' }} />

          <path d="M72 96 C70 118 64 135 52 148" stroke="#D3B77A" strokeOpacity="0.7" strokeWidth="2" strokeLinecap="round" />
          <path d="M88 96 C90 118 96 135 108 148" stroke="#D3B77A" strokeOpacity="0.7" strokeWidth="2" strokeLinecap="round" />
          <path d="M80 96 C80 120 80 138 80 150" stroke="#7B8870" strokeOpacity="0.55" strokeWidth="2.5" strokeLinecap="round" />

          <path d="M68 112 C60 102 48 106 52 118 C56 128 68 120 72 116 Z" fill="#DFA89B" fillOpacity="0.8" />
          <path d="M92 112 C100 102 112 106 108 118 C104 128 92 120 88 116 Z" fill="#DFA89B" fillOpacity="0.8" />
          <circle cx="80" cy="114" r="5" fill="#D3B77A" />

          {[-50, -25, 0, 25, 50].map((angle, idx) => (
            <g key={idx} transform={`rotate(${angle} 80 72)`}>
              <path
                d="M80 34 C68 46 64 64 80 78 C96 64 92 46 80 34 Z"
                fill="url(#petalPinkWarm)"
              />
            </g>
          ))}

          <circle cx="80" cy="72" r="10" fill="url(#bouquetCoreGlow)" />
          <circle cx="80" cy="72" r="15" stroke="#D3B77A" strokeOpacity="0.75" strokeWidth="1" />
        </motion.svg>
      </div>

      <span className="eyebrow-badge">OCTOBER 20TH · A KEEPSAKE BLOOM</span>

      <h2 className="hero-title">
        A Little More Happiness
      </h2>

      <p className="hero-description" style={{ marginBottom: '1.25rem' }}>
        Your garden will always be here whenever you need a little color in your day.
      </p>

      <p className="handwritten-whisper" style={{ marginBottom: '1.85rem' }}>
        wishing you a truly wonderful week ahead
      </p>

      <div className="stage-action-row" style={{ justifyContent: 'center' }}>
        <button type="button" className="btn-secondary" onClick={onBack}>
          Previous Note
        </button>
        <button
          type="button"
          className="btn-enter-garden"
          onClick={onRestartGarden}
        >
          <span>Grow Another Flower</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 5v14" />
            <path d="M5 12h14" />
          </svg>
        </button>
      </div>
    </motion.section>
  );
}