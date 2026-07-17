import { useEffect, useRef } from 'react';
import gsap from 'gsap';

/**
 * A large, soft radial glow that follows the cursor with a slight lag.
 * Unlike the ambient canvas background (which only nudges a few px),
 * this tracks the pointer directly so the page visibly reacts to mouse
 * movement — the clearest "the page is alive" signal on desktop.
 */
export function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isCoarse = window.matchMedia('(pointer: coarse)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isCoarse || reducedMotion) return;

    const el = glowRef.current;
    if (!el) return;

    const xTo = gsap.quickTo(el, 'x', { duration: 0.9, ease: 'power3.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.9, ease: 'power3.out' });

    const handleMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    gsap.set(el, { x: window.innerWidth / 2, y: window.innerHeight / 2 });
    window.addEventListener('mousemove', handleMove);

    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <div
      ref={glowRef}
      aria-hidden
      className="fixed top-0 left-0 z-[1] pointer-events-none hidden md:block"
      style={{
        width: 300,
        height: 300,
        marginLeft: -150,
        marginTop: -150,
        background:
          'radial-gradient(circle, rgba(99,102,241,0.14) 0%, rgba(6,182,212,0.07) 35%, transparent 70%)',
        borderRadius: '9999px',
        mixBlendMode: 'screen',
      }}
    />
  );
}
