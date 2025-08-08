'use client';

import { useEffect, useRef, useCallback } from 'react';

const Confetti = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameId = useRef<number>();

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let { width, height } = canvas.getBoundingClientRect();
    canvas.width = width;
    canvas.height = height;

    const particles: { x: number, y: number, size: number, speed: number, angle: number, color: string }[] = [];
    const particleCount = 200;
    const colors = ['#3F51B5', '#00BCD4', '#FFC107', '#F44336', '#4CAF50'];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height - height,
        size: Math.random() * 10 + 5,
        speed: Math.random() * 5 + 2,
        angle: Math.random() * 360,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach(p => {
        p.y += p.speed;
        p.angle += p.speed / 2;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle * Math.PI / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();

        if (p.y > height) {
          p.y = -20;
          p.x = Math.random() * width;
        }
      });
      animationFrameId.current = requestAnimationFrame(animate);
    };

    animate();

  }, []);

  useEffect(() => {
    draw();
    window.addEventListener('resize', draw);

    return () => {
      window.removeEventListener('resize', draw);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [draw]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-50" />;
};

export default Confetti;