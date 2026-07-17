import { useEffect, type RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Scrub-linked clip-path wipe for section headings, tied directly to
 * scroll position so it plays forward on the way down and un-reveals on
 * the way back up. Wrap the heading text in a `.reveal-mask` (overflow
 * hidden) span so the wipe reads as a mask rather than a jump-cut.
 */
export function useHeadingReveal(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { clipPath: 'inset(0 0 0 100%)', x: -30 },
        {
          clipPath: 'inset(0 0 0 0%)',
          x: 0,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            end: 'top 60%',
            scrub: 0.7,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [ref]);
}
