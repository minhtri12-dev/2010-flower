import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  baseRadius: number;
  vx: number;
  vy: number;
  alpha: number;
  phase: number;
  phaseSpeed: number;
  color: string;
}

export const AmbientCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({
    x: -1000,
    y: -1000,
    active: false,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY, active: true };
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    // Số lượng hạt tiết chế: 22 trên điện thoại, 42 trên màn hình lớn
    const particleCount = width < 768 ? 22 : 42;
    const colors = ['#FDE68A', '#F8FAFC', '#CBD5E1'];

    const particles: Particle[] = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      baseRadius: Math.random() * 1.6 + 0.7,
      vx: (Math.random() - 0.5) * 0.18,
      vy: -Math.random() * 0.22 - 0.05, // Trôi nhẹ hướng lên
      alpha: Math.random() * 0.5 + 0.15,
      phase: Math.random() * Math.PI * 2,
      phaseSpeed: Math.random() * 0.012 + 0.004,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        if (!prefersReducedMotion) {
          p.phase += p.phaseSpeed;
          p.x += p.vx + Math.sin(p.phase) * 0.12;
          p.y += p.vy;

          // Tương tác nhẹ khi chuột lại gần
          if (mouseRef.current.active) {
            const dx = p.x - mouseRef.current.x;
            const dy = p.y - mouseRef.current.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 120 && dist > 0) {
              const force = (120 - dist) / 120;
              p.x += (dx / dist) * force * 0.35;
              p.y += (dy / dist) * force * 0.35;
            }
          }

          // Vòng lặp không gian
          if (p.y < -20) p.y = height + 20;
          if (p.x < -20) p.x = width + 20;
          if (p.x > width + 20) p.x = -20;
        }

        const currentAlpha = p.alpha * (0.65 + 0.35 * Math.sin(p.phase));

        ctx.save();
        ctx.beginPath();
        const gradient = ctx.createRadialGradient(
          p.x,
          p.y,
          0,
          p.x,
          p.y,
          p.baseRadius * 4
        );
        gradient.addColorStop(0, p.color);
        gradient.addColorStop(1, 'transparent');

        ctx.fillStyle = gradient;
        ctx.globalAlpha = currentAlpha;
        ctx.arc(p.x, p.y, p.baseRadius * 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ pointerEvents: 'none' }}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  );
};