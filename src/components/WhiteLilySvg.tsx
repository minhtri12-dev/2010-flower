import React from 'react';
import { motion } from 'framer-motion';
import type { BloomPhase } from '../types/garden';

interface WhiteLilySvgProps {
  phase: BloomPhase;
  size?: 'small' | 'large';
}

export const WhiteLilySvg: React.FC<WhiteLilySvgProps> = ({
  phase,
  size = 'large',
}) => {
  const isBud = phase === 'BUD';
  const isFirstLight = phase === 'FIRST_LIGHT';
  const isBloom = phase === 'BLOOM' || phase === 'QUIET_GLOW';
  const isGlow = phase === 'QUIET_GLOW';

  // Các góc xoay cho 3 cánh ngoài và 3 cánh trong khi bung nở
  const outerAngles = [-38, 0, 38];
  const innerAngles = [-68, -18, 18, 68];

  // Quỹ đạo hạt bụi vàng tỏa ra từ tâm hoa ở Giai đoạn D
  const goldenMotes = [
    { dx: -45, dy: -65, delay: 0.1 },
    { dx: 50, dy: -60, delay: 0.25 },
    { dx: -70, dy: -25, delay: 0.4 },
    { dx: 68, dy: -20, delay: 0.15 },
    { dx: -25, dy: -90, delay: 0.35 },
    { dx: 30, dy: -85, delay: 0.5 },
    { dx: 0, dy: -105, delay: 0.2 },
    { dx: -55, dy: -50, delay: 0.6 },
    { dx: 55, dy: -45, delay: 0.45 },
  ];

  return (
    <motion.div
      animate={{ rotate: [0, 0.8, 0, -0.8, 0] }}
      transition={{
        duration: 9,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      style={{ transformOrigin: 'bottom center' }}
      className={
        size === 'small'
          ? 'w-36 h-48 sm:w-44 sm:h-56 mx-auto select-none'
          : 'w-64 h-80 sm:w-80 sm:h-96 mx-auto select-none'
      }
    >
      <svg
        viewBox="0 0 300 380"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible"
        role="img"
        aria-label="Đóa hoa Ly trắng dưới ánh trăng"
      >
        <defs>
          {/* Gradient cho cánh hoa Ly trắng ánh bạc */}
          <linearGradient id="lilyPetalOuter" x1="150" y1="70" x2="150" y2="210" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="65%" stopColor="#F8FAFC" />
            <stop offset="100%" stopColor="#CBD5E1" />
          </linearGradient>

          <linearGradient id="lilyPetalInner" x1="150" y1="60" x2="150" y2="210" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="50%" stopColor="#F8FAFC" />
            <stop offset="90%" stopColor="#E2E8F0" />
            <stop offset="100%" stopColor="#FDE68A" stopOpacity="0.35" />
          </linearGradient>

          {/* Gradient cho thân và lá Deep Botanical Green */}
          <linearGradient id="botanicalStem" x1="150" y1="200" x2="150" y2="370" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#4A6B5B" />
            <stop offset="50%" stopColor="#33483D" />
            <stop offset="100%" stopColor="#17231D" />
          </linearGradient>

          {/* Quầng sáng dịu quanh tâm hoa */}
          <radialGradient id="moonlightHalo" cx="50%" cy="45%" r="50%">
            <stop offset="0%" stopColor="#FDE68A" stopOpacity="0.28" />
            <stop offset="45%" stopColor="#F8FAFC" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#0B0F19" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Quầng sáng nền phía sau hoa */}
        <motion.circle
          cx="150"
          cy="155"
          r={isGlow ? 125 : isBloom ? 105 : 70}
          fill="url(#moonlightHalo)"
          initial={{ opacity: 0.2, scale: 0.8 }}
          animate={{
            opacity: isGlow ? 0.85 : isBloom ? 0.6 : 0.3,
            scale: isGlow ? 1.08 : 1,
          }}
          transition={{ duration: 2.2, ease: 'easeOut' }}
        />

        {/* THÂN HOA (Stem) */}
        <motion.path
          d="M150 205 C149 255, 152 310, 148 368"
          stroke="url(#botanicalStem)"
          strokeWidth="3.5"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        />

        {/* LÁ HÌNH MŨI MÁC (Lanceolate Leaves) */}
        {/* Lá trái */}
        <motion.path
          d="M149 310 C120 295, 88 265, 76 232 C98 250, 128 275, 149 294 Z"
          fill="url(#botanicalStem)"
          stroke="#4A6B5B"
          strokeWidth="0.6"
          initial={{ opacity: 0, scale: 0.7, rotate: -10 }}
          animate={{ opacity: 0.9, scale: 1, rotate: 0 }}
          transition={{ duration: 1.4, delay: 0.3, ease: 'easeOut' }}
          style={{ transformOrigin: '149px 305px' }}
        />
        {/* Lá phải */}
        <motion.path
          d="M151 285 C180 268, 212 240, 224 205 C202 225, 174 252, 151 270 Z"
          fill="url(#botanicalStem)"
          stroke="#4A6B5B"
          strokeWidth="0.6"
          initial={{ opacity: 0, scale: 0.7, rotate: 10 }}
          animate={{ opacity: 0.9, scale: 1, rotate: 0 }}
          transition={{ duration: 1.4, delay: 0.45, ease: 'easeOut' }}
          style={{ transformOrigin: '151px 280px' }}
        />

        {/* ĐÀI HOA NHỎ ĐỠ GỐC (Calyx / Receptacle) */}
        <path
          d="M144 202 C146 210, 154 210, 156 202 L153 196 L147 196 Z"
          fill="#33483D"
        />

        {/* LỚP CÁNH NGOÀI (3 Outer Tepals) */}
        {outerAngles.map((angle, idx) => {
          const targetRotate = isBud
            ? angle * 0.12
            : isFirstLight
            ? angle * 0.45
            : angle;
          const targetScaleY = isBud ? 0.78 : isFirstLight ? 0.9 : 1;
          const targetScaleX = isBud ? 0.55 : isFirstLight ? 0.78 : 1;

          return (
            <motion.g
              key={`outer-${idx}`}
              style={{ transformOrigin: '150px 200px' }}
              initial={{ rotate: angle * 0.1, scaleX: 0.5, scaleY: 0.75, opacity: 0.85 }}
              animate={{
                rotate: targetRotate,
                scaleX: targetScaleX,
                scaleY: targetScaleY,
                opacity: 1,
              }}
              transition={{
                duration: 1.8,
                delay: idx * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {/* Hình dáng phiến hoa Ly thon dài, chóp hơi uốn nhẹ */}
              <path
                d="M150 200 C122 172, 114 115, 150 64 C186 115, 178 172, 150 200 Z"
                fill="url(#lilyPetalOuter)"
                stroke="#E2E8F0"
                strokeWidth="0.8"
              />
              {/* Đường gân chính giữa cánh */}
              <path
                d="M150 198 C150 155, 150 115, 150 72"
                stroke="#CBD5E1"
                strokeWidth="0.9"
                strokeLinecap="round"
                opacity="0.7"
              />
            </motion.g>
          );
        })}

        {/* LỚP CÁNH TRONG (Inner Tepals - Xòe rộng và có độ trễ tự nhiên) */}
        {innerAngles.map((angle, idx) => {
          const targetRotate = isBud
            ? angle * 0.08
            : isFirstLight
            ? angle * 0.38
            : angle;
          const targetScaleY = isBud ? 0.74 : isFirstLight ? 0.88 : 1.02;
          const targetScaleX = isBud ? 0.48 : isFirstLight ? 0.72 : 1;

          return (
            <motion.g
              key={`inner-${idx}`}
              style={{ transformOrigin: '150px 200px' }}
              initial={{ rotate: 0, scaleX: 0.45, scaleY: 0.7, opacity: 0.7 }}
              animate={{
                rotate: targetRotate,
                scaleX: targetScaleX,
                scaleY: targetScaleY,
                opacity: isBud ? 0.85 : 0.98,
              }}
              transition={{
                duration: 2.0,
                delay: 0.18 + idx * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {/* Cánh hoa trong rộng bản hơn và đầu cánh uốn cong mềm mại */}
              <path
                d="M150 200 C118 168, 108 112, 150 58 C192 112, 182 168, 150 200 Z"
                fill="url(#lilyPetalInner)"
                stroke="#F8FAFC"
                strokeWidth="0.9"
              />
              {/* Gân cánh tinh tế */}
              <path
                d="M150 196 Q150 135 150 68"
                stroke="#CBD5E1"
                strokeWidth="0.75"
                opacity="0.65"
              />
              <path
                d="M150 185 Q138 140 143 95"
                stroke="#CBD5E1"
                strokeWidth="0.45"
                opacity="0.4"
              />
              <path
                d="M150 185 Q162 140 157 95"
                stroke="#CBD5E1"
                strokeWidth="0.45"
                opacity="0.4"
              />
            </motion.g>
          );
        })}

        {/* NHỤY TRUNG TÂM & 6 NHỊ HOA BAO PHẤN VÀNG (Pistil & 6 Stamens) */}
        <motion.g
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{
            opacity: isBloom ? 1 : isFirstLight ? 0.35 : 0,
            scale: isBloom ? 1 : 0.65,
          }}
          transition={{ duration: 1.4, delay: 0.3, ease: 'easeOut' }}
          style={{ transformOrigin: '150px 195px' }}
        >
          {/* Nhụy chính giữa (Pistil) */}
          <path
            d="M150 196 C150 165, 150 135, 150 108"
            stroke="#E2E8F0"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <circle cx="150" cy="106" r="3.2" fill="#FDE68A" stroke="#F8FAFC" strokeWidth="0.8" />

          {/* 6 Nhị hoa (Stamens) tỏa đều 2 bên kèm bao phấn Soft Amber */}
          {[
            { cx: 122, cy: 122, cpx: 135, cpy: 160, rot: -25 },
            { cx: 132, cy: 114, cpx: 140, cpy: 155, rot: -15 },
            { cx: 141, cy: 110, cpx: 145, cpy: 152, rot: -6 },
            { cx: 159, cy: 110, cpx: 155, cpy: 152, rot: 6 },
            { cx: 168, cy: 114, cpx: 160, cpy: 155, rot: 15 },
            { cx: 178, cy: 122, cpx: 165, cpy: 160, rot: 25 },
          ].map((stamen, i) => (
            <g key={`stamen-${i}`}>
              <path
                d={`M150 196 Q${stamen.cpx} ${stamen.cpy} ${stamen.cx} ${stamen.cy}`}
                stroke="#F8FAFC"
                strokeWidth="0.95"
                strokeLinecap="round"
                opacity="0.85"
              />
              {/* Bao phấn vàng champagne (Anther) */}
              <ellipse
                cx={stamen.cx}
                cy={stamen.cy}
                rx="4.2"
                ry="1.8"
                transform={`rotate(${stamen.rot} ${stamen.cx} ${stamen.cy})`}
                fill="#FDE68A"
              />
            </g>
          ))}
        </motion.g>

        {/* GIAI ĐOẠN D — THE QUIET GLOW: Luồng hạt bụi vàng tỏa nhẹ từ tâm hoa rồi tan dần */}
        {isGlow &&
          goldenMotes.map((mote, index) => (
            <motion.circle
              key={`mote-${index}`}
              cx={150}
              cy={135}
              r={index % 2 === 0 ? 2 : 1.4}
              fill="#FDE68A"
              initial={{ opacity: 0, x: 0, y: 0, scale: 0.4 }}
              animate={{
                opacity: [0, 0.9, 0],
                x: mote.dx,
                y: mote.dy,
                scale: [0.5, 1.15, 0.3],
              }}
              transition={{
                duration: 4.2,
                delay: mote.delay,
                ease: 'easeOut',
              }}
            />
          ))}
      </svg>
    </motion.div>
  );
};