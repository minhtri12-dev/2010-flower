import { useRef, useState, useEffect } from 'react';
import type { PointerEvent as ReactPointerEvent } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { FLOWER_COLOR_THEMES } from '../../types/garden';
import type { PlantedFlower, FlowerVariant } from '../../types/garden';
import { PlantedFlowerSvg } from '../PlantedFlowerSvg';

const TARGET_FLOWERS = 20;
const VARIANTS: FlowerVariant[] = ['camellia', 'lotus', 'cosmos', 'bellflower'];

interface GardenStageProps {
  flowers: PlantedFlower[];
  onPlantFlower: (flower: PlantedFlower) => void;
  onContinue: () => void;
}

export function GardenStage({
  flowers,
  onPlantFlower,
  onContinue,
}: GardenStageProps) {
  const shouldReduceMotion = useReducedMotion();
  const canvasAreaRef = useRef<HTMLDivElement | null>(null);
  const lastPlantedTimeRef = useRef<number>(0);

  const [isUnlockedModalOpen, setIsUnlockedModalOpen] = useState(false);
  const hasTriggeredUnlockRef = useRef(flowers.length >= TARGET_FLOWERS);

  const plantedCount = flowers.length;
  const isComplete = plantedCount >= TARGET_FLOWERS;
  const progressPercent = Math.min(100, (plantedCount / TARGET_FLOWERS) * 100);

  useEffect(() => {
    if (plantedCount >= TARGET_FLOWERS && !hasTriggeredUnlockRef.current) {
      hasTriggeredUnlockRef.current = true;
      const timer = window.setTimeout(
        () => {
          setIsUnlockedModalOpen(true);
        },
        shouldReduceMotion ? 100 : 600
      );
      return () => window.clearTimeout(timer);
    }
  }, [plantedCount, shouldReduceMotion]);

  const handleGardenPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;

    const targetElement = e.target as HTMLElement;
    if (targetElement.closest('button') || targetElement.closest('[data-no-plant="true"]')) {
      return;
    }

    if (plantedCount >= TARGET_FLOWERS) return;

    const now = performance.now();
    if (now - lastPlantedTimeRef.current < 90) return;
    lastPlantedTimeRef.current = now;

    const container = canvasAreaRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const rawX = ((e.clientX - rect.left) / rect.width) * 100;
    const rawY = ((e.clientY - rect.top) / rect.height) * 100;

    const clampedX = Math.max(11, Math.min(89, rawX));
    const clampedY = Math.max(22, Math.min(86, rawY));

    const nextIndex = plantedCount;
    const variant = VARIANTS[nextIndex % VARIANTS.length];
    const colorTheme =
      FLOWER_COLOR_THEMES[
        (nextIndex + Math.floor(Math.random() * 2)) % FLOWER_COLOR_THEMES.length
      ];

    const depthScale = 0.82 + ((clampedY - 22) / 64) * 0.28;
    const randomVariation = 0.94 + Math.random() * 0.14;

    const newFlower: PlantedFlower = {
      id: `flower-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      xPercent: clampedX,
      yPercent: clampedY,
      variant,
      scale: Number((depthScale * randomVariation).toFixed(2)),
      rotation: Math.round((Math.random() - 0.5) * 26),
      stemHeight: Math.round(66 + Math.random() * 24),
      stemCurve: Math.round((Math.random() - 0.5) * 24),
      colorTheme,
      createdAt: Date.now(),
    };

    onPlantFlower(newFlower);
  };

  return (
    <motion.section
      className="garden-stage-shell"
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -14 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      aria-label="Interactive Flower Garden"
    >
      <div className="garden-hud-bar" data-no-plant="true">
        <div className="garden-counter-group">
          <span className="garden-counter-dot" />
          <span className="garden-counter-text" aria-live="polite">
            Flowers planted: <strong>{plantedCount}/{TARGET_FLOWERS}</strong>
          </span>
        </div>

        <div className="garden-progress-track" aria-hidden="true">
          <motion.div
            className="garden-progress-fill"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          />
        </div>

        {isComplete && !isUnlockedModalOpen && (
          <button
            type="button"
            className="garden-reopen-btn"
            onClick={(e) => {
              e.stopPropagation();
              setIsUnlockedModalOpen(true);
            }}
          >
            View Message
          </button>
        )}
      </div>

      <div
        ref={canvasAreaRef}
        className={`garden-interactive-bed ${isComplete ? 'is-complete' : ''}`}
        onPointerDown={handleGardenPointerDown}
        role="application"
        aria-label="Tap anywhere in the garden bed to plant up to 20 flowers"
      >
        <div className="garden-mist-layer" aria-hidden="true" />
        <div className="garden-ground-curves" aria-hidden="true">
          <svg
            viewBox="0 0 800 220"
            preserveAspectRatio="none"
            className="garden-hills-svg"
          >
            <path
              d="M0 120 Q 220 65 450 115 T 800 95 L 800 220 L 0 220 Z"
              fill="rgba(168, 181, 154, 0.15)"
            />
            <path
              d="M0 155 Q 280 110 540 150 T 800 135 L 800 220 L 0 220 Z"
              fill="rgba(123, 136, 112, 0.12)"
            />
          </svg>
        </div>

        <AnimatePresence>
          {plantedCount === 0 && (
            <motion.div
              className="garden-empty-prompt"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35 }}
            >
              <span className="garden-prompt-ring" />
              <p className="garden-prompt-title">
                Touch anywhere in the garden to plant a flower
              </p>
              <p className="garden-prompt-whisper">
                twenty quiet blooms are waiting for your touch
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {plantedCount > 0 && plantedCount < TARGET_FLOWERS && (
          <div className="garden-status-whisper" aria-hidden="true">
            {TARGET_FLOWERS - plantedCount === 1
              ? 'One last bloom to complete the garden...'
              : 'Tap gently to let another flower bloom'}
          </div>
        )}

        <div className="garden-flowers-layer">
          {flowers.map((flower, idx) => (
            <PlantedFlowerSvg key={flower.id} flower={flower} index={idx} />
          ))}
        </div>

        <AnimatePresence>
          {isUnlockedModalOpen && (
            <motion.div
              className="garden-unlock-backdrop"
              data-no-plant="true"
              onPointerDown={(e) => e.stopPropagation()}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <motion.div
                className="garden-unlock-card"
                role="dialog"
                aria-modal="true"
                aria-labelledby="unlock-title"
                initial={{
                  opacity: 0,
                  scale: shouldReduceMotion ? 1 : 0.94,
                  y: shouldReduceMotion ? 0 : 16,
                }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <div className="unlock-emblem" aria-hidden="true">
                  <svg width="54" height="54" viewBox="0 0 54 54" fill="none">
                    <circle cx="27" cy="27" r="25" stroke="#7B8870" strokeOpacity="0.4" strokeDasharray="3 4" />
                    <circle cx="27" cy="27" r="17" fill="rgba(168, 181, 154, 0.2)" />
                    <path d="M27 12 C23 20 23 34 27 42 C31 34 31 20 27 12 Z" fill="#DFA89B" fillOpacity="0.85" />
                    <path d="M12 27 C20 23 34 23 42 27 C34 31 20 31 12 27 Z" fill="#A8B59A" fillOpacity="0.85" />
                    <circle cx="27" cy="27" r="4.5" fill="#D3B77A" />
                  </svg>
                </div>

                <h2 id="unlock-title" className="unlock-title">
                  20 Flowers, Just for You
                </h2>

                <p className="unlock-subtitle">
                  One little wish for every flower.
                </p>

                <p className="unlock-message">
                  May your day be filled with beautiful moments, little surprises, and plenty of reasons to smile.
                </p>

                <div className="unlock-actions">
                  <button
                    type="button"
                    className="btn-enter-garden"
                    onClick={(e) => {
                      e.stopPropagation();
                      onContinue();
                    }}
                  >
                    <span>Continue</span>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </button>

                  <button
                    type="button"
                    className="unlock-admire-link"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsUnlockedModalOpen(false);
                    }}
                  >
                    Admire the garden a little longer
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  );
}