import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { SECRET_NOTE_TEXT, SECRET_SIGNATURE } from '../../types/garden';

interface SecretNoteStageProps {
  onNext: () => void;
  onBack: () => void;
}

export function SecretNoteStage({ onNext, onBack }: SecretNoteStageProps) {
  const shouldReduceMotion = useReducedMotion();
  const [isOpen, setIsOpen] = useState(false);

  const paragraphs = SECRET_NOTE_TEXT.split('\n\n');

  return (
    <motion.section
      className="secret-note-shell"
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -14 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      aria-label="The Secret Note"
    >
      <div className="stage-header-block">
     
        <h2 className="hero-title" style={{ fontSize: 'clamp(1.85rem, 5vw, 2.6rem)' }}>
          The Secret Note
        </h2>
        <p className="hero-description" style={{ marginBottom: '1.25rem' }}>
          A sincere message tucked safely beneath the leaves, waiting just for you.
        </p>
      </div>

      <div className="envelope-viewport">
        <AnimatePresence mode="wait">
          {!isOpen ? (
            <motion.div
              key="envelope"
              className="envelope-card"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              transition={{ duration: 0.35 }}
            >
              <div className="envelope-flap-graphic" aria-hidden="true" />

              <div className="envelope-wax-seal">
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                  <circle cx="18" cy="18" r="17" fill="#7B8870" stroke="#D3B77A" strokeWidth="1.5" />
                  <path d="M18 9 C15 15 15 21 18 27 C21 21 21 15 18 9 Z" fill="#DFA89B" fillOpacity="0.9" />
                  <path d="M9 18 C15 15 21 15 27 18 C21 21 15 21 9 18 Z" fill="#A8B59A" fillOpacity="0.9" />
                  <circle cx="18" cy="18" r="3.5" fill="#D3B77A" />
                </svg>
              </div>

              <div className="envelope-text-content">
                <p className="handwritten-whisper" style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>
                  for your eyes only...
                </p>
                <button
                  type="button"
                  className="btn-enter-garden"
                  onClick={() => setIsOpen(true)}
                >
                  <span>Open Your Note</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="letter"
              className="letter-paper-card"
              initial={{ opacity: 0, y: 25, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="letter-inner-scroll">
                <div className="letter-header-row">
                  <span className="brand-dot" />
                  <span className="letter-date-stamp">October 20th · Quiet Reflections</span>
                </div>

                <div className="letter-body-text">
                  {paragraphs.map((para, idx) => (
                    <motion.p
                      key={idx}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + idx * 0.08, duration: 0.45 }}
                    >
                      {para}
                    </motion.p>
                  ))}
                </div>

                <motion.div
                  className="letter-signature-block"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.45 }}
                >
                  <p className="letter-signoff-handwriting">{SECRET_SIGNATURE}</p>
                </motion.div>
              </div>

              <div className="letter-actions-bar">
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setIsOpen(false)}
                >
                  Close Envelope
                </button>
                <button
                  type="button"
                  className="btn-enter-garden"
                  onClick={onNext}
                >
                  <span>Final Surprise</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {!isOpen && (
        <div className="stage-action-row" style={{ marginTop: '0.75rem' }}>
          <button type="button" className="btn-secondary" onClick={onBack}>
            Previous
          </button>
        </div>
      )}
    </motion.section>
  );
}