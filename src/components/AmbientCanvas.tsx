import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  radius: number;
  speedY: number;
  speedX: number;
  opacity: number;
  pulseSpeed: number;
  color: string;
  isPetal: boolean;
  angle: number;
  spinSpeed: number;
}

const PALETTE = ['#D3B77A', '#A8B59A', '#DFA89B', '#FFFFFF'];

export function AmbientCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const prefersReducedMotion = mediaQuery.matches;

    let animationFrameId = 0;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const particleCount = width < 640 ? 24 : 40;
    const particles: Particle[] = Array.from({ length: particleCount }, (_, index) => {
      const isPetal = index % 4 === 0;
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        radius: isPetal ? Math.random() * 4 + 3 : Math.random() * 1.6 + 0.8,
        speedY: isPetal ? Math.random() * 0.24 + 0.1 : -(Math.random() * 0.18 + 0.05),
        speedX: (Math.random() - 0.5) * 0.2,
        opacity: Math.random() * 0.45 + 0.15,
        pulseSpeed: Math.random() * 0.015 + 0.005,
        color: PALETTE[index % PALETTE.length],
        isPetal,
        angle: Math.random() * Math.PI * 2,
        spinSpeed: (Math.random() - 0.5) * 0.01,
      };
    });

    const drawParticles = () => {
      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        ctx.save();
        ctx.globalAlpha = Math.max(0.1, Math.min(0.65, p.opacity));

        if (p.isPetal) {
          ctx.translate(p.x, p.y);
          ctx.rotate(p.angle);
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.ellipse(0, 0, p.radius * 1.3, p.radius * 0.7, 0, 0, Math.PI * 2);
          ctx.fill();
        } else {
          const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 2.5);
          gradient.addColorStop(0, p.color);
          gradient.addColorStop(1, 'rgba(247, 243, 234, 0)');
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * 2.5, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();

        if (!prefersReducedMotion) {
          p.x += p.speedX + Math.sin(p.angle) * 0.1;
          p.y += p.speedY;
          p.angle += p.spinSpeed;
          p.opacity += Math.sin(Date.now() * p.pulseSpeed) * 0.002;

          if (p.y < -20) p.y = height + 20;
          if (p.y > height + 20) p.y = -20;
          if (p.x < -20) p.x = width + 20;
          if (p.x > width + 20) p.x = -20;
        }
      }

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(drawParticles);
      }
    };

    drawParticles();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 2,
      }}
    />
  );
}