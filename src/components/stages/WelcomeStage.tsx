import { motion, useReducedMotion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { BotanicalIllustration } from '../BotanicalIllustration';

interface WelcomeStageProps {
  onEnterGarden: () => void;
}

export function WelcomeStage({ onEnterGarden }: WelcomeStageProps) {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : -14,
      transition: { duration: 0.4, ease: 'easeInOut' },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <motion.section
      className="welcome-card"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      aria-labelledby="welcome-title"
    >
      <motion.div variants={itemVariants}>
        <BotanicalIllustration />
      </motion.div>

      

      <motion.h1 id="welcome-title" className="hero-title" variants={itemVariants}>
        A Little Garden for You
      </motion.h1>

        

      <motion.p className="handwritten-whisper" variants={itemVariants}>
        A quiet garden, a gentle joy, just for you.
      </motion.p>

      <motion.div variants={itemVariants}>
        <button
          type="button"
          className="btn-enter-garden"
          onClick={onEnterGarden}
        >
          <span>Enter the Garden</span>
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </button>
      </motion.div>
    </motion.section>
  );
}