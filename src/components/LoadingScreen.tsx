import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        setIsLoading(false);
      }
    });

    tl.to(progressRef.current, {
      width: '100%',
      duration: 1.2,
      ease: 'power2.inOut'
    });

    tl.to(circleRef.current, {
      scale: 50,
      duration: 0.8,
      ease: 'power3.inOut'
    }, '+=0.2');

    tl.to(containerRef.current, {
      opacity: 0,
      duration: 0.3,
      ease: 'power2.out'
    });

    return () => {
      tl.kill();
    };
  }, []);

  if (!isLoading) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] bg-[#020617] flex items-center justify-center"
    >
      <div
        ref={circleRef}
        className="absolute w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500"
        style={{ transform: 'scale(0)' }}
      />

      <div className="relative z-10 flex flex-col items-center gap-8">
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white font-['Space_Grotesk'] tracking-wider">
            RAMON TOMAQUIN
          </h1>
          <p className="text-cyan-400 mono text-sm mt-2 tracking-widest">
            AUTOMATION QA ENGINEER
          </p>
        </div>

        <div className="w-64 h-1 bg-slate-800 rounded-full overflow-hidden">
          <div
            ref={progressRef}
            className="h-full bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full"
            style={{ width: '0%' }}
          />
        </div>

        <p className="text-slate-500 mono text-xs tracking-widest animate-pulse">
          INITIALIZING...
        </p>
      </div>
    </div>
  );
}
