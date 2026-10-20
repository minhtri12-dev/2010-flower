import { useState, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import type { PlantedFlower } from '../../types/garden';

interface FinalSurpriseStageProps {
  plantedFlowers: PlantedFlower[];
  onRestartGarden: () => void;
  onBack: () => void;
}

export function FinalSurpriseStage({
  plantedFlowers,
  onRestartGarden,
  onBack,
}: FinalSurpriseStageProps) {
  const shouldReduceMotion = useReducedMotion();
  const [isGeneratingCard, setIsGeneratingCard] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const cardPreviewRef = useRef<HTMLDivElement | null>(null);

  const containerVariants: Variants = {
    hidden: { opacity: 0, scale: shouldReduceMotion ? 1 : 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], staggerChildren: 0.15 },
    },
    exit: { opacity: 0, scale: 0.96, transition: { duration: 0.35 } },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  };

  const displayFlowers =
    plantedFlowers.length > 0
      ? plantedFlowers
      : Array.from({ length: 20 }, (_, idx) => ({
          id: `fallback-${idx}`,
          xPercent: 15 + (idx % 5) * 17,
          yPercent: 30 + Math.floor(idx / 5) * 15,
          variant: 'lily' as const,
          scale: 0.9,
          rotation: (idx % 3) * 10 - 10,
          stemHeight: 80,
          stemCurve: 0,
          colorTheme: {
            id: 'default',
            primary: '#DFA89B',
            secondary: '#FFFDF9',
            core: '#D3B77A',
            glow: 'rgba(223, 168, 155, 0.35)',
          },
          createdAt: Date.now(),
        }));

  const handleSavePostcard = async () => {
    if (isGeneratingCard) return;
    setIsGeneratingCard(true);

    try {
      const canvas = document.createElement('canvas');
      canvas.width = 1080;
      canvas.height = 1350; // 4:5 ratio
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        throw new Error('Canvas context unavailable');
      }

      // 1. Warm Ivory Background
      ctx.fillStyle = '#F7F3EA';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 2. Journal Border
      ctx.strokeStyle = 'rgba(123, 136, 112, 0.25)';
      ctx.lineWidth = 4;
      ctx.strokeRect(48, 48, canvas.width - 96, canvas.height - 96);

      // 3. Eyebrow
      ctx.fillStyle = '#7B8870';
      ctx.font = '600 24px Onest, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('A LITTLE SOMETHING FOR LY', canvas.width / 2, 140);

      // 4. Title
      ctx.fillStyle = '#343B30';
      ctx.font = '400 64px Georgia, serif';
      ctx.fillText('A Bouquet Made by You', canvas.width / 2, 220);

      // 5. Bouquet Circle Backdrop
      ctx.beginPath();
      ctx.arc(canvas.width / 2, 490, 160, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(168, 181, 154, 0.16)';
      ctx.fill();
      ctx.strokeStyle = 'rgba(211, 183, 122, 0.5)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // 6. Draw Real Lily Flowers on Canvas (Petals, Stamens)
      displayFlowers.slice(0, 20).forEach((flower, idx) => {
        const angle = (idx / 20) * Math.PI * 2;
        const radius = 35 + (idx % 4) * 28;
        const fx = canvas.width / 2 + Math.cos(angle) * radius;
        const fy = 490 + Math.sin(angle) * radius;
        const petalCol = flower.colorTheme?.primary || '#DFA89B';

        ctx.save();
        ctx.translate(fx, fy);
        ctx.rotate(angle);

        // Draw 6 Lily Petals
        for (let p = 0; p < 6; p++) {
          ctx.rotate((Math.PI * 2) / 6);
          ctx.beginPath();
          ctx.ellipse(0, -18, 7, 16, 0, 0, Math.PI * 2);
          ctx.fillStyle = petalCol;
          ctx.fill();
          ctx.strokeStyle = '#FFFDF9';
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        // Center stamen core
        ctx.beginPath();
        ctx.arc(0, 0, 4.5, 0, Math.PI * 2);
        ctx.fillStyle = '#D3B77A';
        ctx.fill();

        ctx.restore();
      });

      // 7. Ribbon & Stems base
      ctx.fillStyle = '#7B8870';
      ctx.fillRect(canvas.width / 2 - 12, 610, 24, 60);
      ctx.beginPath();
      ctx.arc(canvas.width / 2, 630, 18, 0, Math.PI * 2);
      ctx.fillStyle = '#DFA89B';
      ctx.fill();

      // 8. Message Box
      ctx.fillStyle = '#FFFDF9';
      ctx.beginPath();
      ctx.roundRect(120, 710, canvas.width - 240, 360, 24);
      ctx.fill();
      ctx.strokeStyle = 'rgba(123, 136, 112, 0.2)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // 9. Message Text
      ctx.fillStyle = '#343B30';
      ctx.font = '300 32px Onest, sans-serif';
      ctx.textAlign = 'center';
      
      ctx.fillText("From the flowers you planted, I've gathered", canvas.width / 2, 800);
      ctx.fillText("them into a little bouquet. I hope it brings", canvas.width / 2, 850);
      ctx.fillText("a little more joy to your day.", canvas.width / 2, 900);

      // 10. Signature
      ctx.fillStyle = '#7B6B5D';
      ctx.font = '500 38px Caveat, cursive';
      ctx.fillText('Made with care, just for you, Ly.', canvas.width / 2, 1005);

      // 11. Download
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = 'a-little-garden-postcard.png';
      link.href = dataUrl;
      link.click();

      setToastMessage('Your little keepsake is ready!');
      setTimeout(() => setToastMessage(null), 4000);
    } catch {
      setToastMessage('Unable to generate postcard. Please try again.');
      setTimeout(() => setToastMessage(null), 4000);
    } finally {
      setIsGeneratingCard(false);
    }
  };

  return (
    <motion.section
      className="welcome-card final-surprise-card"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      aria-label="One Last Surprise"
      ref={cardPreviewRef}
    >
      {/* Converging Real Lilies Bouquet Stage */}
      <div className="final-bouquet-convergence-frame" aria-hidden="true">
        <svg width="200" height="200" viewBox="0 0 200 200" className="bouquet-svg-canvas">
          <defs>
            <radialGradient id="finalCoreGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFFDF9" stopOpacity="1" />
              <stop offset="60%" stopColor="#D3B77A" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#7B8870" stopOpacity="0.2" />
            </radialGradient>
          </defs>

          <circle cx="100" cy="95" r="70" fill="url(#finalCoreGlow)" fillOpacity="0.25" style={{ filter: 'blur(12px)' }} />
          <circle cx="100" cy="95" r="56" stroke="#D3B77A" strokeOpacity="0.3" strokeWidth="1" strokeDasharray="3 4" />
          <circle cx="100" cy="95" r="44" stroke="#A8B59A" strokeOpacity="0.35" strokeWidth="1" />

          {/* Stems */}
          <path d="M 90 120 Q 95 150 82 175" stroke="#7B8870" strokeOpacity="0.75" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M 110 120 Q 105 150 118 175" stroke="#7B8870" strokeOpacity="0.75" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M 100 120 L 100 182" stroke="#7B8870" strokeOpacity="0.85" strokeWidth="2.8" strokeLinecap="round" />

          {/* Ribbon */}
          <path d="M 85 150 C 72 140 58 146 64 158 C 70 168 85 158 90 154 Z" fill="#DFA89B" fillOpacity="0.85" />
          <path d="M 115 150 C 128 140 142 146 136 158 C 130 168 115 158 110 154 Z" fill="#DFA89B" fillOpacity="0.85" />
          <circle cx="100" cy="152" r="6" fill="#D3B77A" />

          {/* Render Actual Lilies Converging */}
          {displayFlowers.map((flower, idx) => {
            const angle = (idx / displayFlowers.length) * Math.PI * 2;
            const distance = 18 + (idx % 3) * 16;
            const cx = 100 + Math.cos(angle) * distance;
            const cy = 92 + Math.sin(angle) * distance;
            const petalColor = flower.colorTheme?.primary || '#DFA89B';

            return (
              <motion.g
                key={`converged-${flower.id}`}
                initial={
                  shouldReduceMotion
                    ? { x: 0, y: 0, scale: 1 }
                    : {
                        x: (flower.xPercent - 50) * 3.5,
                        y: (flower.yPercent - 50) * 3.5,
                        scale: 0.2,
                        opacity: 0.4,
                      }
                }
                animate={{ x: 0, y: 0, scale: 0.75, opacity: 1 }}
                transition={{
                  duration: 0.9,
                  delay: idx * 0.03,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {/* 6 Lily Petals in SVG */}
                {[0, 60, 120, 180, 240, 300].map((deg, pIdx) => (
                  <ellipse
                    key={`p-${pIdx}`}
                    cx={cx}
                    cy={cy - 10}
                    rx="4.5"
                    ry="12"
                    fill={petalColor}
                    fillOpacity="0.9"
                    stroke="#FFFDF9"
                    strokeWidth="0.8"
                    transform={`rotate(${deg} ${cx} ${cy})`}
                  />
                ))}
                <circle cx={cx} cy={cy} r="3.5" fill="#D3B77A" />
              </motion.g>
            );
          })}
        </svg>
      </div>

      <motion.span className="eyebrow-badge" variants={itemVariants}>
        A LITTLE SOMETHING FOR YOU
      </motion.span>

      <motion.h2 className="hero-title" variants={itemVariants}>
        A Bouquet Made by You
      </motion.h2>

      <motion.p className="hero-description" variants={itemVariants} style={{ marginBottom: '1.25rem' }}>
        From the flowers you planted, I've gathered them into a little bouquet. I hope it brings a little more joy to your day.
      </motion.p>

      <motion.p className="handwritten-whisper" variants={itemVariants} style={{ marginBottom: '1.75rem' }}>
        Made with care, just for you, Ly.
      </motion.p>

      <motion.div className="stage-action-row" variants={itemVariants} style={{ justifyContent: 'center', flexWrap: 'wrap' }}>
        <button
          type="button"
          className="btn-enter-garden"
          onClick={handleSavePostcard}
          disabled={isGeneratingCard}
        >
          <span>{isGeneratingCard ? 'Preparing Postcard...' : 'Save Your Postcard'}</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
        </button>

        <button
          type="button"
          className="btn-secondary"
          onClick={onRestartGarden}
        >
          Grow a New Garden
        </button>
      </motion.div>

      {toastMessage && (
        <motion.div
          className="postcard-toast-badge"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
        >
          {toastMessage}
        </motion.div>
      )}
    </motion.section>
  );
}