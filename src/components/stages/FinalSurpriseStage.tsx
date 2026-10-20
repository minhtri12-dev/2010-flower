import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import type { PlantedFlower } from '../../types/garden';
import { LilyFlowerHead } from '../PlantedFlowerSvg';

interface FinalSurpriseStageProps {
  plantedFlowers: PlantedFlower[];
  onRestartGarden: () => void;
  onBack: () => void;
}

interface BouquetSlot {
  x: number;
  y: number;
  angle: number;
  scale: number;
  layer: 1 | 2 | 3;
}

// 20 carefully composed slots forming a natural 3-tier botanical lily bouquet
const BOUQUET_SLOTS: BouquetSlot[] = [
  // Layer 1: Back crown & wide outer arch (6 blooms)
  { x: 64, y: 84, angle: -42, scale: 0.56, layer: 1 },
  { x: 86, y: 66, angle: -24, scale: 0.6, layer: 1 },
  { x: 110, y: 56, angle: -8, scale: 0.62, layer: 1 },
  { x: 132, y: 56, angle: 8, scale: 0.62, layer: 1 },
  { x: 154, y: 66, angle: 24, scale: 0.6, layer: 1 },
  { x: 176, y: 84, angle: 42, scale: 0.56, layer: 1 },

  // Layer 2: Mid-body botanical fullness (8 blooms)
  { x: 58, y: 108, angle: -48, scale: 0.6, layer: 2 },
  { x: 76, y: 92, angle: -30, scale: 0.66, layer: 2 },
  { x: 96, y: 80, angle: -15, scale: 0.68, layer: 2 },
  { x: 120, y: 74, angle: 0, scale: 0.72, layer: 2 },
  { x: 144, y: 80, angle: 15, scale: 0.68, layer: 2 },
  { x: 164, y: 92, angle: 30, scale: 0.66, layer: 2 },
  { x: 182, y: 108, angle: 48, scale: 0.6, layer: 2 },
  { x: 120, y: 94, angle: 5, scale: 0.7, layer: 2 },

  // Layer 3: Foreground focal cluster near the ribbon throat (6 blooms)
  { x: 82, y: 116, angle: -26, scale: 0.72, layer: 3 },
  { x: 102, y: 106, angle: -10, scale: 0.76, layer: 3 },
  { x: 138, y: 106, angle: 10, scale: 0.76, layer: 3 },
  { x: 158, y: 116, angle: 26, scale: 0.72, layer: 3 },
  { x: 110, y: 124, angle: -6, scale: 0.78, layer: 3 },
  { x: 130, y: 124, angle: 8, scale: 0.78, layer: 3 },
];

function drawWrappedText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  startY: number,
  maxWidth: number,
  lineHeight: number
): number {
  const words = text.split(' ');
  let currentLine = '';
  let y = startY;

  for (let i = 0; i < words.length; i++) {
    const testLine = currentLine ? `${currentLine} ${words[i]}` : words[i];
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxWidth && currentLine) {
      ctx.fillText(currentLine, x, y);
      currentLine = words[i];
      y += lineHeight;
    } else {
      currentLine = testLine;
    }
  }

  if (currentLine) {
    ctx.fillText(currentLine, x, y);
    y += lineHeight;
  }

  return y;
}

function drawCanvasTepal(
  ctx: CanvasRenderingContext2D,
  length: number,
  width: number,
  fillStyle: string,
  strokeStyle: string,
  veinStyle: string,
  withSpeckles: boolean
) {
  ctx.beginPath();
  ctx.moveTo(0, 4);
  ctx.bezierCurveTo(-width, -length * 0.22, -width * 1.15, -length * 0.68, 0, -length);
  ctx.bezierCurveTo(width * 1.15, -length * 0.68, width, -length * 0.22, 0, 4);
  ctx.closePath();

  ctx.fillStyle = fillStyle;
  ctx.fill();
  ctx.strokeStyle = strokeStyle;
  ctx.lineWidth = 1.4;
  ctx.stroke();

  // Midrib vein
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.quadraticCurveTo(0, -length * 0.45, 0, -length * 0.82);
  ctx.strokeStyle = veinStyle;
  ctx.lineWidth = 1.3;
  ctx.stroke();

  if (withSpeckles) {
    ctx.fillStyle = veinStyle;
    const speckles = [
      [-3.2, -length * 0.24],
      [3.4, -length * 0.28],
      [-2.1, -length * 0.36],
      [2.3, -length * 0.4],
    ];
    for (const [sx, sy] of speckles) {
      ctx.beginPath();
      ctx.arc(sx, sy, 1.3, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}

function drawCanvasLilyFlower(
  ctx: CanvasRenderingContext2D,
  flower: PlantedFlower,
  cx: number,
  cy: number,
  scale: number,
  angleDeg: number
) {
  const { variant, colorTheme, rotation } = flower;
  const totalAngleRad = ((angleDeg + rotation * 0.35) * Math.PI) / 180;

  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(totalAngleRad);
  ctx.scale(scale, scale);

  if (variant === 'lily-bud') {
    ctx.beginPath();
    ctx.moveTo(0, 10);
    ctx.bezierCurveTo(-14, -6, -15, -30, 0, -52);
    ctx.bezierCurveTo(15, -30, 14, -6, 0, 10);
    ctx.closePath();
    ctx.fillStyle = colorTheme.primary;
    ctx.fill();
    ctx.strokeStyle = '#7B8870';
    ctx.lineWidth = 1.6;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, 10);
    ctx.bezierCurveTo(-9, -2, -8, -22, 0, -40);
    ctx.strokeStyle = '#A8B59A';
    ctx.lineWidth = 2.4;
    ctx.stroke();

    ctx.restore();
    return;
  }

  const isWide = variant === 'lily-open';
  const outerAngles = isWide ? [-58, 0, 58] : [-44, 0, 44];
  const innerAngles = isWide ? [-118, -28, 28, 118, 180] : [-22, 22, 180];

  // Outer 3 Tepals
  for (const deg of outerAngles) {
    ctx.save();
    ctx.rotate((deg * Math.PI) / 180);
    drawCanvasTepal(
      ctx,
      62,
      15,
      colorTheme.secondary,
      colorTheme.primary,
      colorTheme.accent,
      false
    );
    ctx.restore();
  }

  // Inner Recurved Tepals
  for (const deg of innerAngles) {
    ctx.save();
    ctx.rotate((deg * Math.PI) / 180);
    drawCanvasTepal(
      ctx,
      56,
      16,
      colorTheme.primary,
      '#FFFDF9',
      colorTheme.accent,
      true
    );
    ctx.restore();
  }

  // Throat core
  ctx.beginPath();
  ctx.arc(0, -1, 5.5, 0, Math.PI * 2);
  ctx.fillStyle = '#A8B59A';
  ctx.fill();

  // Central Pistil
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.quadraticCurveTo(1.5, -20, 0, -38);
  ctx.strokeStyle = '#7B8870';
  ctx.lineWidth = 1.8;
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(0, -39, 2.6, 0, Math.PI * 2);
  ctx.fillStyle = '#A8B59A';
  ctx.fill();

  // 6 Stamens & Anthers
  const stamenAngles = [-30, -18, -6, 6, 18, 30];
  stamenAngles.forEach((deg, idx) => {
    ctx.save();
    ctx.rotate((deg * Math.PI) / 180);
    const len = idx === 2 || idx === 3 ? -33 : -29;
    const ctrlX = idx < 3 ? -4.5 : 4.5;

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.quadraticCurveTo(ctrlX, len * 0.55, 0, len);
    ctx.strokeStyle = '#FFFDF9';
    ctx.lineWidth = 1.4;
    ctx.stroke();

    ctx.beginPath();
    ctx.ellipse(0, len - 1.5, 3.4, 1.7, (deg * 0.5 * Math.PI) / 180, 0, Math.PI * 2);
    ctx.fillStyle = '#B6844E';
    ctx.fill();
    ctx.restore();
  });

  ctx.restore();
}

export function FinalSurpriseStage({
  plantedFlowers,
  onRestartGarden,
  onBack,
}: FinalSurpriseStageProps) {
  const shouldReduceMotion = useReducedMotion();
  const [isGeneratingCard, setIsGeneratingCard] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isBouquetAssembled, setIsBouquetAssembled] = useState(Boolean(shouldReduceMotion));

  // Safety guard: if reached without completing 20 flowers, return safely to the garden
  useEffect(() => {
    if (plantedFlowers.length < 20) {
      onRestartGarden();
    }
  }, [plantedFlowers.length, onRestartGarden]);

  useEffect(() => {
    if (shouldReduceMotion) {
      setIsBouquetAssembled(true);
      return;
    }
    const timer = window.setTimeout(() => {
      setIsBouquetAssembled(true);
    }, 1150);
    return () => window.clearTimeout(timer);
  }, [shouldReduceMotion]);

  if (plantedFlowers.length < 20) {
    return null;
  }

  const bouquetItems = plantedFlowers.slice(0, 20).map((flower, idx) => ({
    flower,
    slot: BOUQUET_SLOTS[idx],
    index: idx,
  }));

  const sortedByLayer = [...bouquetItems].sort((a, b) => a.slot.layer - b.slot.layer);

  const cardRevealVariants: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      },
    },
  };

  const handleSavePostcard = async () => {
    if (isGeneratingCard) return;
    setIsGeneratingCard(true);
    setToastMessage(null);

    try {
      if (document.fonts && document.fonts.ready) {
        await document.fonts.ready;
      }

      const canvas = document.createElement('canvas');
      canvas.width = 1080;
      canvas.height = 1350;
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        throw new Error('Canvas context unavailable');
      }

      // 1. Warm Ivory Editorial Background
      const bgGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
      bgGrad.addColorStop(0, '#F7F3EA');
      bgGrad.addColorStop(1, '#EFE9DC');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Soft botanical radial aura behind bouquet
      const auraGrad = ctx.createRadialGradient(540, 520, 30, 540, 520, 310);
      auraGrad.addColorStop(0, 'rgba(211, 183, 122, 0.24)');
      auraGrad.addColorStop(0.6, 'rgba(168, 181, 154, 0.14)');
      auraGrad.addColorStop(1, 'rgba(247, 243, 234, 0)');
      ctx.fillStyle = auraGrad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 2. Botanical Journal Double Frame
      ctx.strokeStyle = 'rgba(123, 136, 112, 0.32)';
      ctx.lineWidth = 3;
      ctx.strokeRect(46, 46, canvas.width - 92, canvas.height - 92);

      ctx.strokeStyle = 'rgba(211, 183, 122, 0.45)';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(62, 62, canvas.width - 124, canvas.height - 124);

      // 3. Header Eyebrow & Title
      ctx.fillStyle = '#7B8870';
      ctx.font = '600 22px Onest, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('A LITTLE SOMETHING FOR YOU', canvas.width / 2, 138);

      ctx.fillStyle = '#343B30';
      ctx.font = '400 62px Gloock, Georgia, serif';
      ctx.fillText('A Bouquet Made by You', canvas.width / 2, 216);

      // 4. Bouquet Halo Ring
      ctx.beginPath();
      ctx.arc(540, 500, 215, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(211, 183, 122, 0.48)';
      ctx.lineWidth = 2;
      ctx.setLineDash([6, 8]);
      ctx.stroke();
      ctx.setLineDash([]);

      // Map 240x240 bouquet coordinates onto Canvas center (540, 520)
      const mapX = (bx: number) => 540 + (bx - 120) * 2.95;
      const mapY = (by: number) => 515 + (by - 115) * 2.75;
      const tieX = mapX(120);
      const tieY = mapY(172);

      // 5. Back Lanceolate Leaves
      const leafConfigs = [
        { angle: -0.95, len: 185, col: '#A8B59A' },
        { angle: -0.55, len: 210, col: '#7B8870' },
        { angle: 0.55, len: 210, col: '#7B8870' },
        { angle: 0.95, len: 185, col: '#A8B59A' },
        { angle: -0.2, len: 225, col: '#A8B59A' },
        { angle: 0.2, len: 225, col: '#A8B59A' },
      ];
      for (const leaf of leafConfigs) {
        ctx.save();
        ctx.translate(tieX, tieY - 30);
        ctx.rotate(leaf.angle);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(-24, -leaf.len * 0.4, -18, -leaf.len * 0.82, 0, -leaf.len);
        ctx.bezierCurveTo(18, -leaf.len * 0.82, 24, -leaf.len * 0.4, 0, 0);
        ctx.closePath();
        ctx.fillStyle = leaf.col;
        ctx.globalAlpha = 0.45;
        ctx.fill();
        ctx.restore();
      }

      // 6. Draw 20 Lily Stems Converging Through the Ribbon Tie Point
      sortedByLayer.forEach(({ slot }, idx) => {
        const startX = mapX(slot.x);
        const startY = mapY(slot.y);
        const spreadBottom = (idx - 9.5) * 6.5;
        const endX = tieX + spreadBottom;
        const endY = tieY + 96 + (idx % 3) * 8;

        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.quadraticCurveTo((startX + tieX) / 2, (startY + tieY) / 2, tieX + spreadBottom * 0.18, tieY);
        ctx.lineTo(endX, endY);
        ctx.strokeStyle = idx % 2 === 0 ? '#7B8870' : '#A8B59A';
        ctx.lineWidth = 4.2;
        ctx.lineCap = 'round';
        ctx.stroke();
      });

      // 7. Draw All 20 Real Planted Lily Flowers in Layered Order
      for (const { flower, slot } of sortedByLayer) {
        const fx = mapX(slot.x);
        const fy = mapY(slot.y);
        const canvasScale = slot.scale * 1.65;
        drawCanvasLilyFlower(ctx, flower, fx, fy, canvasScale, slot.angle);
      }

      // 8. Draw Dusty Pink & Honey Gold Ribbon Bow at Tie Point
      ctx.save();
      ctx.translate(tieX, tieY);

      // Ribbon tails
      ctx.beginPath();
      ctx.moveTo(-8, 6);
      ctx.quadraticCurveTo(-34, 52, -48, 96);
      ctx.moveTo(8, 6);
      ctx.quadraticCurveTo(34, 52, 48, 96);
      ctx.strokeStyle = '#DFA89B';
      ctx.lineWidth = 10;
      ctx.lineCap = 'round';
      ctx.stroke();

      // Left & Right Bow Loops
      ctx.fillStyle = '#DFA89B';
      ctx.strokeStyle = '#FFFDF9';
      ctx.lineWidth = 2;

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(-42, -32, -74, -8, -56, 18);
      ctx.bezierCurveTo(-40, 34, -14, 12, 0, 0);
      ctx.fill();
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(42, -32, 74, -8, 56, 18);
      ctx.bezierCurveTo(40, 34, 14, 12, 0, 0);
      ctx.fill();
      ctx.stroke();

      // Center Knot
      ctx.beginPath();
      ctx.arc(0, 2, 13, 0, Math.PI * 2);
      ctx.fillStyle = '#D3B77A';
      ctx.fill();
      ctx.restore();

      // 9. Draw Warm Ivory Keepsake Note Card at Bottom
      const cardX = 110;
      const cardY = 825;
      const cardW = canvas.width - 220;
      const cardH = 390;

      ctx.fillStyle = 'rgba(255, 253, 249, 0.96)';
      ctx.beginPath();
      ctx.roundRect(cardX, cardY, cardW, cardH, 28);
      ctx.fill();
      ctx.strokeStyle = 'rgba(211, 183, 122, 0.55)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // 10. Draw Message & Closing Signature inside Card
      ctx.fillStyle = '#343B30';
      ctx.font = '300 32px Onest, sans-serif';
      ctx.textAlign = 'center';

      const message =
        "From the flowers you planted, I've gathered them into a little bouquet. I hope it brings a little more joy to your day.";
      const nextY = drawWrappedText(ctx, message, canvas.width / 2, cardY + 92, cardW - 130, 50);

      // Subtle Divider Line
      ctx.beginPath();
      ctx.moveTo(canvas.width / 2 - 90, nextY + 18);
      ctx.lineTo(canvas.width / 2 + 90, nextY + 18);
      ctx.strokeStyle = 'rgba(123, 136, 112, 0.28)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Handwritten Closing Line
      ctx.fillStyle = '#7B8870';
      ctx.font = '600 44px Caveat, cursive';
      ctx.fillText('Made with care, just for you.', canvas.width / 2, nextY + 82);

      // 11. Export PNG Blob & Trigger Download
      const blob: Blob | null = await new Promise((resolve) =>
        canvas.toBlob((b) => resolve(b), 'image/png')
      );

      const downloadUrl = blob
        ? URL.createObjectURL(blob)
        : canvas.toDataURL('image/png');

      const link = document.createElement('a');
      link.download = 'a-little-garden-postcard.png';
      link.href = downloadUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      if (blob) {
        window.setTimeout(() => URL.revokeObjectURL(downloadUrl), 5000);
      }

      setToastMessage('Your little keepsake is ready!');
      window.setTimeout(() => setToastMessage(null), 4000);
    } catch {
      setToastMessage('Unable to generate postcard. Please try again.');
      window.setTimeout(() => setToastMessage(null), 4000);
    } finally {
      setIsGeneratingCard(false);
    }
  };

  return (
    <motion.section
      className="welcome-card final-surprise-card"
      initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      }}
      aria-label="One Last Surprise"
    >
      {/* 20-Lily Converging Bouquet Showcase */}
      <div className="final-bouquet-convergence-frame" aria-hidden="true">
        <svg
          width="250"
          height="245"
          viewBox="0 0 240 240"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="bouquet-svg-canvas"
        >
          <defs>
            <radialGradient id="bouquetWarmAura" cx="50%" cy="46%" r="50%">
              <stop offset="0%" stopColor="#FFFDF9" stopOpacity="0.95" />
              <stop offset="55%" stopColor="#D3B77A" stopOpacity="0.28" />
              <stop offset="100%" stopColor="#A8B59A" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Soft Warm Botanical Halo */}
          <circle cx="120" cy="104" r="88" fill="url(#bouquetWarmAura)" />
          <circle
            cx="120"
            cy="104"
            r="76"
            stroke="#D3B77A"
            strokeOpacity="0.38"
            strokeWidth="1"
            strokeDasharray="3 5"
          />

          {/* Background Lanceolate Foliage Framing the Bouquet */}
          <motion.g
            initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: shouldReduceMotion ? 0 : 0.45, duration: 0.6 }}
          >
            <path d="M 120 164 C 82 146 52 114 44 74 C 68 88 96 122 120 164 Z" fill="#A8B59A" fillOpacity="0.45" stroke="#7B8870" strokeOpacity="0.4" strokeWidth="0.8" />
            <path d="M 120 164 C 158 146 188 114 196 74 C 172 88 144 122 120 164 Z" fill="#A8B59A" fillOpacity="0.45" stroke="#7B8870" strokeOpacity="0.4" strokeWidth="0.8" />
            <path d="M 120 158 C 92 126 74 84 74 44 C 94 68 110 112 120 158 Z" fill="#7B8870" fillOpacity="0.35" />
            <path d="M 120 158 C 148 126 166 84 166 44 C 146 68 130 112 120 158 Z" fill="#7B8870" fillOpacity="0.35" />
          </motion.g>

          {/* 20 Converging Stems Tied at (120, 172) */}
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: shouldReduceMotion ? 0 : 0.35, duration: 0.55 }}
          >
            {sortedByLayer.map(({ flower, slot, index }) => {
              const spreadBottom = (index - 9.5) * 2.1;
              return (
                <path
                  key={`stem-${flower.id}`}
                  d={`M ${slot.x} ${slot.y} Q ${(slot.x + 120) / 2} ${(slot.y + 172) / 2} ${120 + spreadBottom * 0.2} 172 L ${120 + spreadBottom} ${214 + (index % 3) * 3}`}
                  stroke={index % 2 === 0 ? '#7B8870' : '#A8B59A'}
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeOpacity="0.88"
                />
              );
            })}
          </motion.g>

          {/* All 20 Real Planted Lilies Converging from Garden Positions */}
          {sortedByLayer.map(({ flower, slot, index }) => {
            const startOffsetX = (flower.xPercent - 50) * 2.5;
            const startOffsetY = (flower.yPercent - 50) * 2.1;

            return (
              <motion.g
                key={`bouquet-lily-${flower.id}`}
                initial={
                  shouldReduceMotion
                    ? { x: slot.x, y: slot.y, scale: slot.scale, opacity: 1 }
                    : {
                        x: 120 + startOffsetX,
                        y: 110 + startOffsetY,
                        scale: 0.25,
                        opacity: 0,
                      }
                }
                animate={{
                  x: slot.x,
                  y: slot.y,
                  scale: slot.scale,
                  opacity: 1,
                }}
                transition={{
                  duration: 0.88,
                  delay: shouldReduceMotion ? 0 : index * 0.035,
                  ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
                }}
              >
                <LilyFlowerHead
                  idPrefix={`bouquet-${flower.id}`}
                  variant={flower.variant}
                  colorTheme={flower.colorTheme}
                  rotation={slot.angle + flower.rotation * 0.25}
                />
              </motion.g>
            );
          })}

          {/* Dusty Pink & Honey Gold Botanical Ribbon Bow */}
          <motion.g
            style={{ transformOrigin: '120px 172px' }}
            initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: shouldReduceMotion ? 0 : 0.78, duration: 0.5 }}
          >
            <path
              d="M 117 174 Q 106 194 98 214 M 123 174 Q 134 194 142 214"
              stroke="#DFA89B"
              strokeWidth="3.6"
              strokeLinecap="round"
            />
            <path
              d="M 120 172 C 102 158 88 166 95 178 C 101 186 114 178 120 172 Z"
              fill="#DFA89B"
              stroke="#FFFDF9"
              strokeWidth="0.9"
            />
            <path
              d="M 120 172 C 138 158 152 166 145 178 C 139 186 126 178 120 172 Z"
              fill="#DFA89B"
              stroke="#FFFDF9"
              strokeWidth="0.9"
            />
            <circle cx="120" cy="172" r="4.8" fill="#D3B77A" stroke="#FFFDF9" strokeWidth="0.8" />
          </motion.g>
        </svg>
      </div>

      {/* Keepsake Note & Actions Appearing Smoothly After Bouquet Convergence */}
      <AnimatePresence>
        {isBouquetAssembled && (
          <motion.div
            className="final-keepsake-content"
            variants={cardRevealVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.span className="eyebrow-badge" variants={itemVariants}>
              A LITTLE SOMETHING FOR YOU
            </motion.span>

            <motion.h2 className="hero-title" variants={itemVariants}>
              A Bouquet Made by You
            </motion.h2>

            <motion.p
              className="hero-description"
              variants={itemVariants}
              style={{ marginBottom: '1.1rem' }}
            >
              From the flowers you planted, I've gathered them into a little bouquet. I hope it brings a little more joy to your day.
            </motion.p>

            <motion.p
              className="handwritten-whisper"
              variants={itemVariants}
              style={{ marginBottom: '1.5rem' }}
            >
              Made with care, just for you.
            </motion.p>

            <motion.div
              className="stage-action-row"
              variants={itemVariants}
              style={{ justifyContent: 'center', flexWrap: 'wrap' }}
            >
              <button
                type="button"
                className="btn-enter-garden"
                onClick={handleSavePostcard}
                disabled={isGeneratingCard}
              >
                <span>
                  {isGeneratingCard ? 'Preparing Postcard...' : 'Save Your Postcard'}
                </span>
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

              <button
                type="button"
                className="btn-secondary"
                onClick={onBack}
              >
                Previous Note
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {toastMessage && (
        <motion.div
          className="postcard-toast-badge"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          role="status"
          aria-live="polite"
        >
          {toastMessage}
        </motion.div>
      )}
    </motion.section>
  );
}