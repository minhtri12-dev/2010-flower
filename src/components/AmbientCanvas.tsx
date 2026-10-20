import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

interface Particle {
  id: number;
  layer: 'far' | 'mid' | 'near';
  isPetal: boolean;
  left: string;
  size: number;
  duration: number;
  delay: number;
  swayAmplitude: number;
  rotationStart: number;
  rotationEnd: number;
  color: string;
  opacity: number;
  blur: string;
}

const COLORS = [
  '#DFA89B', // Hồng đất
  '#F3C6BC', // Hồng phấn nhẹ
  '#D3B77A', // Vàng champagne
  '#A8B59A', // Xanh sage
];

export const AmbientCanvas: React.FC = () => {
  const particles = useMemo<Particle[]>(() => {
    const totalCount = 42; // Mật độ dày dặn, sinh động
    
    return Array.from({ length: totalCount }).map((_, index) => {
      const randLayer = (index % 10) / 10;
      const layer: 'far' | 'mid' | 'near' =
        randLayer < 0.4 ? 'far' : randLayer < 0.8 ? 'mid' : 'near';

      const size =
        layer === 'far'
          ? 5 + (index % 4)
          : layer === 'mid'
          ? 9 + (index % 6)
          : 15 + (index % 7);

      const duration =
        layer === 'far'
          ? 20 + (index % 9)
          : layer === 'mid'
          ? 14 + (index % 7)
          : 10 + (index % 5);

      const opacity =
        layer === 'far' ? 0.25 : layer === 'mid' ? 0.48 : 0.72;

      const blur =
        layer === 'far'
          ? 'blur(1.5px)'
          : layer === 'mid'
          ? 'blur(0.3px)'
          : 'blur(0px)';

      const swayAmplitude =
        layer === 'far'
          ? 20 + (index % 15)
          : layer === 'mid'
          ? 45 + (index % 25)
          : 70 + (index % 35);

      return {
        id: index,
        layer,
        isPetal: index % 4 !== 0, // 75% là cánh hoa Ly, 25% là hạt phấn tròn
        left: `${(index * 100) / totalCount + ((index * 7) % 5) - 2}%`,
        size,
        duration,
        delay: -((index * 1.7) % 22), // Delay âm để vừa mở web ra là hoa đã rơi sẵn khắp màn hình
        swayAmplitude,
        rotationStart: (index * 45) % 360,
        rotationEnd: ((index * 45) % 360) + (index % 2 === 0 ? 220 : -220),
        color: COLORS[index % COLORS.length],
        opacity,
        blur,
      };
    });
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 overflow-hidden"
      style={{ zIndex: 1 }}
      aria-hidden="true"
    >
      {particles.map((p) => (
        <motion.div
          key={p.id}
          style={{
            position: 'absolute',
            top: '-5%',
            left: p.left,
            width: p.size,
            height: p.isPetal ? p.size * 1.45 : p.size,
            filter: p.blur,
            opacity: p.opacity,
          }}
          animate={{
            y: ['0vh', '108vh'],
            x: [
              0,
              p.swayAmplitude,
              -p.swayAmplitude * 0.7,
              p.swayAmplitude * 0.4,
              0,
            ],
            rotate: [p.rotationStart, p.rotationEnd],
          }}
          transition={{
            y: {
              duration: p.duration,
              repeat: Infinity,
              ease: 'linear',
              delay: p.delay,
            },
            x: {
              duration: p.duration * 0.9,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: p.delay,
            },
            rotate: {
              duration: p.duration,
              repeat: Infinity,
              ease: 'linear',
              delay: p.delay,
            },
          }}
        >
          {p.isPetal ? (
            <svg
              viewBox="0 0 24 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ width: '100%', height: '100%' }}
            >
              <path
                d="M12 0C6.5 8 2 16.5 2 24C2 30.5 6.5 36 12 36C17.5 36 22 30.5 22 24C22 16.5 17.5 8 12 0Z"
                fill={p.color}
              />
              <path
                d="M12 4V32"
                stroke="#F7F3EA"
                strokeWidth="0.8"
                strokeOpacity="0.4"
              />
            </svg>
          ) : (
            <div
              style={{
                width: '100%',
                height: '100%',
                borderRadius: '9999px',
                backgroundColor: p.color,
              }}
            />
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default AmbientCanvas;