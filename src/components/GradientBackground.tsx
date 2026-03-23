import { useEffect, useRef } from 'react';

export function GradientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    resize();
    window.addEventListener('resize', resize);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX / width,
        y: e.clientY / height
      };
    };
    window.addEventListener('mousemove', handleMouseMove);

    const orbs = [
      { x: 0.2, y: 0.2, radius: 0.4, color: 'rgba(99, 102, 241, 0.15)', speed: 0.0003 },
      { x: 0.8, y: 0.8, radius: 0.35, color: 'rgba(6, 182, 212, 0.15)', speed: 0.0004 },
      { x: 0.5, y: 0.5, radius: 0.5, color: 'rgba(99, 102, 241, 0.08)', speed: 0.0002 },
      { x: 0.3, y: 0.7, radius: 0.3, color: 'rgba(139, 92, 246, 0.1)', speed: 0.0005 },
    ];

    let time = 0;

    const animate = () => {
      time += 1;

      ctx.fillStyle = '#020617';
      ctx.fillRect(0, 0, width, height);

      orbs.forEach((orb, i) => {
        const offsetX = Math.sin(time * orb.speed + i * 2) * 100;
        const offsetY = Math.cos(time * orb.speed + i * 2) * 100;
        const mouseInfluenceX = (mouseRef.current.x - 0.5) * 50;
        const mouseInfluenceY = (mouseRef.current.y - 0.5) * 50;

        const x = orb.x * width + offsetX + mouseInfluenceX;
        const y = orb.y * height + offsetY + mouseInfluenceY;
        const radius = Math.min(width, height) * orb.radius;

        const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
        gradient.addColorStop(0, orb.color);
        gradient.addColorStop(1, 'transparent');

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
      });

      const imageData = ctx.getImageData(0, 0, width, height);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        const noise = (Math.random() - 0.5) * 3;
        data[i] = Math.max(0, Math.min(255, data[i] + noise));
        data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + noise));
        data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + noise));
      }
      ctx.putImageData(imageData, 0, 0);

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ opacity: 1 }}
    />
  );
}
