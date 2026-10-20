import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { WISH_CARDS } from '../../types/garden';

interface WishesStageProps {
  onNext: () => void;
  onBack: () => void;
}

export function WishesStage({ onNext, onBack }: WishesStageProps) {
  const shouldReduceMotion = useReducedMotion();
  const [activeCardId, setActiveCardId] = useState<string>(WISH_CARDS[0].id);

  const containerVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : -14,
      transition: { duration: 0.35, ease: 'easeInOut' },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <motion.section
      className="wishes-stage-shell"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      aria-label="Little Wishes for October 20th"
    >
      <div className="stage-header-block">
        <span className="eyebrow-badge">CHAPTER 03 · THOUGHTFUL NOTES</span>
        <h2 className="hero-title" style={{ fontSize: 'clamp(1.85rem, 5vw, 2.6rem)' }}>
          Little Wishes
        </h2>
        <p className="hero-description" style={{ marginBottom: '1.25rem' }}>
          A few quiet thoughts kept for today, designed to bring a little extra warmth to your day.
        </p>
      </div>

      <div className="wishes-cards-container">
        {WISH_CARDS.map((card, index) => {
          const isActive = activeCardId === card.id;
          return (
            <motion.div
              key={card.id}
              className={`wish-card-item ${isActive ? 'is-active' : ''}`}
              variants={itemVariants}
              onClick={() => setActiveCardId(card.id)}
              whileHover={shouldReduceMotion ? {} : { y: -2 }}
            >
              <div className="wish-card-top">
                <span className="wish-tag">0{index + 1} · {card.tag}</span>
                <div className="wish-card-icon" aria-hidden="true">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 21C12 21 4 14.5 4 8.5C4 5.46 6.46 3 9.5 3C11.24 3 12.91 4.01 13.5 5.5C14.09 4.01 15.76 3 17.5 3C20.54 3 23 5.46 23 8.5C23 14.5 12 21 12 21Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill={isActive ? 'rgba(223, 168, 155, 0.2)' : 'none'}
                    />
                  </svg>
                </div>
              </div>

              <h3 className="wish-card-title">{card.title}</h3>
              <p className="wish-card-message">{card.message}</p>
            </motion.div>
          );
        })}
      </div>

      <motion.div className="stage-action-row" variants={itemVariants}>
        <button type="button" className="btn-secondary" onClick={onBack}>
          Previous
        </button>
        <button type="button" className="btn-enter-garden" onClick={onNext}>
          <span>Read Secret Note</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </button>
      </motion.div>
    </motion.section>
  );
}