import { useEffect, useRef } from 'react';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  pulseOffset: number;
}

const NODE_COLOR = '99, 102, 241';
const NODE_COLOR_ALT = '6, 182, 212';
const LINK_DISTANCE = 150;
const MOUSE_LINK_DISTANCE = 220;
const GRID_SIZE = 64;

export function GradientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5, px: 0, py: 0, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let nodes: Node[] = [];

    const buildNodes = () => {
      const count = Math.max(14, Math.min(40, Math.round((width * height) / 32000)));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        pulseOffset: Math.random() * Math.PI * 2,
      }));
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildNodes();
    };

    resize();
    window.addEventListener('resize', resize);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX / width,
        y: e.clientY / height,
        px: e.clientX,
        py: e.clientY,
        active: true,
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
    let gridOffset = 0;
    let lastFrame = 0;
    const frameInterval = 1000 / 30; // ambient background — 30fps is plenty and halves CPU cost

    const drawGrid = () => {
      gridOffset = reducedMotion ? 0 : (gridOffset + 0.12) % GRID_SIZE;
      ctx.save();
      ctx.strokeStyle = 'rgba(99, 102, 241, 0.06)';
      ctx.lineWidth = 1;
      for (let x = -GRID_SIZE + gridOffset; x < width + GRID_SIZE; x += GRID_SIZE) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = -GRID_SIZE + gridOffset; y < height + GRID_SIZE; y += GRID_SIZE) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
      ctx.restore();
    };

    const drawNetwork = () => {
      const mx = mouseRef.current.px;
      const my = mouseRef.current.py;

      // Update + draw links first so nodes render on top.
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];

        if (!reducedMotion) {
          a.x += a.vx;
          a.y += a.vy;
          if (a.x < 0 || a.x > width) a.vx *= -1;
          if (a.y < 0 || a.y > height) a.vy *= -1;
          a.x = Math.max(0, Math.min(width, a.x));
          a.y = Math.max(0, Math.min(height, a.y));
        }

        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < LINK_DISTANCE) {
            const alpha = (1 - dist / LINK_DISTANCE) * 0.22;
            ctx.strokeStyle = `rgba(${NODE_COLOR}, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }

        // Link to cursor — the network visibly reaches toward the pointer.
        if (mouseRef.current.active) {
          const dxm = a.x - mx;
          const dym = a.y - my;
          const distM = Math.sqrt(dxm * dxm + dym * dym);
          if (distM < MOUSE_LINK_DISTANCE) {
            const alpha = (1 - distM / MOUSE_LINK_DISTANCE) * 0.35;
            ctx.strokeStyle = `rgba(${NODE_COLOR_ALT}, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(mx, my);
            ctx.stroke();
          }
        }
      }

      // Nodes on top, with a slow brightness pulse so the field feels alive
      // even where nothing is close enough to link.
      nodes.forEach((n) => {
        const pulse = reducedMotion ? 0.7 : 0.5 + Math.sin(time * 0.02 + n.pulseOffset) * 0.5;
        const color = n.pulseOffset % 2 < 1 ? NODE_COLOR_ALT : NODE_COLOR;
        ctx.beginPath();
        ctx.fillStyle = `rgba(${color}, ${0.35 + pulse * 0.35})`;
        ctx.arc(n.x, n.y, 1.4 + pulse * 0.8, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    const animate = (now: number) => {
      animationRef.current = requestAnimationFrame(animate);

      // Throttle to ~30fps: this is slow ambient motion, not something
      // that benefits from 60fps, and skipping frames here is by far the
      // cheapest way to cut the canvas's CPU cost in half.
      if (now - lastFrame < frameInterval) return;
      lastFrame = now;

      time += 1;

      ctx.fillStyle = '#020617';
      ctx.fillRect(0, 0, width, height);

      drawGrid();

      orbs.forEach((orb, i) => {
        const offsetX = Math.sin(time * orb.speed + i * 2) * 100;
        const offsetY = Math.cos(time * orb.speed + i * 2) * 100;
        const mouseInfluenceX = (mouseRef.current.x - 0.5) * 180;
        const mouseInfluenceY = (mouseRef.current.y - 0.5) * 180;

        const x = orb.x * width + offsetX + mouseInfluenceX;
        const y = orb.y * height + offsetY + mouseInfluenceY;
        const radius = Math.min(width, height) * orb.radius;

        const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
        gradient.addColorStop(0, orb.color);
        gradient.addColorStop(1, 'transparent');

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
      });

      drawNetwork();
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-0 pointer-events-none"
        style={{ opacity: 1 }}
      />
      {/* Film grain — a static SVG noise texture composited by the GPU
          instead of a per-pixel JS pass on every frame. Same look, none
          of the cost. */}
      <div
        aria-hidden
        className="fixed inset-0 z-0 pointer-events-none opacity-[0.035] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
      {/* Cyberpunk scanline sweep — a thin light band drifting down the
          viewport, reinforced by a faint static scanline texture. */}
      <div
        aria-hidden
        className="fixed inset-0 z-[1] pointer-events-none opacity-[0.05]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(to bottom, rgba(255,255,255,0.6) 0px, rgba(255,255,255,0.6) 1px, transparent 1px, transparent 3px)',
        }}
      />
      <div aria-hidden className="fixed inset-0 z-[1] pointer-events-none scanline-sweep" />
    </>
  );
}
