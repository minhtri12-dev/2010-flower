import { motion, useReducedMotion } from 'framer-motion';
import type { StageMetadata } from '../../types/garden';

interface StagePlaceholderProps {
  stage: StageMetadata;
  onNext?: () => void;
  onBack: () => void;
}

export function StagePlaceholder({
  stage,
  onNext,
  onBack,
}: StagePlaceholderProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.section
      className="welcome-card"
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -16 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      aria-labelledby="stage-heading"
    >
      <span className="eyebrow-badge">
        CHAPTER {stage.stepNumber} · GARDEN JOURNEY
      </span>

      <h2
        id="stage-heading"
        className="hero-title"
        style={{ fontSize: 'clamp(1.85rem, 5vw, 2.75rem)' }}
      >
        {stage.label}
      </h2>

      <p className="hero-description" style={{ marginBottom: '1.25rem' }}>
        {stage.subtitle}
      </p>

      <p className="handwritten-whisper" style={{ marginBottom: '2rem' }}>
        blooming gently in the next phase...
      </p>

      <div
        style={{
          display: 'flex',
          gap: '0.85rem',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        <button type="button" className="btn-secondary" onClick={onBack}>
          Previous Step
        </button>

        {onNext && (
          <button type="button" className="btn-enter-garden" onClick={onNext}>
            <span>Continue Journey</span>
          </button>
        )}
      </div>
    </motion.section>
  );
}